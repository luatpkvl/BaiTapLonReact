var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FoodSchema = new Schema({
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
    }
    ,
    },{
        timestamps:{
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    
});
    FoodSchema.path('name').set((name)=>{
        return name[0].toUpperCase()+name.slice(1);
    });
module.exports = mongoose.model('monan',FoodSchema);