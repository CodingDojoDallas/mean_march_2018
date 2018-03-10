let express 	= require('express');
	app 		= express();
	bodyParser  = require('body-parser');
	path		= require('path');
	session 	= require('express-session');

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(session({
	secret: 'kds1kfal-2poi-fsd5er-se6cgn99-da0jkfa4lsa-2nvfje-ow8vj-woi',
	proxy: true,
	resave: false,
	saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	res.render('index');
});

app.post('/chat', (req,res) => {
	console.log(req.body);
	res.render('chat', {user: req.body});
});

app.post('/room', (req,res) => {
	res.redirect('/chat', {chat_message: req.body});
});

// app.get('/chat', (req,res) => {
// 	res.render('chat');
// })

// let server 	= app.listen(5678, () => {
// 				console.log('Listening on 5678');
// 			});
	// io 		= require('socket.io').listen(server);
	http	= require('http').Server(app);
	io 		= require('socket.io')(http);

http.listen(5678, () => {
	console.log('Listening on 5678');
});
// we are retrieving an object given to us from the listen method and we pass the object into the socket, listen method
// this returns to us the io object we are going to use to control our sockets

// now we set up the connection event
// io.sockets.on('connection', (socket) => {
io.on('connection', (socket) => {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	socket.on('disconnect', () => {
		console.log("Client/socket has disconnected!");
	console.log("Client/socket id is: ", socket.id);
	});
	// listening for information from client
	socket.on('user_joined', () => {
		// console.log(userData);
		console.log("Someone joined our chat!");
		// responding back to client
		io.emit('respond_with_user');

	socket.on('chat message', (msg) => {
		console.log('message: ', msg);
	});
		
});



})