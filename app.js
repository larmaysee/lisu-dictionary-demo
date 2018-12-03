const {
	app,
	BrowserWindow,
	Menu,
	protocol,
	Notification,
	ipcMain,
	dialog
} = require("electron");

const log = require("electron-log");
const {
	autoUpdater
} = require("electron-updater");
const version = app.getVersion();
const isDev = require("electron-is-dev");

var mainWindow = null;
// Quit when all windows are closed.
app.on("window-all-closed", function() {
	if (process.platform != "darwin") {
		app.quit();
	}
});


autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");
log.warn('getVersion', app.getVersion())

// initialization and is ready to create browser windows.
function createDefaultWindow() {
	mainWindow = new BrowserWindow({
		width: 650,
		height: 500,
		"min-width": 650,
		"min-height": 500,
		"accept-first-mouse": true,
		"title-bar-style": "hidden"
	});
	mainWindow.loadURL("file://" + __dirname + "/index.html");
	// Open the DevTools.
	mainWindow.openDevTools();
	mainWindow.setMenu(null);
	// Emitted when the window is closed.
	mainWindow.on("closed", function() {
		mainWindow = null;
	});
}

app.on("ready", function() {
	createDefaultWindow();
	autoUpdater.checkForUpdates();
	// autoUpdater.checkForUpdatesAndNotify();
});

function sendStatusToWindow(text) {
	log.info(text);
	mainWindow.webContents.send("message", text);
}

autoUpdater.on("checking-for-update", () => {
	sendStatusToWindow("Checking for update");
});

autoUpdater.on("update-available", info => {
	sendStatusToWindow("Update Available");
});

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

autoUpdater.on('update-downloaded', function(event, releaseName) {
	let message = app.getName() + ' ' + releaseName + ' is now available. It will be installed the next time you restart the application.';
	dialog.showMessageBox({
		type: 'question',
		buttons: ['Install and Relaunch', 'Later'],
		defaultId: 0,
		message: 'A new version of ' + app.getName() + ' has been downloaded',
		detail: message
	}, response => {
		if (response === 0) {
			setTimeout(() => autoUpdater.quitAndInstall(), 1);
		}
	});
});