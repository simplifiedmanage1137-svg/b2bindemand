import React, { useEffect, useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useInViewAnimation from '../hooks/useInViewAnimation';

ChartJS.register(ArcElement, Tooltip, Legend);

const colorPalette = [
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#84cc16',
  '#f97316',
];

const DonutChart = ({ title, labels = [], values = [], colors = [] }) => {
  const { ref, isVisible } = useInViewAnimation({ threshold: 0.3 });
  const [triggered, setTriggered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isVisible && !triggered) setTriggered(true);
  }, [isVisible, triggered]);

  // Reorder: move Non-Manager to last position only on desktop for Job Level
  const { finalLabels, finalValues, finalColors } = useMemo(() => {
    let orderedLabels = [...labels];
    let orderedValues = [...values];
    let orderedColors = labels.map((_, i) => (colors && colors[i] ? colors[i] : colorPalette[i % colorPalette.length]));

    if (title === 'Job Level' && isDesktop) {
      const idx = orderedLabels.indexOf('Non-Manager');
      if (idx !== -1) {
        const [l] = orderedLabels.splice(idx, 1);
        const [v] = orderedValues.splice(idx, 1);
        const [c] = orderedColors.splice(idx, 1);
        orderedLabels.push(l);
        orderedValues.push(v);
        orderedColors.push(c);
      }
    }

    return { finalLabels: orderedLabels, finalValues: orderedValues, finalColors: orderedColors };
  }, [labels, values, colors, title, isDesktop]);

  const displayData = triggered ? finalValues : finalValues.map(() => 0);

  const data = {
    labels: finalLabels,
    datasets: [{
      data: displayData,
      backgroundColor: finalColors,
      borderWidth: 0,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    // -90 starts at top; Non-Manager is last so it lands in bottom-right quadrant on desktop
    rotation: title === 'Job Level' && isDesktop ? -90 : 0,
    circumference: 360,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: triggered ? 1500 : 0,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <div ref={ref} className="bg-white rounded-[2rem] shadow-xl p-4 sm:p-6 h-full flex flex-col">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <span className="text-sm text-slate-500">Top split</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-1">
        <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] flex-shrink-0">
          <Doughnut data={data} options={options} />
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-3 w-full sm:flex-col sm:justify-start sm:gap-2 sm:w-auto">
          {finalLabels.map((label, index) => (
            <div key={label} className="flex items-center gap-2 text-xs justify-center sm:justify-start">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: finalColors[index] }} />
              <span className="text-slate-600 whitespace-nowrap">{label}</span>
              <span className="font-semibold text-slate-900">{finalValues[index]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;