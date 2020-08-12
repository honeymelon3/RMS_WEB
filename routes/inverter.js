var express = require('express');
var router = express.Router();
var my_conn = require('./pgconn');

/* GET home page. */



//使用post请求接收电站数据

router.post('/data', function(req, res, next) { //获取电站列表
    var StationList = req.body;
    console.log(StationList);
})




module.exports = router;