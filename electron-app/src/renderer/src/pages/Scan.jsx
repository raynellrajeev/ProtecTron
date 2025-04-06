import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { FileUpload } from '../components/FileUpload'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import FullScanButton from '../components/FullScan'
import FileChangeLogs from '../components/FileChangeLog'

export default function Home() {
  const [files, setFiles] = useState([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const API_BASE = 'http://localhost:8000/api/watch'

  const getResponsiveSize = () => {
    if (isMobile) return { width: '100px', height: '30px', fontSize: '14px' }
    if (isTablet) return { width: '120px', height: '35px', fontSize: '16px' }
    return { width: '140px', height: '40px', fontSize: '18px' }
  }

  const handleFileUpload = (files) => {
    setFiles(files)
    console.log(files);
    
  }
  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-[1.5fr,0.5fr,0.8fr,1.2fr] grid-rows-[1.3fr,0.7fr,1fr] gap-4 border-0 bg-transparent pt-24 p-12 h-full w-full max-w-screen max-h-screen-lg min-h-screen overflow-hidden">
        <div className="col-span-1 row-span-3 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
          <div className="flex flex-col justify-start text-center items-stretch p-4  box-border w-full h-full overflow-y-scroll  no-scrollbar">
            <div>
              {/* logs */}
              <FileChangeLogs />
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-1 border-2 rounded-2xl flex flex-col items-center justify-between bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar p-4">
          {/* folder scan */}
          
        </div>
        <div className="col-span-1 row-span-1 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
          {/* Full scan */}
          <FullScanButton title="Full Scan" />
        </div>
        <div className="col-span-3 row-span-2 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-x-hidden overflow-y-scroll">
          <FileUpload onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  )
}
