import { Router } from "express";
import passport from "passport";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  rateRecipe,
  updateRecipe,
  deleteAllRecipes,
} from "../controllers/recipeController.js";
const router = Router();
router.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  getAllRecipes
);
router.get("/:id", getRecipeById);
router.post(
  "/rate",
  passport.authenticate("jwt", { session: false }),
  rateRecipe
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);
router.post("/update", updateRecipe);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
router.delete(
  "/all",
  passport.authenticate("jwt", { session: false }),
  deleteAllRecipes
);
export default router;
