exports.mainWindowScripts = async () => {
    // Check si c'est la première fois que FH est lancé
    if (store.get('firstLaunch') == undefined) {
        document.getElementById("mainTextArea").value += "Il s'agit visiblement de la première fois que FuncraftHelper est lancé. Modifiez les paramètres puis relancez le programme !\n";
        store.set('firstLaunch', false)
    } else {
        const checkGamemode = require('./checkGame').checkGamemode
        checkGamemode()
    }

    // Vérifie si le système est Mac OS
    if (store.get('systemType') == "darwin") {
        document.getElementById("mainTextArea").value += "MacOS n'est pas officiellement supporté par FuncraftHelper. Merci de ne pas me faire de rapport de bugs pour ce système.\n\n";
    }
}