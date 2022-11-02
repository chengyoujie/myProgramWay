var path = require("path");
var fs = require("fs");
const http = require('http')

/**项目的根路径 */
let workSpace = path.join(__dirname, "./../../");
let viewPath = path.join(workSpace, "laya/pages/views")
let codeRootPath = path.join(workSpace, "src/")
let moduleCodePath = path.join(workSpace, "src/game/module")
//过滤的文件
let fileFilter = [
    "ItemSellView",
    "ItemSellRender",
    "BossHpBarView",
    "LeadHpBarView",
    "PartnerListRender",
    "PartnerTypeListRender",
    "UnActivePartnerRender",
    "RoleEquipView",
]

function run(){
    console.log("开始生成代码")
    walkDir(viewPath, (url)=>{
        if(path.extname(url) != ".scene")return;
        // console.log("----"+url.replace(viewPath, ""))
        let codePath = path.join(moduleCodePath, url.replace(viewPath, "").replace(/\.scene$/gi, ".ts"));
        let viewName = path.basename(url).replace(".scene", "");
        if(fs.existsSync(codePath) || existsInChildrenSync(path.dirname(codePath), viewName))return;//已经存在的 
        if(fileFilter.indexOf(viewName) == -1)//是否在过滤的文件内
        {
        // if(!fs.existsSync(codePath)){
            // console.log('"'+viewName+'"'+",")
            mkfile(codePath)
        }
    })
    console.log("代码生成完毕")
}

// run()

function existsInChildrenSync(codePath, viewName){
    // console.log(codePath+" in "+viewName)
    if(!fs.existsSync(codePath))return false;
    let hasFind = false;
    walkDir(codePath, (url)=>{
        if(path.extname(url) != ".ts")return;
        let name = path.basename(url).replace(".ts", "");
        // console.log("查找： "+url+"  "+name)
        if(viewName == name){
            // console.log("find "+viewName)
            hasFind = true;
            return;
        }
    })
    return hasFind;
}


function mkfile(url){
    let dir = path.dirname(url);
    if(!fs.existsSync(dir))
    {
        let dirArr = dir.split("\\");
        for(let i=1; i<dirArr.length; i++){
            let parentPath = dirArr.slice(0, i+1).join("\\");
            if(!fs.existsSync(parentPath))
            {
                fs.mkdirSync(parentPath)
            }
        }
    }
    require("./createCode").createCode(url);
    // fs.writeFileSync(url, "", "utf-8")
    console.log("生成文件： "+url)
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

module.exports = {run}