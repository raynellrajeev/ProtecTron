import React from 'react';
import { TextGenerateEffect } from '../assets/typewriter-effect';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';

const words = `Intelligent AI, unstoppable defense.`;
 
export function TextGenerateEffectDemo() {
    return (
        <>
            <TextGenerateEffect c duration='1' words={words} />
        </>
  );
}
export default function Welcome() {
    return (
        <>
            <div className="logo-container flex flex-col justify-center h-screen items-center">
                <img className="logo-image w-1/3 h-auto hover:box-shadow-[0_0_15px_rgba(255,255,255,0.8)]" src={Logo} alt="ProtecTron" />
                <p className='text-white/60 ml-3'>{ TextGenerateEffectDemo()}</p>
                <div class="mt-8 flex text-center items-center justify-center gap-x-10 w-full">
                    <Link to="/Login" className="rounded-full bg-white text-black px-3.5 py-2.5 text-sm font-medium shadow-xs hover:logo-image hover:box-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:scale-105 transition-all duration-300">Sign-in</Link>
                    <Link to="/Register" className="text-sm/6 font-semibold text-white">Register <span aria-hidden="true">→</span></Link>
                </div>
                  
            </div>  
        </>
    )
}
