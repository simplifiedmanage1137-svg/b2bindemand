import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import pricingImg from '../assets/pricing_image.png';
import { FaGoogle, FaFacebook, FaTwitter, FaLock, FaShieldAlt } from 'react-icons/fa';
import Footer from './Footer';

const Audience = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const heroRef = useRef(null);

  const trustBadges = [
    { id: 1, label: "Google Cloud", sub: "Verified Partner", icon: <FaGoogle className="text-[#4285F4] text-3xl" /> },
    { id: 2, label: "Facebook Ads", sub: "Authorized Sync", icon: <FaFacebook className="text-[#1877F2] text-3xl" /> },
    { id: 3, label: "Twitter / X", sub: "Data Compliant", icon: <FaTwitter className="text-[#1DA1F2] text-3xl" /> },
    { id: 4, label: "GDPR", sub: "Privacy Protected", icon: <FaShieldAlt className="text-[#003399] text-3xl" /> },
    { id: 5, label: "ISO 27001", sub: "Secure Data", icon: <FaLock className="text-[#34A853] text-3xl" /> },
  ];

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

  const goToAudience = (slug) => {
    navigate(`/audience/${slug}`);
  };

  // Function to handle ROI Calculator navigation
  const handleROICalculatorClick = () => {
    navigate('/roi-calculator');
  };

  // Function to handle Get a Quote button navigation
  const handleGetAQuoteClick = () => {
    navigate('/contact-us');
  };

  const plans = [
    { slug: 'marketing', name: "Marketing", value: "28.73", desc: "Sales Operations, Social Selling..." },
    { slug: 'sales', name: "Sales", value: "29.41", desc: "Sales Operations, Social Selling..." },
    { slug: 'human-resources', name: "Human Resources", value: "19.21", desc: "Employee Engagement, Employment..." },
    { slug: 'information-technology', name: "Information Technology", value: "49.84", desc: "Data, Network, Remote Work..." },
    { slug: 'finance', name: "Finance", value: "13.26", desc: "Risk, Analytics, Automation..." },
    { slug: 'business-leaders', name: "Business Leaders", value: "3.06", desc: "Risk, Mentoring, Telecommuting..." },
    { slug: 'supply-chain', name: "Supply Chain", value: "2.28", desc: "Logistics, Materials, Forecasting..." },
    { slug: 'learning-and-development', name: "Learning & Development", value: "1.19", desc: "LMS, Workplace Safety, Microlearning..." },
    { slug: 'customer-experience', name: "Customer Experience", value: "0.95", desc: "Contact Center, Loyalty, Help Desk..." },
    { slug: 'others', name: "Others", value: "15.31", desc: "Government, Military, Transportation..." }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="bg-white pt-24 pb-16 px-8 md:px-16 lg:px-24 lg:pt-32 lg:pb-24 border-b border-slate-100 relative z-10 overflow-hidden"
      >
        {/* Bubbles Animation */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-orange-300 pointer-events-none"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              animation: 'bubbleFade 0.8s forwards',
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="text-[#F26C1E] font-bold tracking-wide uppercase text-sm">Intent-targeting</div>
            <h1 className="text-[#0f172a] font-bold tracking-tight leading-[1.1] text-[32px] md:text-[48px]">
              Connect with buyers when they're <span className="text-[#F26C1E]">ready to act</span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-slate-500 text-lg md:text-xl leading-relaxed font-normal">
              Find prospects who are already looking for what you offer.
            </p>
            <div className="pt-2">
              <button 
                onClick={handleGetAQuoteClick}
                className="bg-[#00525E] hover:bg-[#00606d] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 text-base"
              >
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

      {/* CARDS Section - With reduced gaps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-16 sm:mt-20 md:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {plans.map((plan, i) => (
            <Card key={i} plan={plan} onAudienceDetails={goToAudience} />
          ))}
        </div>
      </div>

      {/* DRAWER - Same design as Pricing page */}
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
          <button 
            onClick={handleROICalculatorClick}
            className="w-full bg-[rgb(242,108,30)] text-white py-2.5 sm:py-3 rounded-xl font-bold hover:opacity-90 transition-all text-sm sm:text-base"
          >
            Calculate Now
          </button>
        </div>
      </div>

      {/* Mobile Floating Button - Same as Pricing page */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <button 
          onClick={handleROICalculatorClick}
          className="bg-[rgb(242,108,30)] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all"
          aria-label="ROI Calculator"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Spacer div to prevent footer from sticking to cards */}
      <div className="mt-16 sm:mt-20 md:mt-24"></div>

      {/* FULL WIDTH FOOTER SECTION - No padding, spans full width */}
      <Footer />

      <style>{`
        @keyframes bubbleFade {
          100% { opacity: 0; transform: scale(2); }
        }
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }
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

const Card = ({ plan, onAudienceDetails }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(plan.value);
    const duration = 1500;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [plan.value]);

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:-translate-y-3 transition-all duration-300 flex flex-col">
      {/* Title - No extra spacing */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        {plan.name}
      </h3>
      
      {/* Value section - Reduced spacing */}
      <div className="mb-2">
        <div className="text-3xl sm:text-4xl font-bold text-gray-900">
          {count.toFixed(2)} M
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Global Audience
        </p>
      </div>
      
      {/* Description - Reduced spacing */}
      <p className="text-xs text-gray-400 mb-5 sm:mb-6">
        {plan.desc}
      </p>
      
      {/* Button - Perfectly aligned */}
      <button
        onClick={() => onAudienceDetails(plan.slug)}
        className="w-full py-2.5 sm:py-3 rounded-xl bg-[rgb(0,95,115)] text-white font-bold hover:opacity-90 transition-all text-sm sm:text-base mt-auto"
      >
        Audience Details
      </button>
    </div>
  );
};

export default Audience;