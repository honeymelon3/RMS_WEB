var express = require('express');
var dateU = require('date-utils')
var router = express.Router();
var pg = require('./pgconn');
/* GET home page. */


router.get('/', function(req, res, next) {

    res.render('page_comment', { title: 'Comments' });

});

router.get('/manual', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ='select * from posts where category != \'配置说明\' order by index desc limit 15;';
	pg.query(sql,function(result){		
		res.jsonp(result.rows);
    // console.log(result.rows); 
    
  }); 
  });

router.get('/category', function (req, res, next) {
  sql = "select category from manual_categories order by index;";
  pg.query(sql, function (result) {
    res.jsonp(result.rows);
    //console.log(result.rows); 

  });
});
router.get('/add', function (req, res, next) {

    res.render('add_comment', { title: 'Add comments' });

  });
router.post('/add', function (req, res, next) {
        // 获得form Value
      // console.log(req);
      // console.log(req.file);

      var  title =req.body.title;
      // console.log(title);
      var  category = req.body.category;
      var  body = req.body.body;
      var  author = req.body.author;
      var  date   = new Date().toFormat("YYYY-MM-DD HH24:MI:SS");
      
      // if (req.files.mainimage){
      //    var mainImageOriginalName= req.files.mainimage.originalname;
      //    var mainImageName = req.file.mainImage.name;
      //    var mainImageMime = req.file.mainImage.mimetype;
      //    var mainImagePath = req.file.mainImage.path;
      //    var mainImageExt = req.file.mainImage.extension;
      //    var mainImageSize = req.file.mainImage.size;
      // } else{
      //   var mainImageName = "noimage.png";
      // }; 
      sql='insert into posts(title,category,body,author,date) values (\'' +title+'\',\''+category+'\',\''+body+'\',\''+author+'\',\''+date+'\');';
      // console.log(sql);
      pg.query(sql,function(error,result){	
        // console.log(result);	
        // if(error){  
        //   console.log('ClientConnectionReady Error: ' + error.message);  
        //   pg.disconn();  
        //   return;  
        // }else{
        //   console.log('Inserted: ' + result.affectedRows + ' row.'),  
          console.log('insert comment success...\n'); 
          res.redirect('/comment');
        // }
      }); 
       

  });

module.exports = router;
