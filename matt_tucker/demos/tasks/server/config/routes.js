var path    = require('path'),
    tasks   = require('../controllers/tasks');

module.exports = (app) => {
    app.get('/tasks', tasks.index);
    app.post('/tasks', tasks.create);
    app.get('/tasks/:id', tasks.show);
    // app.patch('/tasks/:id', tasks.update);
    // app.delete('/tasks/:id', tasks.destroy);

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
    });
}