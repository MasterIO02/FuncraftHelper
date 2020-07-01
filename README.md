# FuncraftHelper
FuncraftHelper est un programme permettant de voir les statistiques des joueurs contre qui vous jouez sur Funcraft en temps réel et automatiquement.
Fonctionne avec tous les launchers Minecraft, dont le Pactify. **Aucune modifications du client du jeu n'est effectué !**
N'hésitez pas à envoyer vos retours de bugs dans la section "issues" dans GitHub !
Actuellement, seuls les modes de jeu Hikabrain 1v1 et Rush 1v1 sont supportés, mais les autres modes vont prochainement être développés !
Windows et Linux sont supportés, je ne peux cependant pas tester sur Mac mais ça devrait fonctionner à peu près comme Linux.


# Installation
L'installation ne se fait pas comme n'importe quel logiciel ou il faut double cliquer, et cliquer sur suivant jusqu'à ce que l'installation commence...
Etant donné que FuncraftHelper est en développement assez précoce, il va falloir mettre la main à la pâte.
1. Installez node.js, depuis leur site : https://nodejs.org. Pendant l'installation, sous Windows, cochez bien "Add to PATH" à la fin de l'installation et redémarrez votre ordinateur !
2. Téléchargez les fichiers source de FuncraftHelper de ce repository et mettez les dans n'importe quel dossier sur votre ordinateur.
3. Ouvrez un Terminal/PowerShell dans ce dossier puis tapez : npm install puppeteer, et ensuite npm install readline.
4. Modifiez le fichier config.js !! Vous devez indiquer a FuncraftHelper votre pseudo Funcraft et l'emplacement de votre .pactify ou .minecraft, puis changer vos paramètres selon vos préférences. Tout est expliqué dedans !
5. Ensuite faites "node ./FuncraftHelper.js" et le tour est joué ! Vous pouvez aussi créer un fichier bat/batch pour linux avec la commande pour ne pas avoir à ouvrir un Terminal/PowerShell à chaque fois !

# Problèmes communs
### Timeout, textContent undefined ?
Si vous rencontrez des problèmes de type timeout ou textContent undefined, le problème vient des XPath du site de Funcraft qui changent après un certain temps. Pour l'instant je ne peux pas utiliser d'autres moyens de recherche de texte que des XPath.
Je ferais des correctifs le plus rapidement possible mais si vous voulez vraiment utiliser FuncraftHelper, vous pouvez : ouvrir Chrome/Chromium (ne fonctionne pas avec d'autres navigateurs, même ceux basés sur Chromium tels que Edge ou Opera !) et naviguer sur la page de stats d'un joueur. Inspecter l'élément et copier les XPath que vous devez remplacer.
