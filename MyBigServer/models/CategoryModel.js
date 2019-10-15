var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
    nameCate:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: "",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose.model('category',CategorySchema);