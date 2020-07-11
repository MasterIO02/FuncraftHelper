// Mettez votre pseudo in game entre les '' pour que la détection des joueurs se fasse correctement.
exports.username = ''
// Changez "NOM D'UTILISATEUR" par le nom d'utilisateur de votre ordinateur si vous êtes sur Windows,
// sinon mettez l'emplacement de votre latest.log de votre Pactify/Minecraft sur Linux/Mac.
exports.logFileLocation = "C:/Users/NOM D'UTILISATEUR/AppData/Roaming/.pactify/logs/latest.log"
// Si ce paramètre est sur true, FuncraftHelper va vérifier vos statistiques à chaque début de game. Impacte les performances,
// je vous conseille de laisser cette valeur sur false pour une meilleure détection des joueurs.
exports.checkOwnStats = false
// Si cette option est sur false, la vérification des statistiques sera faite en étant visible. Par défaut sur true donc invisible.
// Pratique pour le débug ou pour trouver les XPath du site Funcraft.
exports.headless = true
// Si cette option est sur true, vous verrez la progression de la vérification des stats. Pratique pour tester la vitesse.
exports.showPercent = true
// Si vous voulez utiliser l'API de LordMorgoth, mettez ce paramètre sur true, et entrez votre clé d'API en dessous.
// Allège grandement les performances et extrêmement rapide mais les requêtes sont limitées à 1 requête / 10 secondes. Pas pratique pour les modes de jeux
// avec plus de 2 joueurs.
exports.useMorgothAPI = false
exports.MorgothAPIKey = ''


// Ces paramètres peuvent être changés si des erreurs de Timeout sont rencontrés. Des hotfix seront publiés le plus rapidement possible
// pour remédier à ce problème mais vous pouvez changer ces emplacements XPath pour faire votre propre fix.
exports.hikabrainGamesCountXPath = "/html/body/div[2]/div[2]/div[2]/div/div[1]/div[4]/div[3]/div/div[2]/div[4]/div[2]"
exports.hikabrainVictoryCountXPath = "/html/body/div[2]/div[2]/div[2]/div/div[1]/div[4]/div[3]/div/div[2]/div[5]/div[2]"
exports.rushGamesCountXPath = "/html/body/div[2]/div[2]/div[2]/div/div[1]/div[3]/div[1]/div/div[2]/div[4]/div[2]"
exports.rushVictoryCountXPath = "/html/body/div[2]/div[2]/div[2]/div/div[1]/div[4]/div[1]/div/div[2]/div[5]/div[2]"


// Ne touchez pas à ces variables, sans elles FuncraftHelper ne fonctionnera pas correctement.
exports.firstPlayerUname = ''
exports.secondPlayerUname = ''
exports.secondPlayerNotFound = false
exports.secondPlayerSaid = false
exports.findUnameFinished = false
exports.exited = false
exports.secondPlayerFinished = false
exports.gameChosen = ""
exports.findUnameCalled = false