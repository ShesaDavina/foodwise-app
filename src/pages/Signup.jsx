import { Link } from "react-router-dom";

function Signup() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FDE68A] via-white to-[#2F5D56] p-4 md:p-10">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden min-h-[550px]">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div className="max-w-md mx-auto w-full flex-grow flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2e5b4e] mb-4 text-left">
              Masuk atau daftar dalam sekejap
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-8 text-left leading-relaxed">
              Gunakan akun Google-mu untuk mengakses seluruh fitur <span className="font-bold text-[#2e5b4e]">FoodWise</span> secara gratis.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-4 p-4 w-full rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm active:scale-[0.98]"
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
          <div className="max-w-md mx-auto w-full mt-8 pt-3 border-t border-gray-100">
            <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed">
              Kami hanya mengakses data yang diperlukan untuk pengelolaan akun Anda. Dengan melanjutkan, Anda menyetujui{" "}
              <Link to="/terms" className="text-[#2e5b4e] font-bold hover:underline">
                Persyaratan Penggunaan
              </Link>{" "}
              dan{" "}
              <Link to="/privacy" className="text-[#2e5b4e] font-bold hover:underline">
                Kebijakan Privasi
              </Link> FoodWise.
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/register.avif"
            alt="Food Freshness"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

      </div>
    </div>
  );
}

export default Signup;