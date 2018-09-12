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


function sendStatusToWindow(text) {
	log.info(text);
	mainWindow.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
	sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
	sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
	sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
	sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
	let log_message = "Download speed: " + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
	sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
	autoUpdater.quitAndInstall();
});

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