var express = require('express');
var router = express.Router();
var pg = require('./pgconn');
/* GET home page. */


router.get('/', function(req, res, next) {

    res.render('page_comment', { title: 'Comments' });

});

router.get('/posts', function(req, res, next) {
  sql="select * from posts order by index desc limit 5;";
	pg.query(sql,function(result){		
		res.jsonp(result.rows);
    //console.log(result.rows); 
    
	}); 
 
});
module.exports = router;
