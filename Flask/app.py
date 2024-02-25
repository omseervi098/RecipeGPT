from flask_cors import CORS, cross_origin
from flask import Flask, send_file, request
from langchain_community.vectorstores import LanceDB
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

import flask
import os
import pickle
import pandas as pd
import json
import lancedb
app = Flask(__name__)
CORS(app)
with open('df_new_emb.pkl', 'rb') as file:
    data = pickle.load(file)
    recipe = pd.DataFrame(data)
uri = "dataset/sample-recipe1-lancedb"
db = lancedb.connect(uri)
if "recipe" not in db.table_names():
    table = db.create_table("recipe", recipe)
else:
    table = db.open_table("recipe")
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
docsearch = LanceDB(connection=table, embedding=embeddings)


@app.route('/', methods=['GET'])
def home():
    return "Hello, World !!"


@app.route('/get', methods=['POST'])
def getresult():
    ingredient = request.json['ingredient']
    diet_type = request.json['diet_type']
    allergies = request.json['allergies']
    # Combine ingredient to string
    template = """You are a recipe recommender system that help users to find recipe that match their preferences.
    Use the following pieces of context to answer the question at the end.
    User will provide the ingredients and you recommend directions for the recipe using those ingredients. I want 1 such recipes using the same ingredients
    {context}
    This is what we know about the user, and you can use this information to better tune your research. You follow the bellow points strictly.
    1) Do not recommend recipes which contains ingredients that are mentioned in Allergies list mentioned below.
    2) Recipes recommended must be specefically within the same Category as mentioned in diet_type.
    Allergies:""" + str(allergies) + """
    Category: """ + diet_type[0]+"""           
    Question: {question}
    Your response:"""
    print(template)
    PROMPT = PromptTemplate(
        template=template, input_variables=["context", "question"])
    chain_type_kwargs = {"prompt": PROMPT}
    llm = ChatOpenAI(
        temperature=0, model_name="gpt-3.5-turbo-0613"
    )
    qa = RetrievalQA.from_chain_type(llm=llm,
                                     chain_type="stuff",
                                     retriever=docsearch.as_retriever(),
                                     return_source_documents=True,
                                     chain_type_kwargs=chain_type_kwargs)
    ingredient = ', '.join(ingredient)
    query = "Give me directions with the following ingredients: "+ingredient
    print(query)
    docs = qa({'query': query})
    # check type of docs
    print(docs['result'])
    # find title, ingredients, directions from docs['result'] string
    if docs['result'].find("Title: ") == -1 or docs['result'].find("Ingredients: ") == -1 or docs['result'].find("Directions: ") == -1:
        return "No recipe found"
    result = docs['result']
    title = docs['result'].split("Title: ")[1].split("Ingredients: ")[0]
    ingredients = docs['result'].split("Ingredients: ")[
        1].split("Directions: ")[0]
    directions = docs['result'].split("Directions: ")[1]
    # convert directions to list of string
    directions = directions.replace(
        "[", "").replace("]", "").split(str(', "'))
    # convert ingredients to list of string
    ingredients = ingredients.replace(
        "[", "").replace("]", "").split(str(', "'))
    docs = docs['source_documents']
    docs_dict = [{"page_content": doc.page_content, "metadata": {"title": doc.metadata["title"], "ingredients": doc.metadata["ingredients"],
                                                                 "directions": doc.metadata["directions"], "NER": doc.metadata["NER"], "n_tokens": doc.metadata["n_tokens"]}} for doc in docs]
    docs_dict[0]["metadata"]["ingredients"] = docs_dict[0]["metadata"]["ingredients"].replace(
        "[", "").replace("]", "").replace("\"", "").split(", ")
    # Convert Directions to list of string between "[\"avocado\"" to "avocado"
    docs_dict[0]["metadata"]["directions"] = docs_dict[0]["metadata"]["directions"].replace(
        "[", "").replace("]", "").replace("\"", "").split(", ")
    # Convert NER to list of string between "[\"avocado\"" to "avocado"
    docs_dict[0]["metadata"]["NER"] = docs_dict[0]["metadata"]["NER"].replace(
        "[", "").replace("]", "").replace("\"", "").split(", ")
    response = {
        "title": title,
        "ingredients": ingredients,
        "directions": directions,
        "docs": docs_dict
    }
    return response


if (__name__ == '__main__'):
    app.run()
