var fs = require("fs")
var path = require("path")




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
            // let topath = childfpath.replace(root, outpath);
            // checkOrCreateDir(topath); 
            // fs.copyFileSync(childfpath, topath);
            // continue;
            
            dealFile(childfpath);
        }
    }
}

var ui2skin = {};
var uiReg = /export\s+class\s+(\w+)UI\s+extends\s+(BaseRender|Component)/gi;
var skinReg = /this.skinName\s+=\s+'\w+'/gi;
var nameSpReg = /namespace chm/gi;
var modelReg = /export\s+class\s+(\w+)(View|Render)\s+extends\s+(\w+)UI/gi;
var notEuiClsReg = /export\s+class\s+\w+\s+(extends\s+(eui|egret|Component|GridBase|SkillBaseGroup)|\{)/gi;
var constrReg = /super\(\w*\)/gi;
var conReg = /constructor\s*\(.*\)\s*\{[^\}]*\}/gi;
var clsReg = /export\s+class\s+\w+[^\{]*\{/gi;
function handleModelFile(src)
{
    var file = fs.readFileSync(src, "utf-8");
    if(!file)return;
    var arr;
    modelReg.lastIndex = 0;
    constrReg.lastIndex = 0;
    notEuiClsReg.lastIndex = 0;
    arr = notEuiClsReg.exec(file);
    if(arr)
    {
        console.log("非Eui项目"+src);
        return;
    }

    arr = modelReg.exec(file);
    if(!arr)
    {
        console.log("没有找到对应的View类声明"+src);
        return;
    }
    
    var type = arr[2];
    
    file = file.replace(arr[0], "export class "+arr[1]+type+" extends "+(type=="View"?"Component":"BaseRender"));
    if(type == "View")
    {
        var skin  = ui2skin[arr[1]];
        if(!skin)
        {
            console.log("没有找到对应的皮肤信息"+src);
            return;
        }
        constrReg.lastIndex = 0;
        arr = constrReg.exec(file);
        if(!arr)
        {
            // console.log("没有找到对应的View类构造"+src);
            // return;
            //没有构造函数的加上构造
            clsReg.lastIndex = 0;
            arr = clsReg.exec(file);
            var constr = `
        constructor(opt?: ShowOptions) {
            super(opt);
            ${skin.skin};
        }
            `
            if(!arr)
            {
                console.log("没有找到对应的View类构造"+src);
                return;
            }
            file = file.replace(arr[0], arr[0]+constr)
        }else{
            file = file.replace(arr[0], arr[0]+";\n            "+skin.skin)
        }
    }
    fs.unlinkSync(src);
    src = src.replace("view"+path.sep, "")
    fs.writeFileSync(src, file);
    
}
function handleUIFile(src)
{
    var file = fs.readFileSync(src, "utf-8");
    var arr;
    uiReg.lastIndex = 0;
    skinReg.lastIndex = 0;
    conReg.lastIndex = 0;
    arr = uiReg.exec(file);
    file = file.replace(nameSpReg, "declare namespace chm")
    if(!arr)
    {
        console.log("没有找到对应的ui类声明"+src);
        return;
    }
    var uiName = arr[1];
    var isRender = arr[2]=="BaseRender";
    var extendType = arr[2];
    file = file.replace(uiReg, "export interface $1"+(extendType=="BaseRender"?"":"View"));
    if(!isRender)
    {
        arr = skinReg.exec(file);
        if(!arr)
        {
            console.log("没有找到对应的ui类"+src);
            return;
        }
        ui2skin[uiName] = {skin:arr[0], extendType:extendType};
    }
    file = file.replace(conReg, "");
    file = file.replace(/public\s+/gi, "");
    var finfo = path.parse(src);
    fs.writeFileSync(path.join(savePath, finfo.name+".d.ts"), file);
    fs.unlinkSync(src);
}

function checkOrCreateDir(filePath)
{
    filePath = path.normalize(filePath);
    let arr =filePath.split(path.sep);
    if(!arr || arr.length == 0)return;
    let dirpath = arr[0];
    for(let i=1; i<arr.length; i++)
    {
        if(!arr[i])continue;
        dirpath = dirpath + path.sep+arr[i];
        if(!fs.existsSync(dirpath))
        {
            fs.mkdirSync(dirpath);
        }
    }
}


// /**检查空的dir 如果是view的目录删掉（之前autocodeeui 生成的目录） */
// function dealDir(dir)
// {
//     let dirs = fs.readdirSync(dir, {withFileTypes:true});
//     if(!dirs || dirs.length  == 0 )return;
//     let file;
//     for(let i=0; i<dirs.length; i++)
//     {
//         file = dirs[i]
//         let childfpath = path.join(dir, file.name);
        
//         if(file.isDirectory())
//         {
//             let childInfo = path.parse(childfpath);
//             if(childInfo.name == "view"){
//                 let childdirs = fs.readdirSync(childfpath, {withFileTypes:true});
//                 if(!childdirs || childdirs.length==0)
//                     fs.rmdirSync(childfpath);
//                 else
//                     console.log("has child dir "+childfpath)
//             }else
//                 dealDir(childfpath);
//         }
//     }
// }
// dealDir("D:/workspace/trunk/nslm/src/game/module")
//end   检查空的dir 如果是view的目录删掉（之前autocodeeui 生成的目录）

// //添加;号
// searchFile("D:/workspace/trunk/nslm/src/game/module", handleModifyFile);

// function handleModifyFile(src){
//     var file = fs.readFileSync(src, "utf-8");
//     var skinReg = /\.skinName\s*=\s*.+/gi;
//     var arr = skinReg.exec(file);
//     if(arr)
//     {
//         if(arr[0].indexOf(";") == -1)
//         {
//             file = file.replace(arr[0], arr[0]+";");
//             console.log(src+" "+arr[0]+"添加了；")
//             fs.writeFileSync(src, file);
//         }
//     }
// }
// //end  添加;号

//ui改为.d.ts
var savePath = "D:/workspace/trunk/nslm/src/declare/ui";
checkOrCreateDir(savePath)
searchFile("D:/workspace/trunk/nslm/src/game/ui", handleUIFile);
searchFile("D:/workspace/trunk/nslm/src/game/module", handleModelFile);
console.log("end")
