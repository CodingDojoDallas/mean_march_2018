let express     = require('express'),
    port        = 6789,
    app         = express(),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser'),
    routes      = require('./server/config/routes.js');

require('./server/config/mongoose.js');

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());  // NEED THIS FOR API
app.use(express.static(path.join(__dirname, '/client/dist')));

app.use(session({
    secret: '982340ojfadosiaf-o3rfad-s0aifk3k-9dk-sfoak-402kf0kda-f0',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

routes(app);

app.listen(port, () => {
    console.log("listening on port 6789");
});
