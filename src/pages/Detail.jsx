import { useState } from "react";
import { LuCheck, LuTrash2, LuClockAlert } from "react-icons/lu";

function Detail() {
    const [selectedCondition, setSelectedCondition] = useState(null);
    
    const data = {
        nama: "Roti",
        kategori: "Makanan Jadi",
        tanggalBeli: "10 April 2026",
        kadaluarsa: "23 April 2026",
        total: "2 Pcs"
    };

    // Fungsi cek status kadaluarsa
    const isExpired = (tanggalKadaluarsa) => {
        const today = new Date();
        const expiredDate = new Date(tanggalKadaluarsa);
        today.setHours(0, 0, 0, 0);
        expiredDate.setHours(0, 0, 0, 0);
        return expiredDate < today;
    };

    const expired = isExpired(data.kadaluarsa);
    const statusText = expired ? "Kadaluarsa" : "Masih Aman";
    const statusColor = expired ? "bg-red-300" : "bg-blue-300";

    const handleConditionClick = (conditionId, conditionLabel) => {
        setSelectedCondition(conditionId);
        console.log("Kondisi dipilih:", conditionId);
        alert(`Kondisi "${conditionLabel}" berhasil dipilih!`);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Header */}
            <div className="md:my-6 mt-16 md:mt-6 mb-8">
                <h1
                    className="text-2xl text-[#2e5b4e]"
                    style={{ fontFamily: "'Bowlby One', cursive" }}
                >
                    Detail Makanan / Minuman
                </h1>
            </div>

            {/* Card Detail */}
            <div className="bg-white rounded-2xl bg-linear-to-b from-[#FFF1DF] via-[#FFF1DF] shadow-md overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Kolom Kiri */}
                        <div className="space-y-8">
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">Nama makanan/minuman</div>
                                <div className="text-gray-700 font-medium mt-1">{data.nama}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">Tanggal beli</div>
                                <div className="text-gray-700 mt-1">{data.tanggalBeli}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">Total</div>
                                <div className="text-gray-700 mt-1">{data.total}</div>
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-8">
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">Kategori</div>
                                <div className="text-gray-700 font-medium mt-1">{data.kategori}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">Tanggal kadaluarsa</div>
                                <div className="text-gray-700 mt-1">{data.kadaluarsa}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Status</div>
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full ${statusColor} shadow-sm`}
                                        title={statusText}
                                    ></div>
                                    <span className="text-gray-700 font-medium">{statusText}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-8"></div>

                    {/* Pertanyaan - Tengah */}
                    <div className="mb-6 text-center">
                        <div className="text-base text-gray-700 font-semibold">
                            Bagaimana kondisi makanan ini sekarang?
                        </div>
                    </div>

                    {/* Tombol-tombol kondisi - Manual, vertikal ke bawah, tengah */}
                    <div className="flex flex-col items-center gap-4">
                        {/* Tombol Sudah dikonsumsi */}
                        <button
                            onClick={() => handleConditionClick("dikonsumsi", "Sudah dikonsumsi")}
                            className={`
                                w-64 px-6 py-2.5 rounded-lg text-white font-medium
                                transition-all duration-200 transform hover:scale-105
                                bg-[#2e5b4e] hover:bg-[#1f4036]
                                flex items-center justify-center gap-2
                                ${selectedCondition === "dikonsumsi" ? 'ring-2 ring-offset-2 ring-[#2e5b4e] scale-105' : ''}
                            `}
                        >
                            <LuCheck size={20}/>
                            <span>Sudah dikonsumsi</span>
                        </button>

                        {/* Tombol Dibuang */}
                        <button
                            onClick={() => handleConditionClick("dibuang", "Dibuang")}
                            className={`
                                w-64 px-6 py-2.5 rounded-lg text-white font-medium
                                transition-all duration-200 transform hover:scale-105
                                bg-red-500 hover:bg-red-600
                                flex items-center justify-center gap-2
                                ${selectedCondition === "dibuang" ? 'ring-2 ring-offset-2 ring-red-500 scale-105' : ''}
                            `}
                        >
                            <LuTrash2 size={20}/>
                            <span>Dibuang</span>
                        </button>

                        {/* Tombol Ingatkan lagi */}
                        <button
                            onClick={() => handleConditionClick("ingatkan", "Ingatkan lagi")}
                            className={`
                                w-64 px-6 py-2.5 rounded-lg text-white font-medium
                                transition-all duration-200 transform hover:scale-105
                                bg-[#F59E0B] hover:bg-[#D97706]
                                flex items-center justify-center gap-2
                                ${selectedCondition === "ingatkan" ? 'ring-2 ring-offset-2 ring-[#F59E0B] scale-105' : ''}
                            `}
                        >
                            <LuClockAlert size={20}/>
                            <span>Ingatkan lagi</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;