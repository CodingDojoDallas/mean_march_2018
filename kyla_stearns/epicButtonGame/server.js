let express 	= require('express');
	app 		= express();
	bodyParser  = require('body-parser');
	path		= require('path');
	session		= require('express-session');

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

let server 	= app.listen(5678, () => {
				console.log('Listening on 5678');
			});
	io 		= require('socket.io').listen(server);
// we are retrieving an object given to us from the listen method and we pass the object into the socket, listen method
// this returns to us the io object we are going to use to control our sockets

// now we set up the connection event
io.sockets.on('connection', (socket) => {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);
	// listening for information from client
	socket.on('sending_counter', () => {
		if ('count' in session){
			session.count += 1;
		}
		else{
			session.count = 1;
		}
		console.log("Someone violated me.");
		// responding back to client
		io.emit('respond_with_increment', session.count);	
	});

	socket.on('resetting_counter', () => {
			session.count = 0;
			let reset = session.count
			console.log("Thanks for setting me free.");
			// responding back to client
			io.emit('respond_with_reset', reset);
	});
})




