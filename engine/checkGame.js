const Store = require('electron-store');
const store = new Store();
const sharedVars = require('./sharedVars')
const getLastLine = require('./readlastline.js').getLastLine
const logFileLocation = (store.get('logFileLocation'))
var lastLogLine = ""
var textarea = document.getElementById('mainTextArea');
var engineIsPaused = false

exports.checkGamemode = async () => {
  checkGamemode()
}

function checkGamemode() {
  resetVars()
  engineIsPaused = false
  document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - Attente du choix de mode de jeu"
  textarea.scrollTop = textarea.scrollHeight;
  sharedVars.checkingGamemode = true

  // Loop primaire
  let waitPrimaryLoop = setInterval(function () { primaryLoop() }, 5);
  async function primaryLoop() {
    getLastLine(logFileLocation, 2)
      .then((lastLine) => lastLogLine = lastLine)

    switch (true) {

      case engineIsPaused == true:
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("Vous avez quitt") && sharedVars.exited == false:
        document.getElementById("mainTextArea").value += "Vous avez quitté le jeu.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.exited = true
        resetVars()
        stopPrimaryLoop()
        checkGamemode()
        break;

      case lastLogLine.includes("hikabrain10#2x1") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Hikabrain"
        sharedVars.gameType = "single"
        sharedVars.gameNumber = 2
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche du joueur adverse..."
        document.getElementById("mainTextArea").value += "Hikabrain 1v1 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDTPAC10#2x1") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "single"
        sharedVars.gameNumber = 2
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche du joueur adverse..."
        document.getElementById("mainTextArea").value += "Rush 1v1 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("hikabrain5#2x2") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Hikabrain"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 4
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche des joueurs adverses..."
        document.getElementById("mainTextArea").value += "Hikabrain 2v2 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDT4#2x2") || lastLogLine.includes("rushMDT2x2") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 4
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche des joueurs adverses..."
        document.getElementById("mainTextArea").value += "Rush 2v2 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("hikabrain2x4") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Hikabrain"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 8
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche des joueurs adverses..."
        document.getElementById("mainTextArea").value += "Hikabrain 4v4 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDT2x4") || lastLogLine.includes("rushMDT2x4") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 8
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche des joueurs adverses..."
        document.getElementById("mainTextArea").value += "Rush 4v4 choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("skywars12") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Skywars"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 12
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche des joueurs adverses..."
        document.getElementById("mainTextArea").value += "Skywars solo choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("skywars8x2") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Skywars"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 16
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - recherche des joueurs adverses..."
        document.getElementById("mainTextArea").value += "Skywars duos choisi.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;
    }
  }

  function stopPrimaryLoop() {
    clearInterval(waitPrimaryLoop);
  }

}

// Début findUname
const navigatePlayer = require('./navigatePlayer').navigatePlayer
const navigateMorgothAPI = require('./navigateMorgothAPI').navigateMorgothAPI

