let express			= require('express');
	app				= express();
	bodyParser		= require('body-parser');
	mongoose		= require('mongoose');
	AuthorsSchema  	= new mongoose.Schema({
		name: {
			type: String,
			required: [true, "Must enter a name to add."],
			minlength: [3, "Name must be at least 3 characters."],
		}
	}, {timestamps: true});

app.use(bodyParser.json());
app.use(express.static( __dirname + '/authors/dist' ));

// connect to the database -- make sure after localhost/ you put in the db name you created
mongoose.connect('mongodb://localhost/authors');
// use native promises -- uses the promise library to save an object
mongoose.Promise = global.Promise
// Set this Schema in our Models as 'Author'
mongoose.model('Author', AuthorsSchema);
// Retrieve this Schema from our Models, named 'Author'
// MOST IMPORTANT -- get this blueprint by making a new schema instance from the mongoose.Schema()
// object constructor
let Author = mongoose.model('Author');

app.get('/authors', (req,res) => {
	// GET ALL AUTHORS
	Author.find({}, (err, all_authors) => {
		if(err){
			// console.log("There's an error finding all authors", err);
			res.json(err.message);
			// res.status(401).json(err.message);
		}
		else{
			// console.log("Successfully retrieved authors", all_authors);
			res.json({all_authors: all_authors});
		}
	});
});

app.post('/authors/new', (req,res) => {
	// CREATE A NEW AUTHOR
	console.log("Inside POST new author with form data", req.body.title, req.body.description);
	let new_author = new Author({name: req.body.name});
	new_author.save((err) => {
		if(err){
			// console.log("There's an error creating a new author.", err);
			res.json(err.message);
			// res.status(401).json(err.message);
		}
		else{
			// console.log("Successfully created new author", new_author);
			res.json("You have successfully added an author!");
		}
	});
});

app.get('/authors/edit/:id', (req,res) => {
	// GET SPECIFIC AUTHOR BY ID -- best to use findOne so you don't have more than 1
	Author.findOne({_id: req.params.id}, (err, this_author) => {
		if(err){
			// console.log("There's an error getting this author.", err);
			res.json(err.message);
			// res.status(401).json(err.message);
		}
		else{
			// console.log("Successfully retrieved this author", this_author);
			res.json({this_author: this_author});
		}
	});
});

app.put('/authors/update/:id', (req,res) => {
	// UPDATE SPECIFIC AUTHOR BY ID
	console.log("Inside server .put to update author", req.body);
	Author.update({_id: req.params.id}, {name: req.body.name}, {runValidators: true}, (err, this_author) => {
		if(err){
			// console.log("There's an error updating this author", err.message);
			res.json(err.message);
			// res.status(401).json(err.message);
		}
		else{
			// console.log("Successfully updated this author", this_author);
			res.json("You have updated this author!");
		}
	});
});

app.delete('/authors/:id', (req,res) => {
	// DELETE SPECIFIC AUTHOR BY ID
	// console.log("Inside the DELETE function", req.params.id);
	Author.remove({_id: req.params.id}, (err) => {
	// if there is an error, console.log that something went wrong
		if(err){
			// console.log("There's an error deleting this author.", err);
			res.json(err.message);
			// res.status(401).json(err.message);
		}
		else{
			res.json("You have successfully deleted this author!");
		}
	});
});

app.listen(5678, () => {
	console.log('Listening on port 5678');
})

