import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComp from "./SidebarComp";

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarComp />
      
      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-0 transition-all duration-300">
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;