import React from "react";
import { useNavigate } from "react-router-dom";
import { LuFileSearch } from "react-icons/lu";

function TableRowComp({ item, index }) {
    const navigate = useNavigate();

    // Fungsi untuk cek apakah sudah kadaluarsa
    const isExpired = (tanggalKadaluarsa) => {
        if (!tanggalKadaluarsa || tanggalKadaluarsa === 'N/A') return false;
        const today = new Date();
        const expiredDate = new Date(tanggalKadaluarsa);
        today.setHours(0, 0, 0, 0);
        expiredDate.setHours(0, 0, 0, 0);
        return expiredDate < today;
    };

    // Fungsi untuk cek apakah dalam 3 hari sebelum kadaluarsa (H-3)
    const isNearExpiry = (tanggalKadaluarsa) => {
        if (!tanggalKadaluarsa || tanggalKadaluarsa === 'N/A') return false;
        const today = new Date();
        const expiredDate = new Date(tanggalKadaluarsa);
        today.setHours(0, 0, 0, 0);
        expiredDate.setHours(0, 0, 0, 0);

        const diffTime = expiredDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // H-3: 1-3 hari sebelum kadaluarsa (belum expired)
        return diffDays <= 3 && diffDays > 0;
    };

    const expired = isExpired(item.kadaluarsa);
    const nearExpiry = isNearExpiry(item.kadaluarsa);

    // Tentukan warna status (HANYA BULAT)
    let statusColor = "bg-[#DBEAFE]"; // default aman
    let statusText = "Masih Aman";

    if (expired) {
        statusColor = "bg-[#FF9090]";
        statusText = "Kadaluarsa";
    } else if (nearExpiry) {
        statusColor = "bg-[#FECACA]";
        statusText = "Hampir Kadaluarsa";
    }

    const handleDetailClick = () => {
        navigate(`/detail/${item.id}`);
    };

    return (
        <div className="bg-white shadow-md border-5 border-[#FFF1DF] rounded-2xl mb-3">
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-7 gap-4 px-5 py-4 items-center">
                <div>
                    <div
                        className={`w-6 h-6 rounded-full ${statusColor} shadow-sm ms-4`}
                        title={statusText}
                    ></div>
                </div>
                <div className="text-sm text-gray-700">{item.nama}</div>
                <div className="text-sm text-gray-700">{item.kategori}</div>
                <div className="text-sm text-gray-700">{item.tanggalBeli}</div>
                <div className="text-sm text-gray-700">{item.kadaluarsa}</div>
                <div className="text-sm text-gray-700">{item.total}</div>
                <div>
                    <button
                        onClick={handleDetailClick}
                        className="text-[#2e5b4e] hover:text-[#1f4036] transition-colors"
                    >
                        <LuFileSearch size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile View - Card Style */}
            <div className="md:hidden p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-3 h-3 rounded-full ${statusColor}`}
                            title={statusText}
                        ></div>
                        <span className="text-xs text-gray-500">{statusText}</span>
                    </div>
                    <button
                        onClick={handleDetailClick}
                        className="text-[#2e5b4e]"
                    >
                        <LuFileSearch size={18} />
                    </button>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">Nama</span>
                        <span className="text-sm text-gray-700 font-medium">{item.nama}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">Kategori</span>
                        <span className="text-sm text-gray-700">{item.kategori}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">Tanggal Beli</span>
                        <span className="text-sm text-gray-700">{item.tanggalBeli}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">Kadaluarsa</span>
                        <span className="text-sm text-gray-700">{item.kadaluarsa}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">Total</span>
                        <span className="text-sm text-gray-700">{item.total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableRowComp;