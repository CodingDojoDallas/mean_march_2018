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


let QuoteSchema = new mongoose.Schema({
  name: {type: String},
  quote: {type: String}
}, {timestamps: true})
mongoose.model('Quote', QuoteSchema);
let Quote = mongoose.model('Quote');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/quotes', (req, res) => {
  Quote.find({}, (err, quotes) => {
    if (err) {
      console.log('There are errors');
    } else {
      res.render('quotes', {quotes: quotes});
    }
  })
})

app.post('/quotes', (req, res) => {
  console.log('POST DATA', req.body);

  let quote = new Quote({name: req.body.name, quote: req.body.quote});

  quote.save( (error) => {
    if (error) {
      res.render('index');
    } else {
      res.redirect('/quotes');
    }
  })
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
