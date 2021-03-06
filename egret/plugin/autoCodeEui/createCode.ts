var fs = require("fs")
var path = require("path")
var os = require("os")
var iconv = require("iconv-lite");

var wingapi = require("wing");

var utils = require("./utils")

var rootpath = wingapi.workspace.rootPath;//项目路径
var moduleCodePath;
var modulepath = path.join(__dirname, "./../", "module");
var configpath = path.join(__dirname, "./../", "config/app.config.json")
var config:AppConfig;
module.exports = {
    createCode,
    getConfigPath,
    getModulePath,
}

function getConfigPath()
{
    return configpath;
}

function getModulePath()
{
    return modulepath;
}

/**
 * 创建程序代码入口
 */
function createCode(info:EUIInfo)
{
    if(!fs.existsSync(configpath))
	{
		utils.err("请添加插件配置"+configpath)
		return;
	}
    let configtxt = fs.readFileSync(configpath, 'utf-8');
    config = JSON.parse(configtxt);
    moduleCodePath = config.moduleCodePath;
    
	let pathinfo = path.parse(info.path);
	let skinPathIndex = config.skinRootPath?path.normalize(pathinfo.dir).indexOf(path.normalize(config.skinRootPath)):-1;
	if(skinPathIndex != -1)
	{
		info.parentDir = path.normalize(pathinfo.dir).substr(skinPathIndex+path.normalize(config.skinRootPath).length);
	}else{
		let pathdirarr = path.normalize(pathinfo.dir).split(path.sep);
		info.parentDir = pathdirarr[pathdirarr.length-1];
	}

    let varsDic = {};
    varsDic["auth"] = config.auth  || getHostName() || os.userInfo().username;
    let date = new Date();
    varsDic["time"] = date.getFullYear()+"-"+(date.getMonth()+1) + "-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	varsDic['path'] = path.relative(rootpath, info.path);
    varsDic['fileName'] = info.fileName;
    varsDic['baseClsName'] = info.baseClsName;
    varsDic['skinName'] = info.skinName;
    let varids = "";
    let interfaceIds = "";
    let ids = info.ids;
    let createIdDic:{[id:number]:boolean} = {};
    let initEvent = "";
    let initButtons = [];
    let eventFunction = "";
    for(let i=0; i<ids.length; i++)
    {
        let id = ids[i];
        let preAdd = "";
        if(createIdDic[id.name])preAdd = "//";
        varids += preAdd+"public "+id.name+":"+id.module+id.clsName+";\n\t\t";
        interfaceIds += preAdd+id.name+":"+id.module+id.clsName+";\n\t\t";
        if(id.name.indexOf("btn") == 0)
        {
            initButtons .push(id.name);
            let idUpName = id.name.replace("btn", "").replace("_", "");
            if(!idUpName)idUpName = id.name;
            idUpName = idUpName.charAt(0).toLocaleUpperCase()+idUpName.substr(1);
            initEvent += "\n\t\t\t"+id.name+".clk(s.handleClk"+idUpName+", s)";
            eventFunction += "\n\t\t/**"+id.name+"点击事件处理**/\n\t\tprivate handleClk"+idUpName+"(){\n\t\t\n\t\t}\n\t\t";
        }

        createIdDic[id.name] = true;
    }
    if(initButtons.length>0)
        initEvent = "let s = this;\n\t\t\tlet {"+initButtons.join(",")+"} = s;"+initEvent;
    varsDic['initEvent'] = initEvent;
    varsDic['eventFunction'] = eventFunction;
    
    varsDic['varids'] = varids;
    varsDic['interfaceIds'] = interfaceIds;

    //创建界面
	// let modulepath = path.join(__dirname, "./../", "module");
    // var viewcode = createCodeTxt(path.join(modulepath, "View.txt"), info, varsDic);
	// var viewpath = path.join(rootpath,"src/game/module/"+info.parentDir+"/"+info.baseClsName+"View.ts");
	// saveFile(viewpath, viewcode);
    let create = findModule(config, info.fileName);
    createCreate(create, info, varsDic);
    // let moduleIds = create.usemodule.split(",");
    // var keys = create.keyword.split("|");
    // for(let j=0; j<keys.length; j++)
    // {
    //     if(info.baseClsName.indexOf(keys[j]) != -1)
    //     {
    //        varsDic["shortName"] = info.baseClsName.replace(keys[j], "");
    //        break;
    //     }
    // }
    // if(!varsDic["shortName"])varsDic["shortName"] = info.baseClsName;
    // varsDic["shortname"] = varsDic["shortName"].charAt(0).toLowerCase()+varsDic["shortName"].substr(1);
    // varsDic["moduleID"] = getModuleID(varsDic["shortName"]);
    // for(let i=0; i<moduleIds.length; i++)
    // {
    //     let mod:ModuleInfo = config.module[moduleIds[i]];
    //     if(!mod)
    //     {
    //         utils.log("app.config.json当前没有配置"+moduleIds[i]+"对应的配置")
    //         continue;
    //     }
    //     createFileByModuld(mod, info, varsDic);
    // }
}

