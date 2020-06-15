var socketio={};
//r socket_io=require('socket.io');
socketio.getSocketio=function(io){
    this.pvSend=function(pvname,pvdata){
      io.sockets.emit(pvname,pvdata);
  }
}
module.exports=socketio;
