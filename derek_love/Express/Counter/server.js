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
	//need conditional, otherwise session.count will never increment
	if(session.count == null){
		session.count = 1;
	}

	let data = {
		'count': session.count
	}

	res.render('index', data);
});

app.post('/add', (req, res) => {
	session.count += 2;
	res.redirect('/');
});

app.post('/reset', (req, res) => {
	session.count = 1;
	res.redirect('/');
})

app.listen(8000, () => {
	console.log('listening on port 8000');
});