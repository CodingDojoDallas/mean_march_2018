let express			= require('express');
	app				= express();
	bodyParser		= require('body-parser');
	mongoose		= require('mongoose');
	path  			= require('path');
	uniqueValidator = require('mongoose-unique-validator');
	Schema 			= mongoose.Schema;
	RestaurantsSchema  	= new mongoose.Schema({
		name: {
			type: String,
			unique: [true, "Restaurant already in database."],
			required: [true, "Please enter a restaurant name."],
			minlength: [3, "Name must be at least 3 characters."]
		},
		cuisine: {
			type: String,
			required: [true, "Please enter a cuisine."],
			min: [3, "Cuisine must be at least 3 characters."]
		},
		reviews: [{
			type: Schema.Types.ObjectId, ref: 'Review'
		}],
	}, {timestamps: true});
	ReviewsSchema  	= new mongoose.Schema({
		_restaurant: {
			type: Schema.Types.ObjectId, ref: 'Restaurant'},
		name: {
			type: String,
			required: [true, "Please enter your name."],
			minlength: [3, "Name must be at least 3 characters."]
		},
		rank: {
			type: Number,
			required: [true, "Please give your star rank."],
			min: [1, "Minimum rank is 1."],
			max: [5, "Maximum rank is 5."]
		},
		content: {
			type: String,
			required: [true, "Please enter a review."],
			min: [3, "Review must be at least 3 characters."]
		},
	}, {timestamps: true});

app.use(bodyParser.json());
app.use(express.static( __dirname + '/client/dist'));

mongoose.connect('mongodb://localhost/restaurants'); // CHANGE TO MATCH DB NAME
mongoose.Promise = global.Promise;
mongoose.model('Restaurant', RestaurantsSchema);
mongoose.model('Review', ReviewsSchema);
let Restaurant 	= mongoose.model('Restaurant');
	Review 		= mongoose.model('Review');


app.get('/restaurants', (req,res) => {
	// GET ALL RESTAURANTS
	Restaurant.find({}).populate('reviews').exec((err, all_restaurants) => {
		if(err){
			// console.log("There's an error finding all restaurants", err);
			res.json({message: err});
			// res.status(400).json(err);
		}
		else{
			// console.log("Successfully retrieved restaurants", all_restaurants);
			res.json({all_restaurants: all_restaurants});
		}
	});
});

app.post('/restaurants/new', (req,res) => {
	// CREATE A NEW RESTAURANT
	// console.log("Inside POST new restaurant with form data", req.body);
	let new_restaurant = new Restaurant({name: req.body.name, cuisine: req.body.cuisine});
	new_restaurant.save((err) => {
		if(err){
			// console.log("There's an error creating a new restaurant.", err);
			res.json({message: err});
			// res.status(400).json(err);
		}
		else{
			// console.log("Successfully created new restaurant", new_restaurant);
			res.json({new_restaurant: new_restaurant});
		}
	});
});

app.get('/restaurants/edit/:id', (req,res) => {
	// GET SPECIFIC RESTAURANT BY ID -- best to use findOne so you don't have more than 1
	Restaurant.findOne({_id: req.params.id}, (err, this_restaurant) => {
		if(err){
			// console.log("There's an error getting this restaurant.", err);
			res.json({message: err});
			// res.status(400).json(err);
		}
		else{
			// console.log("Successfully retrieved this restaurant", this_restaurant);
			res.json({this_restaurant: this_restaurant});
		}
	});
});

app.patch('/restaurants/update/:id', (req,res) => {
	// UPDATE SPECIFIC RESTAURANT BY ID
	console.log("Inside server .put to update restaurant", req.body);
	Restaurant.update(
		{_id: req.params.id}, 
		{name: req.body.name, cuisine: req.body.cuisine}, 
		{runValidators: true}, 
		(err, this_restaurant) => {
			if(err){
				// console.log("There's an error updating this restaurant", err.message);
				res.json({message: err});
				// res.status(400).json(err);
			}
			else{
				// console.log("Successfully updated this restaurant", this_restaurant);
				res.json("Successfully updated this restaurant");
			}
	});
});

app.get('/reviews/:id', (req,res) => {
	// GET SPECIFIC RESTAURANT BY ID -- best to use findOne so you don't have more than 1
	// console.log("INSIDE SERVER GET ALL REVIEWS", req.params.id);
	Restaurant.findOne({_id: req.params.id}, (err, this_restaurant) => {
		if(err){
			// console.log("There's an error getting this restaurant.", err);
			res.json({message: err});
			// res.status(400).json(err);
		}
		else{
			// SORT HERE -- MAKE SURE TO SORT THEN EXECUTE THE CALLBACK W/ ERRORS ETC
			Review.find({_restaurant: req.params.id}).sort({rank: -1}).exec( (err, all_reviews) => {
				if(err){
					// console.log("There's an error getting all reviews.", err);
					res.json({message: err});
					// res.status(400).json(err);
				}
				else{
					// console.log("Successfully retrieved all reviews", all_reviews, this_restaurant);
					res.json({all_reviews: all_reviews, restaurant_name: this_restaurant.name});
				}
			});
		}
	});
});

app.get('/name/:id', (req,res) => {
	// GET SPECIFIC RESTAURANT BY ID -- best to use findOne so you don't have more than 1
	// console.log("INSIDE SERVER GET ALL REST NAME", req.params.id);
	Restaurant.findOne({_id: req.params.id}, (err, this_restaurant) => {
		if(err){
			// console.log("There's an error getting this restaurant.", err);
			res.json({message: err});
			// res.status(400).json(err);
		}
		else{
			// console.log("Successfully retrieved this restaurant", this_restaurant);
			res.json({restaurant_name: this_restaurant.name});
		}
	});
});

app.post('/review/:id', (req,res) => {
	Restaurant.findOne({_id: req.params.id}, (err, this_restaurant) => {
		// console.log(req.body);
		let review = new Review({name: req.body.name, rank: req.body.rank, content: req.body.content});
		// console.log(review);
		review._restaurant = this_restaurant._id;
		review.save((err) => {
			if(err) {
				// console.log('Errors saving review.', err.message);
				res.json({message: err});
			}
			else {
				this_restaurant.reviews.push(review);
				// console.log(this_restaurant.reviews);
				this_restaurant.save((err) => {
					if(err){
						// console.log('Errors saving restaurant.');
						res.json({message: err});
					}
					else{
						res.json({this_restaurant: this_restaurant});
					}
				});
			}
		});
	});
});

app.delete('/restaurants/:id', (req,res) => {
	// DELETE SPECIFIC RESTAURANT BY ID
	// console.log("Inside the DELETE function", req.params.id);
	Restaurant.remove({_id: req.params.id}, (err) => {
	// if there is an error, console.log that something went wrong
		if(err){
			// console.log("There's an error deleting this restaurant.", err);
			res.json(err.message);
			// res.status(400).json(err);
		}
		else{
			console.log("Successfully deleted this restaurant.");
			// res.json("You have successfully deleted this restaurant!");
		}
	});
});

app.all("*", (req, res, next) => {
	res.sendFile(path.resolve("./client/dist/index.html"));
});

app.listen(5678, () => {
	console.log('Listening on port 5678');
})