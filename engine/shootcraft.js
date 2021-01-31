const sharedVars = require('./sharedVars')
const navigatePlayer = require('./navigatePlayer').navigatePlayer
const resetUi = require('./checkGame').resetUi


exports.checkLineShootcraft = async (line) => {
        switch (true) {
            case line.includes("Vous avez quitt"):
                sharedVars.playerPosition = []
                sharedVars.playerCount = 0
                resetUi()
                break;

            case line.includes("été tué par"):
                const firstPlayerRegex = new RegExp(/\w+(?=\s+a)/g)
                const secondPlayerRegex = new RegExp(/(?<=\bpar\s)(\w+)/g)

                async function playerOne() {
                    var playerName = firstPlayerRegex.exec(line)[0]
                    if (sharedVars.playerPosition.findIndex(i => i.username === playerName) == -1) {
                        sharedVars.playerCount++
                        sharedVars.playerNumber = sharedVars.playerCount
                        sharedVars.playerUsername = playerName
                        sharedVars.playerPosition.push({
                            username: playerName,
                            position: sharedVars.playerNumber
                          })
                        navigatePlayer()
                    }
                }

                async function playerTwo() {
                    var secondPlayerName = secondPlayerRegex.exec(line)[0]
                    if (sharedVars.playerPosition.findIndex(i => i.username === secondPlayerName) == -1) {
                        sharedVars.playerCount++
                        sharedVars.playerNumber = sharedVars.playerCount
                        sharedVars.playerUsername = secondPlayerName
                        sharedVars.playerPosition.push({
                            username: secondPlayerName,
                            position: sharedVars.playerNumber
                          })
                        navigatePlayer()
                    }
                }
                await playerOne()
                await playerTwo()
                break;

            /*case line.includes("Classement"):
                sharedVars.playerPosition = []
                sharedVars.playerCount = 0
                resetUi()
                break;*/

    }
}
