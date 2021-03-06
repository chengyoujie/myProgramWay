var fs = require("fs")
var path = require("path");
//项目根目录
var root = path.normalize("D:/wxgame/code/nslm");
var saveroot = path.normalize("D:/wxgame/code/mixgame");
var subpath = "D:/client/newCode/yscq_test/pltSubPackMoudle";
var curpath = __dirname;

//项目的代码路径
var srcpath = path.join(root, "src");
//项目的exml路径
var uipath = path.join(root, "resource/skin");
//需要过滤的类
let filterClsNames = getFileArr(path.join(curpath, "resource/filterclsname.txt"));
//类名对应混淆后的类
var clsDic = {}
//读取文件后的缓存
var cacheReadFile = {};
//混淆名字的字符数组a-z A-Z 0-9
var mixNames;
//当前混淆的索引
var curIndex = 0;
//总的文件个数
var totalCount = 0;
//已经处理的文件个数
var dealCount = 0;
//混淆名字对应的字典  [类名]=混淆后名字
let mixdic = {};
//混淆名字对应的字典 [混淆后名字] = 类名
let mix2clsdic = {};
//已经读取的文件信息记录
let lastfileinfo = {};

var useCls = {};

//=========开始执行混淆操作
//读取本地存取的名对应的
fullDicByFile(path.join(curpath, "resource/dicclsname.txt"), mixdic);
fullDicByFile(path.join(curpath, "resource/fileinfo.txt"), lastfileinfo)
searchFile(srcpath, getClsName);
searchFile(srcpath, getClsName);
fs.writeFileSync(path.join(curpath, "resource/dicclsname.txt"), getStrByDic(mixdic))
searchFile(srcpath, replaceClsName)
searchFile(uipath, replaceUiName)
replaceClsName(path.join(root, "resource\\config\\netParam.json"), "json")
// replaceClsName("D:\\workspace\\yscq\\packet\\packet.xml", "xml")//packet 先不做处理， 混淆后不要重新生成协议就行，已经把netParam修改了
fs.writeFileSync(path.join(curpath, "resource/fileinfo.txt"), getStrByDic(lastfileinfo));
console.log("替换完毕")


function searchFile(dir, dealFile)
{
    let dirs = fs.readdirSync(dir, {withFileTypes:true});
    if(!dirs || dirs.length  == 0 )return;
    let file;
    for(let i=0; i<dirs.length; i++)
    {
        file = dirs[i]
        let childfpath = path.join(dir, file.name);
        if(file.isDirectory())
        {
            searchFile(childfpath, dealFile);
        }else{
            let info = lastfileinfo[childfpath];
            let timems = fs.statSync(childfpath).mtimeMs;//先用上次修改时间做比较差异后续可以考虑使用crc32
            // if(~info && +info==timems)//临时注释掉记录上次改变时间判断，所有的脚本都执行
            //     continue;
            lastfileinfo[childfpath] = timems;
            dealFile(childfpath);
        }
    }
}

function getFileContent(filepath, findtype)
{
    let pinfo = path.parse(filepath);
    if(findtype)
    {
        if(pinfo.ext != "."+findtype)return;
    }
    if(!cacheReadFile[filepath])
        cacheReadFile[filepath] = fs.readFileSync(filepath, "utf-8");
    return cacheReadFile[filepath];
}

