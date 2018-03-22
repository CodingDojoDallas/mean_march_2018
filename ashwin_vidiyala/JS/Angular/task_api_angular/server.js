let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');

app.use(body_parser.json());
app.use(express.static( __dirname + '/client/dist' ));
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/task_api_db');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let TaskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, default: ''},
  completed: {type: Boolean, default: false}
}, {timestamps: true})

mongoose.model('Task', TaskSchema);

let Task = mongoose.model('Task');

app.get('/tasks', (req, res) => {
  let tasks = Task.find({}, (err, tasks) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: tasks});
    }
  })
})

app.get('/tasks/:id', (req, res) => {
  let task = Task.findOne({_id: req.params.id}, (err, task) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: task});
    }
  })
})

app.post('/tasks', (req, res) => {
  let task = new Task({
    title: req.body.title,
    description: req.body.description
  });
  task.save((err) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: task});
    }
  })
})

app.put('/tasks/:id', (req, res) => {
  let task = Task.findOne({_id: req.params.id}, (err, task) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      task.title = req.body.title;
      task.description = req.body.description;
      task.completed = req.body.completed;
      task.save( (error) => {
        if (error) {
          res.json({message: 'Error', error: error});
        } else {
          res.json({message: 'Success', data: task});
        }
      })
    }
  })
})

app.delete('/tasks/:id', (req, res) => {
  Task.remove({_id: req.params.id}, (err) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Successfully deleted'});
    }
  })
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
