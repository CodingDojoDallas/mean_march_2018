let express		= require('express');
	app			= express();
	bodyParser	= require('body-parser');
	path		= require('path');
	session 	= require('express-session');
	mongoose	= require('mongoose');
	// 
	Schema 			= mongoose.Schema;
	MessagesSchema 	= new mongoose.Schema({
		name: {type: String, required: true, minlength: 2, maxlength: 25},
		text: {type: String, required: true, minlength: 2, maxlength: 255},
		comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
	}, {timestamps: true});
	CommentsSchema 	= new mongoose.Schema({
		_message: {type: Schema.Types.ObjectId, ref: 'Message'},
		name: {type: String, required: true, minlength: 2, maxlength: 25},
		text: {type: String, required: true, minlength: 2, maxlength: 255},
	}, {timestamps: true});

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'kds1kfal-2poi-fsd5er-se6cgn99-da0jkfa4lsa-2nvfje-ow8vj-woi',
	proxy: true,
	resave: false,
	saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connect to the database -- make sure after localhost/ you put in the db name you created
mongoose.connect('mongodb://localhost/messages');
// use native promises -- uses the promise library to save an object
mongoose.Promise = global.Promise
// Set this Schema in our Models
mongoose.model('Message', MessagesSchema);
mongoose.model('Comment', CommentsSchema);

// Retrieve this Schema from our Models
// MOST IMPORTANT -- get this blueprint by making a new schema instance from the mongoose.Schema()
// object constructor
let Message = mongoose.model('Message');
	Comment = mongoose.model('Comment');

app.get('/', (req,res) => {
	// retrieve the users from the database and include them in the view page we will be rendering

	Message.find({}).populate('comments').exec((err, all_msgs) => {
		if(err){
			console.log("There's an error retrieving messages.");
			res.render('wall', {errors: all_msgs.errors});
		}
		else{
			console.log("Success");
			// console.log(all_msgs);
			res.render('wall', {all_msgs: all_msgs});
		}
	});
});

app.post('/post1', (req,res) => {
	// submitting new message to add to database
	console.log('POST DATA', req.body);
	let new_msg = new Message({name: req.body.name, text: req.body.text});
	new_msg.save((err) => {
		// if there is an error, console.log that something went wrong
		if(err){
			console.log('Something went wrong while submitting message.');
			res.render('wall', {errors: new_msg.errors});
		}
		// if there are no errors, it will let you know and it will complete the save function
		else{
			console.log('You have successfully added a message!');
			console.log(new_msg);
			res.redirect('/');
		}
	})
});


app.post('/post2/:id', (req,res) => {
	Message.findOne({_id: req.params.id}, (err, this_msg) => {
		// console.log(req.body);
		let comment = new Comment({name: req.body.name, text: req.body.text});
		// console.log(comment);
		comment._message = this_msg._id;
		comment.save((err) => {
			if(err) {
				console.log('Errors saving comment.');
				res.render('wall', {errors: comment.errors});
			}
			else {
				this_msg.comments.push(comment);
				// console.log(this_msg.comments);
				this_msg.save((err) => {
					res.redirect('/');
				});
			}
		});
	});
});

app.listen(5678, () => {
	console.log('Listening on port 5678');
})