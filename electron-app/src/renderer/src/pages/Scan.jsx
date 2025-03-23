import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { FileUpload } from '../components/FileUpload'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import FolderIcon from '@mui/icons-material/Folder'
import FullScanButton from '../components/FullScan'

export default function Home() {
  const [files, setFiles] = useState([])
  const [folderPath, setFolderPath] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const handleFolderSelect = async () => {
    try {
      const result = await window.electron.ipcRenderer.invoke('select-folder')
      if (result.filePaths && result.filePaths.length > 0) {
        setFolderPath(result.filePaths[0])
      }
    } catch (error) {
      console.error('Error selecting folder:', error)
    }
  }

  const getResponsiveSize = () => {
    if (isMobile) return { width: '100px', height: '30px', fontSize: '14px' }
    if (isTablet) return { width: '120px', height: '35px', fontSize: '16px' }
    return { width: '140px', height: '40px', fontSize: '18px' }
  }

  const { width, height, fontSize } = getResponsiveSize()

  const buttonStyle = {
    width,
    height,
    borderRadius: '25px',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    color: 'black',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    fontSize,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }

  const handleFileUpload = (files) => {
    setFiles(files)
    console.log(files)
  }

  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-[1.5fr,0.5fr,0.8fr,1.2fr] grid-rows-[1.3fr,0.7fr,1fr] gap-4 border-0 bg-transparent pt-24 p-12 h-full w-full max-w-screen max-h-screen-lg min-h-screen overflow-hidden">
        <div className="col-span-1 row-span-3 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
          <div className="flex flex-col justify-center text-center items-center box-border w-full h-full overflow-y-auto  no-scrollbar">
            <div>{/* logs */}</div>
          </div>
        </div>
        <div className="col-span-2 row-span-1 border-2 rounded-2xl flex flex-col items-center justify-between bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar p-4">
          {/* folder scan */}
          <h1 className="font-medium text-white sm:text-lg md:text-xl lg:text-2xl">Watch dog</h1>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', px: 2 }}>
            <FolderIcon
              sx={{
                color: 'white',
                mr: 1,
                my: 0.5,
                cursor: 'pointer',
                '&:hover': {
                  color: '#2196F3'
                }
              }}
              onClick={handleFolderSelect}
            />
            <TextField
              id="input-with-sx"
              label="Folder path"
              variant="standard"
              value={folderPath}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white'
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                  '&.Mui-focused': {
                    color: 'white'
                  }
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white'
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'white'
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white'
                }
              }}
            />
          </Box>
          <motion.button
            style={buttonStyle}
            whileHover={{
              scale: 1.05,
              backgroundColor: '#2196F3',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Watch over
          </motion.button>
        </div>
        <div className="col-span-1 row-span-1 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
          {/* Full scan */}
          <FullScanButton title="Full Scan" />
        </div>
        <div className="col-span-3 row-span-2 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-x-hidden overflow-y-scroll">
          <FileUpload onChange={handleFileUpload} />
          {console.log(files)}
        </div>
      </div>
    </div>
  )
}
