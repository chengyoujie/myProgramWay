var path = require("path");
var fs = require("fs");

/**项目的根路径 */
let workSpace = path.join(__dirname, "./../../");
let layaMainPath = path.join(workSpace, "src/ui/layaMaxUI.ts");

async function run(){
    let tsStr = fs.readFileSync(layaMainPath, "utf-8");
    tsStr = tsStr.replace(/Laya\.(\w*)BaseRender/g,'$1BaseRender').replace(/Laya\.(\w*)BaseView/g,'$1BaseView');
    fs.writeFileSync(layaMainPath, tsStr, "utf-8");
}
module.exports =  {run}