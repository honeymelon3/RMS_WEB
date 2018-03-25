var express = require('express');
var dateU = require('date-utils')
var router = express.Router();
var pg1 = require('./pgconn');
var formidable=require('formidable');
var path = require('path')
/* GET home page. */


router.get('/', function(req, res, next) {

    res.render('page_control_list', { title: 'Control System' });

});

// router.get('/posts', function(req, res, next) {
//   process.env.TZ = "Asia/Shanghai";
//   sql ='select * from posts where category != \'配置说明\' and category != \'测试\' order by index desc limit 15;';
//   console.log(sql);
//   pg1.query(sql,function(result){		
// 		res.jsonp(result.rows);
//     // console.log(result.rows); 
    
//   }); 
//   });



router.get('/system_concept', function (req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql = 'select * from posts where category=\'控制系统\'  ;';
  pg1.query(sql, function (result) {
    res.jsonp(result.rows);
    // console.log(result.rows); 

  });
  });

router.get('/info', function (req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql = 'select * from posts where category=\'EPICS系统\' ;';
  pg1.query(sql, function (result) {
    res.jsonp(result.rows);
    // console.log(result.rows); 

  });
  });

router.get('/database', function (req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql = 'select * from posts where category=\'数据库\' ;';
  // console.log("good");
  pg1.query(sql, function (result) {
    //  console.log(result.rows); 
      res.jsonp(result.rows);
  

  });
  });

// router.get('/advise', function (req, res, next) {
//   process.env.TZ = "Asia/Shanghai";
//   sql = 'select * from posts where category=\'建议\' order by index desc ;';
//   pg1.query(sql, function (result) {
//     res.jsonp(result.rows);
//     // console.log(result.rows); 

//   });
//   });
router.get('/epics', function (req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql = 'select * from posts where category=\'EPICS系统\' ;';
  // console.log("good");
  pg1.query(sql, function (result) {
    //  console.log(result.rows); 
    res.jsonp(result.rows);


  });
});


router.get('/title/:post_name', function (req, res, next) {
  // console.log(req.params)
  sql = 'select * from posts where title= \'' + req.params.post_name + '\';';
   console.log(sql);
  pg1.query(sql, function (result) {

    console.log(result.rows[0].title);
    console.log(result.rows[0].author);
    console.log(result.rows[0].date);
    console.log(result.rows[0].body);
    // console.log(result.rows[1]);
    res.render('page_comment_content', { title: result.rows[0].title, index : result.rows[0].index, author: result.rows[0].author, date: result.rows[0].date, body: result.rows[0].body });
    // console.log(result.rows[1]); 

  });

  })


router.get('/category', function (req, res, next) {
  sql = "select category from categories where index >= '10' order by index;";
  pg1.query(sql, function (result) {
    res.jsonp(result.rows);
    //console.log(result.rows); 

  });
  });
router.get('/add', function (req, res, next) {

    res.render('content_editor', { title: 'Add contents' });

  });
router.post('/add', function (req, res, next) {
        // 获得form Value
      // console.log(req);
      // console.log(req.file);

      var  title =req.body.title;
      // console.log(title);
      var  category = req.body.category;
      var  body = req.body.content;
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
      console.log(sql);
      pg1.query(sql,function(error,result){	
        // console.log(result);	
        // if(error){  
        //   console.log('ClientConnectionReady Error: ' + error.message);  
        //   pg.disconn();  
        //   return;  
        // }else{
        //   console.log('Inserted: ' + result.affectedRows + ' row.'),  
          console.log('insert comment success...\n'); 
          res.redirect('/control_system');
        // }
      }); 
       

  });


//上传图片
router.post('/uploadImg',function(req,res,next){
  var form=new formidable.IncomingForm();
  form.keepExtensions=true;     //设置该属性为true可以使得上传的文件保持原来的文件的扩展名。
  form.uploadDir=path.resolve(__dirname, '..')+'/public/upload';   //设置上传文件存放的文件夹，默认为系统的临时文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
  //form.parse(request, [callback]) 该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息

  form.parse(req, function (err, fields, files) {
    if (err) {
        throw err;
      var info = {
        "error": 1,
        "message": "上传文件错误信息"
      };
      res.send(info);
    }
    console.log("begin");
    var image = files.imgFile;
    var path = image.path;
    path = path.replace('/\\/g', '/');
    var url = '/upload' + path.substr(path.lastIndexOf('/'), path.length);
     console.log(url);
    var info = {
        "error": 0,
        "url": url
    };
    // res.setHeader("P3P", "CP=CAO PSA OUR");
    res.send(info);
  });
  })



module.exports = router;
