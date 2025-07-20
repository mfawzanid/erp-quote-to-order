import { Router } from "express";
import * as productController from "../controllers/productController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(productController.createProduct));
router.get("/", asyncHandler(productController.getProducts));

export default router;