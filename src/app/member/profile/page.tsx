"use client";

import { useEffect, useState } from "react";
import { User, Mail, Award, MapPin, Loader2, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function MemberProfilePage() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    // Fetch from generic user metadata or real profiles table
                    const { data } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (data) {
                        setProfile({ ...data, email: user.email });
                    } else {
                        // Fallback to user metadata if no profile row
                        setProfile({
                            full_name: user?.user_metadata?.full_name || "Member",
                            email: user.email,
                            role: user?.user_metadata?.role || "contributor",
                            reward_balance: 0
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
                Please sign in to view your profile.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <button
                    onClick={handleSignOut}
                    className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 sm:flex sm:items-center sm:justify-between border-b border-gray-100 bg-gray-50/50">
                    <div className="sm:flex sm:space-x-5 items-center">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl font-bold">
                                {profile.full_name?.charAt(0) || <User className="w-10 h-10" />}
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:pt-1 text-center sm:text-left">
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {profile.full_name}
                            </p>
                            <p className="text-sm font-medium text-gray-600 mt-1 capitalize flex items-center justify-center sm:justify-start">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                {profile.role || 'Contributor'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-100">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 hover:bg-gray-50 transition-colors">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.email}
                            </dd>
                        </div>

                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 hover:bg-gray-50 transition-colors">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <Award className="w-4 h-4 mr-2 text-gray-400" />
                                Reward Balance
                            </dt>
                            <dd className="mt-1 text-sm font-semibold text-green-600 sm:mt-0 sm:col-span-2">
                                ₦{profile.reward_balance?.toLocaleString() || 0}
                            </dd>
                        </div>

                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 hover:bg-gray-50 transition-colors">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                Preferred Hub
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.hub_id ? "Kuchingoro Garamajiji" : "Not specified"}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
