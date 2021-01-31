const Store = require('electron-store')
const store = new Store()
const sharedVars = require('./sharedVars')
const logFileLocation = (store.get('logFileLocation'))
const navigatePlayer = require('./navigatePlayer').navigatePlayer
const reloadOwnStats = require('./navigatePlayer').reloadOwnStats
const navigateMorgothAPI = require('./navigateMorgothAPI').navigateMorgothAPI
const fs = require("fs")
const md5 = require('md5')
var nodeConsole = require('console')
var myConsole = new nodeConsole.Console(process.stdout, process.stderr)
const readLastLines = require('read-last-lines');
const regexConnectedPlayerName = new RegExp('[^+]*$')
const regexDisconnectedPlayerName = new RegExp('[^-]*$')
var line1, line2, line3, line1old, line2old, line3old, lastLogLine
const checkLineShootcraft = require('./shootcraft').checkLineShootcraft

exports.logFileWatcher = async () => {
  logFileWatcher()
}

function logFileWatcher() {
  store.set('rpStatus', 'Attente du mode de jeu')
  document.getElementById("state").innerHTML = `Attente du choix de mode de jeu`

  let md5Previous = null
  try {
    fs.watchFile(logFileLocation, {
      interval: 1
    }, (event, filename) => {
      if (filename) {
        const md5Current = md5(fs.readFileSync(logFileLocation))
        if (md5Current === md5Previous) {
          return;
        }
        md5Previous = md5Current
        getLines()
      }
    })
  } catch (e) {
    document.getElementById('state').innerHTML = "Lancez FuncraftHelper après avoir lancé Minecraft."
    document.getElementById("error-notification").style.opacity = 1
    document.getElementById("error-notification-text").innerHTML += `Un problème est survenu : lancez FuncraftHelper après Minecraft - ${e}`
  }
}

function splitLines(t) {
  return t.split(/\r\n|\r|\n/);
}

async function getLines() {
  await readLastLines.read(logFileLocation, 3)
    .then((lines) => lastLogLine = lines);

  var lastLogLinesArray = splitLines(lastLogLine)
  line1 = lastLogLinesArray[0]
  line2 = lastLogLinesArray[1]
  line3 = lastLogLinesArray[2]

  if (line1 != line1old && line1 != line2old && line1 != line3old) {
    checkLine(line1)
    if(sharedVars.gameChosen == "Shootcraft") {
      checkLineShootcraft(line1)
    }
  }
  if (line2 != line1old && line2 != line2old && line2 != line3old) {
    checkLine(line2)
    if(sharedVars.gameChosen == "Shootcraft") {
      checkLineShootcraft(line2)
    }
  }
  if (line3 != line1old && line3 != line2old && line3 != line3old) {
    checkLine(line3)
    if(sharedVars.gameChosen == "Shootcraft") {
      checkLineShootcraft(line3)
    }
  }

  line1old = line1
  line2old = line2
  line3old = line3
}

function launchNavigation() {
  sharedVars.playerUsername = playerName
  sharedVars.playerPosition.push({
    username: playerName,
    position: sharedVars.playerNumber
  })
  myConsole.log(sharedVars.playerPosition)
  navigatePlayer()
}


