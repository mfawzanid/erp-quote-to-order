import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createCustomer = async (data: { name: string }) => {
    return prisma.customer.create({
        data: {
            name: data.name,
        },
    });
};