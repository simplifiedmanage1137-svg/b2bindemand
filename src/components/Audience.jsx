import React, { useState } from 'react';

const Audience = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const row1Data = [
    { title: "Marketing", count: "28.73 M", color: "#FFB338" },
    { title: "Sales", count: "29.41 M", color: "#3ACC63" },
    { title: "Human Resources", count: "19.21 M", color: "#E84407" },
    { title: "Information Technology", count: "49.84 M", color: "#9538FF" },
    { title: "Finance", count: "13.26 M", color: "#C83B8E" },
  ];

  const row2Data = [
    { title: "Business Leaders", count: "3.06 M", color: "#4549E0", sub: "Risk, Mentoring, Telecommuting..." },
    { title: "Supply Chain", count: "2.28 M", color: "#FFB338", sub: "Logistics, Materials, Forecasting..." },
    { title: "Learning & Development", count: "1.19 M", color: "#3ACC63", sub: "LMS, Workplace Safety..." },
    { title: "Customer Experience", count: "0.95 M", color: "#E84407", sub: "Contact Center, Loyalty..." },
    { title: "Others", count: "15.31 M", color: "#9538FF", sub: "Government, Military, Transport..." },
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

  const renderCard = (item, index, rowId, isSecondRow = false) => {
    const isHovered = hoveredRow === rowId && hoveredIndex === index;

    return (
      <div
        key={index}
        onMouseEnter={() => { setHoveredRow(rowId); setHoveredIndex(index); }}
        onMouseLeave={() => { setHoveredRow(null); setHoveredIndex(null); }}
        className={`relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 bg-white group
          ${isSecondRow
            ? 'rounded-t-[30px] rounded-br-[30px] shadow-[10px_10px_20px_rgba(0,0,0,0.1)]'
            : 'rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          }`}
        style={{ minHeight: isSecondRow ? '320px' : '280px', padding: '30px 20px' }}
      >
        {/* --- BACKGROUND ANIMATION LAYER (Circular Corner) --- */}
        {/* Yeh div default mein top-right corner mein chota circle dikhayega */}
        <div
          style={{
            position: 'absolute',
            top: '-20px', // Thoda bahar nikalne ke liye negative value
            right: '-20px',
            width: isHovered ? '160%' : '60px', // Hover par expand hoga
            height: isHovered ? '160%' : '60px', // Hover par expand hoga
            backgroundColor: item.color,
            borderRadius: isHovered ? '0%' : '0 0 0 100%', // Circle se Square transition
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 0,
            transformOrigin: 'top right', // Animation origin point
            opacity: isHovered ? 1 : 0.8 // Thoda semi-transparent default mein
          }}
        />

        {/* --- CONTENT LAYER --- */}
        {/* zIndex ensured content is above the background animation */}
        <div className="relative z-10 flex flex-col h-full items-center text-center">
          <h4 className="font-bold mb-4 transition-colors duration-300"
            style={{ fontSize: "18px", color: isHovered ? '#FFF' : '#1f2937' }}>{item.title}</h4>

          <div className="mb-4">
            <h2 className="font-bold mb-0 transition-colors duration-300"
              style={{ fontSize: "36px", color: isHovered ? '#FFF' : '#111827' }}>{item.count}</h2>
            <p className={`text-[10px] uppercase tracking-widest transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-gray-400'}`}>Global Audience</p>
          </div>

          {isSecondRow && (
            <p className={`text-[10px] mb-6 transition-colors duration-300 px-2 ${isHovered ? 'text-white/70' : 'text-gray-500'}`}>
              {item.sub}
            </p>
          )}

          <div className="mt-auto w-full">
            <button className="w-full font-bold py-2.5 rounded-full transition-all duration-300 shadow-md"
              style={{
                backgroundColor: isHovered ? '#FFF' : item.color,
                color: isHovered ? item.color : '#FFF',
                fontSize: "14px",
                border: 'none'
              }}>
              {isSecondRow ? 'Audience Details' : 'View Details'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gray-100 min-h-screen relative overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* Hero Section */}
      <div className="relative h-[350px] flex items-center justify-center text-center text-white px-4"
        style={{ background: 'linear-gradient(90deg, #6c3dec 0%, #4a74d4 100%)' }}>
        <div className="relative z-10">
          <p className="text-xl opacity-90 mb-5 mt-10">
            We're changing the way companies connect.
          </p>

          <h1 className="font-bold text-5xl mb-5">
            145+ Million B2B Audience
          </h1>

          {/* Option 1: Using <br /> for manual break */}
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Our audiences engage in truly unique ways and engaged <br className="hidden md:block" />
            audiences lead to great conversions.
          </p>
        </div>
      </div>

      <div className="max-w-[1250px] mx-auto px-4 mt-10 relative z-20">
        {/* Pehli Row (Marketing, Sales, etc.) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {row1Data.map((item, index) => renderCard(item, index, 'row1', false))}
        </div>

        {/* Doosri Row (Business Leaders, etc.) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {row2Data.map((item, index) => renderCard(item, index, 'row2', true))}
        </div>
      </div>


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
      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex items-center z-[100]">
        <div onMouseEnter={() => setIsDrawerOpen(true)} onMouseLeave={() => setIsDrawerOpen(false)}
          className="bg-white shadow-2xl p-6 transition-all duration-500"
          style={{
            width: '300px', borderRadius: '24px 0 0 24px',
            transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
            opacity: isDrawerOpen ? 1 : 0,
            visibility: isDrawerOpen ? 'visible' : 'hidden'
          }}>
          <h2 className="font-bold text-blue-900 text-lg mb-2">Budget Calculator</h2>
          <p className="text-gray-500 text-xs mb-4">Optimize your campaign spend instantly.</p>
          <button className="w-full bg-blue-900 text-white py-2 rounded-lg font-bold text-sm">Start Now</button>
        </div>

        <div onMouseEnter={() => setIsDrawerOpen(true)} onMouseLeave={() => setIsDrawerOpen(false)}
          className="bg-[#003d7c] text-white py-6 px-3 cursor-pointer rounded-l-xl font-bold shadow-lg"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          Budget Calculator
        </div>
      </div>
    </section>
  );
};

export default Audience;