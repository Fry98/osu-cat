const fs = require('fs');
const iohook = require('iohook');
const canv = document.getElementById('mainView');
const ctx = canv.getContext('2d');
const { ipcRenderer, screen } = require('electron');
const config = require('./config.json');
let images = [];
let mouseArea = 0;
let keyMap = [];

fs.readdir(__dirname + '/images', (err, files)=>{
  let imageCount = files.length;
  for (let i = 0; i < files.length; i++) {
    images[i] = new Image();
    images[i].src = `images/${files[i]}`;
    images[i].onload = ()=>{
      imageCount--;
      if (imageCount === 0) {
        require('./js/loop')();
      }
    };
  }
});

iohook.on('keydown', (e)=>{
  keyMap[e.rawcode] = true;
});

iohook.on('keyup', (e)=>{
  keyMap[e.rawcode] = false;
});

iohook.start();

{
  let leftCode = 0;
  let rightCode = 0
  ipcRenderer.on('keybind', ()=>{
    leftCode = config.leftClick;
    rightCode = config.rightClick;
    document.getElementById('left-inp').value = String.fromCharCode(leftCode);
    document.getElementById('right-inp').value = String.fromCharCode(rightCode);
    document.getElementById('bind-overlay').style.display = 'block';
  });

  document.getElementById('cancel').onclick = ()=>{
    document.getElementById('bind-overlay').style.display = 'none';
  };

  document.getElementById('save').onclick = ()=>{
    document.getElementById('bind-overlay').style.display = 'none';
    config.rightClick = rightCode;
    config.leftClick = leftCode;
    fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), 'utf8');
  };

  document.getElementById('left-inp').onkeydown = (e)=>{
    e.preventDefault();
    leftCode = e.keyCode;
    document.getElementById('left-inp').value = String.fromCharCode(e.keyCode);
  };

  document.getElementById('right-inp').onkeydown = (e)=>{
    e.preventDefault();
    rightCode = e.keyCode;
    document.getElementById('right-inp').value = String.fromCharCode(e.keyCode);
  };
}

ipcRenderer.on('mtoggle', ()=>{
  config.mouse = !config.mouse;
  fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), 'utf8');
});