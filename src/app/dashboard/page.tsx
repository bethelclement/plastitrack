"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DownloadCloud, Info } from 'lucide-react';

const mockWeeklyData = [
    { name: 'Week 1', PET: 400, HDPE: 240, PP: 240, LDPE: 100 },
    { name: 'Week 2', PET: 300, HDPE: 139, PP: 221, LDPE: 120 },
    { name: 'Week 3', PET: 200, HDPE: 980, PP: 229, LDPE: 140 },
    { name: 'Week 4', PET: 278, HDPE: 390, PP: 200, LDPE: 110 },
    { name: 'Week 5', PET: 189, HDPE: 480, PP: 218, LDPE: 130 },
];

export default function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Impact Dashboard</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Live tracking from our Abuja pilot communities. Updated weekly from hub logs.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            <DownloadCloud className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                            Monthly Report PDF
                        </button>
                    </div>
                </div>

                {/* Top Level Metrics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                    {[
                        { label: "Total Recovered", value: "3,450 kg", desc: "Since Project Launch", isGreen: true },
                        { label: "Households Registered", value: "412", desc: "Targeting 500 in 5 weeks" },
                        { label: "Rewards Issued", value: "₦145,000", desc: "Cash credits & vouchers" },
                        { label: "Women & Youth Engaged", value: "48", desc: "Trained operators & staff" },
                        { label: "Emissions Avoided", value: "1.2 tCO2e", desc: "Estimated reduction" },
                        { label: "Active Hubs", value: "2", desc: "Kuchingoro Garamajiji & Durumi" },
                    ].map((metric, i) => (
                        <div key={i} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">{metric.label}</dt>
                                    <dd className={`mt-1 text-3xl font-semibold ${metric.isGreen ? 'text-primary' : 'text-gray-900'}`}>
                                        {metric.value}
                                    </dd>
                                    <dd className="mt-2 text-sm text-gray-500">{metric.desc}</dd>
                                </dl>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white shadow rounded-lg border border-gray-100 p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Weekly Recovery Trend (kg)</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={mockWeeklyData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="PET" stackId="a" fill="#22c55e" />
                                    <Bar dataKey="HDPE" stackId="a" fill="#16a34a" />
                                    <Bar dataKey="PP" stackId="a" fill="#15803d" />
                                    <Bar dataKey="LDPE" stackId="a" fill="#166534" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Breakdown & Information */}
                    <div className="space-y-8">
                        <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Breakdown by Category</h3>
                            <ul className="space-y-4">
                                {[
                                    { type: "PET", value: "45%", color: "bg-green-500" },
                                    { type: "HDPE", value: "30%", color: "bg-green-600" },
                                    { type: "PP", value: "15%", color: "bg-green-700" },
                                    { type: "LDPE", value: "8%", color: "bg-green-800" },
                                    { type: "Caps", value: "2%", color: "bg-green-900" },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${item.color}`}></div>
                                        <span className="flex-1 text-sm font-medium text-gray-900">{item.type}</span>
                                        <span className="text-sm text-gray-500">{item.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                            <Info className="flex-shrink-0 h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                            <div>
                                <h4 className="text-sm font-medium text-blue-800">Note on PVC Handling</h4>
                                <p className="mt-1 text-sm text-blue-700">
                                    PVC plastic is tracked within our hubs but is marked as restricted and controlled for safety.
                                    Collection is limited to specialized offtake routes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
