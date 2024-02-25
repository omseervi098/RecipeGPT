import Recipe from "../models/Recipe.js";
import User from "../models/User.js";
export const getAllRecipes = async (req, res) => {
  try {
    const { user } = req.body;

    // search user by id
    if (user) {
      const user1 = await User.findById(user._id);
      const recipes = await Recipe.find({ id: { $in: user1.recipes } });
      res.status(200).json({
        status: "success",
        results: recipes.length,
        data: {
          recipes,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const createRecipe = async (req, res) => {
  try {
    const { recipe, user, instanceDetails } = req.body;

    const recipe1 = await Recipe.create({
      id: recipe.id,
      title: recipe.title,
      directions: recipe.directions,
      ingredients: recipe.ingredients,
      requestedIngredients: instanceDetails.ingredients,
      allergies: user.foodPreferences.allergies,
      diet_type: user.foodPreferences.dietPreference[0],
    });
    const user1 = await User.findById(user);
    user1.recipes.push(recipe.id);
    await user1.save({ validateBeforeSave: false });
    res.status(201).json({
      status: "success",
      data: {
        recipe1,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
