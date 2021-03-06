var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var electron = require('electron');
var path = require('path');
var url = require('url');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win;
//load the config file
require('dotenv').config();
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, "node_modules", '.bin', 'electron')
});
function createWindow() {
    var eWidth, eHeight;
    if (process.env.production === 'true') {
        var _a = electron.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
        eWidth = width;
        eHeight = height;
    }
    else {
        //Test Mode
        eWidth = parseInt(process.env.debugWidth);
        eHeight = parseInt(process.env.debugHeight);
    }
    // Create the browser window.
    win = new BrowserWindow({
        width: eWidth, height: eHeight,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity: false
        }
    });
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Open the DevTools.
    if (!process.env.production) {
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
