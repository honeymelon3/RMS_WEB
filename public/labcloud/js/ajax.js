var connect=null;
function Connect(serverIP, serverPort) {
	this.socket = null;
	this.serverIP = serverIP;
	this.serverPort = serverPort;
        this.pvnamelist=['BY14AX044','BY14AX045','BY14AX047','BY14AX051','BY14AX052','BY14AX064','BY14AX065','BY14AX066','BY14AX067','BY14AX068','BY14AX070','BY14AX079','BY14AX081','BY14AX082','BY14AX087','ST01AX003','ST01AX004','ST01AX006','ST03AX004','BY14AX040','BY14AX041'];
}
$(document).ready(function(){
        connect=new Connect('47.100.41.42',80);
        connect.initSocket();
         $.ajax({
            url:'/labcloud/mcsh/sendMschData',
            type:'get',
            dataType:'json',
            success:function(data){
                var stringdata=JSON.stringify(data);
            },
            error:function(err){
                alert('error');
            },
        });
});
Connect.prototype.socketon=function(pvname){
    this.socket.on(pvname,function(data){
       try{
          $('#'+pvname).text(data);
       }
        catch(e){}
    });
}
Connect.prototype.initSocket=function(){
    this.socket=io('47.100.41.42:80');
    this.socket.on('connect',function(){
	//alert(6666);
        //console.log("socket connected to http://"+connect.serverIP+":"+connect.serverPort);
    });
    for(var i=0;i<this.pvnamelist.length;i++){
        this.socketon(this.pvnamelist[i]);
    }
    //this.socketon(this.pvnamelist[0]);
    //this.socketon(this.pvnamelist[1]);
    //this.socketon(this.pvnamelist[2]); 	
    this.socket.on('disconnect',function(exception){
        console.log("socket disconnect");
    });
}
