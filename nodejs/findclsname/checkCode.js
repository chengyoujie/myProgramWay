var fs = require("fs")
var uglify = require("uglify-js")
var path = require("path")

// interface VarInfo{
//     varname:string;
//     newname:string;
//     index:number;
// }
// var content = fs.readFileSync("D:/workspace/yscq/libs/modules/eui/eui.min.js", "utf-8")
var content = fs.readFileSync("D:/workspace/yscq/bin-release/web/190831104417/resource/main.min.js", "utf-8")


// var content = fs.readFileSync("D:/workspace/yscq/libs/modules/socket/socket.js", "utf-8")
var ast = uglify.parse(content)

// var uAST = uglify.AST_Node.from_mozilla_ast(ast);
// var ast = uglify.parse(`var test;
// (function (test) {
//     var TestCls = /** @class */ (function () {
//         function TestCls() {
//             this._varName = "私有变量";
//             this._pubVar = 100;
//         }
//         TestCls.prototype.pubFun = function () {
//             return this._varName;
//         };
//         return TestCls;
//     }());
//     test.TestCls = TestCls;
// })(test || (test = {}));`)
ast.figure_out_scope();
// console.log(ast);

// console.log(ast.print_to_string({beautify:true}))
var vararr = [];
let vardic = {};
changeVar(ast.variables, vardic);
walk(ast);
// console.log(ast.print_to_string({beautify:true}))
fs.writeFileSync("D:/test/save.js", ast.print_to_string({beautify:true}))
function changeVar(variables)
{
    let vars = variables._values;
    for(var key in vars)
    {
        let item = vars[key];
        if(item.name.charAt(0) == "_")continue;
        let newvarinfo = vardic[item.name];
        if(!newvarinfo)
        {
            newvarinfo = vardic[item.name] = {};
            newvarinfo.varname = item.name;
            newvarinfo.index = vararr.length;
            newvarinfo.newname = item.name.split("").reverse().join("");
            vararr.push(item.name);
            // item.name=newvarinfo.newname;
        }else{
            console.log("发现重复的变量名");
        }
        // let refs = item.references;
        // if(refs && refs.length>0)
        // {
        //     for(let m=0; m<refs.length; m++)
        //     {
        //         let ref = refs[m]
        //         ref.name = newvarinfo.newname;
        //         ref.thedef.name = newvarinfo.newname;
        //     }
        // }
        // let origs = item.orig;
        // if(origs && origs.length>0)
        // {
        //     for(let m=0; m<origs.length; m++)
        //     {
        //         let orig = origs[m];
        //         orig.name = newvarinfo.newname;
        //         orig.thedef.name = newvarinfo.newname;
        //     }
        // }
    }
}

function walk(ast)
{
    ast.walk(new uglify.TreeWalker(function(node){
        // if(node instanceof uglify.AST_String)
        // {
        //     // console.log("found String "+node.getValue());
        //     // node.value = "改变字符";
        //     // node.quote = "";
        // }else if(node instanceof uglify.AST_SymbolVar)
        // {
        //     console.log("found SymbolVar "+node.name)
        //     chanageNodeName(node);
        // }else if(node instanceof uglify.AST_SymbolRef)
        // {
        //     console.log("fund SymbolRef "+node.name)
        //     chanageNodeName(node);
        // }else if(node instanceof uglify.AST_SymbolDefun)
        // {
        //     console.log("fund Defun "+node.name)
        //     chanageNodeName(node);
        // }else if(node instanceof uglify.AST_Toplevel)
        // {
        //     console.log("fund Toplevel "+node.globals+ " "+node.variables+" "+node.functions);
        // }   

        //测试
        if(node instanceof uglify.AST_Var )
        {
            // chanageNodeName(node);
            let arr = node.definitions;
            for(let i=0; i<arr.length; i++)
            {
                let item = arr[i].name;
                item.thedef.name = item.name = (item.name+"").split("").reverse().join("");
            }
        }else if(node instanceof uglify.AST_Dot){
            // console.log(node);
            node.property = node.property.split("").reverse().join("");
        }else if(node instanceof uglify.AST_SymbolDefun){
            // console.log(node);
            let resname = node.thedef.name = node.name = (node.name+"").split("").reverse().join("");
            let references = node.thedef.references;
            for(let i=0; i<references.length; i++)
            {
                let item = references[i];
                item.name = resname;
            }
        }
        // moreinfo(node);
        // console.log(node)
    }))
    console.log("完毕")
}

function moreinfo(node)
{
    console.log("type: "+node.__proto__.TYPE);
    var json = {};
    for(let key in node)
    {
        json[key] = node[key]+"";
    }
    console.log(JSON.stringify(json));
}

function chanageNodeName(node)
{
    // let newvarinfo = vardic[node.name];
    // if(newvarinfo)
    // {
    //     node.name = newvarinfo.newname;
    //     // node.thedef.name = newvarinfo.newname;
    // }
    item.name = item.name.split("").reverse().join("");
}