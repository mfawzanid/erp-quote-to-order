import { Request, Response } from "express";
import * as authService from "../services/authService";
import { RegisterRequest } from "../types/auth";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
};

export const registerUser = async (req: Request, res: Response) => {
    const registerReq = req.body as RegisterRequest;

    const token = await authService.registerUser(registerReq);
    res.cookie("token", token, cookieOptions)
        .status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "error login: email is required" });
    }

    const token = await authService.loginUser(email);
    res.cookie("token", token, cookieOptions)
        .status(200).json({ token });
};