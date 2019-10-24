
// var exec = require('child_process').spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
//     stdio: 'inherit',
//     cwd: "C:\\Windows\\System32"
// });
// var exec = child_process.exec;
var exec = require("child_process").exec;
var path = require("path")
var fs = require("fs")
var os = require("os")
var iconv = require("iconv-lite")
var encoding = require("encoding")

//变量
var rootpath = "D:/client2/trunk/yscq";
var publishpath = "D:/publish/cqll/yscq";
var binpath = "bin-release/web/";
var curbinpath = "";
var svnnum = 0;//版本号是显示项目代码的还是提交的？
var svnpath = path.join(__dirname, "./tools/svn")
var msvcrpath = path.join(__dirname, "./tools/msvcr")
var userip = "127.0.0.1";
var isrun = false;
// var outFileName = ["theme.js", "main.min.js", "configSetting.js"]
// var ignoreFileName = ["index.html", "gameEui.json"]
// var svnIngnoreCommitFile = ["config.zzp"]
var projectData;


/**开始更新发布的svn目录及代码 */
function doSvnUpdate(runNext)
{
    log("开始更新发布项目代码")
    if(!projectData)
    {
        isrun = false;
        log("更新失败, 没有项目数据")
        return;
    }
    cmdOper("svn update "+publishpath, function(stdout){
        let cofReg = /C\s+(.*?)\s*[\r\n]/g;
        let cofArr = cofReg.exec(stdout);
        if(cofArr)//冲突处理
        {
            log("检测到有冲突文件");
            while(cofArr)
            {
                log("<font color='#ff0000'>冲突文件： "+cofArr[1]+"</font>");
                cofArr = cofReg.exec(stdout);
            }
            isrun = false;
            log("<font color='#ff0000'>更新失败，Publish有冲突文件</font>");
            msgAlert("<font color='#ff0000'>更新失败，Publish有冲突文件</font>");
            return;
        }
        cmdOper("svn update "+rootpath, function(stdout){
            let svnReg = /\s+revision\s+(\d+)\./gi;
            let cofReg = /C\s+(.*?)\s*[\r\n]/g;
            let cofArr = cofReg.exec(stdout);
            if(cofArr)//冲突处理
            {
                /**
                    C    D:\client2\newCode\yscq_test\resource\assets\module\main\MainTopSkin.exml
                    Updated to revision 42163.
                    Summary of conflicts:
                    Text conflicts: 1
                 */
                log("检测到有冲突文件");
                while(cofArr)
                {
                    log("<font color='#ff0000'>冲突文件： "+cofArr[1]+"</font>");
                    cofArr = cofReg.exec(stdout);
                }
                isrun = false;
                log("<font color='#ff0000'>更新失败，有冲突文件</font>");
                msgAlert("<font color='#ff0000'>更新失败，有冲突文件</font>");
                return;
            }
            let svnArr = svnReg.exec(stdout);
            if(svnArr)
            {
                svnnum = svnArr[1];
            }else{
                svnnum = 0;
            }
            log("当前代码svn版本号：<font color='#0000ff'>"+svnnum+"</font>");
            //开始打包
            if(runNext)
            {
                doPublish(runNext);
            }else{
                isrun = false;
                msgAlert("版本更新完毕svn版本号：<font color='#0000ff'>"+svnnum+"</font>")
            }
                
        }, "更新项目代码")
    },
    "更新publish",
    undefined,
    function(errMsg){
        log("svn执行错误，请检查目录是否正确，或者尝试<a onclick='repaireSvn()' href='javascript:void(0);'>打开修复svn文件夹</a>")
    })
}

/**开始编译代码 */
function doPublish(runNext)
{
    cmdOper("egret publish "+rootpath, function(stdout){
        doCopy(runNext);
    }, "编译项目", rootpath)
}

/**开始拷贝文件到发布目录 */
function doCopy(runNext)
{
    log("开始拷贝")
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
        isrun = false;
        log("拷贝失败")
        msgAlert("拷贝失败");
        return;
    }
    
    log("开始拷贝"+lastUrl+" -> "+publishpath)
    curbinpath = lastUrl;
    let bininfo = path.parse(curbinpath);
    log("当前版本：<font color='#0000ff'>"+bininfo.name+"</font>");
    let respath = path.join(publishpath, "resource");
    if(fs.existsSync(respath))
        rmdirSync(respath);//删掉之前的资源
    let jspath = path.join(publishpath, "js");//小程序中的js文件夹
    if(fs.existsSync(jspath))
        rmdirSync(jspath);//删掉之前js的资源
    walkDir(curbinpath, hanldeFile, null, null);
    log("拷贝完成");
    if(runNext)
    {
        doSvnCommit();
    }else{
        isrun = false;
        msgAlert("项目代码编译拷贝完毕当前版本：<font color='#0000ff'>"+bininfo.name+"</font>")
    }
}

