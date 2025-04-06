import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFileChanges() {
  const [changes, setChanges] = useState([])
  const [isWatching, setIsWatching] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const API_BASE = 'http://127.0.0.1:8000/api/watch'

  const handleApiError = (error) => {
    let errorMsg = 'An unexpected error occurred'
    if (error.response) {
      // Server responded with error status
      errorMsg =
        error.response.data?.error ||
        error.response.statusText ||
        `Server error (${error.response.status})`
    } else if (error.request) {
      // Request was made but no response
      errorMsg = 'No response from server'
    } else {
      // Other errors
      errorMsg = error.message
    }
    setError(errorMsg)
    console.error('API Error:', errorMsg)
    return errorMsg
  }

  const fetchChanges = async () => {
    try {
      const response = await axios.get(`${API_BASE}/changes/`)
      setChanges(response.data)
      setError(null)
      return response.data
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const startWatching = async (path) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post(`${API_BASE}/start/`, { path })
      setIsWatching(true)
      await fetchChanges()
      return response.data
    } catch (error) {
      const errorMsg = handleApiError(error)
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const stopWatching = async (path) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post(`${API_BASE}/stop/`, { path })
      setIsWatching(false)
      return response.data
    } catch (error) {
      const errorMsg = handleApiError(error)
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWatching) {
        fetchChanges()
      }
    }, 3000)

    // Initial fetch
    fetchChanges()

    return () => clearInterval(interval)
  }, [isWatching])

  const clearLogs = async () => {
    try {
      await axios.post(`${API_BASE}/clear/`)
      setChanges([])
    } catch (error) {
      handleApiError(error)
    }
  }

  return {
    changes,
    isWatching,
    error,
    isLoading,
    startWatching,
    stopWatching,
    refresh: fetchChanges,
    clearLogs
  }
}
