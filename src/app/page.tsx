"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, BarChart3, Recycle, Users, Sparkles, Leaf, Trash2, Zap, Award } from "lucide-react";

const MATERIAL_FACTORS: Record<string, { co2: number; landfill: number; energy: number; name: string; desc: string }> = {
  PET: { co2: 1.5, landfill: 30, energy: 5.7, name: "PET (Water/Soda Bottles)", desc: "Commonly used for beverage containers and packaging. Upcycled into fibers and accessories." },
  HDPE: { co2: 1.6, landfill: 32, energy: 6.1, name: "HDPE (Milk Jugs/Shampoo)", desc: "High density, rigid plastic. Melted and pressed into durable tiles and building structures." },
  PP: { co2: 1.7, landfill: 35, energy: 6.4, name: "PP (Bottle Caps/Containers)", desc: "Sturdy and heat-resistant plastic. Upcycled into modular builds and organizer bins." },
  LDPE: { co2: 1.4, landfill: 28, energy: 5.2, name: "LDPE (Squeeze Bottles/Bags)", desc: "Flexible low-density plastic. Recycled into film, trash cans, and plastic lumber." },
};

export default function Home() {
  const [weight, setWeight] = useState(50);
  const [material, setMaterial] = useState("PET");

  const factor = MATERIAL_FACTORS[material];
  const co2Saved = (weight * factor.co2).toFixed(1);
  const landfillSaved = (weight * factor.landfill).toFixed(0);
  const energySaved = (weight * factor.energy).toFixed(1);
  const pointsEarned = Math.round(weight * 10);
  const treesEquivalent = ((weight * factor.co2) / 22).toFixed(2);

  // Fallback for scroll animations (IntersectionObserver fallback for non-supporting browsers)
  useEffect(() => {
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
          });
        },
        { threshold: 0.05 }
      );
      document.querySelectorAll('.scroll-reveal-item').forEach((el) => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
        observer.observe(el);
      });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden relative">
      {/* Background abstract gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-green-50/50 via-white to-transparent pointer-events-none -z-10"></div>
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200/50 text-green-700 text-sm font-bold mb-6 animate-scale-in">
            <Sparkles className="h-4 w-4 text-green-500 animate-spin-slow" />
            Empowering Abuja Communities Through Circular Innovation
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6 leading-tight animate-fade-in-up">
            PLASTICS <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">REIMAGINED</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            PlastiTrackBES is a community plastic recovery system built in Abuja. We run women-led collection hubs, track plastic recovery with public data, and convert waste into durable products through the ReVamp Store.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-green-600 hover:bg-green-700 transition-all hover:scale-[1.02] shadow-lg shadow-green-600/10 md:py-4 md:text-lg md:px-10">
              Join the Movement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-lg font-bold rounded-2xl text-gray-700 bg-white hover:bg-gray-50 transition-all hover:scale-[1.02] shadow-sm md:py-4 md:text-lg md:px-10">
              View Impact Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-reveal-item">
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-100/30 rounded-full blur-3xl -z-10 translate-x-20 -translate-y-20"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Calculator Inputs */}
            <div>
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full mb-4 inline-block">Eco Calculator</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Calculate Your Impact</h2>
              <p className="text-gray-500 mb-8 font-medium">
                Select a plastic type and slider weight to see the real-world environmental savings you generate when turning waste over to PlastiTrackBES.
              </p>

              {/* Material Tabs */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {Object.keys(MATERIAL_FACTORS).map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setMaterial(mat)}
                    className={`py-3 px-2 rounded-xl font-bold text-sm text-center transition-all ${
                      material === mat
                        ? "bg-green-600 text-white shadow-md shadow-green-600/10"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-500 font-medium leading-relaxed">
                <strong className="text-gray-800">{MATERIAL_FACTORS[material].name}</strong>: {MATERIAL_FACTORS[material].desc}
              </div>

              {/* Weight Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700">Estimated Weight</label>
                  <span className="text-3xl font-black text-green-700 tracking-tight">
                    {weight} <span className="text-sm font-bold text-green-600">kg</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>5 kg</span>
                  <span>250 kg</span>
                  <span>500 kg</span>
                </div>
              </div>
            </div>

            {/* Calculator Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <Leaf className="absolute right-4 top-4 w-12 h-12 text-white/10" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-100 block mb-2">CO2 Avoided</span>
                <span className="text-3xl font-black tracking-tight">{co2Saved} kg</span>
                <p className="text-[10px] text-green-100 mt-2 font-medium">Equiv. to {treesEquivalent} trees absorbing carbon for a year</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <Trash2 className="absolute right-4 top-4 w-12 h-12 text-gray-100" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Landfill Diverted</span>
                <span className="text-3xl font-black text-gray-800 tracking-tight">{landfillSaved} L</span>
                <p className="text-[10px] text-gray-500 mt-2 font-medium">Volumetric landfill space prevented from being clogged</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <Zap className="absolute right-4 top-4 w-12 h-12 text-gray-100" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Energy Conserved</span>
                <span className="text-3xl font-black text-gray-800 tracking-tight">{energySaved} kWh</span>
                <p className="text-[10px] text-gray-500 mt-2 font-medium">Electricity equivalent saved from new plastics synthesis</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <Award className="absolute right-4 top-4 w-12 h-12 text-white/10" />
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-100 block mb-2">Estimated Rewards</span>
                <span className="text-3xl font-black tracking-tight">{pointsEarned} pts</span>
                <p className="text-[10px] text-yellow-100 mt-2 font-medium">Exchangeable for NGN credit vouchers & upcycled items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Summary */}
      <section className="bg-gray-100/50 py-20 border-y border-gray-200/50 scroll-reveal-item">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full mb-4 inline-block">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">What We Do</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 mb-10 font-medium">
              We collect and sort plastic by category at community hubs. We log every kilogram, publish weekly totals, and reward contributors through cash credits, vouchers, school support, or discounts on upcycled products.
            </p>
            <img src="/images/team-photo.jpg" alt="Team BES PlastiTrackBES" className="w-full max-w-5xl mx-auto rounded-3xl shadow-xl object-cover h-[400px]" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="bg-green-50 p-4 rounded-2xl">
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Recovery</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Operating pilot hubs in the Kuchingoro Garamajiji axis and Durumi informal settlement. Support your local hub today.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="bg-green-50 p-4 rounded-2xl">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Tracking</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Every piece of plastic is logged digitally, categorized (PET, HDPE, PP, etc.), and displayed transparently on our public dashboard.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="bg-green-50 p-4 rounded-2xl">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Youth & Women Led</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Hubs are operated by trained youth and women who earn from aggregation margins and upcycled product production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Successful Projects */}
      <section className="bg-white py-20 scroll-reveal-item">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full mb-4 inline-block">Milestones</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Successful Projects & Milestones</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 font-medium">
              Our journey of sensitization, partnership, and recognition in the circular economy space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col gap-6 text-left transition-transform hover:-translate-y-1 duration-300">
              <img src="/images/waste-2-wonder.jpg" alt="Waste 2 Wonder Project" className="w-full h-48 rounded-2xl object-cover shadow-lg" />
              <div>
                <span className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2 block bg-green-50 w-max px-3 py-1 rounded-full">World Earth Day 2026</span>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Partnered with Climate Teen Hub</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  We commemorated World Earth Day by teaching teens from multiple countries (majority from Nigeria) how to turn waste into art, focusing heavily on PET bottles to combat pollution.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col gap-6 text-left transition-transform hover:-translate-y-1 duration-300 justify-between">
              <div>
                <span className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2 block bg-blue-50 w-max px-3 py-1 rounded-full">Sensitization</span>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Preteen & Teen Creative Upcycling</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  For our initial phase, we targeted preteens and teens to raise awareness on the environmental impact of plastic waste. We trained them on creative upcycling (turning plastic into wall-decors and accessories) so they can see firsthand how their choices clean the environment and beautify their rooms.
                </p>
              </div>
              <div className="border-t border-gray-200/60 pt-6">
                <span className="text-sm font-bold tracking-widest text-purple-600 uppercase mb-2 block bg-purple-50 w-max px-3 py-1 rounded-full">Media & Recognition</span>
                <ul className="list-disc pl-5 text-gray-600 font-medium space-y-2">
                  <li><strong>Award Nomination:</strong> Officially nominated for an environmental impact award.</li>
                  <li><strong>Kiss FM Feature:</strong> Our Assistant Team Lead was invited by Kiss FM to discuss the vital work we do on national radio.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CREATIVE REVAMP! MARKETING SECTION ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 scroll-reveal-item">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: Two creative photos stacked/overlapping */}
            <div className="relative flex justify-center lg:justify-start" style={{minHeight: "520px"}}>
              {/* Main model portrait */}
              <div className="relative z-10">
                <img
                  src="/images/uptex-model-closeup.jpg"
                  alt="Model wearing UpTex green earrings and wristbands"
                  className="w-72 h-[460px] object-cover object-top rounded-3xl shadow-2xl shadow-black/60 border-4 border-emerald-400/30"
                />
                {/* Floating "Made from Waste" chip */}
                <div className="absolute -top-4 -left-4 bg-emerald-400 text-emerald-950 px-4 py-2 rounded-2xl shadow-lg rotate-[-3deg]">
                  <p className="text-[10px] font-black uppercase tracking-widest">Made From Waste</p>
                  <p className="text-sm font-black">🍃 PET + HDPE</p>
                </div>
              </div>
              {/* Second earring display photo — offset bottom-right */}
              <div className="absolute bottom-0 right-0 lg:right-8 z-20">
                <img
                  src="/images/uptex-model-display-1.jpg"
                  alt="Model holding UpTex earring display card"
                  className="w-52 h-72 object-cover object-top rounded-2xl shadow-2xl shadow-black/40 border-2 border-white/20 rotate-[3deg]"
                />
                {/* Price tag chip */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-emerald-900 px-5 py-2 rounded-full shadow-xl">
                  <p className="font-black text-sm whitespace-nowrap">From ₦2,500 ✦</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Marketing copy */}
            <div className="pt-8 lg:pt-0">
              <span className="inline-block text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full mb-6">
                ✦ ReVamp! Boutique — Why Buy From Us?
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                Your Earrings Were
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  Someone's Trash.
                </span>
              </h2>

              <p className="text-emerald-100/75 text-lg leading-relaxed mb-8 font-medium">
                Every item in the ReVamp! Store is handcrafted by women in Abuja's informal settlements 
                from plastic waste recovered before it reached your local drain. You're not just buying jewellery — 
                you're buying a traceable circular act.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: "♻️", label: "100% Upcycled", sub: "Zero virgin plastic. Every earring, bead & wristband is recovered PET/HDPE." },
                  { icon: "🔍", label: "Full Traceability", sub: "Search your order ID and see exactly which hub collected it & who crafted it." },
                  { icon: "💚", label: "Community Impact", sub: "Profits fund women-led hubs in Kuchingoro & Durumi. You pay, they earn." },
                  { icon: "🎨", label: "Natural Colours Only", sub: "No artificial dyes — colours come directly from sorted plastic pigmentation." },
                ].map(f => (
                  <div key={f.label} className="flex items-start gap-4 group">
                    <span className="text-2xl mt-0.5 shrink-0">{f.icon}</span>
                    <div>
                      <span className="font-black text-white block text-sm group-hover:text-emerald-400 transition-colors">{f.label}</span>
                      <span className="text-emerald-200/55 text-xs leading-relaxed">{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { name: "Wristbeads", price: "₦1,500" },
                  { name: "Earrings", price: "₦2,500" },
                  { name: "Palette Set", price: "₦5,000" },
                  { name: "Loop Game", price: "₦7,000" },
                ].map(p => (
                  <div key={p.name} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                    <span className="text-[10px] text-emerald-300/70 font-bold block uppercase tracking-widest">{p.name}</span>
                    <span className="text-white font-black text-sm">{p.price}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/store"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/30 text-base"
              >
                Shop the ReVamp! Collection
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Funders & Sponsors */}
      <section className="bg-gray-100/50 py-16 border-t border-gray-200/50 scroll-reveal-item">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-8 block">Supported & Funded By</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 transition-all duration-300">
            <img src="/images/undp_logo.png" alt="UNDP Logo" className="h-16 object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <img src="/images/gef_logo.png" alt="GEF Logo" className="h-20 object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <img src="/images/sgp_logo.png" alt="SGP Logo" className="h-16 object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <div className="flex flex-col items-center justify-center h-16 hover:scale-105 transition-transform">
              <span className="font-black text-3xl text-blue-900 tracking-tighter">DPI</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Digital Peers International</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-20 scroll-reveal-item">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full mb-4 inline-block">Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 mb-12 lg:mb-16 font-medium">
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
                <div key={item.step} className="text-center group">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-600 group-hover:bg-green-700 text-white mx-auto text-2xl font-bold mb-4 shadow-md transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Behavioral Change & Community Impact */}
      <section className="bg-green-950 py-20 text-white text-center sm:text-left relative overflow-hidden scroll-reveal-item">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-green-300 uppercase tracking-widest bg-green-900/40 px-3 py-1.5 rounded-full mb-4 inline-block">Behavourial Change</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-6">
                Driving Real Behavioural Change
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-lg leading-relaxed">
                We believe that structured incentives and visible systems change habits. We are moving communities from occasional cleanups to daily circular systems.
              </p>
              <ul className="space-y-4 text-green-50 tracking-wide font-medium">
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center mr-3 shadow-inner text-green-300 font-bold">✓</span>
                  School Eco Clubs & Competitions
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center mr-3 shadow-inner text-green-300 font-bold">✓</span>
                  Leaderboards by Community & School
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center mr-3 shadow-inner text-green-300 font-bold">✓</span>
                  Weekly Community Impact Posts
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-900/50 backdrop-blur-sm p-8 rounded-3xl border border-green-800 transition-transform hover:-translate-y-1 duration-300">
                <h4 className="text-5xl font-black text-white mb-2 tracking-tight">3k+</h4>
                <p className="text-green-300 text-xs uppercase tracking-wider font-bold">Trained Individuals</p>
              </div>
              <div className="bg-green-900/50 backdrop-blur-sm p-8 rounded-3xl border border-green-800 transition-transform hover:-translate-y-1 duration-300 mt-8">
                <h4 className="text-5xl font-black text-white mb-2 tracking-tight">60%</h4>
                <p className="text-green-300 text-xs uppercase tracking-wider font-bold">Income Transition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="bg-white py-20 border-t border-gray-100 scroll-reveal-item">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-bold text-green-600 tracking-widest uppercase mb-8">
            Supported By Our Esteemed Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-85">
            {["SGP Nigeria", "GEF", "UNDP", "Digital Peers International", "Plastic Waste Solutions 2.0"].map((partner) => (
              <div key={partner} className="flex flex-col items-center group cursor-default">
                <span className="font-extrabold text-xl tracking-tight text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  {partner.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl mx-auto text-sm text-gray-500 font-medium leading-relaxed">
            Aligning with Nigeria’s circular economy roadmap and NDC 3.0 waste-sector commitments.
          </p>
        </div>
      </section>
    </div>
  );
}
