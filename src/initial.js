require('./vendor/polyfill');
require('./vendor/performance');
require('./vendor/fastclick');
require('./vendor/parallax');
require('./vendor/CSSPlugin.min.js');
require('./vendor/TweenLite.min.js');
require('./vendor/EasePack.min.js');

window.requestAnimFrame = function() {
  // Polifyll requestAnimFrame
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame || function(a) {
      window.setTimeout(a, 1e3 / 60)
    }
}();
Date.now || (Date.now = function() {
    return (new Date).getTime()
  }
);
window.currentTime = function() {
  return Date.now()
};

const createAudioContext = require('ios-safe-audio-context');
window.audioContext = createAudioContext();

export default '';
