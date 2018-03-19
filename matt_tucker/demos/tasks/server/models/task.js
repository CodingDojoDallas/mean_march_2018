var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);