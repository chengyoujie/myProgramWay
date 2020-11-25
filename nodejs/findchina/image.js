function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function r(e, r, t) {
    return new Promise(function(o, a) {
        if (t && t.errCode) n(e, t, a); else {
            s.fs.checkIsMaxSizeExceeded(t);
            var i = wx.createImage();
            i.onload = function() {
                i.onload = null, i.onerror = null;
                var s = new egret.BitmapData(i);
                if (s.width + s.height == 0) return console.error("load size onError:" + r), void n(e, t, a);
                var u = void 0;
                if (void 0 == l[r]) (u = new egret.Texture())._setBitmapData(s); else {
                    var c = (u = l[r]).bitmapData;
                    c.source = s.source, c.width = s.width, c.height = s.height, u._setBitmapData(c);
                }
                hortor.ResourceManager.addMemoryResByHash(u.bitmapData.hashCode, r), o(u);
            }, i.dispose = function() {
                i.src = "";
            }, i.onerror = function(o) {
                i.onload = null, i.onerror = null, console.error("load onError:" + r, o), n(e, t, a);
            }, i.src = e;
        }
    });
}

function n(e, r, n) {
    n(r || new RES.ResourceManagerError(1001, e));
}

function t(e, r) {
    return new Promise(function(n, t) {
        if (s.fs.existsSync(r)) n(); else {
            var o = u.dirname(r);
            s.fs.mkdirsSync(o);
            var a = wx.env.USER_DATA_PATH + "/" + r;
            wx.downloadFile({
                url: e,
                filePath: a,
                success: function(o) {
                    if (s.fs.writeSync(r, null), 200 === o.statusCode) n(); else {
                        console.error("下载失败:" + e, o.statusCode);
                        var a = new RES.ResourceManagerError(1001, e);
                        a.errMsg = o.statusCode, a.errCode = o.statusCode, s.fs.removeFile(r), t(a);
                    }
                },
                fail: function(r) {
                    console.error("下载错误:" + e, r);
                    var n = new RES.ResourceManagerError(1001, e);
                    n.errMsg = r.errMsg ? r.errMsg : JSON.stringify(r), t(n);
                }
            });
        }
    });
}

function o(e, r) {
    return new Promise(function(n, t) {
        s.fs.existsSync(r) && n();
        var o = u.dirname(r);
        s.fs.mkdirsSync(o);
        var a = wx.env.USER_DATA_PATH + "/" + r;
        console.log("开始下载:", e, r);
        var i = wx.downloadFile({
            url: e,
            filePath: a,
            success: function(o) {
                if (200 === o.statusCode) s.fs.writeSync(r, null), n(); else {
                    console.error("下载失败:" + e);
                    var a = new RES.ResourceManagerError(1001, e);
                    t(a);
                }
                egret.clearTimeout(l);
            },
            fail: function(r) {
                console.error("下载错误:" + r);
                var n = new RES.ResourceManagerError(1001, e);
                n.errMsg = r.errMsg, t(n);
            },
            complete: function() {
                egret.clearTimeout(l);
            }
        }), l = egret.setTimeout(function() {
            console.error("下载超时了"), i.abort();
        }, null, 2e3);
    });
}

function a(e) {
    if (-1 == e.indexOf("assets/")) return !1;
    var r = !0, n = !1, t = void 0;
    try {
        for (var o, a = f[Symbol.iterator](); !(r = (o = a.next()).done); r = !0) {
            var i = o.value;
            if (e.indexOf(i) >= 0) return !1;
        }
    } catch (e) {
        n = !0, t = e;
    } finally {
        try {
            !r && a.return && a.return();
        } finally {
            if (n) throw t;
        }
    }
    return !0;
}

var i = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var t = r[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, n, t) {
        return n && e(r.prototype, n), t && e(r, t), r;
    };
}(), s = require("./file-util"), u = s.path;

wx.getFileSystemManager();

s.fs.remove("tmp");

var l = {}, c = {}, f = [ "image/islands" ], d = new (function() {
    function n() {
        e(this, n);
    }
    return i(n, [ {
        key: "onLoadStart",
        value: function(e, n) {
            var i = n.root, u = n.url, l = n.name;
            "" == i && (i = hortor.ResourceManager.resourceRoot);
            var f = hortor.ResourceManager.getRelativePath(u), d = a(f);
            if (f = RES.getVirtualUrl(f), d && ((d = 1 == f.split("assets/")[1].split("/").length) || console.log("此文件不在版本文件中，不会缓存:", u)), 
            !d || s.fs.isMaxSizeExceeded) {
                if (hortor.ResourceManager.isHeadRes(f)) {
                    var v = f.split("/");
                    return g = v[v.length - 2] + v[v.length - 1], g = "tmp/" + g, o(f, g).then(function() {
                        return r(wx.env.USER_DATA_PATH + "/" + g, l);
                    });
                }
                return r(f, l);
            }
            if (c[f]) return console.log("出现不同名但同图地址，原图:" + u + " crc32:" + f + " 当前正在加载的队列长度:" + c.length), 
            c[f];
            var g = "cache_crc32/" + hortor.ResourceManager.getRelativePath(f);
            g = s.fs.removeFilenameVersion(g);
            var m = t(f, g).then(function() {
                return delete c[f], r(wx.env.USER_DATA_PATH + "/" + g, l);
            }).catch(function(e) {
                return s.fs.removeFile(g), delete c[f], r(f, l, e);
            });
            return c[f] = m, m;
        }
    }, {
        key: "onRemoveStart",
        value: function(e, r) {
            var n = e.get(r), t = n.bitmapData, o = r.name;
            return void 0 == l[o] && (l[o] = n), "webgl" == egret.Capabilities.renderMode && t.webGLTexture && (egret.WebGLUtils.deleteWebGLTexture(t.webGLTexture), 
            t.webGLTexture = null), t.source = null, Promise.resolve();
        }
    } ]), n;
}())();

RES.processor.map("image", d);