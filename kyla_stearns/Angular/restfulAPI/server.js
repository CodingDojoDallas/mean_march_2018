let express			= require('express');
	app				= express();
	bodyParser		= require('body-parser');
	mongoose		= require('mongoose');
	TasksSchema  	= new mongoose.Schema({
		title: {type: String},
		description: {type: String},
		completed: {type: Boolean, default: false},
	}, {timestamps: true});

app.use(bodyParser.json());
app.use(express.static( __dirname + '/helloAngular/dist' ));

// connect to the database -- make sure after localhost/ you put in the db name you created
mongoose.connect('mongodb://localhost/tasks');
// use native promises -- uses the promise library to save an object
mongoose.Promise = global.Promise
// Set this Schema in our Models as 'Task'
mongoose.model('Task', TasksSchema);
// Retrieve this Schema from our Models, named 'Task'
// MOST IMPORTANT -- get this blueprint by making a new schema instance from the mongoose.Schema()
// object constructor
let Task = mongoose.model('Task');

app.get('/tasks', (req,res) => {
	// GET ALL TASKS
	Task.find({}, (err, all_tasks) => {
		if(err){
			console.log("There's an error finding all tasks");
			res.json({errors: all_tasks.errors});
		}
		else{
			console.log("Successfully retrieved tasks", all_tasks);
			res.json({all_tasks: all_tasks});
		}
	});
});

app.post('/tasks/new', (req,res) => {
	// CREATE A NEW TASK
	console.log("Inside POST new task with form data", req.body.title, req.body.description);
	let new_task = new Task({title: req.body.title, description: req.body.description});
	new_task.save((err) => {
		if(err){
			console.log("There's an error creating a new task.");
			res.json({errors: new_task.errors});
		}
		else{
			console.log("Successfully created new task", new_task);
			res.json({message: 'You have successfully added a task!'});
		}
	});
});

app.get('/tasks/edit/:id', (req,res) => {
	// GET SPECIFIC TASK BY ID
	Task.find({_id: req.params.id}, (err, this_task) => {
		if(err){
			console.log("There's an error getting this task.");
			res.json({errors: this_task.errors});
		}
		else{
			console.log("Successfully retrieved this task", this_task);
			res.json({this_task: this_task});
		}
	});
});

app.put('/tasks/update/:id', (req,res) => {
	// UPDATE SPECIFIC TASK BY ID
	Task.update({_id: req.params.id}, {title: req.body.title, description: req.body.description}, (err, this_task) => {
		if(err){
			console.log("There's an error updating this task");
			res.json({errors: this_task.errors});
		}
		else{
			console.log("Successfully updated this task", this_task);
			res.json({message: "You have updated this task!"});
		}
	});
});

app.delete('/tasks/:id', (req,res) => {
	// DELETE SPECIFIC TASK BY ID
	console.log("Inside the DELETE function", req.params.id);
	Task.remove({_id: req.params.id}, (err) => {
	// if there is an error, console.log that something went wrong
		if(err){
			console.log("There's an error deleting this task.");
			res.json({errors: task.errors});
		}
		else{
			res.json({message: 'You have successfully deleted this task!'});
		}
	});
});

app.listen(5678, () => {
	console.log('Listening on port 5678');
})

