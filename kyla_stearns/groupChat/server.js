// Import express and path modules.
let express     = require( "express");
    path        = require( "path");
    bodyParser  = require('body-parser');
    app         = express();
    session     = require('express-session');
// Define the static folder.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.

app.use(session({
  secret: 'kds1kfal-2poi-fsd5er-se6cgn99-da0jkfa4lsa-2nvfje-ow8vj-woi',
  proxy: true,
  resave: false,
  saveUninitialized: true
}));
// app.get('/', (req, res) => {
//  res.render("login");
// })
 app.get('/', (req, res) => {
  res.render("index");
 })

// Start Node server listening
let server = app.listen(5678, function() {
 console.log("listening on port 5678");
});
let io = require('socket.io').listen(server);


io.sockets.on('connection', (socket) => {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);

  socket.on("message_posted", (data) => {
       console.log(data);
      // console.log(location, name);
  io.emit('server_response', data);
  })
})
