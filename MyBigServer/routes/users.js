
var router = global.router;
var fs = require("fs");
var Food = require('../models/FoodModel');
var User = require('../models/UserModel');
var formidable = require("formidable");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/insert_new_user',function(req,res,next){
  let form = new formidable.IncomingForm();
  form.uploadDir = "./upload";
  form.encoding = "utf-8";
  form.keepExtensions = true;
  form.maxFieldsSize = 10*10*1024;
  form.multiples = true;
  form.parse(req,(err,fields,files)=>{
    if(err){
      console.log(err);
    }else{
      let fieldUser = JSON.parse(fields.info);
      let myPath = files.img.path.split("\\")[1];
      const cond = {
        username: new RegExp('^'+fieldUser.username.trim()+'$','i'),
      };
      User.find(cond).limit(1).select({
        _id: 1,
        username: 1,
      }).exec((err,user)=>{
        if(err){
          console.log(err);
        }else{
          if(user.length>0){
            res.json({
              status: "exist",
            });
          }else{
            var useR = new User({
              username: fieldUser.username,
              pwd: fieldUser.pwd,
              level: 0,
              name: fieldUser.name,
              img: "http://10.0.3.2:3005/read_img?img_name="+myPath,
            });
            useR.save((err)=>{
              if(err){
                res.json({
                  status: `fail is ${err}`,
                })
              }else{
                res.json({
                  status: "ok",
                  username: fields.info.username,
                  pwd: fields.info.pwd,
                })
              }
            });
          }
        }
      });
    }
  });
});
router.put('/update_user',(req,res,next)=>{
  let form = new formidable.IncomingForm();
  form.uploadDir = "./upload";
  form.encoding = "utf-8";
  form.keepExtensions = true;
  form.maxFieldsSize = 10*10*1024;
  form.multiples = true;
  form.parse(req,(err,fields,files)=>{
    if(err){
      res.json({
        status: "fail",
        messege: `error is ${err}`,
      });
    }
    let myPath = files.avatar.path.split("\\")[1];
    res.json({
      status: "ok",
      path: myPath,
    });
    console.log(myPath);
  });
});
router.get("/read_img",(req,res,next)=>{
  let imgName = "upload/"+req.query.img_name;
  fs.readFile(imgName,(err,Img)=>{
    if(err){
      res.json({
        status: "fail",
      });
    }else{
      res.writeHead(200,{'Content-Type': 'image/jpeg'});
      res.end(Img)
    }
  });
});
router.get('/get_all_user',(req,res,next)=>{
  User.find({}).limit(100).select({
    _id: 1,
    username: 1,
    pwd: 1,
    level: 1,
    name: 1,
    img: 1,
  }).exec((err,users)=>{
    if(err){
      res.json({
        status: "fail",
        data: {},
        messege: `${err}`,
      });
    }else{
      res.json({
        status: "ok",
        data: users,
        messege: `${err}`,
      });
    }
  })
});
router.get('/get_user_by_id',(req,res,next)=>{
  var condition = {
    _id: require("mongoose").Types.ObjectId(req.query.id),
  };
  User.find(condition).limit(1).select({
    _id: 1,
    username: 1,
    pwd: 1,
    img: 1,
    name: 1,
    level: 1,
  }).exec((err,user)=>{
    if(err){
      res.json({
        status: "fail",
      });
        console.log(`error is ${err}`);
    }else{
      res.json({
        status: "ok",
        data: user,
        messege: "get successfully",
      });
    }
  })
});
router.get('/login_user',(req,res,next)=>{
  var condition = {
    username: req.query.username,
    pwd: req.query.pwd,
  };
  User.find(condition).limit(1).select({
    _id: 1,
    username: 1,
    pwd: 1,
    level: 1,
    img: 1,
    name: 1,
  }).exec((err,user)=>{
    if(err){
      res.json({
        status: "fail",
        data: {},
        messege: "login error",
      });
    }else{
      var num = user.length;
      if(user.length>0){
        res.json({
          status: "ok",
          data: user,
          messege: "login successfull",
        })
      }else{
        res.json({
          status: "fail",
          data: {},
          messege: "login Faill",
        });
      }
    }
  });
});
module.exports = router;
