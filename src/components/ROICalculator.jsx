import React, { useState, useEffect } from 'react';

const ROICalculator = () => {
    // Set default values
    const [spend, setSpend] = useState('10000');
    const [leads, setLeads] = useState('100');
    const [conversion, setConversion] = useState('5');
    const [dealValue, setDealValue] = useState('5000');
    const [showResults, setShowResults] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Calculated values
    const [calculatedValues, setCalculatedValues] = useState({
        monthlyRevenue: 0,
        roiIncrease: 0,
        leadsValue: 0,
        conversionValue: 0
    });

    // Auto-calculate on page load
    useEffect(() => {
        handleCalculate();
    }, []);

    const badges = [
        { id: 1, text: "GDPR CERTIFIED" },
        { id: 2, text: "ISO 9001:2015 CERTIFIED" },
        { id: 3, text: "ISO/IEC 27001:2022 CERTIFIED" },
        { id: 4, text: "DUN & BRADSTREET" },
        { id: 5, text: "CCPA" },
        { id: 6, text: "CAN SPAM" },
        { id: 7, text: "10+ YEARS" },
    ];

    const handleCalculate = () => {
        const spendNum = parseFloat(spend) || 0;
        const leadsNum = parseFloat(leads) || 0;
        const conversionNum = parseFloat(conversion) || 0;
        const dealValueNum = parseFloat(dealValue) || 0;

        const currentMonthlyRevenue = (leadsNum * (conversionNum / 100)) * dealValueNum;
        const improvedLeads = leadsNum * 1.3;
        const improvedConversion = conversionNum * 1.25;
        const improvedMonthlyRevenue = (improvedLeads * (improvedConversion / 100)) * dealValueNum;
        const currentROI = spendNum > 0 ? ((currentMonthlyRevenue - spendNum) / spendNum * 100) : 0;
        const improvedROI = spendNum > 0 ? ((improvedMonthlyRevenue - spendNum) / spendNum * 100) : 0;
        const roiIncrease = improvedROI - currentROI;

        setCalculatedValues({
            monthlyRevenue: improvedMonthlyRevenue - currentMonthlyRevenue,
            roiIncrease: roiIncrease,
            leadsValue: improvedLeads - leadsNum,
            conversionValue: improvedConversion - conversionNum
        });
        setShowResults(true);
    };

    const handleClear = () => {
        setSpend('10000');
        setLeads('100');
        setConversion('5');
        setDealValue('5000');
        handleCalculate();
    };

    const ResultCard = ({ title, value, subValue, icon, color }) => (
        <div className="col-6 p-2">
            <div className="text-center p-3 h-100 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="mx-auto mb-2 flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: color }}>
                    <span className="text-white font-bold">{icon}</span>
                </div>
                <h4 className="font-bold m-0 text-lg" style={{ color: color }}>{value}</h4>
                <p className="text-gray-400 font-bold m-0 text-[10px]">{title}</p>
                <p className="m-0 font-bold mt-1 text-[10px]" style={{ color: '#2ecc71' }}>{subValue}</p>
            </div>
        </div>
    );

    const getCurrentValues = () => {
        const spendNum = parseFloat(spend) || 0;
        const leadsNum = parseFloat(leads) || 0;
        const conversionNum = parseFloat(conversion) || 0;
        const dealValueNum = parseFloat(dealValue) || 0;

        const currentCostPerLead = leadsNum > 0 ? spendNum / leadsNum : 0;
        const currentMonthlyRevenue = (leadsNum * (conversionNum / 100)) * dealValueNum;
        const improvedLeads = leadsNum * 1.3;
        const improvedConversion = conversionNum * 1.25;
        const improvedCostPerLead = improvedLeads > 0 ? spendNum / improvedLeads : 0;
        const improvedMonthlyRevenue = (improvedLeads * (improvedConversion / 100)) * dealValueNum;

        return {
            currentCostPerLead,
            improvedCostPerLead,
            currentLeads: leadsNum,
            improvedLeads,
            currentConversion: conversionNum,
            improvedConversion,
            currentRevenue: currentMonthlyRevenue,
            improvedRevenue: improvedMonthlyRevenue
        };
    };

    const values = getCurrentValues();

    const InputField = ({ label, icon, value, onChange, placeholder, helperText }) => (
        <div className="mb-4 text-left">
            <label className="block text-gray-500 font-semibold text-xs mb-2 tracking-wide">{label}</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600 font-bold z-10">
                    {icon}
                </span>
                <input
                    type="number"
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:border-purple-400 transition-all"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setTimeout(() => handleCalculate(), 0);
                    }}
                    placeholder={placeholder}
                    step="any"
                />
            </div>
            <p className="text-gray-400 text-xs mt-2">{helperText}</p>
        </div>
    );

    return (
        <section className="bg-gray-50 min-h-screen relative overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
            
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center text-center text-white px-4"
                style={{ background: 'linear-gradient(90deg, #6c3dec 0%, #4a74d4 100%)' }}>
                <div className="relative z-10">
                    <p className="text-xl opacity-90 mb-5">
                        We're changing the way companies connect.
                    </p>
                    <h1 className="font-bold text-5xl mb-5">
                        Calculate Your Lead Generation ROI
                    </h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Discover how much you could save and earn with our data-driven <br />
                        B2B lead generation services. Get personalized ROI projections <br />
                        in minutes.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1250px] mx-auto px-4 mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT: ROI Calculator Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="font-bold text-2xl mb-6 text-gray-800">ROI Calculator</h3>
                            
                            <InputField
                                label="MONTHLY MARKETING SPEND ($)"
                                icon="$"
                                value={spend}
                                onChange={setSpend}
                                placeholder="Enter amount"
                                helperText="Total amount spent on marketing activities per month"
                            />

                            <InputField
                                label="CURRENT MONTHLY LEADS"
                                icon="👥"
                                value={leads}
                                onChange={setLeads}
                                placeholder="Enter number of leads"
                                helperText="Number of leads generated per month currently"
                            />

                            <InputField
                                label="CURRENT CONVERSION RATE (%)"
                                icon="%"
                                value={conversion}
                                onChange={setConversion}
                                placeholder="Enter conversion rate"
                                helperText="Percentage of leads that convert to customers"
                            />

                            <InputField
                                label="AVERAGE DEAL VALUE ($)"
                                icon="$"
                                value={dealValue}
                                onChange={setDealValue}
                                placeholder="Enter deal value"
                                helperText="Average revenue per customer/deal"
                            />

                            <div className="flex gap-3 mt-6">
                                <button
                                    className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md"
                                    onClick={handleCalculate}
                                >
                                    Calculate Projections
                                </button>
                                <button
                                    className="px-6 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Your ROI Projection */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <div className="text-center mb-6">
                                <h2 className="font-bold text-2xl mb-2 text-gray-800">Your ROI Projection</h2>
                                <p className="text-gray-400 text-sm">Based on your current metrics and our proven improvements</p>
                            </div>

                            {!showResults ? (
                                <div className="text-center py-12">
                                    <div className="mb-4">
                                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                                            <circle cx="60" cy="60" r="54" stroke="#e0e0e0" strokeWidth="2"/>
                                            <path d="M60 30V60L75 75" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round"/>
                                            <circle cx="60" cy="60" r="8" fill="#e0e0e0"/>
                                            <rect x="40" y="85" width="40" height="6" rx="3" fill="#e0e0e0"/>
                                            <rect x="48" y="95" width="24" height="4" rx="2" fill="#e0e0e0"/>
                                        </svg>
                                    </div>
                                    <h5 className="font-bold mb-3 text-gray-600">No Data Available</h5>
                                    <p className="text-gray-400 px-4 text-sm">
                                        Fill in your campaign details on the left and click "Calculate Projections" to see your ROI results
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-3 mb-8">
                                        <ResultCard
                                            icon="%"
                                            color="#3498db"
                                            value={`${calculatedValues.roiIncrease.toFixed(1)}%`}
                                            title="ROI INCREASE"
                                            subValue={`+${calculatedValues.roiIncrease.toFixed(1)}% improvement`}
                                        />
                                        <ResultCard
                                            icon="$"
                                            color="#3498db"
                                            value={`$${Math.round(calculatedValues.monthlyRevenue)}`}
                                            title="MONTHLY REVENUE GAIN"
                                            subValue={`+$${calculatedValues.monthlyRevenue.toFixed(2)} per month`}
                                        />
                                        <ResultCard
                                            icon="👥"
                                            color="#3498db"
                                            value={Math.round(calculatedValues.leadsValue)}
                                            title="ADDITIONAL LEADS"
                                            subValue={`+${calculatedValues.leadsValue.toFixed(1)} leads per month`}
                                        />
                                        <ResultCard
                                            icon="📈"
                                            color="#3498db"
                                            value={`${calculatedValues.conversionValue.toFixed(1)}%`}
                                            title="CONVERSION BOOST"
                                            subValue={`+${calculatedValues.conversionValue.toFixed(1)}% better conversion`}
                                        />
                                    </div>

                                    {/* Comparison Table */}
                                    <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-8">
                                        <div className="text-white text-center py-3 font-bold text-lg tracking-wide"
                                            style={{ background: 'linear-gradient(90deg, #3498db 0%, #1abc9c 100%)' }}>
                                            Before vs. After Comparison
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-center">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="py-4 px-3 text-gray-500 font-bold text-sm">METRIC</th>
                                                        <th className="py-4 px-3 text-gray-500 font-bold text-sm">CURRENT</th>
                                                        <th className="py-4 px-3 text-gray-500 font-bold text-sm">WITH OUR SERVICES</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-gray-100">
                                                        <td className="py-4 px-3 font-bold text-gray-800 text-sm">Cost per Lead</td>
                                                        <td className="py-4 px-3 font-bold text-red-500 text-base">${values.currentCostPerLead.toFixed(2)}</td>
                                                        <td className="py-4 px-3 font-bold text-green-500 text-base">${values.improvedCostPerLead.toFixed(2)}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-100">
                                                        <td className="py-4 px-3 font-bold text-gray-800 text-sm">Monthly Leads</td>
                                                        <td className="py-4 px-3 font-bold text-red-500 text-base">{Math.round(values.currentLeads)}</td>
                                                        <td className="py-4 px-3 font-bold text-green-500 text-base">{Math.round(values.improvedLeads)}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-100">
                                                        <td className="py-4 px-3 font-bold text-gray-800 text-sm">Conversion Rate</td>
                                                        <td className="py-4 px-3 font-bold text-red-500 text-base">{values.currentConversion.toFixed(1)}%</td>
                                                        <td className="py-4 px-3 font-bold text-green-500 text-base">{values.improvedConversion.toFixed(1)}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-4 px-3 font-bold text-gray-800 text-sm">Monthly Revenue</td>
                                                        <td className="py-4 px-3 font-bold text-red-500 text-base">${values.currentRevenue.toFixed(2)}</td>
                                                        <td className="py-4 px-3 font-bold text-green-500 text-base">${values.improvedRevenue.toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* CTA Section */}
                                    <div className="p-5 text-center bg-blue-50 rounded-2xl border border-blue-100">
                                        <h5 className="font-bold mb-2 text-gray-800">Ready to Achieve These Results?</h5>
                                        <p className="text-gray-500 mb-4 mx-auto text-sm leading-relaxed">
                                            These projections are based on our proven track record with similar businesses.
                                            Let's discuss how we can help you achieve these improvements.
                                        </p>
                                        <div className="flex justify-center gap-3">
                                            <button className="bg-blue-900 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md hover:bg-blue-800 transition-all">
                                                Get Started 🚀
                                            </button>
                                            <button className="bg-white border border-gray-300 px-5 py-2 rounded-full font-bold text-sm text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
                                                Call Now 📞
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges Section */}
            <div className="w-full py-12 mt-16 bg-gray-50 rounded-t-[60px] border-t border-gray-100">
                <div className="container max-w-[1100px] mx-auto px-4">
                    <h3 className="text-center text-gray-400 font-semibold mb-10 tracking-widest text-[24px] uppercase">
                        Trusted by Industry Leaders
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                        {badges.map(b => (
                            <div key={b.id} className="text-center group transition-all duration-300 hover:scale-105">
                                <div className="bg-white rounded-2xl shadow-md mb-4 flex items-center justify-center mx-auto border border-gray-100 group-hover:border-[#003d7c]/30 transition-colors"
                                    style={{ width: '100px', height: '100px' }}>
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

export default ROICalculator;