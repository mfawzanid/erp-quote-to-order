import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createProduct = async (data: {
    name: string;
    unitPrice: number;
    quantity: number;
}) => {
    return prisma.product.create({ data });
};

export const getProducts = async () => {
    return prisma.product.findMany({
        where: {
            quantity: {
                gt: 0,
            },
        },
        orderBy: {
            name: "asc",
        },
    });
};

export const getProductsByIds = async (ids: string[]) => {
    return prisma.product.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
};