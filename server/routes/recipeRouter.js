import { Router } from "express";
import passport from "passport";
import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipeController.js";
const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getRecipeById
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateRecipe
);
router.put("/", passport.authenticate("jwt", { session: false }), createRecipe);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
export default router;
