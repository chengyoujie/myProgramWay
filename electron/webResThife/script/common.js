const fs = nodeRequire('fs');
const path = nodeRequire('path');
const url = nodeRequire('url');
const { URLSearchParams } = nodeRequire('url');
// const app = nodeRequire('electron');
const {ipcRenderer, remote, shell, dialog} = nodeRequire('electron')

/**选择性的保存， 如果是.xx?mm  则丢弃掉mm  只保存.xx文件  如果是 xx?mm 则保存为 xx_mm**/
const SavePolicy_ChoiceSave = 0;
/**都保存  如果是 aa.xx?mm   则会修改为 aa_mm.xx  **/
const SavePolicy_AllSave = 1;
/**选择性的保存， 如果是.xx?mm  则丢弃掉mm  只保存.xx文件  如果是 xx?mm 则丢弃掉**/
const SavePolicy_MinSave = 2;

//按照规则获取   文件（夹）名字  长度及特殊符号处理
function getFileRuleName(name) {
    if (name.length > 230) {//最长的字符长度2为255 先设置成230
        name = name.substring(name.length - 230);
    }
    name = name.replace(/[\\ \/ : \* \? \" \s < > \|"]/gi, pathblock); //去掉特殊符号
    return name;
}
/**获取url的名字**/
function getFileNameByUrl(pname) {
    var parr = [pname, "", "", ""];
    var pwenindex = pname.indexOf("?");
    var pextindex = -1;
    if (pwenindex != -1) pextindex = pname.substring(0, pwenindex).lastIndexOf(".");
    else pextindex = pname.lastIndexOf(".");
    if (pextindex != -1) {
        parr[1] = pname.substring(0, pextindex);
        if (pwenindex != -1) {
            parr[2] = pname.substring(pextindex + 1, pwenindex);
            parr[3] = pname.substring(pwenindex + 1);
        } else {
            parr[2] = pname.substring(pextindex + 1);
        }
    }
    if (savepolicy == SavePolicy_ChoiceSave) //选择性的保存， 如果是.xx?mm  则丢弃掉mm  只保存.xx文件  如果是 xx?mm 则保存为 xx_mm
    {
        if (parr[1]) {
            pname = parr[1] + "." + parr[2];
        }
    } else if (savepolicy == SavePolicy_AllSave) //都保存  如果是 aa.xx?mm   则会修改为 aa_mm.xx
    {
        if (parr[1]) {
            pname = parr[1] + pathblock + parr[3] + "." + parr[2];
        }
    } else if (savepolicy == SavePolicy_MinSave) {
        if (parr[1]) {
            pname = parr[1] + "." + parr[2];
        } else {
            pname = "";
            return ""; //不做处理
        }
    }
    pname = getFileRuleName(pname);
    return pname;
}