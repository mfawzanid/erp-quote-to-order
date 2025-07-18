import { Request, Response } from "express";
import * as customerService from "../services/customerService";

export const createCustomer = async (req: Request, res: Response) => {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
};