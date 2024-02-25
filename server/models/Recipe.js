import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  readyInMinutes: {
    type: Number,
  },
  servings: {
    type: Number,
  },
  sourceUrl: {
    type: String,
  },
  directions: {
    type: String,
  },
  requiredIngredients: {
    type: Array,
  },
  allergies: {
    type: Array,
  },
  diet_type: {
    type: String,
  },
  calories: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  extendedIngredients: {
    type: Array,
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
