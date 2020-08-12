var express = require('express');
var router = express.Router();
var my_conn = require('./pgconn');

/* GET home page. */



//使用post请求接收电站数据

router.post('/StationList', function(req, res, next) { //获取电站列表
    var StationList = req.body;
    console.log(StationList);
})

router.post('/stationDetail', function(req, res, next) { //获取电站详情
    var stationDetail = req.body;
    console.log(stationDetail);
})

router.post('/collectorList', function(req, res, next) { //获取采集器列表
    var collectorList = req.body;
    console.log(collectorList);
})

router.post('/collectorDetail', function(req, res, next) { //获取采集器详情
    var collectorDetail = req.body;
    console.log(collectorDetail);
})

router.post('/inverterList', function(req, res, next) { //获取逆变器列表
    var inverterList = req.body;
    console.log(inverterList);
})

router.post('/inverterDetail', function(req, res, next) { //获取逆变器详情
    var inverterDetail = req.body;
    console.log(inverterDetail);
})

router.post('/addUser', function(req, res, next) { //获取新增用户信息
    var addUser = req.body;
    console.log(addUser);
})

router.post('/addStation', function(req, res, next) { //获取新增电站信息
    var addStation = req.body;
    console.log(addStation);
})

router.post('/stationDay', function(req, res, next) { //获取电站日图表
    var stationDay = req.body;
    console.log(stationDay);
})

router.post('/stationMonth', function(req, res, next) { //获取电站月图表
    var stationMonth = req.body;
    console.log(stationMonth);
})

router.post('/stationYear', function(req, res, next) { //获取电站年图表
    var stationYear = req.body;
    console.log(stationYear);
})

router.post('/stationAll', function(req, res, next) { //获取电站累计图表
    var stationAll = req.body;
    console.log(stationAll);
})

router.post('/addDevice', function(req, res, next) { //获取新增设备信息
    var addDevice = req.body;
    console.log(addDevice);
})

router.post('/inverterDay', function(req, res, next) { //获取逆变器日图表
    var inverterDay = req.body;
    console.log(inverterDay);
})

router.post('/inverterMonth', function(req, res, next) { //获取逆变器月图表
    var inverterMonth = req.body;
    console.log(inverterMonth);
})

router.post('/inverterYear', function(req, res, next) { //获取逆变器年图表
    var inverterYear = req.body;
    console.log(inverterYear);
})

router.post('/inverterAll', function(req, res, next) { //获取逆变器累计图表
    var inverterAll = req.body;
    console.log(inverterAll);
})

router.post('/stationUpdate', function(req, res, next) { //获取电站修改信息
    var stationUpdate = req.body;
    console.log(stationUpdate);
})

router.post('/updateInstaller', function(req, res, next) { //获取修改电站子账户信息
    var updateInstaller = req.body;
    console.log(updateInstaller);
})

router.post('/userList', function(req, res, next) { //获取用户列表
    var userList = req.body;
    console.log(userList);
})


module.exports = router;