"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";

export default function ProductsPage() {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
                <button className="bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    + Add New Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center py-20 bg-gray-50/50">
                <PackageSearch className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Inventory Management</h2>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">Create and update ReVamp Store listings with traceability metrics here.</p>
            </div>
        </div>
    );
}
