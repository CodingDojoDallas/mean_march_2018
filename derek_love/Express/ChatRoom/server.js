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

session.user_name = {};

session.all_messages = [];

// Connect to socket
io.sockets.on('connection', (socket) => {
	console.log('Socket connected!');
	console.log('Socket ID: ', socket.id);

	// listen for user info from client
	socket.on('sending_new_user_data', (data) => {

		// assign unique id to each userName (data = userName)
		session.user_name[socket.id] = data;

		// send user info to all users, except current user
		socket.broadcast.emit('added_new_user', data);

		// send all previous comments to current user
		socket.emit('show_all_comments', session.all_messages);
	});

	// listen for comment info from client
	socket.on("sent_comment", (data) => {

		// object that holds user who made comment, and the comment
		let user_info = {
			user_name: session.user_name[socket.id],
			comment: data[0].value
		}

		// add new comment and user to array holding all comments
		session.all_messages.push(user_info);
		
		// update array
		session.all_messages = session.all_messages;

		// send new comment info to client
		io.emit("response_comment", user_info);
	});
});