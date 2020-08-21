// Ces paramètres peuvent être changés si des erreurs de Timeout sont rencontrés. Des hotfix seront publiés le plus rapidement possible
// pour remédier à ce problème mais vous pouvez changer ces emplacements XPath pour faire votre propre fix.
exports.hikabrainGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[4]/div[2]'
exports.hikabrainVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[5]/div[2]'
exports.rushGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[1]/div/div[2]/div[4]/div[2]'
exports.rushVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[1]/div/div[2]/div[5]/div[2]'


// Ne touchez pas à ces variables, sans elles FuncraftHelper ne fonctionnera pas correctement.
exports.playerUsername = ''
exports.playerNotFound = false
exports.playerSaid = false
exports.findUnameFinished = false
exports.exited = false
exports.gameChosen = ""
exports.findUnameCalled = false
exports.systemType = ""
exports.inGame = false