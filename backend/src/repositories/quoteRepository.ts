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

export const updateQuotationStatus = async (params: {
    id: string;
    userId: string;
    newStatus: QuotationStatus;
}) => {
    const { id, userId, newStatus } = params;

    return await prisma.$transaction(async (tx) => {
        const existingQuotation = await tx.quotation.findUnique({
            where: { id },
            select: { status: true },
        });

        if (!existingQuotation) {
            throw new Error("error repo update quotation status: id not found");
        }

        const oldStatus = existingQuotation.status;

        await tx.quotation.update({
            where: { id },
            data: {
                status: newStatus,
                updatedBy: userId,
            },
        });

        await tx.quotationStatusHistory.create({
        data: {
                quotationId: id,
                oldStatus,
                newStatus,
                changedBy: userId,
        },
    });

        return { success: true };
    });
};

export const getQuotations = async (params: {
    customerId?: string;
    status?: string;
    startAt?: Date;
    endAt?: Date;
    page: number;
    pageSize: number;
}) => {
    const { customerId, status, startAt, endAt, page, pageSize } = params;

    const where: Prisma.QuotationWhereInput = {};

    if (customerId) {
        where.customerId = customerId;
    }

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

export const createStatusHistory = async (data: {
    quotationId: string;
    oldStatus: QuotationStatus;
    newStatus: QuotationStatus;
    changedByUserId: string;
}) => {
    return prisma.quotationStatusHistory.create({
        data: {
            quotationId: data.quotationId,
            oldStatus: data.oldStatus,
            newStatus: data.newStatus,
            changedBy: data.changedByUserId,
        },
    });
};