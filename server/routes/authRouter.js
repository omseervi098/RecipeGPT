import { Router } from "express";
import { creatingUser, loginUser } from "../controllers/userController.js";
const router = Router();

router.post("/register", creatingUser);
router.post("/login", loginUser);
export default router;
