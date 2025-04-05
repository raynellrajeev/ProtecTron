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
import axios from 'axios'

export default function Home() {
  const [files, setFiles] = useState([])
  const [folderPath, setFolderPath] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isWatchingOver, setIsWatchingOver] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const API_BASE = 'http://localhost:8000/api/watch'

  const getResponsiveSize = () => {
    if (isMobile) return { width: '100px', height: '30px', fontSize: '14px' }
    if (isTablet) return { width: '120px', height: '35px', fontSize: '16px' }
    return { width: '140px', height: '40px', fontSize: '18px' }
  }

  const { width, height, fontSize } = getResponsiveSize()

  const buttonStyle = {
    backgroundColor: isWatchingOver ? 'hsl(0, 82%, 51%)' : '#2196F3',
    width,
    height,
    borderRadius: '25px',
    // background: 'white',
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
  }
  const getCsrfToken = async () => {
    try {
      const response = await axios.get(`${API_BASE}/csrf/`, {
        withCredentials: true
      })

      if (!response.data?.csrfToken) {
        throw new Error('Invalid CSRF token received')
      }

      return response.data.csrfToken
    } catch (error) {
      console.error('CSRF Token Error:', error)
      throw new Error('Failed to get security token. Please refresh the page.')
    }
  }

  const handleWatchOver = async (event) => {
    const action = isWatchingOver ? 'stop' : 'start'

    try {
      // Show loading state
      setStatusMessage('Connecting to server...')

      const csrfToken = await getCsrfToken()

      const response = await axios.post(
        `${API_BASE}/${action}/`,
        { path: folderPath },
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          timeout: 5000
        }
      )

      setIsWatchingOver(!isWatchingOver)
      setStatusMessage(response.data.status || `Monitoring ${action}ed successfully`)

      if (action === 'stop') {
        setFolderPath('')
      }
    } catch (error) {
      let errorMessage = 'An error occurred'

      if (error.message.includes('security token')) {
        errorMessage = error.message
      } else if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Server endpoint not found. Check backend is running.'
        } else {
          errorMessage = error.response.data?.error || `Server error (${error.response.status})`
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Server timeout. Is the backend running?'
      } else if (error.request) {
        errorMessage = 'No response from server. Check your connection.'
      }

      setStatusMessage(errorMessage)
      console.error('API Error:', error)
    }
  }

  const handleChange = (event) => {
    setFolderPath(event.target.value)
    // Only clear status if we're not currently watching
    if (!isWatchingOver) {
      setStatusMessage('')
    }
  }

  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-[1.5fr,0.5fr,0.8fr,1.2fr] grid-rows-[1.3fr,0.7fr,1fr] gap-4 border-0 bg-transparent pt-24 p-12 h-full w-full max-w-screen max-h-screen-lg min-h-screen overflow-hidden">
        <div className="col-span-1 row-span-3 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
          <div className="flex flex-col justify-center text-start items-center box-border w-full h-full overflow-y-scroll text-md/7 leading-loose  no-scrollbar">
            <div>
              {/* logs */}
              <p className='px-20 '>
                <h1>Watchdog:</h1>
                
                <h1>AI file scan:</h1>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-1 border-2 rounded-2xl flex flex-col items-center justify-between bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar p-4">
          {/* folder scan */}
          <h1 className="font-medium text-white sm:text-lg md:text-xl lg:text-2xl">Watch dog</h1>
          {isWatchingOver ? (
            <div
              style={{
                marginTop: '15px',
                padding: '10px',
                color: 'white',
                backgroundColor: isWatchingOver ? 'rgba(0, 128, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                borderRadius: '4px',
                borderLeft: `4px solid ${isWatchingOver ? '#4CAF50' : '#F44336'}`
              }}
            >
              {statusMessage}
            </div>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', px: 2 }}>
              <FolderIcon
                sx={{
                  color: 'white',
                  mr: 1,
                  my: 0.5
                }}
              />
              <TextField
                onChange={handleChange}
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
          )}

          <motion.button
            name={isWatchingOver ? 'stop' : 'start'}
            onClick={handleWatchOver}
            style={buttonStyle}
            whileHover={{
              scale: 1.05,
              backgroundColor: isWatchingOver ? 'hsl(0, 82%, 51%)' : '#2196F3',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isWatchingOver ? 'Stop' : 'Watch over'}
          </motion.button>
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
