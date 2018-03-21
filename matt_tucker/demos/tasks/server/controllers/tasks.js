var Task = require('../models/task');

module.exports = {
    index: (req, res) => {
        Task.find({}, (err, tasks) => {
            if (err) {
                return res.status(401).json(err);
            }

            return res.json(tasks);
        });
    },
    create: (req, res) => {
        const task = new Task(req.body);

        task.save( (err) => {
            if (err) {
                return res.status(401).json(err);
            }

            return res.json(task);
        });
    },
    show: (req, res) => {
        Task.findOne({_id: req.params.id}, (err, task) => {
            if (err) {
                return res.status(401).json(err);
            }

            return res.json(task);
        });
    }
}