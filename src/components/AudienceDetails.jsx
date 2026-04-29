import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryTabs from './CategoryTabs';
import DonutChart from './DonutChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import AudienceMap from './AudienceMap';
import useInViewAnimation from '../hooks/useInViewAnimation';
import { audienceCategories, audienceData } from './audienceData';
import Footer from './Footer';

const AudienceDetails = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const activeCategory = category || 'marketing';
  const selected = audienceData[activeCategory] || audienceData.marketing;

  const [audienceCount, setAudienceCount] = useState(0);
  const { ref: audienceSizeRef, isVisible: isAudienceVisible } = useInViewAnimation({ threshold: 0.3 });

  useEffect(() => {
    if (!category || !audienceData[category]) {
      navigate('/audience/marketing', { replace: true });
    }
  }, [category, navigate]);

  useEffect(() => {
    if (!isAudienceVisible) return undefined;

    let frameId;
    const duration = 1500;
    const startValue = 0;
    const endValue = selected.audienceSize;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeOutCubic(elapsed);
      setAudienceCount(startValue + (endValue - startValue) * eased);

      if (elapsed < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isAudienceVisible, selected.audienceSize]);

  const topJobTitles = [
    'CRO',
    'VP Sales',
    'VP Global Sales',
    'Sales Director',
    'Sales Operations',
    'Sales Manager',
    'Regional Sales',
  ];

  const topIndustryTopics = [
    'Future Growth',
    'CX Expectations',
    'Big Data',
    'Outsourcing Functions',
    'Sales CRM',
    'Adopting Automation',
    'Inbound Leads',
    'Outbound Prospecting',
    'Inside Sales Solutions',
  ];

  const topIntentKeywords = [
    'Sales Operations',
    'Social Selling',
    'Collaboration',
    'Reporting & Analytics',
    'Pipeline Management',
    'Outbound Strategy',
    'Lead Generation',
    'Sales Automation',
    'Sales Personalization',
    'Sales AI',
  ];

  const maxRowCount = Math.max(topJobTitles.length, topIndustryTopics.length, topIntentKeywords.length);
  const tableRows = Array.from({ length: maxRowCount }, (_, index) => ({
    jobTitle: topJobTitles[index] || '',
    topic: topIndustryTopics[index] || '',
    keyword: topIntentKeywords[index] || '',
  }));

  const handleCategorySelect = (slug) => {
    if (slug !== activeCategory) {
      navigate(`/audience/${slug}`);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-orange-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-slate-100 bg-white py-12 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-10 mt-7">
          <CategoryTabs categories={audienceCategories} activeCategory={activeCategory} onSelect={handleCategorySelect} />
          <div className="text-center px-2">
            <p className="text-2xl sm:text-4xl uppercase tracking-[0.2em] sm:tracking-[0.35em] text-orange-500 font-bold mb-4">Industry Breakdown</p>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900">{selected.headline}</h1>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12 lg:px-20 pt-8 md:pt-16 space-y-6 md:space-y-8">
        {/* TOP SECTION */}
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-sm overflow-x-auto">
            <div className="grid gap-4 md:gap-6 grid-cols-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Top Job Titles</h3>
                <div className="mt-3 w-8 h-1 rounded-full bg-blue-500" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Top Industry Topics</h3>
                <div className="mt-3 w-8 h-1 rounded-full bg-blue-500" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Top Intent Keywords</h3>
                <div className="mt-3 w-8 h-1 rounded-full bg-blue-500" />
              </div>
            </div>
            <div className="mt-6">
              <table className="min-w-full border-separate border-spacing-y-2 text-xs sm:text-sm bg-transparent">
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={index} className="transition-none">
                      <td className="py-2 pr-3 align-top text-slate-600 bg-transparent">
                        <span>{row.jobTitle}</span>
                      </td>
                      <td className="py-2 px-3 align-top text-slate-600 bg-transparent">
                        <span>{row.topic}</span>
                      </td>
                      <td className="py-2 pl-3 align-top text-slate-600 bg-transparent">
                        <span>{row.keyword}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div ref={audienceSizeRef} className="flex flex-col justify-center items-center min-h-[200px] md:min-h-[360px] py-8 md:py-0">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Audience Size</p>
              <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight text-orange-500">{audienceCount.toFixed(1)}M</h2>
            </div>
            <div className="mt-8 text-sm text-slate-700 text-center px-4">
              Estimated active audience available across the selected category and matched buyer intent segments.
            </div>
          </div>
        </div>

        {/* SECOND SECTION (CHARTS) */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="flex flex-col gap-6">
            <div className="h-full">
              <DonutChart
                title="Job Level"
                labels={selected.donut.jobLevel.labels}
                values={selected.donut.jobLevel.values}
                colors={selected.donut.jobLevel.colors}
              />
            </div>
            <div className="h-full">
              <DonutChart
                title="Company Size"
                labels={selected.donut.companySize.labels}
                values={selected.donut.companySize.values}
                colors={selected.donut.companySize.colors}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-full">
              <LineChart
                title="Open Rate"
                labels={selected.line.openRate.labels}
                values={selected.line.openRate.values}
                avg={selected.line.openRate.avg}
                color={selected.line.openRate.color}
              />
            </div>
            <div className="h-full">
              <LineChart
                title="CTR"
                labels={selected.line.ctr.labels}
                values={selected.line.ctr.values}
                avg={selected.line.ctr.avg}
                color={selected.line.ctr.color}
              />
            </div>
          </div>
        </div>

        {/* Row: Annual Revenue Donut + Content Downloads Bar */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="h-full">
            <DonutChart
              title="Annual Revenue"
              labels={selected.donut.annualRevenue.labels}
              values={selected.donut.annualRevenue.values}
              colors={selected.donut.annualRevenue.colors}
            />
          </div>
          <div className="h-full">
            <BarChart
              title="Content Downloads"
              labels={selected.bar.downloads.labels}
              values={selected.bar.downloads.values}
              color={selected.bar.downloads.color}
            />
          </div>
        </div>

        {/* Row: Map + Multi Engagements */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="h-full">
            <AudienceMap regions={selected.regions} />
          </div>
          <div className="h-full">
            <BarChart
              title="Multi Engagements"
              labels={selected.bar.engagements.labels}
              values={selected.bar.engagements.values}
              color={selected.bar.engagements.color}
            />
          </div>
        </div>
      </main>

      {/* Spacer div to prevent footer from sticking to content */}
      <div className="mt-16 sm:mt-20 md:mt-24"></div>

      {/* FULL WIDTH FOOTER SECTION - No padding, spans full width */}
      <Footer />
    </div>
  );
};

export default AudienceDetails;