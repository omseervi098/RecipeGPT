import "./dashboard.css";
import React, { useEffect } from "react";
import MultiSelect from "../../components/multiselect/multiselect";
import { Slider } from "primereact/slider";
import DropdownwithSearch from "../../components/dropdown/dropdown";
import { useAuth } from "../../context/authcontext";
import IntroDashboard from "../../components/IntroDashboard/IntroDashboard";
import CookingSVG from "../../asset/images/cooking.svg";
import Progressbar from "../../components/progressBar/progressBar";
import { useRecipe } from "../../context/recipecontext";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { toast } from "react-toastify";
const Dashboard = (props) => {
  const { user } = useAuth();
  const {
    recipe,
    previousRecipes,
    getRecipe,
    getAllRecipes,
    getInstanceDetails,
    storeRecipe,
  } = useRecipe();
  const navigate = useNavigate();
  const [instanceDetails, setInstanceDetails] = React.useState({
    ingredients: [],
    time: 5,
    type: null,
    cuisinePreference: null,
  });
  const [result, setResult] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        await getAllRecipes(user);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const handleChange = ({ name, value }) => {
    setInstanceDetails({ ...instanceDetails, [name]: value });
  };
  const handleGenerateRecipe = async () => {
    // Add your logic here
    const ingredients = instanceDetails.ingredients.map((ingredient) => {
      return ingredient.name;
    });
    //check if user has any allergies
    let allergies = [];
    let dietPreference = null;
    if (user.foodPreferences) {
      if (user.foodPreferences.dietPreference)
        dietPreference = user.foodPreferences.dietPreference;
      if (
        user.foodPreferences.allergies &&
        user.foodPreferences.allergies.length > 0
      )
        allergies = user.foodPreferences.allergies.map(
          (allergy) => allergy.name
        );
    }
    const instanceDetail = {
      ingredient: ingredients,
      diet_type: dietPreference,
      allergies: allergies,
    };

    // loop through previous recipes and check if recipe is rated and collect 5 recipes
    const ratedRecipes = previousRecipes.filter((recipe) => recipe.rating);
    try {
      let previous5Recipes = [];
      if (ratedRecipes.length > 5) {
        //if rated recipes are more than 5 then get 5 recipes from the rated recipes
        previous5Recipes = ratedRecipes.slice(0, 5);
      } else {
        //if rated recipes are less than 5 then get all the rated recipes
        previous5Recipes = ratedRecipes;
      }
      console.log("previous5Recipes", previous5Recipes);
      const recipe = await getRecipe({
        user: user,
        instancedetails: instanceDetail,
        previous5Recipes: previous5Recipes,
      });
      if (
        recipe === "No recipe found" ||
        recipe === null ||
        recipe === undefined
      ) {
        setResult("No recipe found");
        setLoading(false);
        setVisible(true);
        return;
      }
      await storeRecipe({ recipe, user, instanceDetails, previous5Recipes });
      await getInstanceDetails(instanceDetails);
      setResult(recipe);
      if (recipe !== "No recipe found") navigate("/recipe/" + recipe.id);
    } catch (err) {
      setResult("No recipe found");
    }
    setLoading(false);
  };

  const [loading, setLoading] = React.useState(false);

  return (
    <div className="dashboard py-5">
      <div className="container pb-5 pt-3">
        <IntroDashboard />
        <Divider />
        {!loading && (
          <div className="row justify-content-center py-3">
            <div className="col-12 col-md-10">
              <div className="py-3">
                <h4 className="fw-bold">Ingredients </h4>
                <p className="text-muted">
                  Select ingredients you have in your kitchen. Select them by
                  typing name of the ingredient and selecting from the dropdown.
                </p>
                <MultiSelect
                  selectedIngredients={instanceDetails.ingredients}
                  handleChange={handleChange}
                  name={"ingredients"}
                />
              </div>
              {/* <div className="py-3 ">
                <h4 className="fw-bold mb-3">How much time do you have? </h4>
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                  <h4 className="fw-bold">
                    ⏲️{" "}
                    {instanceDetails.time > 115
                      ? instanceDetails.time + "+"
                      : instanceDetails.time}{" "}
                    mins
                  </h4>
                  <Slider
                    value={instanceDetails.time}
                    onChange={(e) => {
                      if (e.value) {
                        handleChange({ name: "time", value: e.value });
                      }
                    }}
                    className="w-50 w-sm-25"
                    step={10}
                    max={120}
                    min={5}
                  />
                </div>
              </div> */}
              {/* <div className="py-3">
                <h4 className="fw-bold">What type of dish do you want? </h4>
                <p className="text-muted">
                  Select the type of dish you want to cook from the dropdown.
                </p>
                <DropdownwithSearch
                  value={instanceDetails.type}
                  options={["Breakfast", "Lunch", "Dinner", "Snacks"]}
                  className="w-100"
                  placeholder="Select Type"
                  name="type"
                  type={"dropdown"}
                  handleChange={handleChange}
                />
              </div>
              <div className="py-3">
                <h4 className="fw-bold">What cuisine do you want? </h4>
                <p className="text-muted">
                  Select the cuisine you want to cook from the dropdown.
                </p>
                <DropdownwithSearch
                  value={instanceDetails.cuisinePreference}
                  options={["Indian", "Italian", "Mexican", "Chinese"]}
                  className="w-100"
                  placeholder="Select Cuisine"
                  name="cuisinePreference"
                  type={"dropdown"}
                  handleChange={handleChange}
                />
              </div> */}
              <div className="mt-3 text-center d-flex justify-content-center">
                <button
                  className="main__button px-3 px-sm-5"
                  onClick={() => {
                    setLoading(true);
                    handleGenerateRecipe();
                  }}
                >
                  Generate Recipe
                </button>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <Dialog
            visible={true}
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "80vw" }}
            onHide={() => setVisible(true)}
            content={({ hide }) => (
              <div
                className="row justify-content-center py-4 bg-white"
                style={{ borderRadius: "10px" }}
              >
                <div className="col-12 col-md-8">
                  <div className="py-3 d-flex justify-content-center align-items-center">
                    <img
                      src={CookingSVG}
                      alt="cooking"
                      className="img-fluid col-6"
                    />
                  </div>
                  <div className="py-3 d-flex justify-content-center align-items-center">
                    <h4 className="fw-bold">Generating Recipe .. </h4>
                  </div>
                  <Progressbar props={loading} />
                </div>
              </div>
            )}
          />
        )}
        {result && result === "No recipe found" && (
          <Dialog
            visible={visible}
            style={{ width: "40vw" }}
            breakpoints={{ "960px": "50vw", "641px": "90vw" }}
            onHide={() => setVisible(false)}
            header={
              <h4 className="fw-bold m-0">
                <div className="text-danger">No recipe found !!! </div>
              </h4>
            }
          >
            <div
              className="row justify-content-center p-0 p-0 m-0 bg-white"
              style={{ borderRadius: "10px" }}
            >
              <div className="col-12 col-md-12 p-0 m-0">
                <div className=" d-flex justify-content-center align-items-center">
                  <p className="text-muted">
                    We couldn't find any recipe based on your preferences. Try
                    changing your preferences and try again.
                  </p>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
