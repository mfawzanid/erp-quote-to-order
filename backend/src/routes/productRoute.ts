import { Router } from "express";
import * as productController from "../controllers/productController";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticate(), asyncHandler(productController.createProduct));
router.get("/", authenticate(), asyncHandler(productController.getProducts));

export default router;