import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarComp from "./SidebarComp";

function Layout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // kalau ga ada token → balik ke signup
    if (!token) {
      navigate("/signup");
      return;
    }

    // ambil data user dari backend
    fetch("http://127.0.0.1:8000/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          // token invalid → logout
          localStorage.removeItem("token");
          navigate("/signup");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarComp user={user} />
      
      {/* Main Content */}
      <div className="flex-1">
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;