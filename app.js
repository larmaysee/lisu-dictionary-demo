const {
	app,
	BrowserWindow,
	Menu,
	protocol,
	ipcMain
} = require('electron');

const log = require('electron-log');
const {
	autoUpdater
} = require("electron-updater");
var mainWindow = null;
// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// initialization and is ready to create browser windows.
app.on('ready', function () {
	mainWindow = new BrowserWindow({
		width: 650,
		height: 500,
		'min-width': 650,
		'min-height': 500,
		'accept-first-mouse': true,
		'title-bar-style': 'hidden'
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	// Open the DevTools.
	mainWindow.openDevTools();
	mainWindow.setMenu(null);
	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});

function sendStatusToWindow(text) {
	log.info(text);
	mainWindow.webContents.send('message', text);
}

app.on('ready', function () {
	autoUpdater.checkForUpdates();
});
autoUpdater.on('checking-for-update', () => {
	sendStatusToWindow("Checking for update");
})
autoUpdater.on('update-available', (info) => {
	sendStatusToWindow("Update Available");

})
autoUpdater.on('update-not-available', (info) => {
	sendStatusToWindow("Update Not Available");

})
autoUpdater.on('error', (err) => {
	sendStatusToWindow("You got error.");

})
autoUpdater.on('download-progress', (progressObj) => {
	sendStatusToWindow("You download progress");

})
autoUpdater.on('update-downloaded', (info) => {
	autoUpdater.quitAndInstall();
})