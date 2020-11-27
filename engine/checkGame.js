const Store = require('electron-store')
const store = new Store()
const sharedVars = require('./sharedVars')
const getLastLine = require('./readlastline.js').getLastLine
const logFileLocation = (store.get('logFileLocation'))
var lastLogLine = ""
var textarea = document.getElementById('mainTextArea')


exports.checkGamemode = async () => {
  checkGamemode()
}

function checkGamemode() {
  store.set('rpStatus', 'Attente du mode de jeu')
  resetVars()
  sharedVars.engineIsPaused = false
  document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Attente du choix de mode de jeu`
  textarea.scrollTop = textarea.scrollHeight
  sharedVars.checkingGamemode = true

  // Loop primaire
  let waitPrimaryLoop = setInterval(function () { primaryLoop() }, 5)
  async function primaryLoop() {
    getLastLine(logFileLocation, 2)
      .then((lastLine) => lastLogLine = lastLine)

    switch (true) {

      case sharedVars.engineIsPaused:
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("Vous avez quitt") && !sharedVars.exited:
        document.getElementById("mainTextArea").value += "Vous avez quitté le jeu.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.exited = true
        resetVars()
        stopPrimaryLoop()
        checkGamemode()
        break;

      case lastLogLine.includes("hikabrain10#2x1") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Hikabrain"
        sharedVars.gameType = "single"
        sharedVars.gameNumber = 2
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche du joueur adverse...`
        document.getElementById("mainTextArea").value += "Hikabrain 1v1 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDTPAC10#2x1") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "single"
        sharedVars.gameNumber = 2
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche du joueur adverse...`
        document.getElementById("mainTextArea").value += "Rush 1v1 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("hikabrain5#2x2") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Hikabrain"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 4
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Hikabrain 2v2 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDT4#2x2") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") || lastLogLine.includes("rushMDT2x2") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 4
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Rush 2v2 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("hikabrain2x4") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Hikabrain"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 8
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Hikabrain 4v4 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDT2x4") || lastLogLine.includes("rushMDT2x4") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 8
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Rush 4v4 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("skywars12") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Skywars"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 12
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Skywars solo choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("skywars8x2") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Skywars"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 16
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Skywars duos choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("mmaPAC16") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Octogone"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 16
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Octogone choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("blitz2x2") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Blitz"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 4
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Blitz 2v2 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("blitz2x4") && !lastLogLine.includes("Partie") && !lastLogLine.includes("<>") && !lastLogLine.includes("groupe") && !sharedVars.findUnameCalled:
        sharedVars.gameChosen = "Blitz"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 8
        sharedVars.exited = false
        findUname()
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - recherche des joueurs adverses...`
        document.getElementById("mainTextArea").value += "Blitz 4v4 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;
    }
  }

  function stopPrimaryLoop() {
    clearInterval(waitPrimaryLoop)
  }

}

// Début findUname
const navigatePlayer = require('./navigatePlayer').navigatePlayer
const navigateMorgothAPI = require('./navigateMorgothAPI').navigateMorgothAPI

