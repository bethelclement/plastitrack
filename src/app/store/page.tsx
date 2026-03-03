"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StorePage() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // In a real app we fetch from `products`
        // using mock data for the demo view while allowing it to pull from DB if seeded
        async function load() {
            const { data } = await supabase.from('products').select('*');
            if (data && data.length > 0) {
                setProducts(data);
            } else {
                setProducts([
                    {
                        id: '1',
                        name: "Recycled PET Tote Bag",
                        description: "Durable woven tote bag made entirely from recovered PET bottles.",
                        price_naira: 4500,
                        points_price: 1500,
                        plastic_category_used: "PET",
                        approx_weight_diverted: 1.5,
                        made_by: "Blessn Evea Signature (Kuchingoro Hub Women)",
                    },
                    {
                        id: '2',
                        name: "Eco-Pavers (1 SQM)",
                        description: "Interlocking paving stones made from molten HDPE and sand.",
                        price_naira: 8000,
                        points_price: 3000,
                        plastic_category_used: "HDPE",
                        approx_weight_diverted: 5.0,
                        made_by: "Blessn Evea Signature (Durumi Hub)",
                    },
                ]);
            }
        }
        load();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">ReVamp Store</h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                        Purchase beautifully upcycled products. Every item comes with traceability detailing its source and the amount of plastic diverted from landfills.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                                <img src="/revamp-logo.png" alt="ReVamp Store Logo" className="w-24 h-24 object-contain opacity-50 mix-blend-multiply" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                                    ₦{product.price_naira.toLocaleString()}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-6 flex-1">{product.description}</p>

                                <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-100/50">
                                    <h4 className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-2">Traceability Report</h4>
                                    <ul className="space-y-2 text-sm text-green-700">
                                        <li className="flex justify-between">
                                            <span className="opacity-80">Category Used:</span>
                                            <span className="font-medium">{product.plastic_category_used}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="opacity-80">Weight Diverted:</span>
                                            <span className="font-medium">{product.approx_weight_diverted} kg</span>
                                        </li>
                                        <li className="text-xs mt-2 pt-2 border-t border-green-200/50 text-green-800/80">
                                            Made by: <span className="font-medium">{product.made_by}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center">
                                        Buy Now
                                    </button>
                                    {product.points_price && (
                                        <button className="flex-1 bg-white border-2 border-primary text-primary py-2 px-4 rounded-lg font-medium hover:bg-primary/5 transition-colors text-center text-sm">
                                            Use {product.points_price} Pts
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
