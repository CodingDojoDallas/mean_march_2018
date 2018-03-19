var mongoose = require("mongoose"),
    db_name  = "tasks";

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost/${db_name}`, {useMongoClient: true});