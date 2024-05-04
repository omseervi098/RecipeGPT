from flask_cors import CORS
from flask import Flask, request
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import Pinecone
from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI
import numpy as np
app = Flask(__name__)
CORS(app)
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
pc_interface = Pinecone.from_existing_index(
    "embedding", embedding=embeddings, namespace="ns1")
retriever = pc_interface.as_retriever()
client = OpenAI()


def get_embedding(text, model="text-embedding-ada-002"):
    return client.embeddings.create(input=text, model=model).data[0].embedding


def convert_recipes(result):
    title = result.split("Title:")[1].split("Ingredients:")[0]
    ingredients = result.split("Ingredients:")[1].split("Directions:")[0]
    directions = result.split("Directions:")[1]
    # convert directions to list of string
    directions = directions.replace("[", "").replace("]", "").split(str(', "'))
    directions = [string.replace('\n', "") for string in directions]
    directions = [string[1:] if string.startswith(
        '"') else string for string in directions]
    directions = [string[:-1]
                  if string.endswith('"') else string for string in directions]
    # convert ingredients to list of string
    ingredients = ingredients.replace(
        "[", "").replace("]", "").split(str(', "'))
    ingredients = [string.replace('\n', "") for string in ingredients]
    ingredients = [string[1:] if string.startswith(
        '"') else string for string in ingredients]
    ingredients = [string[:-1]
                   if string.endswith('"') else string for string in ingredients]
    return {
        'title': title,
        'ingredients': ingredients,
        'directions': directions
    }


def get_query_similarity_score(query_embed, generated_list):
    query_similarity_scores_recipes = []
    for i in generated_list:
        embedding1 = np.array(i)
        embedding2 = np.array(query_embed)
        embedding1 = embedding1.reshape(1, -1)
        embedding2 = embedding2.reshape(1, -1)
        cum_sim = cosine_similarity(embedding1, embedding2)
        query_similarity_scores_recipes.append(cum_sim)
    return query_similarity_scores_recipes


def get_recipe1(generated_list, history_list, rating_col, query_similarity_scores_recipes):
    weights_score = []
    for i in range(len(generated_list)):
        cum_sim = 0
        c = 0
        for j in history_list:
            embedding1 = np.array(generated_list[i])
            embedding2 = np.array(j)
            embedding1 = embedding1.reshape(1, -1)
            embedding2 = embedding2.reshape(1, -1)
            cum_sim += cosine_similarity(embedding1, embedding2)
            c = c+1
        cum_sim = (cum_sim/5.0)
        weights_score.append(cum_sim)
    weights_score
    print(weights_score)
    index_of_max = weights_score.index(max(weights_score))
    return index_of_max


def get_ingr(generated_list):
    recipes_whole = []
    whole_recipe = str(generated_list)
    print(whole_recipe)
    recipes_whole.append(whole_recipe)
    recipes_ingredients = []

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Extract me just the ingredients from the recipe given below"},
            {"role": "user", "content": recipes_whole[0]
             }]
    )
    ingredients = response.choices[0].message.content.split("\n")
    cleaned_ingredients = [ingredient.lstrip(
        '-').strip().lower() for ingredient in ingredients]
    recipes_ingredients.append(cleaned_ingredients)
    return recipes_ingredients[0]


def get_recipe(generated_list, history_list, rating_col, query_similarity_scores_recipes, allergy, generated_recipe):
    weights_score = []
    for i in range(len(generated_list)):
        cum_sim = 0
        c = 0
        ingr = get_ingr(generated_recipe[i])

        al_not_found = True
        for al in allergy:
            if al.lower() in ingr:
                cum_sim = -1
                weights_score.append(cum_sim)
                al_not_found = False
                break
        if al_not_found:
            for j in history_list:
                embedding1 = np.array(generated_list[i])
                embedding2 = np.array(j)
                embedding1 = embedding1.reshape(1, -1)
                embedding2 = embedding2.reshape(1, -1)
                cum_sim += rating_col[c] * \
                    cosine_similarity(embedding1, embedding2)
                c = c+1
            cum_sim = (cum_sim/5.0)
            weights_score.append(cum_sim)
    print(weights_score)
    index_of_max = weights_score.index(max(weights_score))
    return index_of_max


@app.route('/', methods=['GET'])
def home():
    return "Hello, World !!"


