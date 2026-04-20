import React, { useState, useEffect, useRef } from 'react';

const Pricing = () => {
    const [bubbles, setBubbles] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const heroRef = useRef(null);
    const formRef = useRef(null);

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

            {/* HERO SECTION - FULLY RESPONSIVE */}
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative bg-white pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-28 lg:pb-35 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-slate-100"
            >
                {bubbles.map(b => (
                    <div
                        key={b.id}
                        className="absolute bg-blue-500/20 rounded-full blur-[2px] pointer-events-none animate-bubbleFade"
                        style={{ left: b.x, top: b.y, width: b.size, height: b.size }}
                    />
                ))}

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left px-2 sm:px-0">
                        <div className="text-[rgb(242,108,30)] font-bold uppercase text-xs sm:text-sm mb-3 sm:mb-4 tracking-wide">
                            Pricing Plans
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
                            Get Leads. <br className="hidden sm:block" />
                            <span className="text-[rgb(242,108,30)]">Grow Faster.</span>
                        </h1>

                        <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
                            Simple pricing, no hidden fees.
                        </p>
                    </div>

                    {/* FORM - FULLY RESPONSIVE */}
                    <div
                        ref={formRef}
                        className="bg-blue-50 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] shadow-[0_25px_60px_rgba(242,108,30,0.25)] border border-blue-100 w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
                    >
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                            <button className="w-full bg-[rgb(242,108,30)] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:opacity-90 transition-all text-sm sm:text-base">
                                Start Your Trial
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* CARDS SECTION - FULLY RESPONSIVE GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {plans.map((plan, i) => (
                    <div key={i} className="p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:-translate-y-3 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>

                        <p className="text-sm text-gray-500 mb-5 sm:mb-6 leading-relaxed">
                            {plan.desc}
                        </p>

                        <button
                            onClick={scrollToForm}
                            className="w-full py-2.5 sm:py-3 rounded-xl bg-[rgb(0,95,115)] text-white font-bold mb-5 sm:mb-6 hover:opacity-90 transition-all text-sm sm:text-base"
                        >
                            Get Started
                        </button>

                        <ul className="space-y-2 sm:space-y-2.5 text-sm">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start sm:items-center gap-2 text-gray-700 text-xs sm:text-sm">
                                    <span className="text-green-500 text-sm sm:text-base mt-0.5 sm:mt-0">✔</span>
                                    <span className="flex-1">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* TABLE SECTION - HORIZONTAL SCROLL ON MOBILE */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
                    Compare Features
                </h2>

                <div className="overflow-x-auto rounded-2xl sm:rounded-3xl shadow-xl">
                    <table className="min-w-[640px] md:min-w-full w-full bg-white">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-4 sm:p-5 md:p-6 text-left text-sm sm:text-base">Compare Features</th>
                                {plans.map(p => (
                                    <th key={p.name} className="p-4 sm:p-5 md:p-6 text-center text-sm sm:text-base min-w-[100px]">{p.name}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {tableData.map((row, i) => (
                                <tr key={i} className="border-t hover:bg-gray-50 transition-colors">
                                    <td className="p-4 sm:p-5 md:p-6 text-gray-700 text-xs sm:text-sm md:text-base">{row.feature}</td>

                                    {row.v.map((val, idx) => (
                                        <td key={idx} className="p-4 sm:p-5 md:p-6 text-center">
                                            {val ? (
                                                <span className="text-green-500 text-lg sm:text-xl">✔</span>
                                            ) : (
                                                <span className="text-gray-300 text-lg sm:text-xl">•</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DRAWER - HIDDEN ON MOBILE, SHOWN ON TABLET+ */}
            <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-30"
                onMouseEnter={() => setIsDrawerOpen(true)}
                onMouseLeave={() => setIsDrawerOpen(false)}>

                <div className={`bg-[rgb(242,108,30)] text-white px-2 sm:px-3 py-8 sm:py-10 rounded-l-3xl transition-opacity duration-300 ${isDrawerOpen ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="[writing-mode:vertical-rl] rotate-180 text-xs sm:text-sm font-bold tracking-wider">
                        ROI Calculator
                    </span>
                </div>

                <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-64 sm:w-72 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 ${isDrawerOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4'}`}>
                    <h2 className="text-lg sm:text-xl font-bold mb-4">ROI Tool</h2>
                    <p className="text-gray-500 text-xs sm:text-sm mb-4">Calculate your potential return on investment</p>
                    <button className="w-full bg-[rgb(242,108,30)] text-white py-2.5 sm:py-3 rounded-xl font-bold hover:opacity-90 transition-all text-sm sm:text-base">
                        Calculate Now
                    </button>
                </div>
            </div>

            {/* Mobile Floating Button - Visible only on mobile */}
            <div className="md:hidden fixed bottom-6 right-6 z-30">
                <button 
                    onClick={scrollToForm}
                    className="bg-[rgb(242,108,30)] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all"
                    aria-label="Get Started"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <style>{`
                .input-field {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border-radius: 1rem;
                    border: 1px solid #e2e8f0;
                    font-size: 0.875rem;
                    transition: all 0.2s ease;
                    background-color: white;
                }
                
                .input-field:focus {
                    outline: none;
                    border-color: rgb(242, 108, 30);
                    box-shadow: 0 0 0 3px rgba(242, 108, 30, 0.1);
                }
                
                @media (min-width: 640px) {
                    .input-field {
                        padding: 1rem;
                        font-size: 1rem;
                    }
                }
                
                @keyframes bubbleFade {
                    100% { opacity: 0; transform: scale(2); }
                }
                .animate-bubbleFade { 
                    animation: bubbleFade 0.8s forwards; 
                }
                
                /* Smooth table scrolling */
                .overflow-x-auto {
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: thin;
                }
                
                /* Better touch targets on mobile */
                @media (max-width: 640px) {
                    button, 
                    .input-field,
                    select {
                        min-height: 44px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Pricing;