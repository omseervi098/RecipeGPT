import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
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
      type: Array,
    },
    requestedIngredients: {
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
    ingredients: {
      type: Array,
    },
    embeddings: {
      type: Array,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
