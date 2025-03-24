import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// ✅ Function to Check Django Connectivity
async function checkDjangoConnection() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/ping/')
    console.log('✅ Django Connected:', response.data)
  } catch (error) {
    console.error('❌ Failed to connect to Django:', error.message)
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // ✅ IPC Handler to Fetch Data from Django API
  ipcMain.handle('fetch-api-data', async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/test/') // Django API URL
      return response.data // Send API response to renderer
    } catch (error) {
      console.error('❌ API Fetch Error:', error.message)
      return { error: 'Failed to fetch data', details: error.message }
    }
  })

  createWindow()

  // ✅ Run Django connection check on app start
  checkDjangoConnection()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
