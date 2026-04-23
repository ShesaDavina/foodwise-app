import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { LuCheck, LuTrash2, LuClockAlert } from "react-icons/lu";
import { useAlert } from "../contexts/AlertContext"; // ← IMPORT

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert(); // ← PAKAI HOOK

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) {
                setError('ID tidak valid');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`/foods/${id}`);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching detail:', err);
                setError('Gagal memuat data makanan');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id, navigate]);

    // Fungsi cek status kadaluarsa
    const isExpired = (tanggalKadaluarsa) => {
        if (!tanggalKadaluarsa || tanggalKadaluarsa === 'N/A') return false;
        const today = new Date();
        const expiredDate = new Date(tanggalKadaluarsa);
        today.setHours(0, 0, 0, 0);
        expiredDate.setHours(0, 0, 0, 0);
        return expiredDate < today;
    };

    // Fungsi cek H-3 kadaluarsa
    const isNearExpiry = (tanggalKadaluarsa) => {
        if (!tanggalKadaluarsa || tanggalKadaluarsa === 'N/A') return false;
        const today = new Date();
        const expiredDate = new Date(tanggalKadaluarsa);
        today.setHours(0, 0, 0, 0);
        expiredDate.setHours(0, 0, 0, 0);

        const diffTime = expiredDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays <= 3 && diffDays > 0;
    };

    const handleConsume = async () => {
        setActionLoading(true);
        try {
            await axios.patch(`/foods/${id}/consume`);
            showAlert('success', '✅ Makanan sudah dikonsumsi!');

            // Redirect setelah alert
            setTimeout(() => {
                navigate('/foods');
            }, 1000);
        } catch (err) {
            console.error('Error:', err);
            showAlert('error', '❌ Gagal mengupdate status. Silakan coba lagi.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDiscard = async () => {
        setActionLoading(true);
        try {
            await axios.patch(`/foods/${id}/discard`);
            showAlert('success', '🗑️ Makanan sudah dibuang!');

            setTimeout(() => {
                navigate('/foods');
            }, 1000);
        } catch (err) {
            console.error('Error:', err);
            showAlert('error', '❌ Gagal mengupdate status. Silakan coba lagi.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleRemind = async () => {
        setActionLoading(true);
        try {
            const response = await axios.post(`/foods/${id}/remind`);

            if (response.data.error) {
                showAlert('error', response.data.error);
            } else {
                showAlert('success', response.data.message);
                setData(response.data.data);

                if (response.data.next_reminder) {
                    showAlert('info', `⏰ Reminder berikutnya: ${response.data.next_reminder}`);
                }
            }
        } catch (err) {
            console.error('handleRemind error:', err);
            const errorMessage = err.response?.data?.error || '❌ Gagal mengirim pengingat. Silakan coba lagi.';
            showAlert('error', errorMessage);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full max-w-3xl mx-auto">
                <div className="md:my-6 mt-16 md:mt-6 mb-8">
                    <h1 className="text-2xl text-[#2e5b4e]" style={{ fontFamily: "'Bowlby One', cursive" }}>
                        Detail Makanan / Minuman
                    </h1>
                </div>
                <div className="text-center p-8">Loading...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="w-full max-w-3xl mx-auto">
                <div className="md:my-6 mt-16 md:mt-6 mb-8">
                    <h1 className="text-2xl text-[#2e5b4e]" style={{ fontFamily: "'Bowlby One', cursive" }}>
                        Detail Makanan / Minuman
                    </h1>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                    <p className="text-red-500">{error || 'Data tidak ditemukan'}</p>
                    <button
                        onClick={() => navigate('/foods')}
                        className="mt-4 text-[#2e5b4e] hover:underline"
                    >
                        ← Kembali ke Semua Data
                    </button>
                </div>
            </div>
        );
    }

    const expired = isExpired(data.kadaluarsa);
    const nearExpiry = isNearExpiry(data.kadaluarsa);

    let statusText = "Masih Aman";
    let statusColor = "bg-[#DBEAFE]";

    if (expired) {
        statusText = "Kadaluarsa";
        statusColor = "bg-[#FF9090]";
    } else if (nearExpiry) {
        statusText = "Hampir Kadaluarsa";
        statusColor = "bg-[#FECACA]";
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="md:my-6 mt-16 md:mt-6 mb-4">
                <button
                    onClick={() => navigate('/foods')}
                    className="text-[#2e5b4e] hover:text-[#1f4036] flex items-center gap-2 text-sm mb-2"
                >
                    ← Kembali ke Semua Data
                </button>
                <h1 className="text-2xl text-[#2e5b4e]" style={{ fontFamily: "'Bowlby One', cursive" }}>
                    Detail Makanan / Minuman
                </h1>
            </div>

            <div className="bg-white rounded-2xl bg-linear-to-b from-[#FFF1DF] shadow-md overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

                    <div className="my-8"></div>

                    <div className="mb-6 text-center">
                        <div className="text-base text-gray-700 font-semibold">
                            Bagaimana kondisi makanan ini sekarang?
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={handleConsume}
                            disabled={actionLoading}
                            className="w-64 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 bg-[#2e5b4e] hover:bg-[#1f4036] flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <LuCheck size={20} />
                            <span>{actionLoading ? 'Memproses...' : 'Sudah dikonsumsi'}</span>
                        </button>

                        <button
                            onClick={handleDiscard}
                            disabled={actionLoading}
                            className="w-64 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <LuTrash2 size={20} />
                            <span>{actionLoading ? 'Memproses...' : 'Dibuang'}</span>
                        </button>

                        <button
                            onClick={handleRemind}
                            disabled={actionLoading}
                            className="w-64 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 bg-[#F59E0B] hover:bg-[#D97706] flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <LuClockAlert size={20} />
                            <span>{actionLoading ? 'Memproses...' : 'Ingatkan lagi'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;