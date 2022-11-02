var path = require("path");
var fs = require("fs");
const http = require('http')

/**项目的根路径 */
let workSpace = path.join(__dirname, "./../../");
let viewPath = path.join(workSpace, "laya/pages/views")
let codeRootPath = path.join(workSpace, "src/")
let moduleIdCodePath = path.join(workSpace, "src/game/model/link/ModuleId.ts")
let moduleRegisterCodePath = path.join(workSpace, "src/game/model/link/ModuleRegister.ts")
let configJsonUrl = "http://172.18.2.26:9090/laya/cehua/Data/XmlData/export/config.json";
let menuCfgDic = {};//menu 配置表 [id]:MenuCfg
let hasTabView = {};//有tab的界面[界面名字]:[界面名字]
/**
 * 根据编辑器中的name生成moduleId, 及注册
 */
async function run(){
    console.log("--生成ModuleId 及 ModuleRegister in "+workSpace)
    let skinModuleIdDic = {}//id->{name:xxx, ....}  hasInCode=标记是否已经在moduelId代码中了
    let parentDic = {};// childModuleId -> {parentId:number, index:number} 或者{parentCls:xxx}
    let codePathDic = {};
    await getRemoteCfg()
    initCodePath(codeRootPath, codePathDic)
    walkDir(viewPath, (url)=>{
        if(path.extname(url) != ".scene")return;
        let sceneObj = JSON.parse(fs.readFileSync(url, "utf-8"))
        let viewName = path.basename(url).replace(".scene", "");
        let moduleName = viewName.replace(/(View|Render)$/gi, "")
        let nameTag = sceneObj.props.name;
        let id  = ""
        if(nameTag){
            let arr = nameTag.split("_")//格式  moduleId_标记属性（可选)_...._属性:值(可选)_...
            id = arr[0];
            skinModuleIdDic[id] = {name:moduleName, id:id, viewName:viewName};
            if(arr.length>1){//解析name格式
                for(let i=1; i<arr.length; i++){
                    let str = arr[i];
                    if(str.indexOf(":")!=-1){
                        let infoArr = str.split(":")
                        skinModuleIdDic[id][infoArr[0]] = infoArr[1];
                    }else{
                        skinModuleIdDic[id][str] = true;
                    }
                }
            }
        }
        
        findChild(viewName, sceneObj.child, parentDic, id);
    })
    //读取代码中的moduleId, 并写入moduleId
    parseModuleIdCode(moduleIdCodePath, skinModuleIdDic);
    
    //解析注册关系
    parseModuleReg(moduleRegisterCodePath, skinModuleIdDic, parentDic, codePathDic);
    console.log("处理完毕")
}

/**获取远程配置信息 */
function getRemoteCfg(){
    return new Promise((resolve, reject)=>{
        http.get(configJsonUrl, res => {
            let list = [];
            res.on('data', chunk => {
                list.push(chunk);
            });
            res.on('end', () => {
                const data  = JSON.parse(Buffer.concat(list).toString());
                let menuList = data.menu.data;
                for(let i=0; i<menuList.length; i++){
                    menuCfgDic[menuList[i].id] = menuList[i]
                }
                resolve(menuCfgDic);
            });
        }).on('error', err => {
            console.log('Error: ', err.message);
            reject(err.message)
        });
    })
    
}

/**
 * 初始化类名和对应路径的对应关系
 * @param {*} codePath 
 * @param {*} codePathDic 
 */
function initCodePath(codePath, codePathDic){
    console.log("开始 解析代码对应的路径 ")
    walkDir(codePath, (url)=>{
        if(path.extname(url) != ".ts")return;
        let viewName = path.basename(url).replace(".ts", "");
        codePathDic[viewName] = url;
    });
    console.log("结束 解析代码对应的路径 ")
}

/**
 * 解析注册module
 * @param {*} codePath 
 * @param {*} skinModuleIdDic 
 * @param {*} parentDic 
 * @param {*} codePathDic 
 */
