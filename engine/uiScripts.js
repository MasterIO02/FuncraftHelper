const Store = require('electron-store');
const store = new Store();
const sharedVars = require('../engine/sharedVars')
const {
    BrowserWindow,
    app
} = require('electron').remote

/*-----------------------------------
 *  Init actions au démarrage
 *---------------------------------*/

// Chargeur de thème
function loadCSS(load) {
    const path = require('path')
    var head = document.getElementsByTagName("head")[0]
    var link = document.createElement("link")
    link.rel = "stylesheet"
    link.type = "text/css"
    if (load == "dark" || load == "default") {
        link.href = path.join(__dirname, "../css/" + load + ".css")
    } else {
        if (fs.existsSync(load + ".css")) {
            link.href = load + ".css"
        } else {
            console.log("Erreur de chargement du skin. Chargement du skin par défaut.")
            store.set('theme', 'default')
            loadCSS('default')
        }
    }
    head.appendChild(link)
}

// Init custom skins

const fs = require('fs');

try {
    const dirList = source => fs.readdirSync(`${app.getPath('userData')}/fhData/skins`, {
        withFileTypes: true
    }).reduce((a, c) => {
        c.isDirectory() && a.push(c.name)
        return a
    }, [])
    var directories = dirList()

    for (var directory of directories) {
        let rawAboutData = fs.readFileSync(`${app.getPath('userData')}/fhData/skins/${directory}/about.json`)
        var parsedAbout = JSON.parse(rawAboutData)
        var skinName = parsedAbout.skinName
        var skinDescription = parsedAbout.skinDescription
        var skinAuthor = parsedAbout.skinAuthor
        var skinFileName = parsedAbout.skinFileName
        $('#skins-list').append(`
            <div class="blurred-background" style="position: relative; width: 550px; height:100px; margin: 10px">
                <b class="text" style="position: fixed; top: 5px; left: 5px;"> ${skinName} </b>
                <p class="text" style="position: fixed; top: 25px; left: 5px;"> Description : ${skinDescription}</p>
                <p class="text" style="position: fixed; top: 75px; left: 5px;"> Auteur : ${skinAuthor} </p>
                <img class="skin-preview-img" style="position: fixed; top: 8px; left: 455px; height:84px; width: 84px;" src="${app.getPath('userData')}/fhData/skins/${directory}/preview.png"></img>
                <button onclick="loadCSS('${app.getPath('userData').replace(/\\/g, "/")}/fhData/skins/${directory}/${skinFileName}'); store.set('theme', '${skinFileName}')" style="position:fixed; top: 74px; left: 405px;">Utiliser</button>
            </div>`)
    }

} catch (e) {
    console.log('Erreur de chargement du skin : ' + e);
}

$('#skins-list').append(`
    <div class="blurred-background" style="position: relative; width: 550px; height:100px; margin: 10px">
        <b class="text" style="position: fixed; top: 5px; left: 5px;"> Thème clair </b>
        <p class="text" style="position: fixed; top: 25px; left: 5px;"> Description : Thème par défaut de FuncraftHelper.</p>
        <p class="text" style="position: fixed; top: 75px; left: 5px;"> Auteur : MasterIO </p>
        <img class="skin-preview-img" style="position: fixed; top: 8px; left: 455px; height:84px; width: 84px;" src="../files/preview-default.png"></img>
        <button onclick="loadCSS('default'); store.set('theme', 'default')" style="position:fixed; top: 74px; left: 405px;">Utiliser</button>
    </div>`)
$('#skins-list').append(`
    <div class="blurred-background" style="position: relative; width: 550px; height:100px; margin: 10px">
        <b class="text" style="position: fixed; top: 5px; left: 5px;"> Thème sombre </b>
        <p class="text" style="position: fixed; top: 25px; left: 5px;"> Description : Thème par défaut de FuncraftHelper.</p>
        <p class="text" style="position: fixed; top: 75px; left: 5px;"> Auteur : MasterIO </p>
        <img class="skin-preview-img" style="position: fixed; top: 8px; left: 455px; height:84px; width: 84px;" src="../files/preview-dark.png"></img>
        <button onclick="loadCSS('dark'); store.set('theme', 'dark')" style="position:fixed; top: 74px; left: 405px;">Utiliser</button>
    </div>`)


// Chargement du thème au démarrage
if (store.get('theme') == "dark" || store.get('theme') == "default") {
    loadCSS(store.get('theme'))
} else {
    loadCSS(`${app.getPath('userData')}/fhData/skins/${store.get('theme')}/${store.get('theme')}`)
}


