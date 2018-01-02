var express = require('express');
var router = express.Router();
var pg = require('./pgconn');
/* GET home page. */


router.get('/', function(req, res, next) {

    res.render('page_comment', { title: 'Comments' });

});

router.get('/posts', function(req, res, next) {
  sql="select * from posts order by index limit 5;";
	pg.query(sql,function(result){		
		res.jsonp(result.rows);
    //console.log(result.rows); 
    
  }); 
  });

router.get('/category', function (req, res, next) {
  sql = "select category from categories order by index;";
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
      var  titile =req.body.title;
      var  category = req.body.category;
      var  body = req.body.body;
      var  author = req.body.editor;
      var  date   = new Date();
      if (req.files.mainimage){
         var mainImageOriginalName= req.files.mainimage.originalname;
         var mainImageName = req.files.mainImage.name;
         var mainImageMime = req.files.mainImage.mimetype;
         var mainImagePath = req.files.mainImage.path;
         var mainImageExt = req.files.mainImage.extension;
         var mainImageSize = req.files.mainImage.size;
      } else{
        var mainImageName = "noimage.png";
      } 

      req.checkbody
    res.render('add_comment', { title: 'Add comments' });

  });

module.exports = router;
