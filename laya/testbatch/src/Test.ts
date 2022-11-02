import TestRender from "./TestRender";
import { ui } from "./ui/layaMaxUI";

export default class Test extends ui.TestUI{

    onAwake(): void {
        let s = this;
        s.list.itemRender = TestRender;
        s.list.layerBatch = true;
        s.list.vScrollBarSkin = "";
        s.checkOpenBatch.selected = s.list.layerBatch;
        s.checkOpenBatch.clickHandler = Laya.Handler.create(s, s.handleOpenOrCloseBatch, null, false)
        console.log("初始化")
    }

    private handleOpenOrCloseBatch(){
        let s = this;
        s.list.layerBatch =  s.checkOpenBatch.selected; 
    }

    onEnable(): void {
        let s = this;
        s.list.array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
        console.log("onEnable")
    }
}