/**因为放到项目的script目录下， 最好不要使用npm install xxx -dev安装到本地，可能会导致项目的exml文件打不开** */
var path = require("path");
var fs = require("fs");
var progress = require("process")
var childprocess = require("child_process");

var argv = progress.argv.slice(2);
var projectPath = process.cwd();//调用者的路径
var toolsPath = path.join(projectPath, "tool");
let node16Path = path.join(toolsPath, "node/node16.16.0.exe");
let node11Path = path.join(toolsPath, "node/node11.15.0.exe");

//
// progress.argv[1] = projectPath;
var cmdDic = {};
var cmdIndex = 0;
console.log("路径： "+projectPath)
//自定义的注册在这里
//registerCmd("注册的指令多个名字可以用|分开", "指令执行的cmd字符串或者方法", "指令的描述")
/**显示帮助信息**/
registerCmd("help|h", showHelp, "显示帮助信息")
/**编译游戏**/
registerCmd("build|b", handleRunLayaair2cmd(["compile"]), "编译游戏");
registerCmd("publish|p", handleRunLayaair2cmd(["publish"]), "发布游戏", ["发布参数"]);
registerCmd("webpack", node16Path+" "+path.join(projectPath, "node_modules/webpack-dev-server/bin/webpack-dev-server.js")+" --config ./webpack.config.js", "编译游戏", null, projectPath);
/**更新svn 包括ui部分**/
registerCmd("svn", ()=>{
	execmd("svn update", projectPath);
}, "更新游戏及UI的svn");
/**导出界面  如 run ui (导出全部UI) 或者 run ui Bag (导出Bag包对应的UI)**/
registerCmd("ui", handleRunLayaair2cmd(["ui", "-a"]), "导出UI界面");




//cmdparams []
function handleRunLayaair2cmd(cmdParams){
	let cmd = "layaair2-cmd";
	return function(runParams){
		return new Promise((resolve, reject) => {
			execmd("where "+cmd).then((message)=>{
				let cmdPath = message.split("\n")[0];
				let jsPath = path.join(cmdPath, "./../node_modules/layaair2-cmd/layaair2-cmd.js");
				if(!jsPath){
					error("找不到： "+jsPath);
					return;
				}
				log("文件位于"+jsPath)
				execmd(node11Path + " "+jsPath+" "+(cmdParams?cmdParams.join(" "):'') + (runParams?runParams.join(" "):''), projectPath).then((msg)=>{
					resolve("over")
				}).catch((reason)=>{
					error("编译失败： "+reason);
					reject(reason)
				})
			}).catch((reason)=>{
				error("没有找到 "+cmd+" 文件位置\n"+reason)
				reject(reason)
			})
		})
	}
	
}


/**显示帮助 */
function showHelp(){
	let str = "";
	let nameArr = ["名字"];
	let paramDesArr = ["参数描述"];
	let desArr = ["描述"];
	let maxLen = [getStrLen(nameArr[0]),getStrLen(paramDesArr[0]),getStrLen(desArr[0])];
	let hasPush = {};
	let tempLen = 0;
	for(let key in cmdDic){
		let info = cmdDic[key];
		if(hasPush[info.name])continue;
		hasPush[info.name] = true;
		let name = info.id+"."+info.name.replace(/\|/gi, "或");
		nameArr.push(name);
		tempLen = getStrLen(name);
		if(tempLen>maxLen[0])maxLen[0] = tempLen;
		desArr.push(info.des);
		tempLen = getStrLen(info.des);
		if(tempLen>maxLen[2])maxLen[2] = tempLen;
		let paramStr = info.params.join(" , ");
		paramDesArr.push(paramStr);
		tempLen = getStrLen(paramStr);
		if(tempLen>maxLen[1])maxLen[1] = tempLen;
	}
	let len = 0;
	for(let i=0; i<maxLen.length; i++)len += maxLen[i];
	str += fullStr("-", len+6)+"\n";
	for(let i=0; i<nameArr.length; i++){
		str += nameArr[i]+fullStr(" ", maxLen[0]-getStrLen(nameArr[i]));
		str += " | ";
		str += paramDesArr[i]+fullStr(" ", maxLen[1]-getStrLen(paramDesArr[i]));
		str += " | ";
		str += desArr[i]+fullStr(" ", maxLen[2]-getStrLen(desArr[i]));
		str += "\n"
	}
	str += fullStr("-", len+6)+"\n";
	console.log(str);
}

