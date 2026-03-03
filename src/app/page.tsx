import Link from "next/link";
import { ArrowRight, BarChart3, Recycle, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            PLASTICS <span className="text-primary">REIMAGINED</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10">
            PlastiTrack is a community plastic recovery system built in Abuja. We run women led collection hubs, track plastic recovery with public data, and convert waste into durable products through the ReVamp Store.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10">
              Join the Movement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              View Impact Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do Summary */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">What We Do</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We collect and sort plastic by category at community hubs. We log every kilogram, publish weekly totals, and reward contributors through cash credits, vouchers, school support, or discounts on upcycled products.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Recycle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Recovery</h3>
              <p className="text-gray-500">
                Operating pilot hubs in the Kuchingoro Garamajiji axis and Durumi informal settlement. Support your local hub today.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Tracking</h3>
              <p className="text-gray-500">
                Every piece of plastic is logged digitally, categorized (PET, HDPE, PP, etc.), and displayed transparently on our public dashboard.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Youth & Women Led</h3>
              <p className="text-gray-500">
                Hubs are operated by trained youth and women who earn from aggregation margins and upcycled product production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-12 lg:mb-16">
              Register an account. Request pickup or drop at a hub. Your plastic is weighed and categorized. Your contributions appear in your profile. Rewards are issued based on verified entries. Weekly totals appear on the public dashboard.
            </p>
          </div>
          <div className="mt-10 max-w-md mx-auto sm:max-w-3xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {[
                { step: "1", title: "Register", desc: "Create a free contributor account." },
                { step: "2", title: "Drop/Pickup", desc: "Bring plastic to a hub or book a local pickup." },
                { step: "3", title: "Earn Rewards", desc: "Get cash credits, vouchers, or upcycle discounts." },
                { step: "4", title: "Track Impact", desc: "See your total impact and the community's progress." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Funding & Project Context aligned to SGP 2.0 */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
            A Practical Case Study in Circular Innovation
          </h2>
          <p className="mt-2 text-xl font-medium text-gray-900">
            Digital Tracking and Youth/Women Led Plastic Recovery in Abuja
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
            This project aligns with Nigeria’s circular economy roadmap and NDC 3.0 waste-sector commitments.
          </p>
        </div>
      </section>
    </div>
  );
}
