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
var TestCar = (function (_super) {
    __extends(TestCar, _super);
    function TestCar() {
        var _this = _super.call(this) || this;
        // private _debug:b2.DebugDraw;
        _this._scale = 30;
        return _this;
    }
    TestCar.prototype.start = function () {
        var gravity = new b2.Vec2(0, 10);
        this._wrold = new b2.World(gravity, true);
        this.initDebug();
        //create ground
        var groundSp = new b2.PolygonShape();
        groundSp.SetAsBox(600 / this._scale, 10 / this._scale);
        var groundFix = new b2.FixtureDef();
        groundFix.density = 0;
        groundFix.restitution = 0.3;
        groundFix.shape = groundSp;
        //create gournd body
        var bodydef = new b2.BodyDef();
        bodydef.position.Set(100 / this._scale, 800 / this._scale);
        var body = this._wrold.CreateBody(bodydef);
        body.CreateFixture(groundFix);
        //ground right 
        var groundrightSp = new b2.PolygonShape();
        groundSp.SetAsBox(10 / this._scale, 1200 / this._scale);
        var groundrightFix = new b2.FixtureDef();
        groundrightFix.density = 2;
        groundrightFix.restitution = 0.3;
        groundrightFix.shape = groundSp;
        var groundrightdef = new b2.BodyDef();
        groundrightdef.angle = 85 * Math.PI / 180;
        groundrightdef.position.Set(1300 / this._scale, 750 / this._scale);
        var groundrightbody = this._wrold.CreateBody(groundrightdef);
        groundrightbody.CreateFixture(groundrightFix);
        //ground left
        var groundleftsp = new b2.PolygonShape();
        groundleftsp.SetAsBox(10 / this._scale, 1200 / this._scale);
        var groundleftFix = new b2.FixtureDef();
        groundleftFix.density = 2;
        groundleftFix.restitution = 0.3;
        groundleftFix.shape = groundleftsp;
        var groundleftdef = new b2.BodyDef();
        groundleftdef.angle = -85 * Math.PI / 180;
        groundleftdef.position.Set(-700 / this._scale, 750 / this._scale);
        var groundleftbody = this._wrold.CreateBody(groundleftdef);
        groundleftbody.CreateFixture(groundleftFix);
        //create  car
        var carDef = new b2.BodyDef();
        carDef.position.Set(300 / this._scale, 520 / this._scale);
        carDef.type = b2.Body.b2_dynamicBody;
        //cartoprect
        // let cartoprectsp:b2.PolygonShape = new b2.PolygonShape();
        // cartoprectsp.SetAsOrientedBox(-40/this._scale, -40/this._scale, new b2.Vec2(-60/this._scale, -80/this._scale));
        // let cartoprectfix = new b2.FixtureDef();
        // cartoprectfix.density = 2;
        // cartoprectfix.restitution = 0.3;
        // cartoprectfix.filter.groupIndex = -1;
        // cartoprectfix.shape = cartoprectsp;
        //cartoptrangle
        // let cartoptranglesp:b2.PolygonShape = new b2.PolygonShape();
        // let vers = [];
        // vers.push(new b2.Vec2(-20/this._scale, -120/this._scale));
        // vers.push(new b2.Vec2(-20/this._scale, -40/this._scale));
        // vers.push(new b2.Vec2(120/this._scale, -40/this._scale))
        // cartoptranglesp.SetAsVector(vers, vers.length);
        // let cartoptranglefix:b2.FixtureDef = new b2.FixtureDef();
        // cartoptranglefix.density = 2;
        // cartoptranglefix.restitution = 0.3;
        // cartoptranglefix.filter.groupIndex = -1;
        // cartoptranglefix.shape = cartoptranglesp;
        //set sprite
        var sp = new eui.Image("res/car.png");
        this.addChild(sp);
        sp.anchorOffsetX = 188 / 2;
        sp.anchorOffsetY = 92 / 2;
        var frontwhellsp = new eui.Image("res/whell.png");
        this.addChild(frontwhellsp);
        frontwhellsp.anchorOffsetX = 65 / 2;
        frontwhellsp.anchorOffsetY = 65 / 2;
        var rearwhellsp = new eui.Image("res/whell.png");
        this.addChild(rearwhellsp);
        rearwhellsp.anchorOffsetX = 65 / 2;
        rearwhellsp.anchorOffsetY = 65 / 2;
        // carDef.userData = sp;
        //carbottom
        var carbottomrect = new b2.PolygonShape();
        carbottomrect.SetAsBox(95 / this._scale, 40 / this._scale);
        var carbottomfix = new b2.FixtureDef();
        carbottomfix.density = 2;
        carbottomfix.restitution = 0.3;
        carbottomfix.filter.groupIndex = -1;
        carbottomfix.shape = carbottomrect;
        //carbody
        var carbody = this._wrold.CreateBody(carDef);
        carbody.CreateFixture(carbottomfix);
        // carbody.CreateFixture(cartoprectfix);
        // carbody.CreateFixture(cartoptranglefix);
        carbody.SetUserData(sp);
        this._car = carbody;
        //axle front rear body
        var axlesp = new b2.PolygonShape();
        axlesp.SetAsBox(15 / this._scale, 15 / this._scale);
        //front
        var axlefrontfix = new b2.FixtureDef();
        axlefrontfix.density = 2;
        axlefrontfix.restitution = 0.5;
        axlefrontfix.filter.groupIndex = -1;
        axlefrontfix.shape = axlesp;
        var axleFrontDef = new b2.BodyDef();
        axleFrontDef.type = b2.Body.b2_dynamicBody;
        axleFrontDef.position.Set(carbody.GetWorldCenter().x + (46 / this._scale), carbody.GetWorldCenter().y + (40 / this._scale));
        axleFrontDef.userData = frontwhellsp;
        var axlefrontbody = this._wrold.CreateBody(axleFrontDef);
        axlefrontbody.CreateFixture(axlefrontfix);
        //rear
        var axlerearfix = new b2.FixtureDef();
        axlerearfix.density = 2;
        axlerearfix.restitution = 0.5;
        axlerearfix.filter.groupIndex = -1;
        axlerearfix.shape = axlesp;
        var axlerearbodydef = new b2.BodyDef();
        axlerearbodydef.position.Set(carbody.GetWorldCenter().x - (60 / this._scale), carbody.GetWorldCenter().y + (40 / this._scale));
        axlerearbodydef.type = b2.Body.b2_dynamicBody;
        axlerearbodydef.userData = rearwhellsp;
        var axlerearbody = this._wrold.CreateBody(axlerearbodydef);
        axlerearbody.CreateFixture(axlerearfix);
        //whell
        var whellsp = new b2.CircleShape(33 / this._scale);
        var whellfix = new b2.FixtureDef();
        whellfix.density = 2.6;
        whellfix.restitution = 0.5;
        whellfix.friction = 0.3;
        whellfix.shape = whellsp;
        whellfix.filter.groupIndex = -1;
        var frontwhelldef = new b2.BodyDef();
        frontwhelldef.position.Set(carbody.GetWorldCenter().x + (46 / this._scale), carbody.GetWorldCenter().y + (40 / this._scale));
        frontwhelldef.type = b2.Body.b2_dynamicBody;
        // frontwhelldef.userData = frontwhellsp;
        var frontwhellbody = this._wrold.CreateBody(frontwhelldef);
        frontwhellbody.CreateFixture(whellfix);
        var rearwhelldef = new b2.BodyDef();
        rearwhelldef.position.Set(carbody.GetWorldCenter().x - (60 / this._scale), carbody.GetWorldCenter().y + (40 / this._scale));
        rearwhelldef.type = b2.Body.b2_dynamicBody;
        // rearwhelldef.userData = rearwhellsp;
        var rearwhellbody = this._wrold.CreateBody(rearwhelldef);
        rearwhellbody.CreateFixture(whellfix);
        //disjoin
        var frontrevolutejoin = new b2.RevoluteJointDef();
        frontrevolutejoin.Initialize(axlefrontbody, frontwhellbody, frontwhellbody.GetWorldCenter());
        frontrevolutejoin.enableMotor = true;
        frontrevolutejoin.maxMotorTorque = 10;
        var rearrevolutejoin = new b2.RevoluteJointDef();
        rearrevolutejoin.Initialize(axlerearbody, rearwhellbody, rearwhellbody.GetWorldCenter());
        rearrevolutejoin.enableMotor = true;
        rearrevolutejoin.maxMotorTorque = 10;
        this.frontrevolute = this._wrold.CreateJoint(frontrevolutejoin);
        this.rearrevolute = this._wrold.CreateJoint(rearrevolutejoin);
        //
        var prismaticdef = new b2.PrismaticJointDef();
        prismaticdef.enableLimit = true;
        prismaticdef.enableMotor = true;
        prismaticdef.upperTranslation = 5 / this._scale;
        prismaticdef.lowerTranslation = -5 / this._scale;
        prismaticdef.Initialize(frontwhellbody, carbody, frontwhellbody.GetWorldCenter(), new b2.Vec2(0, 1));
        this.frontprismatic = this._wrold.CreateJoint(prismaticdef);
        prismaticdef.Initialize(rearwhellbody, carbody, rearwhellbody.GetWorldCenter(), new b2.Vec2(0, 1));
        this.rearprismatic = this._wrold.CreateJoint(prismaticdef);
        egret.sys.$TempStage.addEventListener(egret.Event.ENTER_FRAME, this.handleEnterFrame, this);
    };
    TestCar.prototype.initDebug = function () {
        // var sp = new egret.Sprite();
        // this.addChild(sp);
        var debug = new b2.DebugDraw();
        // debug.SetAlpha(0.5);
        // debug.SetSprite(sp);
        debug.SetSprite(this);
        debug.SetFillAlpha(0.5);
        debug.SetDrawScale(this._scale);
        debug.SetFlags(b2.DebugDraw.e_shapeBit | b2.DebugDraw.e_jointBit); //
        // debug.DrawPolygon()
        this._wrold.SetDebugDraw(debug);
    };
    TestCar.prototype.handleEnterFrame = function () {
        this._wrold.Step(1 / 60, 10, 10);
        this._wrold.DrawDebugData();
        var car = this._car.GetUserData();
        if (car.y < 770) {
            this.frontrevolute.SetMotorSpeed(0);
            this.rearrevolute.SetMotorSpeed(0);
            this.rearprismatic.SetMaxMotorForce(0);
            this.rearprismatic.SetMotorSpeed(0);
        }
        else {
            this.frontrevolute.SetMotorSpeed(100);
            this.rearrevolute.SetMotorSpeed(100);
            this.rearprismatic.SetMaxMotorForce(50);
            this.rearprismatic.SetMotorSpeed(50);
        }
        // this.frontprismatic.SetMaxMotorForce(100);
        // this.frontprismatic.SetMotorSpeed(100);
        // this.rearprismatic.SetMaxMotorForce(100);
        // this.rearprismatic.SetMotorSpeed(100);
        for (var b = this._wrold.GetBodyList(); b != undefined; b = b.GetNext()) {
            var sp = b.GetUserData();
            if (sp) {
                sp.x = b.GetPosition().x * this._scale;
                sp.y = b.GetPosition().y * this._scale;
                sp.rotation = b.GetAngle() * 180 / Math.PI;
            }
        }
        this.x = -this._car.GetPosition().x * this._scale + 300;
        this._wrold.ClearForces();
    };
    return TestCar;
}(egret.Sprite));
__reflect(TestCar.prototype, "TestCar");
//# sourceMappingURL=TestCar.js.map