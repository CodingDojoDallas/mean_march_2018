let express = require('express');
	app = express();
	session = require('express-session');
	bodyParser = require('body-parser');
	mongoose = require('mongoose')

app.use(express.static( __dirname + '/gold/dist'));
app.use(bodyParser.json());    // CRUCIAL TO MAKE SURE USING CORRECTLY!
app.use(session({
	secret: 'kds1kfal-2poi-fsd5er-se6cgn99-da0jkfa4lsa-2nvfje-ow8vj-woi',
	proxy: true,
	resave: false,
	saveUninitialized: true
}));

mongoose.connect('mongodb://localhost/gold');
mongoose.Promise = global.Promise
let GoldSchema = new mongoose.Schema({
	score: {type: Number},
}, {timestamps: true});
mongoose.model('Gold', GoldSchema);
let Gold = mongoose.model('Gold');

app.get('/gold',(req,res) =>{
	console.log("INSIDE RES GET FOR PAGE REFRESH!")
	let score = new Gold({score: 0});
	score.save((err)=>{
		if(err){
			console.log("Error saving current score.")
		}
		else{
			session.game = score._id
			// REMEMBER: using req.session keeps it in the scope of this function so we want to use session.game to access it everywhere
			console.log(score, "Current score");
			console.log(session.game, "Game Session ID");
		}
	})
})

app.post('/results',(req,res)=>{
	// console.log('INSIDE RES POST FOR BRINGING IN NEW SCORE!');
	// console.log(req, "This is the request");
	// console.log(session.game, "This is the current game session id");
	Gold.findOne({_id: session.game}, (err, this_game)=> {
		if(err){
			console.log("Error finding this game session.");
		}
		else{
			console.log("Successfully brought in score.");
			console.log(this_game, "Current game session record from DB.");
		}
	});

	if(req.body){
		// console.log(req.body, "Inside the body");
		Gold.update({_id: session.game }, {score: req.body.goldCount}, (err, new_score)=>{
			if(err){
				console.log("Error updating score.");
			}
			else{
				console.log("Successfully updated score.");
				console.log(new_score, "New score record.");
			}
		})
	}
})

app.listen(8000,function(){
	console.log('listening on port 8000')
})