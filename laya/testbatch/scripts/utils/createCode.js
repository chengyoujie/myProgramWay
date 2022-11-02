var fs = require("fs");
var path = require("path");
var os = require("os");

/**项目的根路径 */
let workSpace = path.join(__dirname, "./../../");
let viewPath = path.join(workSpace, "laya/pages/")

function createCode(url){
    let pinfo = path.parse(url);
    let auth =  os.hostname();
    let fileName = pinfo.name.replace(/\.\w+$/, "");//文件名字
    let clsName = fileName.charAt(0).toUpperCase()+fileName.substring(1);//类名字  首字母大写
    let info = {clsName:clsName, auth:auth, time:getDateStr(), url:url};
    let content = "";
    if(/.*?View$/.test(fileName)){//界面类  以View 结尾的文件
        content = getViewCode(info);
    }else if(/.*?Render$/.test(fileName)){//模块类 以Model结尾的文件
        content = getRenderCode(info);
    }else if(/.*?Model$/.test(fileName)){//模块类 以Model结尾的文件
        content = getModelCode(info);
    }else{
        content = getDefaultCode(info);
    }
    fs.writeFileSync(url, content, "utf-8");
}


/**
 * 获取Model类的信息
 */
 function getDefaultCode(info){
    return `/**
 * 
 * ${info.clsName} 类
 * made by ${info.auth}
 * create on ${info.time} 
*/
export default class ${info.clsName}{
    
    constructor() {
        
    }

}`;
}

/**
 * 获取Model类的信息
 */
function getModelCode(info){
    return `import { BaseModel } from "../../../core/base/BaseModel";

/**
 * 
 * ${info.clsName}数据类
 * made by ${info.auth}
 * create on ${info.time} 
*/
export default class ${info.clsName} extends BaseModel{
    
    constructor() {
        super();
    }

}`;
}

/**
 * 获取View类的信息
 */
