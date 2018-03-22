let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');

app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/DATABASE_NAME');
mongoose.Promise = global.Promise;

// Example User Schema
let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
  name: {type: String},
}, {timestamps: true})

mongoose.model('User', UserSchema);

let User = mongoose.model('User');

app.get('/', (req, res) => {
  let users = User.find({}, (err, users) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: users});
    }
  })
})

app.get('/new/:name', (req, res) => {
  let user = new User({name: req.params.name});

  user.save( (err) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.redirect('/');
    }
  })
})

app.get('/remove/:name', (req, res) => {
  User.remove({name: req.params.name}, (err) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.redirect('/');
    }
  })
})

app.get('/:name', (req, res) => {
  let user = User.find({name: req.params.name}, (err, user) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: user})
    }
  })
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
