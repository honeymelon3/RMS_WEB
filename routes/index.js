var express = require('express');
var router = express.Router();
var my_conn = require('./pgconn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Layout' });
});

router.get('/widget_tank', function(req, res, next) {
  res.render('widget_tank', { title: 'Widget tank' });
});


router.route("/login").get(function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
	res.render("login",{title:'用户登陆'});
}).post(function(req,res){ 	

	var user =req.body;
	var myDate = new Date();
	var loginTime = myDate.toLocaleString();
   	var sql = 'select * from users where username =\'' + user.username + '\' and password = \''+ user.password + '\'';	
    // sql_record = 'insert into login_record(user_name,login_time) values (\''+user.username+'\',\''+loginTime+'\')';
    console.log(sql);
	   my_conn.query(sql,function(result){
		////console.log(result.rowCount)
		if(result.rowCount == 0){ 
			//req.session.error = '用户名或密码不正确';
			res.sendStatus(404);							//	状态码返回404
			//	res.redirect("/login");
		}else if(result.rowCount == 1){
			// console.log(result.rows[0]);
			req.session.user = result.rows[0]; 
			// console.log(result.rows[0]);
			res.render('task', { title: '任务清单'}); 
			// my_conn.query(sql_record,function(result){
			// 	//req.session.user = req.body.username;
			// 	////console.log(req.session.user);
			// //	//console.log('good');
			// 	})
		}		
	});				   

});

router.get('/task_data', function (req, res, next) {
	process.env.TZ = "Asia/Shanghai";
	sql = 'select * from tasks order by index;';
	my_conn.query(sql, function (result) {
	  res.jsonp(result.rows);
	  console.log(result.rows); 
   
	});
	});



router.get('/task', function(req, res, next) {
	// console.log(typeof req.session.user);
	if(req.session.user){ 					//到达/home路径首先判断是否已经登录
		res.render('task', { title: '任务清单'});   			//未登录则重定向到 /login 路径
	} ;	
	if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
		res.render('login'); 			//未登录则重定向到 /login 路径
	} ;	
  
});

module.exports = router;
