let express		= require('express'),
	app			= express(),
	bodyParser	= require('body-parser'),
	path		= require('path'),
	session 	= require('express-session'),
	bcrypt		= require('bcryptjs'),
	mongoose	= require('mongoose');
	
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
mongoose.connect('mongodb://localhost/users');

let	Schema 		= mongoose.Schema;
	UsersSchema = new mongoose.Schema({
		first: {
			type: String, 
			required: [true, "Must enter your name."], 
			trim: true, 
			minlength: [2, "Name must be a minimum of 2 characters"], 
			maxlength: [25, "Name cannot be longer than 25 characters"],
		},
		last: {
			type: String, 
			required: [true, "Must enter your name."], 
			trim: true, 
			minlength: [2, "Name must be a minimum of 2 characters"], 
			maxlength: [25, "Name cannot be longer than 25 characters"],
		},
		birthday: {
			type: Date, 
			required: [true, "Must enter a birthday."],
			validate: {
				validator: (value) => {
					if(value > Date.now()){
						return false;
					}
					else{
						return true;
					}
				}, 
				message: "Birthday must be in the past."
			}
		},
		email: {
			type: String, 
			required: [true, "Must have an email."],
			unique: true,
			validate: {
				validator: (value) => {
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
				},
				message: "Please enter a valid e-mail address."
			}
		},
		password: {
			type: String, 
			required: [true, "Must have a password."], 
			minlength: [8, "Password must be a minimum of 8 characters"],  
			validate: {
				validator: (value) => {
					return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
				},
			message: "Password failed validation, you must have at least 1 number, uppercase, and special character"
			}, 
		},	
	}, {timestamps: true});

// use native promises -- uses the promise library to save an object
mongoose.Promise = global.Promise
// Set this Schema in our Models
mongoose.model('User', UsersSchema);
// Retrieve this Schema from our Models
// MOST IMPORTANT -- get this blueprint by making a new schema instance from the mongoose.Schema()
// object constructor
let User = mongoose.model('User');

app.get('/', (req,res) => {
	res.render('loginReg');
});

app.post('/register', (req,res) => {
	// submitting new user form to add to database
	// console.log('POST DATA', req.body);
	if(req.body.password != req.body.confirm || req.body.password.length < 7 || req.body.confirm.length < 7){
		let match = {message: 'Passwords must match and be more than 8 characters.'},
			errors = [];
		errors.push(match);	
		console.log('Something went wrong while registering.');
		res.render('loginReg', {errors: errors});
	}
	else{
		bcrypt.hash(req.body.password, 10).then((hashed_pw) => {
			let new_user = new User({first: req.body.first, last: req.body.last,  birthday: req.body.birthday, email: req.body.email, password: hashed_pw});
			new_user.save((err) => {
			// if there is an error, console.log that something went wrong
				if(err){
					console.log('Something went wrong while registering.');
					res.render('loginReg', {errors: new_user.errors});
				}
				// if there are no errors, it will let you know and it will complete the save function
				else{
					console.log('You have successfully registered!');
					// console.log(user);
					res.render('loginReg', {new_user: new_user});
				}
			})	
		})
	}
});

app.post('/login', (req,res) => {
	// console.log('POST DATA', req.body);
	User.findOne({email: req.body.email}, (err, this_user) => {
		// check for errors and only render page if no errors
		if(err){
			console.log("There's an error finding this user.");
			res.render('loginReg', {errors: this_user.errors});
		}
		else{

			// BCRYPTJS SYNTAX
			// console.log(this_user);
			// console.log(req.body.password);
			bcrypt.compare(req.body.password, this_user.password, function(err, status) {
				// console.log(status);
				// console.log(err);
				if (status) {
					// Status will always return a Boolean "true" or "false" 
					// This is an easy way to say "if it's true" vs. typing (status === true)
					// Password was correct
					req.session.user = this_user._id;
					// console.log(req.session.user);
					console.log("Successful login!");
					res.render('success', {this_user: this_user});
				}
				else {
					// Password was incorrect
					console.log("Invalid login.");
					res.render('loginReg', {errors: this_user.errors});
				}
			});
		}	
	});
});

app.get('/logout', (req,res) => {
	req.session.destroy();
	res.redirect('/');
})

app.listen(5678, () => {
	console.log('Listening on port 5678');
})

			// BCRYPT-AS-PROMISED SYNTAX
			// bcrypt.compare(req.body.password, this_user.password).then((err) => {
			// 	req.session.user = this_user._id;
			// 	// console.log(req.session.user);
			// 	console.log("Successful login!");
			// 	console.log(err);
			// 	console.log(this_user);
			// 	res.render('loginReg', {this_user: this_user});
			// }).catch((mismatch, error) => {
			// 	console.log(mismatch, "This is a mismatch.");
			// 	console.log(error, "This is a error.");
			// 	res.render('loginReg', {errors: this_user.errors});
			// });

			// HOW TO MANUALLY MATCH PASSWORDS WITHOUT BCRYPT
			// if(req.body.password != this_user.password){
			// 	let match = {message: 'Invalid login.'},
			// 		errors = [];
			// 	errors.push(match);	
			// 	console.log('Passwords must match.');
			// 	res.render('loginReg', {errors: errors});
			// }	
			// else{
			// 	console.log("Success");
			// 	req.session.user == this_user._id
			// 	res.render('loginReg', {this_user: this_user});
			// }