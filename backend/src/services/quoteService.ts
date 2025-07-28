import { QuotationStatus } from "@prisma/client";
import * as quoteRepo from "../repositories/quoteRepository";
import * as productRepo from "../repositories/productRepository";

type QuotationItem = {
    productId: string;
    quantity: number;
    unitPrice: number;
};

type CreateQuotationInput = {
    customerId: string;
    items: QuotationItem[];
};

export const createQuotation = async (
    data: CreateQuotationInput,
    createdBy: string,
) => {
    const { customerId, items } = data;

    if (!customerId) throw new Error('error create quotation: customer id is required');

    if (!Array.isArray(items) || items.length === 0)
        throw new Error('error create quotation: product item is mandatory');

    for (const item of items) {
        if (!item.productId || item.quantity <= 0) {
            throw new Error('error create quotation: product id or quantity is not valid');
        }
    }

    const productIds = items.map((item) => item.productId);
    const products = await productRepo.getProductsByIds(productIds);
    const productPriceMap = new Map(products.map((p) => [p.id, p.unitPrice]));

    const enrichedItems = items.map((item) => {
        const unitPrice = productPriceMap.get(item.productId);
        if (unitPrice === undefined) {
            throw new Error(`error create quotation: product not found for id ${item.productId}`);
        }

        return {
            ...item,
            unitPrice,
        };
    });

    return quoteRepo.createQuotation({
        customerId,
        status: QuotationStatus.PENDING,
        createdBy, 
        items: enrichedItems,
    });
};

export const approveQuotation = async (data: { id: string, userId: string }) => {
    if (!data.id) throw new Error("error approve quotation: quotation id is mandatory");
    if (!data.userId) throw new Error("error approve quotation: user id is mandatory");

    return quoteRepo.updateQuotationStatus({
        id: data.id,
        userId: data.userId,
        newStatus: QuotationStatus.APPROVED,
    });
};

export const getQuotations = async (params: {
    role?: string;
    customerId?: string;
    status?: string;
    startAt?: Date;
    endAt?: Date;
    page: number;
    pageSize: number;
}) => {
    const { role, customerId } = params;

    if (!role) {
        throw new Error("error get quotations: role is empty");
    }

    if (role === "CUSTOMER" && !customerId) {
        return {
            items: [],
            total: 0,
        };
    }

    return quoteRepo.getQuotations(params);
};