import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import WasteChartComp from "../components/dashboard/WasteChartComp";

function Presentase() {
    const [chartData, setChartData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
        pcs: [0, 0, 0, 0, 0, 0],
        kg: [0, 0, 0, 0, 0, 0]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState({
        totalPcs: 0,
        totalKg: 0,
        averagePcs: 0,
        averageKg: 0
    });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/dashboard/chart');
                console.log('Chart data:', response.data);

                if (response.data && response.data.labels) {
                    setChartData(response.data);

                    // Hitung summary
                    const totalPcs = response.data.pcs.reduce((a, b) => a + b, 0);
                    const totalKg = response.data.kg.reduce((a, b) => a + b, 0);
                    const averagePcs = Math.round(totalPcs / response.data.pcs.length);
                    const averageKg = Math.round(totalKg / response.data.kg.length);

                    setSummary({ totalPcs, totalKg, averagePcs, averageKg });
                }
            } catch (err) {
                console.error('Error fetching chart:', err);
                setError('Gagal memuat data chart');
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) {
        return (
            <div className="w-full p-6">
                <div className="md:my-6 mb-4 mt-16 md:mt-6">
                    <h1
                        className="text-2xl text-[#2e5b4e]"
                        style={{ fontFamily: "'Bowlby One', cursive" }}
                    >
                        Presentase Makanan Terbuang
                    </h1>
                </div>
                <div className="text-center p-8">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-6">
                <div className="md:my-6 mb-4 mt-16 md:mt-6">
                    <h1
                        className="text-2xl text-[#2e5b4e]"
                        style={{ fontFamily: "'Bowlby One', cursive" }}
                    >
                        Presentase Makanan Terbuang
                    </h1>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 text-[#2e5b4e] hover:underline"
                    >
                        Coba lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="md:my-6 mb-4 mt-16 md:mt-6">
                    <h1
                        className="text-2xl text-[#2e5b4e]"
                        style={{ fontFamily: "'Bowlby One', cursive" }}
                    >
                        Presentase Makanan Terbuang
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Statistik makanan yang terbuang per bulan (pcs dan kg)
                    </p>
                </div>

                {/* Chart */}
                <div className="mb-8">
                    <WasteChartComp chartData={chartData} />
                </div>

                {/* Info tambahan */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-lg font-semibold text-[#2e5b4e] mb-4" style={{ fontFamily: "'Bowlby One', cursive" }}>
                        📊 Interpretasi Data
                    </h2>
                    <div className="space-y-3 text-gray-600 text-sm">
                        <p>• <span className="font-medium text-[#F59E0B]">Grafik oranye</span> menunjukkan jumlah makanan yang terbuang dalam satuan <strong>pcs</strong>.</p>
                        <p>• <span className="font-medium text-[#2F5D56]">Grafik hijau</span> menunjukkan jumlah makanan yang terbuang dalam satuan <strong>kg</strong>.</p>
                        <p>• Data dihitung berdasarkan makanan dengan status <strong>"dibuang"</strong>.</p>
                        <p>• Total terbuang: <strong>{summary.totalPcs} pcs</strong> dan <strong>{summary.totalKg} kg</strong> dari seluruh data.</p>
                        {summary.totalPcs === 0 && summary.totalKg === 0 && (
                            <p className="text-blue-500">✨ Belum ada makanan yang terbuang. Pertahankan!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Presentase;