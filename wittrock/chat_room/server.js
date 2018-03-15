var session = require('express-session');
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var http = require('http');
var path = require( "path");
var UUID = require('UUID');
session.user_name = {};

// invoke var express and store the resulting application in var app
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'codingdojorocks',
	proxy: true,
	resave: false,
	saveUninitialized: true,
}));
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');


app.get('/', (req, res) => {

	res.render("index");
});


//

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);


io.sockets.on('connection', (socket) => {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);
	// all the server socket code goes in here
	socket.on("client_user_name", (data) => {
	    console.log(data);
	    // socket.userid = UUID();
	    session.user_name[socket.id] = data;
	    console.log(session.user_name);
	    // session.user_name[socket.id] = data;
	    // session.user_name = data;
	    socket.broadcast.emit('server_username', data);
	});
	socket.on("sent_comment", (data) => {
		console.log(data[0].value);
		var user_info = {
			user_name: session.user_name[socket.id],
			comment: data[0].value
		}
		io.emit("response_comment", user_info);
	})
})

