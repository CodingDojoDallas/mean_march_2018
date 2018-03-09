
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'himitsu'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {


 res.render('index');
})



var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);
if(server_count == null){
  var server_count = 1;
}
io.sockets.on('connection', function (socket) {

  socket.on('new_connection', function(data){
    io.emit( 'count_response', server_count);
  })
  socket.emit('connection_response', server_count);
  console.log('hello');

  socket.on( "button_clicked", function (data){

    server_count ++;
    io.emit( 'count_response', server_count);
  })
  socket.on( "reset_clicked", function (data){
    server_count = 1;
    io.emit( 'count_response', server_count);
  })
})
