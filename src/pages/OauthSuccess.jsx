import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OauthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("FULL URL:", window.location.href);
    console.log("TOKEN DARI URL:", token);

    if (token) {
      // Simpan token ke localStorage
      localStorage.setItem("token", token);
      console.log("TOKEN DISIMPAN KE LOCALSTORAGE");

      // Redirect ke halaman GUIDE (bukan langsung dashboard)
      navigate("/guide", { replace: true });
    } else {
      // Jika tidak ada token di URL, cek localStorage
      const existingToken = localStorage.getItem("token");
      console.log("TOKEN DI LOCALSTORAGE:", existingToken);

      if (!existingToken) {
        console.log("TOKEN GA ADA → REDIRECT SIGNUP");
        navigate("/signup", { replace: true });
      } else {
        // Jika ada token di localStorage, langsung ke guide
        console.log("TOKEN ADA → REDIRECT GUIDE");
        navigate("/guide", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e5b4e] mx-auto mb-4"></div>
        <p className="text-gray-600">Memproses login...</p>
      </div>
    </div>
  );
}

export default OauthSuccess;