var fs = require("fs");
var path = require("path");
var os = require("os");



/**项目的根路径 */
let workSpace = path.join(__dirname, "./../../");
/**lanObj.json的路径 */
let lanObjPath = path.join(workSpace, "lanObj.json");

let lanOutPath = path.join(workSpace, "laya/assets/mainRes/config/lanJson.json")
let lanBinOutPath = path.join(workSpace, "bin/mainRes/config/lanJson.json")

let lanDeclareTsPath = path.join(workSpace, "./src/declare/LanTxt.d.ts");

function run(){
    if(!fs.existsSync(lanObjPath)){
        console.error("没有找到： "+lanObjPath);
        return;
    }
    let lanObjStr = fs.readFileSync(lanObjPath, "utf-8")
    let lanObj = JSON.parse(lanObjStr);
    let hasDic = {};
    let lanOutObj = {}
    let findRepeat = false;
    let tsStr = "/**语言包 变量声明**/\nexport interface LanTxt{\n"
    for(let key in lanObj){
        let item = lanObj[key];
        if(hasDic[item]){
            console.warn("lanObj 中存在重复定义： "+key+":"+item);
            let reg = new RegExp("\\n\\s*([\"'])"+key+"\\1.*?\\n", "gi");
            // console.log(reg.source)
            lanObjStr = lanObjStr.replace(reg, "\n");
            // console.log(lanObjStr)
            findRepeat = true;
            continue;
        }
        hasDic[item] = true;
        lanOutObj[key] = item;
        tsStr += "\n\t/** "+item+" */\n\t"+key+":string;";
    }
    tsStr += "\n}";
    if(findRepeat){
        fs.writeFileSync(lanObjPath, lanObjStr, "utf-8")
    }
    fs.writeFileSync(lanDeclareTsPath, tsStr, "utf-8")
    let outJsonStr = JSON.stringify(lanOutObj);
    fs.writeFileSync(lanOutPath, outJsonStr, "utf-8")
    fs.writeFileSync(lanBinOutPath, outJsonStr, "utf-8")
    console.log("lanJson 生成完毕")
}

module.exports = {run}
