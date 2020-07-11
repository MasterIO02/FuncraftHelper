const config = require('./config')
const puppeteer = require('puppeteer');
const renavigatePlayerTwo = require('./restartNavigatePlayerTwo.js').renavigatePlayerTwo


exports.navigatePlayerTwo = async () => {
        try {
    config.exited = false
    const getLastLine = require('./readlastline.js').getLastLine
    const logFileLocation = (config.logFileLocation)
    var lastLogLine = ''

    let waitForGameStartStop = setInterval(function(){ waitForGameStart() }, 10);
    async function waitForGameStart() {
        getLastLine(logFileLocation, 1)
        .then((lastLine) => lastLogLine = lastLine)
        /*if(lastLogLine.includes("s'est déconnecté")) {
            console.log(config.secondPlayerUname + " s'est déconnecté. Attente d'un nouveau joueur.")
            stopWaitingForGameStart();
            renavigatePlayerTwo()
        } */

        if(lastLogLine.includes("Vous avez quitt")) {
            stopWaitingForGameStart()
        } else if(lastLogLine.includes("downloading terrain")) {
            if(config.exited == true) {
                stopWaitingForGameStart()
            } else {
                const checkGamemode = require('./checkGame.js').checkGamemode
                stopWaitingForGameStart()
                checkGamemode()
            }
        }
            
         
    }
    async function stopWaitingForGameStart() {
        clearInterval(waitForGameStartStop);
    }

            if(config.showPercent == true) {console.log("0%")}
            const browser = await puppeteer.launch({ headless: config.headless });
            const page = await browser.newPage();
            page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
      
            await page.goto('https://www.funcraft.net/fr/joueurs')
            if(config.showPercent == true) {console.log("20%")}
            const [usernameTextBox] = await page.$x('//*[@id="main-layout"]/div[2]/div[1]/div[2]/div/form/div/input')
            await usernameTextBox.type(config.secondPlayerUname)
            await page.keyboard.press('Enter')
            if(config.showPercent == true) {console.log("60%")}

            if(config.gameChosen == "Hika1v1") {
                await page.waitForXPath(config.hikabrainGamesCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
                var element = await page.$x(config.hikabrainGamesCountXPath)
            } else if(config.gameChosen == "RushFast1v1") {
                await page.waitForXPath(config.rushGamesCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
                var element = await page.$x(config.rushGamesCountXPath)
            }
            let gamesCount = await page.evaluate(el => el.textContent, element[0])
            gamesCount = gamesCount.split(' ').join('')
            if(config.showPercent == true) {console.log("80%")}

            if(config.gameChosen == "Hika1v1") {
                await page.waitForXPath(config.hikabrainVictoryCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
                element = await page.$x(config.hikabrainVictoryCountXPath)
            } else if(config.gameChosen == "RushFast1v1") {
                await page.waitForXPath(config.rushVictoryCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
                element = await page.$x(config.rushVictoryCountXPath)
            }
            let victoryCount = await page.evaluate(el => el.textContent, element[0])
            victoryCount = victoryCount.split(' ').join('')
            if(config.showPercent == true) {console.log("100%")}
            
            var Winrate = (victoryCount / gamesCount * 100)
            var roundedWinrate = Winrate.toFixed(2);


            let gameSelected = ''
            if(config.gameChosen == 'Hika1v1') {
                gameSelected = 'Hikabrain'
            } else if(config.gameChosen == 'RushFast1v1') {
                gameSelected = 'Rush'
            }
            console.log("Le Winrate en " + gameSelected + " de " + config.secondPlayerUname + " est de " + roundedWinrate + "%, en " + gamesCount + " parties.")
            

            if(gamesCount == "-") {
                console.log("Ce joueur est TRES PROBABLEMENT EN /nick !!! Faites attention !")
            }
            browser.close()
            config.secondPlayerFinished = true

        } catch(e) {
          console.log(e);
        }
}
    

        



  




