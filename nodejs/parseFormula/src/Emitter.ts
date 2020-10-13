// namespace byh {
    import { BinaryNode, Node, NodeType, Parser } from "./Parser";
    import { SyntaxKind } from "./Scanner";
    /**
     *  
     * 最终生成
     * made by cyj
     * create on 2020-09-22 09:35:55 
    */
   export class Emitter {
        private parser:Parser = new Parser();    
        private cache:{[source:string]:Node} = {};

        constructor()
        {
            let s = this;
            s.parser.registerFormulaObj("Math", Math);
        }

        public eval(source:string, params:any)
        {
            let s = this;
            let node:Node;
            if(!s.cache[source])
            {
                node = s.cache[source] = s.parser.parser(source);
            }else{
                node = s.cache[source];
            }
            let result = s.getNodeValue(node, params);
            console.log("计算结果： "+result)
            return result;
        }


        private getNodeValue(node:Node, params:any)
        {
            let s = this;
            // console.log("解析： type:"+node.type+"  value:"+node.value)
            switch(node.type)
            {
                case NodeType.Root:
                    for(let i=0; i<node.childNode.length; i++)
                    {
                        return s.getNodeValue(node.childNode[i], params);
                    }
                    break;
                case NodeType.ParenNode:
                    for(let i=0; i<node.childNode.length; i++)
                    {
                        return s.getNodeValue(node.childNode[i], params);
                    }
                case NodeType.ParamsNode:
                    if(params && params[node.value] != undefined)
                    {
                        return params[node.value];
                    }else{
                        s.showError("没有找到对应的变量"+node.value);
                    }
                break;
                case NodeType.NumberNode:
                    return node.value;
                case NodeType.FunctionNode:
                    let fun:Function = node.value;
                    let funParams = [];
                    if(node.childNode.length>0)
                    {    
                        for(let j=0; j<node.childNode.length; j++)
                        {
                            funParams.push(s.getNodeValue(node.childNode[j], params));
                        }
                    }
                    return fun.apply(null, funParams);
                case NodeType.BinaryNode:
                    let curNode = node as BinaryNode;
                    let left = s.getNodeValue(curNode.left, params);
                    let right = s.getNodeValue(curNode.right, params);
                    switch(node.value)
                    {
                        case SyntaxKind.PlusToken://+
                            // console.log("执行+： "+left+"+"+right)
                            return left+right;
                        case SyntaxKind.MinusToken://-
                            // console.log("执行-： "+left+"-"+right)
                            return left-right;
                        case SyntaxKind.AsteriskToken://*
                        // console.log("执行*： "+left+"*"+right)
                        return left*right;
                        case SyntaxKind.SlashToken:// /
                        // console.log("执行/： "+left+"/"+right)
                        return left/right;
                        default:
                            s.showError("不能解析的操作符：type:"+node.value);
                    }
                break;
                default:
                    s.showError("没有找到对应的节点类型："+node.type)
            }
            return 0;
        }

        private showError(msg:string)
        {
            console.error("公式生成错误："+msg);
        }
    }
// }