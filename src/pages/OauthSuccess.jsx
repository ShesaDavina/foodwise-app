import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OauthSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("FULL URL:", window.location.href);
    console.log("TOKEN DARI URL:", token);

    if (token) {
      localStorage.setItem("token", token);
      console.log("TOKEN DISIMPAN KE LOCALSTORAGE");
      navigate("/dashboard", { replace: true });
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      const token = localStorage.getItem("token");
      console.log("TOKEN DI LOCALSTORAGE:", token);

      if (!token) {
        console.log("TOKEN GA ADA → REDIRECT SIGNUP");
        navigate("/signup", { replace: true });
      }
    }
  }, [loading]);
  return <p>Loading...</p>;
}

export default OauthSuccess;
