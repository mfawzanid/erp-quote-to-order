import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository";
import { RegisterRequest } from "../types/auth";
import { generateToken } from "../utils/jwt";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function registerUser(registerReq: RegisterRequest): Promise<string> {
    if (!registerReq.role) throw new Error("error create user: role is required");
    if (registerReq.role === "CUSTOMER" && !registerReq.customerId) {
        throw new Error("error create user: customerId is required for CUSTOMER role");
    }

    let user = await userRepository.findUserByEmail(registerReq.email);
    if (user) throw new Error("error create user: user already exists");

    user = await userRepository.createUser(registerReq);

    return generateToken({ userId: user.id, role: registerReq.role });
}

export async function loginUser(email: string): Promise<string> {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("error login user: user not found");
    }

    return generateToken({ userId: user.id, role: user.role });
}

