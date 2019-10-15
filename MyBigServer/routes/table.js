var router = global.router;
var Table = require('../models/TableModel');
var Food = require('../models/FoodModel');
router.post('/insert_table',(req,res,next)=>{
    function food(){
        return new Promise((resolve,reject)=>{
            Food.find({}).limit(100).sort({name: 1}).select({
                _id: 1,
                name: 1,
                price: 1,
                img: 1,
            }).exec((err,food)=>{
                if(err){
                    console.log(`error is ${err}`);
                }else{
                    let foodList = [];
                    food.forEach((item)=>{
                        foodList.push({
                            id_food: require('mongoose').Types.ObjectId(item._id),
                            name: item.name,
                            price: item.price,
                            img: item.img,
                        });
                    });
                    resolve(foodList);
                }
            });
        });
    }
    food().then((food)=>{
        var Tabler = new Table({
            state: 0,
            food: food,
        });
        Tabler.save((err)=>{
            if(err){
                console.log(`error is ${err}`);
            }else{
                console.log(`okkk`);
            }
        })
    }).catch((err)=>{
        console.log(err);
    });
    // var Tabler = new Table({
    //     state: 0,
    //     food: [{id_food: require('mongoose').Types.ObjectId("5da1d5fca8e5022448be4b07"), name: "Luat",price: "65000",img: "http://10.0.3.2:3005/read_img?img_name=upload_63b2e4d6180ec22f6a70c7521d8356a2.png",count: 0},
    //     {id_food: require('mongoose').Types.ObjectId("5da1d5fca8e5022448be4b07"), name: "Luâttt",price: "65000",img: "http://10.0.3.2:3005/read_img?img_name=upload_63b2e4d6180ec22f6a70c7521d8356a2.png",count: 0},
    // ],
    // });
    // Tabler.save((err)=>{
    //     if(err){
    //         console.log(`error is ${err}`);
    //     }else{
    //         res.json({
    //             status: "ok",
    //             messenge: "Đã thêm thành công!",
    //         })
    //     }
    // })
});
router.put('/change_state_after_change_count',(req,res)=>{
    let id_table = require('mongoose').Types.ObjectId(req.body.id_table); 
        function getSum(){
            return new Promise((resolve,reject)=>{
                Table.findById(id_table).limit(1).select({
                    food: 1,
                }).exec((err,tabler)=>{
                    if(err){
                        console.log(`err is ${err}`);
                    }else{
                        var sum = 0;
                        var sumMoney = 0;
                        tabler.food.forEach((item)=>{
                            sum+= item.count;
                            sumMoney += item.count*item.price;
                        });
                       resolve([sum,sumMoney]);
                    }
                });
            })
        }
   getSum().then((array)=>{
       console.log(array);
    if(array[0] >0){
        Table.updateOne(
            {_id: id_table},
            {$set: {"state": 1}}
            ,(err)=>{
                if(err){
                    console.log(`error is ${err}`);
                }else{
                    res.json({
                        state: 1,
                        sum: array[0],
                        sumMoney:  array[1],
                    });
                }
            });
        }else{
            Table.updateOne(
                {_id: id_table},
                {$set: {"state": 0}}
                ,(err)=>{
                    if(err){
                        console.log(`error is ${err}`);
                    }else{
                        res.json({
                            state: 0,
                            sum: array[0],
                        });
                    }
                });
        }
   }).catch((err)=>{
    console.log(`err is ${err}`);
   });
});
router.put('/update_count_food_in_table',(req,res)=>{
    console.log({id_food: req.body.id_food, id_table: req.body.id_table,count: req.body.count});
    Table.updateOne(
        {_id: require("mongoose").Types.ObjectId(req.body.id_table), "food.id_food": require("mongoose").Types.ObjectId(req.body.id_food)},
        {$set: {"food.$.count": req.body.count}}
        ,(err)=>{
            if(err){
                console.log(`error is ${err}`);
            }else{
                res.json({
                    status: "ok",
                })
            }
        });
});
router.get('/get_table_by_id',(req,res)=>{
    let id_table = require('mongoose').Types.ObjectId(req.query.id_table); 
        function getSum(){
            return new Promise((resolve,reject)=>{
                Table.findById(id_table).limit(1).select({
                    _id: 1,
                    state: 1,
                    food: 1,
                }).exec((err,table)=>{
                    if(err){
                        console.log(`err is ${err}`);
                    }else{
                        var sum = 0;
                        var sumMoney = 0;
                        table.food.forEach((item)=>{
                            sum+= item.count;
                            sumMoney += item.count*item.price;
                        });
                       resolve([sum,sumMoney,table.state,table.food]);
                    }
                });
            })
        }
   getSum().then((array)=>{
      console.log(array[3]);
      res.json({
          sum: array[0],
          sumMoney: array[1],
          state: array[2],
          food: array[3],
      })
   }).catch((err)=>{
    console.log(`err is ${err}`);
   });
    // let condition = {
    //     _id: require("mongoose").Types.ObjectId(req.query.id_table),
    // }
    // Table.find(condition).limit(1).select({
    //     _id: 1,
    //     state: 1,
    //     food: 1,
    // }).exec((err,table)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.json({
    //             data: table,
    //         });
    //     }
    // });
});
router.delete('/delete_table',(req,res,next)=>{
    const _idObject = require("mongoose").Types.ObjectId(req.body._id);
    const cond = {
        _id: _idObject,
        state: 1,
    };
    Table.find(cond).limit(1).select({
        _id: 1,
        state: 1,
    }).exec((err,table)=>{
        if(err){
            console.log(`error is ${err}`);
        }else{
            if(table.length>0){
                res.json({
                    status: "fail",
                });
            }else{
                Table.findByIdAndDelete(_idObject,(err)=>{
                    if(err){
                        console.log(`error is ${err}`);
                    }else{
                        res.json({
                            status: "ok",
                        })
                    }
                })
            }
        }
    });

});
router.get('/get_all_table',(req,res,next)=>{
    Table.find({}).limit(100).select({
        _id: 1,
        state: 1,
        food: 1,
    }).exec((err,table)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                status: "ok",
                data: table,
            });
        }
    })
});
module.exports = router;