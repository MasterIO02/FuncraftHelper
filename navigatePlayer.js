const sharedVars = require('./sharedVars.js')
const puppeteer = require('puppeteer-core');
var textarea = document.getElementById('mainTextArea');
const Store = require('electron-store');
const { checkGamemode } = require('./checkGame.js');
const { stopFindUname } = require('./checkGame.js');

const store = new Store();



exports.navigatePlayer = async () => {

    var playerUsername = sharedVars.playerUsername

    function errorLog() {
        document.getElementById("mainTextArea").value += "Un problème est survenu. Le joueur n'existe peut être pas, ou alors un problème avec les XPath est survenu.\n"
        textarea.scrollTop = textarea.scrollHeight;
    }

    try {
        // Initialisation des XPath suivant le système
        if(store.get('systemType') == "linux") {
            var hikabrainGamesCountXPath = sharedVars.linuxHikabrainGamesCountXPath
            var rushGamesCountXPath = sharedVars.linuxRushGamesCountXPath
            var hikabrainVictoryCountXPath = sharedVars.linuxHikabrainVictoryCountXPath
            var rushVictoryCountXPath = sharedVars.linuxRushVictoryCountXPath
        } else if(store.get('systemType') == "win32") {
            var hikabrainGamesCountXPath = sharedVars.winHikabrainGamesCountXPath
            var rushGamesCountXPath = sharedVars.winRushGamesCountXPath
            var hikabrainVictoryCountXPath = sharedVars.winHikabrainVictoryCountXPath
            var rushVictoryCountXPath = sharedVars.winRushVictoryCountXPath
        }

        sharedVars.exited = false

        const browser = await puppeteer.launch({ headless: store.get('headless'), executablePath: store.get('chromeLocation') });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0')

        await page.goto('https://www.funcraft.net/fr/joueurs')
        const [usernameTextBox] = await page.$x('//*[@id="main-layout"]/div[2]/div[1]/div[2]/div/form/div/input')
        await usernameTextBox.type(playerUsername)
        await page.keyboard.press('Enter')

        if (sharedVars.gameChosen == "Hikabrain") {
            await page.waitForXPath(hikabrainGamesCountXPath).catch(() => errorLog())
            var element = await page.$x(hikabrainGamesCountXPath)
        } else if (sharedVars.gameChosen == "Rush") {
            await page.waitForXPath(rushGamesCountXPath).catch(() => errorLog())
            var element = await page.$x(rushGamesCountXPath)
        }
        let gamesCount = await page.evaluate(el => el.textContent, element[0])
        gamesCount = gamesCount.split(' ').join('')

        if (sharedVars.gameChosen == "Hikabrain") {
            await page.waitForXPath(hikabrainVictoryCountXPath).catch(() => errorLog())
            element = await page.$x(hikabrainVictoryCountXPath)
        } else if (sharedVars.gameChosen == "Rush") {
            await page.waitForXPath(rushVictoryCountXPath).catch(() => errorLog())
            element = await page.$x(rushVictoryCountXPath)
        }
        let victoryCount = await page.evaluate(el => el.textContent, element[0])
        victoryCount = victoryCount.split(' ').join('')

        var Winrate = (victoryCount / gamesCount * 100)
        var roundedWinrate = Winrate.toFixed(2);

        // Initialisation du mot du mode de jeu pour la phrase des stats


        document.getElementById("mainTextArea").value += "Le Winrate en " + sharedVars.gameChosen + " de " + playerUsername + " est de " + roundedWinrate + "%, en " + gamesCount + " parties.\n"
        textarea.scrollTop = textarea.scrollHeight;

        browser.close()

        if(sharedVars.gameType == "single") {
            if(sharedVars.checkingGamemode == false) {
                checkGamemode()
            }
            document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
            textarea.scrollTop = textarea.scrollHeight;  
        } else if(sharedVars.playerFourFound == true && sharedVars.gameNumber == 4) {
            if(sharedVars.checkingGamemode == false) {
                checkGamemode()
            }
        }
    } catch (e) {
        document.getElementById("mainTextArea").value += (e) + "\n";
    }
}










