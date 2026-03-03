"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2, Building, ShieldCheck, Leaf } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("contributor"); // default mapping for User
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        role: role
                    }
                }
            });

            if (signUpError) {
                setError(signUpError.message);
            } else {
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        // Implementation for Google OAuth
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-green-400 to-primary"></div>
                    <div className="w-20 h-20 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Mail className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Check Your Email</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Welcome to the movement! We've sent a verification link to <strong className="text-gray-900">{email}</strong>. Please click the link to activate your account.
                    </p>
                    <Link href="/login" className="inline-flex items-center justify-center w-full bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                        Return to login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-green-400 to-primary"></div>
                
                <div className="text-center mb-8 pt-4">
                    <div className="flex justify-center mb-4">
                       <Leaf className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                        Thank You for Joining<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500">The Green Revolution</span>
                    </h2>
                    <p className="mt-3 text-sm text-gray-500 font-medium">
                        Track your recovery, earn rewards, and build a circular Abuja.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50/80 text-red-600 text-sm border border-red-100 flex items-start font-medium shadow-sm">
                        <ShieldCheck className="w-5 h-5 mr-2 shrink-0" />
                        {error}
                    </div>
                )}

                {/* Google Auth Button */}
                <button 
                    onClick={handleGoogleAuth}
                    type="button" 
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all mb-6 shadow-sm"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs tracking-wider uppercase font-bold">Or register with email</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <form className="space-y-5" onSubmit={handleSignup}>
                    {/* Role Selector */}
                    <div className="grid grid-cols-3 gap-3 mb-2">
                        {[
                            { id: "contributor", label: "User", icon: <User className="w-4 h-4 mb-2" /> },
                            { id: "vendor", label: "Vendor", icon: <Building className="w-4 h-4 mb-2" /> },
                            { id: "partner", label: "Partner", icon: <ShieldCheck className="w-4 h-4 mb-2" /> }
                        ].map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className={`flex flex-col items-center justify-center py-3 border-2 rounded-xl text-sm font-bold transition-all ${
                                    role === r.id 
                                    ? "border-primary bg-primary/5 text-primary shadow-sm" 
                                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                {r.icon}
                                {r.label}
                            </button>
                        ))}
                    </div>

                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary sm:text-sm font-medium transition-colors shadow-sm"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary sm:text-sm font-medium transition-colors shadow-sm"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary sm:text-sm font-medium transition-colors shadow-sm"
                                placeholder="Password (min 6 chars)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gray-900 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Initialize Account <ArrowRight className="ml-2 w-4 h-4" />
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-gray-500 font-medium pt-2">
                        By joining, you agree to the <Link href="/psea" className="text-primary hover:underline">PSEA Policy</Link>.
                    </p>
                </form>

                <div className="mt-8 text-center text-sm border-t border-gray-100 pt-6">
                    <span className="text-gray-600 font-medium">Already part of the movement? </span>
                    <Link
                        href="/login"
                        className="font-bold text-primary hover:text-green-700 ml-1"
                    >
                        Sign in Here
                    </Link>
                </div>
            </div>
        </div>
    );
}
