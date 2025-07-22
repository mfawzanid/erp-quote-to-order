import { Request, Response } from "express";
import * as authService from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
    const registerReq = req.body as RegisterRequest;

    const token = await authService.registerUser(registerReq);
    res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "error login: email is required" });
    }

    const token = await authService.loginUser(email);
    res.status(200).json({ token });
};