var ws = require("nodejs-websocket")
var publish = require("./publish")

publish.setLogFun(log)

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
        conins.sendText("发版本了");
        let iscanrun = publish.run(ip);
        if(!iscanrun)
        {
            conins.sendText("正在执行发布中。。。");
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
    sendAll(str);
}


function sendAll(str){
    service.connections.forEach(function(con){
        con.sendText(str);
    })
}