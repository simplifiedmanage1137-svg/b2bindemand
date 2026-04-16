import React, { useState, useEffect, useRef } from 'react';

const Pricing = () => {
    const [bubbles, setBubbles] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const heroRef = useRef(null);

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

    const plans = [
        { name: "iData Plan", desc: "Build a strong foundation for your sales.", features: ["Rapid campaign launch", "Flexible loading", "Weekly insights"], color: "#ffffff", btnColor: "#3b82f6", textColor: "#1e293b" },
        { name: "Momentum Plan", desc: "Drive engagement with qualified leads.", features: ["Lead qualification", "CRM integration", "Nurture sequences"], color: "#0f172a", btnColor: "#3b82f6", textColor: "white", isPopular: true },
        { name: "Prestige Plan", desc: "Differentiate leads with deep insights.", features: ["Custom questions", "Account insights", "Data segmentation"], color: "#ffffff", btnColor: "#1e293b", textColor: "#1e293b" },
        { name: "Apex Plan", desc: "High-level decision makers focus.", features: ["Full Funnel", "Multi-Channel", "Sales Acceleration"], color: "#eff6ff", btnColor: "#2563eb", textColor: "#1e293b" }
    ];

    return (
        <div className="bg-[#F8FAFC] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
            
            {/* HERO */}
            <section ref={heroRef} onMouseMove={handleMouseMove} className="relative bg-white pt-32 pb-35 px-8 md:px-16 lg:px-24 border-b border-slate-100">
                
                {bubbles.map(b => (
                    <div key={b.id} className="absolute bg-blue-500/20 rounded-full blur-[2px] pointer-events-none animate-bubbleFade"
                         style={{ left: b.x, top: b.y, width: b.size, height: b.size }} />
                ))}

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    
                    <div>
                        <div className="text-[rgb(242,108,30)] font-bold uppercase text-sm mb-4">
                            Pricing Plans
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Get Leads. <br/>
                            <span className="text-[rgb(242,108,30)]">
                                Grow Faster.
                            </span>
                        </h1>

                        <p className="text-slate-500 text-lg max-w-md">
                            Simple pricing, no hidden fees.
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="bg-blue-50 p-10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(242,108,30,0.25)] border border-blue-100 w-full max-w-md ml-auto mb-20">
                        
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="First Name" className="input-field" />
                                <input type="text" placeholder="Last Name" className="input-field" />
                            </div>

                            <input type="email" placeholder="Work Email" className="input-field" />

                            <select className="input-field">
                                <option>Select Plan</option>
                                {plans.map(p => <option key={p.name}>{p.name}</option>)}
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
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>

                        <button className="w-full py-3 rounded-xl bg-[rgb(0,95,115)] text-white font-bold mb-6 hover:opacity-90">
                            Choose Plan
                        </button>

                        <ul className="space-y-2 text-sm">
                            {plan.features.map((f, idx) => (
                                <li key={idx}>✔ {f}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* TABLE */}
            <div className="max-w-6xl mx-auto px-8 py-24">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Compare our plans
                </h2>

                <table className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-6 text-left">Features</th>
                            {plans.map(p => <th key={p.name}>{p.name}</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {[
                            { f: "CRM", v: ["✘","✔","✔","✔"] },
                            { f: "API", v: ["✘","✘","✔","✔"] }
                        ].map((row, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-6">{row.f}</td>
                                {row.v.map((val, idx) => (
                                    <td key={idx} className={`p-6 text-center font-bold ${val === '✔' ? 'text-green-500' : 'text-red-500'}`}>
                                        {val}
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