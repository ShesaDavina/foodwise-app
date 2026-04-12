import React from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

export default function Guide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white md:bg-gradient-to-br md:from-[#FDE68A] md:via-white md:to-[#2F5D56] p-4 md:p-10 font-sans relative overflow-hidden">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-none p-6 md:p-12 z-10 relative">
        {/* Judul & Deskripsi di Atas */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#2F5D56] mb-3 tracking-tight">
            FoodWise Guide
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Petunjuk penggunaan FoodWise untuk membantu Anda mengelola stok
            makanan dan memantau masa kadaluarsa secara efisien.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {[
            {
              no: "01",
              title: "Integrasi Kalender",
              desc: "Integrasi dengan Google Calendar untuk jadwal pengingat otomatis.",
              link: "/dashboard",
              color: "bg-blue-500",
            },
            {
              no: "02",
              title: "Input List Makanan",
              desc: "Isi form tambah makanan untuk mencatat stok dan tanggal kadaluarsa.",
              link: "/foods",
              color: "bg-emerald-500",
            },
            {
              no: "03",
              title: "Sistem Reminder",
              desc: "Dapatkan reminder 3 hari sebelum makanan memasuki masa kadaluarsa.",
              link: "/dashboard",
              color: "bg-orange-500",
            },
            {
              no: "04",
              title: "Konfirmasi Status",
              desc: "Konfirmasi status makanan secara berkala untuk memperbarui data stok.",
              link: "/dashboard",
              color: "bg-purple-500",
            },
          ].map((step, index) => (
            <div
              key={index}
              onClick={() => navigate(step.link)}
              className="group cursor-pointer relative p-5 md:p-6 rounded-3xl border border-gray-100 bg-white hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[130px] md:min-h-[140px]"
            >
              <span className="absolute top-3 right-6 text-4xl md:text-5xl font-black text-gray-50 group-hover:text-[#F59E0B]/10 transition-colors duration-300 pointer-events-none">
                {step.no}
              </span>

              <div
                className={`w-10 h-1.5 ${step.color} rounded-full mb-4 transition-all duration-300 group-hover:w-16`}
              ></div>

              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-extrabold text-[#2F5D56] mb-2 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed pr-6">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-[#F59E0B] text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-[#2F5D56] transition-all duration-300 group hover:scale-110 active:scale-95 z-20"
        >
          <LuArrowRight
            size={22}
            className="group-hover:translate-x-1 md:w-6 md:h-6 transition-transform"
          />
        </button>
      </div>
      <div className="hidden md:block absolute top-[-10%] left-[-5%] w-72 h-72 bg-[#FDE68A]/30 rounded-full blur-3xl opacity-50"></div>
      <div className="hidden md:block absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-[#2F5D56]/20 rounded-full blur-3xl opacity-50"></div>
    </div>
  );
}
