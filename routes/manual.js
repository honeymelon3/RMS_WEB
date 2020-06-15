var express = require('express');
var dateU = require('date-utils')
var router = express.Router();
var pg = require('./pgconn');
/* GET home page. */


router.get('/', function(req, res, next) {

    res.render('manual_list', { title: 'Manual List' });

});

router.get('/manual', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ='select * from posts where category=\'配置说明\' order by index desc ;';
	pg.query(sql,function(result){		
		res.jsonp(result.rows);
    // console.log(result.rows); 
    
  }); 
  });


  router.get('/title/:manual_name', function(req, res, next) {
    // console.log(req.params)
    sql='select * from posts where title= \''+req.params.manual_name+'\';';
    // console.log(sql);
    pg.query(sql,function(result){	
      
      console.log(result.rows[0].title); 
      console.log(result.rows[0].author);
      console.log(result.rows[0].date);
      console.log(result.rows[0].body);   
      // console.log(result.rows[1]);
    res.render('page_manual',{title:result.rows[0].title,author:result.rows[0].author, date:result.rows[0].date,body:result.rows[0].body});
      // console.log(result.rows[1]); 
      
    }); 
  
  })

  // router.get('/manual/:manual_title', function(req, res, next) {
  //    sql='select * from posts where title= \''+req.param.manual_title+'\'+;'
  //   console.log(sql);
  //   pg.query(sql,function(result){		
  //   res.jsonp(result.rows);
  //     console.log(result.rows); 
      
  //   }); 

  // })


module.exports = router;
