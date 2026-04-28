"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <img src="/plastitrackbes-logo.png" alt="PlastiTrackBES Logo" className="h-16 w-16 object-contain mr-3" />
                            <span className="font-bold text-2xl text-primary">PlastiTrackBES</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                What We Do
                            </Link>
                            <Link href="/hubs" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Community Hubs
                            </Link>
                            <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Impact Dashboard
                            </Link>
                            <Link href="/store" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                ReVamp Store
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <Link href="/login" className="text-gray-500 hover:text-gray-700 font-medium">
                            Log in
                        </Link>
                        <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                            Join the Movement
                        </Link>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
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
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            What We Do
                        </Link>
                        <Link href="/hubs" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            Community Hubs
                        </Link>
                        <Link href="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            Impact Dashboard
                        </Link>
                        <Link href="/store" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            ReVamp Store
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4 space-x-4">
                            <Link href="/login" className="block text-base font-medium text-gray-500 hover:text-gray-800">
                                Log in
                            </Link>
                            <Link href="/register" className="block text-base font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                                Join the Movement
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
