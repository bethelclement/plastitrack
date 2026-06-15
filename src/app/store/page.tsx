"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Search, X, Leaf, Award, MapPin, ShieldCheck, ShoppingBag } from "lucide-react";

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
        name: "Recycled Keychains",
        description: "Beautiful, colorful keychains made from recycled PET bottles. Affordable and perfect for everyday use.",
        price: 2000,
        category: "Accessories",
        images: ["/images/keychains.jpg"],
        plastic_used: "PET",
        weight_diverted: 0.1,
        made_by: "Blessn Evea Signature",
    },
    {
        id: "4",
        name: "Upcycled Earrings",
        description: "Elegant, stylish earrings crafted from recovered single-use plastics. Beautiful eco-friendly jewelry.",
        price: 3000,
        category: "Jewelry",
        images: ["/images/earring-model.jpg", "/images/earring-close.jpg"],
        plastic_used: "PET & HDPE",
        weight_diverted: 0.05,
        made_by: "Blessn Evea Signature",
    },
    {
        id: "5",
        name: "Recycled Bangles",
        description: "Fashionable, colorful bangles made entirely from recovered plastics. Wear your impact.",
        price: 4500,
        category: "Jewelry",
        images: ["/images/store-bangles.png"],
        plastic_used: "HDPE",
        weight_diverted: 0.2,
        made_by: "Blessn Evea Signature",
    },
    {
        id: "6",
        name: "PET Broom",
        description: "Durable and eco-friendly broom made from repurposed PET plastic bottles.",
        price: 10000, // Updated from 2000 to 10000 Naira
        category: "Home and décor",
        images: ["/images/pet-broom.jpg"],
        plastic_used: "PET",
        weight_diverted: 0.5,
        made_by: "Blessn Evea Signature",
    },
    {
        id: "7",
        name: "Upcycled PET Plant Decor",
        description: "Beautiful decorative artificial plant crafted entirely from repurposed green PET bottles.",
        price: 3000,
        category: "Home and décor",
        images: ["/images/pet-plant.jpg"],
        plastic_used: "Green PET",
        weight_diverted: 0.3,
        made_by: "Blessn Evea Signature",
    },
];