function getClsName(filepath)
{
    let content = getFileContent(filepath, "ts");
    if(!content)return;
    // let clsReg = /(?:export\s+)?class\s+(\w+)(?:\s+.*?)?\s*\{/gi;
    let clsReg = /(?:export\s+)?(?:(?:class)|(?:interface)|(?:enum))+\s+(\w+)(?:\s+.*?)?\s*\{/gi;
    var clsArr;
    while(clsArr = clsReg.exec(content)){
        let clsName = clsArr[1].trim();
        useCls[clsName] = 0;
        if(filterClsNames.indexOf(clsName)==-1)
        {
            clsDic[clsName] = getMixName();
            mix2clsdic[clsDic[clsName]] = clsName;
            console.log(clsName+" -> "+clsDic[clsName])
        }
    }
    let extendsReg = /\s+extends\s(\w+)/gi;
    let extendsArr;
    while(extendsArr = extendsReg.exec(content))
    {
        if(_hasExtendsCls.indexOf(extendsArr[1]) !=-1)continue;
        _hasExtendsCls.push(extendsArr[1]);
    }

    totalCount ++;
}

function getPrivMixName()
{
    let size = 0;
    let minArrs;
    let minArrs2;
    return function(){
        if(!minArrs)
        {
            minArrs = [];
            minArrs2 = [];
            for(let i='a'.charCodeAt(); i<="z".charCodeAt(); i++)
            {
                let char = String.fromCharCode(i);
                if(char != 'x' && char != 'y')
                    minArrs.push(char);
                minArrs2.push(String.fromCharCode(i));
            }
            for(let i='A'.charCodeAt(); i<="Z".charCodeAt(); i++)
            {
                minArrs.push(String.fromCharCode(i));
                minArrs2.push(String.fromCharCode(i));
            }
            for(let i='1'.charCodeAt(); i<="3".charCodeAt(); i++)
            {
                minArrs2.push(String.fromCharCode(i));
            }
        }
        let index = size;
        let maxlen = minArrs2.length;
        let rect = minArrs[index%minArrs.length];
        index = ~~(index/maxlen);
        while(index != 0)
        {
            rect = minArrs[index % maxlen] + rect;
            index = ~~(index/maxlen);
        }
        size++;
        rect = ""+rect;
        return rect;
    }
}

function getMixName()
{
    if(!mixNames)
    {
        mixNames = [];
        for(let i='a'.charCodeAt(); i<="z".charCodeAt(); i++)
        {
            mixNames.push(String.fromCharCode(i));
        }
        for(let i='A'.charCodeAt(); i<="Z".charCodeAt(); i++)
        {
            mixNames.push(String.fromCharCode(i));
        }
        for(let i='1'.charCodeAt(); i<="3".charCodeAt(); i++)
        {
            mixNames.push(String.fromCharCode(i));
        }
    }
    let rect = "";
    let maxlen = mixNames.length;
    let index = curIndex;
    do
    {
        rect = mixNames[index % maxlen] + rect;
        index = ~~(index/maxlen);
    } while(index != 0)
    curIndex++;
    rect = "A"+rect;
    //todo check has in dic
    if(mix2clsdic[rect])//如果已经生成过的不在生成
    {
        return getMixName();
    }
    return rect;
}

function replaceClsName(filepath, filtertype = "ts")
{
    let content = getFileContent(filepath, filtertype);
    if(!content)return;
    let savepath = saveroot + filepath.replace(root, "");
    for(let key in clsDic)
    {
        // let reg = new RegExp("[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]("+key+")[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]", "g")
        let reg = new RegExp("[\\W]("+key+")[\\W]", "g")
        content = replace(reg, content, key);//content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), clsDic[key]);})
    }
    let isExtends = false;
    for(let i=0; i<_hasExtendsCls.length; i++)
    {
        if(filepath.indexOf(_hasExtendsCls[i]) != -1)
        {
            isExtends = true;
            break;
        }
    }
    // if(!isExtends){
    //替换私有变量
        // let ingoreKey = ["static","const","get","set","createShape","readonly",,"updateBox" ,"checkRed", "doScreenShow","dispose"]
        // let prvReg = /private\s+(\w+)/gi;
        // let prveArr;
        // let minName = getPrivMixName();
        // let minDic  = {};
        // while(prveArr = prvReg.exec(content))
        // {
        //     let privar = prveArr[1].trim();
        //     if(ingoreKey.indexOf(privar)!=-1)continue;
        //     if(privar.indexOf("n_")==0)continue;
        //     let replaceVar = minName();
        //     minDic[privar] = replaceVar;
            
        // }
        // for(let key in minDic)
        // {
        //     let reg = new RegExp("[\\W]("+key+")[\\W]", "g")
        //     content = replace2(reg, content, key ,minDic[key]);
        // }    
    // }
    checkOrCreateDir(savepath);
    fs.writeFileSync(savepath, content);
    dealCount++;
    console.log(dealCount+"/"+totalCount+" 保存——>"+savepath)
}
function replaceUiName(filepath)
{
    let content = getFileContent(filepath, "exml");
    if(!content)return;
    let savepath = saveroot + filepath.replace(root, "");
    for(let key in clsDic)
    {
        // let reg = new RegExp("[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]("+key+")[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]", "g")
        let reg = new RegExp("[\\W]("+key+")[\\W]", "g")
        content = replace(reg, content, key);//content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), clsDic[key]);})
    }
    checkOrCreateDir(savepath);
    fs.writeFileSync(savepath, content);
    dealCount++;
    console.log(dealCount+"/"+totalCount+" 保存——>"+savepath)
}

function replace(reg, content, key)
{
    // content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), clsDic[key]);})
    let arr;
    while(arr = reg.exec(content))
    {
        // content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), clsDic[key]);})
        content = content.replace(arr[0], arr[0].replace(new RegExp(key, "g"), clsDic[key]))
        reg.lastIndex = 0;
    }
    return content;
}


function replace2(reg, content, key, replaceKey)
{
    // content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), clsDic[key]);})
    let arr;
    while(arr = reg.exec(content))
    {
        // content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), clsDic[key]);})
        content = content.replace(arr[0], arr[0].replace(new RegExp(key, "g"), replaceKey))
        reg.lastIndex = 0;
    }
    return content;
}

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



function fullDicByFile(path, dic)
{
    let content = fs.readFileSync(path, "utf-8");
    let lines = content.split("\n");
    for(let i=0; i<lines.length; i++)
    {
        let item = lines[i];
        if(!item)continue;
        let itemarr = item.split("=");
        if(itemarr.length<2)continue;
        dic[itemarr[0].trim()] = itemarr[1].trim();
    }
}

function getFileArr(path)
{
    let content = fs.readFileSync(path, "utf-8");
    let lines = content.split("\n");
    let rect = [];
    for(let i=0; i<lines.length; i++)
    {
        if(!lines[i])continue;
        rect.push(lines[i].replace(/\r/gi, ""))
    }
    return rect;
}

function getStrByDic(dic){
    let rect = "";
    if(!dic)return rect;
    for(let key in dic)
    {
        rect += key+"="+dic[key]+"\n";
    }
    return rect;
}
