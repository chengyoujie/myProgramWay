
var path = require("path");
var fs = require("fs");
/**
 * 遍历文件
 * @param {*} url 
 * @param {*} onFile 
 * @param {*} onDir 
 * @param {*} thisObj 
 * @param {*} notWalkSelf 
 * @returns 
 */
 function walkDir(url,onFile,onDir,thisObj, notWalkSelf) {
    url = path.normalize(url);
    var stats = fs.statSync(url);
    if (stats.isDirectory()) {
        if(onDir && !notWalkSelf) onDir.call(thisObj,url);
        var files = fs.readdirSync(url);
        for (var i = 0, len = files.length; i < len; i++) {
            walkDir(path.join(url,files[i]),onFile,onDir,thisObj);
        }
        return true;
    } else {
        if(onFile) onFile.call(thisObj,url);
        return false;
    }
}

module.exports = {walkDir}
