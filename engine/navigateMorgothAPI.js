const sharedVars = require('./sharedVars')
const fetch = require("node-fetch");

const Store = require('electron-store');
const store = new Store();

exports.navigateMorgothAPI = async () => {
    var playerUsername = sharedVars.playerUsername

    let url = 'https://lordmorgoth.net/APIs/stats?key=' + store.get('MorgothAPIKey') + '&joueur=' + sharedVars.playerUsername + '&mode=' + sharedVars.gameChosen + '&periode=toujours';

    fetch(url)
        .then(res => res.json())
        .then((json) => {
            var gameTime = Math.round(json.data.temps_jeu / 60)
            if (json.exit_code == 0) {
                document.getElementById("2player2Username").innerHTML = playerUsername
                document.getElementById("2player2Stats").innerHTML = `Winrate : ${json.stats.winrate}% en ${json.data.parties} games <br> Points : ${json.data.points} <br> Temps de jeu : ${gameTime} <br> Ratio : ${json.stats.kd} (${json.data.kills} kills pour ${json.data.morts} morts)`
                document.getElementById("2player2Image").src = json.skin
            } else {
                document.getElementById("error-notification").style.opacity = 1
                document.getElementById("error-notification-text").innerHTML += `\nUne erreur est survenue avec l'API. ${json.error}, code d'erreur ${json.exit_code}`
            }
        })
}