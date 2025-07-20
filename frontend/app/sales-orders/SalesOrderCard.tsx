// import { SalesOrder } from "./dummySalesOrders";

export type SalesOrder = {
  id: string;
  quotationId: string;
  status: "NEW" | "PROCESSING" | "COMPLETED";
  createdAt: string;
    customer: {
        id: string;
        name: string;
    };
};

export default function SalesOrderCard({ order }: { order: SalesOrder }) {
  return (
    <div className="border p-4 rounded shadow mb-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{order.customer.name}</p>
          <p className="text-sm text-gray-500">
            Quotation: {order.quotationId}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div
          className={`text-xs px-2 py-1 rounded ${
            order.status === "NEW"
              ? "bg-yellow-200"
              : order.status === "PROCESSING"
              ? "bg-blue-200"
              : "bg-green-200"
          }`}
        >
          {order.status}
        </div>
      </div>
    </div>
  );
}
