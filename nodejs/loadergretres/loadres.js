var fs = require("fs")
var path = require("path")
var request = require("request");

var outdir = "D:/out/"
var url = "https://cdn.lzh5.253952.com/client/resource/default.res.json?t=2020-06-18103441"
var cdnurl = "https://cdn.lzh5.253952.com/client/resource/"

var jsonstr = fs.readFileSync("default.res.json");
var json = JSON.parse(jsonstr);
// console.log(json);
var resources = json.resources;
var resInfo = [];
for(let i=0; i<resources.length; i++)
{
    let childurl = resources[i].url.replace(/\?v\=.*?$/gi, "");
    let resurl = cdnurl + childurl;
    console.log(resurl);
    let filepath = path.join(outdir, childurl);
    checkOrCreateDir(filepath);
    resInfo.push({"url":encodeURI(resurl), "path":filepath});//需要encodeURI下有写含有中文导致报错
}

let len = resInfo.length;
//刚有报错从这个地方继续往下走
// resInfo.splice(0, 8828-6070)
doload()

function doload()
{
    if(resInfo.length==0)return;
    let info = resInfo.shift();
    try{
        let stream = fs.createWriteStream(info.path);
        request(info.url).pipe(stream).on("finish", function (err) {
            console.log(resInfo.length+"/"+len+" 文件[" + info.path + "]下载完毕");
            stream.end();
            if(resInfo.length>0)
                doload();
        });
    }catch(e){
        console.log("加载失败： "+resInfo.length+"/"+len+" URL[" + info.ur + "]")
        console.log(e);
    }
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