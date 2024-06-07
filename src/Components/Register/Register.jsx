import React from 'react';
import video from "../../assets/video.mp4";
import pic from "../../assets/login.png";
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import "./Register.scss"
import { Button } from '@mui/material';

const Login = () => {
    return (
        <div className='loginPage flex'>
            <video src={video} autoPlay muted loop />
            <div className='container flex'>
                <div className='imageDiv'>
                    <img src={pic} alt='Logo Image' />
                </div>
                <div className='formDiv'>
                    <div className='headerDiv'>
                        <h3>Welcome Back!</h3>
                    </div>
                    <form action="" className='form grid'>
                        <span>Login Status will go here</span>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id='username' placeholder='Enter username' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="email" id='email' placeholder='Enter email' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="firstName">First Name</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id='firstName' placeholder='Enter first name' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="lastName">Last Name</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id='lastName' placeholder='Enter last name' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="dob">Date of Birth</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="date" id='dob' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="gender">Gender</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <select id='gender'>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="password" id='password' placeholder='Enter password' />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                    </form>
                    <div className='footerDiv'>
                        <Button>
                        <Link to={'/login'} >
                            Back
                        </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
