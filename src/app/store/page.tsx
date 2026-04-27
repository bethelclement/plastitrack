"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Search, X } from "lucide-react";

const CATEGORIES = [
    "All",
    "Home and décor",
    "Bags and lifestyle",
    "Waste bins and organisers",
    "Furniture and upcycled builds",
    "Limited drops",
];

const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "ReVamp Trial Disc (Green)",
        description: "1st trial upcycled disc crafted entirely from compressed HDPE and PP waste. Designed to demonstrate the structural integrity of melted waste plastics for future use as eco-pavers or modular furniture bases.",
        price: 5000,
        category: "Furniture and upcycled builds",
        images: ["/images/trial-disc-green.jpg"],
        plastic_used: "HDPE & PP mix (bottle caps and rigid containers)",
        weight_diverted: 1.8,
        made_by: "Blessn Evea Signature (Durumi Hub)",
    },
    {
        id: "2",
        name: "ReVamp Trial Disc (Mixed Color)",
        description: "Vibrant mixed-color disc showing the potential of un-dyed, color-sorted plastic waste. A testament to our transparent sorting and upcycling process, turning local pollution into valuable raw materials.",
        price: 5500,
        category: "Home and décor",
        images: ["/images/trial-disc-1st.jpg"],
        plastic_used: "Mixed rigid plastics (HDPE primary)",
        weight_diverted: 2.1,
        made_by: "Blessn Evea Signature (Kuchingoro Garamajiji axis)",
    },
    {
        id: "3",
        name: "Waste Bin Concept (Modular)",
        description: "Stackable upcycled waste bin organizers designed to help households separate waste easily at the source.",
        price: 15000,
        category: "Waste bins and organisers",
        images: ["/plastitrackbes-logo.png"],
        plastic_used: "PP & PET mix",
        weight_diverted: 4.5,
        made_by: "Blessn Evea Signature",
    },
    {
        id: "4",
        name: "Eco-Planters (Set of 3)",
        description: "Beautiful, weather-resistant planters for your home garden or balcony, crafted from recovered single-use packaging.",
        price: 12000,
        category: "Home and décor",
        images: ["/plastitrackbes-logo.png"],
        plastic_used: "LDPE & HDPE",
        weight_diverted: 3.2,
        made_by: "Blessn Evea Signature",
    },
    {
        id: "5",
        name: "Recycled PET Tote Bag",
        description: "Durable, fashionable woven tote bag made entirely from recovered PET bottles.",
        price: 4500,
        category: "Bags and lifestyle",
        images: ["/plastitrackbes-logo.png"],
        plastic_used: "PET",
        weight_diverted: 1.5,
        made_by: "Blessn Evea Signature",
    },
];

export default function StorePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [checkoutProduct, setCheckoutProduct] = useState<any | null>(null);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const filteredProducts =
        selectedCategory === "All"
            ? MOCK_PRODUCTS
            : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderSuccess(true);
        setTimeout(() => {
            setCheckoutProduct(null);
            setOrderSuccess(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Store Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                            ReVamp! Store
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-500">
                            Purchase premium upcycled products. Every item comes with guaranteed traceability detailing its source and the exact amount of plastic diverted from landfills.
                        </p>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto no-scrollbar">
                    <div className="flex space-x-2 md:justify-center min-w-max">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === cat
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                        >
                            <div className="h-64 bg-gray-50 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 transition-colors">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-32 h-32 object-contain opacity-40 mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-black text-gray-900 shadow-sm border border-gray-100">
                                    ₦{product.price.toLocaleString()}
                                </div>
                                <div className="absolute top-4 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                                    {product.category.split(' ')[0]}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="bg-green-50/50 rounded-xl p-5 mb-8 border border-green-100">
                                    <h4 className="text-xs font-bold text-green-800 uppercase tracking-widest mb-3 flex items-center">
                                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Traceability Block
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-green-700">
                                        <li className="flex justify-between items-center">
                                            <span className="opacity-70 text-xs uppercase tracking-wider font-semibold">Plastic Used</span>
                                            <span className="font-semibold">{product.plastic_used}</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="opacity-70 text-xs uppercase tracking-wider font-semibold">Weight Diverted</span>
                                            <span className="font-semibold">{product.weight_diverted} kg</span>
                                        </li>
                                        <li className="text-xs mt-3 pt-3 border-t border-green-200/50 text-green-800/80 leading-relaxed font-medium">
                                            Made by: <span className="font-bold text-green-900">{product.made_by}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => setCheckoutProduct(product)}
                                        className="w-full bg-gray-900 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center group-hover:bg-primary"
                                    >
                                        Proceed to Checkout
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Checkout Modal */}
            {checkoutProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                        onClick={() => !orderSuccess && setCheckoutProduct(null)}
                    ></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                        {orderSuccess ? (
                            <div className="p-10 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                                <p className="text-gray-500">
                                    Your "Pay on Delivery" order for the {checkoutProduct.name} has been processed. We will contact you shortly for delivery!
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="text-lg font-bold text-gray-900">Secure Checkout</h3>
                                    <button
                                        onClick={() => setCheckoutProduct(null)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center space-x-4 mb-6 bg-gray-50 p-4 rounded-xl">
                                        <img src={checkoutProduct.images[0]} alt="product" className="w-12 h-12 mix-blend-multiply opacity-50" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{checkoutProduct.name}</h4>
                                            <p className="text-sm font-semibold text-primary">₦{checkoutProduct.price.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleCheckout}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input required type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-4 py-2 border" placeholder="e.g. Ojeka Jane" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address (Abuja)</label>
                                                <textarea required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-4 py-2 border" rows={2} placeholder="Full address" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input required type="tel" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-4 py-2 border" placeholder="080..." />
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-gray-100">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-gray-600 font-medium">Payment Method</span>
                                                <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md text-sm">Pay on Delivery</span>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-primary text-white py-3.5 px-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
                                            >
                                                Confirm Order — ₦{checkoutProduct.price.toLocaleString()}
                                            </button>
                                            <p className="text-center text-xs text-gray-400 mt-4">
                                                (Structure ready for Paystack integration later)
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
