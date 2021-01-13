// var ts = require("typescript");
var childprocess = require("child_process")
var ts;
var path = require("path");
var fs = require("fs");
var lanObjDic = {};
var lanTxt2Index = {};
var maxLanIndex = 0;
let lanObjPath = path.join("D:/workspace/trunk/nslm", "lanObj.json");
var fileUrl = path.join(__dirname, "test.ts");
var waitReplaceTxt = [];//需要替换的文本
var fileContent = "";

/**程序入口 */
function run(){
    console.log("获取本地npm 配置")
    childprocess.exec("npm config ls", (err, stdout, stderr)=>{
        let errstr = err ;
        if(errstr)
        {
           console.error("npm config ls 错误请检查是否安装了npm");
        }else{//根据npm config ls 获取nodejs 的配置信息获取全局安装路径找到typescript
            let prefixReg = /prefix\s*=\s*('|")(.*?)\1/gi;
            let prefixArr = prefixReg.exec(stdout);
            if(prefixArr){
                let prefix = prefixArr[2];
                ts = require(path.join(prefix, "node_modules/typescript"));
                if(!ts){
                    console.error("可能没有安装全局ts");
                    return;
                }
                console.log("开始成成代码")
                parserLanObj(lanObjPath);
                checkFile(fileUrl);
                saveLanObj(lanObjPath);
            }else{
                console.log("获取prefix失败"+stdout);
            }
        }	
    })
}

/**转换代码 */
const transformAST = function (context){
    return function searchNode(node){
        let factory = ts.factory||ts;//兼容老版本3.0
        let createPropertyAccessExpression = ts.factory?ts.factory.createPropertyAccessExpression:ts.createPropertyAccess;
        let createCallExpression = ts.factory?ts.factory.createCallExpression:ts.createCall;
        if(node.kind == ts.SyntaxKind.CallExpression)//方法调用
        {
            if(node.expression.kind == ts.SyntaxKind.PropertyAccessExpression && node.expression.expression.text == "console")//对于console.xxx的不予处理
            {
                return node;
            }else{
                return ts.visitEachChild(node, searchNode, context);
            }
        }else if(node.kind == ts.SyntaxKind.BinaryExpression)//表达式
        {
            if(node.operatorToken && node.operatorToken.kind == ts.SyntaxKind.PlusToken)//A+B形式的
            {
                let nodes = [];
                let findText = isStringExpression(node, nodes);//A+汉字+B的形式表达式  返回true表示有汉字， 返回false表示没有汉字，
                if(findText)
                {
                    let lanStr = "";
                    let params = [];
                    let paramStrs = [];
                    for(let i=0; i<nodes.length; i++)
                    {
                        let item = nodes[i];
                        if(item.kind == ts.SyntaxKind.StringLiteral)
                        {
                            lanStr += item.text;
                        }else{
                            lanStr += "{"+params.length+"}";
                            paramStrs.push(fileContent.substring(item.pos, item.end));
                            params.push(ts.visitEachChild(item, searchNode, context));
                        }
                    }
                    let lanIndex = getLanIndex(lanStr);
                    params.unshift(
                        createPropertyAccessExpression(
                            factory.createIdentifier("lanTxt"),
                            factory.createIdentifier("k_"+lanIndex)
                        ),
                    )
                    waitReplaceTxt.push({start:node.pos, end:node.end, txt:"StringUtil.substring(lanTxt.k_"+lanIndex+", "+paramStrs.join(",") +")"});
                    return createCallExpression(
                        createPropertyAccessExpression(
                            factory.createIdentifier("StringUtil"),
                            factory.createIdentifier("substring")
                        ),
                        undefined,
                        params
                    );
                }else{
                    return ts.visitEachChild(node, searchNode, context);
                }

            }else{
                return ts.visitEachChild(node, searchNode, context);
            }
        }else if(node.kind == ts.SyntaxKind.StringLiteral)//字符
        {
            let chinaReg = /[\u4e00-\u9fa5]/gi;
            if(chinaReg.exec(node.text))
            {  
                let lanIndex = getLanIndex(node.text);
                waitReplaceTxt.push({start:node.pos, end:node.end, txt:"lanTxt.k_"+lanIndex});
                return createPropertyAccessExpression(
                    factory.createIdentifier("lanTxt"),
                    factory.createIdentifier("k_"+lanIndex)
                  )
            }else{
                return ts.visitEachChild(node, searchNode, context);
            }
        }else{
            return ts.visitEachChild(node, searchNode, context);
        }   
    }
}


//是否是汉字的表达式如A+"汉字"+B
function isStringExpression(node, nodes){
    let  hasCH = false;//时候含有汉字
    if(node.kind == ts.SyntaxKind.BinaryExpression)//表达式
    {
        if(node.operatorToken.kind == ts.SyntaxKind.PlusToken)//A+B形式的
        {
            let leftHasCH = isStringExpression(node.left, nodes);
            let rightHasCH = isStringExpression(node.right, nodes);
            if(leftHasCH || rightHasCH)hasCH = true;
        }else{
            nodes.push(node);
        }
    }else{
        if(node.kind == ts.SyntaxKind.StringLiteral)
        {
            let chinaReg = /[\u4e00-\u9fa5]/gi;
            if(chinaReg.exec(node.text))
            {
                hasCH = true;
            }
        }
        nodes.push(node);
    }
    return hasCH;
}

/**检测文件生成代码 */
function checkFile(url)
{
    fileContent = fs.readFileSync(url, "utf-8");
    let progream = ts.createProgram([url], {});
    let sourceFile = progream.getSourceFile(url);
    let transform = ts.transform(sourceFile,[transformAST], {charset:"utf-8"})
    //使用ast生成的代码， 有可能会把格式改掉， 如颜色值0xFF0000改成十进制16711680， 所以暂时不使用
    // const printer = ts.createPrinter();
    // let str = printer.printNode(ts.EmitHint.SourceFile, transform.transformed[0], sourceFile);
    // fs.writeFileSync(path.join(__dirname, "test2.ts"), str, "utf-8");
    if(waitReplaceTxt.length>0)
    {
        let newContent = fileContent;
        let indexChange = 0;
        for(let i=0;i<waitReplaceTxt.length; i++)
        {
            let item = waitReplaceTxt[i];
            newContent = newContent.substr(0, item.start+indexChange)+item.txt+newContent.substr(item.end+indexChange);
            indexChange += item.txt.length-(item.end-item.start);
        }
        fs.writeFileSync(path.join(__dirname, "test2.ts"), newContent, "utf-8");
    }
    console.log("代码转换完毕");
}

/**解析lanObj的数据 */
function parserLanObj(lanObjUrl){
    if(!fs.existsSync(lanObjUrl))
    {
        lanObjDic = [];
        console.warn("没有找到lanObj对应的文件"+lanObjUrl);
        return;
    }
    lanObjDic = JSON.parse(fs.readFileSync(lanObjUrl, "utf-8"));
    for(let key in lanObjDic)
    {
        let index = +key.replace("k_", "");
        lanTxt2Index[lanObjDic[key]] = index;
    }
}

/**获取txt文本对应的lanObj中的索引， 如果之前没有生成个新的 */
function getLanIndex(txt)
{
    let index = lanTxt2Index[txt];
    if(index)
    {
        console.log("lanObj已存在字符：k_"+index+"->"+txt);
        return index;
    }
    while(true)
    {
        maxLanIndex++;
        if(lanObjDic["k_"+maxLanIndex] == undefined)
        {
            break;
        }
    }
    console.log("lanObj新增字符： k_"+maxLanIndex+"->"+txt);
    lanTxt2Index[txt] = maxLanIndex;
    lanObjDic["k_"+maxLanIndex] = txt;
    return maxLanIndex;
}
/**保存lanObj.json */
function saveLanObj(lanObjUrl){
    let lanStr = "{\n";
    let lanArr = [];
    for(let key in lanObjDic)
    {
        lanArr.push(key);
    }
    lanArr.sort((a, b)=>{return +a.replace("k_", "")>+b.replace("k_", "")?1:-1});
    let len = lanArr.length;
    for(let i=0; i<len; i++)
    {
        lanStr += `\t"${lanArr[i]}": ${JSON.stringify(lanObjDic[lanArr[i]])}`;//因为有可能是\n\t之类的所以用JSON.stringify
        if(i<len-1)
            lanStr+=",\n"
    }
    lanStr += "\n}"
    fs.writeFileSync(lanObjUrl, lanStr, "utf-8");
    console.log("保存lanObj成功");
}

run();

