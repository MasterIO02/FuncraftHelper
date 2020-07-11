const config = require('./config')
const fetch = require("node-fetch");

exports.navigateMorgothAPI = async () => {
    
    let gameSelected = ''
    if(config.gameChosen == 'Hika1v1') {
        gameSelected = 'Hikabrain'
    } else if(config.gameChosen == 'RushFast1v1') {
        gameSelected = 'Rush'
    }

    let url = 'https://lordmorgoth.net/APIs/stats?key=' + config.MorgothAPIKey + '&joueur=' + config.secondPlayerUname + '&mode=' + gameSelected + '&periode=toujours';

    fetch(url)
    .then(res => res.json())
    .then((json) => {
        console.log("Le Winrate en " + gameSelected + " de " + config.secondPlayerUname + " est de " + json.stats.winrate + "%, en " + json.data.parties + " parties.")
    })
    
}