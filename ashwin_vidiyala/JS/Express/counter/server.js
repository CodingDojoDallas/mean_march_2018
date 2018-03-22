var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({Extended: true}));
app.use(session({secret: 'codingdojorocks'}));

app.get('/', function(req, res) {
  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1;
  }
  res.render('index', { counter: req.session.counter })
})

app.listen(6789, function() {
  console.log('Listening on port 6789');
})
