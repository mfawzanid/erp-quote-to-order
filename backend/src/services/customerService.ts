import * as customerRepo from "../repositories/customerRepository";

export const createCustomer = async (data: { name: string }) => {
    if (!data.name) throw new Error("error create customer: name is required");

    return customerRepo.createCustomer(data);
};