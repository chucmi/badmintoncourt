import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../../services/config/axios"; // Ensure the correct path
import video from "../../assets/video.mp4";
import pic from "../../assets/login.png";
import "../../App.css";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [role, setRole] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosClient.post("/v1/auth/signin", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refresh_token);

      const userRole = JSON.parse(atob(data.token.split(".")[1])).role;
      setRole(userRole);

      axiosClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.token}`;

      setNavigate(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (navigate) {
    if (role === "ROLE_ADMIN") {
      return <Navigate to="/host" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="loginPage flex">
      <video src={video} autoPlay muted loop />
      <div className="container flex">
        <div className="imageDiv">
          <img src={pic} alt="Logo Image" />
        </div>
        <div className="formDiv">
          <div className="headerDiv">
            <h3>Welcome Back!</h3>
          </div>
          <form onSubmit={submit} className="form grid">
            <span>Login Status will go here</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <span className="forgotPassword">
              Forgot your password <a href="">Click Here</a>
            </span>
          </form>
          <div className="footerDiv">
            <span className="text">Don't have an account?</span>
            <Link to="/register" className="signUpLink">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
