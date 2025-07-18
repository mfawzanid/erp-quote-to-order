import { QuotationStatus } from "@prisma/client";
import * as quoteRepo from "../repositories/quoteRepository";

type QuotationItem = {
    productId: string;
    quantity: number;
    unitPrice: number;
};

type CreateQuotationInput = {
    customerId: string;
    items: QuotationItem[];
};

export const createQuotation = async (data: CreateQuotationInput) => {
    const { customerId, items } = data;

    if (!customerId) throw new Error('error create quotation: customer id is required');

    if (!Array.isArray(items) || items.length === 0)
        throw new Error('error create quotation: product item is mandatory');

    for (const item of items) {
        if (!item.productId || item.quantity <= 0 || item.unitPrice < 0) {
            throw new Error('error create quotation: product id, quantity, and unit price is not valid');
        }
    }

    return quoteRepo.createQuotation({
        customerId,
        status: QuotationStatus.PENDING,
        createdBy: "todo", // TODO
        items,
    });
};

export const approveQuotation = async (data: { id: string }) => {
    if (!data.id) throw new Error("error approve quotation: quotation id is mandatory");

    return quoteRepo.updateQuotationStatus({
        id: data.id,
        status: QuotationStatus.APPROVED,
    });
};

export const getQuotations = async (params: {
    status?: string;
    startAt?: Date;
    endAt?: Date;
    page: number;
    pageSize: number;
}) => {
    return quoteRepo.getQuotations(params);
};