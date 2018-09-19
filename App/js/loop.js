const update = require('./update');
const draw = require('./draw');
const taiko = require('./taiko');

module.exports = function loop() {
  requestAnimationFrame(loop);
  if (!config.taiko.active) {
    update();
    draw();
  }
  else {
    taiko();
  }
}