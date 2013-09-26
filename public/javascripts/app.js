var socket = io.connect();
socket.on('connect', function () {
  var btn = document.getElementById('take-photo');

  btn.onclick = function () {
    socket.emit('photoRequest');
  }
});