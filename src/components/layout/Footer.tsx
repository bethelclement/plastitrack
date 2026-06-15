"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 mt-auto transition-colors duration-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center">
                            <img src="/plastitrackbes-logo.png" alt="PlastiTrackBES Logo" className="h-8 w-8 object-contain mr-2" />
                            <span className="font-bold text-lg text-primary dark:text-green-500">PlastiTrackBES</span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            A community plastic recovery system in Abuja. Tracking waste, empowering women, and building a circular economy.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">Project</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    What We Do
                                </Link>
                            </li>
                            <li>
                                <Link href="/hubs" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    Community Hubs
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    Impact Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/team" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    Team BES Leads
                                </Link>
                            </li>
                            <li>
                                <Link href="/store" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    ReVamp Store
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">Legal & Partners</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/partners" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    Partners & Funders
                                </Link>
                            </li>
                            <li>
                                <Link href="/psea" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium">
                                    PSEA Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Eco efficiency disclosure banner */}
                <div className="mt-8 p-6 bg-green-50/50 dark:bg-green-950/10 rounded-2xl border border-green-100 dark:border-green-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Leaf className="w-8 h-8 text-primary shrink-0" />
                        <div>
                            <h4 className="font-extrabold text-sm text-gray-900 dark:text-gray-100">Green Computing & Eco-Efficiency Disclosure</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                                This platform is optimized for low-carbon computing. Running on carbon-neutral hosting, it supports an interactive <strong>Eco Mode</strong> to disable animations and reduce client-side rendering power.
                            </p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('open-eco-modal'));
                            }}
                            className="text-xs font-bold text-primary dark:text-green-400 hover:text-primary/80 bg-white dark:bg-gray-900 px-4 py-2.5 rounded-xl border border-green-200 dark:border-green-900/50 shadow-sm transition-all whitespace-nowrap"
                        >
                            View Efficiency Stats
                        </button>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-900 pt-8">
                    <p className="text-base text-gray-400 dark:text-gray-500 text-center font-semibold mb-4">Supported By</p>
                    <div className="flex flex-wrap justify-center gap-8 items-center opacity-70 grayscale dark:invert dark:opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <span className="font-bold text-gray-600">SGP Nigeria</span>
                        <span className="font-bold text-gray-600">GEF</span>
                        <span className="font-bold text-gray-600">UNDP</span>
                        <span className="font-bold text-gray-600">Digital Peers International</span>
                    </div>
                    <p className="mt-8 text-base text-gray-400 dark:text-gray-500 xl:text-center">
                        &copy; {new Date().getFullYear()} Blessn Evea Signature - PlastiTrackBES. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
