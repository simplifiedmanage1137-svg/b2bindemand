import React, { useState } from 'react';
import pricingImg from '../assets/pricing_img.png';
import { FaGoogle, FaFacebook, FaTwitter, FaLock, FaShieldAlt } from 'react-icons/fa';

const Audience = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const audienceSegments = [
    { id: 1, title: "Healthcare Professionals", count: "12.5 M", icon: "🏥", desc: "Doctors, Nurses, Hospital Admins" },
    { id: 2, title: "Tech Innovators", count: "45.2 M", icon: "💻", desc: "CTOs, Devs, Product Managers" },
    { id: 3, title: "Retail Giants", count: "33.8 M", icon: "🛒", desc: "E-commerce, Supply, Logistics" },
    { id: 4, title: "Financial Experts", count: "21.4 M", icon: "📈", desc: "CFOs, Analysts, Accountants" },
    { id: 5, title: "Creative Minds", count: "18.9 M", icon: "🎨", desc: "Designers, Marketers, Copywriters" },
  ];

  const trustBadges = [
    { id: 1, label: "Google Cloud", sub: "Verified Partner", icon: <FaGoogle className="text-[#4285F4] text-3xl" /> },
    { id: 2, label: "Facebook Ads", sub: "Authorized Sync", icon: <FaFacebook className="text-[#1877F2] text-3xl" /> },
    { id: 3, label: "Twitter / X", sub: "Data Compliant", icon: <FaTwitter className="text-[#1DA1F2] text-3xl" /> },
    { id: 4, label: "GDPR", sub: "Privacy Protected", icon: <FaShieldAlt className="text-[#003399] text-3xl" /> },
    { id: 5, label: "ISO 27001", sub: "Secure Data", icon: <FaLock className="text-[#34A853] text-3xl" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-orange-100 relative overflow-x-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* --- HERO SECTION --- */}
      <section className="bg-white py-16 px-8 md:px-16 lg:px-24 lg:py-24 border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="text-[#F26C1E] font-bold tracking-wide uppercase text-sm">Intent-targeting</div>
            <h1 className="text-[#0f172a] font-bold tracking-tight leading-[1.1] text-[32px] md:text-[48px]">
              Connect with buyers when they’re <span className="text-[#F26C1E]">ready to act</span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-slate-500 text-lg md:text-xl leading-relaxed font-normal">
              Find prospects who are already looking for what you offer.
            </p>
            <div className="pt-2">
              <button className="bg-[#00525E] hover:bg-[#00606d] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 text-base">
                Get a Quote
              </button>
            </div>
          </div>

          <div className="flex-1 relative w-full flex justify-center lg:justify-end">
            <div className="relative p-4 bg-white border border-slate-50 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <img src={pricingImg} alt="Targeting" className="w-full max-w-[480px] h-auto rounded-[30px]" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CARD SECTION --- */}
      <section className="py-20 px-8 md:px-16 lg:px-24 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {audienceSegments.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-8 bg-white rounded-[32px] shadow-xl transition-all duration-500 hover:-translate-y-4 border-2
                  ${hoveredCard === item.id
                    ? 'border-[rgb(242,108,30)] shadow-[0_20px_40px_rgba(242,108,30,0.1)]'
                    : 'border-transparent'}`}
              >
                <div className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-300">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[rgb(242,108,30)] transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-snug font-normal">{item.desc}</p>
                <div className="mt-auto">
                  <div className="text-3xl font-bold text-[#000000] mb-1">{item.count}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Contacts</div>
                </div>
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-700 ease-out -z-1 
                  ${hoveredCard === item.id ? 'scale-[10] bg-orange-50 opacity-50' : 'bg-slate-200 opacity-0'}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECURITY SECTION --- */}
      <section className="bg-slate-50/50 border-t border-slate-100 overflow-hidden py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Security & Compliance</h2>
            <div className="h-1 w-20 bg-[rgb(242,108,30)] mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
            {trustBadges.map((badge) => (
              <div key={badge.id} className="group flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white shadow-md rounded-[24px] flex items-center justify-center mb-4 border border-slate-50 transition-all duration-500 group-hover:shadow-orange-100 group-hover:-translate-y-2 group-hover:border-[rgb(242,108,30)]">
                  {badge.icon}
                </div>
                <span className="text-[13px] font-bold text-slate-700 mb-1">{badge.label}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{badge.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REFINED DRAWER SECTION --- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[1000] flex items-center" onMouseLeave={() => setIsDrawerOpen(false)}>
        {/* Label Trigger */}
        <div
          onMouseEnter={() => setIsDrawerOpen(true)}
          className={`bg-[rgb(242,108,30)] text-white py-6 px-3 cursor-pointer rounded-l-2xl shadow-2xl transition-all duration-300 ${isDrawerOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Tools</span>
          <span className="font-bold tracking-tight">ROI CALCULATOR</span>
        </div>

        {/* Drawer Content */}
        <div className={`bg-white w-[320px] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col p-10 rounded-l-[40px] border-l border-orange-50 absolute right-0 
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} 
          h-auto py-12`} // Height auto kar di gayi hai
        >
          <h4 className="text-[28px] font-bold text-[#0f172a] leading-tight mb-2">Campaign ROI</h4>
          <p className="text-slate-400 text-base mb-12 font-medium">Analyze potential leads instantly.</p>

          <button className="w-full py-5 bg-[rgb(242,108,30)] text-white rounded-full font-bold text-lg hover:bg-[#d95d17] transition-all shadow-lg shadow-orange-200 active:scale-95">
            Get Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Audience;