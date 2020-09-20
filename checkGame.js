const Store = require('electron-store');
const store = new Store();
const sharedVars = require('./sharedVars')
const getLastLine = require('./readlastline.js').getLastLine
const logFileLocation = (store.get('logFileLocation'))
var lastLogLine = ""
var textarea = document.getElementById('mainTextArea');

exports.checkGamemode = async () => {
  checkGamemode()
}

document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"

function checkGamemode() {
  textarea.scrollTop = textarea.scrollHeight;
  sharedVars.ingame = false
  sharedVars.checkingGamemode = true

  // Loop primaire
  let waitPrimaryLoop = setInterval(function () { primaryLoop() }, 5);
  async function primaryLoop() {
    getLastLine(logFileLocation, 2)
      .then((lastLine) => lastLogLine = lastLine)

    switch (true) {
      case lastLogLine.includes("Vous avez quitt") && sharedVars.exited == false:
        document.getElementById("mainTextArea").value += "Vous avez quitté le jeu.\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.exited = true
        resetVars()
        stopPrimaryLoop()
        checkGamemode()
        break;

      case lastLogLine.includes("[HikaBrain]"):
        if (sharedVars.inGame == false) {
          sharedVars.inGame = true
          sharedVars.playerNotFound = false
          sharedVars.playerTwoFound = false
          sharedVars.playerThreeFound = false
          sharedVars.playerFourFound = false
          stopPrimaryLoop()
          checkGamemode()
        }
        break;

      case lastLogLine.includes("hikabrain10#2x1") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Hikabrain"
        sharedVars.gameType = "single"
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("mainTextArea").value += "Hikabrain 1v1 choisi, recherche du joueur adverse...\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.ingame = false
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDTPAC10#2x1") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "single"
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("mainTextArea").value += "Rush Fast MDT 1v1 choisi, recherche du joueur adverse...\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.ingame = false
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
        document.getElementById("mainTextArea").value += "Hikabrain 2v2 choisi, recherche des joueurs adverses...\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.ingame = false
        sharedVars.checkingGamemode = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDT4#2x2") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Rush"
        sharedVars.gameType = "multiple"
        sharedVars.gameNumber = 4
        sharedVars.exited = false
        sharedVars.playerNotFound = false
        findUname()
        document.getElementById("mainTextArea").value += "Rush 2v2 choisi, recherche des joueurs adverses...\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.ingame = false
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
      case lastLogLine.includes("(2/"):
        playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
        if (sharedVars.gameType == "single") {
          if (playerName == store.get('username') && sharedVars.playerTwoFound == false) {
            ownPlayerConnected()
          } else {
            lastLogLine = ""
            document.getElementById("mainTextArea").value += "Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTwoFound = true
            if (store.get('useMorgothAPI') == false) {
              navigatePlayer()
            } else {
              navigateMorgothAPI()
            }
            stopFindUname();
          }
        } else if (sharedVars.gameType == "multiple") {
          if (playerName != store.get('username') && sharedVars.playerTwoFound == false && !playerName.includes("[")) {
            document.getElementById("mainTextArea").value += "Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerTwoFound = true
            navigatePlayer()
          }
        }
        break;

      case lastLogLine.includes("(3/"):
        if (sharedVars.playerThreeFound == false) {
          playerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if (playerName != store.get('username')) {
            document.getElementById("mainTextArea").value += "Le joueur " + playerName + " s'est connecté à la game.\n"
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
          if (playerName != store.get('username')) {
            document.getElementById("mainTextArea").value += "Le joueur " + playerName + " s'est connecté à la game.\n"
            textarea.scrollTop = textarea.scrollHeight;
            sharedVars.playerUsername = playerName
            sharedVars.findUnameCalled = false
            sharedVars.playerFourFound = true
            navigatePlayer()
          }
          if (sharedVars.gameNumber == 4) {
            document.getElementById("mainTextArea").value += "Game complète.\n"
            document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
            textarea.scrollTop = textarea.scrollHeight;
            stopFindUname()
            checkGamemode()
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

      case lastLogLine.includes("[HikaBrain]" || "a été tué"):
        if (sharedVars.inGame == false) {
          sharedVars.inGame = true
          sharedVars.playerNotFound = false
          sharedVars.playerTwoFound = false
          sharedVars.playerThreeFound = false
          sharedVars.playerFourFound = false
          stopPrimaryLoop()
        }
        break;
    }

    function ownPlayerConnected() {
      if (sharedVars.playerNotFound == false) {
        if (store.get('manualEnter') == true) {
          document.getElementById("mainTextArea").value += "Le second joueur n'a pas pu être trouvé automatiquement car vous avez été connecté sur un lobby ou il était déjà présent.\nEcrivez son pseudo manuellement pour rechercher ses stats.\n"
          document.getElementById("enterUsernameWindow").style.visibility = "visible"
          document.getElementById("manualUsernameTextarea").focus()
        } else {
          document.getElementById("mainTextArea").value += "Le second joueur n'a pas pu être trouvé automatiquement car vous avez été connecté sur un lobby ou il était déjà présent.\n"
        }
        document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
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
  sharedVars.playerNotFound = false
  sharedVars.findUnameFinished = false
  sharedVars.findUnameCalled = false
  sharedVars.ingame = false
}
