const sharedVars = require('./sharedVars')
const fetch = require("node-fetch");
const checkGamemode = require('./checkGame').checkGamemode
var textarea = document.getElementById('mainTextArea');

const Store = require('electron-store');
const store = new Store();

exports.navigateMorgothAPI = async () => {
    var playerNumber = sharedVars.playerNumber

    let url = 'https://lordmorgoth.net/APIs/stats?key=' + store.get('MorgothAPIKey') + '&joueur=' + sharedVars.playerUsername + '&mode=' + sharedVars.gameChosen + '&periode=toujours';

    fetch(url)
        .then(res => res.json())
        .then((json) => {
            if (json.exit_code == 0) {
                document.getElementById("mainTextArea").value += "(" + playerNumber + "/" + sharedVars.gameNumber + ") Le Winrate en " + sharedVars.gameChosen + " de " + sharedVars.playerUsername + " est de " + json.stats.winrate + "%, en " + json.data.parties + " parties.\n"
                textarea.scrollTop = textarea.scrollHeight;
                checkGamemode()
            }
            else {
                document.getElementById("mainTextArea").value += "Une erreur est survenue. " + json.error + " Code d'erreur " + json.exit_code + "\n"
                textarea.scrollTop = textarea.scrollHeight;
                checkGamemode()
            }
            document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
            textarea.scrollTop = textarea.scrollHeight;


        })
}