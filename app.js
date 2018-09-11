var app = require('electron').app;
var {
	BrowserWindow
} = require('electron');
var mainWindow = null;
// Quit when all windows are closed.
app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

// initialization and is ready to create browser windows.
app.on('ready', function() {
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
	// mainWindow.openDevTools();
	mainWindow.setMenu(null);
	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		mainWindow = null;
	});

});