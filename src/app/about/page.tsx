import Link from "next/link";
import { ArrowRight, Target, Users, MapPin, CheckCircle2 } from "lucide-react";

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <div className="bg-primary/5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                        What We Do
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        PlastiTrackBES is turning the tide on plastic pollution in Abuja through structured, youth and women-led circular innovation.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">The Context</h2>
                        <p className="text-lg text-gray-600 mb-6 font-medium">
                            Nigeria generates over 2.5 million tonnes of plastic waste annually, with less than 10 percent effectively recycled.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Informal settlements in Abuja face recurring plastic leakage, drainage blockage, open burning, and unmanaged disposal. Women and youth in these communities are disproportionately affected yet remain underrepresented in formal waste value chains.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Existing responses focus heavily on awareness campaigns. Behaviour change does not sustain without structured incentives and visible systems. Plastic separation must become economically meaningful and digitally accountable.
                        </p>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h3 className="font-bold text-gray-900 flex items-center mb-3">
                                <Target className="h-5 w-5 mr-2 text-primary" />
                                Our Objective
                            </h3>
                            <p className="text-gray-700">
                                To design and implement a community-based, youth and women-led plastic recovery and upcycling system in Abuja, supported by a live data tracking website and e-commerce-enabled upcycling store that incentivises recycling behaviour.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Pilot Hubs</h2>
                        <p className="text-gray-600 mb-6">
                            The project is currently operating in two Abuja informal communities. Each hub receives sorted plastic, categorizes it, weighs and logs materials digitally, issues structured reward credits, and aggregates materials for upcycling.
                        </p>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex bg-white shadow-sm border border-gray-100 p-5 rounded-lg">
                                <div className="flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Kuchingoro Garamajiji Axis</h4>
                                    <p className="text-gray-500 mt-1">Serving local households and connecting informal collectors to fair value exchanges.</p>
                                </div>
                            </div>

                            <div className="flex bg-white shadow-sm border border-gray-100 p-5 rounded-lg">
                                <div className="flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Durumi Informal Settlement</h4>
                                    <p className="text-gray-500 mt-1">Empowering women operators and providing safe, structured plastic recovery.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Target Beneficiaries</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /> Women in informal settlements
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /> Youth in target communities
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /> School children through eco clubs
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center border-t border-gray-200 pt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to make an impact?</h2>
                    <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-primary/90">
                        View Live Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
