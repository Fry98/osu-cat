const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

function createWindow(){
  let win = new BrowserWindow({title: 'Bongo Cat for osu!', width: 640, height: 360, useContentSize: true});
  let shouldQuit = app.makeSingleInstance(() => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
  if (shouldQuit) {
    app.quit();
    return;
  }
  const template = [
    {
      label: "Options",
      submenu: [
        {
          label: 'Key Bindings',
          click: ()=>{
            win.webContents.send('keybind');
          }
        },
        {
          label: 'Toggle Mouse/Tablet',
          click: ()=>{
            win.webContents.send('mtoggle');
          }
        }
      ]
    },
    {
      label: "Mode",
      submenu: [
        {
          label: 'osu!std',
          click: ()=>{
            win.webContents.send('mode-std');
          }
        },
        {
          label: 'osu!taiko',
          click: ()=>{
            win.webContents.send('mode-taiko');
          }
        }
      ]
    },
    {
      label: 'Exit',
      click: ()=>{
        app.quit();
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  win.setMenu(menu);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'App/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', ()=>{
    win = null;
  });
  // win.toggleDevTools();
}

app.disableHardwareAcceleration();
app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
  if(process.platform !== 'darwin'){
    app.quit();
  }
});