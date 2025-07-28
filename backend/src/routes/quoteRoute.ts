import { Router } from "express";
import * as quoteController from "../controllers/quoteController";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/authMiddleware";
import { Role } from "../types/role";

const router = Router();

router.post("/", authenticate([Role.CUSTOMER]), asyncHandler(quoteController.createQuotation));
router.put("/:id/approve", authenticate([Role.SALES]), asyncHandler(quoteController.approveQuotation));
router.get("/", authenticate(), asyncHandler(quoteController.getQuotations));

export default router;