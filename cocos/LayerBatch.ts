import { director, find, Node, Renderable2D, RenderData } from "cc";

declare module "cc"{
    export interface Node{
        /**
         * 扩展Node 增加属性:layerBatcher
         * 是否使用按层渲染 
         * 类似list等子对象一样的可以使用此属性减少drawCall
         */
        layerBatcher:boolean;
    }
}

/**打开对List的Batch操作 */
export function openListBatcher(){
    let batcher = director.root.batcher2D;
    if(!batcher){
        console.error("没有找到 batcher 不支持GList 的合批操作");
        return;
    }
    batcher.walk = walk.bind(batcher);
}

/**游戏中显示列表的遍历方式 */
const enum WalkType{
    /**默认的遍历方式  深度遍历 */
    Normal = 0,
    /**不遍历子对象 */
    NotCheckChild = 1,
}

function walk (this:any, node: any, level = 0, walkType = WalkType.Normal) {
    if (!node["activeInHierarchy"]) {
        return;
    }
    const children = node.children;
    const uiProps = node._uiProps;
    const render = uiProps.uiComp as Renderable2D;

    // Save opacity
    const parentOpacity = this._pOpacity;
    let opacity = parentOpacity;
    // TODO Always cascade ui property's local opacity before remove it
    const selfOpacity = render && render.color ? render.color.a / 255 : 1;
    this._pOpacity = opacity *= selfOpacity * uiProps.localOpacity;
    // TODO Set opacity to ui property's opacity before remove it
    // //@ts-expect-error temporary force set, will be removed with ui property's opacity
    uiProps._opacity = opacity;
    if (uiProps.colorDirty) {
        // Cascade color dirty state
        this._opacityDirty++;
    }

    // Render assembler update logic
    if (render && render.enabledInHierarchy) {
        render.updateAssembler(this);
    }

    // Update cascaded opacity to vertex buffer
    if (this._opacityDirty && render && render.renderData && render.renderData.vertexCount > 0) {
        // HARD COUPLING
        updateOpacity(render.renderData, opacity);
    }
///修改部分
    if(node.layerBatcher){//对list进行合批处理
        layerWalk(this, node, level);
    }else if(walkType == WalkType.NotCheckChild){
        //不做任何处理
    }else{
        if (children.length > 0 && !node._static) {
            for (let i = 0; i < children.length; ++i) {
                const child = children[i];
                this.walk(child, level);
            }
        }
    }
///////////修改部分结束
    if (uiProps.colorDirty) {
        // Reduce cascaded color dirty state
        this._opacityDirty--;
        // Reset color dirty
        uiProps.colorDirty = false;
    }
    // Restore opacity
    this._pOpacity = parentOpacity;
    // Post render assembler update logic
    // ATTENTION: Will also reset colorDirty inside postUpdateAssembler
    if (render && render.enabledInHierarchy) {
        render.postUpdateAssembler(this);
    }

    level += 1;
}

let layerNodes:Node[][] = [];       // 当前合批node的 [子对象][子对象的层级数组(从树结构的右侧深度遍历)]
let poolArray = [];                 //缓存池中的数组， 
let maxLayerDepth = 0;              //当前合批node的最大深度
let nodeChildLen = 0;               //当前合批的node的长度
let tempNode:Node[];                //临时存储
let idx1 = 0;                       //临时的循环变量
let idx2 = 0;                       //临时的循环变量

/**
 * 按照层来遍历列表 一层一层的遍历
 * @param s                         this对象
 * @param node                      当前要遍历的根节点  注意此节点没有做walk，只是其子节点walk了
 * @param level                     walk函数的level
 */
function layerWalk(s:any, node:Node,level:number){
    layerNodes.length = 0;
    // console.log("===== 开始walk: ROOT name: "+(node["_name"])+" ====")
    maxLayerDepth = 0;              //最大的层级深度
    nodeChildLen = node.children.length;
    for(idx1=0; idx1<nodeChildLen; idx1++){
        if(idx1>=poolArray.length)
            poolArray[idx1] = [];
        search(node.children[idx1], poolArray[idx1]);
        if(poolArray[idx1].length>maxLayerDepth)
            maxLayerDepth = poolArray[idx1].length;
        layerNodes.push(poolArray[idx1]);
    }
    for(idx1=maxLayerDepth-1; idx1>=0; idx1--){
        for(idx2=0; idx2<layerNodes.length; idx2++){
            tempNode = layerNodes[idx2];
            if(idx1>=tempNode.length)continue;
            // console.log("开始walk: "+idx1+"->"+idx2+"  name: "+(childNode[idx1]["_name"]))
            s.walk(tempNode[idx1], level, WalkType.NotCheckChild)
        }
    }
    tempNode = null;
    for(idx1=0; idx1<nodeChildLen; idx1++){
        poolArray[idx1].length = 0;
    }
}
/**
 * 将node节点下的子节点 从右向左按照深度遍历的方法存到 `stackNode` 数组中
 * @param node 
 * @param stackNode 
 */
function search(node:Node, stackNode:Node[]){
    for(let i=node.children.length-1; i>=0; i--){
        let child = node.children[i];
        stackNode.push(child);
        if(child.children.length>0){
            search(child, stackNode);
        }
    }
}


function updateOpacity (renderData: RenderData, opacity: number) {
    const vfmt = renderData.vertexFormat;
    // assertIsTrue(vfmt && (vfmt === vfmtPosColor || vfmt === vfmtPosUvColor));
    const vb = renderData.chunk.vb;
    const floatStride = renderData.floatStride;
    for (let offset = floatStride - 1; offset < vb.length; offset += floatStride) {
        vb[offset] = opacity;
    }
}