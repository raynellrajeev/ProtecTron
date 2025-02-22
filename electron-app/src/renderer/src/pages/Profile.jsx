import React from 'react';
import Header from '../components/Header';
import { Avatar } from '@mui/material';
import { PencilIcon } from '@heroicons/react/16/solid';

export default function Profile() {
    return (
        <div className='h-screen'>
            <Header />
            <div className='flex flex-col h-screen justify-center items-center'>
                <div className="bg-[rgba(48,48,48,0.3)] w-3/5 h-3/4 mt-10 border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] text-white rounded-[10px] p-[30px_40px]">
                    <div className='flex gap-8'>
                        <Avatar sx={{ width: 100, height: 100 }} />
                        <div className="flex text-3xl font-bold items-center gap-3 ">
                            John Doe
                            <PencilIcon className='h-4'/>
                        </div>
                    </div>
                </div>
       
            </div>
        </div>
    )
}