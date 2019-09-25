var exec = require("child_process").exec;
var path = require("path")
var fs = require("fs")

//变量
var rootpath = "D:/client2/trunk/yscq";
var publishpath = "D:/publish/cqll/yscq";
var binpath = "bin-release/web/";
var curbinpath = "";
var svnnum = 0;//版本号是显示项目代码的还是提交的？
var svnpath = path.join(__dirname, "./tools/svn")
var userip = "127.0.0.1";
var isrun = false;
var outFileName = ["theme.js", "main.min.js", "configSetting.js"]
var ignoreFileName = ["index.html", "gameEui.json"]
// var svnIngnoreCommitFile = ["config.zzp"]

/**开始更新发布的svn目录及代码 */
function doSvnUpdate()
{
    log("开始更新发布项目代码")
    cmdOper("svn update "+publishpath, function(stdout){
        cmdOper("svn update "+rootpath, function(stdout){
            let svnReg = /\s+revision\s+(\d+)\./gi;
            let svnArr = svnReg.exec(stdout);
            if(svnArr)
            {
                svnnum = svnArr[1];
            }else{
                svnnum = 0;
            }
            log("当前代码svn版本号："+svnnum);
            //开始打包
            doPublish();
        }, "更新项目代码")
    },"更新publish")
}

/**开始编译代码 */
function doPublish()
{
    cmdOper("egret publish "+rootpath, function(stdout){
        doCopy();
    }, "编译项目", rootpath)
}

/**开始拷贝文件到发布目录 */
function doCopy()
{
    let allbinpath = path.join(rootpath, binpath);
    let binfiles = fs.readdirSync(allbinpath);
    let lastTime = 0;
    let lastUrl = "";
    binfiles.forEach((file)=>{
        var subUrl = path.join(allbinpath, file);
        var finfo = fs.statSync(subUrl);
        if(finfo.isDirectory())
        {
            if(finfo.mtimeMs > lastTime)
            {
                lastTime = finfo.mtimeMs;
                lastUrl = subUrl;
            }
        }
    })
    if(!lastUrl)
    {
        log("当前没有找到生成的文件");
        return;
    }
    curbinpath = lastUrl;
    let bininfo = path.parse(curbinpath);
    log("当前版本："+bininfo.name);
    let respath = path.join(publishpath, "resource");
    if(fs.existsSync(respath))
        rmdirSync(respath);//删掉之前的资源
    walkDir(curbinpath, hanldeFile, null, null);
    log("拷贝完成");
    doSvnCommit();
}

/**处理拷贝文件 */
function hanldeFile(url)
{
    let info = path.parse(url);
    let fname = info.name+info.ext;
    if(ignoreFileName.indexOf(fname) != -1)return;
    let outurl;
    if(outFileName.indexOf(fname)!=-1)
    {
        outurl = path.join(publishpath, fname);
        fs.copyFileSync(url, outurl);
    }else{
        outurl = getOutFileName(url);
        checkOrCreateDir(outurl);
        fs.copyFileSync(url, outurl);
    }
    // log("拷贝中... "+url+"->"+outurl);
}
/**获取从本地代码到发布目录的相对应文件路径 */
function getOutFileName(url){
    return path.join(publishpath, url.replace(path.normalize(curbinpath), ""))
}

