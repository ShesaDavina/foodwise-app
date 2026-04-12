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

export default function SidebarComp({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getActivePage = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "Dashboard";
    if (path === "/foods" || path === "/foods/add") return "Tambah Makanan";
    if (path === "/persentase") return "Presentase Bulanan";
    return "Dashboard";
  };

  const activePage = getActivePage();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const getItemClass = (page) => {
    const isActive = activePage === page;
    return `rounded-lg mb-2 font-semibold transition-all duration-200 cursor-pointer
      ${isActive
        ? "bg-[#F59E0B] text-white"
        : "text-white hover:bg-[#F59E0B] hover:text-white"
      }`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <>
      {/* Button Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-[#2F5D56] text-white rounded-md"
      >
        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:sticky inset-y-0 left-0 z-40
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300
        h-screen w-64`}
      >
        <Sidebar
          theme={{
            root: {
              inner:
                "h-full bg-[#2F5D56]! py-4 px-3 flex flex-col justify-between",
            },
          }}
        >
          {/* TOP */}
          <div>
            <div className="flex justify-center mb-4 mt-8 md:mt-0">
              <img
                src="/images/foodwise.png"
                alt="logo"
                className="h-10"
              />
            </div>

            <hr className="border-gray-500 mb-6" />

            <SidebarItems>
              <SidebarItemGroup>
                {/* Dashboard */}
                <div
                  onClick={() => handleNavigation("/dashboard")}
                  className={`flex items-center gap-3 px-3 py-2 ${getItemClass("Dashboard")}`}
                >
                  <LuLayoutDashboard className="h-5 w-5 text-white" />
                  <span className="text-sm">Dashboard</span>
                </div>

                {/* Tambah Makanan */}
                <div
                  onClick={() => handleNavigation("/foods")}
                  className={`flex items-center gap-3 px-3 py-2 ${getItemClass("Tambah Makanan")}`}
                >
                  <LuCirclePlus className="h-5 w-5 text-white" />
                  <span className="text-sm">Tambah Makanan</span>
                </div>

                {/* Presentase Bulanan */}
                <div
                  onClick={() => handleNavigation("/persentase")}
                  className={`flex items-center gap-3 px-3 py-2 ${getItemClass("Presentase Bulanan")}`}
                >
                  <LuChartNoAxesCombined className="h-5 w-5 text-white" />
                  <span className="text-sm">Presentase Bulanan</span>
                </div>
              </SidebarItemGroup>
            </SidebarItems>
          </div>

          {/* BOTTOM (USER) */}
          <div>
            <hr className="border-gray-500 mb-4" />

            <div className="flex items-center justify-between text-white gap-2">
              {/* User Info - dengan limit lebar */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FaRegUserCircle size={20} className="flex-shrink-0 text-white" />

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold truncate">
                    {user?.name || "Loading..."}
                  </span>
                  <span className="text-xs text-gray-300 truncate">
                    {user?.email}
                  </span>
                </div>
              </div>

              {/* Logout Button - tetap di kanan */}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-500 rounded-full transition-colors flex-shrink-0"
                title="Logout"
              >
                <LuLogOut size={18} className="text-white" />
              </button>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
}