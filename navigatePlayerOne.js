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
    
    
            await page.waitForXPath("/html/body/div[2]/div[2]/div[2]/div/div[1]/div[3]/div[2]/div/div[2]/div[4]/div[2]");
            let element = await page.$x("/html/body/div[2]/div[2]/div[2]/div/div[1]/div[3]/div[2]/div/div[2]/div[4]/div[2]");
            let gamesCount = await page.evaluate(el => el.textContent, element[0])         
            gamesCount = gamesCount.split(' ').join('');
    
            await page.waitForXPath("/html/body/div[2]/div[2]/div[2]/div/div[1]/div[3]/div[2]/div/div[2]/div[5]/div[2]")
            element = await page.$x("/html/body/div[2]/div[2]/div[2]/div/div[1]/div[3]/div[2]/div/div[2]/div[5]/div[2]");
            let victoryCount = await page.evaluate(el => el.textContent, element[0])
            victoryCount = victoryCount.split(' ').join('');
    
            var hikaWinrate = (victoryCount / gamesCount * 100)
            var roundedHikaWinrate = hikaWinrate.toFixed(2);
            console.log("Votre Winrate est de " + roundedHikaWinrate + "%, en " + gamesCount + " parties.")
            browser.close()
    
        } catch(e) {
          console.log(e);
        } 
            


        }

    






  




