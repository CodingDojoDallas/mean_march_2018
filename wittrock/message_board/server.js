let express = require('express'),
	app=express(),
	path=require('path'),
	session=require('express-session'),
	body_parser=require('body-parser'),
	mongoose=require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
	name: { type: String, required: true},
	message: {type: String, required: true},
	comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
}, {timestamps: true})
var CommentSchema = new mongoose.Schema({
	_post: {type: Schema.Types.ObjectId, ref: 'Post'},
	comment: {type: String, required: true}
	
	
}, {timestamps: true})
mongoose.Promise = global.Promise;
mongoose.model('Post', PostSchema)
mongoose.model('Comment', CommentSchema)
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

mongoose.connect('mongodb://localhost/message_board')
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
	Post.find({}).populate('comments').exec((err, post) => {
		console.log(err)
		console.log(post)
		res.render('index', {data: post})
	})
})
app.post('/new', (req, res) => {
	var post = new Post(req.body)
		post.save((err, post) => {
			if (err){
				console.log('something went wrong')
				res.render('index', {errors: post.errors})
			}
			else{
				res.redirect('/')
			}
		})
})
app.post('/posts/:id', (req, res) => {
	Post.findOne({_id: req.params.id}, (err, post)=>{
		var comment = new Comment(req.body);
		comment._post = post._id;
		comment.save((err, comment) => {
			if(err){
				console.log(err)
				res.render('index')
			}
			else{
				console.log(comment)
				post.comments.push(comment);
				post.save((err, post) => {
					res.redirect('/')
				})
			}
		})
	})
})

app.listen(8000, ()=>{
	console.log('listening on port 8000')
})