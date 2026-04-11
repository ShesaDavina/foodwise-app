import logofw from "../assets/logofw.png";

export default function NavComp() {
  return (
    <nav className="bg-[#2F5D56] px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={logofw} alt="Foodwise Logo" className="h-10 object-contain" />
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-white font-bold text-sm hover:text-[#F59E0B] transition-colors duration-200">
            Beranda
          </a>
          <a href="#" className="text-white font-bold text-sm hover:text-[#F59E0B] transition-colors duration-200">
            Tentang
          </a>
          <a href="#" className="text-white font-bold text-sm hover:text-[#F59E0B] transition-colors duration-200">
            Panduan
          </a>
        </div>

        {/* Bagian Kanan: Tombol Sign In & Sign Up */}
        <div className="flex items-center space-x-8">
          <a href="#" className="text-white font-bold text-sm hover:text-[#F59E0B] transition-colors duration-200">
            Sign In
          </a>
          <a 
            href="#" 
            className="bg-[#F59E0B] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#D97706] transition-all duration-200 shadow-md"
          >
            Sign Up
          </a>
        </div>

      </div>
    </nav>
  );
}