export default function StorePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [checkoutProduct, setCheckoutProduct] = useState<any | null>(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState("");

    // Form states
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const filteredProducts =
        selectedCategory === "All"
            ? MOCK_PRODUCTS
            : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        const trackingId = "PT-" + Math.floor(100000 + Math.random() * 900000);
        setTrackingNumber(trackingId);

        // Build Traceability object
        const customOrderData = {
            id: trackingId,
            type: "order",
            itemName: checkoutProduct.name,
            contributor: checkoutProduct.made_by.includes("Durumi") ? "Durumi Eco-Club" : "Kuchingoro household",
            hub: checkoutProduct.made_by.includes("Durumi") ? "Durumi Settlement Hub" : "Kuchingoro Garamajiji Hub",
            material: checkoutProduct.plastic_used,
            weight: `${checkoutProduct.weight_diverted} kg`,
            co2Saved: `${(checkoutProduct.weight_diverted * 1.5).toFixed(2)} kg`,
            landfillSaved: `${(checkoutProduct.weight_diverted * 30).toFixed(0)} Liters`,
            energySaved: `${(checkoutProduct.weight_diverted * 5.6).toFixed(1)} kWh`,
            points: Math.round(checkoutProduct.weight_diverted * 100),
            certificateNo: `CERT-2026-${trackingId.split("-")[1]}`,
            timeline: [
                {
                    title: "Material Collection",
                    description: `Recovered ${checkoutProduct.weight_diverted} kg of ${checkoutProduct.plastic_used} waste from community households.`,
                    date: "June 12, 2026",
                    location: checkoutProduct.made_by.includes("Durumi") ? "Durumi Settlement, Abuja" : "Kuchingoro Axis, Abuja",
                    operator: "Aisha M. (Eco Contributor)",
                    icon: "leaf"
                },
                {
                    title: "Weighing & Digital Logging",
                    description: `Weighed, verified, and digitally logged. Earned ${Math.round(checkoutProduct.weight_diverted * 10)} points added to contributor's profile.`,
                    date: "June 13, 2026",
                    location: checkoutProduct.made_by.includes("Durumi") ? "Durumi Settlement Hub" : "Kuchingoro Garamajiji Hub",
                    operator: "Fatima Yusuf (Hub Officer)",
                    icon: "shield"
                },
                {
                    title: "Sorting & Processing",
                    description: "Bottles sorted, cleaned, label adhesives removed, and shredded/prepped for manufacturing.",
                    date: "June 14, 2026",
                    location: checkoutProduct.made_by.includes("Durumi") ? "Durumi Processing Depot" : "Kuchingoro Processing Center",
                    operator: "Blessing E. (Sorting Lead)",
                    icon: "map"
                },
                {
                    title: "Upcycle Crafting",
                    description: `Processed and manufactured into the durable eco-friendly ${checkoutProduct.name}.`,
                    date: "June 15, 2026",
                    location: "Blessn Evea Signature Workshop",
                    operator: "Blessn Evea Craft Team",
                    icon: "award"
                },
                {
                    title: "Store Order & Delivery",
                    description: "Purchased by customer. Dispatched via eco-friendly local distribution routes.",
                    date: "June 15, 2026",
                    location: "Abuja Central Delivery Route",
                    operator: `${customerName} (Customer Order #${trackingId.split("-")[1]})`,
                    icon: "shopping-bag"
                }
            ]
        };

        // Save order to localStorage so it is traceable on the Traceability page
        try {
            const existingOrders = JSON.parse(localStorage.getItem("custom_orders") || "[]");
            existingOrders.push(customOrderData);
            localStorage.setItem("custom_orders", JSON.stringify(existingOrders));
        } catch (err) {
            console.error(err);
        }

        setOrderSuccess(true);
    };

    const handleCloseModal = () => {
        setCheckoutProduct(null);
        setOrderSuccess(false);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            {/* Store Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
                            ReVamp! Store
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
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
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                    selectedCategory === cat
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-800/80 overflow-hidden flex flex-col group hover:shadow-md dark:hover:shadow-green-950/20 transition-all duration-300"
                        >
                            <div className="h-64 bg-gray-55 dark:bg-gray-950 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-gray-900/50 transition-colors">
                                {/* Fixed opacity-40 and mix-blend-multiply to show clear images */}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-black text-gray-900 dark:text-white shadow-sm border border-gray-150 dark:border-gray-800">
                                    ₦{product.price.toLocaleString()}
                                </div>
                                <div className="absolute top-4 left-4 bg-primary/10 text-primary dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                                    {product.category.split(' ')[0]}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="bg-green-50/30 dark:bg-green-950/10 rounded-xl p-5 mb-8 border border-green-100/50 dark:border-green-900/20">
                                    <h4 className="text-xs font-bold text-green-800 dark:text-green-400 uppercase tracking-widest mb-3 flex items-center">
                                        <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-600 dark:text-green-500" /> Traceability Block
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-green-700 dark:text-green-300">
                                        <li className="flex justify-between items-center">
                                            <span className="opacity-70 text-xs uppercase tracking-wider font-semibold">Plastic Used</span>
                                            <span className="font-semibold">{product.plastic_used}</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="opacity-70 text-xs uppercase tracking-wider font-semibold">Weight Diverted</span>
                                            <span className="font-semibold">{product.weight_diverted} kg</span>
                                        </li>
                                        <li className="text-xs mt-3 pt-3 border-t border-green-150/40 dark:border-green-900/25 text-green-850 dark:text-green-200/90 leading-relaxed font-medium">
                                            Made by: <span className="font-bold text-green-900 dark:text-white">{product.made_by}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => setCheckoutProduct(product)}
                                        className="w-full bg-gray-900 dark:bg-gray-800 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors flex items-center justify-center group-hover:bg-primary"
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
                        className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm"
                        onClick={() => !orderSuccess && handleCloseModal()}
                    ></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl w-full max-w-md overflow-hidden transform transition-all border border-gray-100 dark:border-gray-800 animate-scale-in">
                        {orderSuccess ? (
                            <div className="p-10 text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-primary dark:text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Congrats!</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    Your order for the {checkoutProduct.name} is on the way. We will contact you shortly for delivery!
                                </p>
                                <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg border border-gray-250 dark:border-gray-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Receipt Tracking Number:</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white tracking-wider font-mono">{trackingNumber}</p>
                                    <p className="text-[10px] text-gray-400 mt-2">
                                        Use this ID on the <Link href="/traceability" className="text-primary font-bold hover:underline">Traceability Page</Link> to inspect its raw material lifecycle.
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="mt-6 w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Secure Checkout</h3>
                                    <button
                                        onClick={handleCloseModal}
                                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-200"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6 max-h-[75vh] overflow-y-auto">
                                    <div className="flex items-center space-x-4 mb-6 bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                                        <img
                                            src={checkoutProduct.images[0]}
                                            alt="product"
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{checkoutProduct.name}</h4>
                                            <p className="text-sm font-semibold text-primary dark:text-green-400">₦{checkoutProduct.price.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleCheckout}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={customerName}
                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                    className="w-full bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-850 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-4 py-2 border text-gray-900 dark:text-white"
                                                    placeholder="e.g. Ojeka Jane"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    value={customerPhone}
                                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                                    className="w-full bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-850 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-4 py-2 border text-gray-900 dark:text-white"
                                                    placeholder="080..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                                                <textarea
                                                    required
                                                    value={customerAddress}
                                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                                    className="w-full bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-850 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-4 py-2 border text-gray-900 dark:text-white"
                                                    rows={2}
                                                    placeholder="Full address"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl">
                                                <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Bank Transfer Details</h5>
                                                <p className="text-sm text-blue-800 dark:text-blue-400">Please transfer <strong>₦{checkoutProduct.price.toLocaleString()}</strong> to:</p>
                                                <div className="mt-2 bg-white dark:bg-gray-950 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                                    <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">9063877010</p>
                                                    <p className="text-sm font-medium text-gray-750 dark:text-gray-300">FCMB</p>
                                                    <p className="text-sm font-medium text-gray-750 dark:text-gray-300">Blessn Evea Signature</p>
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Receipt</label>
                                                <input
                                                    required
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    className="w-full bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-850 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-4 py-2 border text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-primary text-white py-3.5 px-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
                                            >
                                                I Have Made The Transfer
                                            </button>
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
