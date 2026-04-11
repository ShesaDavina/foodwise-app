import { useState } from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  LuChartNoAxesCombined,
  LuCirclePlus,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarComp() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Tentukan halaman aktif berdasarkan path URL
  const getActivePage = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "Dashboard";
    if (path === "/foods" || path === "/foods/add" || path === "/foods/add") return "Tambah Makanan";
    if (path === "/persentase") return "Presentase Bulanan";
    return "Dashboard";
  };

  const activePage = getActivePage();
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Tutup sidebar setelah navigasi
  };

  const getItemClass = (page) => {
    return activePage === page
      ? "bg-[#2F5D56] text-white scale-110 shadow-md"
      : "text-gray-300 hover:bg-[#2F5D56] hover:text-white";
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-[#2F5D56] text-white rounded-md shadow-lg"
      >
        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`
        fixed md:sticky inset-y-0 left-0 z-40
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        h-screen w-64 top-0
      `}>
        <Sidebar
          theme={{
            root: {
              inner: "h-full overflow-y-auto overflow-x-hidden bg-[#2F5D56]! py-4 px-3 flex flex-col justify-between shadow-xl md:shadow-none",
            },
          }}
          className="w-57"
        >
          <div>
            <div className="flex items-center justify-center px-2 mb-4 mt-8 md:mt-0">
              <img src="/images/foodwise.png"
                alt="FoodWise Logo" className="h-10 object-contain w-auto" />
            </div>

            <hr className="border-gray-500 mb-6" />

            <SidebarItems>
              <SidebarItemGroup className="border-none">
                <SidebarItem
                  onClick={() => handleNavigation("/")}
                  icon={() => <LuLayoutDashboard className="text-xl text-inherit" />}
                  className={getItemClass("Dashboard")}
                >
                  Dashboard
                </SidebarItem>

                <SidebarItem
                  onClick={() => handleNavigation("/foods")}
                  icon={() => <LuCirclePlus className="text-xl text-inherit" />}
                  className={getItemClass("Tambah Makanan")}
                >
                  Tambah Makanan
                </SidebarItem>

                <SidebarItem
                  onClick={() => handleNavigation("/persentase")}
                  icon={() => <LuChartNoAxesCombined className="text-xl text-inherit" />}
                  className={getItemClass("Presentase Bulanan")}
                >
                  Presentase Bulanan
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </div>
          <div className="mt-auto">
            <hr className="border-gray-500 mb-4" />
            <div className="flex items-center justify-between px-2 text-white pb-4">
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-full border border-gray-400">
                  <FaRegUserCircle size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold truncate w-24">Zhao Yu Fan</span>
                </div>
              </div>
              <button
                title="Logout"
                className="p-2 hover:bg-red-500 rounded-full transition-colors group"
              >
                <LuLogOut size={20} className="group-hover:scale-110" />
              </button>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
}