import "./dashboard.css";
import React, { useEffect } from "react";
import MultiSelect from "../../components/multiselect/multiselect";
import { Slider } from "primereact/slider";
import DropdownwithSearch from "../../components/dropdown/dropdown";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/authcontext";
import IntroDashboard from "../../components/IntroDashboard/IntroDashboard";
import CookingSVG from "../../asset/images/cooking.svg";
import Progressbar from "../../components/progressBar/progressBar";
import axios from "axios";
import { useRecipe } from "../../context/recipecontext";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = (props) => {
  const { user } = useAuth();
  const { recipe, getRecipe, getInstanceDetails, storeRecipe } = useRecipe();
  const navigate = useNavigate();
  const [instanceDetails, setInstanceDetails] = React.useState({
    ingredients: [],
    time: 5,
    type: null,
    cuisinePreference: null,
  });
  const [result, setResult] = React.useState(null);
  const handleChange = ({ name, value }) => {
    setInstanceDetails({ ...instanceDetails, [name]: value });
  };
  const handleGenerateRecipe = async () => {
    // Add your logic here
    const ingredients = instanceDetails.ingredients.map((ingredient) => {
      return ingredient.name;
    });
    const allergies = user.foodPreferences.allergies.map(
      (allergy) => allergy.name
    );
    const instanceDetail = {
      ingredient: ingredients,
      time: instanceDetails.time,
      type: instanceDetails.type,
      cuisinePreference: instanceDetails.cuisinePreference,
      diet_type: user.foodPreferences.dietPreference,
      allergies: allergies,
    };
    try {
      const recipe = await getRecipe(instanceDetail);
      if (recipe === "No recipe found") {
        setResult("No recipe found");
        setLoading(false);
        return;
      }
      await storeRecipe(recipe, user, instanceDetails);
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
        {!loading && (
          <div className="row justify-content-center py-3">
            <div className="col-12 col-md-8">
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
              <div className="py-3 ">
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
              </div>
              <div className="py-3">
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
              </div>
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
          <div className="row justify-content-center py-4">
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
              <Progressbar />
            </div>
          </div>
        )}
        {result && (
          <div className="row justify-content-center py-4">
            <div className="col-12 col-md-8">
              <div className="py-3">
                {result === "No recipe found" && (
                  <h4 className="fw-bold">No recipe found</h4>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
