import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center">
                            <Leaf className="h-6 w-6 text-primary" />
                            <span className="ml-2 font-bold text-lg text-primary">PlastiTrack</span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">
                            A community plastic recovery system in Abuja. Tracking waste, empowering women, and building a circular economy.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Project</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                                    What We Do
                                </Link>
                            </li>
                            <li>
                                <Link href="/hubs" className="text-base text-gray-500 hover:text-gray-900">
                                    Community Hubs
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-base text-gray-500 hover:text-gray-900">
                                    Impact Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/team" className="text-base text-gray-500 hover:text-gray-900">
                                    Team BES Leads
                                </Link>
                            </li>
                            <li>
                                <Link href="/store" className="text-base text-gray-500 hover:text-gray-900">
                                    ReVamp Store
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal & Partners</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/partners" className="text-base text-gray-500 hover:text-gray-900">
                                    Partners & Funders
                                </Link>
                            </li>
                            <li>
                                <Link href="/psea" className="text-base text-gray-500 hover:text-gray-900 font-medium">
                                    PSEA Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 text-center font-semibold mb-4">Supported By</p>
                    <div className="flex flex-wrap justify-center gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                        <span className="font-bold text-gray-600">SGP Nigeria</span>
                        <span className="font-bold text-gray-600">GEF</span>
                        <span className="font-bold text-gray-600">UNDP</span>
                        <span className="font-bold text-gray-600">Digital Peers International</span>
                    </div>
                    <p className="mt-8 text-base text-gray-400 xl:text-center">
                        &copy; {new Date().getFullYear()} Blessn Evea Signature - PlastiTrack. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
