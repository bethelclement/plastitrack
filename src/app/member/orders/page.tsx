"use client";

import { Package, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-16">
                <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">You haven't purchased any items from the ReVamp Store yet.</p>
                <a href="/store" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Store
                </a>
            </div>
        </div>
    );
}
