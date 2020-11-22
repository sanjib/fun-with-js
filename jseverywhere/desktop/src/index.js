const { app, BrowserWindow } = require('electron');
const { is, setContentSecurityPolicy } = require('electron-util');
const config = require('./config');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: is.development ? false : true
    }
  });

  // alt to loadURL is loadFile
  // example: window.loadFile('index.html');

  if (is.development) {
    window.loadURL(config.LOCAL_WEB_URL);
    window.webContents.openDevTools(); // open dev tools in dev environment
  } else {
    window.loadURL(config.PRODUCTION_WEB_URL);
  }

  // Set CSP in production mode
  if (!is.development) {
    setContentSecurityPolicy(`
      default-src 'none';
      script-src 'self';
      img-src 'self' https://www.gravatar.com;
      style-src 'self' 'unsafe-inline';
      font-src 'self';
      connect-src 'self' ${config.PRODUCTION_API_URL};
      base-uri 'none';
      form-action 'none';
      frame-ancestors 'none';
    `);
  }

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
