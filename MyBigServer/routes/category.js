var router = global.router;
var Category = require('../models/CategoryModel');
router.post('/insert_new_cate',(req,res,next)=>{
    const condition = {
        nameCate: RegExp('^'+req.body.name.trim()+'$',"i"),
    };
    Category.find(condition).limit(1).exec((err,categories)=>{
        if(err){
            res.json({
                status: "fail",
            })
        }else{
            var num = categories.length;
            if(num>0){
                res.json({
                    status: "fail",
                    messege: "Da ton tai ban ghi",
                });
            }else{
                var Cate= new Category({
                    nameCate: req.body.name,
                    description: req.body.des,
                });
                Cate.save((err)=>{
                    if(err){
                        res.json({
                            status: "error",
                            data: [],
                            messege: `error is ${err}`,
                        })
                    }else{
                        res.json({
                            status: "ok",
                            nameCate: req.body.name,
                            Des: req.body.des,
                        })
                    }
                });
            }
        }
    });
    
});
router.get('/get_all_cate',(req,res,next)=>{
    res.json({
        trangthai: "category",
    })
});
module.exports = router;