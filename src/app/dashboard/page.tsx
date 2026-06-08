"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DownloadCloud, Info, TrendingUp, Users, Award, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

const mockWeeklyDataByHub: Record<string, any[]> = {
    All: [
        { name: 'Week 1', PET: 4200, HDPE: 2450, PP: 1240, LDPE: 800 },
        { name: 'Week 2', PET: 4500, HDPE: 2800, PP: 1350, LDPE: 920 },
        { name: 'Week 3', PET: 3900, HDPE: 3100, PP: 1500, LDPE: 880 },
        { name: 'Week 4', PET: 4800, HDPE: 3400, PP: 1650, LDPE: 1050 },
        { name: 'Week 5', PET: 5200, HDPE: 3800, PP: 1800, LDPE: 1100 },
    ],
    Kuchingoro: [
        { name: 'Week 1', PET: 2500, HDPE: 1400, PP: 700, LDPE: 400 },
        { name: 'Week 2', PET: 2700, HDPE: 1600, PP: 800, LDPE: 450 },
        { name: 'Week 3', PET: 2300, HDPE: 1800, PP: 900, LDPE: 430 },
        { name: 'Week 4', PET: 2900, HDPE: 2000, PP: 950, LDPE: 500 },
        { name: 'Week 5', PET: 3100, HDPE: 2200, PP: 1050, LDPE: 550 },
    ],
    Durumi: [
        { name: 'Week 1', PET: 1700, HDPE: 1050, PP: 540, LDPE: 400 },
        { name: 'Week 2', PET: 1800, HDPE: 1200, PP: 550, LDPE: 470 },
        { name: 'Week 3', PET: 1600, HDPE: 1300, PP: 600, LDPE: 450 },
        { name: 'Week 4', PET: 1900, HDPE: 1400, PP: 700, LDPE: 550 },
        { name: 'Week 5', PET: 2100, HDPE: 1600, PP: 750, LDPE: 550 },
    ]
};

const mockPieDataByHub: Record<string, any[]> = {
    All: [
        { name: 'PET', value: 43 },
        { name: 'HDPE', value: 31 },
        { name: 'PP', value: 16 },
        { name: 'LDPE', value: 8 },
        { name: 'Caps/Others', value: 2 },
    ],
    Kuchingoro: [
        { name: 'PET', value: 45 },
        { name: 'HDPE', value: 32 },
        { name: 'PP', value: 15 },
        { name: 'LDPE', value: 7 },
        { name: 'Caps/Others', value: 1 },
    ],
    Durumi: [
        { name: 'PET', value: 41 },
        { name: 'HDPE', value: 29 },
        { name: 'PP', value: 18 },
        { name: 'LDPE', value: 9 },
        { name: 'Caps/Others', value: 3 },
    ]
};

const mockMetricsByHub: Record<string, { recovered: string; households: string; rewards: string }> = {
    All: { recovered: "48,640 kg", households: "1,245", rewards: "₦2.4M+" },
    Kuchingoro: { recovered: "28,480 kg", households: "712", rewards: "₦1.45M" },
    Durumi: { recovered: "20,160 kg", households: "533", rewards: "₦0.95M" }
};

const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'];

