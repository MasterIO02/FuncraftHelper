const axios = require("axios")

async function sendData() {

    const data = [{
        time: new Date,
        igUsername: store.get("username"),
        sendAdditionalData: store.get("sendAdditionalData"),
        fhManualEnter: store.get("manualEnter"),
        fhTheme: store.get("theme"),
        fhAdblocker: store.get("adblocker"),
        fhModeNumber: store.get("modeNumber"),
        fhOwnStatsSearchFrequency: store.get("ownStatsSearchFrequency"),
        fhVersion: sharedVars.fhVersion
    }]

    if (store.get('sendAdditionalData')) {
        const si = require('systeminformation')
        var cpu, osInfo, system, memory, gpu, username
        async function getSystemInfo() {
            await si.users().then(data => {
                username = data[0].user
            })
            await si.cpu().then(data => {
                cpu = `${data.manufacturer} ${data.brand} ${data.speed} ${data.cores}`
            })
            await si.osInfo().then(data => {
                osInfo = `${data.distro} ${data.release} ${data.arch}`
            })
            await si.system().then(data => {
                system = `${data.manufacturer} ${data.model}`
            })
            await si.mem().then(data => {
                memory = data.total
            })
            await si.graphics().then(data => {
                gpu = `${data.controllers[0].vendor} ${data.controllers[0].model}`
            })
        }
        await getSystemInfo()

        data.push({
            cpt_username: username,
            cpu: cpu,
            os_info: osInfo,
            system: system,
            memory: memory,
            gpu: gpu,
        })
    }

    axios.post('https://funcrafthelper.issou.best/api/data', data)
        .catch((error) => {
            console.log(error)
        })
}
if (store.get('firstLaunch') !== undefined) {
    sendData()
}