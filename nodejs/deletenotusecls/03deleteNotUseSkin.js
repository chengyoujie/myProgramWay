
var fs = require("fs")
var path = require("path");
//项目根目录
var root = path.normalize("D:/workspace/trunk/nslm");

//项目的代码路径
var srcpath = path.join(root, "src");
//项目的exml路径
var uipath = path.join(root, "resource/skin");

var clsDic = {};
//总的文件个数
var totalCount = 0;
//已经处理的文件个数
var dealCount = 0;
//单个url  ts文件内类的个数  删除时超过一个的要手动删除
let urlClsNum = {};

//读取本地存取的名对应的
searchFile(uipath, getSkinName);//查找 UI类名
searchFile(srcpath, findSkinNum)
searchFile(uipath, findUiClsNum)
let clsNums = [];
for(let key in clsDic)
{
    clsNums.push({cls:key, num:clsDic[key].num, url:clsDic[key].url});
}
clsNums.sort((a, b)=>{return a.num>b.num?1:-1})

let txt = "";
let html = "";
for(let i=0; i<clsNums.length; i++)
{
    txt += "类名： "+clsNums[i].cls+"  使用次数: "+clsNums[i].num+"\n";
    html += "<tr><td>"+(i+1)+"</td><td>"+clsNums[i].cls+"</td><td>"+clsNums[i].num+"</td></tr>\n";
}
html = `
<html>
    <table border="1px" cellspacing="10">
        <tr>
            <td>ID</td>
            <td>类名</td>
            <td>使用次数</td>
        </tr>
        ${html}
    </table>
</html>
`
//删除操作
console.log("--------------删除文件---------------")
let noticeStr = "";
for(let i=0; i<clsNums.length; i++)
{
    let itemInfo = clsNums[i];
    if(itemInfo.num <= 0)
    {
        if(urlClsNum[itemInfo.url]>1)
        {
            noticeStr += ":: 需要手动删除： "+itemInfo.cls+" 位于: "+itemInfo.url+"\n";
        }else{
            console.log("删除： "+itemInfo.url);
            if(fs.existsSync(itemInfo.url))
                fs.unlinkSync(itemInfo.url);
        }
    }
}


// console.log(path.join(__dirname, "Skin使用次数.txt"));
fs.writeFileSync(path.join(__dirname, "Skin使用次数.txt"), txt, "utf-8");
fs.writeFileSync(path.join(__dirname, "skinUseTime.html"), html, "utf-8");

console.log("--------------删除信息(个别需要手动处理)---------------")
console.log(noticeStr);
console.log("查找完毕")


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
            if(childfpath == 'D:\\workspace\\trunk\\nslm\\src\\declare')
                continue;
            searchFile(childfpath, dealFile);
        }else{
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
    return fs.readFileSync(filepath, "utf-8");
}

function getSkinName(filepath)
{
    let content = getFileContent(filepath, "exml");
    if(!content)return;
    content = removeComment(content);//去掉注释
    let clsNum = 0;
    let clsReg = /class\s*=\s*"(\w+)"/gi;
    var clsArr;
    while(clsArr = clsReg.exec(content)){
        let clsName = clsArr[1].trim();
        clsNum ++;
        clsDic[clsName] = {num:-1, url:filepath};
    }
    urlClsNum[filepath] = clsNum;
    totalCount++;
}
/*asdfasdf*/
//去掉注释类
function removeComment(content)
{
    if(!content)return "";
    content = content.replace(/\/\/[^\n\r]*[\n\r]/gi, "");
    content = content.replace(/\/\*(\s|.)*?\*\//gi, "")
    return content;
}


function findSkinNum(filepath, filtertype = "ts")
{
    let content = getFileContent(filepath, filtertype);
    if(!content)return;
    for(let key in clsDic)
    {
        let reg = new RegExp("[\\W]("+key+")[\\W]", "g");
        let arr;
        while(arr = reg.exec(content))
        {
            clsDic[key].num ++;
        }
    }
    dealCount++;
    console.log(dealCount+"/"+totalCount+" 检查Code ——>"+filepath)
}
function findUiClsNum(filepath)
{
    let content = getFileContent(filepath, "exml");
    if(!content)return;
    for(let key in clsDic)
    {
        let reg = new RegExp("[\\W]("+key+")[\\W]", "g")
        let arr;
        while(arr = reg.exec(content))
        {
            clsDic[key].num ++;
        }
    }
    dealCount++;
    console.log(dealCount+"/"+totalCount+" 查找Skin ——>"+filepath)
}
