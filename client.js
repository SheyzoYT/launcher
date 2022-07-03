const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const getAppDataPath = require("appdata-path");
const getAppDataPat = require("appdata-path");

const setPseudo = require(getAppDataPat(".eronix/userData.json"));
const username = setPseudo.pseudo;
const password = setPseudo.token;

let opts = {
    clientPackage: null,
    authorization: Authenticator.getAuth(username, password.value),
    root: getAppDataPath(".eronix/"),
    version: {
        number: "1.12.2",
    },
    forge: "./Eronix/forge.jar",
    memory: {
        max: "6G",
        min: "1G"
    },
    server: {
        host: "play.eronix.fr",
        //port: "25565"
    }
}


function play() {
    alert("Exécution du jeu, Merci de patienter quelques instants.\nRun the game, Please wait a few moments.")
    launcher.launch(opts);
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
    const game = document.getElementById('startGame');
    game.disabled = true;

    setTimeout(() => {
        game.disabled = false;
    }, 30000);
}