function parseModuleReg(codePath, skinModuleIdDic, parentDic, codePathDic){
    console.log("开始 解析模块间的关系 ModuleRegister")
    let code = fs.readFileSync(codePath, "utf-8")
    let findInitFun = /public\s+static\s+init\s*\(\s*\)\s*\{[\w\W]*?\}/gi;
    let findImportReg = /import\s+\{?(.*?)\}?\s*from\s*/gi;
    let arr;
    let hasImportDic = {};//已经导入的类
    let importDic = {};//用到的类， true需要导入， false已经导入了
    let hasRegDic = {};//已经注册过的类
    let viewName2Info = {};
    while(arr = findImportReg.exec(code)){
        let importItem = arr[1].split(",")
        for(let i=0; i<importItem.length; i++){
            hasImportDic[importItem[i].trim()] = true;
        }
    }
    let regStr = "";
    for(let key in skinModuleIdDic){
        let skinMInfo = skinModuleIdDic[key];
        viewName2Info[skinMInfo.viewName] = skinMInfo;
        hasRegDic[skinMInfo.viewName] = true;
        importDic[skinMInfo.viewName] = !hasImportDic[skinMInfo.viewName];
        let regItem = `\n\t\t// ${skinMInfo.id}. ${menuCfgDic[skinMInfo.id]?menuCfgDic[skinMInfo.id].name:""} \n\t\tModuleRegister.reg(ModuleId.${skinMInfo.name}, ${skinMInfo.viewName}`;
        let addParams = [];
        let paramsSize = 0;
        if(skinMInfo.show){//show 参数
            addParams.push("OpenType.Show");
            paramsSize = addParams.length;
        }else{
            addParams.push("OpenType.Popup");
        }
        if(parentDic[skinMInfo.id]){//parent 参数
            if(skinModuleIdDic[parentDic[skinMInfo.id].parentId])
            {
                let pInfo = skinModuleIdDic[parentDic[skinMInfo.id].parentId];
                addParams.push(`${pInfo.viewName}, ${parentDic[skinMInfo.id].index}`);
            }else{
                let parentCls = parentDic[skinMInfo.id].parentCls;
                importDic[parentCls] = !hasImportDic[parentCls];
                addParams.push(`${parentCls}, -1`);
            }
            paramsSize = addParams.length;
        }else{
            addParams.push("null, 0")
        }
        if(paramsSize>0)
        {
            addParams.length = paramsSize;
            regItem += ", "+addParams.join(", ")
        }
        regItem += ");";
        regStr += regItem;
    }
    //注册没有moduleId的tab
    regStr += `\n\n\t\t/** -------  没有ModuleId的tab处理 --------  */`;
    for(let viewName in hasTabView){
        let codeUrl = codePathDic[viewName];
        if(!codeUrl || !fs.existsSync(codeUrl))continue;
        let codeContent = fs.readFileSync(codeUrl, "utf-8")
        let tabChild = /TabUtils\.init\(.*?\s*\[(.*?)\]\)/gi;
        let arr;
        let viewDesName = viewName;
        if(viewName2Info[viewName]){
            let menuCfg = menuCfgDic[viewName2Info[viewName].id]
            if(menuCfg){
                viewDesName = menuCfg.id +" . "+menuCfg.name;
            }
        }
        while(arr = tabChild.exec(codeContent)){
            importDic[viewName] = !hasImportDic[viewName];
            regStr += `\n\n\t\t//${viewDesName} 中 tab 的子对象`;
            let tabChildViews = arr[1].split(",")
            for(let i=0; i<tabChildViews.length; i++){
                let childView = tabChildViews[i].trim();
                if(hasRegDic[childView])continue;
                hasRegDic[childView] = true;//新导入的
                importDic[childView] = !hasImportDic[childView];
                regStr += `\n\t\tModuleRegister.regClsInfo(${childView}, ${viewName}, ${i})`;
            }
        }
    }
    code = code.replace(findInitFun, `public static init(){\n\t\t/** run code 自动生成请勿修改 */${regStr}\n\t}`)
    //需要加上import
    let importStr = "";
    for(let key in importDic){
        if(importDic[key] && codePathDic[key]){
            importStr += `import ${key} from "${path.relative(path.dirname(codePath), codePathDic[key]).replace(/\\/gi, "/").replace(/\.ts$/, "")}";\n`
        }
    }
    if(importStr){
       let importPositionReg = /\s*import\s+.*?[\r\n]/gi;
       let lastIndex = -1;
       while(importPositionReg.exec(code)){lastIndex = importPositionReg.lastIndex;};
       if(lastIndex>0){
            code = code.substring(0, lastIndex)+""+importStr+""+code.substring(lastIndex);
       }else{
           code = importStr + code;
       }
    }
    fs.writeFileSync(codePath, code, "utf-8")
    console.log("写入 模块间的关系 ModuleRegister")
}

