var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Layout' });
});

router.get('/widget_tank', function(req, res, next) {
  res.render('widget_tank', { title: 'Widget tank' });
});



module.exports = router;
