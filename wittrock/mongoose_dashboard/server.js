let express = require('express')
	app = express(),
	path = require('path')
	session = require('express-session')
	body_parser = require('body-parser')
	mongoose = require('mongoose')



var AnimalSchema = new mongoose.Schema({
	name: {type:String, required:true, minlength: 3},
	age: {type:Number, required:true, min: 2, max: 50}
}, {timestamps: true})
mongoose.Promise = global.Promise;
mongoose.model('Animal', AnimalSchema)
var Animal = mongoose.model('Animal')

mongoose.connect('mongodb://localhost/mongooses')
app.use(body_parser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"static")));
app.use(session({
	secret: "fjadstjprjgkperjwkgjskfgmweogkaosfmgokgasg",
	proxy: true,
	resave: false,
	saveUinitialized: true
}))


app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	Animal.find({}, (err, animals) => {
		res.render('index', {data: animals})
	})
	
})
app.get('/mongooses/new', (req, res)=>{
	res.render('new')
})
app.post('/new', (req, res) => {
	console.log('POST DATA', req.body)
	var animal = new Animal(req.body)
	animal.save((err)=>{
		if (err){
			console.log('something fucked up')
			res.render('new', {errors: user.errors})
		}
		else{
			console.log("added an animal")
			res.redirect('/')
		}
	})
})
app.get('/mongooses/edit/:id', (req, res) => {
	Animal.findOne({_id: req.params.id}, (err, animal) => {
		res.render('update_mongoose', {animal: animal})
	})
		
})
app.post('/edit/:id', (req, res)=> {
	Animal.findByIdAndUpdate({_id: req.params.id}, req.body, (err, animal)=>{
		if (err){
			console.log('something fucked up')
			res.redirect('/mongooses/edit')
		}
		else{
			res.redirect('/')
		}
	})
})
app.get('/mongooses/show/:id', (req, res)=>{
	Animal.findOne({_id: req.params.id}, (err, animal)=>{
		res.render('show_mongoose', {animal: animal})
	})
})
app.get('/mongooses/destroy/:id', (req, res)=> {
	Animal.findOneAndRemove({_id: req.params.id}, (err, animal)=>{
		console.log('animal deleted')
		res.redirect('/')
	})
})
app.listen(8000, ()=>{
	console.log('listening on port 8000')
})