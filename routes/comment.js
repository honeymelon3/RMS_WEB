var express = require('express');
var dateU = require('date-utils')
var router = express.Router();
var pg1 = require('./pgconn');
var formidable=require('formidable');
/* GET home page. */


router.get('/', function(req, res, next) {

    res.render('page_comment', { title: 'Comments' });

});

router.get('/posts', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ='select * from posts where category != \'配置说明\' order by index desc limit 15;';
  console.log(sql);
  pg1.query(sql,function(result){		
		res.jsonp(result.rows);
    // console.log(result.rows); 
    
  }); 
  });

router.get('/category', function (req, res, next) {
  sql = "select category from categories order by index;";
  pg1.query(sql, function (result) {
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
      // console.log(sql);
      pg1.query(sql,function(error,result){	
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


//上传图片
router.post('/uploadImg',function(req,res,next){
  var form=new formidable.IncomingForm();
  form.keepExtensions=true;     //设置该属性为true可以使得上传的文件保持原来的文件的扩展名。
  form.uploadDir=__dirname+'/public/upload';   //设置上传文件存放的文件夹，默认为系统的临时文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
  //form.parse(request, [callback]) 该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
  form.parse(req,function(err,fields,files){
      if(err){
          throw err;
      }
      var image=files.imgFile;  //这是整个files流文件对象,是转换成有利于传输的数据格式
      var path=image.path;      //从本地上传的资源目录加文件名:如E:\\web\\blog\\upload\\upload_0a14.jpg
      /*下面这里是通过分割字符串来得到文件名*/
      var arr=path.split('\\');//注split可以用字符或字符串分割
      var name=arr[arr.length-1];
      /*上面这里是通过分割字符串来得到文件名*/
      var url="/upload/"+name;
      console.log(url);
      var info = {
          "error": 0,
          "url": url
      };
      //info是用来返回页面的图片地址
      res.send(info);
  })
})

module.exports = router;
