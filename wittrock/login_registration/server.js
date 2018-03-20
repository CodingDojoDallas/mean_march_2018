let express = require('express'),
	app=express(),
	path=require('path'),
	session=require('express-session'),
	body_Parser=require('body-parser'),
	bcrypt = require('bcryptjs'),
	mongoose=require('mongoose'),
	salt = bcrypt.genSaltSync(10),
	hash = bcrypt.hashSync("B4c0/\/email", salt);
mongoose.connect('mongodb://localhost/database')
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	first_name: { type: String,
	required: [true, "first name cannot be empt"],
	minlength: 2,
	trim: true},

	last_name: {type: String, 
	required: [true, "last name cannot be empty"],
	minlength: 2,
	trim: true},

	email:{type: String,
	unique: [true, 'email has already been taken. please select a new email'],
	required: [true,'email cannot be empty']},

	birthday: {
		type: Date,
		required: [true, "what's your birthday?"]
	},

	password: {type: String,
	required: true,
	minlength: 8,
	validate: {
		validator:(value)=>{
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
		},
		message: "password must contain 1 number, 1 uppercase, and 1 special character"
	}}

}, {timestamps: true})

mongoose.Promise = global.Promise;
mongoose.model('User', UserSchema)

var User = mongoose.model('User')
app.use(body_Parser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"static")));
app.use(session({
	secret: "fjadstjprjgkperjwkgjskfgmweogkaosfmgokgasg",
	proxy: true,
	resave: false,
	saveUinitialized: true
}))


app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
		
		res.render('index')
	
	
})
app.get('/success', (req, res)=>{
	User.find({}, (err, users)=>{
		
		res.render('success', {user: users})
	})
})
app.post('/registration', (req, res)=>{
		
	let user = new User(req.body)
	let hash = bcrypt.genSaltSync(10);
	bcrypt.hash(user.password, salt, (error, hash)=>{
		if(error){
			console.log('password could not be hashed')
		}
		else{
			user.password = hash;
			user.save((err, user)=>{
				if (err){
					console.log(err)
					console.log('something went wrong')
					res.render('index', {errors: user.errors})
				}
				else{
					req.session.user = user._id;
					console.log('session name', req.session.first_name)
					console.log('success')
					res.render('success',{user:user})
				}
			})
		}
	})

})
app.post('/login', (req, res)=>{
	let user = User.findOne({email: req.body.email}, (err, user)=>{
		if (err){
			console.log('wrong')
			res.render('index', {errors: user.errors})
		}
		else{
			bcrypt.compare(req.body.password, user.password, (err, response)=>{
				if(response == true){
					res.render('success', {user:user})
				}
				else{
					console.log('whatup')
					res.render('index', {errors: user.errors})
				}
			})
		}
	})
})

app.listen(8000, function(){
	console.log('listening on port 8000')
})