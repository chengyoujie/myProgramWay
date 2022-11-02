import { ui } from "./ui/layaMaxUI";

export default class TestRender extends ui.TestRenderUI{

    onEnable(): void {
        let s = this;
        s.txtName.text = "测试:"+s.name
        s.clip.index = Math.floor(Math.random()*10);
    }
}