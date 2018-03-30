let express			= require('express');
	app				= express();
	bodyParser		= require('body-parser');
	mongoose		= require('mongoose'); require('mongoose-type-url'); 
				// ** MAKE SURE TO RUN ** npm install mongoose-type-url
	uniqueValidator = require('mongoose-unique-validator');
	ProductsSchema  	= new mongoose.Schema({
		title: {
			type: String,
			required: [true, "Must enter a title."],
			minlength: [4, "Title must be at least 4 characters."]
		},
		price: {
			type: Number,
			required: [true, "Must enter a price."],
			min: [1, "Price must be at least one dollar."]
		},
		imgLink: {
			type: mongoose.SchemaTypes.Url,
			required: false,
			// unique: [true, "Link must be valid."]
			// NOT SURE IF NEED UNIQUE WITH mongoose-type-url
		}
	}, {timestamps: true});
// use unique validator here
ProductsSchema.plugin(uniqueValidator);

app.use(bodyParser.json());
app.use(express.static( __dirname + '/products/dist' ));

// connect to the database -- make sure after localhost/ you put in the db name you created
mongoose.connect('mongodb://localhost/products');
// use native promises -- uses the promise library to save an object
mongoose.Promise = global.Promise
// Set this Schema in our Models as 'Product'
mongoose.model('Product', ProductsSchema);
// Retrieve this Schema from our Models, named 'Product'
// MOST IMPORTANT -- get this blueprint by making a new schema instance from the mongoose.Schema()
// object constructor
let Product = mongoose.model('Product');

app.get('/products', (req,res) => {
	// GET ALL PRODUCTS
	Product.find({}, (err, all_products) => {
		if(err){
			console.log("There's an error finding all products", err);
			res.json(err.message);
			// res.status(400).json(err);
		}
		else{
			console.log("Successfully retrieved products", all_products);
			res.json({all_products: all_products});
		}
	});
});

app.post('/products/new', (req,res) => {
	// CREATE A NEW PRODUCT
	console.log("Inside POST new product with form data", req.body);
	let new_product = new Product({title: req.body.title, price: req.body.price, imgLink: req.body.imgLink});
	new_product.save((err) => {
		if(err){
			console.log("There's an error creating a new product.", err);
			res.json(err.message);
			// res.status(400).json(err);
		}
		else{
			console.log("Successfully created new product", new_product);
			res.json("You have successfully added an product!");
		}
	});
});

app.get('/products/edit/:id', (req,res) => {
	// GET SPECIFIC PRODUCT BY ID -- best to use findOne so you don't have more than 1
	Product.findOne({_id: req.params.id}, (err, this_product) => {
		if(err){
			console.log("There's an error getting this product.", err);
			res.json(err.message);
			// res.status(400).json(err);
		}
		else{
			console.log("Successfully retrieved this product", this_product);
			res.json({this_product: this_product});
		}
	});
});

app.patch('/products/update/:id', (req,res) => {
	// UPDATE SPECIFIC PRODUCT BY ID
	console.log("Inside server .put to update product", req.body);
	Product.update(
		{_id: req.params.id}, 
		{title: req.body.title, price: req.body.price, imgLink: req.body.imgLink}, 
		{runValidators: true}, 
		(err, this_product) => {
			if(err){
				console.log("There's an error updating this product", err.message);
				res.json(err.message);
				// res.status(400).json(err);
			}
			else{
				console.log("Successfully updated this product", this_product);
				res.json({this_product: this_product});
			}
	});
});

app.delete('/products/:id', (req,res) => {
	// DELETE SPECIFIC AUTHOR BY ID
	console.log("Inside the DELETE function", req.params.id);
	Product.remove({_id: req.params.id}, (err) => {
	// if there is an error, console.log that something went wrong
		if(err){
			console.log("There's an error deleting this product.", err);
			res.json(err.message);
			// res.status(400).json(err);
		}
		else{
			console.log("Successfully deleted this product.");
			res.json("You have successfully deleted this product!");
		}
	});
});

app.listen(5678, () => {
	console.log('Listening on port 5678');
})

