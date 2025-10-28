import { app, shell, BrowserWindow, ipcMain, screen, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'


let mainWindow: BrowserWindow;


function createWindow(): void {
  // Create the browser window.

  const displays = screen.getAllDisplays();
  const secondaryDisplay = displays[0]

  mainWindow = new BrowserWindow({
    //width: 1080,
    //height: 1920,
    show: false,
    y: secondaryDisplay.bounds.y, //0,
    x: secondaryDisplay.bounds.x,//1920,
    center: true,
    fullscreen: true, // in true
    frame: false, // in true
    simpleFullscreen: true, // in true
  
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
      // nodeIntegration: true,   //
      // contextIsolation: false  //
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  globalShortcut.register('F12', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools();
      } else {
        win.webContents.openDevTools();
      }
    }
  });

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('appMain', (_, e) => {

    if( e.action == 'quit' ) {

      app.quit();

    }else if( e.action == 'openDevTools' ) {

      mainWindow.webContents.openDevTools();
      
    }

  })
  

  


  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
