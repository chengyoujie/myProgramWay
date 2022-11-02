/**引擎中添加属性声明 */
// declare module Laya {

//     export interface Node {
//         /**
//          * 是否对子对象的每一层进行合批操作
//          */
// 		layerBatch:boolean;
//     }
// }
    /**引擎拓展、修改 */
    export class RenderSprite {
        /**
         * 渲染拓展
         *  增加按照层级合批(layerBatch)的规则
         */
        static extend(){
            /**RenderSprite的原型链 */
            let nodePrototype = Laya.RenderSprite.prototype;
            /**节点的列表， 将需要遍历子对象的node放入栈中， 并将当前子对象的数目，及当前遍历的层级放入到nodeInfos中，待将当前子对象的所有子对象层级遍历完毕后在出栈 */
            let nodeStacks:Laya.Sprite[] = [];
            /**节点的信息  当前层节点长度， 当前循环的层级 */
            let nodeInfos:number[] = []//len layer
            /**节点列表对应的位置信息 */
            let nodePositions:number[] = [];//x,y
            /**节点的索引 */
            let nodeIndex:number = 0;
            /**节点信息的索引 */
            let infoIndex:number = 0;
            /**当前循环的层级 */
            let layer:number = 0
            /**防止死循环， 做的循环次数，超过一定次数移除 */
            let loopCount:number = 0;
            /**将节点的renderType中childs移除的标志 */
            let removeChildrenTag = ~Laya.SpriteConst.CHILDS;
            
            /**修改renderSprite的遍历方法 */
            Object.defineProperties(nodePrototype, {
                /**遍历子对象， 对于设置layerBatch的对象特殊处理 */
                _children:{
                    value:function(sprite: Laya.Sprite, context: Laya.Context, x: number, y: number): void {
                        var style: Laya.SpriteStyle = sprite["_style"];
                        var childs: any[] = sprite["_children"], n: number = childs.length, ele: any;
                        x = x - sprite.pivotX;
                        y = y - sprite.pivotY;
                        var textLastRender: boolean = sprite["_getBit"](Laya.Const.DRAWCALL_OPTIMIZE) && context.drawCallOptimize(true);
                        if (style.viewport) {
                            var rect: Laya.Rectangle = style.viewport;
                            var left: number = rect.x;
                            var top: number = rect.y;
                            var right: number = rect.right;
                            var bottom: number = rect.bottom;
                            var _x: number, _y: number;
                
                            for (i = 0; i < n; ++i) {
                                if ((ele = (<Laya.Sprite>childs[i]))["_visible"] && ((_x = ele._x) < right && (_x + ele.width) > left && (_y = ele._y) < bottom && (_y + ele.height) > top)) {
                                    ele.render(context, x, y);
                                }
                            }
                        } else {
                            if(sprite["_layerBatch"] && n>0){
                                this._layerWalk(sprite, context, x, y)
                            }else{
                                for (var i: number = 0; i < n; ++i)
                                    (ele = ((<Laya.Sprite>childs[i])))["_visible"] && ele.render(context, x, y);
                            }
                        }
                        textLastRender && context.drawCallOptimize(false);
                    },
                    enumerable:true,
                },
                /**按照层级进行遍历子对象 */
                _layerWalk:{
                    value:function(sprite:Laya.Sprite, context:Laya.Context, x:number, y:number){
                        let temp = sprite;
                        nodeIndex = 0;
                        layer = 0;
                        loopCount = 0;
                        while(temp && temp["_visible"]){
                            this._renderNotChildren(temp, context, x, y)
                            if(temp["_children"].length>1)break;
                            temp = temp["_children"][0]
                            x = x + temp["_x"] - sprite.pivotX;
                            y = y + temp["_y"] - sprite.pivotY;
                        }
                        let childs = temp["_children"]
                        for(let i=0; i<childs.length; i++){
                            if(childs[i]["_visible"]){
                                this._addLayaBatchNode(childs[i], nodeIndex, x, y)
                                nodeIndex ++;
                            }
                        }
                        nodeInfos.push(nodeIndex)
                        nodeInfos.push(0)
                        infoIndex = 2;
                        let len = 0;
                        while(loopCount<10000){
                            loopCount ++;
                            let find = false;
                            len = nodeInfos[infoIndex - 2]
                            let len2 = 0;
                            for(let i=len; i>0; i--){
                                let idx = nodeIndex-i;
                                let item = nodeStacks[idx];
                                let xpos = nodePositions[idx*2];
                                let ypos = nodePositions[idx*2+1];
                                if(layer == 0){
                                    this._renderNotChildren(item, context, xpos, ypos)
                                }
                                if(item["_children"].length>layer && item["_children"][layer]["_visible"]){
                                    this._addLayaBatchNode(item["_children"][layer], nodeIndex+len2, item["_x"]+xpos, item["_y"]+ypos)
                                    len2 ++;
                                    find = true;
                                }
                            }
                            if(find){
                                nodeIndex = nodeIndex + len2;
                                nodeInfos[infoIndex] = len2;
                                nodeInfos[infoIndex+1] = 0
                                infoIndex += 2;
                                layer = 0
                            }else{
                                nodeIndex = nodeIndex - len;
                                infoIndex -= 2;
                                if(infoIndex == 0)break;
                                if(infoIndex>1){
                                    nodeInfos[infoIndex-1] += 1
                                    layer = nodeInfos[infoIndex-1];
                                }
                            }
                        }
                        nodePositions.length = 0
                        nodeStacks.length = 0;
                        nodeInfos.length = 0;
                        infoIndex = 0;
                        nodeIndex = 0;
                    },
                    enumerable:true,
                },
                /**添加一个节点信息 */
                _addLayaBatchNode:{
                    value:function(node:Laya.Sprite, index:number, x:number, y:number){
                        nodeStacks[index] = node;
                        x = x - node.pivotX;
                        y = y - node.pivotY;
                        let renderType = node["_renderType"]
                        if(renderType & Laya.SpriteConst.CLIP){
                            var r: Laya.Rectangle = node["_style"].scrollRect;
                            if(r){
                                x = x - r.x;
                                y = y - r.y;
                            }
                        }
                        nodePositions[index*2] = x;
                        nodePositions[index*2+1] = y;
                    },
                    enumerable:true,
                },
                /**渲染一个对象， 去掉renderType中的Childs信息，只执行自身的渲染 */
                _renderNotChildren:{
                    value:function(child:Laya.Sprite, context:Laya.Context, x:number, y:number){
                        let oldRenderType = child["_renderType"];
                        let renderType = oldRenderType & removeChildrenTag;
                        child["_renderType"] = renderType;
                        Laya.RenderSprite["renders"][renderType]["_fun"](child, context, x+child["_x"], y+child["_y"] );
                        child["_renderType"] = oldRenderType;
                        child["_repaint"] = 0;
                    },
                    enumerable:true,
                }


            })

            //Sprite 扩展  加上layerBatch的属性
            let spritePrototype = Laya.Sprite.prototype;
            Object.defineProperties(spritePrototype, {
                layerBatch:{
                    set(value:boolean){
                       this["_layerBatch"] = value; 
                    },
                    get():boolean{
                        return this["_layerBatch"];
                    },
                    enumerable:true,
                }
            })

            //List 中 拓展 ，只对content内容进行layerBatch 否则如有scrollBar会有问题
            let listPrototype = Laya.List.prototype;
            Object.defineProperties(listPrototype, {
                layerBatch:{
                    set(value:boolean){
                       this.content.layerBatch = value; 
                    },
                    get():boolean{
                        return this.content.layerBatch;
                    },
                    enumerable:true,
                }
            })

        };



        


    }