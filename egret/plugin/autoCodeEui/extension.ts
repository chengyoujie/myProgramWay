import * as wing from 'wing';
import * as fs from 'fs';
import * as path from 'path';
var exec = require('child_process').exec;

var code = require("./createCode")
var utils = require("./utils")

import QuickPickItem = wing.QuickPickItem;
var rootpath = wing.workspace.rootPath;//项目路径



export function activate(context: wing.ExtensionContext) {
	console.log('根据Eui导出代码!');
	wing.commands.registerCommand('extension.autocodeeui', euiOutCode);
	wing.commands.registerCommand('extension.autocodeeuiconfig', euiOutCodeConfig);
	wing.commands.registerCommand('extension.autocodeeuimodule', euiOpenCodeModule);
	// wing.commands.registerCommand('extension.outcodeaddmenu', outCodeAddMenu);
}

export function deactivate() {
}

/**AutoCodeEui入口 */
function euiOutCode() {
	let curedit = wing.window.activeTextEditor;
	if(!curedit)
	{
		utils.log("当前没有打开界面");
		return;
	}
	let filePath = curedit.document.fileName;
	let fileName = filePath.substring(0,filePath.lastIndexOf("\\"));
	let ext = path.extname(filePath);
	if(ext != '.exml')
	{
		utils.log("当前不是Eui文件"+ext);
		return;
	}
	let content = fs.readFileSync(filePath, 'utf-8');
	let ids = findIds(content);
	// log("当前打开文件："+ids.join(" "));
	let euiinfo = {} as EUIInfo;
	euiinfo.path = filePath;
	euiinfo.content = content;
	euiinfo.ids = ids;
	let pathinfo = path.parse(filePath);
	let filename = euiinfo.fileName = pathinfo.name;
	let filearr = filename.match(/^(.*?)EuiSkin$/i);
	if(!filearr)
	{
		filearr = filename.match(/^(.*?)Skin$/i);
	}
	if(filearr)
		euiinfo.baseClsName = filearr[1];
	else
		euiinfo.baseClsName = filename;
	
	let skinNameReg = /\s+class=["'](\w+)["']\s+/gi;
	let skinNameArr = skinNameReg.exec(content);
	if(skinNameArr && skinNameArr.length>0)
	{
		euiinfo.skinName = skinNameArr[1];
	}else{
		euiinfo.skinName = euiinfo.baseClsName;
	}
	euiinfo.baseClsName = euiinfo.baseClsName;
	code.createCode(euiinfo);
}




function findIds(content:string):IdInfo[]{
	let ids:IdInfo[] = [];
	let lines = content.split(/[\r\n(\r\n)]/);
	let nss = findNameSp(lines.join(" "));
	let idexp = / id=\"(.*?)\"/ig;
	let uimodule = is_eui(content) ?"eui.":'egret.gui.';
	lines.forEach(line=>{
		let temp = line.match(idexp);
		if(temp && temp.length>0)
		{
			let clsDef = line.match(/<(.+?):(.+?) /);
			if(!clsDef || clsDef.length<3)return;
			let clsMod:string;
			if(clsDef[1] == "e")
			{
				clsMod = uimodule;
			}else{
				clsMod = nss[clsDef[1]];
				if(!clsMod){ 
					clsMod = (clsDef[1] || "")+ ".";
				}else{
					clsMod = clsMod.substring(0, clsMod.length - 1);
				}
			}
			let clsName = clsDef[2];
			if(clsName == "Config" && clsMod == "w.")return;//忽略w:Config 的配置
			let id = temp[0].replace(' id=', "").replace('"', '').replace('"', '');
			ids.push({name:id, module:clsMod, clsName:clsName});
		}
	})
	return ids;
}

function findNameSp(text:string){
	var map = {};
	var names = text.match(/xmlns:(.+?)="(.+?)"/g);
	names.forEach((name)=>{
		var result = name.match(/xmlns:(.+?)="(.+?)"/);
		if(result.length == 3)
		{
			map[result[1]] = map[result[2]];
		}
	});
	return map;
}

function is_eui(text:string):boolean{
	if(text.indexOf('xmlns:e="http://ns.egret.com/eui"') > 0)
		return true;
	return false;

}

/**打开EuiAutoCode 的配置文件 */
function euiOutCodeConfig()
{
	let doc = wing.workspace.openTextDocument(code.getConfigPath());
	doc.then((dic)=>{
		wing.window.showTextDocument(dic);
	})
}

function euiOpenCodeModule()
{
	// exec('explorer.exe /select, '+code.getModulePath());
	exec('explorer.exe '+code.getModulePath());
}

// function outCodeAddMenu()
// {
// 	let items:QuickPickItem[] = [];
// 	items.push({label:'导出', description:"根据当前的Eui导出代码"});
// 	wing.window.showQuickPick(items).then((selection)=>{
// 		if(!selection)return;
// 		switch(selection.label)
// 		{
// 			case "导出":
// 				euiOutCode();
// 			break;
// 		}
// 	})
// }







