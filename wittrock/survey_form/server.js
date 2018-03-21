var express = require("express");
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express();
app.use(session({secret: 'codingdojorocks'}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/static"))
app.set("views", __dirname + '/views')
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
	console.log("hello")
	res.render("index")
})
app.post("/survey", function(req, res){
	console.log("POST DATA \n\n", req.body)
	req.session.name = req.body.name;
	console.log(req.session.name);
	res.render('results', {result: req.body})
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);