/**处理拷贝文件 */
function hanldeFile(url)
{
    let info = path.parse(url);
    let fname = info.name+info.ext;
    if(projectData.ignoreFileName.indexOf(fname) != -1)return;
    let outurl;
    if(projectData.outFileName.indexOf(fname)!=-1)
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
        // let addReg = /\?\s+(.*?)\s*[\r\n]/g;
        // let modReg = /[MA]\s+(.*?)\s*[\r\n]/g;
        // let remReg = /[\!D]\s+(.*?)\s*[\r\n]/g;
        let changeReg = /([\S])\s+(.*?)\s*[\r\n]/g;
        let addFiles = [];
        let modFiles = [];
        let remFiles = [];
        let confiltFiles = [];
        let allFiles = [];
        let allFilesDic = {};
        let tempArr;
        while(tempArr = changeReg.exec(stdout))
        {
            let finfo = path.parse(tempArr[2]);
            let fname = finfo.name + finfo.ext;
            if(projectData.svnIngnoreCommitFile.indexOf(fname) != -1)//config.zzp 不提交 由策划负责
            {
                continue;
            }
            allFilesDic[tempArr[2]] = {key:tempArr[1].trim(), path:tempArr[2]}
        }
        for(let key in allFilesDic)
        {
            let info = allFilesDic[key];
            if(info.key == "?")
                addFiles.push(key);
            else if(info.key == "M" || info.key == "A")
                modFiles.push(key);
            else if(info.key == "!" || info.key == "D")    
                remFiles.push(key);
            else if(info.key == "C")
                confiltFiles.push(key)
            else
                log("没有找到对应的处理方法： "+info.key + "  "+info.path)
            allFiles.push(key);
        }
        if(confiltFiles.length>0)
        {
            for(let i=9; i<confiltFiles.length; i++)
            {
                log("<font color='#ff0000'>"+confiltFiles[i]+"</font>");
            }
            isrun = false;
            log("<font color='#ff0000'>发布失败，有冲突文件</font>");
            msgAlert("<font color='#ff0000'>发布失败，有冲突文件</font>");
            return;
        }
        // for(let key in allFiles)
        // {
        //     let info = allFiles[key];
        //     if(info.key == "?")
        //         addFiles.push(tempArr[1]);
        // }
        // for(let key in allFiles)
        // {
        //     let info = allFiles[key];
        //     if(info.key == "M" || info.key == "A")
        //         modFiles.push(tempArr[1]);
        // }
        // for(let key in allFiles)
        // {
        //     let info = allFiles[key];
        //     if(info.key == "!" || info.key == "D")
        //         remFiles.push(tempArr[1]);
        // }
        // while(tempArr = modReg.exec(stdout))
        // {
        //     let finfo = path.parse(tempArr[1]);
        //     let fname = finfo.name + finfo.ext;
        //     if(projectData.svnIngnoreCommitFile.indexOf(fname) != -1)//config.zzp 不提交 由策划负责
        //     {
        //         continue;
        //     }
        //     modFiles.push(tempArr[1]);
        //     allFiles.push(tempArr[1]);
        // }
        // while(tempArr = remReg.exec(stdout))
        // {
        //     remFiles.push(tempArr[1]);
        //     allFiles.push(tempArr[1]);
        // }
        if(addFiles.length > 0)
        {
            cmdOper("svn add "+addFiles.join(" "), (stdout)=>{
                addFiles.length = 0;
                if(remFiles.length > 0)
                {
                    cmdOper("svn delete "+remFiles.join(" "), (stdout)=>{
                        remFiles.length = 0;
                        doComit();
                    }, "svn删除文件");
                }
                doComit();
            }, "svn添加文件");
        }else if(remFiles.length > 0)
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
                msgAlert("发布结束");
                return;
            }
            if(addFiles.length==0 && remFiles.length == 0)
            {
                cmdOper("svn commit "+allFiles.join(" ") +" -m \"更新 by:"+userip+"\"", (stdout)=>{
                    log("发布完成")
                    msgAlert("发布完成");
                    isrun = false;
                }, "svn提交文件");
            }
        }

    }, "获取svn文件状态");
}
var encoding = 'cp936';
var binaryEncoding = 'binary';
/**
 * cmd 操作
 * @param {*} cmd   命令行语句
 * @param {*} finish 命令行完成后执行的方法 function(stdout){}
 * @param {*} des       命令行描述， 日志输出时用到
 * @param {*} path      命令行所在路径， 如果为空则使用tools/svn路径
 */