function findUname() {
  const regexPlayerName = new RegExp('[^+]*$')
  let findUnameStop = setInterval(function () { findUname() }, 1)

  async function findUname() {
    getLastLine(logFileLocation, 3)
      .then((lastLine) => lastLogLine = lastLine)

    switch (true) {
      case sharedVars.engineIsPaused:
        stopFindUname()
        break;

      case lastLogLine.includes("(2/"):
        if (!sharedVars.playerThreeDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 3/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerThreeFound = false
          sharedVars.playerThreeDisconnected = true
        }
        if (!sharedVars.playerTwoFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 2
            document.getElementById("mainTextArea").value += `(2/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTwoFound = true
            sharedVars.playerThreeDisconnected = false
            if (store.get('useMorgothAPI') && sharedVars.gameNumber == 2) {
              navigateMorgothAPI()
            } else {
              navigatePlayer()
            }
          } else if (sharedVars.gameNumber == 2) {
            ownPlayerConnected()
          }
          if (sharedVars.gameNumber == 2) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine')) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Attente du choix de mode de jeu`
              textarea.scrollTop = textarea.scrollHeight
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;



      case lastLogLine.includes("(3/"):
        if (!sharedVars.playerFourDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 4/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerFourFound = false
          sharedVars.playerFourDisconnected = true
        }
        if (!sharedVars.playerThreeFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 3
            document.getElementById("mainTextArea").value += `(3/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerThreeFound = true
            sharedVars.playerFourDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(4/"):
        if (!sharedVars.playerFiveDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 5/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerFiveFound = false
          sharedVars.playerFiveDisconnected = true
        }
        if (!sharedVars.playerFourFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 4
            document.getElementById("mainTextArea").value += `(4/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFourFound = true
            sharedVars.playerFiveDisconnected = false
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 4) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine')) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Attente du choix de mode de jeu`
              textarea.scrollTop = textarea.scrollHeight
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;

      case lastLogLine.includes("(5/"):
        if (!sharedVars.playerSixDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 6/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerSixFound = false
          sharedVars.playerSixDisconnected = true
        }
        if (!sharedVars.playerFiveFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 5
            document.getElementById("mainTextArea").value += `(5/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFiveFound = true
            sharedVars.playerSixDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(6/"):
        if (!sharedVars.playerSevenDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 7/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerSevenFound = false
          sharedVars.playerSevenDisconnected = true
        }
        if (!sharedVars.playerSixFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 6
            document.getElementById("mainTextArea").value += `(6/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerSixFound = true
            sharedVars.playerSevenDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(7/"):
        if (!sharedVars.playerEightDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 8/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerEightFound = false
          sharedVars.playerEightDisconnected = true
        }
        if (!sharedVars.playerSevenFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 7
            document.getElementById("mainTextArea").value += `(7/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerSevenFound = true
            sharedVars.playerEightDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(8/"):
        if (!sharedVars.playerNineDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 9/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerNineFound = false
          sharedVars.playerNineDisconnected = true
        }
        if (!sharedVars.playerEightFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 8
            document.getElementById("mainTextArea").value += `(8/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerEightFound = true
            sharedVars.playerNineDisconnected = false
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 8) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine')) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Attente du choix de mode de jeu`
              textarea.scrollTop = textarea.scrollHeight
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;

      case lastLogLine.includes("(9/"):
        if (!sharedVars.playerTenDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 10/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerTenFound = false
          sharedVars.playerTenDisconnected = true
        }
        if (!sharedVars.playerNineFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 9
            document.getElementById("mainTextArea").value += `(9/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerNineFound = true
            sharedVars.playerTenDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(10/"):
        if (!sharedVars.playerElevenDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 11/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerElevenFound = false
          sharedVars.playerElevenDisconnected = true

        }
        if (!sharedVars.playerTenFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 10
            document.getElementById("mainTextArea").value += `(10/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTenFound = true
            sharedVars.playerElevenDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(11/"):
        if (!sharedVars.playerTwelveDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 12/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerTwelveFound = false
          sharedVars.playerTwelveDisconnected = true
        }
        if (!sharedVars.playerElevenFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 11
            document.getElementById("mainTextArea").value += `(11/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerElevenFound = true
            sharedVars.playerTwelveDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(12/"):
        if (!sharedVars.playerThirteenDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 13/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerThirteenFound = false
          sharedVars.playerThirteenDisconnected = true
        }
        if (!sharedVars.playerTwelveFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 12
            document.getElementById("mainTextArea").value += `(12/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTwelveFound = true
            sharedVars.playerThirteenDisconnected = false
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 12) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine')) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Attente du choix de mode de jeu`
              textarea.scrollTop = textarea.scrollHeight
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;

      case lastLogLine.includes("(13/"):
        if (!sharedVars.playerFourteenDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 14/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerFourteenFound = false
          sharedVars.playerFourteenDisconnected = true
        }
        if (!sharedVars.playerThirteenFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 13
            document.getElementById("mainTextArea").value += `(13/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerThirteenFound = true
            sharedVars.playerFourteenDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(14/"):
        if (!sharedVars.playerFifteenDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 15/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerFifteenFound = false
          sharedVars.playerFifteenDisconnected = true
        }
        if (!sharedVars.playerFourteenFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 14
            document.getElementById("mainTextArea").value += `(14/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFourteenFound = true
            sharedVars.playerFifteenDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(15/"):
        if (!sharedVars.playerSixteenDisconnected && lastLogLine.includes("déconnecté")) {
          document.getElementById("mainTextArea").value += `Le joueur 16/${sharedVars.gameNumber} s'est déconnecté.\n`
          textarea.scrollTop = textarea.scrollHeight
          sharedVars.playerSixteenFound = false
          sharedVars.playerSixteenDisconnected = true
        }
        if (!sharedVars.playerFifteenFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 15
            document.getElementById("mainTextArea").value += `(15/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFifteenFound = true
            sharedVars.playerSixteenDisconnected = false
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(16/"):
        if (!sharedVars.playerSixteenFound) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 16
            document.getElementById("mainTextArea").value += `(16/${sharedVars.gameNumber}) Le joueur ${playerName} s'est connecté à la game.\n`
            textarea.scrollTop = textarea.scrollHeight
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerSixteenFound = true
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 16) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine')) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Attente du choix de mode de jeu`
              textarea.scrollTop = textarea.scrollHeight
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;


      case sharedVars.exited:
        stopFindUname()
        break;

      case lastLogLine.includes("Vous avez quitt") && !sharedVars.exited:
        document.getElementById("mainTextArea").value += "Vous avez quitté le jeu.\n"
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.exited = true
        resetVars()
        stopFindUname()
        checkGamemode()
        break;
    }

    function ownPlayerConnected() {
      if (!sharedVars.playerNotFound) {
        if (store.get('manualEnter') && sharedVars.gameNumber == 2) {
          sharedVars.playerNumber = 2
          document.getElementById("mainTextArea").value += "Le second joueur n'a pas pu être trouvé automatiquement car vous avez été connecté sur un lobby ou il était déjà présent.\nEcrivez son pseudo manuellement pour rechercher ses stats.\n"
          document.getElementById("enterUsernameWindow").style.visibility = "visible"
          document.getElementById("manualUsernameTextarea").focus()
        } else {
          document.getElementById("mainTextArea").value += "Le second joueur n'a pas pu être trouvé automatiquement car vous avez été connecté sur un lobby ou il était déjà présent.\n"
        }
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Attente du choix de mode de jeu`
        textarea.scrollTop = textarea.scrollHeight
        sharedVars.playerNotFound = true
        sharedVars.findUnameCalled = false
        stopFindUname()
        checkGamemode()
      }
    }
  }
  function stopFindUname() {
    clearInterval(findUnameStop)
  }
}

// oui cette fonction est moche mais bon j'y peut rien faut être sûr que toutes les variables sont reset
function resetVars() {
  sharedVars.playerNotFound = false
  sharedVars.playerTwoFound = false
  sharedVars.playerThreeFound = false
  sharedVars.playerFourFound = false
  sharedVars.playerFiveFound = false
  sharedVars.playerSixFound = false
  sharedVars.playerSevenFound = false
  sharedVars.playerEightFound = false
  sharedVars.playerNineFound = false
  sharedVars.playerTenFound = false
  sharedVars.playerElevenFound = false
  sharedVars.playerTwelveFound = false
  sharedVars.playerThirteenFound = false
  sharedVars.playerFourteenFound = false
  sharedVars.playerFifteenFound = false
  sharedVars.playerSixteenFound = false
  sharedVars.playerTwoDisconnected = false
  sharedVars.playerThreeDisconnected = false
  sharedVars.playerFourDisconnected = false
  sharedVars.playerFiveDisconnected = false
  sharedVars.playerSixDisconnected = false
  sharedVars.playerSevenDisconnected = false
  sharedVars.playerEightDisconnected = false
  sharedVars.playerNineDisconnected = false
  sharedVars.playerTenDisconnected = false
  sharedVars.playerElevenDisconnected = false
  sharedVars.playerTwelveDisconnected = false
  sharedVars.playerThirteenDisconnected = false
  sharedVars.playerFourteenDisconnected = false
  sharedVars.playerFifteenDisconnected = false
  sharedVars.playerSixteenDisconnected = false
  sharedVars.findUnameFinished = false
  sharedVars.findUnameCalled = false
}


exports.pauseEngine = async () => {
  pauseEngine()
}

function pauseEngine() {
  sharedVars.engineIsPaused = true
  store.set('rpStatus', 'En pause')
  document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - En pause`
  resetVars()
  document.getElementById("pause-btn").style.visibility = "hidden"
  document.getElementById("resume-btn").style.visibility = "visible"

}