let express = require('express'),
	app=express(),
	path=require('path'),
	session=require('express-session'),
	bodyParser=require('body-parser'),
	mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/1955')
var Schema = mongoose.Schema;
var TaskSchema = new mongoose.Schema({
	title: { type: String, required: true}

}, {timestamps: true})

mongoose.Promise = global.Promise;
mongoose.model('Task', TaskSchema)

var Task = mongoose.model('Task')


app.use(bodyParser.json())

app.get('/', (req, res)=>{
	Task.find({}, (err, tasks)=>{

		if (err){
			console.log('error')
			console.log(err)
			res.json({message: 'error', error: err})
		}
		else{
			console.log(tasks)
			res.json({message: 'success', data: tasks})
		}
	})
})
app.get('/create/:title', (req, res)=>{
	let task = new Task({title: req.params.title})
	task.save((err, task)=>{
		if (err){
			console.log('error')
			res.json({message: 'error', error: err})
		}
		else{
			console.log('success')
			console.log(task)
			res.redirect('/')
		}
	})
})







app.listen(8000, function(){
	console.log('listening on port 8000')
})