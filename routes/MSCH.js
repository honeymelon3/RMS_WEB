var express = require('express');
var router = express.Router();
var ModbusRTU=require("modbus-serial");
var io2=require('../socketio');
//var io=require("socket.io");
var client=new ModbusRTU();
client.connectTCP("172.19.37.43",{port:502});
var int16ToFloat32=function(int1,int2){
  var buf = new ArrayBuffer(4);
  var ints = new Uint16Array(buf);
  ints[0]=int1;
  ints[1]=int2;
  var floats=new Float32Array(buf);
  var num=floats[0];
  return num;
}
var readData=function(){
  client.readHoldingRegisters(0, 100, function(err, data){ 
      io2.pvSend('BY14AX044',int16ToFloat32(data.data[0],data.data[1]).toFixed(2));
      io2.pvSend('BY14AX045',int16ToFloat32(data.data[2],data.data[3]).toFixed(2));
      io2.pvSend("BY14AX047",int16ToFloat32(data.data[4],data.data[5]).toFixed(2));
      io2.pvSend('BY14AX051',int16ToFloat32(data.data[6],data.data[7]).toFixed(2));
      io2.pvSend('BY14AX052',int16ToFloat32(data.data[8],data.data[9]).toFixed(2));
      io2.pvSend('BY14AX064',int16ToFloat32(data.data[10],data.data[11]).toFixed(2));
      io2.pvSend('BY14AX065',int16ToFloat32(data.data[12],data.data[13]).toFixed(2));
      io2.pvSend('BY14AX066',int16ToFloat32(data.data[14],data.data[15]).toFixed(2));
      io2.pvSend('BY14AX067',int16ToFloat32(data.data[16],data.data[17]).toFixed(2));
      io2.pvSend('BY14AX068',int16ToFloat32(data.data[18],data.data[19]).toFixed(2));
      io2.pvSend('BY14AX070',int16ToFloat32(data.data[20],data.data[21]).toFixed(2));
      io2.pvSend('BY14AX079',int16ToFloat32(data.data[22],data.data[23]).toFixed(2));
      io2.pvSend('BY14AX081',int16ToFloat32(data.data[24],data.data[25]).toFixed(2));
      io2.pvSend('BY14AX082',int16ToFloat32(data.data[26],data.data[27]).toFixed(2));
      io2.pvSend('BY14AX087',int16ToFloat32(data.data[28],data.data[29]).toFixed(2));
      io2.pvSend('ST01AX003',int16ToFloat32(data.data[30],data.data[31]).toFixed(2));
      io2.pvSend('ST01AX004',int16ToFloat32(data.data[32],data.data[33]).toFixed(2));
      io2.pvSend('ST01AX006',int16ToFloat32(data.data[34],data.data[35]).toFixed(2));
      io2.pvSend('ST03AX004',int16ToFloat32(data.data[36],data.data[37]).toFixed(2));
      io2.pvSend('BY14AX040',int16ToFloat32(data.data[38],data.data[39]).toFixed(2));
      io2.pvSend('BY14AX041',int16ToFloat32(data.data[40],data.data[41]).toFixed(2));
  });
}
router.get('/', function(req, res, next) {
  res.render('labmsch', { title: 'Express' });
});
router.get('/sendMschData',function(req,res,next){
   var ajaxText={
	tips:"走通了"
   };
   setInterval(readData,1000);
   res.send(ajaxText);
});
module.exports= router;
