import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createProduct = async (data: {
    name: string;
    unitPrice: number;
    quantity: number;
}) => {
    return prisma.product.create({ data });
};