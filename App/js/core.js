const fs = require('fs');
const iohook = require('iohook');
const canv = document.getElementById('mainView');
const ctx = canv.getContext('2d');
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