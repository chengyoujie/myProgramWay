var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        console.log("test");
        _this.testBox2d();
        return _this;
    }
    Main.prototype.testBox2d = function () {
        //测试box2d世界
        // var box2d:Test = new Test();
        // this.addChild(box2d);
        // box2d.start()
        //测试box2d 小汽车
        var box2d = new TestCar();
        this.addChild(box2d);
        box2d.start();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map