function createCreate(create:CreateInfo, info:EUIInfo, varsDic:Object){
    let moduleIds = create.usemodule.split(",");
    var keys = create.keyword.split("|");
    for(let j=0; j<keys.length; j++)
    {
        if(info.baseClsName.indexOf(keys[j]) != -1)
        {
           varsDic["shortName"] = info.baseClsName.replace(keys[j], "");
           break;
        }
    }
    if(!varsDic["shortName"])varsDic["shortName"] = info.baseClsName;
    varsDic["shortname"] = varsDic["shortName"].charAt(0).toLowerCase()+varsDic["shortName"].substr(1);
    varsDic["moduleID"] = getModuleID(varsDic["shortName"]);
    for(let i=0; i<moduleIds.length; i++)
    {
        let mod:ModuleInfo = config.module[moduleIds[i]];
        if(!mod)
        {
            utils.log("app.config.json当前没有配置"+moduleIds[i]+"对应的配置")
            continue;
        }
        createFileByModuld(mod, info, varsDic);
    }
}

/**获取当前计算机名 */
function getHostName()
{
    
    let name = os.hostname();
    let buff = new Buffer(name, "binary");
    name = iconv.decode(buff, "gbk");
    return name;
}

/**根据module名字生成ModuleID  生成规则 moduleName原始字符中大写前加上_并把所有字符转成大写 */
function getModuleID(moduleName:string)
{
    let idkey:string = "";
    for(let i=0; i<moduleName.length; i++)
    {
        let char = moduleName[i].toLocaleUpperCase();
        if(char == moduleName[i])
        {
            if(idkey)
                idkey = idkey + "_";
        }
        idkey += char;
    }
    return idkey;
}

/**根据eui的文件名找到对应处理的CreateInfo 如果没有找到则用配置中默认的 */
function findModule(config:AppConfig, fileName:string)
{
    let creates = config.create;
    for(let i=0; i<creates.length; i++)
    {
        let create = creates[i];
        var keys = create.keyword.split("|");
        for(let j=0; j<keys.length; j++)
        {
            if(fileName.indexOf(keys[j]) != -1)
            {
                return create;
            }
        }
    }
    return config.create[config.defaultcreate];
}
/**根据keyword 获取AppConfig中create的配置  返回CreateInfo*/
function getCreateByName(config:AppConfig, keyword:string):CreateInfo
{
    let creates = config.create;
    for(let i=0; i<creates.length; i++)
    {
        let create = creates[i];
        if(create.keyword == keyword)return create;
    }
    return null;
}


