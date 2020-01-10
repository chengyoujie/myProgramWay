var ws = require("nodejs-websocket")
var publish = require("./publish")

publish.setLogFun(log)
publish.setAlertFun(alert);

var service = ws.createServer(function (con){
    let ipReg = /\d+\.\d+\.\d+\.\d+/gi;
    let ip = con.socket.remoteAddress;
    let ipArr = ipReg.exec(ip);
    if(ipArr)ip = ipArr[0]
    let conins = con;
    con.on("text", function(str){
        console.log("recive"+ str);
        let data = JSON.parse(str);
        if(data.oper == "publish")
        {
            console.log("发版本了")   
        }
        log("开始发布版本  IP: <font color='#0940E8'>"+ip+"</font>");
        let iscanrun = publish.run(ip);
        if(!iscanrun)
        {
            log("正在执行发布中。。。");
        }
    })
    con.on("close", function(code, reason){
        console.log("close ", +code)
    })
    con.on("error", function(err){
        if(err.code == "ECONNRESET")
        {
            console.log("客户端主动断开");
        }else{
            console.log("error ", err)
        }
    })
}).listen(8089,undefined,()=>{
    console.log("服务器启动成功")
});

function log(str)
{   
    str = str.replace(/"/gi, "\'")
    sendAll(`{"type":"msg", "data":"${str}"}`);
}

function alert(str)
{
    str = str.replace(/"/gi, "\'")
    sendAll(`{"type":"alert", "data":"${str}"}`);
}



function sendAll(str){
    service.connections.forEach(function(con){
        con.sendText(str);
    })
}