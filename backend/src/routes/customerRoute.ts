import { Router } from "express";
import * as customerController from "../controllers/customerController";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticate(), asyncHandler(customerController.createCustomer));

export default router;