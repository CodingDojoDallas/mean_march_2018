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

mongoose.connect('mongodb://localhost/mongoose_dashboard');
mongoose.Promise = global.Promise;

// Example User Schema
let RabbitSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  color: {type: String}
}, {timestamps: true})
mongoose.model('Rabbit', RabbitSchema);
let Rabbit = mongoose.model('Rabbit');

app.get('/', (req, res) => {
  Rabbit.find({}, (error, rabbits) => {
    if (error) {
      console.log('Rabbits have errors');
    } else {
      res.render('index', { rabbits: rabbits });
    }
  })
})

app.get('/rabbits/new', (req, res) => {
  res.render('new');
})

app.get('/rabbits/:id', (req, res) => {
  Rabbit.find({_id: req.params.id}, (error, rabbit) => {
    if (error) {
      console.log(`Could not find Rabbit with ID ${req.params.id}. Please check
                  the ID and try again.`);
    } else {
      res.render('show', { rabbit: rabbit[0] });
    }
  })
})

app.get('/rabbits/edit/:id', (req, res) => {
  Rabbit.find({_id: req.params.id}, (error, rabbit) => {
    if (error) {
      console.log('We are having troubles locating the bunny you want to edit');
    } else {
      res.render('edit', { rabbit:rabbit[0] });
    }
  })
})

app.post('/rabbits', (req, res) => {
  let rabbit = new Rabbit({name: req.body.name, age: req.body.age, color: req.body.color })

  rabbit.save( (error) => {
    if (error) {
      console.log('Abort bunny creation. Errors detected. Cute and fluffy paused...');
    } else {
      res.redirect('/');
    }
  })
})

app.post('/rabbits/:id', (req, res) => {
  let rabbit = Rabbit.find({_id: req.params.id}, (error, rabbit) => {
    rabbit[0].name = req.body.name;
    rabbit[0].age = req.body.age;
    rabbit[0].color = req.body.color;
    rabbit[0].save( (error) => {
      if (error) {
        console.log(`There was a problem updating ${rabbit.name}'s information`);
      } else {
        res.redirect(`/rabbits/${rabbit[0]._id}`);
      }
    })
  })
})

app.post('/rabbits/destroy/:id', (req, res) => {
  Rabbit.remove({_id: req.params.id}, (error) => {
    if (error) {
      console.log(`Sorry, but we couldn't delete that bunny.`);
    } else {
      res.redirect('/')
    }
  })
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
