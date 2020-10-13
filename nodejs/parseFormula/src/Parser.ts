// namespace byh {

import { Scanner, SyntaxKind } from "./Scanner";

    /**
     *  
     * 词法解析
     * made by cyj
     * create on 2020-09-22 13:54:55 
    */
   export class Parser {

        private scanner:Scanner = new Scanner();
        private formulaObj:{[key:string]:any} = {};
        private parentNode:Node;

        //TODO delete
        private testRoot:Node;
       constructor()
       {

       }

       parser(source:string)
       {
            let s = this;
            s.scanner.setText(source);
            let node:Node = {type:NodeType.Root, parentNode:null, childNode:[], test:s._test++};
            s.parentNode = node;
            s.testRoot = node;
            console.log("解析公式： "+source)
            s.scanner.scan();
            while(s.scanner.getToken() != SyntaxKind.EndOfFileToken)
            {
                if(!s.parentNode)
                {
                    s.showError("没有找到匹配的(");
                    return;
                }
                // console.log("发现token: "+ "type: "+ s.scanner.getToken()+"  text: "+s.scanner.getTokenText());
                
                let token = s.scanner.getToken();
                let text = s.scanner.getTokenText();
                switch(token)
                {
                    case SyntaxKind.FormulaObjToken://函数对象
                        let formulaObj:any = s.formulaObj[text];
                        if(!formulaObj)
                        {
                            s.showError(text+" 没有找到对应的公式对象");
                            return;
                        }
                        s.scanner.scan();//逗点
                        if(s.scanner.getToken() == SyntaxKind.DotToken)
                        {
                            s.scanner.scan();//属性
                            text = s.scanner.getTokenText();
                            token = s.scanner.getToken();
                            if(formulaObj[text] == undefined)
                            {
                                s.showError(text+" 没有找到不是对象的属性");
                                return;
                            }
                            if(token == SyntaxKind.Identifier)//属性
                            {
                                let nextToken = s.scanner.nextToken();
                                if(nextToken == SyntaxKind.OpenParenToken)
                                {
                                    s.scanner.scan();
                                    let node = s.createNewNode(NodeType.FunctionNode,  formulaObj[text]);
                                    s.setNodeParent(node, s.parentNode);
                                    if(s.parentNode.type == NodeType.BinaryNode)
                                    {
                                        let binaryNode = s.parentNode as BinaryNode;
                                        binaryNode.right = node;
                                    }
                                    s.parentNode = node;
                                }else{
                                    s.checkAndCreateBinaryNode(NodeType.NumberNode, s.parentNode, formulaObj[text]);
                                }
                            }else{
                                s.showError(text+"  后面需要属性");
                            }
                        }else{
                            s.showError(text+"后需要.");
                        }
                    break;
                    
                    case SyntaxKind.OpenParenToken://左括号 (
                        let node = s.createNewNode(NodeType.ParenNode);
                        s.setNodeParent(node, s.parentNode);
                        if(s.parentNode.type == NodeType.BinaryNode)
                        {
                            let binaryNode = s.parentNode as BinaryNode;
                            binaryNode.right = node;
                        }
                        s.parentNode = node;
                    break;
                    
                    case SyntaxKind.CloseParenToken://右括号 ) 一般为函数或者其他结束
                        // if(s.parentNode.type == NodeType.FunctionNode)
                        // {
                        //     s.checkAndCreateBinaryNode(s.parentNode, s.parentNode.parentNode);//函数
                        // }else{
                        //     s.checkAndCreateBinaryNode(s.parentNode.parentNode, s.parentNode.parentNode.parentNode);
                        // }
                        let parent = s.parentNode;
                        while(parent.type != NodeType.Root)
                        {
                            if(parent.type == NodeType.FunctionNode || parent.type == NodeType.ParenNode)
                            {
                                s.parentNode  = parent;
                                break;
                            }
                            parent = parent.parentNode;
                        }
                        s.checkAndCreateBinaryNode(s.parentNode, s.parentNode.parentNode);//函数
                        // 
                    break;

                    case SyntaxKind.FormulaParamToken:
                        text = text.replace(/\$/gi, "");
                        s.checkAndCreateBinaryNode(NodeType.ParamsNode, s.parentNode, text);
                    break;

                    case SyntaxKind.NumberToken:
                        s.checkAndCreateBinaryNode(NodeType.NumberNode, s.parentNode, +text);
                    break; 
                    case SyntaxKind.CommaToken:
                        if(s.parentNode.type == NodeType.FunctionNode)//如果上一级是函数
                        {

                        }else if(s.parentNode.type == NodeType.BinaryNode)
                        {
                            s.parentNode = s.parentNode.parentNode;
                        }else{
                            s.showError(", 解析错误")
                        }
                    break;
                    case SyntaxKind.PlusToken://加号   如果后面是数字则表示正常数字
                        if(s.scanner.nextToken() == SyntaxKind.NumberToken)
                        {
                            s.scanner.scan();
                            text = s.scanner.getTokenText();
                            s.checkAndCreateBinaryNode(NodeType.NumberNode, s.parentNode, +text);
                        }else{
                            s.showError(" + 解析错误")
                        }
                    break;
                    case SyntaxKind.MinusToken://减号  如果后面是数字则表示是负数
                        if(s.scanner.nextToken() == SyntaxKind.NumberToken)
                        {
                            s.scanner.scan();
                            text = s.scanner.getTokenText();
                            s.checkAndCreateBinaryNode(NodeType.NumberNode, s.parentNode, -(+text));
                        }else{
                            s.showError(" - 解析错误")
                        }
                    break;
                    default:
                        s.showError("没有发现token: "+ "type: "+ s.scanner.getToken()+"  text: "+s.scanner.getTokenText()+"对应的解析方法")
                    break;
                }
                // console.log("---------------------------------------"+source)
                // s.showNodeTree(node, "");
                s.scanner.scan();
            }
            let len = node.childNode.length;
            if(len == 0)
            {
                s.showError("没有解析到表达式");
            }else if(len > 1)
            {
                s.showError("公式格式错误");
            }
            // console.log("---------------------------------------"+source)
            // s.visitNodeTree(node, "");
            console.log("---------------------------------------"+source)
            s.showNodeTree(node, "");
            return node;
       }

       private showNodeTree(node:Node, str:string)
       {
           let  s= this;
           let value = s.getLogNodeValue(node)
            console.log(str+"id:"+node.test+" ,node:"+s.getNodeTypeName(node.type)+" value:"+value);
            str += "\t";
            for(let i=0; i<node.childNode.length; i++)
            {
                let childNode = node.childNode[i]; 
                if(node.type == NodeType.BinaryNode)
                {
                    let binaryNode = node as BinaryNode;
                    if(binaryNode.left != childNode || binaryNode.right != childNode)
                    {
                        // s.showError("节点信息错误：childNode 不是左右节点")
                    }
                }
                s.showNodeTree(childNode, str);
            }
       }

       private getLogNodeValue(node:Node)
       {
            let value = node.value;
            if(node.type == NodeType.BinaryNode)
            {
                switch(value)
                {
                    case SyntaxKind.PlusToken:value = "+";break;
                    case SyntaxKind.MinusToken:value = "-";break;
                    case SyntaxKind.AsteriskToken:value = "*";break;
                    case SyntaxKind.SlashToken:value = "/";break;
                }
            }else if(node.type == NodeType.Root)
            {
                value = "Root";
            }else if(node.type == NodeType.ParenNode)
            {
                value = "()"
            }
            return value;
       }

       private visitNodeTree(node:Node, str:string)
       {
            let s = this;
            str = str+"\t";
            if(!node)return str + "NULL";
            switch(node.type)
            {
                case NodeType.Root:
                    for(let i=0; i<node.childNode.length; i++)
                    {
                        console.log(s.visitNodeTree(node.childNode[i], str));
                        return ;
                    }
                    break;
                case NodeType.ParenNode:
                    for(let i=0; i<node.childNode.length; i++)
                    {
                        console.log(s.visitNodeTree(node.childNode[i], str));
                        return ;
                    }
                case NodeType.ParamsNode:
                    return str +"id:"+node.test+", node:"+s.getNodeTypeName(node.type)+ node.value;
                break;
                case NodeType.NumberNode:
                    return str +"id:"+node.test+", node:"+s.getNodeTypeName(node.type)+ node.value;
                case NodeType.FunctionNode:
                    let fun:Function = node.value;
                    console.log(str+"id:"+node.test+", node:"+s.getNodeTypeName(node.type)+"function:"+fun)
                    if(node.childNode.length>0)
                    {    
                        for(let j=0; j<node.childNode.length; j++)
                        {
                            console.log(s.visitNodeTree(node.childNode[j], str));
                        }
                    }
                break;
                case NodeType.BinaryNode:
                    let curNode = node as BinaryNode;
                    console.log(str+"id:"+node.test+", node:"+s.getNodeTypeName(node.type)+s.getLogNodeValue(node));
                    console.log("left:"+s.visitNodeTree(curNode.left, str));
                    console.log("right:"+s.visitNodeTree(curNode.right, str));
                break;
                default:
                    s.showError("没有找到对应的节点类型："+node.type+" id:"+node.test)
            }
            return str+"NULL";
        }

       /**
        * 生成 表达式
        * @param type 
        * @param parentNode 
        * @param value 
        */
       private checkAndCreateBinaryNode(type:Node, parentNode:Node)
       private checkAndCreateBinaryNode(type:NodeType, parentNode:Node, value:any)
       private checkAndCreateBinaryNode(type:NodeType|Node, parentNode:Node, value?:any)
       {
           let s = this;
            let nextToken = s.scanner.nextToken();
            let node:Node;
            if(typeof type == "number")
            {
                node = s.createNewNode(type, value);
            }else{
                node = type;
            }
            // if(!s.isOperSyntaxKind(nextToken) && nextToken != SyntaxKind.EndOfFileToken)
            // {
            //     s.showError("表达式格式错误");
            // }
            if(parentNode.type == NodeType.BinaryNode)//当前节点的父节点是运算符节点
            {
                let parentBinaryNode = parentNode as BinaryNode;
                if(s.isOperSyntaxKind(nextToken))
                {
                    s.scanner.scan();
                    let parentPredence = s.getBinaryOperatorPrecedence(parentBinaryNode.value);
                    let curPredence = s.getBinaryOperatorPrecedence(s.scanner.getToken());
                    if(parentPredence<curPredence)//如果运算符后面的优先级大于前面的优先级  如A+B*C则 parentNode = (A+)   binaryNode( B*)    b为当前节点
                    {
                        let binaryNode = s.createNewNode(NodeType.BinaryNode, s.scanner.getToken());//生成B*6
                        s.setNodeParent(binaryNode, parentNode);
                        parentNode = binaryNode;//
                        s.setNodeParent(node, parentNode);
                        parentBinaryNode.right =  binaryNode;//A+ 的右节点为  binaryNode(B*)
                        binaryNode.left = node;      
                    }else{//如果运算符的后面的优先级小于等于前面的优先级  如A*B+C 或 A+B+C 则 parentNode (A*B) +  C
                        s.setNodeParent(node, parentBinaryNode);
                        parentBinaryNode.right = node;//A+(B)
                        let binaryNode = s.createNewNode(NodeType.BinaryNode, s.scanner.getToken());
                        let replaceNode:Node = parentBinaryNode;
                        while(replaceNode.type == NodeType.BinaryNode)
                        {
                            if(!replaceNode.parentNode || replaceNode.parentNode.type != NodeType.BinaryNode)
                                break;
                            if(s.getBinaryOperatorPrecedence(replaceNode.value) == curPredence)//如果遇到相同优先级的符号终止循环，并替换掉该位置的表达式
                            {
                                break;
                            }else{
                                replaceNode = replaceNode.parentNode;
                            }
                        }
                        // console.log("交换： "+replaceNode.test+" -- > "+binaryNode.test)
                        s.switchNode(replaceNode, binaryNode);
                        s.setNodeParent(replaceNode, binaryNode)
                        parentNode = binaryNode;
                        binaryNode.left = replaceNode;//左侧为  (A+B) 
                    }
                }else{
                    s.setNodeParent(node, parentBinaryNode);
                    parentBinaryNode.right = node;
                    parentNode = parentBinaryNode.parentNode;
                }
            }else if(s.isOperSyntaxKind(nextToken))
            {
                s.scanner.scan();
                let binaryNode = s.createNewNode(NodeType.BinaryNode, s.scanner.getToken());
                s.setNodeParent(binaryNode, parentNode);
                parentNode = binaryNode;
                s.setNodeParent(node, parentNode);
                binaryNode.left = node; 
            }else{
                s.setNodeParent(node, parentNode);
            }
            s.parentNode = parentNode;
            return node;
       }
        //TODO delete
        private _test = 0;
        private createNewNode(type:NodeType.BinaryNode, value:any):BinaryNode
        private createNewNode(type:NodeType.FunctionNode, value:any):FunctionNode
        private createNewNode(type:NodeType, value?:any):Node
       private createNewNode(type:NodeType, value?:any):Node
       {
           let node = {type:type, parentNode:null, childNode:[], value, test:this._test++};
           if(type == NodeType.FunctionNode)
           {
                (node as FunctionNode).params = [];
           }
            return node;
       }

       private switchNode(node1:Node, node2:Node)
       {
           let parent1:Node = node1.parentNode;
           let parent2:Node = node2.parentNode;
            if(parent1)
            {   
                let index = parent1.childNode.indexOf(node1);
                if(index!=-1)
                {
                    parent1.childNode[index] = node2;
                    if(parent1.type == NodeType.BinaryNode)
                    {
                        let binaryNode = parent1 as BinaryNode;
                        if(binaryNode.left == node1)
                        {
                            binaryNode.left = node2;
                        }else if(binaryNode.right == node1){
                            binaryNode.right = node2;
                        }
                    }
                }
            }
            if(parent2)
            {
                let index = parent2.childNode.indexOf(node2);
                if(index!=-1)
                {
                    parent2.childNode[index] = node2;
                    if(parent2.type == NodeType.BinaryNode)
                    {
                        let binaryNode = parent2 as BinaryNode;
                        if(binaryNode.left == node2)
                        {
                            binaryNode.left = node1;
                        }else if(binaryNode.right == node2){
                            binaryNode.right = node1;
                        }
                    }
                }
            }
            node1.parentNode = parent2;
            node2.parentNode = parent1;

       }

       private setNodeParent(node:Node, parentNode:Node)
       {
           if(node.parentNode)
           {
               if(node.parentNode == parentNode)return;
               let oldParentNode = node.parentNode;
               let index = oldParentNode.childNode.indexOf(node);
               if(index != -1)
               {
                   if(oldParentNode.type == NodeType.BinaryNode)
                   {
                       let oldNode = oldParentNode.childNode[index];
                       let binaryNode = oldParentNode as BinaryNode;
                       if(binaryNode.left == oldNode)
                       {
                           binaryNode.left = node;
                       }else if(binaryNode.right == oldNode){
                           binaryNode.right = node;
                       }else{
                           this.showError("交换节点时没有当前子节点位于父节点的左右位置")
                       }
                   }
                   oldParentNode.childNode.splice(index, 1);
               }else{
                   this.showError("父子节点关系错乱")
               }
           }
           node.parentNode = parentNode;
            parentNode.childNode.push(node);
            if(parentNode.type == NodeType.FunctionNode)
            {
                (parentNode as FunctionNode).params.push(node);
            }
       }

       public registerFormulaObj(key:string, funObj:any)
       {
            let s = this;
            s.formulaObj["T("+key+")"] = funObj;
       }

       /**显示错误 */
       private showError(msg:string)
       {
           let s= this;
           let source = s.scanner.getText();
            console.error("公式： "+source+" 错误： "+msg+" at:"+s.scanner.getStartPos()+ "   >>"+source.substring(0, s.scanner.getTextPos()));
       }

       /**
        * 获取解析的优先级
        * @param kind 
        */
       private getBinaryOperatorPrecedence(kind: SyntaxKind): OperatorPrecedence {
            switch (kind) {
                
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                    return OperatorPrecedence.Additive;
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                    return OperatorPrecedence.Multiplicative;
            }
            return -1;
        }
        /**是否是运算符的类型  （加减乘除) */
        private isOperSyntaxKind(kind:SyntaxKind)
        {
            if(kind == SyntaxKind.PlusToken
                ||kind == SyntaxKind.MinusToken
                ||kind == SyntaxKind.AsteriskToken
                ||kind == SyntaxKind.SlashToken
            )return true;
            return false;
        }

        /**获取节点的名字 */
        private getNodeTypeName(nodeType:NodeType)
        {
            switch(nodeType)
            {
                case NodeType.Root:return "Root";
                case NodeType.FunctionNode:return "FunctionNode";
                case NodeType.NumberNode:return "NumberNode";
                case NodeType.ParamsNode:return "ParamsNode";
                case NodeType.BinaryNode:return "BinaryNode";
                case NodeType.ParenNode:return "ParenNode";
                default: return "Not Found Node Type: "+nodeType;
            }
        }

   }

   /**表达式  树结构中的节点类型 */
   export const enum NodeType{
        /**根节点 */
       Root,
       /**函数节点 */
        FunctionNode,
        /**数字节点 */
        NumberNode,
        /**函数参数 */
        ParamsNode,
        /**括号节点 */
        ParenNode,
        /**表达式 */
        BinaryNode,
   }
   /**操作符优先级 */
   export const enum OperatorPrecedence {
        /**加减优先级 */
        Additive,
        /**乘除优先级 */
        Multiplicative,
   }
   /**表达式 节点的数据结构 */
   export interface Node{
       test:number;
        type:NodeType;
        childNode:Node[];
        parentNode:Node;
        value?:any;
   }
   /**运算表达式的节点结构 */
   export interface BinaryNode extends Node{
        left:Node;
        right:Node;
   }
   /**函数节点的结构 */
   export interface FunctionNode extends Node{
       params:Node[];
   }

// }