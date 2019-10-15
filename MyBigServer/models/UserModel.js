var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    pwd:{
        type: String,
        required: true,
    },
    level:{
        type: Number,
        default: 0,
    },
    name:{
        type: String,
        default: "",
    },
    img:{
        type: String,
        default: "",
    }
});
module.exports = mongoose.model('nguoidung',UserSchema);