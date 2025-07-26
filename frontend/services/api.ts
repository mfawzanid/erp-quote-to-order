import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = 'http://localhost:3000'

export type Product = {
  id: string;
  name: string;
  unitPrice: number;
};

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`, { withCredentials: true });
    return res.data;
};

export const createQuotation = async (payload: {
    customerId: string;
    items: { productId: string; quantity: number }[];
}) => {
  const res = await fetch(`${API_URL}/quotations`, {
    credentials: "include",
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
  const res = await axios.get(`${API_URL}/quotations`, { withCredentials: true });
  return res.data;
};

export async function approveQuotation(id: string) {
  const res = await axios.put(`${API_URL}/quotations/${id}/approve`, { withCredentials: true });
  return res.data;
}

export const getSalesOrders = async () => {
  const res = await axios.get(`${API_URL}/sales-orders`, { withCredentials: true });
  return {
    items: res.data.data.items,
    total: res.data.total,
  };
};

export async function registerUser(name: string, email: string) {
  const res = await axios.post(`${API_URL}/auth/register`, { name, email }, { withCredentials: true });
  return res.data;
}

export async function login(email: string) {
  const res = await axios.post(`${API_URL}/auth/login`, { email }, { withCredentials: true });
  return res.data;
}