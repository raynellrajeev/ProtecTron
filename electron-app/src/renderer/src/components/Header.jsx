import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import Dropdown from './Dropdown';
export default function Header() { 
    return (
        <>
            <header className='fixed w-full h-auto flex justify-between p-3 items-center'>
                <Link to='/Home'>
                    <div className="logo-container-header w-32  ml-3">
                        <img className="logo-image hover:box-shadow-[0_0_15px_rgba(255,255,255,0.8)]" src={Logo} alt="ProtecTron" />
                    </div>
                </Link>
                
                <div className="w-auto h-8 flex flex-row gap-8 bg-white/10 rounded-[20px] justify-center items-center">
                    
                    <NavLink 
                    to='/Home' 
                    className={({ isActive }) => 
                        `px-5 text-sm ${isActive ? 'text-white' : 'text-neutral-500'}`
                    }
                    >
                    Home
                    </NavLink>    
                    <NavLink 
                    to='/Scan' 
                    className={({ isActive }) => 
                        `px-5 text-sm ${isActive ? 'text-white' : 'text-neutral-500'}`
                    }
                    >
                    Scan
                    </NavLink>    
                    <NavLink 
                    to='/Quiz' 
                    className={({ isActive }) => 
                        `px-5 text-sm ${isActive ? 'text-white' : 'text-neutral-500'}`
                    }
                    >
                    Quiz
                    </NavLink>    
                    <NavLink 
                    to='/Settings' 
                    className={({ isActive }) => 
                        `px-5 text-sm ${isActive ? 'text-white' : 'text-neutral-500'}`
                    }
                    >
                    Settings
                    </NavLink>    
                </div>   

                <Dropdown />
            </header>
        </>
    )
}