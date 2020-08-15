const electron = require('electron')
const { config } = require('process')
const { app, BrowserWindow } = electron
const Store = require('electron-store');
const store = new Store();
const os = require('os')
var path = require('path')

// Déclaration des fenêtres
app.on('ready', function () {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    
    })
    mainWindow.setResizable(false)
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`)

    settingsWindow = new BrowserWindow({
        height: 400,
        width: 600,
        frame: false,
        parent: mainWindow,
        show: false,
        modal: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    settingsWindow.setResizable(false)
    settingsWindow.loadURL(`file://${__dirname}/settingsWindow.html`)

})

// Init settingsWindow

if (store.get('firstLaunch') == undefined) {
    store.set('systemType', os.platform())
    store.set('useMorgothAPI', false)
    store.set('headless', true)
    store.set('username', "*")
    if (store.get('systemType') == "linux") {
        store.set("logFileLocation", "/home/NOM D'UTILISATEUR/.local/share/az-client/logs/latest.log")
        store.set("chromeLocation", "/usr/bin/google-chrome")
    } else if (store.get('systemType') == "win32") {
        store.set("logFileLocation", "C:/Users/NOM D'UTILISATEUR/AppData/Roaming/.az-client/logs/latest.log")
        store.set("chromeLocation", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe")
    }
}


// Calls depuis les fichiers HTML
const { ipcMain } = require('electron')

ipcMain.on('showSettingsWindow', (event, arg) => {
    var bounds = mainWindow.getBounds()
    settingsWindow.setBounds(bounds)
    settingsWindow.show()
})
ipcMain.on('hideSettingsWindow', (event, arg) => {
    settingsWindow.hide()
})
ipcMain.on('reloadSettingsWindow', (event, arg) => {
    settingsWindow.reload()
})




