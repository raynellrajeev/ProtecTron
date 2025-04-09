import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IconUpload } from '@tabler/icons-react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

const mainVariant = {
  initial: {
    x: 0,
    y: 0
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9
  }
}

const secondaryVariant = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
}

export const FileUpload = ({ onChange, onThreatCountChange }) => {
  const [files, setFiles] = useState([])
  const [threatCount, setThreatCount] = useState(0)
  const [scanResults, setScanResults] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const fileInputRef = useRef(null)
  const API_BASE = 'http://127.0.0.1:8000'

  const handleScan = async (e) => {
    e.stopPropagation()
    if (files.length === 0) return

    setIsScanning(true)
    try {
      const formData = new FormData()
      const latestFile = files[files.length - 1]
      formData.append('file', latestFile)

      const response = await axios.post(`${API_BASE}/api/malware/scan/file/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data)
      const isMalicious = response.data.is_malicious
      const confidenceValue = response.data?.confidence
      let formattedConfidence = 'N/A'

      if (confidenceValue !== undefined && confidenceValue !== null) {
        if (typeof confidenceValue === 'string') {
          formattedConfidence = confidenceValue.includes('%')
            ? confidenceValue
            : `${(parseFloat(confidenceValue) * 100).toFixed(2)}%`
        } else if (!isNaN(confidenceValue)) {
          formattedConfidence = `${(parseFloat(confidenceValue) * 100).toFixed(2)}%`
        }
      }
      setScanResults({
        file: response.data.original_filename,
        tempFile: response.data.file && response.data.file.split('\\').pop(),
        status: response.data.is_malicious ? 'MALICIOUS' : 'CLEAN',
        confidence: formattedConfidence,
        error: null
      })
      if (isMalicious) {
        setThreatCount((prev) => {
          const newCount = prev + 1
          if (onThreatCountChange) {
            onThreatCountChange(newCount)
          }
          return newCount
        })
      }
    } catch (error) {
      console.error('Full error details:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      })
      setScanResults({
        error: error.response?.data?.error || error.message || 'Scan failed (check console)'
      })
    } finally {
      setIsScanning(false)
    }
  }

  const handleFileChange = (newFiles) => {
    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    onChange && onChange(updatedFiles)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setFiles([])
    setScanResults(null)
    onChange && onChange([])
    onThreatCountChange && onThreatCountChange(0)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error)
    }
  })

  const handleQuarantine = async (filePath, e) => {
    e.stopPropagation()
    console.log('Sending path:', filePath)
    try {
      const res = await axios.post(`${API_BASE}/api/malware/quarantine/`, {
        path: filePath
      })
      alert(res.data.message)
      console.log('Quarantining file:', filePath)
    } catch (err) {
      console.error(err)
      alert('Quarantine failed')
    }
  }

  const handleDelete = async (filePath, e) => {
    e.stopPropagation()
    console.log('Sending path:', filePath)
    try {
      const res = await axios.post(`${API_BASE}/api/malware/delete/`, {
        path: filePath
      })
      alert(res.data.message)
      console.log('Deleting file:', filePath)
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 text-lg font-medium text-white mt-2 ">
            Drag or drop your files here or click to scan
          </p>
          <div
            className="relative w-full mt-10 max-w-xl mx-auto "
            style={{
              scrollbarWidth: 'none' /* Firefox */,
              msOverflowStyle: 'none' /* Internet Explorer 10+ */
            }}
          >
            {/* Hide scrollbar for WebKit browsers */}
            <style>
              {`
                .relative::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={'file' + idx}
                  layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                  className={cn(
                    'relative overflow-hidden z-40 bg-white dark:bg-gray-800 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md',
                    'shadow-sm'
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-gray-900"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                      modified {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                className={cn(
                  'relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-blue-500 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                  'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]'
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-white" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-white" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border-2 border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>

        {/* Clear Button (Conditional Rendering) */}
        {files.length > 0 && (
          <div className="flex gap-4 justify-center mt-4">
            <motion.button
              onClick={handleClear}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-red-600 rounded-full"
            >
              Clear
            </motion.button>

            <motion.button
              onClick={handleScan}
              whileHover={{ scale: 1.05 }}
              disabled={isScanning}
              className={`px-4 py-2 rounded-full ${
                isScanning ? 'bg-gray-400' : 'bg-blue-500 text-white'
              }`}
            >
              {isScanning ? 'Scanning...' : 'Scan for Malware'}
            </motion.button>
          </div>
        )}
        {scanResults && (
          <div className="mt-4 p-4 border border-white/25 rounded-2xl hover:bg-slate-900">
            <h3 className="font-bold">Scan Results:</h3>
            {scanResults.error ? (
              <p className="text-red-500">{scanResults.error}</p>
            ) : (
              <>
                <p>File: {scanResults.file}</p>
                <p
                  className={scanResults.status === 'MALICIOUS' ? 'text-red-500' : 'text-green-500'}
                >
                  Status: {scanResults.status}
                </p>
                <p>Confidence: {scanResults.confidence}</p>

                {scanResults.status === 'MALICIOUS' && (
                  <div className="flex gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => handleQuarantine(scanResults.tempFile.split('\\').pop(), e)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-full"
                    >
                      Quarantine
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => handleDelete(scanResults.tempFile.split('\\').pop(), e)}
                      className="px-4 py-2 bg-red-600 text-white rounded-full"
                    >
                      Delete
                    </motion.button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
