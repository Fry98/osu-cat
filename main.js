const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow(){
  let win = new BrowserWindow({title: 'Osu! Cat', width: 640, height: 340, useContentSize: true});
  win.setMenu(null);
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