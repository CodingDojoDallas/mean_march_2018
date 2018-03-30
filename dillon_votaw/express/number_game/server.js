
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'himitsu'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if(req.session.answer == null){
    req.session.answer = (Math.floor(Math.random()*(100-1)+1));
  }
  console.log(req.session.answer);
  console.log(req.session.result);
  res.render("index", {result: req.session.result});
})

app.post('/process', function(req, res) {
  if(req.body.guess > req.session.answer){
    req.session.result = 'high'
  }
  if(req.body.guess < req.session.answer){
    req.session.result = 'low'
  }
  if(req.body.guess == req.session.answer){
    req.session.result = 'correct'
  }

  res.redirect('/');
})

app.post('/clear', function(req, res) {
  req.session.result = null;
  req.session.answer = null;
  console.log('resetting');

  res.redirect('/');
})


app.listen(8000, function() {


  console.log("listening on port 8000");
});
