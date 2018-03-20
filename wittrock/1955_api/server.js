let express = require('express'),
	app=express(),
	path=require('path'),
	session=require('express-session'),
	bodyParser=require('body-parser'),
	mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/1955')
var Schema = mongoose.Schema;
var PersonSchema = new mongoose.Schema({
	name: { type: String, required: true}

}, {timestamps: true})

mongoose.Promise = global.Promise;
mongoose.model('Person', PersonSchema)

var Person = mongoose.model('Person')


app.use(bodyParser.json())




app.get('/', (req, res)=> {
		Person.find({}, (err, people) => {

			if (err) {
				console.log('returned error', err)
				res.json({message: 'error', error: err})
			}
			else{
				
				res.json({message: 'success', data  : people})
			}
		}) 
	})
app.get('/new/:name', (req, res)=>{
	let person1 = new Person({name: req.params.name})
		person1.save((err, person) => {
		if(err){
			console.log('error')
			res.json({message: 'error', error: err})
		}
		else{
			console.log(person)
			res.redirect('/')

		}
	})
	
})
app.get('/remove/:name', (req, res)=>{
	Person.findOneAndRemove({name: req.params.name}, (err, person)=>{

		console.log('person deleted')
		console.log(person)
		res.redirect('/')
	})
})
app.get('/:name', (req, res)=>{
	Person.findOne({name: req.params.name}, (err, person)=>{
		if (err){
			console.log('error')
			res.json({message: 'error', error: err})
		}
		else{
			res.json({message: 'success', data: person})
		}
	})
})
	


app.listen(8000, function(){
	console.log('listening on port 8000')
})