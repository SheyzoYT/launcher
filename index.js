const { app, BrowserWindow, ipcMain, Tray } = require('electron');
const path = require('path');
const ipc = ipcMain;

const createWindow = () => {
    const win = new BrowserWindow({
        icon: __dirname + "./public/icons/512x512.png",
        width: 400,
        minWidth: 400,
        height: 520,
        minHeight: 520,
        resizable: false,
        frame: false,
        center: true,
        transparent: true,
        fullscreenable: false,
        backgroundColor: "#5865f2",
        webPreferences: {
            nativeWindowOpen: true,
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    
    ipc.on('minimizeApp', () => {
        win.minimize()
    })

    ipc.on('closeApp', () => {
        win.close()
    })

    const getAppDataPath = require("appdata-path");
    const { Client } = require('minecraft-launcher-core');
    const launcher = new Client();
    let opts = {
        root: getAppDataPath(".eronix")
    }
    launcher.launch(opts);

    setTimeout(() => {     
        const getAppDataPath = require("appdata-path");
        const fs = require('fs');
        let profil = {
            "pseudo": ``,
            "token": ``,
        }

        let donnees = JSON.stringify(profil)
        fs.writeFileSync(getAppDataPath(".eronix/userData.json"), donnees)
    }, 2000);

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})