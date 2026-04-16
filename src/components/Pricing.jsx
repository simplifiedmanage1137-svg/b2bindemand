import React, { useState, useEffect, useRef } from 'react';

const Pricing = () => {
    const [bubbles, setBubbles] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const heroRef = useRef(null);
    const formRef = useRef(null); // ✅ NEW

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newBubble = { id: Date.now(), x, y, size: Math.random() * 20 + 5 };
        setBubbles((prev) => [...prev.slice(-10), newBubble]);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setBubbles((prev) => prev.filter((b) => Date.now() - b.id < 800));
        }, 100);
        return () => clearInterval(timer);
    }, []);

    // ✅ SCROLL FUNCTION
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    };

    const plans = [
        {
            name: "iData Plan",
            desc: "Build a strong foundation with in-market prospects showing clear intent.",
            features: [
                "Rapid campaign launch",
                "Flexible loading options",
                "Weekly performance insights"
            ]
        },
        {
            name: "Momentum Plan",
            desc: "Drive engagement with high-intent leads who have interacted with your content.",
            features: [
                "Content-driven lead qualification",
                "CRM integration",
                "Optimized nurture sequences"
            ]
        },
        {
            name: "Prestige Plan",
            desc: "Differentiate high-quality leads through structured data points for better sales.",
            features: [
                "Custom questions",
                "Account & individual-level insights",
                "Data-driven segmentation"
            ]
        },
        {
            name: "Apex Plan",
            desc: "Identify key decision-makers and their pain points to accelerate conversions.",
            features: [
                "Full Funnel",
                "Multi-Channel Engagement",
                "Precision-Driven Lead Segmentation",
                "Sponsored Featured Content",
                "Sales Acceleration"
            ]
        }
    ];

    const tableData = [
        { feature: "Flexible loading options", v: [1, 0, 0, 1] },
        { feature: "Rapid campaign launch", v: [1, 0, 0, 1] },
        { feature: "Weekly performance insights", v: [1, 0, 0, 1] },
        { feature: "Multi-Touch Leads", v: [0, 0, 0, 1] },
        { feature: "Content-driven lead qualification", v: [0, 1, 0, 1] },
        { feature: "CRM integration for seamless tracking", v: [0, 1, 0, 1] },
        { feature: "Optimized nurture sequences for higher conversions", v: [0, 1, 0, 1] },
        { feature: "Custom questions for lead bifurcation", v: [0, 0, 1, 1] },
        { feature: "Account & individual-level insights", v: [0, 0, 1, 1] },
        { feature: "Data-driven segmentation for optimized targeting", v: [0, 0, 1, 1] },
        { feature: "Multi-channel engagement strategies", v: [0, 0, 0, 1] },
        { feature: "Conversational & nurture-based outreach", v: [0, 0, 0, 1] },
        { feature: "Sponsored featured emails for targeted engagement", v: [0, 0, 0, 1] },
    ];

    return (
        <div className="bg-[#F8FAFC] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

            {/* HERO */}
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative bg-white pt-32 pb-35 px-8 md:px-16 lg:px-24 border-b border-slate-100"
            >
                {bubbles.map(b => (
                    <div
                        key={b.id}
                        className="absolute bg-blue-500/20 rounded-full blur-[2px] pointer-events-none animate-bubbleFade"
                        style={{ left: b.x, top: b.y, width: b.size, height: b.size }}
                    />
                ))}

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <div className="text-[rgb(242,108,30)] font-bold uppercase text-sm mb-4">
                            Pricing Plans
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Get Leads. <br />
                            <span className="text-[rgb(242,108,30)]">Grow Faster.</span>
                        </h1>

                        <p className="text-slate-500 text-lg max-w-md">
                            Simple pricing, no hidden fees.
                        </p>
                    </div>

                    {/* FORM */}
                    <div
                        ref={formRef}
                        className="bg-blue-50 p-10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(242,108,30,0.25)] border border-blue-100 w-full max-w-md ml-auto mb-20"
                    >
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="First Name" className="input-field" />
                                <input type="text" placeholder="Last Name" className="input-field" />
                            </div>

                            <input type="email" placeholder="Work Email" className="input-field" />

                            <select className="input-field">
                                <option>Select Plan</option>
                                {plans.map(p => (
                                    <option key={p.name}>{p.name}</option>
                                ))}
                            </select>

                            <button className="w-full bg-[rgb(242,108,30)] text-white py-4 rounded-2xl font-bold hover:opacity-90">
                                Start Your Trial
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* CARDS */}
            <div className="max-w-7xl mx-auto px-12 md:px-16 lg:px-24 mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan, i) => (
                    <div key={i} className="p-8 bg-white rounded-3xl shadow-xl hover:-translate-y-3 transition-all">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>

                        <p className="text-sm text-gray-500 mb-6">
                            {plan.desc}
                        </p>

                        <button
                            onClick={scrollToForm}
                            className="w-full py-3 rounded-xl bg-[rgb(0,95,115)] text-white font-bold mb-6 hover:opacity-90"
                        >
                            Get Started
                        </button>

                        <ul className="space-y-2 text-sm">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                    <span className="text-green-500">✔</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* TABLE */}
            <div className="max-w-6xl mx-auto px-8 py-24">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Compare Features
                </h2>

                <table className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-6 text-left">Compare Features</th>
                            {plans.map(p => (
                                <th key={p.name} className="p-6 text-center">{p.name}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((row, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-6 text-gray-700">{row.feature}</td>

                                {row.v.map((val, idx) => (
                                    <td key={idx} className="p-6 text-center">
                                        {val ? (
                                            <span className="text-green-500 text-xl">✔</span>
                                        ) : (
                                            <span className="text-gray-300 text-xl">•</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* DRAWER */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2"
                onMouseEnter={() => setIsDrawerOpen(true)}
                onMouseLeave={() => setIsDrawerOpen(false)}>

                <div className={`bg-[rgb(242,108,30)] text-white px-3 py-10 rounded-l-3xl ${isDrawerOpen ? 'opacity-0' : ''}`}>
                    <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-bold">
                        ROI Calculator
                    </span>
                </div>

                <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-72 bg-white p-8 rounded-3xl shadow-xl ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-xl font-bold mb-4">ROI Tool</h2>
                    <button className="w-full bg-[rgb(242,108,30)] text-white py-3 rounded-xl font-bold">
                        Calculate Now
                    </button>
                </div>
            </div>

            <style>{`
                .input-field {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 1rem;
                    border: 1px solid #e2e8f0;
                }
                @keyframes bubbleFade {
                    100% { opacity: 0; transform: scale(2); }
                }
                .animate-bubbleFade { animation: bubbleFade 0.8s forwards; }
            `}</style>
        </div>
    );
};

export default Pricing;