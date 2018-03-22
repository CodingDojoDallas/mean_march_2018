let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');
    bcrypt      = require('bcryptjs');

app.use(express.static( __dirname + '/client/dist' ));
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

mongoose.connect('mongodb://localhost/product_db');
mongoose.Promise = global.Promise;

// Example User Schema
let Schema = mongoose.Schema;

let ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: 4,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  }
}, {timestamps: true})

mongoose.model('Product', ProductSchema);

let Product = mongoose.model('Product');

app.get('/products', (req, res) => {
  const products = Product.find({}, (err, products) => {
    if (err) {
      res.status(401).json({message: 'Error', data: err});
    } else {
       res.json({message: 'Success', data: products});
    }
  })
})

app.get('/products/:id', (req, res) => {
  const product = Product.findOne({_id: req.params.id}, (err, product) => {
    if (err) {
      res.status(401).json({message: 'Error', data: err});
    } else {
      res.json({message: 'Success', data: product});
    }
  })
})

app.post('/products', (req, res) => {
  const product = new Product(req.body);

  product.save( (err) => {
    if (err) {
      res.status(401).json(err);
    } else {
      res.json({message: 'Success', data: product});
    }
  })
})

app.put('/products/:id', (req, res) => {
  const product = Product.findOne({_id: req.params.id}, (err, product) => {
    if (err) {
      res.status(401).json(err);
    } else {
      product.title = req.body.title;
      product.price = req.body.price;
      product.image = req.body.image;
      product.save( (error) => {
        if (error) {
          res.status(401).json(error);
        } else {
          res.json({message: 'Success', data: product});
        }
      })
    }
  })
})

app.delete('/products/:id', (req, res) => {
  Product.remove({_id: req.params.id}, (err) => {
    if (err) {
      res.status(401).json(err);
    } else {
      res.json({message: 'Success'})
    }
  })
})

app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/dist/index.html'));
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
