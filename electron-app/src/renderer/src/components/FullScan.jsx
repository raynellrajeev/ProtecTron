import React, { useState } from 'react'
import { Globe } from 'lucide-react'

export default function FullScan() {
  const [isScanning, setIsScanning] = useState(false)
  const startScan = () => {
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 10000)
  }

  return (
    <>
      <div className="bg-transparent p-10 shadow-xl w-full h-auto flex justify-center relative overflow-hidden">
        {/* Scanning Animation */}
        {isScanning && (
          <div className="absolute inset-0">
            <div className="scanning-line absolute inset-0">
              <div className="scanning-glow top-1/2 translate-y-1/2" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="text-center relative z-10">
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`justify-center
              relative group flex items-center gap-3  
              rounded-full font-medium transition-all duration-300
              ${
                isScanning
                  ? 'bg-transparent text-blue-400 cursor-not-allowed'
                  : 'bg-transparent text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-100'
              }
            `}
          >
            <Globe
              className={`w-15 h-15 transition-transform duration-300 ${isScanning ? 'animate-spin' : 'group-hover:rotate-12'}`}
            />
            <span className="relative text-xl">{isScanning ? 'Scanning...' : 'Full Scan '}</span>
          </button>
        </div>
      </div>
    </>
  )
}
