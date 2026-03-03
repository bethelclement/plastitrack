"use client";

import { useEffect, useState } from "react";
import { User, Mail, Award, MapPin, Loader2, LogOut, Sparkles, TrendingUp, History } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

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
                            full_name: user?.user_metadata?.full_name || "Eco Warrior",
                            email: user.email,
                            role: user?.user_metadata?.role || "contributor",
                            reward_balance: 14500
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 bg-gray-50">
                <User className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-xl font-medium">Please sign in to view your profile.</p>
                <Link href="/login" className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-green-400/20 to-primary/10 rounded-b-[40%] blur-3xl -translate-y-20 -z-10 animate-pulse-slow"></div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-center bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 drop-shadow-sm tracking-tighter mb-2">
                            My Profile
                        </h1>
                        <p className="text-gray-500 font-medium tracking-wide">Manage your Green Revolution journey</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="mt-4 md:mt-0 flex items-center text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-all shadow-sm transform hover:-translate-y-0.5"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Avatar Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden text-center p-8 transform hover:-translate-y-1 transition-transform duration-300 relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-primary text-white flex items-center justify-center text-5xl font-black shadow-lg relative z-10 border-4 border-white">
                                    {profile.full_name?.charAt(0) || <User className="w-12 h-12" />}
                                </div>
                                <div className="absolute bottom-0 right-0 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg z-20 border-2 border-white" title="Verified Eco Warrior">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1 relative z-10">
                                {profile.full_name}
                            </h2>
                            <p className="text-green-600 font-bold uppercase tracking-widest text-xs relative z-10 flexItems-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-bounce"></span>
                                {profile.role || 'Contributor'}
                            </p>
                        </div>

                        {/* Quick Stats Mini Cards */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-2xl border border-green-100 shadow-sm text-center">
                                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-green-700">Level 4</div>
                                <div className="text-xs font-bold text-green-600/70 uppercase tracking-wider">Status</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-100 shadow-sm text-center">
                                <History className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-blue-700">12</div>
                                <div className="text-xs font-bold text-blue-600/70 uppercase tracking-wider">Pickups</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Balance */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Major 3D Balance Card */}
                        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 right-0 p-8 opacity-10 mix-blend-overlay">
                                <Award className="w-40 h-40 transform rotate-12" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-green-200 font-bold uppercase tracking-widest text-sm mb-2 flex items-center">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Available Reward Balance
                                </h3>
                                <div className="text-6xl sm:text-7xl font-black tracking-tighter drop-shadow-md text-transparent bg-clip-text bg-gradient-to-b from-white to-green-200 mb-6 py-2">
                                    ₦{profile.reward_balance?.toLocaleString() || "0"}
                                </div>
                                
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/store" className="bg-green-400 hover:bg-green-300 text-green-950 font-black py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 text-sm uppercase tracking-wide">
                                        Spend in ReVamp Store
                                    </Link>
                                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 font-bold py-3 px-6 rounded-xl transition-colors text-white text-sm uppercase tracking-wide">
                                        History
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Account Details List */}
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Account Details</h3>
                            </div>
                            <dl className="divide-y divide-gray-100">
                                <div className="px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-default group">
                                    <dt className="text-sm font-bold text-gray-500 flex items-center w-1/3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        Email Address
                                    </dt>
                                    <dd className="text-sm font-semibold text-gray-900 text-right w-2/3 truncate">
                                        {profile.email}
                                    </dd>
                                </div>

                                <div className="px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-default group">
                                    <dt className="text-sm font-bold text-gray-500 flex items-center w-1/3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        Designated Hub
                                    </dt>
                                    <dd className="text-sm font-semibold text-gray-900 text-right w-2/3">
                                        <span className="bg-green-100 text-green-800 py-1.5 px-4 rounded-full font-bold">
                                            {profile.hub_id ? "Kuchingoro Garamajiji" : "Central Hub (Unassigned)"}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
