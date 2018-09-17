const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

function createWindow(){
  let win = new BrowserWindow({title: 'Bongo Cat for osu!', width: 640, height: 360, useContentSize: true});  
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
          label: 'Exit',
          click: ()=>{
            app.quit();
          }
        }
      ]
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

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
  if(process.platform !== 'darwin'){
    app.quit();
  }
});