import React from "react";
import StatsCardComp from "../components/dashboard/StatsCardComp";
import WasteChartComp from "../components/dashboard/WasteChartComp";
import TableComp from "../components/TableComp";
import { LuBanana, LuCheck, LuTriangleAlert } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Dashboard({ user }) {
  const navigate = useNavigate();

  // Data lengkap semua makanan
  const allData = [
    {
      nama: "Susu",
      kategori: "Minuman",
      tanggalBeli: "2 April 2026",
      kadaluarsa: "9 April 2026",
      total: "2 Pcs"
    },
    {
      nama: "Roti",
      kategori: "Makanan",
      tanggalBeli: "10 April 2026",
      kadaluarsa: "23 April 2026",
      total: "5 Pcs"
    },
    {
      nama: "Dimsum Frozen",
      kategori: "Makanan Olahan",
      tanggalBeli: "28 Februari 2026",
      kadaluarsa: "12 April 2026",
      total: "2 Kg"
    },
    {
      nama: "Mangga",
      kategori: "Buah",
      tanggalBeli: "7 Februari 2026",
      kadaluarsa: "2 Mei 2026",
      total: "4 Kg"
    },
    {
      nama: "Apel",
      kategori: "Buah",
      tanggalBeli: "1 Maret 2026",
      kadaluarsa: "15 Maret 2026",
      total: "3 Kg"
    },
    {
      nama: "Daging Sapi",
      kategori: "Daging",
      tanggalBeli: "5 April 2026",
      kadaluarsa: "12 April 2026",
      total: "1 Kg"
    },
    {
      nama: "Telur",
      kategori: "Protein",
      tanggalBeli: "8 April 2026",
      kadaluarsa: "12 April 2026",
      total: "10 Pcs"
    },
    {
      nama: "Yogurt",
      kategori: "Minuman",
      tanggalBeli: "1 April 2026",
      kadaluarsa: "12 April 2026",
      total: "4 Pcs"
    }
  ];

  // Fungsi untuk cek apakah sudah kadaluarsa
  const isExpired = (tanggalKadaluarsa) => {
    const today = new Date();
    const expiredDate = new Date(tanggalKadaluarsa);
    today.setHours(0, 0, 0, 0);
    expiredDate.setHours(0, 0, 0, 0);
    return expiredDate < today;
  };

  // Fungsi untuk cek apakah dalam 3 hari sebelum kadaluarsa (belum expired)
  const isWithinThreeDays = (tanggalKadaluarsa) => {
    const today = new Date();
    const expiredDate = new Date(tanggalKadaluarsa);
    today.setHours(0, 0, 0, 0);
    expiredDate.setHours(0, 0, 0, 0);

    const diffTime = expiredDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 0-3 hari sebelum kadaluarsa (termasuk hari ini)
    return diffDays <= 3 && diffDays >= 0;
  };

  // Hitung statistik
  const totalMakanan = allData.length;
  const kadaluarsa = allData.filter(item => isExpired(item.kadaluarsa)).length;
  const jauhDariKadaluarsa = totalMakanan - kadaluarsa;

  // Data yang mendekati kadaluarsa (dalam 3 hari) dan belum expired
  const allApproachingExpiry = allData.filter(item => {
    return isWithinThreeDays(item.kadaluarsa) && !isExpired(item.kadaluarsa);
  });

  // Batasi hanya 6 data untuk ditampilkan di dashboard
  const approachingExpiry = allApproachingExpiry.slice(0, 6);


  const stats = [
    {
      title: "Total Makanan",
      value: totalMakanan,
      icon: <LuBanana size={25} color="#91DDAB" />,
      gradientFrom: "from-[#DCFCE7]",
      gradientTo: "to-white",
      iconBgColor: "bg-[#F4FFF8]",
    },
    {
      title: "Jauh Dari Kadaluarsa",
      value: jauhDariKadaluarsa,
      icon: <LuCheck size={25} color="#61A5FF" />,
      gradientFrom: "from-[#DBEAFE]",
      gradientTo: "to-white",
      iconBgColor: "bg-[#F4F9FF]",
    },
    {
      title: "Kadaluarsa",
      value: kadaluarsa,
      icon: <LuTriangleAlert size={25} color="#FF8282" />,
      gradientFrom: "from-[#FECACA]",
      gradientTo: "to-white",
      iconBgColor: "bg-[#FFF0F0]",
    },
  ];

  // Handler untuk tombol "Lihat Semua"
  const handleSeeAll = () => {
    // Navigasi ke halaman SemuaData dengan filter "hampir_kadaluarsa"
    navigate("/foods");
  };

  return (
    <div className="w-full p-3 sm:p-4 md:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="md:my-6 mb-4 mt-16 md:mt-6">
                <h1 
                    className="text-2xl text-[#2e5b4e]" 
                    style={{ fontFamily: "'Bowlby One', cursive" }}
                >
                    Dashboard
                </h1>
            </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Selamat datang kembali
          </p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
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
          <WasteChartComp />
        </div>

        {/* Approaching Expiry Table */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2
              className="text-lg sm:text-xl text-[#2e5b4e]"
              style={{ fontFamily: "'Bowlby One', cursive" }}
            >
              Makanan Mendekati Kadaluarsa (≤ 3 Hari)
            </h2>
            <button
              onClick={handleSeeAll}
              className="text-[#F59E0B] hover:text-[#D97706] text-sm font-medium"
            >
              Lihat Semua →
            </button>
          </div>

          {approachingExpiry.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <TableComp data={approachingExpiry} />
              </div>
              {/* Info tambahan jika data lebih dari 6 */}
              {allApproachingExpiry.length > 6 && (
                <p className="text-xs text-gray-400 mt-2 text-right">
                  *Menampilkan 6 dari {allApproachingExpiry.length} data
                </p>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-500">Tidak ada makanan yang mendekati kadaluarsa</p>
            </div>
          )}

          {/* Info jumlah */}
          <div className="mt-4 text-xs sm:text-sm text-gray-500">
            Menampilkan {approachingExpiry.length} makanan yang akan kadaluarsa dalam 3 hari ke depan
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;