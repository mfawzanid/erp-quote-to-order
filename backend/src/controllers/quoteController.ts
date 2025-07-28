import { Request, Response } from "express";
import * as quoteService from "../services/quoteService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";


export const createQuotation = async (req: AuthenticatedRequest, res: Response) => {
    const { userId, customerId, role } = req.user!;

    if (role !== 'CUSTOMER') {
        return res.status(403).json({ message: "error create quotation: role is not allowed" });
    }
    if (!customerId) {
        return res.status(400).json({ message: "error create quotation: customerId is mandatory in token" });
    }

    const quote = await quoteService.createQuotation(req.body, customerId, userId);
    res.status(201).json(quote);
};

export const approveQuotation = async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = (req as AuthenticatedRequest).user!;
    const { id } = req.params;

    const item = await quoteService.approveQuotation({ id, userId });
    res.status(200).json(item);
};


export const getQuotations = async (req: AuthenticatedRequest, res: Response) => {
    const role = req.user?.role
    const customerId = req.user?.customerId

    const status = typeof req.query.status === "string" ? req.query.status : undefined

    const dateStr = typeof req.query.date === "string" ? req.query.date : undefined
    const date = dateStr ? new Date(dateStr) : undefined

    // set startAt and endAt to get all data in that date
    var startAt = new Date();
    var endAt = new Date();
    if (date) {
        startAt = new Date(date);
        startAt.setHours(0, 0, 0, 0);

        endAt = new Date(date)
        endAt.setHours(23, 59, 59, 999);
    }

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const result = await quoteService.getQuotations({
        role,
        customerId: role === "CUSTOMER" ? customerId : undefined,
        status,
        startAt,
        endAt,
        page,
        pageSize,
    });

    return res.status(200).json({
        page,
        pageSize,
        total: result.total,
        data: result.items
    })
};
