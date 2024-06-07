import React from 'react';
import video from "../../assets/video.mp4";
import pic from "../../assets/login.png";
import "../../App.css";
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();

        const {data} = await axios.post('/v1/auth/signin', {
            username, password
        }, {withCredentials: true});

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/"/>;
    }


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
                    <form onSubmit={submit} className='form grid'>
                        <span>Login Status will go here</span>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input onChange={e => setUsername(e.target.value)} type="text" id='username' placeholder='Enter username' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input onChange={e => setPassword(e.target.value)} type="password" id='password' placeholder='Enter password' />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                        <span className='forgotPassword'>
                            Forgot your password <a href=''>Click Here</a>
                        </span>
                    </form>
                    <div className='footerDiv'>
                        <span className='text'>Don't have an account?</span>
                        <Link to={'/register'} className='signUpLink'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
