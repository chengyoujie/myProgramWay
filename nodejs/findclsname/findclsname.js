var fs = require("fs")
var path = require("path");
//类名的前缀  不能使用_$因为在exml中domParse会报错
const CLASS_PRIX = "CH"

//项目根目录
var root = path.join("D:/client/newCode/yscq_test", "");
//子包路径  可以为空
var subpath = path.join(root, "pltSubPackMoudle");
//输出路径
var outpath = path.join("D:/client/yscq_test", "");

//当前nodejs代码的路径
var curpath = __dirname;

//项目的代码路径
var srcpath = path.join(root, "src");
//项目的exml路径
var uipath = path.join(root, "resource/assets/module");
//需要过滤的类
var filterClsNames = getFileArr(path.join(curpath, "resource/filterclsname.txt"));
//需要过滤的文件
var filterFiles = getFileArr(path.join(curpath, "resource/filterfile.txt"));

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
let cls2MixDic = {};
//混淆名字对应的字典 [混淆后名字] = 类名
let mix2ClsDic = {};
//已经读取的文件信息记录
let lastfileinfo = {};

//=========开始执行混淆操作
//读取本地存取的名对应的
fullDicByFile(path.join(curpath, "resource/dicclsname.txt"), cls2MixDic);
fullDicByFile(path.join(curpath, "resource/fileinfo.txt"), lastfileinfo);
//调用search file 把要处理混淆的文件先存起来
searchFile(srcpath, getClsName);

// //把存起来的文件进行混淆
// doMixName();
// //试下单个文件
// getFileContent(path.join(root, "libs/cross-sdk/"))
// doMixName();
// return;
if(subpath)
    searchFile(subpath, getClsName);
    
//把存起来的文件进行混淆
doMixName();

if(uipath)
    searchFile(uipath, replaceUiName);

//把存起来的文件进行混淆
doMixName();

fs.writeFileSync(path.join(curpath, "resource/dicclsname.txt"), getStrByDic(cls2MixDic))
fs.writeFileSync(path.join(curpath, "resource/fileinfo.txt"), getStrByDic(lastfileinfo));
replaceClsName(path.join(root, "resource\\config\\netParam.json"), "json")

// searchFile(srcpath, replaceClsName)
// if(subpath)
//     searchFile(subpath, replaceClsName)
// replaceClsName("D:\\workspace\\yscq\\packet\\packet.xml", "xml")//packet 先不做处理， 混淆后不要重新生成协议就行，已经把netParam修改了
//把存起来的文件进行混淆
// doMixName();
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
            if(filterFiles.indexOf(file.name) != -1)//对于忽略的文件不进行处理 仅仅拷贝过去
            {
                let topath = childfpath.replace(root, outpath);
                checkOrCreateDir(topath); 
                fs.copyFileSync(childfpath, topath);
                continue;
            }
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
    {
        totalCount ++;
        cacheReadFile[filepath] = fs.readFileSync(filepath, "utf-8");
    }
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
        if(cls2MixDic[clsName])continue;
        if(filterClsNames.indexOf(clsName)==-1)
        {
            let mixName = getMixName();
            cls2MixDic[clsName] = mixName;
            mix2ClsDic[mixName] = clsName;
            console.log(clsName+" -> "+mixName)
        }
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
    rect = CLASS_PRIX+rect;
    if(mix2ClsDic[rect])//如果已经生成过的不在生成
    {
        return getMixName();
    }
    return rect;
}

function replaceClsName(filepath, filtertype = "ts")
{
    let content = getFileContent(filepath, filtertype);
    // if(!content)return;
    // let savepath = filepath.replace(root, outpath);
    // for(let key in cls2MixDic)
    // {
    //     // let reg = new RegExp("[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]("+key+")[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]", "g")
    //     let reg = new RegExp("[\\W]("+key+")[\\W]", "g")
    //     content = replace(reg, content, key);//content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), cls2MixDic[key]);})
    // }
    // checkOrCreateDir(savepath);
    // fs.writeFileSync(savepath, content);
    // dealCount++;
    // console.log(dealCount+"/"+totalCount+" 保存——>"+savepath)
}
function replaceUiName(filepath)
{
    let content = getFileContent(filepath, "exml");
    // if(!content)return;
    // let savepath = filepath.replace(root, outpath);
    // for(let key in cls2MixDic)
    // {
    //     // let reg = new RegExp("[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]("+key+")[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]", "g")
    //     let reg = new RegExp("[\\W]("+key+")[\\W]", "g")
    //     content = replace(reg, content, key);//content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), cls2MixDic[key]);})
    // }
    // checkOrCreateDir(savepath);
    // fs.writeFileSync(savepath, content);
    // dealCount++;
    // console.log(dealCount+"/"+totalCount+" 保存——>"+savepath)
}

function doMixName()
{
    for(let fpath in cacheReadFile)
    {
        //标记这个文件修改的文件已经处理过了， 如果下次判断修改时间没变则不进行处理
        let info = lastfileinfo[fpath];
        let timems = fs.statSync(fpath).mtimeMs;//暂时先用上次修改时间做比较
        if(~info && +info==timems)
            continue;
        let content = cacheReadFile[fpath];
        let savepath = fpath.replace(root, outpath);
        if(content)
        {
            for(let key in cls2MixDic)
            {
                // let reg = new RegExp("[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]("+key+")[\\s:;\\(\\)=<>\\.\\{\\}\'\"\`\\[\\],-\\|/\\*\\+\\-\\!\\~]", "g")
                let reg = new RegExp("[\\W]("+key+")[\\W]", "g")
                content = replace(reg, content, key);//content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), cls2MixDic[key]);})
            }
        }
        checkOrCreateDir(savepath);
        fs.writeFileSync(savepath, content);
        dealCount++;
        console.log(dealCount+"/"+totalCount+" 保存——>"+savepath);
        lastfileinfo[fpath] = timems;
        delete cacheReadFile[fpath];//去掉保留的内存
    }
}

function replace(reg, content, key)
{
    // content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), cls2MixDic[key]);})
    let arr;
    while(arr = reg.exec(content))
    {
        // content.replace(reg, (...args)=>{return args[0].replace(new RegExp(key, "g"), cls2MixDic[key]);})
        content = content.replace(arr[0], arr[0].replace(new RegExp(key, "g"), cls2MixDic[key]))
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
        rect.push(lines[i].trim())
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