// Lancement intro
window.onload = function () {
    setTimeout(function () {
        document.getElementById("text-intro").style.opacity = 0
        setTimeout(function () {
            // Si c'est le premier démarrage on cache certains objets sinon on les affiche
            document.getElementById("notifications").style.visibility = "visible"
            document.getElementById("mainObjects").style.visibility = "visible"
            document.getElementById("mainObjects").style.opacity = 1
            if (store.get('firstLaunch') == false) {
                document.getElementById("buttons").style.visibility = "visible"
            } else {
                document.getElementById("close-btn").style.visibility = "visible"
                document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Premier démarrage`
                document.getElementById("firstLaunch").style.visibility = "visible"
            }
        }, 500);
    }, 3200);
}

// Check si une mise à jour est disponible
const fetch = require("node-fetch");
fetch("https://api.github.com/repos/MasterIO02/FuncraftHelper/releases/latest")
    .then(res => res.json())
    .then((json) => {
        if (json.tag_name != sharedVars.fhVersion && json.documentation_url != "https://developer.github.com/v3/#rate-limiting") {
            document.getElementById("warning-notification").style.opacity = 1
            document.getElementById("warning-notification-text").innerHTML += `Version ${json.tag_name} disponible ! Téléchargez-la pour disposer de corrections de bugs, optis, et nouvelles fonctionnalités ! <a href onclick="require('electron').shell.openExternal('https://github.com/MasterIO02/FuncraftHelper/releases')"> Télécharger </a>`
        }
    })


// Check si c'est la première fois que FH est lancé, si oui, on ouvre le tuto de configuration, si non, FH commencera la recherche
if (store.get('firstLaunch') == undefined) {
    document.getElementById("mainObjects").style.visibility = "hidden"
    const initFirstLaunch = require('../engine/firstLaunch').initFirstLaunch
    includeHTML(function () {
        initFirstLaunch()
    }, "first-launch");
} else {
    if (store.get('systemType') == "darwin") {
        document.getElementById("warning-notification").style.opacity = 1
        document.getElementById("warning-notification-text").innerHTML += `MacOS n'est pas officiellement supporté par FuncraftHelper. Merci de ne pas faire de rapport de bugs pour ce système. `
    }
    const logFileWatcher = require('../engine/checkGame').logFileWatcher
    logFileWatcher()
}


// Check si enter est appuyé, pour check les stats de quelqu'un manuellement
document.getElementById("enterUsernameWindow").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        sharedVars.playerUsername = document.getElementById("manualUsernameTextarea").value
        sharedVars.playerNumber = 2
        sharedVars.playerPosition.push({
            username: sharedVars.playerUsername,
            position: sharedVars.playerNumber
        })
        if (store.get('useMorgothAPI') == false) {
            const navigatePlayer = require('../engine/navigatePlayer').navigatePlayer
            navigatePlayer()
        } else {
            const navigateMorgothAPI = require('../engine/navigateMorgothAPI').navigateMorgothAPI
            navigateMorgothAPI()
        }
        document.getElementById("manualUsernameTextarea").value = ""
        document.getElementById("enterUsernameWindow").style.visibility = "hidden"
        document.getElementById("2player2Username").innerHTML = sharedVars.playerUsername
    }
})

// Check si FuncraftHelper doit rechercher les stats de store.get('username') ou pas
if (store.get('firstLaunch') == false && store.get('ownStatsSearchFrequency') != "5") {
    const ownstats = new Store({
        name: "ownstats"
    })
    switch (true) {
        case store.get('ownStatsSearchFrequency') == "2":
            sharedVars.playerUsername = store.get('username')
            const navigatePlayer = require('../engine/navigatePlayer').navigatePlayer
            navigatePlayer()
            break;
        case store.get('ownStatsSearchFrequency') == "3":
            // si ça fait plus d'1 jour que les stats de store.get('username') ont pas étés recherchées ça les recherche
            var currentDate = new Date()
            var modificationDate = new Date(ownstats.get('modifiedAt'))
            if ((currentDate.getTime() - 86400000) > modificationDate.getTime()) {
                sharedVars.playerUsername = store.get('username')
                const navigatePlayer = require('../engine/navigatePlayer').navigatePlayer
                navigatePlayer()
            }
            break;
        case store.get('ownStatsSearchFrequency') == "4":
            // si ça fait plus d'1 semaine que les stats de store.get('username') ont pas étés recherchées ça les recherche
            var currentDate = new Date()
            var modificationDate = new Date(ownstats.get('modifiedAt'))
            if ((currentDate.getTime() - 604800000) > modificationDate.getTime()) {
                sharedVars.playerUsername = store.get('username')
                const navigatePlayer = require('../engine/navigatePlayer').navigatePlayer
                navigatePlayer()
            }
            break;
    }
}

// Check toutes les 5 minutes si le fichier de log de Minecraft est trop gros pour continuer a bien fonctionner.
// Si il est plus gros que 75kb, un avertissement sera envoyé dans le mainTextArea pour demander a l'utilisateur de redémarrer Minecraft.
setInterval(function () {
    fs.stat(store.get('logFileLocation'), (err, fileStats) => {
        console.log(fileStats.size)
        if (err) {
            document.getElementById("warning-notification").style.opacity = 1
            document.getElementById("warning-notification-text").innerHTML += err
        } else {
            if (fileStats.size >= 100000) {
                var fileSize = (fileStats.size / Math.pow(1024, 1)).toFixed(2)
                console.log(fileSize)
                document.getElementById("warning-notification").style.opacity = 1
                document.getElementById("warning-notification-text").innerHTML += `La taille du fichier de log de Minecraft est de ${fileSize}kb. Relancez Minecraft pour de meilleures performances de FuncraftHelper.\n`
            }
        }
    })
}, 300000)

/*-----------------------------------
 *  Init mainWindow
 *---------------------------------*/

const startSettingsScript = require('../engine/settingsWindowScript.js').startSettingsScript
includeHTML(function () {}, "uiLayout");

includeHTML(function () {
    startSettingsScript()
}, "settingsWindow");



document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion}`

// Change la taille de certains objets sur Windows
if (store.get('systemType') == 'win32') {
    document.styleSheets[0].addRule('.help-tip:before', 'top: -2px;')
    document.styleSheets[0].addRule('.warning-notification:before', 'top: -2px;')
    document.styleSheets[0].addRule('.error-notification:before', 'top: -2px;')
    document.getElementById("text-intro").style.top = "155px"
    document.getElementById("text-intro").style.left = "110px"
}


// Actions boutons principaux
document.getElementById("close-btn-enterUsernameWindow").addEventListener("click", (e) => {
    document.getElementById("enterUsernameWindow").style.visibility = "hidden"
})

document.getElementById("min-btn").addEventListener("click", (e) => {
    var window = BrowserWindow.getFocusedWindow();
    window.minimize();
})

document.getElementById("close-btn").addEventListener("click", (e) => {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
})

document.getElementById("discord-btn").addEventListener("click", (e) => {
    require('electron').shell.openExternal('https://discord.gg/QfbZBPA')
})

document.getElementById("settings-btn").addEventListener("click", (e) => {
    document.getElementById("advanced-options-btn").innerHTML = "Options avancées"
    if (document.getElementById("settingsObjects").style.visibility == "hidden") {
        document.getElementById("settingsTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Paramètres`
        document.getElementById("mainObjects").style.visibility = "hidden"
        document.getElementById("uiLayout").style.opacity = 0
        document.getElementById("skinsWindow").style.visibility = "hidden"
        document.getElementById("settingsObjects").style.visibility = "visible"
        document.getElementById("basic-options").style.visibility = "visible"
        document.getElementById("state").style.visibility = "hidden"
    } else {
        document.getElementById("basic-options").style.visibility = "unset"
        document.getElementById("settingsObjects").style.visibility = "hidden"
        document.getElementById("advanced-options").style.visibility = "hidden"
        document.getElementById("uiLayout").style.opacity = 1
        document.getElementById("mainObjects").style.visibility = "visible"
        if (!sharedVars.noState) {
            document.getElementById("state").style.visibility = "visible"
        }
    }
})


// Bouton thèmes
document.getElementById("themes-btn").addEventListener("click", (e) => {
    if (document.getElementById("skinsWindow").style.visibility == "hidden") {
        document.getElementById("skinsTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Thèmes`
        document.getElementById("mainObjects").style.visibility = "hidden"
        document.getElementById("skinsWindow").style.visibility = "visible"
        document.getElementById("uiLayout").style.opacity = 0
        document.getElementById("settingsObjects").style.visibility = "hidden"
        document.getElementById("state").style.visibility = "hidden"
        document.getElementById("advanced-options").style.visibility = "hidden"
        document.getElementById("basic-options").style.visibility = "hidden"
    } else {
        document.getElementById("advanced-options-btn").innerHTML = "Options avancées"
        document.getElementById("skinsWindow").style.visibility = "hidden"
        document.getElementById("mainObjects").style.visibility = "visible"
        document.getElementById("uiLayout").style.opacity = 1
        document.getElementById("mainObjects").style.visibility = "visible"
        if (!sharedVars.noState) {
            document.getElementById("state").style.visibility = "visible"
        }
    }
})