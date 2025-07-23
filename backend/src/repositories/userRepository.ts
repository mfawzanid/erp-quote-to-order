import { PrismaClient } from "@prisma/client";
import { User, Role } from "@prisma/client";
import { RegisterRequest } from "../types/auth";

const prisma = new PrismaClient()

export async function findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function createUser(data: RegisterRequest): Promise<User> {
    return prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            role: data.role,
            customerId: data.role === "CUSTOMER" ? data.customerId : undefined,
        },
    });
}

