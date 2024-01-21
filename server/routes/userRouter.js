import { Router } from "express";
import passport from "passport";
import { getAllUsers } from "../controllers/userController.js";
const router = Router();
router.get('/', passport.authenticate('jwt', { session: false }), getAllUsers);
export default router;