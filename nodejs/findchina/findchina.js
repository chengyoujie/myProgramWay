var ts = require("typescript")
var fs = require("fs")
var path = require("path")

var url = "D:/workspace/trunk/nslm/src/game/module/plt/PhoneBindView.ts";
var lanObjUrl = "D:/workspace/trunk/nslm/lanObj.json";
var lanKeyDic = {};
var maxLanKey = 0;
var newAddArr;

replaceChina(url);

/**检索汉字*/
function replaceChina(url)
{
    let lanObjStr = fs.readFileSync(lanObjUrl, "utf-8");
    let lanKeyReg = /\"k_(\d+)\"\s*:\s*\"(.*?)\"(,?)/gi
    let arr;
    maxLanKey = 0;
    lanKeyDic = {};
    newAddArr = [];
    let endReg = /"(\s*\})$/gi;//最后一行
    while(arr = lanKeyReg.exec(lanObjStr))
    {
        let key = +arr[1];
        lanKeyDic[arr[2]] = key;
        if(key>maxLanKey)
        {
            maxLanKey = key;
        }
    }

    let program = ts.createProgram([url], { allowJs: true })
    let sourceFile = program.getSourceFile(url);
    ts.forEachChild(sourceFile, visitChina);

    if(newAddArr.length>0)
    {
        let newTxt = "";
        for(let i=0; i<newAddArr.length; i++)
        {
            let item = newAddArr[i];
            newTxt += `,\n\t"k_${item.key}": "${item.text}"`
            // if(newAddArr.length-1 != i)newTxt += ",";
        }
        if(endReg.test(lanObjStr))
        {
            lanObjStr = lanObjStr.replace(endReg, `${newTxt}$1`);
            // fs.writeFileSync(lanObjUrl, lanObjStr, "utf-8");
            
            // fs.writeFileSync(url, lanObjStr, "utf-8");
            console.log(`写入成功${newTxt}`);
           
            sourceFile.getText();
        }else{
            console.log("没有找到lanObj.json 的结束 }");
        }
    }else{
        console.log("没有要添加的汉字");
    }

    
}

function visitChina(node)
{
    if(node.kind == ts.SyntaxKind.StringLiteral)
    {
        let chinaReg = /[\u4e00-\u9fa5]/gi;
        if(chinaReg.exec(node.text))
        {
            let txt = node.text;
            if(lanKeyDic[txt])
            {
                node.text = "lanTxt.k_"+lanKeyDic[txt];
            }else{
                maxLanKey ++;
                lanKeyDic[txt] = maxLanKey;
                newAddArr.push({key:maxLanKey, text:txt})
                node.text = "lanTxt.k_"+lanKeyDic[txt];
            }
        }
    }
    ts.forEachChild(node, visitChina);
}