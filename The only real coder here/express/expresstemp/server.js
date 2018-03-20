let express = require("express"),
	app = express(),
	path = require('path'),
	session = require('express-session'),
	body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/static")));
app.set('views', path.join(__dirname + '/views'));
app.use(session({
	secret: 'SecretIsASecret',
	proxy: true,
	resave: false,
	saveUninitialized: true
}));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
	res.render("index");
});

var server = app.listen(1337, function() {
	console.log("listening on port 1337");
});
var io = require("socket.io").listen(server);
io.sockets.on('connection', function (socket) {
console.log("Client/socket is connected!");
console.log("Client/socket id is: ", socket.id);
// all the server socket code goes in here
socket.on( "button_clicked", function (data){
	console.log( 'Someone clicked a button!  Reason: '  + data.reason);
	socket.emit( 'server_response', {response:  "sockets are the best!"});
})

});