/**获取文本的长度 英文为1, 汉字为2 */
function getStrLen(str){
	let len = 0;
	for(let i=0; i<str.length; i++){
		let code = str.charCodeAt(i);
		if(code>127)len+=2;
		else len +=1;
	}
	return len;
}

/**填充多少个fullStr */
function fullStr(fullStr, len){
	let str = "";
	for(let i=0; i<len; i++)str += fullStr;
	return str;
}

/**
 * 注册要执行的命令 
 * @param {*} name 
 * @param {*} run 
 * @param {*} des 
 */
function registerCmd(name, run, des, paramDesArr, cwd){
	let runFun = run;
	if(typeof run == "string"){
		runFun = function(params){
			execmd(run+" "+params.join(" "), cwd);
		}
	}
	cmdIndex ++;
	let nameArr = name.split("|");
	let cmdInfo = {id:cmdIndex, name:name||"", run:runFun||(()=>{}), des:des||"", params:paramDesArr||[]}
	for(let i=0;i<nameArr.length; i++){
		cmdDic[nameArr[i]] = cmdInfo;
	}
	cmdDic[cmdIndex] = cmdInfo;
}

//执行命令
async function run(params) {
	let type = "h";
	if(params.length>0)type = params.shift();
	if(type.charAt(0)=="-")type = type.substring(1);
	let cmd = cmdDic[type];
	if(!cmd){
		error("没有找到 "+type+" 对应的指令");
		showHelp();
		return;
	}
	if(cmd.run instanceof Promise){
		await cmd.run(params)
	}else{
		cmd.run(params);
	}
}



/**执行命令行 */
function execmd(cmd, cwd) {
	return new Promise((resolve, reject) => {
		cwd = cwd || __dirname;
		console.log("执行： " + cmd +" in "+cwd);
		// console.log(JSON.stringify(process.env));
		let env = JSON.parse(JSON.stringify(process.env));
		// env["PATH"] = process.env["PATH"];
		env["dp0"] = cwd;
		let p = childprocess.exec(cmd, { cwd: cwd, env:env}, (err, stdout, stderr) => {
			let errstr = err;
			if (errstr) {
				console.log("执行失败：" + cmd + "");
				reject(errstr)
			} else {
				console.log("执行成功" + cmd);
				resolve(stdout);
			}
		})
		p.stdout.on('data', function (data) {
			console.log(data);
		});
		p.stderr.on('data', function (data) {
			console.log(data);
		});
	})
}

/**
     * 遍历文件或文件夹
     * @param url 
     * @param onFile 
     * @param onDir 
     * @param thisObj 
     */
 function walkDir(url,onFile,onDir,thisObj, searchLevel=-1) {
	url = path.normalize(url);
	let stats = fs.statSync(url);
	if (stats.isDirectory()) {
		if(onDir) onDir.call(thisObj,url);
		if(searchLevel>=0){
			searchLevel --;
			if(searchLevel<0)return;
		}
		let files = fs.readdirSync(url);
		for (let i = 0, len = files.length; i < len; i++) {
			walkDir(path.join(url,files[i]),onFile,onDir,thisObj, searchLevel);
		}
		return true;
	} else {
		if(onFile) onFile.call(thisObj,url);
		return false;
	}
}
/**获取指定格式的时间 */
function getDateString(format = "yyyy-MM-dd hh:mm:ss") {
	let date = new Date();
	let dateReg = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S+": date.getMilliseconds()
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (let k in dateReg) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
				? dateReg[k] : ("00" + dateReg[k]).substr(("" + dateReg[k]).length));
		}
	}
	return format;
}

function log(msg){
	console.log(msg);
}
function warn(msg){
	console.warn(msg);
}
function error(msg){
	console.log("\033[41;37m " + msg + "\033[0m")
}

// function getWhereCmdPath(cmd){
//  execmd("where "+cmd).then((value)=>{
// 	console.log("成功： "+value)
//  }).catch((reason)=>{
// 	console.log("\033[41;37m 没有找到" + cmd + "对应的指令\033[0m\n" + `${helpDesStr}`)
//  })
// }
//程序执行入口
run(argv);