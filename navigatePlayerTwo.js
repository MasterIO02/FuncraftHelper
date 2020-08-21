const sharedVars = require('./sharedVars.js')
const puppeteer = require('puppeteer-core');
var textarea = document.getElementById('mainTextArea');
const Store = require('electron-store');
const { checkGamemode } = require('./checkGame.js');
const store = new Store();



exports.navigatePlayerTwo = async () => {

    var playerUsername = sharedVars.playerUsername

    function errorLog() {
        document.getElementById("mainTextArea").value += "Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec le navigateur s'est produit.\n"
        textarea.scrollTop = textarea.scrollHeight;
    }

    try {
        sharedVars.exited = false

        const browser = await puppeteer.launch({ headless: store.get('headless'), executablePath: store.get('chromeLocation') });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0')

        await page.goto('https://www.funcraft.net/fr/joueurs')
        const [usernameTextBox] = await page.$x('//*[@id="main-layout"]/div[2]/div[1]/div[2]/div/form/div/input')
        await usernameTextBox.type(playerUsername)
        await page.keyboard.press('Enter')

        if (sharedVars.gameChosen == "Hika1v1") {
            await page.waitForXPath(sharedVars.hikabrainGamesCountXPath).catch(() => errorLog())
            var element = await page.$x(sharedVars.hikabrainGamesCountXPath)
        } else if (sharedVars.gameChosen == "RushFast1v1") {
            await page.waitForXPath(sharedVars.rushGamesCountXPath).catch(() => errorLog())
            var element = await page.$x(sharedVars.rushGamesCountXPath)
        }
        let gamesCount = await page.evaluate(el => el.textContent, element[0])
        gamesCount = gamesCount.split(' ').join('')

        if (sharedVars.gameChosen == "Hika1v1") {
            await page.waitForXPath(sharedVars.hikabrainVictoryCountXPath).catch(() => errorLog())
            element = await page.$x(sharedVars.hikabrainVictoryCountXPath)
        } else if (sharedVars.gameChosen == "RushFast1v1") {
            await page.waitForXPath(sharedVars.rushVictoryCountXPath).catch(() => errorLog())
            element = await page.$x(sharedVars.rushVictoryCountXPath)
        }
        let victoryCount = await page.evaluate(el => el.textContent, element[0])
        victoryCount = victoryCount.split(' ').join('')

        var Winrate = (victoryCount / gamesCount * 100)
        var roundedWinrate = Winrate.toFixed(2);

        // Initialisation du mot du mode de jeu pour la phrase des stats
        let gameSelected = ''
        if (sharedVars.gameChosen == 'Hika1v1') {
            gameSelected = 'Hikabrain'
        } else if (sharedVars.gameChosen == 'RushFast1v1') {
            gameSelected = 'Rush'
        }


        document.getElementById("mainTextArea").value += "Le Winrate en " + gameSelected + " de " + playerUsername + " est de " + roundedWinrate + "%, en " + gamesCount + " parties.\n"
        textarea.scrollTop = textarea.scrollHeight;

        if (gamesCount == "-") {
            document.getElementById("mainTextArea").value += "Ce joueur est TRES PROBABLEMENT EN /nick !!! Faites attention !\n"
            textarea.scrollTop = textarea.scrollHeight;
        }
        browser.close()
        checkGamemode()
        document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
        textarea.scrollTop = textarea.scrollHeight;  
    } catch (e) {
        document.getElementById("mainTextArea").value += (e) + "\n";
    }
}










