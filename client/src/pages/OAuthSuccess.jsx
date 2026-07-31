import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/authService";

function OAuthSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    const loginSuccess = async () => {

      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      localStorage.setItem("token", token);

      try {

        const response = await getProfile();

        localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );

      } catch (error) {
        console.error(error);
      }

      navigate("/dashboard");
    };

    loginSuccess();

  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h3>Logging you in...</h3>
    </div>
  );
}

export default OAuthSuccess;