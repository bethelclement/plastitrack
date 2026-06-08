"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, User, ShoppingBag, ArrowRight, ShieldCheck, Download, Award, X, Sparkles, Leaf } from "lucide-react";

interface TimelineStep {
    title: string;
    description: string;
    date: string;
    location: string;
    operator: string;
    icon: React.ReactNode;
}

interface TracedData {
    id: string;
    type: "order" | "contribution";
    itemName: string;
    contributor: string;
    hub: string;
    material: string;
    weight: string;
    co2Saved: string;
    landfillSaved: string;
    energySaved: string;
    points: number;
    certificateNo: string;
    timeline: TimelineStep[];
}

const MOCK_TRACED_DATA: Record<string, TracedData> = {
    "PT-839210": {
        id: "PT-839210",
        type: "order",
        itemName: "PET Broom",
        contributor: "Aisha M. (Kuchingoro household)",
        hub: "Kuchingoro Garamajiji Hub",
        material: "PET Plastic Bottles",
        weight: "1.2 kg",
        co2Saved: "1.8 kg",
        landfillSaved: "36 Liters",
        energySaved: "6.8 kWh",
        points: 120,
        certificateNo: "CERT-2026-839210",
        timeline: [
            {
                title: "Material Collection",
                description: "Recovered 1.2 kg of clear PET water bottles from Kuchingoro settlement households.",
                date: "May 10, 2026",
                location: "Kuchingoro Axis, Abuja",
                operator: "Aisha M. (Eco Contributor)",
                icon: <Leaf className="w-5 h-5" />
            },
            {
                title: "Weighing & Digital Logging",
                description: "Weighed, verified, and digitally logged. Earned 12 points added to contributor's profile.",
                date: "May 11, 2026",
                location: "Kuchingoro Garamajiji Hub",
                operator: "Fatima Yusuf (Hub Officer)",
                icon: <ShieldCheck className="w-5 h-5" />
            },
            {
                title: "Sorting & Processing",
                description: "Bottles cleaned, label adhesives removed, and shredded/prepped for manufacturing.",
                date: "May 12, 2026",
                location: "Kuchingoro Processing Center",
                operator: "Blessing E. (Sorting Lead)",
                icon: <MapPin className="w-5 h-5" />
            },
            {
                title: "Upcycle Crafting",
                description: "Shredded PET processed and manufactured into the durable eco-friendly PET Broom.",
                date: "May 14, 2026",
                location: "Blessn Evea Signature Workshop",
                operator: "Blessn Evea Craft Team",
                icon: <Award className="w-5 h-5" />
            },
            {
                title: "Store Order & Delivery",
                description: "Purchased by customer. Dispatched via eco-friendly local distribution routes.",
                date: "May 16, 2026",
                location: "Abuja Central Delivery Route",
                operator: "Ojeka Jane (Customer Order #839)",
                icon: <ShoppingBag className="w-5 h-5" />
            }
        ]
    },
    "PT-104921": {
        id: "PT-104921",
        type: "order",
        itemName: "Upcycled Earrings",
        contributor: "Durumi Preteen Eco-Club B",
        hub: "Durumi Settlement Hub",
        material: "HDPE Cap Waste",
        weight: "0.2 kg",
        co2Saved: "0.32 kg",
        landfillSaved: "6.4 Liters",
        energySaved: "1.2 kWh",
        points: 20,
        certificateNo: "CERT-2026-104921",
        timeline: [
            {
                title: "Community Clean-up Drive",
                description: "Collected 0.2 kg of colorful HDPE bottle caps during a weekend community awareness drive.",
                date: "May 15, 2026",
                location: "Durumi Settlement, Abuja",
                operator: "Preteen Eco-Club B (Youth Advocates)",
                icon: <Leaf className="w-5 h-5" />
            },
            {
                title: "Hub Sorting & Validation",
                description: "Materials sorted by color at the hub. Logged for recycling points to support school books.",
                date: "May 16, 2026",
                location: "Durumi Hub Office",
                operator: "Grace Daniel (Hub Coordinator)",
                icon: <ShieldCheck className="w-5 h-5" />
            },
            {
                title: "Thermal Processing",
                description: "Color-sorted HDPE caps melted, compressed, and molded into raw design sheets.",
                date: "May 18, 2026",
                location: "Durumi Community Workshop",
                operator: "Grace Daniel (Molding Op)",
                icon: <MapPin className="w-5 h-5" />
            },
            {
                title: "Eco Jewelry Crafting",
                description: "Compressed HDPE sheets hand-cut and finished with sterling silver hooks into aesthetic statement earrings.",
                date: "May 19, 2026",
                location: "Blessn Evea Signature Workshop",
                operator: "Blessn Evea Creative Team",
                icon: <Award className="w-5 h-5" />
            },
            {
                title: "Order Fulfilled",
                description: "Purchased and delivered, supporting plastic-free fashion.",
                date: "May 21, 2026",
                location: "Abuja Central Delivery Route",
                operator: "Amina Yusuf (Customer Order #104)",
                icon: <ShoppingBag className="w-5 h-5" />
            }
        ]
    },
    "PT-582914": {
        id: "PT-582914",
        type: "order",
        itemName: "Upcycled PET Plant Decor",
        contributor: "Chinedu S. (Kuchingoro)",
        hub: "Kuchingoro Garamajiji Hub",
        material: "Green PET Plastic",
        weight: "0.8 kg",
        co2Saved: "1.2. kg",
        landfillSaved: "24 Liters",
        energySaved: "4.6 kWh",
        points: 80,
        certificateNo: "CERT-2026-582914",
        timeline: [
            {
                title: "Raw Aggregation",
                description: "Diverted 0.8 kg of green soft drink PET bottles from drainage canals in Kuchingoro.",
                date: "May 22, 2026",
                location: "Kuchingoro Canal Axis",
                operator: "Chinedu S. (Aggregation Partner)",
                icon: <Leaf className="w-5 h-5" />
            },
            {
                title: "Digital Registration",
                description: "Tonnage added to public tracking data. Verified and sent to the upcycling queue.",
                date: "May 23, 2026",
                location: "Kuchingoro Hub Center",
                operator: "Fatima Yusuf (Hub Officer)",
                icon: <ShieldCheck className="w-5 h-5" />
            },
            {
                title: "Artistic Upcycling",
                description: "Green PET bottles hand-sculpted, cut, and assembled into a beautiful artificial plant decor.",
                date: "May 25, 2026",
                location: "Blessn Evea Signature Workshop",
                operator: "Blessn Evea Craft Team",
                icon: <Award className="w-5 h-5" />
            },
            {
                title: "Order Handover",
                description: "Order completed and delivered, transforming waste into house decoration.",
                date: "May 27, 2026",
                location: "Wuse II delivery node",
                operator: "Chioma N. (Customer Order #582)",
                icon: <ShoppingBag className="w-5 h-5" />
            }
        ]
    },
    "RC-992011": {
        id: "RC-992011",
        type: "contribution",
        itemName: "Raw Plastic Recovery Log",
        contributor: "Adebayo S. (Community Partner)",
        hub: "Kuchingoro Garamajiji Hub",
        material: "HDPE Rigid Plastics",
        weight: "15.0 kg",
        co2Saved: "24.0 kg",
        landfillSaved: "480 Liters",
        energySaved: "91.5 kWh",
        points: 150,
        certificateNo: "CERT-2026-992011",
        timeline: [
            {
                title: "Household Sorting",
                description: "Sorted and cleaned 15.0 kg of rigid HDPE laundry bottles at source.",
                date: "May 27, 2026",
                location: "Kuchingoro Community Node",
                operator: "Adebayo S. (Contributor)",
                icon: <Leaf className="w-5 h-5" />
            },
            {
                title: "Hub Weighing & Log",
                description: "Plastic verified as HDPE. Digital receipt RC-992011 generated. 150 points added to balance.",
                date: "May 28, 2026",
                location: "Kuchingoro Garamajiji Hub",
                operator: "Joy E. (Hub Officer)",
                icon: <ShieldCheck className="w-5 h-5" />
            },
            {
                title: "Aggregation & Transport",
                description: "Aggregated with other HDPE plastic and loaded for transport to the primary sorting depot.",
                date: "May 29, 2026",
                location: "Abuja Transport Route",
                operator: "Blessn Evea Logistics Team",
                icon: <MapPin className="w-5 h-5" />
            }
        ]
    }
};

