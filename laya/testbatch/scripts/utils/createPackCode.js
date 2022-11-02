
var path = require("path");
var fs = require("fs");
var fsUtils = require("./fileUtils")
var XMLParser = require("./xml/index")
var importUtils = require("./importUtils")


/**项目的根路径 */
let workSpace = path.join(__dirname, "./../../");
let netProtoDeclarePath = path.join(workSpace, "src/declare/generate")


function run(url, selectStart, selectEnd){
    let txt = fs.readFileSync(url, "utf-8");
    let selectTxt = txt.substring(selectStart, selectEnd);
    if(selectTxt)//有选中的文本
    {
        console.log(selectTxt);
        try{
            let codeStr = "";
            let xmlObj = XMLParser.parse("<root>"+selectTxt+"</root>");
            if(xmlObj.children)
            {
                let importCls = [];
                for(let i=0; i<xmlObj.children.length; i++)
                {
                    let item = xmlObj.children[i];
                    if(!item.attributes && item.attributes.name)continue;
                    let type = item.attributes.type;
                    if(type == 1)//服务器发送给客户端的
                    {
                        importCls.push("S_"+item.attributes.name)
                        codeStr += `\t/**${item.attributes.des}**/`
                        codeStr += `\n\tprivate n_${item.attributes.id}(vo: S_${item.attributes.name}): void {`;
                        codeStr += `\n\t\tlet s = this;`;
                        codeStr += `\n\t\t`;
                        codeStr += `\n\t}\n`;
                    }
                }
                console.log("文本："+codeStr);
                txt = txt.substring(0, selectStart)+codeStr+ txt.substring(selectEnd);   
                fs.writeFileSync(url, txt, "utf-8");
                importUtils.addImport(url, importCls, netProtoDeclarePath)
                console.log("xml替换为协议 转换成功");
            }
        }catch(e){
            console.log("当前选中的不是xml文本"+e.message);
        }
    }else{//没有选中的文本
        // require("../utils/checkChina").run(url);//检出汉字  
    }
        
}



module.exports =  {run}