import { ShieldCheck, AlertCircle } from "lucide-react";

export default function PSEAPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">PSEA Policy</h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Protection against Sexual Exploitation and Abuse
                    </p>
                </div>

                <div className="prose prose-green max-w-none text-gray-600">
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
                        <div className="flex items-start">
                            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="text-red-800 font-bold mb-2">Zero Tolerance</h3>
                                <p className="text-red-700 m-0">
                                    PlastiTrack and Blessn Evea Signature (BES) maintain a strict zero-tolerance policy against any form of sexual exploitation or abuse. This applies to all staff, volunteers, hub operators, and partners involved in our projects.
                                </p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h3>
                    <p className="mb-6">
                        We are committed to providing a safe, respectful, and dignified environment for all community members, particularly women, youth, and vulnerable populations engaged in our plastic recovery hubs at Kuchingoro Garamajiji and Durumi.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Reporting Mechanism</h3>
                    <p className="mb-4">
                        If you witness or experience any form of exploitation or abuse related to our operations, you have multiple safe, confidential channels to report it:
                    </p>
                    <ul className="list-disc pl-6 mb-8 space-y-2">
                        <li><strong>Direct Hotline:</strong> Call our confidential PSEA officer at +234 800 BES PSEA.</li>
                        <li><strong>Email:</strong> Send a direct, confidential email to safe@plastitrack.org.</li>
                        <li><strong>In-Person:</strong> Submit a secure report to the independent community liaison officer at your local hub.</li>
                    </ul>

                    <p className="text-sm font-medium text-gray-500 italic mt-12 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        Note: All reporting mechanisms ensure complete anonymity if requested, and strict non-retaliation policies are enforced. Cases are handled promptly by a dedicated safeguarding committee.
                    </p>
                </div>
            </div>
        </div>
    );
}
