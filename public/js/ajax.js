var connect=null;
function Connect(serverIP, serverPort) {
	this.socket = null;
	this.serverIP = serverIP;
	this.serverPort = serverPort;
}
$(document).ready(function(){
        $("p").append(" <b>追加文本</b>");
        alert(3333);
        connect=new Connect('47.100.41.42',80);
        connect.initSocket();
         $.ajax({
            url:'/labcloud/msch/sendMschData',
            type:'get',
            dataType:'json',
            success:function(data){
                alert(data);
                var stringdata=JSON.stringify(data);
                //alert(stringdata);
            },
            error:function(err){
                alert('error');
            },
        });
});
Connect.prototype.initSocket=function(){
    this.socket=io('47.100.41.42:80');
    this.socket.on('connect',function(){
        //console.log("socket connected to http://"+connect.serverIP+":"+connect.serverPort);
    });
    this.socket.on('BY14AX044',function(data){
        try{
           $("#BY14AX044").text(data);
        }
        catch(e){}
    });
    this.socket.on('disconnect',function(exception){
        console.log("socket disconnect");
    });
}
