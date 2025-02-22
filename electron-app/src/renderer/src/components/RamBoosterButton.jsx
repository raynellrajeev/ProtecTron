import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MemoryIcon from '@mui/icons-material/Memory';

export default function RAMBoostButton() {
  const [isBoosting, setIsBoosting] = useState(false)
  const [boostPercentage, setBoostPercentage] = useState(0)

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

  const buttonStyle = {
    width: "7rem",
    height: "7rem",
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
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background 0.3s",
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

  return (
    <motion.button style={buttonStyle} onClick={handleBoost} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <div style={progressStyle} />
      <MemoryIcon size='5vh' className="mb-2" />
      {isBoosting ? <p className="text-sm">Boosting {boostPercentage}</p> : <p className="text-sm">Boost RAM</p>}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </motion.button>
  )
}

