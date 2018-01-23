var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Layout' });
});


router.get('/title/:manual_name', function(req, res, next) {
  // console.log(req.params)
  sql='select * from posts where title= \''+req.params.manual_name+'\';';
  // console.log(sql);
  pg.query(sql,function(result){	
    
    console.log(result.rows[0].anonymous); 
    // console.log(result.rows[1]);
  res.render('page_manual');
    // console.log(result.rows[1]); 
    
  }); 

})

module.exports = router;
