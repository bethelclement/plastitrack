"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PackageOpen, Loader2 } from "lucide-react";

export default function ContributionsPage() {
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('plastic_entries')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (data) setEntries(data);
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Contributions</h1>

            {entries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No contributions yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Drop off plastic at a hub to see your impact here.</p>
                </div>
            ) : (
                <div className="bg-white shadow-sm overflow-hidden rounded-xl border border-gray-100">
                    <ul className="divide-y divide-gray-200">
                        {entries.map((entry) => (
                            <li key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-600 capitalize">
                                            {entry.plastic_type} Plastic
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(entry.created_at).toLocaleDateString()} • Receipt: {entry.receipt_code}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">{entry.weight_kg} kg</p>
                                        <p className="text-sm font-medium text-primary">+{entry.points_awarded} pts</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
