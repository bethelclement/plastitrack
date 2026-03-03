"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Calculator, CheckCircle, Loader2 } from "lucide-react";

export default function LogPlasticPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [receiptCode, setReceiptCode] = useState("");
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        async function loadUsers() {
            const { data } = await supabase.from('profiles').select('id, full_name, email');
            if (data) setUsers(data);
        }
        loadUsers();
    }, []);

    const handleLog = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const weight = parseFloat(formData.get('weight') as string);
        // Simple point rule: 100 points per kg
        const points = Math.floor(weight * 100);
        const code = 'PT-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        // In real app we fetch actual hub ID. 
        // Using a mock default if not seeding hubs perfectly here
        const userId = formData.get('user_id');

        const { error } = await supabase.from('plastic_entries').insert({
            user_id: userId,
            hub_id: '00000000-0000-0000-0000-000000000000', // Mock HUB ID or fetched
            plastic_type: formData.get('type'),
            weight_kg: weight,
            points_awarded: points,
            receipt_code: code
        });

        if (!error) {
            // Also update user's reward balance (RPC preferred, but doing direct for demo if RLS allows)
            const { data: profileData } = await supabase.from('profiles').select('reward_balance').eq('id', userId).single();
            const newBal = (profileData?.reward_balance || 0) + points;
            await supabase.from('profiles').update({ reward_balance: newBal }).eq('id', userId);

            setReceiptCode(code);
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Log Plastic Entry</h1>

            {success && (
                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h2 className="text-xl font-bold text-green-800">Successfully Logged</h2>
                    <p className="text-green-700 mt-2">Receipt Code: <span className="font-mono font-bold">{receiptCode}</span></p>
                    <button onClick={() => setSuccess(false)} className="mt-4 text-green-800 font-medium hover:underline">Log another entry</button>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleLog} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Contributor</label>
                        <select name="user_id" required className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                            <option value="">Search user...</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plastic Type</label>
                            <select name="type" required className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                                <option value="PET">PET (Bottles)</option>
                                <option value="HDPE">HDPE (Thick Containers)</option>
                                <option value="LDPE">LDPE (Bags, Films)</option>
                                <option value="PP">PP (Bottle Caps, Tubs)</option>
                                <option value="PVC">PVC (Pipes - Restricted)</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                            <div className="relative">
                                <Calculator className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400 mt-2.5 pointer-events-none" />
                                <input type="number" name="weight" min="0.1" step="0.1" required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="0.0" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">Note: 100 reward points will be automatically calculated and credited per 1kg.</p>
                    </div>

                    <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log Entry & Issue Receipt"}
                    </button>
                </form>
            </div>
        </div>
    );
}
