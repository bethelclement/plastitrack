import { Users, Handshake, ShieldCheck } from "lucide-react";

const PARTNERS = [
    {
        name: "SGP Nigeria",
        role: "Strategic Partner",
        description: "Supporting community-based environmental initiatives in Nigeria.",
    },
    {
        name: "Global Environment Facility (GEF)",
        role: "Core Funder",
        description: "Providing critical grant funding for grassroots sustainability projects.",
    },
    {
        name: "UNDP",
        role: "Implementation Partner",
        description: "Aligning local circular economy efforts with global sustainable development goals.",
    },
    {
        name: "Digital Peers International (DPI)",
        role: "Project Incubator",
        description: "Driving the SGP 2.0 Plastic Waste Solutions initiative.",
    },
    {
        name: "Plastic Waste Solutions 2.0",
        role: "Program Framework",
        description: "The overarching framework guiding impactful plastic reduction in Nigeria.",
    },
];

export default function PartnersPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Funders & Partners
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        PlastiTrackBES and Blessn Evea Signature are supported by leading institutions committed to the circular economy and Nigeria's NDC 3.0 waste-sector goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PARTNERS.map((partner, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <Handshake className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                            <p className="text-sm font-semibold text-primary mt-1 mb-4">{partner.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{partner.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-green-900 rounded-3xl p-12 text-center text-white">
                    <ShieldCheck className="w-12 h-12 text-green-300 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">Accountability at the Core</h2>
                    <p className="max-w-3xl mx-auto text-green-100 text-lg">
                        Our live tracking system and traceable upcycled products ensure that every grant dollar and partnership effort yields visible, measurable results in our pilot communities.
                    </p>
                </div>
            </div>
        </div>
    );
}
