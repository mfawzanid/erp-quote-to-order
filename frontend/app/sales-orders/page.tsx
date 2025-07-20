"use client";

import { useEffect, useState } from "react";
import SalesOrderCard from "./SalesOrderCard";
import { getSalesOrders } from "../../services/api";

export default function SalesOrderPage() {
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const pageSize = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await getSalesOrders();
                setOrders(res.items ?? []);
                setTotalPages(Math.ceil(res.total / pageSize));
            } catch (err) {
                console.error("Failed to fetch sales orders:", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [page]);

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Sales Orders</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <p>No sales orders found</p>
                    ) : (
                        orders.map((order) => (
                            <SalesOrderCard key={order.id} order={order} />
                        ))
                    )}

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="self-center">Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
