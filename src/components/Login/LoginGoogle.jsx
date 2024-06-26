import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      window.location.href = "/";
      // Redirect to the home page or another protected route
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default LoginSuccess;
