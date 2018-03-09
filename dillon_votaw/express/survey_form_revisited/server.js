
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
 res.render("index");
})

app.post('/result', function(req, res) {
  // console.log("POST DATA \n \n", req.body);

 res.render("result", {results: req.body});
})



var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  socket.on('posting_form', function(data){
    var message = `you have emitted the following information to the server {name: ${data.name}, location: ${data.location}, language: ${data.language}, comment: ${data.comment}}. `
    socket.emit('updated_message', message);
    var random = Math.floor(Math.random() * (1000 - 1) + 1);
    random_string = `your random number is ${random}.`
    socket.emit('random_number', random_string);
  })
})
