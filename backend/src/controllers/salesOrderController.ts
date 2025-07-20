import { Request, Response } from "express";
import * as salesOrderService from "../services/salesOrderService";

export const createSalesOrder = async (req: Request, res: Response) => {
    const { quotationId } = req.body;
    if (!quotationId) {
        return res.status(400).json({ error: "error create sales order: quotation id is mandatory" });
    }

    const customer = await salesOrderService.createSalesOrder(quotationId);
    res.status(201).json(customer);
};

export const getSalesOrderByQuotationId = async (req: Request, res: Response) => {
    const { quotationId } = req.params;
    if (!quotationId) {
        return res.status(400).json({ error: "error get sales order: quotation id is mandatory" });
    }

    const order = await salesOrderService.getSalesOrderByQuotationId(quotationId);
    if (!order) {
        return res.status(404).json({ error: "error get sales order: sales order not found" });
    }
    res.status(200).json(order);
};

export const getSalesOrders = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const result = await salesOrderService.getSalesOrders({
        page,
        pageSize,
    });

    return res.status(200).json({
        page,
        pageSize,
        total: result.total,
        data: result
    })
};