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

let server = app.listen(5678, () => {
	console.log('listening on port 5678');
});

let io = require('socket.io').listen(server);

let count = 0;

// Connect to socket
io.sockets.on('connection', (socket) => {
	console.log('Client/socket is connected!');
	console.log('Client/socket id is: ', socket.id);

	socket.on('sending_counter', (data) => {
		count ++;
		console.log(count);

		io.emit('increase_click_count', { response: count });
	});

	socket.on('sending_reset_counter', (data) => {
		count = 0;
		console.log(count);
		io.emit('reset_click_count', { response: count });
	});
});