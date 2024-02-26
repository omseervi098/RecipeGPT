import { Router } from "express";
import passport from "passport";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  rateRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";
const router = Router();
router.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  getAllRecipes
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getRecipeById
);
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
router.put("/", passport.authenticate("jwt", { session: false }), updateRecipe);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
export default router;
