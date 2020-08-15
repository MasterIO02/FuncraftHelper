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

if (store.get('systemType') == "win32") {
  document.getElementById("mainTextArea").value += "Windows détecté. Lancez le programme en administrateur pour de bien meilleures performances.\n\n"
}
document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
function checkGamemode() {
  textarea.scrollTop = textarea.scrollHeight;
  sharedVars.ingame = false


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
        sharedVars.secondPlayerNotFound = false
        sharedVars.secondPlayerSaid = false
        sharedVars.findUnameFinished = false
        sharedVars.secondPlayerFinished = false
        sharedVars.findUnameCalled = false
        sharedVars.ingame = false
        stopPrimaryLoop()
        checkGamemode()
        break;

      case lastLogLine.includes("[HikaBrain]"):
        if (sharedVars.inGame == false) {
          sharedVars.inGame = true
          sharedVars.secondPlayerNotFound = false
          stopPrimaryLoop()
          checkGamemode()
        }
        break;

      case lastLogLine.includes("hikabrain10#2x1") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "Hika1v1"
        sharedVars.exited = false
        findUname()
        document.getElementById("mainTextArea").value += "Hikabrain 1v1 choisi, recherche du joueur adverse...\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.ingame = false
        stopPrimaryLoop()
        break;

      case lastLogLine.includes("rushFASTMDTPAC10#2x1") && sharedVars.findUnameCalled == false:
        sharedVars.gameChosen = "RushFast1v1"
        sharedVars.exited = false
        findUname()
        document.getElementById("mainTextArea").value += "Rush Fast MDT 1v1 choisi, recherche du joueur adverse...\n"
        textarea.scrollTop = textarea.scrollHeight;
        sharedVars.findUnameCalled = true
        sharedVars.ingame = false
        stopPrimaryLoop()
        break;
    }
  }

  function stopPrimaryLoop() {
    clearInterval(waitPrimaryLoop);
  }

}

// Début findUname
const navigatePlayerTwo = require('./navigatePlayerTwo').navigatePlayerTwo
const navigateMorgothAPI = require('./navigateMorgothAPI').navigateMorgothAPI

function findUname() {
  let findUnameStop = setInterval(function () { findUname() }, 1);

  async function findUname() {
    const regexPlayerName = new RegExp('[^+]*$')
    getLastLine(logFileLocation, 2)
      .then((lastLine) => lastLogLine = lastLine)

    function stopFindUname() {
      clearInterval(findUnameStop);
    }

    switch (true) {
      case lastLogLine.includes("(2/"):
        secondPlayerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
        if (secondPlayerName == store.get('username') && sharedVars.secondPlayerNotFound == false) {
          ownPlayerConnected()
        } else {
          lastLogLine = ""
          document.getElementById("mainTextArea").value += "Le joueur " + secondPlayerName + " s'est connecté à la game.\n"
          textarea.scrollTop = textarea.scrollHeight;
          sharedVars.secondPlayerUname = secondPlayerName
          sharedVars.secondPlayerSaid = true
          sharedVars.findUnameCalled = false
          if (store.get('useMorgothAPI') == false) {
            navigatePlayerTwo()
          } else {
            navigateMorgothAPI()
          }
          stopFindUname();

        }
        break;

      case sharedVars.exited == true:
        stopFindUname()
        break;
    }

    function ownPlayerConnected() {
      document.getElementById("mainTextArea").value += "Le second joueur n'a pas pu être trouvé car vous avez été connecté sur un lobby ou il était déjà présent.\n"
      document.getElementById("mainTextArea").value += "Attente du choix de mode de jeu...\n"
      textarea.scrollTop = textarea.scrollHeight;
      sharedVars.secondPlayerNotFound = true
      sharedVars.findUnameCalled = false
      stopFindUname()
      checkGamemode()
    }

  }
}