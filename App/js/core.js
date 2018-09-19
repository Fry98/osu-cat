const fs = require('fs');
const iohook = require('iohook');
const canv = document.getElementById('mainView');
const ctx = canv.getContext('2d');
const { ipcRenderer, screen } = require('electron');
let config = require('./config.json');
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
  let configTemp;
  ipcRenderer.on('keybind', ()=>{
    configTemp = JSON.parse(JSON.stringify(config));
    $('#left-inp').val(String.fromCharCode(configTemp.leftClick));
    $('#right-inp').val(String.fromCharCode(configTemp.rightClick));
    $('#lct').val(String.fromCharCode(configTemp.taiko.cLeft));
    $('#rct').val(String.fromCharCode(configTemp.taiko.cRight));
    $('#lrt').val(String.fromCharCode(configTemp.taiko.rLeft));
    $('#rrt').val(String.fromCharCode(configTemp.taiko.rRight));
    $('#bind-overlay').css('display', 'block');
  });

  $('#cancel').onclick = ()=>{
    $('#bind-overlay').css('display', 'none');
  };

  $('#save').onclick = ()=>{
    console.log('ran');
    $('#bind-overlay').css('display', 'none');
    config = JSON.parse(JSON.stringify(configTemp));
    fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), 'utf8');
  };

  $('#left-inp').onkeydown = (e)=>{
    e.preventDefault();
    configTemp.leftClick = e.keyCode;
    $('#left-inp').val(String.fromCharCode(e.keyCode));
  };

  $('#right-inp').onkeydown = (e)=>{
    e.preventDefault();
    configTemp.rightClick = e.keyCode;
    $('#right-inp').val(String.fromCharCode(e.keyCode));
  };

  $('#lct').onkeydown = (e)=>{
    e.preventDefault();
    configTemp.taiko.cLeft = e.keyCode;
    $('#lct').val(String.fromCharCode(e.keyCode));
  };

  $('#rct').onkeydown = (e)=>{
    e.preventDefault();
    configTemp.taiko.cRight = e.keyCode;
    $('#rct').val(String.fromCharCode(e.keyCode));
  };

  $('#lrt').onkeydown = (e)=>{
    e.preventDefault();
    configTemp.taiko.rLeft = e.keyCode;
    $('#lrt').val(String.fromCharCode(e.keyCode));
  };

  $('#rrt').onkeydown = (e)=>{
    e.preventDefault();
    configTemp.taiko.rRight = e.keyCode;
    $('#rrt').val(String.fromCharCode(e.keyCode));
  };
}

ipcRenderer.on('mtoggle', ()=>{
  config.mouse = !config.mouse;
  fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), 'utf8');
});

ipcRenderer.on('mode-std', ()=>{
  config.taiko.active = false;
  fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), 'utf8');
});

ipcRenderer.on('mode-taiko', ()=>{
  config.taiko.active = true;
  fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), 'utf8');
});