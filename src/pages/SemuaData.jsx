import { useState } from "react";
import TableComp from "../components/TableComp";
import { LuCirclePlus } from "react-icons/lu";
import PaginationComp from "../components/PaginationComp";

function SemuaData() {
    const [activeFilter, setActiveFilter] = useState("semua");
    
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
            kadaluarsa: "2 April 2026",
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
        
        // 1-3 hari sebelum kadaluarsa (belum termasuk hari ini)
        return diffDays <= 3 && diffDays > 0;
    };

    // Filter data untuk "Hampir Kadaluarsa"
    const getFilteredData = () => {
        if (activeFilter === "hampir_kadaluarsa") {
            return allData.filter(item => {
                const expired = isExpired(item.kadaluarsa);
                const withinThreeDays = isWithinThreeDays(item.kadaluarsa);
                // Tampilkan yang sudah expired ATAU yang dalam 3 hari sebelum kadaluarsa
                return expired || withinThreeDays;
            });
        }
        return allData;
    };

    const filteredData = getFilteredData();
    const showAddButton = activeFilter === "semua";

    return (
        <div className="w-full">
            {/* Header dengan filter buttons dan tambah makanan */}
            <div className="md:my-6 mb-4 mt-16 md:mt-6">
                <h1 
                    className="text-2xl text-[#2e5b4e]" 
                    style={{ fontFamily: "'Bowlby One', cursive" }}
                >
                    Data Makanan / Minuman
                </h1>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveFilter("semua")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeFilter === "semua"
                            ? "text-[#2e5b4e] border-b-2 border-[#2e5b4e]"
                            : "text-gray-500 hover:text-[#2e5b4e]"
                    }`}
                >
                    Semua
                </button>
                <button
                    onClick={() => setActiveFilter("hampir_kadaluarsa")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeFilter === "hampir_kadaluarsa"
                            ? "text-[#2e5b4e] border-b-2 border-[#2e5b4e]"
                            : "text-gray-500 hover:text-[#2e5b4e]"
                    }`}
                >
                    Hampir Kadaluarsa
                </button>
            </div>

            {/* Tombol Tambah Makanan - hanya muncul di tab "semua" */}
            {showAddButton && (
                <button 
                    onClick={() => console.log("Tambah Data")}
                    className="cursor-pointer text-[#F59E0B] hover:text-[#f3bc5e] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors my-6 ml-auto"
                >
                    <LuCirclePlus size={23}/>
                    Tambah Data
                </button>
            )}

            {/* Table */}
            <TableComp data={filteredData} />
            
            {/* Info jumlah data */}
            <div className="mt-4 text-sm text-gray-500">
                Menampilkan {filteredData.length} dari {allData.length} data
            </div>
            <PaginationComp/>
        </div>
    );
}

export default SemuaData;