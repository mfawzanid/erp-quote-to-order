import { Prisma, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient()

export const createSalesOrderFromQuotation = async (quotation: {
    id: string;
    customerId: string;
    createdBy: string;
    items: {
        productId: string;
        quantity: number;
        unitPrice: number;
    }[];
}) => {
    return prisma.salesOrder.create({
        data: {
            quotationId: quotation.id,
            customerId: quotation.customerId,
            createdBy: quotation.createdBy,
            items: {
                create: quotation.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                })),
            },
        },
        include: { items: true },
    });
};

export const getSalesOrderByQuotationId = async (quotationId: string) => {
    return prisma.salesOrder.findFirst({
        where: { quotationId },
        include: {
            items: {
                include: { product: true },
            },
        },
    });
};

export const getSalesOrders = async (params: {
    page: number;
    pageSize: number;
}) => {
    const { page, pageSize } = params;

    const [items, total] = await Promise.all([
        prisma.salesOrder.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            include: {
                customer: true,
                items: {
                    include: { product: true },
                },
            },
        }),
        prisma.salesOrder.count(),
    ]);

    return { items, total };
};
