import { Router } from "express";
import * as productController from "../controllers/productController";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticate);

router.post("/", asyncHandler(productController.createProduct));
router.get("/", asyncHandler(productController.getProducts));

export default router;