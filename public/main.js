const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const isDev = require("electron-is-dev");
// const fs = require('fs');
const { ipcMain } = require('electron/main');
const TodoService = require('../src/services/TodoService');
// const FormData = require('form-data');
// const { default: axios } = require('axios');

let mainWindow;

function createMainWindow() {
  console.log("path ", path.join(__dirname, '../preload.js'))
  mainWindow = new BrowserWindow({
    title: 'My buddy app',
    width: 1500,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload.js'),
    },
  });

  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/build/index.html'),
    protocol: 'file',
  });

  mainWindow.loadURL('http://localhost:3000');

  // mainWindow.loadURL(
  //   isDev
  //     ? "http://localhost:3000"
  //     : `file://${path.join(__dirname, "../build/index.html")}`
  // );

}

app.whenReady().then(createMainWindow);

ipcMain.on('submit:todoForm', async (e, opt) => {
  console.log("e... ", e)
  console.log("opt... ", opt)

  // after getting form data we call api here
  const data = await TodoService.handleTodoFormSubmit(opt);

  // after getting api response we send back to the frondend side 
  mainWindow.webContents.send('task:added', { task: data });
});

// ipcMain.on('file:upload', async (e, opt) => {
//   var form = new FormData();
//   form.append('image', fs.createReadStream(opt.file));
//   form.append('name', 'asdasd');
//   await axios.post('http://localhost:8000/api/upload', form, {
//     headers: form.getHeaders(),
//   });
//   mainWindow.webContents.send('upload:complete');
//   return true;
// });
