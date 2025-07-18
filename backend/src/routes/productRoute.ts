import { Router } from "express";
import * as productController from "../controllers/productController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(productController.createProduct));

export default router;