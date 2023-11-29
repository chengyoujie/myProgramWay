/***************
 * 
 * 将文件夹下所有的psd文件翻译并导出图片
 * 
 **************/
 #include "xlsx.extendscript.js";

var rootPath = "D:/工具/小脚本/图片相关/test/testpsd"
// var rootPath = "D:/工具/小脚本/图片相关/test/tt2"
var outPath = "D:/工具/小脚本/图片相关/test/testout" 
var langPath = "D:/工具/小脚本/图片相关/test/language/language.xlsx";


//程序开始
var lanDic = {};
var lanNotFound = {};
var workbook;
var sheetNoName = "no";
var errorStr = "";
var minTextSize = 14;

log("开始执行脚本");
readLanguage();//读取语言表
replacePSDText();//替换psd中的文字
saveNotFoundLanguage();//保存没有翻译的文字
if(errorStr)log("错误信息： "+errorStr)
log("脚本执行完毕")
app.beep();

function readLanguage(){
    var lanFile = new File(langPath);
    if(!lanFile.exists){
        error("翻译文件"+langPath+"不存在");
        return;
    }
    workbook = XLSX.readFile(langPath, {cellDates:true});
    var sheetName = "translation";//workbook.SheetNames[0];
    var sheet = workbook.Sheets[sheetName];
    if(!sheet){
        error("翻译文件 "+langPath+" 中没有找到页签名字是： "+sheetName+"的页签");
        return;
    }
    var data = XLSX.utils.sheet_to_json(sheet, {header:"A"});
    for(var key in data){
        var lan = data[key];
        if(!lan.A)continue;
        lanDic[lan.A] = lan.B;
    }
    var sheetNo = workbook.Sheets[sheetNoName];//XLSX.utils.aoa_to_sheet([["a"], ["NOTOUDNdddd"]])
    if(!sheetNo){
        error("翻译文件 "+langPath+" 中没有找到页签名字是： "+sheetNoName+"的页签");
        return;
    }
    var dataNo = XLSX.utils.sheet_to_json(sheetNo, {header:"A"});
    for(var key in dataNo){
        var lan = dataNo[key];
        if(!lan.A)continue;
        lanNotFound[lan.A] = lan.A;
    }

}

function saveNotFoundLanguage(){
    if(!workbook){
        error("没有找到对应的lan文件");
        return;
    }
    var testData = [];
    var sheetNoName = "no";
    var sheetNo = workbook.Sheets[sheetNoName];
    if(!sheetNo){
        error("翻译文件 "+langPath+" 中没有找到页签名字是： "+sheetNoName+"的页签");
        return;
    }
    for(var key in lanNotFound)testData.push([key])
    XLSX.utils.sheet_add_aoa(sheetNo, testData)
    XLSX.writeFile(workbook, "D:/工具/小脚本/图片相关/test/language/language2.xlsx")
}


function replacePSDText(){
    app.displayDialogs = DialogModes.NO; // 设置对话框显示模式为无
    log("---------  开始处理psd文件")
    walkDir(rootPath, modifyOnePsdText);
    log("---------  处理完毕")
    app.displayDialogs = DialogModes.ALL; // 设置对话框显示模式为无
}


//打开psd, 保存png
function modifyOnePsdText(file){
    var fname = file.name;
    if(!/.*?\.psd$/gi.test(fname))return;
    log("处理： "+fname)
    try{
        app.open(file);
    }catch(e){
        error("打开报错： "+fname);
        return;
    }
    var doc = app.open(file);
    if(doc.layers){
        for(var m=0; m<doc.layers.length; m++){
            var layer = doc.layers[m];
            walkLayer(doc, layer, modifyLayer);
        }
    }
    var outDir = outPath+"/"+file.parent.name;
    var outDirFile = new Folder(outDir);
    if(!outDirFile.exists){
        outDirFile.create();
    }
    var outFile = new File(outDirFile+"/"+fname.replace(".psd", ".png"));
    var exportOtions = new ExportOptionsSaveForWeb();
    exportOtions.format = SaveDocumentType.PNG;//JPEG, PNG-8, PNG-24 BMP
    exportOtions.PNG8 = false;//  导出图片格式png24
    doc.exportDocument(outFile, ExportType.SAVEFORWEB, exportOtions)
    // doc.save();
    doc.saveAs(new File(outDirFile+"/"+fname));
    doc.close();
}

/**修改图层中文本信息 */
function modifyLayer(layer){
    if(layer.kind == LayerKind.TEXT && layer.textItem){
        var txt = layer.textItem.contents;
        var newTxt = lanDic[txt];
        if(newTxt){
            var oldSize = layer.textItem.size.value;
            var oldType = layer.textItem.size.type;
            if(oldSize>minTextSize){
                var txtNum = newTxt.length - txt.length;//新增文字的个数
                if(txtNum>txt.length/6){//
                    var newSize = Math.max(minTextSize,  Math.floor(oldSize * txt.length/newTxt.length))
                    layer.textItem.size = new UnitValue(newSize,  oldType);
                }else if(txtNum < txt.length/6){

                }
            }
            layer.textItem.contents = newTxt;
            // if(layer.name == txt){
            //     layer.name = newTxt;
            // }
        }else{
            lanNotFound[txt] = txt;
        }
        log("find text"+ txt+" -> "+newTxt);
    }
}

/**遍历图层， 包括智能对象 */
function walkLayer(doc, layer, onLayer){
    // if(layer.constructor == LayerSet) {
    if(layer["layers"]) {//文件夹图层
        for(var i=0; i<layer.layers.length; i++){
            walkLayer(doc, layer.layers[i], onLayer);
        }
    }else if(layer.kind == LayerKind.SMARTOBJECT){//智能对象
        doc.activeLayer = layer;
        try{
            executeAction(stringIDToTypeID("placedLayerEditContents"), new ActionDescriptor(), DialogModes.NO);
        }catch(e){
            error("错误： "+e.message)
            return;
        }
        var smartDoc = app.activeDocument;
        for(var m=0; m<smartDoc.layers.length; m++){
            var smartDocLayer = smartDoc.layers[m];
            walkLayer(smartDoc, smartDocLayer, onLayer);
        }
        smartDoc.save();
        smartDoc.close();
    }else{
        onLayer(layer);
    }
}

//遍历文件夹
function walkDir(url, onFile, onDir){
    var file = url;
    if(typeof url == "string")file = File(rootPath);
    if(!file.exists)return;
    if(file.constructor ==  Folder){//文件夹
        if(onDir)onDir(file);
        var files =  file.getFiles();
        for(var i=0; i<files.length; i++){
            walkDir(files[i], onFile, onDir);
        }
    }else{
        onFile(file);
    }
}
/**输出日志 */
function log(msg){
    $.writeln(msg);
}

function error(msg){
    errorStr+=msg+"\n";
    $.writeln(msg);
}
