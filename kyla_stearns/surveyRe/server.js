let express 	= require('express');
	app 		= express();
	bodyParser  = require('body-parser');
	path		= require('path');

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended:true }));

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
	socket.on('posting_form_data', (surveyData) => {
		console.log(surveyData);
		console.log("Someone submitted a form!");
		// responding back to client
		socket.emit('respond_with_data', surveyData);
		let random_number = Math.floor(Math.random()*1000)+1;
		socket.emit('send_random_number', random_number);
	});

	// <p> You emitted the following information to the server: <%=  %> </p>
	// <p> Your lucky number emitted by the server is <%=  %> </p>

	// let random_number = Math.random(1,1000)

})




