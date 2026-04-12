import { Link, useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

function Signup() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Arahkan ke backend Laravel untuk proses OAuth
    window.location.href = "http://127.0.0.1:8000/auth/google";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FDE68A] via-white to-[#2F5D56] p-4 md:p-10 relative overflow-hidden">
      
      {/* Container Utama */}
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden min-h-[550px] z-10">
        
        {/* Sisi Kiri: Form/Login */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
          <div className="max-w-md mx-auto w-full flex-grow flex flex-col justify-center">
            <div className="mb-8">
               <h1 className="text-3xl md:text-4xl font-black text-[#2F5D56] mb-4 text-left leading-tight">
                Masuk atau daftar dalam sekejap
              </h1>
              <p className="text-gray-600 text-sm md:text-base text-left leading-relaxed">
                Gunakan akun Google-mu untuk mengakses seluruh fitur <span className="font-bold text-[#2F5D56]">FoodWise</span> secara gratis.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-4 p-4 w-full rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all font-bold text-gray-700 shadow-sm active:scale-[0.98] hover:shadow-md"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-6"
                  alt="Google"
                />
                Continue with Google
              </button>
            </div>
          </div>

          {/* Footer Card */}
          <div className="max-w-md mx-auto w-full mt-8 pt-6 border-t border-gray-100">
             <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed italic">
                Kami hanya mengakses data yang diperlukan untuk pengelolaan akun Anda. Dengan melanjutkan, Anda menyetujui{" "}
                <Link to="/terms" className="text-[#2F5D56] font-bold hover:underline">
                  Persyaratan Penggunaan
                </Link>{" "}
                dan{" "}
                <Link to="/privacy" className="text-[#2F5D56] font-bold hover:underline">
                  Kebijakan Privasi
                </Link> FoodWise.
              </p>
          </div>
        </div>

        {/* Sisi Kanan: Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img 
            src="/register.avif" 
            alt="Food Freshness"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay agar gambar lebih menyatu dengan tema */}
          <div className="absolute inset-0 bg-[#2F5D56]/10 mix-blend-multiply"></div>
        </div>
      </div>

      {/* Dekorasi Tambahan untuk BG */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-[#FDE68A]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#2F5D56]/20 rounded-full blur-3xl"></div>
    </div>
  );
}

export default Signup;