export default function Dashboard() {
    const [selectedHub, setSelectedHub] = useState("All");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Fallback for scroll reveal animations
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

    const metrics = mockMetricsByHub[selectedHub];
    const weeklyData = mockWeeklyDataByHub[selectedHub];
    const pieData = mockPieDataByHub[selectedHub];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 py-12 overflow-hidden relative">
            {/* Background Texture Area */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 border-b border-gray-200/60 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200/30 text-green-700 text-xs font-bold mb-3">
                            <Sparkles className="h-3 w-3 text-green-500" />
                            Digital Traceability Hub
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 drop-shadow-sm">
                            Impact Dashboard
                        </h1>
                        <p className="mt-2 text-md font-medium text-gray-500 flex items-center gap-1">
                            Live tracking from our Abuja pilot communities. 
                            <span className="bg-green-100 text-green-700 font-extrabold uppercase tracking-widest text-[9px] px-2 py-0.5 rounded-md ml-2">Updated Weekly</span>
                        </p>
                    </div>

                    {/* Filter Selector & Export Button */}
                    <div className="mt-6 lg:mt-0 flex flex-wrap items-center gap-4">
                        <div className="flex bg-gray-200/60 p-1.5 rounded-2xl border border-gray-200/30">
                            {["All", "Kuchingoro", "Durumi"].map((hub) => (
                                <button
                                    key={hub}
                                    onClick={() => setSelectedHub(hub)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        selectedHub === hub
                                            ? "bg-white text-green-700 shadow-md"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {hub === "All" ? "Abuja (All)" : `${hub} Hub`}
                                </button>
                            ))}
                        </div>

                        <button className="group inline-flex items-center px-5 py-2.5 border-2 border-green-200 shadow-sm text-xs font-bold rounded-2xl text-green-800 bg-white hover:bg-green-50 hover:border-green-300 transition-all transform hover:-translate-y-0.5">
                            <DownloadCloud className="-ml-1 mr-2 h-4 w-4 text-green-600 group-hover:animate-bounce" />
                            Export PDF Report
                        </button>
                    </div>
                </div>

                {/* Top Level Metrics with 3D Float Effect */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {[
                        { label: "Total Recovered", value: metrics.recovered, desc: "Since Project Launch", icon: <TrendingUp className="w-6 h-6 text-green-500" />, color: "from-green-50 to-white", border: "border-green-100", textColor: "text-green-700" },
                        { label: "Households Registered", value: metrics.households, desc: "Across local settlements", icon: <Users className="w-6 h-6 text-blue-500" />, color: "from-blue-50 to-white", border: "border-blue-100", textColor: "text-blue-700" },
                        { label: "Rewards Issued", value: metrics.rewards, desc: "Eco-vouchers & cash-outs", icon: <Award className="w-6 h-6 text-yellow-600" />, color: "from-yellow-50 to-white", border: "border-yellow-100", textColor: "text-yellow-700" },
                    ].map((metric, i) => (
                        <div key={i} className={`bg-gradient-to-br ${metric.color} overflow-hidden rounded-3xl border ${metric.border} shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-1`}>
                            <div className="px-6 py-6 relative">
                                <div className="absolute top-6 right-6 opacity-40">
                                    {metric.icon}
                                </div>
                                <dt className="text-xs font-bold text-gray-400 uppercase tracking-widest">{metric.label}</dt>
                                <dd className={`mt-2 text-4xl sm:text-5xl font-black tracking-tight drop-shadow-sm ${metric.textColor}`}>
                                    {metric.value}
                                </dd>
                                <dd className="mt-3 text-xs font-semibold text-gray-400">{metric.desc}</dd>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Bar Chart */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] scroll-reveal-item">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black tracking-tight text-gray-900">Weekly Recovery Trend</h3>
                            <span className="bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">in Kilograms</span>
                        </div>
                        <div className="h-80 w-full relative">
                            {isClient && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={weeklyData}
                                        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 700 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 700 }} />
                                        <Tooltip
                                            cursor={{ fill: '#F9FAFB' }}
                                            contentStyle={{ borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}
                                            labelStyle={{ fontWeight: 800, color: '#111827' }}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '20px', fontSize: 12, fontWeight: 700, color: '#4B5563' }} iconType="circle" />
                                        <Bar dataKey="PET" stackId="a" fill="#16a34a" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="HDPE" stackId="a" fill="#22c55e" />
                                        <Bar dataKey="PP" stackId="a" fill="#4ade80" />
                                        <Bar dataKey="LDPE" stackId="a" fill="#86efac" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Breakdown Pie Chart Settings */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center justify-between scroll-reveal-item">
                        <h3 className="text-lg font-black tracking-tight text-gray-900 w-full text-left">Category Split</h3>
                        <div className="h-64 w-full relative">
                            {isClient && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                                            itemStyle={{ fontWeight: 850, color: '#1F2937', fontSize: 12 }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2">
                            {pieData.map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-2.5 h-2.5 rounded-full mr-2 shadow-sm" style={{ backgroundColor: COLORS[i] }}></div>
                                    <span className="text-xs font-bold text-gray-600">{item.name} <span className="text-gray-400 ml-1">{item.value}%</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hub Leaderboard & Gamification Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 scroll-reveal-item">
                    {/* Leaderboard Table */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div>
                                <h3 className="text-lg font-black tracking-tight text-gray-900">Community Leaderboard</h3>
                                <p className="text-xs font-bold text-gray-400 mt-1">Driving friendly competition to boost recycling</p>
                            </div>
                            <span className="bg-yellow-50 text-yellow-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                <Award className="w-3.5 h-3.5" /> Active Rankings
                            </span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { rank: 1, name: "Kuchingoro Garamajiji Hub", kg: "28,480 kg", households: "712 homes", badge: "🏆 Tonnage King", color: "text-yellow-600 bg-yellow-50 border-yellow-200/50" },
                                { rank: 2, name: "Durumi Settlement Hub", kg: "20,160 kg", households: "533 homes", badge: "⚡ Speed Record", color: "text-blue-600 bg-blue-50 border-blue-200/50" },
                                { rank: 3, name: "Area 1 Secondary Eco-Club", kg: "6,280 kg", households: "105 students", badge: "🌱 Youth Catalyst", color: "text-green-600 bg-green-50 border-green-200/50" }
                            ].map((hub) => (
                                <div key={hub.rank} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-extrabold text-sm shadow-sm">
                                            {hub.rank}
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-sm text-gray-900">{hub.name}</h4>
                                            <p className="text-xs text-gray-400 font-bold">{hub.households}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-gray-100 sm:border-0 pt-2 sm:pt-0">
                                        <div className="text-right">
                                            <span className="text-sm font-black text-gray-900 block">{hub.kg}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Tonnage</span>
                                        </div>
                                        <span className={`text-[10px] font-bold py-1 px-3.5 rounded-full border ${hub.color}`}>
                                            {hub.badge}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Impact Multiplier Info Box */}
                    <div className="space-y-6 flex flex-col justify-between">
                        <div className="bg-gradient-to-br from-green-950 to-green-900 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex-1 flex flex-col justify-between">
                            <div className="absolute top-0 right-0 p-8 opacity-5 mix-blend-overlay">
                                <TrendingUp className="w-32 h-32" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black mb-3 select-none flex items-center gap-1.5">
                                    <Sparkles className="w-5 h-5 text-green-300" /> Impact Multiplier
                                </h3>
                                <p className="text-green-100 text-xs font-medium leading-relaxed">
                                    For every 1kg of plastic recovered, households earn points towards premium upcycled goods. This closed-loop system ensures 60% of our registered homes transition to stable income streams.
                                </p>
                            </div>
                            <div className="flex gap-8 mt-6 border-t border-green-800 pt-4">
                                <div>
                                    <div className="text-2xl font-black text-green-300">60%</div>
                                    <div className="text-[9px] uppercase tracking-wider font-extrabold text-green-500/80">Income Transition</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-green-300">2 Hubs</div>
                                    <div className="text-[9px] uppercase tracking-wider font-extrabold text-green-500/80">Active Pilots</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50/50 rounded-3xl border border-red-100 p-6 flex items-start gap-4">
                            <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-black text-red-900 uppercase tracking-widest mb-1">PVC Restricted Protocol</h4>
                                <p className="text-xs text-red-800/80 font-medium leading-relaxed">
                                    PVC plastic is tracked within our hubs but is marked as restricted and controlled for safety. Collection is strictly limited to specialized industrial offtake routes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
