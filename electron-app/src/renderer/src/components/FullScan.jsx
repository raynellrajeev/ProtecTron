import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import axios from 'axios'
import { useDate } from '../context/DateContext'
import zIndex from '@mui/material/styles/zIndex'

export default function FullScanButton(props) {
  const [isBoosting, setIsBoosting] = useState(false)
  const [boostPercentage, setBoostPercentage] = useState(0)
  const [scanResults, setScanResults] = useState(null)
  const [totalFiles, setTotalFiles] = useState(0)
  const [scannedFiles, setScannedFiles] = useState(0)
  const { setDate } = useDate()
  const containerRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const API_BASE = 'http://127.0.0.1:8000'

  const getResponsiveSize = () => {
    if (isMobile) return { width: '200px', height: '400px', fontSize: '16px', iconSize: '26px' }
    if (isTablet) return { width: '300px', height: '550px', fontSize: '18px', iconSize: '34px' }
    return { width: '450px', height: '600px', fontSize: '20px', iconSize: '40px' }
  }

  const { width, height, fontSize, iconSize } = getResponsiveSize()

  const buttonStyle = {
    width,
    height,
    borderRadius: props.borderRadius,
    background: isBoosting ? props.isBoosting : props.isNotBoosting,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    position: 'relative',
    overflow: 'hidden',
    padding: 0,
    zIndex
  }

  const handleSystemScan = async () => {
    try {
      // First get total file count
      const countResponse = await axios.get(`${API_BASE}/api/malware/count/files/`)
      setTotalFiles(countResponse.data.total_files)

      // Then start the actual scan with progress updates
      const response = await axios.post(
        `${API_BASE}/api/malware/scan/system/`,
        { path: 'D:/movies and series' },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          onDownloadProgress: (progressEvent) => {
            if (progressEvent.event.lengthComputable) {
              const percentComplete = Math.round((progressEvent.loaded / progressEvent.total) * 100)
              setBoostPercentage(percentComplete)
            }
          }
        }
      )

      setScanResults(response.data)
      setBoostPercentage(100) // Ensure we reach 100% when done

      // Update UI with scan results
      if (response.data.malicious_files > 0) {
        alert(`Scan complete! Found ${response.data.malicious_files} malicious files.`)
      } else {
        alert('Scan complete! No malicious files found.')
      }
    } catch (error) {
      console.error('Scan failed:', error)
      alert('Scan failed. Check console for details.')
    } finally {
      setIsBoosting(false)
    }
  }

  const handleBoost = () => {
    if (!isBoosting) {
      setIsBoosting(true)
      setBoostPercentage(0)
      setScannedFiles(0)
      setTotalFiles(0)
      handleSystemScan()
    }

    // Return today's date and time
    const currentTime = new Date()
    const month = currentTime.getMonth() + 1
    const day = currentTime.getDate()
    const year = currentTime.getFullYear()
    const fullDate = `${day}/${month}/${year}`
    setDate(fullDate)
  }

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <motion.button
        style={buttonStyle}
        onClick={handleBoost}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center justify-center">
          <LanguageRoundedIcon
            sx={{
              fontSize: iconSize,
              mb: 1
            }}
          />
          <p
            style={{
              fontSize,
              margin: 0,
              lineHeight: 1.2
            }}
            className="text-white font-medium text-xl"
          >
            {isBoosting ? `${boostPercentage}/${totalFiles}` : props.title}
          </p>
          {isBoosting && totalFiles > 0 && (
            <p className="text-xs mt-1">
              Scanned {scannedFiles} of {totalFiles} files
            </p>
          )}
        </div>
      </motion.button>

      {/* Scan Results Display */}
      {scanResults && (
        <div className="mt-4 p-4 rounded-lg max-w-md relative">
          <motion.button
            onClick={() => setScanResults(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>

          <h3 className="font-bold mb-2">Scan Summary:</h3>
          <p>Scanned: {scanResults.scanned_files} files</p>
          <p className={scanResults.malicious_files > 0 ? 'text-red-500' : 'text-green-500'}>
            Malicious: {scanResults.malicious_files}
          </p>
          {scanResults.sample_results && scanResults.sample_results.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold">Sample Results:</h4>
              <ul className="list-disc pl-5">
                {scanResults.sample_results.slice(0, 3).map((result, index) => (
                  <li key={index} className="truncate">
                    {result.file}: {result.is_malicious ? 'Malicious' : 'Clean'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
