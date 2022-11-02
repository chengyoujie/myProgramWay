/**
 * egret AutoCodeEui 初始化
 * 默认配置如果是ts文件按下F12会执行此条命令（autocode.config.js  可以用 >Egret AutoCode  打开生成代码配置 打开编辑)
 * 输出当前文件的选择内容
 */
var fs = require("fs");
var path = require("path");
var os = require("os");
var progress = require("process");


console.log("开始解析ts文件");
console.log("===输入参数====");
for(let key in progress.argv)
{
	console.log("key: "+key+ " value:"+progress.argv[key]);
}
// let url = "d:\\LayaProject\\code\\Game\\src\\game\\module\\main\\MainView.ts";
let url = progress.argv[2];
let selectStart = progress.argv[3];
let selectEnd = progress.argv[4];
if(!fs.existsSync(url))
{
    console.log("没有找到："+url);
    return;
}
let fileName = path.basename(url);
let txt = fs.readFileSync(url, "utf-8");
//console.log(fileName)
if(fileName == "ModuleId.ts"){
    require("../utils/createModuleId").run();
}else if(!txt || !txt.replace(/\/\/\s*TypeScript\s*file/gi, ""))//空的文本
{
    require("../utils/createCode").createCode(url);
}else{
    require("../utils/createPackCode").run(url, selectStart, selectEnd);
}


