let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: true })); //For HTML
// app.use(bodyParser.json()); //For JSON
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/message_board');
mongoose.Promise = global.Promise;

// Example User Schema
let Schema = mongoose.Schema;

let MessageSchema = new mongoose.Schema({
  name: {type: String, required: true},
  content: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})

let CommentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  _message: {type: Schema.Types.ObjectId, ref: 'Message'},
  content: {type: String, required: true}
}, {timestamps: true})

mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);

let Message = mongoose.model('Message');
let Comment = mongoose.model('Comment');

app.get('/', (req, res) => {
  let messages = Message.find({}, (err, messages) => {
    let comments = Comment.find({}, (err, comments) => {
        res.render('index', {messages: messages, comments: comments});
    })
  });
})

app.post('/messages', (req, res) => {
  let message = new Message(
    {name: req.body.name,
    content: req.body.content}
  );

  message.save( (err) => {
    if (err) {
      // res.render('index', {errors: message.errors});
      console.log('There are errrors');
    } else {
      res.redirect('/');
    }
  })
})

app.post('/messages/:id', (req, res) => {
  Message.findOne({_id: req.params.id}, (err, message) => {
    let comment = new Comment(req.body);
    comment._message = message._id;
    message.comments.push(comment);
    comment.save( (err) => {
      message.save( (err) => {
        if (err) {
          // res.render('index', {errors: comment.errors});
        } else {
          res.redirect('/');
        }
      });
    });
  });
})


let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
