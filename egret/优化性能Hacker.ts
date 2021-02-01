/**
 * 所有hack类
* Created by sunxinzhe
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
namespace hortor {
    const finish = eui.sys.TouchScroll.prototype["finish"];
    eui.sys.TouchScroll.prototype["finish"] = function (currentScrollPos: number, maxScrollPos: number): void {
        let CURRENT_VELOCITY_WEIGHT = 2.33;
        let VELOCITY_WEIGHTS: number[] = [1, 1.33, 1.66, 2];
        let MINIMUM_VELOCITY = 0.02;
        let FRICTION = this["FRICTION"] || 0.993;
        let EXTRA_FRICTION = 0.95;
        let FRICTION_LOG = Math.log(FRICTION);
        egret.stopTick(this.onTick, this);
        this.started = false;
        let sum = this.velocity * CURRENT_VELOCITY_WEIGHT;
        let previousVelocityX = this.previousVelocity;
        let length = previousVelocityX.length;
        let totalWeight = CURRENT_VELOCITY_WEIGHT;
        for (let i = 0; i < length; i++) {
            let weight = VELOCITY_WEIGHTS[i];
            sum += previousVelocityX[0] * weight;
            totalWeight += weight;
        }

        let pixelsPerMS = sum / totalWeight;
        let absPixelsPerMS = Math.abs(pixelsPerMS);
        let duration = 0;
        let posTo = 0;
        if (absPixelsPerMS > MINIMUM_VELOCITY) {
            posTo = currentScrollPos + (pixelsPerMS - MINIMUM_VELOCITY) / FRICTION_LOG * 2 * this.$scrollFactor;
            if (posTo < 0 || posTo > maxScrollPos) {
                posTo = currentScrollPos;
                while (Math.abs(pixelsPerMS) > MINIMUM_VELOCITY) {
                    posTo -= pixelsPerMS;
                    if (posTo < 0 || posTo > maxScrollPos) {
                        pixelsPerMS *= FRICTION * EXTRA_FRICTION;
                    }
                    else {
                        pixelsPerMS *= FRICTION;
                    }
                    duration++;
                }
            }
            else {
                duration = Math.log(MINIMUM_VELOCITY / absPixelsPerMS) / FRICTION_LOG;
            }
        }
        else {
            posTo = currentScrollPos;
        }
        if (this.target["$getThrowInfo"]) {
            let event: eui.ScrollerThrowEvent = this.target["$getThrowInfo"](currentScrollPos, posTo);
            posTo = event.toPos;
        }
        if (duration > 0) {
            //如果取消了回弹,保证动画之后不会超出边界
            if (!this.$bounces) {
                if (posTo < 0) {
                    posTo = 0;
                }
                else if (posTo > maxScrollPos) {
                    posTo = maxScrollPos;
                }
            }
            this.throwTo(posTo, duration);
        }
        else {
            this.finishScrolling();
        }
    }

    const normalDrawImage = egret.sys.NormalBitmapNode.prototype["drawImage"];
    egret.sys.NormalBitmapNode.prototype["drawImage"] = function (sourceX: number, sourceY: number, sourceW: number, sourceH: number,
        drawX: number, drawY: number, drawW: number, drawH: number) {
        if (this.image["sx"] || this.image["sy"]) {
            let sx = this.image["sx"] || 1;
            let sy = this.image["sy"] || 1;
            sourceX *= sx;
            sourceY *= sy;
            sourceW *= sx;
            sourceH *= sy;
        }
        normalDrawImage.apply(this, arguments);
    }

    const drawImage = egret.sys.BitmapNode.prototype["drawImage"];
    egret.sys.BitmapNode.prototype["drawImage"] = function (sourceX: number, sourceY: number, sourceW: number, sourceH: number,
        drawX: number, drawY: number, drawW: number, drawH: number) {
        if (this.image["sx"] || this.image["sy"]) {
            let sx = this.image["sx"] || 1;
            let sy = this.image["sy"] || 1;
            sourceX *= sx;
            sourceY *= sy;
            sourceW *= sx;
            sourceH *= sy;
        }
        drawImage.apply(this, arguments);
    }

    //hack滚动容器，优化滚动时hittest消耗
    const onTouchBegin = eui.Scroller.prototype["onTouchBegin"];
    eui.Scroller.prototype["onTouchBegin"] = function (event: egret.TouchEvent) {
        this.stage["touchIgnore"] = false;
        onTouchBegin.apply(this, arguments);
    }

    const onTouchMove = eui.Scroller.prototype["onTouchMove"];
    eui.Scroller.prototype["onTouchMove"] = function (event: egret.TouchEvent) {
        if (this.$Scroller[5] && this["isStageIgnore"] !== false) {
            this.stage["touchIgnore"] = true;
        }
        if (!this["touchCount"] || this["touchCount"] < 2) {
            onTouchMove.apply(this, arguments);
        }
    }

    const onTouchEnd = eui.Scroller.prototype["onTouchEnd"];
    eui.Scroller.prototype["onTouchEnd"] = function (event: egret.TouchEvent) {
        this.stage["touchIgnore"] = false;
        if (!this["touchCount"] || this["touchCount"] < 2) {
            onTouchEnd.apply(this, arguments);
        }
    }

    //hack 减少点击遍历
    const $containerHitTest = egret.DisplayObjectContainer.prototype["$hitTest"];
    egret.DisplayObjectContainer.prototype["$hitTest"] = function (stageX: number, stageY: number): egret.DisplayObject {
        if (this["touchIgnore"] === true) {
            return null;
        }
        return $containerHitTest.apply(this, arguments);
    }

    const $spriteHitTest = egret.Sprite.prototype["$hitTest"];
    egret.Sprite.prototype["$hitTest"] = function (stageX: number, stageY: number): egret.DisplayObject {
        if (this["touchIgnore"] === true) {
            return null;
        }
        return $spriteHitTest.apply(this, arguments);
    }

    //hack已监听皮肤加载失败
    const getTheme = eui["getTheme"];
    eui["getTheme"] = function (source: string, callback: (content: any) => void) {
        let adapter: eui.IThemeAdapter = egret.getImplementation("eui.IThemeAdapter");
        if (!adapter) {
            adapter = new eui.DefaultThemeAdapter();
        }
        adapter.getTheme(source, (data) => {
            callback(data);
        }, (e) => {
            callback(null);
        }, this);
    }

    //hack加载错误重试，用备份cdn加载
    const loadResource = RES.ResourceLoader.prototype["loadResource"];
    RES.ResourceLoader.prototype["loadResource"] = function (r: RES.ResourceInfo, p?: RES.processor.Processor): any {
        if (r.root && r.root != ResourceManager.resourceRoot) {
            let oldUrl = r.root + r.name;
            let newUrl = ResourceManager.resourceRoot + r.name;
            let promise = this.promiseHash[oldUrl];
            let dispatcher = this.dispatcherDic[oldUrl];
            delete this.promiseHash[oldUrl];
            delete this.dispatcherDic[oldUrl];
            r.root = ResourceManager.resourceRoot;
            promise && (this.promiseHash[newUrl] = promise);
            dispatcher && (this.dispatcherDic[newUrl] = dispatcher);
        }
        let watch = !p;
        let isHeadRes = ResourceManager.isHeadRes(r.url);
        var promise = loadResource.apply(this, arguments);

        if (watch) {
            promise.then(response => {
                if (!isHeadRes && this.retryTimesDic[r.name] && this.retryTimesDic[r.name] > 1) {
                    let url = VersionManager.getResUrlByVersion(r.root + r.url, r.root);
                    hortor.Log.log("retrySuc", url);
                    NotificationManager.dispatch("ResLoadChange", "resRetrySuc", url, { errMsg: "" });
                }
            }).catch((error) => {
                if (!this.retryTimesDic[r.name]) {
                    if (isHeadRes) {//头像不重试,浪费表情
                        this.retryTimesDic[r.name] = this.maxRetryTimes + 1;
                    } else {
                        let url = VersionManager.getResUrlByVersion(r.root + r.url, r.root);
                        hortor.Log.error("loadFail", url);
                        NotificationManager.dispatch("ResLoadChange", "resLoadFail", url, error);
                        if (r.root && r.root == ResourceManager.resourceRoot) {
                            ResourceManager.switchResRoot();
                        }
                    }
                } else if (this.retryTimesDic[r.name] > 1) {
                    let url = VersionManager.getResUrlByVersion(r.root + r.url, r.root);
                    hortor.Log.error("retryFail", url);
                    NotificationManager.dispatch("ResLoadChange", "resRetryFail", url, error);
                }
            })
        }
        return promise;
    }

    //资源自动释放的图片类Hack
    const $onAddToStage = eui.Image.prototype["$onAddToStage"];
    eui.Image.prototype.$onAddToStage = function (stage: egret.Stage, nestLevel: number) {
        $onAddToStage.apply(this, arguments);
        let instance: eui.Image = this;
        if (instance.texture) {
            ResourceManager.useRes(instance.texture.bitmapData.hashCode, instance.hashCode);
        } else if (this.$UIComponent[eui.sys.UIKeys.initialized]) {
            this.parseSource();
        }
    }

    const $onRemoveFromStage = eui.Image.prototype["$onRemoveFromStage"];
    eui.Image.prototype.$onRemoveFromStage = function (): void {
        $onRemoveFromStage.apply(this);
        let instance: eui.Image = this;
        if (instance.texture) {
            ResourceManager.unloadRes(instance.texture.bitmapData.hashCode, instance.hashCode);
        }
    }

    const $setTexture = eui.Image.prototype["$setTexture"];
    eui.Image.prototype.$setTexture = function (value: egret.Texture) {
        let instance: eui.Image = this;
        if (instance.stage && instance.texture) {
            ResourceManager.unloadRes(instance.texture.bitmapData.hashCode, instance.hashCode);
        }
        var result = $setTexture.apply(this, arguments);
        if (instance.stage && instance.texture) {
            ResourceManager.useRes(instance.texture.bitmapData.hashCode, instance.hashCode);
        }
        return result;
    }

    //list动效 hack
    const updateRenderer = eui.List.prototype["updateRenderer"];
    eui.List.prototype.updateRenderer = function (renderer: eui.IItemRenderer, itemIndex: number, data: any): eui.IItemRenderer {
        renderer["hasEffect"] = this.dataChange;
        return updateRenderer.apply(this, arguments);
    }

    const commitProperties = eui.List.prototype["commitProperties"];
    eui.List.prototype["commitProperties"] = function (): void {
        this.dataChange = this.$dataProviderChanged;
        commitProperties.apply(this);
    }

    const validateDisplayList = eui.List.prototype["validateDisplayList"];
    eui.List.prototype["validateDisplayList"] = function (): void {
        validateDisplayList.apply(this);
        this.dataChange = false;
    }

    const dataChanged = eui.ItemRenderer.prototype["dataChanged"];
    eui.ItemRenderer.prototype["dataChanged"] = function (): void {
        dataChanged.apply(this);
        if (this["hasEffect"] && this["effect"]) {
            this["effect"].start(this, this.itemIndex);
        }
    }

    //兼容ipad适配
    const initTo = egret.TouchEvent.prototype["$initTo"];
    egret.TouchEvent.prototype["$initTo"] = function (stageX: number, stageY: number, touchPointID: number): void {
        if (StageManager.stageWidthOffset > 0) {
            stageX -= StageManager.stageWidthOffset;
        }
        initTo.apply(this, arguments);
    }

    const globalToLocal = egret.DisplayObject.prototype["globalToLocal"];
    egret.DisplayObject.prototype["globalToLocal"] = function (localX: number = 0, localY: number = 0, resultPoint?: egret.Point): egret.Point {
        if (StageManager.stageWidthOffset > 0 && !isFindTarget) {
            localX += StageManager.stageWidthOffset;
        }
        return globalToLocal.apply(this, arguments);;
    }

    const localToGlobal = egret.DisplayObject.prototype["localToGlobal"];
    egret.DisplayObject.prototype["localToGlobal"] = function (localX: number = 0, localY: number = 0, resultPoint?: egret.Point): egret.Point {
        let p = localToGlobal.apply(this, arguments);
        if (StageManager.stageWidthOffset > 0) {
            p.x -= StageManager.stageWidthOffset;
        }
        return p;
    }

    const hitTestPoint = egret.DisplayObject.prototype["hitTestPoint"];
    egret.DisplayObject.prototype["hitTestPoint"] = function (x: number, y: number, shapeFlag?: boolean): boolean {
        if (StageManager.stageWidthOffset > 0) {
            x += StageManager.stageWidthOffset;
        }
        return hitTestPoint.apply(this, arguments);
    }

    let isFindTarget = false;
    var findTarget = egret.sys.TouchHandler.prototype["findTarget"];
    egret.sys.TouchHandler.prototype["findTarget"] = function (stageX, stageY) {
        let target;
        if (hortor.StageManager.stageWidthOffset > 0) {
            if (stageX < hortor.StageManager.stageWidthOffset || stageX > hortor.StageManager.stageWidth + hortor.StageManager.stageWidthOffset) {
                target = null;
            } else {
                isFindTarget = true;
                target = StageManager.root.$hitTest(stageX, stageY);
                isFindTarget = false;
            }
        } else {
            target = this.stage.$hitTest(stageX, stageY);
        }
        if (!target) {
            target = this.stage;
        }
        return target;
    };

    //针对ios12.2输入框会停止渲染的bug修复
    export let isTextInputShow = false;
    export function fixInputBug(): void {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            const show = egret.StageText.prototype.$show;   
            egret.StageText.prototype.$show = function () {
                show.apply(this, arguments);
                isTextInputShow = true;
            }

            const hide = egret.StageText.prototype.$hide;
            egret.StageText.prototype.$hide = function () {
                hide.apply(this, arguments);
                isTextInputShow = false;
            }
        }
    }

    //针对list合批hack
    export function autoBatch(): void {
        if (egret.Capabilities.renderMode == "webgl" && (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME)) {
            eui.ListBase.prototype["autoBatch"] = true;
            let batchArray = [];
            let batching = false;
            const render: any = egret.sys.systemRenderer;
            const drawDisplayObject = render.drawDisplayObject;
            render.drawDisplayObject = function (displayObject: egret.DisplayObject, buffer: any, offsetX: number, offsetY: number, isStage?: boolean): number {
                if (!displayObject) return 0;
                if (displayObject["autoBatch"] === true && batching === false) {
                    return this.drawBatchNode(displayObject, buffer, offsetX, offsetY);
                }
                return drawDisplayObject.apply(this, arguments);
            }

            render.drawBatchNode = function (displayObject: egret.DisplayObject, buffer: any, offsetX: number, offsetY: number): number {
                batching = true;
                let nodes = displayObject.$children;
                if (nodes) {
                    let length = nodes.length;
                    for (let i = 0; i < length; i++) {
                        let node = nodes[i];
                        if (node.$renderMode != egret.RenderMode.NONE) {
                            let index = -1;
                            let children = node.$children;
                            let nodeOffsetX = offsetX + node.$x - node.$anchorOffsetX;
                            let nodeOffsetY = offsetY + node.$y - node.$anchorOffsetY;
                            if (children) {
                                let length = children.length;
                                for (let i = 0; i < length; i++) {
                                    let child = children[i];
                                    if (child.$renderMode != egret.RenderMode.NONE) {
                                        index++;
                                        if (!batchArray[index]) {
                                            batchArray[index] = [];
                                        }
                                        batchArray[index].push(child, nodeOffsetX, nodeOffsetY);
                                    }
                                }
                            }
                        }
                    }
                }
                let drawCalls = 0;
                if (batchArray.length) {
                    for (let i = 0; i < batchArray.length; ++i) {
                        let childArray = batchArray[i];
                        let childCount = childArray.length / 3;
                        for (let j = 0; j < childCount; ++j) {
                            let index = j * 3;
                            let child = childArray[index++];
                            let nodeOffsetX = childArray[index++];
                            let nodeOffsetY = childArray[index];
                            drawCalls += this.drawDisplayChild.call(this, child, buffer, nodeOffsetX, nodeOffsetY);
                        }
                    }
                    batchArray.length = 0;
                }
                batching = false;
                return drawCalls;
            }

            render.drawDisplayChild = function (child: egret.DisplayObject, buffer: any, offsetX: number, offsetY: number): number {
                let drawCalls = 0;
                let offsetX2;
                let offsetY2;
                let tempAlpha;
                if (child.$alpha != 1) {
                    tempAlpha = buffer.globalAlpha;
                    buffer.globalAlpha *= child.$alpha;
                }
                let savedMatrix: egret.Matrix;
                if (child.$useTranslate) {
                    let m = child.$getMatrix();
                    offsetX2 = offsetX + child.$x;
                    offsetY2 = offsetY + child.$y;
                    let m2 = buffer.globalMatrix;
                    savedMatrix = egret.Matrix.create();
                    savedMatrix.a = m2.a;
                    savedMatrix.b = m2.b;
                    savedMatrix.c = m2.c;
                    savedMatrix.d = m2.d;
                    savedMatrix.tx = m2.tx;
                    savedMatrix.ty = m2.ty;
                    buffer.transform(m.a, m.b, m.c, m.d, offsetX2, offsetY2);
                    offsetX2 = -child.$anchorOffsetX;
                    offsetY2 = -child.$anchorOffsetY;
                }
                else {
                    offsetX2 = offsetX + child.$x - child.$anchorOffsetX;
                    offsetY2 = offsetY + child.$y - child.$anchorOffsetY;
                }
                switch (child.$renderMode) {
                    case egret.RenderMode.NONE:
                        break;
                    case egret.RenderMode.FILTER:
                        drawCalls += this.drawWithFilter(child, buffer, offsetX2, offsetY2);
                        break;
                    case egret.RenderMode.CLIP:
                        drawCalls += this.drawWithClip(child, buffer, offsetX2, offsetY2);
                        break;
                    case egret.RenderMode.SCROLLRECT:
                        drawCalls += this.drawWithScrollRect(child, buffer, offsetX2, offsetY2);
                        break;
                    default:
                        drawCalls += this.drawDisplayObject(child, buffer, offsetX2, offsetY2);
                        break;
                }
                if (tempAlpha) {
                    buffer.globalAlpha = tempAlpha;
                }
                if (savedMatrix) {
                    let m = buffer.globalMatrix;
                    m.a = savedMatrix.a;
                    m.b = savedMatrix.b;
                    m.c = savedMatrix.c;
                    m.d = savedMatrix.d;
                    m.tx = savedMatrix.tx;
                    m.ty = savedMatrix.ty;
                    egret.Matrix.release(savedMatrix);
                }
                return drawCalls;
            }

        }
    }

    // //针对iOS14 Web性能问题的hack:
    // const isIOS14Web = egret.Capabilities.renderMode == "webgl" && (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) && /iPhone OS 14/.test(window.navigator.userAgent);
    // egret["isISO14"] = isIOS14Web;

    const BtnSetupAfterAdd = fgui.GButton.prototype["setup_afterAdd"];
    fgui.GButton.prototype.setup_afterAdd = function (buffer, beginPos) {
        BtnSetupAfterAdd.apply(this, arguments);
        let customData = this.baseUserData;
        if (customData) {
            const pList = ('' + customData).split(';');
            const iconObj = this.getChild("icon") as game.ExtGLoader;
            pList.forEach(s => {
                let [k, v] = s.trim().split('=');
                switch (k) {
                    case 'stroke': {
                        if (iconObj) {
                            iconObj.stroke = parseInt(v);
                        }
                    } break;
                    case 'strokecolor': {
                        if (iconObj) {
                        let va = "0x" + v.replace("#", "");
                            iconObj.strokeColor = parseInt(va);
                        }
                    } break;
                    case 'shadow': {
                        if (iconObj) {
                            iconObj.shadow = parseInt(v);
                        }
                    } break;
                    case 'shadowcolor': {
                        if (iconObj) {
                            let va = "0x" + v.replace("#", "");
                            iconObj.shadowColor = parseInt(va);
                        }
                    } break;
                    case 'effect': {
                        egret.setTimeout(() => {
                            game.FuiUtil.AddBtnEffect(this);
                        }, this, 100);
                    }
                }
            })
        }
    }

    const TextfieldBitmapFnt = fgui.GTextField.prototype["renderWithBitmapFont"];
    fgui.GTextField.prototype["renderWithBitmapFont"] = function (updateBounds) {
        const textFiled = this as fgui.GTextField;
        TextfieldBitmapFnt.apply(this, arguments);
        if (textFiled.stroke > 0) {
            const container = this["_bitmapContainer"] as egret.Sprite;
            if (container) {
                const filters = container["_addFilters"] || {};
                if (!filters["strokeFilter"]) {
                    let filter = filters["strokeFilter"] = new egret.GlowFilter(textFiled.strokeColor, 1, textFiled.stroke, textFiled.stroke, 5);
                    container.filters = [filter];
                }
            }
        }
    }

    const TextfieldHandleXYChange = fgui.GTextField.prototype["handleXYChanged"];
    fgui.GTextField.prototype["handleXYChanged"] = function () {
        TextfieldHandleXYChange.apply(this);
        const textFiled = this as fgui.GTextField;
        if (this['_beforeAddCalled'] && !this["_bitmapContainer"] && textFiled.verticalAlign != fgui.VertAlignType.Middle) {
            egret.callLater(() => {
                this._displayObject.y += 5;
            }, this);
        }
    }

    const TextFieldSetupBeforeAdd = fgui.GTextField.prototype.setup_beforeAdd;
    fgui.GTextField.prototype.setup_beforeAdd = function (buffer, beginPos) {
        TextFieldSetupBeforeAdd.apply(this, arguments);
        this['_beforeAddCalled'] = true;
    }

    const TextFieldSetupAfterAdd = fgui.GTextField.prototype.setup_afterAdd;
    fgui.GTextField.prototype.setup_afterAdd = function (buffer, beginPos) {
        TextFieldSetupAfterAdd.apply(this, arguments);
        const textFiled = this as fgui.GTextField;
        if (!this["_bitmapContainer"] && textFiled.verticalAlign != fgui.VertAlignType.Middle) {
            egret.callLater(() => {
                this["handleXYChanged"].apply(this);
            }, this);
        }
    }

    //动态帧频hack,非循环tween启用60帧渲染
    const tweenRegister = egret.Tween["_register"];
    egret.Tween["_register"] = function (tween: egret.Tween, value: boolean): void {
        tweenRegister.apply(this, arguments);
        let target = tween["_target"];
        if (!target) return;
        (tween["loop"]) && (target["loop"] = true);
        if (!tween["loop"] && target["autoFrameRate"] === true) {
            if (value) {
                autoFrameRate(60);
            } else {
                if (!tweenChanged) {
                    tweenChanged = true;
                    egret.callLater(autoFrameRate, this);
                }
            }
        }
    }

    const tweenRemoveTweens = egret.Tween["removeTweens"];
    egret.Tween["removeTweens"] = function (target: any): void {
        if (!target || !target.tween_count) {
            return;
        }
        tweenRemoveTweens.apply(this, arguments);
        let available = !target["loop"] && target["autoFrameRate"] === true;
        if (available) {
            if (!tweenChanged) {
                tweenChanged = true;
                egret.callLater(autoFrameRate, this);
            }
        }
    }

    let tweenChanged: boolean = false;
    export function autoFrameRate(frameRate: number = -1): void {
        let changed = false;
        let fixFrameRate = StageManager.stage["fixFrameRate"];
        if (fixFrameRate > 0) {
            if (StageManager.stage.frameRate != fixFrameRate) {
                StageManager.stage.frameRate = fixFrameRate;
                changed = true;
            }
        } else if (frameRate <= 0) {
            let tweens: egret.Tween[] = egret.Tween["_tweens"];
            let hasTweenHigh: boolean = false;
            for (let i = tweens.length - 1; i >= 0; i--) {
                let tween: egret.Tween = tweens[i];
                if (!tween["loop"]) {
                    let target = tween["_target"];
                    let available = target && target.stage && target.visible && target["autoFrameRate"] === true;
                    if (available) {
                        hasTweenHigh = true;
                        break;
                    }
                }
            }
            //自动帧频模式自动切换(因为7.0.9微信基础库在2.9.4会闪屏，如果微信不做修复，需要统一切为60帧，切为60帧需要注意是否能够接受线上发热和闪退的风险)
            let sFrameRate = hasTweenHigh ? 60 : 30;
            // let sFrameRate = 60;
            //console.warn(`[debug] 设置帧频为:${sFrameRate}`);
            StageManager.stage.frameRate = sFrameRate;
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            //     console.warn(`[debug] 更新微信帧频${sFrameRate}`);
            //     wx.setPreferredFramesPerSecond(sFrameRate);
            // }
            tweenChanged = false;
            changed = true;
        } else if (StageManager.stage.frameRate != frameRate) {
            StageManager.stage.frameRate = frameRate;
            changed = true;
        }
        if (changed) {
            //hortor.Log.log("autoFrameRate result:" + StageManager.stage.frameRate + ",frameRate:" + frameRate + ",fixFrameRate:" + fixFrameRate);
        }
    }
}