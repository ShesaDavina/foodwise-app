import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarComp from "./SidebarComp";
import AlertComp from "./AlertComp";
import { useAlert } from "../contexts/AlertContext";
import axios from "../utils/axios"; // ← PAKAI AXIOS INSTANCE

function Layout() {
  const { alert, hideAlert } = useAlert();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
      return;
    }

    // PAKAI AXIOS INSTANCE (lebih clean)
    axios.get('/me')
      .then((response) => {
        console.log("DATA USER DARI BACKEND:", response.data);
        setUser(response.data);
      })
      .catch((err) => {
        console.log("Error fetching user:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signup");
        }
      });
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarComp user={user} /> {/* ← kirim user ke Sidebar */}

      <div className="flex-1 overflow-x-auto">
        <div className="p-4 md:p-6">
          <AlertComp alert={alert} onDismiss={hideAlert} />
          <Outlet context={{ user }} /> {/* ← kirim user ke child components via context */}
        </div>
      </div>
    </div>
  );
}

export default Layout;