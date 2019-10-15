var router = global.router;
var DatBan = require("../models/DatBanModel");
var Food = require("../models/FoodModel");
var Table = require("../models/TableModel");
var mongoose = require('mongoose');
router.post('/test_add_datban',(req,res,next)=>{
    const DatBann =  new DatBan({
        name_food: req.body.name_food,
        img_food: req.body.img_food,
        id_food: mongoose.Types.ObjectId(req.body.id_food),
       id_table: mongoose.Types.ObjectId(req.body.id_table),
       count: req.body.count,
    });
    console.log(DatBann);
    DatBann.save((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log(DatBann);
        }
    });
    res.json({
        data: req.body,
    })
});
router.get('/get_dat_ban',(req,res,next)=>{
    var condition = {
        id_table: req.query.id_table,
    }
    DatBan.find(condition).select({
        img_food: 1,
        name_food: 1,
        id_food: 1,
        count: 1,
    }).exec((err,DatBann)=>{
        if(err){
            console.log(`error is ${err}`);
        }else{
            res.json({
                status: "ok",
                data: DatBann,
            });
        }
    });
});
module.exports = router;