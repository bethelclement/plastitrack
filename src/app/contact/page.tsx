import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Contact Team BES
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        Get in touch with us regarding partnerships, upcycling inquiries, or community hub operations in Abuja.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                                    <MapPin className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-bold text-gray-900">Our Hubs</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    Kuchingoro Garamajiji axis & Durumi informal settlement<br />
                                    Abuja, Nigeria
                                </p>
                            </div>
                        </div>

                        <div className="flex bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                                    <Phone className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-bold text-gray-900">Phone</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    +234 (0) 813 355 xxxx<br />
                                    +234 (0) 818 691 7401
                                </p>
                            </div>
                        </div>

                        <div className="flex bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-bold text-gray-900">Email</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    clementsbethel@gmail.com<br />
                                    blessingonwe29@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
