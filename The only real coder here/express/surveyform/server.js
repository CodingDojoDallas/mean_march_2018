let express = require("express"),
	app = express(),
	path = require('path'),
	session = require('express-session'),
	body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.use(session({
	secret: 'SecretIsASecret',
	proxy: true,
	resave: false,
	saveUninitialized: true
}));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
	res.render("index");
});
app.post("/result",(req,res)=>{
	console.log("form info",req.body)
	res.render("result", { info: req.body });
});
app.post("/goback", (req,res)=>{
	res.redirect("/");
});

app.listen(1337, function() {
	console.log("listening on port 1337");
});