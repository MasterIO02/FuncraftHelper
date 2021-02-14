exports.startSettingsScript = async () => {
    const Store = require('electron-store');
    const store = new Store();
    const sharedVars = require('./sharedVars')

    // Bouton benchmark -> lancement du benchmark
    document.getElementById("benchmark-btn").addEventListener("click", (e) => {
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion} - Benchmark en cours`
        document.getElementById("currentTitle").style.visibility = "visible"
        document.getElementById("buttons").style.visibility = "hidden"
        document.getElementById("settingsWindow").style.visibility = "hidden"
        document.getElementById("notifications").style.visibility = "hidden"
        document.getElementById("mainObjects").style.visibility = "hidden"
        document.getElementById("benchmarkObjects").style.visibility = "visible"
        const launchBenchmark = require('./benchmark').launchBenchmark
        launchBenchmark()
    })

    // Bouton fermer benchmark
    document.getElementById("close-benchmark-btn").addEventListener("click", (e) => {
        document.getElementById("currentTitle").innerHTML = `FuncraftHelper ${sharedVars.fhVersion}`
        document.getElementById("currentTitle").style.visibility = "unset"
        document.getElementById("notifications").style.visibility = "visible"
        document.getElementById("benchmarkObjects").style.visibility = "hidden"
        document.getElementById("mainObjects").style.visibility = "visible"
        document.getElementById("buttons").style.visibility = "visible"
        document.getElementById("state").style.visibility = "visible"
        document.getElementById("close-benchmark-btn").style.visibility = "hidden"
        document.getElementById("bench-test-1").innerHTML = "Test 1 : En cours..."
        document.getElementById("bench-test-2").innerHTML = "Test 2 : En cours..."
        document.getElementById("bench-test-3").innerHTML = "Test 3 : En cours..."
        document.getElementById("bench-test-all").innerHTML = ""
    })



    // Initialisation du system type
    document.getElementById("systemType").innerHTML = store.get('systemType')

    // Script pour switch MorgothAPI
    if (store.get('useMorgothAPI') == true) {
        document.getElementById("useMorgothAPISwitch").checked = true
        document.getElementById("APIKeyText").hidden = false
        document.getElementById("MorgothAPIKeyTextArea").hidden = false
    } else {
        document.getElementById("useMorgothAPISwitch").checked = false
    }

    document.getElementById("useMorgothAPISwitch").addEventListener("click", (e) => {
        if (store.get('useMorgothAPI') == true) {
            store.set('useMorgothAPI', false)
            document.getElementById("APIKeyText").hidden = true
            document.getElementById("MorgothAPIKeyTextArea").hidden = true

        } else {
            store.set('useMorgothAPI', true)
            document.getElementById("APIKeyText").hidden = false
            document.getElementById("MorgothAPIKeyTextArea").hidden = false
        }
    })

    // Script pour switch headless
    if (store.get('headless') == true) {
        document.getElementById("headlessSwitch").checked = true
    } else {
        document.getElementById("headlessSwitch").checked = false
    }

    document.getElementById("headlessSwitch").addEventListener("click", (e) => {
        if (store.get('headless') == true) {
            store.set('headless', false)
        } else {
            store.set('headless', true)
        }
    })

    // Script pour switch manualEnter
    if (store.get('manualEnter') == true) {
        document.getElementById("manualEnter").checked = true
    } else {
        document.getElementById("manualEnter").checked = false
    }

    document.getElementById("manualEnter").addEventListener("click", (e) => {
        if (store.get('manualEnter') == true) {
            store.set('manualEnter', false)
        } else {
            store.set('manualEnter', true)
        }
    })

    // Script pour boutons radio modes
    if (store.get('modeNumber') == 1) {
        document.getElementById("radioMode1btn").checked = true
    } else if (store.get('modeNumber') == 2) {
        document.getElementById("radioMode2btn").checked = true
    }
    document.getElementById("radioMode1btn").addEventListener("click", (e) => {
        store.set('modeNumber', 1)
    })
    document.getElementById("radioMode2btn").addEventListener("click", (e) => {
        store.set('modeNumber', 2)
    })

    // Script pour menu liste options recherche propre stats
    var freq = store.get('ownStatsSearchFrequency')
    switch (true) {
        case freq == 1:
            document.getElementById("freqOpt1").selected = true
            break;

        case freq == 2:
            document.getElementById("freqOpt2").selected = true
            break;

        case freq == 3:
            document.getElementById("freqOpt3").selected = true
            break;

        case freq == 4:
            document.getElementById("freqOpt4").selected = true
            break;

        case freq == 5:
            document.getElementById("freqOpt5").selected = true
            break;
    }
    document.getElementById("selectSearchFrequecy").addEventListener("change", (e) => {
        store.set('ownStatsSearchFrequency', e.target.value)
    })


    // Script pour switch toggleAdblocker
    if (store.get('adblocker') == true) {
        document.getElementById("toggleAdblocker").checked = true
    } else {
        document.getElementById("toggleAdblocker").checked = false
    }

    document.getElementById("toggleAdblocker").addEventListener("click", (e) => {
        if (store.get('adblocker') == true) {
            store.set('adblocker', false)
        } else {
            store.set('adblocker', true)
        }
    })


    // Script pour switch visibilityBox
    if (store.get('visibilityBox') == true) {
        document.getElementById("visibilityBox").checked = true
        $(".visibilityBox").css("opacity", "0.6")
    } else {
        document.getElementById("visibilityBox").checked = false
        $(".visibilityBox").css("opacity", "0")
    }

    document.getElementById("visibilityBox").addEventListener("click", (e) => {
        if (store.get('visibilityBox') == true) {
            store.set('visibilityBox', false)
            $(".visibilityBox").css("opacity", "0")
        } else {
            store.set('visibilityBox', true)
            $(".visibilityBox").css("opacity", "0.6")
        }
    })

    // Script pour textarea username
    document.getElementById("usernameTextArea").value = store.get('username')
    document.getElementById("usernameTextArea").addEventListener("input", (e) => {
        store.set('username', document.getElementById('usernameTextArea').value)
    })

    // Script pour textarea morgothAPIkey
    document.getElementById("MorgothAPIKeyTextArea").value = store.get('MorgothAPIKey')
    document.getElementById("MorgothAPIKeyTextArea").addEventListener("input", (e) => {
        store.set('MorgothAPIKey', document.getElementById('MorgothAPIKeyTextArea').value)
    })

    // Script pour emplacement latest.log
    document.getElementById("logFileLocationTextArea").value = store.get('logFileLocation')
    document.getElementById("logFileLocationTextArea").addEventListener("input", (e) => {
        store.set('logFileLocation', document.getElementById('logFileLocationTextArea').value)
    })

    // Script pour emplacement chrome
    document.getElementById("chromeLocationTextArea").value = store.get('chromeLocation')
    document.getElementById("chromeLocationTextArea").addEventListener("input", (e) => {
        store.set('chromeLocation', document.getElementById('chromeLocationTextArea').value)
    })

    // Script pour switch sendAdditionalData
    if (store.get('sendAdditionalData') == true) {
        document.getElementById("sendAdditionalDataSwitch").checked = true
    } else {
        document.getElementById("sendAdditionalDataSwitch").checked = false
    }

    document.getElementById("sendAdditionalDataSwitch").addEventListener("click", (e) => {
        if (store.get('sendAdditionalData') == true) {
            store.set('sendAdditionalData', false)
        } else {
            store.set('sendAdditionalData', true)
        }
    })

}