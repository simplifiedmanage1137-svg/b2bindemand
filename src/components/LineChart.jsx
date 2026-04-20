import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useInViewAnimation from '../hooks/useInViewAnimation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ title, labels, values, color, avg }) => {
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
        fill: false,
        borderColor: color,
        backgroundColor: color,
        tension: 0,
        pointRadius: 0,
        borderWidth: 3,
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
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: { color: '#64748B' },
      },
      y: {
        display: true,
        grid: { drawBorder: false, color: '#F1F5F9' },
        ticks: {
          precision: 0,
          callback: (value) => `${value}%`,
        },
        ...(title === 'Open Rate' && { min: 0, max: 40 }),
        ...(title === 'CTR' && { min: 0, max: 30 }),
      },
    },
  };

  return (
    <div ref={ref} className="bg-white rounded-[2rem] shadow-xl p-4 sm:p-6 min-h-[280px] flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-xs sm:text-sm text-slate-500">Avg {avg}% over 30 days</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{avg}%</div>
      </div>
      <div className="flex-1 min-h-[180px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;