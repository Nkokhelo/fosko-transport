const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
// require('dotenv').config();
let win;


function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#fff',
    autoHideMenuBar: true,
  });

  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/dist/index.html`),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );

  win.loadURL("http://localhost:4200/")
  win.webContents.openDevTools({
    mode: "bottom"
  });


  win.on("closed", function () {
    win = null;
  });

}

app.whenReady().then(createWindow);

// app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
