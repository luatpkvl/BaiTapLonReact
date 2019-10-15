global.router = require('express').Router();
var router = global.router;
router = require('./food');
router = require('./users');
router = require('./category');
router = require('./table');
router = require('./datban');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
