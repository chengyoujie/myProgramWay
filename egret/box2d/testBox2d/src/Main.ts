

class Main extends egret.DisplayObjectContainer{

    constructor() {
        super();
        console.log("test");
        this.testBox2d();
    }

    testBox2d()
    {
        //测试box2d世界
        // var box2d:Test = new Test();
        // this.addChild(box2d);
        // box2d.start()


        //测试box2d 小汽车
        var box2d:TestCar = new TestCar();
        this.addChild(box2d);
        box2d.start()
    }

}  