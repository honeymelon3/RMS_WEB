var express = require('express');
var dateU = require('date-utils')
var router = express.Router();
var pg = require('./pgconn');
/* GET home page. */


router.get('/', function(req, res, next) {

    res.render('page_manual', { title: 'Manual' });

});

router.get('/manual', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ='select * from posts where category=\'配置说明\' order by index desc ;';
	pg.query(sql,function(result){		
		res.jsonp(result.rows);
    // console.log(result.rows); 
    
  }); 
  });



module.exports = router;
