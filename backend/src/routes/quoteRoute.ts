import { Router } from "express";
import * as quoteController from "../controllers/quoteController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(quoteController.createQuotation));
router.put("/:id/approve", asyncHandler(quoteController.approveQuotation));
router.get("/", asyncHandler(quoteController.getQuotations));

export default router;