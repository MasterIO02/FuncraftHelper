// Ces paramètres peuvent être changés si des erreurs de Timeout sont rencontrés. Des hotfix seront publiés le plus rapidement possible
// pour remédier à ce problème mais vous pouvez changer ces emplacements XPath pour faire votre propre fix.
exports.linuxHikabrainGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[4]/div[2]'
exports.linuxHikabrainVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[5]/div[2]'
exports.linuxRushGamesCountXPath = '//*[@id="player-stats"]/div[3]/div[1]/div/div[2]/div[4]/div[2]'
exports.linuxRushVictoryCountXPath = '//*[@id="player-stats"]/div[3]/div[1]/div/div[2]/div[5]/div[2]'

exports.winHikabrainGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[4]/div[2]'
exports.winHikabrainVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[5]/div[2]'
exports.winRushGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[1]/div/div[2]/div[4]/div[2]'
exports.winRushVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[1]/div/div[2]/div[5]/div[2]'


// Ne touchez pas à ces variables, sans elles FuncraftHelper ne fonctionnera pas correctement.
exports.playerUsername = ''
exports.playerNotFound = false
exports.findUnameFinished = false
exports.exited = false
exports.gameChosen = ""
exports.findUnameCalled = false
exports.systemType = ""
exports.inGame = false
exports.gameType = ""
exports.checkingGamemode = false

exports.playerTwoFound = false
exports.playerThreeFound = false
exports.playerFourFound = false