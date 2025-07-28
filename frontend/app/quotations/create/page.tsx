"use client";

import { useEffect, useState } from "react";
import { Product, getProducts, createQuotation } from "../../../services/api";
import { useRouter } from "next/navigation";

export default function CreateQuotationPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productId, setProductId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [items, setItems] = useState<{ product: Product; quantity: number }[]>(
        []
    );
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
            if (data.length > 0) {
                setProductId(data[0].id);
            }
        };
        fetchProducts();
    }, []);

    const addItem = () => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        setItems([...items, { product, quantity }]);
        setQuantity(1);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                items: items.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            };
        
            const data = await createQuotation(payload);
        
            alert("Quotation submitted successfully");
            router.push("/quotations");
        } catch (err) {
            console.error(err);
            alert("Failed to submit quotation");
        }
    };

    const total = items.reduce(
        (sum, item) => sum + item.product.unitPrice * item.quantity,
        0
    );

    return (
        <div className="p-4 space-y-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">Create Quotation</h1>

            <div>
                <label className="block text-sm font-medium mb-1">Product</label>
                <select
                    value={productId ?? ""}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full border rounded p-2"
                >
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name} (Rp{product.unitPrice})
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-2 items-end">
                <div>
                    <label className="block text-sm font-medium">Qty</label>
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-24 border rounded p-2"
                    />
                </div>

                <button
                    onClick={addItem}
                    disabled={!productId}
                    className="bg-blue-500 text-white px-4 py-2 rounded h-[42px] mt-auto disabled:opacity-50"
                >
                    Add
                </button>
            </div>

            {items.length > 0 && (
                <div className="border-t pt-4 space-y-2">
                    <h2 className="font-semibold">Items</h2>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between border p-2 rounded"
                        >
                            <div>
                                {item.product.name} × {item.quantity}
                            </div>
                            <div>Rp{item.product.unitPrice * item.quantity}</div>
                        </div>
                    ))}
                    <div className="font-bold text-right">Total: Rp{total}</div>
                </div>
            )}

            <button className="bg-green-600 text-white px-4 py-2 rounded w-full"
                onClick={handleSubmit}
            >
                Submit Quotation
            </button>
        </div>
    );
}
