import React, { useState } from "react";
import video from "../../assets/video.mp4";
import pic from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import "./Register.scss";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [dob, setDob] = useState('');
  // const [gender, setGender] = useState('');
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectRole, setSelectRole] = useState(2);

  const submit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "https://badmintonbookingserver.up.railway.app/api/v1/auth/signup",
      {
        username,
        email,
        firstName,
        lastName,
        password,
        role_id: parseInt(selectRole),
      }
    );

    if (response.data.data !== null) {
      setNavigate(true);
    } else {
      setNavigate(false);
      setErrorMsg("Thông tin đã tồn tại trên hệ thống! Vui lòng thử lại!");
      notification.error({
        message: "Đăng ký thất bại",
        description: "Đăng ký không thành công. Vui lòng thử lại!",
      });
    }
  };

  if (navigate) {
    return <Navigate to="/login" />;
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
            <h3>Tạo tài khoản</h3>
            {errorMsg && <p class="text-red-600">{errorMsg}</p>}
          </div>
          <form action="" className="form grid" onSubmit={submit}>
            <div className="inputDiv">
              <label htmlFor="username">Tên đăng nhập</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Điền tên đăng nhập"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Điền email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="firstName">Họ</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="firstName"
                  placeholder="Điền họ"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="lastName">Tên</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Điền tên"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Điền mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Vai trò</label>
              <div className="input flex">
                <p>Người đến đặt sân</p>
                <input
                  type="radio"
                  id="role_user"
                  name="role"
                  value={2}
                  defaultChecked
                  onChange={(e) => setSelectRole(e.target.value)}
                />
                <p>Người cho thuê sân</p>
                <input
                  type="radio"
                  id="role_owner"
                  name="role"
                  value={4}
                  onChange={(e) => setSelectRole(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn flex">
              <span>Register</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
          <div className="footerDiv">
            <Button>
              <Link to={"/login"}>Trở về</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
