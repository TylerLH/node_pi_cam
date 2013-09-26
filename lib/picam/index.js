var exec = require('child_process').exec;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function PiCam (opts) {
  this.opts = opts || {};
  EventEmitter.call(this);
  var _this = this;

  // process.nextTick ensures EventEmitter is ready
  process.nextTick(function () { _this.init(); });
}

util.inherits(PiCam, EventEmitter);

PiCam.prototype.init = function () {
  this.mode = this.opts.mode || 'still';
  this.emit('ready');
}

PiCam.prototype.takePhoto = function (opts) {
  var _this = this;

  exec('raspistill -t 0 -o -', function (err, stdout, stderr) {
    if (err) {
      opts.callback("Error taking still photo. Check camera/RPi connection.", null);
    } else {
      opts.callback(null, stdout);
    }
  });

}

module.exports = PiCam;