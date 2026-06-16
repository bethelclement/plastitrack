"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, X, Leaf, Gamepad2, Recycle, BookOpen, Star } from "lucide-react";

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const CATEGORIES = [
    "All",
    "UpTex New Arrivals",
    "Educational Game",
    "Home & Décor",
    "Accessories & Jewellery",
    "Furniture & Builds",
];

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────────
// ERA flags: "uptex" = June (rebranded UpTex), "bes" = May (original BES branding)
const MOCK_PRODUCTS = [
    // ──── TOP: UPTEX JUNE ARRIVALS ────
    {
        id: "u1",
        era: "uptex",
        name: "UpTex Plastic Earrings Collection",
        description:
            "Stunning hand-crafted earrings from shredded & moulded PET/HDPE plastics. Colours come from sorted bottle pigmentation — no dyes used. Leafy, butterfly, floral & geometric designs each mounted on branded UpTex display cards. Every card is part of the product presentation.",
        price: 2500,
        category: "Accessories & Jewellery",
        images: ["/images/uptex-model-display-1.jpg", "/images/uptex-earring-display-cards.jpg", "/images/uptex-model-display-2.jpg", "/images/uptex-earrings.jpg"],
        plastic_used: "PET bottles & HDPE lids",
        plastic_type: "PET (Type 1) + HDPE (Type 2)",
        plastic_weight_g: 8,
        bottles_diverted: "~1–2 PET bottle caps or fragments per pair",
        co2_saved_g: 12,
        made_by: "UpTex Studio (Blessing Evea Onwe)",
        hub: "UpTex ReVamp Workshop, Abuja",
        era_label: "June 2026 — UpTex Rebranded",
        badge: "New Arrival",
        badgeColor: "emerald",
    },
    {
        id: "u1b",
        era: "uptex",
        name: "UpTex Plastic Wristbands (Wristbeads)",
        description:
            "Upcycled wristbands made from PET bottle offcuts cut into petals & beads, threaded with pearl accents and glass beads. Available in red, green, gold, black, white and multi-colour. Lightweight, vibrant and 100% plastic-waste-derived. Each band keeps bottle fragments out of drainage channels.",
        price: 1500,
        category: "Accessories & Jewellery",
        images: ["/images/uptex-model-closeup.jpg", "/images/uptex-model-basket-1.jpg", "/images/uptex-wristbands.jpg"],
        plastic_used: "PET bottle offcuts cut into petal/bead shapes",
        plastic_type: "PET (Type 1)",
        plastic_weight_g: 12,
        bottles_diverted: "~1 standard PET bottle per band",
        co2_saved_g: 18,
        made_by: "UpTex Studio (Blessing Evea Onwe)",
        hub: "UpTex ReVamp Workshop, Abuja",
        era_label: "June 2026 — UpTex Rebranded",
        badge: "New Arrival",
        badgeColor: "emerald",
    },
    {
        id: "u2",
        era: "uptex",
        name: "UpTex Artist Palette + Brush Set",
        description:
            "5-in-1 painting palette made from 5 upcycled blue PET bottle caps seated in a recycled foam base, paired with a brush holder crafted from compressed shredded black HDPE. The set gives young artists a full painting station using zero virgin plastic.",
        price: 5000,
        category: "UpTex New Arrivals",
        images: ["/images/uptex-brush-palette.jpg"],
        plastic_used: "HDPE (brush cup) + PET caps (palette wells)",
        plastic_type: "HDPE (Type 2) + PET (Type 1)",
        plastic_weight_g: 185,
        bottles_diverted: "~4–5 plastic bottles equivalent",
        co2_saved_g: 277,
        made_by: "UpTex Studio (Blessing Evea Onwe)",
        hub: "UpTex ReVamp Workshop, Abuja",
        era_label: "June 2026 — UpTex Rebranded",
        badge: "New Arrival",
        badgeColor: "emerald",
    },
    {
        id: "u3",
        era: "uptex",
        name: "UpTex Table Organizer",
        description:
            "Elegant desk organizer made from two upcycled green PET bottles fused back-to-back and wrapped with gold glitter tape. Includes a glue applicator holder slot and a bold UpTex base board with gold trim. Holds pens, rulers, markers, scissors and stationery.",
        price: 5000,
        category: "UpTex New Arrivals",
        images: ["/images/uptex-table-organizer.jpg"],
        plastic_used: "Green PET bottles (2 × ~500 ml) + HDPE eraser block",
        plastic_type: "PET (Type 1) + HDPE (Type 2)",
        plastic_weight_g: 120,
        bottles_diverted: "~2 standard 500 ml PET bottles",
        co2_saved_g: 180,
        made_by: "UpTex Studio (Blessing Evea Onwe)",
        hub: "UpTex ReVamp Workshop, Abuja",
        era_label: "June 2026 — UpTex Rebranded",
        badge: "New Arrival",
        badgeColor: "emerald",
    },
    {
        id: "u4",
        era: "uptex",
        name: "UpTex Loop Game",
        description:
            "Our circular-economy board game driving edutainment & positive behaviour change in youths. Uses HDPE bottle caps as game pieces on a 3×3 grid. Each board set has a storage can housing 6 caps (3 blue, 3 yellow). First to get 3-in-a-row wins — every move teaches closing the loop! Designed by Blessing Evea Onwe. Inspired by SGP Nigeria, GEF, Digital Peers & Plastic Waste Solutions 2.0.",
        price: 7000,
        category: "Educational Game",
        images: ["/images/uptex-loop-game.jpg", "/images/uptex-loop-game-rules.jpg", "/images/uptex-loop-game-board.jpg"],
        plastic_used: "6 HDPE bottle caps per set (storage can + game pieces)",
        plastic_type: "HDPE (Type 2) — bottle caps",
        plastic_weight_g: 30,
        bottles_diverted: "6 bottle caps diverted per game set",
        co2_saved_g: 45,
        made_by: "UpTex Studio — Blessing Evea Onwe",
        hub: "UpTex ReVamp Workshop, Abuja",
        era_label: "June 2026 — UpTex Rebranded",
        badge: "Educational",
        badgeColor: "blue",
        game_note: "Each board includes a storage can for the 6 caps",
    },

    // ──── BELOW: ORIGINAL BES MAY COLLECTION ────
    {
        id: "1",
        era: "bes",
        name: "ReVamp Trial Disc (Green)",
        description:
            "1st trial upcycled disc crafted entirely from compressed HDPE and PP waste caps. Demonstrates the structural integrity of melted waste plastics for future eco-pavers or modular furniture bases.",
        price: 5000,
        category: "Furniture & Builds",
        images: ["/images/trial-disc-green.jpg"],
        plastic_used: "HDPE bottle caps + PP rigid containers",
        plastic_type: "HDPE (Type 2) + PP (Type 5)",
        plastic_weight_g: 1800,
        bottles_diverted: "~70 HDPE caps or equivalent rigid fragments",
        co2_saved_g: 2700,
        made_by: "Blessn Evea Signature (Durumi Hub)",
        hub: "Durumi Settlement Hub",
        era_label: "May 2026 — BES Original",
        badge: "BES Original",
        badgeColor: "amber",
    },
    {
        id: "2",
        era: "bes",
        name: "ReVamp Trial Disc (Mixed Color)",
        description:
            "Vibrant mixed-color disc using un-dyed, color-sorted plastic waste. A testament to transparent sorting and upcycling — turning local pollution into raw materials.",
        price: 5500,
        category: "Furniture & Builds",
        images: ["/images/trial-disc-1st.jpg"],
        plastic_used: "Mixed rigid plastics — HDPE primary, PP secondary",
        plastic_type: "HDPE (Type 2) + PP (Type 5)",
        plastic_weight_g: 2100,
        bottles_diverted: "~80 mixed plastic fragments & caps",
        co2_saved_g: 3150,
        made_by: "Blessn Evea Signature (Kuchingoro Hub)",
        hub: "Kuchingoro Garamajiji Hub",
        era_label: "May 2026 — BES Original",
        badge: "BES Original",
        badgeColor: "amber",
    },
    {
        id: "3",
        era: "bes",
        name: "Recycled Keychains",
        description:
            "Beautiful, colorful keychains made from recycled PET bottles. Lightweight, durable and perfect for everyday use. Each one represents a fragment of plastic that didn't reach a landfill.",
        price: 2000,
        category: "Accessories & Jewellery",
        images: ["/images/keychains.jpg"],
        plastic_used: "PET bottle offcuts and strips",
        plastic_type: "PET (Type 1)",
        plastic_weight_g: 10,
        bottles_diverted: "~0.1 of one 500 ml PET bottle",
        co2_saved_g: 15,
        made_by: "Blessn Evea Signature",
        hub: "Durumi Settlement Hub",
        era_label: "May 2026 — BES Original",
        badge: "BES Original",
        badgeColor: "amber",
    },
    {
        id: "4",
        era: "bes",
        name: "Upcycled Earrings (BES Edition)",
        description:
            "Elegant, stylish earrings from recovered single-use PET and HDPE plastics. The original BES branded collection — precursor to the current UpTex line.",
        price: 3000,
        category: "Accessories & Jewellery",
        images: ["/images/uptex-model-basket-2.jpg", "/images/earring-model.jpg", "/images/earring-close.jpg"],
        plastic_used: "PET + HDPE bottle fragments",
        plastic_type: "PET (Type 1) + HDPE (Type 2)",
        plastic_weight_g: 8,
        bottles_diverted: "~1–2 bottle fragments per pair",
        co2_saved_g: 12,
        made_by: "Blessn Evea Signature",
        hub: "Durumi Settlement Hub",
        era_label: "May 2026 — BES Original",
        badge: "BES Original",
        badgeColor: "amber",
    },
    {
        id: "5",
        era: "bes",
        name: "Recycled Bangles",
        description:
            "Fashionable, colorful bangles made entirely from recovered HDPE plastics. Wear your impact proudly.",
        price: 4500,
        category: "Accessories & Jewellery",
        images: ["/images/store-bangles.png"],
        plastic_used: "HDPE rings cut from bottle necks and mid-sections",
        plastic_type: "HDPE (Type 2)",
        plastic_weight_g: 200,
        bottles_diverted: "~5–7 HDPE bottle sections",
        co2_saved_g: 300,
        made_by: "Blessn Evea Signature",
        hub: "Durumi Settlement Hub",
        era_label: "May 2026 — BES Original",
        badge: "BES Original",
        badgeColor: "amber",
    },
    {
        id: "6",
        era: "bes",
        name: "PET Broom",
        description:
            "Durable, eco-friendly broom made from repurposed PET plastic bottle bristles and an HDPE pipe handle. Lasts 3× longer than conventional brooms and keeps ~40 bottles from the landfill.",
        price: 10000,
        category: "Home & Décor",
        images: ["/images/pet-broom.jpg"],
        plastic_used: "PET bottle bristles + HDPE pipe handle",
        plastic_type: "PET (Type 1) + HDPE (Type 2)",
        plastic_weight_g: 500,
        bottles_diverted: "~35–40 PET 500 ml bottles",
        co2_saved_g: 750,
        made_by: "Blessn Evea Signature",
        hub: "Kuchingoro Garamajiji Hub",
        era_label: "May 2026 — BES Original",
        badge: "BES Original",
        badgeColor: "amber",
    },
    {
        id: "7",
        era: "bes",
        name: "Upcycled PET Plant Décor",
        description:
            "Beautiful decorative artificial plant crafted entirely from repurposed green PET bottles. Brings sustainable greenery to any indoor space.",
        price: 3000,
        category: "Home & Décor",
        images: ["/images/pet-plant.jpg"],
        plastic_used: "Green PET bottle petals and stems",
        plastic_type: "PET (Type 1) — green coloured",
        plastic_weight_g: 300,
        bottles_diverted: "~8–10 green 500 ml PET bottles",
        co2_saved_g: 450,
        made_by: "Blessn Evea Signature",
        hub: "Durumi Settlement Hub",
        era_label: "May 2026 — BES Original",
        badge: "BES Original",
        badgeColor: "amber",
    },
];

