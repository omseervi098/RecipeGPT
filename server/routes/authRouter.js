import { Router } from "express";
import {
  creatingUser,
  loginUser,
  googleAuth,
} from "../controllers/userController.js";
const router = Router();
router.post("/google/auth", googleAuth);
router.post("/register", creatingUser);
router.post("/login", loginUser);
export default router;
