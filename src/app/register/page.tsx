"use client";

import { useState, useEffect } from "react";
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
    const [showOauthSetupModal, setShowOauthSetupModal] = useState(false);
    const [demoLoading, setDemoLoading] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            const google = (window as any).google;
            if (google) {
                google.accounts.id.initialize({
                    client_id: "82890405429-2n7cvusqcbu0tc9fu0cmuvvq69hiv80d.apps.googleusercontent.com",
                    callback: async (response: any) => {
                        setLoading(true);
                        setError(null);
                        try {
                            const { data, error } = await supabase.auth.signInWithIdToken({
                                provider: 'google',
                                token: response.credential,
                            });

                            if (error) {
                                setError(error.message);
                            } else {
                                window.location.href = "/dashboard";
                            }
                        } catch (err: any) {
                            setError(err.message || "An unexpected error occurred during Google Sign-in.");
                        } finally {
                            setLoading(false);
                        }
                    }
                });

                const container = document.getElementById("google-signin-button-container");
                if (container) {
                    google.accounts.id.renderButton(container, {
                        theme: "outline",
                        size: "large",
                        width: 382,
                        text: "signup_with", // Use signup text on register page!
                        shape: "rectangular"
                    });
                }
            }
        };

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

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

    const handleDemoBypass = async () => {
        setDemoLoading(true);
        setError(null);
        const demoEmail = "demo@plastitrack.org";
        const demoPassword = "PlastiTrackDemo2026!";
        
        try {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: demoEmail,
                password: demoPassword,
            });

            if (signInError) {
                if (signInError.message.includes("Invalid login credentials") || signInError.message.includes("Email not confirmed")) {
                    // Attempt to sign up the demo user first
                    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                        email: demoEmail,
                        password: demoPassword,
                        options: {
                            data: {
                                full_name: "Demo Contributor",
                                role: "contributor",
                            }
                        }
                    });

                    if (signUpError) {
                        setError(signUpError.message);
                    } else {
                        // Attempt to sign in again
                        const { error: retryError } = await supabase.auth.signInWithPassword({
                            email: demoEmail,
                            password: demoPassword,
                        });
                        if (retryError) {
                            if (retryError.message.includes("Email not confirmed")) {
                                setError("Demo account created, but email confirmation is required by your Supabase settings. Please check your Supabase dashboard to disable 'Confirm email' under Authentication -> Providers -> Email, or confirm the verification email sent to demo@plastitrack.org.");
                            } else {
                                setError(retryError.message);
                            }
                        } else {
                            window.location.href = "/dashboard";
                        }
                    }
                } else {
                    setError(signInError.message);
                }
            } else {
                window.location.href = "/dashboard";
            }
        } catch (err: any) {
            setError(err.message || "An error occurred during demo login.");
        } finally {
            setDemoLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    skipBrowserRedirect: true
                }
            });
            if (error) {
                if (error.message.includes("provider is not enabled") || error.message.includes("Unsupported provider")) {
                    setShowOauthSetupModal(true);
                } else {
                    setError(error.message);
                }
            } else if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err: any) {
            const msg = err.message || "";
            if (msg.includes("provider is not enabled") || msg.includes("Unsupported provider")) {
                setShowOauthSetupModal(true);
            } else {
                setError(msg || "An unexpected error occurred during Google Sign-in.");
            }
        } finally {
            setLoading(false);
        }
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
                <div id="google-signin-button-container" className="w-full flex justify-center mb-6 min-h-[44px] items-center">
                    <button 
                        onClick={handleGoogleAuth}
                        type="button" 
                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>

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

            {showOauthSetupModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
                        
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between text-left">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">⚠️</div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">Google Auth Setup Required</h3>
                                    <p className="text-xs text-gray-500 font-medium">Resolution guide for PlastiTrackBES deployment</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowOauthSetupModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-50 rounded-xl transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto space-y-6 text-left">
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-sm text-amber-800 leading-relaxed font-medium">
                                It looks like the <strong>Google Identity Provider</strong> has not been enabled yet in your Supabase authentication settings. Click the "Demo Bypass" button below to log in immediately, or follow the steps to complete your Google OAuth setup.
                            </div>

                            {/* Option 1: Demo Bypass */}
                            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl border border-green-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 uppercase tracking-wide">Option 1 (Fastest)</span>
                                    <h4 className="text-base font-bold text-gray-900 font-sans">One-Click Demo Bypass</h4>
                                    <p className="text-xs text-gray-600 font-medium">Bypass OAuth checks and immediately access the interactive dashboard as a demo user.</p>
                                </div>
                                <button
                                    onClick={handleDemoBypass}
                                    disabled={demoLoading}
                                    className="shrink-0 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {demoLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In as Demo User"}
                                </button>
                            </div>

                            {/* Option 2: Step-by-Step Setup */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wide">Option 2 (Production)</span>
                                    <h4 className="text-base font-bold text-gray-900 font-sans">How to Enable Google Provider</h4>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold shrink-0 text-xs">1</span>
                                        <div>
                                            <p className="font-bold text-gray-800">Generate Client ID & Secret in Google Cloud</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                In your Google Cloud Console (under APIs & Services &gt; Credentials), create an OAuth Client ID for a <strong>Web application</strong>.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold shrink-0 text-xs">2</span>
                                        <div>
                                            <p className="font-bold text-gray-800">Configure Redirect URIs</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                In your Google Console client page, under <strong>Authorized redirect URIs</strong>, add your Supabase project's redirect URI:
                                                <code className="block mt-1 p-2 bg-gray-50 border border-gray-150 rounded text-xs select-all font-mono break-all text-gray-800">
                                                    {(() => {
                                                        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ctsnwbjuvfawypsygtdj.supabase.co";
                                                        return url.endsWith('/') ? `${url}auth/v1/callback` : `${url}/auth/v1/callback`;
                                                    })()}
                                                </code>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold shrink-0 text-xs">3</span>
                                        <div>
                                            <p className="font-bold text-gray-800">Enable Google in Supabase</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Go to your Supabase Dashboard &gt; <strong>Authentication</strong> &gt; <strong>Sign In / Providers</strong> &gt; <strong>Google</strong>. 
                                                Toggle it to <strong>ON</strong>, paste your Client ID and Client Secret, and click <strong>Save</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setShowOauthSetupModal(false)}
                                className="bg-white hover:bg-gray-100 text-gray-700 font-bold border border-gray-200 px-4 py-2 rounded-xl text-sm transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
