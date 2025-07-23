import { Router } from "express";
import * as salesOrderController from "../controllers/salesOrderController";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/authMiddleware";
import { Role } from "../types/role";

const router = Router();


router.post("/", authenticate([Role.SALES]), asyncHandler(salesOrderController.createSalesOrder));
router.get("/:quotationId", authenticate(), salesOrderController.getSalesOrderByQuotationId);
router.get("/", authenticate(), salesOrderController.getSalesOrders);

export default router;