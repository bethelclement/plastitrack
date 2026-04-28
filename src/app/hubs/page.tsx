import { MapPin, Users, Activity, Phone } from "lucide-react";
import Link from "next/link";

export default function Hubs() {
    return (
        <div className="flex flex-col min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Community Hubs</h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        PlastiTrackBES operates through localized recovery hubs. These are the hearts of our community action.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Hub 1 */}
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                        <div className="h-48 bg-primary/20 flex items-center justify-center">
                            <MapPin className="h-16 w-16 text-primary/60" />
                        </div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kuchingoro Garamajiji Hub</h2>
                            <p className="text-gray-600 mb-6">
                                Our flagship pilot hub serving the Kuchingoro and Garamajiji axis. This location specializes in household aggregation and training local women operators.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Activity className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Handles daily weighing and digital logging for 200+ households</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Users className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Managed by 5 trained women operators</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Contact: +234 800 HUB ZERO</span>
                                </div>
                            </div>

                            <Link href="/member/pickup" className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90">
                                Book a Pickup Here
                            </Link>
                        </div>
                    </div>

                    {/* Hub 2 */}
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                        <div className="h-48 bg-blue-50 flex items-center justify-center">
                            <MapPin className="h-16 w-16 text-blue-300" />
                        </div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Durumi Informal Settlement Hub</h2>
                            <p className="text-gray-600 mb-6">
                                A high-impact location addressing acute plastic leakage. This hub works closely with the local eco club and focuses on PET and HDPE recovery.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Activity className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Integration with 2 local school eco clubs</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Users className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Managed by youth advocates and community leaders</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Contact: +234 800 HUB ONE1</span>
                                </div>
                            </div>

                            <Link href="/member/pickup" className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Book a Pickup Here
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500">
                        Interested in starting a hub in your community? <Link href="/contact" className="text-primary font-medium hover:underline">Contact us</Link> for our replication toolkit.
                    </p>
                </div>
            </div>
        </div>
    );
}
