import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WasteChartComp() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Terbuang (pcs)",
        data: [12, 8, 15, 10, 7, 5],
        backgroundColor: (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#F59E0B");
          gradient.addColorStop(1, "#FDE68A");
          return gradient;
        },
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
      {
        label: "Terbuang (kg)",
        data: [2, 3, 5, 4, 6, 3],
        backgroundColor: (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#2F5D56");
          gradient.addColorStop(1, "#56ADA0");
          return gradient;
        },
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "'Jomolhari', serif",
            size: 10,
          },
          usePointStyle: true,
          boxWidth: 6,
          padding: 8,
        },
      },
      tooltip: {
        backgroundColor: "#2F5D56",
        titleFont: {
          family: "'Jomolhari', serif",
          size: 12,
        },
        bodyFont: {
          family: "'Jomolhari', serif",
          size: 11,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
        title: {
          display: true,
          text: "Jumlah Terbuang",
          font: {
            family: "'Jomolhari', serif",
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full overflow-hidden">
      <h3 className="text-base sm:text-lg font-semibold text-[#1F2D3B] mb-3 sm:mb-4" style={{ fontFamily: "'Bowlby One', cursive" }}>
        Presentase Makanan Terbuang
      </h3>
      <div className="h-64 sm:h-80 w-full">
        <Bar data={data} options={options} />
      </div>
      <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-3 sm:mt-4">
        *Data menunjukkan jumlah makanan terbuang per bulan (pcs dan kg)
      </p>
    </div>
  );
}

export default WasteChartComp;