function findUname() {
  let findUnameStop = setInterval(function () { findUname() }, 1);

  async function findUname() {
    const regexPlayerName = new RegExp('[^+]*$')
    getLastLine(logFileLocation, 3)
      .then((lastLine) => lastLogLine = lastLine)

    switch (true) {

      case engineIsPaused == true:
        stopFindUname()
        break;

      case lastLogLine.includes("(2/"):
        if (sharedVars.playerTwoFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 2
            document.getElementById("mainTextArea").value += "(2/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTwoFound = true
            if (store.get('useMorgothAPI') == true && sharedVars.gameNumber == 2) {
              navigateMorgothAPI()
            } else {
              navigatePlayer()
            }
          } else if (sharedVars.gameNumber == 2) {
            ownPlayerConnected()
          }
          if (sharedVars.gameNumber == 2) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine') == true) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - Attente du choix de mode de jeu"
              textarea.scrollTop = textarea.scrollHeight;
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;



      case lastLogLine.includes("(3/"):
        if (sharedVars.playerThreeFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 3
            document.getElementById("mainTextArea").value += "(3/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerThreeFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(4/"):
        if (sharedVars.playerFourFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 4
            document.getElementById("mainTextArea").value += "(4/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFourFound = true
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 4) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine') == true) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - Attente du choix de mode de jeu"
              textarea.scrollTop = textarea.scrollHeight;
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;

      case lastLogLine.includes("(5/"):
        if (sharedVars.playerFiveFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 5
            document.getElementById("mainTextArea").value += "(5/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFiveFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(6/"):
        if (sharedVars.playerSixFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 6
            document.getElementById("mainTextArea").value += "(6/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerSixFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(7/"):
        if (sharedVars.playerSevenFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 7
            document.getElementById("mainTextArea").value += "(7/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerSevenFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(8/"):
        if (sharedVars.playerEightFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 8
            document.getElementById("mainTextArea").value += "(8/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerEightFound = true
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 8) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine') == true) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - Attente du choix de mode de jeu"
              textarea.scrollTop = textarea.scrollHeight;
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;

      case lastLogLine.includes("(9/"):
        if (sharedVars.playerNineFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 9
            document.getElementById("mainTextArea").value += "(9/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerNineFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(10/"):
        if (sharedVars.playerTenFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 10
            document.getElementById("mainTextArea").value += "(10/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTenFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(11/"):
        if (sharedVars.playerElevenFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 11
            document.getElementById("mainTextArea").value += "(11/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerElevenFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(12/"):
        if (sharedVars.playerTwelveFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 12
            document.getElementById("mainTextArea").value += "(12/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTwelveFound = true
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 12) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine') == true) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - Attente du choix de mode de jeu"
              textarea.scrollTop = textarea.scrollHeight;
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;

      case lastLogLine.includes("(13/"):
        if (sharedVars.playerThirteenFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 13
            document.getElementById("mainTextArea").value += "(13/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerThirteenFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(14/"):
        if (sharedVars.playerFourteenFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 14
            document.getElementById("mainTextArea").value += "(14/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFourteenFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(15/"):
        if (sharedVars.playerFifteenFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 15
            document.getElementById("mainTextArea").value += "(15/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFifteenFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(16/"):
        if (sharedVars.playerSixteenFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username') && !playerName.includes("[")) {
            sharedVars.playerNumber = 16
            document.getElementById("mainTextArea").value += "(16/" + sharedVars.gameNumber + ") Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerSixteenFound = true
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 16) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            if (store.get('pauseEngine') == true) {
              pauseEngine()
            } else {
              document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - Attente du choix de mode de jeu"
              textarea.scrollTop = textarea.scrollHeight;
              stopFindUname()
              checkGamemode()
            }
          }
        }
        break;


      case sharedVars.exited == true:
        stopFindUname()
        break;

      case lastLogLine.includes("Vous avez quitt") && sharedVars.exited == false:
        document.getElementById("mainTextArea").value += "Vous avez quitté le jeu.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.exited = true
        resetVars()
        stopFindUname()
        checkGamemode()
        break;
    }

    function ownPlayerConnected() {
      if (sharedVars.playerNotFound == false) {
        if (store.get('manualEnter') == true && sharedVars.gameNumber == 2) {
          sharedVars.playerNumber = 2
          document.getElementById("mainTextArea").value += "Le second joueur n'a pas pu être trouvé automatiquement car vous avez été connecté sur un lobby ou il était déjà présent.\nEcrivez son pseudo manuellement pour rechercher ses stats.\n"
          document.getElementById("enterUsernameWindow").style.visibility = "visible"
          document.getElementById("manualUsernameTextarea").focus()
        } else {
          document.getElementById("mainTextArea").value += "Le second joueur n'a pas pu être trouvé automatiquement car vous avez été connecté sur un lobby ou il était déjà présent.\n"
        }
        document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - Attente du choix de mode de jeu"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.playerNotFound = true
        sharedVars.findUnameCalled = false
        stopFindUname()
        checkGamemode()
      }
    }
  }
  function stopFindUname() {
    clearInterval(findUnameStop);
  }
}

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
  sharedVars.findUnameFinished = false
  sharedVars.findUnameCalled = false
}


exports.pauseEngine = async () => {
  pauseEngine()
}

function pauseEngine() {
  engineIsPaused = true
  document.getElementById("currentTitle").innerHTML = "FuncraftHelper 2.1.3 - En pause"
  resetVars()
  document.getElementById("pause-btn").style.visibility = "hidden"
  document.getElementById("resume-btn").style.visibility = "visible"
}