import React, { useState } from 'react'
import useFileChanges from '../hooks/useFileChanges'
import FolderIcon from '@mui/icons-material/Folder'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { motion } from 'framer-motion'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'


const FileChangeLogs = () => {
  const [watchPath, setWatchPath] = useState('')
  const { changes, isWatching, error, isLoading, startWatching, stopWatching, refresh, clearLogs } =
    useFileChanges()


  const handleStart = async () => {
    try {
      await startWatching(watchPath)
    } catch (error) {
      // Error is already handled in the hook
    }
  }

  const handleStop = async () => {
    try {
      await stopWatching(watchPath)
    } catch (error) {
      // Error is already handled in the hook
    }
  }

  const getColorForType = (type) => {
    switch (type) {
      case 'CREATED':
        return 'bg-green-100 text-green-800'
      case 'MODIFIED':
        return 'bg-blue-100 text-blue-800'
      case 'DELETED':
        return 'bg-red-100 text-red-800'
      case 'MOVED':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex justify-start items-start w-full">
      <div className="p-4 w-full ">
        <h1 className="text-xl text-white font-medium mb-4">File System Monitor</h1>

        <div className="mb-6 flex flex-col items-center gap-4 text-black">
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', py: '10px' }}>
            <FolderIcon
              sx={{
                color: 'white',
                mr: 1,
                my: 0.5
              }}
            />
            <TextField
              onChange={(e) => setWatchPath(e.target.value)}
              id="input-with-sx"
              label="Enter directory path to watch"
              variant="standard"
              value={watchPath}
              disabled={isLoading}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                  fontFamily: 'inherit'
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                  fontFamily: 'inherit',
                  '&.Mui-focused': {
                    color: 'white',
                    fontFamily: 'inherit'
                  }
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                  fontFamily: 'inherit'
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'white',
                  fontFamily: 'inherit'
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                  fontFamily: 'inherit'
                }
              }}
            />
          </Box>

          <div className="text-black flex  gap-8">
            {!isWatching ? (
              <motion.button
                onClick={handleStart}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
                className={`px-4 py-2 h-auto  bg-blue-500 text-white rounded-full md:rounded-3xl sm:rounded-xl `}
                disabled={!watchPath || isLoading}
              >
                {isLoading ? 'Starting...' : 'Start Watching'}
              </motion.button>
            ) : (
              <motion.button
                onClick={handleStop}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
                className={`px-4 py-2 h-auto bg-red-600 text-white rounded-full md:rounded-3xl sm:rounded-xl `}
                disabled={isLoading}
              >
                {isLoading ? 'Stopping...' : 'Stop Watching'}
              </motion.button>
            )}

            <motion.button
              onClick={clearLogs}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
              className="px-4 py-2 bg-white text-black rounded-full"
              disabled={isLoading}
            >
              Refresh
            </motion.button>
          </div>
        </div>

        {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}

        {isLoading && !changes.length ? (
          <div className="p-4 text-center">Loading changes...</div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-medium">Recent Changes:</h2>
              <span
                className={`text-sm text-gray-500 ${isWatching ? 'text-green-400' : 'text-red-500'}`}
              >
                {isWatching ? '🟢 Active' : 'Inactive'}
              </span>
            </div>

            {changes.length === 0 ? (
              <p className="text-gray-500">
                {isWatching ? 'No changes detected yet' : 'Enter a path and start watching'}
              </p>
            ) : (
              changes.map((change) => (
                <div
                  key={change.id}
                  className="p-3 border border-white/25 rounded-xl hover:bg-slate-900"
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${getColorForType(change.change_type)}`}
                    >
                      {change.change_type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(change.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="font-mono text-sm break-all">
                      {change.is_directory ? '📁 ' : '📄 '}
                      {change.path}
                    </p>
                    {change.dest_path && (
                      <div className="flex items-center mt-1">
                        <span className="text-gray-500 mr-2">→</span>
                        <p className="font-mono text-sm break-all">
                          {change.is_directory ? '📁 ' : '📄 '}
                          {change.dest_path}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FileChangeLogs
