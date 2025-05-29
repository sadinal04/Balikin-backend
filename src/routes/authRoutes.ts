import express from "express";
import { register, login, getProfile } from "../controllers/authController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

export default router;
