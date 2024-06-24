import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import GoogleButton from "react-google-button";
import video from "../../assets/video.mp4";
import pic from "../../assets/login.png";
import "../../App.css";
import axiosClient from "../../services/config/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const googleLogin = async () => {
    window.location.href =
      "https://badmintonbookingserver.up.railway.app/oauth2/authorization/google";
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post(
        "/v1/auth/signin",
        { username, password },
        { withCredentials: true }
      );
      axiosClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.token}`;
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refresh_token);
    } catch (error) {
      setError("Login failed");
      console.error("Login failed", error);
    }
  };

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
            {error && <span>{error}</span>}
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
          <div className="pt-4 text-center font-semibold">
            Or
            <GoogleButton onClick={() => googleLogin()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
