var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/system_structure', function (req, res, next) {
  res.render('system_structure');
});
module.exports = router;
