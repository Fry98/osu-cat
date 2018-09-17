const update = require('./update');
const draw = require('./draw');

module.exports = function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}