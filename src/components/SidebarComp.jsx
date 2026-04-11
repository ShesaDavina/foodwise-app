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
import logofw from "../assets/logofw.png";

export default function SidebarComp() {
  const [isOpen, setIsOpen] = useState(false);
  const activePage = "Dashboard"; 
  const getItemClass = (name) => {
    const isActive = activePage === name;
    return `rounded-lg mb-2 text-white font-semibold transition-all duration-200 
      ${isActive 
        ? "bg-[#F59E0B] hover:bg-[#D97706]" 
        : "hover:bg-[#F59E0B] bg-transparent"
      }`;
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
        fixed md:static inset-y-0 left-0 z-40
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        h-screen w-64
      `}>
        <Sidebar
          theme={{
            root: {
              inner: "h-full overflow-y-auto overflow-x-hidden bg-[#2F5D56] py-4 px-3 flex flex-col justify-between shadow-xl md:shadow-none",
            },
          }}
          className="w-57"
        >
          <div>
            <div className="flex items-center justify-center px-2 mb-4 mt-8 md:mt-0">
              <img src={logofw} className="h-10 object-contain w-auto" alt="FoodWise Logo" />
            </div>

            <hr className="border-gray-500 mb-6" />

            <SidebarItems>
              <SidebarItemGroup className="border-none">
                <SidebarItem
                  href="#"
                  icon={() => <LuLayoutDashboard className="text-xl text-inherit" />}
                  className={getItemClass("Dashboard")}
                >
                  Dashboard
                </SidebarItem>

                <SidebarItem
                  href="#"
                  icon={() => <LuCirclePlus className="text-xl text-inherit" />}
                  className={getItemClass("Tambah Makanan")}
                >
                  Tambah Makanan
                </SidebarItem>

                <SidebarItem
                  href="#"
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