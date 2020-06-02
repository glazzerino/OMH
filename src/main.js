const {app, BrowserWindow} = require("electron")

app.whenReady().then(() => {
    //Main app function, 
    // controls lifetime and renderer startup
    var window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadFile("src/index.html");
    // window.webContents.openDevTools();    
})