import { Request, Response } from "express";
import * as productService from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
};

export const getProducts = async (req: Request, res: Response) => {
    const order = await productService.getProducts();
    res.status(200).json(order);
};