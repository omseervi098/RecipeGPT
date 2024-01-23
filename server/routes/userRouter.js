import { Router } from "express";
import passport from "passport";
import {
  getAllUsers,
  updateFoodPreferences,
} from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";
const router = Router();
router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.put(
  "/updatefoodpref",
  passport.authenticate("jwt", { session: false }),
  updateFoodPreferences
);
export default router;
