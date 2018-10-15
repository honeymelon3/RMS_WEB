var express = require('express');
var router = express.Router();

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
   	var sql = 'select * from users where user_name =\'' + user.username + '\' and password = \''+ user.password + '\'';	
		// sql_record = 'insert into login_record(user_name,login_time) values (\''+user.username+'\',\''+loginTime+'\')';
	   my_conn.query(sql,function(result){
		////console.log(result.rowCount)
		if(result.rowCount == 0){ 
			//req.session.error = '用户名或密码不正确';
			res.sendStatus(404);							//	状态码返回404
			//	res.redirect("/login");
		}else if(result.rowCount == 1){
			////console.log(result.rows[0].username);
			req.session.user = result.rows[0]; 
			////console.log(result.rows[0]);
			res.sendStatus(200);
			// my_conn.query(sql_record,function(result){
			// 	//req.session.user = req.body.username;
			// 	////console.log(req.session.user);
			// //	//console.log('good');
			// 	})
		}		
	});				   

});

router.get('/task', function(req, res, next) {
	if(req.session.user.corrode == 1){ 					//到达/home路径首先判断是否已经登录
		res.render("data_corrode", { title: '熔盐数据库', alloy_name:'Hastelloy N'});   			//未登录则重定向到 /login 路径
	} ;	
	if(req.session.user.corrode == 0){ 					//到达/home路径首先判断是否已经登录
		res.render("/"); 			//未登录则重定向到 /login 路径
	} ;	
  
});

module.exports = router;
