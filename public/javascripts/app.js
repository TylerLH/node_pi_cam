var socket = io.connect();
var btn = document.getElementById('take-photo');
var viewport = document.getElementById('#viewport');

btn.onclick = function () {
  socket.emit('photoRequest');
}

socket.on('photo', function (data) {
  viewport.src = "data:image/png;base64, "+data.image;
});