/**根据ModuleInfo 生成对应的文件 */
function createFileByModuld(modinfo:ModuleInfo, info:EUIInfo, varsDic:Object)
{
    // var outpath = path.join(rootpath,moduleCodePath+info.parentDir+"/"+modinfo.outdir+"/"+varsDic["shortName"]+modinfo.name+"."+modinfo.fileType);
    let keyReg = /\[(.*?)\]/gi;
    let keyArr = keyReg.exec(modinfo.outdir);
    let outpath;
    ////***兼容老的目录结构 */
    let outDirPath = path.join(rootpath,moduleCodePath+info.parentDir+"/"+modinfo.outdir);
    let oldPath = path.join(outDirPath, "view")
    if(fs.existsSync(oldPath))
    {
        outpath = path.join(oldPath, varsDic["shortName"]+modinfo.name+"."+modinfo.fileType);
    }else{
        outpath = path.join(outDirPath, varsDic["shortName"]+modinfo.name+"."+modinfo.fileType);
    }
    ///////end
    if(keyArr)
    {
        let outdir = modinfo.outdir.replace(keyArr[0], keyArr[1]).trim();
        outdir = outdir.replace("$floder", info.parentDir)
        outpath = path.join(rootpath, outdir, varsDic["shortName"]+modinfo.name+"."+modinfo.fileType);
    }
    
    let exists = fs.existsSync(outpath);
    if(!modinfo.override && exists)
    {
        // utils.log("文件已存在不用生成")
        console.log("文件已存在不用生成");
        return;
    }
    if(modinfo.checkfloder)
    {
        let outpathinfo = path.parse(outpath);
        if(fs.existsSync(outpathinfo.dir))
        {
             console.log("文件夹已存在不用生成");
            return;
        }
    }
    let areaDic={};

    if(exists)//如果存在保护域则先记录保护域的内容
    {
        let reg = /\/\*+area(\d+)--start\*+\/([\s\S]*)\/\*+area\1--end\*+\//gi;
        let oldContent = fs.readFileSync(outpath, 'utf-8');
        let rect;
        while(rect= reg.exec(oldContent))
        {
            areaDic[rect[1]] = rect[2];
        }
    }
    var viewcode = createCodeTxt(path.join(modulepath, modinfo.file), info, varsDic);
    if(exists)//将保护域的内容在重新放到生成的文件中
    {
        for(let key in areaDic)
        {
            let reg = new RegExp("(\\/\\*+area"+key+"--start\\*+\\/)([\\s\\S]*)(\\/\\*+area"+key+"--end\\*+\\/)", "gi");
            viewcode = viewcode.replace(reg, "$1"+areaDic[key]+"$3");
        }
    }
	saveFile(outpath, viewcode);
    utils.log("创建成功"+outpath)
}

/**保存文件， 如果文件夹不存在则会创建文件夹 */
function saveFile(path:string, data:string)
{
	checkOrCreateDir(path);
    fs.writeFileSync(path, data, "utf-8");
}

/**生成模板替换后的文本*/
function createCodeTxt(moduleFilePath:string, info:EUIInfo, varDic:any){	
	if(!fs.existsSync(moduleFilePath))
	{
		utils.log("当前文件不存在"+moduleFilePath)
		return;
	}
    let content = fs.readFileSync(moduleFilePath, 'utf-8');
    var keyReg = /\$\{(.*?)\}/gi;
    let keyArr;
    while(keyArr = keyReg.exec(content))
    {
        content = content.split(keyArr[0]).join(varDic[keyArr[1]]); 
    }
    return content;
}


/**创建新的文件夹 */
function checkOrCreateDir(filePath)
{
    filePath = path.normalize(filePath);
    let arr = path.parse(filePath).dir.split(path.sep);
    if(!arr || arr.length == 0)return;
    let dirpath = arr[0];
    for(let i=1; i<arr.length; i++)
    {
        dirpath = dirpath + path.sep+arr[i];
        if(!fs.existsSync(dirpath))
        {
            fs.mkdirSync(dirpath);
        }
    }
}