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

  socket.on('epic_button_clicked', (clicks) => {
    if (!session.click) {
      session.click = 0;
    }
    session.click++;
    io.emit('number_of_clicks', session.click);
  })

  socket.on('reset_button_clicked', () => {
    session.click = 0;
    io.emit('reset_number_of_clicks', session.click);
  })
})
