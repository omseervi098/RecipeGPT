import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
// Action Types
const SET_RECIPE = "SET_RECIPE";
const SET_INSTANCE_DETAILS = "SET_INSTANCE_DETAILS";
const SET_RATING = "SET_RATING";
const SET_PREVIOUS_RECIPES = "SET_PREVIOUS_RECIPES";

// Initial State
const initialState = {
  recipe: null,
  instancedetails: null,
  previousRecipes: [],
  rating: null,
};

// Reducer Function
const recipeReducer = (state, action) => {
  switch (action.type) {
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case SET_INSTANCE_DETAILS:
      return {
        ...state,
        instancedetails: action.payload,
      };
    case SET_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case SET_PREVIOUS_RECIPES:
      return {
        ...state,
        previousRecipes: action.payload,
      };

    default:
      return state;
  }
};
export const RecipeContext = createContext();
// RecipeContext Provider
export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const getRecipe = async (instancedetails) => {
    try {
      const url = process.env.REACT_APP_FLASK_URL + "/get";
      const response = await axios.post(url, instancedetails);
      const recipe = response.data;
      if (recipe !== "No recipe found") {
        // Add Unique Key to Each Recipe
        recipe.id = Math.random().toString(36).substr(2, 9);
      }
      // Add Recipe to Previous Recipes
      dispatch({
        type: SET_PREVIOUS_RECIPES,
        payload: [
          ...state.previousRecipes,
          {
            recipe: recipe,
            instancedetails: instancedetails,
            rating: null,
          },
        ],
      });
      dispatch({ type: SET_RECIPE, payload: recipe });
      return recipe;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      }
    }
  };
  const getInstanceDetails = (instancedetails) => {
    dispatch({ type: SET_INSTANCE_DETAILS, payload: instancedetails });
  };

  const rateRecipe = async (id, rating) => {
    try {
      const url =
        process.env.REACT_APP_FLASK_URL + "/api/v1/recipes/" + id + "/rate";
      const response = await axios.post(url, { rating });
      dispatch({ type: SET_RATING, payload: response.data.data });
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      }
    }
  };
  return (
    <RecipeContext.Provider
      value={{ ...state, getRecipe, getInstanceDetails, rateRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within RecipeProvider");
  }
  return context;
};