function getViewCode(info){
    let extendsName = "";//继承UI类的名字
    let srcUrl = info.url.replace(/(.*?[\\/]src)[\\/].*?$/gi, "$1");
    let uiTsPath = path.join(srcUrl, "ui/layaMaxUI.ts");
    let initBtnOnStr="";
    let initBtnFunStr = "";
    if(fs.existsSync(uiTsPath)){
        let uiTsFile = fs.readFileSync(uiTsPath, "utf-8");
        let moduleArr = uiTsFile.split(/export\s+module\s+(.*?)\s\{/gi);
        //第一个是 import View = xxxxx 忽略掉
        //-----后面循环
        //包名
        //包内内容
        //------
        for(let i=1; i<moduleArr.length; i+=2){
            let packName = moduleArr[i];
            let packContent = moduleArr[i+1];
            let curClsUI = new RegExp("export\\s+class\\s+("+info.clsName+"UI)\\s+", "gi");
            let uiMatch = curClsUI.exec(packContent);
            if(uiMatch){
                extendsName = packName + "."+uiMatch[1];
                let varContentReg = new RegExp("export\\s+class\\s+("+info.clsName+"UI)\\s+([\\s\\S]*?)REG(.*?"+info.clsName+"UI)", "gi");
                let varContentArr =  varContentReg.exec(packContent);
                if(varContentArr){
                    let varContent = varContentArr[2];
                    let varReg = /public\s+(\w+)\s*:\s*([\w\.]+)/gi;
                    let varArr;
                    while(varArr=varReg.exec(varContent)){
                        let varName = varArr[1];
                        let varType = varArr[2];
                        let funName = "handleClick"+varName.substring(0, 1).toUpperCase()+varName.substring(1);
                        let funNameIdx = 0;
                        while(true){
                            funNameIdx = funName.indexOf("_");
                            if(funNameIdx == -1)break;
                            funName = funName.substring(0, funNameIdx)+funName.charAt(funNameIdx+1).toUpperCase()+funName.substring(funNameIdx+2)
                        }
                        if(varType == "Laya.Button" || varName.substring(0, 3).toLowerCase()=="btn"){
                            initBtnOnStr += (!initBtnOnStr?"":"\n\t\t")+`s.${varName}.on(Laya.Event.CLICK,s,  s.${funName});`
                            initBtnFunStr += (!initBtnFunStr?"":"\n\n\t")+`//点击${varName}事件\n\tprivate ${funName}(){\n\t\tlet s = this;\n\t}`
                        }
                    }
                    initBtnOnStr += (!initBtnOnStr?"":"\n")
                }
                break;
            }
        }
    }
    
    return `import { ui } from "${path.relative(path.dirname(info.url),  path.join(srcUrl, "ui/layaMaxUI")).replace(/\\/gi, "/")}";

/**
 * 
 * ${info.clsName} 界面类
 * made by ${info.auth}
 * create on ${info.time} 
*/
export default class ${info.clsName} ${extendsName?"extends "+extendsName:""}
{
    constructor(){
        super();
        let s = this;
        // s.defaultUIParams = {title:""}
    }

    //界面创建完成
    onAwake(): void {
        let s = this;
    }

    //界面打开
    onEnable(): void {
        let s = this;
        ${initBtnOnStr}
    }

    ${initBtnFunStr}
    //界面关闭
    onDisable(): void {
        let s = this;

    }

    //界面销毁
    onDestroy(): void {
        let s = this;

    }

}`;

}



/**
 * 获取Render 的信息
 */
 function getRenderCode(info){
    let extendsName = "";//继承UI类的名字
    let srcUrl = info.url.replace(/(.*?[\\/]src)[\\/].*?$/gi, "$1");
    let uiTsPath = path.join(srcUrl, "ui/layaMaxUI.ts");
    let viewInfo = {width:100, height:80};
    if(fs.existsSync(uiTsPath)){
        let uiTsFile = fs.readFileSync(uiTsPath, "utf-8");
        let moduleArr = uiTsFile.split(/export\s+module\s+(.*?)\s\{/gi);
        for(let i=1; i<moduleArr.length; i+=2){
            let packName = moduleArr[i];
            let packContent = moduleArr[i+1];
            let curClsUI = new RegExp("export\\s+class\\s+("+info.clsName+"UI)\\s+([\\s\\S]*?)REG(.*?"+info.clsName+"UI)", "gi");
            let uiMatch = curClsUI.exec(packContent);
            if(uiMatch){
                extendsName = packName + "."+uiMatch[1];
                let scenePathReg = /loadScene\s*\(\s*['"](.*?)['"]\s*\)/gi;
                let scenePathArr = scenePathReg.exec(uiMatch[0]);
                if(scenePathArr){
                    let scenePath = path.join(viewPath, scenePathArr[1])+".scene";
                    if(fs.existsSync(scenePath)){
                        let sceneJson = JSON.parse(fs.readFileSync(scenePath, "utf-8"));
                        viewInfo.width = sceneJson.props.width || viewInfo.width;
                        viewInfo.height = sceneJson.props.height || viewInfo.height;
                    }

                }
                break;
            }
        }
    }
    
    return `import { ui } from "${path.relative(path.dirname(info.url),  path.join(srcUrl, "ui/layaMaxUI")).replace(/\\/gi, "/")}";

/**
 * 
 * ${info.clsName} 界面类
 * made by ${info.auth}
 * create on ${info.time} 
*/
export default class ${info.clsName} ${extendsName?"extends "+extendsName:""}
{

    constructor(){
        super();
        let s = this;
        s.width = ${viewInfo.width};
        s.height = ${viewInfo.height};
    }
    
    //设置数据
    setData(data:any): void {
        let s = this;

    }

    //界面关闭
    onDisable(): void {
        let s = this;

    }

    //界面销毁
    onDestroy(): void {
        let s = this;

    }

}`;

}


/**
 * 获取时间信息
 * @param {*} format 
 * @returns 
 */
function getDateStr(format)
{
    format = format?format:"yyyy-MM-dd hh:mm:ss";
    let date = new Date();
    var dateReg = {
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
    for (var k in dateReg) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? dateReg[k] : ("00" + dateReg[k]).substr(("" + dateReg[k]).length));
            }
    }
    return format;
}

// createCode("D:/LayaProject/code/Game/src/game/module/rank/RankRender.ts")
//导出函数
module.exports = {createCode};