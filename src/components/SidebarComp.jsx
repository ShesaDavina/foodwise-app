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
    return activePage === page
      ? "bg-[#F59E0B] text-white"
      : "text-gray-300 hover:bg-[#F59E0B] hover:text-white";
  };

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
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
                "h-full bg-[#2F5D56] py-4 px-3 flex flex-col justify-between",
            },
            // BAGIAN INI UNTUK MENGUBAH WARNA ICON MENJADI PUTIH
            item: {
              icon: {
                base: "h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-white",
                active: "text-white",
              },
            },
          }}
        >
          {/* TOP */}
          <div>
            <div className="flex justify-center mb-4 mt-8 md:mt-0">
              <img src="/images/foodwise.png" alt="logo" className="h-10" />
            </div>

            <hr className="border-gray-500 mb-6" />

            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem
                  onClick={() => handleNavigation("/dashboard")}
                  icon={LuLayoutDashboard}
                  className={getItemClass("Dashboard")}
                >
                  Dashboard
                </SidebarItem>

                <SidebarItem
                  onClick={() => handleNavigation("/foods")}
                  icon={LuCirclePlus}
                  className={getItemClass("Tambah Makanan")}
                >
                  Tambah Makanan
                </SidebarItem>

                <SidebarItem
                  onClick={() => handleNavigation("/persentase")}
                  icon={LuChartNoAxesCombined}
                  className={getItemClass("Presentase Bulanan")}
                >
                  Presentase Bulanan
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </div>

          {/* BOTTOM (USER) */}
          <div>
            <hr className="border-gray-500 mb-4" />

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {/* Icon User sudah putih karena parent text-white */}
                <FaRegUserCircle size={20} />

                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {user?.name || "Loading..."}
                  </span>
                  <span className="text-xs text-gray-300">{user?.email}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-500 rounded-full"
              >
                {/* Icon Logout sudah putih karena parent text-white */}
                <LuLogOut size={18} />
              </button>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
}
