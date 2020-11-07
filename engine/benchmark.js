exports.launchBenchmark = async () => {
    const sharedVars = require('./sharedVars.js')
    const Store = require('electron-store');
    const store = new Store();
    sharedVars.playerUsername = store.get('username')
    sharedVars.playerNumber = 2
    sharedVars.gameChosen = "Hikabrain"
    sharedVars.inBenchmark = true
    console.log(sharedVars.playerUsername)

    var start = performance.now()
    await benchmark()
    var end = performance.now()
    var secondsTest1String = (((end - start) % 60000) / 1000).toFixed(2)
    var secondsTest1 = parseFloat(secondsTest1String)
    document.getElementById("bench-test-1").innerHTML = "Test 1 : " + secondsTest1 + " secondes."

    start = performance.now()
    await benchmark()
    end = performance.now()
    var secondsTest2String = (((end - start) % 60000) / 1000).toFixed(2)
    var secondsTest2 = parseFloat(secondsTest2String)
    document.getElementById("bench-test-2").innerHTML = "Test 2 : " + secondsTest2 + " secondes."

    start = performance.now()
    await benchmark()
    end = performance.now()
    var secondsTest3String = (((end - start) % 60000) / 1000).toFixed(2)
    var secondsTest3 = parseFloat(secondsTest3String)
    document.getElementById("bench-test-3").innerHTML = "Test 3 : " + secondsTest3 + " secondes."

    var roundedTests = ((secondsTest1 + secondsTest2 + secondsTest3) / 3).toFixed(2)
    document.getElementById("bench-test-all").innerHTML = "Moyenne : " + roundedTests + " secondes."

    sharedVars.inBenchmark = false
    document.getElementById("close-benchmark-btn").style.visibility = "visible"


    async function benchmark() {
        const navigatePlayer = require('./navigatePlayer').navigatePlayer
        await navigatePlayer()
    }
}