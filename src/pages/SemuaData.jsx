import { useState, useEffect } from "react";
import axios from "../utils/axios";
import TableComp from "../components/TableComp";
import { LuCirclePlus } from "react-icons/lu";
import PaginationComp from "../components/PaginationComp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";

function SemuaData() {
    const { showAlert } = useAlert();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState(searchParams.get("filter") || "semua");
    const [currentPage, setCurrentPage] = useState(1);
    const [foods, setFoods] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Handle filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset ke halaman 1
        setSearchParams({ filter: filter });
    };

    // Sync filter dengan URL params
    useEffect(() => {
        const filter = searchParams.get("filter");
        if (filter && filter !== activeFilter) {
            setActiveFilter(filter);
            setCurrentPage(1);
        }
    }, [searchParams]);

    // Fetch foods ketika filter atau halaman berubah
    useEffect(() => {
        fetchFoods();
    }, [activeFilter, currentPage]);

    const fetchFoods = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/foods', {
                params: {
                    filter: activeFilter,
                    per_page: 10,
                    page: currentPage
                }
            });
            console.log('Response meta:', response.data.meta);
            setFoods(response.data.data || []);
            setMeta(response.data.meta || {});
        } catch (error) {
            console.error('Error fetching foods:', error);
            if (error.response?.status === 401) {
                navigate('/signup');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        console.log('Page changed to:', page); // Debug
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showAddButton = activeFilter === "semua";

    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) {
        return (
            <div className="w-full">
                <div className="md:my-6 mb-4 mt-16 md:mt-6">
                    <h1 className="text-2xl text-[#2e5b4e]" style={{ fontFamily: "'Bowlby One', cursive" }}>
                        Data Makanan / Minuman
                    </h1>
                </div>
                <div className="text-center p-8">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header */}
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
                    onClick={() => handleFilterChange("semua")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${activeFilter === "semua"
                        ? "text-[#2e5b4e] border-b-2 border-[#2e5b4e]"
                        : "text-gray-500 hover:text-[#2e5b4e]"
                        }`}
                >
                    Semua
                </button>
                <button
                    onClick={() => handleFilterChange("hampir_kadaluarsa")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${activeFilter === "hampir_kadaluarsa"
                        ? "text-[#2e5b4e] border-b-2 border-[#2e5b4e]"
                        : "text-gray-500 hover:text-[#2e5b4e]"
                        }`}
                >
                    Hampir Kadaluarsa
                </button>
            </div>

            {/* Tombol Tambah Makanan */}
            {showAddButton && (
                <button
                    onClick={() => handleNavigation("/foods/add")}
                    className="cursor-pointer text-[#F59E0B] hover:text-[#f3bc5e] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors my-6 ml-auto"
                >
                    <LuCirclePlus size={23} />
                    Tambah Data
                </button>
            )}

            {/* Table */}
            {foods.length > 0 ? (
                <TableComp data={foods} />
            ) : (
                <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                    <p className="text-gray-500">Tidak ada data makanan</p>
                </div>
            )}

            {/* Info jumlah data */}
            <div className="mt-4 text-sm text-gray-500">
                Menampilkan {meta.from || 0} - {meta.to || 0} dari {meta.total || 0} data
            </div>

            {/* Pagination */}
            {meta.total > 10 && (
                <PaginationComp
                    totalPosts={meta.total || 0}
                    postsPerPage={10}
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange}
                />
            )}
        </div>
    );
}

export default SemuaData;