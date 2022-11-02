(function () {
    'use strict';

    var View = Laya.View;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class TestUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(TestUI.uiView);
            }
        }
        TestUI.uiView = { "type": "View", "props": { "width": 640, "runtime": "Test.ts", "height": 1136 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 102, "x": 69, "width": 524, "skin": "comp/img_bg.png", "sizeGrid": "60,22,16,15", "height": 663 }, "compId": 5 }, { "type": "List", "props": { "y": 157, "x": 74, "width": 516, "var": "list", "repeatX": 1, "height": 593 }, "compId": 4 }, { "type": "CheckBox", "props": { "y": 23, "x": 292, "var": "checkOpenBatch", "skin": "comp/checkbox.png", "labelSize": 26, "labelPadding": "20", "labelColors": "#FF0000,#FFFF00,#00FF00", "label": "是否开启合批" }, "compId": 8 }], "loadList": ["comp/img_bg.png", "comp/checkbox.png"], "loadList3D": [] };
        ui.TestUI = TestUI;
        REG("ui.TestUI", TestUI);
        class TestRenderUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(TestRenderUI.uiView);
            }
        }
        TestRenderUI.uiView = { "type": "View", "props": { "width": 516, "height": 50 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 1, "x": 194, "var": "btn", "skin": "comp/button.png", "labelStrokeColor": "#000000", "labelStroke": 2, "labelSize": 20, "labelColors": "#00FF00", "label": "按钮" }, "compId": 3 }, { "type": "Text", "props": { "y": 14, "x": 0, "width": 171, "var": "txtName", "text": "测试文本", "fontSize": 22, "color": "#d600ff", "runtime": "Laya.Text" }, "compId": 4 }, { "type": "Clip", "props": { "y": -7, "x": 490, "var": "clip", "skin": "comp/clip_num.png", "clipX": 10 }, "compId": 5 }], "loadList": ["comp/button.png", "comp/clip_num.png"], "loadList3D": [] };
        ui.TestRenderUI = TestRenderUI;
        REG("ui.TestRenderUI", TestRenderUI);
    })(ui || (ui = {}));

    class TestRender extends ui.TestRenderUI {
        onEnable() {
            let s = this;
            s.txtName.text = "测试:" + s.name;
            s.clip.index = Math.floor(Math.random() * 10);
        }
    }

    class Test extends ui.TestUI {
        onAwake() {
            let s = this;
            s.list.itemRender = TestRender;
            s.list.layerBatch = true;
            s.list.vScrollBarSkin = "";
            s.checkOpenBatch.selected = s.list.layerBatch;
            s.checkOpenBatch.clickHandler = Laya.Handler.create(s, s.handleOpenOrCloseBatch, null, false);
            console.log("初始化");
        }
        handleOpenOrCloseBatch() {
            let s = this;
            s.list.layerBatch = s.checkOpenBatch.selected;
        }
        onEnable() {
            let s = this;
            s.list.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            console.log("onEnable");
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Test.ts", Test);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedheight";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Test.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class RenderSprite {
        static extend() {
            let nodePrototype = Laya.RenderSprite.prototype;
            let nodeStacks = [];
            let nodeInfos = [];
            let nodePositions = [];
            let nodeIndex = 0;
            let infoIndex = 0;
            let layer = 0;
            let loopCount = 0;
            let removeChildrenTag = ~Laya.SpriteConst.CHILDS;
            Object.defineProperties(nodePrototype, {
                _children: {
                    value: function (sprite, context, x, y) {
                        var style = sprite["_style"];
                        var childs = sprite["_children"], n = childs.length, ele;
                        x = x - sprite.pivotX;
                        y = y - sprite.pivotY;
                        var textLastRender = sprite["_getBit"](Laya.Const.DRAWCALL_OPTIMIZE) && context.drawCallOptimize(true);
                        if (style.viewport) {
                            var rect = style.viewport;
                            var left = rect.x;
                            var top = rect.y;
                            var right = rect.right;
                            var bottom = rect.bottom;
                            var _x, _y;
                            for (i = 0; i < n; ++i) {
                                if ((ele = childs[i])["_visible"] && ((_x = ele._x) < right && (_x + ele.width) > left && (_y = ele._y) < bottom && (_y + ele.height) > top)) {
                                    ele.render(context, x, y);
                                }
                            }
                        }
                        else {
                            if (sprite["_layerBatch"] && n > 0) {
                                this._layerWalk(sprite, context, x, y);
                            }
                            else {
                                for (var i = 0; i < n; ++i)
                                    (ele = childs[i])["_visible"] && ele.render(context, x, y);
                            }
                        }
                        textLastRender && context.drawCallOptimize(false);
                    },
                    enumerable: true,
                },
                _layerWalk: {
                    value: function (sprite, context, x, y) {
                        let temp = sprite;
                        nodeIndex = 0;
                        layer = 0;
                        loopCount = 0;
                        while (temp && temp["_visible"]) {
                            this._renderNotChildren(temp, context, x, y);
                            if (temp["_children"].length > 1)
                                break;
                            temp = temp["_children"][0];
                            x = x + temp["_x"] - sprite.pivotX;
                            y = y + temp["_y"] - sprite.pivotY;
                        }
                        let childs = temp["_children"];
                        for (let i = 0; i < childs.length; i++) {
                            if (childs[i]["_visible"]) {
                                this._addLayaBatchNode(childs[i], nodeIndex, x, y);
                                nodeIndex++;
                            }
                        }
                        nodeInfos.push(nodeIndex);
                        nodeInfos.push(0);
                        infoIndex = 2;
                        let len = 0;
                        while (loopCount < 10000) {
                            loopCount++;
                            let find = false;
                            len = nodeInfos[infoIndex - 2];
                            let len2 = 0;
                            for (let i = len; i > 0; i--) {
                                let idx = nodeIndex - i;
                                let item = nodeStacks[idx];
                                let xpos = nodePositions[idx * 2];
                                let ypos = nodePositions[idx * 2 + 1];
                                if (layer == 0) {
                                    this._renderNotChildren(item, context, xpos, ypos);
                                }
                                if (item["_children"].length > layer && item["_children"][layer]["_visible"]) {
                                    this._addLayaBatchNode(item["_children"][layer], nodeIndex + len2, item["_x"] + xpos, item["_y"] + ypos);
                                    len2++;
                                    find = true;
                                }
                            }
                            if (find) {
                                nodeIndex = nodeIndex + len2;
                                nodeInfos[infoIndex] = len2;
                                nodeInfos[infoIndex + 1] = 0;
                                infoIndex += 2;
                                layer = 0;
                            }
                            else {
                                nodeIndex = nodeIndex - len;
                                infoIndex -= 2;
                                if (infoIndex == 0)
                                    break;
                                if (infoIndex > 1) {
                                    nodeInfos[infoIndex - 1] += 1;
                                    layer = nodeInfos[infoIndex - 1];
                                }
                            }
                        }
                        nodePositions.length = 0;
                        nodeStacks.length = 0;
                        nodeInfos.length = 0;
                        infoIndex = 0;
                        nodeIndex = 0;
                    },
                    enumerable: true,
                },
                _addLayaBatchNode: {
                    value: function (node, index, x, y) {
                        nodeStacks[index] = node;
                        x = x - node.pivotX;
                        y = y - node.pivotY;
                        let renderType = node["_renderType"];
                        if (renderType & Laya.SpriteConst.CLIP) {
                            var r = node["_style"].scrollRect;
                            if (r) {
                                x = x - r.x;
                                y = y - r.y;
                            }
                        }
                        nodePositions[index * 2] = x;
                        nodePositions[index * 2 + 1] = y;
                    },
                    enumerable: true,
                },
                _renderNotChildren: {
                    value: function (child, context, x, y) {
                        let oldRenderType = child["_renderType"];
                        let renderType = oldRenderType & removeChildrenTag;
                        child["_renderType"] = renderType;
                        Laya.RenderSprite["renders"][renderType]["_fun"](child, context, x + child["_x"], y + child["_y"]);
                        child["_renderType"] = oldRenderType;
                        child["_repaint"] = 0;
                    },
                    enumerable: true,
                }
            });
            let spritePrototype = Laya.Sprite.prototype;
            Object.defineProperties(spritePrototype, {
                layerBatch: {
                    set(value) {
                        this["_layerBatch"] = value;
                    },
                    get() {
                        return this["_layerBatch"];
                    },
                    enumerable: true,
                }
            });
            let listPrototype = Laya.List.prototype;
            Object.defineProperties(listPrototype, {
                layerBatch: {
                    set(value) {
                        this.content.layerBatch = value;
                    },
                    get() {
                        return this.content.layerBatch;
                    },
                    enumerable: true,
                }
            });
        }
        ;
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            RenderSprite.extend();
            Laya.stage.addChild(new Test());
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
