import React, { useState, useEffect } from 'react';
import KeywordList from './KeywordList';

const AudienceStats = ({ stats, audienceSize }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1500;
    const startValue = 0;
    const endValue = audienceSize;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeOutCubic(elapsed);
      setCount(startValue + (endValue - startValue) * eased);

      if (elapsed < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [audienceSize]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <KeywordList heading="Top Job Titles" items={stats.topJobTitles} />
        <KeywordList heading="Top Industry Topics" items={stats.topTopics} />
        <KeywordList heading="Top Intent Keywords" items={stats.topKeywords} />
      </div>

      <div className="rounded-[2rem] bg-[rgb(242,108,30)] p-8 md:p-10 text-white shadow-xl flex flex-col justify-between min-h-[220px] md:min-h-[360px]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-orange-100/90">Audience Size</p>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight">{count.toFixed(1)}M</h2>
        </div>
        <div className="mt-8 text-sm text-orange-100/90">
          Estimated active audience available across the selected category and matched buyer intent segments.
        </div>
      </div>
    </div>
  );
};

export default AudienceStats;
