import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");

        if (token) {

            localStorage.setItem("token", token);

            navigate("/dashboard");

        } else {

            navigate("/login");

        }

    }, [navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h3>Logging you in...</h3>
        </div>
    );
}

export default OAuthSuccess;