async function checkLine(line) {
  console.log(line)
  switch (true) {
    case line.includes("Vous avez quitt"):
      document.getElementById("state").style.visibility = "visible"
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = ""
      sharedVars.noState = false
      sharedVars.playerCount = 0
      break;

    case line.includes("rejoignez hikabrain10#2x1") || line.includes("file HikaBrain - 1v1"):
      sharedVars.gameChosen = "Hikabrain"
      sharedVars.gameType = "single"
      sharedVars.gameNumber = 2
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Hikabrain 1v1')
      document.getElementById("2player1Username").innerHTML = store.get('username')
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("twoPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Hikabrain (1v1)"
      if (store.get('ownStatsSearchFrequency') == "1") {
        sharedVars.playerNumber = 1
        sharedVars.playerUsername = store.get('username')
        navigatePlayer()
      } else {
        sharedVars.playerNumber = 1
        reloadOwnStats()
      }
      break;

    case line.includes("rejoignez rushFASTMDTPAC10#2x1") || line.includes("file Rush FAST-MDT ᛫ 1v1"):
      sharedVars.gameChosen = "Rush"
      sharedVars.gameType = "single"
      sharedVars.gameNumber = 2
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Rush 1v1')
      document.getElementById("2player1Username").innerHTML = store.get('username')
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("twoPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Rush (1v1)"
      if (store.get('ownStatsSearchFrequency') == "1") {
        sharedVars.playerNumber = 1
        sharedVars.playerUsername = store.get('username')
        navigatePlayer()
      } else {
        sharedVars.playerNumber = 1
        reloadOwnStats()
      }
      break;

    case line.includes("rejoignez hikabrain5#2x2") || line.includes("file HikaBrain - 2v2"):
      sharedVars.gameChosen = "Hikabrain"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 4
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Hikabrain 2v2')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Hikabrain (2v2)"
      break;

    case line.includes("rejoignez rushFASTMDT4#2x2") || line.includes("rejoignez rushMDT2x2") || line.includes("file Rush FAST-MDT ᛫ 2v2") || line.includes("file Rush MDT ᛫ 2v2"):
      sharedVars.gameChosen = "Rush"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 4
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Rush 2v2')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Rush (2v2)"
      break;

    case line.includes("rejoignez hikabrain2x4") || line.includes("file HikaBrain - 4v4"):
      sharedVars.gameChosen = "Hikabrain"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 8
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Hikabrain 4v4')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Hikabrain (4v4)"
      break;

    case line.includes("rejoignez rushFASTMDT2x4") || line.includes("rejoignez rushMDT2x4") || line.includes("file Rush FAST-MDT ᛫ 4v4") || line.includes("file Rush MDT ᛫ 4v4"):
      sharedVars.gameChosen = "Rush"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 8
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Rush 4v4')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Rush (4v4)"
      break;

    case line.includes("rejoignez skywars12") || line.includes("file SkyWars Solo"):
      sharedVars.gameChosen = "Skywars"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 12
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Skywars Solo')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Skywars (solo)"
      break;

    case line.includes("skywars8x2") || line.includes("file SkyWars 8eq x 2j"):
      sharedVars.gameChosen = "Skywars"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 16
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Skywars Duos')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Skywars (duos)"
      break;

    case line.includes("rejoignez mmaPAC16") || line.includes("file Octogone Solo"):
      sharedVars.gameChosen = "Octogone"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 16
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Octogone')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Octogone"
      break;



    case line.includes("rejoignez blitz2x2") || line.includes("file Blitz 2v2"):
      sharedVars.gameChosen = "Blitz"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 4
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Blitz 2v2')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Blitz (2v2)"
      break;

    case line.includes("rejoignez blitz2x4") || line.includes("file Blitz 4v4"):
      sharedVars.gameChosen = "Blitz"
      sharedVars.gameType = "multiple"
      sharedVars.gameNumber = 8
      sharedVars.noState = true
      sharedVars.playerPosition = []
      resetUi()
      store.set('rpStatus', 'Blitz 4v4')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Blitz (4v4)"
      break;

    case line.includes("rejoignez shootcraft10") || line.includes("file ShootCraft Solo"):
      sharedVars.gameChosen = "Shootcraft"
      sharedVars.gameType = "multiple"
      sharedVars.noState = true
      sharedVars.playerPosition = []
      sharedVars.playerCount = 0
      resetUi()
      store.set('rpStatus', 'Shootcraft')
      document.getElementById("twoPlayersLayout").style.visibility = "hidden"
      document.getElementById("fourPlayersLayout").style.visibility = "hidden"
      document.getElementById("eightPlayersLayout").style.visibility = "hidden"
      document.getElementById("sixteenPlayersLayout").style.visibility = "visible"
      document.getElementById("uiLayout").style.opacity = 1
      document.getElementById("state").style.visibility = "hidden"
      document.getElementById("gameName").innerHTML = "Jeu : Shootcraft"
      break;

      /*-----------------------------------
       *  Check player join/left
       *---------------------------------*/

    case line.includes("(1/"):
      if (line.includes("déconnecté")) {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(2/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          document.getElementById("2player2Username").innerHTML = playerName
          document.getElementById("4player2Username").innerHTML = playerName
          document.getElementById("8player2Username").innerHTML = playerName
          document.getElementById("16player2Username").innerHTML = playerName
          document.getElementById("2player2Stats").innerHTML = "En cours..."
          document.getElementById("4player2Stats").innerHTML = "En cours..."
          document.getElementById("8player2Stats").innerHTML = "En cours..."
          document.getElementById("16player2Stats").innerHTML = "En cours..."
          sharedVars.playerOneShouldBeMe = true
          reloadOwnStats()
          if (store.get('ownStatsSearchFrequency') == "1") {
            sharedVars.playerUsername = store.get('username')
            navigatePlayer()
          }
          sharedVars.playerNumber = 2
          sharedVars.playerUsername = playerName
          sharedVars.playerPosition.push({
            username: playerName,
            position: sharedVars.playerNumber
          })
          console.log(sharedVars.playerPosition)

          if (store.get('useMorgothAPI') && sharedVars.gameNumber == 2) {
            navigateMorgothAPI()
          } else {
            navigatePlayer()
          }
        } else if (sharedVars.gameNumber == 2) {
          ownPlayerConnected()
        } else if (sharedVars.playerPosition.indexOf(store.get('username')) == -1) {
          myConsole.log(sharedVars.playerPosition.indexOf(store.get('username')))
          if (store.get('ownStatsSearchFrequency') == "1") {
            sharedVars.playerUsername = store.get('username')
            navigatePlayer()
          }
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 2
          })
          sharedVars.playerNumber = 2
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;



    case line.includes("(3/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player3Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                eval(`document.getElementById("8player${i}Username").innerHTML = playerName`)
                eval(`document.getElementById("4player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 3
            document.getElementById("16player3Username").innerHTML = playerName
            document.getElementById("8player3Username").innerHTML = playerName
            document.getElementById("4player3Username").innerHTML = playerName
            document.getElementById("4player3Stats").innerHTML = "En cours..."
            document.getElementById("8player3Stats").innerHTML = "En cours..."
            document.getElementById("16player3Stats").innerHTML = "En cours..."
            launchNavigation()
          }

        } else {
          sharedVars.playerNumber = 3
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 3
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(4/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player4Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                eval(`document.getElementById("8player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 4
            document.getElementById("16player4Username").innerHTML = playerName
            document.getElementById("8player4Username").innerHTML = playerName
            document.getElementById("4player4Username").innerHTML = playerName
            document.getElementById("4player4Stats").innerHTML = "En cours..."
            document.getElementById("8player4Stats").innerHTML = "En cours..."
            document.getElementById("16player4Stats").innerHTML = "En cours..."
            launchNavigation()
          }

        } else {
          sharedVars.playerNumber = 4
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 4
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(5/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player5Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                eval(`document.getElementById("8player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 5
            document.getElementById("16player5Username").innerHTML = playerName
            document.getElementById("8player5Username").innerHTML = playerName
            document.getElementById("8player5Stats").innerHTML = "En cours..."
            document.getElementById("16player5Stats").innerHTML = "En cours..."

            launchNavigation()
          }

        } else {
          sharedVars.playerNumber = 5
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 5
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(6/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player6Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                eval(`document.getElementById("8player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 6
            document.getElementById("16player6Username").innerHTML = playerName
            document.getElementById("8player6Username").innerHTML = playerName
            document.getElementById("8player6Stats").innerHTML = "En cours..."
            document.getElementById("16player6Stats").innerHTML = "En cours..."

            launchNavigation()
          }

        } else {
          sharedVars.playerNumber = 6
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 6
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(7/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player7Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                eval(`document.getElementById("8player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 7
            document.getElementById("16player7Username").innerHTML = playerName
            document.getElementById("8player7Username").innerHTML = playerName
            document.getElementById("8player7Stats").innerHTML = "En cours..."
            document.getElementById("16player7Stats").innerHTML = "En cours..."
            launchNavigation()
          }

        } else {
          sharedVars.playerNumber = 7
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 7
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(8/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player8Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                eval(`document.getElementById("8player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 8
            document.getElementById("16player8Username").innerHTML = playerName
            document.getElementById("8player8Username").innerHTML = playerName
            document.getElementById("8player8Stats").innerHTML = "En cours..."
            document.getElementById("16player8Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 8
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 8
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(9/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player9Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 9
            document.getElementById("16player9Username").innerHTML = playerName
            document.getElementById("16player9Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 9
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 9
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(10/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player10Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 10
            document.getElementById("16player10Username").innerHTML = playerName
            document.getElementById("16player10Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 10
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 10
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(11/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player11Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 11
            document.getElementById("16player11Username").innerHTML = playerName
            document.getElementById("16player11Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 11
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 11
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(12/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player12Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 12
            document.getElementById("16player12Username").innerHTML = playerName
            document.getElementById("16player12Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 12
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 12
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(13/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player13Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 13
            document.getElementById("16player13Username").innerHTML = playerName
            document.getElementById("16player13Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 13
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 13
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(14/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player14Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 14
            document.getElementById("16player14Username").innerHTML = playerName
            document.getElementById("16player14Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 14
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 14
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(15/"):
      if (!line.includes("déconnecté")) {
        playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        if (playerName != store.get('username') && !playerName.includes("[")) {
          if (document.getElementById("16player15Stats").innerHTML != "Non trouvé") {
            for (let i = 1; i < 16; i++) {
              if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
                console.log(`for stopped at ${i}`)
                sharedVars.playerNumber = i
                eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
                launchNavigation()
                return;
              }
            }
          } else {
            sharedVars.playerNumber = 15
            document.getElementById("16player15Username").innerHTML = playerName
            document.getElementById("16player15Stats").innerHTML = "En cours..."
            launchNavigation()
          }
        } else {
          sharedVars.playerNumber = 15
          sharedVars.playerPosition.push({
            username: store.get('username'),
            position: 15
          })
          reloadOwnStats()
        }
      } else {
        playerName = `${regexDisconnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
        var disconnectedPlayerPosition = (sharedVars.playerPosition.find(playerPosition => playerPosition.username === playerName).position)
        console.log(disconnectedPlayerPosition)
        sharedVars.playerPosition = sharedVars.playerPosition.filter(playerPosition => playerPosition.username !== playerName)
        eval(`resetPlayer${disconnectedPlayerPosition}Ui()`)
      }
      break;

    case line.includes("(16/"):
      playerName = `${regexConnectedPlayerName.exec(line)}`.trimLeft().split(" ")[0]
      if (playerName != store.get('username') && !playerName.includes("[")) {
        if (document.getElementById("16player16Stats").innerHTML != "Non trouvé") {
          for (let i = 1; i < 16; i++) {
            if (eval(`document.getElementById("16player${i}Stats").innerHTML == "Non trouvé"`)) {
              console.log(`for stopped at ${i}`)
              sharedVars.playerNumber = i
              eval(`document.getElementById("16player${i}Username").innerHTML = playerName`)
              launchNavigation()
              return;
            }
          }
        } else {
          sharedVars.playerNumber = 16
          document.getElementById("16player16Username").innerHTML = playerName
          document.getElementById("16player16Stats").innerHTML = "En cours..."
          launchNavigation()
        }
      } else {
        sharedVars.playerNumber = 16
        sharedVars.playerPosition.push({
          username: store.get('username'),
          position: 16
        })
        reloadOwnStats()
      }
      break;
  }
}

function ownPlayerConnected() {
  if (store.get('manualEnter') && sharedVars.gameNumber == 2) {
    sharedVars.playerNumber = 2
    document.getElementById("enterUsernameWindow").style.visibility = "visible"
    document.getElementById("manualUsernameTextarea").focus()
  }
}

function resetPlayer1Ui() {
  document.getElementById("2player1Image").src = "../files/empty-170x170.png"
  document.getElementById("2player1Username").innerHTML = "Joueur 1"
  document.getElementById("2player1Stats").innerHTML = "En cours..."
  document.getElementById('4player1Image').src = "../files/empty-170x170.png"
  document.getElementById('4player1Username').innerHTML = "Joueur 1"
  document.getElementById('4player1Stats').innerHTML = "Non trouvé"
  document.getElementById('4player1AdditionalDetails').innerHTML = ""
  document.getElementById('8player1Image').src = "../files/empty-170x170.png"
  document.getElementById('8player1Username').innerHTML = "Joueur 1"
  document.getElementById('8player1Stats').innerHTML = "Non trouvé"
  document.getElementById('16player1Image').src = "../files/empty-170x170.png"
  document.getElementById('16player1Username').innerHTML = "Joueur 1"
  document.getElementById('16player1Stats').innerHTML = "Non trouvé"
}

function resetPlayer2Ui() {
  document.getElementById("2player2Image").src = "../files/empty-170x170.png"
  document.getElementById("2player2Username").innerHTML = "Joueur 2"
  document.getElementById("2player2Stats").innerHTML = "En cours..."
  document.getElementById('4player2Image').src = "../files/empty-170x170.png"
  document.getElementById('4player2Username').innerHTML = "Joueur 2"
  document.getElementById('4player2Stats').innerHTML = "Non trouvé"
  document.getElementById('4player2AdditionalDetails').innerHTML = ""
  document.getElementById('8player2Image').src = "../files/empty-170x170.png"
  document.getElementById('8player2Username').innerHTML = "Joueur 2"
  document.getElementById('8player2Stats').innerHTML = "Non trouvé"
  document.getElementById('16player2Image').src = "../files/empty-170x170.png"
  document.getElementById('16player2Username').innerHTML = "Joueur 2"
  document.getElementById('16player2Stats').innerHTML = "Non trouvé"
}

function resetPlayer3Ui() {
  document.getElementById('4player3Image').src = "../files/empty-170x170.png"
  document.getElementById('4player3Stats').innerHTML = "Non trouvé"
  document.getElementById('4player3Username').innerHTML = "Joueur 3"
  document.getElementById('4player3AdditionalDetails').innerHTML = ""
  document.getElementById('8player3Image').src = "../files/empty-170x170.png"
  document.getElementById('8player3Username').innerHTML = "Joueur 3"
  document.getElementById('8player3Stats').innerHTML = "Non trouvé"
  document.getElementById('16player3Image').src = "../files/empty-170x170.png"
  document.getElementById('16player3Username').innerHTML = "Joueur 3"
  document.getElementById('16player3Stats').innerHTML = "Non trouvé"
}

function resetPlayer4Ui() {
  document.getElementById('4player4Image').src = "../files/empty-170x170.png"
  document.getElementById('4player4Username').innerHTML = "Joueur 4"
  document.getElementById('4player4Stats').innerHTML = "Non trouvé"
  document.getElementById('4player4AdditionalDetails').innerHTML = ""
  document.getElementById('8player4Image').src = "../files/empty-170x170.png"
  document.getElementById('8player4Username').innerHTML = "Joueur 4"
  document.getElementById('8player4Stats').innerHTML = "Non trouvé"
  document.getElementById('16player4Image').src = "../files/empty-170x170.png"
  document.getElementById('16player4Username').innerHTML = "Joueur 4"
  document.getElementById('16player4Stats').innerHTML = "Non trouvé"
}

function resetPlayer5Ui() {
  document.getElementById('8player5Image').src = "../files/empty-170x170.png"
  document.getElementById('8player5Username').innerHTML = "Joueur 5"
  document.getElementById('8player5Stats').innerHTML = "Non trouvé"
  document.getElementById('16player5Image').src = "../files/empty-170x170.png"
  document.getElementById('16player5Username').innerHTML = "Joueur 5"
  document.getElementById('16player5Stats').innerHTML = "Non trouvé"
}

function resetPlayer6Ui() {
  document.getElementById('8player6Image').src = "../files/empty-170x170.png"
  document.getElementById('8player6Username').innerHTML = "Joueur 6"
  document.getElementById('8player6Stats').innerHTML = "Non trouvé"
  document.getElementById('16player6Image').src = "../files/empty-170x170.png"
  document.getElementById('16player6Username').innerHTML = "Joueur 6"
  document.getElementById('16player6Stats').innerHTML = "Non trouvé"
}

function resetPlayer7Ui() {
  document.getElementById('8player7Image').src = "../files/empty-170x170.png"
  document.getElementById('8player7Username').innerHTML = "Joueur 7"
  document.getElementById('8player7Stats').innerHTML = "Non trouvé"
  document.getElementById('16player7Image').src = "../files/empty-170x170.png"
  document.getElementById('16player7Username').innerHTML = "Joueur 7"
  document.getElementById('16player7Stats').innerHTML = "Non trouvé"
}

function resetPlayer8Ui() {
  document.getElementById('8player8Image').src = "../files/empty-170x170.png"
  document.getElementById('8player8Username').innerHTML = "Joueur 8"
  document.getElementById('8player8Stats').innerHTML = "Non trouvé"
  document.getElementById('16player8Image').src = "../files/empty-170x170.png"
  document.getElementById('16player8Username').innerHTML = "Joueur 8"
  document.getElementById('16player8Stats').innerHTML = "Non trouvé"
}

function resetPlayer9Ui() {
  document.getElementById('16player9Image').src = "../files/empty-170x170.png"
  document.getElementById('16player9Username').innerHTML = "Joueur 9"
  document.getElementById('16player9Stats').innerHTML = "Non trouvé"
}

function resetPlayer10Ui() {
  document.getElementById('16player10Image').src = "../files/empty-170x170.png"
  document.getElementById('16player10Username').innerHTML = "Joueur 10"
  document.getElementById('16player10Stats').innerHTML = "Non trouvé"
}

function resetPlayer11Ui() {
  document.getElementById('16player11Image').src = "../files/empty-170x170.png"
  document.getElementById('16player11Username').innerHTML = "Joueur 11"
  document.getElementById('16player11Stats').innerHTML = "Non trouvé"
}

function resetPlayer12Ui() {
  document.getElementById('16player12Image').src = "../files/empty-170x170.png"
  document.getElementById('16player12Username').innerHTML = "Joueur 12"
  document.getElementById('16player12Stats').innerHTML = "Non trouvé"
}

function resetPlayer13Ui() {
  document.getElementById('16player13Image').src = "../files/empty-170x170.png"
  document.getElementById('16player13Username').innerHTML = "Joueur 13"
  document.getElementById('16player13Stats').innerHTML = "Non trouvé"
}

function resetPlayer14Ui() {
  document.getElementById('16player14Image').src = "../files/empty-170x170.png"
  document.getElementById('16player14Username').innerHTML = "Joueur 14"
  document.getElementById('16player14Stats').innerHTML = "Non trouvé"
}

function resetPlayer15Ui() {
  document.getElementById('16player15Image').src = "../files/empty-170x170.png"
  document.getElementById('16player15Username').innerHTML = "Joueur 15"
  document.getElementById('16player15Stats').innerHTML = "Non trouvé"
}

function resetPlayer16Ui() {
  document.getElementById('16player16Image').src = "../files/empty-170x170.png"
  document.getElementById('16player16Username').innerHTML = "Joueur 16"
  document.getElementById('16player16Stats').innerHTML = "Non trouvé"
}

function resetUi() {
  resetPlayer1Ui()
  resetPlayer2Ui()
  resetPlayer3Ui()
  resetPlayer4Ui()
  resetPlayer5Ui()
  resetPlayer6Ui()
  resetPlayer7Ui()
  resetPlayer8Ui()
  resetPlayer9Ui()
  resetPlayer10Ui()
  resetPlayer11Ui()
  resetPlayer12Ui()
  resetPlayer13Ui()
  resetPlayer14Ui()
  resetPlayer15Ui()
  resetPlayer16Ui()
}

exports.resetUi = async () => {
  resetUi()
}