# FuncraftHelper
## Ayez une longueur d'avance sur vos adversaires !
[![HitCount](http://hits.dwyl.com/MasterIO02/FuncraftHelper.svg)](http://hits.dwyl.com/MasterIO02/FuncraftHelper)
[![GitHub All Releases](https://img.shields.io/github/downloads/MasterIO02/FuncraftHelper/total.svg)](https://github.com/MasterIO02/FuncraftHelper/releases/)

> :warning: **Archivage**: Ce repository est maintenant archivé, vu que Funcraft ferme ses portes le 26 août 2023. Adieu Funcraft, a jamais dans nos cœurs.

FuncraftHelper est un projet semi abandonné, je ne ferais plus de mises à jour de fonctionnalités mais en ferais pour que le logiciel soit toujours utilisable si la façon de fonctionner du chat de Funcraft change ou si leur site change.
Si un jour FuncraftHelper venait à être utilisé par plus de personnes je pourrais réécrire le logiciel car là le code est vraiment pas ouf et j'en suis pas super fier.

Vous voulez aider à rendre FuncraftHelper meilleur, tester ses nouvelles fonctionnalités en avant première ? Rejoignez le Discord pour devenir testeur !
https://discord.gg/QfbZBPA

FuncraftHelper est un logiciel crée avec Electron permettant de voir les statistiques des joueurs contre qui vous jouez sur Funcraft en temps réel et automatiquement.
Il s'adaptera à vos actions dans le jeu pour nécessiter le moins d'intervention possible.

Fonctionne avec tous les launchers Minecraft, dont le AZ Launcher. **Aucune modifications du client du jeu n'est effectué !**
Tous les modes de jeu comprenant 16 joueurs ou moins sont fonctionnels (Shootcraft inclus, à l'exception du Rush 5v5).

FuncraftHelper vous indiquera le ratio (k/d), winrate, temps de jeu, morts, kills, et points et les victoires de l'adversaire.
Il est aussi préparé à la plupart des éventualités qui pourraient arriver dans un lobby.

N'hésitez pas à envoyer vos retours de bugs, suggestions ou autres dans la section issues dans GitHub ou sur Discord !
Fonctionne sous Windows et Linux. Les joueurs Mac devront un peu modifier le code de FuncraftHelper et compiler d'eux même.

# Vitesse et performances
Il est NORMAL que tous les joueurs ne soient pas détectés. Sachant que FH utilise le chat du jeu pour trouver les joueurs, si vous arrivez dans une game a 10/12 joueurs en Skywars par exemple, tous les joueurs qui sont arrivés avant vous ne peuvent pas être détéctés et ce n'est pas un bug.

En utilisant l'API de LordMorgoth (https://lordmorgoth.net), le "moteur" de LordBot, les performances de votre machine ainsi que la vitesse de recherche des statistiques seront grandement améliorées. Cependant, cette API est limitée à 1 requête toutes les 10 secondes, donc inutilisable dans tous les autres modes de jeux que le Rush et Hikabrain 1v1.

Pendant la recherche de statistiques, le processeur peut monter à 100%, c'est tout à fait normal. Avoir Minecraft et votre navigateur (Chrome/Chromium ou autre navigateur basé sur Chromium) sur un SSD est FORTEMENT conseillé pour avoir les stats avant que la partie ne commence !
Depuis la version 2.2.0, FuncraftHelper ne consommera plus que 2-3% de CPU maximum.

# Installation
Le programme est portable, c'est à dire qu'il ne s'installe pas, par contre il écrit ses fichiers de config dans le .local sur Linux et dans AppData/Roaming sous Windows.

# Utilisation
Après avoir lancé FuncraftHelper, il va vous demander de modifier des paramètres avant de commencer à l'utiliser.
Assurez vous d'avoir Chrome, Chromium ou un autre navigateur basé sur ce dernier d'installé (Chrome est sélectionné par défaut, il faut changer l'emplacement du navigateur pour utiliser Chromium ou un autre navigateur).

# Comment marche FuncraftHelper ?
En gros, il va vérifier le fichier de log Minecraft en continu pour y détecter les joueurs qui se connectent au games lancées sur Funcraft. Quand il a trouvé le joueur, il va chercher ses stats sur le site de Funcraft sans intervention humaines puis les afficher. 

# Compilation
Si vous voulez compiler FuncraftHelper depuis le code source, vous pouvez importer les fichiers dans votre IDE et exécuter "npm run dist" pour compiler FH dans votre système actuel. Assurez vous d'avoir installé toutes les dépendences du package.json avant.

# Skinning
Depuis la version 2.2.0, FuncraftHelper supporte les thèmes ! Vous pouvez en créer un plutôt facilement avec un peu de CSS.
Un tutoriel est/sera disponible dans la section Wiki de ce repository.
