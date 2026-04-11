import React, { useState, useEffect } from "react";
import axios from 'axios';
import StatsCardComp from "../components/dashboard/StatsCardComp";
import WasteChartComp from "../components/dashboard/WasteChartComp";
import TableComp from "../components/TableComp";
import { LuBanana, LuCheck, LuTriangleAlert } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    total_makanan: 0,
    jauh_dari_kadaluarsa: 0,
    kadaluarsa: 0
  });
  const [approachingExpiry, setApproachingExpiry] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    pcs: [0, 0, 0, 0, 0, 0],
    kg: [0, 0, 0, 0, 0, 0]
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, expiringRes, chartRes] = await Promise.all([
          axios.get('http://localhost:8000/api/dashboard'),
          axios.get('http://localhost:8000/api/dashboard/expiring-soon'),
          axios.get('http://localhost:8000/api/dashboard/chart').catch(err => {
            console.warn('Chart API not ready yet:', err);
            return { data: null };
          })
        ]);
        
        console.log('Stats:', statsRes.data);
        console.log('Expiring:', expiringRes.data);
        console.log('Chart:', chartRes.data);
        
        setStats(statsRes.data);
        setApproachingExpiry(expiringRes.data || []);
        
        if (chartRes.data && chartRes.data.labels) {
          setChartData(chartRes.data);
        }
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const apiStats = [
    {
      title: "Total Makanan",
      value: stats.total_makanan || 0,
      icon: <LuBanana size={25} color="#91DDAB" />,
      gradientFrom: "from-[#DCFCE7]",
      gradientTo: "to-white",
      iconBgColor: "bg-[#F4FFF8]",
    },
    {
      title: "Jauh Dari Kadaluarsa",
      value: stats.jauh_dari_kadaluarsa || 0,
      icon: <LuCheck size={25} color="#61A5FF" />,
      gradientFrom: "from-[#DBEAFE]",
      gradientTo: "to-white",
      iconBgColor: "bg-[#F4F9FF]",
    },
    {
      title: "Kadaluarsa",
      value: stats.kadaluarsa || 0,
      icon: <LuTriangleAlert size={25} color="#FF8282" />,
      gradientFrom: "from-[#FECACA]",
      gradientTo: "to-white",
      iconBgColor: "bg-[#FFF0F0]",
    },
  ];

  if (loading) {
    return (
      <div className="w-full p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center p-8">Loading...</div>
        </div>
      </div>
    );
  }

  const handleSeeAll = () => {
    navigate("/foods?filter=hampir_kadaluarsa");
  };

  return (
    <div className="w-full p-3 sm:p-4 md:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="md:my-6 mb-4 mt-16 md:mt-6">
            <h1 className="text-2xl text-[#2e5b4e]" style={{ fontFamily: "'Bowlby One', cursive" }}>
              Dashboard
            </h1>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Selamat datang kembali, Zhao Yu Fan!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {apiStats.map((stat, index) => ( 
            <StatsCardComp
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              gradientFrom={stat.gradientFrom}
              gradientTo={stat.gradientTo}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>

        {/* Chart Section */}
        <div className="mb-6 sm:mb-8">
          <WasteChartComp chartData={chartData} />
        </div>

        {/* Table */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg sm:text-xl text-[#2e5b4e]" style={{ fontFamily: "'Bowlby One', cursive" }}>
              Makanan Mendekati Kadaluarsa (≤ 3 Hari)
            </h2>
            <button onClick={handleSeeAll} className="text-[#F59E0B] hover:text-[#D97706] text-sm font-medium">
              Lihat Semua →
            </button>
          </div>

          {approachingExpiry.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <TableComp data={approachingExpiry} />
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-500">Tidak ada makanan yang mendekati kadaluarsa</p>
            </div>
          )}

          <div className="mt-4 text-xs sm:text-sm text-gray-500">
            Menampilkan {approachingExpiry.length} makanan yang akan kadaluarsa dalam 3 hari ke depan
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;