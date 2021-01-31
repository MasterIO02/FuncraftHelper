const electron = require('electron')
const {
    config
} = require('process')
const {
    app,
    BrowserWindow
} = electron
const Store = require('electron-store')
const store = new Store()
const os = require('os')
const fs = require('fs')
// const sharedVars = require('./engine/sharedVars')



const setDiscordRPC = require('./engine/rpc').setDiscordRPC
setDiscordRPC()

// Déclaration des fenêtres
app.on('ready', function () {
    const mainWindow = new BrowserWindow({
        height: 400,
        width: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            defaultEncoding: "utf-8"
        },
        show: false,
    })
    mainWindow.setResizable(false)
    mainWindow.loadURL(`file://${__dirname}/ui/mainWindow.html`)
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

})

// Init config si premier lancement
if (store.get('firstLaunch') == undefined) {
    store.set('systemType', os.platform())
    store.set('useMorgothAPI', false)
    store.set('headless', true)
    store.set('username', "*")
    store.set('manualEnter', true)
    store.set('theme', 'dark')
    store.set('ownStatsSearchFrequency', 3)
    if (store.get('systemType') == "linux") {
        store.set("logFileLocation", "/home/NOM D'UTILISATEUR/.local/share/az-client/logs/latest.log")
        store.set("chromeLocation", "/usr/bin/google-chrome")
    } else if (store.get('systemType') == "win32") {
        store.set("logFileLocation", "C:/Users/NOM D'UTILISATEUR/AppData/Roaming/.az-client/logs/latest.log")
        store.set("chromeLocation", "C:/Program Files/Google/Chrome/Application/chrome.exe")
    }
    store.set('modeNumber', 1)
    store.set('pauseEngine', false)
    store.set('adblocker', false)
}

// Init new configs si ancienne version
if (store.get('theme') == undefined) {
    store.set('theme', 'default')
}
if (store.get('manualEnter') == undefined) {
    store.set('manualEnter', true)
}
if (store.get('modeNumber') == undefined) {
    store.set('modeNumber', 1)
}
if (store.get('pauseEngine') == undefined) {
    store.set('pauseEngine', false)
}
if (store.get('adblocker') == undefined) {
    store.set('adblocker', false)
}
if (store.get('ownStatsSearchFrequency') == undefined) {
    store.set('ownStatsSearchFrequency', 3)
}

fs.access(`${app.getPath('userData')}/fhData/skins`, function (error) {
    if (error) {
        fs.mkdir(`${app.getPath('userData')}/fhData/skins`, {
            recursive: true
        }, (err) => {
            if (err) {
                return console.error(err);
            }
        })
    }
})