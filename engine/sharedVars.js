// Ces paramètres peuvent être changés si des erreurs de Timeout sont rencontrés. Des hotfix seront publiés le plus rapidement possible
// pour remédier à ce problème mais vous pouvez changer ces emplacements XPath pour faire votre propre fix.

// Les XPath sont des fois différents entre Windows et Linux, donc on sépare les 2 systèmes avec leur XPath respectifs.
// Même si ce sont les mêmes entre Windows et Linux, le jour où ils changeront suivant le système une parade sera déjà mise en place.
exports.mode1HikabrainGamesCountXPath = '//*[@id="player-stats"]/div[3]/div[3]/div/div[2]/div[4]/div[2]'
exports.mode1HikabrainVictoryCountXPath = '//*[@id="player-stats"]/div[3]/div[3]/div/div[2]/div[5]/div[2]'
exports.mode1RushGamesCountXPath = '//*[@id="player-stats"]/div[3]/div[1]/div/div[2]/div[4]/div[2]'
exports.mode1RushVictoryCountXPath = '//*[@id="player-stats"]/div[3]/div[1]/div/div[2]/div[5]/div[2]'
exports.mode1SkywarsGamesCountXPath = '//*[@id="player-stats"]/div[3]/div[4]/div/div[2]/div[4]/div[2]'
exports.mode1SkywarsVictoryCountXPath = '//*[@id="player-stats"]/div[3]/div[4]/div/div[2]/div[5]/div[2]'

exports.mode2HikabrainGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[4]/div[2]'
exports.mode2HikabrainVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[3]/div/div[2]/div[5]/div[2]'
exports.mode2RushGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[1]/div/div[2]/div[4]/div[2]'
exports.mode2RushVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[1]/div/div[2]/div[5]/div[2]'
exports.mode2SkywarsGamesCountXPath = '//*[@id="player-stats"]/div[4]/div[4]/div/div[2]/div[4]/div[2]'
exports.mode2SkywarsVictoryCountXPath = '//*[@id="player-stats"]/div[4]/div[4]/div/div[2]/div[5]/div[2]'

// Ne touchez pas à ces variables, sans elles FuncraftHelper ne fonctionnera pas correctement.
exports.playerUsername = ''
exports.playerNotFound = false
exports.findUnameFinished = false
exports.exited = false
exports.gameChosen = ""
exports.findUnameCalled = false
exports.systemType = ""
exports.gameType = ""
exports.checkingGamemode = false
exports.playerTwoFound = false
exports.playerThreeFound = false
exports.playerFourFound = false
exports.playerFiveFound = false
exports.playerSixFound = false
exports.playerSevenFound = false
exports.playerEightFound = false
exports.playerNineFound = false
exports.playerTenFound = false
exports.playerElevenFound = false
exports.playerTwelveFound = false
exports.playerThirteenFound = false
exports.playerFourteenFound = false
exports.playerFifteenFound = false
exports.playerSixteenFound = false
exports.playerNumber = 0
exports.inBenchmark = false