let express = require('express'),
	app = express(),
	body_parser = require('body-parser'),
	session = require('express-session'),
	path = require('path');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/static')));
app.use(session({
	secret: 'SecretIsASecret',
	proxy: true,
	resave: false,
	saveUninitialized: true
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index')
});

let server = app.listen(8000, () => {
	console.log('listening on port 8000');
});

let io = require('socket.io').listen(server);

// Connect to socket when server is loaded
io.sockets.on('connection', (socket) => {
	console.log('Client/socket is connected!');
	console.log('Client/socket id is: ', socket.id);
});