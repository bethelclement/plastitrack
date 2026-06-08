"use client";

import { useState, useEffect } from "react";
import { MapPin, Users, Activity, Phone, Sparkles, X, ChevronRight, Info } from "lucide-react";
import Link from "next/link";

const HUBS_DATA = [
    {
        id: "kuchingoro",
        name: "Kuchingoro Garamajiji Hub",
        zone: "Kuchingoro Axis, AMAC",
        description: "Our flagship pilot hub serving the Kuchingoro and Garamajiji axis. This location specializes in household aggregation, collection logistics, and training local women operators.",
        tonnage: "28,480 kg",
        households: "712 households",
        operators: "5 trained women operators",
        phone: "+234 800 HUB ZERO",
        x: "38%", // Relative position on the visual map
        y: "52%",
        status: "Active",
        color: "bg-green-500",
        bgClass: "from-green-50 to-white",
        borderClass: "border-green-100",
        textClass: "text-green-700"
    },
    {
        id: "durumi",
        name: "Durumi Settlement Hub",
        zone: "Durumi Settlement, AMAC",
        description: "A high-impact location addressing acute plastic leakage in informal areas. This hub works closely with 2 local school eco clubs and focuses heavily on PET and HDPE recovery.",
        tonnage: "20,160 kg",
        households: "533 households",
        operators: "3 youth advocates & community leaders",
        phone: "+234 800 HUB ONE1",
        x: "56%",
        y: "43%",
        status: "Active",
        color: "bg-blue-500",
        bgClass: "from-blue-50 to-white",
        borderClass: "border-blue-100",
        textClass: "text-blue-700"
    }
];

