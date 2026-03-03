import { Download, FileText, FileBarChart } from "lucide-react";

const RESOURCES = [
    {
        title: "PLASTICS REIMAGINED: Core Document",
        type: "PDF Concept Note",
        description: "A Practical Case Study in Circular Innovation, Digital Tracking and Youth/Women Led Plastic Recovery in Abuja.",
        icon: <FileText className="w-8 h-8 text-primary" />,
        size: "2.4 MB"
    },
    {
        title: "Monthly Impact Report: January 2026",
        type: "Data Summary",
        description: "Detailed breakdown of metrics across Kuchingoro Garamajiji and Durumi hubs.",
        icon: <FileBarChart className="w-8 h-8 text-primary" />,
        size: "1.1 MB"
    },
    {
        title: "Hub Operations Playbook",
        type: "Replication Toolkit",
        description: "Standard operating procedures for setting up and running a women-led plastic recovery hub.",
        icon: <FileText className="w-8 h-8 text-primary" />,
        size: "3.5 MB"
    }
];

export default function ResourcesPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Project Resources
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        Download our core project documents, impact reports, and playbooks to understand our operational model.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {RESOURCES.map((resource, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="flex-shrink-0 bg-white p-4 rounded-xl border border-gray-100 mb-4 sm:mb-0">
                                {resource.icon}
                            </div>
                            <div className="sm:ml-6 flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                                        {resource.type}
                                    </span>
                                    <span className="text-gray-400 text-sm font-medium">{resource.size}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
                                <p className="mt-1 text-gray-500 text-sm leading-relaxed">{resource.description}</p>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-6">
                                <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
                                    <Download className="w-4 h-4 mr-2 text-primary" />
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
