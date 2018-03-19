let express = require('express')
	app = express(),
	path = require('path')
	session = require('express-session')
	body_parser = require('body-parser')

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
	res.render('index', {data: req.body});
});
let server = app.listen(6789, () => {
	console.log("listening on port 6789")

})
let io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) =>{
	console.log('i have been invaded..')
	socket.on('sending_survey_data', (name) => {
		console.log(name)
		socket.emit('received_data', name)
	})
})

