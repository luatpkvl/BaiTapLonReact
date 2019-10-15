var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DatBanSchema = new Schema({
    name_food: {
        type: String,
        default: "",
    },
    img_food: {
        type: String,
        default: "",
    },
    id_food: Schema.ObjectId,
    id_table: Schema.ObjectId,
    count: {
        type: Number,
        default: 0,
    }
});
module.exports = mongoose.model('datban',DatBanSchema);