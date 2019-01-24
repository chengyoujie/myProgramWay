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
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super.call(this) || this;
        // private _vec;
        _this._dp = 30;
        return _this;
    }
    Test.prototype.start = function () {
        var world = new b2.World(new b2.Vec2(0, 10), true);
        // var vec = new b2.Vec2(0, -5);
        this._world = world;
        //debug
        var sp = new egret.Sprite();
        this._sp = sp;
        this.addChild(sp);
        var debug = new b2.DebugDraw();
        debug.SetSprite(sp);
        debug.SetDrawScale(this._dp);
        debug.SetAlpha(0.5);
        debug.SetFillAlpha(0.8);
        debug.SetLineThickness(2);
        debug.SetFlags(b2.DebugDraw.e_shapeBit | b2.DebugDraw.e_jointBit);
        world.SetDebugDraw(debug);
        var _a = egret.sys.$TempStage, stageWidth = _a.stageWidth, stageHeight = _a.stageHeight;
        var wallw = 10;
        var space = 10;
        this.createBox(space, space, wallw, stageHeight, true);
        this.createBox(space, stageHeight - wallw - space, stageWidth, wallw, true);
        this.createBox(stageWidth - wallw - space, space, wallw, stageHeight, true);
        this.createBox(space, space, stageWidth, wallw, true);
        // this.createBox(20, 40, stageWidth, wallw, true);
        for (var i = 0; i < 6; i++) {
            this.createBox(Math.random() * stageWidth, Math.random() * 100 + 40, Math.random() * 30 + 30, Math.random() * 30 + 30);
        }
        var box1 = this.createBox(100, 100, 40, 40, true);
        var box2 = this.createBox(100, 200, 20, 20);
        var jointDef = new b2.RevoluteJointDef();
        jointDef.localAnchorA = box1.GetWorldCenter();
        jointDef.localAnchorB = box2.GetWorldCenter();
        jointDef.bodyA = box1;
        jointDef.bodyB = box2;
        var box3 = this.createBox(200, 150, 30, 30, true);
        var box4 = this.createBox(500, 150, 10, 10);
        var disJointDef = new b2.DistanceJointDef();
        disJointDef.localAnchorA = box3.GetWorldCenter();
        disJointDef.localAnchorB = box4.GetWorldCenter();
        disJointDef.bodyA = box3;
        disJointDef.bodyB = box4;
        var disJoint = world.CreateJoint(disJointDef);
        // var body = world.CreateBody(new b2.BodyDef());
        // body.GetWorldCenter();
        // jointDef.enableMotor = true;
        var joint = world.CreateJoint(jointDef);
        var bodys = world.GetBodyList();
        while (bodys) {
            console.log(bodys.GetType());
            bodys = bodys.GetNext();
        }
        // world.Step(1/60,10,10);
        // world.DrawDebugData();
        egret.sys.$TempStage.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
        egret.sys.$TempStage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleClick, this);
        console.log("the box2d world created");
    };
    Test.prototype.handleClick = function (e) {
        this._clickVec = new b2.Vec2(e.stageX / this._dp, e.stageY / this._dp);
        var aabb = new b2.AABB();
        aabb.lowerBound = new b2.Vec2(e.stageX / this._dp - 0.1, e.stageY / this._dp - 0.1);
        aabb.upperBound = new b2.Vec2(e.stageX / this._dp + 0.1, e.stageY / this._dp + 0.1);
        var that = this;
        this._world.QueryAABB(function (fixture) { return that.handleAABB(fixture); }, aabb);
    };
    Test.prototype.handleAABB = function (fixture) {
        if (fixture.GetBody().GetType() == b2.Body.b2_staticBody)
            return true;
        if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), this._clickVec)) {
            this._clickObj = fixture.GetBody();
            this._clickObj.SetAwake(true);
            return false;
        }
        return true;
    };
    Test.prototype.createBox = function (x, y, w, h, isStatic) {
        if (isStatic === void 0) { isStatic = false; }
        var b2def = new b2.BodyDef();
        b2def.position = new b2.Vec2(x / this._dp, y / this._dp);
        if (isStatic)
            b2def.type = b2.Body.b2_staticBody;
        else
            b2def.type = b2.Body.b2_dynamicBody;
        var body = this._world.CreateBody(b2def);
        var shape = new b2.PolygonShape();
        shape.SetAsBox(w / this._dp, h / this._dp);
        var fixtureDef = new b2.FixtureDef();
        fixtureDef.density = 5;
        fixtureDef.restitution = 0.3;
        fixtureDef.shape = shape;
        // body.SetMassData({mass:100, center:new b2.Vec2(w/2, h/2), I:0});
        body.CreateFixture(fixtureDef);
        return body;
    };
    Test.prototype.tick = function () {
        this._world.Step(1 / 60, 10, 10);
        this._world.DrawDebugData();
    };
    return Test;
}(egret.DisplayObjectContainer));
__reflect(Test.prototype, "Test");
//# sourceMappingURL=Test.js.map