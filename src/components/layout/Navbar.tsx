"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Leaf, Sun, Moon, ShieldCheck, Sparkles, Cpu, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [ecoMode, setEcoMode] = useState(false);
    const [showEcoModal, setShowEcoModal] = useState(false);

    useEffect(() => {
        // Auth session listener
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // Initialize Theme & Eco-Mode
        const storedTheme = localStorage.theme;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }

        const storedEcoMode = localStorage.ecoMode === 'true';
        if (storedEcoMode) {
            setEcoMode(true);
            document.documentElement.classList.add('eco-mode');
        } else {
            setEcoMode(false);
            document.documentElement.classList.remove('eco-mode');
        }

        // Global event to open the modal from footer
        const handleOpenEcoModal = () => {
            setShowEcoModal(true);
        };
        window.addEventListener('open-eco-modal', handleOpenEcoModal);

        return () => {
            subscription.unsubscribe();
            window.removeEventListener('open-eco-modal', handleOpenEcoModal);
        };
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    const toggleEcoMode = () => {
        const nextEcoMode = !ecoMode;
        setEcoMode(nextEcoMode);
        if (nextEcoMode) {
            document.documentElement.classList.add('eco-mode');
            localStorage.ecoMode = 'true';
        } else {
            document.documentElement.classList.remove('eco-mode');
            localStorage.ecoMode = 'false';
        }
    };

    return (
        <nav className="border-b bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-900 transition-colors duration-200 relative z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <img src="/plastitrackbes-logo.png" alt="PlastiTrackBES Logo" className="h-16 w-16 object-contain mr-3" />
                            <span className="font-bold text-2xl text-primary dark:text-green-500">PlastiTrackBES</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/about" className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                What We Do
                            </Link>
                            <Link href="/hubs" className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Community Hubs
                            </Link>
                            <Link href="/dashboard" className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Impact Dashboard
                            </Link>
                            <Link href="/traceability" className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Traceability
                            </Link>
                            <Link href="/store" className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                ReVamp Store
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        {/* Eco Switcher Button */}
                        <button
                            onClick={() => setShowEcoModal(true)}
                            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all flex items-center gap-1.5 mr-2 border border-gray-200 dark:border-gray-800"
                            title="Eco Mode & Accessibility Settings"
                        >
                            <Leaf className={`w-4 h-4 text-green-600 dark:text-green-500 ${ecoMode ? "animate-pulse" : ""}`} />
                            <span className="text-xs font-black tracking-tight text-gray-700 dark:text-gray-300">Eco Settings</span>
                        </button>

                        {user ? (
                            <>
                                <Link href="/member/profile" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-bold bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2 rounded-xl text-sm transition-all">
                                    My Profile
                                </Link>
                                <button
                                    onClick={async () => { await supabase.auth.signOut(); window.location.href = "/"; }}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm transition-colors"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium text-sm transition-colors">
                                    Log in
                                </Link>
                                <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
                                    Join the Movement
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                            What We Do
                        </Link>
                        <Link href="/hubs" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                            Community Hubs
                        </Link>
                        <Link href="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                            Impact Dashboard
                        </Link>
                        <Link href="/traceability" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                            Traceability
                        </Link>
                        <Link href="/store" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                            ReVamp Store
                        </Link>
                    </div>

                    {/* Mobile Settings Switches */}
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-900 space-y-3">
                        <div className="flex justify-between items-center py-1.5">
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Leaf className="w-4 h-4 text-green-600" /> Eco Mode (Green Code)
                            </span>
                            <button
                                onClick={toggleEcoMode}
                                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                    ecoMode ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                        ecoMode ? "translate-x-5" : "translate-x-0"
                                    }`}
                                ></div>
                            </button>
                        </div>
                        <div className="flex justify-between items-center py-1.5">
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                {theme === 'dark' ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                                Dark Theme (Save OLED)
                            </span>
                            <button
                                onClick={toggleTheme}
                                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                    theme === 'dark' ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                        theme === 'dark' ? "translate-x-5" : "translate-x-0"
                                    }`}
                                ></div>
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-900">
                        <div className="flex items-center px-4 space-x-4">
                            {user ? (
                                <>
                                    <Link href="/member/profile" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900">
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={async () => { await supabase.auth.signOut(); window.location.href = "/"; }}
                                        className="block text-base font-medium text-red-500 hover:text-red-700 mt-2"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="block text-base font-medium text-gray-500 hover:text-gray-800">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="block text-base font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                                        Join the Movement
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Eco & Accessibility Config Modal */}
            {showEcoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={() => setShowEcoModal(false)} className="absolute inset-0 bg-gray-950/40 backdrop-blur-md"></div>
                    
                    <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 dark:border-gray-800 animate-scale-in">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-green-600 dark:text-green-500" /> Green Tech & Accessibility Settings
                            </h3>
                            <button
                                onClick={() => setShowEcoModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Switchers */}
                            <div className="space-y-4 bg-gray-55 dark:bg-gray-950/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                                            <Leaf className="w-4 h-4 text-green-600" /> Eco Mode (Low-Carbon Code)
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs leading-normal">
                                            Disables complex scroll animations and transition loops. Reduces device rendering power, saving up to 40% CPU energy and battery power.
                                        </p>
                                    </div>
                                    <button
                                        onClick={toggleEcoMode}
                                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                                            ecoMode ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                                        }`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                                ecoMode ? "translate-x-5" : "translate-x-0"
                                            }`}
                                        ></div>
                                    </button>
                                </div>

                                <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 flex justify-between items-start">
                                    <div>
                                        <h4 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                                            {theme === 'dark' ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                                            Dark Theme (High Contrast)
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs leading-normal">
                                            Optimizes readability in low light and reduces OLED screen power consumption by up to 60%.
                                        </p>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                                            theme === 'dark' ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                                        }`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                                theme === 'dark' ? "translate-x-5" : "translate-x-0"
                                            }`}
                                        ></div>
                                    </button>
                                </div>
                            </div>

                            {/* Digital Carbon Footprint stats */}
                            <div>
                                <h4 className="text-xs font-extrabold uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-3">
                                    Digital Carbon Footprint Disclosure
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { icon: <Cpu className="w-4 h-4 text-purple-500" />, label: "Server Power", val: "100% Wind/Solar", desc: "Carbon Neutral hosting" },
                                        { icon: <ShieldCheck className="w-4 h-4 text-blue-500" />, label: "Platform Rating", val: "A+ Rating", desc: "Outperforms 96% of webs" },
                                        { icon: <Sparkles className="w-4 h-4 text-yellow-500" />, label: "CO2e per Load", val: "0.04 g CO2e", desc: "Strictly minimized files" },
                                        { icon: <Award className="w-4 h-4 text-green-500" />, label: "Build Caching", val: "SSG & ISR Pages", desc: "Zero database waste" }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-150 dark:border-gray-800/60 flex items-start gap-3">
                                            <div className="mt-0.5 p-1.5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200/50 dark:border-gray-800">
                                                {stat.icon}
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block leading-none">{stat.label}</span>
                                                <span className="text-sm font-black text-gray-800 dark:text-gray-100 block mt-1 leading-none">{stat.val}</span>
                                                <span className="text-[9px] text-gray-400 mt-1 block leading-normal">{stat.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed italic text-center">
                                Green Computing Practice: Keeping client bundles light and static reduces overall web energy demand. Thank you for support.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
