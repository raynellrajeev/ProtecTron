import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import PieArcLabel from '../components/PieArcLabel'
import CircularProgressWithLabel from '../components/Progress'
import { Stack } from '@mui/material'
import SimpleAreaChart from '../components/Graph'
import RAMBoostButton from '../components/RamBoosterButton'
import { useDate } from '../context/DateContext'

export default function Home() {
  const { date } = useDate()

  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-6 grid-rows-4 gap-4 border-0 bg-transparent pt-24 p-12 h-full w-full max-w-screen max-h-screen-lg min-h-screen overflow-hidden">
        <div className="col-span-3 row-span-1 border-2 rounded-2xl flex items-center  justify-start bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
          <div className="p-2flex flex-col justify-center w-full">
            <div className="flex gap-2 items-center px-[5%]">
              <h1 className="text-[min(2.5vw,1.875rem)] font-bold text-white">
                Protection Status:
                <span className="text-[min(3vw,2.25rem)] font-bold text-[#008000] pl-2">safe</span>
              </h1>
            </div>
            {date ? (
              <p className="text-[min(1.5vw,1rem)] pt-2 px-[5%]">Last scanned : {date}</p>
            ) : (
              <p className="text-[min(1.5vw,1rem)] pt-2 px-[5%]">Go to Scan page to scan.</p>
            )}
            <p className="text-[min(1.5vw,1rem)] pt-2 px-[5%]">Threats found : 0</p>
          </div>
        </div>
        <div className="col-span-1 row-span-1 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25">
          <RAMBoostButton
            isBoosting="#4CAF50"
            isNotBoosting="#2196F3"
            title="Boost RAM"
            borderRadius="50%"
          />
        </div>
        <div className="col-span-2 row-start-1 row-span-2 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto no-scrollbar">
          <div className="flex flex-col w-full h-full">
            <div className="flex-1 flex items-center justify-center">
              <CircularProgressWithLabel  />
            </div>
            <p className="text-[min(1.5vw,1rem)] text-center text-white pb-4">System Health</p>
          </div>
        </div>
        <div className="col-span-4 row-start-2 row-span-3 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 p-4 overflow-x-hidden overflow-y-scroll">
          <Stack direction={'column'} spacing={{ xs: 1, sm: 2, md: 4 }} className="w-full">
            <SimpleAreaChart label="CPU Usage (%)" color="#8884d8" metricType="cpu" />
            <SimpleAreaChart label="Memory Usage (%)" color="#82ca9d" metricType="memory" />
          </Stack>
        </div>
        <div className="col-span-2 row-span-2 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
          <PieArcLabel />
        </div>
      </div>
    </div>
  )
}
