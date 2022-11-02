
var path = require("path");
var fs = require("fs");
var fsUtils = require("./fileUtils")
let workSpace = path.join(__dirname, "./../../");
let codeRootPath = path.join(workSpace, "src/")
let findImportReg = /import\s+\{?(.*?)\}?\s*from\s*/gi;


/**
 * 添加类的引用
 * @param {*} url   要添加文件的地址
 * @param {*} addClassNames     要添加的类
 * @param {*} sourceClassPath     要添加文件的来源，如果为空则默认从code中找
 */
function addImport(url, addClassNames, sourceClassPath){
    let codePathDic = {};//[fileName]=url
    sourceClassPath = sourceClassPath || codeRootPath;//没有没有设置
    fsUtils.walkDir(sourceClassPath, (url)=>{
        if(path.extname(url) != ".ts")return;
        let fileName = path.basename(url).replace(".d.ts", "").replace(".ts", "")
        codePathDic[fileName] = url;
    });
    let fileContent = "";
    if(fs.existsSync(url))
        fileContent = fs.readFileSync(url, "utf-8");
    let arr;
    let hasImportDic = {};//已经导入的类
    while(arr = findImportReg.exec(fileContent)){
        let importItem = arr[1].split(",")
        for(let i=0; i<importItem.length; i++){
            hasImportDic[importItem[i].trim()] = true;
        }
    }
    let importStr = "";
    for(let i=0; i<addClassNames.length; i++){
        let clsName = addClassNames[i];
        if(!hasImportDic[clsName] && codePathDic[clsName]){
            hasImportDic[clsName] = true;
            importStr += `import { ${clsName} } from "${path.relative(path.dirname(url), codePathDic[clsName]).replace(/\\/gi, "/").replace(/\.ts$/, "")}";\n`
        }
    }
    console.log("导入： "+importStr)
    
    if(importStr){
        let importPositionReg = /\s*import\s+.*?[\r\n]/gi;
        let lastIndex = -1;
        while(importPositionReg.exec(fileContent)){lastIndex = importPositionReg.lastIndex;};
        if(lastIndex>0){
            fileContent = fileContent.substring(0, lastIndex)+""+importStr+""+fileContent.substring(lastIndex);
        }else{
            fileContent = importStr + fileContent;
        }
     }
    fs.writeFileSync(url, fileContent, "utf-8")

}


module.exports = {addImport}