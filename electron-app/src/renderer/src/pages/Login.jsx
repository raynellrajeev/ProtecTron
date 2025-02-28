import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import Logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';


function Login(props) {
    const [isUser, setIsUser] = useState(true);
    function HandleClick() {
        setIsUser(!isUser);
    }

    return (
        <section className='flex flex-col justify-center items-center h-screen'>
            <Link to='/Welcome'>
                <div className="flex justify-center mb-6">
                    <img className="logo-image w-[35vh] transition-filter duration-500 ease-out hover:filter hover:drop-shadow-[0_0_0.7rem_rgba(255,255,255,0.5)]" src={Logo} alt="ProtecTron" />
                </div>  
            </Link> 
            <div className="bg-[rgba(48,48,48,0.3)] border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] w-[420px] text-white rounded-[10px] p-[30px_40px]">
                <form action="" onSubmit={props.submit}>
                <h3 className="text-3xl text-center mb-6">Login</h3>
                <div className="relative w-full h-[50px] my-[30px]">
                    <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    className="w-full h-full bg-transparent border-none outline-none rounded-[40px] text-base text-white px-[20px] py-[20px] pr-[45px] placeholder-white/50 focus:border-0 focus:border-[rgba(255,255,255,0.2)] focus:outline-white/20"
                    />
                    <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base" />
                </div>
                <div className="relative w-full h-[50px] my-[30px]">
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full h-full bg-transparent border-none outline-none rounded-[40px] text-base text-white px-[20px] py-[20px] pr-[45px] placeholder-white/50 focus:border-0 focus:border-[rgba(255,255,255,0.2)] focus:outline-white/20"
                    />
                    <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base" />
                </div>
                <div className="flex justify-between text-[14.5px] -mt-[15px] mb-[15px]">
                    <label className="flex items-center">
                    <input type="checkbox" name="remember" className="mr-1 accent-white" />
                    Remember me
                    </label>
                    <a href="#" className="text-white no-underline hover:underline">
                    Forgot Password?
                    </a>
                </div>
                <Link to="/Home">
                    <button
                    onClick={HandleClick}
                    className="w-full h-[45px] bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-base font-bold cursor-pointer  hover:scale-105 transition-all duration-300"
                    type="submit"
                    >
                    Login
                    </button>
                </Link>
                <div className="text-base text-center mt-5 mb-[15px]">
                    <p>
                    Don't have an account?{" "}
                    <Link to="/Register" className="text-white no-underline font-semibold hover:underline">
                        Register
                    </Link>
                    </p>
                </div>
                </form>
            </div>
        </section>
    )
}
export default Login;