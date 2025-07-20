import axios from "axios";

export type Product = {
  id: string;
  name: string;
  unitPrice: number;
};

export const getProducts = async () => {
    const res = await axios.get("http://localhost:3000/products"); // TODO: put in envar
    return res.data;
};

export const createQuotation = async (payload: {
    customerId: string;
    items: { productId: string; quantity: number }[];
}) => {
    const res = await fetch("http://localhost:3000/quotations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Failed to create quotation");
    }

    return res.json();
};

export const getQuotations = async () => {
  const res = await axios.get("http://localhost:3000/quotations");
  return res.data;
};

export async function approveQuotation(id: string) {
  const res = await axios.put(`http://localhost:3000/quotations/${id}/approve`);
  return res.data;
}

export const getSalesOrders = async () => {
  const res = await axios.get("http://localhost:3000/sales-orders");
  return {
    items: res.data.data.items,
    total: res.data.total,
  };
};