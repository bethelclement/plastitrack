"use client";

import { Users, Truck, PackageCheck, Banknote } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        users: 0,
        pickups: 0,
        logs: 0,
        products: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
            const { count: p } = await supabase.from('pickup_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
            const { count: l } = await supabase.from('plastic_entries').select('*', { count: 'exact', head: true });
            const { count: pr } = await supabase.from('products').select('*', { count: 'exact', head: true });

            setStats({
                users: u || 0,
                pickups: p || 0,
                logs: l || 0,
                products: pr || 0,
            });
        }
        fetchStats();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Pending Pickups</p>
                        <p className="text-3xl font-bold text-orange-600">{stats.pickups}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                        <Truck className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Logs</p>
                        <p className="text-3xl font-bold text-green-600">{stats.logs}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                        <PackageCheck className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Active Products</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.products}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                        <Banknote className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/admin/log-plastic" className="flex items-center p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors border border-green-100 font-medium text-green-800">
                            <PackageCheck className="w-5 h-5 mr-3" /> Log Plastic Entry
                        </Link>
                        <Link href="/admin/pickups" className="flex items-center p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors border border-orange-100 font-medium text-orange-800">
                            <Truck className="w-5 h-5 mr-3" /> Manage Pickups
                        </Link>
                        <Link href="/admin/products" className="flex items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100 font-medium text-blue-800">
                            <Banknote className="w-5 h-5 mr-3" /> Manage Store Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
