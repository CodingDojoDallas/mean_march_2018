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

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
  console.log('Socket is now connected on', socket.id);

  socket.on('user_logged_in', (name) => {
    console.log(session.all_messages);
    if (session.all_messages) {
      socket.emit('send_all_messages', session.all_messages);
    }
  })

  socket.on('message_sent', (message) => {
    session.all_messages ? session.all_messages.push(message) : session.all_messages = []
    io.emit('send_message', message);
  })
})
