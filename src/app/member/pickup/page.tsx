"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, Truck, Loader2 } from "lucide-react";

export default function PickupPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePickup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            await supabase.from('pickup_requests').insert({
                user_id: user.id,
                address: formData.get('address'),
                phone_number: formData.get('phone'),
                approx_weight_kg: formData.get('weight'),
                preferred_date: formData.get('date'),
                status: 'pending'
            });
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="max-w-3xl mx-auto py-16 px-4 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pickup Requested!</h2>
                <p className="text-gray-600">Our coordination team will contact you shortly to confirm the pickup time.</p>
                <button onClick={() => setSuccess(false)} className="mt-6 text-primary font-medium hover:underline">
                    Book another pickup
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Pickup</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handlePickup} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
                        <div className="relative">
                            <MapPin className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400 mt-2.5 pointer-events-none" />
                            <textarea name="address" required rows={3} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="Full address within Abuja" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" name="phone" required className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="+234 XXX XXXX" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Approx. Weight (kg)</label>
                            <input type="number" name="weight" min="1" step="0.5" required className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="e.g. 5" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                        <div className="relative">
                            <Calendar className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400 mt-2.5 pointer-events-none" />
                            <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Pickup"}
                    </button>
                </form>
            </div>
        </div>
    );
}
