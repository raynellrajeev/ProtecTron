import React, { useState, useEffect, useRef } from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useMediaQuery } from '@mui/material'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
  timeout: 8000
})

export default function DiskUsagePieChart() {
  const containerRef = useRef(null)
  const theme = useTheme()
  const [diskData, setDiskData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [chartSize, setChartSize] = useState({ width: 350, height: 200 })
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    const updateSize = () => {
      if (isMobile) {
        setChartSize({ width: 200, height: 100 })
      } else if (isTablet) {
        setChartSize({ width: 200, height: 100 })
      } else {
        setChartSize({ width: 250, height: 200 })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [isMobile, isTablet, isDesktop])

  React.useEffect(() => {
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

  const fetchDiskUsage = async () => {
    try {
      setLoading(true)
      const response = await api.get('disk/current/')

      // Process the data exactly matching your API response structure
      const formattedData = response.data.partitions.map((partition) => ({
        id: partition.drive.replace(/[^a-zA-Z0-9]/g, '_'), // Create safe ID
        label: partition.drive,
        value: partition.usage_percent,
        raw: { total: Number(partition.total_space), used: Number(partition.used_space) }
      }))
      console.log('Formatted Data:', formattedData)
      setDiskData(formattedData)
      setLastUpdated(new Date().toLocaleTimeString())
      setError(null)
    } catch (err) {
      setError({
        message: err.message,
        code: err.code,
        isServerError: !!err.response
      })
    } finally {
      setLoading(false)
    }
  }

  const formatBytes = (bytes) => {
    bytes = Number(bytes) // Ensure it's a number
    if (isNaN(bytes) || bytes <= 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
  }

  useEffect(() => {
    fetchDiskUsage()
    const interval = setInterval(fetchDiskUsage, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading && diskData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.isServerError ? 'Server Error' : 'Connection Error'}: {error.message}
        </Alert>
        <Button variant="contained" onClick={fetchDiskUsage}>
          Retry Now
        </Button>
      </Box>
    )
  }

  return (
    <Box ref={containerRef} sx={{ p: 2 }}>
      <PieChart
        series={[
          {
            data: diskData,
            arcLabel: (item) => `${item.value.toFixed(1)}%`,
            arcLabelMinAngle: 30,
            valueFormatter: (item) => {
              // Access the raw data directly from the item
              const used = item.raw?.used || 0
              const total = item.raw?.total || 0
              return `${item.value.toFixed(1)}% (${formatBytes(used)} of ${formatBytes(total)})`
            }
          }
        ]}
        {...chartSize}
        slotProps={{
          legend: {
            labelStyle: {
              fill: theme.palette.common.white,
              fontSize: isMobile ? 12 : 14
            },
            itemMarkWidth: isMobile ? 10 : 12,
            itemMarkHeight: isMobile ? 10 : 12,
            markGap: isMobile ? 5 : 7,
            itemGap: isMobile ? 10 : 15
          }
        }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: theme.palette.common.white,
            fontWeight: 'bold',
            fontSize: isMobile ? 12 : 14
          }
        }}
      />
      <div className="flex  lg:flex-col justify-between items-center m-4">
        <p className='text-white'>Disk Usage</p>
        {lastUpdated && <p className='text-end text-white/70'>Last updated: {lastUpdated}</p>}
      </div>
    </Box>
  )
}