function cmdOper(cmd, finish, des, path, errFun)
{
    des = des||"";
    path = path || svnpath;
    log("执行"+des);
    log(cmd);
    exec(cmd, {cwd:path}, function(err, stdout, stderr){
        // console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
        // stdout = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
        // stderr = iconv.decode(new Buffer(stderr, binaryEncoding), encoding);
        // if(stdout)
        // {
        //     let a  = iconv.encode(stdout, 'gb2312');
        //     let c = iconv.decode(Buffer.from(stdout), "cp936")
        //     let b = encoding.convert(stdout, 'gbk')
        // }
        if(err)
        {
            log(err.message);
            if(errFun)errFun(err.message);
            log("<font color='#ff0000'>"+des+"命令错误</font>")
            isrun = false;
            log("<font color='#ff0000'>发布失败，发布结束</font>")
            msgAlert("发布失败，发布结束");
        }else if(stderr){
            
            if(stderr.indexOf("Buffer() is deprecated due")!=-1)//不知道什么原因突然出现这个错误，先暂时处理下， 不影响功能
            {
                
                log("忽略错误： "+stderr)
                log(stdout);
                log(des+"完成");
                finish(stdout);
                return;
            }
            log(stderr)
            if(errFun)errFun(stderr);
            log("<font color='#ff0000'>"+des+"错误：</font>");
            isrun = false;
            log("<font color='#ff0000'>发布失败，发布结束</font>")
            msgAlert("发布失败，发布结束");
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
function msgAlert(msg){
    msgAlertFun(msg);
}
/**日志的外部调用函数 logFun(msg)*/
var logFun;
var msgAlertFun;
/**从外部设置日志的调用方法 */
function setLogFun(fun)
{
    logFun = fun;
}
function setAlertFun(fun)
{
    msgAlertFun = fun;
}
/**当前程序是否正在发布版本状态 */
function isRun(){
    return isrun;
}

/**修复svn */
function repaireSvn()
{
    let batpath;
    if(os.arch() == "x64")
    {
        batpath = path.join(msvcrpath,"64位系统请右键管理员运行.bat")
    }else{
        batpath = path.join(msvcrpath,"32位系统请右键管理员运行.bat")
    }
    // fs.copyFileSync(dllpath, "C:/Windows/System32");
    cmdOper("explorer /select,"+batpath, undefined, "打开修复svn文件夹")
    // cmdOper("explorer "+msvcrpath, undefined, "修复svn问题")
}

/**发布入口函数 */
function run(config, data)
{
    if(data.oper != "publish")
    {
        log("操作错误，不能发布"+data.oper);
        msgAlert("操作错误，不能发布"+data.oper);
        return;
    }
    projectData = data.data;
    if(!projectData)
    {
        log("没有数据，请重新选择项目");
        msgAlert("没有数据，请重新选择项目");
        return;
    }
    let codepath =  config.project[projectData.id].codepath;
    let pubpath = config.project[projectData.id].pubpath;
    if(!codepath)
    {
        log("<font color='#ff0000'>当前代码路径为空</font>")
        return;
    }
    if(!pubpath)
    {
        log("<font color='#ff0000'>当前发布路径为空</font>")
        return;
    }
    if(isrun)
    {
        log("<font color='#ff0000'>当前正在编译中...."+ip+"</font>");
        return false;
    }
    rootpath = codepath;
    publishpath = pubpath;
    // outFileName = data.outFileName;
    // ignoreFileName = data.ignoreFileName;
    // svnIngnoreCommitFile = data.svnIngnoreCommitFile;
    log("发布【"+projectData.name+"】版本")
    // if(type == "inner_mingame")//小游戏
    // {
    //     outFileName = []
    //     ignoreFileName = ["index.html"]
    //     svnIngnoreCommitFile = ["config_ios.bin", "config.bin"]
    //     log("发布【小程序】版本")
    // }else if(type == "inner_game"){//inner_game
    //     outFileName = ["theme.js", "main.min.js", "configSetting.js"]
    //     ignoreFileName = ["index.html", "gameEui.json"]
    //     svnIngnoreCommitFile = ["config.zzp"]
    //     log("发布【国内】版本")
    // }
    
    userip = config.user;
    isrun = true;
    let step = data.step;//step 0 一键发布   1更新  2编译   3提交svn
    if(step == 1)// 1更新
    {
        doSvnUpdate(false);
    }else if(step == 2){// 2编译
        doPublish(false);
    }else if(step == 3){//3提交svn
        doSvnCommit(false);
    }else{//默认一键发布
        doSvnUpdate(true);
    }
    return true;
}

module.exports = {
    log,
    run,
    setLogFun,
    isRun,
    repaireSvn,
    setAlertFun,
}


//测试流程
// doSvnUpdate();