// ─── TRACEABILITY TIMELINE BUILDER ───────────────────────────────────────────
function buildTimeline(product: any, customerName: string, trackingId: string) {
    const isUpTex = product.era === "uptex";
    const isGame = product.id === "u4";

    const collectDate = isUpTex ? "June 5, 2026" : "May 10, 2026";
    const logDate     = isUpTex ? "June 6, 2026"  : "May 11, 2026";
    const sortDate    = isUpTex ? "June 8, 2026"  : "May 13, 2026";
    const makeDate    = isUpTex ? "June 14, 2026" : "May 20, 2026";
    const brandDate   = isUpTex ? "June 2026 — UpTex Era" : "May 2026 — BES Era";
    const hub         = product.hub || "Durumi Settlement Hub";
    const workshop    = isUpTex ? "UpTex ReVamp Workshop, Abuja" : "Blessn Evea Signature Workshop";

    return [
        {
            title: "Community Plastic Collection",
            description: `${(product.plastic_weight_g / 1000).toFixed(3)} kg of ${product.plastic_type} collected by eco-contributors from households and waste streams in Abuja.`,
            date: collectDate,
            location: hub,
            operator: "Aisha M. & Community Eco-Collectors",
            icon: "leaf",
            brand_era: brandDate,
        },
        {
            title: "Weighing & Digital Logging",
            description: `Plastic weighed, verified, and logged on the PlastiTrackBES platform. Contributor earned ${Math.round(product.plastic_weight_g / 10)} tracking points.`,
            date: logDate,
            location: hub,
            operator: "Fatima Yusuf (Hub Officer)",
            icon: "shield",
            brand_era: brandDate,
        },
        {
            title: "Sorting, Cleaning & Processing",
            description: `${product.plastic_type} waste sorted by resin code, cleaned, labels removed, and prepped — ${isGame ? "caps selected and stored" : "shredded/cut for manufacturing"}.`,
            date: sortDate,
            location: isUpTex ? "UpTex Processing Depot, Abuja" : "BES Processing Depot, Durumi",
            operator: "Blessing E. (Sorting Lead)",
            icon: "map",
            brand_era: brandDate,
        },
        ...(isUpTex && !isGame ? [{
            title: "Brand Transition: BES → UpTex",
            description: "Collection rebranded under UpTex — From Waste to Worth. All materials and ethics from the original BES programme retained. Higher design standards applied.",
            date: "June 2026",
            location: "UpTex ReVamp Workshop, Abuja",
            operator: "Blessing Evea Onwe (Founder)",
            icon: "star",
            brand_era: "June 2026 — Rebranding Milestone",
        }] : []),
        {
            title: isGame ? "Game Design & Manufacturing" : "Upcycle Crafting",
            description: isGame
                ? `Loop Game boards hand-laminated. 6 HDPE caps (${product.plastic_weight_g}g) stored per game set. Instructions printed. Designed by Blessing Evea Onwe, inspired by SGP Nigeria & Digital Peers.`
                : `Processed into the ${product.name} — ${product.bottles_diverted}.`,
            date: makeDate,
            location: workshop,
            operator: isUpTex ? "UpTex Craft Team" : "Blessn Evea Craft Team",
            icon: "award",
            brand_era: brandDate,
        },
        {
            title: "Store Order & Delivery",
            description: `Purchased via ReVamp! Store. ${(product.co2_saved_g / 1000).toFixed(3)} kg CO₂ saved. Dispatching via eco-friendly local delivery routes.`,
            date: "June 15, 2026",
            location: "Abuja Central Delivery Route",
            operator: `${customerName} (Order #${trackingId.split("-")[1]})`,
            icon: "shopping-bag",
            brand_era: "June 2026",
        },
    ];
}

