"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuotations } from "../../services/api";
import { Quotation, QuotationCard } from "./QuotationCard";

export default function QuotationPage() {
    const [page, setPage] = useState(1);
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getQuotations();
            setQuotations(res.data);
            setTotalPages(Math.ceil(res.total / 5));
        };

        fetchData();
    }, [page]);

    const handleCreate = () => {
        router.push("/quotations/create");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quotations</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create Quotation
                </button>
            </div>

            {quotations.map((q) => (
                <QuotationCard key={q.id} quotation={q} />
            ))}

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
        </div>
    );
}