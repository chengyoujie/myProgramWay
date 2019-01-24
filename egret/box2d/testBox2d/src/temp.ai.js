(function (a) {
    "function" === typeof define && define.amd ? define(["jquery"], a) : "object" === typeof exports ? a(require("jquery")) : a(jQuery)
})(function (a) {
    function b(a) {
        a = f.json ? JSON.stringify(a) : String(a);
        return f.raw ? a : encodeURIComponent(a)
    }

    function c(b, c) {
        if (f.raw) var g = b;
        else a: {
            0 === b.indexOf('"') && (b = b.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                b = decodeURIComponent(b.replace(d, " "));
                g = f.json ? JSON.parse(b) : b;
                break a
            } catch (r) {}
            g = void 0
        }
        return a.isFunction(c) ? c(g) : g
    }
    var d = /\+/g,
        f = a.cookie =
        function (d, l, q) {
            if (void 0 !== l && !a.isFunction(l)) {
                q = a.extend({}, f.defaults, q);
                if ("number" === typeof q.expires) {
                    var g = q.expires,
                        n = q.expires = new Date;
                    n.setTime(+n + 864E5 * g)
                }
                return document.cookie = [f.raw ? d : encodeURIComponent(d), "=", b(l), q.expires ? "; expires=" + q.expires.toUTCString() : "", q.path ? "; path=" + q.path : "", q.domain ? "; domain=" + q.domain : "", q.secure ? "; secure" : ""].join("")
            }
            q = d ? void 0 : {};
            g = document.cookie ? document.cookie.split("; ") : [];
            n = 0;
            for (var m = g.length; n < m; n++) {
                var w = g[n].split("=");
                var e = w.shift();
                e = f.raw ? e : decodeURIComponent(e);
                w = w.join("=");
                if (d && d === e) {
                    q = c(w, l);
                    break
                }
                d || void 0 === (w = c(w)) || (q[e] = w)
            }
            return q
        };
    f.defaults = {};
    a.removeCookie = function (b, c) {
        if (void 0 === a.cookie(b)) return !1;
        a.cookie(b, "", a.extend({}, c, {
            expires: -1
        }));
        return !a.cookie(b)
    }
});
(function () {
    function a(a, b) {
        for (var e = J.length, c = "function" === typeof a.constructor ? g : f; e--;) {
            var k = J[e];
            ("constructor" === k ? h.has(a, k) : k in a && a[k] !== c[k] && !h.contains(b, k)) && b.push(k)
        }
    }
    var b = this,
        c = b._,
        d = Array.prototype,
        f = Object.prototype,
        g = Function.prototype,
        l = d.push,
        q = d.slice,
        r = f.toString,
        n = f.hasOwnProperty,
        m = Array.isArray,
        w = Object.keys,
        e = g.bind,
        k = Object.create,
        y = function () {},
        h = function (a) {
            if (a instanceof h) return a;
            if (!(this instanceof h)) return new h(a);
            this._wrapped = a
        };
    "undefined" !== typeof exports ?
        ("undefined" !== typeof module && module.exports && (exports = module.exports = h), exports._ = h) : b._ = h;
    h.VERSION = "1.7.0";
    var x = function (a, b, e) {
            if (void 0 === b) return a;
            switch (null == e ? 3 : e) {
                case 1:
                    return function (e) {
                        return a.call(b, e)
                    };
                case 2:
                    return function (e, c) {
                        return a.call(b, e, c)
                    };
                case 3:
                    return function (e, c, h) {
                        return a.call(b, e, c, h)
                    };
                case 4:
                    return function (e, c, h, k) {
                        return a.call(b, e, c, h, k)
                    }
            }
            return function () {
                return a.apply(b, arguments)
            }
        },
        z = function (a, b, e) {
            return null == a ? h.identity : h.isFunction(a) ? x(a, b, e) : h.isObject(a) ?
                h.matches(a) : h.property(a)
        };
    h.iteratee = function (a, b) {
        return z(a, b, Infinity)
    };
    var A = function (a) {
            return function (b) {
                var e = arguments.length;
                if (2 > e || null == b) return b;
                for (var c = 0; c < e; c++)
                    for (var h = arguments[c], k = a(h), d = k.length, f = 0; f < d; f++) {
                        var g = k[f];
                        b[g] = h[g]
                    }
                return b
            }
        },
        E = function (a) {
            if (!h.isObject(a)) return {};
            if (k) return k(a);
            y.prototype = a;
            a = new y;
            y.prototype = null;
            return a
        };
    h.each = h.forEach = function (a, b, e) {
        if (null == a) return a;
        b = x(b, e);
        var c = a.length;
        if (c === +c)
            for (e = 0; e < c; e++) b(a[e], e, a);
        else {
            var k =
                h.keys(a);
            e = 0;
            for (c = k.length; e < c; e++) b(a[k[e]], k[e], a)
        }
        return a
    };
    h.map = h.collect = function (a, b, e) {
        if (null == a) return [];
        b = z(b, e);
        e = a.length !== +a.length && h.keys(a);
        for (var c = (e || a).length, k = Array(c), d, f = 0; f < c; f++) d = e ? e[f] : f, k[f] = b(a[d], d, a);
        return k
    };
    h.reduce = h.foldl = h.inject = function (a, b, e, c) {
        null == a && (a = []);
        b = x(b, c, 4);
        var k = a.length !== +a.length && h.keys(a),
            d = (k || a).length,
            f = 0;
        for (3 > arguments.length && (e = a[k ? k[f++] : f++]); f < d; f++) {
            var g = k ? k[f] : f;
            e = b(e, a[g], g, a)
        }
        return e
    };
    h.reduceRight = h.foldr = function (a,
        b, e, c) {
        null == a && (a = []);
        b = x(b, c, 4);
        var k = a.length !== +a.length && h.keys(a),
            d = (k || a).length;
        for (3 > arguments.length && (e = a[k ? k[--d] : --d]); 0 < d--;) {
            var f = k ? k[d] : d;
            e = b(e, a[f], f, a)
        }
        return e
    };
    h.transform = function (a, b, e, c) {
        null == e && (h.isArray(a) ? e = [] : h.isObject(a) ? (e = a.constructor, e = E("function" == typeof e && e.prototype)) : e = {});
        if (null == a) return e;
        b = x(b, c, 4);
        c = a.length !== +a.length && h.keys(a);
        var k = (c || a).length,
            d;
        for (d = 0; d < k; d++) {
            var f = c ? c[d] : d;
            if (!1 === b(e, a[f], f, a)) break
        }
        return e
    };
    h.find = h.detect = function (a, b,
        e) {
        b = a.length === +a.length ? h.findIndex(a, b, e) : h.findKey(a, b, e);
        if (void 0 !== b && -1 !== b) return a[b]
    };
    h.filter = h.select = function (a, b, e) {
        var c = [];
        if (null == a) return c;
        b = z(b, e);
        h.each(a, function (a, e, h) {
            b(a, e, h) && c.push(a)
        });
        return c
    };
    h.reject = function (a, b, e) {
        return h.filter(a, h.negate(z(b)), e)
    };
    h.every = h.all = function (a, b, e) {
        if (null == a) return !0;
        b = z(b, e);
        e = a.length !== +a.length && h.keys(a);
        var c = (e || a).length,
            k;
        for (k = 0; k < c; k++) {
            var d = e ? e[k] : k;
            if (!b(a[d], d, a)) return !1
        }
        return !0
    };
    h.some = h.any = function (a, b, e) {
        if (null ==
            a) return !1;
        b = z(b, e);
        e = a.length !== +a.length && h.keys(a);
        var c = (e || a).length,
            k;
        for (k = 0; k < c; k++) {
            var d = e ? e[k] : k;
            if (b(a[d], d, a)) return !0
        }
        return !1
    };
    h.contains = h.includes = h.include = function (a, b, e) {
        if (null == a) return !1;
        a.length !== +a.length && (a = h.values(a));
        return 0 <= h.indexOf(a, b, "number" == typeof e && e)
    };
    h.invoke = function (a, b) {
        var e = q.call(arguments, 2),
            c = h.isFunction(b);
        return h.map(a, function (a) {
            return (c ? b : a[b]).apply(a, e)
        })
    };
    h.pluck = function (a, b) {
        return h.map(a, h.property(b))
    };
    h.where = function (a, b) {
        return h.filter(a,
            h.matches(b))
    };
    h.findWhere = function (a, b) {
        return h.find(a, h.matches(b))
    };
    h.max = function (a, b, e) {
        var c = -Infinity,
            k = -Infinity,
            d;
        if (null == b && null != a) {
            a = a.length === +a.length ? a : h.values(a);
            for (var f = 0, g = a.length; f < g; f++) e = a[f], e > c && (c = e)
        } else b = z(b, e), h.each(a, function (a, e, h) {
            d = b(a, e, h);
            if (d > k || -Infinity === d && -Infinity === c) c = a, k = d
        });
        return c
    };
    h.min = function (a, b, e) {
        var c = Infinity,
            k = Infinity,
            d;
        if (null == b && null != a) {
            a = a.length === +a.length ? a : h.values(a);
            for (var f = 0, g = a.length; f < g; f++) e = a[f], e < c && (c = e)
        } else b =
            z(b, e), h.each(a, function (a, e, h) {
                d = b(a, e, h);
                if (d < k || Infinity === d && Infinity === c) c = a, k = d
            });
        return c
    };
    h.shuffle = function (a) {
        a = a && a.length === +a.length ? a : h.values(a);
        for (var b = a.length, e = Array(b), c = 0, k; c < b; c++) k = h.random(0, c), k !== c && (e[c] = e[k]), e[k] = a[c];
        return e
    };
    h.sample = function (a, b, e) {
        return null == b || e ? (a.length !== +a.length && (a = h.values(a)), a[h.random(a.length - 1)]) : h.shuffle(a).slice(0, Math.max(0, b))
    };
    h.sortBy = function (a, b, e) {
        b = z(b, e);
        return h.pluck(h.map(a, function (a, e, c) {
            return {
                value: a,
                index: e,
                criteria: b(a,
                    e, c)
            }
        }).sort(function (a, b) {
            return h.comparator(a.criteria, b.criteria) || a.index - b.index
        }), "value")
    };
    var C = function (a) {
        return function (b, e, c) {
            var k = {};
            e = z(e, c);
            h.each(b, function (c, h) {
                h = e(c, h, b);
                a(k, c, h)
            });
            return k
        }
    };
    h.groupBy = C(function (a, b, e) {
        h.has(a, e) ? a[e].push(b) : a[e] = [b]
    });
    h.indexBy = C(function (a, b, e) {
        a[e] = b
    });
    h.countBy = C(function (a, b, e) {
        h.has(a, e) ? a[e]++ : a[e] = 1
    });
    h.toArray = function (a) {
        return a ? h.isArray(a) ? q.call(a) : a.length === +a.length ? h.map(a, h.identity) : h.values(a) : []
    };
    h.size = function (a) {
        return null ==
            a ? 0 : a.length === +a.length ? a.length : h.keys(a).length
    };
    h.partition = function (a, b, e) {
        b = z(b, e);
        var c = [],
            k = [];
        h.each(a, function (a, e, h) {
            (b(a, e, h) ? c : k).push(a)
        });
        return [c, k]
    };
    h.first = h.head = h.take = function (a, b, e) {
        if (null != a) return null == b || e ? a[0] : h.initial(a, a.length - b)
    };
    h.initial = function (a, b, e) {
        return q.call(a, 0, Math.max(0, a.length - (null == b || e ? 1 : b)))
    };
    h.last = function (a, b, e) {
        if (null != a) return null == b || e ? a[a.length - 1] : h.rest(a, Math.max(0, a.length - b))
    };
    h.rest = h.tail = h.drop = function (a, b, e) {
        return q.call(a, null ==
            b || e ? 1 : b)
    };
    h.compact = function (a) {
        return h.filter(a, h.identity)
    };
    var B = function (a, b, e, c) {
        for (var k = [], d = 0, f = c || 0, g = a && a.length; f < g; f++)
            if ((c = a[f]) && 0 <= c.length && (h.isArray(c) || h.isArguments(c))) {
                b || (c = B(c, b, e));
                var x = 0,
                    m = c.length;
                for (k.length += m; x < m;) k[d++] = c[x++]
            } else e || (k[d++] = c);
        return k
    };
    h.flatten = function (a, b) {
        return B(a, b, !1)
    };
    h.without = function (a) {
        return h.difference(a, q.call(arguments, 1))
    };
    h.uniq = h.unique = function (a, b, e, c) {
        if (null == a) return [];
        h.isBoolean(b) || (c = e, e = b, b = !1);
        null != e && (e = z(e,
            c));
        c = [];
        for (var k = [], d = 0, f = a.length; d < f; d++) {
            var g = a[d],
                x = e ? e(g, d, a) : g;
            b ? (d && k === x || c.push(g), k = x) : e ? h.contains(k, x) || (k.push(x), c.push(g)) : h.contains(c, g) || c.push(g)
        }
        return c
    };
    h.union = function () {
        return h.uniq(B(arguments, !0, !0))
    };
    h.intersection = function (a) {
        if (null == a) return [];
        for (var b = [], e = arguments.length, c = 0, k = a.length; c < k; c++) {
            var d = a[c];
            if (!h.contains(b, d)) {
                for (var f = 1; f < e && h.contains(arguments[f], d); f++);
                f === e && b.push(d)
            }
        }
        return b
    };
    h.difference = function (a) {
        var b = B(arguments, !0, !0, 1);
        return h.filter(a,
            function (a) {
                return !h.contains(b, a)
            })
    };
    h.zip = function (a) {
        if (null == a) return [];
        for (var b = h.max(arguments, "length").length, e = Array(b); 0 < b--;) e[b] = h.pluck(arguments, b);
        return e
    };
    h.unzip = function (a) {
        return h.zip.apply(null, a)
    };
    h.object = function (a, b) {
        if (null == a) return {};
        for (var e = {}, c = 0, h = a.length; c < h; c++) b ? e[a[c]] = b[c] : e[a[c][0]] = a[c][1];
        return e
    };
    h.indexOf = function (a, b, e) {
        var c = 0,
            k = a && a.length;
        if ("number" == typeof e) c = 0 > e ? Math.max(0, k + e) : e;
        else if (e && k) return c = h.sortedIndex(a, b), a[c] === b ? c : -1;
        for (; c < k; c++)
            if (a[c] ===
                b) return c;
        return -1
    };
    h.lastIndexOf = function (a, b, e) {
        var c = a ? a.length : 0;
        for ("number" == typeof e && (c = 0 > e ? c + e + 1 : Math.min(c, e + 1)); 0 <= --c;)
            if (a[c] === b) return c;
        return -1
    };
    h.findIndex = function (a, b, e) {
        b = z(b, e);
        e = null != a ? a.length : 0;
        for (var c = 0; c < e; c++)
            if (b(a[c], c, a)) return c;
        return -1
    };
    h.sortedIndex = function (a, b, e, c) {
        e = z(e, c, 1);
        b = e(b);
        c = 0;
        for (var k = a.length; c < k;) {
            var d = Math.floor((c + k) / 2);
            0 > h.comparator(e(a[d]), b) ? c = d + 1 : k = d
        }
        return c
    };
    h.range = function (a, b, e) {
        1 >= arguments.length && (b = a || 0, a = 0);
        e = e || 1;
        for (var c =
                Math.max(Math.ceil((b - a) / e), 0), h = Array(c), k = 0; k < c; k++, a += e) h[k] = a;
        return h
    };
    var K = function (a, b, e, c, k) {
        if (!(c instanceof b)) return a.apply(e, k);
        b = E(a.prototype);
        a = a.apply(b, k);
        return h.isObject(a) ? a : b
    };
    h.bind = function (a, b) {
        if (e && a.bind === e) return e.apply(a, q.call(arguments, 1));
        if (!h.isFunction(a)) throw new TypeError("Bind must be called on a function");
        var c = q.call(arguments, 2);
        return function N() {
            return K(a, N, b, this, c.concat(q.call(arguments)))
        }
    };
    h.partial = function (a) {
        var b = q.call(arguments, 1);
        return function M() {
            for (var e =
                    0, c = b.slice(), k = 0, d = c.length; k < d; k++) c[k] === h && (c[k] = arguments[e++]);
            for (; e < arguments.length;) c.push(arguments[e++]);
            return K(a, M, this, this, c)
        }
    };
    h.bindAll = function (a) {
        var b, e = arguments.length;
        if (1 >= e) throw Error("bindAll must be passed function names");
        for (b = 1; b < e; b++) {
            var c = arguments[b];
            a[c] = h.bind(a[c], a)
        }
        return a
    };
    h.memoize = function (a, b) {
        var e = function (c) {
            var k = e.cache,
                d = "" + (b ? b.apply(this, arguments) : c);
            h.has(k, d) || (k[d] = a.apply(this, arguments));
            return k[d]
        };
        e.cache = {};
        return e
    };
    h.delay = function (a,
        b) {
        var e = q.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, e)
        }, b)
    };
    h.defer = h.partial(h.delay, h, 1);
    h.throttle = function (a, b, e) {
        var c, k, d, f = null,
            g = 0;
        e || (e = {});
        var x = function () {
            g = !1 === e.leading ? 0 : h.now();
            f = null;
            d = a.apply(c, k);
            f || (c = k = null)
        };
        return function () {
            var m = h.now();
            g || !1 !== e.leading || (g = m);
            var y = b - (m - g);
            c = this;
            k = arguments;
            0 >= y || y > b ? (f && (clearTimeout(f), f = null), g = m, d = a.apply(c, k), f || (c = k = null)) : f || !1 === e.trailing || (f = setTimeout(x, y));
            return d
        }
    };
    h.debounce = function (a, b, e) {
        var c,
            k, d, f, g, x = function () {
                var m = h.now() - f;
                m < b && 0 <= m ? c = setTimeout(x, b - m) : (c = null, e || (g = a.apply(d, k), c || (d = k = null)))
            };
        return function () {
            d = this;
            k = arguments;
            f = h.now();
            var m = e && !c;
            c || (c = setTimeout(x, b));
            m && (g = a.apply(d, k), d = k = null);
            return g
        }
    };
    h.wrap = function (a, b) {
        return h.partial(b, a)
    };
    h.negate = function (a) {
        return function () {
            return !a.apply(this, arguments)
        }
    };
    h.compose = function () {
        var a = arguments,
            b = a.length - 1;
        return function () {
            for (var e = b, c = a[b].apply(this, arguments); e--;) c = a[e].call(this, c);
            return c
        }
    };
    h.after =
        function (a, b) {
            return function () {
                if (1 > --a) return b.apply(this, arguments)
            }
        };
    h.before = function (a, b) {
        var e;
        return function () {
            0 < --a && (e = b.apply(this, arguments));
            1 >= a && (b = null);
            return e
        }
    };
    h.once = h.partial(h.before, 2);
    var F = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        J = "constructor valueOf isPrototypeOf toString propertyIsEnumerable hasOwnProperty toLocaleString".split(" ");
    h.keys = function (b) {
        if (!h.isObject(b)) return [];
        if (w) return w(b);
        var e = [],
            c;
        for (c in b) h.has(b, c) && e.push(c);
        F && a(b, e);
        return e
    };
    h.keysIn = function (b) {
        if (!h.isObject(b)) return [];
        var e = [],
            c;
        for (c in b) e.push(c);
        F && a(b, e);
        return e
    };
    h.values = function (a) {
        for (var b = h.keys(a), e = b.length, c = Array(e), k = 0; k < e; k++) c[k] = a[b[k]];
        return c
    };
    h.pairs = function (a) {
        for (var b = h.keys(a), e = b.length, c = Array(e), k = 0; k < e; k++) c[k] = [b[k], a[b[k]]];
        return c
    };
    h.invert = function (a) {
        for (var b = {}, e = h.keys(a), c = 0, k = e.length; c < k; c++) b[a[e[c]]] = e[c];
        return b
    };
    h.functions = h.methods = function (a) {
        var b = [],
            e;
        for (e in a) h.isFunction(a[e]) && b.push(e);
        return b.sort()
    };
    h.extend =
        A(h.keysIn);
    h.assign = A(h.keys);
    h.findKey = function (a, b, e) {
        b = z(b, e);
        e = h.keys(a);
        for (var c, k = 0, d = e.length; k < d; k++)
            if (c = e[k], b(a[c], c, a)) return c
    };
    h.pick = function (a, b, e) {
        var c = {};
        if (null == a) return c;
        if (h.isFunction(b))
            for (g in b = x(b, e), a) {
                var k = a[g];
                b(k, g, a) && (c[g] = k)
            } else {
                k = B(arguments, !1, !1, 1);
                a = Object(a);
                for (var d = 0, f = k.length; d < f; d++) {
                    var g = k[d];
                    g in a && (c[g] = a[g])
                }
            }
        return c
    };
    h.omit = function (a, b, e) {
        if (h.isFunction(b)) b = h.negate(b);
        else {
            var c = h.map(B(arguments, !1, !1, 1), String);
            b = function (a, b) {
                return !h.contains(c,
                    b)
            }
        }
        return h.pick(a, b, e)
    };
    h.defaults = function (a) {
        if (!h.isObject(a)) return a;
        for (var b = 1, e = arguments.length; b < e; b++) {
            var c = arguments[b],
                k;
            for (k in c) void 0 === a[k] && (a[k] = c[k])
        }
        return a
    };
    h.create = function (a, b) {
        a = E(a);
        b && h.assign(a, b);
        return a
    };
    h.clone = function (a) {
        return h.isObject(a) ? h.isArray(a) ? a.slice() : h.extend({}, a) : a
    };
    h.tap = function (a, b) {
        b(a);
        return a
    };
    var G = function (a, b, e, c) {
        if (a === b) return 0 !== a || 1 / a === 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof h && (a = a._wrapped);
        b instanceof h && (b = b._wrapped);
        var k = r.call(a);
        if (k !== r.call(b)) return !1;
        switch (k) {
            case "[object RegExp]":
            case "[object String]":
                return "" + a === "" + b;
            case "[object Number]":
                return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
            case "[object Date]":
            case "[object Boolean]":
                return +a === +b
        }
        k = "[object Array]" === k;
        if (!k) {
            if ("object" != typeof a || "object" != typeof b) return !1;
            var d = a.constructor,
                f = b.constructor;
            if (d !== f && !(h.isFunction(d) && d instanceof d && h.isFunction(f) && f instanceof f) && "constructor" in a && "constructor" in b) return !1
        }
        for (d = e.length; d--;)
            if (e[d] ===
                a) return c[d] === b;
        e.push(a);
        c.push(b);
        if (k) {
            d = a.length;
            if (d !== b.length) return !1;
            for (; d--;)
                if (!G(a[d], b[d], e, c)) return !1
        } else {
            k = h.keys(a);
            d = k.length;
            if (h.keys(b).length !== d) return !1;
            for (; d--;)
                if (f = k[d], !h.has(b, f) || !G(a[f], b[f], e, c)) return !1
        }
        e.pop();
        c.pop();
        return !0
    };
    h.isEqual = function (a, b) {
        return G(a, b, [], [])
    };
    h.isEmpty = function (a) {
        if (null == a) return !0;
        if (h.isArray(a) || h.isString(a) || h.isArguments(a)) return 0 === a.length;
        for (var b in a)
            if (h.has(a, b)) return !1;
        return !0
    };
    h.isElement = function (a) {
        return !(!a ||
            1 !== a.nodeType)
    };
    h.isArray = m || function (a) {
        return "[object Array]" === r.call(a)
    };
    h.isObject = function (a) {
        var b = typeof a;
        return "function" === b || "object" === b && !!a
    };
    h.each("Arguments Function String Number Date RegExp Error".split(" "), function (a) {
        h["is" + a] = function (b) {
            return r.call(b) === "[object " + a + "]"
        }
    });
    h.isArguments(arguments) || (h.isArguments = function (a) {
        return h.has(a, "callee")
    });
    "function" != typeof /./ && "object" != typeof Int8Array && (h.isFunction = function (a) {
        return "function" == typeof a || !1
    });
    h.isFinite =
        function (a) {
            return isFinite(a) && !isNaN(parseFloat(a))
        };
    h.isNaN = function (a) {
        return h.isNumber(a) && a !== +a
    };
    h.isBoolean = function (a) {
        return !0 === a || !1 === a || "[object Boolean]" === r.call(a)
    };
    h.isNull = function (a) {
        return null === a
    };
    h.isUndefined = function (a) {
        return void 0 === a
    };
    h.has = function (a, b) {
        return null != a && n.call(a, b)
    };
    h.noConflict = function () {
        b._ = c;
        return this
    };
    h.identity = function (a) {
        return a
    };
    h.constant = function (a) {
        return function () {
            return a
        }
    };
    h.noop = function () {};
    h.property = function (a) {
        return function (b) {
            return null ==
                b ? void 0 : b[a]
        }
    };
    h.propertyOf = function (a) {
        return null == a ? function () {} : function (b) {
            return a[b]
        }
    };
    h.matches = function (a) {
        var b = h.pairs(a),
            e = b.length;
        return function (a) {
            if (null == a) return !e;
            a = Object(a);
            for (var c = 0; c < e; c++) {
                var k = b[c],
                    h = k[0];
                if (k[1] !== a[h] || !(h in a)) return !1
            }
            return !0
        }
    };
    h.comparator = function (a, b) {
        if (a === b) return 0;
        var e = a >= a,
            c = b >= b;
        if (e || c) {
            if (e && !c) return -1;
            if (c && !e) return 1
        }
        return a > b ? 1 : b > a ? -1 : 0
    };
    h.times = function (a, b, e) {
        var c = Array(Math.max(0, a));
        b = x(b, e, 1);
        for (e = 0; e < a; e++) c[e] = b(e);
        return c
    };
    h.random = function (a, b) {
        null == b && (b = a, a = 0);
        return a + Math.floor(Math.random() * (b - a + 1))
    };
    h.now = Date.now || function () {
        return (new Date).getTime()
    };
    m = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };
    A = h.invert(m);
    C = function (a) {
        var b = function (b) {
                return a[b]
            },
            e = "(?:" + h.keys(a).join("|") + ")",
            c = RegExp(e),
            k = RegExp(e, "g");
        return function (a) {
            a = null == a ? "" : "" + a;
            return c.test(a) ? a.replace(k, b) : a
        }
    };
    h.escape = C(m);
    h.unescape = C(A);
    h.result = function (a, b, e) {
        b = null == a ? void 0 : a[b];
        void 0 === b && (b =
            e);
        return h.isFunction(b) ? b.call(a) : b
    };
    var H = 0;
    h.uniqueId = function (a) {
        var b = ++H + "";
        return a ? a + b : b
    };
    h.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var D = /(.)^/,
        I = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        u = /\\|'|\r|\n|\u2028|\u2029/g,
        t = function (a) {
            return "\\" + I[a]
        };
    h.template = function (a, b, e) {
        !b && e && (b = e);
        b = h.defaults({}, b, h.templateSettings);
        e = RegExp([(b.escape || D).source, (b.interpolate || D).source, (b.evaluate || D).source].join("|") +
            "|$", "g");
        var c = 0,
            k = "__p+='";
        a.replace(e, function (b, e, h, d, f) {
            k += a.slice(c, f).replace(u, t);
            c = f + b.length;
            e ? k += "'+\n((__t=(" + e + "))==null?'':_.escape(__t))+\n'" : h ? k += "'+\n((__t=(" + h + "))==null?'':__t)+\n'" : d && (k += "';\n" + d + "\n__p+='");
            return b
        });
        k += "';\n";
        b.variable || (k = "with(obj||{}){\n" + k + "}\n");
        k = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + k + "return __p;\n";
        try {
            var d = new Function(b.variable || "obj", "_", k)
        } catch (L) {
            throw L.source = k, L;
        }
        e = function (a) {
            return d.call(this,
                a, h)
        };
        e.source = "function(" + (b.variable || "obj") + "){\n" + k + "}";
        return e
    };
    h.chain = function (a) {
        a = h(a);
        a._chain = !0;
        return a
    };
    var v = function (a, b) {
        return a._chain ? h(b).chain() : b
    };
    h.mixin = function (a) {
        h.each(h.functions(a), function (b) {
            var e = h[b] = a[b];
            h.prototype[b] = function () {
                var a = [this._wrapped];
                l.apply(a, arguments);
                return v(this, e.apply(h, a))
            }
        })
    };
    h.mixin(h);
    h.each("pop push reverse shift sort splice unshift".split(" "), function (a) {
        var b = d[a];
        h.prototype[a] = function () {
            var e = this._wrapped;
            b.apply(e, arguments);
            "shift" !== a && "splice" !== a || 0 !== e.length || delete e[0];
            return v(this, e)
        }
    });
    h.each(["concat", "join", "slice"], function (a) {
        var b = d[a];
        h.prototype[a] = function () {
            return v(this, b.apply(this._wrapped, arguments))
        }
    });
    h.prototype.value = function () {
        return this._wrapped
    };
    "function" === typeof define && define.amd && define("underscore", [], function () {
        return h
    })
}).call(this);
(function (a, b) {
    "object" === typeof exports && "object" === typeof module ? module.exports = b() : "function" === typeof define && define.amd ? define([], b) : "object" === typeof exports ? exports.Handlebars = b() : a.Handlebars = b()
})(this, function () {
    return function (a) {
        function b(d) {
            if (c[d]) return c[d].exports;
            var f = c[d] = {
                exports: {},
                id: d,
                loaded: !1
            };
            a[d].call(f.exports, f, f.exports, b);
            f.loaded = !0;
            return f.exports
        }
        var c = {};
        b.m = a;
        b.c = c;
        b.p = "";
        return b(0)
    }([function (a, b, c) {
        function d() {
            var a = w();
            a.compile = function (b, e) {
                return n.compile(b,
                    e, a)
            };
            a.precompile = function (b, e) {
                return n.precompile(b, e, a)
            };
            a.AST = q["default"];
            a.Compiler = n.Compiler;
            a.JavaScriptCompiler = m["default"];
            a.Parser = r.parser;
            a.parse = r.parse;
            return a
        }
        var f = c(1)["default"];
        b.__esModule = !0;
        var g = c(2);
        g = f(g);
        var l = c(21),
            q = f(l),
            r = c(22),
            n = c(27);
        l = c(28);
        var m = f(l);
        l = c(25);
        l = f(l);
        c = c(20);
        f = f(c);
        var w = g["default"].create;
        g = d();
        g.create = d;
        f["default"](g);
        g.Visitor = l["default"];
        g["default"] = g;
        b["default"] = g;
        a.exports = b["default"]
    }, function (a, b) {
        b["default"] = function (a) {
            return a &&
                a.__esModule ? a : {
                    "default": a
                }
        };
        b.__esModule = !0
    }, function (a, b, c) {
        function d() {
            var a = new q.HandlebarsEnvironment;
            m.extend(a, q);
            a.SafeString = r["default"];
            a.Exception = n["default"];
            a.Utils = m;
            a.escapeExpression = m.escapeExpression;
            a.VM = w;
            a.template = function (b) {
                return w.template(b, a)
            };
            return a
        }
        var f = c(3)["default"],
            g = c(1)["default"];
        b.__esModule = !0;
        var l = c(4),
            q = f(l);
        l = c(18);
        var r = g(l);
        l = c(6);
        var n = g(l);
        l = c(5);
        var m = f(l);
        l = c(19);
        var w = f(l);
        c = c(20);
        g = g(c);
        c = d();
        c.create = d;
        g["default"](c);
        c["default"] = c;
        b["default"] =
            c;
        a.exports = b["default"]
    }, function (a, b) {
        b["default"] = function (a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a)
                for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
            b["default"] = a;
            return b
        };
        b.__esModule = !0
    }, function (a, b, c) {
        function d(a, b, c) {
            this.helpers = a || {};
            this.partials = b || {};
            this.decorators = c || {};
            q.registerDefaultHelpers(this);
            r.registerDefaultDecorators(this)
        }
        a = c(1)["default"];
        b.__esModule = !0;
        b.HandlebarsEnvironment = d;
        var f = c(5),
            g = c(6),
            l = a(g),
            q = c(7),
            r = c(15);
        c = c(17);
        c = a(c);
        b.VERSION =
            "4.0.5";
        b.COMPILER_REVISION = 7;
        b.REVISION_CHANGES = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0"
        };
        d.prototype = {
            constructor: d,
            logger: c["default"],
            log: c["default"].log,
            registerHelper: function (a, b) {
                if ("[object Object]" === f.toString.call(a)) {
                    if (b) throw new l["default"]("Arg not supported with multiple helpers");
                    f.extend(this.helpers, a)
                } else this.helpers[a] = b
            },
            unregisterHelper: function (a) {
                delete this.helpers[a]
            },
            registerPartial: function (a,
                b) {
                if ("[object Object]" === f.toString.call(a)) f.extend(this.partials, a);
                else {
                    if ("undefined" === typeof b) throw new l["default"]('Attempting to register a partial called "' + a + '" as undefined');
                    this.partials[a] = b
                }
            },
            unregisterPartial: function (a) {
                delete this.partials[a]
            },
            registerDecorator: function (a, b) {
                if ("[object Object]" === f.toString.call(a)) {
                    if (b) throw new l["default"]("Arg not supported with multiple decorators");
                    f.extend(this.decorators, a)
                } else this.decorators[a] = b
            },
            unregisterDecorator: function (a) {
                delete this.decorators[a]
            }
        };
        b.log = c["default"].log;
        b.createFrame = f.createFrame;
        b.logger = c["default"]
    }, function (a, b) {
        function c(a) {
            return f[a]
        }

        function d(a) {
            for (var b = 1; b < arguments.length; b++)
                for (var c in arguments[b]) Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
            return a
        }
        b.__esModule = !0;
        b.extend = d;
        b.indexOf = function (a, b) {
            for (var c = 0, e = a.length; c < e; c++)
                if (a[c] === b) return c;
            return -1
        };
        b.escapeExpression = function (a) {
            if ("string" !== typeof a) {
                if (a && a.toHTML) return a.toHTML();
                if (null == a) return "";
                if (!a) return a +
                    "";
                a = "" + a
            }
            return l.test(a) ? a.replace(g, c) : a
        };
        b.isEmpty = function (a) {
            return a || 0 === a ? r(a) && 0 === a.length ? !0 : !1 : !0
        };
        b.createFrame = function (a) {
            var b = d({}, a);
            b._parent = a;
            return b
        };
        b.blockParams = function (a, b) {
            a.path = b;
            return a
        };
        b.appendContextPath = function (a, b) {
            return (a ? a + "." : "") + b
        };
        var f = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;",
                "=": "&#x3D;"
            },
            g = /[&<>"'`=]/g,
            l = /[&<>"'`=]/,
            q = Object.prototype.toString;
        b.toString = q;
        a = function (a) {
            return "function" === typeof a
        };
        a(/x/) && (b.isFunction =
            a = function (a) {
                return "function" === typeof a && "[object Function]" === q.call(a)
            });
        b.isFunction = a;
        var r = Array.isArray || function (a) {
            return a && "object" === typeof a ? "[object Array]" === q.call(a) : !1
        };
        b.isArray = r
    }, function (a, b) {
        function c(a, b) {
            b = b && b.loc;
            var f = void 0,
                g = void 0;
            b && (f = b.start.line, g = b.start.column, a += " - " + f + ":" + g);
            a = Error.prototype.constructor.call(this, a);
            for (var r = 0; r < d.length; r++) this[d[r]] = a[d[r]];
            Error.captureStackTrace && Error.captureStackTrace(this, c);
            b && (this.lineNumber = f, this.column = g)
        }
        b.__esModule = !0;
        var d = "description fileName lineNumber message name number stack".split(" ");
        c.prototype = Error();
        b["default"] = c;
        a.exports = b["default"]
    }, function (a, b, c) {
        a = c(1)["default"];
        b.__esModule = !0;
        b.registerDefaultHelpers = function (a) {
            d["default"](a);
            f["default"](a);
            g["default"](a);
            l["default"](a);
            q["default"](a);
            r["default"](a);
            n["default"](a)
        };
        b = c(8);
        var d = a(b);
        b = c(9);
        var f = a(b);
        b = c(10);
        var g = a(b);
        b = c(11);
        var l = a(b);
        b = c(12);
        var q = a(b);
        b = c(13);
        var r = a(b);
        c = c(14);
        var n = a(c)
    }, function (a, b, c) {
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function (a) {
            a.registerHelper("blockHelperMissing", function (b, c) {
                var f = c.inverse,
                    g = c.fn;
                if (!0 === b) return g(this);
                if (!1 === b || null == b) return f(this);
                if (d.isArray(b)) return 0 < b.length ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : f(this);
                c.data && c.ids && (f = d.createFrame(c.data), f.contextPath = d.appendContextPath(c.data.contextPath, c.name), c = {
                    data: f
                });
                return g(b, c)
            })
        };
        a.exports = b["default"]
    }, function (a, b, c) {
        var d = c(1)["default"];
        b.__esModule = !0;
        var f = c(5);
        c = c(6);
        var g = d(c);
        b["default"] =
            function (a) {
                a.registerHelper("each", function (a, b) {
                    function c(b, e, c) {
                        y && (y.key = b, y.index = e, y.first = 0 === e, y.last = !!c, h && (y.contextPath = h + b));
                        k += d(a[b], {
                            data: y,
                            blockParams: f.blockParams([a[b], b], [h + b, null])
                        })
                    }
                    if (!b) throw new g["default"]("Must pass iterator to #each");
                    var d = b.fn,
                        w = b.inverse,
                        e = 0,
                        k = "",
                        y = void 0,
                        h = void 0;
                    b.data && b.ids && (h = f.appendContextPath(b.data.contextPath, b.ids[0]) + ".");
                    f.isFunction(a) && (a = a.call(this));
                    b.data && (y = f.createFrame(b.data));
                    if (a && "object" === typeof a)
                        if (f.isArray(a))
                            for (var x =
                                    a.length; e < x; e++) e in a && c(e, e, e === a.length - 1);
                        else {
                            b = void 0;
                            for (x in a) a.hasOwnProperty(x) && (void 0 !== b && c(b, e - 1), b = x, e++);
                            void 0 !== b && c(b, e - 1, !0)
                        } 0 === e && (k = w(this));
                    return k
                })
            };
        a.exports = b["default"]
    }, function (a, b, c) {
        var d = c(1)["default"];
        b.__esModule = !0;
        c = c(6);
        var f = d(c);
        b["default"] = function (a) {
            a.registerHelper("helperMissing", function () {
                if (1 !== arguments.length) throw new f["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
            })
        };
        a.exports = b["default"]
    }, function (a, b, c) {
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function (a) {
            a.registerHelper("if", function (a, b) {
                d.isFunction(a) && (a = a.call(this));
                return !b.hash.includeZero && !a || d.isEmpty(a) ? b.inverse(this) : b.fn(this)
            });
            a.registerHelper("unless", function (b, c) {
                return a.helpers["if"].call(this, b, {
                    fn: c.inverse,
                    inverse: c.fn,
                    hash: c.hash
                })
            })
        };
        a.exports = b["default"]
    }, function (a, b) {
        b.__esModule = !0;
        b["default"] = function (a) {
            a.registerHelper("log", function () {
                for (var b = [void 0], c = arguments[arguments.length - 1], g = 0; g < arguments.length - 1; g++) b.push(arguments[g]);
                g = 1;
                null != c.hash.level ? g = c.hash.level : c.data && null != c.data.level && (g = c.data.level);
                b[0] = g;
                a.log.apply(a, b)
            })
        };
        a.exports = b["default"]
    }, function (a, b) {
        b.__esModule = !0;
        b["default"] = function (a) {
            a.registerHelper("lookup", function (a, b) {
                return a && a[b]
            })
        };
        a.exports = b["default"]
    }, function (a, b, c) {
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function (a) {
            a.registerHelper("with", function (a, b) {
                d.isFunction(a) && (a = a.call(this));
                var c = b.fn;
                if (d.isEmpty(a)) return b.inverse(this);
                var f = b.data;
                b.data && b.ids && (f = d.createFrame(b.data),
                    f.contextPath = d.appendContextPath(b.data.contextPath, b.ids[0]));
                return c(a, {
                    data: f,
                    blockParams: d.blockParams([a], [f && f.contextPath])
                })
            })
        };
        a.exports = b["default"]
    }, function (a, b, c) {
        a = c(1)["default"];
        b.__esModule = !0;
        b.registerDefaultDecorators = function (a) {
            d["default"](a)
        };
        b = c(16);
        var d = a(b)
    }, function (a, b, c) {
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function (a) {
            a.registerDecorator("inline", function (a, b, c, f) {
                var g = a;
                b.partials || (b.partials = {}, g = function (f, g) {
                    var e = c.partials;
                    c.partials = d.extend({}, e, b.partials);
                    f = a(f, g);
                    c.partials = e;
                    return f
                });
                b.partials[f.args[0]] = f.fn;
                return g
            })
        };
        a.exports = b["default"]
    }, function (a, b, c) {
        b.__esModule = !0;
        var d = c(5),
            f = {
                methodMap: ["debug", "info", "warn", "error"],
                level: "info",
                lookupLevel: function (a) {
                    if ("string" === typeof a) {
                        var b = d.indexOf(f.methodMap, a.toLowerCase());
                        a = 0 <= b ? b : parseInt(a, 10)
                    }
                    return a
                },
                log: function (a) {
                    a = f.lookupLevel(a);
                    if ("undefined" !== typeof console && f.lookupLevel(f.level) <= a) {
                        var b = f.methodMap[a];
                        console[b] || (b = "log");
                        for (var c = arguments.length, d = Array(1 < c ?
                                c - 1 : 0), g = 1; g < c; g++) d[g - 1] = arguments[g];
                        console[b].apply(console, d)
                    }
                }
            };
        b["default"] = f;
        a.exports = b["default"]
    }, function (a, b) {
        function c(a) {
            this.string = a
        }
        b.__esModule = !0;
        c.prototype.toString = c.prototype.toHTML = function () {
            return "" + this.string
        };
        b["default"] = c;
        a.exports = b["default"]
    }, function (a, b, c) {
        function d(a, b, c, d, h, f, g) {
            function e(b) {
                var e = 1 >= arguments.length || void 0 === arguments[1] ? {} : arguments[1],
                    k = g;
                g && b !== g[0] && (k = [b].concat(g));
                return c(a, b, a.helpers, a.partials, e.data || d, f && [e.blockParams].concat(f),
                    k)
            }
            e = l(c, e, a, g, d, f);
            e.program = b;
            e.depth = g ? g.length : 0;
            e.blockParams = h || 0;
            return e
        }

        function f() {
            return ""
        }

        function g(a, b) {
            b && "root" in b || (b = b ? m.createFrame(b) : {}, b.root = a);
            return b
        }

        function l(a, b, c, d, h, f) {
            if (a.decorator) {
                var e = {};
                b = a.decorator(b, e, c, d && d[0], h, f, d);
                r.extend(b, e)
            }
            return b
        }
        var q = c(3)["default"];
        a = c(1)["default"];
        b.__esModule = !0;
        b.checkRevision = function (a) {
            var b = a && a[0] || 1,
                c = m.COMPILER_REVISION;
            if (b !== c) {
                if (b < c) throw new n["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
                    m.REVISION_CHANGES[c] + ") or downgrade your runtime to an older version (" + m.REVISION_CHANGES[b] + ").");
                throw new n["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").");
            }
        };
        b.template = function (a, b) {
            function e(b) {
                function k(b) {
                    return "" + a.main(c, b, c.helpers, c.partials, d, m, f)
                }
                var h = 1 >= arguments.length || void 0 === arguments[1] ? {} : arguments[1],
                    d = h.data;
                e._setup(h);
                !h.partial && a.useData && (d = g(b, d));
                var f =
                    void 0,
                    m = a.useBlockParams ? [] : void 0;
                a.useDepths && (f = h.depths ? b !== h.depths[0] ? [b].concat(h.depths) : h.depths : [b]);
                k = l(a.main, k, c, h.depths || [], d, m);
                return k(b, h)
            }
            if (!b) throw new n["default"]("No environment passed to template");
            if (!a || !a.main) throw new n["default"]("Unknown template object: " + typeof a);
            a.main.decorator = a.main_d;
            b.VM.checkRevision(a.compiler);
            var c = {
                strict: function (a, b) {
                    if (!(b in a)) throw new n["default"]('"' + b + '" not defined in ' + a);
                    return a[b]
                },
                lookup: function (a, b) {
                    for (var e = a.length,
                            c = 0; c < e; c++)
                        if (a[c] && null != a[c][b]) return a[c][b]
                },
                lambda: function (a, b) {
                    return "function" === typeof a ? a.call(b) : a
                },
                escapeExpression: r.escapeExpression,
                invokePartial: function (e, c, k) {
                    k.hash && (c = r.extend({}, c, k.hash), k.ids && (k.ids[0] = !0));
                    e = b.VM.resolvePartial.call(this, e, c, k);
                    var h = b.VM.invokePartial.call(this, e, c, k);
                    null == h && b.compile && (k.partials[k.name] = b.compile(e, a.compilerOptions, b), h = k.partials[k.name](c, k));
                    if (null != h) {
                        if (k.indent) {
                            e = h.split("\n");
                            c = 0;
                            for (h = e.length; c < h && (e[c] || c + 1 !== h); c++) e[c] =
                                k.indent + e[c];
                            h = e.join("\n")
                        }
                        return h
                    }
                    throw new n["default"]("The partial " + k.name + " could not be compiled when running in runtime-only mode");
                },
                fn: function (b) {
                    var e = a[b];
                    e.decorator = a[b + "_d"];
                    return e
                },
                programs: [],
                program: function (a, b, e, c, k) {
                    var h = this.programs[a],
                        f = this.fn(a);
                    b || k || c || e ? h = d(this, a, f, b, e, c, k) : h || (h = this.programs[a] = d(this, a, f));
                    return h
                },
                data: function (a, b) {
                    for (; a && b--;) a = a._parent;
                    return a
                },
                merge: function (a, b) {
                    var e = a || b;
                    a && b && a !== b && (e = r.extend({}, b, a));
                    return e
                },
                noop: b.VM.noop,
                compilerInfo: a.compiler
            };
            e.isTop = !0;
            e._setup = function (e) {
                if (e.partial) c.helpers = e.helpers, c.partials = e.partials, c.decorators = e.decorators;
                else if (c.helpers = c.merge(e.helpers, b.helpers), a.usePartial && (c.partials = c.merge(e.partials, b.partials)), a.usePartial || a.useDecorators) c.decorators = c.merge(e.decorators, b.decorators)
            };
            e._child = function (b, e, k, f) {
                if (a.useBlockParams && !k) throw new n["default"]("must pass block params");
                if (a.useDepths && !f) throw new n["default"]("must pass parent depths");
                return d(c,
                    b, a[b], e, 0, k, f)
            };
            return e
        };
        b.wrapProgram = d;
        b.resolvePartial = function (a, b, c) {
            a ? a.call || c.name || (c.name = a, a = c.partials[a]) : a = "@partial-block" === c.name ? c.data["partial-block"] : c.partials[c.name];
            return a
        };
        b.invokePartial = function (a, b, c) {
            c.partial = !0;
            c.ids && (c.data.contextPath = c.ids[0] || c.data.contextPath);
            var e = void 0;
            c.fn && c.fn !== f && (c.data = m.createFrame(c.data), e = c.data["partial-block"] = c.fn, e.partials && (c.partials = r.extend({}, c.partials, e.partials)));
            void 0 === a && e && (a = e);
            if (void 0 === a) throw new n["default"]("The partial " +
                c.name + " could not be found");
            if (a instanceof Function) return a(b, c)
        };
        b.noop = f;
        b = c(5);
        var r = q(b);
        b = c(6);
        var n = a(b),
            m = c(4)
    }, function (a, b) {
        (function (c) {
            b.__esModule = !0;
            b["default"] = function (a) {
                var b = "undefined" !== typeof c ? c : window,
                    d = b.Handlebars;
                a.noConflict = function () {
                    b.Handlebars === a && (b.Handlebars = d);
                    return a
                }
            };
            a.exports = b["default"]
        }).call(b, function () {
            return this
        }())
    }, function (a, b) {
        b.__esModule = !0;
        var c = {
            helpers: {
                helperExpression: function (a) {
                    return "SubExpression" === a.type || ("MustacheStatement" ===
                        a.type || "BlockStatement" === a.type) && !!(a.params && a.params.length || a.hash)
                },
                scopedId: function (a) {
                    return /^\.|this\b/.test(a.original)
                },
                simpleId: function (a) {
                    return 1 === a.parts.length && !c.helpers.scopedId(a) && !a.depth
                }
            }
        };
        b["default"] = c;
        a.exports = b["default"]
    }, function (a, b, c) {
        var d = c(1)["default"];
        a = c(3)["default"];
        b.__esModule = !0;
        b.parse = function (a, b) {
            if ("Program" === a.type) return a;
            g["default"].yy = q;
            q.locInfo = function (a) {
                return new q.SourceLocation(b && b.srcName, a)
            };
            return (new l["default"](b)).accept(g["default"].parse(a))
        };
        var f = c(23),
            g = d(f);
        f = c(24);
        var l = d(f);
        d = c(26);
        a = a(d);
        c = c(5);
        b.parser = g["default"];
        var q = {};
        c.extend(q, a)
    }, function (a, b) {
        a = function () {
            function a() {
                this.yy = {}
            }
            var b = {
                    trace: function () {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        root: 3,
                        program: 4,
                        EOF: 5,
                        program_repetition0: 6,
                        statement: 7,
                        mustache: 8,
                        block: 9,
                        rawBlock: 10,
                        partial: 11,
                        partialBlock: 12,
                        content: 13,
                        COMMENT: 14,
                        CONTENT: 15,
                        openRawBlock: 16,
                        rawBlock_repetition_plus0: 17,
                        END_RAW_BLOCK: 18,
                        OPEN_RAW_BLOCK: 19,
                        helperName: 20,
                        openRawBlock_repetition0: 21,
                        openRawBlock_option0: 22,
                        CLOSE_RAW_BLOCK: 23,
                        openBlock: 24,
                        block_option0: 25,
                        closeBlock: 26,
                        openInverse: 27,
                        block_option1: 28,
                        OPEN_BLOCK: 29,
                        openBlock_repetition0: 30,
                        openBlock_option0: 31,
                        openBlock_option1: 32,
                        CLOSE: 33,
                        OPEN_INVERSE: 34,
                        openInverse_repetition0: 35,
                        openInverse_option0: 36,
                        openInverse_option1: 37,
                        openInverseChain: 38,
                        OPEN_INVERSE_CHAIN: 39,
                        openInverseChain_repetition0: 40,
                        openInverseChain_option0: 41,
                        openInverseChain_option1: 42,
                        inverseAndProgram: 43,
                        INVERSE: 44,
                        inverseChain: 45,
                        inverseChain_option0: 46,
                        OPEN_ENDBLOCK: 47,
                        OPEN: 48,
                        mustache_repetition0: 49,
                        mustache_option0: 50,
                        OPEN_UNESCAPED: 51,
                        mustache_repetition1: 52,
                        mustache_option1: 53,
                        CLOSE_UNESCAPED: 54,
                        OPEN_PARTIAL: 55,
                        partialName: 56,
                        partial_repetition0: 57,
                        partial_option0: 58,
                        openPartialBlock: 59,
                        OPEN_PARTIAL_BLOCK: 60,
                        openPartialBlock_repetition0: 61,
                        openPartialBlock_option0: 62,
                        param: 63,
                        sexpr: 64,
                        OPEN_SEXPR: 65,
                        sexpr_repetition0: 66,
                        sexpr_option0: 67,
                        CLOSE_SEXPR: 68,
                        hash: 69,
                        hash_repetition_plus0: 70,
                        hashSegment: 71,
                        ID: 72,
                        EQUALS: 73,
                        blockParams: 74,
                        OPEN_BLOCK_PARAMS: 75,
                        blockParams_repetition_plus0: 76,
                        CLOSE_BLOCK_PARAMS: 77,
                        path: 78,
                        dataName: 79,
                        STRING: 80,
                        NUMBER: 81,
                        BOOLEAN: 82,
                        UNDEFINED: 83,
                        NULL: 84,
                        DATA: 85,
                        pathSegments: 86,
                        SEP: 87,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        14: "COMMENT",
                        15: "CONTENT",
                        18: "END_RAW_BLOCK",
                        19: "OPEN_RAW_BLOCK",
                        23: "CLOSE_RAW_BLOCK",
                        29: "OPEN_BLOCK",
                        33: "CLOSE",
                        34: "OPEN_INVERSE",
                        39: "OPEN_INVERSE_CHAIN",
                        44: "INVERSE",
                        47: "OPEN_ENDBLOCK",
                        48: "OPEN",
                        51: "OPEN_UNESCAPED",
                        54: "CLOSE_UNESCAPED",
                        55: "OPEN_PARTIAL",
                        60: "OPEN_PARTIAL_BLOCK",
                        65: "OPEN_SEXPR",
                        68: "CLOSE_SEXPR",
                        72: "ID",
                        73: "EQUALS",
                        75: "OPEN_BLOCK_PARAMS",
                        77: "CLOSE_BLOCK_PARAMS",
                        80: "STRING",
                        81: "NUMBER",
                        82: "BOOLEAN",
                        83: "UNDEFINED",
                        84: "NULL",
                        85: "DATA",
                        87: "SEP"
                    },
                    productions_: [0, [3, 2],
                        [4, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [13, 1],
                        [10, 3],
                        [16, 5],
                        [9, 4],
                        [9, 4],
                        [24, 6],
                        [27, 6],
                        [38, 6],
                        [43, 2],
                        [45, 3],
                        [45, 1],
                        [26, 3],
                        [8, 5],
                        [8, 5],
                        [11, 5],
                        [12, 3],
                        [59, 5],
                        [63, 1],
                        [63, 1],
                        [64, 5],
                        [69, 1],
                        [71, 3],
                        [74, 3],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [56, 1],
                        [56, 1],
                        [79, 2],
                        [78, 1],
                        [86, 3],
                        [86, 1],
                        [6, 0],
                        [6, 2],
                        [17, 1],
                        [17, 2],
                        [21, 0],
                        [21, 2],
                        [22, 0],
                        [22, 1],
                        [25, 0],
                        [25, 1],
                        [28, 0],
                        [28, 1],
                        [30, 0],
                        [30, 2],
                        [31, 0],
                        [31, 1],
                        [32, 0],
                        [32, 1],
                        [35, 0],
                        [35, 2],
                        [36, 0],
                        [36, 1],
                        [37, 0],
                        [37, 1],
                        [40, 0],
                        [40, 2],
                        [41, 0],
                        [41, 1],
                        [42, 0],
                        [42, 1],
                        [46, 0],
                        [46, 1],
                        [49, 0],
                        [49, 2],
                        [50, 0],
                        [50, 1],
                        [52, 0],
                        [52, 2],
                        [53, 0],
                        [53, 1],
                        [57, 0],
                        [57, 2],
                        [58, 0],
                        [58, 1],
                        [61, 0],
                        [61, 2],
                        [62, 0],
                        [62, 1],
                        [66, 0],
                        [66, 2],
                        [67, 0],
                        [67, 1],
                        [70, 1],
                        [70, 2],
                        [76, 1],
                        [76, 2]
                    ],
                    performAction: function (a, b, c, d, f, m, w) {
                        a = m.length - 1;
                        switch (f) {
                            case 1:
                                return m[a - 1];
                            case 2:
                                this.$ = d.prepareProgram(m[a]);
                                break;
                            case 3:
                                this.$ = m[a];
                                break;
                            case 4:
                                this.$ =
                                    m[a];
                                break;
                            case 5:
                                this.$ = m[a];
                                break;
                            case 6:
                                this.$ = m[a];
                                break;
                            case 7:
                                this.$ = m[a];
                                break;
                            case 8:
                                this.$ = m[a];
                                break;
                            case 9:
                                this.$ = {
                                    type: "CommentStatement",
                                    value: d.stripComment(m[a]),
                                    strip: d.stripFlags(m[a], m[a]),
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 10:
                                this.$ = {
                                    type: "ContentStatement",
                                    original: m[a],
                                    value: m[a],
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 11:
                                this.$ = d.prepareRawBlock(m[a - 2], m[a - 1], m[a], this._$);
                                break;
                            case 12:
                                this.$ = {
                                    path: m[a - 3],
                                    params: m[a - 2],
                                    hash: m[a - 1]
                                };
                                break;
                            case 13:
                                this.$ = d.prepareBlock(m[a - 3], m[a -
                                    2], m[a - 1], m[a], !1, this._$);
                                break;
                            case 14:
                                this.$ = d.prepareBlock(m[a - 3], m[a - 2], m[a - 1], m[a], !0, this._$);
                                break;
                            case 15:
                                this.$ = {
                                    open: m[a - 5],
                                    path: m[a - 4],
                                    params: m[a - 3],
                                    hash: m[a - 2],
                                    blockParams: m[a - 1],
                                    strip: d.stripFlags(m[a - 5], m[a])
                                };
                                break;
                            case 16:
                                this.$ = {
                                    path: m[a - 4],
                                    params: m[a - 3],
                                    hash: m[a - 2],
                                    blockParams: m[a - 1],
                                    strip: d.stripFlags(m[a - 5], m[a])
                                };
                                break;
                            case 17:
                                this.$ = {
                                    path: m[a - 4],
                                    params: m[a - 3],
                                    hash: m[a - 2],
                                    blockParams: m[a - 1],
                                    strip: d.stripFlags(m[a - 5], m[a])
                                };
                                break;
                            case 18:
                                this.$ = {
                                    strip: d.stripFlags(m[a - 1], m[a -
                                        1]),
                                    program: m[a]
                                };
                                break;
                            case 19:
                                f = d.prepareBlock(m[a - 2], m[a - 1], m[a], m[a], !1, this._$);
                                d = d.prepareProgram([f], m[a - 1].loc);
                                d.chained = !0;
                                this.$ = {
                                    strip: m[a - 2].strip,
                                    program: d,
                                    chain: !0
                                };
                                break;
                            case 20:
                                this.$ = m[a];
                                break;
                            case 21:
                                this.$ = {
                                    path: m[a - 1],
                                    strip: d.stripFlags(m[a - 2], m[a])
                                };
                                break;
                            case 22:
                                this.$ = d.prepareMustache(m[a - 3], m[a - 2], m[a - 1], m[a - 4], d.stripFlags(m[a - 4], m[a]), this._$);
                                break;
                            case 23:
                                this.$ = d.prepareMustache(m[a - 3], m[a - 2], m[a - 1], m[a - 4], d.stripFlags(m[a - 4], m[a]), this._$);
                                break;
                            case 24:
                                this.$ = {
                                    type: "PartialStatement",
                                    name: m[a - 3],
                                    params: m[a - 2],
                                    hash: m[a - 1],
                                    indent: "",
                                    strip: d.stripFlags(m[a - 4], m[a]),
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 25:
                                this.$ = d.preparePartialBlock(m[a - 2], m[a - 1], m[a], this._$);
                                break;
                            case 26:
                                this.$ = {
                                    path: m[a - 3],
                                    params: m[a - 2],
                                    hash: m[a - 1],
                                    strip: d.stripFlags(m[a - 4], m[a])
                                };
                                break;
                            case 27:
                                this.$ = m[a];
                                break;
                            case 28:
                                this.$ = m[a];
                                break;
                            case 29:
                                this.$ = {
                                    type: "SubExpression",
                                    path: m[a - 3],
                                    params: m[a - 2],
                                    hash: m[a - 1],
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 30:
                                this.$ = {
                                    type: "Hash",
                                    pairs: m[a],
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 31:
                                this.$ = {
                                    type: "HashPair",
                                    key: d.id(m[a - 2]),
                                    value: m[a],
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 32:
                                this.$ = d.id(m[a - 1]);
                                break;
                            case 33:
                                this.$ = m[a];
                                break;
                            case 34:
                                this.$ = m[a];
                                break;
                            case 35:
                                this.$ = {
                                    type: "StringLiteral",
                                    value: m[a],
                                    original: m[a],
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 36:
                                this.$ = {
                                    type: "NumberLiteral",
                                    value: Number(m[a]),
                                    original: Number(m[a]),
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 37:
                                this.$ = {
                                    type: "BooleanLiteral",
                                    value: "true" === m[a],
                                    original: "true" === m[a],
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 38:
                                this.$ = {
                                    type: "UndefinedLiteral",
                                    original: void 0,
                                    value: void 0,
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 39:
                                this.$ = {
                                    type: "NullLiteral",
                                    original: null,
                                    value: null,
                                    loc: d.locInfo(this._$)
                                };
                                break;
                            case 40:
                                this.$ = m[a];
                                break;
                            case 41:
                                this.$ = m[a];
                                break;
                            case 42:
                                this.$ = d.preparePath(!0, m[a], this._$);
                                break;
                            case 43:
                                this.$ = d.preparePath(!1, m[a], this._$);
                                break;
                            case 44:
                                m[a - 2].push({
                                    part: d.id(m[a]),
                                    original: m[a],
                                    separator: m[a - 1]
                                });
                                this.$ = m[a - 2];
                                break;
                            case 45:
                                this.$ = [{
                                    part: d.id(m[a]),
                                    original: m[a]
                                }];
                                break;
                            case 46:
                                this.$ = [];
                                break;
                            case 47:
                                m[a - 1].push(m[a]);
                                break;
                            case 48:
                                this.$ = [m[a]];
                                break;
                            case 49:
                                m[a - 1].push(m[a]);
                                break;
                            case 50:
                                this.$ = [];
                                break;
                            case 51:
                                m[a - 1].push(m[a]);
                                break;
                            case 58:
                                this.$ = [];
                                break;
                            case 59:
                                m[a - 1].push(m[a]);
                                break;
                            case 64:
                                this.$ = [];
                                break;
                            case 65:
                                m[a - 1].push(m[a]);
                                break;
                            case 70:
                                this.$ = [];
                                break;
                            case 71:
                                m[a - 1].push(m[a]);
                                break;
                            case 78:
                                this.$ = [];
                                break;
                            case 79:
                                m[a - 1].push(m[a]);
                                break;
                            case 82:
                                this.$ = [];
                                break;
                            case 83:
                                m[a - 1].push(m[a]);
                                break;
                            case 86:
                                this.$ = [];
                                break;
                            case 87:
                                m[a - 1].push(m[a]);
                                break;
                            case 90:
                                this.$ = [];
                                break;
                            case 91:
                                m[a - 1].push(m[a]);
                                break;
                            case 94:
                                this.$ = [];
                                break;
                            case 95:
                                m[a - 1].push(m[a]);
                                break;
                            case 98:
                                this.$ = [m[a]];
                                break;
                            case 99:
                                m[a - 1].push(m[a]);
                                break;
                            case 100:
                                this.$ = [m[a]];
                                break;
                            case 101:
                                m[a - 1].push(m[a])
                        }
                    },
                    table: [{
                            3: 1,
                            4: 2,
                            5: [2, 46],
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            1: [3]
                        }, {
                            5: [1, 4]
                        }, {
                            5: [2, 2],
                            7: 5,
                            8: 6,
                            9: 7,
                            10: 8,
                            11: 9,
                            12: 10,
                            13: 11,
                            14: [1, 12],
                            15: [1, 20],
                            16: 17,
                            19: [1, 23],
                            24: 15,
                            27: 16,
                            29: [1, 21],
                            34: [1, 22],
                            39: [2, 2],
                            44: [2, 2],
                            47: [2, 2],
                            48: [1, 13],
                            51: [1, 14],
                            55: [1, 18],
                            59: 19,
                            60: [1, 24]
                        },
                        {
                            1: [2, 1]
                        }, {
                            5: [2, 47],
                            14: [2, 47],
                            15: [2, 47],
                            19: [2, 47],
                            29: [2, 47],
                            34: [2, 47],
                            39: [2, 47],
                            44: [2, 47],
                            47: [2, 47],
                            48: [2, 47],
                            51: [2, 47],
                            55: [2, 47],
                            60: [2, 47]
                        }, {
                            5: [2, 3],
                            14: [2, 3],
                            15: [2, 3],
                            19: [2, 3],
                            29: [2, 3],
                            34: [2, 3],
                            39: [2, 3],
                            44: [2, 3],
                            47: [2, 3],
                            48: [2, 3],
                            51: [2, 3],
                            55: [2, 3],
                            60: [2, 3]
                        }, {
                            5: [2, 4],
                            14: [2, 4],
                            15: [2, 4],
                            19: [2, 4],
                            29: [2, 4],
                            34: [2, 4],
                            39: [2, 4],
                            44: [2, 4],
                            47: [2, 4],
                            48: [2, 4],
                            51: [2, 4],
                            55: [2, 4],
                            60: [2, 4]
                        }, {
                            5: [2, 5],
                            14: [2, 5],
                            15: [2, 5],
                            19: [2, 5],
                            29: [2, 5],
                            34: [2, 5],
                            39: [2, 5],
                            44: [2, 5],
                            47: [2, 5],
                            48: [2, 5],
                            51: [2, 5],
                            55: [2, 5],
                            60: [2, 5]
                        }, {
                            5: [2,
                                6
                            ],
                            14: [2, 6],
                            15: [2, 6],
                            19: [2, 6],
                            29: [2, 6],
                            34: [2, 6],
                            39: [2, 6],
                            44: [2, 6],
                            47: [2, 6],
                            48: [2, 6],
                            51: [2, 6],
                            55: [2, 6],
                            60: [2, 6]
                        }, {
                            5: [2, 7],
                            14: [2, 7],
                            15: [2, 7],
                            19: [2, 7],
                            29: [2, 7],
                            34: [2, 7],
                            39: [2, 7],
                            44: [2, 7],
                            47: [2, 7],
                            48: [2, 7],
                            51: [2, 7],
                            55: [2, 7],
                            60: [2, 7]
                        }, {
                            5: [2, 8],
                            14: [2, 8],
                            15: [2, 8],
                            19: [2, 8],
                            29: [2, 8],
                            34: [2, 8],
                            39: [2, 8],
                            44: [2, 8],
                            47: [2, 8],
                            48: [2, 8],
                            51: [2, 8],
                            55: [2, 8],
                            60: [2, 8]
                        }, {
                            5: [2, 9],
                            14: [2, 9],
                            15: [2, 9],
                            19: [2, 9],
                            29: [2, 9],
                            34: [2, 9],
                            39: [2, 9],
                            44: [2, 9],
                            47: [2, 9],
                            48: [2, 9],
                            51: [2, 9],
                            55: [2, 9],
                            60: [2, 9]
                        }, {
                            20: 25,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1,
                                28
                            ],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 36,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 37,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            4: 38,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            13: 40,
                            15: [1, 20],
                            17: 39
                        }, {
                            20: 42,
                            56: 41,
                            64: 43,
                            65: [1, 44],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 45,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            5: [2, 10],
                            14: [2, 10],
                            15: [2, 10],
                            18: [2, 10],
                            19: [2, 10],
                            29: [2, 10],
                            34: [2, 10],
                            39: [2, 10],
                            44: [2, 10],
                            47: [2, 10],
                            48: [2, 10],
                            51: [2, 10],
                            55: [2, 10],
                            60: [2, 10]
                        }, {
                            20: 46,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 47,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 48,
                            72: [1,
                                35
                            ],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 42,
                            56: 49,
                            64: 43,
                            65: [1, 44],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            33: [2, 78],
                            49: 50,
                            65: [2, 78],
                            72: [2, 78],
                            80: [2, 78],
                            81: [2, 78],
                            82: [2, 78],
                            83: [2, 78],
                            84: [2, 78],
                            85: [2, 78]
                        }, {
                            23: [2, 33],
                            33: [2, 33],
                            54: [2, 33],
                            65: [2, 33],
                            68: [2, 33],
                            72: [2, 33],
                            75: [2, 33],
                            80: [2, 33],
                            81: [2, 33],
                            82: [2, 33],
                            83: [2, 33],
                            84: [2, 33],
                            85: [2, 33]
                        }, {
                            23: [2, 34],
                            33: [2, 34],
                            54: [2, 34],
                            65: [2, 34],
                            68: [2, 34],
                            72: [2, 34],
                            75: [2, 34],
                            80: [2, 34],
                            81: [2, 34],
                            82: [2, 34],
                            83: [2, 34],
                            84: [2, 34],
                            85: [2, 34]
                        }, {
                            23: [2, 35],
                            33: [2, 35],
                            54: [2, 35],
                            65: [2, 35],
                            68: [2, 35],
                            72: [2, 35],
                            75: [2, 35],
                            80: [2, 35],
                            81: [2, 35],
                            82: [2, 35],
                            83: [2, 35],
                            84: [2, 35],
                            85: [2, 35]
                        }, {
                            23: [2, 36],
                            33: [2, 36],
                            54: [2, 36],
                            65: [2, 36],
                            68: [2, 36],
                            72: [2, 36],
                            75: [2, 36],
                            80: [2, 36],
                            81: [2, 36],
                            82: [2, 36],
                            83: [2, 36],
                            84: [2, 36],
                            85: [2, 36]
                        }, {
                            23: [2, 37],
                            33: [2, 37],
                            54: [2, 37],
                            65: [2, 37],
                            68: [2, 37],
                            72: [2, 37],
                            75: [2, 37],
                            80: [2, 37],
                            81: [2, 37],
                            82: [2, 37],
                            83: [2, 37],
                            84: [2, 37],
                            85: [2, 37]
                        }, {
                            23: [2, 38],
                            33: [2, 38],
                            54: [2, 38],
                            65: [2, 38],
                            68: [2,
                                38
                            ],
                            72: [2, 38],
                            75: [2, 38],
                            80: [2, 38],
                            81: [2, 38],
                            82: [2, 38],
                            83: [2, 38],
                            84: [2, 38],
                            85: [2, 38]
                        }, {
                            23: [2, 39],
                            33: [2, 39],
                            54: [2, 39],
                            65: [2, 39],
                            68: [2, 39],
                            72: [2, 39],
                            75: [2, 39],
                            80: [2, 39],
                            81: [2, 39],
                            82: [2, 39],
                            83: [2, 39],
                            84: [2, 39],
                            85: [2, 39]
                        }, {
                            23: [2, 43],
                            33: [2, 43],
                            54: [2, 43],
                            65: [2, 43],
                            68: [2, 43],
                            72: [2, 43],
                            75: [2, 43],
                            80: [2, 43],
                            81: [2, 43],
                            82: [2, 43],
                            83: [2, 43],
                            84: [2, 43],
                            85: [2, 43],
                            87: [1, 51]
                        }, {
                            72: [1, 35],
                            86: 52
                        }, {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2,
                                45
                            ],
                            87: [2, 45]
                        }, {
                            52: 53,
                            54: [2, 82],
                            65: [2, 82],
                            72: [2, 82],
                            80: [2, 82],
                            81: [2, 82],
                            82: [2, 82],
                            83: [2, 82],
                            84: [2, 82],
                            85: [2, 82]
                        }, {
                            25: 54,
                            38: 56,
                            39: [1, 58],
                            43: 57,
                            44: [1, 59],
                            45: 55,
                            47: [2, 54]
                        }, {
                            28: 60,
                            43: 61,
                            44: [1, 59],
                            47: [2, 56]
                        }, {
                            13: 63,
                            15: [1, 20],
                            18: [1, 62]
                        }, {
                            15: [2, 48],
                            18: [2, 48]
                        }, {
                            33: [2, 86],
                            57: 64,
                            65: [2, 86],
                            72: [2, 86],
                            80: [2, 86],
                            81: [2, 86],
                            82: [2, 86],
                            83: [2, 86],
                            84: [2, 86],
                            85: [2, 86]
                        }, {
                            33: [2, 40],
                            65: [2, 40],
                            72: [2, 40],
                            80: [2, 40],
                            81: [2, 40],
                            82: [2, 40],
                            83: [2, 40],
                            84: [2, 40],
                            85: [2, 40]
                        }, {
                            33: [2, 41],
                            65: [2, 41],
                            72: [2, 41],
                            80: [2, 41],
                            81: [2, 41],
                            82: [2, 41],
                            83: [2, 41],
                            84: [2, 41],
                            85: [2, 41]
                        }, {
                            20: 65,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            26: 66,
                            47: [1, 67]
                        }, {
                            30: 68,
                            33: [2, 58],
                            65: [2, 58],
                            72: [2, 58],
                            75: [2, 58],
                            80: [2, 58],
                            81: [2, 58],
                            82: [2, 58],
                            83: [2, 58],
                            84: [2, 58],
                            85: [2, 58]
                        }, {
                            33: [2, 64],
                            35: 69,
                            65: [2, 64],
                            72: [2, 64],
                            75: [2, 64],
                            80: [2, 64],
                            81: [2, 64],
                            82: [2, 64],
                            83: [2, 64],
                            84: [2, 64],
                            85: [2, 64]
                        }, {
                            21: 70,
                            23: [2, 50],
                            65: [2, 50],
                            72: [2, 50],
                            80: [2, 50],
                            81: [2, 50],
                            82: [2, 50],
                            83: [2, 50],
                            84: [2, 50],
                            85: [2, 50]
                        }, {
                            33: [2, 90],
                            61: 71,
                            65: [2, 90],
                            72: [2, 90],
                            80: [2,
                                90
                            ],
                            81: [2, 90],
                            82: [2, 90],
                            83: [2, 90],
                            84: [2, 90],
                            85: [2, 90]
                        }, {
                            20: 75,
                            33: [2, 80],
                            50: 72,
                            63: 73,
                            64: 76,
                            65: [1, 44],
                            69: 74,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            72: [1, 80]
                        }, {
                            23: [2, 42],
                            33: [2, 42],
                            54: [2, 42],
                            65: [2, 42],
                            68: [2, 42],
                            72: [2, 42],
                            75: [2, 42],
                            80: [2, 42],
                            81: [2, 42],
                            82: [2, 42],
                            83: [2, 42],
                            84: [2, 42],
                            85: [2, 42],
                            87: [1, 51]
                        }, {
                            20: 75,
                            53: 81,
                            54: [2, 84],
                            63: 82,
                            64: 76,
                            65: [1, 44],
                            69: 83,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1,
                                34
                            ],
                            86: 33
                        }, {
                            26: 84,
                            47: [1, 67]
                        }, {
                            47: [2, 55]
                        }, {
                            4: 85,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            47: [2, 20]
                        }, {
                            20: 86,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 87,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            26: 88,
                            47: [1, 67]
                        }, {
                            47: [2, 57]
                        }, {
                            5: [2, 11],
                            14: [2, 11],
                            15: [2, 11],
                            19: [2, 11],
                            29: [2, 11],
                            34: [2, 11],
                            39: [2, 11],
                            44: [2, 11],
                            47: [2, 11],
                            48: [2, 11],
                            51: [2, 11],
                            55: [2, 11],
                            60: [2, 11]
                        }, {
                            15: [2, 49],
                            18: [2, 49]
                        }, {
                            20: 75,
                            33: [2, 88],
                            58: 89,
                            63: 90,
                            64: 76,
                            65: [1, 44],
                            69: 91,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            65: [2, 94],
                            66: 92,
                            68: [2, 94],
                            72: [2, 94],
                            80: [2, 94],
                            81: [2, 94],
                            82: [2, 94],
                            83: [2, 94],
                            84: [2, 94],
                            85: [2, 94]
                        }, {
                            5: [2, 25],
                            14: [2, 25],
                            15: [2, 25],
                            19: [2, 25],
                            29: [2, 25],
                            34: [2, 25],
                            39: [2, 25],
                            44: [2, 25],
                            47: [2, 25],
                            48: [2, 25],
                            51: [2, 25],
                            55: [2, 25],
                            60: [2, 25]
                        }, {
                            20: 93,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            31: 94,
                            33: [2, 60],
                            63: 95,
                            64: 76,
                            65: [1, 44],
                            69: 96,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            75: [2, 60],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            33: [2, 66],
                            36: 97,
                            63: 98,
                            64: 76,
                            65: [1, 44],
                            69: 99,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            75: [2, 66],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            22: 100,
                            23: [2, 52],
                            63: 101,
                            64: 76,
                            65: [1, 44],
                            69: 102,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1,
                                32
                            ],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            33: [2, 92],
                            62: 103,
                            63: 104,
                            64: 76,
                            65: [1, 44],
                            69: 105,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            33: [1, 106]
                        }, {
                            33: [2, 79],
                            65: [2, 79],
                            72: [2, 79],
                            80: [2, 79],
                            81: [2, 79],
                            82: [2, 79],
                            83: [2, 79],
                            84: [2, 79],
                            85: [2, 79]
                        }, {
                            33: [2, 81]
                        }, {
                            23: [2, 27],
                            33: [2, 27],
                            54: [2, 27],
                            65: [2, 27],
                            68: [2, 27],
                            72: [2, 27],
                            75: [2, 27],
                            80: [2, 27],
                            81: [2, 27],
                            82: [2, 27],
                            83: [2, 27],
                            84: [2, 27],
                            85: [2, 27]
                        }, {
                            23: [2, 28],
                            33: [2, 28],
                            54: [2, 28],
                            65: [2, 28],
                            68: [2, 28],
                            72: [2, 28],
                            75: [2, 28],
                            80: [2,
                                28
                            ],
                            81: [2, 28],
                            82: [2, 28],
                            83: [2, 28],
                            84: [2, 28],
                            85: [2, 28]
                        }, {
                            23: [2, 30],
                            33: [2, 30],
                            54: [2, 30],
                            68: [2, 30],
                            71: 107,
                            72: [1, 108],
                            75: [2, 30]
                        }, {
                            23: [2, 98],
                            33: [2, 98],
                            54: [2, 98],
                            68: [2, 98],
                            72: [2, 98],
                            75: [2, 98]
                        }, {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            73: [1, 109],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2, 45],
                            87: [2, 45]
                        }, {
                            23: [2, 44],
                            33: [2, 44],
                            54: [2, 44],
                            65: [2, 44],
                            68: [2, 44],
                            72: [2, 44],
                            75: [2, 44],
                            80: [2, 44],
                            81: [2, 44],
                            82: [2, 44],
                            83: [2, 44],
                            84: [2, 44],
                            85: [2, 44],
                            87: [2, 44]
                        }, {
                            54: [1, 110]
                        }, {
                            54: [2,
                                83
                            ],
                            65: [2, 83],
                            72: [2, 83],
                            80: [2, 83],
                            81: [2, 83],
                            82: [2, 83],
                            83: [2, 83],
                            84: [2, 83],
                            85: [2, 83]
                        }, {
                            54: [2, 85]
                        }, {
                            5: [2, 13],
                            14: [2, 13],
                            15: [2, 13],
                            19: [2, 13],
                            29: [2, 13],
                            34: [2, 13],
                            39: [2, 13],
                            44: [2, 13],
                            47: [2, 13],
                            48: [2, 13],
                            51: [2, 13],
                            55: [2, 13],
                            60: [2, 13]
                        }, {
                            38: 56,
                            39: [1, 58],
                            43: 57,
                            44: [1, 59],
                            45: 112,
                            46: 111,
                            47: [2, 76]
                        }, {
                            33: [2, 70],
                            40: 113,
                            65: [2, 70],
                            72: [2, 70],
                            75: [2, 70],
                            80: [2, 70],
                            81: [2, 70],
                            82: [2, 70],
                            83: [2, 70],
                            84: [2, 70],
                            85: [2, 70]
                        }, {
                            47: [2, 18]
                        }, {
                            5: [2, 14],
                            14: [2, 14],
                            15: [2, 14],
                            19: [2, 14],
                            29: [2, 14],
                            34: [2, 14],
                            39: [2, 14],
                            44: [2, 14],
                            47: [2, 14],
                            48: [2,
                                14
                            ],
                            51: [2, 14],
                            55: [2, 14],
                            60: [2, 14]
                        }, {
                            33: [1, 114]
                        }, {
                            33: [2, 87],
                            65: [2, 87],
                            72: [2, 87],
                            80: [2, 87],
                            81: [2, 87],
                            82: [2, 87],
                            83: [2, 87],
                            84: [2, 87],
                            85: [2, 87]
                        }, {
                            33: [2, 89]
                        }, {
                            20: 75,
                            63: 116,
                            64: 76,
                            65: [1, 44],
                            67: 115,
                            68: [2, 96],
                            69: 117,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            33: [1, 118]
                        }, {
                            32: 119,
                            33: [2, 62],
                            74: 120,
                            75: [1, 121]
                        }, {
                            33: [2, 59],
                            65: [2, 59],
                            72: [2, 59],
                            75: [2, 59],
                            80: [2, 59],
                            81: [2, 59],
                            82: [2, 59],
                            83: [2, 59],
                            84: [2, 59],
                            85: [2, 59]
                        }, {
                            33: [2, 61],
                            75: [2, 61]
                        }, {
                            33: [2, 68],
                            37: 122,
                            74: 123,
                            75: [1, 121]
                        }, {
                            33: [2, 65],
                            65: [2, 65],
                            72: [2, 65],
                            75: [2, 65],
                            80: [2, 65],
                            81: [2, 65],
                            82: [2, 65],
                            83: [2, 65],
                            84: [2, 65],
                            85: [2, 65]
                        }, {
                            33: [2, 67],
                            75: [2, 67]
                        }, {
                            23: [1, 124]
                        }, {
                            23: [2, 51],
                            65: [2, 51],
                            72: [2, 51],
                            80: [2, 51],
                            81: [2, 51],
                            82: [2, 51],
                            83: [2, 51],
                            84: [2, 51],
                            85: [2, 51]
                        }, {
                            23: [2, 53]
                        }, {
                            33: [1, 125]
                        }, {
                            33: [2, 91],
                            65: [2, 91],
                            72: [2, 91],
                            80: [2, 91],
                            81: [2, 91],
                            82: [2, 91],
                            83: [2, 91],
                            84: [2, 91],
                            85: [2, 91]
                        }, {
                            33: [2, 93]
                        }, {
                            5: [2, 22],
                            14: [2, 22],
                            15: [2, 22],
                            19: [2, 22],
                            29: [2, 22],
                            34: [2, 22],
                            39: [2, 22],
                            44: [2, 22],
                            47: [2, 22],
                            48: [2, 22],
                            51: [2, 22],
                            55: [2, 22],
                            60: [2, 22]
                        },
                        {
                            23: [2, 99],
                            33: [2, 99],
                            54: [2, 99],
                            68: [2, 99],
                            72: [2, 99],
                            75: [2, 99]
                        }, {
                            73: [1, 109]
                        }, {
                            20: 75,
                            63: 126,
                            64: 76,
                            65: [1, 44],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            5: [2, 23],
                            14: [2, 23],
                            15: [2, 23],
                            19: [2, 23],
                            29: [2, 23],
                            34: [2, 23],
                            39: [2, 23],
                            44: [2, 23],
                            47: [2, 23],
                            48: [2, 23],
                            51: [2, 23],
                            55: [2, 23],
                            60: [2, 23]
                        }, {
                            47: [2, 19]
                        }, {
                            47: [2, 77]
                        }, {
                            20: 75,
                            33: [2, 72],
                            41: 127,
                            63: 128,
                            64: 76,
                            65: [1, 44],
                            69: 129,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            75: [2, 72],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1,
                                34
                            ],
                            86: 33
                        }, {
                            5: [2, 24],
                            14: [2, 24],
                            15: [2, 24],
                            19: [2, 24],
                            29: [2, 24],
                            34: [2, 24],
                            39: [2, 24],
                            44: [2, 24],
                            47: [2, 24],
                            48: [2, 24],
                            51: [2, 24],
                            55: [2, 24],
                            60: [2, 24]
                        }, {
                            68: [1, 130]
                        }, {
                            65: [2, 95],
                            68: [2, 95],
                            72: [2, 95],
                            80: [2, 95],
                            81: [2, 95],
                            82: [2, 95],
                            83: [2, 95],
                            84: [2, 95],
                            85: [2, 95]
                        }, {
                            68: [2, 97]
                        }, {
                            5: [2, 21],
                            14: [2, 21],
                            15: [2, 21],
                            19: [2, 21],
                            29: [2, 21],
                            34: [2, 21],
                            39: [2, 21],
                            44: [2, 21],
                            47: [2, 21],
                            48: [2, 21],
                            51: [2, 21],
                            55: [2, 21],
                            60: [2, 21]
                        }, {
                            33: [1, 131]
                        }, {
                            33: [2, 63]
                        }, {
                            72: [1, 133],
                            76: 132
                        }, {
                            33: [1, 134]
                        }, {
                            33: [2, 69]
                        }, {
                            15: [2, 12]
                        }, {
                            14: [2, 26],
                            15: [2, 26],
                            19: [2, 26],
                            29: [2, 26],
                            34: [2, 26],
                            47: [2, 26],
                            48: [2, 26],
                            51: [2, 26],
                            55: [2, 26],
                            60: [2, 26]
                        }, {
                            23: [2, 31],
                            33: [2, 31],
                            54: [2, 31],
                            68: [2, 31],
                            72: [2, 31],
                            75: [2, 31]
                        }, {
                            33: [2, 74],
                            42: 135,
                            74: 136,
                            75: [1, 121]
                        }, {
                            33: [2, 71],
                            65: [2, 71],
                            72: [2, 71],
                            75: [2, 71],
                            80: [2, 71],
                            81: [2, 71],
                            82: [2, 71],
                            83: [2, 71],
                            84: [2, 71],
                            85: [2, 71]
                        }, {
                            33: [2, 73],
                            75: [2, 73]
                        }, {
                            23: [2, 29],
                            33: [2, 29],
                            54: [2, 29],
                            65: [2, 29],
                            68: [2, 29],
                            72: [2, 29],
                            75: [2, 29],
                            80: [2, 29],
                            81: [2, 29],
                            82: [2, 29],
                            83: [2, 29],
                            84: [2, 29],
                            85: [2, 29]
                        }, {
                            14: [2, 15],
                            15: [2, 15],
                            19: [2, 15],
                            29: [2, 15],
                            34: [2, 15],
                            39: [2, 15],
                            44: [2, 15],
                            47: [2,
                                15
                            ],
                            48: [2, 15],
                            51: [2, 15],
                            55: [2, 15],
                            60: [2, 15]
                        }, {
                            72: [1, 138],
                            77: [1, 137]
                        }, {
                            72: [2, 100],
                            77: [2, 100]
                        }, {
                            14: [2, 16],
                            15: [2, 16],
                            19: [2, 16],
                            29: [2, 16],
                            34: [2, 16],
                            44: [2, 16],
                            47: [2, 16],
                            48: [2, 16],
                            51: [2, 16],
                            55: [2, 16],
                            60: [2, 16]
                        }, {
                            33: [1, 139]
                        }, {
                            33: [2, 75]
                        }, {
                            33: [2, 32]
                        }, {
                            72: [2, 101],
                            77: [2, 101]
                        }, {
                            14: [2, 17],
                            15: [2, 17],
                            19: [2, 17],
                            29: [2, 17],
                            34: [2, 17],
                            39: [2, 17],
                            44: [2, 17],
                            47: [2, 17],
                            48: [2, 17],
                            51: [2, 17],
                            55: [2, 17],
                            60: [2, 17]
                        }
                    ],
                    defaultActions: {
                        4: [2, 1],
                        55: [2, 55],
                        57: [2, 20],
                        61: [2, 57],
                        74: [2, 81],
                        83: [2, 85],
                        87: [2, 18],
                        91: [2, 89],
                        102: [2, 53],
                        105: [2,
                            93
                        ],
                        111: [2, 19],
                        112: [2, 77],
                        117: [2, 97],
                        120: [2, 63],
                        123: [2, 69],
                        124: [2, 12],
                        136: [2, 75],
                        137: [2, 32]
                    },
                    parseError: function (a, b) {
                        throw Error(a);
                    },
                    parse: function (a) {
                        var b = [0],
                            c = [null],
                            d = [],
                            f = this.table,
                            g = "",
                            w = 0,
                            e = 0,
                            k = 0;
                        this.lexer.setInput(a);
                        this.lexer.yy = this.yy;
                        this.yy.lexer = this.lexer;
                        this.yy.parser = this;
                        "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                        a = this.lexer.yylloc;
                        d.push(a);
                        var y = this.lexer.options && this.lexer.options.ranges;
                        "function" === typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                        for (var h, x, z, A, E = {}, C, B;;) {
                            z = b[b.length - 1];
                            if (this.defaultActions[z]) A = this.defaultActions[z];
                            else {
                                if (null === h || "undefined" == typeof h) h = this.lexer.lex() || 1, "number" !== typeof h && (h = this.symbols_[h] || h);
                                A = f[z] && f[z][h]
                            }
                            if (!("undefined" !== typeof A && A.length && A[0] || k)) {
                                B = [];
                                for (C in f[z]) this.terminals_[C] && 2 < C && B.push("'" + this.terminals_[C] + "'");
                                var K = this.lexer.showPosition ? "Parse error on line " + (w + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + B.join(", ") + ", got '" + (this.terminals_[h] || h) + "'" :
                                    "Parse error on line " + (w + 1) + ": Unexpected " + (1 == h ? "end of input" : "'" + (this.terminals_[h] || h) + "'");
                                this.parseError(K, {
                                    text: this.lexer.match,
                                    token: this.terminals_[h] || h,
                                    line: this.lexer.yylineno,
                                    loc: a,
                                    expected: B
                                })
                            }
                            if (A[0] instanceof Array && 1 < A.length) throw Error("Parse Error: multiple actions possible at state: " + z + ", token: " + h);
                            switch (A[0]) {
                                case 1:
                                    b.push(h);
                                    c.push(this.lexer.yytext);
                                    d.push(this.lexer.yylloc);
                                    b.push(A[1]);
                                    h = null;
                                    x ? (h = x, x = null) : (e = this.lexer.yyleng, g = this.lexer.yytext, w = this.lexer.yylineno,
                                        a = this.lexer.yylloc, 0 < k && k--);
                                    break;
                                case 2:
                                    B = this.productions_[A[1]][1];
                                    E.$ = c[c.length - B];
                                    E._$ = {
                                        first_line: d[d.length - (B || 1)].first_line,
                                        last_line: d[d.length - 1].last_line,
                                        first_column: d[d.length - (B || 1)].first_column,
                                        last_column: d[d.length - 1].last_column
                                    };
                                    y && (E._$.range = [d[d.length - (B || 1)].range[0], d[d.length - 1].range[1]]);
                                    z = this.performAction.call(E, g, e, w, this.yy, A[1], c, d);
                                    if ("undefined" !== typeof z) return z;
                                    B && (b = b.slice(0, -2 * B), c = c.slice(0, -1 * B), d = d.slice(0, -1 * B));
                                    b.push(this.productions_[A[1]][0]);
                                    c.push(E.$);
                                    d.push(E._$);
                                    A = f[b[b.length - 2]][b[b.length - 1]];
                                    b.push(A);
                                    break;
                                case 3:
                                    return !0
                            }
                        }
                    }
                },
                f = function () {
                    return {
                        EOF: 1,
                        parseError: function (a, b) {
                            if (this.yy.parser) this.yy.parser.parseError(a, b);
                            else throw Error(a);
                        },
                        setInput: function (a) {
                            this._input = a;
                            this._more = this._less = this.done = !1;
                            this.yylineno = this.yyleng = 0;
                            this.yytext = this.matched = this.match = "";
                            this.conditionStack = ["INITIAL"];
                            this.yylloc = {
                                first_line: 1,
                                first_column: 0,
                                last_line: 1,
                                last_column: 0
                            };
                            this.options.ranges && (this.yylloc.range = [0, 0]);
                            this.offset = 0;
                            return this
                        },
                        input: function () {
                            var a = this._input[0];
                            this.yytext += a;
                            this.yyleng++;
                            this.offset++;
                            this.match += a;
                            this.matched += a;
                            a.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++;
                            this.options.ranges && this.yylloc.range[1]++;
                            this._input = this._input.slice(1);
                            return a
                        },
                        unput: function (a) {
                            var b = a.length,
                                c = a.split(/(?:\r\n?|\n)/g);
                            this._input = a + this._input;
                            this.yytext = this.yytext.substr(0, this.yytext.length - b - 1);
                            this.offset -= b;
                            a = this.match.split(/(?:\r\n?|\n)/g);
                            this.match = this.match.substr(0, this.match.length - 1);
                            this.matched = this.matched.substr(0, this.matched.length - 1);
                            c.length - 1 && (this.yylineno -= c.length - 1);
                            var d = this.yylloc.range;
                            this.yylloc = {
                                first_line: this.yylloc.first_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.first_column,
                                last_column: c ? (c.length === a.length ? this.yylloc.first_column : 0) + a[a.length - c.length].length - c[0].length : this.yylloc.first_column - b
                            };
                            this.options.ranges && (this.yylloc.range = [d[0], d[0] + this.yyleng - b]);
                            return this
                        },
                        more: function () {
                            this._more = !0;
                            return this
                        },
                        less: function (a) {
                            this.unput(this.match.slice(a))
                        },
                        pastInput: function () {
                            var a = this.matched.substr(0, this.matched.length - this.match.length);
                            return (20 < a.length ? "..." : "") + a.substr(-20).replace(/\n/g, "")
                        },
                        upcomingInput: function () {
                            var a = this.match;
                            20 > a.length && (a += this._input.substr(0, 20 - a.length));
                            return (a.substr(0, 20) + (20 < a.length ? "..." : "")).replace(/\n/g, "")
                        },
                        showPosition: function () {
                            var a = this.pastInput(),
                                b = Array(a.length + 1).join("-");
                            return a + this.upcomingInput() + "\n" + b + "^"
                        },
                        next: function () {
                            if (this.done) return this.EOF;
                            this._input || (this.done = !0);
                            var a;
                            this._more || (this.match = this.yytext = "");
                            for (var b = this._currentRules(), c = 0; c < b.length; c++)
                                if ((a = this._input.match(this.rules[b[c]])) && (!d || a[0].length > d[0].length)) {
                                    var d = a;
                                    var f = c;
                                    if (!this.options.flex) break
                                } if (d) {
                                if (a = d[0].match(/(?:\r\n?|\n).*/g)) this.yylineno += a.length;
                                this.yylloc = {
                                    first_line: this.yylloc.last_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.last_column,
                                    last_column: a ? a[a.length - 1].length - a[a.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column +
                                        d[0].length
                                };
                                this.yytext += d[0];
                                this.match += d[0];
                                this.matches = d;
                                this.yyleng = this.yytext.length;
                                this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]);
                                this._more = !1;
                                this._input = this._input.slice(d[0].length);
                                this.matched += d[0];
                                d = this.performAction.call(this, this.yy, this, b[f], this.conditionStack[this.conditionStack.length - 1]);
                                this.done && this._input && (this.done = !1);
                                if (d) return d
                            } else return "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" +
                                this.showPosition(), {
                                    text: "",
                                    token: null,
                                    line: this.yylineno
                                })
                        },
                        lex: function () {
                            var a = this.next();
                            return "undefined" !== typeof a ? a : this.lex()
                        },
                        begin: function (a) {
                            this.conditionStack.push(a)
                        },
                        popState: function () {
                            return this.conditionStack.pop()
                        },
                        _currentRules: function () {
                            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                        },
                        topState: function () {
                            return this.conditionStack[this.conditionStack.length - 2]
                        },
                        pushState: function (a) {
                            this.begin(a)
                        },
                        options: {},
                        performAction: function (a, b, c, d) {
                            function f(a,
                                c) {
                                return b.yytext = b.yytext.substr(a, b.yyleng - c)
                            }
                            switch (c) {
                                case 0:
                                    "\\\\" === b.yytext.slice(-2) ? (f(0, 1), this.begin("mu")) : "\\" === b.yytext.slice(-1) ? (f(0, 1), this.begin("emu")) : this.begin("mu");
                                    if (b.yytext) return 15;
                                    break;
                                case 1:
                                    return 15;
                                case 2:
                                    return this.popState(), 15;
                                case 3:
                                    return this.begin("raw"), 15;
                                case 4:
                                    this.popState();
                                    if ("raw" === this.conditionStack[this.conditionStack.length - 1]) return 15;
                                    b.yytext = b.yytext.substr(5, b.yyleng - 9);
                                    return "END_RAW_BLOCK";
                                case 5:
                                    return 15;
                                case 6:
                                    return this.popState(),
                                        14;
                                case 7:
                                    return 65;
                                case 8:
                                    return 68;
                                case 9:
                                    return 19;
                                case 10:
                                    return this.popState(), this.begin("raw"), 23;
                                case 11:
                                    return 55;
                                case 12:
                                    return 60;
                                case 13:
                                    return 29;
                                case 14:
                                    return 47;
                                case 15:
                                    return this.popState(), 44;
                                case 16:
                                    return this.popState(), 44;
                                case 17:
                                    return 34;
                                case 18:
                                    return 39;
                                case 19:
                                    return 51;
                                case 20:
                                    return 48;
                                case 21:
                                    this.unput(b.yytext);
                                    this.popState();
                                    this.begin("com");
                                    break;
                                case 22:
                                    return this.popState(), 14;
                                case 23:
                                    return 48;
                                case 24:
                                    return 73;
                                case 25:
                                    return 72;
                                case 26:
                                    return 72;
                                case 27:
                                    return 87;
                                case 29:
                                    return this.popState(), 54;
                                case 30:
                                    return this.popState(), 33;
                                case 31:
                                    return b.yytext = f(1, 2).replace(/\\"/g, '"'), 80;
                                case 32:
                                    return b.yytext = f(1, 2).replace(/\\'/g, "'"), 80;
                                case 33:
                                    return 85;
                                case 34:
                                    return 82;
                                case 35:
                                    return 82;
                                case 36:
                                    return 83;
                                case 37:
                                    return 84;
                                case 38:
                                    return 81;
                                case 39:
                                    return 75;
                                case 40:
                                    return 77;
                                case 41:
                                    return 72;
                                case 42:
                                    return b.yytext = b.yytext.replace(/\\([\\\]])/g, "$1"), 72;
                                case 43:
                                    return "INVALID";
                                case 44:
                                    return 5
                            }
                        },
                        rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,
                            /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/,
                            /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/
                        ],
                        conditions: {
                            mu: {
                                rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                                    29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44
                                ],
                                inclusive: !1
                            },
                            emu: {
                                rules: [2],
                                inclusive: !1
                            },
                            com: {
                                rules: [6],
                                inclusive: !1
                            },
                            raw: {
                                rules: [3, 4, 5],
                                inclusive: !1
                            },
                            INITIAL: {
                                rules: [0, 1, 44],
                                inclusive: !0
                            }
                        }
                    }
                }();
            b.lexer = f;
            a.prototype = b;
            b.Parser = a;
            return new a
        }();
        b.__esModule = !0;
        b["default"] = a
    }, function (a, b, c) {
        function d() {
            this.options = 0 >= arguments.length || void 0 === arguments[0] ? {} : arguments[0]
        }

        function f(a, b, c) {
            void 0 === b && (b = a.length);
            var e = a[b - 1];
            a = a[b - 2];
            if (!e) return c;
            if ("ContentStatement" === e.type) return (a ||
                !c ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(e.original)
        }

        function g(a, b, c) {
            void 0 === b && (b = -1);
            var e = a[b + 1];
            a = a[b + 2];
            if (!e) return c;
            if ("ContentStatement" === e.type) return (a || !c ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(e.original)
        }

        function l(a, b, c) {
            !(a = a[null == b ? 0 : b + 1]) || "ContentStatement" !== a.type || !c && a.rightStripped || (b = a.value, a.value = a.value.replace(c ? /^\s+/ : /^[ \t]*\r?\n?/, ""), a.rightStripped = a.value !== b)
        }

        function q(a, b, c) {
            if ((a = a[null == b ? a.length - 1 : b - 1]) && "ContentStatement" === a.type && (c || !a.leftStripped)) return b =
                a.value, a.value = a.value.replace(c ? /\s+$/ : /[ \t]+$/, ""), a.leftStripped = a.value !== b, a.leftStripped
        }
        var r = c(1)["default"];
        b.__esModule = !0;
        c = c(25);
        r = r(c);
        d.prototype = new r["default"];
        d.prototype.Program = function (a) {
            var b = !this.options.ignoreStandalone,
                c = !this.isRootSeen;
            this.isRootSeen = !0;
            for (var e = a.body, k = 0, d = e.length; k < d; k++) {
                var h = e[k],
                    x = this.accept(h);
                if (x) {
                    var z = f(e, k, c),
                        n = g(e, k, c),
                        r = x.openStandalone && z,
                        C = x.closeStandalone && n;
                    z = x.inlineStandalone && z && n;
                    x.close && l(e, k, !0);
                    x.open && q(e, k, !0);
                    b && z &&
                        (l(e, k), q(e, k) && "PartialStatement" === h.type && (h.indent = /([ \t]+$)/.exec(e[k - 1].original)[1]));
                    b && r && (l((h.program || h.inverse).body), q(e, k));
                    b && C && (l(e, k), q((h.inverse || h.program).body))
                }
            }
            return a
        };
        d.prototype.BlockStatement = d.prototype.DecoratorBlock = d.prototype.PartialBlockStatement = function (a) {
            this.accept(a.program);
            this.accept(a.inverse);
            var b = a.program || a.inverse,
                c = a.program && a.inverse,
                e = c,
                k = c;
            if (c && c.chained)
                for (e = c.body[0].program; k.chained;) k = k.body[k.body.length - 1].program;
            var d = {
                open: a.openStrip.open,
                close: a.closeStrip.close,
                openStandalone: g(b.body),
                closeStandalone: f((e || b).body)
            };
            a.openStrip.close && l(b.body, null, !0);
            c ? (c = a.inverseStrip, c.open && q(b.body, null, !0), c.close && l(e.body, null, !0), a.closeStrip.open && q(k.body, null, !0), !this.options.ignoreStandalone && f(b.body) && g(e.body) && (q(b.body), l(e.body))) : a.closeStrip.open && q(b.body, null, !0);
            return d
        };
        d.prototype.Decorator = d.prototype.MustacheStatement = function (a) {
            return a.strip
        };
        d.prototype.PartialStatement = d.prototype.CommentStatement = function (a) {
            a =
                a.strip || {};
            return {
                inlineStandalone: !0,
                open: a.open,
                close: a.close
            }
        };
        b["default"] = d;
        a.exports = b["default"]
    }, function (a, b, c) {
        function d() {
            this.parents = []
        }

        function f(a) {
            this.acceptRequired(a, "path");
            this.acceptArray(a.params);
            this.acceptKey(a, "hash")
        }

        function g(a) {
            f.call(this, a);
            this.acceptKey(a, "program");
            this.acceptKey(a, "inverse")
        }

        function l(a) {
            this.acceptRequired(a, "name");
            this.acceptArray(a.params);
            this.acceptKey(a, "hash")
        }
        var q = c(1)["default"];
        b.__esModule = !0;
        c = c(6);
        var r = q(c);
        d.prototype = {
            constructor: d,
            mutating: !1,
            acceptKey: function (a, b) {
                var c = this.accept(a[b]);
                if (this.mutating) {
                    if (c && !d.prototype[c.type]) throw new r["default"]('Unexpected node type "' + c.type + '" found when accepting ' + b + " on " + a.type);
                    a[b] = c
                }
            },
            acceptRequired: function (a, b) {
                this.acceptKey(a, b);
                if (!a[b]) throw new r["default"](a.type + " requires " + b);
            },
            acceptArray: function (a) {
                for (var b = 0, c = a.length; b < c; b++) this.acceptKey(a, b), a[b] || (a.splice(b, 1), b--, c--)
            },
            accept: function (a) {
                if (a) {
                    if (!this[a.type]) throw new r["default"]("Unknown type: " +
                        a.type, a);
                    this.current && this.parents.unshift(this.current);
                    this.current = a;
                    var b = this[a.type](a);
                    this.current = this.parents.shift();
                    if (!this.mutating || b) return b;
                    if (!1 !== b) return a
                }
            },
            Program: function (a) {
                this.acceptArray(a.body)
            },
            MustacheStatement: f,
            Decorator: f,
            BlockStatement: g,
            DecoratorBlock: g,
            PartialStatement: l,
            PartialBlockStatement: function (a) {
                l.call(this, a);
                this.acceptKey(a, "program")
            },
            ContentStatement: function () {},
            CommentStatement: function () {},
            SubExpression: f,
            PathExpression: function () {},
            StringLiteral: function () {},
            NumberLiteral: function () {},
            BooleanLiteral: function () {},
            UndefinedLiteral: function () {},
            NullLiteral: function () {},
            Hash: function (a) {
                this.acceptArray(a.pairs)
            },
            HashPair: function (a) {
                this.acceptRequired(a, "value")
            }
        };
        b["default"] = d;
        a.exports = b["default"]
    }, function (a, b, c) {
        function d(a, b) {
            b = b.path ? b.path.original : b;
            if (a.path.original !== b) throw new f["default"](a.path.original + " doesn't match " + b, {
                loc: a.path.loc
            });
        }
        a = c(1)["default"];
        b.__esModule = !0;
        b.SourceLocation = function (a, b) {
            this.source = a;
            this.start = {
                line: b.first_line,
                column: b.first_column
            };
            this.end = {
                line: b.last_line,
                column: b.last_column
            }
        };
        b.id = function (a) {
            return /^\[.*\]$/.test(a) ? a.substr(1, a.length - 2) : a
        };
        b.stripFlags = function (a, b) {
            return {
                open: "~" === a.charAt(2),
                close: "~" === b.charAt(b.length - 3)
            }
        };
        b.stripComment = function (a) {
            return a.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "")
        };
        b.preparePath = function (a, b, c) {
            c = this.locInfo(c);
            for (var d = a ? "@" : "", g = [], m = 0, w = 0, e = b.length; w < e; w++) {
                var k = b[w].part,
                    y = b[w].original !== k;
                d += (b[w].separator || "") + k;
                if (y || ".." !== k &&
                    "." !== k && "this" !== k) g.push(k);
                else {
                    if (0 < g.length) throw new f["default"]("Invalid path: " + d, {
                        loc: c
                    });
                    ".." === k && m++
                }
            }
            return {
                type: "PathExpression",
                data: a,
                depth: m,
                parts: g,
                original: d,
                loc: c
            }
        };
        b.prepareMustache = function (a, b, c, d, f, m) {
            var g = d.charAt(3) || d.charAt(2);
            g = "{" !== g && "&" !== g;
            return {
                type: /\*/.test(d) ? "Decorator" : "MustacheStatement",
                path: a,
                params: b,
                hash: c,
                escaped: g,
                strip: f,
                loc: this.locInfo(m)
            }
        };
        b.prepareRawBlock = function (a, b, c, f) {
            d(a, c);
            f = this.locInfo(f);
            return {
                type: "BlockStatement",
                path: a.path,
                params: a.params,
                hash: a.hash,
                program: {
                    type: "Program",
                    body: b,
                    strip: {},
                    loc: f
                },
                openStrip: {},
                inverseStrip: {},
                closeStrip: {},
                loc: f
            }
        };
        b.prepareBlock = function (a, b, c, r, n, m) {
            r && r.path && d(a, r);
            var g = /\*/.test(a.open);
            b.blockParams = a.blockParams;
            var e = void 0,
                k = void 0;
            if (c) {
                if (g) throw new f["default"]("Unexpected inverse block on decorator", c);
                c.chain && (c.program.body[0].closeStrip = r.strip);
                k = c.strip;
                e = c.program
            }
            n && (n = e, e = b, b = n);
            return {
                type: g ? "DecoratorBlock" : "BlockStatement",
                path: a.path,
                params: a.params,
                hash: a.hash,
                program: b,
                inverse: e,
                openStrip: a.strip,
                inverseStrip: k,
                closeStrip: r && r.strip,
                loc: this.locInfo(m)
            }
        };
        b.prepareProgram = function (a, b) {
            if (!b && a.length) {
                var c = a[0].loc,
                    d = a[a.length - 1].loc;
                c && d && (b = {
                    source: c.source,
                    start: {
                        line: c.start.line,
                        column: c.start.column
                    },
                    end: {
                        line: d.end.line,
                        column: d.end.column
                    }
                })
            }
            return {
                type: "Program",
                body: a,
                strip: {},
                loc: b
            }
        };
        b.preparePartialBlock = function (a, b, c, f) {
            d(a, c);
            return {
                type: "PartialBlockStatement",
                name: a.path,
                params: a.params,
                hash: a.hash,
                program: b,
                openStrip: a.strip,
                closeStrip: c && c.strip,
                loc: this.locInfo(f)
            }
        };
        b = c(6);
        var f = a(b)
    }, function (a, b, c) {
        function d() {}

        function f(a, b) {
            if (a === b) return !0;
            if (q.isArray(a) && q.isArray(b) && a.length === b.length) {
                for (var c = 0; c < a.length; c++)
                    if (!f(a[c], b[c])) return !1;
                return !0
            }
        }

        function g(a) {
            if (!a.path.parts) {
                var b = a.path;
                a.path = {
                    type: "PathExpression",
                    data: !1,
                    depth: 0,
                    parts: [b.original + ""],
                    original: b.original + "",
                    loc: b.loc
                }
            }
        }
        a = c(1)["default"];
        b.__esModule = !0;
        b.Compiler = d;
        b.precompile = function (a, b, c) {
            if (null == a || "string" !== typeof a && "Program" !== a.type) throw new l["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " +
                a);
            b = b || {};
            "data" in b || (b.data = !0);
            b.compat && (b.useDepths = !0);
            a = c.parse(a, b);
            a = (new c.Compiler).compile(a, b);
            return (new c.JavaScriptCompiler).compile(a, b)
        };
        b.compile = function (a, b, c) {
            function e() {
                var e = c.parse(a, b);
                e = (new c.Compiler).compile(e, b);
                e = (new c.JavaScriptCompiler).compile(e, b, void 0, !0);
                return c.template(e)
            }

            function d(a, b) {
                h || (h = e());
                return h.call(this, a, b)
            }
            void 0 === b && (b = {});
            if (null == a || "string" !== typeof a && "Program" !== a.type) throw new l["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " +
                a);
            "data" in b || (b.data = !0);
            b.compat && (b.useDepths = !0);
            var h = void 0;
            d._setup = function (a) {
                h || (h = e());
                return h._setup(a)
            };
            d._child = function (a, b, c, k) {
                h || (h = e());
                return h._child(a, b, c, k)
            };
            return d
        };
        b = c(6);
        var l = a(b),
            q = c(5);
        c = c(21);
        var r = a(c),
            n = [].slice;
        d.prototype = {
            compiler: d,
            equals: function (a) {
                var b = this.opcodes.length;
                if (a.opcodes.length !== b) return !1;
                for (var c = 0; c < b; c++) {
                    var k = this.opcodes[c],
                        d = a.opcodes[c];
                    if (k.opcode !== d.opcode || !f(k.args, d.args)) return !1
                }
                b = this.children.length;
                for (c = 0; c < b; c++)
                    if (!this.children[c].equals(a.children[c])) return !1;
                return !0
            },
            guid: 0,
            compile: function (a, b) {
                this.sourceNode = [];
                this.opcodes = [];
                this.children = [];
                this.options = b;
                this.stringParams = b.stringParams;
                this.trackIds = b.trackIds;
                b.blockParams = b.blockParams || [];
                var c = b.knownHelpers;
                b.knownHelpers = {
                    helperMissing: !0,
                    blockHelperMissing: !0,
                    each: !0,
                    "if": !0,
                    unless: !0,
                    "with": !0,
                    log: !0,
                    lookup: !0
                };
                if (c)
                    for (var k in c) k in c && (b.knownHelpers[k] = c[k]);
                return this.accept(a)
            },
            compileProgram: function (a) {
                a = (new this.compiler).compile(a, this.options);
                var b = this.guid++;
                this.usePartial =
                    this.usePartial || a.usePartial;
                this.children[b] = a;
                this.useDepths = this.useDepths || a.useDepths;
                return b
            },
            accept: function (a) {
                if (!this[a.type]) throw new l["default"]("Unknown type: " + a.type, a);
                this.sourceNode.unshift(a);
                a = this[a.type](a);
                this.sourceNode.shift();
                return a
            },
            Program: function (a) {
                this.options.blockParams.unshift(a.blockParams);
                for (var b = a.body, c = b.length, k = 0; k < c; k++) this.accept(b[k]);
                this.options.blockParams.shift();
                this.isSimple = 1 === c;
                this.blockParams = a.blockParams ? a.blockParams.length : 0;
                return this
            },
            BlockStatement: function (a) {
                g(a);
                var b = a.program,
                    c = a.inverse;
                b = b && this.compileProgram(b);
                c = c && this.compileProgram(c);
                var k = this.classifySexpr(a);
                "helper" === k ? this.helperSexpr(a, b, c) : "simple" === k ? (this.simpleSexpr(a), this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("emptyHash"), this.opcode("blockValue", a.path.original)) : (this.ambiguousSexpr(a, b, c), this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue"));
                this.opcode("append")
            },
            DecoratorBlock: function (a) {
                var b = a.program && this.compileProgram(a.program);
                b = this.setupFullMustacheParams(a, b, void 0);
                a = a.path;
                this.useDecorators = !0;
                this.opcode("registerDecorator", b.length, a.original)
            },
            PartialStatement: function (a) {
                this.usePartial = !0;
                var b = a.program;
                b && (b = this.compileProgram(a.program));
                var c = a.params;
                if (1 < c.length) throw new l["default"]("Unsupported number of partial arguments: " + c.length, a);
                c.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : c.push({
                    type: "PathExpression",
                    parts: [],
                    depth: 0
                }));
                c = a.name.original;
                var k = "SubExpression" === a.name.type;
                k && this.accept(a.name);
                this.setupFullMustacheParams(a, b, void 0, !0);
                a = a.indent || "";
                this.options.preventIndent && a && (this.opcode("appendContent", a), a = "");
                this.opcode("invokePartial", k, c, a);
                this.opcode("append")
            },
            PartialBlockStatement: function (a) {
                this.PartialStatement(a)
            },
            MustacheStatement: function (a) {
                this.SubExpression(a);
                a.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
            },
            Decorator: function (a) {
                this.DecoratorBlock(a)
            },
            ContentStatement: function (a) {
                a.value && this.opcode("appendContent", a.value)
            },
            CommentStatement: function () {},
            SubExpression: function (a) {
                g(a);
                var b = this.classifySexpr(a);
                "simple" === b ? this.simpleSexpr(a) : "helper" === b ? this.helperSexpr(a) : this.ambiguousSexpr(a)
            },
            ambiguousSexpr: function (a, b, c) {
                a = a.path;
                var e = a.parts[0],
                    d = null != b || null != c;
                this.opcode("getContext", a.depth);
                this.opcode("pushProgram", b);
                this.opcode("pushProgram", c);
                a.strict = !0;
                this.accept(a);
                this.opcode("invokeAmbiguous", e, d)
            },
            simpleSexpr: function (a) {
                a =
                    a.path;
                a.strict = !0;
                this.accept(a);
                this.opcode("resolvePossibleLambda")
            },
            helperSexpr: function (a, b, c) {
                b = this.setupFullMustacheParams(a, b, c);
                c = a.path;
                var e = c.parts[0];
                if (this.options.knownHelpers[e]) this.opcode("invokeKnownHelper", b.length, e);
                else {
                    if (this.options.knownHelpersOnly) throw new l["default"]("You specified knownHelpersOnly, but used the unknown helper " + e, a);
                    c.strict = !0;
                    c.falsy = !0;
                    this.accept(c);
                    this.opcode("invokeHelper", b.length, c.original, r["default"].helpers.simpleId(c))
                }
            },
            PathExpression: function (a) {
                this.addDepth(a.depth);
                this.opcode("getContext", a.depth);
                var b = a.parts[0],
                    c = r["default"].helpers.scopedId(a),
                    k = !a.depth && !c && this.blockParamIndex(b);
                k ? this.opcode("lookupBlockParam", k, a.parts) : b ? a.data ? (this.options.data = !0, this.opcode("lookupData", a.depth, a.parts, a.strict)) : this.opcode("lookupOnContext", a.parts, a.falsy, a.strict, c) : this.opcode("pushContext")
            },
            StringLiteral: function (a) {
                this.opcode("pushString", a.value)
            },
            NumberLiteral: function (a) {
                this.opcode("pushLiteral", a.value)
            },
            BooleanLiteral: function (a) {
                this.opcode("pushLiteral",
                    a.value)
            },
            UndefinedLiteral: function () {
                this.opcode("pushLiteral", "undefined")
            },
            NullLiteral: function () {
                this.opcode("pushLiteral", "null")
            },
            Hash: function (a) {
                a = a.pairs;
                var b = 0,
                    c = a.length;
                for (this.opcode("pushHash"); b < c; b++) this.pushParam(a[b].value);
                for (; b--;) this.opcode("assignToHash", a[b].key);
                this.opcode("popHash")
            },
            opcode: function (a) {
                this.opcodes.push({
                    opcode: a,
                    args: n.call(arguments, 1),
                    loc: this.sourceNode[0].loc
                })
            },
            addDepth: function (a) {
                a && (this.useDepths = !0)
            },
            classifySexpr: function (a) {
                var b = r["default"].helpers.simpleId(a.path),
                    c = b && !!this.blockParamIndex(a.path.parts[0]),
                    k = !c && r["default"].helpers.helperExpression(a);
                (b = !c && (k || b)) && !k && (c = this.options, c.knownHelpers[a.path.parts[0]] ? k = !0 : c.knownHelpersOnly && (b = !1));
                return k ? "helper" : b ? "ambiguous" : "simple"
            },
            pushParams: function (a) {
                for (var b = 0, c = a.length; b < c; b++) this.pushParam(a[b])
            },
            pushParam: function (a) {
                var b = null != a.value ? a.value : a.original || "";
                if (this.stringParams) b.replace && (b = b.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), a.depth && this.addDepth(a.depth), this.opcode("getContext",
                    a.depth || 0), this.opcode("pushStringParam", b, a.type), "SubExpression" === a.type && this.accept(a);
                else {
                    if (this.trackIds) {
                        var c = void 0;
                        !a.parts || r["default"].helpers.scopedId(a) || a.depth || (c = this.blockParamIndex(a.parts[0]));
                        c ? (b = a.parts.slice(1).join("."), this.opcode("pushId", "BlockParam", c, b)) : (b = a.original || b, b.replace && (b = b.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", a.type, b))
                    }
                    this.accept(a)
                }
            },
            setupFullMustacheParams: function (a, b, c, k) {
                var e = a.params;
                this.pushParams(e);
                this.opcode("pushProgram", b);
                this.opcode("pushProgram", c);
                a.hash ? this.accept(a.hash) : this.opcode("emptyHash", k);
                return e
            },
            blockParamIndex: function (a) {
                for (var b = 0, c = this.options.blockParams.length; b < c; b++) {
                    var k = this.options.blockParams[b],
                        d = k && q.indexOf(k, a);
                    if (k && 0 <= d) return [b, d]
                }
            }
        }
    }, function (a, b, c) {
        function d(a) {
            this.value = a
        }

        function f() {}

        function g(a, b, c, d) {
            var e = b.popStack(),
                k = 0,
                h = c.length;
            for (a && h--; k < h; k++) e = b.nameLookup(e, c[k], d);
            return a ? [b.aliasable("container.strict"), "(", e, ", ", b.quotedString(c[k]),
                ")"
            ] : e
        }
        var l = c(1)["default"];
        b.__esModule = !0;
        var q = c(4),
            r = c(6),
            n = l(r),
            m = c(5);
        c = c(29);
        var w = l(c);
        f.prototype = {
            nameLookup: function (a, b) {
                return f.isValidJavaScriptVariableName(b) ? [a, ".", b] : [a, "[", JSON.stringify(b), "]"]
            },
            depthedLookup: function (a) {
                return [this.aliasable("container.lookup"), '(depths, "', a, '")']
            },
            compilerInfo: function () {
                var a = q.COMPILER_REVISION;
                return [a, q.REVISION_CHANGES[a]]
            },
            appendToBuffer: function (a, b, c) {
                m.isArray(a) || (a = [a]);
                a = this.source.wrap(a, b);
                if (this.environment.isSimple) return ["return ",
                    a, ";"
                ];
                if (c) return ["buffer += ", a, ";"];
                a.appendToBuffer = !0;
                return a
            },
            initializeBuffer: function () {
                return this.quotedString("")
            },
            compile: function (a, b, c, d) {
                this.environment = a;
                this.options = b;
                this.stringParams = this.options.stringParams;
                this.trackIds = this.options.trackIds;
                this.precompile = !d;
                this.name = this.environment.name;
                this.isChild = !!c;
                this.context = c || {
                    decorators: [],
                    programs: [],
                    environments: []
                };
                this.preamble();
                this.stackSlot = 0;
                this.stackVars = [];
                this.aliases = {};
                this.registers = {
                    list: []
                };
                this.hashes = [];
                this.compileStack = [];
                this.inlineStack = [];
                this.blockParams = [];
                this.compileChildren(a, b);
                this.useDepths = this.useDepths || a.useDepths || a.useDecorators || this.options.compat;
                this.useBlockParams = this.useBlockParams || a.useBlockParams;
                var e = a.opcodes,
                    k = void 0;
                a = 0;
                for (c = e.length; a < c; a++) {
                    var h = e[a];
                    this.source.currentLocation = h.loc;
                    k = k || h.loc;
                    this[h.opcode].apply(this, h.args)
                }
                this.source.currentLocation = k;
                this.pushSource("");
                if (this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new n["default"]("Compile completed with content left on stack");
                this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend("var decorators = container.decorators;\n"), this.decorators.push("return fn;"), d ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), this.decorators.push("}\n"), this.decorators = this.decorators.merge()));
                a = this.createFunctionContext(d);
                if (this.isChild) return a;
                e = {
                    compiler: this.compilerInfo(),
                    main: a
                };
                this.decorators && (e.main_d = this.decorators, e.useDecorators = !0);
                a = this.context;
                h = a.programs;
                k = a.decorators;
                a = 0;
                for (c = h.length; a < c; a++) h[a] && (e[a] = h[a], k[a] && (e[a + "_d"] = k[a], e.useDecorators = !0));
                this.environment.usePartial && (e.usePartial = !0);
                this.options.data && (e.useData = !0);
                this.useDepths && (e.useDepths = !0);
                this.useBlockParams && (e.useBlockParams = !0);
                this.options.compat && (e.compat = !0);
                d ? e.compilerOptions = this.options : (e.compiler = JSON.stringify(e.compiler),
                    this.source.currentLocation = {
                        start: {
                            line: 1,
                            column: 0
                        }
                    }, e = this.objectLiteral(e), b.srcName ? (e = e.toStringWithSourceMap({
                        file: b.destName
                    }), e.map = e.map && e.map.toString()) : e = e.toString());
                return e
            },
            preamble: function () {
                this.lastContext = 0;
                this.source = new w["default"](this.options.srcName);
                this.decorators = new w["default"](this.options.srcName)
            },
            createFunctionContext: function (a) {
                var b = "",
                    c = this.stackVars.concat(this.registers.list);
                0 < c.length && (b += ", " + c.join(", "));
                c = 0;
                for (var e in this.aliases) {
                    var d = this.aliases[e];
                    this.aliases.hasOwnProperty(e) && d.children && 1 < d.referenceCount && (b += ", alias" + ++c + "=" + e, d.children[0] = "alias" + c)
                }
                e = ["container", "depth0", "helpers", "partials", "data"];
                (this.useBlockParams || this.useDepths) && e.push("blockParams");
                this.useDepths && e.push("depths");
                b = this.mergeSource(b);
                return a ? (e.push(b), Function.apply(this, e)) : this.source.wrap(["function(", e.join(","), ") {\n  ", b, "}"])
            },
            mergeSource: function (a) {
                var b = this.environment.isSimple,
                    c = !this.forceBuffer,
                    e = void 0,
                    d = void 0,
                    f = void 0,
                    g = void 0;
                this.source.each(function (a) {
                    a.appendToBuffer ?
                        (f ? a.prepend("  + ") : f = a, g = a) : (f && (d ? f.prepend("buffer += ") : e = !0, g.add(";"), f = g = void 0), d = !0, b || (c = !1))
                });
                c ? f ? (f.prepend("return "), g.add(";")) : d || this.source.push('return "";') : (a += ", buffer = " + (e ? "" : this.initializeBuffer()), f ? (f.prepend("return buffer + "), g.add(";")) : this.source.push("return buffer;"));
                a && this.source.prepend("var " + a.substring(2) + (e ? "" : ";\n"));
                return this.source.merge()
            },
            blockValue: function (a) {
                var b = this.aliasable("helpers.blockHelperMissing"),
                    c = [this.contextName(0)];
                this.setupHelperArgs(a,
                    0, c);
                a = this.popStack();
                c.splice(1, 0, a);
                this.push(this.source.functionCall(b, "call", c))
            },
            ambiguousBlockValue: function () {
                var a = this.aliasable("helpers.blockHelperMissing"),
                    b = [this.contextName(0)];
                this.setupHelperArgs("", 0, b, !0);
                this.flushInline();
                var c = this.topStack();
                b.splice(1, 0, c);
                this.pushSource(["if (!", this.lastHelper, ") { ", c, " = ", this.source.functionCall(a, "call", b), "}"])
            },
            appendContent: function (a) {
                this.pendingContent ? a = this.pendingContent + a : this.pendingLocation = this.source.currentLocation;
                this.pendingContent = a
            },
            append: function () {
                if (this.isInline()) this.replaceStack(function (a) {
                    return [" != null ? ", a, ' : ""']
                }), this.pushSource(this.appendToBuffer(this.popStack()));
                else {
                    var a = this.popStack();
                    this.pushSource(["if (", a, " != null) { ", this.appendToBuffer(a, void 0, !0), " }"]);
                    this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"])
                }
            },
            appendEscaped: function () {
                this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(),
                    ")"
                ]))
            },
            getContext: function (a) {
                this.lastContext = a
            },
            pushContext: function () {
                this.pushStackLiteral(this.contextName(this.lastContext))
            },
            lookupOnContext: function (a, b, c, d) {
                var e = 0;
                d || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(a[e++]));
                this.resolvePath("context", a, e, b, c)
            },
            lookupBlockParam: function (a, b) {
                this.useBlockParams = !0;
                this.push(["blockParams[", a[0], "][", a[1], "]"]);
                this.resolvePath("context", b, 1)
            },
            lookupData: function (a, b, c) {
                a ? this.pushStackLiteral("container.data(data, " +
                    a + ")") : this.pushStackLiteral("data");
                this.resolvePath("data", b, 0, !0, c)
            },
            resolvePath: function (a, b, c, d, f) {
                var e = this;
                if (this.options.strict || this.options.assumeObjects) this.push(g(this.options.strict && f, this, b, a));
                else
                    for (f = b.length; c < f; c++) this.replaceStack(function (k) {
                        var h = e.nameLookup(k, b[c], a);
                        return d ? [" && ", h] : [" != null ? ", h, " : ", k]
                    })
            },
            resolvePossibleLambda: function () {
                this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
            },
            pushStringParam: function (a,
                b) {
                this.pushContext();
                this.pushString(b);
                "SubExpression" !== b && ("string" === typeof a ? this.pushString(a) : this.pushStackLiteral(a))
            },
            emptyHash: function (a) {
                this.trackIds && this.push("{}");
                this.stringParams && (this.push("{}"), this.push("{}"));
                this.pushStackLiteral(a ? "undefined" : "{}")
            },
            pushHash: function () {
                this.hash && this.hashes.push(this.hash);
                this.hash = {
                    values: [],
                    types: [],
                    contexts: [],
                    ids: []
                }
            },
            popHash: function () {
                var a = this.hash;
                this.hash = this.hashes.pop();
                this.trackIds && this.push(this.objectLiteral(a.ids));
                this.stringParams && (this.push(this.objectLiteral(a.contexts)), this.push(this.objectLiteral(a.types)));
                this.push(this.objectLiteral(a.values))
            },
            pushString: function (a) {
                this.pushStackLiteral(this.quotedString(a))
            },
            pushLiteral: function (a) {
                this.pushStackLiteral(a)
            },
            pushProgram: function (a) {
                null != a ? this.pushStackLiteral(this.programExpression(a)) : this.pushStackLiteral(null)
            },
            registerDecorator: function (a, b) {
                var c = this.nameLookup("decorators", b, "decorator");
                a = this.setupHelperArgs(b, a);
                this.decorators.push(["fn = ",
                    this.decorators.functionCall(c, "", ["fn", "props", "container", a]), " || fn;"
                ])
            },
            invokeHelper: function (a, b, c) {
                var e = this.popStack();
                a = this.setupHelper(a, b);
                c = ["("].concat(c ? [a.name, " || "] : "", e);
                this.options.strict || c.push(" || ", this.aliasable("helpers.helperMissing"));
                c.push(")");
                this.push(this.source.functionCall(c, "call", a.callParams))
            },
            invokeKnownHelper: function (a, b) {
                a = this.setupHelper(a, b);
                this.push(this.source.functionCall(a.name, "call", a.callParams))
            },
            invokeAmbiguous: function (a, b) {
                this.useRegister("helper");
                var c = this.popStack();
                this.emptyHash();
                b = this.setupHelper(0, a, b);
                a = ["(", "(helper = ", this.lastHelper = this.nameLookup("helpers", a, "helper"), " || ", c, ")"];
                this.options.strict || (a[0] = "(helper = ", a.push(" != null ? helper : ", this.aliasable("helpers.helperMissing")));
                this.push(["(", a, b.paramsInit ? ["),(", b.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", b.callParams), " : helper))"])
            },
            invokePartial: function (a, b, c) {
                var e = [],
                    d = this.setupParams(b,
                        1, e);
                a && (b = this.popStack(), delete d.name);
                c && (d.indent = JSON.stringify(c));
                d.helpers = "helpers";
                d.partials = "partials";
                d.decorators = "container.decorators";
                a ? e.unshift(b) : e.unshift(this.nameLookup("partials", b, "partial"));
                this.options.compat && (d.depths = "depths");
                d = this.objectLiteral(d);
                e.push(d);
                this.push(this.source.functionCall("container.invokePartial", "", e))
            },
            assignToHash: function (a) {
                var b = this.popStack(),
                    c = void 0,
                    e = void 0,
                    d = void 0;
                this.trackIds && (d = this.popStack());
                this.stringParams && (e = this.popStack(),
                    c = this.popStack());
                var f = this.hash;
                c && (f.contexts[a] = c);
                e && (f.types[a] = e);
                d && (f.ids[a] = d);
                f.values[a] = b
            },
            pushId: function (a, b, c) {
                "BlockParam" === a ? this.pushStackLiteral("blockParams[" + b[0] + "].path[" + b[1] + "]" + (c ? " + " + JSON.stringify("." + c) : "")) : "PathExpression" === a ? this.pushString(b) : "SubExpression" === a ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
            },
            compiler: f,
            compileChildren: function (a, b) {
                a = a.children;
                for (var c, e, d = 0, k = a.length; d < k; d++) {
                    c = a[d];
                    e = new this.compiler;
                    var f = this.matchExistingProgram(c);
                    null == f ? (this.context.programs.push(""), f = this.context.programs.length, c.index = f, c.name = "program" + f, this.context.programs[f] = e.compile(c, b, this.context, !this.precompile), this.context.decorators[f] = e.decorators, this.context.environments[f] = c, this.useDepths = this.useDepths || e.useDepths, this.useBlockParams = this.useBlockParams || e.useBlockParams) : (c.index = f, c.name = "program" + f, this.useDepths = this.useDepths || c.useDepths, this.useBlockParams = this.useBlockParams || c.useBlockParams)
                }
            },
            matchExistingProgram: function (a) {
                for (var b =
                        0, c = this.context.environments.length; b < c; b++) {
                    var e = this.context.environments[b];
                    if (e && e.equals(a)) return b
                }
            },
            programExpression: function (a) {
                a = this.environment.children[a];
                a = [a.index, "data", a.blockParams];
                (this.useBlockParams || this.useDepths) && a.push("blockParams");
                this.useDepths && a.push("depths");
                return "container.program(" + a.join(", ") + ")"
            },
            useRegister: function (a) {
                this.registers[a] || (this.registers[a] = !0, this.registers.list.push(a))
            },
            push: function (a) {
                a instanceof d || (a = this.source.wrap(a));
                this.inlineStack.push(a);
                return a
            },
            pushStackLiteral: function (a) {
                this.push(new d(a))
            },
            pushSource: function (a) {
                this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0);
                a && this.source.push(a)
            },
            replaceStack: function (a) {
                var b = void 0,
                    c = void 0;
                if (!this.isInline()) throw new n["default"]("replaceStack on non-inline");
                var e = this.popStack(!0);
                if (e instanceof d) {
                    var f = [e.value];
                    e = ["(", f];
                    c = !0
                } else b = !0, f = this.incrStack(), e = ["((", this.push(f),
                    " = ", e, ")"
                ], f = this.topStack();
                a = a.call(this, f);
                c || this.popStack();
                b && this.stackSlot--;
                this.push(e.concat(a, ")"))
            },
            incrStack: function () {
                this.stackSlot++;
                this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot);
                return this.topStackName()
            },
            topStackName: function () {
                return "stack" + this.stackSlot
            },
            flushInline: function () {
                var a = this.inlineStack;
                this.inlineStack = [];
                for (var b = 0, c = a.length; b < c; b++) {
                    var f = a[b];
                    if (f instanceof d) this.compileStack.push(f);
                    else {
                        var x = this.incrStack();
                        this.pushSource([x,
                            " = ", f, ";"
                        ]);
                        this.compileStack.push(x)
                    }
                }
            },
            isInline: function () {
                return this.inlineStack.length
            },
            popStack: function (a) {
                var b = this.isInline(),
                    c = (b ? this.inlineStack : this.compileStack).pop();
                if (!a && c instanceof d) return c.value;
                if (!b) {
                    if (!this.stackSlot) throw new n["default"]("Invalid stack pop");
                    this.stackSlot--
                }
                return c
            },
            topStack: function () {
                var a = this.isInline() ? this.inlineStack : this.compileStack;
                a = a[a.length - 1];
                return a instanceof d ? a.value : a
            },
            contextName: function (a) {
                return this.useDepths && a ? "depths[" +
                    a + "]" : "depth" + a
            },
            quotedString: function (a) {
                return this.source.quotedString(a)
            },
            objectLiteral: function (a) {
                return this.source.objectLiteral(a)
            },
            aliasable: function (a) {
                var b = this.aliases[a];
                if (b) return b.referenceCount++, b;
                b = this.aliases[a] = this.source.wrap(a);
                b.aliasable = !0;
                b.referenceCount = 1;
                return b
            },
            setupHelper: function (a, b, c) {
                var e = [];
                a = this.setupHelperArgs(b, a, e, c);
                b = this.nameLookup("helpers", b, "helper");
                c = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : {}");
                return {
                    params: e,
                    paramsInit: a,
                    name: b,
                    callParams: [c].concat(e)
                }
            },
            setupParams: function (a, b, c) {
                var e = {},
                    d = [],
                    k = [],
                    f = [],
                    g = !c;
                g && (c = []);
                e.name = this.quotedString(a);
                e.hash = this.popStack();
                this.trackIds && (e.hashIds = this.popStack());
                this.stringParams && (e.hashTypes = this.popStack(), e.hashContexts = this.popStack());
                a = this.popStack();
                var y = this.popStack();
                if (y || a) e.fn = y || "container.noop", e.inverse = a || "container.noop";
                for (a = b; a--;) b = this.popStack(), c[a] = b, this.trackIds && (f[a] = this.popStack()), this.stringParams && (k[a] = this.popStack(),
                    d[a] = this.popStack());
                g && (e.args = this.source.generateArray(c));
                this.trackIds && (e.ids = this.source.generateArray(f));
                this.stringParams && (e.types = this.source.generateArray(k), e.contexts = this.source.generateArray(d));
                this.options.data && (e.data = "data");
                this.useBlockParams && (e.blockParams = "blockParams");
                return e
            },
            setupHelperArgs: function (a, b, c, d) {
                a = this.setupParams(a, b, c);
                a = this.objectLiteral(a);
                return d ? (this.useRegister("options"), c.push("options"), ["options=", a]) : c ? (c.push(a), "") : a
            }
        };
        (function () {
            for (var a =
                    "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), b = f.RESERVED_WORDS = {}, c = 0, d = a.length; c < d; c++) b[a[c]] = !0
        })();
        f.isValidJavaScriptVariableName =
            function (a) {
                return !f.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)
            };
        b["default"] = f;
        a.exports = b["default"]
    }, function (a, b, c) {
        function d(a, b, c) {
            if (g.isArray(a)) {
                for (var d = [], f = 0, e = a.length; f < e; f++) d.push(b.wrap(a[f], c));
                return d
            }
            return "boolean" === typeof a || "number" === typeof a ? a + "" : a
        }

        function f(a) {
            this.srcFile = a;
            this.source = []
        }
        b.__esModule = !0;
        var g = c(5),
            l = void 0;
        l || (l = function (a, b, c, d) {
            this.src = "";
            d && this.add(d)
        }, l.prototype = {
            add: function (a) {
                g.isArray(a) && (a = a.join(""));
                this.src += a
            },
            prepend: function (a) {
                g.isArray(a) &&
                    (a = a.join(""));
                this.src = a + this.src
            },
            toStringWithSourceMap: function () {
                return {
                    code: this.toString()
                }
            },
            toString: function () {
                return this.src
            }
        });
        f.prototype = {
            isEmpty: function () {
                return !this.source.length
            },
            prepend: function (a, b) {
                this.source.unshift(this.wrap(a, b))
            },
            push: function (a, b) {
                this.source.push(this.wrap(a, b))
            },
            merge: function () {
                var a = this.empty();
                this.each(function (b) {
                    a.add(["  ", b, "\n"])
                });
                return a
            },
            each: function (a) {
                for (var b = 0, c = this.source.length; b < c; b++) a(this.source[b])
            },
            empty: function () {
                var a = this.currentLocation || {
                    start: {}
                };
                return new l(a.start.line, a.start.column, this.srcFile)
            },
            wrap: function (a) {
                var b = 1 >= arguments.length || void 0 === arguments[1] ? this.currentLocation || {
                    start: {}
                } : arguments[1];
                if (a instanceof l) return a;
                a = d(a, this, b);
                return new l(b.start.line, b.start.column, this.srcFile, a)
            },
            functionCall: function (a, b, c) {
                c = this.generateList(c);
                return this.wrap([a, b ? "." + b + "(" : "(", c, ")"])
            },
            quotedString: function (a) {
                return '"' + (a + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g,
                    "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
            },
            objectLiteral: function (a) {
                var b = [],
                    c;
                for (c in a)
                    if (a.hasOwnProperty(c)) {
                        var f = d(a[c], this);
                        "undefined" !== f && b.push([this.quotedString(c), ":", f])
                    } a = this.generateList(b);
                a.prepend("{");
                a.add("}");
                return a
            },
            generateList: function (a) {
                for (var b = this.empty(), c = 0, f = a.length; c < f; c++) c && b.add(","), b.add(d(a[c], this));
                return b
            },
            generateArray: function (a) {
                a = this.generateList(a);
                a.prepend("[");
                a.add("]");
                return a
            }
        };
        b["default"] = f;
        a.exports = b["default"]
    }])
});
(function (a, b) {
    "function" === typeof define && define.amd ? define(b) : "object" === typeof exports ? module.exports = b() : a.NProgress = b()
})(this, function () {
    function a(a, b, c) {
        return a < b ? b : a > c ? c : a
    }

    function b(a, b, c) {
        a = "translate3d" === q.positionUsing ? {
            transform: "translate3d(" + 100 * (-1 + a) + "%,0,0)"
        } : "translate" === q.positionUsing ? {
            transform: "translate(" + 100 * (-1 + a) + "%,0)"
        } : {
            "margin-left": 100 * (-1 + a) + "%"
        };
        a.transition = "all " + b + "ms " + c;
        return a
    }

    function c(a, b) {
        return 0 <= ("string" == typeof a ? a : g(a)).indexOf(" " + b + " ")
    }

    function d(a,
        b) {
        var e = g(a),
            d = e + b;
        c(e, b) || (a.className = d.substring(1))
    }

    function f(a, b) {
        var e = g(a);
        c(a, b) && (b = e.replace(" " + b + " ", " "), a.className = b.substring(1, b.length - 1))
    }

    function g(a) {
        return (" " + (a && a.className || "") + " ").replace(/\s+/gi, " ")
    }
    var l = {
            version: "0.2.0"
        },
        q = l.settings = {
            minimum: .08,
            easing: "linear",
            positionUsing: "",
            speed: 350,
            trickle: !0,
            trickleSpeed: 250,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            parent: "body",
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        };
    l.configure = function (a) {
        var b;
        for (b in a) {
            var c = a[b];
            void 0 !== c && a.hasOwnProperty(b) && (q[b] = c)
        }
        return this
    };
    l.status = null;
    l.set = function (c) {
        var d = l.isStarted();
        c = a(c, q.minimum, 1);
        l.status = 1 === c ? null : c;
        var e = l.render(!d),
            f = e.querySelector(q.barSelector),
            g = q.speed,
            h = q.easing;
        e.offsetWidth;
        r(function (a) {
            "" === q.positionUsing && (q.positionUsing = l.getPositioningCSS());
            n(f, b(c, g, h));
            1 === c ? (n(e, {
                transition: "none",
                opacity: 1
            }), e.offsetWidth, setTimeout(function () {
                n(e, {
                    transition: "all " + g + "ms linear",
                    opacity: 0
                });
                setTimeout(function () {
                    l.remove();
                    a()
                }, g)
            }, g)) : setTimeout(a, g)
        });
        return this
    };
    l.isStarted = function () {
        return "number" === typeof l.status
    };
    l.start = function () {
        l.status || l.set(0);
        var a = function () {
            setTimeout(function () {
                l.status && (l.trickle(), a())
            }, q.trickleSpeed)
        };
        q.trickle && a();
        return this
    };
    l.done = function (a) {
        return a || l.status ? l.inc(.3 + .5 * Math.random()).set(1) : this
    };
    l.inc = function (b) {
        var c = l.status;
        if (!c) return l.start();
        if (!(1 < c)) return "number" !== typeof b && (b = 0 <= c && .25 > c ? (3 * Math.random() + 3) / 100 : .25 <= c &&
            .65 > c ? 3 * Math.random() / 100 : .65 <= c && .9 > c ? 2 * Math.random() / 100 : .9 <= c && .99 > c ? .005 : 0), c = a(c + b, 0, .994), l.set(c)
    };
    l.trickle = function () {
        return l.inc()
    };
    (function () {
        var a = 0,
            b = 0;
        l.promise = function (c) {
            if (!c || "resolved" === c.state()) return this;
            0 === b && l.start();
            a++;
            b++;
            c.always(function () {
                b--;
                0 === b ? (a = 0, l.done()) : l.set((a - b) / a)
            });
            return this
        }
    })();
    l.render = function (a) {
        if (l.isRendered()) return document.getElementById("nprogress");
        d(document.documentElement, "nprogress-busy");
        var b = document.createElement("div");
        b.id =
            "nprogress";
        b.innerHTML = q.template;
        var c = b.querySelector(q.barSelector),
            f = a ? "-100" : 100 * (-1 + (l.status || 0));
        a = document.querySelector(q.parent);
        n(c, {
            transition: "all 0 linear",
            transform: "translate3d(" + f + "%,0,0)"
        });
        q.showSpinner || (c = b.querySelector(q.spinnerSelector)) && c && c.parentNode && c.parentNode.removeChild(c);
        a != document.body && d(a, "nprogress-custom-parent");
        a.appendChild(b);
        return b
    };
    l.remove = function () {
        f(document.documentElement, "nprogress-busy");
        f(document.querySelector(q.parent), "nprogress-custom-parent");
        var a = document.getElementById("nprogress");
        a && a && a.parentNode && a.parentNode.removeChild(a)
    };
    l.isRendered = function () {
        return !!document.getElementById("nprogress")
    };
    l.getPositioningCSS = function () {
        var a = document.body.style,
            b = "WebkitTransform" in a ? "Webkit" : "MozTransform" in a ? "Moz" : "msTransform" in a ? "ms" : "OTransform" in a ? "O" : "";
        return b + "Perspective" in a ? "translate3d" : b + "Transform" in a ? "translate" : "margin"
    };
    var r = function () {
            function a() {
                var c = b.shift();
                c && c(a)
            }
            var b = [];
            return function (c) {
                b.push(c);
                1 == b.length &&
                    a()
            }
        }(),
        n = function () {
            function a(a) {
                return a.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (a, b) {
                    return b.toUpperCase()
                })
            }

            function b(b) {
                b = a(b);
                var e;
                if (!(e = d[b])) {
                    e = b;
                    a: {
                        var f = document.body.style;
                        if (!(b in f))
                            for (var k = c.length, g = b.charAt(0).toUpperCase() + b.slice(1), y; k--;)
                                if (y = c[k] + g, y in f) {
                                    b = y;
                                    break a
                                }
                    }
                    e = d[e] = b
                }
                return e
            }
            var c = ["Webkit", "O", "Moz", "ms"],
                d = {};
            return function (a, c) {
                var e = arguments;
                if (2 == e.length)
                    for (k in c) {
                        var d = c[k];
                        if (void 0 !== d && c.hasOwnProperty(k)) {
                            e = a;
                            var f = k;
                            f = b(f);
                            e.style[f] =
                                d
                        }
                    } else {
                        var k = a;
                        f = e[1];
                        e = e[2];
                        f = b(f);
                        k.style[f] = e
                    }
            }
        }();
    return l
});
(function (a, b) {
    "undefined" !== typeof module && module.exports ? "undefined" !== typeof process && "electron" in process.versions ? a.BootstrapDialog = b(a.jQuery) : module.exports = b(require("jquery"), require("bootstrap")) : "function" === typeof define && define.amd ? define("bootstrap-dialog", ["jquery", "bootstrap"], function (a) {
        return b(a)
    }) : a.BootstrapDialog = b(a.jQuery)
})(this, function (a) {
    var b = a.fn.modal.Constructor,
        c = function (a, c) {
            b.call(this, a, c)
        };
    c.getModalVersion = function () {
        return "undefined" === typeof a.fn.modal.Constructor.VERSION ?
            "v3.1" : /3\.2\.\d+/.test(a.fn.modal.Constructor.VERSION) ? "v3.2" : /3\.3\.[1,2]/.test(a.fn.modal.Constructor.VERSION) ? "v3.3" : "v3.3.4"
    };
    c.ORIGINAL_BODY_PADDING = parseInt(a("body").css("padding-right") || 0, 10);
    c.METHODS_TO_OVERRIDE = {};
    c.METHODS_TO_OVERRIDE["v3.1"] = {};
    c.METHODS_TO_OVERRIDE["v3.2"] = {
        hide: function (b) {
            b && b.preventDefault();
            b = a.Event("hide.bs.modal");
            this.$element.trigger(b);
            this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, 0 === this.getGlobalOpenedDialogs().length && this.$body.removeClass("modal-open"),
                this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
        }
    };
    c.METHODS_TO_OVERRIDE["v3.3"] = {
        setScrollbar: function () {
            var a = c.ORIGINAL_BODY_PADDING;
            this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
        },
        resetScrollbar: function () {
            0 ===
                this.getGlobalOpenedDialogs().length && this.$body.css("padding-right", c.ORIGINAL_BODY_PADDING)
        },
        hideModal: function () {
            this.$element.hide();
            this.backdrop(a.proxy(function () {
                0 === this.getGlobalOpenedDialogs().length && this.$body.removeClass("modal-open");
                this.resetAdjustments();
                this.resetScrollbar();
                this.$element.trigger("hidden.bs.modal")
            }, this))
        }
    };
    c.METHODS_TO_OVERRIDE["v3.3.4"] = a.extend({}, c.METHODS_TO_OVERRIDE["v3.3"]);
    c.prototype = {
        constructor: c,
        getGlobalOpenedDialogs: function () {
            var b = [];
            a.each(d.dialogs,
                function (a, c) {
                    c.isRealized() && c.isOpened() && b.push(c)
                });
            return b
        }
    };
    c.prototype = a.extend(c.prototype, b.prototype, c.METHODS_TO_OVERRIDE[c.getModalVersion()]);
    var d = function (b) {
        this.defaultOptions = a.extend(!0, {
            id: d.newGuid(),
            buttons: [],
            data: {},
            onshow: null,
            onshown: null,
            onhide: null,
            onhidden: null
        }, d.defaultOptions);
        this.indexedButtons = {};
        this.registeredButtonHotkeys = {};
        this.draggableData = {
            isMouseDown: !1,
            mouseOffset: {}
        };
        this.opened = this.realized = !1;
        this.initOptions(b);
        this.holdThisInstance()
    };
    d.BootstrapDialogModal =
        c;
    d.NAMESPACE = "bootstrap-dialog";
    d.TYPE_DEFAULT = "type-default";
    d.TYPE_INFO = "type-info";
    d.TYPE_PRIMARY = "type-primary";
    d.TYPE_SUCCESS = "type-success";
    d.TYPE_WARNING = "type-warning";
    d.TYPE_DANGER = "type-danger";
    d.DEFAULT_TEXTS = {};
    d.DEFAULT_TEXTS[d.TYPE_DEFAULT] = "Information";
    d.DEFAULT_TEXTS[d.TYPE_INFO] = "Information";
    d.DEFAULT_TEXTS[d.TYPE_PRIMARY] = "Information";
    d.DEFAULT_TEXTS[d.TYPE_SUCCESS] = "Success";
    d.DEFAULT_TEXTS[d.TYPE_WARNING] = "Warning";
    d.DEFAULT_TEXTS[d.TYPE_DANGER] = "Danger";
    d.DEFAULT_TEXTS.OK =
        "OK";
    d.DEFAULT_TEXTS.CANCEL = "Cancel";
    d.DEFAULT_TEXTS.CONFIRM = "Confirmation";
    d.SIZE_NORMAL = "size-normal";
    d.SIZE_SMALL = "size-small";
    d.SIZE_WIDE = "size-wide";
    d.SIZE_LARGE = "size-large";
    d.BUTTON_SIZES = {};
    d.BUTTON_SIZES[d.SIZE_NORMAL] = "";
    d.BUTTON_SIZES[d.SIZE_SMALL] = "";
    d.BUTTON_SIZES[d.SIZE_WIDE] = "";
    d.BUTTON_SIZES[d.SIZE_LARGE] = "btn-lg";
    d.ICON_SPINNER = "glyphicon glyphicon-asterisk";
    d.defaultOptions = {
        type: d.TYPE_PRIMARY,
        size: d.SIZE_NORMAL,
        cssClass: "",
        title: null,
        message: null,
        nl2br: !0,
        closable: !0,
        closeByBackdrop: !0,
        closeByKeyboard: !0,
        spinicon: d.ICON_SPINNER,
        autodestroy: !0,
        draggable: !1,
        animate: !0,
        description: "",
        tabindex: -1
    };
    d.configDefaultOptions = function (b) {
        d.defaultOptions = a.extend(!0, d.defaultOptions, b)
    };
    d.dialogs = {};
    d.openAll = function () {
        a.each(d.dialogs, function (a, b) {
            b.open()
        })
    };
    d.closeAll = function () {
        a.each(d.dialogs, function (a, b) {
            b.close()
        })
    };
    d.getDialog = function (a) {
        var b = null;
        "undefined" !== typeof d.dialogs[a] && (b = d.dialogs[a]);
        return b
    };
    d.setDialog = function (a) {
        return d.dialogs[a.getId()] = a
    };
    d.addDialog =
        function (a) {
            return d.setDialog(a)
        };
    d.moveFocus = function () {
        var b = null;
        a.each(d.dialogs, function (a, c) {
            c.isRealized() && c.isOpened() && (b = c)
        });
        null !== b && b.getModal().focus()
    };
    d.METHODS_TO_OVERRIDE = {};
    d.METHODS_TO_OVERRIDE["v3.1"] = {
        handleModalBackdropEvent: function () {
            this.getModal().on("click", {
                dialog: this
            }, function (a) {
                a.target === this && a.data.dialog.isClosable() && a.data.dialog.canCloseByBackdrop() && a.data.dialog.close()
            });
            return this
        },
        updateZIndex: function () {
            var b = 0;
            a.each(d.dialogs, function (a, c) {
                c.isRealized() &&
                    c.isOpened() && b++
            });
            var c = this.getModal(),
                l = c.data("bs.modal").$backdrop;
            c.css("z-index", 1050 + 20 * (b - 1));
            l.css("z-index", 1040 + 20 * (b - 1));
            return this
        },
        open: function () {
            !this.isRealized() && this.realize();
            this.getModal().modal("show");
            this.updateZIndex();
            return this
        }
    };
    d.METHODS_TO_OVERRIDE["v3.2"] = {
        handleModalBackdropEvent: d.METHODS_TO_OVERRIDE["v3.1"].handleModalBackdropEvent,
        updateZIndex: d.METHODS_TO_OVERRIDE["v3.1"].updateZIndex,
        open: d.METHODS_TO_OVERRIDE["v3.1"].open
    };
    d.METHODS_TO_OVERRIDE["v3.3"] = {};
    d.METHODS_TO_OVERRIDE["v3.3.4"] = a.extend({}, d.METHODS_TO_OVERRIDE["v3.1"]);
    d.prototype = {
        constructor: d,
        initOptions: function (b) {
            this.options = a.extend(!0, this.defaultOptions, b);
            return this
        },
        holdThisInstance: function () {
            d.addDialog(this);
            return this
        },
        initModalStuff: function () {
            this.setModal(this.createModal()).setModalDialog(this.createModalDialog()).setModalContent(this.createModalContent()).setModalHeader(this.createModalHeader()).setModalBody(this.createModalBody()).setModalFooter(this.createModalFooter());
            this.getModal().append(this.getModalDialog());
            this.getModalDialog().append(this.getModalContent());
            this.getModalContent().append(this.getModalHeader()).append(this.getModalBody()).append(this.getModalFooter());
            return this
        },
        createModal: function () {
            var b = a('<div class="modal" role="dialog" aria-hidden="true"></div>');
            b.prop("id", this.getId());
            b.attr("aria-labelledby", this.getId() + "_title");
            return b
        },
        getModal: function () {
            return this.$modal
        },
        setModal: function (a) {
            this.$modal = a;
            return this
        },
        createModalDialog: function () {
            return a('<div class="modal-dialog"></div>')
        },
        getModalDialog: function () {
            return this.$modalDialog
        },
        setModalDialog: function (a) {
            this.$modalDialog = a;
            return this
        },
        createModalContent: function () {
            return a('<div class="modal-content"></div>')
        },
        getModalContent: function () {
            return this.$modalContent
        },
        setModalContent: function (a) {
            this.$modalContent = a;
            return this
        },
        createModalHeader: function () {
            return a('<div class="modal-header"></div>')
        },
        getModalHeader: function () {
            return this.$modalHeader
        },
        setModalHeader: function (a) {
            this.$modalHeader = a;
            return this
        },
        createModalBody: function () {
            return a('<div class="modal-body"></div>')
        },
        getModalBody: function () {
            return this.$modalBody
        },
        setModalBody: function (a) {
            this.$modalBody = a;
            return this
        },
        createModalFooter: function () {
            return a('<div class="modal-footer"></div>')
        },
        getModalFooter: function () {
            return this.$modalFooter
        },
        setModalFooter: function (a) {
            this.$modalFooter = a;
            return this
        },
        createDynamicContent: function (a) {
            a = "function" === typeof a ? a.call(a, this) : a;
            "string" === typeof a && (a = this.formatStringContent(a));
            return a
        },
        formatStringContent: function (a) {
            return this.options.nl2br ? a.replace(/\r\n/g,
                "<br />").replace(/[\r\n]/g, "<br />") : a
        },
        setData: function (a, b) {
            this.options.data[a] = b;
            return this
        },
        getData: function (a) {
            return this.options.data[a]
        },
        setId: function (a) {
            this.options.id = a;
            return this
        },
        getId: function () {
            return this.options.id
        },
        getType: function () {
            return this.options.type
        },
        setType: function (a) {
            this.options.type = a;
            this.updateType();
            return this
        },
        updateType: function () {
            if (this.isRealized()) {
                var a = [d.TYPE_DEFAULT, d.TYPE_INFO, d.TYPE_PRIMARY, d.TYPE_SUCCESS, d.TYPE_WARNING, d.TYPE_DANGER];
                this.getModal().removeClass(a.join(" ")).addClass(this.getType())
            }
            return this
        },
        getSize: function () {
            return this.options.size
        },
        setSize: function (a) {
            this.options.size = a;
            this.updateSize();
            return this
        },
        updateSize: function () {
            if (this.isRealized()) {
                var b = this;
                this.getModal().removeClass(d.SIZE_NORMAL).removeClass(d.SIZE_SMALL).removeClass(d.SIZE_WIDE).removeClass(d.SIZE_LARGE);
                this.getModal().addClass(this.getSize());
                this.getModalDialog().removeClass("modal-sm");
                this.getSize() === d.SIZE_SMALL && this.getModalDialog().addClass("modal-sm");
                this.getModalDialog().removeClass("modal-lg");
                this.getSize() ===
                    d.SIZE_WIDE && this.getModalDialog().addClass("modal-lg");
                a.each(this.options.buttons, function (c, d) {
                    c = b.getButton(d.id);
                    var f = ["btn-lg", "btn-sm", "btn-xs"],
                        g = !1;
                    "string" === typeof d.cssClass && (d = d.cssClass.split(" "), a.each(d, function (b, c) {
                        -1 !== a.inArray(c, f) && (g = !0)
                    }));
                    g || (c.removeClass(f.join(" ")), c.addClass(b.getButtonSize()))
                })
            }
            return this
        },
        getCssClass: function () {
            return this.options.cssClass
        },
        setCssClass: function (a) {
            this.options.cssClass = a;
            return this
        },
        getTitle: function () {
            return this.options.title
        },
        setTitle: function (a) {
            this.options.title = a;
            this.updateTitle();
            return this
        },
        updateTitle: function () {
            if (this.isRealized()) {
                var a = null !== this.getTitle() ? this.createDynamicContent(this.getTitle()) : this.getDefaultText();
                this.getModalHeader().find("." + this.getNamespace("title")).html("").append(a).prop("id", this.getId() + "_title")
            }
            return this
        },
        getMessage: function () {
            return this.options.message
        },
        setMessage: function (a) {
            this.options.message = a;
            this.updateMessage();
            return this
        },
        updateMessage: function () {
            if (this.isRealized()) {
                var a =
                    this.createDynamicContent(this.getMessage());
                this.getModalBody().find("." + this.getNamespace("message")).html("").append(a)
            }
            return this
        },
        isClosable: function () {
            return this.options.closable
        },
        setClosable: function (a) {
            this.options.closable = a;
            this.updateClosable();
            return this
        },
        setCloseByBackdrop: function (a) {
            this.options.closeByBackdrop = a;
            return this
        },
        canCloseByBackdrop: function () {
            return this.options.closeByBackdrop
        },
        setCloseByKeyboard: function (a) {
            this.options.closeByKeyboard = a;
            return this
        },
        canCloseByKeyboard: function () {
            return this.options.closeByKeyboard
        },
        isAnimate: function () {
            return this.options.animate
        },
        setAnimate: function (a) {
            this.options.animate = a;
            return this
        },
        updateAnimate: function () {
            this.isRealized() && this.getModal().toggleClass("fade", this.isAnimate());
            return this
        },
        getSpinicon: function () {
            return this.options.spinicon
        },
        setSpinicon: function (a) {
            this.options.spinicon = a;
            return this
        },
        addButton: function (a) {
            this.options.buttons.push(a);
            return this
        },
        addButtons: function (b) {
            var c = this;
            a.each(b, function (a, b) {
                c.addButton(b)
            });
            return this
        },
        getButtons: function () {
            return this.options.buttons
        },
        setButtons: function (a) {
            this.options.buttons = a;
            this.updateButtons();
            return this
        },
        getButton: function (a) {
            return "undefined" !== typeof this.indexedButtons[a] ? this.indexedButtons[a] : null
        },
        getButtonSize: function () {
            return "undefined" !== typeof d.BUTTON_SIZES[this.getSize()] ? d.BUTTON_SIZES[this.getSize()] : ""
        },
        updateButtons: function () {
            this.isRealized() && (0 === this.getButtons().length ? this.getModalFooter().hide() : this.getModalFooter().show().find("." + this.getNamespace("footer")).html("").append(this.createFooterButtons()));
            return this
        },
        isAutodestroy: function () {
            return this.options.autodestroy
        },
        setAutodestroy: function (a) {
            this.options.autodestroy = a
        },
        getDescription: function () {
            return this.options.description
        },
        setDescription: function (a) {
            this.options.description = a;
            return this
        },
        setTabindex: function (a) {
            this.options.tabindex = a;
            return this
        },
        getTabindex: function () {
            return this.options.tabindex
        },
        updateTabindex: function () {
            this.isRealized() && this.getModal().attr("tabindex", this.getTabindex());
            return this
        },
        getDefaultText: function () {
            return d.DEFAULT_TEXTS[this.getType()]
        },
        getNamespace: function (a) {
            return d.NAMESPACE + "-" + a
        },
        createHeaderContent: function () {
            var b = a("<div></div>");
            b.addClass(this.getNamespace("header"));
            b.append(this.createTitleContent());
            b.prepend(this.createCloseButton());
            return b
        },
        createTitleContent: function () {
            var b = a("<div></div>");
            b.addClass(this.getNamespace("title"));
            return b
        },
        createCloseButton: function () {
            var b = a("<div></div>");
            b.addClass(this.getNamespace("close-button"));
            var c = a('<button class="close">&times;</button>');
            b.append(c);
            b.on("click", {
                dialog: this
            }, function (a) {
                a.data.dialog.close()
            });
            return b
        },
        createBodyContent: function () {
            var b = a("<div></div>");
            b.addClass(this.getNamespace("body"));
            b.append(this.createMessageContent());
            return b
        },
        createMessageContent: function () {
            var b = a("<div></div>");
            b.addClass(this.getNamespace("message"));
            return b
        },
        createFooterContent: function () {
            var b = a("<div></div>");
            b.addClass(this.getNamespace("footer"));
            return b
        },
        createFooterButtons: function () {
            var b = this,
                c = a("<div></div>");
            c.addClass(this.getNamespace("footer-buttons"));
            this.indexedButtons = {};
            a.each(this.options.buttons, function (a, f) {
                f.id || (f.id = d.newGuid());
                a = b.createButton(f);
                b.indexedButtons[f.id] = a;
                c.append(a)
            });
            return c
        },
        createButton: function (b) {
            var c = a('<button class="btn"></button>');
            c.prop("id", b.id);
            c.data("button", b);
            "undefined" !== typeof b.icon && "" !== a.trim(b.icon) && c.append(this.createButtonIcon(b.icon));
            "undefined" !== typeof b.label && c.append(b.label);
            "undefined" !== typeof b.cssClass && "" !== a.trim(b.cssClass) ? c.addClass(b.cssClass) : c.addClass("btn-default");
            "undefined" !== typeof b.hotkey && (this.registeredButtonHotkeys[b.hotkey] = c);
            c.on("click", {
                dialog: this,
                $button: c,
                button: b
            }, function (a) {
                var b = a.data.dialog,
                    c = a.data.$button,
                    d = c.data("button");
                d.autospin && c.toggleSpin(!0);
                if ("function" === typeof d.action) return d.action.call(c, b, a)
            });
            this.enhanceButton(c);
            "undefined" !== typeof b.enabled && c.toggleEnable(b.enabled);
            return c
        },
        enhanceButton: function (a) {
            a.dialog = this;
            a.toggleEnable = function (a) {
                "undefined" !== typeof a ? this.prop("disabled", !a).toggleClass("disabled",
                    !a) : this.prop("disabled", !this.prop("disabled"));
                return this
            };
            a.enable = function () {
                this.toggleEnable(!0);
                return this
            };
            a.disable = function () {
                this.toggleEnable(!1);
                return this
            };
            a.toggleSpin = function (b) {
                var c = this.dialog,
                    d = this.find("." + c.getNamespace("button-icon"));
                "undefined" === typeof b && (b = !(0 < a.find(".icon-spin").length));
                b ? (d.hide(), a.prepend(c.createButtonIcon(c.getSpinicon()).addClass("icon-spin"))) : (d.show(), a.find(".icon-spin").remove());
                return this
            };
            a.spin = function () {
                this.toggleSpin(!0);
                return this
            };
            a.stopSpin = function () {
                this.toggleSpin(!1);
                return this
            };
            return this
        },
        createButtonIcon: function (b) {
            var c = a("<span></span>");
            c.addClass(this.getNamespace("button-icon")).addClass(b);
            return c
        },
        enableButtons: function (b) {
            a.each(this.indexedButtons, function (a, c) {
                c.toggleEnable(b)
            });
            return this
        },
        updateClosable: function () {
            this.isRealized() && this.getModalHeader().find("." + this.getNamespace("close-button")).toggle(this.isClosable());
            return this
        },
        onShow: function (a) {
            this.options.onshow = a;
            return this
        },
        onShown: function (a) {
            this.options.onshown =
                a;
            return this
        },
        onHide: function (a) {
            this.options.onhide = a;
            return this
        },
        onHidden: function (a) {
            this.options.onhidden = a;
            return this
        },
        isRealized: function () {
            return this.realized
        },
        setRealized: function (a) {
            this.realized = a;
            return this
        },
        isOpened: function () {
            return this.opened
        },
        setOpened: function (a) {
            this.opened = a;
            return this
        },
        handleModalEvents: function () {
            this.getModal().on("show.bs.modal", {
                dialog: this
            }, function (a) {
                var b = a.data.dialog;
                b.setOpened(!0);
                if (b.isModalEvent(a) && "function" === typeof b.options.onshow) return a =
                    b.options.onshow(b), !1 === a && b.setOpened(!1), a
            });
            this.getModal().on("shown.bs.modal", {
                dialog: this
            }, function (a) {
                var b = a.data.dialog;
                b.isModalEvent(a) && "function" === typeof b.options.onshown && b.options.onshown(b)
            });
            this.getModal().on("hide.bs.modal", {
                dialog: this
            }, function (a) {
                var b = a.data.dialog;
                b.setOpened(!1);
                if (b.isModalEvent(a) && "function" === typeof b.options.onhide) return a = b.options.onhide(b), !1 === a && b.setOpened(!0), a
            });
            this.getModal().on("hidden.bs.modal", {
                dialog: this
            }, function (b) {
                var c = b.data.dialog;
                c.isModalEvent(b) && "function" === typeof c.options.onhidden && c.options.onhidden(c);
                c.isAutodestroy() && (c.setRealized(!1), delete d.dialogs[c.getId()], a(this).remove());
                d.moveFocus()
            });
            this.handleModalBackdropEvent();
            this.getModal().on("keyup", {
                dialog: this
            }, function (a) {
                27 === a.which && a.data.dialog.isClosable() && a.data.dialog.canCloseByKeyboard() && a.data.dialog.close()
            });
            this.getModal().on("keyup", {
                dialog: this
            }, function (b) {
                var c = b.data.dialog;
                "undefined" !== typeof c.registeredButtonHotkeys[b.which] && (b =
                    a(c.registeredButtonHotkeys[b.which]), !b.prop("disabled") && b.focus().trigger("click"))
            });
            return this
        },
        handleModalBackdropEvent: function () {
            this.getModal().on("click", {
                dialog: this
            }, function (b) {
                a(b.target).hasClass("modal-backdrop") && b.data.dialog.isClosable() && b.data.dialog.canCloseByBackdrop() && b.data.dialog.close()
            });
            return this
        },
        isModalEvent: function (a) {
            return "undefined" !== typeof a.namespace && "bs.modal" === a.namespace
        },
        makeModalDraggable: function () {
            this.options.draggable && (this.getModalHeader().addClass(this.getNamespace("draggable")).on("mousedown", {
                dialog: this
            }, function (a) {
                var b = a.data.dialog;
                b.draggableData.isMouseDown = !0;
                var c = b.getModalDialog().offset();
                b.draggableData.mouseOffset = {
                    top: a.clientY - c.top,
                    left: a.clientX - c.left
                }
            }), this.getModal().on("mouseup mouseleave", {
                dialog: this
            }, function (a) {
                a.data.dialog.draggableData.isMouseDown = !1
            }), a("body").on("mousemove", {
                dialog: this
            }, function (a) {
                var b = a.data.dialog;
                b.draggableData.isMouseDown && b.getModalDialog().offset({
                    top: a.clientY - b.draggableData.mouseOffset.top,
                    left: a.clientX - b.draggableData.mouseOffset.left
                })
            }));
            return this
        },
        realize: function () {
            this.initModalStuff();
            this.getModal().addClass(d.NAMESPACE).addClass(this.getCssClass());
            this.updateSize();
            this.getDescription() && this.getModal().attr("aria-describedby", this.getDescription());
            this.getModalFooter().append(this.createFooterContent());
            this.getModalHeader().append(this.createHeaderContent());
            this.getModalBody().append(this.createBodyContent());
            this.getModal().data("bs.modal", new c(this.getModal(), {
                backdrop: "static",
                keyboard: !1,
                show: !1
            }));
            this.makeModalDraggable();
            this.handleModalEvents();
            this.setRealized(!0);
            this.updateButtons();
            this.updateType();
            this.updateTitle();
            this.updateMessage();
            this.updateClosable();
            this.updateAnimate();
            this.updateSize();
            this.updateTabindex();
            return this
        },
        open: function () {
            !this.isRealized() && this.realize();
            this.getModal().modal("show");
            return this
        },
        close: function () {
            !this.isRealized() && this.realize();
            this.getModal().modal("hide");
            return this
        }
    };
    d.prototype = a.extend(d.prototype, d.METHODS_TO_OVERRIDE[c.getModalVersion()]);
    d.newGuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            function (a) {
                var b = 16 * Math.random() | 0;
                return ("x" === a ? b : b & 3 | 8).toString(16)
            })
    };
    d.show = function (a) {
        return (new d(a)).open()
    };
    d.alert = function (b, c) {
        var f = {};
        f = {
            type: d.TYPE_PRIMARY,
            title: null,
            message: null,
            closable: !1,
            draggable: !1,
            buttonLabel: d.DEFAULT_TEXTS.OK,
            callback: null
        };
        f = "object" === typeof b && b.constructor === {}.constructor ? a.extend(!0, f, b) : a.extend(!0, f, {
            message: b,
            callback: "undefined" !== typeof c ? c : null
        });
        return (new d({
            type: f.type,
            title: f.title,
            message: f.message,
            closable: f.closable,
            draggable: f.draggable,
            data: {
                callback: f.callback
            },
            onhide: function (a) {
                !a.getData("btnClicked") && a.isClosable() && "function" === typeof a.getData("callback") && a.getData("callback")(!1)
            },
            buttons: [{
                label: f.buttonLabel,
                action: function (a) {
                    a.setData("btnClicked", !0);
                    return "function" === typeof a.getData("callback") && !1 === a.getData("callback").call(this, !0) ? !1 : a.close()
                }
            }]
        })).open()
    };
    d.confirm = function (b, c) {
        var f = {};
        f = {
            type: d.TYPE_PRIMARY,
            title: null,
            message: null,
            closable: !1,
            draggable: !1,
            btnCancelLabel: d.DEFAULT_TEXTS.CANCEL,
            btnOKLabel: d.DEFAULT_TEXTS.OK,
            btnOKClass: null,
            callback: null
        };
        f = "object" === typeof b && b.constructor === {}.constructor ? a.extend(!0, f, b) : a.extend(!0, f, {
            message: b,
            closable: !1,
            buttonLabel: d.DEFAULT_TEXTS.OK,
            callback: "undefined" !== typeof c ? c : null
        });
        null === f.btnOKClass && (f.btnOKClass = ["btn", f.type.split("-")[1]].join("-"));
        return (new d({
            type: f.type,
            title: f.title,
            message: f.message,
            closable: f.closable,
            draggable: f.draggable,
            data: {
                callback: f.callback
            },
            buttons: [{
                label: f.btnCancelLabel,
                action: function (a) {
                    return "function" === typeof a.getData("callback") &&
                        !1 === a.getData("callback").call(this, !1) ? !1 : a.close()
                }
            }, {
                label: f.btnOKLabel,
                cssClass: f.btnOKClass,
                action: function (a) {
                    return "function" === typeof a.getData("callback") && !1 === a.getData("callback").call(this, !0) ? !1 : a.close()
                }
            }]
        })).open()
    };
    d.warning = function (a, b) {
        return (new d({
            type: d.TYPE_WARNING,
            message: a
        })).open()
    };
    d.danger = function (a, b) {
        return (new d({
            type: d.TYPE_DANGER,
            message: a
        })).open()
    };
    d.success = function (a, b) {
        return (new d({
            type: d.TYPE_SUCCESS,
            message: a
        })).open()
    };
    return d
});
var gei = {
    core: {}
};
gei.core.eventBus = {
    eventGroup: {},
    on: function (a, b, c) {
        var d = this.eventGroup[a];
        d || (d = [], this.eventGroup[a] = d);
        d.push({
            fn: b,
            scope: c
        })
    },
    fire: function () {
        var a = Array.prototype.slice.call(arguments, 0),
            b = a.shift();
        if (b = this.eventGroup[b])
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d.fn.apply(d.scope, a)
            }
    },
    off: function (a, b) {
        var c = this.eventGroup[a];
        c && (this.eventGroup[a] = b ? c.filter(function (a) {
            return a.fn != b
        }) : [])
    },
    clear: function () {
        this.eventGroup = {}
    }
};
gei.core.onPressEnter = function (a, b) {
    $(a).bind("keydown", function () {
        "13" == event.keyCode && b()
    })
};
gei.core.equals = function (a, b) {
    if (a === b) return !0;
    if (!(a instanceof Object && b instanceof Object) || a.constructor !== b.constructor) return !1;
    for (var c in a)
        if (a.hasOwnProperty(c) && (!b.hasOwnProperty(c) || a[c] !== b[c] && ("object" !== typeof a[c] || !Object.equals(a[c], b[c])))) return !1;
    for (c in b)
        if (b.hasOwnProperty(c) && !a.hasOwnProperty(c)) return !1;
    return !0
};
var pageCreateTime = (new Date).getTime();

function page(a) {}
String.prototype.replaceAll = function (a, b) {
    for (var c = this; 0 <= c.indexOf(a);) c = c.replace(a, b);
    return c
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "")
};
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "")
};

function to(a) {
    $('<form target="_blank" method="get"/>').attr("action", a).appendTo("body").submit()
}

function go(a) {
    window.location.href = a
}

function slideTo(a, b) {
    b = b || 0;
    0 == a.size() ? log("warn: slideTo\u672a\u7ed1\u5b9a\u5bf9\u8c61") : $("html,body").animate({
        scrollTop: a.offset().top + b
    }, 500)
}

function slideToTop() {
    $("html,body").animate({
        scrollTop: 0
    }, 500)
}
var _dlogWindowIndex = 1;

function dlog(a) {
    if (debugModel) {
        var b = window.screen.availWidth - 300,
            c = $("#debugLogWin");
        0 == c.size() && (c = $("<div/>").attr("id", "debugLogWin").css("border", "3px solid red").css("overflow", "auto").appendTo($("body")), c.css("position", "fixed").css("top", 100).css("left", b).css("background-color", "white").width(300).height(300));
        log(a);
        c.html("(" + _dlogWindowIndex++ + ") " + a + "<br/>" + c.html())
    }
}

function isSpiderVisitFunc() {
    return "undefined" === typeof isSpiderVisit ? !1 : isSpiderVisit
}

function rendSpanHref() {
    if (isSpiderVisitFunc()) return !1;
    $(".js-href").each(function (a, b) {
        a = $(b);
        b = a.attr("name");
        b = b.replace(/\|:\|/g, "/").replace(/\|\*\|/g, ".");
        debugModel && (b = gei.util.urlAddParm(b, "spanHref", "true"));
        a.removeClass("js-href");
        $("<a/>").attr("href", b).attr("title", a.attr("title")).attr("container", a.attr("container")).attr("scrollTO", a.attr("scrollTO")).attr("pjax", a.attr("pjax")).attr("target", a.attr("target")).attr("class", a.attr("class")).attr("style", a.attr("style")).attr("rel",
            a.attr("rel")).attr("id", a.attr("id")).html(a.html()).insertAfter(a);
        a.remove()
    })
}
var resContainer = $("#resContainer");
resContainer.off("pjax:start").on("pjax:start", function (a) {
    a.preventDefault();
    NProgress.start();
    gei.core.eventBus.fire("Event_pageContentLoadStart")
});
resContainer.off("pjax:end").on("pjax:end", function (a, b) {
    a.preventDefault();
    gei.core.eventBus.fire("Event_pageContentLoadEnd");
    NProgress.done()
});
resContainer.off("pjax:beforeReplace").on("pjax:beforeReplace", function (a, b) {
    a.preventDefault();
    gei.core.eventBus.fire("Event_pageContentBeforeReplace", {
        contents: b
    })
});

function rendPjax() {
    $('a[pjax="true"]').each(function (a, b) {
        b = $(b);
        var c = $(b.attr("container")),
            d = !1;
        (a = b.attr("scrollTo") ? $(b.attr("scrollTo")) : null) && 0 < a.size() && (d = a.position().top - 50);
        $(b).click(function (a) {
            $.support.pjax && a.preventDefault();
            $.pjax({
                url: b.attr("href"),
                timeout: 5E3,
                scrollTo: d,
                container: c
            })
        })
    })
}
gei.core.eventBus.on("Event_pageContentLoadEnd", rendLink);

function rendLink() {
    rendSpanHref();
    rendPjax()
}

function autoReloadImage() {
    $("img").each(function (a, b) {
        var c = $(b);
        c.bind("error", function () {
            _imageErrorTry(c)
        })
    })
}
gei.core.eventBus.on("Event_pageContentLoadEnd", autoReloadImage);

function _imageErrorTry(a) {
    var b = a.data("errorCount");
    b || (b = 0);
    b++;
    a.data("errorCount", b);
    var c = a.attr("src");
    a.data("original") && (c = a.data("original"));
    3 >= b ? (a.attr("src", assetsUrl + "/site/img/public/blank.png"), a.attr("src", c)) : a.attr("src", assetsUrl + "/site/img/icon/waring-grey.png")
}

function urlAddParm(a, b, c) {
    return a + (-1 == a.indexOf("?")) ? "?" : "&" + b + "=" + c
}

function freshPage() {
    window.location.href = window.location.href
}

function getUUID() {
    return (new UUID).id
}

function UUID() {
    this.id = this.createUUID()
}
UUID.prototype.valueOf = function () {
    return this.id
};
UUID.prototype.toString = function () {
    return this.id
};
UUID.prototype.createUUID = function () {
    var a = new Date(1582, 10, 15, 0, 0, 0, 0),
        b = (new Date).getTime() - a.getTime();
    a = UUID.getIntegerBits(b, 0, 31);
    var c = UUID.getIntegerBits(b, 32, 47);
    b = UUID.getIntegerBits(b, 48, 59) + "1";
    var d = UUID.getIntegerBits(UUID.rand(4095), 0, 7),
        f = UUID.getIntegerBits(UUID.rand(4095), 0, 7),
        g = UUID.getIntegerBits(UUID.rand(8191), 0, 7) + UUID.getIntegerBits(UUID.rand(8191), 8, 15) + UUID.getIntegerBits(UUID.rand(8191), 0, 7) + UUID.getIntegerBits(UUID.rand(8191), 8, 15) + UUID.getIntegerBits(UUID.rand(8191),
            0, 15);
    return a + c + b + d + f + g
};
UUID.getIntegerBits = function (a, b, c) {
    a = UUID.returnBase(a, 16);
    for (var d = [], f = "", g = 0; g < a.length; g++) d.push(a.substring(g, g + 1));
    for (g = Math.floor(b / 4); g <= Math.floor(c / 4); g++) f = d[g] && "" != d[g] ? f + d[g] : f + "0";
    return f
};
UUID.returnBase = function (a, b) {
    return a.toString(b).toUpperCase()
};
UUID.rand = function (a) {
    return Math.floor(Math.random() * (a + 1))
};
var browser = {
    versions: function () {
        var a = navigator.userAgent;
        return {
            trident: -1 < a.indexOf("Trident"),
            presto: -1 < a.indexOf("Presto"),
            webKit: -1 < a.indexOf("AppleWebKit"),
            gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
            ios: !!a.match(/(i[^;]+;(U;)? CPU.+Mac OS X)/),
            android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
            iPhone: -1 < a.indexOf("iPhone"),
            iPad: -1 < a.indexOf("iPad"),
            webApp: -1 == a.indexOf("Safari")
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function isIPhoneOrIPad() {
    return browser.versions.iPhone || browser.versions.iPad
}

function createFormAndSubmit(a, b, c, d) {
    c = c || "get";
    d = d || "_self";
    var f = $("<form>").attr("action", a).attr("method", c).attr("target", d);
    $.each(b, function (a, b) {
        $("<input>").attr("type", "hidden").attr("name", a).val(b).appendTo(f)
    });
    f.appendTo($("body"));
    f.submit();
    f.remove()
}
gei.util = {};
gei.util.click = function (a, b) {
    $(a).unbind("click").click(b)
};
gei.util.parseQueryUrl2Obj = function (a) {
    var b = {},
        c = a.indexOf("?"); - 1 < c && (a = a.substring(c + 1, a.length));
    a = a.split("&");
    for (c = 0; c < a.length; c++) {
        var d = a[c].split("=");
        b[d[0]] = d[1]
    }
    return b
};
gei.sec = function (a) {
    var b = {
        "'": "&apos;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;"
    };
    return a = a.replace(/(['")-><&\\\/\.])/g, function (a) {
        return b[a] || a
    })
};
gei.ajax = function (a, b, c) {
    a.dataType || (a.dataType = "json");
    a.success = function (d, f) {
        "json" == a.dataType ? ajaxSuccJson(a, d, b, c) : b && b(d)
    };
    a.error = function (a, b, g) {
        c && c()
    };
    $.ajax(a)
};

function ajaxSuccJson(a, b, c, d) {
    "success" == b.status ? c && c(b) : b.errorCode ? "needLogin" == b.errorCode ? popLoginTip("operate") : "needVip" == b.errorCode ? gei.util.pop({
        type: BootstrapDialog.TYPE_WARNING,
        title: "\u5f00\u901aVIP\u4f1a\u5458",
        message: "\u8be5\u64cd\u4f5c\u9700\u8981VIP\u4f1a\u5458"
    }) : reportWarnImportant("rest.errorCode \u672a\u8bc6\u522b,rest.errorCode=" + b.errorCode) : d ? d(b) : reportWarn("ajax\u672a\u5904\u7406\u5f02\u5e38,status=" + b.status + " url=" + a.url)
}
gei.ajaxWithError = function (a, b, c) {
    gei.ajax(a, b, function (a) {
        gei.util.pop({
            type: BootstrapDialog.TYPE_DANGER,
            title: "\u7cfb\u7edf\u51fa\u9519",
            message: a && a.message ? a.message : "\u7cfb\u7edf\u51fa\u9519\u4e86,\u8bf7\u548c\u7f51\u7ad9\u7ba1\u7406\u5458\u8054\u7cfb"
        })
    })
};
gei.util.pop = function (a) {
    a = $.extend({
        cssClass: "",
        width: 500,
        title: "\u7cfb\u7edf\u63d0\u793a",
        buttons: [{
            label: "\u5173\u95ed",
            action: function (a) {
                a.close()
            }
        }]
    }, a);
    a.cssClass = a.cssClass + " modal-dialog-width-" + a.width;
    return BootstrapDialog.show(a)
};
gei.util.confirm = function (a, b, c) {
    c = $.extend({
        type: BootstrapDialog.TYPE_INFO,
        title: "\u7cfb\u7edf\u63d0\u793a",
        width: 300,
        message: a,
        buttons: [{
            label: "\u786e\u8ba4",
            cssClass: "btn-primary",
            action: function (a) {
                a.close();
                b()
            }
        }, {
            label: "\u53d6\u6d88",
            action: function (a) {
                a.close()
            }
        }]
    }, c);
    gei.util.pop(c)
};
gei.util.alertSuccess = function (a, b) {
    b = $.extend({
        type: BootstrapDialog.TYPE_SUCCESS,
        title: "\u7cfb\u7edf\u63d0\u793a",
        width: 300,
        message: a
    }, b);
    gei.util.pop(b)
};
gei.util.alertWarn = function (a, b) {
    b = $.extend({
        type: BootstrapDialog.TYPE_WARNING,
        title: "\u7cfb\u7edf\u63d0\u793a",
        width: 300,
        message: a
    }, b);
    gei.util.pop(b)
};
gei.util.uiPopover = function (a, b) {
    var c = $.extend({
        placement: isMobileSite ? "auto-top" : "auto-right",
        trigger: "hover",
        closeable: !0
    }, b || {});
    $(a).each(function (a, b) {
        a = $(b);
        (b = a.attr("data-placement")) && (c = $.extend(c, {
            placement: b
        }));
        b = "";
        var d = a.attr("data-selector");
        d && (b = $(d).html());
        c = $.extend(c, {
            content: b
        });
        a.webuiPopover(c)
    })
};
gei.util.reload = function () {
    window.location.href = window.location.href
};
gei.util.tooltipAutoHide = function (a, b, c) {
    c = c || {};
    c = $.extend({
        trigger: "manual",
        html: !0,
        placement: "top"
    }, c);
    a.attr("title", b);
    a.tooltip(c);
    a.tooltip("fixTitle");
    a.tooltip("show");
    window.setTimeout(function () {
        a.tooltip("hide")
    }, 15E3);
    var d = null;
    a.mouseleave(function () {
        d = setInterval(function () {
            a.tooltip("hide");
            clearInterval(d)
        }, 3E3)
    });
    a.mouseenter(function () {
        d && clearInterval(d)
    })
};
gei.util.tipLoading = {
    start: function (a) {
        a && 0 < $(a).size() && $(a).tooltip({
            title: "\u52a0\u8f7d\u4e2d...",
            trigger: "manual",
            container: "body"
        });
        $(a).tooltip("show")
    },
    done: function (a) {
        a && 0 < $(a).size() && $(a).tooltip("hide")
    }
};
gei.util.urlAddParm = function (a, b, c) {
    var d = "",
        f = a.indexOf("#");
    0 <= f && (d = a.substr(f, a.length), a = a.substr(0, f));
    f = 0 > a.indexOf("?") ? "?" : "&";
    return a + f + b + "=" + c + d
};
gei.util.cnzzPost = function () {};
gei.util.arr = {
    join: function (a, b) {
        for (var c = "", d = 0; d < a.length; d++) c += a[d] + (d != a.length - 1 ? b : "");
        return c
    }
};
gei.util.changeRadioCheckedRed = function (a) {
    a && 0 == a.size() || $('input[type="radio"]:checked', a).each(function (b, c) {
        $('input[name="' + $(c).attr("name") + '"]', a).each(function (a, b) {
            $(b).is(":checked") ? $(b).parent().css("color", "#d9534f") : $(b).parent().css("color", "black")
        })
    })
};
gei.util.dateFormat = function (a, b) {
    var c = {
        "M+": b.getMonth() + 1,
        "d+": b.getDate(),
        "h+": b.getHours(),
        "m+": b.getMinutes(),
        "s+": b.getSeconds(),
        "q+": Math.floor((b.getMonth() + 3) / 3),
        S: b.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (b.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var d in c)(new RegExp("(" + d + ")")).test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
    return a
};
gei.util.createForm = function (a, b) {
    var c = $("<form/>").appendTo("body");
    c.attr("action", a);
    c.attr("method", "post");
    c.attr("target", "_blank");
    c.hide();
    $.each(b, function (a, b) {
        c.append("<input type='hidden' name='" + a + "' value = '" + b + "'/>")
    });
    return c
};
$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
$.browser.android = /Android/.test(navigator.userAgent.toLowerCase());
var imageUtil = {
    resizeRatio: function (a, b) {
        var c = {};
        b.width > a.width && b.height > a.height ? (c.width = a.width, c.height = a.height) : a.width / a.height > b.width / b.height ? (c.width = b.width, c.height = b.width / a.width * a.height) : (c.height = b.height, c.width = b.height / a.height * a.width);
        return c
    }
};
$.fn.ajaxRequest = function (a) {
    a || (a = {});
    var b = "\u8bf7\u6c42";
    "query" == a.type ? b = "\u67e5\u8be2" : (a.type = "submit", b = "\u63d0\u4ea4");
    var c = {
        type: "post",
        url: a.url,
        beforeSubmit: function () {
            if (a.begin) return a.begin()
        },
        success: function (c) {
            messageClose();
            try {
                c = $.parseJSON(c)
            } catch (f) {
                c = {
                    status: "error",
                    message: "\u89e3\u6790\u670d\u52a1\u5668\u8fd4\u56de\u7ed3\u679c\u51fa\u9519\uff01"
                }
            }
            "success" == c.status ? (a.success && a.success(c), "delete" == a.type && pageMessage("\u5220\u9664\u6210\u529f", "succuess", 1)) : (pageMessage(b +
                "\u5931\u8d25\uff1a" + c.message, "error", 3), a.error && a.error());
            a.end && a.end()
        },
        error: function (b) {
            messageClose();
            pageMessage("\u7cfb\u7edf\u9519\u8bef\uff01 ", "error", 3);
            a.error && a.error(b);
            a.end && a.end()
        }
    };
    a.enabelAjaxSubmit ? this.ajaxSubmit(c) : this.ajaxForm(c)
};
(function (a, b, c) {
    a.fn.scrollUp = function (b) {
        a.data(c.body, "scrollUp") || (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b))
    };
    a.fn.scrollUp.init = function (d) {
        var f = a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, d),
            g = a("<a/>", {
                id: f.scrollName,
                href: "#top",
                title: f.scrollTitle ? f.scrollTitle : f.scrollText
            }).appendTo("body");
        f.scrollImg || g.html(f.scrollText);
        g.css({
            display: "none",
            position: "fixed",
            zIndex: f.zIndex
        });
        f.activeOverlay && a("<div/>", {
            id: f.scrollName + "-active"
        }).css({
            position: "absolute",
            top: f.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + f.activeOverlay,
            zIndex: f.zIndex
        }).appendTo("body");
        scrollEvent = a(b).scroll(function () {
            scrollDis = "top" === f.scrollFrom ? f.scrollDistance : a(c).height() - a(b).height() - f.scrollDistance;
            switch (f.animation) {
                case "fade":
                    a(a(b).scrollTop() > scrollDis ? g.fadeIn(f.animationInSpeed) : g.fadeOut(f.animationOutSpeed));
                    break;
                case "slide":
                    a(a(b).scrollTop() > scrollDis ? g.slideDown(f.animationInSpeed) : g.slideUp(f.animationOutSpeed));
                    break;
                default:
                    a(a(b).scrollTop() >
                        scrollDis ? g.show(0) : g.hide(0))
            }
        });
        g.click(function (b) {
            b.preventDefault();
            a("html, body").animate({
                scrollTop: 0
            }, f.scrollSpeed, f.easingType)
        })
    };
    a.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    };
    a.fn.scrollUp.destroy = function (d) {
        a.removeData(c.body, "scrollUp");
        a("#" + a.fn.scrollUp.settings.scrollName).remove();
        a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove();
        7 <= a.fn.jquery.split(".")[1] ? a(b).off("scroll", d) : a(b).unbind("scroll", d)
    };
    a.scrollUp = a.fn.scrollUp
})(jQuery, window, document);
(function (a) {
    a.fn.structNav = a.fn.structNav = function (b) {
        var c, d, f, g;
        init = function (l) {
            opts = a.extend({}, a.fn.structNav.defaults, b);
            a(".struct-nav-fixed").remove();
            c = a('<div class="struct-nav-fixed-container"></div>');
            d = a('<div class="struct-nav-fixed"></div>').appendTo(c);
            f = a('<ul class="struct-nav-fixed-box"></ul>').appendTo(d);
            opts.rootNavName && (g = a("<li>").html(opts.rootNavName).addClass("active").appendTo(f), g.click(function () {
                slideToTop()
            }), a("<span>:</span>").appendTo(f));
            var q = 0;
            opts.navGroupEls.each(function (b,
                c) {
                var g = a(c);
                (b = g.attr("struct-nav-name")) ? (g.data("struct-nav-index", q), a("<li>").html(b).attr("struct-nav-index", q).appendTo(f).click(function () {
                    slideTo(g, -1 * (d.height() + 7))
                }), q++) : alert("struct nav group \u8bf7\u8bbe\u7f6e\u5c5e\u6027:struct-nav-name")
            });
            c.appendTo(a(l));
            a.showFixedNav();
            a(window).scroll(function () {
                a.showFixedNav()
            })
        };
        a.showFixedNav = function () {
            var b = a(document).scrollTop();
            0 > opts.navGroupEls.first().position().top - b ? d.show() : d.hide();
            var c = g ? g : null;
            opts.navGroupEls.each(function (f,
                g) {
                f = a(g);
                0 > f.position().top - d.height() - b && (c = a('[struct-nav-index="' + f.data("struct-nav-index") + '"]', d))
            });
            a("li", d).removeClass("active");
            c && c.addClass("active")
        };
        this.each(function () {
            init(a(this))
        })
    };
    a.fn.structNav.defaults = {
        navGroupEls: null,
        rootNavName: null
    }
})(jQuery);

function log(a) {
    "undefined" !== typeof console && "undefined" !== typeof console.log && developModel && console.log(a)
}

function logErr(a) {
    "undefined" !== typeof console && "undefined" !== typeof console.log && (console.error(a), debugModel && dlog(a))
}
window.onerror = function (a, b, c, d, f) {
    try {
        var g = "";
        "undefined" !== typeof currentPageUrl && (g = currentPageUrl);
        b = "window.onerror pageUrl\uff1a" + g + " report:Url=" + b + " Line:" + c;
        d && (b += " columnNumber:" + d);
        a && (b += " msg:" + a);
        f && (b += " error:" + $.param(f));
        reportWarn && reportWarn(b);
        dlog(b)
    } catch (l) {
        reportWarn && reportWarn("window.onerror happen error! message:" + l.message)
    }
};
var _pageErrorReportCount = 0;

function reportWarn(a) {
    3 <= _pageErrorReportCount || (_pageErrorReportCount++, $.post("/f/d/l/", {
        m: a,
        c: "userAgent:" + navigator.userAgent + " ; appName:" + navigator.appName
    }), dlog("JS ReportWarn : " + a))
}

function reportWarnImportant(a) {
    reportWarn("import warn log:" + a)
}

function autoLogPageViewLog() {
    "undefined" !== typeof havePageViewLog && havePageViewLog || "undefined" != typeof currentPageUrl && pageViewLog(currentPageUrl, cccccclllpppeeeeeetttt, cccccclllppppttttt)
}

function pageViewLog(a, b, c) {
    viewLog("page_view", a, b, c)
}

function rescViewLog(a, b, c) {
    viewLog("resc_view", a, b, c)
}

function catViewLog(a, b, c) {
    viewLog("cat_view", a, b, c)
}

function viewLog(a, b, c, d) {
    isSpiderVisitFunc() || setTimeout(function () {
        var f = dfu(a, b, c, d);
        $.post("/f/d/", cqbj(f))
    }, 500)
}
var lll1i111lOOO0o00ii1 = {
    il0oo0Oli1il1: 6
};
$(function () {
    Messenger.options = {
        extraClasses: "messenger-fixed messenger-on-bottom messenger-on-right",
        theme: "ice"
    };
    autoLogPageViewLog();
    showScrollUp && $.scrollUp({
        scrollDistance: 400,
        scrollImg: !0
    });
    var a = document.referrer;
    "" != llllttttt && a && 0 != a.indexOf("http://www.aigei.com") && 0 != a.indexOf("http://m.aigei.com") && 0 != a.indexOf("http://m.11rpg.com") && 0 != a.indexOf("http://www.11rpg.com") && 0 != a.indexOf("http://localhost") && $.post("/data-get/link/f", {
        t: llllttttt,
        r: a,
        h: location.hash
    });
    var b = window.location.hash;
    if (b && "" != b) {
        var c = /^#s(\d+)/;
        b.match(c) && (c = c.exec(b)) && 1 < c.length && (c = {
            shareId: c[1],
            selfUrl: currentPageUrl
        }, a && (c.outUrl = a), $.post("/data-get/share/f", c));
        c = /^#m_(\w+_\d+)/;
        b.match(c) && (c = c.exec(b)) && 1 < c.length && (c = {
            missionValue: c[1]
        }, a && (c.outUrl = a), $.post("/data-get/mission/f", c))
    }
    "" != uuuufffffddd && uuuufffffddd != nowDay && $.post("/data-get/try/u");
    gei.core.eventBus.fire("Event_pageContentLoadEnd")
});
gei.core.eventBus.on("Event_pageContentLoadEnd", function () {
    commonPageInit();
    adjustUnitRowHeightSame()
});

function commonPageInit() {
    $(".prevent-default-event").click(function (a) {
        a.preventDefault();
        a.stopPropagation();
        return !1
    });
    $(".share-btn").each(function (a, c) {
        a = $(c);
        void 0 != a.attr("sharetype") && (c = "/share/" + a.attr("sharetype") + "/" + a.attr("shareid"), $("<a/>").attr("href", c).attr("target", "_blank").attr("class", a.attr("class")).html(a.html()).insertAfter(a), a.remove())
    });
    autoReloadImage();
    $(".gei-tooltip").tooltip();
    imageLazy();
    var a = $(".ad-item");
    0 < a.size() && a.popover();
    a = $(".trans-popover");
    0 < a.size() &&
        a.popover({
            trigger: "hover",
            title: "\u7cfb\u7edf\u81ea\u52a8\u7ffb\u8bd1",
            html: !0,
            placement: "top"
        });
    autoComplete().bind();
    $("#searchBtnSite").click(function () {
        submitSearchSite()
    });
    a = $(".index-content-container");
    0 < a.size() && $("body").structNav({
        navGroupEls: a,
        rootNavName: structPageRootName
    });
    $(".collapse-box").each(function (a, c) {
        c = $(c);
        a = parseInt(c.attr("data-max-heigth"));
        c.height() < a + 10 || (c.css({
            overflow: "hidden",
            "max-height": a + "px"
        }), a = $("<span/>").html("\u663e\u793a\u5168\u90e8\u2228"), a.css("color",
            "#999").css("float", "right").css("cursor", "pointer"), a.click(function () {
            c.css({
                overflow: "auto",
                "max-height": ""
            });
            $(this).remove()
        }), a.insertAfter(c))
    })
}

function initTermQuery() {
    initTermSelect();
    initTermRange()
}
gei.core.eventBus.on("Event_pageContentLoadEnd", function () {
    initTermQuery()
});

function initTermSelect() {
    var a = function (a) {
        if (!a.id) return a.text;
        var b = a.text,
            d = b.indexOf(":"); - 1 < d && (b = b.substr(d + 1));
        b = "<span>" + b + "</span>";
        a.title && (b += '<span class="muted pull-right" style="padding-right:5px;">' + a.title + "</span>");
        return $(b)
    };
    $(".term-select").show().each(function (b, c) {
        $(c).select2({
            language: "zh-CN",
            placeholder: $(c).attr("select-placeholder"),
            minimumResultsForSearch: Infinity,
            allowClear: !0,
            templateResult: a
        })
    }).on("select2:select", function (a) {
        window.location.href = a.params.data.id
    }).on("select2:unselect",
        function (a) {
            window.location.href = a.params.data.id
        })
}
var termRangeClickExt = function (a) {},
    _termRangeClick = function (a) {
        var b = $(".min-input", a).val().trim(),
            c = $(".max-input", a).val().trim(),
            d = $(".btn", a).attr("url"),
            f = /^\d+$/;
        "" != b && !f.test(b) || "" != c && !f.test(c) ? alert("\u62b1\u6b49\uff0c\u53ea\u80fd\u8f93\u5165\u6b63\u6574\u6570!") : ("" == b && "" == c && (a = $(".btn", a).attr("jsTermUrlFormat"), d = d.replace("-" + a, "")), d = d.replace("${minValue}", b), d = d.replace("${maxValue}", c), $.pjax({
                url: d,
                scrollTo: !1,
                timeout: 5E3,
                container: $("#resContainer")
            }), termRangeClickExt &&
            termRangeClickExt(d))
    };

function initTermRange() {
    $(".term-range").each(function (a, b) {
        var c = $(b);
        gei.core.onPressEnter($(".min-input", c), function () {
            _termRangeClick(c)
        });
        gei.core.onPressEnter($(".max-input", c), function () {
            _termRangeClick(c)
        });
        $(".btn", c).click(function () {
            _termRangeClick(c)
        })
    })
}

function submitSearchSite() {
    var a = $("#keywordInputSite").val(),
        b = $("#searchBtnSite").attr("soSubjectCode"),
        c = $("#searchForm");
    $('input[name="type"]', c).remove();
    "" != b && $('<input name="type" type="hidden">').val(b).appendTo(c);
    c = {};
    c.q = a;
    "" != b && (c.type = b);
    createFormAndSubmit("/s", c, "get", "_blank")
}

function autoComplete(a) {
    function b() {
        $.post("/search/log/add", {
            q: g.qBtn.val(),
            type: g.searchType()
        })
    }

    function c() {
        var a = g.searchType();
        g.qBtn.typeahead("destroy");
        g.qBtn.typeahead({
            hint: !1,
            highlight: !1,
            minLength: 1
        }, {
            name: "searchTip",
            display: "value",
            limit: 100,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: "/search/suggestion/query?type=" + a + "&q=%QUERY",
                    wildcard: "%QUERY"
                }
            }),
            templates: {
                suggestion: Handlebars.compile("<div><span>{{value}}</span></div>")
            }
        });
        g.qBtn.unbind("typeahead:cursorchange").bind("typeahead:cursorchange", function (a, b) {
            g.onCursorChanged()
        });
        g.qBtn.unbind("typeahead:select").bind("typeahead:select", function (a, b) {
            g.onSelected()
        })
    }

    function d(a) {
        var b = event.keyCode,
            c = "13" == event.keyCode;
        c && setTimeout(function () {
            if ("8" != b || "" != g.qBtn.val())
                if (a && a(), c) g.onKeyEnter()
        }, 10)
    }
    var f = !1,
        g = $.extend({
            qBtn: $("#keywordInputSite"),
            searchBtn: $("#searchBtnSite"),
            searchType: function () {
                return $("#searchBtnSite").attr("soSubjectCode")
            },
            onKeyEnter: function () {
                g.qBtn.val(g.qBtn.val());
                g.qBtn.typeahead("close")
            },
            onKeyDown: function () {
                f || (b(), submitSearchSite())
            },
            onCursorChanged: function () {},
            onSelected: function () {
                f = !0;
                b();
                submitSearchSite()
            }
        }, a);
    return {
        bind: function () {
            g.qBtn.unbind("keydown").bind("keydown", function () {
                d(g.onKeyDown)
            });
            c()
        },
        addSearchLog: b,
        onSearchKeyDown: d
    }
}

function imageLazy() {
    $.fn.lazyload && $("img").filter(".lazy").lazyload({
        threshold: 100
    })
}
var adjustUnitRowHeightSame = function () {
    $(".unit-container-list").each(function (a, b) {
        b = $(b);
        a = new gei.ui.Table;
        a.initByElContainer(b.children(".unit-container"), b);
        a.rowIfAllColEmptyThenHide(".unit-info-row1");
        a.rowIfAllColEmptyThenHide(".unit-info-row2");
        a.rowIfAllColEmptyThenHide(".unit-info-row3");
        a.rowSetAllElHeightEqMax(".unit-title");
        a.rowSetAllElHeightEqMax(".resc-info-bottom-info-name");
        a.rowSetAllElHeightEqMax(".unit-info-row1");
        a.rowSetAllElHeightEqMax(".unit-info-row2");
        a.rowSetAllElHeightEqMax(".unit-info-row3");
        a.rowSetAllElHeightEqMax(".mark-bar");
        a.rowSetAllElHeightEqMax(".unit-content-box");
        a.rowSetAllElHeightEqMax(".unit-content-main");
        a.rowSetAllElHeightEqMax(".unit-box-from");
        a.rowSetAllElHeightEqMax()
    })
};

function popLoginPageLocalDev() {
    var a = mainHostUrl + "/jsp/login-dev-test/";
    isMobileVisit || isMobileSite ? window.location.href = a : openWindowCenter(a, "\u7528\u6237\u767b\u5f55", 710, 500)
}

function dynamicSearch() {
    function a(a) {
        a.bind("keydown", function () {
            var c = event.keyCode;
            13 != c && 32 != c || b(a)
        })
    }

    function b(a) {
        var b = $('input[name="dyKeywords"]', a).val(),
            c = $('input[name="subjectCode"]', a).val();
        a = $('input[name="range"]', a).val();
        createFormAndSubmit("/s", {
            q: b,
            type: c,
            range: a
        }, "get", "_blank")
    }
    gei.util.uiPopover(".showPopover", {
        trigger: "click",
        onShow: function (c) {
            a(c);
            $(".keyword", c).focus();
            $(".glyphicon-search, .input-group-addon", c).bind("click", {
                tipEl: c
            }, function (a) {
                b(a.data.tipEl)
            })
        }
    })
}

function itemFileDown(a, b) {
    itemFileGet(a, "down", b)
}

function itemFilePlay(a, b) {
    itemFileGet(a, "play", b)
}

function itemFilePlayDefine(a, b) {
    fileDownload(getTokenEl(a, b), "play")
}

function itemFileGet(a, b, c) {
    a = $(a);
    c = c ? $(c) : a;
    var d = a.attr("itemid");
    a = a.attr("item-down-type");
    fileDownload(getTokenEl(d, a), b, c)
}

function getTokenEl(a, b) {
    return $("#itemInfoToken_" + b + "_" + a).get(0)
}

function itemFileDwonByRurl(a) {
    itemFileGetByRurl(a, "down")
}

function itemFileGetByRurl(a, b) {
    a = $(a);
    var c = a.attr("rurl");
    fileDownload($('input[rurl="' + c + '"]').get(0), b, a)
}

function fileDownload(a, b, c) {
    fileGet(a, b, c)
}
var ZeroClipboardJsUrl = assetsUrl + "/lib/zeroclipboard-2.2.0/dist/ZeroClipboard.min.js",
    isZeroClipboardJsLoaded = "undefined" == typeof ZeroClipboard ? !1 : !0,
    isZeroClipboardError = !1;

function initZeroClipboard() {
    $(".copy-button").click(function () {
        isZeroClipboardError && gei.util.alertWarn('\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301"\u7acb\u5373\u590d\u5236"\u529f\u80fd,\u8bf7\u624b\u52a8\u590d\u5236!')
    }).each(function (a, b) {
        var c = new ZeroClipboard(b);
        c.on({
            ready: function (a) {
                c.on("aftercopy", function (a) {
                    alert("\u590d\u5236\u6210\u529f\uff01")
                })
            },
            error: function (a) {
                isZeroClipboardError = !0
            }
        })
    })
}

function bakDownload(a, b) {
    a = $("#" + a);
    a.attr("action", "/f/d/bak/" + b);
    a.submit()
}

function moreDownload(a) {
    var b = "<form id='bakdownloadForm' method='post' target=\"_blank\"><div class='well center-block'><div class='row' style='margin-bottom: 10px;'><div class=\"input-group\">" + ('<input type="text" class="form-control share-text-input" name=\'downloadUrl\' value="' + a + "\"><div id='copyButton' data-clipboard-text=\"" + a + '" class="input-group-addon btn btn-primary copy-button">\u7acb\u5373\u590d\u5236</div>') + "</div>";
    b += "</div>";
    b = b + ("<div class='row' style='margin-bottom: 10px;'><a type=\"button\" class=\"btn btn-primary btn-lg btn-block\" href='" +
        a + "' target='_blank'>\u4e3b\u529b\u4e0b\u8f7d\u70b9</a></div>") + "<div class='row' style='margin-bottom: 10px;'><button type=\"button\" class=\"btn btn-primary btn-lg btn-block\" onclick=\"bakDownload('bakdownloadForm','bak1');\">\u5907\u7528\u4e0b\u8f7d\u70b91</button></div><div class='row' style='margin-bottom: 10px;'><button type=\"button\" class=\"btn btn-primary btn-lg btn-block\" onclick=\"bakDownload('bakdownloadForm','bak2');\">\u5907\u7528\u4e0b\u8f7d\u70b92</button></div></div>";
    b += "</form>";
    gei.util.pop({
        title: "\u5907\u7528\u4e0b\u8f7d",
        width: 500,
        message: b,
        buttons: [],
        onshown: function (a) {
            isZeroClipboardJsLoaded ? initZeroClipboard() : jQuery.ajax({
                url: ZeroClipboardJsUrl,
                dataType: "script",
                async: !1
            }).done(function () {
                isZeroClipboardJsLoaded = !0;
                initZeroClipboard()
            })
        }
    })
}

function directDownloadTip(a, b) {
    var c = b.message,
        d = b.consumeFundDown;
    b = b.totalFundDown;
    b = Math.floor(b);
    c = "\u6ca1\u81ea\u52a8\u4e0b\u8f7d? <b><span class='link-style' onclick=\"moreDownload('" + c + "');\">\u5907\u7528\u4e0b\u8f7d\u70b9</span></b>";
    isFundTip && (c += "<br/>", 0 != d && (c += "\u94dc\u5e01 " + d + " ,\u4f59\u989d " + b));
    gei.util.tooltipAutoHide(a, c, {
        placement: "top"
    })
}
var _curFileDownOpts, fIsCached = null;

function fget(a) {
    var b = (new Date).getTime() - pageCreateTime;
    24 <= Math.ceil(b / 36E5) && (window.location.href = window.location.href);
    b = a.model;
    var c = a.itemId,
        d = a.item,
        f = a.callBack,
        g = a.type,
        l = a.rescUrl,
        q = a.expireTime,
        r = a.confirm,
        n = a.token,
        m = a.pkg,
        w = a.pkgItems,
        e = a.saveAs,
        k = a.resJsCallback,
        y = a.vcode;
    _curFileDownOpts = a;
    g = dfu(g, l, q, n, y, m, e);
    l = "playLog" == b ? !0 : !1;
    q = "cache" == b ? !0 : !1;
    if (fIsCached) {
        if ("cache" == b && fIsCached(c)) return;
        if ("play" == b && fIsCached(c)) {
            window[f](c);
            return
        }
    }
    g.isc = q;
    g.ilg = l;
    g.pkgItems = w;
    g.confirm =
        r || !1;
    b = cqbj(g);
    b = $.extend(b, a.gt_captchaResult || {});
    $.post("/f/d/", b, function (b) {
        try {
            b = $.parseJSON(b)
        } catch (x) {
            if (f) {
                closeVcodeDialog();
                window[f](d, a, b);
                if (k) window[k](d, a, b);
                return
            }
            gei.util.pop({
                type: BootstrapDialog.TYPE_WARNING,
                message: "\u5f88\u62b1\u6b49,\u7cfb\u7edf\u51fa\u73b0\u4e86\u9519\u8bef,\u6587\u4ef6\u4e0b\u8f7d\u5931\u8d25,\u6211\u4eec\u5df2\u7ecf\u8bb0\u5f55\u4e0b\u9519\u8bef,\u5c06\u4f1a\u5c3d\u5feb\u89e3\u51b3!code=1"
            });
            reportWarn("download server json parse exception! url=/f/d/")
        }
        proessResultJson(b,
            a)
    })
}

function downToolTipHidden() {
    globalCurrentDownloadEl && (globalCurrentDownloadTipHideInterval && clearInterval(globalCurrentDownloadTipHideInterval), globalCurrentDownloadEl.tooltip("hide"))
}

function proessResultJson(a, b) {
    var c = a.message;
    "success" == a.status ? (closeVcodeDialog(), fileProcess(a, b)) : "isLog" == a.status ? closeVcodeDialog() : "resetVsid" == a.status ? gei.util.reload() : "vcodeWrong" == a.status ? $("#vcodeMessage").html("\u8f93\u5165\u9519\u8bef,\u8bf7\u91cd\u8bd5") : "vcode-normal" == a.status ? (closeVcodeDialog(), showVcodeDialog()) : "vcode-gt" == a.status ? (closeVcodeDialog(), showVcodeGtDialog()) : "notEnoughFree" == a.status ? (downToolTipHidden(), closeVcodeDialog()) : "needLogin" == a.status ? (downToolTipHidden(),
        closeVcodeDialog(), popLoginTip("down")) : "needCheckPhone" == a.status ? (b = "\u7ed1\u5b9a", c = gei.win.bindPhone.MODEL_BIND, "true" == userBindPhone && (c = gei.win.bindPhone.MODEL_CHECK, b = "\u9a8c\u8bc1"), gei.win.bindPhone.pop(c, b, "\u8bf7" + b + "\u624b\u673a\uff0c\u5b8c\u6210\u767b\u5f55")) : "needVip" == a.status ? (downToolTipHidden(), closeVcodeDialog(), gei.util.pop({
        type: BootstrapDialog.TYPE_WARNING,
        title: "\u5f00\u901aVIP\u4f1a\u5458",
        message: c
    })) : "needTipConfirm" == a.status ? (downToolTipHidden(), closeVcodeDialog(), gei.util.confirm(c,
        function () {}, {
            buttons: [{
                label: "\u786e\u8ba4",
                cssClass: "btn-primary",
                action: function (a) {
                    a.close();
                    globalCurrentDownloadEl && globalCurrentDownloadEl.tooltip("show");
                    _curFileDownOpts.confirm = !0;
                    fget(_curFileDownOpts)
                }
            }, {
                label: "\u53d6\u6d88",
                action: function (a) {
                    a.close()
                }
            }]
        })) : "notEnoughCoin" == a.status ? (downToolTipHidden(), closeVcodeDialog(), c = gei.util.pop({
        type: BootstrapDialog.TYPE_WARNING,
        title: "\u4f59\u989d\u4e0d\u8db3",
        message: c
    }), 0 < $(".share-btn").size() && (b = $(".share-btn").last().clone(), b.removeClass("pull-right"),
        b.addClass("btn-small"), b.addClass("btn-link"), c = c.getModalBody(), c = $("#tipPageShareBtn", c), 0 < c.size() && c.append(b))) : "forbidden" == a.status ? (closeVcodeDialog(), gei.util.pop({
        type: BootstrapDialog.TYPE_WARNING,
        title: "\u7cfb\u7edf\u9519\u8bef",
        message: "\u5f88\u62b1\u6b49,\u7cfb\u7edf\u51fa\u73b0\u4e86\u9519\u8bef,\u6587\u4ef6\u4e0b\u8f7d\u88ab\u963b\u6b62,\u6211\u4eec\u5df2\u7ecf\u8bb0\u5f55\u4e0b\u9519\u8bef,\u5c06\u4f1a\u5c3d\u5feb\u89e3\u51b3!\u9519\u8bef\u4ee3\u7801=" + c
    }), reportWarn("download data.status=forbidden data.message=" +
        c)) : "downloadServerCrash" == a.status ? (downToolTipHidden(), closeVcodeDialog(), gei.util.pop({
        type: BootstrapDialog.TYPE_WARNING,
        title: "\u7cfb\u7edf\u9519\u8bef",
        message: "\u975e\u5e38\u62b1\u6b49\uff0c\u4e0b\u8f7d\u670d\u52a1\u5668\u51fa\u73b0\u4e86\u6545\u969c\uff0c\u8bf7\u7a0d\u540e\u518d\u8fdb\u884c\u4e0b\u8f7d\uff01"
    })) : "operateCheck" == a.status ? (downToolTipHidden(), closeVcodeDialog(), gei.util.pop({
        type: BootstrapDialog.TYPE_WARNING,
        title: "\u7cfb\u7edf\u63d0\u793a",
        message: a.message
    })) : (closeVcodeDialog(),
        gei.util.pop({
            type: BootstrapDialog.TYPE_WARNING,
            title: "\u7cfb\u7edf\u9519\u8bef",
            message: "\u5f88\u62b1\u6b49,\u7cfb\u7edf\u51fa\u73b0\u4e86\u9519\u8bef,\u6587\u4ef6\u4e0b\u8f7d\u88ab\u963b\u6b62,\u6211\u4eec\u5df2\u7ecf\u8bb0\u5f55\u4e0b\u9519\u8bef,\u5c06\u4f1a\u5c3d\u5feb\u89e3\u51b3!code=3"
        }), reportWarn("download server response error data.status:" + a.status + " data.message=" + c));
    a.pageMessage && Messenger().post({
        message: a.pageMessage,
        type: "",
        hideAfter: 10,
        showCloseButton: !0
    })
}

function fileProcess(a, b) {
    var c = a.message,
        d = b.model,
        f = b.itemId,
        g = b.fileUuid,
        l = b.callBack,
        q = b.resJsCallback;
    try {
        c = prest(c), a.message = c
    } catch (r) {
        reportWarnImportant("decode exception:" + r)
    }
    void 0 != a.totalFundDown && (userTotalFundDown = a.totalFundDown);
    if ("play" == d) {
        if (window[l](f, c, g), q) window[q](f, b, c)
    } else "playLog" != d && ("cache" == d ? gei.core.eventBus.fire("Event_FileDownloadCache", {
        itemId: f,
        message: c,
        model: d,
        type: b.type
    }) : "down" == d ? isMobileSite ? window.location.href = c : (b = $("#fileDownloadFrame"), 0 == b.size() &&
        (b = $('<iframe id="fileDownloadFrame" style="display:none"></iframe> ').appendTo($("body"))), b.attr("src", c), globalCurrentDownloadEl && (globalCurrentDownloadTipHideInterval && clearInterval(globalCurrentDownloadTipHideInterval), directDownloadTip(globalCurrentDownloadEl, a))) : alert("\u672a\u77e5\u7684model=" + d))
}
var globalCurrentDownloadEl = null,
    globalCurrentDownloadTipHideInterval = null;

function fileGet(a, b, c, d, f) {
    if (!_curVcodeDialogShow) {
        var g = $(a);
        0 == g.size() && logErr("fileGet token input \u4e0d\u5b58\u5728");
        var l = g.attr("itemid");
        a = {};
        c = c || g;
        a.type = g.attr("ftype");
        a.fileUuid = g.attr("fuid");
        a.model = b;
        a.itemId = l;
        a.item = d;
        a.rescUrl = g.attr("rurl");
        a.confirm = g.attr("confirm");
        a.expireTime = g.attr("extime");
        a.token = g.attr("token");
        a.callBack = g.attr("cbk");
        a.saveAs = g.attr("svs");
        a.resJsCallback = g.attr("rcbk");
        a.custPlayCallBack = f;
        a.pkg = g.attr("pkg");
        if ("true" == a.pkg) {
            b = $.map($(".pkg-item-chk:checked"),
                function (a) {
                    return $(a).val()
                });
            if (0 >= b.length) {
                gei.util.alertWarn("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u6587\u4ef6!");
                return
            }
            a.pkgItems = gei.util.arr.join(b, ",")
        }
        "down" == a.model && (globalCurrentDownloadEl = c, c.tooltip({
            title: "\u4e0b\u8f7d\u4e2d...",
            trigger: "manual",
            html: !0
        }), c.tooltip("show"), globalCurrentDownloadTipHideInterval = setInterval(function () {
            c.tooltip("hide");
            clearInterval(globalCurrentDownloadTipHideInterval)
        }, 4E3));
        fget(a)
    }
}

function initItemDetailContainerClick(a, b) {
    $(".unit-container").each(function (c, d) {
        c = $("." + a + "-box", $(d));
        if (0 < c.size()) {
            var f = $(".resc-info-bottom-info-name", $(d)).children();
            f.addClass("cursor hover-link");
            bindItemDetailElClick($(d), c, b);
            bindItemDetailElClick($(d), f, b)
        }
    })
}

function bindItemDetailElClick(a, b, c) {
    b.off("click").on("click", function () {
        var b = a.attr("itemid");
        toggleItemDetail(a, b, c)
    })
}

function toggleItemDetail(a, b, c, d) {
    getItemDetailRow(a);
    a.hasClass("item-info-row-open") ? (closeItemRowContainer(a.attr("itemid")), d && d(b)) : openItemRowContainer(a, b, c)
}

function openItemRowContainer(a, b, c) {
    var d = getItemDetailRow(a),
        f = $("#item-row-container-" + b);
    0 == f.size() ? (b = $("#itemInfoToken_item_detail_" + b), fileGet(b, null, null, a, c)) : (a.addClass("item-info-row-open"), closeRowOtherItem(a), f.appendTo(d), f.show(), c && c(b))
}

function callBackItemDetail(a, b, c) {
    var d = getItemDetailRow(a),
        f = a.attr("itemid");
    $("<div/>").attr("id", "item-row-container-" + f).data("item", a).addClass("item-row-container").appendTo(d);
    a.attr("itemid", f);
    a.addClass("item-info-row-open");
    d = getItemDetailRowContainer(f);
    var g = $(c);
    closeRowOtherItem(a);
    g.appendTo(d);
    bindFavAndNoteClick();
    b.custPlayCallBack && b.custPlayCallBack(f, b, c);
    gei.core.eventBus.fire("Event_itemDetailLoadSuccess", {
        itemId: f,
        container: d
    })
}

function closeItemRowContainer(a) {
    getItemDetailRowContainer(a).hide();
    getItemInfoDiv(a).removeClass("item-info-row-open")
}

function getItemInfoDiv(a) {
    return $("div[itemid=" + a + "]")
}

function getItemDetailRow(a) {
    return a.nextAll(".item-info-row:first")
}

function getItemDetailRowContainer(a) {
    return $("#item-row-container-" + a)
}

function closeRowOtherItem(a) {
    var b = a.attr("itemid");
    a = getItemDetailRow(a);
    $(".item-row-container:visible", a).each(function (a, d) {
        a = $(d).data("item");
        a.attr("itemid") != b && closeItemRowContainer(a.attr("itemid"))
    })
}
gei.ui = {};
gei.ui.maskAdd = function (a) {
    a = $(a);
    a.css("position", "relative");
    $("<div>").css({
        opacity: .3,
        position: "absolute",
        background: "#fff",
        "z-index": 300,
        top: 0,
        left: 0
    }).addClass("mask-box").height(a.height()).width(a.width()).prependTo(a)
};
gei.ui.maskClear = function (a) {
    $(".mask-box", a).remove()
};
gei.ui.Table = function () {
    this.rows = [];
    this.colNum = 1;
    this.initByArr = function (a, b) {
        var c = this;
        this.colNum = b;
        var d = 0,
            f = [];
        $.each(a, function (a, l) {
            f.push(l);
            d++;
            d == b && (c.rows.push(f), d = 0, f = [])
        });
        0 < f.length && this.rows.push(f)
    };
    this.initByElContainer = function (a, b) {
        a = _.map(a, function (a) {
            return $(a)
        });
        if (0 < a.length) {
            b = $(b).width();
            var c = a[0].outerWidth(!0);
            this.colNum = parseInt(Math.floor(b / c))
        }
        this.initByArr(a, this.colNum)
    };
    this.rowIfAllColEmptyThenHide = function (a) {
        $.each(this.rows, function (b, c) {
            var d = !1;
            $.each(c,
                function (b, c) {
                    if ("" != $.trim($(a, c).html())) return d = !0, !1
                });
            d || $.each(c, function (b, c) {
                $(a, c).hide()
            })
        })
    };
    this.rowSetAllElHeightEqMax = function (a) {
        $.each(this.rows, function (b, c) {
            var d = 0;
            $.each(c, function (b, c) {
                c = a ? $(a, c) : $(c);
                b = c.height();
                c = 0 < c.size() ? c.get(0).offsetHeight : 0;
                b = c > b ? c : b;
                d = b > d ? b : d
            });
            $.each(c, function (b, c) {
                (a ? $(a, c) : $(c)).css("height", d + "px")
            })
        })
    }
};

function refreshVcodeImg() {
    if (vcodeDialog) {
        var a = vcodeDialog.getModalBody();
        $("#vcodeImg", a).attr("src", "/user/vcode?dd=" + (new Date).getTime());
        $("#vcodeInput").val("");
        $("#vcodeInput", a) && 0 < $("#vcodeInput", a).size() && setTimeout(function () {
            $("#vcodeInput", a).get(0).focus()
        }, 500)
    }
}

function submitVcode() {
    if (vcodeDialog) {
        var a = vcodeDialog.getModalBody();
        $("#vcodeMessage", a).html("");
        var b = $("#vcodeInput", a).val();
        b && "" != b.trim() ? (_curFileDownOpts.vcode = b, fget(_curFileDownOpts)) : $("#vcodeMessage", a).html("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801")
    }
}
var vcodeDialog = null;

function showVcodeDialog() {
    _curVcodeDialogShow = !0;
    vcodeDialog = BootstrapDialog.show({
        title: "\u9a8c\u8bc1\u7801",
        message: '\t<div class="modal-body">\t\t<div class="row1">\t\t\t<img id="vcodeImg" src="' + assetsUrl + '/site/img/icon/loading.gif" /><span class="change-vcode" onclick="refreshVcodeImg()">\u6362\u4e00\u5f20</span>\t\t</div>\t\t<div class="row2">\t\t\t\u8bf7\u8f93\u5165\u4e0a\u56fe\u6587\u5b57\uff1a<input type="text" id="vcodeInput" class="vcode-input" />\t\t</div>\t\t<div class="clearfix"></div>\t</div>\t<div class="modal-footer">\t\t<span id="vcodeMessage" class="text-danger">\u8f93\u5165\u5b8c\u6210\u540e,\u53ef\u6309\u56de\u8f66\u63d0\u4ea4&nbsp;&nbsp;&nbsp;</span>\t\t<button class="btn btn-primary" onclick="submitVcode()">\u786e\u5b9a</button>\t</div>',
        cssClass: "dialog-vcode-normal",
        type: BootstrapDialog.TYPE_WARNING,
        onhide: function () {
            _curVcodeDialogShow = !1;
            gei.core.eventBus.fire("Event_hideVcodePop")
        },
        onshown: function (a) {
            var b = $("#vcodeInput", a.getModalBody());
            b[0].focus();
            b.keypress(function (a) {
                if (13 == a.keyCode) return submitVcode(), !1
            });
            $("#vcodeImg", a.getModalBody()).bind("click", refreshVcodeImg)
        }
    });
    refreshVcodeImg();
    gei.core.eventBus.fire("Event_showVcodePop")
}
var gtVcodeIsloaded = !1,
    gtVcodeDialog = null,
    gtVcodeCaptcha = null;

function showVcodeGtDialog() {
    _curVcodeDialogShow = !0;
    gtVcodeIsloaded ? showVcodeGtDialogAfterGeetestLoaded() : $("body").append('<script src="http://api.geetest.com/get.php?callback=initCaptcha">\x3c/script>')
}
var initCaptcha = function () {
    gtVcodeIsloaded = !0;
    showVcodeGtDialogAfterGeetestLoaded()
};

function showVcodeGtDialogAfterGeetestLoaded() {
    gtVcodeDialog = BootstrapDialog.show({
        title: "\u9a8c\u8bc1\u7801",
        message: '<div id="gt-captcha"></div>',
        cssClass: "dialog-vcode-gt",
        type: BootstrapDialog.TYPE_WARNING,
        onhide: function () {
            _curVcodeDialogShow = !1;
            gei.core.eventBus.fire("Event_hideVcodePop")
        }
    });
    gtVcodeCaptcha = gtVcodeDialog.getModalBody();
    gtVcodeCaptcha.empty();
    gtVcodeCaptcha.html("\u9a8c\u8bc1\u7801\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...");
    $.ajax({
        url: "/user/gt",
        type: "get",
        dataType: "json",
        success: function (a) {
            gtVcodeCaptcha.empty();
            var b = new Geetest({
                gt: a.gt,
                challenge: a.challenge,
                product: "embed",
                offline: !a.success
            });
            gtVcodeCaptcha.empty();
            b.appendTo(gtVcodeCaptcha);
            b.onSuccess(function () {
                var a = b.getValidate();
                a && a.geetest_challenge && (_curFileDownOpts.vcode = "gt", _curFileDownOpts.gt_captchaResult = a, fget(_curFileDownOpts))
            })
        }
    });
    gei.core.eventBus.fire("Event_showVcodePop")
}
var _curVcodeDialogShow = !1;

function closeVcodeDialog() {
    _curVcodeDialogShow && (_curVcodeDialogShow = !1, gei.core.eventBus.fire("Event_hideVcodePop"), $("#vcodeDialog").modal("hide"), vcodeDialog && vcodeDialog.close(), gtVcodeDialog && gtVcodeDialog.close())
}
gei.win = {};
var _popLoginTipWindow;
gei.win.scanQr = {
    _popWin: null,
    _asyncLogNotifyInterval: null,
    pop: function (a) {
        this._asyncLogNotifyInterval && clearInterval(this._asyncLogNotifyInterval);
        var b = a.bottomTip,
            c = a.qrLoadUrl,
            d = a.qrLoadParam,
            f = a.successPopTip,
            g = a.successReload,
            l = gei.win.scanQr;
        l._popWin = gei.util.pop({
            type: BootstrapDialog.TYPE_INFO,
            title: a.title,
            width: a.width || 500,
            message: a.topTip + '<div id="qrcode_container"><h5 class="text-muted" id="bindWx_tip_loading" style="padding: 100px 0 0 50px"><i class="icon-spinner icon-spin icon-2x"></i>&nbsp;&nbsp;&nbsp;&nbsp;\u83b7\u53d6\u4e8c\u7ef4\u7801,\u8bf7\u7a0d\u540e...</h5></div>' +
                (b ? '<div style="padding-left:44px">' + b + "</div>" : ""),
            buttons: [],
            onshown: function (a) {
                gei.ajax({
                    type: "post",
                    url: c,
                    data: d
                }, function (a) {
                    var b = $("#qrcode_container");
                    b.empty();
                    $("<img/>").width(260).attr("src", a.message).appendTo(b);
                    l._asyncLogNotify(a.logId, function () {
                        l._popWin && l._popWin.close();
                        gei.util.alertSuccess(f, {
                            onhidden: function (a) {
                                g && window.location.reload()
                            }
                        })
                    }, function (a) {
                        l._popWin && l._popWin.close();
                        gei.util.alertWarn(a.message)
                    })
                }, function (b) {
                    console.log(b);
                    a.close();
                    gei.util.alertWarn("\u8bf7\u6c42\u5931\u8d25:" +
                        b.message)
                })
            },
            onhidden: function () {
                l._asyncLogNotifyInterval && clearInterval(l._asyncLogNotifyInterval)
            }
        })
    },
    _asyncLogNotify: function (a, b, c) {
        this._asyncLogNotifyInterval = setInterval(function () {
            gei.ajax({
                url: "/f/async-operate-log/find",
                data: {
                    id: a
                }
            }, function (a) {
                "succ" == a.result ? b(a) : "fail" == a.result && c(a)
            })
        }, 1E3)
    }
};
gei.win.bindWx = {
    pop: function (a, b) {
        gei.win.scanQr.pop({
            title: a,
            topTip: b ? '<div class="font-red-enhance" style="padding: 0 0 6px 60px;">' + b + "</div>" : "",
            bottomTip: "&nbsp;&nbsp;&nbsp;&nbsp;\u5fae\u4fe1\u626b\u4e00\u626b\uff0c\u5173\u6ce8\u7231\u7ed9\u7f51\u516c\u4f17\u53f7",
            qrLoadUrl: "/weixin/qrcode?sence=bind",
            qrLoadParam: null,
            successPopTip: "\u7ed1\u5b9a\u6210\u529f"
        })
    }
};
gei.win.wxPay = {
    pop: function (a, b) {
        gei.win.scanQr.pop({
            title: "\u5fae\u4fe1\u652f\u4ed8",
            topTip: '<div class="weixin-pay-container"><div class="weixin-pay-logo"><div class="weixin-pay-price">\u652f\u4ed8<span style="color: #FF7D29;">' + b + "</span></div></div></div>",
            bottomTip: '<div class="weixin-pay-text"></div>',
            qrLoadUrl: "/order/pay",
            qrLoadParam: a,
            successPopTip: "\u652f\u4ed8\u6210\u529f",
            successReload: !0
        })
    }
};
gei.win.open = function (a, b) {
    window.open(a, b);
    event.preventDefault ? event.preventDefault() : event.returnValue = !1
};
var mobileStateDropMenuHtml = null;

function getMobileStateHtml() {
    if (null != mobileStateDropMenuHtml) return mobileStateDropMenuHtml;
    mobileStateDropMenuHtml = "";
    for (var a = "86=\u4e2d\u56fd;852=\u4e2d\u56fd\u9999\u6e2f;853=\u4e2d\u56fd\u6fb3\u95e8;886=\u4e2d\u56fd\u53f0\u6e7e;1=\u7f8e\u56fd/\u52a0\u62ff\u5927;7=\u4fc4\u7f57\u65af;20=\u57c3\u53ca;27=\u5357\u975e;30=\u5e0c\u814a;31=\u8377\u5170;32=\u6bd4\u5229\u65f6;33=\u6cd5\u56fd;34=\u897f\u73ed\u7259;36=\u5308\u7259\u5229;39=\u610f\u5927\u5229;40=\u7f57\u9a6c\u5c3c\u4e9a;41=\u745e\u58eb;43=\u5965\u5730\u5229;44=\u82f1\u56fd;45=\u4e39\u9ea6;46=\u745e\u5178;47=\u632a\u5a01;48=\u6ce2\u5170;49=\u5fb7\u56fd;51=\u79d8\u9c81;52=\u58a8\u897f\u54e5;53=\u53e4\u5df4;54=\u963f\u6839\u5ef7;55=\u5df4\u897f;56=\u667a\u5229;57=\u54e5\u4f26\u6bd4\u4e9a;58=\u59d4\u5185\u745e\u62c9;60=\u9a6c\u6765\u897f\u4e9a;61=\u6fb3\u6d32;62=\u5370\u5ea6\u5c3c\u897f\u4e9a;63=\u83f2\u5f8b\u5bbe;64=\u65b0\u897f\u5170;65=\u65b0\u52a0\u5761;66=\u6cf0\u56fd;81=\u65e5\u672c;82=\u97e9\u56fd;84=\u8d8a\u5357;90=\u571f\u8033\u5176;91=\u5370\u5ea6;92=\u5df4\u57fa\u65af\u5766;93=\u963f\u5bcc\u6c57;94=\u65af\u91cc\u5170\u5361;95=\u7f05\u7538;98=\u4f0a\u6717;211=\u5357\u82cf\u4e39;212=\u6469\u6d1b\u54e5;213=\u963f\u5c14\u53ca\u5229\u4e9a;216=\u7a81\u5c3c\u65af;218=\u5229\u6bd4\u4e9a;220=\u5188\u6bd4\u4e9a;221=\u585e\u5185\u52a0\u5c14;222=\u6bdb\u91cc\u5854\u5c3c\u4e9a;223=\u9a6c\u91cc\u5171\u548c\u56fd;224=\u51e0\u5185\u4e9a;225=\u79d1\u7279\u8fea\u74e6;226=\u5e03\u57fa\u7eb3\u6cd5\u7d22;227=\u5c3c\u65e5;228=\u591a\u54e5;229=\u8d1d\u5b81;230=\u6bdb\u91cc\u6c42\u65af;231=\u5229\u6bd4\u91cc\u4e9a;232=\u72ee\u5b50\u5c71\u5171\u548c\u56fd;233=\u52a0\u7eb3;234=\u5c3c\u65e5\u5229\u4e9a;235=\u67e5\u5fb7;236=\u4e2d\u975e\u5171\u548c\u56fd;237=\u5580\u9ea6\u9686;238=\u4f5b\u5f97\u89d2;239=\u5723\u591a\u7f8e\u666e\u6797\u897f\u6bd4;240=\u8d64\u9053\u51e0\u5185\u4e9a;241=\u52a0\u84ec;242=\u521a\u679c\u5171\u548c\u56fd;243=\u521a\u679c\u6c11\u4e3b\u5171\u548c\u56fd;244=\u5b89\u54e5\u62c9;245=\u51e0\u5185\u4e9a\u6bd4\u7ecd;247=\u963f\u68ee\u677e\u5c9b;248=\u585e\u820c\u5c14;249=\u82cf\u4e39;250=\u5362\u65fa\u8fbe;251=\u57c3\u585e\u4fc4\u6bd4\u4e9a;252=\u7d22\u9a6c\u91cc;253=\u5409\u5e03\u63d0;254=\u80af\u5c3c\u4e9a;255=\u5766\u6851\u5c3c\u4e9a;256=\u4e4c\u5e72\u8fbe;257=\u5e03\u9686\u8fea;258=\u83ab\u6851\u6bd4\u514b;260=\u8d5e\u6bd4\u4e9a;261=\u9a6c\u8fbe\u52a0\u65af\u52a0;262=\u7559\u5c3c\u6c6a (\u6cd5\u56fd);263=\u6d25\u5df4\u5e03\u97e6;264=\u7eb3\u7c73\u6bd4\u4e9a;265=\u9a6c\u62c9\u7ef4;266=\u83b1\u7d22\u6258;267=\u535a\u8328\u74e6\u7eb3;268=\u65af\u5a01\u58eb\u5170;269=\u79d1\u6469\u7f57;269=\u9a6c\u7ea6\u7279;297=\u963f\u9c81\u5df4 (\u8377\u5170\u738b\u56fd);298=\u6cd5\u7f57\u7fa4\u5c9b (\u4e39\u9ea6);299=\u683c\u9675\u5170 (\u4e39\u9ea6);350=\u76f4\u5e03\u7f57\u9640 (\u82f1\u56fd);351=\u8461\u8404\u7259;352=\u5362\u68ee\u5821;352=\u5362\u68ee\u5821;353=\u7231\u5c14\u5170\u5171\u548c\u56fd;354=\u51b0\u5c9b;355=\u963f\u5c14\u5df4\u5c3c\u4e9a;356=\u9a6c\u8033\u4ed6;357=\u585e\u6d66\u8def\u65af;358=\u82ac\u5170;359=\u4fdd\u52a0\u5229\u4e9a;370=\u7acb\u9676\u5b9b;371=\u62c9\u8131\u7ef4\u4e9a;372=\u7231\u6c99\u5c3c\u4e9a;373=\u6469\u5c14\u591a\u74e6;374=\u4e9a\u7f8e\u5c3c\u4e9a;375=\u767d\u4fc4\u7f57\u65af;376=\u5b89\u9053\u5c14;377=\u6469\u7eb3\u54e5;378=\u5723\u9a6c\u529b\u8bfa;380=\u4e4c\u514b\u5170;381=\u585e\u5c14\u7ef4\u4e9a\u5171\u548c\u56fd;382=\u9ed1\u5c71\u5171\u548c\u56fd;385=\u514b\u7f57\u5730\u4e9a;386=\u65af\u6d1b\u6587\u5c3c\u4e9a;387=\u6ce2\u65af\u5c3c\u4e9a\u4e0e\u8d6b\u585e\u54e5\u7ef4\u7eb3;420=\u6377\u514b;421=\u65af\u6d1b\u4f10\u514b;423=\u5217\u652f\u6566\u58eb\u767b;501=\u4f2f\u5229\u5179;502=\u5371\u5730\u9a6c\u62c9;503=\u8428\u5c14\u74e6\u591a;504=\u6d2a\u90fd\u62c9\u65af;505=\u5c3c\u52a0\u62c9\u74dc;506=\u54e5\u65af\u8fbe\u9ece\u52a0;507=\u5df4\u62ff\u9a6c;508=\u5723\u76ae\u8036\u4e0e\u5bc6\u514b\u9686\u7fa4\u5c9b (\u6cd5\u56fd);509=\u6d77\u5730;590=\u74dc\u5fb7\u7f57\u666e\u5c9b;590=\u5723\u9a6c\u4e01\u5c9b(\u8377\u5170\u90e8\u5206);591=\u73bb\u5229\u7ef4\u4e9a;592=\u572d\u4e9a\u90a3;593=\u5384\u74dc\u591a\u5c14;594=\u6cd5\u5c5e\u572d\u4e9a\u90a3 (\u6cd5\u56fd);595=\u5df4\u62c9\u572d;596=\u9a6c\u63d0\u5c3c\u514b (\u6cd5\u56fd);597=\u82cf\u91cc\u5357;598=\u4e4c\u62c9\u572d;599=\u535a\u5185\u5c14\u5c9b\uff0c\u5723\u5c24\u65af\u7279\u6b47\u65af\u548c;599=\u5e93\u62c9\u7d22 (\u8377\u5170\u738b\u56fd);670=\u4e1c\u5e1d\u6c76;673=\u6587\u83b1;675=\u5df4\u5e03\u4e9a\u65b0\u51e0\u5185\u4e9a;676=\u4e1c\u52a0;677=\u6240\u7f57\u95e8\u7fa4\u5c9b;678=\u74e6\u52aa\u963f\u56fe;679=\u6590\u6d4e;680=\u5e15\u52b3;682=\u5e93\u514b\u7fa4\u5c9b (\u65b0\u897f\u5170);685=\u8428\u6469\u4e9a;686=\u57fa\u91cc\u5df4\u65af;687=\u65b0\u5580\u91cc\u591a\u5c3c\u4e9a (\u6cd5\u56fd);689=\u6cd5\u5c5e\u6ce2\u5229\u5c3c\u897f\u4e9a (\u6cd5\u56fd);855=\u67ec\u57d4\u5be8;856=\u8001\u631d;880=\u5b5f\u52a0\u62c9\u56fd;930=\u5df4\u52d2\u65af\u5766;960=\u9a6c\u5c14\u4ee3\u592b;961=\u9ece\u5df4\u5ae9;962=\u7ea6\u65e6;963=\u53d9\u5229\u4e9a;964=\u4f0a\u62c9\u514b;965=\u79d1\u5a01\u7279;966=\u6c99\u7279\u963f\u62c9\u4f2f;967=\u4e5f\u95e8;968=\u963f\u66fc;971=\u963f\u62c9\u4f2f\u8054\u5408\u914b\u957f\u56fd;972=\u4ee5\u8272\u5217;973=\u5df4\u6797;974=\u5361\u8fbe;975=\u4e0d\u4e39;976=\u8499\u53e4\u56fd;977=\u5c3c\u6cca\u5c14;992=\u5854\u5409\u514b;993=\u571f\u5e93\u66fc;994=\u963f\u585e\u62dc\u7586;995=\u4e54\u6cbb\u4e9a;996=\u5409\u5c14\u5409\u65af;998=\u4e4c\u5179\u522b\u514b;1242=\u5df4\u54c8\u9a6c;1246=\u5df4\u5df4\u591a\u65af;1264=\u5b89\u572d\u62c9;1268=\u5b89\u63d0\u74dc\u548c\u5df4\u5e03\u8fbe;1284=\u82f1\u5c5e\u7ef4\u5c14\u4eac\u7fa4\u5c9b (\u82f1\u56fd);1340=\u7f8e\u5c5e\u7ef4\u5c14\u4eac\u7fa4\u5c9b (\u7f8e\u56fd);1345=\u5f00\u66fc\u7fa4\u5c9b (\u82f1\u56fd);1441=\u767e\u6155\u5927 (\u82f1\u56fd);1473=\u683c\u6797\u7eb3\u8fbe;1649=\u571f\u514b\u51ef\u53ef\u7fa4\u5c9b (\u82f1\u56fd);1664=\u8499\u585e\u62c9\u7279\u5c9b (\u82f1\u56fd);1671=\u5173\u5c9b (\u7f8e\u56fd);1684=\u7f8e\u5c5e\u8428\u6469\u4e9a (\u7f8e\u56fd);1758=\u5723\u5362\u897f\u4e9a;1767=\u591a\u7c73\u5c3c\u514b;1784=\u5723\u6587\u68ee\u53ca\u683c\u6797\u7eb3\u4e01;1787=\u6ce2\u591a\u9ece\u5404 (\u7f8e\u56fd);1809=\u591a\u7c73\u5c3c\u52a0\u5171\u548c\u56fd;1868=\u7279\u7acb\u5c3c\u8fbe\u548c\u591a\u5df4\u54e5;1869=\u5723\u514b\u91cc\u65af\u591a\u798f\u4e0e\u5c3c\u7ef4\u65af;1876=\u7259\u4e70\u52a0".split(";"), b =
            0; b < a.length; b++) {
        var c = a[b].split("=");
        2 != c.length && alert("mobileCodes\u683c\u5f0f\u9519\u8bef\uff01" + c);
        var d = c[0];
        mobileStateDropMenuHtml += "<li onclick=\"gei.win.bindPhone._chooseOverseaPrefix('" + d + '\')"><span class="code">+' + d + '</span><span class="name">' + c[1] + "</span></li>"
    }
    return mobileStateDropMenuHtml
}
var overseaChinaPrefix = 86,
    overseaPhoneJoinChar = "-";
gei.win.bindPhone = {
    model: null,
    MODEL_BIND: "bind",
    MODEL_CHECK: "check",
    _popWin: null,
    pop: function (a, b, c) {
        var d = gei.win.bindPhone;
        d.model = a;
        a = (c ? '<div class="font-red-enhance" style="padding: 0 0 6px 32px;">' + c + "</div>" : "") + '<div class="pop-bind-phone"><div class="form-group"><label for="exampleInputEmail1">\u624b\u673a\u53f7</label><div class="input-group"><div class="input-group-btn"><button id="stateMobilePrefix" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span id="overseaPrefixBtn"></span><span class="caret"></span></button><ul class="dropdown-menu">' +
            getMobileStateHtml() + '</ul></div><input type="text" class="form-control" id="userInputPhoneNumber" /></div><div id="divOverseaTip" class="oversea-tip" class="text-muted">\u6d77\u5916\u7528\u6237\u8bf7\u70b9\u51fb\uff0c<span onclick="gei.win.bindPhone._showOverseaInput()" class="link-style">\u6d77\u5916\u9a8c\u8bc1\u7801</span></div></div>' + (d.model == d.MODEL_CHECK ? "<span class=\"link-color\" onclick=\"gei.win.bindPhone._popWin.close();gei.win.bindPhone.pop(gei.win.bindPhone.MODEL_BIND,'\u66f4\u6362','\u8f93\u5165\u65b0\u7684\u7ed1\u5b9a\u624b\u673a');\" >\u65e0\u6cd5\u63a5\u6536\u9a8c\u8bc1\u7801?\u66f4\u6362\u7ed1\u5b9a\u624b\u673a</span>" :
                "") + '<div class="form-group" style="margin-top: 5px;"><label for="exampleInputPassword1">\u9a8c\u8bc1\u7801</label><div class="input-group"><input type="text" class="form-control" id="userInputPhoneVcode"><span class="input-group-btn">   <button id="sendPhoneVcodeBtn" class="btn btn-info" type="button" onclick="gei.win.bindPhone._sendVcode()">\u83b7\u53d6\u9a8c\u8bc1\u7801</button></span></div><div id="changeVcodeMethodBox"></div></div></div><button class="btn btn-primary" onclick="gei.win.bindPhone._saveUserPhone()" style="margin: 15px 0 0 10px;">\u786e \u5b9a</button>';
        d._popWin = gei.util.pop({
            type: BootstrapDialog.TYPE_INFO,
            title: b + "\u624b\u673a",
            width: 300,
            message: a,
            buttons: [],
            onshown: function (a) {
                d._changeVcodeMethod("sms");
                if (d.model == d.MODEL_CHECK) {
                    $("#userInputPhoneNumber").attr("disabled", "disabled");
                    var b = userMaskPhone.indexOf(overseaPhoneJoinChar);
                    0 < b ? (a = userMaskPhone.substr(b + 1, userMaskPhone.length), d._overseaPrefix = userMaskPhone.substr(0, b), $("#stateMobilePrefix").show(), d._chooseOverseaPrefix(d._overseaPrefix), $("#stateMobilePrefix").attr("disabled", "disabled"),
                        $("#divOverseaTip").hide()) : a = userMaskPhone;
                    $("#userInputPhoneNumber").val(a)
                }
            }
        })
    },
    _banTime: 60,
    _allowPhoneSendVcode: !0,
    _banTimeTemp: 0,
    _banTimeout: null,
    _method: null,
    _isChooseMethod: !1,
    _overseaPrefix: overseaChinaPrefix,
    _showOverseaInput: function () {
        this._chooseOverseaPrefix(overseaChinaPrefix);
        $("#stateMobilePrefix").show()
    },
    _chooseOverseaPrefix: function (a) {
        $("#overseaPrefixBtn").html("+" + a);
        this._overseaPrefix = a;
        this._isStateChina() ? $("#changeVcodeMethodBox").show() : ($("#changeVcodeMethodBox").hide(),
            this._changeVcodeMethod("sms"))
    },
    _isStateChina: function () {
        return this._overseaPrefix == overseaChinaPrefix
    },
    _validPhone: function () {
        if (this.model != this.MODEL_BIND) return !0;
        var a = $("#userInputPhoneNumber").val();
        return this._isStateChina() ? /^\d{11}$/.test(a) : /^\d{1,20}$/.test(a)
    },
    _getFullPhone: function () {
        var a = $("#userInputPhoneNumber").val();
        return this._overseaPrefix + overseaPhoneJoinChar + a
    },
    _getMethodName: function (a) {
        return {
            sms: {
                name: "\u77ed\u4fe1"
            },
            phone: {
                name: "\u8bed\u97f3"
            }
        } [a].name
    },
    _getCurrentMethodName: function () {
        return this._isStateChina() &&
            this._isChooseMethod ? "(" + this._getMethodName(this._method) + ")" : ""
    },
    _changeVcodeMethod: function (a) {
        var b = this;
        this._method = a;
        if ("phone" == a) {
            a = "\u5207\u6362\u4e3a,";
            var c = "sms"
        } else a = "\u6536\u4e0d\u5230?\u8bd5\u4e00\u8bd5,", c = "phone";
        $("#sendPhoneVcodeBtn").html("\u83b7\u53d6\u9a8c\u8bc1\u7801" + this._getCurrentMethodName());
        var d = $("<span>").addClass("link-style").click(function () {
            b._isChooseMethod = !0;
            b._changeVcodeMethod(c)
        }).html(b._getMethodName(c) + "\u9a8c\u8bc1\u7801");
        $("#changeVcodeMethodBox").empty().before();
        d.appendTo($("#changeVcodeMethodBox"));
        $("<span>").html(a).insertBefore(d)
    },
    _saveUserPhone: function () {
        var a = gei.win.bindPhone;
        if (a.model) {
            var b = $("#userInputPhoneVcode").val();
            a._validPhone() ? b && 6 == b.length ? $.post("/home/info/" + a.model + "/phone", {
                phone: a._getFullPhone(),
                vcode: b
            }, function (b) {
                if ("success" == b.status) gei.win.bindPhone._popWin && gei.win.bindPhone._popWin.close(), gei.util.alertSuccess(a.model == a.MODEL_BIND ? "\u624b\u673a\u7ed1\u5b9a\u6210\u529f!" : a.model == a.MODEL_CHECK ? "\u624b\u673a\u9a8c\u8bc1\u6210\u529f!" :
                    "", {
                        onhide: function () {
                            gei.util.reload()
                        }
                    });
                else {
                    var c = a._getFullPhone();
                    gei.util.confirm(function () {
                        var a = b.message;
                        "phoneIsBind" == b.message && (gei.win.bindPhone._popWin && gei.win.bindPhone._popWin.close(), a = "\u62b1\u6b49\uff1a\u8be5\u624b\u673a\u53f7\u7801\u5df2\u7ecf\u88ab\u5176\u4ed6\u7528\u6237\u7ed1\u5b9a,\u7528\u6237\u6635\u79f0\uff1a\u201c" + b.nickName + "\u201d  <br/>\u89e3\u7ed1\u65b9\u5f0f\u4e00\uff1a\u767b\u5f55\u4e4b\u524d\u7ed1\u5b9a\u7684\u5e10\u53f7\uff0c\u8fdb\u7528\u6237\u540e\u53f0\u4fee\u6539\u7ed1\u5b9a\u7684\u624b\u673a\u53f7\u7801\uff0c\u817e\u51fa\u6b64\u624b\u673a\u53f7\u7801\u3002  <br/>\u89e3\u7ed1\u65b9\u5f0f\u4e8c\uff1a\u52a0\u5165\u7231\u7ed9\u7f51\u5b98\u65b9qq\u7fa4(\u7fa4\u53f7\u89c1\u7f51\u7ad9\u5e95\u90e8\uff0c\u5c06\u9700\u8981\u89e3\u7ed1\u7684\u624b\u673a\u53f7\u7801\u53d1\u7ed9\u7ad9\u957f\u963f\u661f)\u3002  <br/>\u89e3\u7ed1\u65b9\u5f0f\u4e09\uff1a\u5c06\u9700\u8981\u89e3\u7ed1\u7684\u624b\u673a\u53f7\uff0c\u53d1\u90ae\u4ef6\u81f3\u7ad9\u957f\u90ae\u7bb1 geiweb@163.com \u3002",
                            b.unbindCount < b.maxBindCount && (a = "\u62b1\u6b49\uff1a\u8be5\u624b\u673a\u53f7\u7801\u5df2\u7ecf\u88ab\u5176\u4ed6\u7528\u6237\u7ed1\u5b9a,\u7528\u6237\u6635\u79f0\uff1a\u201c" + b.nickName + "\u201d  <br/>\u89e3\u7ed1\u65b9\u5f0f\u4e00\uff1a\u767b\u5f55\u4e4b\u524d\u7ed1\u5b9a\u7684\u5e10\u53f7\uff0c\u8fdb\u7528\u6237\u540e\u53f0\u4fee\u6539\u7ed1\u5b9a\u7684\u624b\u673a\u53f7\u7801\uff0c\u817e\u51fa\u6b64\u624b\u673a\u53f7\u7801\u3002  <br/>\u89e3\u7ed1\u65b9\u5f0f\u4e8c\uff1a\u8bf7\u70b9\u51fb\u201c\u7533\u8bf7\u4eba\u5de5\u89e3\u7ed1\u201d\u6309\u94ae\uff0c\u7533\u8bf7\u4eba\u5de5\u89e3\u7ed1\u670d\u52a1" +
                                b.unbindMsg + "\u3002"));
                        return $("<div>" + a + "</div>")
                    }, function () {}, {
                        title: "\u4fe1\u606f\u63d0\u793a",
                        width: 500,
                        onshown: function (a) {
                            "phoneIsBind" == b.message && b.unbindCount < b.maxBindCount && $("#userUnbindBtn").removeClass("hidden")
                        },
                        buttons: [{
                            id: "userUnbindBtn",
                            label: "\u7533\u8bf7\u4eba\u5de5\u89e3\u7ed1",
                            cssClass: "btn-primary hidden",
                            action: function (a) {
                                a.close();
                                gei.ajax({
                                    url: "/home/info/bind/unbind.json",
                                    data: {
                                        phone: c
                                    }
                                }, function (a) {
                                    gei.util.alertSuccess("\u60a8\u7684\u8bf7\u6c42\u5df2\u88ab\u53d7\u7406," +
                                        a.message + ",\u8bf7\u4f7f\u7528\u60a8\u5e38\u7528\u7684QQ\u53f7\u767b\u5f55\u7f51\u7ad9!", {
                                            onhide: function () {
                                                gei.util.reload()
                                            }
                                        })
                                })
                            }
                        }, {
                            label: "\u5173\u95ed",
                            cssClass: "btn-default",
                            action: function (a) {
                                a.close()
                            }
                        }]
                    })
                }
            }, "json") : gei.util.alertWarn("\u9a8c\u8bc1\u7801\u8f93\u5165\u4e0d\u662f6\u4f4d\uff0c\u8bf7\u91cd\u8bd5\uff01") : gei.util.alertWarn("\u624b\u673a\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01")
        } else alert("model\u672a\u5b9a\u4e49")
    },
    _sendVcode: function () {
        var a =
            gei.win.bindPhone;
        if (!a._validPhone()) gei.util.alertWarn("\u624b\u673a\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01");
        else if (a._allowPhoneSendVcode)
            if (a.model) {
                var b;
                a.model == a.MODEL_BIND ? b = "register" : a.model == a.MODEL_CHECK && (b = "login");
                $("#sendPhoneVcodeBtn").attr("disabled", "disabled");
                $.post("/home/info/smsVcode/" + a.model, {
                    phone: a._getFullPhone(),
                    code: b,
                    method: a._method
                }, function (b) {
                    "success" == b.status ? (b.vcode && gei.util.alertWarn(b.vcode), a._banTimeTemp =
                        a._banTime, a._allowPhoneSendVcode = !1, $("#sendPhoneVcodeBtn").attr("disabled", "disabled").html("\u91cd\u65b0\u53d1\u9001" + a._getCurrentMethodName() + "(" + a._banTimeTemp + ")"), a._banTimeout = setInterval(function () {
                            $("#sendPhoneVcodeBtn").html("\u91cd\u65b0\u53d1\u9001" + a._getCurrentMethodName() + "(" + a._banTimeTemp + ")");
                            a._banTimeTemp--;
                            0 >= a._banTimeTemp && a._allowSendVcode()
                        }, 1E3)) : (gei.util.alertWarn(b.message), a._allowSendVcode())
                }, "json")
            } else alert("model\u672a\u5b9a\u4e49")
    },
    _allowSendVcode: function () {
        this._allowPhoneSendVcode = !0;
        $("#sendPhoneVcodeBtn").html("\u83b7\u53d6\u9a8c\u8bc1\u7801" + this._getCurrentMethodName()).removeAttr("disabled");
        this._banTimeTemp = this._banTime;
        clearTimeout(this._banTimeout)
    }
};

function loginUser(a) {
    "undefined" !== typeof isLogin && (isLogin = !0);
    isLogin = !0;
    a = $.parseJSON(a);
    $("#loginUserInfoAvatar1").attr("src", a.avatarUrl1);
    $("#loginUserInfoName").html(a.nickName);
    $("#loginBtn").hide();
    $("#loginUserInfoContainer").show();
    _popLoginTipWindow && _popLoginTipWindow.close();
    Messenger().post({
        message: '<h6 class="text-success" style="margin-top:3px">\u767b\u5f55\u6210\u529f,\u6b22\u8fce\u60a8</h6><img class="login-userinfo-avatar1" src="' + a.avatarUrl1 + '"><span class="login-userinfo-name">' +
            a.nickName + "</span>",
        type: "",
        hideAfter: 5
    });
    gei.core.eventBus.fire("Event_userLogin")
}
var _lastPopWin = null;

function openWindowCenter(a, b, c, d) {
    b = (window.screen.height - 30 - d) / 2;
    var f = (window.screen.width - 10 - c) / 2;
    _lastPopWin && _lastPopWin.close();
    _lastPopWin = window.open(a, "loginWindow", "height=" + d + ",width=" + c + ",top=" + b + ",left=" + f)
}

function popLoginTip(a) {
    gei.util.pop({
        type: BootstrapDialog.TYPE_INFO,
        title: '<i class="icon-user" style="padding-right:5px"></i>\u7528\u6237\u767b\u5f55',
        onshown: function (a) {
            _popLoginTipWindow = a
        },
        message: '<div class="loginTipContainer">' + {
                down: '\u8bf7\u767b\u5f55\u540e<span style="font-size:18px;font-weight:bold"> \u514d\u8d39\u4e0b\u8f7d </span>\u8be5\u8d44\u6e90',
                operate: "\u6267\u884c\u8fd9\u4e2a\u64cd\u4f5c\u9700\u8981\u5148\u767b\u5f55",
                welcome: '\u6b22\u8fce\u6765\u5230\u4e2d\u56fd\u6700\u5927\u7684<span style="font-size:18px;font-weight:bold"> \u5f71\u89c6\u548c\u6e38\u620f\u7d20\u6750  </span>\u7f51\u7ad9'
            } [a] +
            '</div><div class="loginTipThreeLoginBtnContainer"><a href="javascript:openWindowCenter(\'/user/login/oauth/\', \'\u7528\u6237\u767b\u5f55\', 710, 500);"><img src="http://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_3.png" /></a><div class="muted loginTipInfoText">\u60a8\u53ef\u4ee5\u4f7f\u7528\u201cQQ\u5e10\u53f7\u4e00\u952e\u767b\u5f55\u201d\u7231\u7ed9\u7f51</div></div>'
    })
}

function popLoginPage() {
    isMobileVisit || isMobileSite ? window.location.href = "/user/login/oauth/" : openWindowCenter("/user/login/oauth/", "\u7528\u6237\u767b\u5f55", 710, 500)
}

function pageMessage(a, b, c) {
    b || (b = "info");
    a = '<div class="affix alert alert-' + b + '  message-box opacity90" style="width:300px"><span type="button" class="close" data-dismiss="alert" >\u00d7</span>' + ("<span > <b>" + a);
    a += "</b></span></div>";
    a = $(a);
    $("body").prepend(a);
    c && setTimeout(function () {
        $(".alert").alert("close")
    }, 1E3 * c)
}

function messageClose() {
    $(".alert").alert("close")
}
var showItemBatchOptToolBar = !1;
gei.core.eventBus.on("Event_pageContentLoadEnd", function () {
    initItemBatchOpt()
});

function initItemBatchOpt(a) {
    a = a || $("body");
    $(".pkg-item-chk").click(function (a) {
        a.stopPropagation()
    });
    $(".item-batch-btn", a).each(function (a, c) {
        var b = $(c);
        b.off();
        var f = b.parents(".item-info-list-box"),
            g = f.attr("id");
        $(".pkg-item-chk-div input").each(function (a, b) {
            $(b).unbind("click").bind("click", function () {
                refreshPkgItemsFund()
            })
        });
        refreshPkgItemsFund();
        b.webuiPopover({
            placement: isMobileSite ? "auto-top" : "auto-right",
            trigger: "manual",
            closeable: !0,
            onShow: function (a) {
                $(".select-all", a).data("page-box-id",
                    g);
                $(".close", a).click(function () {
                    showItemBatchOptToolBar = !1
                });
                b.data("isShown", !0);
                $(".pkg-item-chk-div", f).show();
                gei.core.eventBus.fire("Event_itemBatchOptShow", f);
                showItemBatchOptToolBar = !0
            },
            onHide: function (a) {
                $(".select-all", a).removeAttr("checked");
                b.data("isShown", !1);
                itemBatchCencelAll();
                $(".pkg-item-chk-div", f).hide();
                gei.core.eventBus.fire("Event_itemBatchOptHide", f)
            }
        });
        b.click(function () {
            b.data("isShown") ? (b.webuiPopover("hide"), showItemBatchOptToolBar = !1) : b.webuiPopover("show")
        })
    })
}

function itemBatchSelectAll(a) {
    a = $("#" + a);
    $(".pkg-item-chk").each(function (a, c) {
        $(c).removeAttr("checked")
    });
    $(".pkg-item-chk", a).each(function (a, c) {
        $(c).prop("checked", "true")
    })
}

function itemBatchCencelAll() {
    $(".pkg-item-chk").each(function (a, b) {
        $(b).removeAttr("checked")
    })
}

function itemBatchSelectAllBtn(a) {
    $(a).is(":checked") ? itemBatchSelectAll($(a).data("page-box-id")) : itemBatchCencelAll();
    refreshPkgItemsFund()
}
gei.core.eventBus.on("Event_pageContentLoadStart", function () {
    itemBatchBtnHideAll()
});

function itemBatchBtnHideAll() {
    $(".item-batch-btn").each(function (a, b) {
        $(b).webuiPopover("hide")
    })
}

function refreshPkgItemsFund() {
    var a = $(".item-batch-down-container .row2");
    if (isFundTip) {
        var b = $.map($(".pkg-item-chk:checked"), function (a) {
            return $(a).val()
        });
        0 == b.length ? (a.empty(), a.html("\u8bf7\u52fe\u9009\u60a8\u8981\u4e0b\u8f7d\u7684\u6587\u4ef6")) : (a.empty(), a.html("&nbsp;"), b = gei.util.arr.join(b, ","), gei.ajax({
            url: "/down/queryPkgFundDown.json",
            data: {
                pkgItemStr: b
            }
        }, function (b) {
            b = "<span>\u94dc\u5e01</span> <span>\u51cf:" + b.consume + "</span> <span>\u4f59:" + b.total + "</span>";
            a.empty();
            a.html(b)
        }))
    } else a.html("")
}
var dfu = function (a, b, c, d, f, g, l) {
        var q = fInction(a, b);
        q += "-" + c + "-" + d;
        c = {};
        c.ud = getUUID();
        c.v = q;
        c.type = a;
        c.rescUrl = b;
        c.pkg = g || !1;
        c.saveAs = l;
        c.vis = vvvvvvviisssss;
        f && (c.vc = f);
        return c
    },
    cqbj = function (a) {
        return {
            v: ssssdddttssssStr(a)
        }
    },
    prest = function (a) {
        return (new llii1i1iill).ilil111lii(a)
    };

function ssssdddttssssStr(a) {
    a = jkks(a);
    for (var b = Math.floor(5 * Math.random()) + 1, c = 0; c < b; c++) a = jkkc(a);
    return a = a.substring(0, 32) + b + a.substring(32, a.length)
}

function nmnmue23(a) {
    var b = "";
    $.each(a, function (a, d) {
        b += ',"' + a + '":"' + d + '"'
    });
    "" != b && (b = b.substring(1));
    return "{" + b + "}"
}

function ueh3875(a) {
    var b = "";
    $.each(a, function (a, d) {
        b += ";" + a + ":" + d
    });
    "" != b && (b = b.substring(1));
    return "{" + b + "}"
}

function jkks(a) {
    return nmnmue23(a)
}

function li1li1li(a) {
    var b = 0;
    if (!isNull(a))
        for (var c = 0; c < a.length; c++) b = 31 * b + a.charCodeAt(c), b = intValue(b);
    return b
}
var llli111li1lil1 = {
    ili10ooOO1: 6
};

function intValue(a) {
    return 2147483647 < a || -2147483648 > a ? a & 4294967295 : a
}

function li1iiil1(a) {
    var b = "";
    a += "";
    for (var c = 1; c <= a.length; c++) b += getStrPos(a, a.length - c + 1);
    return b
}

function getStrPos(a, b) {
    return (a + "").substring(b - 1, b)
}

function isNull(a) {
    return null == a || "" == a.value
}
var GeiJS = GeiJS || function (a, b) {
    var c = {},
        d = c.lib = {},
        f = function () {},
        g = d.Base = {
            extend: function (a) {
                f.prototype = this;
                var b = new f;
                a && b.mixIn(a);
                b.hasOwnProperty("init") || (b.init = function () {
                    b.$super.init.apply(this, arguments)
                });
                b.init.prototype = b;
                b.$super = this;
                return b
            },
            create: function () {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function () {},
            mixIn: function (a) {
                for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function () {
                return this.init.prototype.extend(this)
            }
        },
        l = d.WordArray = g.extend({
            init: function (a, c) {
                a = this.words = a || [];
                this.sigBytes = c != b ? c : 4 * a.length
            },
            toString: function (a) {
                return (a || r).stringify(this)
            },
            concat: function (a) {
                var b = this.words,
                    c = a.words,
                    e = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (e % 4)
                    for (var d = 0; d < a; d++) b[e + d >>> 2] |= (c[d >>> 2] >>> 24 - d % 4 * 8 & 255) << 24 - (e + d) % 4 * 8;
                else if (65535 < c.length)
                    for (d = 0; d < a; d += 4) b[e + d >>> 2] = c[d >>> 2];
                else b.push.apply(b, c);
                this.sigBytes += a;
                return this
            },
            clamp: function () {
                var b = this.words,
                    c = this.sigBytes;
                b[c >>> 2] &= 4294967295 << 32 -
                    c % 4 * 8;
                b.length = a.ceil(c / 4)
            },
            clone: function () {
                var a = g.clone.call(this);
                a.words = this.words.slice(0);
                return a
            },
            random: function (b) {
                for (var c = [], e = 0; e < b; e += 4) c.push(4294967296 * a.random() | 0);
                return new l.init(c, b)
            }
        }),
        q = c.enc = {},
        r = q.Hex = {
            stringify: function (a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], e = 0; e < a; e++) {
                    var d = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
                    c.push((d >>> 4).toString(16));
                    c.push((d & 15).toString(16))
                }
                return c.join("")
            },
            parse: function (a) {
                for (var b = a.length, c = [], e = 0; e < b; e += 2) c[e >>> 3] |= parseInt(a.substr(e, 2), 16) <<
                    24 - e % 8 * 4;
                return new l.init(c, b / 2)
            }
        },
        n = q.Latin1 = {
            stringify: function (a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], e = 0; e < a; e++) c.push(String.fromCharCode(b[e >>> 2] >>> 24 - e % 4 * 8 & 255));
                return c.join("")
            },
            parse: function (a) {
                for (var b = a.length, c = [], e = 0; e < b; e++) c[e >>> 2] |= (a.charCodeAt(e) & 255) << 24 - e % 4 * 8;
                return new l.init(c, b)
            }
        },
        m = q.Utf8 = {
            stringify: function (a) {
                try {
                    return decodeURIComponent(escape(n.stringify(a)))
                } catch (y) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function (a) {
                return n.parse(unescape(encodeURIComponent(a)))
            }
        },
        w = d.BufferedBlockAlgorithm = g.extend({
            reset: function () {
                this._data = new l.init;
                this._nDataBytes = 0
            },
            _append: function (a) {
                "string" == typeof a && (a = m.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            },
            _process: function (b) {
                var c = this._data,
                    e = c.words,
                    d = c.sigBytes,
                    k = this.blockSize,
                    f = d / (4 * k);
                f = b ? a.ceil(f) : a.max((f | 0) - this._minBufferSize, 0);
                b = f * k;
                d = a.min(4 * b, d);
                if (b) {
                    for (var g = 0; g < b; g += k) this._doProcessBlock(e, g);
                    g = e.splice(0, b);
                    c.sigBytes -= d
                }
                return new l.init(g, d)
            },
            clone: function () {
                var a = g.clone.call(this);
                a._data = this._data.clone();
                return a
            },
            _minBufferSize: 0
        });
    d.Hasher = w.extend({
        cfg: g.extend(),
        init: function (a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        },
        reset: function () {
            w.reset.call(this);
            this._doReset()
        },
        update: function (a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function (a) {
            a && this._append(a);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function (a) {
            return function (b, c) {
                return (new a.init(c)).finalize(b)
            }
        },
        _createHmacHelper: function (a) {
            return function (b, c) {
                return (new e.HMAC.init(a,
                    c)).finalize(b)
            }
        }
    });
    var e = c.algo = {};
    return c
}(Math);
(function () {
    var a = GeiJS,
        b = a.lib.WordArray;
    a.enc.Base64 = {
        stringify: function (a) {
            var b = a.words,
                c = a.sigBytes,
                g = this._map;
            a.clamp();
            a = [];
            for (var l = 0; l < c; l += 3)
                for (var q = (b[l >>> 2] >>> 24 - l % 4 * 8 & 255) << 16 | (b[l + 1 >>> 2] >>> 24 - (l + 1) % 4 * 8 & 255) << 8 | b[l + 2 >>> 2] >>> 24 - (l + 2) % 4 * 8 & 255, r = 0; 4 > r && l + .75 * r < c; r++) a.push(g.charAt(q >>> 6 * (3 - r) & 63));
            if (b = g.charAt(64))
                for (; a.length % 4;) a.push(b);
            return a.join("")
        },
        parse: function (a) {
            var c = a.length,
                f = this._map,
                g = f.charAt(64);
            g && (g = a.indexOf(g), -1 != g && (c = g));
            g = [];
            for (var l = 0, q = 0; q < c; q++)
                if (q %
                    4) {
                    var r = f.indexOf(a.charAt(q - 1)) << q % 4 * 2,
                        n = f.indexOf(a.charAt(q)) >>> 6 - q % 4 * 2;
                    g[l >>> 2] |= (r | n) << 24 - l % 4 * 8;
                    l++
                } return b.create(g, l)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
(function (a) {
    function b(a, b, c, d, h, f, g) {
        a = a + (b & c | ~b & d) + h + g;
        return (a << f | a >>> 32 - f) + b
    }

    function c(a, b, c, d, h, f, g) {
        a = a + (b & d | c & ~d) + h + g;
        return (a << f | a >>> 32 - f) + b
    }

    function d(a, b, c, d, h, f, g) {
        a = a + (b ^ c ^ d) + h + g;
        return (a << f | a >>> 32 - f) + b
    }

    function f(a, b, c, d, h, f, g) {
        a = a + (c ^ (b | ~d)) + h + g;
        return (a << f | a >>> 32 - f) + b
    }
    var g = GeiJS,
        l = g.lib,
        q = l.WordArray,
        r = l.Hasher;
    l = g.algo;
    for (var n = [], m = 0; 64 > m; m++) n[m] = 4294967296 * a.abs(a.sin(m + 1)) | 0;
    l = l.MMF = r.extend({
        _doReset: function () {
            this._hash = new q.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function (a, e) {
            for (var k = 0; 16 > k; k++) {
                var g = e + k,
                    h = a[g];
                a[g] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360
            }
            k = this._hash.words;
            g = a[e + 0];
            h = a[e + 1];
            var x = a[e + 2],
                z = a[e + 3],
                m = a[e + 4],
                l = a[e + 5],
                w = a[e + 6],
                q = a[e + 7],
                r = a[e + 8],
                F = a[e + 9],
                J = a[e + 10],
                G = a[e + 11],
                H = a[e + 12],
                D = a[e + 13],
                I = a[e + 14];
            a = a[e + 15];
            e = k[0];
            var u = k[1],
                t = k[2],
                v = k[3];
            e = b(e, u, t, v, g, 7, n[0]);
            v = b(v, e, u, t, h, 12, n[1]);
            t = b(t, v, e, u, x, 17, n[2]);
            u = b(u, t, v, e, z, 22, n[3]);
            e = b(e, u, t, v, m, 7, n[4]);
            v = b(v, e, u, t, l, 12, n[5]);
            t = b(t, v, e, u, w, 17, n[6]);
            u = b(u, t, v, e, q, 22,
                n[7]);
            e = b(e, u, t, v, r, 7, n[8]);
            v = b(v, e, u, t, F, 12, n[9]);
            t = b(t, v, e, u, J, 17, n[10]);
            u = b(u, t, v, e, G, 22, n[11]);
            e = b(e, u, t, v, H, 7, n[12]);
            v = b(v, e, u, t, D, 12, n[13]);
            t = b(t, v, e, u, I, 17, n[14]);
            u = b(u, t, v, e, a, 22, n[15]);
            e = c(e, u, t, v, h, 5, n[16]);
            v = c(v, e, u, t, w, 9, n[17]);
            t = c(t, v, e, u, G, 14, n[18]);
            u = c(u, t, v, e, g, 20, n[19]);
            e = c(e, u, t, v, l, 5, n[20]);
            v = c(v, e, u, t, J, 9, n[21]);
            t = c(t, v, e, u, a, 14, n[22]);
            u = c(u, t, v, e, m, 20, n[23]);
            e = c(e, u, t, v, F, 5, n[24]);
            v = c(v, e, u, t, I, 9, n[25]);
            t = c(t, v, e, u, z, 14, n[26]);
            u = c(u, t, v, e, r, 20, n[27]);
            e = c(e, u, t, v, D, 5, n[28]);
            v =
                c(v, e, u, t, x, 9, n[29]);
            t = c(t, v, e, u, q, 14, n[30]);
            u = c(u, t, v, e, H, 20, n[31]);
            e = d(e, u, t, v, l, 4, n[32]);
            v = d(v, e, u, t, r, 11, n[33]);
            t = d(t, v, e, u, G, 16, n[34]);
            u = d(u, t, v, e, I, 23, n[35]);
            e = d(e, u, t, v, h, 4, n[36]);
            v = d(v, e, u, t, m, 11, n[37]);
            t = d(t, v, e, u, q, 16, n[38]);
            u = d(u, t, v, e, J, 23, n[39]);
            e = d(e, u, t, v, D, 4, n[40]);
            v = d(v, e, u, t, g, 11, n[41]);
            t = d(t, v, e, u, z, 16, n[42]);
            u = d(u, t, v, e, w, 23, n[43]);
            e = d(e, u, t, v, F, 4, n[44]);
            v = d(v, e, u, t, H, 11, n[45]);
            t = d(t, v, e, u, a, 16, n[46]);
            u = d(u, t, v, e, x, 23, n[47]);
            e = f(e, u, t, v, g, 6, n[48]);
            v = f(v, e, u, t, q, 10, n[49]);
            t = f(t,
                v, e, u, I, 15, n[50]);
            u = f(u, t, v, e, l, 21, n[51]);
            e = f(e, u, t, v, H, 6, n[52]);
            v = f(v, e, u, t, z, 10, n[53]);
            t = f(t, v, e, u, J, 15, n[54]);
            u = f(u, t, v, e, h, 21, n[55]);
            e = f(e, u, t, v, r, 6, n[56]);
            v = f(v, e, u, t, a, 10, n[57]);
            t = f(t, v, e, u, w, 15, n[58]);
            u = f(u, t, v, e, D, 21, n[59]);
            e = f(e, u, t, v, m, 6, n[60]);
            v = f(v, e, u, t, G, 10, n[61]);
            t = f(t, v, e, u, x, 15, n[62]);
            u = f(u, t, v, e, F, 21, n[63]);
            k[0] = k[0] + e | 0;
            k[1] = k[1] + u | 0;
            k[2] = k[2] + t | 0;
            k[3] = k[3] + v | 0
        },
        _doFinalize: function () {
            var b = this._data,
                c = b.words,
                d = 8 * this._nDataBytes,
                f = 8 * b.sigBytes;
            c[f >>> 5] |= 128 << 24 - f % 32;
            var h = a.floor(d /
                4294967296);
            c[(f + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            c[(f + 64 >>> 9 << 4) + 14] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360;
            b.sigBytes = 4 * (c.length + 1);
            this._process();
            b = this._hash;
            c = b.words;
            for (d = 0; 4 > d; d++) f = c[d], c[d] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
            return b
        },
        clone: function () {
            var a = r.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }
    });
    g.MMF = r._createHelper(l);
    g.GeiMMF = r._createHmacHelper(l)
})(Math);
(function () {
    var a = GeiJS,
        b = a.lib,
        c = b.Base,
        d = b.WordArray;
    b = a.algo;
    var f = b.EvpKDF = c.extend({
        cfg: c.extend({
            keySize: 4,
            hasher: b.MMF,
            iterations: 1
        }),
        init: function (a) {
            this.cfg = this.cfg.extend(a)
        },
        compute: function (a, b) {
            var c = this.cfg,
                f = c.hasher.create(),
                g = d.create(),
                m = g.words,
                l = c.keySize;
            for (c = c.iterations; m.length < l;) {
                e && f.update(e);
                var e = f.update(a).finalize(b);
                f.reset();
                for (var k = 1; k < c; k++) e = f.finalize(e), f.reset();
                g.concat(e)
            }
            g.sigBytes = 4 * l;
            return g
        }
    });
    a.EvpKDF = function (a, b, c) {
        return f.create(c).compute(a,
            b)
    }
})();
GeiJS.lib.Cipher || function (a) {
    var b = GeiJS,
        c = b.lib,
        d = c.Base,
        f = c.WordArray,
        g = c.BufferedBlockAlgorithm,
        l = b.enc.Base64,
        q = b.algo.EvpKDF,
        r = c.Cipher = g.extend({
            cfg: d.extend(),
            createEncryptor: function (a, b) {
                return this.create(this._ENC_XFORM_MODE, a, b)
            },
            createDecryptor: function (a, b) {
                return this.create(this._DEC_XFORM_MODE, a, b)
            },
            init: function (a, b, c) {
                this.cfg = this.cfg.extend(c);
                this._xformMode = a;
                this._key = b;
                this.reset()
            },
            reset: function () {
                g.reset.call(this);
                this._doReset()
            },
            process: function (a) {
                this._append(a);
                return this._process()
            },
            finalize: function (a) {
                a && this._append(a);
                return this._doFinalize()
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function (a) {
                return {
                    encrypt: function (b, c, e) {
                        return ("string" == typeof c ? y : k).encrypt(a, b, c, e)
                    },
                    decrypt: function (b, c, e) {
                        return ("string" == typeof c ? y : k).decrypt(a, b, c, e)
                    }
                }
            }
        });
    c.StreamCipher = r.extend({
        _doFinalize: function () {
            return this._process(!0)
        },
        blockSize: 1
    });
    var n = b.mode = {},
        m = function (b, c, e) {
            var d = this._iv;
            d ? this._iv = a : d = this._prevBlock;
            for (var k = 0; k < e; k++) b[c + k] ^=
                d[k]
        },
        w = (c.BlockCipherMode = d.extend({
            createEncryptor: function (a, b) {
                return this.Encryptor.create(a, b)
            },
            createDecryptor: function (a, b) {
                return this.Decryptor.create(a, b)
            },
            init: function (a, b) {
                this._cipher = a;
                this._iv = b
            }
        })).extend();
    w.Encryptor = w.extend({
        processBlock: function (a, b) {
            var c = this._cipher,
                e = c.blockSize;
            m.call(this, a, b, e);
            c.encryptBlock(a, b);
            this._prevBlock = a.slice(b, b + e)
        }
    });
    w.Decryptor = w.extend({
        processBlock: function (a, b) {
            var c = this._cipher,
                e = c.blockSize,
                d = a.slice(b, b + e);
            c.decryptBlock(a, b);
            m.call(this,
                a, b, e);
            this._prevBlock = d
        }
    });
    n = n.CBC = w;
    w = (b.pad = {}).GFACDE = {
        pad: function (a, b) {
            b *= 4;
            b -= a.sigBytes % b;
            for (var c = b << 24 | b << 16 | b << 8 | b, e = [], d = 0; d < b; d += 4) e.push(c);
            b = f.create(e, b);
            a.concat(b)
        },
        unpad: function (a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
        }
    };
    c.BlockCipher = r.extend({
        cfg: r.cfg.extend({
            mode: n,
            padding: w
        }),
        reset: function () {
            r.reset.call(this);
            var a = this.cfg,
                b = a.iv;
            a = a.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
            else c = a.createDecryptor, this._minBufferSize = 1;
            this._mode = c.call(a,
                this, b && b.words)
        },
        _doProcessBlock: function (a, b) {
            this._mode.processBlock(a, b)
        },
        _doFinalize: function () {
            var a = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(!0)
            } else b = this._process(!0), a.unpad(b);
            return b
        },
        blockSize: 4
    });
    var e = c.CipherParams = d.extend({
        init: function (a) {
            this.mixIn(a)
        },
        toString: function (a) {
            return (a || this.formatter).stringify(this)
        }
    });
    n = (b.format = {}).OpenSSL = {
        stringify: function (a) {
            var b = a.ciphertext;
            a = a.salt;
            return (a ? f.create([1398893684,
                1701076831
            ]).concat(a).concat(b) : b).toString(l)
        },
        parse: function (a) {
            a = l.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = f.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16
            }
            return e.create({
                ciphertext: a,
                salt: c
            })
        }
    };
    var k = c.SerializableCipher = d.extend({
        cfg: d.extend({
            format: n
        }),
        encrypt: function (a, b, c, d) {
            d = this.cfg.extend(d);
            var k = a.createEncryptor(c, d);
            b = k.finalize(b);
            k = k.cfg;
            return e.create({
                ciphertext: b,
                key: c,
                iv: k.iv,
                algorithm: a,
                mode: k.mode,
                padding: k.padding,
                blockSize: a.blockSize,
                formatter: d.format
            })
        },
        decrypt: function (a, b, c, e) {
            e = this.cfg.extend(e);
            b = this._parse(b, e.format);
            return a.createDecryptor(c, e).finalize(b.ciphertext)
        },
        _parse: function (a, b) {
            return "string" == typeof a ? b.parse(a, this) : a
        }
    });
    b = (b.kdf = {}).OpenSSL = {
        execute: function (a, b, c, d) {
            d || (d = f.random(8));
            a = q.create({
                keySize: b + c
            }).compute(a, d);
            c = f.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return e.create({
                key: a,
                iv: c,
                salt: d
            })
        }
    };
    var y = c.PasswordBasedCipher = k.extend({
        cfg: k.cfg.extend({
            kdf: b
        }),
        encrypt: function (a, b, c, e) {
            e =
                this.cfg.extend(e);
            c = e.kdf.execute(c, a.keySize, a.ivSize);
            e.iv = c.iv;
            a = k.encrypt.call(this, a, b, c.key, e);
            a.mixIn(c);
            return a
        },
        decrypt: function (a, b, c, e) {
            e = this.cfg.extend(e);
            b = this._parse(b, e.format);
            c = e.kdf.execute(c, a.keySize, a.ivSize, b.salt);
            e.iv = c.iv;
            return k.decrypt.call(this, a, b, c.key, e)
        }
    })
}();
(function () {
    function a(a, b) {
        b &= this._lBlock >>> a ^ this._rBlock;
        this._rBlock ^= b;
        this._lBlock ^= b << a
    }

    function b(a, b) {
        b &= this._rBlock >>> a ^ this._lBlock;
        this._lBlock ^= b;
        this._rBlock ^= b << a
    }
    var c = GeiJS,
        d = c.lib,
        f = d.WordArray;
    d = d.BlockCipher;
    var g = c.algo,
        l = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
        q = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51,
            45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32
        ],
        r = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
        n = [{
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
        }, {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
        }, {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
        }, {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
        }, {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
        }, {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
        }, {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
        }, {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
        }],
        m = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
        w = g.OBJFJKET = d.extend({
            _doReset: function () {
                for (var a = this._key.words, b = [], c = 0; 56 > c; c++) {
                    var d = l[c] - 1;
                    b[c] = a[d >>> 5] >>> 31 - d % 32 & 1
                }
                a = this._subKeys = [];
                for (d = 0; 16 > d; d++) {
                    var f = a[d] = [],
                        g = r[d];
                    for (c = 0; 24 > c; c++) f[c / 6 | 0] |= b[(q[c] - 1 + g) % 28] << 31 - c % 6, f[4 + (c / 6 | 0)] |= b[28 + (q[c + 24] - 1 + g) % 28] << 31 - c % 6;
                    f[0] = f[0] << 1 | f[0] >>> 31;
                    for (c = 1; 7 > c; c++) f[c] >>>=
                        4 * (c - 1) + 3;
                    f[7] = f[7] << 5 | f[7] >>> 27
                }
                b = this._invSubKeys = [];
                for (c = 0; 16 > c; c++) b[c] = a[15 - c]
            },
            encryptBlock: function (a, b) {
                this._doCryptBlock(a, b, this._subKeys)
            },
            decryptBlock: function (a, b) {
                this._doCryptBlock(a, b, this._invSubKeys)
            },
            _doCryptBlock: function (c, d, f) {
                this._lBlock = c[d];
                this._rBlock = c[d + 1];
                a.call(this, 4, 252645135);
                a.call(this, 16, 65535);
                b.call(this, 2, 858993459);
                b.call(this, 8, 16711935);
                a.call(this, 1, 1431655765);
                for (var e = 0; 16 > e; e++) {
                    for (var k = f[e], g = this._lBlock, y = this._rBlock, l = 0, w = 0; 8 > w; w++) l |= n[w][((y ^
                        k[w]) & m[w]) >>> 0];
                    this._lBlock = y;
                    this._rBlock = g ^ l
                }
                f = this._lBlock;
                this._lBlock = this._rBlock;
                this._rBlock = f;
                a.call(this, 1, 1431655765);
                b.call(this, 8, 16711935);
                b.call(this, 2, 858993459);
                a.call(this, 16, 65535);
                a.call(this, 4, 252645135);
                c[d] = this._lBlock;
                c[d + 1] = this._rBlock
            },
            keySize: 2,
            ivSize: 2,
            blockSize: 2
        });
    c.OBJFJKET = d._createHelper(w);
    g = g.TripleOBJFJKET = d.extend({
        _doReset: function () {
            var a = this._key.words;
            this._des1 = w.createEncryptor(f.create(a.slice(0, 2)));
            this._des2 = w.createEncryptor(f.create(a.slice(2,
                4)));
            this._des3 = w.createEncryptor(f.create(a.slice(4, 6)))
        },
        encryptBlock: function (a, b) {
            this._des1.encryptBlock(a, b);
            this._des2.decryptBlock(a, b);
            this._des3.encryptBlock(a, b)
        },
        decryptBlock: function (a, b) {
            this._des3.decryptBlock(a, b);
            this._des2.encryptBlock(a, b);
            this._des1.decryptBlock(a, b)
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2
    });
    c.TripleOBJFJKET = d._createHelper(g)
})();
GeiJS.mode.FENCTIOP = function () {
    var a = GeiJS.lib.BlockCipherMode.extend();
    a.Encryptor = a.extend({
        processBlock: function (a, c) {
            this._cipher.encryptBlock(a, c)
        }
    });
    a.Decryptor = a.extend({
        processBlock: function (a, c) {
            this._cipher.decryptBlock(a, c)
        }
    });
    return a
}();
var lll1i111lio0o01 = {
    iOOOooi1il1: 1
};
GeiJS = GeiJS || function (a, b) {
    var c = {},
        d = c.lib = {},
        f = function () {},
        g = d.Base = {
            extend: function (a) {
                f.prototype = this;
                var b = new f;
                a && b.mixIn(a);
                b.hasOwnProperty("init") || (b.init = function () {
                    b.$super.init.apply(this, arguments)
                });
                b.init.prototype = b;
                b.$super = this;
                return b
            },
            create: function () {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function () {},
            mixIn: function (a) {
                for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function () {
                return this.init.prototype.extend(this)
            }
        },
        l = d.WordArray = g.extend({
            init: function (a, c) {
                a = this.words = a || [];
                this.sigBytes = c != b ? c : 4 * a.length
            },
            toString: function (a) {
                return (a || r).stringify(this)
            },
            concat: function (a) {
                var b = this.words,
                    c = a.words,
                    e = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (e % 4)
                    for (var d = 0; d < a; d++) b[e + d >>> 2] |= (c[d >>> 2] >>> 24 - d % 4 * 8 & 255) << 24 - (e + d) % 4 * 8;
                else if (65535 < c.length)
                    for (d = 0; d < a; d += 4) b[e + d >>> 2] = c[d >>> 2];
                else b.push.apply(b, c);
                this.sigBytes += a;
                return this
            },
            clamp: function () {
                var b = this.words,
                    c = this.sigBytes;
                b[c >>> 2] &= 4294967295 << 32 -
                    c % 4 * 8;
                b.length = a.ceil(c / 4)
            },
            clone: function () {
                var a = g.clone.call(this);
                a.words = this.words.slice(0);
                return a
            },
            random: function (b) {
                for (var c = [], e = 0; e < b; e += 4) c.push(4294967296 * a.random() | 0);
                return new l.init(c, b)
            }
        }),
        q = c.enc = {},
        r = q.Hex = {
            stringify: function (a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], e = 0; e < a; e++) {
                    var d = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
                    c.push((d >>> 4).toString(16));
                    c.push((d & 15).toString(16))
                }
                return c.join("")
            },
            parse: function (a) {
                for (var b = a.length, c = [], e = 0; e < b; e += 2) c[e >>> 3] |= parseInt(a.substr(e, 2), 16) <<
                    24 - e % 8 * 4;
                return new l.init(c, b / 2)
            }
        },
        n = q.Latin1 = {
            stringify: function (a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], e = 0; e < a; e++) c.push(String.fromCharCode(b[e >>> 2] >>> 24 - e % 4 * 8 & 255));
                return c.join("")
            },
            parse: function (a) {
                for (var b = a.length, c = [], e = 0; e < b; e++) c[e >>> 2] |= (a.charCodeAt(e) & 255) << 24 - e % 4 * 8;
                return new l.init(c, b)
            }
        },
        m = q.Utf8 = {
            stringify: function (a) {
                try {
                    return decodeURIComponent(escape(n.stringify(a)))
                } catch (y) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function (a) {
                return n.parse(unescape(encodeURIComponent(a)))
            }
        },
        w = d.BufferedBlockAlgorithm = g.extend({
            reset: function () {
                this._data = new l.init;
                this._nDataBytes = 0
            },
            _append: function (a) {
                "string" == typeof a && (a = m.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            },
            _process: function (b) {
                var c = this._data,
                    e = c.words,
                    d = c.sigBytes,
                    k = this.blockSize,
                    f = d / (4 * k);
                f = b ? a.ceil(f) : a.max((f | 0) - this._minBufferSize, 0);
                b = f * k;
                d = a.min(4 * b, d);
                if (b) {
                    for (var g = 0; g < b; g += k) this._doProcessBlock(e, g);
                    g = e.splice(0, b);
                    c.sigBytes -= d
                }
                return new l.init(g, d)
            },
            clone: function () {
                var a = g.clone.call(this);
                a._data = this._data.clone();
                return a
            },
            _minBufferSize: 0
        });
    d.Hasher = w.extend({
        cfg: g.extend(),
        init: function (a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        },
        reset: function () {
            w.reset.call(this);
            this._doReset()
        },
        update: function (a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function (a) {
            a && this._append(a);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function (a) {
            return function (b, c) {
                return (new a.init(c)).finalize(b)
            }
        },
        _createHmacHelper: function (a) {
            return function (b, c) {
                return (new e.HMAC.init(a,
                    c)).finalize(b)
            }
        }
    });
    var e = c.algo = {};
    return c
}(Math);
(function (a) {
    function b(a, b, c, d, f, g, m) {
        a = a + (b & c | ~b & d) + f + m;
        return (a << g | a >>> 32 - g) + b
    }

    function c(a, b, c, d, f, g, m) {
        a = a + (b & d | c & ~d) + f + m;
        return (a << g | a >>> 32 - g) + b
    }

    function d(a, b, c, d, f, g, m) {
        a = a + (b ^ c ^ d) + f + m;
        return (a << g | a >>> 32 - g) + b
    }

    function f(a, b, c, d, f, g, m) {
        a = a + (c ^ (b | ~d)) + f + m;
        return (a << g | a >>> 32 - g) + b
    }
    var g = GeiJS,
        l = g.lib,
        q = l.WordArray,
        r = l.Hasher;
    l = g.algo;
    for (var n = [], m = 0; 64 > m; m++) n[m] = 4294967296 * a.abs(a.sin(m + 1)) | 0;
    l = l.MMF = r.extend({
        _doReset: function () {
            this._hash = new q.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function (a, e) {
            for (var k = 0; 16 > k; k++) {
                var g = e + k,
                    h = a[g];
                a[g] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360
            }
            k = this._hash.words;
            g = a[e + 0];
            h = a[e + 1];
            var x = a[e + 2],
                m = a[e + 3],
                l = a[e + 4],
                w = a[e + 5],
                q = a[e + 6],
                r = a[e + 7],
                K = a[e + 8],
                F = a[e + 9],
                J = a[e + 10],
                G = a[e + 11],
                H = a[e + 12],
                D = a[e + 13],
                I = a[e + 14];
            a = a[e + 15];
            e = k[0];
            var u = k[1],
                t = k[2],
                v = k[3];
            e = b(e, u, t, v, g, 7, n[0]);
            v = b(v, e, u, t, h, 12, n[1]);
            t = b(t, v, e, u, x, 17, n[2]);
            u = b(u, t, v, e, m, 22, n[3]);
            e = b(e, u, t, v, l, 7, n[4]);
            v = b(v, e, u, t, w, 12, n[5]);
            t = b(t, v, e, u, q, 17, n[6]);
            u = b(u, t, v, e, r, 22,
                n[7]);
            e = b(e, u, t, v, K, 7, n[8]);
            v = b(v, e, u, t, F, 12, n[9]);
            t = b(t, v, e, u, J, 17, n[10]);
            u = b(u, t, v, e, G, 22, n[11]);
            e = b(e, u, t, v, H, 7, n[12]);
            v = b(v, e, u, t, D, 12, n[13]);
            t = b(t, v, e, u, I, 17, n[14]);
            u = b(u, t, v, e, a, 22, n[15]);
            e = c(e, u, t, v, h, 5, n[16]);
            v = c(v, e, u, t, q, 9, n[17]);
            t = c(t, v, e, u, G, 14, n[18]);
            u = c(u, t, v, e, g, 20, n[19]);
            e = c(e, u, t, v, w, 5, n[20]);
            v = c(v, e, u, t, J, 9, n[21]);
            t = c(t, v, e, u, a, 14, n[22]);
            u = c(u, t, v, e, l, 20, n[23]);
            e = c(e, u, t, v, F, 5, n[24]);
            v = c(v, e, u, t, I, 9, n[25]);
            t = c(t, v, e, u, m, 14, n[26]);
            u = c(u, t, v, e, K, 20, n[27]);
            e = c(e, u, t, v, D, 5, n[28]);
            v =
                c(v, e, u, t, x, 9, n[29]);
            t = c(t, v, e, u, r, 14, n[30]);
            u = c(u, t, v, e, H, 20, n[31]);
            e = d(e, u, t, v, w, 4, n[32]);
            v = d(v, e, u, t, K, 11, n[33]);
            t = d(t, v, e, u, G, 16, n[34]);
            u = d(u, t, v, e, I, 23, n[35]);
            e = d(e, u, t, v, h, 4, n[36]);
            v = d(v, e, u, t, l, 11, n[37]);
            t = d(t, v, e, u, r, 16, n[38]);
            u = d(u, t, v, e, J, 23, n[39]);
            e = d(e, u, t, v, D, 4, n[40]);
            v = d(v, e, u, t, g, 11, n[41]);
            t = d(t, v, e, u, m, 16, n[42]);
            u = d(u, t, v, e, q, 23, n[43]);
            e = d(e, u, t, v, F, 4, n[44]);
            v = d(v, e, u, t, H, 11, n[45]);
            t = d(t, v, e, u, a, 16, n[46]);
            u = d(u, t, v, e, x, 23, n[47]);
            e = f(e, u, t, v, g, 6, n[48]);
            v = f(v, e, u, t, r, 10, n[49]);
            t = f(t,
                v, e, u, I, 15, n[50]);
            u = f(u, t, v, e, w, 21, n[51]);
            e = f(e, u, t, v, H, 6, n[52]);
            v = f(v, e, u, t, m, 10, n[53]);
            t = f(t, v, e, u, J, 15, n[54]);
            u = f(u, t, v, e, h, 21, n[55]);
            e = f(e, u, t, v, K, 6, n[56]);
            v = f(v, e, u, t, a, 10, n[57]);
            t = f(t, v, e, u, q, 15, n[58]);
            u = f(u, t, v, e, D, 21, n[59]);
            e = f(e, u, t, v, l, 6, n[60]);
            v = f(v, e, u, t, G, 10, n[61]);
            t = f(t, v, e, u, x, 15, n[62]);
            u = f(u, t, v, e, F, 21, n[63]);
            k[0] = k[0] + e | 0;
            k[1] = k[1] + u | 0;
            k[2] = k[2] + t | 0;
            k[3] = k[3] + v | 0
        },
        _doFinalize: function () {
            var b = this._data,
                c = b.words,
                d = 8 * this._nDataBytes,
                f = 8 * b.sigBytes;
            c[f >>> 5] |= 128 << 24 - f % 32;
            var h = a.floor(d /
                4294967296);
            c[(f + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            c[(f + 64 >>> 9 << 4) + 14] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360;
            b.sigBytes = 4 * (c.length + 1);
            this._process();
            b = this._hash;
            c = b.words;
            for (d = 0; 4 > d; d++) f = c[d], c[d] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
            return b
        },
        clone: function () {
            var a = r.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }
    });
    g.MMF = r._createHelper(l);
    g.GeiMMF = r._createHmacHelper(l)
})(Math);

function lli1li1l(a, b) {
    b = GeiJS.enc.Utf8.parse(b);
    return GeiJS.OBJFJKET.encrypt(a, b, {
        mode: GeiJS.mode.FENCTIOP,
        padding: GeiJS.pad.GFACDE
    }).toString()
}

function ili11liii(a, b) {
    b = GeiJS.enc.Utf8.parse(b);
    return GeiJS.OBJFJKET.decrypt({
        ciphertext: GeiJS.enc.Base64.parse(a)
    }, b, {
        mode: GeiJS.mode.FENCTIOP,
        padding: GeiJS.pad.GFACDE
    }).toString(GeiJS.enc.Utf8)
}

function il1il1il(a) {
    return Math.abs(a)
}

function l1lilili(a) {
    return GeiJS.MMF(a)
}
var kkjf = {
    kk: 1
};

function jkkc(a) {
    kkjf.kk += 4;
    if (513428 * kkjf.kk - 85421 * llliiii1i0o0o0Oii1.ili1lo0o0O == 319 * kkjf.kk - 7 * kkjf.kk) return l1lilili(a, "fdfkjwer");
    kkjf.kk += 3;
    if (513528 * kkjf.kk - 85321 * lili1lli0o000oO.iliOOO00ool1 * kkjf.kk == 449 * kkjf.kk - 7 * kkjf.kk) return li1li1li(a, "3423dsdf");
    kkjf.kk -= 6;
    if (513328 * kkjf.kk - 85121 * lllio0o0OO1i111li1lii1.ilio0oOOi1il1 * kkjf.kk == 639 * kkjf.kk - 7 * kkjf.kk) return il1il1il(a, "dfdfsd2");
    --kkjf.kk;
    if (513828 * kkjf.kk - 85621 * lll1i111lOOO0o00ii1.il0oo0Oli1il1 * kkjf.kk == 109 * kkjf.kk - 7 * kkjf.kk) return lli1li1l(a,
        "cnkierjj");
    kkjf.kk += 3;
    if (513228 * kkjf.kk - 85221 * llli111li1lil1.ili10ooOO1 * kkjf.kk == 729 * kkjf.kk - 7 * kkjf.kk) return l1lilili(a, "23dfsdf2");
    if (51128 * kkjf.kk - 85321 * lll1i111lio0o01.iOOOooi1il1 * kkjf.kk == 439 * kkjf.kk - 7 * kkjf.kk) return li1iiil1(a, "sfcdfer8")
}

function fInction(a, b) {
    a = lli1li1l(a + ":" + b, "function");
    a = li1li1li(a);
    a = il1il1il(a + "");
    a = l1lilili(a + "");
    a = li1li1li(a + "");
    a = il1il1il(a);
    return a = li1iiil1(a)
}

function jkko(a) {
    kkjf.kk += 4;
    if (513428 * kkjf.kk - 85421 * llliiii1i0o0o0Oii1.ili1lo0o0O == 319 * kkjf.kk - 7 * kkjf.kk) return li1iiil1(a, "fdfkjwer");
    kkjf.kk += 3;
    if (513528 * kkjf.kk - 85321 * lili1lli0o000oO.iliOOO00ool1 * kkjf.kk == 449 * kkjf.kk - 7 * kkjf.kk) return l1lilili(a, "3423dsdf");
    kkjf.kk -= 6;
    if (513328 * kkjf.kk - 85121 * lllio0o0OO1i111li1lii1.ilio0oOOi1il1 * kkjf.kk == 639 * kkjf.kk - 7 * kkjf.kk) return lli1li1l(a, "dfdfsd2");
    --kkjf.kk;
    if (513828 * kkjf.kk - 85621 * lll1i111lOOO0o00ii1.il0oo0Oli1il1 * kkjf.kk == 109 * kkjf.kk - 7 * kkjf.kk) return ili11liii(a,
        "pouxmdjw");
    kkjf.kk += 3;
    if (513228 * kkjf.kk - 85221 * llli111li1lil1.ili10ooOO1 * kkjf.kk == 729 * kkjf.kk - 7 * kkjf.kk) return l1lilili(a, "23dfsdf2");
    if (51128 * kkjf.kk - 85321 * lll1i111lio0o01.iOOOooi1il1 * kkjf.kk == 439 * kkjf.kk - 7 * kkjf.kk) return li1iiil1(a, "sfcdfer8")
}

function llii1i1iill() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.ili111llii = function (a) {
        var b = "",
            c = 0;
        for (a = _utf8_encode(a); c < a.length;) {
            var d = a.charCodeAt(c++);
            var f = a.charCodeAt(c++);
            var g = a.charCodeAt(c++);
            var l = d >> 2;
            d = (d & 3) << 4 | f >> 4;
            var q = (f & 15) << 2 | g >> 6;
            var r = g & 63;
            isNaN(f) ? q = r = 64 : isNaN(g) && (r = 64);
            b = b + _keyStr.charAt(l) + _keyStr.charAt(d) + _keyStr.charAt(q) + _keyStr.charAt(r)
        }
        return b
    };
    this.ilil111lii = function (a) {
        var b = "",
            c = 0;
        for (a = a.replace(/[^A-Za-z0-9\+\/=]/g,
                ""); c < a.length;) {
            var d = _keyStr.indexOf(a.charAt(c++));
            var f = _keyStr.indexOf(a.charAt(c++));
            var g = _keyStr.indexOf(a.charAt(c++));
            var l = _keyStr.indexOf(a.charAt(c++));
            d = d << 2 | f >> 4;
            f = (f & 15) << 4 | g >> 2;
            var q = (g & 3) << 6 | l;
            b += String.fromCharCode(d);
            64 != g && (b += String.fromCharCode(f));
            64 != l && (b += String.fromCharCode(q))
        }
        return b = _utf8_decode(b)
    };
    _utf8_encode = function (a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >>
                6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
        }
        return b
    };
    _utf8_decode = function (a) {
        var b = "",
            c = 0;
        for (c1 = c2 = 0; c < a.length;) {
            var d = a.charCodeAt(c);
            128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3)
        }
        return b
    }
}
gei.pay = {};
gei.pay.btnClickAlipay = function () {
    $("#tenpayBankList").hide();
    $("#payType").val("alipay");
    $("#bank_type_value").val("")
};
gei.pay.btnClickWeixin = function () {
    $("#tenpayBankList").hide();
    $("#payType").val("wxpay");
    $("#bank_type_value").val("")
};
gei.pay.isDeleteTenpayBankListLast = !1;
gei.pay.btnClickTenpayBank = function () {
    var a = $("#tenpayBankList");
    gei.pay.isDeleteTenpayBankListLast || ($("li", a).last().remove(), gei.pay.isDeleteTenpayBankListLast = !0);
    a.show();
    $("#payType").val("tenpay")
};
gei.pay.btnClickTenpay = function () {
    $("#tenpayBankList").hide();
    $("#payType").val("tenpay");
    $("#bank_type_value").val("")
};
gei.pay.showCpPrice = function () {
    var a = $("#cpAll");
    0 < a.length && (0 < a.val() ? ($("#cpPriceOutContainer").show(), $("#priceOutContainer").show()) : ($("#cpPriceOutContainer").hide(), $("#priceOutContainer").hide()));
    a = $("#orderId").val();
    var b = $("#cpPrice").val();
    "" != a && 0 < b && ($("#cpPriceOutContainer").show(), $("#priceOutContainer").show())
};
gei.pay.calcPrice = function (a) {
    var b = $("#useCp").prop("checked");
    gei.ajax({
        url: "/trade/price/calc.json",
        data: {
            goodType: $("#goodType").val(),
            goodCode: $("#goodCode").val(),
            goodExtInfo: $("#extInfo").val(),
            goodCnt: $("#goodCnt").val(),
            payType: $("#payType").val(),
            useCp: b
        },
        beforeSend: function () {
            $("#shouldPriceContainer").html("...");
            $("#cpPriceContainer").html("...");
            $("#priceContainer").html("...")
        }
    }, function (b) {
        b = b.priceInfo;
        $("#shouldPrice").val(Math.ceil(b.priceShould));
        $("#shouldPriceContainer").html($("#shouldPrice").val() +
            "\u5143");
        $("#cpPrice").val(Math.ceil(b.cpPrice));
        $("#cpPriceContainer").html($("#cpPrice").val() + "\u5143");
        $("#price").val(Math.ceil(b.price));
        $("#priceContainer").html($("#price").val() + "\u5143");
        var c = $("#cpAll");
        0 < c.length && (c = Math.ceil(c.val() - b.cpPrice), $("#cpAllContainer").html(c + "\u5143"));
        a && a(b)
    }, function (a) {
        gei.util.alertWarn("\u8ba1\u7b97\u5e94\u4ed8\u91d1\u989d\u5931\u8d25!")
    })
};
gei.pay.showPayMask = function (a) {
    gei.util.pop({
        onhidden: function (b) {
            a ? window.location.href = a : window.location.reload()
        },
        title: "\u7cfb\u7edf\u63d0\u793a",
        type: BootstrapDialog.TYPE_INFO,
        message: "\u8bf7\u60a8\u5728\u65b0\u6253\u5f00\u7684\u9875\u9762\u4e0a\u5b8c\u6210\u652f\u4ed8",
        buttons: [{
            label: "\u786e\u5b9a",
            action: function (a) {
                a.close()
            }
        }]
    })
};
gei.pay.doPay = function (a, b, c) {
    if ("" == a.orderId) gei.util.alertWarn("\u8ba2\u5355\u53f7\u4e3a\u7a7a!");
    else {
        var d = $("#payForm");
        b && (d = $("#" + b));
        d = d.get(0);
        d.action = "/order/pay";
        d.target = "_blank";
        $("#orderId").val(a.orderId);
        b = $("#payType").val();
        0 >= a.price && (b = "cppay", $("#payType").val(b), d.target = "_self");
        "wxpay" == b ? gei.win.wxPay.pop({
            orderId: a.orderId,
            payType: "wxpay"
        }, a.price) : (gei.pay.showPayMask(c), d.submit())
    }
};
gei.pay.createAndPayAction = function (a, b) {
    var c = $("#cpPrice").val(),
        d = $("#price").val();
    0 < c ? gei.util.confirm('\u60a8\u786e\u8ba4\u4f7f\u7528 <span class="font-red-enhance" >\u201c\u62b5\u7528\u5377' + c + "\u5143\u201d</span> \u5417 \uff1f<br/>\u70b9\u51fb\u786e\u8ba4\u6309\u94ae\u540e" + (0 == d ? "" : "\u5c06\u5f39\u51fa\u652f\u4ed8\u9875\u9762,") + " <b> \u201c\u62b5\u7528\u5377" + c + "\u5143\u201d \u5c06\u88ab\u6d88\u8017\uff0c\u4e0d\u80fd\u64a4\u9500</b>\u3002", function () {
            gei.pay.createOrderAndPay(a, b)
        }, {
            width: 500
        }) :
        gei.pay.createOrderAndPay(a, b)
};
gei.pay.createOrderAndPay = function (a, b) {
    var c = $("#cpPrice").val(),
        d = $("#price").val();
    c = 0 < c && 0 >= d;
    d = $("#payType").val();
    c || "wxpay" == d ? this.createOrder(a, b) : (a = this._getNewOrderVo(), a = gei.util.createForm("/order/createAndPay", a), gei.pay.showPayMask(b), a.submit())
};
gei.pay.createOrder = function (a, b) {
    gei.ajax({
        type: "post",
        url: "/order/create.json",
        data: this._getNewOrderVo()
    }, function (c) {
        gei.pay.doPay({
            orderId: c.orderId,
            goodType: c.goodType,
            price: c.price
        }, a, b)
    }, function (a) {
        gei.util.alertWarn("\u521b\u5efa\u8ba2\u5355\u5931\u8d25, \u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5!")
    })
};
gei.pay._getNewOrderVo = function () {
    var a = !1;
    0 < $("#useCp").length && (a = $("#useCp").prop("checked"));
    return {
        goodType: $("#goodType").val(),
        goodCode: $("#goodCode").val(),
        goodExtInfo: $("#extInfo").val(),
        goodCnt: $("#goodCnt").val(),
        payType: $("#payType").val(),
        useCp: a
    }
};
gei.pay.findAndPayAction = function (a, b, c) {
    gei.pay.doPay({
        orderId: a,
        price: $("#price").val()
    }, b, c)
};
gei.pay.payAction = function (a, b) {
    var c = $("#orderId").val();
    "" != c ? gei.pay.findAndPayAction(c, a, b) : gei.pay.createAndPayAction(a, b)
};
gei.pay.confirmToPay = function (a, b, c, d) {
    var f = $.extend({}, a);
    gei.util.confirm(function () {
        var a = $("<div></div>");
        a.load("/trade/pay", f, function () {});
        return a
    }, function () {}, {
        title: "\u6536\u94f6\u53f0",
        width: 1E3,
        onshown: function (a) {
            b && b($("#pay_bill_info"), a)
        },
        buttons: [{
            label: "\u786e\u8ba4\u652f\u4ed8",
            cssClass: "btn-primary",
            action: function (a) {
                gei.pay.payAction(c, d);
                a.close()
            }
        }, {
            label: "\u53d6\u6d88",
            action: function (a) {
                a.close()
            }
        }]
    })
};
gei.buy = {};
gei.buy.license = function () {
    function a(a) {
        for (var b = [], c = !1, e = 0; e < k.length; e++) {
            var d = k[e];
            c && b.push(d);
            d.code == a && (c = !0)
        }
        return b
    }

    function b(a) {
        var b = "";
        if (!a) return b;
        var c = a.dim;
        a = a.licenses;
        b += "<div class='container' data-type='lic_container' data-lic-type='" + c.code + "'>";
        b += "<span class='title'>" + c.name + "</span>";
        b += "<ul class='content'>";
        for (var e = 0; e < a.length; e++) {
            var d = a[e],
                f;
            a: {
                if (f = y[c.code])
                    for (var k = 0; k < f.length; k++)
                        if (f[k].code == d) {
                            f = f[k];
                            break a
                        } f = ""
            }
            b += "<li data-type='lic_choose_btn' data-selected='false' data-lic-type='" +
                c.code + "' data-lic-code='" + d + "'  data-toggle='tooltip' data-placement='top' title='" + f.remark + "' onclick='gei.buy.license.select(this);'>" + f.name + "</li>"
        }
        return b + "</ul></div>"
    }

    function c(a, c) {
        var e = $("<div class='lic_choose' id='licChooseContainer'></div>");
        gei.ajax({
            url: "/buy/license/choose.json",
            data: {
                unitTypeCode: a,
                unitId: c
            }
        }, function (a) {
            k = [];
            y = {};
            h = [];
            if (a.licenseDim)
                for (p in a.licenseDim) k.push({
                    index: 0,
                    name: a.licenseDim[p],
                    code: p
                });
            a.licenseDict && (y = a.licenseDict);
            a.agentGoods && (h = a.agentGoods);
            a = d();
            $(b(a)).appendTo($(e))
        });
        return e
    }

    function d() {
        for (var a = 0; a < k.length; a++) {
            var b = k[a],
                c = f(b.code);
            if (0 < c.length) return {
                dim: b,
                licenses: c
            }
        }
    }

    function f(a) {
        for (var b = {}, c = q(), e = 0; e < c.length; e++) {
            var d = c[e][a];
            d && null != d && (b[d] || (b[d] = d))
        }
        a = [];
        for (p in b) a.push(p);
        return a
    }

    function g(a, b) {
        $('[data-type="lic_choose_btn"][data-lic-type="' + a + '"]').attr("data-selected", !1);
        $('[data-type="lic_choose_btn"][data-lic-type="' + a + '"][data-lic-code="' + b + '"]').attr("data-selected", !0)
    }

    function l() {
        var a = {};
        $('[data-type="lic_choose_btn"][data-selected="true"]').each(function (b,
            c) {
            b = $(this).attr("data-lic-type");
            c = $(this).attr("data-lic-code");
            a[b] = c
        });
        return a
    }

    function q() {
        for (var a = [], b = l(), c = 0; c < h.length; c++) {
            var e = h[c],
                d = !0;
            for (p in b)
                if (e[p] != b[p]) {
                    d = !1;
                    break
                } d && a.push(e)
        }
        return a
    }

    function r(c, e) {
        e = a(c);
        for (var d = 0; d < e.length; d++) $('[data-type="lic_container"][data-lic-type="' + e[d].code + '"]').remove();
        $(".account").remove();
        a: {
            c = a(c);
            for (e = 0; e < c.length; e++) {
                d = c[e];
                var k = f(d.code);
                if (0 < k.length) {
                    c = {
                        dim: d,
                        licenses: k
                    };
                    break a
                }
            }
            c = void 0
        }
        if (c) e = b(c);
        else if (e = q(), 1 != e.length) gei.util.alertWarn("\u8ba1\u7b97\u91d1\u989d\u51fa\u9519!"),
            e = void 0;
        else {
            var h = e[0];
            e = h.salePrice;
            d = h.unitTypeCode;
            k = h.unitId;
            var g = h.licenseId;
            h = h.agentLicenseDesc;
            var x = "<div class='account'>";
            h && "" != h && (h = h.replaceAll("||", ","), x += "<div class='license-row'><span>\u6388\u6743\u8303\u56f4\uff1a</span><span class='lic-desc'>" + h + "</span></div>");
            x = x + " <div class='pay-row'>   <span class='title'>\u4ef7\u683c\uff1a</span><span class='rmb-icon'>\uffe5</span>" + ("   <span class='price' id='price_container'>" + e + "</span>") + "   <div class='account-btn'>" + ("     <button class='btn btn-success' id='addToCartBtn' onclick='gei.buy.license.addToCart(\"" +
                d + '","' + k + '","' + g + "\");'>\u6dfb\u52a0\u5230\u8d2d\u7269\u8f66</button>");
            x += "     <button class='btn btn-info' id='continueBuyBtn' style='display: none;' onclick='gei.buy.license.continueBuy();'>\u7ee7\u7eed\u9009\u5546\u54c1</button>";
            x += "     <button class='btn btn-danger' id='toPayBtn' style='display: none;' onclick='gei.buy.license.goToPay();'>\u53bb\u7ed3\u7b97</button>";
            x += "   </div>";
            x += " </div>";
            e = x += "</div>"
        }
        $(e).appendTo($("#licChooseContainer"));
        n(c)
    }

    function n(a) {
        if (a && 1 == a.licenses.length) {
            var b =
                a.dim.code;
            a = a.licenses[0];
            g(b, a);
            r(b, a)
        }
        $('li[data-type="lic_choose_btn"]').tooltip()
    }

    function m() {
        e && e.close()
    }

    function w() {
        $("#addToCartBtn").hide();
        $("#toPayBtn").show();
        $("#continueBuyBtn").show()
    }
    var e, k = [],
        y = {},
        h = [];
    return {
        choose: function (a, b) {
            a = c(a, b);
            isLogin && gei.util.pop({
                type: BootstrapDialog.TYPE_INFO,
                title: "\u8bf7\u9009\u62e9\u6388\u6743",
                width: 700,
                message: a,
                onshown: function (a) {
                    e = a;
                    n(d())
                }
            })
        },
        select: function (a) {
            var b = $(a);
            a = b.attr("data-lic-type");
            b = b.attr("data-lic-code");
            g(a, b);
            r(a,
                b)
        },
        continueBuy: function () {
            m()
        },
        goToPay: function () {
            gei.buy.cart.toCart()
        },
        addToCart: function (a, b, c) {
            gei.buy.cart.save(a, b, c, w, m)
        }
    }
}();
gei.buy.cart = function () {
    return {
        toCart: function () {
            window.location.href = "/home/cart"
        },
        save: function (a, b, c, d, f) {
            c ? gei.ajax({
                url: "/home/cart/add.json",
                data: {
                    unitTypeCode: a,
                    unitId: b,
                    licenseId: c,
                    amount: 1
                }
            }, function (a) {
                d && d(a)
            }, function (a) {
                gei.util.alertWarn("\u6dfb\u52a0\u5931\u8d25!");
                f && f(a)
            }) : gei.util.alertWarn("\u8bf7\u60a8\u9009\u62e9\u9700\u8981\u8d2d\u4e70\u7684\u6388\u6743!")
        },
        remove: function (a, b) {
            gei.ajax({
                    url: "/home/cart/remove.json",
                    data: {
                        id: a,
                        amount: b
                    }
                }, function (a) {
                    window.location.reload()
                },
                function (a) {
                    gei.util.alertWarn("\u5220\u9664\u5931\u8d25!")
                })
        },
        confirmToBuy: function () {
            gei.pay.confirmToPay({}, function () {
                $("#goodType").val("cart");
                $("#goodCnt").val(1);
                gei.pay.calcPrice()
            }, void 0, "/home/order")
        }
    }
}();
gei.buy.order = function () {
    function a(a, b) {
        gei.home.queryTable("/home/order/tab", "#contentOrderDetailBody", {
            pageNum: a,
            hasPayed: b
        })
    }

    function b(a, b, f) {
        gei.util.confirm("\u786e\u8ba4\u64cd\u4f5c?", function () {
            gei.ajax({
                url: "/order/status.json",
                data: {
                    tradeId: a,
                    status: b
                }
            }, function (a) {
                f && f(a);
                gei.buy.orderDetailWin && gei.buy.orderDetailWin.close && gei.buy.orderDetailWin.close()
            }, function (a) {
                gei.util.alertWarn("\u5220\u9664\u5931\u8d25!")
            })
        })
    }
    return {
        jumpPage: a,
        updateOrderStatus: function (c, d, f) {
            b(c, d, function (b) {
                b =
                    $("#h_pageNum");
                b = 0 < b.length ? b.val() : 1;
                a(b, f)
            })
        },
        queryDetail: function (a) {
            gei.util.confirm(function () {
                var b = $('<div class="container-fluid"></div>');
                b.load("/home/order/detail", {
                    orderId: a
                }, function () {});
                return b
            }, function () {}, {
                title: "\u8ba2\u5355\u8be6\u60c5",
                width: 1E3,
                onshown: function (a) {},
                buttons: []
            })
        },
        toPay: function (a) {
            gei.pay.confirmToPay({
                orderId: a
            })
        }
    }
}();
gei.buy.order.contract = {};
gei.buy.order.contract.apply = function (a) {
    window.location.href = "order/contract?orderId=" + a
};
gei.buy.order.contract.info = function (a, b) {
    gei.util.confirm(function () {
        var c = $("<div></div>");
        c.load("order/contract/info", {
            tradeId: a,
            contractId: b
        }, function () {});
        return c
    }, function () {}, {
        title: "\u6388\u6743\u5408\u540c\u8be6\u60c5",
        width: 700,
        buttons: [{
            label: "\u5173\u95ed",
            cssClass: "btn-primary",
            action: function (a) {
                a.close()
            }
        }]
    })
};
gei.buy.order.loadCompanySelect = function (a, b) {
    $.post("/home/info/company/select", {
        id: a
    }, function (a, d) {
        $(b).html(a)
    })
};
gei.buy.order.loadAddressSelect = function (a, b) {
    $.post("/home/info/address/select", {
        id: a
    }, function (a, d) {
        $(b).html(a)
    })
};
gei.buy.order.invoice = {};
gei.buy.order.invoice.apply = function (a) {
    gei.util.alertSuccess("\u8054\u7cfb\u7231\u7ed9\u7f51\u83b7\u53d6\u53d1\u7968\u3002<br/>\u5ba2\u670dQQ\uff1a3393132569")
};
gei.buy.order.invoice.info = function (a) {
    gei.util.confirm(function () {
        var b = $("<div></div>");
        b.load("order/invoice/info", {
            invoiceId: a
        }, function () {});
        return b
    }, function () {}, {
        title: "\u53d1\u7968\u8be6\u60c5",
        width: 700,
        buttons: [{
            label: "\u5173\u95ed",
            cssClass: "btn-primary",
            action: function (a) {
                a.close()
            }
        }]
    })
};
gei.buy.submitUnlock = function (a) {
    $("#buyLicenseForm").ajaxRequest({
        enabelAjaxSubmit: !0,
        type: "submit",
        url: "/buyLicense/unlock.json",
        success: function (b) {
            b = $("#h_pageNum").val();
            jumpPage(b);
            a && a.close()
        }
    })
};
gei.buy.unlockWin = function (a) {
    gei.util.confirm(function () {
        var b = $("<div></div>");
        b.load("/home/buy/unlock", {
            buyId: a
        }, function () {});
        return b
    }, function () {}, {
        title: "\u89e3\u9501--\x3e\u8bf7\u586b\u5199\u6388\u6743\u4fe1\u606f\u89e3\u9501\uff0c\u6211\u4eec\u5c06\u4e3a\u60a8\u51fa\u5177\u6388\u6743\u8bc1\u4e66\u5e76\u63d0\u4f9b\u53ef\u4e0b\u8f7d\u7684\u8d44\u6e90\u94fe\u63a5",
        width: 700,
        onshown: function (a) {
            $("#buyLicenseForm").validate({
                submitHandler: function (b) {
                    gei.buy.submitUnlock(a)
                },
                rules: {
                    useType: {
                        required: !0
                    },
                    authorize: {
                        required: !0
                    },
                    projectName: {
                        required: !0
                    },
                    projectTaget: {
                        required: !0
                    },
                    projectDesc: {
                        required: !0
                    }
                }
            })
        },
        buttons: [{
            label: "\u63d0\u4ea4",
            cssClass: "btn-primary",
            action: function (a) {
                $("#buyLicenseForm").submit()
            }
        }]
    })
};
gei.buy.readyToDown = function (a, b, c) {
    var d = $("#" + a),
        f = $("#" + b);
    0 != d.length && 0 != f.length && gei.ajax({
        url: "/buy/download/musicReady.json",
        data: {
            id: c
        }
    }, function (a) {
        d.hide();
        f.show()
    }, function (g) {
        d.html("<p style='font-size: 12px;'>\u6388\u6743\u767b\u8bb0\u4fe1\u606f\u6b63\u5728\u4eba\u5de5\u5ba1\u6838\u4e2d, \u8bf7\u7a0d\u5019...</p>");
        d.show();
        f.hide();
        setTimeout(function () {
            gei.buy.readyToDown(a, b, c)
        }, 1E4)
    })
};
gei.buy.downloadMusic = function (a, b) {
    window.location.href = "/buy/download/music?id=" + b
};
gei.buy.downloadMusicItem = function (a, b, c) {
    gei.ajax({
        url: "/buy/download/itemFile",
        data: {
            id: c
        }
    }, function (b) {
        var c = $("#fileDownloadFrame");
        0 == c.size() && (c = $('<iframe id="fileDownloadFrame" style="display:none"></iframe> ').appendTo($("body")));
        c.attr("src", b.message);
        b = "\u6ca1\u81ea\u52a8\u4e0b\u8f7d? <b><span class='link-style' onclick=\"moreDownload('" + b.message + "');\">\u5907\u7528\u4e0b\u8f7d\u70b9</span></b>";
        gei.util.tooltipAutoHide($(a), b, {
            placement: "top"
        })
    })
};
gei.buy.downloadLicense = function (a) {
    window.location.href = "/buy/download/license?id=" + a
};
gei.core.eventBus.on("Event_pageContentLoadEnd", function () {
    bindFavAndNoteClick()
});

function bindFavAndNoteClick() {
    $(".fav-btn").unbind("click").bind("click", function (a) {
        bindFavBtn($(this))
    });
    $(".note-btn").each(function (a, b) {
        bindNoteBtn($(b))
    })
}
var bindNoteBtn = function (a) {
        var b = a.attr("unit-type"),
            c = a.attr("unit-id");
        a.webuiPopover({
            placement: "top",
            closeable: !1,
            onShow: function (d) {
                isLogin ? ($(".close-btn", d).click(function () {
                        a.webuiPopover("hide")
                    }), $("textarea", d).focus(), $(".submit-btn", d).unbind("click").bind("click", function () {
                        var f = 0 < $(".chx-public:checked", d).size(),
                            g = $("textarea", d).val();
                        if (400 < g.length) gei.util.pop({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: "\u6587\u672c\u8d85\u51fa",
                            message: "\u7b14\u8bb0\u6700\u957f\u5185\u5bb9\u9650\u5b9a\u4e3a400\u4e2a\u5b57\uff0c\u5f53\u524d\u5185\u5bb9\u957f\u5ea6\u4e3a" +
                                g.length
                        });
                        else {
                            a.webuiPopover("hide");
                            var l = $("#mark-bar-" + b + "-" + c),
                                q = $(".mark-note-icon", l);
                            "" == g ? q.addClass("hide") : (l.removeClass("hide"), q.removeClass("hide"));
                            f || "" == g ? $(".note-nopub", l).addClass("hide") : $(".note-nopub", l).removeClass("hide");
                            $(".note-content", l).html(gei.sec(g));
                            l.removeAttr("style");
                            adjustUnitRowHeightSame();
                            gei.ajaxWithError({
                                url: "/sns/note/save.json",
                                data: {
                                    unitType: b,
                                    unitId: c,
                                    isPublic: f,
                                    content: g
                                },
                                type: "post"
                            }, function () {
                                "" != g && gei.util.tooltipAutoHide(a, '\u7528\u6237\u540e\u53f0->\u6211\u7684\u7d20\u6750 <b><a href="/home/mark?markType=note" target="_blank">\u67e5\u770b</a></b>')
                            })
                        }
                    })) :
                    popLoginTip("operate")
            },
            onHide: function (a) {
                log("onHide")
            }
        })
    },
    bindFavBtn = function (a) {
        if (isLogin) {
            var b = "false" == a.attr("fav") ? !0 : !1,
                c = a.attr("unit-type"),
                d = a.attr("unit-id"),
                f = $("#mark-bar-" + c + "-" + d),
                g = $(".mark-fav-icon", f),
                l = $("i", a);
            a.attr("fav", b);
            b ? (l.attr("class", "icon-star"), f.removeClass("hide"), g.removeClass("hide"), $("<i>").css({
                left: 0,
                color: "#996600",
                position: "absolute"
            }).addClass("icon-star-empty mark-animation").insertAfter(g).animate({
                top: -20
            }, 300, function () {
                $(this).remove()
            })) : (g.addClass("hide"),
                l.attr("class", "icon-star-empty"));
            f.removeAttr("style");
            adjustUnitRowHeightSame();
            gei.ajaxWithError({
                url: "/sns/mark/fav.json",
                data: {
                    unitType: c,
                    unitId: d,
                    isFav: b
                },
                type: "post"
            }, function () {
                if (b) {
                    var c = "#audioItemBox_" + d;
                    c = {
                        container: 0 == $(c).size() ? "body" : c
                    };
                    gei.util.tooltipAutoHide(a, '\u7528\u6237\u540e\u53f0->\u6211\u7684\u7d20\u6750 <b><a href="/home/mark?markType=fav" target="_blank">\u67e5\u770b</a></b>', c)
                }
            })
        } else popLoginTip("operate")
    };
gei.browser = {
    isPC: function () {
        for (var a = navigator.userAgent.toLowerCase(), b = "android;iphone;symbianOS;windows phone;ipad;ipod".split(";"), c = !0, d = 0; d < b.length; d++)
            if (0 < a.indexOf(b[d])) {
                c = !1;
                break
            } return c
    },
    isMobile: function () {
        return !this.isPC()
    },
    BrowserType: {
        Opera: "Opera",
        Firefox: "Firefox",
        Chrome: "Chrome",
        Safari: "Safari",
        IE: "IE",
        Edge: "Edge"
    },
    getBrowserType: function () {
        var a = navigator.userAgent;
        if (-1 < a.indexOf("Trident") || -1 < a.indexOf("Edge")) return this.BrowserType.Edge;
        var b = -1 < a.indexOf("Opera");
        if (b) return this.BrowserType.Opera;
        if (-1 < a.indexOf("Firefox")) return this.BrowserType.Firefox;
        if (-1 < a.indexOf("Chrome")) return this.BrowserType.Chrome;
        if (-1 < a.indexOf("Safari")) return this.BrowserType.Safari;
        if (-1 < a.indexOf("compatible") && -1 < a.indexOf("MSIE") && !b) return this.BrowserType.IE
    },
    flashChecker: function () {
        var a = 0,
            b = 0;
        if (document.all) {
            var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            a = 1;
            b = c.GetVariable("$version");
            b = parseInt(b.split(" ")[1].split(",")[0])
        } else if (navigator.plugins && 0 < navigator.plugins.length && (c = navigator.plugins["Shockwave Flash"])) {
            a =
                1;
            c = c.description.split(" ");
            for (var d = 0; d < c.length; ++d) isNaN(parseInt(c[d])) || (b = parseInt(c[d]))
        }
        return {
            f: a,
            v: b
        }
    }
};
! function (a, b) {
    "function" == typeof define && define.amd ? define("bloodhound", ["jquery"], function (c) {
        return a.Bloodhound = b(c)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.Bloodhound = b(jQuery)
}(this, function (a) {
    var b = function () {
            return {
                isMsie: function () {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function (a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function (a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                        "\\$&")
                },
                isString: function (a) {
                    return "string" == typeof a
                },
                isNumber: function (a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function (a) {
                    return "undefined" == typeof a
                },
                isElement: function (a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function (b) {
                    return b instanceof a
                },
                toStr: function (a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function (b, c) {
                    a.each(b, function (a, b) {
                        return c(b, a)
                    })
                },
                map: a.map,
                filter: a.grep,
                every: function (b, c) {
                    var e = !0;
                    return b ? (a.each(b, function (a, d) {
                        return (e = c.call(null, d, a, b)) ? void 0 : !1
                    }), !!e) : e
                },
                some: function (b, c) {
                    var e = !1;
                    return b ? (a.each(b, function (a, d) {
                        return (e = c.call(null, d, a, b)) ? !1 : void 0
                    }), !!e) : e
                },
                mixin: a.extend,
                identity: function (a) {
                    return a
                },
                clone: function (b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function () {
                    var a = 0;
                    return function () {
                        return a++
                    }
                },
                templatify: function (b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function (a) {
                    setTimeout(a, 0)
                },
                debounce: function (a, b, c) {
                    var e, d;
                    return function () {
                        var f,
                            k, g = this,
                            l = arguments;
                        return f = function () {
                            e = null;
                            c || (d = a.apply(g, l))
                        }, k = c && !e, clearTimeout(e), e = setTimeout(f, b), k && (d = a.apply(g, l)), d
                    }
                },
                throttle: function (a, b) {
                    var c, d, f, h, g, l;
                    return g = 0, l = function () {
                            g = new Date;
                            f = null;
                            h = a.apply(c, d)
                        },
                        function () {
                            var e = new Date,
                                k = b - (e - g);
                            return c = this, d = arguments, 0 >= k ? (clearTimeout(f), f = null, g = e, h = a.apply(c, d)) : f || (f = setTimeout(l, k)), h
                        }
                },
                stringify: function (a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function () {}
            }
        }(),
        c = function () {
            function a(a) {
                return a = b.toStr(a),
                    a ? a.split(/\s+/) : []
            }

            function c(a) {
                return a = b.toStr(a), a ? a.split(/\W+/) : []
            }

            function e(a) {
                return function (c) {
                    return c = b.isArray(c) ? c : [].slice.call(arguments, 0),
                        function (e) {
                            var d = [];
                            return b.each(c, function (c) {
                                d = d.concat(a(b.toStr(e[c])))
                            }), d
                        }
                }
            }
            return {
                nonword: c,
                whitespace: a,
                obj: {
                    nonword: e(c),
                    whitespace: e(a)
                }
            }
        }(),
        d = function () {
            function c(c) {
                this.maxSize = b.isNumber(c) ? c : 100;
                this.reset();
                0 >= this.maxSize && (this.set = this.get = a.noop)
            }

            function d() {
                this.head = this.tail = null
            }

            function e(a, b) {
                this.key = a;
                this.val =
                    b;
                this.prev = this.next = null
            }
            return b.mixin(c.prototype, {
                set: function (a, b) {
                    var c, d = this.list.tail;
                    this.size >= this.maxSize && (this.list.remove(d), delete this.hash[d.key], this.size--);
                    (c = this.hash[a]) ? (c.val = b, this.list.moveToFront(c)) : (c = new e(a, b), this.list.add(c), this.hash[a] = c, this.size++)
                },
                get: function (a) {
                    return (a = this.hash[a]) ? (this.list.moveToFront(a), a.val) : void 0
                },
                reset: function () {
                    this.size = 0;
                    this.hash = {};
                    this.list = new d
                }
            }), b.mixin(d.prototype, {
                add: function (a) {
                    this.head && (a.next = this.head, this.head.prev =
                        a);
                    this.head = a;
                    this.tail = this.tail || a
                },
                remove: function (a) {
                    a.prev ? a.prev.next = a.next : this.head = a.next;
                    a.next ? a.next.prev = a.prev : this.tail = a.prev
                },
                moveToFront: function (a) {
                    this.remove(a);
                    this.add(a)
                }
            }), c
        }(),
        f = function () {
            function c(a, c) {
                this.prefix = ["__", a, "__"].join("");
                this.ttlKey = "__ttl__";
                this.keyMatcher = new RegExp("^" + b.escapeRegExChars(this.prefix));
                this.ls = c || e;
                !this.ls && this._noop()
            }

            function d(a) {
                return JSON.stringify(b.isUndefined(a) ? null : a)
            }
            try {
                var e = window.localStorage;
                e.setItem("~~~", "!");
                e.removeItem("~~~")
            } catch (k) {
                e = null
            }
            return b.mixin(c.prototype, {
                _prefix: function (a) {
                    return this.prefix + a
                },
                _ttlKey: function (a) {
                    return this._prefix(a) + this.ttlKey
                },
                _noop: function () {
                    this.get = this.set = this.remove = this.clear = this.isExpired = b.noop
                },
                _safeSet: function (a, b) {
                    try {
                        this.ls.setItem(a, b)
                    } catch (h) {
                        "QuotaExceededError" === h.name && (this.clear(), this._noop())
                    }
                },
                get: function (b) {
                    return this.isExpired(b) && this.remove(b), a.parseJSON(this.ls.getItem(this._prefix(b)))
                },
                set: function (a, c, e) {
                    return b.isNumber(e) ?
                        this._safeSet(this._ttlKey(a), d((new Date).getTime() + e)) : this.ls.removeItem(this._ttlKey(a)), this._safeSet(this._prefix(a), d(c))
                },
                remove: function (a) {
                    return this.ls.removeItem(this._ttlKey(a)), this.ls.removeItem(this._prefix(a)), this
                },
                clear: function () {
                    var a = this.keyMatcher;
                    var b, c, d = [],
                        f = e.length;
                    for (b = 0; f > b; b++)(c = e.key(b)).match(a) && d.push(c.replace(a, ""));
                    for (a = d.length; a--;) this.remove(d[a]);
                    return this
                },
                isExpired: function (c) {
                    c = a.parseJSON(this.ls.getItem(this._ttlKey(c)));
                    return b.isNumber(c) &&
                        (new Date).getTime() > c ? !0 : !1
                }
            }), c
        }(),
        g = function () {
            function c(a) {
                a = a || {};
                this.cancelled = !1;
                this.lastReq = null;
                this._send = a.transport;
                this._get = a.limiter ? a.limiter(this._get) : this._get;
                this._cache = !1 === a.cache ? new d(0) : g
            }
            var f = 0,
                e = {},
                k = 6,
                g = new d(10);
            return c.setMaxPendingRequests = function (a) {
                k = a
            }, c.resetCache = function () {
                g.reset()
            }, b.mixin(c.prototype, {
                _fingerprint: function (b) {
                    return b = b || {}, b.url + b.type + a.param(b.data || {})
                },
                _get: function (a, b) {
                    function c(a) {
                        b(null, a);
                        x._cache.set(l, a)
                    }

                    function d() {
                        b(!0)
                    }

                    function h() {
                        f--;
                        delete e[l];
                        x.onDeckRequestArgs && (x._get.apply(x, x.onDeckRequestArgs), x.onDeckRequestArgs = null)
                    }
                    var g, x = this;
                    var l = this._fingerprint(a);
                    this.cancelled || l !== this.lastReq || ((g = e[l]) ? g.done(c).fail(d) : k > f ? (f++, e[l] = this._send(a).done(c).fail(d).always(h)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
                },
                get: function (c, e) {
                    var d;
                    e = e || a.noop;
                    c = b.isString(c) ? {
                        url: c
                    } : c || {};
                    var f = this._fingerprint(c);
                    this.cancelled = !1;
                    this.lastReq = f;
                    (d = this._cache.get(f)) ? e(null, d): this._get(c, e)
                },
                cancel: function () {
                    this.cancelled = !0
                }
            }), c
        }(),
        l = window.SearchIndex = function () {
            function c(c) {
                c = c || {};
                c.datumTokenizer && c.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required");
                this.identify = c.identify || b.stringify;
                this.datumTokenizer = c.datumTokenizer;
                this.queryTokenizer = c.queryTokenizer;
                this.reset()
            }

            function d(a) {
                return a = b.filter(a, function (a) {
                    return !!a
                }), a = b.map(a, function (a) {
                    return a.toLowerCase()
                })
            }

            function e() {
                var a = {};
                return a[h] = [], a[g] = {}, a
            }

            function f(a) {
                for (var b = {}, c = [], e = 0, d = a.length; d > e; e++) b[a[e]] ||
                    (b[a[e]] = !0, c.push(a[e]));
                return c
            }
            var g = "c",
                h = "i";
            return b.mixin(c.prototype, {
                bootstrap: function (a) {
                    this.datums = a.datums;
                    this.trie = a.trie
                },
                add: function (a) {
                    var c = this;
                    a = b.isArray(a) ? a : [a];
                    b.each(a, function (a) {
                        var f;
                        c.datums[f = c.identify(a)] = a;
                        a = d(c.datumTokenizer(a));
                        b.each(a, function (a) {
                            var b;
                            var d = c.trie;
                            for (a = a.split(""); b = a.shift();) d = d[g][b] || (d[g][b] = e()), d[h].push(f)
                        })
                    })
                },
                get: function (a) {
                    var c = this;
                    return b.map(a, function (a) {
                        return c.datums[a]
                    })
                },
                search: function (a) {
                    var c, e, k = this;
                    return c =
                        d(this.queryTokenizer(a)), b.each(c, function (a) {
                            var b;
                            if (e && 0 === e.length) return !1;
                            var c = k.trie;
                            for (a = a.split(""); c && (b = a.shift());) c = c[g][b];
                            if (c && 0 === a.length) {
                                b = c[h].slice(0);
                                if (e) {
                                    c = e;
                                    var d = a = 0,
                                        f = [];
                                    c = c.sort();
                                    b = b.sort();
                                    for (var l = c.length, x = b.length; l > a && x > d;) c[a] < b[d] ? a++ : c[a] > b[d] ? d++ : (f.push(c[a]), a++, d++);
                                    c = f
                                } else c = b;
                                c = void(e = c)
                            } else c = (e = [], !1);
                            return c
                        }), e ? b.map(f(e), function (a) {
                            return k.datums[a]
                        }) : []
                },
                all: function () {
                    var a = [],
                        b;
                    for (b in this.datums) a.push(this.datums[b]);
                    return a
                },
                reset: function () {
                    this.datums = {};
                    this.trie = e()
                },
                serialize: function () {
                    return {
                        datums: this.datums,
                        trie: this.trie
                    }
                }
            }), c
        }(),
        q = function () {
            function a(a) {
                this.url = a.url;
                this.ttl = a.ttl;
                this.cache = a.cache;
                this.prepare = a.prepare;
                this.transform = a.transform;
                this.transport = a.transport;
                this.thumbprint = a.thumbprint;
                this.storage = new f(a.cacheKey)
            }
            var c;
            return c = {
                data: "data",
                protocol: "protocol",
                thumbprint: "thumbprint"
            }, b.mixin(a.prototype, {
                _settings: function () {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                store: function (a) {
                    this.cache && (this.storage.set(c.data,
                        a, this.ttl), this.storage.set(c.protocol, location.protocol, this.ttl), this.storage.set(c.thumbprint, this.thumbprint, this.ttl))
                },
                fromCache: function () {
                    var a, b, d, f;
                    return this.cache ? (b = this.storage.get(c.data), d = this.storage.get(c.protocol), f = this.storage.get(c.thumbprint), a = f !== this.thumbprint || d !== location.protocol, b && !a ? b : null) : null
                },
                fromNetwork: function (a) {
                    function b() {
                        a(!0)
                    }

                    function c(b) {
                        a(null, d.transform(b))
                    }
                    var e, d = this;
                    a && (e = this.prepare(this._settings()), this.transport(e).fail(b).done(c))
                },
                clear: function () {
                    return this.storage.clear(),
                        this
                }
            }), a
        }(),
        r = function () {
            function a(a) {
                this.url = a.url;
                this.prepare = a.prepare;
                this.transform = a.transform;
                this.transport = new g({
                    cache: a.cache,
                    limiter: a.limiter,
                    transport: a.transport
                })
            }
            return b.mixin(a.prototype, {
                _settings: function () {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                get: function (a, b) {
                    function c(a, c) {
                        b(a ? [] : d.transform(c))
                    }
                    var e, d = this;
                    if (b) return a = a || "", e = this.prepare(a, this._settings()), this.transport.get(e, c)
                },
                cancelLastRequest: function () {
                    this.transport.cancel()
                }
            }), a
        }(),
        n = function () {
            function c(c) {
                var e;
                return c ? (e = {
                    url: null,
                    ttl: 864E5,
                    cache: !0,
                    cacheKey: null,
                    thumbprint: "",
                    prepare: b.identity,
                    transform: b.identity,
                    transport: null
                }, c = b.isString(c) ? {
                    url: c
                } : c, c = b.mixin(e, c), !c.url && a.error("prefetch requires url to be set"), c.transform = c.filter || c.transform, c.cacheKey = c.cacheKey || c.url, c.thumbprint = "0.11.1" + c.thumbprint, c.transport = c.transport ? g(c.transport) : a.ajax, c) : null
            }

            function d(c) {
                var d;
                if (c) return d = {
                    url: null,
                    cache: !0,
                    prepare: null,
                    replace: null,
                    wildcard: null,
                    limiter: null,
                    rateLimitBy: "debounce",
                    rateLimitWait: 300,
                    transform: b.identity,
                    transport: null
                }, c = b.isString(c) ? {
                    url: c
                } : c, c = b.mixin(d, c), !c.url && a.error("remote requires url to be set"), c.transform = c.filter || c.transform, c.prepare = e(c), c.limiter = f(c), c.transport = c.transport ? g(c.transport) : a.ajax, delete c.replace, delete c.wildcard, delete c.rateLimitBy, delete c.rateLimitWait, c
            }

            function e(a) {
                function b(a, b) {
                    return b.url = f(b.url, a), b
                }

                function c(a, b) {
                    return b.url = b.url.replace(k, encodeURIComponent(a)), b
                }

                function e(a, b) {
                    return b
                }
                var d, f, k;
                return d = a.prepare, f = a.replace,
                    k = a.wildcard, d ? d : d = f ? b : a.wildcard ? c : e
            }

            function f(a) {
                function c(a) {
                    return function (c) {
                        return b.debounce(c, a)
                    }
                }

                function e(a) {
                    return function (c) {
                        return b.throttle(c, a)
                    }
                }
                var d, f, k;
                return d = a.limiter, f = a.rateLimitBy, k = a.rateLimitWait, d || (d = /^throttle$/i.test(f) ? e(k) : c(k)), d
            }

            function g(c) {
                return function (e) {
                    var d = a.Deferred();
                    return c(e, function (a) {
                        b.defer(function () {
                            d.resolve(a)
                        })
                    }, function (a) {
                        b.defer(function () {
                            d.reject(a)
                        })
                    }), d
                }
            }
            return function (e) {
                var f, k;
                return f = {
                    initialize: !0,
                    identify: b.stringify,
                    datumTokenizer: null,
                    queryTokenizer: null,
                    sufficient: 5,
                    sorter: null,
                    local: [],
                    prefetch: null,
                    remote: null
                }, e = b.mixin(f, e || {}), !e.datumTokenizer && a.error("datumTokenizer is required"), !e.queryTokenizer && a.error("queryTokenizer is required"), k = e.sorter, e.sorter = k ? function (a) {
                    return a.sort(k)
                } : b.identity, e.local = b.isFunction(e.local) ? e.local() : e.local, e.prefetch = c(e.prefetch), e.remote = d(e.remote), e
            }
        }();
    return function () {
        function d(a) {
            a = n(a);
            this.sorter = a.sorter;
            this.identify = a.identify;
            this.sufficient = a.sufficient;
            this.local = a.local;
            this.remote = a.remote ? new r(a.remote) : null;
            this.prefetch = a.prefetch ? new q(a.prefetch) : null;
            this.index = new l({
                identify: this.identify,
                datumTokenizer: a.datumTokenizer,
                queryTokenizer: a.queryTokenizer
            });
            !1 !== a.initialize && this.initialize()
        }
        var f;
        return f = window && window.Bloodhound, d.noConflict = function () {
            return window && (window.Bloodhound = f), d
        }, d.tokenizers = c, b.mixin(d.prototype, {
            __ttAdapter: function () {
                function a(a, b, e) {
                    return c.search(a, b, e)
                }

                function b(a, b) {
                    return c.search(a, b)
                }
                var c =
                    this;
                return this.remote ? a : b
            },
            _loadPrefetch: function () {
                function b(a, b) {
                    return a ? c.reject() : (f.add(b), f.prefetch.store(f.index.serialize()), void c.resolve())
                }
                var c, d, f = this;
                return c = a.Deferred(), this.prefetch ? (d = this.prefetch.fromCache()) ? (this.index.bootstrap(d), c.resolve()) : this.prefetch.fromNetwork(b) : c.resolve(), c.promise()
            },
            _initialize: function () {
                var a = this;
                return this.clear(), (this.initPromise = this._loadPrefetch()).done(function () {
                    a.add(a.local)
                }), this.initPromise
            },
            initialize: function (a) {
                return !this.initPromise ||
                    a ? this._initialize() : this.initPromise
            },
            add: function (a) {
                return this.index.add(a), this
            },
            get: function (a) {
                return a = b.isArray(a) ? a : [].slice.call(arguments), this.index.get(a)
            },
            search: function (a, c, d) {
                function e(a) {
                    var c = [];
                    b.each(a, function (a) {
                        !b.some(f, function (b) {
                            return k.identify(a) === k.identify(b)
                        }) && c.push(a)
                    });
                    d && d(c)
                }
                var f, k = this;
                return f = this.sorter(this.index.search(a)), c(this.remote ? f.slice() : f), this.remote && f.length < this.sufficient ? this.remote.get(a, e) : this.remote && this.remote.cancelLastRequest(),
                    this
            },
            all: function () {
                return this.index.all()
            },
            clear: function () {
                return this.index.reset(), this
            },
            clearPrefetchCache: function () {
                return this.prefetch && this.prefetch.clear(), this
            },
            clearRemoteCache: function () {
                return g.resetCache(), this
            },
            ttAdapter: function () {
                return this.__ttAdapter()
            }
        }), d
    }()
});
! function (a, b) {
    "function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function (a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function (a) {
    var b = function () {
            return {
                isMsie: function () {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function (a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function (a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function (a) {
                    return "string" ==
                        typeof a
                },
                isNumber: function (a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function (a) {
                    return "undefined" == typeof a
                },
                isElement: function (a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function (b) {
                    return b instanceof a
                },
                toStr: function (a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function (b, c) {
                    a.each(b, function (a, b) {
                        return c(b, a)
                    })
                },
                map: a.map,
                filter: a.grep,
                every: function (b, c) {
                    var d = !0;
                    return b ? (a.each(b, function (a, e) {
                        return (d = c.call(null,
                            e, a, b)) ? void 0 : !1
                    }), !!d) : d
                },
                some: function (b, c) {
                    var d = !1;
                    return b ? (a.each(b, function (a, e) {
                        return (d = c.call(null, e, a, b)) ? !1 : void 0
                    }), !!d) : d
                },
                mixin: a.extend,
                identity: function (a) {
                    return a
                },
                clone: function (b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function () {
                    var a = 0;
                    return function () {
                        return a++
                    }
                },
                templatify: function (b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function (a) {
                    setTimeout(a, 0)
                },
                debounce: function (a, b, c) {
                    var d, e;
                    return function () {
                        var f, k, h = this,
                            g = arguments;
                        return f = function () {
                            d =
                                null;
                            c || (e = a.apply(h, g))
                        }, k = c && !d, clearTimeout(d), d = setTimeout(f, b), k && (e = a.apply(h, g)), e
                    }
                },
                throttle: function (a, b) {
                    var c, d, e, f, g, l;
                    return g = 0, l = function () {
                            g = new Date;
                            e = null;
                            f = a.apply(c, d)
                        },
                        function () {
                            var k = new Date,
                                h = b - (k - g);
                            return c = this, d = arguments, 0 >= h ? (clearTimeout(e), e = null, g = k, f = a.apply(c, d)) : e || (e = setTimeout(l, h)), f
                        }
                },
                stringify: function (a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function () {}
            }
        }(),
        c = function () {
            function a(a) {
                var c = {};
                return b.each(a, function (a, b) {
                    c[b] = "." + a
                }), c
            }

            function c() {
                var a = {
                    wrapper: {
                        position: "relative",
                        display: "inline-block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none",
                        opacity: "1"
                    },
                    input: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    inputWithNoHint: {
                        position: "relative",
                        verticalAlign: "top"
                    },
                    menu: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    },
                    ltr: {
                        left: "0",
                        right: "auto"
                    },
                    rtl: {
                        left: "auto",
                        right: " 0"
                    }
                };
                return b.isMsie() && b.mixin(a.input, {
                        backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                    }),
                    a
            }
            var d = {
                wrapper: "twitter-typeahead",
                input: "tt-input",
                hint: "tt-hint",
                menu: "tt-menu",
                dataset: "tt-dataset",
                suggestion: "tt-suggestion",
                selectable: "tt-selectable",
                empty: "tt-empty",
                open: "tt-open",
                cursor: "tt-cursor",
                highlight: "tt-highlight"
            };
            return function (e) {
                var f, k;
                return k = b.mixin({}, d, e), f = {
                    css: c(),
                    classes: k,
                    html: {
                        wrapper: '<span class="' + k.wrapper + '"></span>',
                        menu: '<div class="' + k.menu + '"></div>'
                    },
                    selectors: a(k)
                }, {
                    css: f.css,
                    html: f.html,
                    classes: f.classes,
                    selectors: f.selectors,
                    mixin: function (a) {
                        b.mixin(a,
                            f)
                    }
                }
            }
        }(),
        d = function () {
            function c(b) {
                b && b.el || a.error("EventBus initialized without el");
                this.$el = a(b.el)
            }
            var d;
            return d = {
                render: "rendered",
                cursorchange: "cursorchanged",
                select: "selected",
                autocomplete: "autocompleted"
            }, b.mixin(c.prototype, {
                _trigger: function (b, c) {
                    var d;
                    return d = a.Event("typeahead:" + b), (c = c || []).unshift(d), this.$el.trigger.apply(this.$el, c), d
                },
                before: function (a) {
                    var b, c;
                    return b = [].slice.call(arguments, 1), c = this._trigger("before" + a, b), c.isDefaultPrevented()
                },
                trigger: function (a) {
                    var b;
                    this._trigger(a, [].slice.call(arguments, 1));
                    (b = d[a]) && this._trigger(b, [].slice.call(arguments, 1))
                }
            }), c
        }(),
        f = function () {
            function a(a, b, e, f) {
                if (!e) return this;
                b = b.split(d);
                e = f ? c(e, f) : e;
                for (this._callbacks = this._callbacks || {}; f = b.shift();) this._callbacks[f] = this._callbacks[f] || {
                    sync: [],
                    async: []
                }, this._callbacks[f][a].push(e);
                return this
            }

            function b(a, b, c) {
                return function () {
                    for (var d, e = 0, f = a.length; !d && f > e; e += 1) d = !1 === a[e].apply(b, c);
                    return !d
                }
            }

            function c(a, b) {
                return a.bind ? a.bind(b) : function () {
                    a.apply(b,
                        [].slice.call(arguments, 0))
                }
            }
            var d = /\s+/,
                f = function () {
                    return window.setImmediate ? function (a) {
                        setImmediate(function () {
                            a()
                        })
                    } : function (a) {
                        setTimeout(function () {
                            a()
                        }, 0)
                    }
                }();
            return {
                onSync: function (b, c, d) {
                    return a.call(this, "sync", b, c, d)
                },
                onAsync: function (b, c, d) {
                    return a.call(this, "async", b, c, d)
                },
                off: function (a) {
                    var b;
                    if (!this._callbacks) return this;
                    for (a = a.split(d); b = a.shift();) delete this._callbacks[b];
                    return this
                },
                trigger: function (a) {
                    var c, e, k;
                    if (!this._callbacks) return this;
                    a = a.split(d);
                    for (k = [].slice.call(arguments,
                            1);
                        (c = a.shift()) && (e = this._callbacks[c]);) {
                        var h = b(e.sync, this, [c].concat(k));
                        var g = b(e.async, this, [c].concat(k));
                        h() && f(g)
                    }
                    return this
                }
            }
        }(),
        g = function (a) {
            function c(a, c, d) {
                for (var e, f = [], k = 0, h = a.length; h > k; k++) f.push(b.escapeRegExChars(a[k]));
                return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i")
            }
            var d = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function (e) {
                function f(b) {
                    var c, d, f;
                    return (c = g.exec(b.data)) && (f = a.createElement(e.tagName),
                        e.className && (f.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), f.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(f, d)), !!c
                }

                function k(a, b) {
                    for (var c, d = 0; d < a.childNodes.length; d++) c = a.childNodes[d], 3 === c.nodeType ? d += b(c) ? 1 : 0 : k(c, b)
                }
                var g;
                e = b.mixin({}, d, e);
                e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [e.pattern], g = c(e.pattern, e.caseSensitive, e.wordsOnly), k(e.node, f))
            }
        }(window.document),
        l = function () {
            function c(c, d) {
                c = c || {};
                c.input || a.error("input is missing");
                d.mixin(this);
                this.$hint = a(c.hint);
                this.$input = a(c.input);
                this.query = this.$input.val();
                this.queryWhenFocused = this.hasFocus() ? this.query : null;
                c = this.$input;
                this.$overflowHelper = a('<pre aria-hidden="true"></pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: c.css("font-family"),
                    fontSize: c.css("font-size"),
                    fontStyle: c.css("font-style"),
                    fontVariant: c.css("font-variant"),
                    fontWeight: c.css("font-weight"),
                    wordSpacing: c.css("word-spacing"),
                    letterSpacing: c.css("letter-spacing"),
                    textIndent: c.css("text-indent"),
                    textRendering: c.css("text-rendering"),
                    textTransform: c.css("text-transform")
                }).insertAfter(c);
                this._checkLanguageDirection();
                0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop)
            }
            var d;
            return d = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, c.normalizeQuery = function (a) {
                return b.toStr(a).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, b.mixin(c.prototype, f, {
                _onBlur: function () {
                    this.resetInputValue();
                    this.trigger("blurred")
                },
                _onFocus: function () {
                    this.queryWhenFocused = this.query;
                    this.trigger("focused")
                },
                _onKeydown: function (a) {
                    var b = d[a.which || a.keyCode];
                    this._managePreventDefault(b, a);
                    b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
                },
                _onInput: function () {
                    this._setQuery(this.getInputValue());
                    this.clearHintIfInvalid();
                    this._checkLanguageDirection()
                },
                _managePreventDefault: function (a, b) {
                    switch (a) {
                        case "up":
                        case "down":
                            a = !(b.altKey || b.ctrlKey || b.metaKey || b.shiftKey);
                            break;
                        default:
                            a = !1
                    }
                    a && b.preventDefault()
                },
                _shouldTrigger: function (a,
                    b) {
                    switch (a) {
                        case "tab":
                            a = !(b.altKey || b.ctrlKey || b.metaKey || b.shiftKey);
                            break;
                        default:
                            a = !0
                    }
                    return a
                },
                _checkLanguageDirection: function () {
                    var a = (this.$input.css("direction") || "ltr").toLowerCase();
                    this.dir !== a && (this.dir = a, this.$hint.attr("dir", a), this.trigger("langDirChanged", a))
                },
                _setQuery: function (a, b) {
                    var d;
                    var e = this.query;
                    e = (d = c.normalizeQuery(a) === c.normalizeQuery(e)) ? this.query.length !== a.length : !1;
                    this.query = a;
                    b || d ? !b && e && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged",
                        this.query)
                },
                bind: function () {
                    var a, c, e, f, g = this;
                    return a = b.bind(this._onBlur, this), c = b.bind(this._onFocus, this), e = b.bind(this._onKeydown, this), f = b.bind(this._onInput, this), this.$input.on("blur.tt", a).on("focus.tt", c).on("keydown.tt", e), !b.isMsie() || 9 < b.isMsie() ? this.$input.on("input.tt", f) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function (a) {
                        d[a.which || a.keyCode] || b.defer(b.bind(g._onInput, g, a))
                    }), this
                },
                focus: function () {
                    this.$input.focus()
                },
                blur: function () {
                    this.$input.blur()
                },
                getLangDir: function () {
                    return this.dir
                },
                getQuery: function () {
                    return this.query || ""
                },
                setQuery: function (a, b) {
                    this.setInputValue(a);
                    this._setQuery(a, b)
                },
                hasQueryChangedSinceLastFocus: function () {
                    return this.query !== this.queryWhenFocused
                },
                getInputValue: function () {
                    return this.$input.val()
                },
                setInputValue: function (a) {
                    this.$input.val(a);
                    this.clearHintIfInvalid();
                    this._checkLanguageDirection()
                },
                resetInputValue: function () {
                    this.setInputValue(this.query)
                },
                getHint: function () {
                    return this.$hint.val()
                },
                setHint: function (a) {
                    this.$hint.val(a)
                },
                clearHint: function () {
                    this.setHint("")
                },
                clearHintIfInvalid: function () {
                    var a = this.getInputValue();
                    var b = this.getHint();
                    b = a !== b && 0 === b.indexOf(a);
                    "" !== a && b && !this.hasOverflow() || this.clearHint()
                },
                hasFocus: function () {
                    return this.$input.is(":focus")
                },
                hasOverflow: function () {
                    var a = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
                },
                isCursorAtEnd: function () {
                    var a, c, d;
                    return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(),
                        d.moveStart("character", -a), a === d.text.length) : !0
                },
                destroy: function () {
                    this.$hint.off(".tt");
                    this.$input.off(".tt");
                    this.$overflowHelper.remove();
                    this.$hint = this.$input = this.$overflowHelper = a("<div>")
                }
            }), c
        }(),
        q = function () {
            function c(c, e) {
                c = c || {};
                c.templates = c.templates || {};
                c.templates.notFound = c.templates.notFound || c.templates.empty;
                c.source || a.error("missing source");
                c.node || a.error("missing node");
                c.name && !/^[_a-zA-Z0-9-]+$/.test(c.name) && a.error("invalid dataset name: " + c.name);
                e.mixin(this);
                this.highlight = !!c.highlight;
                this.name = c.name || h();
                this.limit = c.limit || 5;
                this.displayFn = d(c.display || c.displayKey);
                this.templates = k(c.templates, this.displayFn);
                this.source = c.source.__ttAdapter ? c.source.__ttAdapter() : c.source;
                this.async = b.isUndefined(c.async) ? 2 < this.source.length : !!c.async;
                this._resetLastSuggestion();
                this.$el = a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
            }

            function d(a) {
                function c(b) {
                    return b[a]
                }
                return a = a || b.stringify, b.isFunction(a) ? a : c
            }

            function k(c, d) {
                function e(b) {
                    return a("<div>").text(d(b))
                }
                return {
                    notFound: c.notFound && b.templatify(c.notFound),
                    pending: c.pending && b.templatify(c.pending),
                    header: c.header && b.templatify(c.header),
                    footer: c.footer && b.templatify(c.footer),
                    suggestion: c.suggestion || e
                }
            }
            var l, h;
            return l = {
                val: "tt-selectable-display",
                obj: "tt-selectable-object"
            }, h = b.getIdGenerator(), c.extractData = function (b) {
                b = a(b);
                return b.data(l.obj) ? {
                    val: b.data(l.val) || "",
                    obj: b.data(l.obj) || null
                } : null
            }, b.mixin(c.prototype, f, {
                _overwrite: function (a, b) {
                    b = b || [];
                    b.length ? this._renderSuggestions(a, b) :
                        this.async && this.templates.pending ? this._renderPending(a) : !this.async && this.templates.notFound ? this._renderNotFound(a) : this._empty();
                    this.trigger("rendered", this.name, b, !1)
                },
                _append: function (a, b) {
                    b = b || [];
                    b.length && this.$lastSuggestion.length ? this._appendSuggestions(a, b) : b.length ? this._renderSuggestions(a, b) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(a);
                    this.trigger("rendered", this.name, b, !0)
                },
                _renderSuggestions: function (a, b) {
                    var c = this._getSuggestionsFragment(a, b);
                    this.$lastSuggestion = c.children().last();
                    this.$el.html(c).prepend(this._getHeader(a, b)).append(this._getFooter(a, b))
                },
                _appendSuggestions: function (a, b) {
                    a = this._getSuggestionsFragment(a, b);
                    b = a.children().last();
                    this.$lastSuggestion.after(a);
                    this.$lastSuggestion = b
                },
                _renderPending: function (a) {
                    var b = this.templates.pending;
                    this._resetLastSuggestion();
                    b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _renderNotFound: function (a) {
                    var b = this.templates.notFound;
                    this._resetLastSuggestion();
                    b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _empty: function () {
                    this.$el.empty();
                    this._resetLastSuggestion()
                },
                _getSuggestionsFragment: function (c, d) {
                    var e, f = this;
                    return e = document.createDocumentFragment(), b.each(d, function (b) {
                        var d = f._injectQuery(c, b);
                        b = a(f.templates.suggestion(d)).data(l.obj, b).data(l.val, f.displayFn(b)).addClass(f.classes.suggestion + " " + f.classes.selectable);
                        e.appendChild(b[0])
                    }), this.highlight && g({
                        className: this.classes.highlight,
                        node: e,
                        pattern: c
                    }), a(e)
                },
                _getFooter: function (a, b) {
                    return this.templates.footer ?
                        this.templates.footer({
                            query: a,
                            suggestions: b,
                            dataset: this.name
                        }) : null
                },
                _getHeader: function (a, b) {
                    return this.templates.header ? this.templates.header({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _resetLastSuggestion: function () {
                    this.$lastSuggestion = a()
                },
                _injectQuery: function (a, c) {
                    return b.isObject(c) ? b.mixin({
                        _query: a
                    }, c) : c
                },
                update: function (b) {
                    function c(a) {
                        f || (f = !0, a = (a || []).slice(0, d.limit), k = a.length, d._overwrite(b, a), k < d.limit && d.async && d.trigger("asyncRequested", b))
                    }
                    var d = this,
                        e = !1,
                        f = !1,
                        k = 0;
                    this.cancel();
                    this.cancel = function () {
                        e = !0;
                        d.cancel = a.noop;
                        d.async && d.trigger("asyncCanceled", b)
                    };
                    this.source(b, c, function (c) {
                        c = c || [];
                        !e && k < d.limit && (d.cancel = a.noop, k += c.length, d._append(b, c.slice(0, d.limit - k)), d.async && d.trigger("asyncReceived", b))
                    });
                    !f && c([])
                },
                cancel: a.noop,
                clear: function () {
                    this._empty();
                    this.cancel();
                    this.trigger("cleared")
                },
                isEmpty: function () {
                    return this.$el.is(":empty")
                },
                destroy: function () {
                    this.$el = a("<div>")
                }
            }), c
        }(),
        r = function () {
            function c(c, d) {
                var e = this;
                c = c || {};
                c.node || a.error("node is required");
                d.mixin(this);
                this.$node = a(c.node);
                this.query = null;
                this.datasets = b.map(c.datasets, function (b) {
                    var c = e.$node.find(b.node).first();
                    return b.node = c.length ? c : a("<div>").appendTo(e.$node), new q(b, d)
                })
            }
            return b.mixin(c.prototype, f, {
                _onSelectableClick: function (b) {
                    this.trigger("selectableClicked", a(b.currentTarget))
                },
                _onRendered: function (a, b, c, d) {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                    this.trigger("datasetRendered", b, c, d)
                },
                _onCleared: function () {
                    this.$node.toggleClass(this.classes.empty,
                        this._allDatasetsEmpty());
                    this.trigger("datasetCleared")
                },
                _propagate: function () {
                    this.trigger.apply(this, arguments)
                },
                _allDatasetsEmpty: function () {
                    return b.every(this.datasets, function (a) {
                        return a.isEmpty()
                    })
                },
                _getSelectables: function () {
                    return this.$node.find(this.selectors.selectable)
                },
                _removeCursor: function () {
                    var a = this.getActiveSelectable();
                    a && a.removeClass(this.classes.cursor)
                },
                _ensureVisible: function (a) {
                    var b = a.position().top;
                    a = b + a.outerHeight(!0);
                    var c = this.$node.scrollTop();
                    var d = this.$node.height() +
                        parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                    0 > b ? this.$node.scrollTop(c + b) : a > d && this.$node.scrollTop(c + (a - d))
                },
                bind: function () {
                    var a, c = this;
                    return a = b.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, a), b.each(this.datasets, function (a) {
                            a.onSync("asyncRequested", c._propagate, c).onSync("asyncCanceled", c._propagate, c).onSync("asyncReceived", c._propagate, c).onSync("rendered", c._onRendered, c).onSync("cleared", c._onCleared, c)
                        }),
                        this
                },
                isOpen: function () {
                    return this.$node.hasClass(this.classes.open)
                },
                open: function () {
                    this.$node.addClass(this.classes.open)
                },
                close: function () {
                    this.$node.removeClass(this.classes.open);
                    this._removeCursor()
                },
                setLanguageDirection: function (a) {
                    this.$node.attr("dir", a)
                },
                selectableRelativeToCursor: function (a) {
                    var b, c, d, e;
                    return c = this.getActiveSelectable(), b = this._getSelectables(), d = c ? b.index(c) : -1, e = d + a, e = (e + 1) % (b.length + 1) - 1, e = -1 > e ? b.length - 1 : e, -1 === e ? null : b.eq(e)
                },
                setCursor: function (a) {
                    this._removeCursor();
                    (a = a && a.first()) && (a.addClass(this.classes.cursor), this._ensureVisible(a))
                },
                getSelectableData: function (a) {
                    return a && a.length ? q.extractData(a) : null
                },
                getActiveSelectable: function () {
                    var a = this._getSelectables().filter(this.selectors.cursor).first();
                    return a.length ? a : null
                },
                getTopSelectable: function () {
                    var a = this._getSelectables().first();
                    return a.length ? a : null
                },
                update: function (a) {
                    function c(b) {
                        b.update(a)
                    }
                    var d = a !== this.query;
                    return d && (this.query = a, b.each(this.datasets, c)), d
                },
                empty: function () {
                    b.each(this.datasets,
                        function (a) {
                            a.clear()
                        });
                    this.query = null;
                    this.$node.addClass(this.classes.empty)
                },
                destroy: function () {
                    this.$node.off(".tt");
                    this.$node = a("<div>");
                    b.each(this.datasets, function (a) {
                        a.destroy()
                    })
                }
            }), c
        }(),
        n = function () {
            function a() {
                r.apply(this, [].slice.call(arguments, 0))
            }
            var c = r.prototype;
            return b.mixin(a.prototype, r.prototype, {
                open: function () {
                    return !this._allDatasetsEmpty() && this._show(), c.open.apply(this, [].slice.call(arguments, 0))
                },
                close: function () {
                    return this._hide(), c.close.apply(this, [].slice.call(arguments,
                        0))
                },
                _onRendered: function () {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onRendered.apply(this, [].slice.call(arguments, 0))
                },
                _onCleared: function () {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onCleared.apply(this, [].slice.call(arguments, 0))
                },
                setLanguageDirection: function (a) {
                    return this.$node.css("ltr" === a ? this.css.ltr : this.css.rtl), c.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
                },
                _hide: function () {
                    this.$node.hide()
                },
                _show: function () {
                    this.$node.css("display",
                        "block")
                }
            }), a
        }(),
        m = function () {
            function c(c, e) {
                c = c || {};
                c.input || a.error("missing input");
                c.menu || a.error("missing menu");
                c.eventBus || a.error("missing event bus");
                e.mixin(this);
                this.eventBus = c.eventBus;
                this.minLength = b.isNumber(c.minLength) ? c.minLength : 1;
                this.input = c.input;
                this.menu = c.menu;
                this.enabled = !0;
                this.active = !1;
                this.input.hasFocus() && this.activate();
                this.dir = this.input.getLangDir();
                this._hacks();
                this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested",
                    this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
                c = d(this, "activate", "open", "_onFocused");
                e = d(this, "deactivate", "_onBlurred");
                var f = d(this, "isActive", "isOpen", "_onEnterKeyed");
                var g = d(this, "isActive", "isOpen", "_onTabKeyed");
                var k = d(this, "isActive", "_onEscKeyed");
                var l = d(this, "isActive", "open", "_onUpKeyed");
                var m =
                    d(this, "isActive", "open", "_onDownKeyed");
                var n = d(this, "isActive", "isOpen", "_onLeftKeyed");
                var q = d(this, "isActive", "isOpen", "_onRightKeyed");
                var r = d(this, "_openIfActive", "_onQueryChanged");
                var y = d(this, "_openIfActive", "_onWhitespaceChanged");
                this.input.bind().onSync("focused", c, this).onSync("blurred", e, this).onSync("enterKeyed", f, this).onSync("tabKeyed", g, this).onSync("escKeyed", k, this).onSync("upKeyed", l, this).onSync("downKeyed", m, this).onSync("leftKeyed", n, this).onSync("rightKeyed", q, this).onSync("queryChanged",
                    r, this).onSync("whitespaceChanged", y, this).onSync("langDirChanged", this._onLangDirChanged, this)
            }

            function d(a) {
                var c = [].slice.call(arguments, 1);
                return function () {
                    var d = [].slice.call(arguments);
                    b.each(c, function (b) {
                        return a[b].apply(a, d)
                    })
                }
            }
            return b.mixin(c.prototype, {
                _hacks: function () {
                    var c = this.input.$input || a("<div>");
                    var d = this.menu.$node || a("<div>");
                    c.on("blur.tt", function (a) {
                        var e = document.activeElement;
                        var f = d.is(e);
                        e = 0 < d.has(e).length;
                        b.isMsie() && (f || e) && (a.preventDefault(), a.stopImmediatePropagation(),
                            b.defer(function () {
                                c.focus()
                            }))
                    });
                    d.on("mousedown.tt", function (a) {
                        a.preventDefault()
                    })
                },
                _onSelectableClicked: function (a, b) {
                    this.select(b)
                },
                _onDatasetCleared: function () {
                    this._updateHint()
                },
                _onDatasetRendered: function (a, b, c, d) {
                    this._updateHint();
                    this.eventBus.trigger("render", c, d, b)
                },
                _onAsyncRequested: function (a, b, c) {
                    this.eventBus.trigger("asyncrequest", c, b)
                },
                _onAsyncCanceled: function (a, b, c) {
                    this.eventBus.trigger("asynccancel", c, b)
                },
                _onAsyncReceived: function (a, b, c) {
                    this.eventBus.trigger("asyncreceive",
                        c, b)
                },
                _onFocused: function () {
                    this._minLengthMet() && this.menu.update(this.input.getQuery())
                },
                _onBlurred: function () {
                    this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
                },
                _onEnterKeyed: function (a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) && this.select(c) && b.preventDefault()
                },
                _onTabKeyed: function (a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) ? this.select(c) && b.preventDefault(): (c = this.menu.getTopSelectable()) && this.autocomplete(c) && b.preventDefault()
                },
                _onEscKeyed: function () {
                    this.close()
                },
                _onUpKeyed: function () {
                    this.moveCursor(-1)
                },
                _onDownKeyed: function () {
                    this.moveCursor(1)
                },
                _onLeftKeyed: function () {
                    "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onRightKeyed: function () {
                    "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onQueryChanged: function (a, b) {
                    this._minLengthMet(b) ? this.menu.update(b) : this.menu.empty()
                },
                _onWhitespaceChanged: function () {
                    this._updateHint()
                },
                _onLangDirChanged: function (a, b) {
                    this.dir !==
                        b && (this.dir = b, this.menu.setLanguageDirection(b))
                },
                _openIfActive: function () {
                    this.isActive() && this.open()
                },
                _minLengthMet: function (a) {
                    return a = b.isString(a) ? a : this.input.getQuery() || "", a.length >= this.minLength
                },
                _updateHint: function () {
                    var a, c, d, e;
                    var f = this.menu.getTopSelectable();
                    f = this.menu.getSelectableData(f);
                    var g = this.input.getInputValue();
                    !f || b.isBlankString(g) || this.input.hasOverflow() ? this.input.clearHint() : (a = l.normalizeQuery(g), c = b.escapeRegExChars(a), d = new RegExp("^(?:" + c + ")(.+$)", "i"), e =
                        d.exec(f.val), e && this.input.setHint(g + e[1]))
                },
                isEnabled: function () {
                    return this.enabled
                },
                enable: function () {
                    this.enabled = !0
                },
                disable: function () {
                    this.enabled = !1
                },
                isActive: function () {
                    return this.active
                },
                activate: function () {
                    return this.isActive() ? !0 : !this.isEnabled() || this.eventBus.before("active") ? !1 : (this.active = !0, this.eventBus.trigger("active"), !0)
                },
                deactivate: function () {
                    return this.isActive() ? this.eventBus.before("idle") ? !1 : (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0) : !0
                },
                isOpen: function () {
                    return this.menu.isOpen()
                },
                open: function () {
                    return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
                },
                close: function () {
                    return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
                },
                setVal: function (a) {
                    this.input.setQuery(b.toStr(a))
                },
                getVal: function () {
                    return this.input.getQuery()
                },
                select: function (a) {
                    return (a = this.menu.getSelectableData(a)) &&
                        !this.eventBus.before("select", a.obj) ? (this.input.setQuery(a.val, !0), this.eventBus.trigger("select", a.obj), this.close(), !0) : !1
                },
                autocomplete: function (a) {
                    var b, c, d;
                    return b = this.input.getQuery(), c = this.menu.getSelectableData(a), d = c && b !== c.val, d && !this.eventBus.before("autocomplete", c.obj) ? (this.input.setQuery(c.val), this.eventBus.trigger("autocomplete", c.obj), !0) : !1
                },
                moveCursor: function (a) {
                    var b, c, d, e, f;
                    return b = this.input.getQuery(), c = this.menu.selectableRelativeToCursor(a), d = this.menu.getSelectableData(c),
                        e = d ? d.obj : null, f = this._minLengthMet() && this.menu.update(b), f || this.eventBus.before("cursorchange", e) ? !1 : (this.menu.setCursor(c), d ? this.input.setInputValue(d.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", e), !0)
                },
                destroy: function () {
                    this.input.destroy();
                    this.menu.destroy()
                }
            }), c
        }();
    ! function () {
        function f(b, c) {
            b.each(function () {
                var b, d = a(this);
                (b = d.data(A.typeahead)) && c(b, d)
            })
        }

        function e(a, b) {
            return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(q(a)).prop("readonly",
                !0).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            })
        }

        function g(a, b) {
            a.data(A.attrs, {
                dir: a.attr("dir"),
                autocomplete: a.attr("autocomplete"),
                spellcheck: a.attr("spellcheck"),
                style: a.attr("style")
            });
            a.addClass(b.classes.input).attr({
                autocomplete: "off",
                spellcheck: !1
            });
            try {
                !a.attr("dir") && a.attr("dir", "auto")
            } catch (K) {}
            return a
        }

        function q(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            }
        }

        function h(a) {
            var c = a.data(A.www);
            var d = a.parent().filter(c.selectors.wrapper);
            b.each(a.data(A.attrs), function (c, d) {
                b.isUndefined(c) ? a.removeAttr(d) : a.attr(d, c)
            });
            a.removeData(A.typeahead).removeData(A.www).removeData(A.attr).removeClass(c.classes.input);
            d.length && (a.detach().insertAfter(d),
                d.remove())
        }

        function x(c) {
            var d, e;
            return d = b.isJQuery(c) || b.isElement(c), e = d ? a(c).first() : [], e.length ? e : null
        }
        var z = a.fn.typeahead;
        var A = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        var E = {
            initialize: function (f, k) {
                var h;
                return k = b.isArray(k) ? k : [].slice.call(arguments, 1), f = f || {}, h = c(f.classNames), this.each(function () {
                    b.each(k, function (a) {
                        a.highlight = !!f.highlight
                    });
                    var c = a(this);
                    var q = a(h.html.wrapper);
                    var y = x(f.hint);
                    var w = x(f.menu);
                    var C = !1 !== f.hint && !y;
                    var z = !1 !== f.menu && !w;
                    C && (y = e(c,
                        h));
                    z && (w = a(h.html.menu).css(h.css.menu));
                    y && y.val("");
                    c = g(c, h);
                    (C || z) && (q.css(h.css.wrapper), c.css(C ? h.css.input : h.css.inputWithNoHint), c.wrap(q).parent().prepend(C ? y : null).append(z ? w : null));
                    C = z ? n : r;
                    q = new d({
                        el: c
                    });
                    y = new l({
                        hint: y,
                        input: c
                    }, h);
                    w = new C({
                        node: w,
                        datasets: k
                    }, h);
                    w = new m({
                        input: y,
                        menu: w,
                        eventBus: q,
                        minLength: f.minLength
                    }, h);
                    c.data(A.www, h);
                    c.data(A.typeahead, w)
                })
            },
            isEnabled: function () {
                var a;
                return f(this.first(), function (b) {
                    a = b.isEnabled()
                }), a
            },
            enable: function () {
                return f(this, function (a) {
                        a.enable()
                    }),
                    this
            },
            disable: function () {
                return f(this, function (a) {
                    a.disable()
                }), this
            },
            isActive: function () {
                var a;
                return f(this.first(), function (b) {
                    a = b.isActive()
                }), a
            },
            activate: function () {
                return f(this, function (a) {
                    a.activate()
                }), this
            },
            deactivate: function () {
                return f(this, function (a) {
                    a.deactivate()
                }), this
            },
            isOpen: function () {
                var a;
                return f(this.first(), function (b) {
                    a = b.isOpen()
                }), a
            },
            open: function () {
                return f(this, function (a) {
                    a.open()
                }), this
            },
            close: function () {
                return f(this, function (a) {
                    a.close()
                }), this
            },
            select: function (b) {
                var c = !1,
                    d = a(b);
                return f(this.first(), function (a) {
                    c = a.select(d)
                }), c
            },
            autocomplete: function (b) {
                var c = !1,
                    d = a(b);
                return f(this.first(), function (a) {
                    c = a.autocomplete(d)
                }), c
            },
            moveCursor: function (a) {
                var b = !1;
                return f(this.first(), function (c) {
                    b = c.moveCursor(a)
                }), b
            },
            val: function (a) {
                var b;
                return arguments.length ? (f(this, function (b) {
                    b.setVal(a)
                }), this) : (f(this.first(), function (a) {
                    b = a.getVal()
                }), b)
            },
            destroy: function () {
                return f(this, function (a, b) {
                    h(b);
                    a.destroy()
                }), this
            }
        };
        a.fn.typeahead = function (a) {
            return E[a] ? E[a].apply(this,
                [].slice.call(arguments, 1)) : E.initialize.apply(this, arguments)
        };
        a.fn.typeahead.noConflict = function () {
            return a.fn.typeahead = z, this
        }
    }()
});
(function (a, b, c) {
    (function (b) {
        "function" === typeof define && define.amd ? define(["jquery"], b) : "object" === typeof exports ? module.exports = b(require("jquery")) : b(a.jQuery)
    })(function (a) {
        function c(b, c) {
            this.$element = a(b);
            !c || "string" !== a.type(c.delay) && "number" !== a.type(c.delay) || (c.delay = {
                show: c.delay,
                hide: c.delay
            });
            this.options = a.extend({}, d, c);
            this._defaults = d;
            this._name = "webuiPopover";
            this._targetclick = !1;
            this.init();
            l.push(this.$element)
        }
        var d = {
                placement: "auto",
                width: "auto",
                height: "auto",
                trigger: "click",
                style: "",
                delay: {
                    show: null,
                    hide: null
                },
                async: {
                    type: "GET",
                    before: null,
                    success: null,
                    error: null
                },
                cache: !0,
                multi: !1,
                arrow: !0,
                title: "",
                content: "",
                closeable: !1,
                padding: !0,
                url: "",
                type: "html",
                animation: null,
                template: '<div class="webui-popover"><div class="webui-arrow"></div><div class="webui-popover-inner"><a href="#" class="close"></a><h3 class="webui-popover-title"></h3><div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div></div></div>',
                backdrop: !1,
                dismissible: !0,
                onShow: null,
                onHide: null,
                abortXHR: !0,
                autoHide: !1,
                offsetTop: 0,
                offsetLeft: 0,
                iframeOptions: {
                    frameborder: "0",
                    allowtransparency: "true",
                    id: "",
                    name: "",
                    scrolling: "",
                    onload: "",
                    height: "",
                    width: ""
                }
            },
            l = [],
            q = a('<div class="webui-popover-backdrop"></div>'),
            r = 0,
            n = !1,
            m = a(b),
            w = function () {
                for (var a = 0; a < l.length; a++) l[a].webuiPopover("hide");
                m.trigger("hiddenAll.webui.popover")
            };
        c.prototype = {
            init: function () {
                if ("click" === this.getTrigger()) this.$element.off("click touchend").on("click touchend", a.proxy(this.toggle, this));
                else if ("hover" ===
                    this.getTrigger()) this.$element.off("mouseenter mouseleave click").on("mouseenter", a.proxy(this.mouseenterHandler, this)).on("mouseleave", a.proxy(this.mouseleaveHandler, this));
                this._poped = !1;
                this._inited = !0;
                this._opened = !1;
                this._idSeed = r;
                this.options.backdrop && q.appendTo(b.body).hide();
                r++;
                "sticky" === this.getTrigger() && this.show()
            },
            destroy: function () {
                for (var a = -1, b = 0; b < l.length; b++)
                    if (l[b] === this.$element) {
                        a = b;
                        break
                    } l.splice(a, 1);
                this.hide();
                this.$element.data("plugin_webuiPopover", null);
                "click" ===
                this.getTrigger() ? this.$element.off("click") : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave");
                this.$target && this.$target.remove()
            },
            hide: function (b, c) {
                if ((b || "sticky" !== this.getTrigger()) && this._opened) {
                    c && (c.preventDefault(), c.stopPropagation());
                    this.xhr && !0 === this.options.abortXHR && (this.xhr.abort(), this.xhr = null);
                    b = a.Event("hide.webui.popover");
                    this.$element.trigger(b, [this.$target]);
                    if (this.$target) {
                        this.$target.removeClass("in").addClass(this.getHideAnimation());
                        var d = this;
                        setTimeout(function () {
                            d.$target.hide()
                        }, 300)
                    }
                    this.options.backdrop && q.hide();
                    this._opened = !1;
                    this.$element.trigger("hidden.webui.popover", [this.$target]);
                    if (this.options.onHide) this.options.onHide(this.$target)
                }
            },
            resetAutoHide: function () {
                var a = this,
                    b = a.getAutoHide();
                b && (a.autoHideHandler && clearTimeout(a.autoHideHandler), a.autoHideHandler = setTimeout(function () {
                    a.hide()
                }, b))
            },
            toggle: function (a) {
                a && (a.preventDefault(), a.stopPropagation());
                this[this.getTarget().hasClass("in") ? "hide" : "show"]()
            },
            hideAll: function () {
                w()
            },
            show: function () {
                var a = this.getTarget().removeClass().addClass("webui-popover").addClass(this._customTargetClass);
                this.options.multi || this.hideAll();
                if (!this._opened) {
                    this.getCache() && this._poped && "" !== this.content || (this.content = "", this.setTitle(this.getTitle()), this.options.closeable || a.find(".close").off("click").remove(), this.isAsync() ? this.setContentASync(this.options.content) : this.setContent(this.getContent()), a.show());
                    this.displayContent();
                    if (this.options.onShow) this.options.onShow(a);
                    this.bindBodyEvents();
                    this.options.backdrop && q.show();
                    this._opened = !0;
                    this.resetAutoHide()
                }
            },
            displayContent: function () {
                var c = this.getElementPosition(),
                    d = this.getTarget().removeClass().addClass("webui-popover").addClass(this._customTargetClass),
                    f = this.getContentElement();
                var g = a.Event("show.webui.popover");
                this.$element.trigger(g, [d]);
                g = this.$element.data("width") || this.options.width;
                "" === g && (g = this._defaults.width);
                "auto" !== g && d.width(g);
                g = this.$element.data("height") || this.options.height;
                "" === g && (g = this._defaults.height);
                "auto" !== g && f.height(g);
                this.options.style && this.$target.addClass("webui-popover-" + this.options.style);
                this.options.arrow || d.find(".webui-arrow").remove();
                d.detach().css({
                    top: -2E3,
                    left: -2E3,
                    display: "block"
                });
                this.getAnimation() && d.addClass(this.getAnimation());
                d.appendTo(b.body);
                g = this.getPlacement(c);
                this.$element.trigger("added.webui.popover");
                this.initTargetEvents();
                this.options.padding || ("auto" !== this.options.height && f.css("height", f.outerHeight()), this.$target.addClass("webui-no-padding"));
                c =
                    this.getTargetPositin(c, g, d[0].offsetWidth, d[0].offsetHeight);
                this.$target.css(c.position).addClass(g).addClass("in");
                if ("iframe" === this.options.type) {
                    f = d.find("iframe");
                    d = d.width();
                    var l = f.parent().height();
                    "" !== this.options.iframeOptions.width && "auto" !== this.options.iframeOptions.width && (d = this.options.iframeOptions.width);
                    "" !== this.options.iframeOptions.height && "auto" !== this.options.iframeOptions.height && (l = this.options.iframeOptions.height);
                    f.width(d).height(l)
                }
                this.options.arrow || this.$target.css({
                    margin: 0
                });
                this.options.arrow && (d = this.$target.find(".webui-arrow"), d.removeAttr("style"), "left" === g || "right" === g ? d.css({
                    top: this.$target.height() / 2
                }) : ("top" === g || "bottom" === g) && d.css({
                    left: this.$target.width() / 2
                }), c.arrowOffset && (-1 === c.arrowOffset.left || -1 === c.arrowOffset.top ? d.hide() : d.css(c.arrowOffset)));
                this._poped = !0;
                this.$element.trigger("shown.webui.popover", [this.$target])
            },
            isTargetLoaded: function () {
                return 0 === this.getTarget().find("i.glyphicon-refresh").length
            },
            getTriggerElement: function () {
                return this.$element
            },
            getTarget: function () {
                if (!this.$target) {
                    var b = "webuiPopover" + this._idSeed;
                    this.$target = a(this.options.template).attr("id", b).data("trigger-element", this.getTriggerElement());
                    this._customTargetClass = "webui-popover" !== this.$target.attr("class") ? this.$target.attr("class") : null;
                    this.getTriggerElement().attr("data-target", b)
                }
                return this.$target
            },
            getTitleElement: function () {
                return this.getTarget().find(".webui-popover-title")
            },
            getContentElement: function () {
                this.$contentElement || (this.$contentElement = this.getTarget().find(".webui-popover-content"));
                return this.$contentElement
            },
            getTitle: function () {
                return this.$element.attr("data-title") || this.options.title || this.$element.attr("title")
            },
            getUrl: function () {
                return this.$element.attr("data-url") || this.options.url
            },
            getAutoHide: function () {
                return this.$element.attr("data-auto-hide") || this.options.autoHide
            },
            getOffsetTop: function () {
                var a = this.$element.attr("data-offset-top");
                return (isNaN(a) ? 0 : Number(a)) || this.options.offsetTop
            },
            getOffsetLeft: function () {
                var a = this.$element.attr("data-offset-left");
                return (isNaN(a) ?
                    0 : Number(a)) || this.options.offsetLeft
            },
            getCache: function () {
                var a = this.$element.attr("data-cache");
                if ("undefined" !== typeof a) switch (a.toLowerCase()) {
                    case "true":
                    case "yes":
                    case "1":
                        return !0;
                    case "false":
                    case "no":
                    case "0":
                        return !1
                }
                return this.options.cache
            },
            getTrigger: function () {
                return this.$element.attr("data-trigger") || this.options.trigger
            },
            getDelayShow: function () {
                var a = this.$element.attr("data-delay-show");
                return "undefined" !== typeof a ? a : 0 === this.options.delay.show ? 0 : this.options.delay.show || 100
            },
            getHideDelay: function () {
                var a = this.$element.attr("data-delay-hide");
                return "undefined" !== typeof a ? a : 0 === this.options.delay.hide ? 0 : this.options.delay.hide || 100
            },
            getAnimation: function () {
                return this.$element.attr("data-animation") || this.options.animation
            },
            getHideAnimation: function () {
                var a = this.getAnimation();
                return a ? a + "-out" : "out"
            },
            setTitle: function (a) {
                var b = this.getTitleElement();
                a ? b.html(a) : b.remove()
            },
            hasContent: function () {
                return this.getContent()
            },
            getIframe: function () {
                var b = a("<iframe></iframe>").attr("src",
                        this.getUrl()),
                    c = this;
                a.each(this._defaults.iframeOptions, function (a) {
                    "undefined" !== typeof c.options.iframeOptions[a] && b.attr(a, c.options.iframeOptions[a])
                });
                return b
            },
            getContent: function () {
                if (this.getUrl()) switch (this.options.type) {
                    case "iframe":
                        this.content = this.getIframe();
                        break;
                    case "html":
                        try {
                            this.content = a(this.getUrl()), this.content.is(":visible") || this.content.show()
                        } catch (k) {
                            throw Error("Unable to get popover content. Invalid selector specified.");
                        }
                } else if (!this.content) {
                    var b = a.isFunction(this.options.content) ?
                        this.options.content.apply(this.$element[0], [this]) : this.options.content;
                    this.content = this.$element.attr("data-content") || b;
                    this.content || (b = this.$element.next()) && b.hasClass("webui-popover-content") && (this.content = b)
                } return this.content
            },
            setContent: function (a) {
                var b = this.getTarget(),
                    c = this.getContentElement();
                "string" === typeof a ? c.html(a) : a instanceof jQuery && (c.html(""), this.options.cache ? a.removeClass("webui-popover-content").appendTo(c) : a.clone(!0, !0).removeClass("webui-popover-content").appendTo(c));
                this.$target = b
            },
            isAsync: function () {
                return "async" === this.options.type
            },
            setContentASync: function (b) {
                var c = this;
                this.xhr || (this.xhr = a.ajax({
                    url: this.getUrl(),
                    type: this.options.async.type,
                    cache: this.getCache(),
                    beforeSend: function (a) {
                        c.options.async.before && c.options.async.before(c, a)
                    },
                    success: function (d) {
                        c.bindBodyEvents();
                        b && a.isFunction(b) ? c.content = b.apply(c.$element[0], [d]) : c.content = d;
                        c.setContent(c.content);
                        c.getContentElement().removeAttr("style");
                        c.displayContent();
                        c.options.async.success && c.options.async.success(c,
                            d)
                    },
                    complete: function () {
                        c.xhr = null
                    },
                    error: function (a, b) {
                        c.options.async.error && c.options.async.error(c, a, b)
                    }
                }))
            },
            bindBodyEvents: function () {
                this.options.dismissible && "click" === this.getTrigger() && !n && (m.off("keyup.webui-popover").on("keyup.webui-popover", a.proxy(this.escapeHandler, this)), m.off("click.webui-popover touchend.webui-popover").on("click.webui-popover touchend.webui-popover", a.proxy(this.bodyClickHandler, this)))
            },
            mouseenterHandler: function () {
                var a = this;
                a._timeout && clearTimeout(a._timeout);
                a._enterTimeout = setTimeout(function () {
                    a.getTarget().is(":visible") || a.show()
                }, this.getDelayShow())
            },
            mouseleaveHandler: function () {
                var a = this;
                clearTimeout(a._enterTimeout);
                a._timeout = setTimeout(function () {
                    a.hide()
                }, this.getHideDelay())
            },
            escapeHandler: function (a) {
                27 === a.keyCode && this.hideAll()
            },
            bodyClickHandler: function (a) {
                for (var b = n = !0, c = 0; c < l.length; c++) {
                    var d = l[c].data("plugin_webuiPopover");
                    if (d && d._opened) {
                        var e = d.getTarget().offset().left,
                            f = d.getTarget().offset().top,
                            g = d.getTarget().offset().left +
                            d.getTarget().width();
                        d = d.getTarget().offset().top + d.getTarget().height();
                        var m = a;
                        var q = {
                            x: 0,
                            y: 0
                        };
                        if ("touchstart" === m.type || "touchmove" === m.type || "touchend" === m.type || "touchcancel" === m.type) m = m.originalEvent.touches[0] || m.originalEvent.changedTouches[0], q.x = m.pageX, q.y = m.pageY;
                        else if ("mousedown" === m.type || "mouseup" === m.type || "click" === m.type) q.x = m.pageX, q.y = m.pageY;
                        if (q.x >= e && q.x <= g && q.y >= f && q.y <= d) {
                            b = !1;
                            break
                        }
                    }
                }
                b && w()
            },
            initTargetEvents: function () {
                if ("hover" === this.getTrigger()) this.$target.off("mouseenter mouseleave").on("mouseenter",
                    a.proxy(this.mouseenterHandler, this)).on("mouseleave", a.proxy(this.mouseleaveHandler, this));
                this.$target.find(".close").off("click").on("click", a.proxy(this.hide, this, !0))
            },
            getPlacement: function (a) {
                var c = b.documentElement,
                    d = b.body,
                    e = c.clientWidth,
                    f = c.clientHeight,
                    g = Math.max(0, a.left - Math.max(d.scrollLeft, c.scrollLeft));
                c = Math.max(0, a.top - Math.max(d.scrollTop, c.scrollTop));
                a = "function" === typeof this.options.placement ? this.options.placement.call(this, this.getTarget()[0], this.$element[0]) : this.$element.data("placement") ||
                    this.options.placement;
                d = "horizontal" === a;
                var l = "vertical" === a;
                "auto" === a || d || l ? a = g < e / 3 ? c < f / 3 ? d ? "right-bottom" : "bottom-right" : c < 2 * f / 3 ? l ? c <= f / 2 ? "bottom-right" : "top-right" : "right" : d ? "right-top" : "top-right" : g < 2 * e / 3 ? c < f / 3 ? d ? g <= e / 2 ? "right-bottom" : "left-bottom" : "bottom" : c < 2 * f / 3 ? d ? g <= e / 2 ? "right" : "left" : c <= f / 2 ? "bottom" : "top" : d ? g <= e / 2 ? "right-top" : "left-top" : "top" : c < f / 3 ? d ? "left-bottom" : "bottom-left" : c < 2 * f / 3 ? l ? c <= f / 2 ? "bottom-left" : "top-left" : "left" : d ? "left-top" : "top-left" : "auto-top" === a ? a = g < e / 3 ? "top-right" :
                    g < 2 * e / 3 ? "top" : "top-left" : "auto-bottom" === a ? a = g < e / 3 ? "bottom-right" : g < 2 * e / 3 ? "bottom" : "bottom-left" : "auto-left" === a ? a = c < f / 3 ? "left-top" : c < 2 * f / 3 ? "left" : "left-bottom" : "auto-right" === a && (a = c < f / 3 ? "right-top" : c < 2 * f / 3 ? "right" : "right-bottom");
                return a
            },
            getElementPosition: function () {
                return a.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                })
            },
            getTargetPositin: function (a, c, d, f) {
                var e = b.documentElement,
                    g = b.body,
                    h = e.clientWidth,
                    k = e.clientHeight,
                    l = this.$element.outerWidth(),
                    m = this.$element.outerHeight(),
                    q = {},
                    n = null,
                    r = this.options.arrow ? 20 : 0,
                    w = l < r + 10 ? r : 0;
                r = m < r + 10 ? r : 0;
                var y = 0 < a.left + a.width / 2 - w;
                h = a.left + a.width / 2 + w < h + Math.max(g.scrollLeft, e.scrollLeft);
                var D = 0 < a.top + a.height / 2 - r;
                e = a.top + a.height / 2 + r < k + Math.max(g.scrollTop, e.scrollTop);
                switch (c) {
                    case "bottom":
                        q = {
                            top: a.top + a.height,
                            left: a.left + a.width / 2 - d / 2
                        };
                        break;
                    case "top":
                        q = {
                            top: a.top - f,
                            left: a.left + a.width / 2 - d / 2
                        };
                        break;
                    case "left":
                        q = {
                            top: a.top + a.height / 2 - f / 2,
                            left: a.left - d
                        };
                        break;
                    case "right":
                        q = {
                            top: a.top + a.height / 2 - f /
                                2,
                            left: a.left + a.width
                        };
                        break;
                    case "top-right":
                        q = {
                            top: a.top - f,
                            left: y ? a.left - w : 10
                        };
                        n = {
                            left: y ? Math.min(l, d) / 2 + w : -2E3
                        };
                        break;
                    case "top-left":
                        q = {
                            top: a.top - f,
                            left: a.left - d + a.width + (h ? w : -10)
                        };
                        n = {
                            left: h ? d - Math.min(l, d) / 2 - w : -2E3
                        };
                        break;
                    case "bottom-right":
                        q = {
                            top: a.top + a.height,
                            left: y ? a.left - w : 10
                        };
                        n = {
                            left: y ? Math.min(l, d) / 2 + w : -2E3
                        };
                        break;
                    case "bottom-left":
                        q = {
                            top: a.top + a.height,
                            left: a.left - d + a.width + (h ? w : -10)
                        };
                        n = {
                            left: h ? d - Math.min(l, d) / 2 - w : -2E3
                        };
                        break;
                    case "right-top":
                        q = {
                            top: a.top - f + a.height + (e ? r : -10),
                            left: a.left +
                                a.width
                        };
                        n = {
                            top: e ? f - Math.min(m, f) / 2 - r : -2E3
                        };
                        break;
                    case "right-bottom":
                        q = {
                            top: D ? a.top - r : 10,
                            left: a.left + a.width
                        };
                        n = {
                            top: D ? Math.min(m, f) / 2 + r : -2E3
                        };
                        break;
                    case "left-top":
                        q = {
                            top: a.top - f + a.height + (e ? r : -10),
                            left: a.left - d
                        };
                        n = {
                            top: e ? f - Math.min(m, f) / 2 - r : -2E3
                        };
                        break;
                    case "left-bottom":
                        q = {
                            top: D ? a.top - r : 10,
                            left: a.left - d
                        }, n = {
                            top: D ? Math.min(m, f) / 2 + r : -2E3
                        }
                }
                q.top += this.getOffsetTop();
                q.left += this.getOffsetLeft();
                return {
                    position: q,
                    arrowOffset: n
                }
            }
        };
        a.fn.webuiPopover = function (b, d) {
            var e = [],
                f = this.each(function () {
                    var f =
                        a.data(this, "plugin_webuiPopover");
                    f ? "destroy" === b ? f.destroy() : "string" === typeof b && e.push(f[b]()) : (b ? "string" === typeof b ? "destroy" === b || d || (f = new c(this, null), e.push(f[b]())) : "object" === typeof b && (f = new c(this, b)) : f = new c(this, null), a.data(this, "plugin_webuiPopover", f))
                });
            return e.length ? e : f
        }
    })
})(window, document);
(function () {
    var a = {}.hasOwnProperty,
        b = function (b, c) {
            function d() {
                this.constructor = b
            }
            for (var f in c) a.call(c, f) && (b[f] = c[f]);
            d.prototype = c.prototype;
            b.prototype = new d;
            b.__super__ = c.prototype;
            return b
        };
    var c = jQuery;
    var d = function (a) {
        function d() {
            return d.__super__.constructor.apply(this, arguments)
        }
        b(d, a);
        d.prototype.template = function (a) {
            var b = d.__super__.template.apply(this, arguments);
            b.append(c('<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>'));
            return b
        };
        return d
    }(window.Messenger.Message);
    window.Messenger.themes.future = {
        Message: d
    }
}).call(this);
(function (a) {
    function b(b, d, e) {
        var f = this;
        return this.on("click.pjax", b, function (b) {
            var g = a.extend({}, k(d, e));
            g.container || (g.container = a(this).attr("data-pjax") || f);
            c(b, g)
        })
    }

    function c(b, c, d) {
        d = k(c, d);
        c = b.currentTarget;
        if ("A" !== c.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(1 < b.which || b.metaKey || b.ctrlKey || b.shiftKey || b.altKey || location.protocol !== c.protocol || location.hostname !== c.hostname || -1 < c.href.indexOf("#") && c.href.replace(/#.*/, "") == location.href.replace(/#.*/,
                "") || b.isDefaultPrevented())) {
            var e = {
                url: c.href,
                container: a(c).attr("data-pjax"),
                target: c
            };
            d = a.extend({}, e, d);
            e = a.Event("pjax:click");
            a(c).trigger(e, [d]);
            e.isDefaultPrevented() || (f(d), b.preventDefault(), a(c).trigger("pjax:clicked", [d]))
        }
    }

    function d(b, c, d) {
        d = k(c, d);
        c = b.currentTarget;
        var e = a(c);
        if ("FORM" !== c.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
        e = {
            type: (e.attr("method") || "GET").toUpperCase(),
            url: e.attr("action"),
            container: e.attr("data-pjax"),
            target: c
        };
        if ("GET" !== e.type &&
            void 0 !== window.FormData) e.data = new FormData(c), e.processData = !1, e.contentType = !1;
        else {
            if (a(c).find(":file").length) return;
            e.data = a(c).serializeArray()
        }
        f(a.extend({}, e, d));
        b.preventDefault()
    }

    function f(b) {
        function c(b, c, e) {
            e || (e = {});
            e.relatedTarget = d;
            b = a.Event(b, e);
            h.trigger(b, c);
            return !b.isDefaultPrevented()
        }
        b = a.extend(!0, {}, a.ajaxSettings, f.defaults, b);
        a.isFunction(b.url) && (b.url = b.url());
        var d = b.target,
            g = e(b.url).hash,
            h = b.context = y(b.container);
        b.data || (b.data = {});
        a.isArray(b.data) ? b.data.push({
            name: "_pjax",
            value: h.selector
        }) : b.data._pjax = h.selector;
        var k;
        b.beforeSend = function (a, d) {
            "GET" !== d.type && (d.timeout = 0);
            a.setRequestHeader("X-PJAX", "true");
            a.setRequestHeader("X-PJAX-Container", h.selector);
            if (!c("pjax:beforeSend", [a, d])) return !1;
            0 < d.timeout && (k = setTimeout(function () {
                c("pjax:timeout", [a, b]) && a.abort("timeout")
            }, d.timeout), d.timeout = 0);
            d = e(d.url);
            g && (d.hash = g);
            b.requestUrl = w(d)
        };
        b.complete = function (a, d) {
            k && clearTimeout(k);
            c("pjax:complete", [a, d, b]);
            c("pjax:end", [a, b])
        };
        b.error = function (a, d, e) {
            var f =
                x("", a, b);
            a = c("pjax:error", [a, d, e, b]);
            "GET" == b.type && "abort" !== d && a && l(f.url)
        };
        b.success = function (d, k, m) {
            var q = f.state,
                u = "function" === typeof a.pjax.defaults.version ? a.pjax.defaults.version() : a.pjax.defaults.version,
                n = m.getResponseHeader("X-PJAX-Version"),
                t = x(d, m, b),
                r = e(t.url);
            g && (r.hash = g, t.url = r.href);
            if (u && n && u !== n) l(t.url);
            else if (t.contents) {
                f.state = {
                    id: b.id || (new Date).getTime(),
                    url: t.url,
                    title: t.title,
                    container: h.selector,
                    fragment: b.fragment,
                    timeout: b.timeout
                };
                (b.push || b.replace) && window.history.replaceState(f.state,
                    t.title, t.url);
                if (a.contains(b.container, document.activeElement)) try {
                    document.activeElement.blur()
                } catch (O) {}
                t.title && (document.title = t.title);
                c("pjax:beforeReplace", [t.contents, b], {
                    state: f.state,
                    previousState: q
                });
                h.html(t.contents);
                (q = h.find("input[autofocus], textarea[autofocus]").last()[0]) && document.activeElement !== q && q.focus();
                z(t.scripts);
                t = b.scrollTo;
                g && (q = decodeURIComponent(g.slice(1)), q = document.getElementById(q) || document.getElementsByName(q)[0]) && (t = a(q).offset().top);
                "number" == typeof t &&
                    a(window).scrollTop(t);
                c("pjax:success", [d, k, m, b])
            } else l(t.url)
        };
        f.state || (f.state = {
            id: (new Date).getTime(),
            url: window.location.href,
            title: document.title,
            container: h.selector,
            fragment: b.fragment,
            timeout: b.timeout
        }, window.history.replaceState(f.state, document.title));
        n(f.xhr);
        f.options = b;
        var q = f.xhr = a.ajax(b);
        0 < q.readyState && (b.push && !b.replace && (A(f.state.id, m(h)), window.history.pushState(null, "", b.requestUrl)), c("pjax:start", [q, b]), c("pjax:send", [q, b]));
        return f.xhr
    }

    function g(b, c) {
        return f(a.extend({
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
        }, k(b, c)))
    }

    function l(a) {
        window.history.replaceState(null, "", f.state.url);
        window.location.replace(a)
    }

    function q(b) {
        F || n(f.xhr);
        var c = f.state,
            d = b.state;
        if (d && d.container) {
            if (F && J == d.url) return;
            if (c) {
                if (c.id === d.id) return;
                var e = c.id < d.id ? "forward" : "back"
            }
            var g = H[d.id] || [];
            b = a(g[0] || d.container);
            g = g[1];
            if (b.length) {
                if (c) {
                    var h = e,
                        k = c.id,
                        q = m(b);
                    H[k] = q;
                    "forward" === h ? (h = I, q = D) : (h = D, q = I);
                    h.push(k);
                    (k = q.pop()) && delete H[k];
                    E(h, f.defaults.maxCacheLength)
                }
                e = a.Event("pjax:popstate", {
                    state: d,
                    direction: e
                });
                b.trigger(e);
                e = {
                    id: d.id,
                    url: d.url,
                    container: b,
                    push: !1,
                    fragment: d.fragment,
                    timeout: d.timeout,
                    scrollTo: !1
                };
                g ? (b.trigger("pjax:start", [null, e]), f.state = d, d.title && (document.title = d.title), c = a.Event("pjax:beforeReplace", {
                    state: d,
                    previousState: c
                }), b.trigger(c, [g, e]), b.html(g), b.trigger("pjax:end", [null, e])) : f(e);
                b[0].offsetHeight
            } else l(location.href)
        }
        F = !1
    }

    function r(b) {
        var c = a.isFunction(b.url) ? b.url() : b.url,
            d = b.type ? b.type.toUpperCase() : "GET",
            e = a("<form>", {
                method: "GET" === d ? "GET" : "POST",
                action: c,
                style: "display:none"
            });
        "GET" !== d && "POST" !== d && e.append(a("<input>", {
            type: "hidden",
            name: "_method",
            value: d.toLowerCase()
        }));
        b = b.data;
        if ("string" === typeof b) a.each(b.split("&"), function (b, c) {
            b = c.split("=");
            e.append(a("<input>", {
                type: "hidden",
                name: b[0],
                value: b[1]
            }))
        });
        else if (a.isArray(b)) a.each(b, function (b, c) {
            e.append(a("<input>", {
                type: "hidden",
                name: c.name,
                value: c.value
            }))
        });
        else if ("object" === typeof b)
            for (var f in b) e.append(a("<input>", {
                type: "hidden",
                name: f,
                value: b[f]
            }));
        a(document.body).append(e);
        e.submit()
    }

    function n(b) {
        b && 4 > b.readyState && (b.onreadystatechange = a.noop, b.abort())
    }

    function m(a) {
        var b = a.clone();
        b.find("script").each(function () {
            this.src || jQuery._data(this, "globalEval", !1)
        });
        return [a.selector, b.contents()]
    }

    function w(a) {
        a.search = a.search.replace(/([?&])(_pjax|_)=[^&]*/g, "");
        return a.href.replace(/\?($|#)/, "$1")
    }

    function e(a) {
        var b = document.createElement("a");
        b.href = a;
        return b
    }

    function k(b, c) {
        b && c ? c.container = b : c = a.isPlainObject(b) ? b : {
            container: b
        };
        c.container && (c.container = y(c.container));
        return c
    }

    function y(b) {
        b = a(b);
        if (b.length) {
            if ("" !== b.selector && b.context === document) return b;
            if (b.attr("id")) return a("#" + b.attr("id"));
            throw "cant get selector for pjax container!";
        }
        throw "no pjax container for " + b.selector;
    }

    function h(a, b) {
        return a.filter(b).add(a.find(b))
    }

    function x(b, c, d) {
        var f = {},
            g = /<html/i.test(b);
        c = c.getResponseHeader("X-PJAX-URL");
        f.url = c ? w(e(c)) : d.requestUrl;
        g ? (c = a(a.parseHTML(b.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0], document, !0)), b = a(a.parseHTML(b.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0],
            document, !0))) : c = b = a(a.parseHTML(b, document, !0));
        if (0 === b.length) return f;
        f.title = h(c, "title").last().text();
        d.fragment ? (g = "body" === d.fragment ? b : h(b, d.fragment).first(), g.length && (f.contents = "body" === d.fragment ? g : g.contents(), f.title || (f.title = g.attr("title") || g.data("title")))) : g || (f.contents = b);
        f.contents && (f.contents = f.contents.not(function () {
            return a(this).is("title")
        }), f.contents.find("title").remove(), f.scripts = h(f.contents, "script[src]").remove(), f.contents = f.contents.not(f.scripts));
        f.title &&
            (f.title = a.trim(f.title));
        return f
    }

    function z(b) {
        if (b) {
            var c = a("script[src]");
            b.each(function () {
                var b = this.src;
                if (!c.filter(function () {
                        return this.src === b
                    }).length) {
                    var d = document.createElement("script"),
                        e = a(this).attr("type");
                    e && (d.type = e);
                    d.src = a(this).attr("src");
                    document.head.appendChild(d)
                }
            })
        }
    }

    function A(a, b) {
        H[a] = b;
        I.push(a);
        E(D, 0);
        E(I, f.defaults.maxCacheLength)
    }

    function E(a, b) {
        for (; a.length > b;) delete H[a.shift()]
    }

    function C() {
        return a("meta").filter(function () {
            var b = a(this).attr("http-equiv");
            return b && "X-PJAX-VERSION" === b.toUpperCase()
        }).attr("content")
    }

    function B() {
        a.fn.pjax = b;
        a.pjax = f;
        a.pjax.enable = a.noop;
        a.pjax.disable = K;
        a.pjax.click = c;
        a.pjax.submit = d;
        a.pjax.reload = g;
        a.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: C
        };
        a(window).on("popstate.pjax", q)
    }

    function K() {
        a.fn.pjax = function () {
            return this
        };
        a.pjax = r;
        a.pjax.enable = B;
        a.pjax.disable = a.noop;
        a.pjax.click = a.noop;
        a.pjax.submit = a.noop;
        a.pjax.reload = function () {
            window.location.reload()
        };
        a(window).off("popstate.pjax", q)
    }
    var F = !0,
        J = window.location.href,
        G = window.history.state;
    G && G.container && (f.state = G);
    "state" in window.history && (F = !1);
    var H = {},
        D = [],
        I = [];
    0 > a.inArray("state", a.event.props) && a.event.props.push("state");
    a.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);
    a.support.pjax ? B() : K()
})(jQuery);
(function (a) {
    a.extend(a.fn, {
        validate: function (b) {
            if (this.length) {
                var c = a.data(this[0], "validator");
                if (c) return c;
                this.attr("novalidate", "novalidate");
                c = new a.validator(b, this[0]);
                a.data(this[0], "validator", c);
                c.settings.onsubmit && (this.validateDelegate(":submit", "click", function (b) {
                    c.settings.submitHandler && (c.submitButton = b.target);
                    a(b.target).hasClass("cancel") && (c.cancelSubmit = !0);
                    void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0)
                }), this.submit(function (b) {
                    function d() {
                        var d;
                        return c.settings.submitHandler ?
                            (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0
                    }
                    c.settings.debug && b.preventDefault();
                    if (c.cancelSubmit) return c.cancelSubmit = !1, d();
                    if (c.form()) return c.pendingRequest ? (c.formSubmitted = !0, !1) : d();
                    c.focusInvalid();
                    return !1
                }));
                return c
            }
            b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
        },
        valid: function () {
            if (a(this[0]).is("form")) return this.validate().form();
            var b = !0,
                c = a(this[0].form).validate();
            this.each(function () {
                b = b && c.element(this)
            });
            return b
        },
        removeAttrs: function (b) {
            var c = {},
                d = this;
            a.each(b.split(/\s/), function (a, b) {
                c[b] = d.attr(b);
                d.removeAttr(b)
            });
            return c
        },
        rules: function (b, c) {
            var d = this[0];
            if (b) {
                var f = a.data(d.form, "validator").settings,
                    g = f.rules,
                    l = a.validator.staticRules(d);
                switch (b) {
                    case "add":
                        a.extend(l, a.validator.normalizeRule(c));
                        delete l.messages;
                        g[d.name] = l;
                        c.messages &&
                            (f.messages[d.name] = a.extend(f.messages[d.name], c.messages));
                        break;
                    case "remove":
                        if (!c) return delete g[d.name], l;
                        var q = {};
                        a.each(c.split(/\s/), function (a, b) {
                            q[b] = l[b];
                            delete l[b]
                        });
                        return q
                }
            }
            b = a.validator.normalizeRules(a.extend({}, a.validator.classRules(d), a.validator.attributeRules(d), a.validator.dataRules(d), a.validator.staticRules(d)), d);
            b.required && (c = b.required, delete b.required, b = a.extend({
                required: c
            }, b));
            return b
        }
    });
    a.extend(a.expr[":"], {
        blank: function (b) {
            return !a.trim("" + a(b).val())
        },
        filled: function (b) {
            return !!a.trim("" +
                a(b).val())
        },
        unchecked: function (b) {
            return !a(b).prop("checked")
        }
    });
    a.validator = function (b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b);
        this.currentForm = c;
        this.init()
    };
    a.validator.format = function (b, c) {
        if (1 === arguments.length) return function () {
            var c = a.makeArray(arguments);
            c.unshift(b);
            return a.validator.format.apply(this, c)
        };
        2 < arguments.length && c.constructor !== Array && (c = a.makeArray(arguments).slice(1));
        c.constructor !== Array && (c = [c]);
        a.each(c, function (a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}",
                "g"), function () {
                return c
            })
        });
        return b
    };
    a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (a, c) {
                this.lastActive = a;
                this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(a)).hide())
            },
            onfocusout: function (a, c) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function (a, c) {
                (9 !== c.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a)
            },
            onclick: function (a, c) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function (b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function (b,
                c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function (b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function b(b) {
                    var c = a.data(this[0].form, "validator"),
                        d = "on" + b.type.replace(/^validate/, "");
                    c.settings[d] && c.settings[d].call(c, this[0], b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
                this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var c = this.groups = {};
                a.each(this.settings.groups, function (b, d) {
                    "string" === typeof d && (d = d.split(/\s/));
                    a.each(d, function (a, d) {
                        c[d] = b
                    })
                });
                var d = this.settings.rules;
                a.each(d, function (b, c) {
                    d[b] = a.validator.normalizeRule(c)
                });
                a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ",
                    "focusin focusout keyup", b).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", b);
                this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function () {
                this.checkForm();
                a.extend(this.submitted, this.errorMap);
                this.invalid = a.extend({}, this.errorMap);
                this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid()
            },
            checkForm: function () {
                this.prepareForm();
                for (var a = 0, c = this.currentElements =
                        this.elements(); c[a]; a++) this.check(c[a]);
                return this.valid()
            },
            element: function (b) {
                this.lastElement = b = this.validationTargetFor(this.clean(b));
                this.prepareElement(b);
                this.currentElements = a(b);
                var c = !1 !== this.check(b);
                c ? delete this.invalid[b.name] : this.invalid[b.name] = !0;
                this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers));
                this.showErrors();
                return c
            },
            showErrors: function (b) {
                if (b) {
                    a.extend(this.errorMap, b);
                    this.errorList = [];
                    for (var c in b) this.errorList.push({
                        message: b[c],
                        element: this.findByName(c)[0]
                    });
                    this.successList = a.grep(this.successList, function (a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function () {
                a.fn.resetForm && a(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            },
            objectLength: function (a) {
                var b =
                    0,
                    d;
                for (d in a) b++;
                return b
            },
            hideErrors: function () {
                this.addWrapper(this.toHide).hide()
            },
            valid: function () {
                return 0 === this.size()
            },
            size: function () {
                return this.errorList.length
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function () {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function (a) {
                        return a.element.name === b.name
                    }).length &&
                    b
            },
            elements: function () {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this);
                    return this.name in c || !b.objectLength(a(this).rules()) ? !1 : c[this.name] = !0
                })
            },
            clean: function (b) {
                return a(b)[0]
            },
            errors: function () {
                var b = this.settings.errorClass.replace(" ", ".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = a([]);
                this.toHide = a([]);
                this.currentElements = a([])
            },
            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function (a) {
                this.reset();
                this.toHide = this.errorsFor(a)
            },
            elementValue: function (b) {
                var c = a(b).attr("type"),
                    d = a(b).val();
                return "radio" === c || "checkbox" === c ? a("input[name='" + a(b).attr("name") + "']:checked").val() : "string" === typeof d ? d.replace(/\r/g, "") : d
            },
            check: function (b) {
                b =
                    this.validationTargetFor(this.clean(b));
                var c = a(b).rules(),
                    d = !1,
                    f = this.elementValue(b),
                    g;
                for (g in c) {
                    var l = {
                        method: g,
                        parameters: c[g]
                    };
                    try {
                        var q = a.validator.methods[g].call(this, f, b, l.parameters);
                        if ("dependency-mismatch" === q) d = !0;
                        else {
                            d = !1;
                            if ("pending" === q) {
                                this.toHide = this.toHide.not(this.errorsFor(b));
                                return
                            }
                            if (!q) return this.formatAndAdd(b, l), !1
                        }
                    } catch (r) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + l.method + "' method.",
                            r), r;
                    }
                }
                if (!d) return this.objectLength(c) && this.successList.push(b), !0
            },
            customDataMessage: function (b, c) {
                return a(b).data("msg-" + c.toLowerCase()) || b.attributes && a(b).attr("data-msg-" + c.toLowerCase())
            },
            customMessage: function (a, c) {
                return (a = this.settings.messages[a]) && (a.constructor === String ? a : a[c])
            },
            findDefined: function () {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function (b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b,
                    c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            },
            formatAndAdd: function (b, c) {
                var d = this.defaultMessage(b, c.method),
                    f = /\$?\{(\d+)\}/g;
                "function" === typeof d ? d = d.call(this, c.parameters, b) : f.test(d) && (d = a.validator.format(d.replace(f, "{$1}"), c.parameters));
                this.errorList.push({
                    message: d,
                    element: b
                });
                this.errorMap[b.name] = d;
                this.submitted[b.name] = d
            },
            addWrapper: function (a) {
                this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper)));
                return a
            },
            defaultShowErrors: function () {
                var a;
                for (a = 0; this.errorList[a]; a++) {
                    var c = this.errorList[a];
                    this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(c.element, c.message)
                }
                this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                if (this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, c = this.validElements(); c[a]; a++) this.settings.unhighlight.call(this,
                        c[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function () {
                return a(this.errorList).map(function () {
                    return this.element
                })
            },
            showLabel: function (b, c) {
                var d = this.errorsFor(b);
                d.length ? (d.removeClass(this.settings.validClass).addClass(this.settings.errorClass), d.html(c)) : (d = a("<" + this.settings.errorElement +
                    ">").attr("for", this.idOrName(b)).addClass(this.settings.errorClass).html(c || ""), this.settings.wrapper && (d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b)));
                !c && this.settings.success && (d.text(""), "string" === typeof this.settings.success ? d.addClass(this.settings.success) : this.settings.success(d, b));
                this.toShow = this.toShow.add(d)
            },
            errorsFor: function (b) {
                var c = this.idOrName(b);
                return this.errors().filter(function () {
                    return a(this).attr("for") === c
                })
            },
            idOrName: function (a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function (a) {
                this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]);
                return a
            },
            checkable: function (a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function (b) {
                return a(this.currentForm).find("[name='" + b + "']")
            },
            getLength: function (b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected",
                            c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function (a, c) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, c) : !0
            },
            dependTypes: {
                "boolean": function (a, c) {
                    return a
                },
                string: function (b, c) {
                    return !!a(b, c.form).length
                },
                "function": function (a, c) {
                    return a(c)
                }
            },
            optional: function (b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function (a) {
                this.pending[a.name] ||
                    (this.pendingRequest++, this.pending[a.name] = !0)
            },
            stopRequest: function (b, c) {
                this.pendingRequest--;
                0 > this.pendingRequest && (this.pendingRequest = 0);
                delete this.pending[b.name];
                c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function (b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function (b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function (b) {
            var c = {};
            (b = a(b).attr("class")) && a.each(b.split(" "), function () {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            });
            return c
        },
        attributeRules: function (b) {
            var c = {};
            b = a(b);
            var d = b[0].getAttribute("type"),
                f;
            for (f in a.validator.methods) {
                if ("required" === f) {
                    var g = b.get(0).getAttribute(f);
                    "" === g && (g = !0);
                    g = !!g
                } else g = b.attr(f);
                /min|max/.test(f) && (null === d || /number|range|text/.test(d)) && (g = Number(g));
                g ? c[f] = g : d === f && "range" !== d && (c[f] = !0)
            }
            c.maxlength && /-1|2147483647|524288/.test(c.maxlength) && delete c.maxlength;
            return c
        },
        dataRules: function (b) {
            var c, d = {},
                f = a(b);
            for (c in a.validator.methods) b = f.data("rule-" + c.toLowerCase()),
                void 0 !== b && (d[c] = b);
            return d
        },
        staticRules: function (b) {
            var c = {},
                d = a.data(b.form, "validator");
            d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {});
            return c
        },
        normalizeRules: function (b, c) {
            a.each(b, function (d, f) {
                if (!1 === f) delete b[d];
                else if (f.param || f.depends) {
                    var g = !0;
                    switch (typeof f.depends) {
                        case "string":
                            g = !!a(f.depends, c.form).length;
                            break;
                        case "function":
                            g = f.depends.call(c, c)
                    }
                    g ? b[d] = void 0 !== f.param ? f.param : !0 : delete b[d]
                }
            });
            a.each(b, function (d, f) {
                b[d] = a.isFunction(f) ? f(c) :
                    f
            });
            a.each(["minlength", "maxlength"], function () {
                b[this] && (b[this] = Number(b[this]))
            });
            a.each(["rangelength", "range"], function () {
                if (b[this])
                    if (a.isArray(b[this])) b[this] = [Number(b[this][0]), Number(b[this][1])];
                    else if ("string" === typeof b[this]) {
                    var c = b[this].split(/[\s,]+/);
                    b[this] = [Number(c[0]), Number(c[1])]
                }
            });
            a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength));
            return b
        },
        normalizeRule: function (b) {
            if ("string" === typeof b) {
                var c = {};
                a.each(b.split(/\s/), function () {
                    c[this] = !0
                });
                b = c
            }
            return b
        },
        addMethod: function (b, c, d) {
            a.validator.methods[b] = c;
            a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b];
            3 > c.length && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function (b, c, d) {
                return this.depend(d, c) ? "select" === c.nodeName.toLowerCase() ? (b = a(c).val()) && 0 < b.length : this.checkable(c) ? 0 < this.getLength(b, c) : 0 < a.trim(b).length : "dependency-mismatch"
            },
            email: function (a, c) {
                return this.optional(c) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)
            },
            url: function (a, c) {
                return this.optional(c) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            },
            date: function (a, c) {
                return this.optional(c) || !/Invalid|NaN/.test((new Date(a)).toString())
            },
            dateISO: function (a, c) {
                return this.optional(c) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)
            },
            number: function (a, c) {
                return this.optional(c) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function (a, c) {
                return this.optional(c) || /^\d+$/.test(a)
            },
            creditcard: function (a, c) {
                if (this.optional(c)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                c = 0;
                var b = !1;
                a = a.replace(/\D/g, "");
                for (var f = a.length -
                        1; 0 <= f; f--) {
                    var g = a.charAt(f);
                    g = parseInt(g, 10);
                    b && 9 < (g *= 2) && (g -= 9);
                    c += g;
                    b = !b
                }
                return 0 === c % 10
            },
            minlength: function (b, c, d) {
                b = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || b >= d
            },
            maxlength: function (b, c, d) {
                b = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || b <= d
            },
            rangelength: function (b, c, d) {
                b = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || b >= d[0] && b <= d[1]
            },
            min: function (a, c, d) {
                return this.optional(c) || a >= d
            },
            max: function (a,
                c, d) {
                return this.optional(c) || a <= d
            },
            range: function (a, c, d) {
                return this.optional(c) || a >= d[0] && a <= d[1]
            },
            equalTo: function (b, c, d) {
                d = a(d);
                this.settings.onfocusout && d.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    a(c).valid()
                });
                return b === d.val()
            },
            remote: function (b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";
                var f = this.previousValue(c);
                this.settings.messages[c.name] || (this.settings.messages[c.name] = {});
                f.originalMessage = this.settings.messages[c.name].remote;
                this.settings.messages[c.name].remote =
                    f.message;
                d = "string" === typeof d && {
                    url: d
                } || d;
                if (f.old === b) return f.valid;
                f.old = b;
                var g = this;
                this.startRequest(c);
                var l = {};
                l[c.name] = b;
                a.ajax(a.extend(!0, {
                    url: d,
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: l,
                    success: function (d) {
                        g.settings.messages[c.name].remote = f.originalMessage;
                        var l = !0 === d || "true" === d;
                        if (l) {
                            var q = g.formSubmitted;
                            g.prepareElement(c);
                            g.formSubmitted = q;
                            g.successList.push(c);
                            delete g.invalid[c.name];
                            g.showErrors()
                        } else q = {}, d = d || g.defaultMessage(c, "remote"), q[c.name] = f.message =
                            a.isFunction(d) ? d(b) : d, g.invalid[c.name] = !0, g.showErrors(q);
                        f.valid = l;
                        g.stopRequest(c, l)
                    }
                }, d));
                return "pending"
            }
        }
    });
    a.format = a.validator.format
})(jQuery);
(function (a) {
    var b = {};
    if (a.ajaxPrefilter) a.ajaxPrefilter(function (a, c, g) {
        c = a.port;
        "abort" === a.mode && (b[c] && b[c].abort(), b[c] = g)
    });
    else {
        var c = a.ajax;
        a.ajax = function (d) {
            var f = ("port" in d ? d : a.ajaxSettings).port;
            return "abort" === ("mode" in d ? d : a.ajaxSettings).mode ? (b[f] && b[f].abort(), b[f] = c.apply(this, arguments), b[f]) : c.apply(this, arguments)
        }
    }
})(jQuery);
(function (a) {
    a.extend(a.fn, {
        validateDelegate: function (b, c, d) {
            return this.bind(c, function (c) {
                var f = a(c.target);
                if (f.is(b)) return d.apply(f, arguments)
            })
        }
    })
})(jQuery);
jQuery.validator && jQuery.extend(jQuery.validator.methods, {
    remote: function (a, b, c) {
        if (this.optional(b)) return "dependency-mismatch";
        var d = this.previousValue(b);
        this.settings.messages[b.name] || (this.settings.messages[b.name] = {});
        d.originalMessage = this.settings.messages[b.name].remote;
        this.settings.messages[b.name].remote = d.message;
        c = "string" === typeof c && {
            url: c
        } || c;
        if (d.old === a) return d.valid;
        d.old = a;
        var f = this;
        this.startRequest(b);
        var g = {};
        g[b.name] = a;
        $.ajax($.extend(!0, {
            mode: "abort",
            port: "validate" +
                b.name,
            dataType: "json",
            data: g,
            context: f.currentForm,
            success: function (c) {
                var g = !0 === c || "true" === c || "success" === c.status;
                f.settings.messages[b.name].remote = d.originalMessage;
                if (g) {
                    var l = f.formSubmitted;
                    f.prepareElement(b);
                    f.formSubmitted = l;
                    f.successList.push(b);
                    delete f.invalid[b.name];
                    f.showErrors()
                } else l = {}, c = "object" == typeof c ? c.message || f.defaultMessage(b, "remote") : c || f.defaultMessage(b, "remote"), l[b.name] = d.message = $.isFunction(c) ? c(a) : c, f.invalid[b.name] = !0, f.showErrors(l);
                d.valid = g;
                f.stopRequest(b,
                    g)
            }
        }, c));
        return "pending"
    }
});
jQuery.validator && jQuery.extend(jQuery.validator.messages, {
    required: "\u8bf7\u8f93\u5165\u5185\u5bb9",
    remote: "\u8bf7\u4fee\u6b63\u8be5\u5b57\u6bb5",
    email: "\u8bf7\u8f93\u5165\u6b63\u786e\u683c\u5f0f\u7684\u7535\u5b50\u90ae\u4ef6",
    url: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u7f51\u5740",
    date: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u65e5\u671f",
    dateISO: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u65e5\u671f (ISO).",
    number: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u6570\u5b57",
    digits: "\u53ea\u80fd\u8f93\u5165\u6574\u6570",
    creditcard: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u4fe1\u7528\u5361\u53f7",
    equalTo: "\u8bf7\u518d\u6b21\u8f93\u5165\u76f8\u540c\u7684\u503c",
    accept: "\u8bf7\u8f93\u5165\u62e5\u6709\u5408\u6cd5\u540e\u7f00\u540d\u7684\u5b57\u7b26\u4e32",
    maxlength: jQuery.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a \u957f\u5ea6\u6700\u591a\u662f {0} \u7684\u5b57\u7b26\u4e32"),
    minlength: jQuery.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a \u957f\u5ea6\u6700\u5c11\u662f {0} \u7684\u5b57\u7b26\u4e32"),
    rangelength: jQuery.validator.format("\u8bf7\u8f93\u5165 \u4e00\u4e2a\u957f\u5ea6\u4ecb\u4e8e {0} \u548c {1} \u4e4b\u95f4\u7684\u5b57\u7b26\u4e32"),
    range: jQuery.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a\u4ecb\u4e8e {0} \u548c {1} \u4e4b\u95f4\u7684\u503c"),
    max: jQuery.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a\u6700\u5927\u4e3a{0} \u7684\u503c"),
    min: jQuery.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a\u6700\u5c0f\u4e3a{0} \u7684\u503c")
});
jQuery.validator && jQuery.validator.addMethod("isZipCode", function (a, b) {
    var c = /^[0-9]{6}$/;
    return this.optional(b) || c.test(a)
}, "\u8bf7\u6b63\u786e\u586b\u5199\u60a8\u7684\u90ae\u653f\u7f16\u7801");
jQuery.validator && jQuery.validator.addMethod("isMobile", function (a, b) {
    var c = a.length,
        d = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(b) || 11 == c && d.test(a)
}, "\u8bf7\u6b63\u786e\u586b\u5199\u60a8\u7684\u624b\u673a\u53f7\u7801");
(function (a) {
    var b = [],
        c = [];
    a.fn.doAutosize = function (b) {
        var c = a(this).data("minwidth"),
            d = a(this).data("maxwidth"),
            f = "",
            r = a(this),
            n = a("#" + a(this).data("tester_id"));
        f !== (f = r.val()) && (f = f.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;"), n.html(f), n = n.width(), b = n + b.comfortZone >= c ? n + b.comfortZone : c, n = r.width(), (b < n && b >= c || b > c && b < d) && r.width(b))
    };
    a.fn.resetAutosize = function (b) {
        var c = a(this).data("minwidth") || b.minInputWidth || a(this).width();
        b = a(this).data("maxwidth") ||
            b.maxInputWidth || a(this).closest(".tagsinput").width() - b.inputPadding;
        var d = a(this),
            f = a("<tester/>").css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: "auto",
                fontSize: d.css("fontSize"),
                fontFamily: d.css("fontFamily"),
                fontWeight: d.css("fontWeight"),
                letterSpacing: d.css("letterSpacing"),
                whiteSpace: "nowrap"
            }),
            r = a(this).attr("id") + "_autosize_tester";
        0 < !a("#" + r).length && (f.attr("id", r), f.appendTo("body"));
        d.data("minwidth", c);
        d.data("maxwidth", b);
        d.data("tester_id", r);
        d.css("width", c)
    };
    a.fn.addTag = function (d,
        g) {
        g = jQuery.extend({
            focus: !1,
            callback: !0
        }, g);
        this.each(function () {
            var f = a(this).attr("id"),
                q = a(this).val().split(b[f]);
            "" == q[0] && (q = []);
            d = jQuery.trim(d);
            if (g.unique) {
                var r = a(this).tagExist(d);
                1 == r && a("#" + f + "_tag").addClass("not_valid")
            } else r = !1;
            if ("" != d && 1 != r && (a("<span>").addClass("tag").append(a("<span>").text(d).append("&nbsp;&nbsp;"), a("<a>", {
                        href: "#",
                        title: "Removing tag",
                        text: "x"
                    }).click(function () {
                        return a("#" + f).removeTag(escape(d))
                    })).insertBefore("#" + f + "_addTag"), q.push(d), a("#" + f + "_tag").val(""),
                    g.focus ? a("#" + f + "_tag").focus() : a("#" + f + "_tag").blur(), a.fn.tagsInput.updateTagsField(this, q), g.callback && c[f] && c[f].onAddTag && (r = c[f].onAddTag, r.call(this, d)), c[f] && c[f].onChange)) {
                var n = q.length;
                r = c[f].onChange;
                r.call(this, a(this), q[n - 1])
            }
        });
        return !1
    };
    a.fn.removeTag = function (d) {
        d = unescape(d);
        this.each(function () {
            var f = a(this).attr("id"),
                l = a(this).val().split(b[f]);
            a("#" + f + "_tagsinput .tag").remove();
            str = "";
            for (i = 0; i < l.length; i++) l[i] != d && (str = str + b[f] + l[i]);
            a.fn.tagsInput.importTags(this, str);
            c[f] &&
                c[f].onRemoveTag && c[f].onRemoveTag.call(this, d)
        });
        return !1
    };
    a.fn.tagExist = function (c) {
        var d = a(this).attr("id");
        d = a(this).val().split(b[d]);
        return 0 <= jQuery.inArray(c, d)
    };
    a.fn.importTags = function (b) {
        var c = a(this).attr("id");
        a("#" + c + "_tagsinput .tag").remove();
        a.fn.tagsInput.importTags(this, b)
    };
    a.fn.tagsInput = function (f) {
        var g = jQuery.extend({
                interactive: !0,
                defaultText: "add a tag",
                minChars: 0,
                width: "300px",
                height: "100px",
                autocomplete: {
                    selectFirst: !1
                },
                hide: !0,
                delimiter: ",",
                unique: !0,
                removeWithBackspace: !0,
                placeholderColor: "#666666",
                autosize: !0,
                comfortZone: 20,
                inputPadding: 12
            }, f),
            l = 0;
        this.each(function () {
            if ("undefined" === typeof a(this).attr("data-tagsinput-init")) {
                a(this).attr("data-tagsinput-init", !0);
                g.hide && a(this).hide();
                var f = a(this).attr("id");
                if (!f || b[a(this).attr("id")]) f = a(this).attr("id", "tags" + (new Date).getTime() + l++).attr("id");
                var r = jQuery.extend({
                    pid: f,
                    real_input: "#" + f,
                    holder: "#" + f + "_tagsinput",
                    input_wrapper: "#" + f + "_addTag",
                    fake_input: "#" + f + "_tag"
                }, g);
                b[f] = r.delimiter;
                if (g.onAddTag || g.onRemoveTag ||
                    g.onChange) c[f] = [], c[f].onAddTag = g.onAddTag, c[f].onRemoveTag = g.onRemoveTag, c[f].onChange = g.onChange;
                var n = '<div id="' + f + '_tagsinput" class="tagsinput"><div id="' + f + '_addTag">';
                g.interactive && (n = n + '<input id="' + f + '_tag" value="" data-default="' + g.defaultText + '" />');
                a(n + '</div><div class="tags_clear"></div></div>').insertAfter(this);
                a(r.holder).css("width", g.width);
                a(r.holder).css("min-height", g.height);
                a(r.holder).css("height", g.height);
                "" != a(r.real_input).val() && a.fn.tagsInput.importTags(a(r.real_input),
                    a(r.real_input).val());
                if (g.interactive) {
                    a(r.fake_input).val(a(r.fake_input).attr("data-default"));
                    a(r.fake_input).css("color", g.placeholderColor);
                    a(r.fake_input).resetAutosize(g);
                    a(r.holder).bind("click", r, function (b) {
                        a(b.data.fake_input).focus()
                    });
                    a(r.fake_input).bind("focus", r, function (b) {
                        a(b.data.fake_input).val() == a(b.data.fake_input).attr("data-default") && a(b.data.fake_input).val("");
                        a(b.data.fake_input).css("color", "#000000")
                    });
                    if (void 0 != g.autocomplete_url) {
                        autocomplete_options = {
                            source: g.autocomplete_url
                        };
                        for (attrname in g.autocomplete) autocomplete_options[attrname] = g.autocomplete[attrname];
                        void 0 !== jQuery.Autocompleter ? (a(r.fake_input).autocomplete(g.autocomplete_url, g.autocomplete), a(r.fake_input).bind("result", r, function (b, c, d) {
                            c && a("#" + f).addTag(c[0] + "", {
                                focus: !0,
                                unique: g.unique
                            })
                        })) : void 0 !== jQuery.ui.autocomplete && (a(r.fake_input).autocomplete(autocomplete_options), a(r.fake_input).bind("autocompleteselect", r, function (b, c) {
                            a(b.data.real_input).addTag(c.item.value, {
                                focus: !0,
                                unique: g.unique
                            });
                            return !1
                        }))
                    } else a(r.fake_input).bind("blur",
                        r,
                        function (b) {
                            var c = a(this).attr("data-default");
                            "" != a(b.data.fake_input).val() && a(b.data.fake_input).val() != c ? b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                                focus: !0,
                                unique: g.unique
                            }) : (a(b.data.fake_input).val(a(b.data.fake_input).attr("data-default")), a(b.data.fake_input).css("color", g.placeholderColor));
                            return !1
                        });
                    a(r.fake_input).bind("keypress", r, function (b) {
                        if (d(b)) return b.preventDefault(),
                            b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                                focus: !0,
                                unique: g.unique
                            }), a(b.data.fake_input).resetAutosize(g), !1;
                        b.data.autosize && a(b.data.fake_input).doAutosize(g)
                    });
                    r.removeWithBackspace && a(r.fake_input).bind("keydown", function (b) {
                        if (8 == b.keyCode && "" == a(this).val()) {
                            b.preventDefault();
                            b = a(this).closest(".tagsinput").find(".tag:last").text();
                            var c = a(this).attr("id").replace(/_tag$/,
                                "");
                            b = b.replace(/[\s]+x$/, "");
                            a("#" + c).removeTag(escape(b));
                            a(this).trigger("focus")
                        }
                    });
                    a(r.fake_input).blur();
                    r.unique && a(r.fake_input).keydown(function (b) {
                        (8 == b.keyCode || String.fromCharCode(b.which).match(/\w+|[\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1,/]+/)) && a(this).removeClass("not_valid")
                    })
                }
            }
        });
        return this
    };
    a.fn.tagsInput.updateTagsField = function (c, d) {
        var f = a(c).attr("id");
        a(c).val(d.join(b[f]))
    };
    a.fn.tagsInput.importTags = function (d, g) {
        a(d).val("");
        var f = a(d).attr("id");
        g = g.split(b[f]);
        for (i = 0; i < g.length; i++) a(d).addTag(g[i], {
            focus: !1,
            callback: !1
        });
        c[f] && c[f].onChange && c[f].onChange.call(d, d, g[i])
    };
    var d = function (b) {
        var c = !1;
        if (13 == b.which) return !0;
        "string" === typeof b.data.delimiter ? b.which == b.data.delimiter.charCodeAt(0) && (c = !0) : a.each(b.data.delimiter, function (a, d) {
            b.which == d.charCodeAt(0) && (c = !0)
        });
        return c
    }
})(jQuery);
(function (a, b) {
    var c = a(b);
    a.fn.lazyload = function (d) {
        function f() {
            var b = 0;
            g.each(function () {
                var c = a(this);
                if (!(l.skip_invisible && !c.is(":visible") || a.abovethetop(this, l) || a.leftofbegin(this, l)))
                    if (!a.belowthefold(this, l) && !a.rightoffold(this, l)) c.trigger("appear"), b = 0;
                    else if (++b > l.failure_limit) return !1
            })
        }
        var g = this,
            l = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null
            };
        d && (void 0 !== d.failurelimit && (d.failure_limit =
            d.failurelimit, delete d.failurelimit), void 0 !== d.effectspeed && (d.effect_speed = d.effectspeed, delete d.effectspeed), a.extend(l, d));
        d = void 0 === l.container || l.container === b ? c : a(l.container);
        0 === l.event.indexOf("scroll") && d.bind(l.event, function (a) {
            return f()
        });
        this.each(function () {
            var b = this,
                c = a(b);
            b.loaded = !1;
            c.one("appear", function () {
                this.loaded || (l.appear && l.appear.call(b, g.length, l), a("<img />").bind("load", function () {
                    c.hide().attr("src", c.data(l.data_attribute))[l.effect](l.effect_speed);
                    b.loaded = !0;
                    var d = a.grep(g, function (a) {
                        return !a.loaded
                    });
                    g = a(d);
                    l.load && l.load.call(b, g.length, l)
                }).bind("error", function () {
                    _imageErrorTry(c)
                }).attr("src", c.data(l.data_attribute)))
            });
            0 !== l.event.indexOf("scroll") && c.bind(l.event, function (a) {
                b.loaded || c.trigger("appear")
            })
        });
        c.bind("resize", function (a) {
            f()
        });
        a(document).ready(function () {
            f()
        });
        return this
    };
    a.belowthefold = function (d, f) {
        return (void 0 === f.container || f.container === b ? c.height() + c.scrollTop() : a(f.container).offset().top + a(f.container).height()) <=
            a(d).offset().top - f.threshold
    };
    a.rightoffold = function (d, f) {
        return (void 0 === f.container || f.container === b ? c.width() + c.scrollLeft() : a(f.container).offset().left + a(f.container).width()) <= a(d).offset().left - f.threshold
    };
    a.abovethetop = function (d, f) {
        return (void 0 === f.container || f.container === b ? c.scrollTop() : a(f.container).offset().top) >= a(d).offset().top + f.threshold + a(d).height()
    };
    a.leftofbegin = function (d, f) {
        return (void 0 === f.container || f.container === b ? c.scrollLeft() : a(f.container).offset().left) >= a(d).offset().left +
            f.threshold + a(d).width()
    };
    a.inviewport = function (b, c) {
        return !a.rightoffold(b, c) && !a.leftofbegin(b, c) && !a.belowthefold(b, c) && !a.abovethetop(b, c)
    };
    a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function (b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
})(jQuery, window);
eval(function (a, b, c, d, f, g) {
    f = function (a) {
        return (a < b ? "" : f(parseInt(a / b))) + (35 < (a %= b) ? String.fromCharCode(a + 29) : a.toString(36))
    };
    if (!"".replace(/^/, String)) {
        for (; c--;) g[f(c)] = d[c] || f(c);
        d = [function (a) {
            return g[a]
        }];
        f = function () {
            return "\\w+"
        };
        c = 1
    }
    for (; c--;) d[c] && (a = a.replace(new RegExp("\\b" + f(c) + "\\b", "g"), d[c]));
    return a
}("6(3w.b&&!3w.b.3x){(7(b){9 j=7(s,H,m){5.1g=[];5.1D={};5.2M=u;5.1W={};5.1h={};5.m=b.1i({1X:1c,3y:1x,2N:1c,2O:1c,3z:1x,3A:1x},m);5.1E=(5.m.1E!==D)?(5.m.1E):(R.2g);5.13=(5.m.13!==D)?(5.m.13):(R.3B);5.2h=(5.m.2h!==D)?(5.m.2h):((5.m.1X)?(b.2P):(R.2P));6(s==u){c}5.3C(s,H);6(s){5.1F(5.1h['2i'],H,5.m)}5.1h=u};j.4k='0.8.4';j.J=1c;j.3D=4l;j.1y=0;j.z.3C=7(s,H){9 2Q=/\\{#1d *(\\w+) *(.*?) *\\}/g,2j,1G,U,1H=u,2R=[],i;2k((2j=2Q.4m(s))!==u){1H=2Q.1H;1G=2j[1];U=s.1Y('{#/1d '+1G+'}',1H);6(U===-1){E p V('14: j \"'+1G+'\" 2S 2l 4n.');}5.1h[1G]=s.1Z(1H,U);2R[1G]=R.2T(2j[2])}6(1H===u){5.1h['2i']=s;c}K(i 2m 5.1h){6(i!=='2i'){5.1W[i]=p j()}}K(i 2m 5.1h){6(i!=='2i'){5.1W[i].1F(5.1h[i],b.1i({},H||{},5.1W||{}),b.1i({},5.m,2R[i]));5.1h[i]=u}}};j.z.1F=7(s,H,m){6(s==D){5.1g.x(p 1p('',1,5));c}s=s.15(/[\\n\\r]/g,'');s=s.15(/\\{\\*.*?\\*\\}/g,'');5.2M=b.1i({},5.1W||{},H||{});5.m=p 2n(m);9 A=5.1g,20=s.1j(/\\{#.*?\\}/g),16=0,U=0,e,1q=0,i,l;K(i=0,l=(20)?(20.X):(0);i<l;++i){9 10=20[i];6(1q){U=s.1Y('{#/1I}',16);6(U===-1){E p V(\"14: 4o 21 3E 1I.\");}6(U>16){A.x(p 1p(s.1Z(16,U),1,5))}16=U+11;1q=0;2k(i<l&&20[i]!=='{#/1I}'){i++}22}U=s.1Y(10,16);6(U>16){A.x(p 1p(s.1Z(16,U),1q,5))}10.1j(/\\{#([\\w\\/]+).*?\\}/);9 2o=L.$1;2U(2o){B'4p':A.2V(10);F;B'6':e=p 1z(A,5);e.2V(10);A.x(e);A=e;F;B'W':A.2W();F;B'/6':B'/K':B'/2X':A=A.2Y();F;B'2X':e=p 1A(10,A,5);A.x(e);A=e;F;B'K':e=3F(10,A,5);A.x(e);A=e;F;B'22':B'F':A.x(p 17(2o));F;B'2Z':A.x(p 30(10,5.2M,5));F;B'h':A.x(p 31(10,5));F;B'9':A.x(p 32(10,5));F;B'33':A.x(p 34(10));F;B'4q':A.x(p 1p('{',1,5));F;B'4r':A.x(p 1p('}',1,5));F;B'1I':1q=1;F;B'/1I':6(j.J){E p V(\"14: 4s 35 3E 1I.\");}F;3G:6(j.J){E p V('14: 4t 4u: '+2o+'.');}}16=U+10.X}6(s.X>16){A.x(p 1p(s.3H(16),1q,5))}};j.z.M=7(d,h,q,I){++I;6(I==1&&q!=D){b.36(q,\"2p\")}9 $T=d,$P,18='';6(5.m.3z){$T=5.1E(d,{2q:(5.m.3y&&I==1),23:5.m.1X},5.13)}6(!5.m.3A){$P=b.1i({},5.1D,h)}W{$P=b.1i({},5.1E(5.1D,{2q:(5.m.2N),23:1c},5.13),5.1E(h,{2q:(5.m.2N&&I==1),23:1c},5.13))}K(9 i=0,l=5.1g.X;i<l;++i){18+=5.1g[i].M($T,$P,q,I)}5.2r=u;--I;c 18};j.z.12=7(){6(5.2r==u){5.2r=p 2s(5)}c 5.2r};j.z.37=7(24,1B){5.1D[24]=1B};R=7(){};R.3B=7(3I){c 3I.15(/&/g,'&4v;').15(/>/g,'&3J;').15(/</g,'&3K;').15(/\"/g,'&4w;').15(/'/g,'&#39;')};R.2g=7(d,1J,13){6(d==u){c d}2U(d.38){B 2n:9 o={};K(9 i 2m d){o[i]=R.2g(d[i],1J,13)}6(!1J.23){6(d.4x(\"3a\")){o.3a=d.3a}}c o;B 4y:9 a=[];K(9 i=0,l=d.X;i<l;++i){a[i]=R.2g(d[i],1J,13)}c a;B 3b:c(1J.2q)?(13(d)):(d);B 3L:6(1J.23){6(j.J){E p V(\"14: 4z 4A 2l 4B.\");}W{c D}}}c d};R.2T=7(2t){6(2t===u||2t===D){c{}}9 o=2t.4C(/[= ]/);6(o[0]===''){o.4D()}9 25={};K(9 i=0,l=o.X;i<l;i+=2){25[o[i]]=o[i+1]}c 25};R.2P=7(G){6(1K G!==\"4E\"||!G){c u}1k{c(p 3L(\"c \"+b.3M(G)))()}1l(e){6(j.J){E p V(\"14: 4F 4G\");}c{}}};R.3N=7(26,1y,3c){2k(26!=u){9 d=b.G(26,'2p');6(d!=D&&d.1y==1y&&d.d[3c]!=D){c d.d[3c]}26=26.4H}c u};9 1p=7(3d,1q,1d){5.27=3d;5.3O=1q;5.O=1d};1p.z.M=7(d,h,q,I){6(5.3O){c 5.27}9 s=5.27;9 19=\"\";9 i=-1;9 28=0;9 29=-1;9 1L=0;2k(1x){9 1M=s.1Y(\"{\",i+1);9 1N=s.1Y(\"}\",i+1);6(1M<0&&1N<0){F}6((1M!=-1&&1M<1N)||(1N==-1)){i=1M;6(++28==1){29=1M;19+=s.1Z(1L,i);1L=-1}}W{i=1N;6(--28===0){6(29>=0){19+=5.O.12().3P(d,h,q,s.1Z(29,1N+1));29=-1;1L=i+1}}W 6(28<0){28=0}}}6(1L>-1){19+=s.3H(1L)}c 19};2s=7(t){5.3e=t};2s.z.3P=7($T,$P,$Q,2u){1k{9 19=3f(2u);6(b.4I(19)){6(5.3e.m.1X||!5.3e.m.2O){c''}19=19($T,$P,$Q)}c(19===D)?(\"\"):(3b(19))}1l(e){6(j.J){6(e 1C 17){e.1m=\"4J\"}E e;}c\"\"}};2s.z.1a=7($T,$P,$Q,2u){c 3f(2u)};9 1z=7(1O,1r){5.2v=1O;5.1P=1r;5.2a=[];5.1g=[];5.1Q=u};1z.z.x=7(e){5.1Q.x(e)};1z.z.2Y=7(){c 5.2v};1z.z.2V=7(N){N.1j(/\\{#(?:W)*6 (.*?)\\}/);5.2a.x(L.$1);5.1Q=[];5.1g.x(5.1Q)};1z.z.2W=7(){5.2a.x(1x);5.1Q=[];5.1g.x(5.1Q)};1z.z.M=7(d,h,q,I){9 18='';1k{K(9 2b=0,3Q=5.2a.X;2b<3Q;++2b){6(5.1P.12().1a(d,h,q,5.2a[2b])){9 t=5.1g[2b];K(9 i=0,l=t.X;i<l;++i){18+=t[i].M(d,h,q,I)}c 18}}}1l(e){6(j.J||(e 1C 17)){E e;}}c 18};3F=7(N,1O,1d){6(N.1j(/\\{#K (\\w+?) *= *(\\S+?) +4K +(\\S+?) *(?:1b=(\\S+?))*\\}/)){9 f=p 1A(u,1O,1d);f.C=L.$1;f.Y={'35':(L.$2||0),'21':(L.$3||-1),'1b':(L.$4||1),'y':'$T'};f.3g=(7(i){c i});c f}W{E p V('14: 4L 4M \"3R\": '+N);}};9 1A=7(N,1O,1d){5.2v=1O;5.O=1d;6(N!=u){N.1j(/\\{#2X +(.+?) +3S +(\\w+?)( .+)*\\}/);5.3T=L.$1;5.C=L.$2;5.Y=L.$3||u;5.Y=R.2T(5.Y)}5.2w=[];5.2x=[];5.3h=5.2w};1A.z.x=7(e){5.3h.x(e)};1A.z.2Y=7(){c 5.2v};1A.z.2W=7(){5.3h=5.2x};1A.z.M=7(d,h,q,I){1k{9 1s=(5.3g===D)?(5.O.12().1a(d,h,q,5.3T)):(5.3g);6(1s===$){E p V(\"2c: 4N '$' 4O 4P 4Q 3S 3U-7\");}9 2d=[];9 1R=1K 1s;6(1R=='3V'){9 3i=[];b.1t(1s,7(k,v){2d.x(k);3i.x(v)});1s=3i}9 y=(5.Y.y!==D)?(5.O.12().1a(d,h,q,5.Y.y)):((d!=u)?(d):({}));6(y==u){y={}}9 s=2e(5.O.12().1a(d,h,q,5.Y.35)||0),e;9 1b=2e(5.O.12().1a(d,h,q,5.Y.1b)||1);6(1R!='7'){e=1s.X}W{6(5.Y.21===D||5.Y.21===u){e=2e.4R}W{e=2e(5.O.12().1a(d,h,q,5.Y.21))+((1b>0)?(1):(-1))}}9 18='';9 i,l;6(5.Y.2f){9 3j=s+2e(5.O.12().1a(d,h,q,5.Y.2f));e=(3j>e)?(e):(3j)}6((e>s&&1b>0)||(e<s&&1b<0)){9 1S=0;9 3W=(1R!='7')?(4S.4T((e-s)/1b)):D;9 1u,1n;9 3k=0;K(;((1b>0)?(s<e):(s>e));s+=1b,++1S,++3k){6(j.J&&3k>j.3D){E p V(\"2c: 4U 3U 4V 4W 4X\");}1u=2d[s];6(1R!='7'){1n=1s[s]}W{1n=1s(s);6(1n===D||1n===u){F}}6((1K 1n=='7')&&(5.O.m.1X||!5.O.m.2O)){22}6((1R=='3V')&&(1u 2m 2n)&&(1n===2n[1u])){22}9 3X=y[5.C];y[5.C]=1n;y[5.C+'$3Y']=s;y[5.C+'$1S']=1S;y[5.C+'$3Z']=(1S===0);y[5.C+'$40']=(s+1b>=e);y[5.C+'$41']=3W;y[5.C+'$2d']=(1u!==D&&1u.38==3b)?(5.O.13(1u)):(1u);y[5.C+'$1K']=1K 1n;K(i=0,l=5.2w.X;i<l;++i){1k{18+=5.2w[i].M(y,h,q,I)}1l(1T){6(1T 1C 17){2U(1T.1m){B'22':i=l;F;B'F':i=l;s=e;F;3G:E 1T;}}W{E 1T;}}}1v y[5.C+'$3Y'];1v y[5.C+'$1S'];1v y[5.C+'$3Z'];1v y[5.C+'$40'];1v y[5.C+'$41'];1v y[5.C+'$2d'];1v y[5.C+'$1K'];1v y[5.C];y[5.C]=3X}}W{K(i=0,l=5.2x.X;i<l;++i){18+=5.2x[i].M(d,h,q,I)}}c 18}1l(e){6(j.J||(e 1C 17)){E e;}c\"\"}};9 17=7(1m){5.1m=1m};17.z=V;17.z.M=7(d){E 5;};9 30=7(N,H,1r){N.1j(/\\{#2Z (.*?)(?: 4Y=(.*?))?\\}/);5.O=H[L.$1];6(5.O==D){6(j.J){E p V('14: 4Z 3R 2Z: '+L.$1);}}5.42=L.$2;5.43=1r};30.z.M=7(d,h,q,I){1k{c 5.O.M(5.43.12().1a(d,h,q,5.42),h,q,I)}1l(e){6(j.J||(e 1C 17)){E e;}}c''};9 31=7(N,1r){N.1j(/\\{#h 24=(\\w*?) 1B=(.*?)\\}/);5.C=L.$1;5.27=L.$2;5.1P=1r};31.z.M=7(d,h,q,I){1k{h[5.C]=5.1P.12().1a(d,h,q,5.27)}1l(e){6(j.J||(e 1C 17)){E e;}h[5.C]=D}c''};9 32=7(N,1r){N.1j(/\\{#9 (.*?)\\}/);5.44=L.$1;5.1P=1r};32.z.M=7(d,h,q,I){1k{6(q==D){c\"\"}9 25=5.1P.12().1a(d,h,q,5.44);9 1U=b.G(q,\"2p\");6(1U==D){1U={1y:(++j.1y),d:[]}}9 i=1U.d.x(25);b.G(q,\"2p\",1U);c\"(R.3N(5,\"+1U.1y+\",\"+(i-1)+\"))\"}1l(e){6(j.J||(e 1C 17)){E e;}c''}};9 34=7(N){N.1j(/\\{#33 50=(.*?)\\}/);5.3l=3f(L.$1);5.3m=5.3l.X;6(5.3m<=0){E p V('14: 51 52 K 33');}5.3n=0;5.3o=-1};34.z.M=7(d,h,q,I){9 3p=b.G(q,'2y');6(3p!=5.3o){5.3o=3p;5.3n=0}9 i=5.3n++%5.3m;c 5.3l[i]};b.1e.1F=7(s,H,m){c b(5).1t(7(){9 t=(s&&s.38==j)?s:p j(s,H,m);b.G(5,'2c',t);b.G(5,'2y',0)})};b.1e.53=7(1V,H,m){9 s=b.2z({1w:1V,2A:'2B',2C:1c,1m:'45'}).46;c b(5).1F(s,H,m)};b.1e.54=7(3q,H,m){9 s=b('#'+3q).3d();6(s==u){s=b('#'+3q).47();s=s.15(/&3K;/g,\"<\").15(/&3J;/g,\">\")}s=b.3M(s);s=s.15(/^<\\!\\[55\\[([\\s\\S]*)\\]\\]>$/48,'$1');s=s.15(/^<\\!--([\\s\\S]*)--\x3e$/48,'$1');c b(5).1F(s,H,m)};b.1e.56=7(){9 2f=0;b(5).1t(7(){6(b.2D(5)){++2f}});c 2f};b.1e.57=7(){b(5).49();c b(5).1t(7(){b.36(5,'2c')})};b.1e.37=7(24,1B){c b(5).1t(7(){9 t=b.2D(5);6(t!=u){t.37(24,1B)}W 6(j.J){E p V('14: j 2S 2l 4a.');}})};b.1e.3r=7(d,h,1o){c b(5).1t(7(){9 t=b.2D(5);6(t!=u){6(1o!=D&&1o.3s){d=t.2h(d)}b.G(5,'2y',b.G(5,'2y')+1);b(5).47(t.M(d,h,5,0))}W 6(j.J){E p V('14: j 2S 2l 4a.');}})};b.1e.58=7(1V,h,1o){9 Z=5;9 o=b.1i({2E:1c},b.59);o=b.1i(o,1o);b.2z({1w:1V,1m:o.1m,G:o.G,4b:o.4b,2C:o.2C,2F:o.2F,2E:o.2E,4c:o.4c,2A:'2B',4d:7(d){9 r=b(Z).3r(d,h,{3s:1x});6(o.2G){o.2G(r)}},5a:o.5b,5c:o.5d});c 5};9 3t=7(1w,h,2H,2I,1f,1o){5.4e=1w;5.1D=h;5.4f=2H;5.4g=2I;5.1f=1f;5.4h=u;5.2J=1o||{};9 Z=5;b(1f).1t(7(){b.G(5,'3u',Z)});5.3v()};3t.z.3v=7(){5.1f=b.4i(5.1f,7(2K){c(b.5e(5f.5g,2K.5h?2K[0]:2K))});6(5.1f.X===0){c}9 Z=5;b.2z({1w:5.4e,2A:'2B',G:5.4g,2E:1c,2F:Z.2J.2F,4d:7(d){1k{9 r=b(Z.1f).3r(d,Z.1D,{3s:1x});6(Z.2J.2G){Z.2J.2G(r)}}1l(1T){}}});5.4h=5i(7(){Z.3v()},5.4f)};b.1e.5j=7(1w,h,2H,2I,1o){c p 3t(1w,h,2H,2I,5,1o)};b.1e.49=7(){c b(5).1t(7(){9 2L=b.G(5,'3u');6(2L==u){c}9 Z=5;2L.1f=b.4i(2L.1f,7(o){c o!=Z});b.36(5,'3u')})};b.1i({3x:7(s,H,m){c p j(s,H,m)},5k:7(1V,H,m){9 s=b.2z({1w:1V,2A:'2B',2C:1c,1m:'45'}).46;c p j(s,H,m)},2D:7(q){c b.G(q,'2c')},5l:7(1d,G,4j){c 1d.M(G,4j,D,0)},5m:7(1B){j.J=1B}})})(b)};",
    62, 333, "     this if function  var  jQuery return     param  Template   settings   new element    null   push extData prototype node case _name undefined throw break data includes deep DEBUG_MODE for RegExp get oper _template   TemplateUtils   se Error else length _option that this_op  getBin f_escapeString jTemplates replace ss JTException ret result evaluate step false template fn objs _tree _templates_code extend match try catch type cval options TextNode literalMode templ fcount each ckey delete url true guid opIF opFOREACH value instanceof _param f_cloneData setTemplate tname lastIndex literal filter typeof sExpr lm rm par _templ _curr mode iteration ex refobj url_ _templates disallow_functions indexOf substring op end continue noFunc name obj el _value nested sText _cond ci jTemplate key Number count cloneData f_parseJSON MAIN iter while not in Object op_ jTemplatesRef escapeData EvalObj EvalClass optionText __value _parent _onTrue _onFalse jTemplateSID ajax dataType text async getTemplate cache headers on_success interval args _options elem updater _includes filter_params runnable_functions parseJSON reg _template_settings is optionToObject switch addCond switchToElse foreach getParent include Include UserParam UserVariable cycle Cycle begin removeData setParam constructor  toString String id val __templ eval _runFunc _currentState arr tmp loopCounter _values _length _index _lastSessionID sid elementName processTemplate StrToJSON Updater jTemplateUpdater run window createTemplate filter_data clone_data clone_params escapeHTML splitTemplates FOREACH_LOOP_LIMIT of opFORFactory default substr txt gt lt Function trim ReturnRefValue _literalMode evaluateContent cl find as _arg loop object _total prevValue index first last total _root _mainTempl _id GET responseText html im processTemplateStop defined dataFilter timeout success _url _interval _args timer grep parameter version 10000 exec closed No elseif ldelim rdelim Missing unknown tag amp quot hasOwnProperty Array Functions are allowed split shift string Invalid JSON parentNode isFunction subtemplate to Operator failed Variable cannot be used MAX_VALUE Math ceil Foreach limit was exceed root Cannot values no elements setTemplateURL setTemplateElement CDATA hasTemplate removeTemplate processTemplateURL ajaxSettings error on_error complete on_complete contains document body jquery setTimeout processTemplateStart createTemplateURL processTemplateToText jTemplatesDebugMode".split(" "),
    0, {}));