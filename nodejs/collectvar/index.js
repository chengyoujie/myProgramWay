let test = `
a.bd.cd.d = a;
a.bd.test = 2l;
a.mm = sl;
this._buttonRemoves[id] = true;
		if (this.buttonArr == undefined || !this.checkBtnid(id)) {
			return;
		}
		
		for (let index = 0; index < this.buttonArr.length; index++) {
			let element = this.buttonArr[index];
			if (element != undefined && element.parent && element.id == id) {
				element.parent.removeChild(element);
				element.dispose();
				element = undefined;
				this.buttonArr.splice(index, 1);
			}
        }
        a.bd.cd.d = a;
		this.setbutonpos();
`
let dotReg = /((\w+)\.)+(\w+)/gi;
let arr;
var refkeys = [];
let dotNum = {child:{}, key:"", num:0, use:0};//KEY:{key:string, next[]<{key, next}>}
while(arr = dotReg.exec(test))
{
    console.log(arr[0])
    fullDic(arr[0]);
}
console.log(dotNum);
let str = '';
for(let key in dotNum.child)
{
    str += generCode(dotNum.child[key], key, refkeys)+"\n";
}
console.log(str);
refkeys.sort((a, b)=>{
    return a.length<b.length;
})

for(let i=0; i<refkeys.length; i++)
{
    console.log("key : "+refkeys[i]);
    let karr = refkeys[i].split(".");
    let kvar = karr[karr.length-1];
    let regstr = refkeys[i].replace(/\./gi, "\\.");
    regstr = "([\\W])("+regstr+")([\\W])";
    let reg = new RegExp(regstr,"gi");
    console.log("reg: "+reg.source);
    test = test.replace(reg, "$1"+kvar+"$3");
}
console.log(test);

function generCode(node, refkey, keys)
{
    console.log("ref keys : "+refkey)
    if(refkey.indexOf(".")!=-1)
    {
        keys.unshift(refkey);
    }
    if(node.num>0)
    {
        let vararr = [];
        let str = "";
        for(let key in node.child)
        {
            if(node.child[key].use>1)
            {
                vararr.push(key);
                // console.log("ref key : "+refkey+"."+key);
                // let nkey = refkey;
                // if(keys.indexOf(nkey))
                //     keys.unshift(nkey);
            }
            if(node.child[key].num>0)
            {
                let code = generCode(node.child[key], refkey +"."+key, keys);
                if(code)
                    str = code + str;
            }else{
                //a
            }
        }
        if(vararr.length>0)
        {
            // console.log("ref key : "+refkey);
            return "let {"+vararr.join(",")+"} = "+node.key +";\n"+ str;
        }
    }
    return "";
}

function fullDic(str)
{
    let arr = str.split(".");
    if(arr.length==0)return;
    let node = dotNum;
    // let parentNode;
    for(let i=0; i<arr.length; i++)
    {
        let key = arr[i];
        if(!node.child[key]){
            node.child[key]= {child:{}, key, num:0,use:0, parent:node}
            node.num ++;
            // if(parentNode)
            //     parentNode.child[key] = node.child[key];
        }
        let item = node.child[key];
        item.use ++;
        // let temp = item;
        // while(temp)
        // {
        //     temp.num ++;
        //     temp = item.parent;
        // }
        // parentNode = item;
        node = item;
    }
}
// let lastKey;
// let lastIndex;
// while(arr = dotReg.exec(test))
// {
//     dotReg.lastIndex = dotReg.lastIndex - arr[2].length;
//     let key = arr[1];
//     // if(!dotNum[key])
//     //     dotNum[key] = [{key, parent:undefined, next:[], num:0}];
//     // else
//     if(lastIndex+key.length+1 == dotReg.lastIndex)
//     {
//         console.log("连续的 "+lastKey+"."+key)
//     }else{
//         console.log("不连续的")
//     }
//     lastIndex = dotReg.lastIndex;
//     lastKey = key;
//         pushKey(key, arr[2]);
//     console.log(key+ "  from : "+arr[0]+ " index:"+dotReg.lastIndex);
// }


function pushKey(parent, key)
{
    // if(!dotNum[parent])
    //     dotNum[parent] = [{key:parent, parent:undefined, next:[], num:0}];
    // let nexts = dotNum[parent].next;
    // let find= false;
    // for(let i=0; i<nexts.length; i++)
    // {
    //     if(nexts[i].key == key)
    //     {
    //         find = true;
    //         nexts[i].num ++;
    //         break;
    //     }
    // }  
    // if(!find)
    // {
    //     dotNum[parent].next = {}
    // }


}


var fs = require("fs");
var path = require("path")
var configpath = path.join(__dirname, "app.config");
if(!fs.existsSync(configpath))
{
    $("#login").window('open'); 
}else{
    $("#login").window('close'); 
}
fs.readFileSync(configpath, {encoding:"utf-8"});
fs.writeFileSync(configpath, "{user:"+$("#username").text()+"}", "utf-8")