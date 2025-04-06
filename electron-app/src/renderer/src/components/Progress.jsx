import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
  timeout: 15000
})

export default function SystemHealthIndicator() {
  const containerRef = React.useRef(null)
  const [size, setSize] = React.useState(200)
  const [healthScore, setHealthScore] = useState(0)
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current
        const containerWidth = container.offsetWidth
        const containerHeight = container.offsetHeight
        const minDimension = Math.min(containerWidth, containerHeight)
        setSize(minDimension * 0.7)
      }
    }

    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const getFontSize = () => {
    if (isMobile) return size * 0.1
    if (isTablet) return size * 0.13
    return size * 0.15
  }

  const calculateHealthScore = (cpu, memory, disk) => {
    // Weighted average with inverted score (higher usage = lower health)
    const weights = { cpu: 0.4, memory: 0.4, disk: 0.2 }
    return (100 - (cpu * weights.cpu + memory * weights.memory + disk * weights.disk)).toFixed(2)
  }

  const fetchSystemHealth = async () => {
    try {
      setLoading(true)

      const [metricsRes, diskRes] = await Promise.all([
        api.get('metrics/current/'),
        api.get('disk/current/')
      ])

      const { cpu_usage, memory_usage } = metricsRes.data

      // Calculate average disk usage across partitions
      const diskPartitions = diskRes.data.partitions || []
      const avgDiskUsage = diskPartitions.length
        ? diskPartitions.reduce((sum, partition) => sum + partition.usage_percent, 0) /
          diskPartitions.length
        : 0

      setMetrics({
        cpu: cpu_usage,
        memory: memory_usage,
        disk: avgDiskUsage
      })

      setHealthScore(calculateHealthScore(cpu_usage, memory_usage, avgDiskUsage))
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Health check error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSystemHealth()
    const interval = setInterval(fetchSystemHealth, 15000) 
    return () => clearInterval(interval)
  }, [])

  const getColor = () => {
    if (healthScore >= 80) return theme.palette.success.main
    if (healthScore >= 50) return theme.palette.warning.main
    return theme.palette.error.main
  }

  const getStatusText = () => {
    if (healthScore >= 80) return 'Excellent'
    if (healthScore >= 50) return 'Good'
    if (healthScore >= 30) return 'Fair'
    return 'Poor'
  }

  const getTooltipText = () => {
    return `CPU: ${metrics.cpu.toFixed(1)}% | Memory: ${metrics.memory.toFixed(1)}% | Disk: ${metrics.disk.toFixed(1)}%`
  }

  if (loading) {
    return (
      <Box ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
        <Typography color="error">Health check failed</Typography>
      </Box>
    )
  }

  return (
    <Box ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
      <Tooltip title={getTooltipText()} arrow>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={healthScore}
            size={size}
            thickness={3}
            sx={{
              color: getColor(),
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round'
              }
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{
                fontSize: getFontSize(),
                fontWeight: 'semibold',
                color: 'white',
                fontFamily: 'inherit'
              }}
            >
              {`${healthScore}%`}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: getFontSize() * 0.7,
                color: theme.palette.common.white,
                mt: 1,
                fontFamily: 'inherit'
              }}
            >
              {getStatusText()}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    </Box>
  )
}
