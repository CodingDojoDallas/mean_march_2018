let express     = require('express'),
    app         = express(),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

// Other routes

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
  console.log('Client/socket is connected!');
  console.log('Client/socket id is: ', socket.id)

  socket.on('button_clicked', (data) => {
    console.log('Someone clicked a button! Reason: ', data.reason);
    socket.emit('server_response', { response: 'sockets are the best!'});
  })
})
