import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import { useDate } from '../context/DateContext'
import zIndex from '@mui/material/styles/zIndex'

export default function FullScanButton(props) {
  const [isBoosting, setIsBoosting] = useState(false)
  const [boostPercentage, setBoostPercentage] = useState(0)
  const { setDate } = useDate()
  const containerRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const getResponsiveSize = () => {
    if (isMobile) return { width: '200px', height: '400px', fontSize: '18px', iconSize: '26px' }
    if (isTablet) return { width: '300px', height: '550px', fontSize: '20px', iconSize: '34px' }
    return { width: '450px', height: '600px', fontSize: '25px', iconSize: '40px' }
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

  const progressStyle = {
    position: 'absolute',
    inset: 0, // This replaces top, left, right, bottom
    width: '200%',
    height: '200%',
    background: 'rgba(33, 150, 243, 0.2)',
    transition: 'transform 1.5s linear',
    transform: `scaleX(${boostPercentage / 100})`,
    transformOrigin: 'left',
  }

  const handleBoost = () => {
    if (!isBoosting) {
      setIsBoosting(true)
      setBoostPercentage(0)
    }

    // Return today's date and time
    var currentTime = new Date()

    // returns the month (from 0 to 11)
    var month = currentTime.getMonth() + 1

    // returns the day of the month (from 1 to 31)
    var day = currentTime.getDate()

    // returns the year (four digits)
    var year = currentTime.getFullYear()
    var fullDate = `${day}/${month}/${year}`
    setDate(fullDate)
    console.log(fullDate)
  }

  useEffect(() => {
    if (isBoosting) {
      const interval = setInterval(() => {
        setBoostPercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setIsBoosting(false)
              setBoostPercentage(0)
            }, 1000)
            return 100
          }
          return prev + 1
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isBoosting])

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <motion.button
        style={buttonStyle}
        onClick={handleBoost}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div style={progressStyle} />
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
          >
            {isBoosting ? `${boostPercentage}%` : props.title}
          </p>
        </div>
      </motion.button>
    </div>
  )
}
