"use client";

import { useState } from "react";
import { approveQuotation } from "../../services/api";

export type Quotation = {
    id: string;
    customerId: string;
    status: string;
    createdAt: string;
    createdBy: string;
    customer: {
        id: string;
        name: string;
    };
};

export function QuotationCard({ quotation }: { quotation: Quotation }) {
    const [status, setStatus] = useState(quotation.status);
    const isApproved = status === "APPROVED";
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setLoading(true);
        try {
            await approveQuotation(quotation.id);
            setStatus("APPROVED");
        } catch (error) {
            console.error("Failed to approve quotation", error);
            alert("Failed to approve. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-4 rounded shadow">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold">{quotation.customer.name}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(quotation.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-xs bg-yellow-200 px-2 py-1 rounded">
                    {status}
                </div>
            </div>

            {!isApproved && (
                <div className="mt-3 flex gap-2">
                    <button
                        onClick={handleApprove}
                        disabled={loading}
                        className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 text-sm disabled:opacity-50"
                    >
                        {loading ? "Approving..." : "Approve"}
                    </button>
                </div>
            )}
        </div>
    );
}
