const sharedVars = require('./sharedVars.js')
const puppeteer = require('puppeteer-core');
const { PuppeteerBlocker } = require('@cliqz/adblocker-puppeteer')
const fetch = require('cross-fetch')
var textarea = document.getElementById('mainTextArea');
const Store = require('electron-store');
const { checkGamemode } = require('./checkGame.js');
const store = new Store();



exports.navigatePlayer = async () => {

    var playerUsername = sharedVars.playerUsername
    var playerNumber = sharedVars.playerNumber

    function errorLog() {
        document.getElementById("mainTextArea").value += "Un problème est survenu. Changez le mode de navigation dans les paramètres.\n"
        textarea.scrollTop = textarea.scrollHeight;
    }

    try {
        // Initialisation des XPath suivant le système
        if (store.get('modeNumber') == "1") {
            var hikabrainGamesCountXPath = sharedVars.mode1HikabrainGamesCountXPath
            var rushGamesCountXPath = sharedVars.mode1RushGamesCountXPath
            var hikabrainVictoryCountXPath = sharedVars.mode1HikabrainVictoryCountXPath
            var rushVictoryCountXPath = sharedVars.mode1RushVictoryCountXPath
            var skywarsGamesCountXPath = sharedVars.mode1SkywarsGamesCountXPath
            var skywarsVictoryCountXPath = sharedVars.mode1SkywarsVictoryCountXPath
        } else if (store.get('modeNumber') == "2") {
            var hikabrainGamesCountXPath = sharedVars.mode2HikabrainGamesCountXPath
            var rushGamesCountXPath = sharedVars.mode2RushGamesCountXPath
            var hikabrainVictoryCountXPath = sharedVars.mode2HikabrainVictoryCountXPath
            var rushVictoryCountXPath = sharedVars.mode2RushVictoryCountXPath
            var skywarsGamesCountXPath = sharedVars.mode2SkywarsGamesCountXPath
            var skywarsVictoryCountXPath = sharedVars.mode2SkywarsVictoryCountXPath
        }

        sharedVars.exited = false

        const browser = await puppeteer.launch({ headless: store.get('headless'), executablePath: store.get('chromeLocation') })
        const page = await browser.newPage()
        page.setUserAgent('FuncraftHelper-2.1.3')

        if (store.get('adblocker') == true) {
            PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
                blocker.enableBlockingInPage(page)
            });
        }

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
        } else if (sharedVars.gameChosen == "Skywars") {
            await page.waitForXPath(skywarsGamesCountXPath).catch(() => errorLog())
            var element = await page.$x(skywarsGamesCountXPath)
        }

        let gamesCount = await page.evaluate(el => el.textContent, element[0])
        gamesCount = gamesCount.split(' ').join('')

        if (sharedVars.gameChosen == "Hikabrain") {
            await page.waitForXPath(hikabrainVictoryCountXPath).catch(() => errorLog())
            element = await page.$x(hikabrainVictoryCountXPath)
        } else if (sharedVars.gameChosen == "Rush") {
            await page.waitForXPath(rushVictoryCountXPath).catch(() => errorLog())
            element = await page.$x(rushVictoryCountXPath)
        } else if (sharedVars.gameChosen == "Skywars") {
            await page.waitForXPath(skywarsVictoryCountXPath).catch(() => errorLog())
            var element = await page.$x(skywarsVictoryCountXPath)
        }

        let victoryCount = await page.evaluate(el => el.textContent, element[0])
        victoryCount = victoryCount.split(' ').join('')

        var Winrate = (victoryCount / gamesCount * 100)
        var roundedWinrate = Winrate.toFixed(2);

        if (sharedVars.inBenchmark == false) {
            document.getElementById("mainTextArea").value += "(" + playerNumber + "/" + sharedVars.gameNumber + ") Le Winrate en " + sharedVars.gameChosen + " de " + playerUsername + " est de " + roundedWinrate + "%, en " + gamesCount + " parties.\n"
            textarea.scrollTop = textarea.scrollHeight;
        }

        browser.close()

        if (sharedVars.gameType == "single") {
            if (sharedVars.checkingGamemode == false) {
                checkGamemode()
            }
            document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
            textarea.scrollTop = textarea.scrollHeight;
        } else if (sharedVars.playerFourFound == true && sharedVars.gameNumber == 4) {
            if (sharedVars.checkingGamemode == false) {
                checkGamemode()
            }
        }
        else if (sharedVars.playerEightFound == true && sharedVars.gameNumber == 8) {
            if (sharedVars.checkingGamemode == false) {
                checkGamemode()
            }
        } else if (sharedVars.playerTwelveFound == true && sharedVars.gameNumber == 12) {
            if (sharedVars.checkingGamemode == false) {
                checkGamemode()
            }
        } else if (sharedVars.playerSixteenFound == true && sharedVars.gameNumber == 16) {
            if (sharedVars.checkingGamemode == false) {
                checkGamemode()
            }
        }

    } catch (e) {
        document.getElementById("mainTextArea").value += (e) + "\n";
    }
}