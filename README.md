# FuncraftHelper
[![HitCount](http://hits.dwyl.com/MasterIO02/FuncraftHelper.svg)](http://hits.dwyl.com/MasterIO02/FuncraftHelper)
[![GitHub All Releases](https://img.shields.io/github/downloads/MasterIO02/FuncraftHelper/total.svg)](https://github.com/MasterIO02/FuncraftHelper/releases/)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-club-penguin.svg)](https://forthebadge.com)

Vous voulez aider à rendre FuncraftHelper meilleur, tester ses nouvelles fonctionnalités en avant première ? Rejoignez le Discord pour devenir testeur !
https://discord.gg/QfbZBPA

FuncraftHelper est un programme permettant de voir les statistiques des joueurs contre qui vous jouez sur Funcraft en temps réel et automatiquement.
Fonctionne avec tous les launchers Minecraft, dont le AZ Launcher. **Aucune modifications du client du jeu n'est effectué !**
Actuellement, Le Rush 1v1, 2v2, 4v4 sont supportés, ainsi que tous les modes de jeu Hikabrain, et le Skywars 12 et 16 joueurs.
N'hésitez pas à envoyer vos retours de bugs, suggestions ou autres dans la section "issues" dans GitHub !
Fonctionne sous Windows et Linux. Les joueurs Mac devront modifier compiler FH d'eux même.

# Vitesse et performances
FuncraftHelper est fait pour fonctionner rapidement, toutefois, suivant les performances de votre ordinateur, il peut être assez lent. Des optimisations seront réalisées dans la mesure du possible pour affecter le moins possible les performances, et les améliorer.
Il est NORMAL que tous les joueurs ne soient pas détectés. Sachant que FH utilise le chat du jeu pour trouver les joueurs, si vous arrivez dans une game a 10/12 joueurs en Skywars par exemple, tous les joueurs qui sont arrivés avant vous ne peuvent pas être détéctés et ce n'est pas un bug.
En utilisant l'API de LordMorgoth (https://lordmorgoth.net), le "moteur" de LordBot, les performances de votre machine ainsi que la vitesse de recherche des statistiques seront grandement améliorées. Cependant, cette API est limitée à 1 requête toutes les 10 secondes, donc inutilisable dans tous les autres modes de jeux que le Rush et Hikabrain 1v1.

En utilisant la navigation intégrée de FuncraftHelper, les performances étaient bonnes sur un i5-6500 et un i7-4500u. l'utilisation CPU de FuncraftHelper ne dépassait pas les 6-7% en attente d'un mode de jeu. 
Pendant la recherche de statistiques, le processeur peut monter à 100%, c'est tout à fait normal. Mettre FuncraftHelper sur un SSD est FORTEMENT conseillé pour avoir les stats avant que la partie ne commence !

# Installation
Le programme est portable, c'est à dire qu'il ne s'installe pas, par contre il écrit ses fichiers de config dans le .local sur Linux et dans AppData/Roaming sous Windows.
Si vous êtes sous Windows, LANCEZ LE PROGRAMME EN ADMINISTRATEUR ! Les performances sont bien meilleures comme ça. 

# Utilisation
Après avoir lancé FuncraftHelper, il va vous demander de modifier des paramètres avant de commencer a utiliser FH.
Assurez vous d'avoir Chrome où Chromium d'installé (Chrome est sélectionné par défaut, il faut changer l'emplacement du navigateur pour utiliser Chromium), n'oubliez pas de changer votre nom d'utilisateur dans l'emplacement du latest.log.

# Comment marche FuncraftHelper ?
En gros, il va vérifier le fichier de log Minecraft en continu pour y détecter les joueurs qui se connectent au games lancées sur Funcraft. Quand il a trouvé le joueur, il va chercher ses stats sur le site de Funcraft sans intervention humaines puis les afficher. 

# Compilation
Si vous voulez compiler FuncraftHelper depuis le code source, vous pouvez importer les fichiers dans votre VS Code et exécuter "npm run dist" pour compiler FH dans votre système actuel. Assurez vous d'avoir installé toutes les dépendences du package.json avant.

# Problèmes rencontrés/communs
### Les joueurs entrant dans la game trop rapidement ne sont pas détectés.
Le seul moyen (à l'heure actuelle) de minimiser ce problème est de relancer Minecraft pour réinitialiser le fichier de log.

# Roadmap / Améliorations notées
- Optimiser et intégrer tout les modes de jeu de Funcraft.
- Ajouter une rich presence Discord
- Ajouter une fonction de détection du mode de navigation automatique au lancement de FuncraftHelper (?)
- Pouvoir régler la vitesse de vérification du fichier de log suivant la puissance du PC utilisé pour détécter le plus de joueurs possible
- Demander launcher utilisé au premier démarrage
- Faire une blacklist pour ne pas rechercher les stats de certaines personnes (comme ses amis)
- Remanier totalement l'interface principale
- Faire un mode full manuel
- Rendre possible la création de thèmes personnalisés
- Sauvegarder les logs pour plus tard créer des statistiques des joueurs que vous aurez affrontés, les résultats, etc..
- Pouvoir envoyer le statut de FuncraftHelper dans un channel discord (pour par exemple mettre ses alliés d'un groupe au courant des stats des adversaires sans qu'ils aient a utiliser FuncraftHelper)
- Faire des bases de données hors-ligne pour alléger les ordinateurs les moins puissants qui n'auront pas à aller sur le site de Funcraft à chaque fois qu'il doit rechercher un joueur
- Mettre en place un serveur permettant de mettre des notes aux joueurs rencontrés que les autres utilisateurs de FuncraftHelper pourront voir et améliorer
