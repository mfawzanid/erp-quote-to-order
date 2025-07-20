import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex">

                <aside className="w-64 bg-gray-100 p-4 border-r">
                    <h2 className="text-xl font-bold mb-6">ERP Menu</h2>
                    <nav className="space-y-2">
                        <a
                            href="/quotations"
                            className="block bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded shadow-sm transition"
                        >
                            Quotation
                        </a>
                        <a
                            href="/sales-orders"
                            className="block bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded shadow-sm transition"
                        >
                            Sales Order
                        </a>
                    </nav>
                </aside>

                <main className="flex-1 p-6 bg-white">{children}</main>
            </body>
        </html>
    );
}
