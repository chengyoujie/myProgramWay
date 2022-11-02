var path = require("path");
var fs = require("fs");
const http = require('http')

/**项目的根路径 */
let workSpace = path.join(__dirname, "./../../");
let moduleRootPath = path.join(workSpace, "src/game/module")
let regClassPath = path.join(workSpace, "src/core/utils/RegClassId.ts")

/**
 * 刷新  RegClassId.ts
 */
function run(){
    console.log("开始注册类  RegClassId")
    let findImportReg = /import\s+\{?(.*?)\}?\s*from\s*/gi;
    let findInitFun = /public\s+static\s+init\s*\(\s*\)\s*\{[\w\W]*?\}/gi;
    let code = fs.readFileSync(regClassPath, "utf-8");
    let arr;
    let hasImportDic = {};//已经导入的类
    let importDic = {};//用到的类， true需要导入， false已经导入了
    while(arr = findImportReg.exec(code)){
        let importItem = arr[1].split(",")
        for(let i=0; i<importItem.length; i++){
            hasImportDic[importItem[i].trim()] = true;
        }
    }

    let regStr = "";
    let importStr = "";
    walkDir(moduleRootPath, (url)=>{
        if(path.extname(url) != ".ts")return;
        let fileName = path.basename(url).replace(".ts", "")
        if(!/.*?View$/gi.test(fileName))return;
        regStr+=`\n\t\treg(${fileName}, "${fileName}")`;
        if(!hasImportDic[fileName]){
            hasImportDic[fileName] = true;
            importStr += `import ${fileName} from "${path.relative(path.dirname(regClassPath), url).replace(/\\/gi, "/").replace(/\.ts$/, "")}";\n`
        }
    });
    code = code.replace(findInitFun, `public static init(){\n\t\t/** run code 自动生成请勿修改 */\n\t\tlet reg = pub.ClassUtil.regClassId.bind(pub.ClassUtil);${regStr}\n\t}`)
    if(importStr){
        code = importStr + code;
    }
    // MatchView
    fs.writeFileSync(regClassPath, code, "utf-8")
    console.log("注册类完毕")
}

/**
 * 遍历文件
 * @param {*} url 
 * @param {*} onFile 
 * @param {*} onDir 
 * @param {*} thisObj 
 * @param {*} notWalkSelf 
 * @returns 
 */
 function walkDir(url,onFile,onDir,thisObj, notWalkSelf) {
    url = path.normalize(url);
    var stats = fs.statSync(url);
    if (stats.isDirectory()) {
        if(onDir && !notWalkSelf) onDir.call(thisObj,url);
        var files = fs.readdirSync(url);
        for (var i = 0, len = files.length; i < len; i++) {
            walkDir(path.join(url,files[i]),onFile,onDir,thisObj);
        }
        return true;
    } else {
        if(onFile) onFile.call(thisObj,url);
        return false;
    }
}

module.exports =  {run}