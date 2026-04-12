import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OauthSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    // Langsung pindah, jangan tunggu state loading
    navigate("/guide", { replace: true });
  } else {
    // Jika tidak ada token di URL, baru cek localStorage
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      navigate("/signup", { replace: true });
    } else {
      navigate("/guide", { replace: true });
    }
  }
  setLoading(false);
}, [navigate]);
}

export default OauthSuccess;
