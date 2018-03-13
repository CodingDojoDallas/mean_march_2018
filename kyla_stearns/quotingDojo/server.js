let express			= require('express');
	app				= express();
	bodyParser		= require('body-parser');
	path			= require('path');
	mongoose		= require('mongoose');
	QuotesSchema  	= new mongoose.Schema({
		name: {type: String},
		quote: {type: String}
	}, {timestamps: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connect to the database -- make sure after localhost/ you put in the db name you created
mongoose.connect('mongodb://localhost/quotes');
// use native promises -- uses the promise library to save an object
mongoose.Promise = global.Promise
// Set this Schema in our Models as 'User'
mongoose.model('Quote', QuotesSchema);

// Retrieve this Schema from our Models, named 'Quote'
// MOST IMPORTANT -- get this blueprint by making a new schema instance from the mongoose.Schema()
// object constructor
let Quote = mongoose.model('Quote');

app.get('/', (req,res) => {
	// retrieve the Quotes from the database and include them in the view page we will be rendering
	res.render('quotes');
});

// add quote request
app.post('/quotes', (req,res) => {
	// add the quote from req.body to the database here
	// console.log('POST DATA', req.body);
	let new_quote = new Quote({name: req.body.name, quote: req.body.quote});
	new_quote.save((err) => {
		// if there is an error, console.log that something went wrong
		if(err){
			console.log('Something went wrong while submitting.');
		}
		// if there are no errors, it will let you know and it will complete the save function
		else{
			console.log('You have successfully added a quote!');
			console.log(new_quote);
			// res.redirect('/');
			res.redirect('/quotes');
		}
	})
});

app.get('/quotes', (req,res) => {
	Quote.find({}).sort('-createdAt').exec((err, all_quotes) => {
		// check for errors and only render page if no errors
		if(err){
			console.log("There's an error");
		}
		else{
			console.log("Success");
			console.log(all_quotes);
			// let all_quotes = all_quotes.sort({createdAt: -1});
			res.render('index', {all_quotes: all_quotes});
		}
	});
})

app.listen(5678, () => {
	console.log('Listening on port 5678');
})

