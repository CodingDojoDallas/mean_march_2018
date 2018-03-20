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

session.nickname = {};


var server = app.listen(1337, () => {
	console.log("listening on port 1337");
});
var io = require("socket.io").listen(server);
io.sockets.on('connection', (socket)=> {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	socket.on("enter_new_chatter", (data)=>{
		session.nickname[socket.id] = data;
		socket.broadcast.emit("new_chatter", data),
		socket.emit("welcome", data);
	});
	socket.on("new_letter", (data)=>{
		console.log(data);
		if(data[0].value == ""){
			let err = {error:"Please type something"};
			socket.emit("message_error", err);
		}
		else{
			let user_info = {
				name : session.nickname[socket.id],
				letter : data[0].value,
			}
			io.emit("good_letter", user_info);
		}
	});
});