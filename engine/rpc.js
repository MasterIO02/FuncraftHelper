const sharedVars = require('./sharedVars')
const client = require('discord-rich-presence')(sharedVars.discordClientID);
const Store = require('electron-store');
const store = new Store();


exports.setDiscordRPC = () => {
    client.on("connected", () => {
        console.log("Connecté a Discord.")
        startTimestamp = new Date();
        client.updatePresence({
            state: `Pseudo IG : ${store.get('username')}`,
            details: "Attente du mode de jeu",
            startTimestamp,
            largeImageKey: 'funcrafthelper',
            largeImageText: `FuncraftHelper ${sharedVars.fhVersion}`,
        });

        setInterval(() => {
            client.updatePresence({
                state: `Pseudo IG : ${store.get('username')}`,
                details: store.get('rpStatus'),
                startTimestamp,
                largeImageKey: 'funcrafthelper',
                largeImageText: `FuncraftHelper ${sharedVars.fhVersion}`,
            })
        }, 15500);
    });

    process.on("unhandledRejection", console.error);

}

