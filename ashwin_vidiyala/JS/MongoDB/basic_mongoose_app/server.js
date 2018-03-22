let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;

// Example User Schema
let UserSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number}
}, {timestamps: true})
mongoose.model('User', UserSchema);
let User = mongoose.model('User');

// Example get route
app.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('There are errors');
    } else {
      res.render('index', {users: users});
    }
  })
})

app.post('/users', (req, res) => {
  console.log('POST DATA', req.body);

  let user = new User({ name: req.body.name, age: req.body.age });

  user.save( (err) => {
    if (err) {
      console.log('Something went wrong');
    } else {
      console.log('Successfully added a new user!');
      res.redirect('/');
    }
  })
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
