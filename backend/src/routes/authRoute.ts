import { Router } from "express";
import * as authController from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(authController.registerUser));
router.post("/login", asyncHandler(authController.login));

export default router;