import React, { useEffect, useState, useRef } from 'react'
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

// 1. Enhanced API Configuration
const createApiInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
    timeout: 20000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      console.log(`Requesting: ${config.baseURL}${config.url}`)
      return config
    },
    (error) => {
      console.error('Request Error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log('Response:', response.status, response.data?.length)
      return response
    },
    (error) => {
      if (error.code === 'ECONNABORTED') {
        console.error('Timeout Error:', error.config.url)
      } else if (!error.response) {
        console.error('Network Error:', {
          url: error.config?.url,
          message: error.message,
          stack: error.stack
        })
      }
      return Promise.reject(error)
    }
  )

  return instance
}

const api = createApiInstance()

export default function SystemMetricsChart({ metricType, color }) {

  const containerRef = useRef(null)
  const [chartWidth, setChartWidth] = useState(850)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  // 2. State Management
  const [chartData, setChartData] = useState({
    uData: Array(10).fill(0),
    xLabels: Array(10).fill('Loading...')
  })
  const [connectionState, setConnectionState] = useState({
    status: 'initializing',
    lastError: null,
    retries: 0
  })
  const retryTimer = useRef(null)

  const chartConfig = {
    cpu: {
      label: 'CPU Usage (%)',
      color: color || '#8884d8'
    },
    memory: {
      label: 'Memory Usage (%)',
      color: color || '#82ca9d'
    }
  }

  // 3. Data Fetching with Robust Error Handling
  const fetchData = async () => {
    try {
      console.debug(`Fetching ${metricType} metrics...`)
      const response = await api.get('metrics/', {
        validateStatus: (status) => status < 500
      })

      if (!response.data?.length) {
        throw new Error('Server returned empty dataset')
      }

      const metrics = response.data
      setChartData({
        uData: metrics.map((item) => item[`${metricType}_usage`]),
        xLabels: metrics.map((item) =>
          new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        )
      })
      setConnectionState({
        status: 'connected',
        lastError: null,
        retries: 0
      })
    } catch (err) {
      console.error('Fetch Error:', {
        name: err.name,
        message: err.message,
        config: err.config,
        stack: err.stack
      })

      const retryCount = connectionState.retries + 1
      setConnectionState({
        status: 'error',
        lastError: err,
        retries: retryCount
      })

      // 4. Smart Retry Mechanism
      const retryDelay = Math.min(
        30000, // Max 30 seconds
        Math.pow(2, retryCount) * 1000 // Exponential backoff
      )

      retryTimer.current = setTimeout(fetchData, retryDelay)
    }
  }

  // 5. Initialization and Cleanup
  useEffect(() => {
    fetchData()
    const refreshInterval = setInterval(fetchData, 1000)

    return () => {
      clearInterval(refreshInterval)
      if (retryTimer.current) {
        clearTimeout(retryTimer.current)
      }
    }
  }, [metricType])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth - 32)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // 6. Render States
  if (connectionState.status === 'initializing') {
    return (
      <div className="flex items-center justify-center p-8">
        <CircularProgress />
        <span className="ml-3">Connecting to metrics service...</span>
      </div>
    )
  }

  if (connectionState.status === 'error') {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-red-800">Connection Error</h3>
            <p className="text-sm text-red-600">
              {connectionState.lastError?.message || 'Unknown network error'}
            </p>
          </div>
          <Button variant="outlined" color="error" size="small" onClick={fetchData}>
            Retry Now
          </Button>
        </div>

        <div className="mt-2 text-xs text-red-900">
          <p>Attempt {connectionState.retries + 1} of 5</p>
          <p>Next retry in {Math.min(30, Math.pow(2, connectionState.retries))} seconds</p>
          <details className="mt-1">
            <summary className="cursor-pointer">Technical Details</summary>
            <div className="p-2 bg-red-100 rounded mt-1">
              <p>Endpoint: {api.defaults.baseURL}metrics/</p>
              {connectionState.lastError?.response && (
                <p>Status: {connectionState.lastError.response.status}</p>
              )}
              <p>Error Code: {connectionState.lastError?.code || 'N/A'}</p>
            </div>
          </details>
        </div>
      </div>
    )
  }

  // 7. Main Chart Rendering
  return (
    <div ref={containerRef} className="w-full">
      <LineChart
        width={chartWidth}
        height={isMobile ? 150 : isTablet ? 175 : 200}
        series={[
          {
            data: chartData.uData,
            label: chartConfig[metricType].label,
            area: true,
            showMark: false,
            color: chartConfig[metricType].color
          }
        ]}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: isMobile ? 12 : 14,
              fill: chartConfig[metricType].color
            }
          },
          yAxis: {
            labelStyle: {
              fill: chartConfig[metricType].color,
              fontSize: isMobile ? 10 : 12
            }
          }
        }}
        xAxis={[
          {
            scaleType: 'point',
            data: chartData.xLabels,
            tickLabelStyle: {
              fontSize: isMobile ? 10 : 12,
              fill: '#ffffff'
            },
            labelStyle: {
              fill:chartConfig[metricType].color,
              fontSize: isMobile ? 10 : 12
            }
          }
        ]}
        sx={{
          // Force white color for all chart text elements
          '& .MuiChartsAxis-line': {
            stroke: '#ffffff !important'
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: '#ffffff !important',
            fontFamily: 'inherit'
          },
          '& .MuiChartsLegend-series text': {
            fill: '#ffffff !important'
          },
          '& .MuiChartsAxis-label': {
            fill: '#ffffff !important'
          },
          [`& .${lineElementClasses.root}`]: {
            display: 'none'
          },
          // Override any potential theme colors
          '& .MuiChartsText-root': {
            fill: '#ffffff !important'
          }
        }}
      />
    </div>
  )
}