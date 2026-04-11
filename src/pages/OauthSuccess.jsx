import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OauthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/Dashboard"); // atau dashboard
    } else {
      navigate("/signup");
    }
  }, []);

  return <p>Loading...</p>;
}

export default OauthSuccess;