import React, { useState, useEffect, useRef } from 'react';

const Pricing = ({ onOpenDrawer }) => {
    const [bubbles, setBubbles] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const heroRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newBubble = { id: Date.now(), x, y, size: Math.random() * 20 + 10 };
        setBubbles((prev) => [...prev.slice(-20), newBubble]);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setBubbles((prev) => prev.filter((b) => Date.now() - b.id < 1000));
        }, 100);
        return () => clearInterval(timer);
    }, []);

    const plans = [
        {
            name: "iData Plan", desc: "Build a strong foundation...", features: ["Rapid campaign launch", "Flexible loading options", "Weekly performance insights"], color: "#e2ebf6", btnColor: "#58a6d9", textColor: "#333", headingSize: "24px", // Naya field
            bodySize: "18px"
        },
        {
            name: "Momentum Plan", desc: "Drive engagement...", features: ["Content-driven lead qualification", "CRM integration", "Optimized nurture sequences"], color: "#d9a150", btnColor: "#ffffff", btnTextColor: "#d9a150", textColor: "white", headingSize: "24px", // Naya field
            bodySize: "18px"
        },
        {
            name: "Prestige Plan", desc: "Differentiate high-quality leads...", features: ["Custom questions", "Account & individual-level insights", "Data-driven segmentation"], color: "#d63d3d", btnColor: "#b22a2a", textColor: "white", headingSize: "24px", // Naya field
            bodySize: "18px"
        },
        {
            name: "Apex Plan",
            desc: "Identify key decision-makers...",
            features: ["Full Funnel", "Multi-Channel Engagement", "Precision-Driven Lead Segmentation", "Sponsored Featured Content", "Sales Acceleration"],
            color: "#2f65ff",
            btnColor: "#1e48c2",
            textColor: "white",
            isAnimated: true,
            headingSize: "24px",
            bodySize: "18px"
        }
    ];

    const comparisonData = [
        { feature: "Lead Generation", idata: "✓", momentum: "✓", prestige: "✓", apex: "✓" },
        { feature: "Weekly Insights", idata: "✓", momentum: "✓", prestige: "✓", apex: "✓" },
        { feature: "CRM Integration", idata: "—", momentum: "✓", prestige: "✓", apex: "✓" },
        { feature: "Lead Qualification", idata: "—", momentum: "✓", prestige: "✓", apex: "✓" },
        { feature: "Custom Questions", idata: "—", momentum: "—", prestige: "✓", apex: "✓" },
        { feature: "Account Level Insights", idata: "—", momentum: "—", prestige: "✓", apex: "✓" },
        { feature: "Multi-Channel Engagement", idata: "—", momentum: "—", prestige: "—", apex: "✓" },
        { feature: "Sales Acceleration", idata: "—", momentum: "—", prestige: "—", apex: "✓" },
    ];

    const badges = [
        { id: 1, text: "GDPR CERTIFIED" },
        { id: 2, text: "ISO 9001:2015 CERTIFIED" },
        { id: 3, text: "ISO/IEC 27001:2022 CERTIFIED" },
        { id: 4, text: "DUN & BRADSTREET" },
        { id: 5, text: "CCPA" },
        { id: 6, text: "CAN SPAM" },
        { id: 7, text: "10+ YEARS" },
    ];

    return (
        <div className="bg-white min-h-screen pb-0 relative" style={{ fontFamily: "Poppins, sans-serif" }}>
            {/* Hero Section - Navbar ke niche se start hoga */}
            <div
                className="relative h-[330px] bg-gradient-to-r from-[#3d7eff] to-[#2b59c3] z-10 overflow-hidden mt-16"
                ref={heroRef}
                onMouseMove={handleMouseMove}
            >
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:35px_35px] pointer-events-none"></div>

                {/* Mouse Bubbles */}
                {bubbles.map(bubble => (
                    <div
                        key={bubble.id}
                        className="absolute bg-white/40 rounded-full pointer-events-none animate-bubbleFade"
                        style={{ left: bubble.x, top: bubble.y, width: bubble.size, height: bubble.size }}
                    />
                ))}

                <div className="container max-w-[1050px] mx-auto relative pt-5 pb-5 px-4 h-full flex items-center">
                    <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
                        <div className="lg:w-5/12">
                            <h1
                                className="font-bold mb-4"
                                style={{
                                    fontWeight: 700,
                                    color: "white",
                                    fontSize: "48px",
                                    lineHeight: "1.2",
                                    letterSpacing: "normal"
                                }}
                            >
                                Get Leads.<br />Grow Faster.
                            </h1>
                            <p className="text-lg opacity-90 mb-0 text-white"
                                style={{
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    lineHeight: "1.2",
                                    letterSpacing: "normal"
                                }}>
                                Start generating high-quality B2B leads with Alltake. No hidden costs—just results.
                            </p>
                        </div>
                        <div className="lg:w-7/12">
                            <div className="bg-white/12 backdrop-blur-md rounded-2xl border border-white/30 p-4 md:p-5">
                                <form>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                        <input type="text" className="bg-white/15 border border-white text-white placeholder:text-white/80 p-3 w-full rounded-lg outline-none" style={{ fontFamily: "Poppins, sans-serif" }} placeholder="First Name" />
                                        <input type="text" className="bg-white/15 border border-white text-white placeholder:text-white/80 p-3 w-full rounded-lg outline-none" style={{ fontFamily: "Poppins, sans-serif" }} placeholder="Last Name" />
                                        <input type="email" className="bg-white/15 border border-white text-white placeholder:text-white/80 p-3 w-full rounded-lg outline-none" style={{ fontFamily: "Poppins, sans-serif" }} placeholder="Email" />
                                    </div>
                                    <div className="mb-4">
                                        <select className="bg-white/15 border border-white text-white p-3 w-full rounded-lg outline-none [&>option]:text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                                            <option value="">Select Your Plan</option>
                                            {plans.map(p => <option key={p.name}>{p.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center gap-3 mt-2">
                                        <div className="bg-[#f9f9f9] w-[260px] h-[60px] rounded-[3px] border border-gray-300 flex items-center justify-between px-3">
                                            <div className="flex items-center gap-3">
                                                <input type="checkbox" id="captcha" />
                                                <label htmlFor="captcha" className="text-sm mb-0 text-dark" style={{ fontFamily: "Poppins, sans-serif" }}>I'm not a robot</label>
                                            </div>
                                            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" height="30" alt="re" />
                                        </div>
                                        <button type="submit" className="bg-gradient-to-b from-[#87a7f9] to-[#5d81e8] text-white border-none py-3 px-5 font-semibold rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>Get Started</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container-fluid max-w-[1100px] mx-auto mt-5 pt-5 px-4 lg:px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 justify-center">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-[15px] text-white transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.1)] pt-8 pb-6 px-4 flex flex-col w-full min-h-[450px] ${plan.isAnimated ? 'animate-pulseZoom' : ''}`}
                            style={{ backgroundColor: plan.color, color: plan.textColor, fontFamily: "Poppins, sans-serif" }}
                        >
                            {/* HEADING: Screenshot ke mutabiq 24px */}
                            <h4 className="font-bold text-center mb-3" style={{ fontSize: "24px" }}>
                                {plan.name}
                            </h4>

                            {/* DESCRIPTION: Screenshot ke mutabiq 18px-20px */}
                            <p className="text-center mb-4 opacity-90 min-h-[60px]" style={{ fontSize: "16px", lineHeight: "1.4" }}>
                                {plan.desc}
                            </p>

                            {/* BUTTON: Screenshot ke mutabiq 20px font */}
                            <button
                                className="w-full font-bold py-3 mb-6 rounded-lg shadow-md"
                                style={{
                                    backgroundColor: plan.btnColor,
                                    color: plan.btnTextColor || 'white',
                                    fontSize: "20px"
                                }}
                            >
                                Get Started
                            </button>

                            {/* FEATURES LIST: Screenshot ke mutabiq 18px-20px */}
                            <ul className="list-none mb-0 mt-auto">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="mb-3 flex items-start gap-2" style={{ fontSize: "18px" }}>
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span className="leading-tight">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Comparison Table */}
            {/* Comparison Table Section */}
            <div className="container max-w-[1100px] mx-auto mt-12 mb-20 px-4">
                <div className="overflow-x-auto shadow-xl border border-gray-200 rounded-2xl bg-white">
                    <table className="w-full border-collapse" style={{ fontFamily: "Poppins, sans-serif" }}>
                        <thead>
                            <tr className="bg-gray-50 border-b-2 border-gray-200">
                                <th className="p-6 font-bold text-left text-[22px] text-gray-800 border-r border-gray-100 w-[30%]">
                                    Compare Features
                                </th>
                                {plans.map(p => (
                                    <th key={p.name} className="p-6 text-center font-bold text-[20px] text-gray-800 border-r border-gray-100 last:border-r-0">
                                        {p.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    {/* Feature Name */}
                                    <td className="p-5 ps-6 font-semibold text-[18px] text-gray-600 border-r border-gray-100">
                                        {row.feature}
                                    </td>

                                    {/* Plan Marks (Check/Dash) */}
                                    <td className="p-5 text-center text-[22px] font-medium text-[#58a6d9] border-r border-gray-100">
                                        {row.idata}
                                    </td>
                                    <td className="p-5 text-center text-[22px] font-medium text-[#d9a150] border-r border-gray-100">
                                        {row.momentum}
                                    </td>
                                    <td className="p-5 text-center text-[22px] font-medium text-[#d63d3d] border-r border-gray-100">
                                        {row.prestige}
                                    </td>
                                    <td className="p-5 text-center text-[22px] font-bold text-[#2f65ff]">
                                        {row.apex}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="w-full py-12 mt-16 bg-gray-50 rounded-t-[60px] border-t border-gray-100">
                <div className="container max-w-[1100px] mx-auto px-4">
                    <h3 className="text-center text-gray-400 font-semibold mb-10 tracking-widest text-[24px] uppercase">
                        Trusted by Industry Leaders
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                        {badges.map(b => (
                            <div key={b.id} className="text-center group transition-all duration-300 hover:scale-105" style={{ fontFamily: "Poppins, sans-serif" }}>
                                <div className="bg-white rounded-2xl shadow-md mb-4 flex items-center justify-center mx-auto border border-gray-100 group-hover:border-[#003d7c]/30 transition-colors"
                                    style={{ width: '100px', height: '100px' }}>
                                    {/* Placeholder for actual logo */}
                                    <span className="text-[12px] font-bold text-[#003d7c]">LOGO</span>
                                </div>
                                <div className="font-semibold text-gray-600 text-[16px] uppercase tracking-tight max-w-[100px] mx-auto leading-tight">
                                    {b.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Budget Calculator Drawer */}
            <div
                className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#003d7c] text-white py-6 px-3 writing-mode-vertical cursor-pointer z-[1000] rounded-l-lg font-bold"
                onMouseEnter={() => setIsDrawerOpen(true)}
                style={{ fontFamily: "Poppins, sans-serif" }}
            >
                <span className="[writing-mode:vertical-rl] [text-orientation:mixed]">Budget Calculator</span>
            </div>

            {/* Drawer Backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 z-[2000] ${isDrawerOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
               onMouseLeave={() => setIsDrawerOpen(false)}
            >
                <div
                    className={`fixed right-0 top-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-white rounded-l-2xl transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] z-[2001] ${isDrawerOpen ? 'right-0' : '-right-[450px]'}`}
                    onMouseEnter={() => setIsDrawerOpen(true)}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                >
                    <button
                        className="absolute top-[15px] right-5 bg-transparent border-none text-3xl text-gray-400 cursor-pointer"
                        onClick={() => setIsDrawerOpen(false)}
                    >&times;</button>
                    <div className="p-4 md:p-5">
                        <h2 className="font-bold mb-3 text-[#003d7c] text-2xl">Budget Calculator</h2>
                        <div className="text-gray-500 text-sm mb-4">
                            <p>Estimates your campaign budget and projects your business' best route. Answer a few questions to get started.</p>
                        </div>
                        <button className="w-full font-bold py-3 bg-[#003d7c] border-none rounded-xl text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                            Start Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Keyframes Animation */}
            <style>{`
                @keyframes bubbleFade {
                    0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
                    100% { opacity: 0; transform: translate(-50%, -150%) scale(1.5); }
                }
                .animate-bubbleFade {
                    animation: bubbleFade 1s forwards;
                }
                @keyframes pulseZoom {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                .animate-pulseZoom {
                    animation: pulseZoom 3s infinite ease-in-out;
                }
                .writing-mode-vertical {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </div>
    );
};

export default Pricing;