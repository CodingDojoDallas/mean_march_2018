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

// Connect to socket
io.sockets.on('connection', (socket) => {
	console.log('Client/socket is connected!');
	console.log('Client/socket id is: ', socket.id);

	// Listening for form data from client
	socket.on('sending_form_data', (data) => {

		console.log(data);

		// send form data back to client
		socket.emit('responding_form_data', data);

		// create a random integer between 1 and 1000
		let rand_num = (Math.floor(Math.random()*1000)+1);

		// send random number to client
		socket.emit('responding_random_number', rand_num);
	});
});