// ─── BADGE COMPONENT ─────────────────────────────────────────────────────────
function Badge({ label, color }: { label: string; color: string }) {
    const styles: Record<string, string> = {
        emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        amber:   "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        blue:    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    };
    return (
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${styles[color] || styles.emerald}`}>
            {label}
        </span>
    );
}

// ─── PLASTIC WEIGHT DISPLAY ───────────────────────────────────────────────────
function PlasticStats({ product }: { product: any }) {
    const weightKg = (product.plastic_weight_g / 1000).toFixed(3);
    const co2Kg    = (product.co2_saved_g / 1000).toFixed(3);
    return (
        <div className="bg-green-50/40 dark:bg-green-950/10 rounded-xl p-4 mb-5 border border-green-100/60 dark:border-green-900/20 space-y-2.5">
            <h4 className="text-[10px] font-black text-green-800 dark:text-green-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                <Recycle className="w-3.5 h-3.5" /> Plastic Impact
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-gray-950 rounded-lg p-2.5 border border-green-100 dark:border-green-900/30">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Plastic Type</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 leading-tight block">{product.plastic_type}</span>
                </div>
                <div className="bg-white dark:bg-gray-950 rounded-lg p-2.5 border border-green-100 dark:border-green-900/30">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Weight Diverted</span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">{weightKg} kg</span>
                </div>
                <div className="bg-white dark:bg-gray-950 rounded-lg p-2.5 border border-green-100 dark:border-green-900/30">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Bottles/Pieces</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 leading-tight block text-[10px]">{product.bottles_diverted}</span>
                </div>
                <div className="bg-white dark:bg-gray-950 rounded-lg p-2.5 border border-green-100 dark:border-green-900/30">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">CO₂ Saved</span>
                    <span className="font-black text-blue-600 dark:text-blue-400 text-sm">{co2Kg} kg</span>
                </div>
            </div>
            <p className="text-[9px] text-green-700/60 dark:text-green-500/50 pt-1 font-semibold">
                Made by: <span className="text-green-900 dark:text-green-300">{product.made_by}</span>
                {" · "}<span className="italic">{product.era_label}</span>
            </p>
        </div>
    );
}

// ─── MAIN STORE PAGE ──────────────────────────────────────────────────────────
export default function StorePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [checkoutProduct, setCheckoutProduct] = useState<any | null>(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const uptexProducts = MOCK_PRODUCTS.filter(p => p.era === "uptex");
    const besProducts   = MOCK_PRODUCTS.filter(p => p.era === "bes");

    const filteredUpTex = selectedCategory === "All" || selectedCategory === "UpTex New Arrivals"
        ? uptexProducts
        : uptexProducts.filter(p => p.category === selectedCategory);

    const filteredBes = selectedCategory === "All" || !["UpTex New Arrivals","Educational Game"].includes(selectedCategory)
        ? besProducts.filter(p => selectedCategory === "All" || p.category === selectedCategory)
        : [];

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        const trackingId = "PT-" + Math.floor(100000 + Math.random() * 900000);
        setTrackingNumber(trackingId);
        const timeline = buildTimeline(checkoutProduct, customerName, trackingId);
        const customOrderData = {
            id: trackingId,
            type: "order",
            itemName: checkoutProduct.name,
            contributor: checkoutProduct.hub.includes("Durumi") ? "Durumi Eco-Club" : "Kuchingoro household",
            hub: checkoutProduct.hub,
            material: checkoutProduct.plastic_used,
            weight: `${(checkoutProduct.plastic_weight_g / 1000).toFixed(3)} kg`,
            co2Saved: `${(checkoutProduct.co2_saved_g / 1000).toFixed(3)} kg`,
            landfillSaved: `${(checkoutProduct.plastic_weight_g / 1000 * 30).toFixed(0)} Liters`,
            energySaved: `${(checkoutProduct.plastic_weight_g / 1000 * 5.6).toFixed(1)} kWh`,
            points: Math.round(checkoutProduct.plastic_weight_g / 10),
            certificateNo: `CERT-2026-${trackingId.split("-")[1]}`,
            era: checkoutProduct.era_label,
            timeline,
        };
        try {
            const existing = JSON.parse(localStorage.getItem("custom_orders") || "[]");
            existing.push(customOrderData);
            localStorage.setItem("custom_orders", JSON.stringify(existing));
        } catch (err) { console.error(err); }
        setOrderSuccess(true);
    };

    const handleCloseModal = () => {
        setCheckoutProduct(null);
        setOrderSuccess(false);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
    };

    const ProductCard = ({ product }: { product: any }) => {
        const [imgIdx, setImgIdx] = useState(0);
        return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-800/80 overflow-hidden flex flex-col group hover:shadow-lg dark:hover:shadow-green-950/20 transition-all duration-300">
            {/* Image carousel */}
            <div className="h-64 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
                <img
                    src={product.images[imgIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Multi-image dots */}
                {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {product.images.map((_: string, i: number) => (
                            <button key={i} onClick={() => setImgIdx(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                )}
                {/* Arrows for multi-image */}
                {product.images.length > 1 && (
                    <>
                        <button onClick={() => setImgIdx((imgIdx - 1 + product.images.length) % product.images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm transition-all">
                            ‹
                        </button>
                        <button onClick={() => setImgIdx((imgIdx + 1) % product.images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm transition-all">
                            ›
                        </button>
                    </>
                )}
                <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-black text-gray-900 dark:text-white shadow border border-gray-150 dark:border-gray-800">
                    ₦{product.price.toLocaleString()}
                </div>
                <div className="absolute top-3 left-3">
                    <Badge label={product.badge} color={product.badgeColor} />
                </div>
                {product.game_note && (
                    <div className="absolute bottom-10 left-3 right-3 bg-blue-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <Gamepad2 className="w-3 h-3 shrink-0" />
                        {product.game_note}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight leading-snug mb-1">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 flex-1 leading-relaxed">{product.description}</p>

                <PlasticStats product={product} />

                <button
                    onClick={() => setCheckoutProduct(product)}
                    className="w-full bg-gray-900 dark:bg-gray-800 text-white py-3 px-4 rounded-xl font-black text-sm hover:bg-primary dark:hover:bg-primary transition-colors flex items-center justify-center gap-2 group-hover:bg-primary"
                >
                    Order Now <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* CINEMATIC HERO HEADER */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="relative bg-emerald-950 dark:bg-gray-950 overflow-hidden">
                {/* Background mesh gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 opacity-90" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px] items-stretch">

                        {/* LEFT: Marketing copy */}
                        <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
                            {/* Logo strip */}
                            <div className="flex items-center gap-3 mb-8">
                                <img src="/plastitrackbes-logo-nobg.png" alt="PlastiTrackBES" className="h-10 w-auto brightness-[10] opacity-90" />
                                <div>
                                    <div className="font-black text-xl tracking-tight text-white leading-none">PlastiTrack<span className="text-emerald-400">BES</span></div>
                                    <div className="text-[9px] font-bold tracking-widest uppercase text-emerald-400/70">Track · Recycle · Sustain</div>
                                </div>
                            </div>

                            <span className="inline-block text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full mb-5 w-max">
                                ✦ ReVamp! Store — June 2026 Collection
                            </span>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] mb-6">
                                WEAR THE<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">CHANGE.</span>
                            </h1>

                            <p className="text-emerald-100/80 text-lg leading-relaxed mb-8 max-w-md font-medium">
                                Every piece of jewellery you wear from us is a bottle rescued from Abuja's drains.
                                Real plastic. Real impact. Fully traced.
                            </p>

                            {/* 3 reasons to buy */}
                            <div className="space-y-3 mb-10">
                                {[
                                    { icon: "♻️", title: "100% Upcycled", desc: "No virgin plastic. Every earring, bead and wristband is recovered PET or HDPE." },
                                    { icon: "🔍", title: "Fully Traceable", desc: "Scan your order ID to see who collected the plastic, when, and where it was made." },
                                    { icon: "💚", title: "Community Owned", desc: "Made by women in Kuchingoro & Durumi. Your purchase is their paycheck." },
                                ].map(r => (
                                    <div key={r.title} className="flex items-start gap-3 group">
                                        <span className="text-xl mt-0.5 shrink-0">{r.icon}</span>
                                        <div>
                                            <span className="font-black text-white text-sm block">{r.title}</span>
                                            <span className="text-emerald-200/60 text-xs leading-relaxed">{r.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <a href="#products" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-7 py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/25 text-sm">
                                    Shop Now ↓
                                </a>
                                <a href="/traceability" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-all border border-white/20 text-sm">
                                    Verify Plastic ↗
                                </a>
                            </div>
                        </div>

                        {/* RIGHT: Two-photo creative collage */}
                        <div className="relative hidden lg:flex items-center justify-center py-8">
                            {/* Main portrait photo */}
                            <div className="relative z-10 ml-8">
                                <img
                                    src="/images/uptex-model-basket-2.jpg"
                                    alt="UpTex model showcasing earrings collection"
                                    className="w-72 h-[480px] object-cover object-top rounded-3xl shadow-2xl shadow-black/50 border-4 border-emerald-400/20"
                                />
                                {/* Floating label on main photo */}
                                <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white px-4 py-2.5 rounded-2xl shadow-lg shadow-emerald-500/30">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">UpTex June Drop</p>
                                    <p className="text-base font-black">From ₦1,500</p>
                                </div>
                            </div>
                            {/* Second smaller photo offset behind */}
                            <div className="absolute right-4 top-12">
                                <img
                                    src="/images/uptex-earring-display-cards.jpg"
                                    alt="UpTex earring display cards outdoor"
                                    className="w-52 h-[320px] object-cover object-top rounded-2xl shadow-2xl shadow-black/40 border-2 border-white/10 rotate-2"
                                />
                                {/* Floating badge on product photo */}
                                <div className="absolute -top-3 -right-3 bg-white text-emerald-900 px-3 py-1.5 rounded-full shadow-lg">
                                    <p className="text-[10px] font-black uppercase tracking-wide">♻ 0% Dyes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile: single hero image */}
                <div className="lg:hidden relative">
                    <img
                        src="/images/uptex-model-basket-2.jpg"
                        alt="UpTex earrings model"
                        className="w-full h-64 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
                </div>
            </div>

            {/* Category Nav */}
            <div id="products" className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto no-scrollbar">
                    <div className="flex space-x-2 md:justify-center min-w-max">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                    selectedCategory === cat
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16">

                {/* ─── UPTEX NEW ARRIVALS ─── */}
                {filteredUpTex.filter(p => p.category !== "Educational Game").length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px flex-1 bg-emerald-100 dark:bg-emerald-900/30" />
                            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-5 py-2 rounded-full border border-emerald-200 dark:border-emerald-800">
                                <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span className="font-black text-sm text-emerald-800 dark:text-emerald-300 tracking-wide uppercase">UpTex New Arrivals — June 2026</span>
                            </div>
                            <div className="h-px flex-1 bg-emerald-100 dark:bg-emerald-900/30" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredUpTex.filter(p => p.category !== "Educational Game").map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}

                {/* ─── EDUCATIONAL GAME SECTION ─── */}
                {(selectedCategory === "All" || selectedCategory === "Educational Game") && (
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px flex-1 bg-blue-100 dark:bg-blue-900/30" />
                            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-5 py-2 rounded-full border border-blue-200 dark:border-blue-800">
                                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="font-black text-sm text-blue-800 dark:text-blue-300 tracking-wide uppercase">Educational Game</span>
                            </div>
                            <div className="h-px flex-1 bg-blue-100 dark:bg-blue-900/30" />
                        </div>
                        <div className="mb-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6">
                            <p className="text-blue-800 dark:text-blue-300 text-sm font-semibold leading-relaxed">
                                🎮 <strong>UpTex Loop Game</strong> — Our circular-economy board game uses plastic bottle caps as game tokens to drive <em>edutainment</em> and positive behaviour change in youths. Every cap in the game tells the story of plastic diverted from waste.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredUpTex.filter(p => p.category === "Educational Game").map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}

                {/* ─── ORIGINAL BES COLLECTION ─── */}
                {filteredBes.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px flex-1 bg-amber-100 dark:bg-amber-900/30" />
                            <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-5 py-2 rounded-full border border-amber-200 dark:border-amber-800">
                                <Leaf className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                <span className="font-black text-sm text-amber-800 dark:text-amber-300 tracking-wide uppercase">Original BES Collection — May 2026</span>
                            </div>
                            <div className="h-px flex-1 bg-amber-100 dark:bg-amber-900/30" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 italic">The original BES-branded products that launched the ReVamp journey. Same quality, same ethics — now evolved into the UpTex brand.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBes.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>

            {/* ─── CHECKOUT MODAL ─── */}
            {checkoutProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm" onClick={() => !orderSuccess && handleCloseModal()} />
                    <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800 animate-scale-in">
                        {orderSuccess ? (
                            <div className="p-10 text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-primary dark:text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Placed! 🎉</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                                    Your <strong>{checkoutProduct.name}</strong> order is confirmed. We'll contact you shortly for delivery.
                                </p>
                                <p className="text-xs text-green-700 dark:text-green-400 font-semibold mb-4">
                                    ♻️ You just diverted {(checkoutProduct.plastic_weight_g / 1000).toFixed(3)} kg of plastic & saved {(checkoutProduct.co2_saved_g / 1000).toFixed(3)} kg CO₂
                                </p>
                                <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your Tracking ID:</p>
                                    <p className="text-xl font-black text-gray-900 dark:text-white tracking-widest font-mono">{trackingNumber}</p>
                                    <p className="text-[10px] text-gray-400 mt-2">
                                        Search this on the{" "}
                                        <Link href="/traceability" className="text-primary font-bold hover:underline">Traceability Page</Link>{" "}
                                        to see your product's full plastic lifecycle.
                                    </p>
                                </div>
                                <button onClick={handleCloseModal} className="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Secure Checkout</h3>
                                    <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6 max-h-[75vh] overflow-y-auto">
                                    <div className="flex items-center gap-4 mb-6 bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                                        <img src={checkoutProduct.images[0]} alt="product" className="w-14 h-14 object-cover rounded-xl" />
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{checkoutProduct.name}</h4>
                                            <p className="text-sm font-black text-primary dark:text-green-400">₦{checkoutProduct.price.toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{checkoutProduct.era_label}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleCheckout} className="space-y-4">
                                        {[
                                            { label: "Full Name", type: "text", val: customerName, set: setCustomerName, ph: "e.g. Ojeka Jane" },
                                            { label: "Phone Number", type: "tel", val: customerPhone, set: setCustomerPhone, ph: "080..." },
                                        ].map(({ label, type, val, set, ph }) => (
                                            <div key={label}>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                                                <input required type={type} value={val} onChange={e => set(e.target.value)}
                                                    className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                                    placeholder={ph} />
                                            </div>
                                        ))}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                                            <textarea required value={customerAddress} onChange={e => setCustomerAddress(e.target.value)}
                                                className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                                                rows={2} placeholder="Full address" />
                                        </div>

                                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl">
                                            <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2 text-sm">Bank Transfer Details</h5>
                                            <p className="text-xs text-blue-800 dark:text-blue-400 mb-2">Transfer <strong>₦{checkoutProduct.price.toLocaleString()}</strong> to:</p>
                                            <div className="bg-white dark:bg-gray-950 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                                <p className="font-mono text-xl font-black text-gray-900 dark:text-white">9063877010</p>
                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">FCMB · Blessn Evea Signature</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Payment Receipt</label>
                                            <input required type="file" accept="image/*,.pdf"
                                                className="w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-950 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                                        </div>

                                        <button type="submit"
                                            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm mt-2">
                                            ✅ I Have Made The Transfer
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
