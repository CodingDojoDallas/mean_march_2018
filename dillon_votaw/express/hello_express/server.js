var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'himitsu'}));

app.get('/', function(req, res){
  res.render('index', {title:'my express project'});
})


app.get("/users", function (req, res){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Brendan", email: "brendan@codingdojo.com"},
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    res.render('users', {users: users_array});
})

app.post('/users', function (req, res){
  console.log("POST DATA \n \n", req.body)//req.body is a JSON object that contains the data from our form
  //code to add user to db goes here!
  req.session.name = req.body.name;
  console.log("request session name s now "+req.session.name);
  res.redirect('/');
})

app.get("/users/:id", function(req, res){
  console.log("the user id requested is", req.params.id);
  //just to illustrate that req.params is usable here
  res.send("you request the user with id "+req.params.id);
  //code to get user from db goes here, etc
})



app.listen(8000, function(){
  console.log("listening on port 8000")
})
