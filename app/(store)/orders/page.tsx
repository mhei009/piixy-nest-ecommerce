import { formatCurrency } from "@/lib/formatCurrency";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Orders() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p>No placed Orders</p>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-8">
                        {orders.map((order) => (
                            <div
                                key={order.orderNumber}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="p-4 sm:p-6 border-gray-200">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1 font-semibold">
                                                Order Number
                                            </p>
                                            <p className="font-mono text-sm text-green-500 break-all">
                                                {order.orderNumber}
                                            </p>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-sm text-gray-600 mb-1 font-semibold">
                                                Order Date
                                            </p>
                                            <p className="font-medium">
                                                {order.orderDate
                                                    ? new Date(order.orderDate).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center>">
                                    <div className="flex items-center">
                                        <span className="text-sm mr-2">Status</span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${order.status === "paid"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}>
                                            {order.status}
                                        </span>
                               

                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                            
                                            <p className="font-bold text-lg">{formatCurrency(order.totalPrice ?? 0, order.currency)}

                                            </p>
                                            </div>

                                    </div>
                                
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
