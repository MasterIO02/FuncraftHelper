const sharedVars = require('./sharedVars.js')
const puppeteer = require('puppeteer-core')
const {
    PuppeteerBlocker
} = require('@cliqz/adblocker-puppeteer')
const fetch = require('cross-fetch')
const Store = require('electron-store')
const store = new Store()
const ownstats = new Store({
    name: "ownstats"
})


function reloadOwnStats() {
    var playerNumber = sharedVars.playerNumber
    var playerOneShouldBeMe = sharedVars.playerOneShouldBeMe
    sharedVars.playerOneShouldBeMe = false
    var gameChosen = sharedVars.gameChosen

    var date = new Date(ownstats.get('modifiedAt'))
    var time = date.toTimeString().substr(0, 5)

    switch (true) {
        case store.get('username') != ownstats.get('username'):
            const navigatePlayer = require('../engine/navigatePlayer').navigatePlayer
            sharedVars.playerUsername = store.get('username')
            navigatePlayer()
            break;

        case playerNumber == 1 || playerOneShouldBeMe:
            document.getElementById("2player1Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("2player1Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% en ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games. <br> Points : ${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${ownstats.get(`rounded${gameChosen}Ratio`)} (${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills pour ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts)`
            document.getElementById("2player1Image").src = ownstats.get('imageUrl')
            document.getElementById("4player1Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("4player1Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Points : ${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${ownstats.get(`rounded${gameChosen}Ratio`)}`
            document.getElementById("4player1Image").src = ownstats.get('imageUrl')
            document.getElementById("4player1AdditionalDetails").innerText = `${ownstats.get('hikabrainGamesCount')} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player1Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player1Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player1Image").src = ownstats.get('imageUrl')
            document.getElementById("16player1Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player1Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player1Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 2:
            document.getElementById("4player2Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("4player2Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Points : ${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${ownstats.get(`rounded${gameChosen}Ratio`)}`
            document.getElementById("4player2Image").src = ownstats.get('imageUrl')
            document.getElementById("4player2AdditionalDetails").innerText = `${ownstats.get('hikabrainGamesCount')} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)}`
            document.getElementById("8player2Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player2Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player2Image").src = ownstats.get('imageUrl')
            document.getElementById("16player2Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player2Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player2Image").src = ownstats.get('imageUrl')
            break;


        case playerNumber == 3:
            document.getElementById("4player3Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("4player3Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Points : ${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${ownstats.get(`rounded${gameChosen}Ratio`)}`
            document.getElementById("4player3Image").src = ownstats.get('imageUrl')
            document.getElementById("4player3AdditionalDetails").innerText = `${ownstats.get('hikabrainGamesCount')} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)}`
            document.getElementById("8player3Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player3Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player3Image").src = ownstats.get('imageUrl')
            document.getElementById("16player3Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player3Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player3Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 4:
            document.getElementById("4player4Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("4player4Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Points : ${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${ownstats.get(`rounded${gameChosen}Ratio`)}`
            document.getElementById("4player4Image").src = ownstats.get('imageUrl')
            document.getElementById("4player4AdditionalDetails").innerText = `${ownstats.get('hikabrainGamesCount')} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)}`
            document.getElementById("8player4Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player4Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player4Image").src = ownstats.get('imageUrl')
            document.getElementById("16player4Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player4Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player4Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 5:
            document.getElementById("8player5Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player5Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player5Image").src = ownstats.get('imageUrl')
            document.getElementById("16player5Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player5Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player5Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 6:
            document.getElementById("8player6Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player6Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player6Image").src = ownstats.get('imageUrl')
            document.getElementById("16player6Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player6Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player6Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 7:
            document.getElementById("8player7Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player7Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player7Image").src = ownstats.get('imageUrl')
            document.getElementById("16player7Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player7Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player7Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 8:
            document.getElementById("8player8Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("8player8Stats").innerHTML = `Winrate : ${ownstats.get(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${ownstats.get(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)} games - ${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)} kills / ${ownstats.get(`${gameChosen.toLowerCase()}DeathCount`)} morts`
            document.getElementById("8player8Image").src = ownstats.get('imageUrl')
            document.getElementById("16player8Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player8Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player8Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 9:
            document.getElementById("16player9Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player9Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player9Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 10:
            document.getElementById("16player10Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player10Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player10Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 11:
            document.getElementById("16player11Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player11Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player11Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 12:
            document.getElementById("16player12Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player12Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player12Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 13:
            document.getElementById("16player13Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player13Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player13Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 14:
            document.getElementById("16player14Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player14Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player14Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 15:
            document.getElementById("16player15Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player15Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player15Image").src = ownstats.get('imageUrl')
            break;

        case playerNumber == 16:
            document.getElementById("16player16Username").innerHTML = `${store.get('username')} <font size="-3"> (le ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} à ${time})`
            document.getElementById("16player16Stats").innerHTML = `${ownstats.get(`rounded${gameChosen}Winrate`)}% - ${ownstats.get(`rounded${gameChosen}Ratio`)}r-${ownstats.get(`${gameChosen.toLowerCase()}GamesCount`)}g-${ownstats.get(`${gameChosen.toLowerCase()}KillCount`)}k-${ownstats.get(`${gameChosen.toLowerCase()}PointsCount`)}pts`
            document.getElementById("16player16Image").src = ownstats.get('imageUrl')
            break;

    }
}

exports.reloadOwnStats = async () => {
    reloadOwnStats()
}

exports.navigatePlayer = async () => {
    var playerUsername = sharedVars.playerUsername
    var gameChosen = sharedVars.gameChosen
    var playerNumber = sharedVars.playerNumber

    function errorLog() {
        document.getElementById("error-notification").style.opacity = 1
        document.getElementById("error-notification-text").innerHTML += `Un problème est survenu. Si vous n'avez rien constaté d'anormal, ignorez ce message et redémarrez FuncraftHelper. `
    }

    try {
        // Initialisation des XPath suivant le mode de navigation
        var modeNum = store.get('modeNumber')
        var hikabrainGamesCountXPath = eval(`sharedVars.mode${modeNum}HikabrainGamesCountXPath`)
        var hikabrainVictoryCountXPath = eval(`sharedVars.mode${modeNum}HikabrainVictoryCountXPath`)
        var hikabrainPointsCountXPath = eval(`sharedVars.mode${modeNum}HikabrainPointsCountXPath`)
        var hikabrainGameTimeXPath = eval(`sharedVars.mode${modeNum}HikabrainGameTimeXPath`)
        var hikabrainKillCountXPath = eval(`sharedVars.mode${modeNum}HikabrainKillCountXPath`)
        var hikabrainDeathCountXPath = eval(`sharedVars.mode${modeNum}HikabrainDeathCountXPath`)
        var rushGamesCountXPath = eval(`sharedVars.mode${modeNum}RushGamesCountXPath`)
        var rushVictoryCountXPath = eval(`sharedVars.mode${modeNum}RushVictoryCountXPath`)
        var rushPointsCountXPath = eval(`sharedVars.mode${modeNum}RushPointsCountXPath`)
        var rushGameTimeXPath = eval(`sharedVars.mode${modeNum}RushGameTimeXPath`)
        var rushKillCountXPath = eval(`sharedVars.mode${modeNum}RushKillCountXPath`)
        var rushDeathCountXPath = eval(`sharedVars.mode${modeNum}RushDeathCountXPath`)
        var skywarsGamesCountXPath = eval(`sharedVars.mode${modeNum}SkywarsGamesCountXPath`)
        var skywarsVictoryCountXPath = eval(`sharedVars.mode${modeNum}SkywarsVictoryCountXPath`)
        var skywarsPointsCountXPath = eval(`sharedVars.mode${modeNum}SkywarsPointsCountXPath`)
        var skywarsGameTimeXPath = eval(`sharedVars.mode${modeNum}SkywarsGameTimeXPath`)
        var skywarsKillCountXPath = eval(`sharedVars.mode${modeNum}SkywarsKillCountXPath`)
        var skywarsDeathCountXPath = eval(`sharedVars.mode${modeNum}SkywarsDeathCountXPath`)
        var octogoneGamesCountXPath = eval(`sharedVars.mode${modeNum}OctogoneGamesCountXPath`)
        var octogoneVictoryCountXPath = eval(`sharedVars.mode${modeNum}OctogoneVictoryCountXPath`)
        var octogonePointsCountXPath = eval(`sharedVars.mode${modeNum}OctogonePointsCountXPath`)
        var octogoneGameTimeXPath = eval(`sharedVars.mode${modeNum}OctogoneGameTimeXPath`)
        var octogoneKillCountXPath = eval(`sharedVars.mode${modeNum}OctogoneKillCountXPath`)
        var octogoneDeathCountXPath = eval(`sharedVars.mode${modeNum}OctogoneDeathCountXPath`)
        var blitzGamesCountXPath = eval(`sharedVars.mode${modeNum}BlitzGamesCountXPath`)
        var blitzVictoryCountXPath = eval(`sharedVars.mode${modeNum}BlitzVictoryCountXPath`)
        var blitzPointsCountXPath = eval(`sharedVars.mode${modeNum}BlitzPointsCountXPath`)
        var blitzGameTimeXPath = eval(`sharedVars.mode${modeNum}BlitzGameTimeXPath`)
        var blitzKillCountXPath = eval(`sharedVars.mode${modeNum}BlitzKillCountXPath`)
        var blitzDeathCountXPath = eval(`sharedVars.mode${modeNum}BlitzDeathCountXPath`)
        var shootcraftGamesCountXPath = eval(`sharedVars.mode${modeNum}ShootcraftGamesCountXPath`)
        var shootcraftVictoryCountXPath = eval(`sharedVars.mode${modeNum}ShootcraftVictoryCountXPath`)
        var shootcraftPointsCountXPath = eval(`sharedVars.mode${modeNum}ShootcraftPointsCountXPath`)
        var shootcraftGameTimeXPath = eval(`sharedVars.mode${modeNum}ShootcraftGameTimeXPath`)
        var shootcraftKillCountXPath = eval(`sharedVars.mode${modeNum}ShootcraftKillCountXPath`)
        var shootcraftDeathCountXPath = eval(`sharedVars.mode${modeNum}ShootcraftDeathCountXPath`)


        const browser = await puppeteer.launch({
            headless: store.get('headless'),
            executablePath: store.get('chromeLocation')
        })
        const page = await browser.newPage()
        page.setUserAgent(`FuncraftHelper-${sharedVars.fhVersion}`)

        if (store.get('adblocker')) {
            PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
                blocker.enableBlockingInPage(page)
            })
        }

        await page.goto(`https://www.funcraft.net/fr/joueurs`)
        await page.goto(`https://www.funcraft.net/fr/joueurs?q=${playerUsername}`)

        var element
        const prefix = ['hikabrain', 'rush', 'skywars', 'octogone', 'blitz', 'shootcraft']
        const suffix = [
            ['GamesCount', 'GamesCountXPath'],
            ['VictoryCount', 'VictoryCountXPath'],
            ['PointsCount', 'PointsCountXPath'],
            ['GameTime', 'GameTimeXPath'],
            ['KillCount', 'KillCountXPath'],
            ['DeathCount', 'DeathCountXPath']
        ]
        for (var gameName of prefix) {
            for (var [stat, statXPath] of suffix) {
                await page.waitForXPath(eval(gameName + statXPath)).catch(() => errorLog())
                element = await page.$x(eval(gameName + statXPath))

                var tempVar
                tempVar = await page.evaluate(el => el.textContent, element[0])
                tempVar = tempVar.split(' ').join('')

                eval(`var ${gameName}${stat} = '${tempVar}'`)
            }
        }

        var hikabrainWinrate = (hikabrainVictoryCount / hikabrainGamesCount * 100)
        var roundedHikabrainWinrate = hikabrainWinrate.toFixed(2)
        var rushWinrate = (rushVictoryCount / rushGamesCount * 100)
        var roundedRushWinrate = rushWinrate.toFixed(2)
        var skywarsWinrate = (skywarsVictoryCount / skywarsGamesCount * 100)
        var roundedSkywarsWinrate = skywarsWinrate.toFixed(2)
        var octogoneWinrate = (octogoneVictoryCount / octogoneGamesCount * 100)
        var roundedOctogoneWinrate = octogoneWinrate.toFixed(2)
        var blitzWinrate = (blitzVictoryCount / blitzGamesCount * 100)
        var roundedBlitzWinrate = blitzWinrate.toFixed(2)
        var shootcraftWinrate = (shootcraftVictoryCount / shootcraftGamesCount * 100)
        var roundedShootcraftWinrate = shootcraftWinrate.toFixed(2)
        var hikabrainRatio = hikabrainKillCount / hikabrainDeathCount
        var roundedHikabrainRatio = hikabrainRatio.toFixed(2)
        var rushRatio = rushKillCount / rushDeathCount
        var roundedRushRatio = rushRatio.toFixed(2)
        var skywarsRatio = skywarsKillCount / skywarsDeathCount
        var roundedSkywarsRatio = skywarsRatio.toFixed(2)
        var octogoneRatio = octogoneKillCount / octogoneDeathCount
        var roundedOctogoneRatio = octogoneRatio.toFixed(2)
        var blitzRatio = blitzKillCount / blitzDeathCount
        var roundedBlitzRatio = blitzRatio.toFixed(2)
        var shootcraftRatio = shootcraftKillCount / shootcraftDeathCount
        var roundedShootcraftRatio = shootcraftRatio.toFixed(2)


        await page.waitForXPath(sharedVars.imageXPath).catch()
        var element = await page.$x(sharedVars.imageXPath)
        var image = await page.evaluate(el => el.src, element[0])

        if (playerUsername == store.get('username') && gameChosen != "Shootcraft") {
            ownstats.set('modifiedAt', new Date())
            ownstats.set('username', playerUsername)
            ownstats.set('imageUrl', image)
            ownstats.set('hikabrainGamesCount', hikabrainGamesCount)
            ownstats.set('hikabrainVictoryCount', hikabrainVictoryCount)
            ownstats.set('hikabrainPointsCount', hikabrainPointsCount)
            ownstats.set('hikabrainKillCount', hikabrainKillCount)
            ownstats.set('hikabrainDeathCount', hikabrainDeathCount)
            ownstats.set('hikabrainGameTime', hikabrainGameTime)
            ownstats.set('roundedHikabrainWinrate', roundedHikabrainWinrate)
            ownstats.set('roundedHikabrainRatio', roundedHikabrainRatio)
            ownstats.set('rushGamesCount', rushGamesCount)
            ownstats.set('rushVictoryCount', rushVictoryCount)
            ownstats.set('rushPointsCount', rushPointsCount)
            ownstats.set('rushKillCount', rushKillCount)
            ownstats.set('rushDeathCount', rushDeathCount)
            ownstats.set('rushGameTime', rushGameTime)
            ownstats.set('roundedRushWinrate', roundedRushWinrate)
            ownstats.set('roundedRushRatio', roundedRushRatio)
            ownstats.set('skywarsGamesCount', skywarsGamesCount)
            ownstats.set('skywarsVictoryCount', skywarsVictoryCount)
            ownstats.set('skywarsPointsCount', skywarsPointsCount)
            ownstats.set('skywarsKillCount', skywarsKillCount)
            ownstats.set('skywarsDeathCount', skywarsDeathCount)
            ownstats.set('skywarsGameTime', skywarsGameTime)
            ownstats.set('roundedSkywarsWinrate', roundedSkywarsWinrate)
            ownstats.set('roundedSkywarsRatio', roundedSkywarsRatio)
            ownstats.set('octogoneGamesCount', octogoneGamesCount)
            ownstats.set('octogoneVictoryCount', octogoneVictoryCount)
            ownstats.set('octogonePointsCount', octogonePointsCount)
            ownstats.set('octogoneKillCount', octogoneKillCount)
            ownstats.set('octogoneDeathCount', octogoneDeathCount)
            ownstats.set('octogoneGameTime', octogoneGameTime)
            ownstats.set('roundedOctogoneWinrate', roundedOctogoneWinrate)
            ownstats.set('roundedOctogoneRatio', roundedOctogoneRatio)
            ownstats.set('blitzGamesCount', blitzGamesCount)
            ownstats.set('blitzVictoryCount', blitzVictoryCount)
            ownstats.set('blitzPointsCount', blitzPointsCount)
            ownstats.set('blitzKillCount', blitzKillCount)
            ownstats.set('blitzDeathCount', blitzDeathCount)
            ownstats.set('blitzGameTime', blitzGameTime)
            ownstats.set('roundedBlitzWinrate', roundedBlitzWinrate)
            ownstats.set('roundedBlitzRatio', roundedBlitzRatio)
            ownstats.set('shootcraftGamesCount', shootcraftGamesCount)
            ownstats.set('shootcraftVictoryCount', shootcraftVictoryCount)
            ownstats.set('shootcraftPointsCount', shootcraftPointsCount)
            ownstats.set('shootcraftKillCount', shootcraftKillCount)
            ownstats.set('shootcraftDeathCount', shootcraftDeathCount)
            ownstats.set('shootcraftGameTime', shootcraftGameTime)
            ownstats.set('roundedShootcraftWinrate', roundedShootcraftWinrate)
            ownstats.set('roundedShootcraftRatio', roundedShootcraftRatio)
            reloadOwnStats()
        }


        if (playerNumber != 0) {
            if (isNaN(eval(`rounded${gameChosen}Winrate`))) {
                eval(`rounded${gameChosen}Winrate = 0`)
            }

            if (eval(`${gameChosen.toLowerCase()}GamesCount == "-"`)) {
                eval(`${gameChosen.toLowerCase()}GamesCount = 0`)
            }

            if (eval(`${gameChosen.toLowerCase()}KillCount == "-"`)) {
                eval(`${gameChosen.toLowerCase()}KillCount = 0`)
            }

            if (eval(`${gameChosen.toLowerCase()}DeathCount == "-"`)) {
                eval(`${gameChosen.toLowerCase()}DeathCount = 0`)
            }

            if (eval(`${gameChosen.toLowerCase()}PointsCount == "-"`)) {
                eval(`${gameChosen.toLowerCase()}PointsCount = 0`)
            }

            if (eval(`${gameChosen.toLowerCase()}PointsCount >= 1000`)) {
                eval(`${gameChosen.toLowerCase()}PointsCount = Math.round(${gameChosen.toLowerCase()}PointsCount / 1000)+ "k"`)
            }

            if (isNaN(eval(`rounded${gameChosen}Ratio`))) {
                eval(`rounded${gameChosen}Ratio = 0`)
            }
        }

        var nodeConsole = require('console')
        var myConsole = new nodeConsole.Console(process.stdout, process.stderr)
        myConsole.log(`[DEBUG LOG] ${playerUsername} n${playerNumber} ${sharedVars.gameChosen}`)

        if (!sharedVars.inBenchmark && sharedVars.noState && sharedVars.playerPosition.findIndex(i => i.username === playerUsername) != -1) {

            switch (true) {
                case playerNumber == 1:
                    document.getElementById("2player1Username").innerHTML = playerUsername
                    document.getElementById("4player1Username").innerHTML = playerUsername
                    document.getElementById("8player1Username").innerHTML = playerUsername
                    document.getElementById("16player1Username").innerHTML = playerUsername
                    document.getElementById("2player1Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% en ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games <br> Points : ${eval(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${eval(`rounded${gameChosen}Ratio`)} (${eval(`${gameChosen.toLowerCase()}KillCount`)} kills pour ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts)`
                    document.getElementById("2player1Image").src = image
                    document.getElementById("4player1Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Points : ${eval(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${eval(`rounded${gameChosen}Ratio`)}`
                    document.getElementById("4player1AdditionalDetails").innerText = `${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("4player1Image").src = image
                    document.getElementById("8player1Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player1Image").src = image
                    document.getElementById("16player1Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player1Image").src = image
                    break;

                case playerNumber == 2:
                    document.getElementById("2player2Username").innerHTML = playerUsername
                    document.getElementById("4player2Username").innerHTML = playerUsername
                    document.getElementById("8player2Username").innerHTML = playerUsername
                    document.getElementById("16player2Username").innerHTML = playerUsername
                    document.getElementById("2player2Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% en ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games <br> Points : ${eval(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${eval(`rounded${gameChosen}Ratio`)} (${eval(`${gameChosen.toLowerCase()}KillCount`)} kills pour ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts)`
                    document.getElementById("2player2Image").src = image
                    document.getElementById("4player2Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Points : ${eval(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${eval(`rounded${gameChosen}Ratio`)}`
                    document.getElementById("4player2AdditionalDetails").innerText = `${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("4player2Image").src = image
                    document.getElementById("8player2Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player2Image").src = image
                    document.getElementById("16player2Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player2Image").src = image
                    break;

                case playerNumber == 3:
                    document.getElementById("4player3Username").innerHTML = playerUsername
                    document.getElementById("8player3Username").innerHTML = playerUsername
                    document.getElementById("16player3Username").innerHTML = playerUsername
                    document.getElementById("4player3Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Points : ${eval(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${eval(`rounded${gameChosen}Ratio`)}`
                    document.getElementById("4player3AdditionalDetails").innerText = `${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("4player3Image").src = image
                    document.getElementById("8player3Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player3Image").src = image
                    document.getElementById("16player3Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player3Image").src = image
                    break;

                case playerNumber == 4:
                    document.getElementById("4player4Username").innerHTML = playerUsername
                    document.getElementById("8player4Username").innerHTML = playerUsername
                    document.getElementById("16player4Username").innerHTML = playerUsername
                    document.getElementById("4player4Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Points : ${eval(`${gameChosen.toLowerCase()}PointsCount`)} <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> Ratio : ${eval(`rounded${gameChosen}Ratio`)}`
                    document.getElementById("4player4AdditionalDetails").innerText = `${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("4player4Image").src = image
                    document.getElementById("8player4Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player4Image").src = image
                    document.getElementById("16player4Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player4Image").src = image
                    break;

                case playerNumber == 5:
                    document.getElementById("8player5Username").innerHTML = playerUsername
                    document.getElementById("16player5Username").innerHTML = playerUsername
                    document.getElementById("8player5Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player5Image").src = image
                    document.getElementById("16player5Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player5Image").src = image
                    break;

                case playerNumber == 6:
                    document.getElementById("8player6Username").innerHTML = playerUsername
                    document.getElementById("16player6Username").innerHTML = playerUsername
                    document.getElementById("8player6Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player6Image").src = image
                    document.getElementById("16player6Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player6Image").src = image
                    break;

                case playerNumber == 7:
                    document.getElementById("8player7Username").innerHTML = playerUsername
                    document.getElementById("16player7Username").innerHTML = playerUsername
                    document.getElementById("8player7Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player7Image").src = image
                    document.getElementById("16player7Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player7Image").src = image
                    break;

                case playerNumber == 8:
                    document.getElementById("8player8Username").innerHTML = playerUsername
                    document.getElementById("16player8Username").innerHTML = playerUsername
                    document.getElementById("8player8Stats").innerHTML = `Winrate : ${eval(`rounded${gameChosen}Winrate`)}% <br> Temps de jeu : ${eval(`${gameChosen.toLowerCase()}GameTime`)} <br> <font size=-2> ${eval(`${gameChosen.toLowerCase()}GamesCount`)} games - ${eval(`${gameChosen.toLowerCase()}KillCount`)} kills / ${eval(`${gameChosen.toLowerCase()}DeathCount`)} morts`
                    document.getElementById("8player8Image").src = image
                    document.getElementById("16player8Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player8Image").src = image
                    break;

                case playerNumber == 9:
                    document.getElementById("16player9Username").innerHTML = playerUsername
                    document.getElementById("16player9Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player9Image").src = image
                    break;

                case playerNumber == 10:
                    document.getElementById("16player10Username").innerHTML = playerUsername
                    document.getElementById("16player10Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player10Image").src = image
                    break;

                case playerNumber == 11:
                    document.getElementById("16player11Username").innerHTML = playerUsername
                    document.getElementById("16player11Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player11Image").src = image
                    break;

                case playerNumber == 12:
                    document.getElementById("16player12Username").innerHTML = playerUsername
                    document.getElementById("16player12Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player12Image").src = image
                    break;

                case playerNumber == 13:
                    document.getElementById("16player13Username").innerHTML = playerUsername
                    document.getElementById("16player13Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player13Image").src = image
                    break;

                case playerNumber == 14:
                    document.getElementById("16player14Username").innerHTML = playerUsername
                    document.getElementById("16player14Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player14Image").src = image
                    break;

                case playerNumber == 15:
                    document.getElementById("16player15Username").innerHTML = playerUsername
                    document.getElementById("16player15Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player15Image").src = image
                    break;

                case playerNumber == 16:
                    document.getElementById("16player16Username").innerHTML = playerUsername
                    document.getElementById("16player16Stats").innerHTML = `${eval(`rounded${gameChosen}Winrate`)}% - ${eval(`rounded${gameChosen}Ratio`)}r-${eval(`${gameChosen.toLowerCase()}GamesCount`)}g-${eval(`${gameChosen.toLowerCase()}KillCount`)}k-${eval(`${gameChosen.toLowerCase()}PointsCount`)}pts`
                    document.getElementById("16player16Image").src = image
                    break;
            }
        }
        browser.close()
    } catch (e) {
        document.getElementById("error-notification").style.opacity = 1
        document.getElementById("error-notification-text").innerHTML += `Un problème est survenu. SI l'adblocker est activé, essayez de le désactiver : ${e}\n`
    }
}