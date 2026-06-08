"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Redirect will happen via auth state listener in a real app or manual navigation here
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleGoogleAuth = () => {
    setShowGoogleModal(true);
  };

  const triggerRealGoogleAuth = async () => {
    setShowGoogleModal(false);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during Google Sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithDemoAccount = async () => {
    setDemoLoading(true);
    setError(null);
    try {
      // 1. Try signing in with demo credentials
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: "demo@plastitrack.org",
        password: "password123",
      });

      if (signInError) {
        // 2. If user not found, register it
        const { error: signUpError } = await supabase.auth.signUp({
          email: "demo@plastitrack.org",
          password: "password123",
          options: {
            data: {
              full_name: "Demo Contributor",
              role: "contributor"
            }
          }
        });

        if (signUpError) {
          throw new Error(signUpError.message);
        }

        // 3. Retry signing in after signup
        const { error: retryError } = await supabase.auth.signInWithPassword({
          email: "demo@plastitrack.org",
          password: "password123",
        });

        if (retryError) {
          throw new Error(retryError.message);
        }
      }

      window.location.href = "/member/profile";
    } catch (err: any) {
      setError(err.message || "Demo login bypass failed.");
      setShowGoogleModal(false);
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your PlastiTrackBES dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm border border-red-100">
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
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs tracking-wider uppercase font-bold">Or login with email</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            href="/register"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Create an account
          </Link>
        </div>
      </div>

      {/* Google Configuration Modal */}
      {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div onClick={() => setShowGoogleModal(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"></div>
              <div className="relative bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200 shadow-2xl animate-scale-in text-center z-10">
                  <h3 className="text-xl font-black text-gray-900 mb-2">Google Auth Configuration</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
                      To use Google Sign-in on a live domain, you must configure Google credentials in your Supabase Dashboard. 
                  </p>
                  <div className="space-y-3">
                      <button
                          onClick={triggerRealGoogleAuth}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md shadow-green-600/10 text-sm"
                      >
                          Try Real Google Sign-In
                      </button>
                      <button
                          onClick={loginWithDemoAccount}
                          disabled={demoLoading}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
                      >
                          {demoLoading ? <Loader2 className="w-4 h-4 animate-spin text-gray-600" /> : "Use Demo Account Bypass"}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
