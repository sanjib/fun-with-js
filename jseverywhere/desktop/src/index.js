const { app, BrowserWindow } = require('electron');
const { is } = require('electron-util'); // tools for dev tools

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.loadFile('index.html');

  // open dev tools in dev environment
  if (is.development) window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);

// macOS specific behavior:
// on window close, app closes but app remains in dock
// following code ensures app exits properly on window close

app.on('window-all-closed', () => {
  // On macOS only quit when a user explicitly quits the application
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // on macOS, re-create the window when the icon is clicked in the dock
  if (window === null) {
    createWindow();
  }
});
