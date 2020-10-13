var publish = require("./publish2")
var os = require("os");
var progress = require("process")

for(let key in progress.argv)
{
	console.log("key: "+key+ " value:"+progress.argv[key]);
}
let ip = progress.argv[2];
let id = progress.argv[4];
let code = progress.argv[5];
let web = progress.argv[6];
let name = progress.argv[3];

publish.setAlertFun(alert);
function alert(str)
{
    console.log(str);
}

publish.oper(ip, "publish", {id, code, web, name});