/**开始提交到发布svn上 */
function doSvnCommit()
{
    // log("开始提交项目")
    cmdOper("svn stat "+publishpath, function(stdout){
        let addReg = /\?\s+(.*?)\s*[\r\n]/g;
        let modReg = /[MA]\s+(.*?)\s*[\r\n]/g;
        let remReg = /\!\s+(.*?)\s*[\r\n]/g;
        let addFiles = [];
        let modFiles = [];
        let remFiles = [];
        let allFiles = [];
        let tempArr;
        while(tempArr = addReg.exec(stdout))
        {
            addFiles.push(tempArr[1]);
            allFiles.push(tempArr[1]);
        }
        while(tempArr = modReg.exec(stdout))
        {
            if(tempArr[1].indexOf("config.zzp") != -1)//config.zzp 不提交 由策划负责
            {
                continue;
            }
            modFiles.push(tempArr[1]);
            allFiles.push(tempArr[1]);
        }
        while(tempArr = remReg.exec(stdout))
        {
            remFiles.push(tempArr[1]);
            allFiles.push(tempArr[1]);
        }
        if(addFiles.length > 0)
        {
            cmdOper("svn add "+addFiles.join(" "), (stdout)=>{
                addFiles.length = 0;
                doComit();
            }, "svn添加文件");
        }
        
        if(remFiles.length > 0)
        {
            cmdOper("svn delete "+remFiles.join(" "), (stdout)=>{
                remFiles.length = 0;
                doComit();
            }, "svn删除文件");
        }
        doComit();
        function doComit(){
            if(allFiles.length==0)
            {
                log("当前没有可提交的文件")
                isrun = false;
                log("发布结束");
                return;
            }
            if(addFiles.length==0 && remFiles.length == 0)
            {
                cmdOper("svn commit "+allFiles.join(" ") +" -m \"更新 by:"+userip+"\"", (stdout)=>{
                    log("发布完成")
                    isrun = false;
                }, "svn提交文件");
            }
        }

    }, "获取svn文件状态");
}

/**
 * cmd 操作
 * @param {*} cmd   命令行语句
 * @param {*} finish 命令行完成后执行的方法 function(stdout){}
 * @param {*} des       命令行描述， 日志输出时用到
 * @param {*} path      命令行所在路径， 如果为空则使用tools/svn路径
 */
function cmdOper(cmd, finish, des, path)
{
    path = path || svnpath;
    log("执行"+des);
    log(cmd);
    exec(cmd, {cwd:path}, function(err, stdout, stderr){
        if(err)
        {
            log(err.message);
            log(des+"命令错误")
            isrun = false;
            log("发布失败，发布结束")
        }else if(stderr){
            log(stderr)
            log(des+"错误：");
            isrun = false;
            log("发布失败，发布结束")
        }else{
            log(stdout);
            log(des+"完成");
            finish(stdout);
        }
    })
}


// function handleDir(url)
// {
//     let oururl = getOutFileName(url);
//     checkOrCreateDir(oururl);
// }

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

///////////////FileUtils.ts
function rmdirSync(url) {
    var files = [];
    if (fs.existsSync(url)) {
        files = fs.readdirSync(url);
        files.forEach(function(file, index) {
            var subUrl = path.join(url, file);
            if (fs.statSync(subUrl).isDirectory()) { // recurse
                rmdirSync(subUrl);
            } else { // delete file
                fs.unlinkSync(subUrl);
            }
        });
        fs.rmdirSync(url);
    }
}

function walkDir(url,onFile,onDir,thisObj) {
    url = path.normalize(url);
    var stats = fs.statSync(url);
    if (stats.isDirectory()) {
        if(onDir) onDir.call(thisObj,url);
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

/**统一日志方法 */
function log(msg){
    console.log(msg);
    if(logFun)
        logFun(msg+"\n");
}
/**日志的外部调用函数 logFun(msg)*/
var logFun;

/**从外部设置日志的调用方法 */
function setLogFun(fun)
{
    logFun = fun;
}
/**当前程序是否正在发布版本状态 */
function isRun(){
    return isrun;
}

/**发布入口函数 */
function run(ip)
{
    // doCopy();
    // return;
    if(isrun)
    {
        log("当前正在编译中...."+ip);
        return false;
    }
    userip = ip;
    isrun = true;
    doSvnUpdate();
    return true;
}

module.exports = {
    log,
    run,
    setLogFun,
    isRun,
}


//测试流程
// doSvnUpdate();
