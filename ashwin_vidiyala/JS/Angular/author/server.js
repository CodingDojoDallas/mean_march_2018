let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');
    bcrypt      = require('bcryptjs');

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

mongoose.connect('mongodb://localhost/author');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    minlength: 3,
    trim: true
  },
  quotes: [{
    type: Schema.Types.ObjectId,
    ref: 'Quote'
  }]
}, {timestamps: true})

let QuoteSchema = new mongoose.Schema({
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  content: {
    type: String,
    required: [true, 'Please enter quote'],
    minlength: 3,
    trim: true
  },
  votes: {
    type: Number,
    default: 0
  }
}, {timestamps: true})


mongoose.model('Author', AuthorSchema);
mongoose.model('Quote', QuoteSchema);

let Author = mongoose.model('Author');
let Quote = mongoose.model('Quote');

app.get('/authors', (req, res) => {
  let authors = Author.find({}, (err, authors) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: authors})
    }
  })
})

app.get('/authors/:id', (req, res) => {
  Author.findOne({_id: req.params.id})
  .populate('quotes')
  .exec( (err, author) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: author});
    }
  })
})

app.post('/authors/:id', (req, res) => {
  Author.findOne({_id: req.params.id}, (err, author) => {
    const quote = new Quote({content: req.body.content});
    quote._author = author._id;
    author.quotes.push(quote);
    quote.save( (error) => {
      author.save( (e) => {
        if (error) {
          res.status(400).json({message: 'Error', error: error});
        } else {
          res.json({message: 'Success', data: quote});
        }
      })
    })
  })
})

app.put('/quote/up/:id', (req, res) => {
  Quote.findByIdAndUpdate(req.params.id, { $inc: { votes: 1 }}, (err, quote) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: quote});
    }
  })
})

app.put('/quote/down/:id', (req, res) => {
  Quote.findByIdAndUpdate(req.params.id, { $inc: { votes: -1 }}, (err, quote) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: quote});
    }
  })
})

app.post('/authors', (req, res) => {
  const author = new Author({ name: req.body.name });

  Author.findOne({name: req.body.name}, (error, response) => {
    if (response) {
      res.status(400).json({error: {message: 'Author with that name already exists'}});
    } else {
      author.save((err) => {
        if (err) {
          res.status(400).json({message: 'Error', error: err});
        } else {
          res.json({message: 'Success', data: author})
        }
      })
    }
  })
})

app.put('/authors/:id', (req, res) => {
  let author = Author.findOne({_id: req.params.id}, (err, author) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      author.name = req.body.name;
      author.save( (error) => {
        if (error) {
          res.status(400).json({messsage: 'Error', error: error});
        } else {
          res.json({message: 'Success', data: author});
        }
      })
    }
  })
})

app.delete('/authors/:id', (req, res) => {
  Author.remove({_id: req.params.id}, (err) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Successfully deleted'});
    }
  })
})

app.delete('/quotes/:id', (req, res) => {
  Quote.remove({_id: req.params.id}, (err) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Successfully deleted'});
    }
  })
})

app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/dist/index.html'));
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
