import { useState, useEffect } from "react";
import axios from 'axios';
import TableComp from "../components/TableComp";
import { LuCirclePlus } from "react-icons/lu";
import PaginationComp from "../components/PaginationComp";
import { useNavigate, useSearchParams } from "react-router-dom";

function SemuaData() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState(searchParams.get("filter") || "semua");
    const [foods, setFoods] = useState([]);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFoods();
    }, [activeFilter]);

    const fetchFoods = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/foods', {
                params: {
                    filter: activeFilter,
                    per_page: 10
                }
            });
            
            console.log('Foods response:', response.data);
            
            setFoods(response.data.data || []);
            setMeta(response.data.meta || {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
                from: 0,
                to: 0
            });
        } catch (error) {
            console.error('Error fetching foods:', error);
            console.error('Error response:', error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setSearchParams({ filter: filter });
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
            {meta.last_page > 1 && (
                <PaginationComp meta={meta} onPageChange={(page) => {
                    // Implementasi pagination nanti
                    console.log('Go to page:', page);
                }} />
            )}
        </div>
    );
}

export default SemuaData;