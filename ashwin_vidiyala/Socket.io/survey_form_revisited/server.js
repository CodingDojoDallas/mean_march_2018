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
  console.log('Client/socket is now connected!');
  console.log('Client/socked it is: ', socket.id);

  socket.on('posting_form', (data) => {
    let form_data = {
      name:               data[0].value,
      dojo_location:      data[1].value,
      favorite_language:  data[2].value,
      comment:            data[3].value
    }
    socket.emit('updated_message', form_data);
    socket.emit('random_number', Math.floor(Math.random() * 1001 + 1));
  })
})
