
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware({
  src: __dirname + '/assets',
  dest: __dirname + '/public'
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var PiCam = require('./lib/picam');
var camera = new PiCam({mode: 'still'});

camera.takePhoto({
  callback: function (err, imgBuffer) {
    if(err) {
      return console.log(err)
    } else {
      console.log(imgBuffer);
      console.log(imgBuffer.toString());
    }
  }
})


io.sockets.on('connection', function (socket) {
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
