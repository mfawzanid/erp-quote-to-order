import { QuotationStatus, PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

export const createQuotation = async (data: {
    customerId: string;
    status: QuotationStatus;
    createdBy: string;
    items: {
        productId: string;
        quantity: number;
        unitPrice: number;
    }[];
}) => {
    return prisma.quotation.create({
        data: {
            customerId: data.customerId,
            status: data.status,
            createdBy: data.createdBy,
            items: {
                create: data.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                })),
            },
        },
        include: {
            items: true,
        },
    });
};

export const updateQuotationStatus = async (data: { id: string; status: string }) => {
    return prisma.quotation.update({
        where: {
            id: data.id,
        },
        data: {
            status: data.status as QuotationStatus,
        },
    });
};

export const getQuotations = async (params: {
    status?: string;
    startAt?: Date;
    endAt?: Date;
    page: number;
    pageSize: number;
}) => {
    const { status, startAt, endAt, page, pageSize } = params;

    const where: Prisma.QuotationWhereInput = {};

    if (status && Object.values(QuotationStatus).includes(status as QuotationStatus)) {
        where.status = status as QuotationStatus;
    }

    if (startAt) {
        where.createdAt = {
            gte: startAt,
        };
    }
    if (endAt) {
        where.createdAt = {
            lte: endAt,
        };
    }

    const [items, total] = await Promise.all([
        prisma.quotation.findMany({
            where,
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
        prisma.quotation.count({ where }),
    ]);

    return { items, total };
};

export const getQuotationWithProductItems = async (id: string) => {
    return prisma.quotation.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
};