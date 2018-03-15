let express = require('express')
	app = express(),
	path = require('path')
	session = require('express-session')
	body_parser = require('body-parser')

var	UUID = require('UUID')
	
	

app.use(body_parser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"static")));
app.use(session({
	secret: "fjadstjprjgkperjwkgjskfgmweogkaosfmgokgasg",
	proxy: true,
	resave: false,
	saveUinitialized: true
}))

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	req.session.name = req.body.name
	console.log(req.session.name)
	res.render('index');
});
let server = app.listen(6789, () => {
	console.log("listening on port 6789")

})
let io = require('socket.io').listen(server);
var count = 0;
io.sockets.on('connection', (socket)=>{
	console.log('connected')
	socket.userid = UUID();
	
	socket.emit('onconnection', { id: socket.userid});

	console.log('\t socket.io:: player'+socket.userid+'connected')
	
	socket.on('sending', (name) =>{
		
		count += 1;
		console.log('recieved')
		console.log(count)

		io.emit('recieved', count)

	});

	socket.on('resetting', (reset)=>{
		count = 0;
		console.log('resetting')
		io.emit('reseted', count)
	})


})