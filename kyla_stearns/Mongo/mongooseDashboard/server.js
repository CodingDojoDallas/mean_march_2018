let express			= require('express');
	app				= express();
	bodyParser		= require('body-parser');
	path			= require('path');
	mongoose		= require('mongoose');
	AnimalsSchema  	= new mongoose.Schema({
		name: {type: String, required: true, minlength: 3, maxlength: 25},
		age: {type: Number, required: true, min: 1},
		hobbies: {type: String, required: true, minlength: 3, maxlength: 25}
	}, {timestamps: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connect to the database -- make sure after localhost/ you put in the db name you created
mongoose.connect('mongodb://localhost/animals');
// use native promises -- uses the promise library to save an object
mongoose.Promise = global.Promise
// Set this Schema in our Models as 'User'
mongoose.model('Animal', AnimalsSchema);

// Retrieve this Schema from our Models, named 'Quote'
// MOST IMPORTANT -- get this blueprint by making a new schema instance from the mongoose.Schema()
// object constructor
let Animal = mongoose.model('Animal');

app.get('/', (req,res) => {
	// render home page w/ all animals
	Animal.find({}, (err, all_animals) => {
		// check for errors and only render page if no errors
		if(err){
			console.log("There's an error");
			res.render('index', {errors: all_animals.errors});
		}
		else{
			console.log("Success");
			console.log(all_animals);
			res.render('index', {all_animals: all_animals});
		}
	});
});

app.get('/animals/:id', (req,res) => {
	// render info page when clicking an animal
	Animal.find({_id: req.params.id}, (err, this_animal) => {
		// check for errors and only render page if no errors
		if(err){
			console.log("There's an error");
			res.render('index', {errors: this_animal.errors});
		}
		else{
			console.log("Success");
			// console.log(this_animal);
			res.render('show', {this_animal:  this_animal});
		}
	});
})

app.get('/animals/edit/:id', (req,res) => {
	// render info page when clicking an animal
	Animal.find({_id: req.params.id}, (err, this_animal) => {
		// check for errors and only render page if no errors
		if(err){
			console.log("There's an error");
			res.render('index', {errors: this_animal.errors});
		}
		else{
			console.log("Success");
			// console.log(this_animal);
			res.render('animals', {this_animal:  this_animal});
		}
	});
})

app.post('/animals/update/:id', (req,res) => {
		// check for errors and only render page if no errors
	console.log('POST DATA', req.body);
	Animal.update({_id: req.params.id}, {name: req.body.name, age: req.body.age, hobbies: req.body.hobbies}, (err) => {
	// if there is an error, console.log that something went wrong
		if(err){
			console.log('Something went wrong while updating.');
			res.render('animals', {errors: animal.errors});
		}
		// if there are no errors, it will let you know and it will complete the save function
		else{
			console.log('You have successfully updated a lemur!');
			// console.log(Animal.find({_id: req.params.id}));
			res.redirect('/');
		}
	});
})

app.post('/add', (req,res) => {
	// when clicking button to add a new animal
	res.redirect('/new');
})

app.get('/new', (req,res) => {
	// render page with form for new animal
	res.render('new');
})

app.post('/animals/new', (req,res) => {
	// submitting new animal form to add to database
	console.log('POST DATA', req.body);
	let new_animal = new Animal({name: req.body.name, age: req.body.age, hobbies: req.body.hobbies});
	new_animal.save((err) => {
		// if there is an error, console.log that something went wrong
		if(err){
			console.log('Something went wrong while submitting.');
			res.render('index', {errors: animal.errors});
		}
		// if there are no errors, it will let you know and it will complete the save function
		else{
			console.log('You have successfully added a lemur!');
			// console.log(new_animal);
			// res.redirect('/');
			res.redirect('/');
		}
	})
});

app.get('/animals/destroy/:id', (req,res) => {
	// check for errors and only render page if no errors
	Animal.remove({_id: req.params.id}, (err) => {
	// if there is an error, console.log that something went wrong
		if(err){
			console.log('Something went wrong while removing.');
			res.render('index', {errors: animal.errors});
		}
		// if there are no errors, it will let you know and it will complete the save function
		else{
			console.log('You have successfully removed a lemur!');
			// console.log(Animal.find({_id: req.params.id}));
			res.redirect('/');
		}
	});
})

app.listen(5678, () => {
	console.log('Listening on port 5678');
})

