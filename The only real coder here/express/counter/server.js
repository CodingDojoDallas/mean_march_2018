let express = require("express"),
	app = express(),
	path = require('path'),
	session = require('express-session'),
	bodyParser = require('body-parser');

app.use(express.static(__dirname + "/static"));
app.use(session({
	secret: 'SecretIsASecret',
	proxy: true,
	resave: false,
	saveUninitialized: true
}));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.get('/', (req,res) => {
	req.session.count++;
	if(req.session.count == null){
		req.session.count = 1;
	}
	let count = {
		"count" : req.session.count,
	}
	res.render("index", count)
});
app.post("/add", (req,res) => {
	req.session.count+=1;
	console.log(req.session.count);
	res.redirect('/');
});
app.post("/reset", (req,res)=>{
	req.session.count = 0;
	console.log(req.session.count);
	res.redirect('/');
})

app.listen(1337, function() {
	console.log("listening on port 1337");
});