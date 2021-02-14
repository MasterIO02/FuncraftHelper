exports.initFirstLaunch = async () => {
    const Store = require('electron-store');
    const store = new Store();

    const os = require("os")
    var username = os.userInfo().username
    document.getElementById("usernameText").innerHTML = 'Le nom d\'utilisateur détecté est "<b>' + username + '</b>".'
    az()

    document.getElementById("radioAZLauncherBtn").addEventListener("click", (e) => {
        az()
    })

    document.getElementById("radioOffiLauncherBtn").addEventListener("click", (e) => {
        document.getElementById("launcherSelectedText").innerHTML = "Vu que le launcher sélectionné est le Minecraft Officiel, l'emplacement serait"
        if (store.get('systemType') == 'win32') {
            document.getElementById("mcPathText").innerHTML = "C:/Users/" + username + "/AppData/Roaming/.minecraft/logs/latest.log"
            store.set("logFileLocation", "C:/Users/" + username + "/AppData/Roaming/.minecraft/logs/latest.log")
        } else if (store.get('systemType') == 'linux') {
            document.getElementById("mcPathText").innerHTML = "/home/" + username + "/.minecraft/logs/latest.log"
            store.set("logFileLocation", "/home/" + username + "/.minecraft/logs/latest.log")
        }
    })

    document.getElementById("end-first-launch").addEventListener("click", (e) => {
        store.set('firstLaunch', false)
        document.getElementById("firstLaunch").style.visibility = "hidden"
        document.getElementById("mainObjects").style.visibility = "visible"
        document.getElementById("state").style.visibility = "visible"
        document.getElementById("buttons").style.visibility = "visible"
        document.getElementById("usernameTextArea").value = store.get('username')
        document.getElementById("logFileLocationTextArea").value = store.get('logFileLocation')
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion}`
        const logFileWatcher = require('../engine/checkGame').logFileWatcher
        logFileWatcher()
    })

    document.getElementById("mcUsername").addEventListener("input", (e) => {
        store.set('username', document.getElementById('mcUsername').value)
    })

    function az() {
        document.getElementById("launcherSelectedText").innerHTML = "Vu que le launcher sélectionné est le AZ Launcher, l'emplacement serait"
        if (store.get('systemType') == 'win32') {
            document.getElementById("mcPathText").innerHTML = "C:/Users/" + username + "/AppData/Roaming/.az-client/logs/latest.log"
            store.set("logFileLocation", "C:/Users/" + username + "/AppData/Roaming/.az-client/logs/latest.log")
        } else if (store.get('systemType') == 'linux') {
            document.getElementById("mcPathText").innerHTML = "/home/" + username + "/.local/share/az-client/logs/latest.log"
            store.set("logFileLocation", "/home/" + username + "/.local/share/az-client/logs/latest.log")
        }
    }
}