var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/page_comment.html', function(req, res, next) {
  res.render('page_comment');
});

module.exports = router;
