"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DownloadCloud, Info, TrendingUp, Users, Award, ShieldAlert } from 'lucide-react';

const mockWeeklyData = [
    { name: 'Week 1', PET: 4200, HDPE: 2450, PP: 1240, LDPE: 800 },
    { name: 'Week 2', PET: 4500, HDPE: 2800, PP: 1350, LDPE: 920 },
    { name: 'Week 3', PET: 3900, HDPE: 3100, PP: 1500, LDPE: 880 },
    { name: 'Week 4', PET: 4800, HDPE: 3400, PP: 1650, LDPE: 1050 },
    { name: 'Week 5', PET: 5200, HDPE: 3800, PP: 1800, LDPE: 1100 },
];

const mockPieData = [
    { name: 'PET', value: 43 },
    { name: 'HDPE', value: 31 },
    { name: 'PP', value: 16 },
    { name: 'LDPE', value: 8 },
    { name: 'Caps/Others', value: 2 },
];

const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];

export default function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 py-12 overflow-hidden relative">
            {/* Background Texture Area */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 border-b border-gray-200/60 pb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-green-800 drop-shadow-sm animate-pulse-slow">
                            Impact Dashboard
                        </h1>
                        <p className="mt-3 text-lg font-medium text-gray-500">
                            Live tracking from our Abuja pilot communities. <span className="text-green-600 font-bold uppercase tracking-widest text-xs ml-2">Updated Weekly</span>
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <button className="group inline-flex items-center px-6 py-3 border-2 border-green-200 shadow-sm text-sm font-bold rounded-xl text-green-800 bg-white hover:bg-green-50 hover:border-green-300 transition-all transform hover:-translate-y-1">
                            <DownloadCloud className="-ml-1 mr-2 h-5 w-5 text-green-500 group-hover:animate-bounce" />
                            Export Monthly PDF
                        </button>
                    </div>
                </div>

                {/* Top Level Metrics with 3D Float Effect */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {[
                        { label: "Total Recovered", value: "48,640 kg", desc: "Since Project Launch", icon: <TrendingUp className="w-6 h-6 text-green-400" />, color: "from-green-50 to-white", textColor: "text-green-600" },
                        { label: "Households Registered", value: "1,245", desc: "Across Kuchingoro & Durumi", icon: <Users className="w-6 h-6 text-blue-400" />, color: "from-blue-50 to-white", textColor: "text-blue-600" },
                        { label: "Rewards Issued", value: "₦2.4M+", desc: "Cash credits & vouchers", icon: <Award className="w-6 h-6 text-yellow-500" />, color: "from-yellow-50 to-white", textColor: "text-yellow-600" },
                    ].map((metric, i) => (
                        <div key={i} className={`bg-gradient-to-br ${metric.color} overflow-hidden rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1`}>
                            <div className="px-6 py-6 relative">
                                <div className="absolute top-6 right-6 opacity-30">
                                    {metric.icon}
                                </div>
                                <dt className="text-sm font-bold text-gray-500 uppercase tracking-widest">{metric.label}</dt>
                                <dd className={`mt-2 text-4xl sm:text-5xl font-black tracking-tight drop-shadow-sm ${metric.textColor}`}>
                                    {metric.value}
                                </dd>
                                <dd className="mt-3 text-sm font-medium text-gray-500">{metric.desc}</dd>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Bar Chart */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black tracking-tight text-gray-900">Weekly Recovery Trend</h3>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">in Kilograms</span>
                        </div>
                        <div className="h-80 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={mockWeeklyData}
                                    margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} />
                                    <Tooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                    <Bar dataKey="PET" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="HDPE" stackId="a" fill="#16a34a" />
                                    <Bar dataKey="PP" stackId="a" fill="#15803d" />
                                    <Bar dataKey="LDPE" stackId="a" fill="#166534" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Breakdown Pie Chart Settings */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center">
                            <h3 className="text-xl font-black tracking-tight text-gray-900 mb-2 w-full text-left">Category Split</h3>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={mockPieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {mockPieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                            itemStyle={{ fontWeight: 700, color: '#1f2937' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="w-full mt-2 grid grid-cols-2 gap-y-4 gap-x-2">
                                {mockPieData.map((item, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2 shadow-sm" style={{ backgroundColor: COLORS[i] }}></div>
                                        <span className="text-xs font-bold text-gray-700">{item.name} <span className="text-gray-400 ml-1">{item.value}%</span></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats / Note block */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-gradient-to-r from-green-900 to-green-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp className="w-32 h-32" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 select-none">Impact Multiplier</h3>
                        <p className="text-green-100 font-medium max-w-lg mb-6 leading-relaxed">
                            For every 1kg of PET recovered, households earn points towards premium upcycled goods. This closed-loop system ensures 60% of our registered homes transition to stable income streams.
                        </p>
                        <div className="flex gap-6">
                            <div>
                                <div className="text-3xl font-black text-green-300">60%</div>
                                <div className="text-xs uppercase tracking-wider font-bold text-green-500/80">Income Transition</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-green-300">2 Hubs</div>
                                <div className="text-xs uppercase tracking-wider font-bold text-green-500/80">Active Pilots</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50/50 rounded-3xl border border-red-100 p-8 flex flex-col justify-center">
                        <div className="flex items-center mb-3">
                            <ShieldAlert className="w-6 h-6 text-red-500 mr-2" />
                            <h4 className="text-sm font-black text-red-900 uppercase tracking-widest">PVC Protocol</h4>
                        </div>
                        <p className="text-sm text-red-800/80 font-medium leading-relaxed">
                            PVC plastic is tracked within our hubs but is marked as restricted and controlled for safety. Collection is strictly limited to specialized offtake routes.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