export default function Hubs() {
    const [activeHub, setActiveHub] = useState<any | null>(HUBS_DATA[0]);

    useEffect(() => {
        // Fallback for scroll animations
        if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('opacity-100', 'translate-y-0');
                            entry.target.classList.remove('opacity-0', 'translate-y-8');
                        }
                    });
                },
                { threshold: 0.05 }
            );
            document.querySelectorAll('.scroll-reveal-item').forEach((el) => {
                el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
                observer.observe(el);
            });
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 py-16 overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full mb-4 inline-block">Locations</span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">Community Recovery Hubs</h1>
                    <p className="mt-2 text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        PlastiTrackBES operates through localized recovery hubs. These women and youth-led centers form the heartbeat of our Abuja operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Column 1: Interactive Stylized MAP (AMAC Region) - 7 cols */}
                    <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between scroll-reveal-item">
                        <div>
                            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                                <h3 className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-green-600" /> AMAC Area Interactive Locator
                                </h3>
                                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> Live coordinates
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 font-bold mb-6">
                                Click on the pulsing green or blue pins on the map below to select a recovery hub and view local metrics.
                            </p>
                        </div>

                        {/* Interactive SVG Map Container */}
                        <div className="relative bg-gray-50 rounded-2xl border border-gray-200/30 overflow-hidden h-[340px] flex items-center justify-center select-none group">
                            {/* Stylized Abuja AMAC SVG illustration */}
                            <svg viewBox="0 0 600 300" className="w-full h-full text-gray-300">
                                {/* Grid lines */}
                                <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />

                                {/* AMAC Zone Contour Area */}
                                <path d="M120,60 Q220,30 380,50 T540,120 Q460,250 340,220 T150,160 Z" fill="rgba(34, 197, 94, 0.02)" stroke="rgba(34, 197, 94, 0.08)" strokeWidth="2" strokeDasharray="6,4" />
                                
                                {/* Inner Zone contours */}
                                <path d="M220,90 Q290,70 370,80 T450,120 Q390,190 310,180 T200,140 Z" fill="rgba(59, 130, 246, 0.01)" stroke="rgba(59, 130, 246, 0.04)" strokeWidth="1.5" />
                                
                                <text x="140" y="80" fill="#CBD5E1" fontSize="10" fontWeight="800" letterSpacing="2">GWARINPA</text>
                                <text x="440" y="100" fill="#CBD5E1" fontSize="10" fontWeight="800" letterSpacing="2">ASOKORO</text>
                                <text x="320" y="220" fill="#CBD5E1" fontSize="10" fontWeight="800" letterSpacing="2">GARKI</text>
                                <text x="180" y="190" fill="#CBD5E1" fontSize="10" fontWeight="800" letterSpacing="2">LUGBE AXIS</text>
                            </svg>

                            {/* Hub Pins */}
                            {HUBS_DATA.map((hub) => (
                                <button
                                    key={hub.id}
                                    onClick={() => setActiveHub(hub)}
                                    style={{ left: hub.x, top: hub.y }}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
                                >
                                    {/* Pulse animations */}
                                    <span className="absolute inline-flex h-10 w-10 rounded-full opacity-35 -left-3 -top-3 animate-ping" style={{ backgroundColor: hub.id === "kuchingoro" ? "#22c55e" : "#3b82f6" }}></span>
                                    <div className={`relative flex items-center justify-center w-6 h-6 rounded-full text-white shadow-lg transition-transform group-hover:scale-125 duration-300 ${
                                        activeHub?.id === hub.id 
                                            ? (hub.id === "kuchingoro" ? "bg-green-600 scale-110 ring-4 ring-green-100" : "bg-blue-600 scale-110 ring-4 ring-blue-100") 
                                            : (hub.id === "kuchingoro" ? "bg-green-500" : "bg-blue-500")
                                    }`}>
                                        <MapPin className="w-3.5 h-3.5" />
                                    </div>
                                    
                                    {/* Tooltip on hover */}
                                    <span className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap z-30 border border-gray-800">
                                        {hub.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Selected Hub Details Drawer/Panel - 5 cols */}
                    <div className="lg:col-span-5 scroll-reveal-item">
                        {activeHub ? (
                            <div className={`bg-gradient-to-br ${activeHub.bgClass} rounded-3xl p-8 border ${activeHub.borderClass} shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full flex flex-col justify-between transition-all duration-300 transform`}>
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 text-gray-500 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                                {activeHub.zone}
                                            </span>
                                            <h2 className="text-2xl font-black text-gray-900 mt-3 tracking-tight">
                                                {activeHub.name}
                                            </h2>
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-green-100 text-green-800 border border-green-200/50">
                                            ● {activeHub.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-8 font-medium">
                                        {activeHub.description}
                                    </p>

                                    {/* Detailed Stats */}
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm group">
                                            <div className="bg-green-100 p-2.5 rounded-xl mr-4 group-hover:bg-green-200 transition-colors">
                                                <Activity className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Live Impact Metric</span>
                                                <span className="text-sm font-extrabold text-gray-800 block">
                                                    Recovered {activeHub.tonnage} of sorted plastic
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm group">
                                            <div className="bg-green-100 p-2.5 rounded-xl mr-4 group-hover:bg-green-200 transition-colors">
                                                <Users className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Household Coverage</span>
                                                <span className="text-sm font-extrabold text-gray-800 block">
                                                    Serving {activeHub.households}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm group">
                                            <div className="bg-green-100 p-2.5 rounded-xl mr-4 group-hover:bg-green-200 transition-colors">
                                                <Info className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Hub Operations</span>
                                                <span className="text-sm font-extrabold text-gray-800 block">
                                                    {activeHub.operators}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm group">
                                            <div className="bg-green-100 p-2.5 rounded-xl mr-4 group-hover:bg-green-200 transition-colors">
                                                <Phone className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Contact Information</span>
                                                <span className="text-sm font-extrabold text-gray-800 block">
                                                    {activeHub.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/member/pickup" className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-sm font-black rounded-2xl text-white bg-green-600 hover:bg-green-700 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md shadow-green-600/10">
                                    Book a Pickup At This Hub
                                    <ChevronRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center text-center h-full">
                                <MapPin className="w-16 h-16 text-gray-200 mb-4 animate-bounce" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No Hub Selected</h3>
                                <p className="text-gray-500 max-w-xs text-sm">Please click one of the blinking coordinates on the map to view detailed hub operations and stats.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Call To Action */}
                <div className="mt-16 text-center bg-white border border-gray-150 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] max-w-3xl mx-auto scroll-reveal-item">
                    <p className="text-gray-600 font-medium leading-relaxed">
                        Interested in starting a collection point or replicating the recovery model in your community? We provide complete support.
                    </p>
                    <div className="mt-4">
                        <Link href="/contact" className="text-green-600 font-bold hover:underline inline-flex items-center gap-1 group">
                            Request our replication toolkit <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
