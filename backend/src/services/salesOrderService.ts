import * as quoteRepo from "../repositories/quoteRepository";
import * as salesOrderRepo from "../repositories/salesOrderRepository";

export const createSalesOrder = async (quotationId: string) => {
    const quotation = await quoteRepo.getQuotationWithProductItems(quotationId);

    if (!quotation) throw new Error("error create sales order: quotation not found");
    if (quotation.status !== "APPROVED") throw new Error("error create sales order: quotation is not approved yet");

    const order = await salesOrderRepo.createSalesOrderFromQuotation({
        id: quotation.id,
        customerId: quotation.customerId,
        createdBy: "todo", // TODO
        items: quotation.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        })),
    });

    return order;
};

export const getSalesOrderByQuotationId = async (quotationId: string) => {
    return salesOrderRepo.getSalesOrderByQuotationId(quotationId);
};

export const getSalesOrders = async (params: {
    page: number;
    pageSize: number;
}) => {
    return salesOrderRepo.getSalesOrders(params);
};