var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FoodSchema = new Schema({
    id_food: Schema.ObjectId,
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    img:{
        type: String,
        default: "",
    },
    count: {
        type: Number,
        default: 0,
    }
    });
var TableSchema = new Schema({
    state:{
        type: Number,
        default: 0,
    },
    food: [FoodSchema],
});
module.exports = mongoose.model('table',TableSchema);