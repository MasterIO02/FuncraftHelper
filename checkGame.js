const config = require('./config')
const { callFindUname } = require('./callFindUname')
const getLastLine = require('./readlastline.js').getLastLine
const logFileLocation = (config.logFileLocation)
const recheckGamemode = require('./recheckGamemode.js').recheckGamemode
var lastLogLine = ""

exports.checkGamemode = async () => {
    if(config.secondPlayerNotFound == false) { console.log("Attente du choix de mode de jeu") }
    let waitPrimaryLoop = setInterval(function(){ primaryLoop() }, 5);
    async function primaryLoop() {
        getLastLine(logFileLocation, 2)
        .then((lastLine) => lastLogLine = lastLine)
        if(lastLogLine.includes("Vous avez quitt") && config.exited == false) { 
            console.log("Vous avez quitté le jeu.")
            config.exited = true
            config.secondPlayerNotFound = false
            config.secondPlayerSaid = false
            config.findUnameFinished = false
            config.secondPlayerFinished = false
            config.findUnameCalled = false
            stopPrimaryLoop()
            recheckGamemode()

        } else if(lastLogLine.includes("hikabrain10#2x1") && config.findUnameCalled == false) {
            config.gameChosen = "Hika1v1"
            config.exited = false
            callFindUname()
            console.log("Hikabrain 1v1 choisi")
            config.findUnameCalled = true
            stopPrimaryLoop()
        } else if(lastLogLine.includes("rushFASTMDTPAC10#2x1") && config.findUnameCalled == false) {
          config.gameChosen = "RushFast1v1"
          config.exited = false
          callFindUname()
          console.log("Rush Fast MDT 1v1 choisi")
          config.findUnameCalled = true
          stopPrimaryLoop()
        }
    }

    function stopPrimaryLoop() {
        clearInterval(waitPrimaryLoop);
    }

}






// Début findUname

const navigatePlayerOne = require('./navigatePlayerOne').navigatePlayerOne
const navigatePlayerTwo = require('./navigatePlayerTwo').navigatePlayerTwo
const navigateMorgothAPI = require('./navigateMorgothAPI.js').navigateMorgothAPI

exports.findUname = async () => {
  if(config.checkOwnStats == true) {
    navigatePlayerOne()
  }
  let findUnameStop = setInterval(function(){ findUname() }, 1);
  async function findUname() {
    getLastLine(logFileLocation, 2)
    .then((lastLine) => lastLogLine = lastLine)

        if(lastLogLine.includes("(2/2)")) {
          const regexPlayerName = new RegExp('[^+]*$')
          secondPlayerName = `${regexPlayerName.exec(lastLogLine)}`.trimLeft().split(" ")[0]
          if(secondPlayerName == config.username) {
            if(config.secondPlayerNotFound == false) {
              console.log("Le second joueur n'a pas pu être trouvé car vous vous êtes connecté sur un lobby ou il était déjà présent.")
              config.secondPlayerNotFound = true
            }
            config.findUnameCalled = false
            stopFindUname()
            recheckGamemode()
            return
          }
          else if(config.secondPlayerSaid == false) {
            lastLogLine = ""
            console.log("Le joueur " + secondPlayerName + " s'est connecté à la game.")
            config.secondPlayerUname = secondPlayerName
            config.secondPlayerSaid = true
            config.findUnameCalled = false
            if(config.useMorgothAPI == false) {
              navigatePlayerTwo()
            } else {
              navigateMorgothAPI()
            }
            
            stopFindUname();
        }
        if(config.exited == true) {
          stopFindUname()
        }
        
       
    }
        
      }


  function stopFindUname() {
    clearInterval(findUnameStop);
  }

}
