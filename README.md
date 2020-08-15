# FuncraftHelper
[![HitCount](http://hits.dwyl.com/MasterIO02/FuncraftHelper.svg)](http://hits.dwyl.com/MasterIO02/FuncraftHelper)
[![GitHub All Releases](https://img.shields.io/github/downloads/MasterIO02/FuncraftHelper/total.svg)](https://github.com/MasterIO02/FuncraftHelper/releases/)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-club-penguin.svg)](https://forthebadge.com)

FuncraftHelper est un programme permettant de voir les statistiques des joueurs contre qui vous jouez sur Funcraft en temps réel et automatiquement.
Fonctionne avec tous les launchers Minecraft, dont le AZ Launcher. **Aucune modifications du client du jeu n'est effectué !**
N'hésitez pas à envoyer vos retours de bugs, suggestions ou autres dans la section "issues" dans GitHub !
Actuellement, seuls les modes de jeu Hikabrain 1v1 et Rush 1v1 sont supportés, mais les autres modes vont prochainement être développés !
Windows et Linux sont supportés, je peux pas compiler pour Mac parce que j'en ai pas.

# Vitesse et performances
FuncraftHelper est fait pour fonctionner rapidement, toutefois, suivant les performances de votre ordinateur, FuncraftHelper peut être assez lent. Des optimisations seront réalisées dans la mesure du possible pour affecter le moins possible les performances, et les améliorer.
Il est NORMAL que tous les joueurs ne soient pas détectés. Le plus gros problème est d'arriver dans un lobby avec un joueur déjà dedans, malheureusement pour l'instant il ne peut pas être détecté et ce n'est PAS UN BUG ! Si vous voulez vraiment voir les stats de votre adversaire avant de commencer la partie, vous pouvez toujours quitter la game et en relancer une.
En utilisant l'API de LordMorgoth (https://lordmorgoth.net), les performances de votre machine ainsi que la vitesse de recherche des statistiques seront grandement améliorées. Cependant, cette API est limitée à 1 requête toutes les 10 secondes, donc inutilisable dans des parties avec plus d'un joueur a trouver les stats.

En utilisant la navigation intégrée de FuncraftHelper, les performances étaient bonnes sur un i5-6500 et un i7-4500u et l'utilisation CPU de FuncraftHelper ne dépassait pas les 6-7% en attente d'un mode de jeu. 
Pendant la recherche de statistiques, le processeur peut monter à 100%, c'est tout à fait normal. Mettre FuncraftHelper sur un SSD est FORTEMENT conseillé pour avoir les stats avant que la partie ne commence si vous n'utilisez pas l'API !

FuncraftHelper fonctionne mieux sous Linux que Windows, peut être qu'il serait temps de changer de système ?

# Installation
Le programme est portable, c'est à dire qu'il ne s'installe pas, par contre il écrit ses fichiers de config dans le .local sur Linux et dans AppData/Roaming sous Windows.

# Utilisation
Après avoir lancé FuncraftHelper, il va vous demander de modifier des paramètres avant de commencer a utiliser FH.
Assurez vous d'avoir Chrome d'installé, et changez votre nom d'utilsateur dans "emplacement de latest.log"
Si vous êtes sous Windows, LANCEZ LE PROGRAMME EN ADMINISTRATEUR ! Les performances sont bien meilleures. 

# Compilation
Si vous voulez compiler FuncraftHelper depuis le code source, vous pouvez importer les fichiers dans votre VS Code et exécuter "npm run dist" pour compiler FH suivant le système utilisé. 

# Problèmes communs
### Hikabrain 1v1 choisi / Rush Fast 1v1 choisi mais pas d'autres lignes après
Ce problème sera corrigé dans de futures optimisations (j'espère).

# Roadmap / Améliorations notées
- Optimiser et intégrer tout les modes de jeu de Funcraft.
- Avoir la possibilité de rentrer le pseudo de l'adversaire quand il n'a pas été détecté.
- Faire une interface utilisateur et donc rendre l'installation facile avec un installeur.
- Faire des bases de données hors-ligne pour alléger les ordinateurs les moins puissants qui n'auront pas à aller sur le site de Funcraft à chaque fois qu'il doit rechercher un joueur
- Mettre en place un serveur permettant de mettre des notes aux joueurs rencontrés que les autres utilisateurs de FuncraftHelper pourront voir et améliorer.
