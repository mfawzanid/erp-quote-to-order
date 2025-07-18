import { Router } from "express";
import * as customerController from "../controllers/customerController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(customerController.createCustomer));

export default router;