var exec = require('child_process').exec;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function PiCam (opts) {
  this.opts = opts;
  this.mode = opts.mode;
  EventEmitter.call(this);
}

util.inherits(PiCam, EventEmitter);

PiCam.prototype.takePhoto = function (opts) {
  _this = this;

  exec('raspistill -o -', function (err, stdout, stderr) {
    if (err) {
      console.log(err);
      opts.callback("Error taking still photo. Check camera/RPi connection.", null);
    } else {
      opts.callback(null, stdout);
    }
  });

}

module.exports = PiCam;