import React, { useState } from "react";
import video from "../../assets/video.mp4";
import pic from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import "./Register.scss";
import { Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [dob, setDob] = useState('');
  // const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [navigate, setNavigate] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async e => {
    let roleId = 2;
    e.preventDefault();
    console.log("submit");
    const response = await axios.post('http://localhost:8080/api/v1/auth/signup', {
      username, email, firstName, lastName, password, roleId
    });

    if (response.code === 200) {
      setNavigate(true);
    }
    else {
      setNavigate(false);
      setErrorMsg('Sign Up failed. Please try again');
    }
  }

  if (navigate) {
    return <Navigate to="/login" />
  }


  return (
    <div className="loginPage flex">
      <video src={video} autoPlay muted loop />
      <div className="container flex">
        <div className="imageDiv">
        <Link to="/" className="absolute left-5 top-4 btn bg-gray-200 p-2 rounded-md">
          Home
        </Link>
          <img src={pic} alt="Logo Image" />
        </div>
        <div className="formDiv">
          <div className="headerDiv">
            <h3>Create Account</h3>
            {errorMsg && <p class="text-red-600">{errorMsg}</p>}
          </div>
          <form action="" className="form grid" onSubmit={submit}>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input type="text" id="username" placeholder="Enter username"
                  onChange={e => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input type="email" id="email" placeholder="Enter email"
                  onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="firstName">First Name</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="lastName">Last Name</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="inputDiv">
              <label htmlFor="dob">Date of Birth</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input type="date" id="dob" 
                  onChange={e => setDob(e.target.value)}/>
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="gender">Gender</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <select id="gender" onChange={e => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div> */}
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={e => setPassword(e.target.value)}
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
              <Link to={"/login"}>Back</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
