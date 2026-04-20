import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useInViewAnimation from '../hooks/useInViewAnimation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ title, labels, values, color }) => {
  const { ref, isVisible } = useInViewAnimation({ threshold: 0.3 });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isVisible && !triggered) {
      setTriggered(true);
    }
  }, [isVisible, triggered]);

  const displayData = triggered ? values : values.map(() => 0);
  const animationDuration = triggered ? 1500 : 0;

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: displayData,
        backgroundColor: color,
        borderRadius: 0,
        maxBarThickness: 26,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: animationDuration,
      easing: 'easeInOutQuart',
    },
    animations: {
      y: {
        from: 0,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${ctx.parsed.y}${
              title.includes('Engagements') ? '%' : ''
            }`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: { color: '#64748B' },
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: {
          precision: 0,
          ...(title.includes('Downloads') && { stepSize: 100 }),
          ...(title.includes('Engagements') && {
            callback: (value) => `${value}%`,
            stepSize: 5,
          }),
        },
        ...(title.includes('Downloads') && { min: 100, max: 500 }),
        ...(title.includes('Engagements') && { min: 0, max: 30 }),
      },
    },
  };

  return (
    <div ref={ref} className="bg-white rounded-[2rem] shadow-xl p-4 sm:p-6 min-h-[280px] flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
        <span className="text-xs sm:text-sm text-slate-500">Past 30 Days</span>
      </div>
      <div className="flex-1 min-h-[180px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;