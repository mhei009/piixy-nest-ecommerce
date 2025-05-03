
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getMyOrders } from "../../../sanity/lib/orders/getMyOrders";
import { imageUrl } from "../../../lib/imageUrl";
import { formatCurrency } from "../../../lib/formatCurrency";

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
                                {/* order number and order status */}
                                <div className="p-4 sm:p-6 border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1 font-semibold">
                                                Order Number
                                            </p>
                                            <p className="font-mono text-sm text-green-500 break-all">
                                                {order.orderNumber}
                                            </p>
                                        </div>
                                        <div className="sm:text-right mt-4 sm:mt-0">
                                            <p className="text-sm text-gray-600 mb-1 font-semibold">
                                                Payment Status
                                            </p>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${
                                                    order.status === "paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items Section (Moved Above Receipt Style) */}
                                <div className="px-4 py-3 sm:px-6 sm:py-4">
                                    <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
                                        Order Items
                                    </p>
                                    <div className="space-y-3 sm:space-x-4">
                                        {order.products?.map((product) => (
                                            <div
                                                key={product.product?._id}
                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b last:border-b-0"
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    {product.product?.image && (
                                                        <div className="relative w-14 h-14 sm:w-16 sm:h-20 flex-shrink-0 rounded-md overflow-hidden">
                                                           <Image
    src={imageUrl(product.product.image).url()}
    alt={product.product?.name ?? ""}
    className="object-cover"
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
/>
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="text-sm font-semibold sm:text-base">
                                                            {product.product?.name}
                                                        </p>

                                                        <p className="text-sm text-gray-600">
                                                            Quantity: {product.quantity ?? "N/A"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="font-medium text-right">
                                                    {product.product?.price && product.quantity
                                                        ? formatCurrency(
                                                              product.product.price * product.quantity,
                                                              order.currency
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Receipt Style Section for Subtotal, Discount, and Total */}
                                <div className="p-4 sm:p-6 border-gray-200 mt-6 border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Original Subtotal</span>
                                        <span className="font-medium text-lg">
                                            {formatCurrency((order.totalPrice ?? 0) + (order.amountDiscount ?? 0), order.currency)}
                                        </span>
                                    </div>

                                    {order.amountDiscount ? (
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-red-500">Discount Applied</span>
                                            <span className="font-medium text-lg text-red-500">
                                                {formatCurrency(order.amountDiscount, order.currency)}
                                            </span>
                                        </div>
                                    ) : null}

                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-semibold">Total Amount</span>
                                        <span className="font-bold text-lg">
                                            {formatCurrency(order.totalPrice ?? 0, order.currency)}
                                        </span>
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
