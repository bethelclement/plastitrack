"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Award, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";

export default function RewardsPage() {
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('reward_balance').eq('id', user.id).single();
                if (data) setBalance(data.reward_balance || 0);
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Rewards</h1>

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-green-100 font-medium mb-1">Available Points Balance</p>
                        <h2 className="text-5xl font-extrabold flex items-center">
                            {balance} <span className="text-2xl font-medium ml-2 text-green-200">pts</span>
                        </h2>
                    </div>
                    <div className="hidden sm:flex w-20 h-20 bg-white/20 rounded-full items-center justify-center">
                        <Award className="w-10 h-10 text-white" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                </div>
                <div className="p-8 text-center text-gray-500">
                    <Award className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p>No recent reward transactions.</p>
                </div>
            </div>
        </div>
    );
}
