import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import MemoryIcon from '@mui/icons-material/Memory';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RAMBoostButton() {
  const [isBoosting, setIsBoosting] = useState(false)
  const [boostPercentage, setBoostPercentage] = useState(0)
  const containerRef = useRef(null)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getResponsiveSize = () => {
    if (isMobile) return { width: '60px', height: '60px', fontSize: '10px', iconSize: '24px' };
    if (isTablet) return { width: '80px', height: '80px', fontSize: '12px', iconSize: '32px' };
    return { width: '100px', height: '100px', fontSize: '14px', iconSize: '40px' };
  };

  const { width, height, fontSize, iconSize } = getResponsiveSize();

  const buttonStyle = {
    width,
    height,
    borderRadius: "50%",
    background: isBoosting ? "#4CAF50" : "#2196F3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    outline: "none",
    color: "white",
    fontWeight: "bold",
    transition: "all 0.3s",
    position: "relative",
    overflow: "hidden",
  }

  const progressStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: `${boostPercentage}%`,
    height: "100%",
    background: "rgba(255, 255, 255, 0.2)",
    transition: "width 0.5s linear",
  }

  const handleBoost = () => {
    if (!isBoosting) {
      setIsBoosting(true)
      setBoostPercentage(0)
    }
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
      }, 20)
      return () => clearInterval(interval)
    }
  }, [isBoosting])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <motion.button 
        style={buttonStyle} 
        onClick={handleBoost} 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center"
      >
        <div style={progressStyle} />
        <MemoryIcon sx={{ 
          fontSize: iconSize,
          mb: 1
        }} />
        <p style={{ 
          fontSize,
          margin: 0,
          lineHeight: 1.2
        }}>
          {isBoosting ? `${boostPercentage}%` : 'Boost RAM'}
        </p>
      </motion.button>
    </div>
  )
}

