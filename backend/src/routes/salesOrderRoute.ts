import { Router } from "express";
import * as salesOrderController from "../controllers/salesOrderController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(salesOrderController.createSalesOrder));
router.get("/:quotationId", salesOrderController.getSalesOrderByQuotationId);
router.get("/", salesOrderController.getSalesOrders);

export default router;