@app.route('/get', methods=['POST'])
def getresult():
    instanceDetail = request.json['instancedetails']
    user = request.json['user']
    previousRecipes = request.json['previous5Recipes']
    ingredient = instanceDetail['ingredient']
    diet_type = instanceDetail['diet_type'][0]
    allergies = ', '.join(instanceDetail['allergies'])
    print(allergies, diet_type)
    template = """
    You are a recipe recommender system that help users to find recipe that match their preferences. 
    Use the following pieces of context to answer the question at the end. 
    User will provide the ingredients and you recommend directions for the recipe using those ingredients. I want 3 such recipes using the same ingredients. In the output 
    I want just the Title, Ingredients and Directions for the three recipes only. You can halluciante but I want three independant recipes.
    {context}
    This is what we know about the user, and you can use this information to better tune your research. Out of 3 recipes give 2 recipes without allergy and 1 recipe with allergy but don't manipulate title of recipe:
    Allergy: """ + str(allergies) + """
    Question: {question}
    Your response:"""
    PROMPT = PromptTemplate(
        template=template, input_variables=["context", "question"])
    chain_type_kwargs = {"prompt": PROMPT}
    llm = ChatOpenAI(
        temperature=0.4, model_name="gpt-4"
    )
    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever,
                                     return_source_documents=True, chain_type_kwargs=chain_type_kwargs)
    ingredient = ', '.join(ingredient)
    query = "Give me directions with the following ingredients: "+ingredient
    query_embed = get_embedding(str(query))
    docs = qa({'query': query})
    print(docs['result'])
    # find title, ingredients, directions from docs['result'] string
    print(docs['result'].find("Title: "), docs['result'].find(
        "Ingredients: "), docs['result'].find("Directions: "))
    if docs['result'].find("Title:") == -1 or docs['result'].find("Ingredients:") == -1 or docs['result'].find("Directions:") == -1:
        return "No recipe found"
    result = str(docs['result']).strip().split("\n\n")[0:3]
    generated_recipe = []
    for i in result:
        generated_recipe.append(convert_recipes(i))
    generated_recipe_embedding = []
    for i in generated_recipe:
        generated_recipe_embedding.append(
            get_embedding(str(i["title"])+str(i["directions"])))
    historical_recipe_embedding = []
    for i in previousRecipes:
        historical_recipe_embedding.append(
            get_embedding(str(i['title']+str(i['directions']))))
    rating_col = [(recipe["rating"]-3)/2.0 for recipe in previousRecipes]
    query_similarity_scores_recipes = get_query_similarity_score(
        query_embed, generated_recipe_embedding)
    idx = get_recipe(generated_recipe_embedding, historical_recipe_embedding,
                     rating_col, query_similarity_scores_recipes, allergy=allergies, generated_recipe=result)
    idx1 = get_recipe1(generated_recipe_embedding, historical_recipe_embedding,
                       rating_col, query_similarity_scores_recipes)
    print(generated_recipe[idx1])
    print(generated_recipe[idx])
    docs = docs['source_documents']
    docs_dict = [{"page_content": doc.page_content, "metadata": {"title": doc.metadata["title"], "ingredients": doc.metadata["ingredients"],
                                                                 "directions": doc.metadata["directions"], "NER": doc.metadata["NER"]}} for doc in docs]
    docs_dict[0]["metadata"]["ingredients"] = docs_dict[0]["metadata"]["ingredients"].replace(
        "[", "").replace("]", "").replace("\"", "").split(", ")
    # Convert Directions to list of string between "[\"avocado\"" to "avocado"
    docs_dict[0]["metadata"]["directions"] = docs_dict[0]["metadata"]["directions"].replace(
        "[", "").replace("]", "").replace("\"", "").split(", ")
    # Convert NER to list of string between "[\"avocado\"" to "avocado"
    docs_dict[0]["metadata"]["NER"] = docs_dict[0]["metadata"]["NER"].replace(
        "[", "").replace("]", "").replace("\"", "").split(", ")
    response = {
        "recommended": {
            "title": generated_recipe[idx]['title'],
            "ingredients": generated_recipe[idx]['ingredients'],
            "directions": generated_recipe[idx]['directions']
        },
        "allRecipes": generated_recipe,
        "usingCosineSimilarity": {
            "title": generated_recipe[idx1]['title'],
            "ingredients": generated_recipe[idx1]['ingredients'],
            "directions": generated_recipe[idx1]['directions']
        },
        "docs": docs_dict

    }
    # response="No recipe found"
    return response


if (__name__ == '__main__'):
    app.run(debug=True)
