import React from 'react';
import Header from '../components/Header';
import PieArcLabel from '../components/PieArcLabel';
import CircularProgressWithLabel from '../components/Progress';
import { Stack } from '@mui/material';
import SimpleAreaChart from '../components/Graph';
import RAMBoostButton from '../components/RamBoosterButton';
export default function Home() {
    return (
        <div className='h-screen'>
            <Header />
            <div className="grid grid-cols-6 grid-rows-4 gap-4 border-0 bg-transparent pt-24 p-12 h-full w-full max-w-screen max-h-screen-lg min-h-screen overflow-hidden">
                <div className="col-span-3 row-span-1 border-2 rounded-2xl flex items-center  justify-start bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
                    <div className='flex flex-col justify-center'>
                        <div className='flex gap-2 items-center pl-10'>
                            <h1 className="lg:text-3xl md:text-xl sm:text-l font-bold text-white">Protection Status: <span className='lg:text-4xl md:text-2xl sm:text-xl font-bold text-[#008000] pl-2'>safe</span></h1>
                        </div>
                        <p className='lg:text-l md:text-m sm:text-s pt-2 pl-10'>Last scanned : 02-02-2025</p>
                        <p className='lg:text-l md:text-m sm:text-s pt-2 pl-10'>Threats found : 0</p>
                    </div>
                    
                </div>
                <div className='col-span-1 row-span-1 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar'>
                    <div className='flex flex-col justify-center items-center'>
                        <RAMBoostButton />
                    </div>
                </div>
                <div className='col-span-2 row-start-1 row-span-2 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar'>
                    <div className='flex flex-col '>
                        <CircularProgressWithLabel  value={70} />
                    <p className='flex mt-5 justify-center text-m'>System Health</p>
                    </div>
                </div> 
                <div className='col-span-4 row-start-2 row-span-3 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25'>
                    <Stack
                        direction={'column'}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <SimpleAreaChart label='CPU' color='lightblue'/>
                        <SimpleAreaChart label='Memory' color='lightgreen'/>
                    </Stack>
                </div>
                <div className='col-span-2 row-span-2 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar'>
                    <PieArcLabel />
                </div>
            </div>
        </div>
    )
}

