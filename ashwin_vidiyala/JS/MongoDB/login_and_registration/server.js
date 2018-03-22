let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');
    bcrypt      = require('bcryptjs');

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

mongoose.connect('mongodb://localhost/login_and_registration');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please enter First Name'],
    minlength: 2,
    trim: true
  },
  last_name: {
    type: String,
    required: [true, 'Please enter Last Name'],
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    // unique: [true, 'Email has already been taken. Please select a new email'],
    trim: true
  },
  birthday: {
    type: Date,
    required: [true, 'Please enter birthday']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
      },
      message: 'Password failed validation; you must have at least 1 number, 1 uppercase and 1 special character'
    }
  }
}, {timestamps: true})

mongoose.model('User', UserSchema);

let User = mongoose.model('User');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/success', (req, res) => {
  res.render('success');
})

app.post('/register', (req, res) => {
  let user = new User(req.body);
  let salt = bcrypt.genSaltSync(10);
  bcrypt.hash(user.password, salt, (error, hash) => {
    if (error) {
      console.log('User password could not be hashed');
    } else {
      user.password = hash;
      user.save( (err) => {
        if (err) {
          res.render('index', {errors: user.errors});
        } else {
          res.redirect('/success');
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
  let user = User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      res.render('index', {errors: user.errors});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (response == true) {
          res.redirect('/success');
        } else {
          res.render('index', {errors: user.errors});
        }
      })
    }
  })
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
