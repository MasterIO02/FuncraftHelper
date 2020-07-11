const config = require('./config')
const puppeteer = require('puppeteer');


exports.navigatePlayerOne = async () => {

        try {
            const browser = await puppeteer.launch({ headless: config.headless });
            const page = await browser.newPage();
            page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
      
            await page.goto('https://www.funcraft.net/fr/joueurs')
    
            const [usernameTextBox] = await page.$x('//*[@id="main-layout"]/div[2]/div[1]/div[2]/div/form/div/input')
            await usernameTextBox.type(config.username)
            await page.keyboard.press('Enter')
    
    
            if(config.gameChosen == "Hika1v1") {
              await page.waitForXPath(config.hikabrainGamesCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
              var element = await page.$x(config.hikabrainGamesCountXPath)
            } else if(config.gameChosen == "RushFast1v1") {
              await page.waitForXPath(config.rushGamesCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
              var element = await page.$x(config.rushGamesCountXPath)
            }

            let gamesCount = await page.evaluate(el => el.textContent, element[0])         
            gamesCount = gamesCount.split(' ').join('');
    
            if(config.gameChosen == "Hika1v1") {
              await page.waitForXPath(config.hikabrainVictoryCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
              element = await page.$x(config.hikabrainVictoryCountXPath)
            } else if(config.gameChosen == "RushFast1v1") {
               await page.waitForXPath(config.rushVictoryCountXPath).catch(() => console.log("Un problème est survenu. Soit le XPath n'est plus valide, soit un problème avec Chrome s'est produit."))
               element = await page.$x(config.rushVictoryCountXPath)
            }

            let victoryCount = await page.evaluate(el => el.textContent, element[0])
            victoryCount = victoryCount.split(' ').join('');
    
            var winrate = (victoryCount / gamesCount * 100)
            var roundedWinrate = winrate.hikaWinrate.toFixed(2);

            let gameSelected = ''
            if(config.gameChosen == 'Hika1v1') {
                gameSelected = 'Hikabrain'
            } else if(config.gameChosen == 'RushFast1v1') {
                gameSelected = 'Rush'
            }
            console.log("Le Winrate en " + gameSelected + " de " + config.secondPlayerUname + " est de " + roundedWinrate + "%, en " + gamesCount + " parties.")

            browser.close()
    
        } catch(e) {
          console.log(e);
        } 
            


        }

    






  




