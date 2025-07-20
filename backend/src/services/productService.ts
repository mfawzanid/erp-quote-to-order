import * as productRepo from "../repositories/productRepository";

export const createProduct = async (data: {
    name: string;
    unitPrice: number;
    quantity: number;
}) => {
    const { name, unitPrice, quantity } = data;

    if (!name) throw new Error("error create product: product name is required");
    if (unitPrice < 0) throw new Error("error create product: unit price must be positive");
    if (quantity < 0) throw new Error("error create product: quantity must be positive");

    return productRepo.createProduct({ name, unitPrice, quantity });
};

export const getProducts = async () => {
    return productRepo.getProducts();
};