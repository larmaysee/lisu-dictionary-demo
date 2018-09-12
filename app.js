const {
	app,
	BrowserWindow,
	Menu,
	protocol,
	ipcMain,
	dialog
} = require("electron");

const log = require("electron-log");
const {
	autoUpdater
} = require("electron-updater");
const isDev = require("electron-is-dev");

var mainWindow = null;
// Quit when all windows are closed.
app.on("window-all-closed", function () {
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
	mainWindow.on("closed", function () {
		mainWindow = null;
	});
}

app.on("ready", function () {
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
	log.info(info)
	sendStatusToWindow("Update Available");

	var index = dialog.showMessageBox(mainWindow, {
		type: 'info',
		buttons: ['Ok'],
		title: "Company Tech Solution",
		message: 'A new version of company app is getting downloaded bla bla bla.'
	});

	if (index === 1) {
		return;
	}

	autoUpdater.on('update-downloaded', function (event, releaseName) {

		// # confirm install or not to user
		var index = dialog.showMessageBox(mainWindow, {
			type: 'info',
			buttons: ['Restart', 'Later'],
			title: "Company Tech Solution",
			message: 'New version has been downloaded. Please restart the application to apply the updates.',
			detail: releaseName
		});

		if (index === 1) {
			return;
		}

		// # restart app, then update will be applied
		autoUpdater.quitAndInstall();
		ipcMain.on("quitAndInstall", (event, arg) => {
			autoUpdater.quitAndInstall();
		});
	});
});

// autoUpdater.on("update-not-available", info => {
// 	sendStatusToWindow("Update Not Available");
// });
// autoUpdater.on("error", err => {
// 	sendStatusToWindow("You got error.");
// });

// autoUpdater.on("download-progress", progressObj => {
// 	sendStatusToWindow("You download progress");
// });
// autoUpdater.on("update-downloaded", info => {
// 	autoUpdater.quitAndInstall();
// });

// ipcMain.on("quitAndInstall", (event, arg) => {
// 	autoUpdater.quitAndInstall();
// });