export default function TraceabilityPage() {
    const [searchId, setSearchId] = useState("");
    const [tracedResult, setTracedResult] = useState<TracedData | null>(MOCK_TRACED_DATA["PT-839210"]);
    const [showCert, setShowCert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const formattedId = searchId.trim().toUpperCase();
        if (MOCK_TRACED_DATA[formattedId]) {
            setTracedResult(MOCK_TRACED_DATA[formattedId]);
            setErrorMessage("");
        } else {
            setErrorMessage("Tracking number not found. Make sure it matches format PT-XXXXXX or RC-XXXXXX.");
        }
    };

    const handleQuickSelect = (id: string) => {
        setSearchId(id);
        setTracedResult(MOCK_TRACED_DATA[id]);
        setErrorMessage("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200/30 text-green-700 text-xs font-bold mb-3">
                        <Leaf className="h-3 w-3 text-green-500" />
                        100% Traceable Circular Lifecycle
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">
                        Traceability Lookup
                    </h1>
                    <p className="text-md font-medium text-gray-500 max-w-xl mx-auto">
                        Trace plastic waste from the exact Abuja community where it was recovered to the final upcycled product. 
                    </p>
                </div>

                {/* Search Box */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="Enter Receipt ID (e.g. PT-839210 or RC-992011)"
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-2xl focus:ring-green-500 focus:border-green-500 font-medium text-gray-800"
                            />
                        </div>
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md shadow-green-600/10">
                            Search Life Cycle
                        </button>
                    </form>

                    {errorMessage && <p className="text-sm font-bold text-red-500 mb-4">{errorMessage}</p>}

                    {/* Quick Selection for Demo */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mr-2">Sample Logs:</span>
                        {Object.keys(MOCK_TRACED_DATA).map((id) => (
                            <button
                                key={id}
                                onClick={() => handleQuickSelect(id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                    tracedResult?.id === id
                                        ? "bg-green-50 border-green-200 text-green-700 font-extrabold"
                                        : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                {id} ({MOCK_TRACED_DATA[id].itemName.split(' ')[0]})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Traced Results Visualization */}
                {tracedResult && (
                    <div className="space-y-8 animate-scale-in">
                        {/* Summary Impact Bar */}
                        <div className="bg-gradient-to-br from-green-950 to-green-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Sparkles className="w-32 h-32" />
                            </div>
                            
                            <div>
                                <span className="bg-green-900/60 text-green-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-green-800/60">
                                    {tracedResult.type === "order" ? "Product Order Log" : "Recovery Receipt Log"}
                                </span>
                                <h3 className="text-2xl font-black mt-2 tracking-tight">
                                    {tracedResult.itemName} <span className="text-green-300 font-medium text-lg ml-1">#{tracedResult.id}</span>
                                </h3>
                                <p className="text-xs text-green-200 mt-1 font-semibold">
                                    Material Source: <strong className="text-white">{tracedResult.contributor}</strong>
                                </p>
                            </div>

                            <button
                                onClick={() => setShowCert(true)}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl transition-all flex items-center gap-2"
                            >
                                <Award className="w-4.5 h-4.5" /> Show Impact Certificate
                            </button>
                        </div>

                        {/* Visual statistics grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Material Type", val: tracedResult.material, desc: "Identified Category" },
                                { label: "Recovered Mass", val: tracedResult.weight, desc: "Diverted Weight" },
                                { label: "Carbon Offset", val: tracedResult.co2Saved, desc: "Greenhouse gas saved" },
                                { label: "Landfill Volume", val: tracedResult.landfillSaved, desc: "Preserved space" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/50 shadow-sm text-center">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">{stat.label}</span>
                                    <span className="text-xl font-black text-gray-800 block tracking-tight">{stat.val}</span>
                                    <span className="text-[9px] text-gray-400 font-medium mt-1 block leading-normal">{stat.desc}</span>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Vertical Timeline */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                            <h3 className="text-lg font-black tracking-tight text-gray-900 mb-8 border-b border-gray-100 pb-4">
                                Material Lifecycle Stepper
                            </h3>

                            <div className="relative pl-6 md:pl-8 border-l-2 border-green-100 space-y-10 ml-4 py-2">
                                {tracedResult.timeline.map((step, idx) => (
                                    <div key={idx} className="relative">
                                        {/* Timeline Dot Indicator */}
                                        <div className="absolute -left-10 md:-left-12 top-0.5 flex items-center justify-center w-8 h-8 rounded-full bg-green-50 border-2 border-green-500 text-green-700 shadow-sm z-10">
                                            {step.icon}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {/* Stepper Details */}
                                            <div className="md:col-span-3">
                                                <h4 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
                                                    {step.title}
                                                </h4>
                                                <p className="text-gray-500 text-sm mt-1 font-medium leading-relaxed">
                                                    {step.description}
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5 text-gray-300" /> {step.location}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3.5 h-3.5 text-gray-300" /> {step.operator}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Date info on right */}
                                            <div className="md:col-span-1 text-left md:text-right border-t border-gray-100 md:border-0 pt-2 md:pt-0">
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full inline-block md:inline-flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" /> {step.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Certificate Modal */}
                {showCert && tracedResult && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div onClick={() => setShowCert(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"></div>
                        
                        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200 animate-scale-in">
                            <button
                                onClick={() => setShowCert(false)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-xl transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Certificate Inner Style */}
                            <div className="p-8 md:p-12 text-center border-8 border-double border-yellow-700/20 m-3 rounded-2xl relative">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(253,224,71,0.05)_0%,rgba(255,255,255,0)_70%)] pointer-events-none"></div>
                                
                                <div className="flex justify-center mb-6">
                                    <div className="w-20 h-20 bg-yellow-50 text-yellow-600 border border-yellow-200/50 rounded-full flex items-center justify-center relative shadow-sm">
                                        <Sparkles className="w-10 h-10 animate-pulse-slow" />
                                        <Award className="w-6 h-6 absolute text-yellow-700" />
                                    </div>
                                </div>

                                <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-700/80 block mb-2">PlastiTrackBES Circular Economy Pledge</span>
                                <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight font-serif">Certificate of Impact</h2>
                                
                                <p className="text-gray-500 text-xs italic font-medium leading-relaxed mb-6 max-w-md mx-auto">
                                    This certifies that the lifecycle of transaction ID <strong className="text-gray-800 font-mono not-italic">{tracedResult.id}</strong> represents the verified recovery, sorting, and diversion of:
                                </p>

                                <div className="bg-yellow-50/50 rounded-2xl p-6 border border-yellow-100 max-w-xs mx-auto mb-8 text-center">
                                    <span className="text-[10px] text-yellow-800 font-extrabold uppercase tracking-widest block mb-1">Diverted Waste Tonnage</span>
                                    <span className="text-4xl font-black text-yellow-900 tracking-tight block">{tracedResult.weight}</span>
                                    <span className="text-[10px] text-yellow-700 font-bold uppercase tracking-wider mt-1 block">{tracedResult.material}</span>
                                </div>

                                <div className="space-y-2 text-xs text-gray-500 font-semibold mb-8">
                                    <p className="flex justify-between border-b border-gray-100 pb-2">
                                        <span>Environmental Certificate No:</span>
                                        <span className="font-mono text-gray-800 font-bold">{tracedResult.certificateNo}</span>
                                    </p>
                                    <p className="flex justify-between border-b border-gray-100 pb-2">
                                        <span>CO2 Emissions Offset:</span>
                                        <span className="text-gray-800 font-bold">{tracedResult.co2Saved} CO2</span>
                                    </p>
                                    <p className="flex justify-between border-b border-gray-100 pb-2">
                                        <span>Sorting Recovery Hub:</span>
                                        <span className="text-gray-800 font-bold">{tracedResult.hub}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Upcycle Workshop Partner:</span>
                                        <span className="text-gray-800 font-bold">Blessn Evea Signature</span>
                                    </p>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setShowCert(false)}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md shadow-yellow-600/10 flex items-center gap-2"
                                    >
                                        <Download className="w-4 h-4" /> Download Certificate (PDF)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
