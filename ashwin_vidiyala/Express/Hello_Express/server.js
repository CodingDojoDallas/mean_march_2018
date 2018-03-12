var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'codingdojorocks'}));

app.get('/', function(request, response) {
  response.send('<h1> Hello Express! </h1>');
})

app.get('/users', function(request, response) {
  var users_array = [
    {name: 'Michael', email: 'michael@codingdojo.com' },
    {name: "Jay", email: "jay@codingdojo.com"},
    {name: "Brendan", email: "brendan@codingdojo.com"},
    {name: "Andrew", email: "andrew@codingdojo.com"}
  ];
  response.render('users', { users: users_array });
})

app.listen(8000, function() {
  console.log('Listening on port 8000');
})

app.use(express.static(__dirname + '/static'));