/**
 * 解析生成moduleId
 * @param {*} codePath 
 * @param {*} skinModuleDic 
 */
function parseModuleIdCode(codePath, skinModuleDic){
    console.log("开始 解析ModuleId")
    let code = fs.readFileSync(codePath, "utf-8")
    let codeModleDic = {};
    let name2Id = {}
    let arr;
    // let reg = /(?<!\/+\s*)(\w+)\s*=\s*(\d+)/gi//查找前面没有//的字符
    let reg = /(\w+)\s*=\s*(\d+)/gi
    while(arr = reg.exec(code)){
        codeModleDic[arr[2]] = {id:arr[2], name:arr[1], all:arr[0], start:reg.lastIndex-arr[0].length, end:reg.lastIndex};
        name2Id[arr[1]] = arr[2]
    }
    //开始比较
    let codeOffsetIndex = 0;
    for(let key in skinModuleDic){
        let skinMInfo = skinModuleDic[key];
        let codeMInfo = codeModleDic[key] || codeModleDic[name2Id[skinMInfo.name]];
        if(codeMInfo){
            skinMInfo.hasInCode = true;
            if(skinMInfo.name == codeMInfo.name && skinMInfo.id == codeMInfo.id)continue;
            let insertCode = skinMInfo.name+" = "+skinMInfo.id;
            code = code.substring(codeOffsetIndex, codeMInfo.start+codeOffsetIndex)+insertCode+code.substring(codeMInfo.end+codeOffsetIndex)
            codeOffsetIndex += insertCode.length - codeMInfo.all.length;
        }
    }
    let addModuleStr = "";
    for(let key in skinModuleDic){
        let skinMInfo = skinModuleDic[key];
        if(!skinMInfo.hasInCode){
            addModuleStr += `\n\t/** ${menuCfgDic[skinMInfo.id]?menuCfgDic[skinMInfo.id].name:""} */\n\t${skinMInfo.name} = ${skinMInfo.id},`;
        }
    }
    if(addModuleStr){
        console.log("新增模块：")
        console.log(addModuleStr);
        code = code.replace(/(\n*\}\s*)$/g, addModuleStr+"\$1")
    }
    fs.writeFileSync(codePath, code, "utf-8")
    console.log("写入 ModuleId")
}

/**
 * 查找子对象列表 中 tab的name属性， 将其作为对象的依赖关系
 * @param {*} viewName 界面的名字
 * @param {*} children array
 * @param {*} dic   存放结果的字典  [字模块的id] = {parentId:父模块的id, index:在tab中的索引}
 * @param {*} pid   父模块的id
 * @returns 
 */
function findChild(viewName, children, dic, pid){
    if(!children || children.length==0)return;
    for(let i=0; i<children.length; i++){
        let child = children[i];
        if(child.type == "Tab"){
            if(child.props.name){
                let nameArr = child.props.name.split("_");
                for(let i=0; i<nameArr.length; i++){
                    if(pid){
                        dic[nameArr[i]] = {parentId:pid, index:i}
                    }else{
                        dic[nameArr[i]] = {parentCls:viewName} 
                    }
                }
            }else{
                hasTabView[viewName] = viewName;
            }
        }
        findChild(viewName, child.child, dic, pid);
    }
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

// run();

module.exports =  {run}