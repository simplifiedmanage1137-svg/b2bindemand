import React, { useState, useEffect } from 'react';

const ROICalculator = () => {
    const [spend, setSpend] = useState('10000');
    const [leads, setLeads] = useState('100');
    const [conversion, setConversion] = useState('5');
    const [dealValue, setDealValue] = useState('5000');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [calculatedValues, setCalculatedValues] = useState({
        monthlyRevenue: 0,
        roiIncrease: 0,
        leadsValue: 0,
        conversionValue: 0
    });

    useEffect(() => {
        // Adding Poppins font dynamically
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        handleCalculate();
    }, []);

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
        
        setCalculatedValues({
            monthlyRevenue: improvedMonthlyRevenue - currentMonthlyRevenue,
            roiIncrease: improvedROI - currentROI,
            leadsValue: improvedLeads - leadsNum,
            conversionValue: improvedConversion - conversionNum
        });
    };

    const handleClear = () => {
        setSpend('10000');
        setLeads('100');
        setConversion('5');
        setDealValue('5000');
        setTimeout(() => handleCalculate(), 0);
    };

    const getCurrentValues = () => {
        const spendNum = parseFloat(spend) || 0;
        const leadsNum = parseFloat(leads) || 0;
        const conversionNum = parseFloat(conversion) || 0;
        const dealValueNum = parseFloat(dealValue) || 0;

        return {
            currentCostPerLead: leadsNum > 0 ? spendNum / leadsNum : 0,
            improvedCostPerLead: (leadsNum * 1.3) > 0 ? spendNum / (leadsNum * 1.3) : 0,
            currentLeads: leadsNum,
            improvedLeads: leadsNum * 1.3,
            currentConversion: conversionNum,
            improvedConversion: conversionNum * 1.25,
            currentRevenue: (leadsNum * (conversionNum / 100)) * dealValueNum,
            improvedRevenue: (leadsNum * 1.3 * (conversionNum * 1.25 / 100)) * dealValueNum
        };
    };

    const values = getCurrentValues();

    const StatCard = ({ title, value, subValue, icon, accentColor }) => (
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all w-full max-w-[280px] mx-auto lg:mx-0">
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-inner" 
                     style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                    {icon}
                </div>
                <div className="flex items-center gap-1 text-[#10b981] font-bold text-[10px] bg-emerald-50 px-2 py-1 rounded-lg">
                    <span>↑</span> {subValue}
                </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-800 mb-0.5 tracking-tight">{value}</h4>
            <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest">{title}</p>
        </div>
    );

    const InputField = ({ label, icon, value, onChange, helperText }) => (
        <div className="mb-4 text-left font-poppins">
            <label className="block text-slate-600 font-bold text-[10px] mb-1.5 tracking-wider uppercase">{label}</label>
            <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm group-focus-within:text-[rgb(0,95,115)] transition-colors">
                    {icon}
                </span>
                <input
                    type="number"
                    className="w-full bg-white border border-slate-200 py-2.5 pl-10 pr-4 rounded-xl outline-none transition-all focus:border-[rgb(0,95,115)] focus:ring-2 focus:ring-[rgb(0,95,115)]/10 shadow-sm text-sm font-medium"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setTimeout(() => handleCalculate(), 0);
                    }}
                />
            </div>
            <p className="text-slate-400 text-[10px] mt-1 italic">{helperText}</p>
        </div>
    );

    return (
        <section 
            className="bg-[#f8fafc] min-h-screen relative overflow-hidden" 
            style={{ fontFamily: "'Poppins', sans-serif" }} // Global font family
        >
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-indigo-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />
            
            <div className="relative pt-28 pb-10 text-center px-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-[60px]">
                    Scale Your <span style={{ color: 'rgb(242, 108, 30)' }}>Revenue Engine</span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium">
                    Transform your current metrics into high-growth performance instantly.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    
                    {/* LEFT: FORM */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-xl shadow-slate-200/60 p-6 md:p-8 border border-white w-full max-w-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Campaign Metrics</h3>
                            
                            <InputField label="Monthly Spend" icon="$" value={spend} onChange={setSpend} helperText="Total monthly investment" />
                            <InputField label="Current Leads" icon="👥" value={leads} onChange={setLeads} helperText="Monthly lead volume" />
                            <InputField label="Conversion Rate" icon="%" value={conversion} onChange={setConversion} helperText="Lead-to-deal percentage" />
                            <InputField label="Avg Deal Value" icon="$" value={dealValue} onChange={setDealValue} helperText="Revenue per deal" />

                            <div className="grid grid-cols-2 gap-3 mt-8">
                                <button 
                                    onClick={handleCalculate} 
                                    style={{ backgroundColor: 'rgb(0, 95, 115)' }}
                                    className="text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg active:scale-95"
                                >
                                    Analyze
                                </button>
                                <button onClick={handleClear} className="bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-95">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: RESULTS */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 max-w-[600px] lg:mx-0">
                            <StatCard title="ROI Increase" value={`${calculatedValues.roiIncrease.toFixed(1)}%`} subValue={`${calculatedValues.roiIncrease.toFixed(0)}% Gain`} icon="📊" accentColor="rgb(0, 95, 115)" />
                            <StatCard title="Revenue Gain" value={`$${Math.round(calculatedValues.monthlyRevenue).toLocaleString()}`} subValue={`+$${Math.round(calculatedValues.monthlyRevenue/1000)}k/mo`} icon="💰" accentColor="rgb(242, 108, 30)" />
                            <StatCard title="Additional Leads" value={Math.round(calculatedValues.leadsValue)} subValue={`+30% Vol`} icon="⚡" accentColor="rgb(0, 95, 115)" />
                            <StatCard title="Conversion" value={`${calculatedValues.conversionValue.toFixed(1)}%`} subValue={`Opti Win`} icon="🚀" accentColor="rgb(242, 108, 30)" />
                        </div>

                        <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-sm max-w-[600px]">
                            <div className="bg-slate-900 px-5 py-3 flex justify-between items-center">
                                <h5 className="text-white text-[10px] font-bold uppercase tracking-wider">Performance Breakdown</h5>
                                <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Projection</span>
                            </div>
                            <div className="p-2 overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-50">
                                            <th className="p-3 text-left text-[9px] font-bold text-slate-400 uppercase tracking-wider">Metric</th>
                                            <th className="p-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">Current</th>
                                            <th className="p-3 text-center text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgb(0, 95, 115)' }}>Projected</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        {[
                                            { label: 'Cost Per Lead', cur: values.currentCostPerLead, imp: values.improvedCostPerLead, isCurrency: true },
                                            { label: 'Monthly Leads', cur: values.currentLeads, imp: values.improvedLeads },
                                            { label: 'Conversion', cur: values.currentConversion, imp: values.improvedConversion, isPct: true },
                                            { label: 'Revenue', cur: values.currentRevenue, imp: values.improvedRevenue, isCurrency: true },
                                        ].map((row, idx) => (
                                            <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                                <td className="p-3 font-semibold text-slate-700">{row.label}</td>
                                                <td className="p-3 text-center text-slate-400 font-medium">
                                                    {row.isCurrency ? `$${row.cur.toFixed(0)}` : row.isPct ? `${row.cur}%` : Math.round(row.cur)}
                                                </td>
                                                <td className="p-3 text-center font-bold" style={{ color: 'rgb(0, 95, 115)' }}>
                                                    {row.isCurrency ? `$${row.imp.toFixed(0)}` : row.isPct ? `${row.imp.toFixed(1)}%` : Math.round(row.imp)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;