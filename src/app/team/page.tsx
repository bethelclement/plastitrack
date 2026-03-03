import { Linkedin, Twitter, Mail } from "lucide-react";

export default function TeamPage() {
    const team = [
        {
            name: "Blessing Evea Onwe",
            role: "Lead Director / Founder",
            bio: "Spearheads the PlastiTrack initiative under Blessn Evea Signature (BES), driving community engagement and women empowerment in Abuja."
        },
        {
            name: "Bethel Clement",
            role: "Operations & Tech Lead",
            bio: "Oversees the digital tracking infrastructure, hubs management, and the ReVamp upcycling workflow."
        },
        {
            name: "Kenneth Anietie Nyong",
            role: "Community Relations Manager",
            bio: "Liaises directly with the Kuchingoro Garamajiji and Durumi hubs, ensuring steady growth and seamless onboarding of households."
        },
        {
            name: "Wakala Bilkisu",
            role: "Upcycling & Product Development",
            bio: "Directs the conversion of recovered plastics into durable goods like eco-pavers and tote bags at the ReVamp facility."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Meet the Team</h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                        The dedicated BES Leads driving the PlastiTrack mission forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {team.map((member, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                            <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl font-bold flex-shrink-0">
                                {member.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-primary font-medium mt-1 mb-4">{member.role}</p>
                                <p className="text-gray-600 mb-6">{member.bio}</p>

                                <div className="flex justify-center sm:justify-start gap-4">
                                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                                        <span className="sr-only">Email</span>
                                        <Mail className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
