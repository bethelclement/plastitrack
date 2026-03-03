"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Truck, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function AdminPickupsPage() {
    const [pickups, setPickups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchPickups() {
        setLoading(true);
        const { data, error } = await supabase
            .from('pickup_requests')
            .select('*, profiles(full_name, email)')
            .order('created_at', { ascending: false });

        if (data) setPickups(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchPickups();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        await supabase.from('pickup_requests').update({ status }).eq('id', id);
        fetchPickups();
    };

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Pickups</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {pickups.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No pickup requests found.</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User / Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address / Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pickups.map((req) => (
                                <tr key={req.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{req.profiles?.full_name || 'Unknown User'}</div>
                                        <div className="text-sm text-gray-500">{new Date(req.preferred_date).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 truncate max-w-xs">{req.address}</div>
                                        <div className="text-sm text-gray-500">{req.phone_number}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {req.approx_weight_kg} kg
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${req.status === 'pending' ? 'bg-orange-100 text-orange-800' : ''}
                      ${req.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      ${req.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {req.status === 'pending' && (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => updateStatus(req.id, 'completed')} className="text-green-600 hover:text-green-900" title="Complete">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => updateStatus(req.id, 'cancelled')} className="text-red-600 hover:text-red-900" title="Cancel">
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
