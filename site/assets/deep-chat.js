function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var n = 0, F = function F() {}; return { s: F, n: function (_n29) { function n() { return _n29.apply(this, arguments); } n.toString = function () { return _n29.toString(); }; return n; }(function () { return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] }; }), e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(r) { var n = this.s["return"]; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, "throw": function _throw(r) { var n = this.s["return"]; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
var f = "classList",
  E = "style",
  Do = "unset",
  Fo = "html-wrapper",
  K = "length",
  S = function S() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div";
    return document.createElement(i);
  };
var Uo = /*#__PURE__*/function () {
  function Uo() {
    _classCallCheck(this, Uo);
  }
  return _createClass(Uo, null, [{
    key: "render",
    value: function render(e, t) {
      var n = S();
      n.id = "error-view", n.innerText = t, e.replaceChildren(n);
    }
  }]);
}();
var Bs = /*#__PURE__*/function () {
  function Bs() {
    _classCallCheck(this, Bs);
  }
  return _createClass(Bs, null, [{
    key: "onLoad",
    value: function onLoad(e) {
      e.innerHTML = '<div id="loading-validate-key-property"></div>';
    }
  }, {
    key: "createElements",
    value: function createElements() {
      var e = S();
      return e.id = "validate-property-key-view", e;
    }
  }, {
    key: "render",
    value: function render(e, t, n) {
      var s = Bs.createElements(),
        r = {
          onSuccess: t,
          onFail: Uo.render.bind(this, e, "Your 'key' has failed authentication"),
          onLoad: Bs.onLoad.bind(this, s)
        };
      n.key && n.verifyKey(n.key, r), e.replaceChildren(s);
    }
  }]);
}();
var oe = "service",
  d = "text",
  L = "html",
  p = "error",
  X = "https://deepchat.dev/docs/",
  te = "ai",
  $ = "user",
  cn = "assistant",
  Ds = "error-message-text",
  xs = "deep-chat-outer-container-role-",
  Ar = "empty-message",
  bi = "deep-chat-top-message",
  xr = "deep-chat-middle-message",
  yi = "deep-chat-bottom-message",
  R = "src",
  y = "type",
  ne = "file",
  m = "files",
  W = "image",
  ee = "images",
  Fe = "camera",
  kn = "gifs",
  j = "audio",
  ft = "microphone",
  no = "mixedFiles",
  Bn = "any",
  so = "file-message",
  Wt = "start",
  io = "end",
  ro = "messages",
  wr = "0",
  Cr = "1",
  A = "role",
  ve = "string",
  ae = function ae(i) {
    return JSON.stringify(i);
  },
  w = function w(i) {
    return JSON.parse(ae(i));
  };
function Tr(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Ho(i) {
  return i && ae(i);
}
function Yi(i, e, t, n) {
  var s = "\n".concat(Tr(e), " message: ").concat(ae(i), " \n"),
    r = t ? "".concat(Tr(e), " message after interceptor: ").concat(Ho(n), " \n") : "";
  return s + r;
}
function jo(i, e, t, n) {
  return "".concat(Yi(i, e, t, n), "Make sure the ").concat(e, " message is using the Response format: ").concat(X, "connect/#Response \nYou can also augment it using the responseInterceptor property: ").concat(X, "interceptors#responseInterceptor");
}
function $o(i, e, t) {
  var n = "response";
  return "".concat(Yi(i, n, e, t), "Make sure the ").concat(n, " message is using the {text: string} format, e.g: {text: \"Model Response\"}");
}
function Go(i, e) {
  var t = "request";
  return "".concat(Yi(i, t, e), "Make sure the ").concat(t, " message is using the {body: {text: string}} format, e.g: {body: {text: \"Model Response\"}}");
}
function zo(i) {
  return "".concat(i, " failed - please wait for chat view to render before calling this property.");
}
var Ln = jo,
  Vo = Go,
  qo = $o,
  Rr = zo,
  de = "Invalid API Key",
  He = "Failed to connect",
  qe = "Request settings have not been set up",
  ai = "No file was added",
  Ji = "Image was not found",
  oo = "Multi-response arrays are not supported for streaming",
  ao = "Make sure the events are using {text: string} or {html: string} format.\nYou can also augment them using the responseInterceptor property: ".concat(X, "interceptors#responseInterceptor"),
  Ko = "Cannot mix {text: string} and {html: string} responses.",
  Wo = "No valid stream events were sent.\n".concat(ao),
  Xo = "Readable Stream connection error.",
  bn = "Please define a `function_handler` property inside the service config.",
  dn = "Function tool response must be an array or contain a text property",
  Zo = "Failed to fetch history";
var qt = /*#__PURE__*/function () {
  function qt() {
    _classCallCheck(this, qt);
  }
  return _createClass(qt, null, [{
    key: "apply",
    value: function apply(e, t) {
      if (t) try {
        qt.applyStyleSheet(e, t);
      } catch (_unused) {
        qt.addStyleElement(e, t);
      }
    }
  }, {
    key: "applyStyleSheet",
    value: function applyStyleSheet(e, t) {
      var n = new CSSStyleSheet();
      n.replaceSync(e), t.adoptedStyleSheets.push(n);
    }
  }, {
    key: "addStyleElement",
    value: function addStyleElement(e, t) {
      var n = S("style");
      n.innerHTML = e, t.appendChild(n);
    }
  }, {
    key: "camelToKebab",
    value: function camelToKebab(e) {
      return e.replace(/[A-Z]/g, function (t) {
        return "-".concat(t.toLowerCase());
      });
    }
  }, {
    key: "applyChatStyle",
    value: function applyChatStyle(e, t) {
      if (!e || !t) return;
      var n = Object.entries(e).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          s = _ref2[1];
        return s;
      }).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          s = _ref4[0],
          r = _ref4[1];
        return "".concat(qt.camelToKebab(s), ": ").concat(r, ";");
      }).join(" ");
      n && qt.apply(":host { ".concat(n, " }"), t);
    }
  }]);
}();
var Dn = "inside-start",
  _t = "inside-end",
  Le = "outside-start",
  ye = "outside-end",
  st = "dropup-menu",
  x = "default",
  De = "hover",
  Z = "click",
  U = "active",
  H = "disabled",
  G = "svg",
  Ht = "unavailable",
  T = "styles",
  ys = "mouseenter",
  un = "mouseleave",
  Yo = "mousedown",
  Jo = "mouseup",
  at = "submit",
  Ot = "loading",
  Ci = "stop",
  $n = "unsupported",
  Sn = "commandMode";
var he = /*#__PURE__*/function () {
  function he() {
    _classCallCheck(this, he);
  }
  return _createClass(he, null, [{
    key: "unsetStyle",
    value: function unsetStyle(e, t) {
      var n = Object.keys(t).reduce(function (s, r) {
        return s[r] = "", s;
      }, {});
      Object.assign(e[E], n);
    }
  }, {
    key: "unsetActivityCSSMouseStates",
    value: function unsetActivityCSSMouseStates(e, t) {
      t[Z] && he.unsetStyle(e, t[Z]), t[De] && he.unsetStyle(e, t[De]);
    }
  }, {
    key: "unsetAllCSSMouseStates",
    value: function unsetAllCSSMouseStates(e, t) {
      he.unsetActivityCSSMouseStates(e, t), t[x] && he.unsetStyle(e, t[x]);
    }
    // if you want to asdd default styling - use pure css classes
  }, {
    key: "processStateful",
    value: function processStateful(e) {
      var t = e[x] || {},
        n = Object.assign(w(t), e == null ? void 0 : e[De]),
        s = Object.assign(w(n), e == null ? void 0 : e[Z]);
      return _defineProperty(_defineProperty(_defineProperty({}, x, t), De, n), Z, s);
    }
  }, {
    key: "mergeStatefulStyles",
    value: function mergeStatefulStyles(e) {
      var t = _defineProperty(_defineProperty(_defineProperty({}, x, {}), De, {}), Z, {});
      return e.forEach(function (n) {
        t[x] = Object.assign(t[x], n[x]), t[De] = Object.assign(t[De], n[De]), t[Z] = Object.assign(t[Z], n[Z]);
      }), t;
    }
  }, {
    key: "overwriteDefaultWithAlreadyApplied",
    value: function overwriteDefaultWithAlreadyApplied(e, t) {
      Object.keys(e[x] || []).forEach(function (n) {
        var r;
        var s = n;
        t[E][s] && (r = e[x]) != null && r[s] && (e[x][n] = t[E][s]);
      });
    }
  }, {
    key: "applyToStyleIfNotDefined",
    value: function applyToStyleIfNotDefined(e, t) {
      for (var n in t) {
        var s = t[n];
        e[n] === "" && s && (e[n] = s);
      }
    }
  }]);
}();
var Qt = /*#__PURE__*/function () {
  function Qt() {
    _classCallCheck(this, Qt);
  }
  return _createClass(Qt, null, [{
    key: "buildElement",
    value: function buildElement() {
      var e = S();
      e[f].add("tooltip");
      var t = S("span");
      return t[f].add("tooltip-text"), e.appendChild(t), e;
    }
  }, {
    key: "tryCreateConfig",
    value: function tryCreateConfig(e, t) {
      if (t) return typeof t == "boolean" ? _defineProperty({}, d, e) : _defineProperty(_defineProperty(_defineProperty({}, d, t[d] || e), "timeout", t.timeout || 0), "style", t[E]);
    }
  }, {
    key: "traverseParentUntilContainer",
    value: function traverseParentUntilContainer(e) {
      var t = e;
      for (; t.parentElement;) t = t.parentElement;
      return t;
    }
  }, {
    key: "setPosition",
    value: function setPosition(e, t) {
      var s = t.getRootNode().host.getBoundingClientRect(),
        r = e.getBoundingClientRect(),
        a = t.getBoundingClientRect().width / 2,
        c = r.left + r.width / 2;
      t[E].left = "".concat(c - a - s.left, "px"), t[E].top = "".concat(r.top - 36 - s.top, "px");
      var l = t.getBoundingClientRect();
      l.left < s.left ? t[E].left = "".concat(Qt.OVERFLOW_NEW_POSITION_PX, "px") : l.right > s.right && (t[E].left = "".concat(s.width - l.width - Qt.OVERFLOW_NEW_POSITION_PX, "px"));
    }
  }, {
    key: "display",
    value: function display(e, t, n) {
      return n || (n = Qt.traverseParentUntilContainer(e).nextSibling), t[d] && (n.children[0].textContent = t[d]), {
        timeout: setTimeout(function () {
          n[E].visibility = "visible", Qt.setPosition(e, n), t[E] && Object.assign(n[E], t[E]);
        }, t.timeout || 0),
        element: n
      };
    }
  }, {
    key: "hide",
    value: function hide(e, t) {
      clearTimeout(e.timeout), e.element[E].visibility = "hidden", t[E] && he.unsetStyle(e.element, t[E]), e.element[E].left = "", e.element[E].top = "";
    }
  }]);
}();
Qt.OVERFLOW_NEW_POSITION_PX = 4;
var yt = Qt;
var Jn = /*#__PURE__*/_createClass(function Jn() {
  _classCallCheck(this, Jn);
});
Jn.IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), Jn.IS_CHROMIUM = window.chrome, Jn.IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var Ge = Jn;
var be = /* @__PURE__ */function (i) {
  return i.ESCAPE = "Escape", i.ENTER = "Enter", i.TAB = "Tab", i.ARROW_UP = "ArrowUp", i.ARROW_DOWN = "ArrowDown", i.ARROW_RIGHT = "ArrowRight", i.ARROW_LEFT = "ArrowLeft", i.BACKSPACE = "Backspace", i.DELETE = "Delete", i.META = "Meta", i.CONTROL = "Control", i;
}(be || {});
var en = /*#__PURE__*/function () {
  function en() {
    _classCallCheck(this, en);
  }
  return _createClass(en, null, [{
    key: "add",
    value:
    // prettier-ignore
    function add(e, t, n, s) {
      n !== void 0 && e.addEventListener("keydown", en.onKeyDown.bind(this, n)), e.oninput = en.onInput.bind(this, n, s), e.addEventListener("paste", function (r) {
        var o;
        r.preventDefault(), (o = r.clipboardData) != null && o[m].length && t.addFilesToAnyType(Array.from(r.clipboardData[m]));
      });
    }
    // preventing insertion early for a nicer UX
    // prettier-ignore
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e, t) {
      var s = t.target.textContent;
      s && s.length >= e && !en.PERMITTED_KEYS.has(t.key) && !en.isKeyCombinationPermitted(t) && t.preventDefault();
    }
  }, {
    key: "isKeyCombinationPermitted",
    value: function isKeyCombinationPermitted(e) {
      return e.key === "a" ? e.ctrlKey || e.metaKey : !1;
    }
  }, {
    key: "onInput",
    value: function onInput(e, t, n) {
      var s = n.target,
        r = s.textContent || "";
      e !== void 0 && r.length > e && (s.textContent = r.substring(0, e), pn.focusEndOfInput(s)), t == null || t();
    }
  }]);
}();
en.PERMITTED_KEYS = /* @__PURE__ */new Set([be.BACKSPACE, be.DELETE, be.ARROW_RIGHT, be.ARROW_LEFT, be.ARROW_DOWN, be.ARROW_UP, be.META, be.CONTROL, be.ENTER]);
var Ti = en;
var Qo = /*#__PURE__*/function () {
  function Qo() {
    _classCallCheck(this, Qo);
  }
  return _createClass(Qo, null, [{
    key: "sanitizePastedTextContent",
    value: function sanitizePastedTextContent(e) {
      var s;
      e.preventDefault();
      var t = (s = e.clipboardData) == null ? void 0 : s.getData("text/plain");
      if (!t) return;
      var n = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
      document.execCommand("insertHTML", !1, n);
    }
  }]);
}();
var jt = /*#__PURE__*/function () {
  function jt(e, t, n, s) {
    var _this = this;
    _classCallCheck(this, jt);
    var o, a, c, l;
    this._isComposing = !1;
    var r = jt.processConfig(t, e.textInput);
    this.elementRef = jt.createContainerElement((o = r == null ? void 0 : r[T]) == null ? void 0 : o.container), this._config = r, this.inputElementRef = this.createInputElement((a = e.defaultInput) == null ? void 0 : a[d], s), jt.addFilesToAnyType(n, (c = e.defaultInput) == null ? void 0 : c[m]), this.elementRef.appendChild(this.inputElementRef), e.setPlaceholderText = this.setPlaceholderText.bind(this), e.setPlaceholderText(((l = this._config.placeholder) == null ? void 0 : l[d]) || "Ask me anything!"), this._browserStorage = s, setTimeout(function () {
      Ti.add(_this.inputElementRef, n, _this._config.characterLimit, e._validationHandler), _this._onInput = t.onInput;
    });
  }
  return _createClass(jt, [{
    key: "clear",
    value:
    // this also similarly prevents scroll up
    function clear() {
      var t, n, s;
      var e = window.scrollY;
      this.inputElementRef[f].contains("text-input-".concat(H)) || (Object.assign(this.inputElementRef[E], (t = this._config.placeholder) == null ? void 0 : t[E]), this.inputElementRef.textContent = "", pn.focusEndOfInput(this.inputElementRef), (n = this._onInput) == null || n.call(this, !1), (s = this._browserStorage) == null || s.addInputText("")), Ge.IS_CHROMIUM && window.scrollTo({
        top: e
      });
    }
  }, {
    key: "createInputElement",
    value: function createInputElement(e, t) {
      var s, r, o, a;
      var n = S();
      return n.id = jt.TEXT_INPUT_ID, n[f].add("text-input-styling"), n[A] = "textbox", typeof e == "string" ? n.innerText = e : t != null && t.trackInputText && (n.innerText = t.get().inputText || ""), Ge.IS_MOBILE && n.setAttribute("tabindex", "0"), Ge.IS_CHROMIUM && jt.preventAutomaticScrollUpOnNewLine(n), typeof this._config[H] == "boolean" && this._config[H] === !0 ? (n.contentEditable = "false", n[f].add("text-input-".concat(H)), n.setAttribute("aria-".concat(H), "true")) : (n.contentEditable = "true", n.removeAttribute("aria-".concat(H)), this.addEventListeners(n)), Object.assign(n[E], (s = this._config[T]) == null ? void 0 : s[d]), Object.assign(n[E], (r = this._config.placeholder) == null ? void 0 : r[E]), (a = (o = this._config.placeholder) == null ? void 0 : o[E]) != null && a.color || n.setAttribute("textcolor", ""), n;
    }
  }, {
    key: "removePlaceholderStyle",
    value: function removePlaceholderStyle() {
      var e, t, n, s;
      !this.inputElementRef[f].contains("text-input-".concat(H)) && (e = this._config.placeholder) != null && e[E] && (he.unsetStyle(this.inputElementRef, (t = this._config.placeholder) == null ? void 0 : t[E]), Object.assign(this.inputElementRef[E], (s = (n = this._config) == null ? void 0 : n[T]) == null ? void 0 : s[d]));
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(e) {
      var _this2 = this;
      var t, n;
      (t = this._config[T]) != null && t.focus && (e.onfocus = function () {
        var s;
        return Object.assign(_this2.elementRef[E], (s = _this2._config[T]) == null ? void 0 : s.focus);
      }, e.onblur = this.onBlur.bind(this, this._config[T].focus, (n = this._config[T]) == null ? void 0 : n.container)), e.addEventListener("keydown", this.onKeydown.bind(this)), e.addEventListener("input", this.onInput.bind(this)), e.addEventListener("paste", Qo.sanitizePastedTextContent), e.addEventListener("compositionstart", function () {
        return _this2._isComposing = !0;
      }), e.addEventListener("compositionend", function () {
        return _this2._isComposing = !1;
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(e, t) {
      he.unsetStyle(this.elementRef, e), t && Object.assign(this.elementRef[E], t);
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(e) {
      var t;
      e.key === be.ENTER && !Ge.IS_MOBILE && !this._isComposing && !e.ctrlKey && !e.shiftKey && (e.preventDefault(), (t = this.submit) == null || t.call(this));
    }
  }, {
    key: "onInput",
    value: function onInput() {
      var e, t;
      this.isTextInputEmpty() ? Object.assign(this.inputElementRef[E], (e = this._config.placeholder) == null ? void 0 : e[E]) : this.removePlaceholderStyle(), (t = this._onInput) == null || t.call(this, !0);
    }
  }, {
    key: "setPlaceholderText",
    value: function setPlaceholderText(e) {
      this.inputElementRef.setAttribute("deep-chat-placeholder-text", e), this.inputElementRef.setAttribute("aria-label", e);
    }
  }, {
    key: "isTextInputEmpty",
    value: function isTextInputEmpty() {
      return this.inputElementRef.textContent === "";
    }
  }], [{
    key: "processConfig",
    value: function processConfig(e, t) {
      var _t$H, _t$placeholder, _n$d;
      var n;
      return t !== null && t !== void 0 ? t : t = {}, (_t$H = t[H]) !== null && _t$H !== void 0 ? _t$H : t[H] = e.isTextInputDisabled, (_t$placeholder = t.placeholder) !== null && _t$placeholder !== void 0 ? _t$placeholder : t.placeholder = {}, (_n$d = (n = t.placeholder)[d]) !== null && _n$d !== void 0 ? _n$d : n[d] = e.textInputPlaceholderText, t;
    }
  }, {
    key: "createContainerElement",
    value: function createContainerElement(e) {
      var t = S();
      return t.id = "text-input-container", Object.assign(t[E], e), t;
    }
    // this is is a bug fix where if the browser is scrolled down and the user types in text that creates new line
    // the browser scrollbar will move up which leads to undesirable UX.
    // More details in this Stack Overflow question:
    // https://stackoverflow.com/questions/76285135/prevent-automatic-scroll-when-text-is-inserted-into-contenteditable-div
    // prettier-ignore
  }, {
    key: "preventAutomaticScrollUpOnNewLine",
    value: function preventAutomaticScrollUpOnNewLine(e) {
      var t;
      e.addEventListener("keydown", function () {
        t = window.scrollY;
      }), e.addEventListener("input", function () {
        t !== window.scrollY && window.scrollTo({
          top: t
        });
      });
    }
  }, {
    key: "addFilesToAnyType",
    value: function addFilesToAnyType(e, t) {
      t && e.addFilesToAnyType(Array.from(t).map(function (n) {
        return n;
      }));
    }
  }]);
}();
jt.TEXT_INPUT_ID = "text-input";
var Fs = jt;
var pn = /*#__PURE__*/function () {
  function pn() {
    _classCallCheck(this, pn);
  }
  return _createClass(pn, null, [{
    key: "focusEndOfInput",
    value: function focusEndOfInput(e) {
      var t = document.createRange();
      t.selectNodeContents(e), t.collapse(!1);
      var n = window.getSelection();
      n == null || n.removeAllRanges(), n == null || n.addRange(t), (Ge.IS_MOBILE || Ge.IS_SAFARI) && e.focus();
    }
  }, {
    key: "focusFromParentElement",
    value: function focusFromParentElement(e) {
      var t = e.querySelector("#".concat(Fs.TEXT_INPUT_ID));
      t && pn.focusEndOfInput(t);
    }
  }]);
}();
var co = "Authentication",
  ce = "Authorization",
  ea = "authorization",
  ci = "Unauthorized",
  Qi = "Authorization header",
  Xt = "Invalid",
  li = "Incorrect",
  Ae = "authentication_error",
  Je = "invalid_request_error",
  z = "Content-Type",
  ta = "content-type",
  Y = "application/json",
  F = "object",
  lo = "completed",
  Se = "Bearer ",
  ge = "GET",
  Pe = "POST",
  er = "Upload an audio file",
  Ms = "function_call",
  ln = "input_audio",
  ze = "image_url",
  rs = "system",
  Ri = "placeholder",
  si = /*#__PURE__*/function () {
    function si() {
      _classCallCheck(this, si);
    }
    return _createClass(si, null, [{
      key: "addElements",
      value: function addElements(e) {
        for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          t[_key - 1] = arguments[_key];
        }
        t.forEach(function (n) {
          return e.appendChild(n);
        });
      }
    }, {
      key: "isScrollbarAtBottomOfElement",
      value: function isScrollbarAtBottomOfElement(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : si.CODE_SNIPPET_GENERATION_JUMP;
        var n = e.scrollHeight,
          s = e.clientHeight,
          r = e.scrollTop,
          o = n - s;
        return r >= o - t;
      }
    }, {
      key: "cloneElement",
      value: function cloneElement(e) {
        var t = e.cloneNode(!0);
        return e.parentNode.replaceChild(t, e), t;
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var n = arguments.length > 2 ? arguments[2] : undefined;
        e.scrollButton && e.scrollButton.hiddenElements.size > 0 && e.scrollButton.clearHidden(), n ? e.elementRef.scrollTo({
          left: 0,
          top: n.offsetTop
        }) : t ? e.elementRef.scrollTo({
          left: 0,
          top: e.elementRef.scrollHeight,
          behavior: "smooth"
        }) : e.elementRef.scrollTop = e.elementRef.scrollHeight;
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop(e) {
        e.scrollTop = 0;
      }
    }, {
      key: "isVisibleInParent",
      value: function isVisibleInParent(e, t) {
        var n = e.getBoundingClientRect(),
          s = t.getBoundingClientRect();
        return n.bottom > s.top && n.top < s.bottom;
      }
    }, {
      key: "waitForScrollEnd",
      value: function waitForScrollEnd(e, t) {
        var n = -1,
          s = 0;
        var _r2 = function r() {
          var o = e.scrollTop;
          if (o === n) {
            if (s++, s > 2) {
              t();
              return;
            }
          } else s = 0, n = o;
          requestAnimationFrame(_r2);
        };
        requestAnimationFrame(_r2);
      }
    }, {
      key: "assignButtonEvents",
      value: function assignButtonEvents(e, t) {
        e.onclick = t, e.onkeydown = function (n) {
          n.key === be.ENTER && setTimeout(t);
        };
      }
    }]);
  }();
si.CODE_SNIPPET_GENERATION_JUMP = 1;
var V = si;
var ii = /*#__PURE__*/function () {
  function ii() {
    _classCallCheck(this, ii);
  }
  return _createClass(ii, null, [{
    key: "speak",
    value: function speak(e, t) {
      if (!t.audio && window.SpeechSynthesisUtterance) {
        var n = new SpeechSynthesisUtterance(e);
        Object.assign(n, t), speechSynthesis.speak(n);
      }
    }
  }, {
    key: "processConfig",
    value: function processConfig(e, t) {
      var n = {};
      setTimeout(function () {
        if (_typeof(e) == "object" && (e.audio && (n.audio = e.audio), e.lang && (n.lang = e.lang), e.pitch && (n.pitch = e.pitch), e.rate && (n.rate = e.rate), e.volume && (n.volume = e.volume), e.voiceName)) {
          var s = window.speechSynthesis.getVoices().find(function (r) {
            var o;
            return r.name.toLocaleLowerCase() === ((o = e.voiceName) == null ? void 0 : o.toLocaleLowerCase());
          });
          s && (n.voice = s);
        }
        t(n);
      }, ii.LOAD_VOICES_MS);
    }
  }]);
}();
ii.LOAD_VOICES_MS = 200;
var Pn = ii;
var Rn = /*#__PURE__*/function () {
  function Rn() {
    _classCallCheck(this, Rn);
  }
  return _createClass(Rn, null, [{
    key: "colorToHex",
    value: function colorToHex(e) {
      var t = S();
      return t[E].color = e, document.body.appendChild(t), "#".concat(window.getComputedStyle(t).color.match(/\d+/g).map(function (r) {
        return parseInt(r).toString(16).padStart(2, "0");
      }).join(""));
    }
  }, {
    key: "setDots",
    value: function setDots(e, t) {
      var n, s;
      if ((s = (n = t == null ? void 0 : t[T]) == null ? void 0 : n.bubble) != null && s.color) {
        var r = Rn.colorToHex(t[T].bubble.color);
        e[E].setProperty("--loading-message-color", r), e[E].setProperty("--loading-message-color-fade", "".concat(r, "33"));
      } else e[E].setProperty("--loading-message-color", "#848484"), e[E].setProperty("--loading-message-color-fade", "#55555533");
    }
  }, {
    key: "setRing",
    value: function setRing(e, t) {
      var _ref8 = t || {},
        n = _ref8.color,
        s = _ref8.width,
        r = _ref8.height,
        o = _ref8.margin,
        a = _ref8.border;
      if (n) {
        var c = Rn.colorToHex(n);
        e[E].setProperty("--loading-history-color", c);
      } else e[E].setProperty("--loading-history-color", "#dbdbdb");
      e[E].setProperty("--loading-history-height", r || "57px"), e[E].setProperty("--loading-history-width", s || "57px"), e[E].setProperty("--loading-history-margin", o || "7px"), e[E].setProperty("--loading-history-border", a || "6px solid");
    }
  }]);
}();
Rn.BUBBLE_CLASS = "deep-chat-loading-message-bubble", Rn.DOTS_CONTAINER_CLASS = "deep-chat-loading-message-dots-container";
var St = Rn;
var ie = /*#__PURE__*/function () {
  function ie() {
    _classCallCheck(this, ie);
  }
  return _createClass(ie, null, [{
    key: "checkForContainerStyles",
    value: function checkForContainerStyles(e, t) {
      var n = e.containerStyle;
      n && (Object.assign(t[E], n), console[p]("The containerStyle property".concat(et, "1.3.14.")), console[p]("".concat(Zt, "the style property instead: ").concat(X, "styles#style")));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "handleResponseProperty",
    value: function handleResponseProperty(e) {
      return console[p]("The {result: ....} response object type".concat(et, "1.3.0.")), console[p]("".concat(Zt, "the new response object: ").concat(X, "connect#Response")), e.result;
    }
  }, {
    key: "processHistory",
    value: function processHistory(e) {
      var t = e.initialMessages;
      if (t) return console[p]("The initialMessages property".concat(et, "2.0.0.")), console[p]("".concat(Zt, "the history property instead: ").concat(X, "messages/#history")), t;
    }
  }, {
    key: "processHistoryFile",
    value: function processHistoryFile(e) {
      var t = e[ne];
      t && (console[p]("The file property in MessageContent".concat(et, "1.3.17.")), console[p]("".concat(Zt, "the files array property: ").concat(X, "messages/#MessageContent")), e[m] = [t]);
    }
  }, {
    key: "processValidateInput",
    value: function processValidateInput(e) {
      var t = e.validateMessageBeforeSending;
      if (t) return console[p]("The validateMessageBeforeSending property".concat(et, "1.3.24.")), console[p]("".concat(Zt, "validateInput: ").concat(X, "interceptors#validateInput")), t;
    }
  }, {
    key: "processSubmitUserMessage",
    value: function processSubmitUserMessage(e) {
      return console[p]("The submitUserMessage(text: string) argument string type".concat(et, "1.4.4.")), console[p]("".concat(Zt, "the new argument type: ").concat(X, "methods#submitUserMessage")), _defineProperty({}, d, e);
    }
  }, {
    key: "flagHTMLUpdateClass",
    value: function flagHTMLUpdateClass(e) {
      var t;
      (t = e.children[0]) != null && t[f].contains("deep-chat-update-message") && (console[p]("The \"deep-chat-update-message\" html class".concat(et, "1.4.4.")), console[p]("".concat(Zt, "using {..., overwrite: true} object: ").concat(X, "connect#Response")));
    }
  }, {
    key: "processConnect",
    value: function processConnect(e) {
      var t = e;
      t.request && (t.connect ? Object.assign(t.connect, t.request) : t.connect = t.request, console[p]("The request property".concat(et, "2.0.0.")), console[p]("".concat(Gn, "connect object: ").concat(X, "connect#connect-1")));
    }
  }, {
    key: "checkForStream",
    value: function checkForStream(e) {
      var t = e.stream;
      if (t) return console[p]("The stream property".concat(Ir, "the connect object in version 2.0.0.")), console[p]("".concat(Gn, "connect object: ").concat(X, "connect#connect-1")), t;
    }
  }, {
    key: "fireOnNewMessage",
    value: function fireOnNewMessage(e, t) {
      var s;
      var n = e;
      n.onNewMessage && (console[p]("The onNewMessage event".concat(et, "2.0.0.")), console[p]("".concat(Gn, "onMessage event: ").concat(X, "events#onMessage")), (s = n.onNewMessage) == null || s.call(n, t)), e.dispatchEvent(new CustomEvent("new-message", {
        detail: t
      }));
    }
  }, {
    key: "processFileConfigConnect",
    value: function processFileConfigConnect(e) {
      var t = e;
      t.request && (console[p]("The request property in file configuration".concat(et, "2.0.0.")), console[p]("Please use the connect property instead: ".concat(X, "files")), t.connect || (t.connect = t.request));
    }
  }, {
    key: "processMessageStyles",
    value: function processMessageStyles(e) {
      if (!e) return;
      var t = w(e),
        n = t.loading;
      return n && (n.outerContainer || n.innerContainer || n.bubble || n.media) && (console[p]("The loading message styles are defined using LoadingMessageStyles interface".concat(Cn, "2.1.0.")), console[p]("Check it out here: ".concat(X, "messages/styles#LoadingMessageStyles")), t.loading = {
        message: {
          styles: n
        }
      }), t;
    }
  }, {
    key: "processDemo",
    value: function processDemo(e) {
      return typeof e == "boolean" || e.displayLoadingBubble && (console[p]("The demo displayLoadingBubble property".concat(et, "2.1.0.")), console[p]("Please use displayLoading instead: ".concat(X, "modes#demo")), e.displayLoading = {
        message: !0
      }), e;
    }
  }, {
    key: "processCohere",
    value: function processCohere(e) {
      var t = e,
        n = "".concat(Gn, "official documentation: ").concat(X, "directConnection/Cohere");
      return t.chat && (console[p]("Cohere chat property".concat(et, "2.2.3.")), console[p](n), delete t.chat), t.textGeneration ? (console[p]("Cohere textGeneration".concat(Ei, "2.2.3.")), console[p](n), delete t.textGeneration, !1) : t.summarization ? (console[p]("Cohere summarization".concat(Ei, "2.2.3.")), console[p](n), delete t.summarization, !1) : !0;
    }
  }, {
    key: "processStreamHTMLWrappers",
    value: function processStreamHTMLWrappers(e) {
      if (!e || _typeof(e) !== F) return;
      var t = e.htmlWrappers;
      if (t) return console[p]("The htmlWrappers property".concat(Ir, "Deep Chat's base").concat(Cn, "2.3.0.")), console[p]("Check it out here: ".concat(X, "messages/HTML#htmlWrappers")), t;
    }
  }, {
    key: "processFocusMode",
    value: function processFocusMode(e) {
      return !e || typeof e == "boolean" || e.scroll && (console[p]("The scroll property in focusMode has been changed to smoothScroll".concat(Cn, "2.3.0.")), console[p]("Check it out here: ".concat(X, "modes#focusMode")), e.smoothScroll = !0), e;
    }
  }, {
    key: "processPosition",
    value: function processPosition(e) {
      if (!e) return e;
      var t = "Position names have been updated".concat(Cn, "2.3.1.");
      return e === "inside-left" ? (console[p](t), Dn) : e === "inside-right" ? (console[p](t), _t) : e === "outside-left" ? (console[p](t), Le) : e === "outside-right" ? (console[p](t), ye) : e;
    }
  }, {
    key: "processBrowserStorage",
    value: function processBrowserStorage(e) {
      var t = e.get();
      t && Array.isArray(t) && e.addMessages(t);
    }
  }, {
    key: "processOpenAIAssistant",
    value: function processOpenAIAssistant(e) {
      var _t$chat;
      var t = e;
      t.assistant && (console[p]("The OpenAI Assistants API".concat(Ei, "2.6.0 as it has been discontinued by OpenAI.")), console[p]("Falling back to the chat service which uses the Responses API."), console[p]("".concat(Gn, "official documentation: ").concat(X, "directConnection/OpenAI")), delete t.assistant, (_t$chat = t.chat) !== null && _t$chat !== void 0 ? _t$chat : t.chat = !0);
    }
  }]);
}();
var Cn = " since version ",
  et = " is deprecated ".concat(Cn),
  Zt = "Please change to using ",
  Gn = "Please see the ",
  Ei = " is not supported ".concat(Cn),
  Ir = " has been moved to ";
var Lt = /*#__PURE__*/function () {
  function Lt() {
    _classCallCheck(this, Lt);
  }
  return _createClass(Lt, null, [{
    key: "mouseUp",
    value: function mouseUp(e, t) {
      he.unsetAllCSSMouseStates(e, t), Object.assign(e[E], t[x]), Object.assign(e[E], t[De]);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e, t) {
      Object.assign(e[E], t[Z]);
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave(e, t) {
      he.unsetAllCSSMouseStates(e, t), Object.assign(e[E], t[x]);
    }
  }, {
    key: "mouseEnter",
    value: function mouseEnter(e, t) {
      Object.assign(e[E], t[De]);
    }
  }, {
    key: "add",
    value: function add(e, t) {
      e.addEventListener(ys, Lt.mouseEnter.bind(this, e, t)), e.addEventListener(un, Lt.mouseLeave.bind(this, e, t)), e.addEventListener(Yo, Lt.mouseDown.bind(this, e, t)), e.addEventListener(Jo, Lt.mouseUp.bind(this, e, t));
    }
  }]);
}();
var na = "deep-chat-temporary-message",
  sa = "deep-chat-suggestion-button",
  Ii = {
    "deep-chat-button": {
      styles: _defineProperty(_defineProperty(_defineProperty({}, x, {
        backgroundColor: "white",
        padding: "5px",
        paddingLeft: "7px",
        paddingRight: "7px",
        border: "1px solid #c2c2c2",
        borderRadius: "6px",
        cursor: "pointer"
      }), De, {
        backgroundColor: "#fafafa"
      }), Z, {
        backgroundColor: "#f1f1f1"
      })
    }
  },
  Mr = Object.keys(Ii);
var At = /*#__PURE__*/function () {
  function At() {
    _classCallCheck(this, At);
  }
  return _createClass(At, null, [{
    key: "applySuggestionEvent",
    value: function applySuggestionEvent(e, t) {
      setTimeout(function () {
        t.addEventListener(Z, function () {
          var n, s;
          (s = e.submitUserMessage) == null || s.call(e, _defineProperty({}, d, ((n = t.textContent) == null ? void 0 : n.trim()) || ""));
        });
      });
    }
  }, {
    key: "isElementTemporary",
    value: function isElementTemporary(e) {
      var t;
      return e ? (t = e.bubbleElement.children[0]) == null ? void 0 : t[f].contains(na) : !1;
    }
  }, {
    key: "doesElementContainDeepChatClass",
    value: function doesElementContainDeepChatClass(e) {
      return Mr.find(function (t) {
        return e[f].contains(t);
      });
    }
  }, {
    key: "applyEvents",
    value: function applyEvents(e, t) {
      var n = Ii[t].events;
      Object.keys(n || []).forEach(function (s) {
        e.addEventListener(s, n == null ? void 0 : n[s]);
      });
    }
  }, {
    key: "getProcessedStyles",
    value: function getProcessedStyles(e, t, n) {
      var s = Array.from(t[f]).reduce(function (a, c) {
          var h;
          var l = (h = e[c]) == null ? void 0 : h[T];
          return l && e[c][T] && a.push(l), a;
        }, []),
        r = Ii[n][T];
      if (r) {
        var a = w(r);
        a[x] && he.overwriteDefaultWithAlreadyApplied(a, t), s.unshift(a);
      }
      var o = he.mergeStatefulStyles(s);
      return he.processStateful(o);
    }
  }, {
    key: "applyDeepChatUtilities",
    value: function applyDeepChatUtilities(e, t, n) {
      Mr.forEach(function (r) {
        var o = n.getElementsByClassName(r);
        Array.from(o || []).forEach(function (a) {
          var c = At.getProcessedStyles(t, a, r);
          re.applyStylesToElement(a, c), At.applyEvents(a, r);
        });
      });
      var s = n.getElementsByClassName(sa);
      Array.from(s).forEach(function (r) {
        return At.applySuggestionEvent(e, r);
      });
    }
  }]);
}();
var re = /*#__PURE__*/function () {
  function re() {
    _classCallCheck(this, re);
  }
  return _createClass(re, null, [{
    key: "applyStylesToElement",
    value: function applyStylesToElement(e, t) {
      var n = he.processStateful(t);
      Lt.add(e, n), Object.assign(e[E], n[x]);
    }
  }, {
    key: "applyEventsToElement",
    value: function applyEventsToElement(e, t) {
      Object.keys(t).forEach(function (n) {
        var s = t[n];
        s && e.addEventListener(n, s);
      });
    }
  }, {
    key: "applyClassUtilitiesToElement",
    value: function applyClassUtilitiesToElement(e, t) {
      var n = t.events,
        s = t.styles;
      n && re.applyEventsToElement(e, n), s && !At.doesElementContainDeepChatClass(e) && re.applyStylesToElement(e, s);
    }
  }, {
    key: "applyCustomClassUtilities",
    value: function applyCustomClassUtilities(e, t) {
      Object.keys(e).forEach(function (n) {
        var s = t.getElementsByClassName(n);
        Array.from(s).forEach(function (r) {
          e[n] && re.applyClassUtilitiesToElement(r, e[n]);
        });
      });
    }
  }, {
    key: "apply",
    value: function apply(e, t) {
      At.applyDeepChatUtilities(e, e.htmlClassUtilities, t), re.applyCustomClassUtilities(e.htmlClassUtilities, t);
    }
  }, {
    key: "traverseNodes",
    value: function traverseNodes(e, t) {
      e.nodeType === Node.ELEMENT_NODE && t.push(e.outerHTML), e.childNodes.forEach(function (n) {
        re.traverseNodes(n, t);
      });
    }
  }, {
    key: "splitHTML",
    value: function splitHTML(e) {
      var n = new DOMParser().parseFromString(e, "text/html"),
        s = [];
      return n.body.childNodes.forEach(function (r) {
        re.traverseNodes(r, s);
      }), s;
    }
  }, {
    key: "isTemporaryBasedOnHTML",
    value: function isTemporaryBasedOnHTML(e) {
      var t = S();
      return t.innerHTML = e, At.isElementTemporary({
        outerContainer: t,
        bubbleElement: t,
        innerContainer: t
      });
    }
    // useful for removing event listeners
  }, {
    key: "replaceElementWithNewClone",
    value: function replaceElementWithNewClone(e, t) {
      var s;
      var n = (t || e).cloneNode(!0);
      return (s = e.parentNode) == null || s.replaceChild(n, e), n;
    }
  }, {
    key: "tryAddWrapper",
    value: function tryAddWrapper(e, t, n, s) {
      if (t && s) {
        var r = (n == null ? void 0 : n[s]) || (n == null ? void 0 : n[x]);
        if (r) return e.innerHTML = r, {
          contentEl: re.getTargetWrapper(e),
          wrapper: !0
        };
      }
      return {
        contentEl: e,
        wrapper: !1
      };
    }
  }, {
    key: "getTargetWrapper",
    value: function getTargetWrapper(e) {
      return e.getElementsByClassName(Fo)[0] || e;
    }
  }]);
}();
var $t = /*#__PURE__*/function () {
  function $t() {
    _classCallCheck(this, $t);
  }
  return _createClass($t, null, [{
    key: "createElements",
    value: function createElements(e, t, n, s) {
      var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
      var o = e.createMessageElementsOnOrientation("", n, s, r);
      o.bubbleElement[f].add($t.HTML_BUBBLE_CLASS);
      var _re$tryAddWrapper = re.tryAddWrapper(o.bubbleElement, t, e._customWrappers, n),
        a = _re$tryAddWrapper.contentEl;
      return a.innerHTML = t, o;
    }
  }, {
    key: "overwriteElements",
    value: function overwriteElements(e, t, n) {
      n.bubbleElement.innerHTML = t, re.apply(e, n.outerContainer), ie.flagHTMLUpdateClass(n.bubbleElement);
    }
    // prettier-ignore
  }, {
    key: "overwrite",
    value: function overwrite(e, t, n, s) {
      var r = e.messageToElements,
        o = N.overwriteMessage(r, s, t, n, L, $t.HTML_BUBBLE_CLASS);
      return o && $t.overwriteElements(e, t, o), o;
    }
  }, {
    key: "create",
    value: function create(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var o;
      var r = $t.createElements(e, t, n, s);
      return N.fillEmptyMessageElement(r.bubbleElement, t), re.apply(e, r.outerContainer), ie.flagHTMLUpdateClass(r.bubbleElement), e.applyCustomStyles(r, n, !1, (o = e.messageStyles) == null ? void 0 : o[L]), r;
    }
  }, {
    key: "add",
    value: function add(e, t, n, s) {
      var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
      if (s != null && s.status) {
        var a = this.overwrite(e, t, n, e.messageElementRefs);
        if (a) return a;
        s.status = !1;
      }
      if (r && e.messageElementRefs.length > 0 && re.isTemporaryBasedOnHTML(t)) return;
      var o = $t.create(e, t, n, r);
      return r || e.appendOuterContainerElemet(o.outerContainer), o;
    }
  }]);
}();
$t.HTML_BUBBLE_CLASS = "html-message";
var xt = $t;
var ia = /*#__PURE__*/function () {
  function ia() {
    _classCallCheck(this, ia);
  }
  return _createClass(ia, null, [{
    key: "katex",
    value: function katex(e, t, n) {
      var a = (n || {}).delimiter || "$";
      if (a.length !== 1) throw new Error("invalid delimiter");
      var c = function c(u, g) {
          var b;
          return ((b = window.katex) == null ? void 0 : b.renderToString(u, _objectSpread({
            displayMode: g,
            throwOnError: !1,
            output: "mathml"
          }, e))) || "";
        },
        l = function l(u, g, b) {
          var v = !1,
            _ = u.bMarks[g] + u.tShift[g],
            C = u.eMarks[g];
          if (_ + 1 > C) return !1;
          var D = u[R].charAt(_);
          if (D !== a) return !1;
          var le = _;
          _ = u.skipChars(_, D);
          var pe = _ - le;
          if (pe !== 2) return !1;
          var se = g;
          for (; ++se, !(se >= b || (_ = le = u.bMarks[se] + u.tShift[se], C = u.eMarks[se], _ < C && u.tShift[se] < u.blkIndent));) if (u[R].charAt(_) === a && !(u.tShift[se] - u.blkIndent >= 4) && (_ = u.skipChars(_, D), !(_ - le < pe) && (_ = u.skipSpaces(_), !(_ < C)))) {
            v = !0;
            break;
          }
          pe = u.tShift[g], u.line = se + (v ? 1 : 0);
          var Te = u.getLines(g + 1, se, pe, !0).replace(/[ \n]+/g, " ").trim();
          return u.tokens.push({
            type: "katex",
            params: null,
            content: Te,
            lines: [g, u.line],
            level: u.level,
            block: !0
          }), !0;
        },
        h = function h(u, g) {
          var b = u.pos,
            v = u.posMax;
          var _ = b;
          if (u[R].charAt(_) !== a) return !1;
          for (++_; _ < v && u[R].charAt(_) === a;) ++_;
          var C = u[R].slice(b, _);
          if (C.length > 2) return !1;
          var D = _;
          var le = 0;
          for (; _ < v;) {
            var pe = u[R].charAt(_);
            if (pe === "{" && (_ === 0 || u[R].charAt(_ - 1) !== "\\")) le += 1;else if (pe === "}" && (_ === 0 || u[R].charAt(_ - 1) !== "\\")) {
              if (le -= 1, le < 0) return !1;
            } else if (pe === a && le === 0) {
              var se = _;
              var Te = _ + 1;
              for (; Te < v && u[R].charAt(Te) === a;) ++Te;
              if (Te - se === C.length) {
                if (!g) {
                  var Ft = u[R].slice(D, se).replace(/[ \n]+/g, " ").trim();
                  u.push({
                    type: "katex",
                    content: Ft,
                    block: C.length > 1,
                    level: u.level
                  });
                }
                return u.pos = Te, !0;
              }
            }
            _ += 1;
          }
          return g || (u.pending += C), u.pos += C.length, !0;
        };
      t.inline.ruler.push("katex", h, n), t.block.ruler.push("katex", l, n), t.renderer.rules.katex = function (u, g) {
        return c(u[g].content, u[g].block);
      }, t.renderer.rules.katex.delimiter = a;
    }
  }]);
}();
var ws;
function ho(i) {
  return ws = ws || document.createElement("textarea"), ws.innerHTML = "&" + i + ";", ws.value;
}
var ra = Object.prototype.hasOwnProperty;
function oa(i, e) {
  return i ? ra.call(i, e) : !1;
}
function uo(i) {
  var e = [].slice.call(arguments, 1);
  return e.forEach(function (t) {
    if (t) {
      if (_typeof(t) != "object") throw new TypeError(t + "must be object");
      Object.keys(t).forEach(function (n) {
        i[n] = t[n];
      });
    }
  }), i;
}
var aa = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function os(i) {
  return i.indexOf("\\") < 0 ? i : i.replace(aa, "$1");
}
function po(i) {
  return !(i >= 55296 && i <= 57343 || i >= 64976 && i <= 65007 || (i & 65535) === 65535 || (i & 65535) === 65534 || i >= 0 && i <= 8 || i === 11 || i >= 14 && i <= 31 || i >= 127 && i <= 159 || i > 1114111);
}
function Mi(i) {
  if (i > 65535) {
    i -= 65536;
    var e = 55296 + (i >> 10),
      t = 56320 + (i & 1023);
    return String.fromCharCode(e, t);
  }
  return String.fromCharCode(i);
}
var ca = /&([a-z#][a-z0-9]{1,31});/gi,
  la = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
function ha(i, e) {
  var t = 0,
    n = ho(e);
  return e !== n ? n : e.charCodeAt(0) === 35 && la.test(e) && (t = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), po(t)) ? Mi(t) : i;
}
function fn(i) {
  return i.indexOf("&") < 0 ? i : i.replace(ca, ha);
}
var da = /[&<>"]/,
  ua = /[&<>"]/g,
  pa = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
function fa(i) {
  return pa[i];
}
function Ve(i) {
  return da.test(i) ? i.replace(ua, fa) : i;
}
var I = {};
I.blockquote_open = function () {
  return "<blockquote>\n";
};
I.blockquote_close = function (i, e) {
  return "</blockquote>" + yn(i, e);
};
I.code = function (i, e) {
  return i[e].block ? "<pre><code>" + Ve(i[e].content) + "</code></pre>" + yn(i, e) : "<code>" + Ve(i[e].content) + "</code>";
};
I.fence = function (i, e, t, n, s) {
  var r = i[e],
    o = "",
    a = t.langPrefix,
    c = "",
    l,
    h,
    u;
  if (r.params) {
    if (l = r.params.split(/\s+/g), h = l.join(" "), oa(s.rules.fence_custom, l[0])) return s.rules.fence_custom[l[0]](i, e, t, n, s);
    c = Ve(fn(os(h))), o = ' class="' + a + c + '"';
  }
  return t.highlight ? u = t.highlight.apply(t.highlight, [r.content].concat(l)) || Ve(r.content) : u = Ve(r.content), "<pre><code" + o + ">" + u + "</code></pre>" + yn(i, e);
};
I.fence_custom = {};
I.heading_open = function (i, e) {
  return "<h" + i[e].hLevel + ">";
};
I.heading_close = function (i, e) {
  return "</h" + i[e].hLevel + ">\n";
};
I.hr = function (i, e, t) {
  return (t.xhtmlOut ? "<hr />" : "<hr>") + yn(i, e);
};
I.bullet_list_open = function () {
  return "<ul>\n";
};
I.bullet_list_close = function (i, e) {
  return "</ul>" + yn(i, e);
};
I.list_item_open = function () {
  return "<li>";
};
I.list_item_close = function () {
  return "</li>\n";
};
I.ordered_list_open = function (i, e) {
  var t = i[e],
    n = t.order > 1 ? ' start="' + t.order + '"' : "";
  return "<ol" + n + ">\n";
};
I.ordered_list_close = function (i, e) {
  return "</ol>" + yn(i, e);
};
I.paragraph_open = function (i, e) {
  return i[e].tight ? "" : "<p>";
};
I.paragraph_close = function (i, e) {
  var t = !(i[e].tight && e && i[e - 1].type === "inline" && !i[e - 1].content);
  return (i[e].tight ? "" : "</p>") + (t ? yn(i, e) : "");
};
I.link_open = function (i, e, t) {
  var n = i[e].title ? ' title="' + Ve(fn(i[e].title)) + '"' : "",
    s = t.linkTarget ? ' target="' + t.linkTarget + '"' : "";
  return '<a href="' + Ve(i[e].href) + '"' + n + s + ">";
};
I.link_close = function () {
  return "</a>";
};
I.image = function (i, e, t) {
  var n = ' src="' + Ve(i[e].src) + '"',
    s = i[e].title ? ' title="' + Ve(fn(i[e].title)) + '"' : "",
    r = ' alt="' + (i[e].alt ? Ve(fn(os(i[e].alt))) : "") + '"',
    o = t.xhtmlOut ? " /" : "";
  return "<img" + n + r + s + o + ">";
};
I.table_open = function () {
  return "<table>\n";
};
I.table_close = function () {
  return "</table>\n";
};
I.thead_open = function () {
  return "<thead>\n";
};
I.thead_close = function () {
  return "</thead>\n";
};
I.tbody_open = function () {
  return "<tbody>\n";
};
I.tbody_close = function () {
  return "</tbody>\n";
};
I.tr_open = function () {
  return "<tr>";
};
I.tr_close = function () {
  return "</tr>\n";
};
I.th_open = function (i, e) {
  var t = i[e];
  return "<th" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
I.th_close = function () {
  return "</th>";
};
I.td_open = function (i, e) {
  var t = i[e];
  return "<td" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
I.td_close = function () {
  return "</td>";
};
I.strong_open = function () {
  return "<strong>";
};
I.strong_close = function () {
  return "</strong>";
};
I.em_open = function () {
  return "<em>";
};
I.em_close = function () {
  return "</em>";
};
I.del_open = function () {
  return "<del>";
};
I.del_close = function () {
  return "</del>";
};
I.ins_open = function () {
  return "<ins>";
};
I.ins_close = function () {
  return "</ins>";
};
I.mark_open = function () {
  return "<mark>";
};
I.mark_close = function () {
  return "</mark>";
};
I.sub = function (i, e) {
  return "<sub>" + Ve(i[e].content) + "</sub>";
};
I.sup = function (i, e) {
  return "<sup>" + Ve(i[e].content) + "</sup>";
};
I.hardbreak = function (i, e, t) {
  return t.xhtmlOut ? "<br />\n" : "<br>\n";
};
I.softbreak = function (i, e, t) {
  return t.breaks ? t.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
};
I.text = function (i, e) {
  return Ve(i[e].content);
};
I.htmlblock = function (i, e) {
  return i[e].content;
};
I.htmltag = function (i, e) {
  return i[e].content;
};
I.abbr_open = function (i, e) {
  return '<abbr title="' + Ve(fn(i[e].title)) + '">';
};
I.abbr_close = function () {
  return "</abbr>";
};
I.footnote_ref = function (i, e) {
  var t = Number(i[e].id + 1).toString(),
    n = "fnref" + t;
  return i[e].subId > 0 && (n += ":" + i[e].subId), '<sup class="footnote-ref"><a href="#fn' + t + '" id="' + n + '">[' + t + "]</a></sup>";
};
I.footnote_block_open = function (i, e, t) {
  var n = t.xhtmlOut ? "<hr class=\"footnotes-sep\" />\n" : "<hr class=\"footnotes-sep\">\n";
  return n + "<section class=\"footnotes\">\n<ol class=\"footnotes-list\">\n";
};
I.footnote_block_close = function () {
  return "</ol>\n</section>\n";
};
I.footnote_open = function (i, e) {
  var t = Number(i[e].id + 1).toString();
  return '<li id="fn' + t + '"  class="footnote-item">';
};
I.footnote_close = function () {
  return "</li>\n";
};
I.footnote_anchor = function (i, e) {
  var t = Number(i[e].id + 1).toString(),
    n = "fnref" + t;
  return i[e].subId > 0 && (n += ":" + i[e].subId), ' <a href="#' + n + '" class="footnote-backref">↩</a>';
};
I.dl_open = function () {
  return "<dl>\n";
};
I.dt_open = function () {
  return "<dt>";
};
I.dd_open = function () {
  return "<dd>";
};
I.dl_close = function () {
  return "</dl>\n";
};
I.dt_close = function () {
  return "</dt>\n";
};
I.dd_close = function () {
  return "</dd>\n";
};
function fo(i, e) {
  return ++e >= i.length - 2 ? e : i[e].type === "paragraph_open" && i[e].tight && i[e + 1].type === "inline" && i[e + 1].content.length === 0 && i[e + 2].type === "paragraph_close" && i[e + 2].tight ? fo(i, e + 2) : e;
}
var yn = I.getBreak = function (e, t) {
  return t = fo(e, t), t < e.length && e[t].type === "list_item_close" ? "" : "\n";
};
function tr() {
  this.rules = uo({}, I), this.getBreak = I.getBreak;
}
tr.prototype.renderInline = function (i, e, t) {
  for (var n = this.rules, s = i.length, r = 0, o = ""; s--;) o += n[i[r].type](i, r++, e, t, this);
  return o;
};
tr.prototype.render = function (i, e, t) {
  for (var n = this.rules, s = i.length, r = -1, o = ""; ++r < s;) i[r].type === "inline" ? o += this.renderInline(i[r].children, e, t) : o += n[i[r].type](i, r, e, t, this);
  return o;
};
function Qe() {
  this.__rules__ = [], this.__cache__ = null;
}
Qe.prototype.__find__ = function (i) {
  for (var e = this.__rules__.length, t = -1; e--;) if (this.__rules__[++t].name === i) return t;
  return -1;
};
Qe.prototype.__compile__ = function () {
  var i = this,
    e = [""];
  i.__rules__.forEach(function (t) {
    t.enabled && t.alt.forEach(function (n) {
      e.indexOf(n) < 0 && e.push(n);
    });
  }), i.__cache__ = {}, e.forEach(function (t) {
    i.__cache__[t] = [], i.__rules__.forEach(function (n) {
      n.enabled && (t && n.alt.indexOf(t) < 0 || i.__cache__[t].push(n.fn));
    });
  });
};
Qe.prototype.at = function (i, e, t) {
  var n = this.__find__(i),
    s = t || {};
  if (n === -1) throw new Error("Parser rule not found: " + i);
  this.__rules__[n].fn = e, this.__rules__[n].alt = s.alt || [], this.__cache__ = null;
};
Qe.prototype.before = function (i, e, t, n) {
  var s = this.__find__(i),
    r = n || {};
  if (s === -1) throw new Error("Parser rule not found: " + i);
  this.__rules__.splice(s, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
Qe.prototype.after = function (i, e, t, n) {
  var s = this.__find__(i),
    r = n || {};
  if (s === -1) throw new Error("Parser rule not found: " + i);
  this.__rules__.splice(s + 1, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
Qe.prototype.push = function (i, e, t) {
  var n = t || {};
  this.__rules__.push({
    name: i,
    enabled: !0,
    fn: e,
    alt: n.alt || []
  }), this.__cache__ = null;
};
Qe.prototype.enable = function (i, e) {
  i = Array.isArray(i) ? i : [i], e && this.__rules__.forEach(function (t) {
    t.enabled = !1;
  }), i.forEach(function (t) {
    var n = this.__find__(t);
    if (n < 0) throw new Error("Rules manager: invalid rule name " + t);
    this.__rules__[n].enabled = !0;
  }, this), this.__cache__ = null;
};
Qe.prototype.disable = function (i) {
  i = Array.isArray(i) ? i : [i], i.forEach(function (e) {
    var t = this.__find__(e);
    if (t < 0) throw new Error("Rules manager: invalid rule name " + e);
    this.__rules__[t].enabled = !1;
  }, this), this.__cache__ = null;
};
Qe.prototype.getRules = function (i) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[i] || [];
};
function ma(i) {
  i.inlineMode ? i.tokens.push({
    type: "inline",
    content: i.src.replace(/\n/g, " ").trim(),
    level: 0,
    lines: [0, 1],
    children: []
  }) : i.block.parse(i.src, i.options, i.env, i.tokens);
}
function En(i, e, t, n, s) {
  this.src = i, this.env = n, this.options = t, this.parser = e, this.tokens = s, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = [], this.isInLabel = !1, this.linkLevel = 0, this.linkContent = "", this.labelUnmatchedScopes = 0;
}
En.prototype.pushPending = function () {
  this.tokens.push({
    type: "text",
    content: this.pending,
    level: this.pendingLevel
  }), this.pending = "";
};
En.prototype.push = function (i) {
  this.pending && this.pushPending(), this.tokens.push(i), this.pendingLevel = this.level;
};
En.prototype.cacheSet = function (i, e) {
  for (var t = this.cache.length; t <= i; t++) this.cache.push(0);
  this.cache[i] = e;
};
En.prototype.cacheGet = function (i) {
  return i < this.cache.length ? this.cache[i] : 0;
};
function as(i, e) {
  var t,
    n,
    s,
    r = -1,
    o = i.posMax,
    a = i.pos,
    c = i.isInLabel;
  if (i.isInLabel) return -1;
  if (i.labelUnmatchedScopes) return i.labelUnmatchedScopes--, -1;
  for (i.pos = e + 1, i.isInLabel = !0, t = 1; i.pos < o;) {
    if (s = i.src.charCodeAt(i.pos), s === 91) t++;else if (s === 93 && (t--, t === 0)) {
      n = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return n ? (r = i.pos, i.labelUnmatchedScopes = 0) : i.labelUnmatchedScopes = t - 1, i.pos = a, i.isInLabel = c, r;
}
function ga(i, e, t, n) {
  var s, r, o, a, c, l;
  if (i.charCodeAt(0) !== 42 || i.charCodeAt(1) !== 91 || i.indexOf("]:") === -1 || (s = new En(i, e, t, n, []), r = as(s, 1), r < 0 || i.charCodeAt(r + 1) !== 58)) return -1;
  for (a = s.posMax, o = r + 2; o < a && s.src.charCodeAt(o) !== 10; o++);
  return c = i.slice(2, r), l = i.slice(r + 2, o).trim(), l.length === 0 ? -1 : (n.abbreviations || (n.abbreviations = {}), _typeof(n.abbreviations[":" + c]) > "u" && (n.abbreviations[":" + c] = l), o);
}
function ba(i) {
  var e = i.tokens,
    t,
    n,
    s,
    r;
  if (!i.inlineMode) {
    for (t = 1, n = e.length - 1; t < n; t++) if (e[t - 1].type === "paragraph_open" && e[t].type === "inline" && e[t + 1].type === "paragraph_close") {
      for (s = e[t].content; s.length && (r = ga(s, i.inline, i.options, i.env), !(r < 0));) s = s.slice(r).trim();
      e[t].content = s, s.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
    }
  }
}
function ki(i) {
  var e = fn(i);
  try {
    e = decodeURI(e);
  } catch (_unused2) {}
  return encodeURI(e);
}
function mo(i, e) {
  var t,
    n,
    s,
    r = e,
    o = i.posMax;
  if (i.src.charCodeAt(e) === 60) {
    for (e++; e < o;) {
      if (t = i.src.charCodeAt(e), t === 10) return !1;
      if (t === 62) return s = ki(os(i.src.slice(r + 1, e))), i.parser.validateLink(s) ? (i.pos = e + 1, i.linkContent = s, !0) : !1;
      if (t === 92 && e + 1 < o) {
        e += 2;
        continue;
      }
      e++;
    }
    return !1;
  }
  for (n = 0; e < o && (t = i.src.charCodeAt(e), !(t === 32 || t < 32 || t === 127));) {
    if (t === 92 && e + 1 < o) {
      e += 2;
      continue;
    }
    if (t === 40 && (n++, n > 1) || t === 41 && (n--, n < 0)) break;
    e++;
  }
  return r === e || (s = os(i.src.slice(r, e)), !i.parser.validateLink(s)) ? !1 : (i.linkContent = s, i.pos = e, !0);
}
function go(i, e) {
  var t,
    n = e,
    s = i.posMax,
    r = i.src.charCodeAt(e);
  if (r !== 34 && r !== 39 && r !== 40) return !1;
  for (e++, r === 40 && (r = 41); e < s;) {
    if (t = i.src.charCodeAt(e), t === r) return i.pos = e + 1, i.linkContent = os(i.src.slice(n + 1, e)), !0;
    if (t === 92 && e + 1 < s) {
      e += 2;
      continue;
    }
    e++;
  }
  return !1;
}
function bo(i) {
  return i.trim().replace(/\s+/g, " ").toUpperCase();
}
function ya(i, e, t, n) {
  var s, r, o, a, c, l, h, u, g;
  if (i.charCodeAt(0) !== 91 || i.indexOf("]:") === -1 || (s = new En(i, e, t, n, []), r = as(s, 0), r < 0 || i.charCodeAt(r + 1) !== 58)) return -1;
  for (a = s.posMax, o = r + 2; o < a && (c = s.src.charCodeAt(o), !(c !== 32 && c !== 10)); o++);
  if (!mo(s, o)) return -1;
  for (h = s.linkContent, o = s.pos, l = o, o = o + 1; o < a && (c = s.src.charCodeAt(o), !(c !== 32 && c !== 10)); o++);
  for (o < a && l !== o && go(s, o) ? (u = s.linkContent, o = s.pos) : (u = "", o = l); o < a && s.src.charCodeAt(o) === 32;) o++;
  return o < a && s.src.charCodeAt(o) !== 10 ? -1 : (g = bo(i.slice(1, r)), _typeof(n.references[g]) > "u" && (n.references[g] = {
    title: u,
    href: h
  }), o);
}
function Ea(i) {
  var e = i.tokens,
    t,
    n,
    s,
    r;
  if (i.env.references = i.env.references || {}, !i.inlineMode) {
    for (t = 1, n = e.length - 1; t < n; t++) if (e[t].type === "inline" && e[t - 1].type === "paragraph_open" && e[t + 1].type === "paragraph_close") {
      for (s = e[t].content; s.length && (r = ya(s, i.inline, i.options, i.env), !(r < 0));) s = s.slice(r).trim();
      e[t].content = s, s.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
    }
  }
}
function va(i) {
  var e = i.tokens,
    t,
    n,
    s;
  for (n = 0, s = e.length; n < s; n++) t = e[n], t.type === "inline" && i.inline.parse(t.content, i.options, i.env, t.children);
}
function _a(i) {
  var e,
    t,
    n,
    s,
    r,
    o,
    a,
    c,
    l,
    h = 0,
    u = !1,
    g = {};
  if (i.env.footnotes && (i.tokens = i.tokens.filter(function (b) {
    return b.type === "footnote_reference_open" ? (u = !0, c = [], l = b.label, !1) : b.type === "footnote_reference_close" ? (u = !1, g[":" + l] = c, !1) : (u && c.push(b), !u);
  }), !!i.env.footnotes.list)) {
    for (o = i.env.footnotes.list, i.tokens.push({
      type: "footnote_block_open",
      level: h++
    }), e = 0, t = o.length; e < t; e++) {
      for (i.tokens.push({
        type: "footnote_open",
        id: e,
        level: h++
      }), o[e].tokens ? (a = [], a.push({
        type: "paragraph_open",
        tight: !1,
        level: h++
      }), a.push({
        type: "inline",
        content: "",
        level: h,
        children: o[e].tokens
      }), a.push({
        type: "paragraph_close",
        tight: !1,
        level: --h
      })) : o[e].label && (a = g[":" + o[e].label]), i.tokens = i.tokens.concat(a), i.tokens[i.tokens.length - 1].type === "paragraph_close" ? r = i.tokens.pop() : r = null, s = o[e].count > 0 ? o[e].count : 1, n = 0; n < s; n++) i.tokens.push({
        type: "footnote_anchor",
        id: e,
        subId: n,
        level: h
      });
      r && i.tokens.push(r), i.tokens.push({
        type: "footnote_close",
        level: --h
      });
    }
    i.tokens.push({
      type: "footnote_block_close",
      level: --h
    });
  }
}
var kr = " \n()[]'\".,!?-";
function vi(i) {
  return i.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1");
}
function Sa(i) {
  var e,
    t,
    n,
    s,
    r,
    o,
    a,
    c,
    l,
    h,
    u,
    g,
    b = i.tokens;
  if (i.env.abbreviations) {
    for (i.env.abbrRegExp || (g = "(^|[" + kr.split("").map(vi).join("") + "])(" + Object.keys(i.env.abbreviations).map(function (v) {
      return v.substr(1);
    }).sort(function (v, _) {
      return _.length - v.length;
    }).map(vi).join("|") + ")($|[" + kr.split("").map(vi).join("") + "])", i.env.abbrRegExp = new RegExp(g, "g")), h = i.env.abbrRegExp, t = 0, n = b.length; t < n; t++) if (b[t].type === "inline") {
      for (s = b[t].children, e = s.length - 1; e >= 0; e--) if (r = s[e], r.type === "text") {
        for (c = 0, o = r.content, h.lastIndex = 0, l = r.level, a = []; u = h.exec(o);) h.lastIndex > c && a.push({
          type: "text",
          content: o.slice(c, u.index + u[1].length),
          level: l
        }), a.push({
          type: "abbr_open",
          title: i.env.abbreviations[":" + u[2]],
          level: l++
        }), a.push({
          type: "text",
          content: u[2],
          level: l
        }), a.push({
          type: "abbr_close",
          level: --l
        }), c = h.lastIndex - u[3].length;
        a.length && (c < o.length && a.push({
          type: "text",
          content: o.slice(c),
          level: l
        }), b[t].children = s = [].concat(s.slice(0, e), a, s.slice(e + 1)));
      }
    }
  }
}
var Aa = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
  xa = /\((c|tm|r|p)\)/ig,
  wa = {
    c: "©",
    r: "®",
    p: "§",
    tm: "™"
  };
function Ca(i) {
  return i.indexOf("(") < 0 ? i : i.replace(xa, function (e, t) {
    return wa[t.toLowerCase()];
  });
}
function Ta(i) {
  var e, t, n, s, r;
  if (i.options.typographer) {
    for (r = i.tokens.length - 1; r >= 0; r--) if (i.tokens[r].type === "inline") for (s = i.tokens[r].children, e = s.length - 1; e >= 0; e--) t = s[e], t.type === "text" && (n = t.content, n = Ca(n), Aa.test(n) && (n = n.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/mg, "$1—$2").replace(/(^|\s)--(\s|$)/mg, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/mg, "$1–$2")), t.content = n);
  }
}
var Ra = /['"]/,
  Lr = /['"]/g,
  Ia = /[-\s()\[\]]/,
  Pr = "’";
function Or(i, e) {
  return e < 0 || e >= i.length ? !1 : !Ia.test(i[e]);
}
function An(i, e, t) {
  return i.substr(0, e) + t + i.substr(e + 1);
}
function Ma(i) {
  var e, t, n, s, r, o, a, c, l, h, u, g, b, v, _, C, D;
  if (i.options.typographer) {
    for (D = [], _ = i.tokens.length - 1; _ >= 0; _--) if (i.tokens[_].type === "inline") {
      for (C = i.tokens[_].children, D.length = 0, e = 0; e < C.length; e++) if (t = C[e], !(t.type !== "text" || Ra.test(t.text))) {
        for (a = C[e].level, b = D.length - 1; b >= 0 && !(D[b].level <= a); b--);
        D.length = b + 1, n = t.content, r = 0, o = n.length;
        e: for (; r < o && (Lr.lastIndex = r, s = Lr.exec(n), !!s);) {
          if (c = !Or(n, s.index - 1), r = s.index + 1, v = s[0] === "'", l = !Or(n, r), !l && !c) {
            v && (t.content = An(t.content, s.index, Pr));
            continue;
          }
          if (u = !l, g = !c, g) {
            for (b = D.length - 1; b >= 0 && (h = D[b], !(D[b].level < a)); b--) if (h.single === v && D[b].level === a) {
              h = D[b], v ? (C[h.token].content = An(C[h.token].content, h.pos, i.options.quotes[2]), t.content = An(t.content, s.index, i.options.quotes[3])) : (C[h.token].content = An(C[h.token].content, h.pos, i.options.quotes[0]), t.content = An(t.content, s.index, i.options.quotes[1])), D.length = b;
              continue e;
            }
          }
          u ? D.push({
            token: e,
            pos: s.index,
            single: v,
            level: a
          }) : g && v && (t.content = An(t.content, s.index, Pr));
        }
      }
    }
  }
}
var _i = [["block", ma], ["abbr", ba], ["references", Ea], ["inline", va], ["footnote_tail", _a], ["abbr2", Sa], ["replacements", Ta], ["smartquotes", Ma]];
function yo() {
  this.options = {}, this.ruler = new Qe();
  for (var i = 0; i < _i.length; i++) this.ruler.push(_i[i][0], _i[i][1]);
}
yo.prototype.process = function (i) {
  var e, t, n;
  for (n = this.ruler.getRules(""), e = 0, t = n.length; e < t; e++) n[e](i);
};
function vn(i, e, t, n, s) {
  var r, o, a, c, l, h, u;
  for (this.src = i, this.parser = e, this.options = t, this.env = n, this.tokens = s, this.bMarks = [], this.eMarks = [], this.tShift = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, this.level = 0, this.result = "", o = this.src, h = 0, u = !1, a = c = h = 0, l = o.length; c < l; c++) {
    if (r = o.charCodeAt(c), !u) if (r === 32) {
      h++;
      continue;
    } else u = !0;
    (r === 10 || c === l - 1) && (r !== 10 && c++, this.bMarks.push(a), this.eMarks.push(c), this.tShift.push(h), u = !1, h = 0, a = c + 1);
  }
  this.bMarks.push(o.length), this.eMarks.push(o.length), this.tShift.push(0), this.lineMax = this.bMarks.length - 1;
}
vn.prototype.isEmpty = function (e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
vn.prototype.skipEmptyLines = function (e) {
  for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++);
  return e;
};
vn.prototype.skipSpaces = function (e) {
  for (var t = this.src.length; e < t && this.src.charCodeAt(e) === 32; e++);
  return e;
};
vn.prototype.skipChars = function (e, t) {
  for (var n = this.src.length; e < n && this.src.charCodeAt(e) === t; e++);
  return e;
};
vn.prototype.skipCharsBack = function (e, t, n) {
  if (e <= n) return e;
  for (; e > n;) if (t !== this.src.charCodeAt(--e)) return e + 1;
  return e;
};
vn.prototype.getLines = function (e, t, n, s) {
  var r,
    o,
    a,
    c,
    l,
    h = e;
  if (e >= t) return "";
  if (h + 1 === t) return o = this.bMarks[h] + Math.min(this.tShift[h], n), a = s ? this.eMarks[h] + 1 : this.eMarks[h], this.src.slice(o, a);
  for (c = new Array(t - e), r = 0; h < t; h++, r++) l = this.tShift[h], l > n && (l = n), l < 0 && (l = 0), o = this.bMarks[h] + l, h + 1 < t || s ? a = this.eMarks[h] + 1 : a = this.eMarks[h], c[r] = this.src.slice(o, a);
  return c.join("");
};
function ka(i, e, t) {
  var n, s;
  if (i.tShift[e] - i.blkIndent < 4) return !1;
  for (s = n = e + 1; n < t;) {
    if (i.isEmpty(n)) {
      n++;
      continue;
    }
    if (i.tShift[n] - i.blkIndent >= 4) {
      n++, s = n;
      continue;
    }
    break;
  }
  return i.line = n, i.tokens.push({
    type: "code",
    content: i.getLines(e, s, 4 + i.blkIndent, !0),
    block: !0,
    lines: [e, i.line],
    level: i.level
  }), !0;
}
function La(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l = !1,
    h = i.bMarks[e] + i.tShift[e],
    u = i.eMarks[e];
  if (h + 3 > u || (s = i.src.charCodeAt(h), s !== 126 && s !== 96) || (c = h, h = i.skipChars(h, s), r = h - c, r < 3) || (o = i.src.slice(h, u).trim(), o.indexOf("`") >= 0)) return !1;
  if (n) return !0;
  for (a = e; a++, !(a >= t || (h = c = i.bMarks[a] + i.tShift[a], u = i.eMarks[a], h < u && i.tShift[a] < i.blkIndent));) if (i.src.charCodeAt(h) === s && !(i.tShift[a] - i.blkIndent >= 4) && (h = i.skipChars(h, s), !(h - c < r) && (h = i.skipSpaces(h), !(h < u)))) {
    l = !0;
    break;
  }
  return r = i.tShift[e], i.line = a + (l ? 1 : 0), i.tokens.push({
    type: "fence",
    params: o,
    content: i.getLines(e + 1, a, r, !0),
    lines: [e, i.line],
    level: i.level
  }), !0;
}
function Pa(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l,
    h,
    u,
    g,
    b,
    v,
    _ = i.bMarks[e] + i.tShift[e],
    C = i.eMarks[e];
  if (_ > C || i.src.charCodeAt(_++) !== 62 || i.level >= i.options.maxNesting) return !1;
  if (n) return !0;
  for (i.src.charCodeAt(_) === 32 && _++, c = i.blkIndent, i.blkIndent = 0, a = [i.bMarks[e]], i.bMarks[e] = _, _ = _ < C ? i.skipSpaces(_) : _, r = _ >= C, o = [i.tShift[e]], i.tShift[e] = _ - i.bMarks[e], u = i.parser.ruler.getRules("blockquote"), s = e + 1; s < t && (_ = i.bMarks[s] + i.tShift[s], C = i.eMarks[s], !(_ >= C)); s++) {
    if (i.src.charCodeAt(_++) === 62) {
      i.src.charCodeAt(_) === 32 && _++, a.push(i.bMarks[s]), i.bMarks[s] = _, _ = _ < C ? i.skipSpaces(_) : _, r = _ >= C, o.push(i.tShift[s]), i.tShift[s] = _ - i.bMarks[s];
      continue;
    }
    if (r) break;
    for (v = !1, g = 0, b = u.length; g < b; g++) if (u[g](i, s, t, !0)) {
      v = !0;
      break;
    }
    if (v) break;
    a.push(i.bMarks[s]), o.push(i.tShift[s]), i.tShift[s] = -1337;
  }
  for (l = i.parentType, i.parentType = "blockquote", i.tokens.push({
    type: "blockquote_open",
    lines: h = [e, 0],
    level: i.level++
  }), i.parser.tokenize(i, e, s), i.tokens.push({
    type: "blockquote_close",
    level: --i.level
  }), i.parentType = l, h[1] = i.line, g = 0; g < o.length; g++) i.bMarks[g + e] = a[g], i.tShift[g + e] = o[g];
  return i.blkIndent = c, !0;
}
function Oa(i, e, t, n) {
  var s,
    r,
    o,
    a = i.bMarks[e],
    c = i.eMarks[e];
  if (a += i.tShift[e], a > c || (s = i.src.charCodeAt(a++), s !== 42 && s !== 45 && s !== 95)) return !1;
  for (r = 1; a < c;) {
    if (o = i.src.charCodeAt(a++), o !== s && o !== 32) return !1;
    o === s && r++;
  }
  return r < 3 ? !1 : (n || (i.line = e + 1, i.tokens.push({
    type: "hr",
    lines: [e, i.line],
    level: i.level
  })), !0);
}
function Nr(i, e) {
  var t, n, s;
  return n = i.bMarks[e] + i.tShift[e], s = i.eMarks[e], n >= s || (t = i.src.charCodeAt(n++), t !== 42 && t !== 45 && t !== 43) || n < s && i.src.charCodeAt(n) !== 32 ? -1 : n;
}
function Br(i, e) {
  var t,
    n = i.bMarks[e] + i.tShift[e],
    s = i.eMarks[e];
  if (n + 1 >= s || (t = i.src.charCodeAt(n++), t < 48 || t > 57)) return -1;
  for (;;) {
    if (n >= s) return -1;
    if (t = i.src.charCodeAt(n++), !(t >= 48 && t <= 57)) {
      if (t === 41 || t === 46) break;
      return -1;
    }
  }
  return n < s && i.src.charCodeAt(n) !== 32 ? -1 : n;
}
function Na(i, e) {
  var t,
    n,
    s = i.level + 2;
  for (t = e + 2, n = i.tokens.length - 2; t < n; t++) i.tokens[t].level === s && i.tokens[t].type === "paragraph_open" && (i.tokens[t + 2].tight = !0, i.tokens[t].tight = !0, t += 2);
}
function Ba(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l,
    h,
    u,
    g,
    b,
    v,
    _,
    C,
    D,
    le,
    pe,
    se,
    Te,
    Ft = !0,
    Ut,
    Ke,
    Sr,
    gi;
  if ((u = Br(i, e)) >= 0) C = !0;else if ((u = Nr(i, e)) >= 0) C = !1;else return !1;
  if (i.level >= i.options.maxNesting) return !1;
  if (_ = i.src.charCodeAt(u - 1), n) return !0;
  for (le = i.tokens.length, C ? (h = i.bMarks[e] + i.tShift[e], v = Number(i.src.substr(h, u - h - 1)), i.tokens.push({
    type: "ordered_list_open",
    order: v,
    lines: se = [e, 0],
    level: i.level++
  })) : i.tokens.push({
    type: "bullet_list_open",
    lines: se = [e, 0],
    level: i.level++
  }), s = e, pe = !1, Ut = i.parser.ruler.getRules("list"); s < t && (D = i.skipSpaces(u), g = i.eMarks[s], D >= g ? b = 1 : b = D - u, b > 4 && (b = 1), b < 1 && (b = 1), r = u - i.bMarks[s] + b, i.tokens.push({
    type: "list_item_open",
    lines: Te = [e, 0],
    level: i.level++
  }), a = i.blkIndent, c = i.tight, o = i.tShift[e], l = i.parentType, i.tShift[e] = D - i.bMarks[e], i.blkIndent = r, i.tight = !0, i.parentType = "list", i.parser.tokenize(i, e, t, !0), (!i.tight || pe) && (Ft = !1), pe = i.line - e > 1 && i.isEmpty(i.line - 1), i.blkIndent = a, i.tShift[e] = o, i.tight = c, i.parentType = l, i.tokens.push({
    type: "list_item_close",
    level: --i.level
  }), s = e = i.line, Te[1] = s, D = i.bMarks[e], !(s >= t || i.isEmpty(s) || i.tShift[s] < i.blkIndent));) {
    for (gi = !1, Ke = 0, Sr = Ut.length; Ke < Sr; Ke++) if (Ut[Ke](i, s, t, !0)) {
      gi = !0;
      break;
    }
    if (gi) break;
    if (C) {
      if (u = Br(i, s), u < 0) break;
    } else if (u = Nr(i, s), u < 0) break;
    if (_ !== i.src.charCodeAt(u - 1)) break;
  }
  return i.tokens.push({
    type: C ? "ordered_list_close" : "bullet_list_close",
    level: --i.level
  }), se[1] = s, i.line = s, Ft && Na(i, le), !0;
}
function Da(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l = i.bMarks[e] + i.tShift[e],
    h = i.eMarks[e];
  if (l + 4 > h || i.src.charCodeAt(l) !== 91 || i.src.charCodeAt(l + 1) !== 94 || i.level >= i.options.maxNesting) return !1;
  for (a = l + 2; a < h; a++) {
    if (i.src.charCodeAt(a) === 32) return !1;
    if (i.src.charCodeAt(a) === 93) break;
  }
  return a === l + 2 || a + 1 >= h || i.src.charCodeAt(++a) !== 58 ? !1 : (n || (a++, i.env.footnotes || (i.env.footnotes = {}), i.env.footnotes.refs || (i.env.footnotes.refs = {}), c = i.src.slice(l + 2, a - 2), i.env.footnotes.refs[":" + c] = -1, i.tokens.push({
    type: "footnote_reference_open",
    label: c,
    level: i.level++
  }), s = i.bMarks[e], r = i.tShift[e], o = i.parentType, i.tShift[e] = i.skipSpaces(a) - a, i.bMarks[e] = a, i.blkIndent += 4, i.parentType = "footnote", i.tShift[e] < i.blkIndent && (i.tShift[e] += i.blkIndent, i.bMarks[e] -= i.blkIndent), i.parser.tokenize(i, e, t, !0), i.parentType = o, i.blkIndent -= 4, i.tShift[e] = r, i.bMarks[e] = s, i.tokens.push({
    type: "footnote_reference_close",
    level: --i.level
  })), !0);
}
function Fa(i, e, t, n) {
  var s,
    r,
    o,
    a = i.bMarks[e] + i.tShift[e],
    c = i.eMarks[e];
  if (a >= c || (s = i.src.charCodeAt(a), s !== 35 || a >= c)) return !1;
  for (r = 1, s = i.src.charCodeAt(++a); s === 35 && a < c && r <= 6;) r++, s = i.src.charCodeAt(++a);
  return r > 6 || a < c && s !== 32 ? !1 : (n || (c = i.skipCharsBack(c, 32, a), o = i.skipCharsBack(c, 35, a), o > a && i.src.charCodeAt(o - 1) === 32 && (c = o), i.line = e + 1, i.tokens.push({
    type: "heading_open",
    hLevel: r,
    lines: [e, i.line],
    level: i.level
  }), a < c && i.tokens.push({
    type: "inline",
    content: i.src.slice(a, c).trim(),
    level: i.level + 1,
    lines: [e, i.line],
    children: []
  }), i.tokens.push({
    type: "heading_close",
    hLevel: r,
    level: i.level
  })), !0);
}
function Ua(i, e, t) {
  var n,
    s,
    r,
    o = e + 1;
  return o >= t || i.tShift[o] < i.blkIndent || i.tShift[o] - i.blkIndent > 3 || (s = i.bMarks[o] + i.tShift[o], r = i.eMarks[o], s >= r) || (n = i.src.charCodeAt(s), n !== 45 && n !== 61) || (s = i.skipChars(s, n), s = i.skipSpaces(s), s < r) ? !1 : (s = i.bMarks[e] + i.tShift[e], i.line = o + 1, i.tokens.push({
    type: "heading_open",
    hLevel: n === 61 ? 1 : 2,
    lines: [e, i.line],
    level: i.level
  }), i.tokens.push({
    type: "inline",
    content: i.src.slice(s, i.eMarks[e]).trim(),
    level: i.level + 1,
    lines: [e, i.line - 1],
    children: []
  }), i.tokens.push({
    type: "heading_close",
    hLevel: n === 61 ? 1 : 2,
    level: i.level
  }), !0);
}
var Eo = {};
["article", "aside", "button", "blockquote", "body", "canvas", "caption", "col", "colgroup", "dd", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "iframe", "li", "map", "object", "ol", "output", "p", "pre", "progress", "script", "section", "style", "table", "tbody", "td", "textarea", "tfoot", "th", "tr", "thead", "ul", "video"].forEach(function (i) {
  Eo[i] = !0;
});
var Ha = /^<([a-zA-Z]{1,15})[\s\/>]/,
  ja = /^<\/([a-zA-Z]{1,15})[\s>]/;
function $a(i) {
  var e = i | 32;
  return e >= 97 && e <= 122;
}
function Ga(i, e, t, n) {
  var s,
    r,
    o,
    a = i.bMarks[e],
    c = i.eMarks[e],
    l = i.tShift[e];
  if (a += l, !i.options.html || l > 3 || a + 2 >= c || i.src.charCodeAt(a) !== 60) return !1;
  if (s = i.src.charCodeAt(a + 1), s === 33 || s === 63) {
    if (n) return !0;
  } else if (s === 47 || $a(s)) {
    if (s === 47) {
      if (r = i.src.slice(a, c).match(ja), !r) return !1;
    } else if (r = i.src.slice(a, c).match(Ha), !r) return !1;
    if (Eo[r[1].toLowerCase()] !== !0) return !1;
    if (n) return !0;
  } else return !1;
  for (o = e + 1; o < i.lineMax && !i.isEmpty(o);) o++;
  return i.line = o, i.tokens.push({
    type: "htmlblock",
    level: i.level,
    lines: [e, i.line],
    content: i.getLines(e, o, 0, !0)
  }), !0;
}
function Si(i, e) {
  var t = i.bMarks[e] + i.blkIndent,
    n = i.eMarks[e];
  return i.src.substr(t, n - t);
}
function za(i, e, t, n) {
  var s, r, o, a, c, l, h, u, g, b, v;
  if (e + 2 > t || (c = e + 1, i.tShift[c] < i.blkIndent) || (o = i.bMarks[c] + i.tShift[c], o >= i.eMarks[c]) || (s = i.src.charCodeAt(o), s !== 124 && s !== 45 && s !== 58) || (r = Si(i, e + 1), !/^[-:| ]+$/.test(r)) || (l = r.split("|"), l <= 2)) return !1;
  for (u = [], a = 0; a < l.length; a++) {
    if (g = l[a].trim(), !g) {
      if (a === 0 || a === l.length - 1) continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(g)) return !1;
    g.charCodeAt(g.length - 1) === 58 ? u.push(g.charCodeAt(0) === 58 ? "center" : "right") : g.charCodeAt(0) === 58 ? u.push("left") : u.push("");
  }
  if (r = Si(i, e).trim(), r.indexOf("|") === -1 || (l = r.replace(/^\||\|$/g, "").split("|"), u.length !== l.length)) return !1;
  if (n) return !0;
  for (i.tokens.push({
    type: "table_open",
    lines: b = [e, 0],
    level: i.level++
  }), i.tokens.push({
    type: "thead_open",
    lines: [e, e + 1],
    level: i.level++
  }), i.tokens.push({
    type: "tr_open",
    lines: [e, e + 1],
    level: i.level++
  }), a = 0; a < l.length; a++) i.tokens.push({
    type: "th_open",
    align: u[a],
    lines: [e, e + 1],
    level: i.level++
  }), i.tokens.push({
    type: "inline",
    content: l[a].trim(),
    lines: [e, e + 1],
    level: i.level,
    children: []
  }), i.tokens.push({
    type: "th_close",
    level: --i.level
  });
  for (i.tokens.push({
    type: "tr_close",
    level: --i.level
  }), i.tokens.push({
    type: "thead_close",
    level: --i.level
  }), i.tokens.push({
    type: "tbody_open",
    lines: v = [e + 2, 0],
    level: i.level++
  }), c = e + 2; c < t && !(i.tShift[c] < i.blkIndent || (r = Si(i, c).trim(), r.indexOf("|") === -1)); c++) {
    for (l = r.replace(/^\||\|$/g, "").split("|"), i.tokens.push({
      type: "tr_open",
      level: i.level++
    }), a = 0; a < l.length; a++) i.tokens.push({
      type: "td_open",
      align: u[a],
      level: i.level++
    }), h = l[a].substring(l[a].charCodeAt(0) === 124 ? 1 : 0, l[a].charCodeAt(l[a].length - 1) === 124 ? l[a].length - 1 : l[a].length).trim(), i.tokens.push({
      type: "inline",
      content: h,
      level: i.level,
      children: []
    }), i.tokens.push({
      type: "td_close",
      level: --i.level
    });
    i.tokens.push({
      type: "tr_close",
      level: --i.level
    });
  }
  return i.tokens.push({
    type: "tbody_close",
    level: --i.level
  }), i.tokens.push({
    type: "table_close",
    level: --i.level
  }), b[1] = v[1] = c, i.line = c, !0;
}
function Cs(i, e) {
  var t,
    n,
    s = i.bMarks[e] + i.tShift[e],
    r = i.eMarks[e];
  return s >= r || (n = i.src.charCodeAt(s++), n !== 126 && n !== 58) || (t = i.skipSpaces(s), s === t) || t >= r ? -1 : t;
}
function Va(i, e) {
  var t,
    n,
    s = i.level + 2;
  for (t = e + 2, n = i.tokens.length - 2; t < n; t++) i.tokens[t].level === s && i.tokens[t].type === "paragraph_open" && (i.tokens[t + 2].tight = !0, i.tokens[t].tight = !0, t += 2);
}
function qa(i, e, t, n) {
  var s, r, o, a, c, l, h, u, g, b, v, _, C, D;
  if (n) return i.ddIndent < 0 ? !1 : Cs(i, e) >= 0;
  if (h = e + 1, i.isEmpty(h) && ++h > t || i.tShift[h] < i.blkIndent || (s = Cs(i, h), s < 0) || i.level >= i.options.maxNesting) return !1;
  l = i.tokens.length, i.tokens.push({
    type: "dl_open",
    lines: c = [e, 0],
    level: i.level++
  }), o = e, r = h;
  e: for (;;) {
    for (D = !0, C = !1, i.tokens.push({
      type: "dt_open",
      lines: [o, o],
      level: i.level++
    }), i.tokens.push({
      type: "inline",
      content: i.getLines(o, o + 1, i.blkIndent, !1).trim(),
      level: i.level + 1,
      lines: [o, o],
      children: []
    }), i.tokens.push({
      type: "dt_close",
      level: --i.level
    });;) {
      if (i.tokens.push({
        type: "dd_open",
        lines: a = [h, 0],
        level: i.level++
      }), _ = i.tight, g = i.ddIndent, u = i.blkIndent, v = i.tShift[r], b = i.parentType, i.blkIndent = i.ddIndent = i.tShift[r] + 2, i.tShift[r] = s - i.bMarks[r], i.tight = !0, i.parentType = "deflist", i.parser.tokenize(i, r, t, !0), (!i.tight || C) && (D = !1), C = i.line - r > 1 && i.isEmpty(i.line - 1), i.tShift[r] = v, i.tight = _, i.parentType = b, i.blkIndent = u, i.ddIndent = g, i.tokens.push({
        type: "dd_close",
        level: --i.level
      }), a[1] = h = i.line, h >= t || i.tShift[h] < i.blkIndent) break e;
      if (s = Cs(i, h), s < 0) break;
      r = h;
    }
    if (h >= t || (o = h, i.isEmpty(o)) || i.tShift[o] < i.blkIndent || (r = o + 1, r >= t) || (i.isEmpty(r) && r++, r >= t) || i.tShift[r] < i.blkIndent || (s = Cs(i, r), s < 0)) break;
  }
  return i.tokens.push({
    type: "dl_close",
    level: --i.level
  }), c[1] = h, i.line = h, D && Va(i, l), !0;
}
function Ka(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a = e + 1,
    c;
  if (t = i.lineMax, a < t && !i.isEmpty(a)) {
    for (c = i.parser.ruler.getRules("paragraph"); a < t && !i.isEmpty(a); a++) if (!(i.tShift[a] - i.blkIndent > 3)) {
      for (s = !1, r = 0, o = c.length; r < o; r++) if (c[r](i, a, t, !0)) {
        s = !0;
        break;
      }
      if (s) break;
    }
  }
  return n = i.getLines(e, a, i.blkIndent, !1).trim(), i.line = a, n.length && (i.tokens.push({
    type: "paragraph_open",
    tight: !1,
    lines: [e, i.line],
    level: i.level
  }), i.tokens.push({
    type: "inline",
    content: n,
    level: i.level + 1,
    lines: [e, i.line],
    children: []
  }), i.tokens.push({
    type: "paragraph_close",
    tight: !1,
    level: i.level
  })), !0;
}
var Ts = [["code", ka], ["fences", La, ["paragraph", "blockquote", "list"]], ["blockquote", Pa, ["paragraph", "blockquote", "list"]], ["hr", Oa, ["paragraph", "blockquote", "list"]], ["list", Ba, ["paragraph", "blockquote"]], ["footnote", Da, ["paragraph"]], ["heading", Fa, ["paragraph", "blockquote"]], ["lheading", Ua], ["htmlblock", Ga, ["paragraph", "blockquote"]], ["table", za, ["paragraph"]], ["deflist", qa, ["paragraph"]], ["paragraph", Ka]];
function nr() {
  this.ruler = new Qe();
  for (var i = 0; i < Ts.length; i++) this.ruler.push(Ts[i][0], Ts[i][1], {
    alt: (Ts[i][2] || []).slice()
  });
}
nr.prototype.tokenize = function (i, e, t) {
  for (var n = this.ruler.getRules(""), s = n.length, r = e, o = !1, a, c; r < t && (i.line = r = i.skipEmptyLines(r), !(r >= t || i.tShift[r] < i.blkIndent));) {
    for (c = 0; c < s && (a = n[c](i, r, t, !1), !a); c++);
    if (i.tight = !o, i.isEmpty(i.line - 1) && (o = !0), r = i.line, r < t && i.isEmpty(r)) {
      if (o = !0, r++, r < t && i.parentType === "list" && i.isEmpty(r)) break;
      i.line = r;
    }
  }
};
var Wa = /[\n\t]/g,
  Xa = /\r[\n\u0085]|[\u2424\u2028\u0085]/g,
  Za = /\u00a0/g;
nr.prototype.parse = function (i, e, t, n) {
  var s,
    r = 0,
    o = 0;
  if (!i) return [];
  i = i.replace(Za, " "), i = i.replace(Xa, "\n"), i.indexOf("	") >= 0 && (i = i.replace(Wa, function (a, c) {
    var l;
    return i.charCodeAt(c) === 10 ? (r = c + 1, o = 0, a) : (l = "    ".slice((c - r - o) % 4), o = c - r + 1, l);
  })), s = new vn(i, this, e, t, n), this.tokenize(s, s.line, s.lineMax);
};
function Ya(i) {
  switch (i) {
    case 10:
    case 92:
    case 96:
    case 42:
    case 95:
    case 94:
    case 91:
    case 93:
    case 33:
    case 38:
    case 60:
    case 62:
    case 123:
    case 125:
    case 36:
    case 37:
    case 64:
    case 126:
    case 43:
    case 61:
    case 58:
      return !0;
    default:
      return !1;
  }
}
function Ja(i, e) {
  for (var t = i.pos; t < i.posMax && !Ya(i.src.charCodeAt(t));) t++;
  return t === i.pos ? !1 : (e || (i.pending += i.src.slice(i.pos, t)), i.pos = t, !0);
}
function Qa(i, e) {
  var t,
    n,
    s = i.pos;
  if (i.src.charCodeAt(s) !== 10) return !1;
  if (t = i.pending.length - 1, n = i.posMax, !e) if (t >= 0 && i.pending.charCodeAt(t) === 32) {
    if (t >= 1 && i.pending.charCodeAt(t - 1) === 32) {
      for (var r = t - 2; r >= 0; r--) if (i.pending.charCodeAt(r) !== 32) {
        i.pending = i.pending.substring(0, r + 1);
        break;
      }
      i.push({
        type: "hardbreak",
        level: i.level
      });
    } else i.pending = i.pending.slice(0, -1), i.push({
      type: "softbreak",
      level: i.level
    });
  } else i.push({
    type: "softbreak",
    level: i.level
  });
  for (s++; s < n && i.src.charCodeAt(s) === 32;) s++;
  return i.pos = s, !0;
}
var sr = [];
for (var Dr = 0; Dr < 256; Dr++) sr.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (i) {
  sr[i.charCodeAt(0)] = 1;
});
function ec(i, e) {
  var t,
    n = i.pos,
    s = i.posMax;
  if (i.src.charCodeAt(n) !== 92) return !1;
  if (n++, n < s) {
    if (t = i.src.charCodeAt(n), t < 256 && sr[t] !== 0) return e || (i.pending += i.src[n]), i.pos += 2, !0;
    if (t === 10) {
      for (e || i.push({
        type: "hardbreak",
        level: i.level
      }), n++; n < s && i.src.charCodeAt(n) === 32;) n++;
      return i.pos = n, !0;
    }
  }
  return e || (i.pending += "\\"), i.pos++, !0;
}
function tc(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a = i.pos,
    c = i.src.charCodeAt(a);
  if (c !== 96) return !1;
  for (t = a, a++, n = i.posMax; a < n && i.src.charCodeAt(a) === 96;) a++;
  for (s = i.src.slice(t, a), r = o = a; (r = i.src.indexOf("`", o)) !== -1;) {
    for (o = r + 1; o < n && i.src.charCodeAt(o) === 96;) o++;
    if (o - r === s.length) return e || i.push({
      type: "code",
      content: i.src.slice(a, r).replace(/[ \n]+/g, " ").trim(),
      block: !1,
      level: i.level
    }), i.pos = o, !0;
  }
  return e || (i.pending += s), i.pos += s.length, !0;
}
function nc(i, e) {
  var t,
    n,
    s,
    r = i.posMax,
    o = i.pos,
    a,
    c;
  if (i.src.charCodeAt(o) !== 126 || e || o + 4 >= r || i.src.charCodeAt(o + 1) !== 126 || i.level >= i.options.maxNesting || (a = o > 0 ? i.src.charCodeAt(o - 1) : -1, c = i.src.charCodeAt(o + 2), a === 126) || c === 126 || c === 32 || c === 10) return !1;
  for (n = o + 2; n < r && i.src.charCodeAt(n) === 126;) n++;
  if (n > o + 3) return i.pos += n - o, e || (i.pending += i.src.slice(o, n)), !0;
  for (i.pos = o + 2, s = 1; i.pos + 1 < r;) {
    if (i.src.charCodeAt(i.pos) === 126 && i.src.charCodeAt(i.pos + 1) === 126 && (a = i.src.charCodeAt(i.pos - 1), c = i.pos + 2 < r ? i.src.charCodeAt(i.pos + 2) : -1, c !== 126 && a !== 126 && (a !== 32 && a !== 10 ? s-- : c !== 32 && c !== 10 && s++, s <= 0))) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return t ? (i.posMax = i.pos, i.pos = o + 2, e || (i.push({
    type: "del_open",
    level: i.level++
  }), i.parser.tokenize(i), i.push({
    type: "del_close",
    level: --i.level
  })), i.pos = i.posMax + 2, i.posMax = r, !0) : (i.pos = o, !1);
}
function sc(i, e) {
  var t,
    n,
    s,
    r = i.posMax,
    o = i.pos,
    a,
    c;
  if (i.src.charCodeAt(o) !== 43 || e || o + 4 >= r || i.src.charCodeAt(o + 1) !== 43 || i.level >= i.options.maxNesting || (a = o > 0 ? i.src.charCodeAt(o - 1) : -1, c = i.src.charCodeAt(o + 2), a === 43) || c === 43 || c === 32 || c === 10) return !1;
  for (n = o + 2; n < r && i.src.charCodeAt(n) === 43;) n++;
  if (n !== o + 2) return i.pos += n - o, e || (i.pending += i.src.slice(o, n)), !0;
  for (i.pos = o + 2, s = 1; i.pos + 1 < r;) {
    if (i.src.charCodeAt(i.pos) === 43 && i.src.charCodeAt(i.pos + 1) === 43 && (a = i.src.charCodeAt(i.pos - 1), c = i.pos + 2 < r ? i.src.charCodeAt(i.pos + 2) : -1, c !== 43 && a !== 43 && (a !== 32 && a !== 10 ? s-- : c !== 32 && c !== 10 && s++, s <= 0))) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return t ? (i.posMax = i.pos, i.pos = o + 2, e || (i.push({
    type: "ins_open",
    level: i.level++
  }), i.parser.tokenize(i), i.push({
    type: "ins_close",
    level: --i.level
  })), i.pos = i.posMax + 2, i.posMax = r, !0) : (i.pos = o, !1);
}
function ic(i, e) {
  var t,
    n,
    s,
    r = i.posMax,
    o = i.pos,
    a,
    c;
  if (i.src.charCodeAt(o) !== 61 || e || o + 4 >= r || i.src.charCodeAt(o + 1) !== 61 || i.level >= i.options.maxNesting || (a = o > 0 ? i.src.charCodeAt(o - 1) : -1, c = i.src.charCodeAt(o + 2), a === 61) || c === 61 || c === 32 || c === 10) return !1;
  for (n = o + 2; n < r && i.src.charCodeAt(n) === 61;) n++;
  if (n !== o + 2) return i.pos += n - o, e || (i.pending += i.src.slice(o, n)), !0;
  for (i.pos = o + 2, s = 1; i.pos + 1 < r;) {
    if (i.src.charCodeAt(i.pos) === 61 && i.src.charCodeAt(i.pos + 1) === 61 && (a = i.src.charCodeAt(i.pos - 1), c = i.pos + 2 < r ? i.src.charCodeAt(i.pos + 2) : -1, c !== 61 && a !== 61 && (a !== 32 && a !== 10 ? s-- : c !== 32 && c !== 10 && s++, s <= 0))) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return t ? (i.posMax = i.pos, i.pos = o + 2, e || (i.push({
    type: "mark_open",
    level: i.level++
  }), i.parser.tokenize(i), i.push({
    type: "mark_close",
    level: --i.level
  })), i.pos = i.posMax + 2, i.posMax = r, !0) : (i.pos = o, !1);
}
function Fr(i) {
  return i >= 48 && i <= 57 || i >= 65 && i <= 90 || i >= 97 && i <= 122;
}
function Ur(i, e) {
  var t = e,
    n,
    s,
    r,
    o = !0,
    a = !0,
    c = i.posMax,
    l = i.src.charCodeAt(e);
  for (n = e > 0 ? i.src.charCodeAt(e - 1) : -1; t < c && i.src.charCodeAt(t) === l;) t++;
  return t >= c && (o = !1), r = t - e, r >= 4 ? o = a = !1 : (s = t < c ? i.src.charCodeAt(t) : -1, (s === 32 || s === 10) && (o = !1), (n === 32 || n === 10) && (a = !1), l === 95 && (Fr(n) && (o = !1), Fr(s) && (a = !1))), {
    can_open: o,
    can_close: a,
    delims: r
  };
}
function rc(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a,
    c,
    l = i.posMax,
    h = i.pos,
    u = i.src.charCodeAt(h);
  if (u !== 95 && u !== 42 || e) return !1;
  if (c = Ur(i, h), t = c.delims, !c.can_open) return i.pos += t, e || (i.pending += i.src.slice(h, i.pos)), !0;
  if (i.level >= i.options.maxNesting) return !1;
  for (i.pos = h + t, a = [t]; i.pos < l;) {
    if (i.src.charCodeAt(i.pos) === u) {
      if (c = Ur(i, i.pos), n = c.delims, c.can_close) {
        for (r = a.pop(), o = n; r !== o;) {
          if (o < r) {
            a.push(r - o);
            break;
          }
          if (o -= r, a.length === 0) break;
          i.pos += r, r = a.pop();
        }
        if (a.length === 0) {
          t = r, s = !0;
          break;
        }
        i.pos += n;
        continue;
      }
      c.can_open && a.push(n), i.pos += n;
      continue;
    }
    i.parser.skipToken(i);
  }
  return s ? (i.posMax = i.pos, i.pos = h + t, e || ((t === 2 || t === 3) && i.push({
    type: "strong_open",
    level: i.level++
  }), (t === 1 || t === 3) && i.push({
    type: "em_open",
    level: i.level++
  }), i.parser.tokenize(i), (t === 1 || t === 3) && i.push({
    type: "em_close",
    level: --i.level
  }), (t === 2 || t === 3) && i.push({
    type: "strong_close",
    level: --i.level
  })), i.pos = i.posMax + t, i.posMax = l, !0) : (i.pos = h, !1);
}
var oc = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function ac(i, e) {
  var t,
    n,
    s = i.posMax,
    r = i.pos;
  if (i.src.charCodeAt(r) !== 126 || e || r + 2 >= s || i.level >= i.options.maxNesting) return !1;
  for (i.pos = r + 1; i.pos < s;) {
    if (i.src.charCodeAt(i.pos) === 126) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return !t || r + 1 === i.pos || (n = i.src.slice(r + 1, i.pos), n.match(/(^|[^\\])(\\\\)*\s/)) ? (i.pos = r, !1) : (i.posMax = i.pos, i.pos = r + 1, e || i.push({
    type: "sub",
    level: i.level,
    content: n.replace(oc, "$1")
  }), i.pos = i.posMax + 1, i.posMax = s, !0);
}
var cc = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function lc(i, e) {
  var t,
    n,
    s = i.posMax,
    r = i.pos;
  if (i.src.charCodeAt(r) !== 94 || e || r + 2 >= s || i.level >= i.options.maxNesting) return !1;
  for (i.pos = r + 1; i.pos < s;) {
    if (i.src.charCodeAt(i.pos) === 94) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return !t || r + 1 === i.pos || (n = i.src.slice(r + 1, i.pos), n.match(/(^|[^\\])(\\\\)*\s/)) ? (i.pos = r, !1) : (i.posMax = i.pos, i.pos = r + 1, e || i.push({
    type: "sup",
    level: i.level,
    content: n.replace(cc, "$1")
  }), i.pos = i.posMax + 1, i.posMax = s, !0);
}
function hc(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a,
    c,
    l,
    h = !1,
    u = i.pos,
    g = i.posMax,
    b = i.pos,
    v = i.src.charCodeAt(b);
  if (v === 33 && (h = !0, v = i.src.charCodeAt(++b)), v !== 91 || i.level >= i.options.maxNesting || (t = b + 1, n = as(i, b), n < 0)) return !1;
  if (a = n + 1, a < g && i.src.charCodeAt(a) === 40) {
    for (a++; a < g && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);
    if (a >= g) return !1;
    for (b = a, mo(i, a) ? (r = i.linkContent, a = i.pos) : r = "", b = a; a < g && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);
    if (a < g && b !== a && go(i, a)) for (o = i.linkContent, a = i.pos; a < g && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);else o = "";
    if (a >= g || i.src.charCodeAt(a) !== 41) return i.pos = u, !1;
    a++;
  } else {
    if (i.linkLevel > 0) return !1;
    for (; a < g && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);
    if (a < g && i.src.charCodeAt(a) === 91 && (b = a + 1, a = as(i, a), a >= 0 ? s = i.src.slice(b, a++) : a = b - 1), s || (_typeof(s) > "u" && (a = n + 1), s = i.src.slice(t, n)), c = i.env.references[bo(s)], !c) return i.pos = u, !1;
    r = c.href, o = c.title;
  }
  return e || (i.pos = t, i.posMax = n, h ? i.push({
    type: "image",
    src: r,
    title: o,
    alt: i.src.substr(t, n - t),
    level: i.level
  }) : (i.push({
    type: "link_open",
    href: r,
    title: o,
    level: i.level++
  }), i.linkLevel++, i.parser.tokenize(i), i.linkLevel--, i.push({
    type: "link_close",
    level: --i.level
  }))), i.pos = a, i.posMax = g, !0;
}
function dc(i, e) {
  var t,
    n,
    s,
    r,
    o = i.posMax,
    a = i.pos;
  return a + 2 >= o || i.src.charCodeAt(a) !== 94 || i.src.charCodeAt(a + 1) !== 91 || i.level >= i.options.maxNesting || (t = a + 2, n = as(i, a + 1), n < 0) ? !1 : (e || (i.env.footnotes || (i.env.footnotes = {}), i.env.footnotes.list || (i.env.footnotes.list = []), s = i.env.footnotes.list.length, i.pos = t, i.posMax = n, i.push({
    type: "footnote_ref",
    id: s,
    level: i.level
  }), i.linkLevel++, r = i.tokens.length, i.parser.tokenize(i), i.env.footnotes.list[s] = {
    tokens: i.tokens.splice(r)
  }, i.linkLevel--), i.pos = n + 1, i.posMax = o, !0);
}
function uc(i, e) {
  var t,
    n,
    s,
    r,
    o = i.posMax,
    a = i.pos;
  if (a + 3 > o || !i.env.footnotes || !i.env.footnotes.refs || i.src.charCodeAt(a) !== 91 || i.src.charCodeAt(a + 1) !== 94 || i.level >= i.options.maxNesting) return !1;
  for (n = a + 2; n < o; n++) {
    if (i.src.charCodeAt(n) === 32 || i.src.charCodeAt(n) === 10) return !1;
    if (i.src.charCodeAt(n) === 93) break;
  }
  return n === a + 2 || n >= o || (n++, t = i.src.slice(a + 2, n - 1), _typeof(i.env.footnotes.refs[":" + t]) > "u") ? !1 : (e || (i.env.footnotes.list || (i.env.footnotes.list = []), i.env.footnotes.refs[":" + t] < 0 ? (s = i.env.footnotes.list.length, i.env.footnotes.list[s] = {
    label: t,
    count: 0
  }, i.env.footnotes.refs[":" + t] = s) : s = i.env.footnotes.refs[":" + t], r = i.env.footnotes.list[s].count, i.env.footnotes.list[s].count++, i.push({
    type: "footnote_ref",
    id: s,
    subId: r,
    level: i.level
  })), i.pos = n, i.posMax = o, !0);
}
var pc = ["coap", "doi", "javascript", "aaa", "aaas", "about", "acap", "cap", "cid", "crid", "data", "dav", "dict", "dns", "file", "ftp", "geo", "go", "gopher", "h323", "http", "https", "iax", "icap", "im", "imap", "info", "ipp", "iris", "iris.beep", "iris.xpc", "iris.xpcs", "iris.lwz", "ldap", "mailto", "mid", "msrp", "msrps", "mtqp", "mupdate", "news", "nfs", "ni", "nih", "nntp", "opaquelocktoken", "pop", "pres", "rtsp", "service", "session", "shttp", "sieve", "sip", "sips", "sms", "snmp", "soap.beep", "soap.beeps", "tag", "tel", "telnet", "tftp", "thismessage", "tn3270", "tip", "tv", "urn", "vemmi", "ws", "wss", "xcon", "xcon-userid", "xmlrpc.beep", "xmlrpc.beeps", "xmpp", "z39.50r", "z39.50s", "adiumxtra", "afp", "afs", "aim", "apt", "attachment", "aw", "beshare", "bitcoin", "bolo", "callto", "chrome", "chrome-extension", "com-eventbrite-attendee", "content", "cvs", "dlna-playsingle", "dlna-playcontainer", "dtn", "dvb", "ed2k", "facetime", "feed", "finger", "fish", "gg", "git", "gizmoproject", "gtalk", "hcp", "icon", "ipn", "irc", "irc6", "ircs", "itms", "jar", "jms", "keyparc", "lastfm", "ldaps", "magnet", "maps", "market", "message", "mms", "ms-help", "msnim", "mumble", "mvn", "notes", "oid", "palm", "paparazzi", "platform", "proxy", "psyc", "query", "res", "resource", "rmi", "rsync", "rtmp", "secondlife", "sftp", "sgn", "skype", "smb", "soldat", "spotify", "ssh", "steam", "svn", "teamspeak", "things", "udp", "unreal", "ut2004", "ventrilo", "view-source", "webcal", "wtai", "wyciwyg", "xfire", "xri", "ymsgr"],
  fc = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
  mc = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
function gc(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a = i.pos;
  return i.src.charCodeAt(a) !== 60 || (t = i.src.slice(a), t.indexOf(">") < 0) ? !1 : (n = t.match(mc), n ? pc.indexOf(n[1].toLowerCase()) < 0 || (r = n[0].slice(1, -1), o = ki(r), !i.parser.validateLink(r)) ? !1 : (e || (i.push({
    type: "link_open",
    href: o,
    level: i.level
  }), i.push({
    type: "text",
    content: r,
    level: i.level + 1
  }), i.push({
    type: "link_close",
    level: i.level
  })), i.pos += n[0].length, !0) : (s = t.match(fc), s ? (r = s[0].slice(1, -1), o = ki("mailto:" + r), i.parser.validateLink(o) ? (e || (i.push({
    type: "link_open",
    href: o,
    level: i.level
  }), i.push({
    type: "text",
    content: r,
    level: i.level + 1
  }), i.push({
    type: "link_close",
    level: i.level
  })), i.pos += s[0].length, !0) : !1) : !1));
}
function hi(i, e) {
  return i = i.source, e = e || "", function t(n, s) {
    return n ? (s = s.source || s, i = i.replace(n, s), t) : new RegExp(i, e);
  };
}
var bc = /[a-zA-Z_:][a-zA-Z0-9:._-]*/,
  yc = /[^"'=<>`\x00-\x20]+/,
  Ec = /'[^']*'/,
  vc = /"[^"]*"/,
  _c = hi(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", yc)("single_quoted", Ec)("double_quoted", vc)(),
  Sc = hi(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", bc)("attr_value", _c)(),
  Ac = hi(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", Sc)(),
  xc = /<\/[A-Za-z][A-Za-z0-9]*\s*>/,
  wc = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/,
  Cc = /<[?].*?[?]>/,
  Tc = /<![A-Z]+\s+[^>]*>/,
  Rc = /<!\[CDATA\[[\s\S]*?\]\]>/,
  Ic = hi(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", Ac)("close_tag", xc)("comment", wc)("processing", Cc)("declaration", Tc)("cdata", Rc)();
function Mc(i) {
  var e = i | 32;
  return e >= 97 && e <= 122;
}
function kc(i, e) {
  var t,
    n,
    s,
    r = i.pos;
  return !i.options.html || (s = i.posMax, i.src.charCodeAt(r) !== 60 || r + 2 >= s) || (t = i.src.charCodeAt(r + 1), t !== 33 && t !== 63 && t !== 47 && !Mc(t)) || (n = i.src.slice(r).match(Ic), !n) ? !1 : (e || i.push({
    type: "htmltag",
    content: i.src.slice(r, r + n[0].length),
    level: i.level
  }), i.pos += n[0].length, !0);
}
var Lc = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,
  Pc = /^&([a-z][a-z0-9]{1,31});/i;
function Oc(i, e) {
  var t,
    n,
    s,
    r = i.pos,
    o = i.posMax;
  if (i.src.charCodeAt(r) !== 38) return !1;
  if (r + 1 < o) {
    if (t = i.src.charCodeAt(r + 1), t === 35) {
      if (s = i.src.slice(r).match(Lc), s) return e || (n = s[1][0].toLowerCase() === "x" ? parseInt(s[1].slice(1), 16) : parseInt(s[1], 10), i.pending += po(n) ? Mi(n) : Mi(65533)), i.pos += s[0].length, !0;
    } else if (s = i.src.slice(r).match(Pc), s) {
      var a = ho(s[1]);
      if (s[1] !== a) return e || (i.pending += a), i.pos += s[0].length, !0;
    }
  }
  return e || (i.pending += "&"), i.pos++, !0;
}
var Ai = [["text", Ja], ["newline", Qa], ["escape", ec], ["backticks", tc], ["del", nc], ["ins", sc], ["mark", ic], ["emphasis", rc], ["sub", ac], ["sup", lc], ["links", hc], ["footnote_inline", dc], ["footnote_ref", uc], ["autolink", gc], ["htmltag", kc], ["entity", Oc]];
function di() {
  this.ruler = new Qe();
  for (var i = 0; i < Ai.length; i++) this.ruler.push(Ai[i][0], Ai[i][1]);
  this.validateLink = Nc;
}
di.prototype.skipToken = function (i) {
  var e = this.ruler.getRules(""),
    t = e.length,
    n = i.pos,
    s,
    r;
  if ((r = i.cacheGet(n)) > 0) {
    i.pos = r;
    return;
  }
  for (s = 0; s < t; s++) if (e[s](i, !0)) {
    i.cacheSet(n, i.pos);
    return;
  }
  i.pos++, i.cacheSet(n, i.pos);
};
di.prototype.tokenize = function (i) {
  for (var e = this.ruler.getRules(""), t = e.length, n = i.posMax, s, r; i.pos < n;) {
    for (r = 0; r < t && (s = e[r](i, !1), !s); r++);
    if (s) {
      if (i.pos >= n) break;
      continue;
    }
    i.pending += i.src[i.pos++];
  }
  i.pending && i.pushPending();
};
di.prototype.parse = function (i, e, t, n) {
  var s = new En(i, this, e, t, n);
  this.tokenize(s);
};
function Nc(i) {
  var e = ["vbscript", "javascript", "file", "data"],
    t = i.trim().toLowerCase();
  return t = fn(t), !(t.indexOf(":") !== -1 && e.indexOf(t.split(":")[0]) !== -1);
}
var Bc = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "“”‘’",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: ["block", "inline", "references", "replacements", "smartquotes", "references", "abbr2", "footnote_tail"]
      },
      block: {
        rules: ["blockquote", "code", "fences", "footnote", "heading", "hr", "htmlblock", "lheading", "list", "paragraph", "table"]
      },
      inline: {
        rules: ["autolink", "backticks", "del", "emphasis", "entity", "escape", "footnote_ref", "htmltag", "links", "newline", "text"]
      }
    }
  },
  Dc = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "“”‘’",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      // Don't restrict core/block/inline rules
      core: {},
      block: {},
      inline: {}
    }
  },
  Fc = {
    options: {
      html: !0,
      // Enable HTML tags in source
      xhtmlOut: !0,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "“”‘’",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: ["block", "inline", "references", "abbr2"]
      },
      block: {
        rules: ["blockquote", "code", "fences", "heading", "hr", "htmlblock", "lheading", "list", "paragraph"]
      },
      inline: {
        rules: ["autolink", "backticks", "emphasis", "entity", "escape", "htmltag", "links", "newline", "text"]
      }
    }
  },
  Uc = {
    "default": Bc,
    full: Dc,
    commonmark: Fc
  };
function vo(i, e, t) {
  this.src = e, this.env = t, this.options = i.options, this.tokens = [], this.inlineMode = !1, this.inline = i.inline, this.block = i.block, this.renderer = i.renderer, this.typographer = i.typographer;
}
function wt(i, e) {
  typeof i != "string" && (e = i, i = "default"), e && e.linkify != null && console.warn("linkify option is removed. Use linkify plugin instead:\n\nimport Remarkable from 'remarkable';\nimport linkify from 'remarkable/linkify';\nnew Remarkable().use(linkify)\n"), this.inline = new di(), this.block = new nr(), this.core = new yo(), this.renderer = new tr(), this.ruler = new Qe(), this.options = {}, this.configure(Uc[i]), this.set(e || {});
}
wt.prototype.set = function (i) {
  uo(this.options, i);
};
wt.prototype.configure = function (i) {
  var e = this;
  if (!i) throw new Error("Wrong `remarkable` preset, check name/content");
  i.options && e.set(i.options), i.components && Object.keys(i.components).forEach(function (t) {
    i.components[t].rules && e[t].ruler.enable(i.components[t].rules, !0);
  });
};
wt.prototype.use = function (i, e) {
  return i(this, e), this;
};
wt.prototype.parse = function (i, e) {
  var t = new vo(this, i, e);
  return this.core.process(t), t.tokens;
};
wt.prototype.render = function (i, e) {
  return e = e || {}, this.renderer.render(this.parse(i, e), this.options, e);
};
wt.prototype.parseInline = function (i, e) {
  var t = new vo(this, i, e);
  return t.inlineMode = !0, this.core.process(t), t.tokens;
};
wt.prototype.renderInline = function (i, e) {
  return e = e || {}, this.renderer.render(this.parseInline(i, e), this.options, e);
};
var tn = /*#__PURE__*/function () {
  function tn() {
    _classCallCheck(this, tn);
  }
  return _createClass(tn, null, [{
    key: "addPlugins",
    value: function addPlugins(e, t) {
      var n = window.remarkable_plugins;
      if (n && n.forEach(function (s) {
        e.use(s.plugin, s.options);
      }), t != null && t.math) {
        window.katex || (console.warn("window.katex not found, use chatElementRef.refreshMessages to re-render messages"), console.warn("See https://deepchat.dev/examples/externalModules"));
        var s = _typeof(t.math) == "object" ? t.math.delimiter : "",
          r = _typeof(t.math) == "object" && t.math.options ? t.math.options : {};
        e.use(ia.katex.bind(this, r), {
          delimiter: s
        });
      }
    }
  }, {
    key: "instantiate",
    value: function instantiate(e) {
      if (e) return new wt(_objectSpread(_objectSpread({}, tn.DEFAULT_PROPERTIES), e));
      if (window.hljs) {
        var t = window.hljs;
        return new wt({
          highlight: function highlight(n, s) {
            if (s && t.getLanguage(s)) try {
              return t.highlight(n, {
                language: s
              }).value;
            } catch (_unused3) {
              console[p]("failed to setup the highlight dependency");
            }
            try {
              return t.highlightAuto(n).value;
            } catch (_unused4) {
              console[p]("failed to automatically highlight messages");
            }
            return "";
          },
          html: !1,
          // Enable HTML tags in source
          xhtmlOut: !1,
          // Use '/' to close single tags (<br />)
          breaks: !0,
          // Convert '\n' in paragraphs into <br>
          langPrefix: "language-",
          // CSS language prefix for fenced blocks
          linkTarget: "_blank",
          // set target to open in a new tab
          typographer: !0
          // Enable smartypants and other sweet transforms
        });
      } else return new wt(tn.DEFAULT_PROPERTIES);
    }
  }, {
    key: "createNew",
    value: function createNew(e) {
      var t = tn.instantiate(e);
      return tn.addPlugins(t, e), t.inline.validateLink = function () {
        return !0;
      }, t;
    }
  }]);
}();
tn.DEFAULT_PROPERTIES = {
  breaks: !0,
  linkTarget: "_blank"
  // set target to open in a new tab
};
var cs = tn;
var Hc = /*#__PURE__*/function () {
  function Hc(e) {
    _classCallCheck(this, Hc);
    this.storageKey = "deep-chat-storage", this.maxMessages = 1e3, this.trackInputText = !1, this.trackScrollHeight = !1, _typeof(e) == "object" && (e.key && (this.storageKey = e.key), e.maxMessages && (this.maxMessages = e.maxMessages), e.inputText !== void 0 && (this.trackInputText = e.inputText), e.scrollHeight !== void 0 && (this.trackScrollHeight = e.scrollHeight), e.clear = this.clear.bind(this), ie.processBrowserStorage(this));
  }
  return _createClass(Hc, [{
    key: "get",
    value: function get() {
      var e = localStorage.getItem(this.storageKey);
      return e ? JSON.parse(e) : {
        messages: []
      };
    }
  }, {
    key: "set",
    value: function set(e, t, n) {
      var s = {
        messages: e,
        inputText: t,
        scrollHeight: n
      };
      localStorage.setItem(this.storageKey, ae(s));
    }
  }, {
    key: "addMessages",
    value: function addMessages(e) {
      var t = e.length - this.maxMessages;
      t < 0 && (t = 0);
      var n = e.slice(t, e.length),
        s = this.trackInputText || this.trackScrollHeight ? localStorage.getItem(this.storageKey) : void 0,
        r = s ? JSON.parse(s) : void 0;
      this.set(n, this.trackInputText ? r == null ? void 0 : r.inputText : void 0, this.trackScrollHeight ? r == null ? void 0 : r.scrollHeight : void 0);
    }
  }, {
    key: "addInputText",
    value: function addInputText(e) {
      if (!this.trackInputText) return;
      var t = localStorage.getItem(this.storageKey),
        n = t ? JSON.parse(t) : void 0;
      this.set((n == null ? void 0 : n.messages) || [], e, this.trackScrollHeight ? n == null ? void 0 : n.scrollHeight : void 0);
    }
  }, {
    key: "addScrollHeight",
    value: function addScrollHeight(e) {
      if (!this.trackScrollHeight) return;
      var t = localStorage.getItem(this.storageKey),
        n = t ? JSON.parse(t) : void 0;
      this.set((n == null ? void 0 : n.messages) || [], this.trackInputText ? n == null ? void 0 : n.inputText : void 0, e);
    }
  }, {
    key: "clear",
    value: function clear() {
      localStorage.removeItem(this.storageKey);
    }
  }]);
}();
var Be = /*#__PURE__*/function () {
  function Be() {
    _classCallCheck(this, Be);
  }
  return _createClass(Be, null, [{
    key: "applyCustomStylesToElements",
    value: function applyCustomStylesToElements(e, t, n) {
      if (n && (Object.assign(e.outerContainer[E], n.outerContainer), Object.assign(e.innerContainer[E], n.innerContainer), Object.assign(e.bubbleElement[E], n.bubble), t)) {
        var s = e.bubbleElement.children[0],
          r = s.tagName.toLocaleLowerCase() !== "a" ? s : s.children[0];
        Object.assign(r[E], n.media);
      }
    }
  }, {
    key: "applySideStyles",
    value: function applySideStyles(e, t, n, s) {
      s && (Be.applyCustomStylesToElements(e, n, s.shared), t === $ ? Be.applyCustomStylesToElements(e, n, s.user) : (Be.applyCustomStylesToElements(e, n, s.ai), Be.applyCustomStylesToElements(e, n, s[t])));
    }
  }, {
    key: "isElementsStyles",
    value: function isElementsStyles(e) {
      return !!(e.outerContainer || e.innerContainer || e.bubble || e.media);
    }
    // prettier-ignore
  }, {
    key: "applyCustomStyles",
    value: function applyCustomStyles(e, t, n, s, r) {
      var o;
      r && e[x] !== r ? Be.isElementsStyles(r) ? (Be.applyCustomStylesToElements(t, s, (o = e[x]) == null ? void 0 : o.shared), Be.applyCustomStylesToElements(t, s, r)) : (Be.applySideStyles(t, n, s, e[x]), Be.applySideStyles(t, n, s, r)) : Be.applySideStyles(t, n, s, e[x]);
    }
    // prettier-ignore
  }, {
    key: "extractParticularSharedStyles",
    value: function extractParticularSharedStyles(e, t) {
      if (!(t != null && t.shared)) return;
      var n = t.shared,
        s = {
          outerContainer: {},
          innerContainer: {},
          bubble: {},
          media: {}
        };
      return e.forEach(function (r) {
        var o, a, c, l;
        s.outerContainer[r] = ((o = n.outerContainer) == null ? void 0 : o[r]) || "", s.innerContainer[r] = ((a = n.innerContainer) == null ? void 0 : a[r]) || "", s.bubble[r] = ((c = n.bubble) == null ? void 0 : c[r]) || "", s.media[r] = ((l = n.media) == null ? void 0 : l[r]) || "";
      }), s;
    }
  }]);
}();
var Ce = /*#__PURE__*/function () {
  function Ce() {
    _classCallCheck(this, Ce);
  }
  return _createClass(Ce, null, [{
    key: "setElementProps",
    value:
    // prettier-ignore
    function setElementProps(e, t, n, s) {
      var r;
      n !== Ot && (e.applyCustomStyles(t, s, !0, (r = e.messageStyles) == null ? void 0 : r[n]), t.bubbleElement[f].add(so));
    }
    // prettier-ignore
  }, {
    key: "addMessage",
    value: function addMessage(e, t, n, s, r) {
      Ce.setElementProps(e, t, n, s), r ? e.elementRef.insertBefore(t.outerContainer, e.elementRef.firstChild) : e.appendOuterContainerElemet(t.outerContainer);
    }
  }, {
    key: "wrapInLink",
    value: function wrapInLink(e, t, n) {
      var s = S("a");
      return s.href = t, s.download = n || ne, s.target = "_blank", s.appendChild(e), s;
    }
  }, {
    key: "isNonLinkableDataUrl",
    value: function isNonLinkableDataUrl(e, t) {
      return !t.startsWith("data") || e === W ? !1 : e === Bn && t.startsWith("data:text/javascript") || !t.startsWith("data:image") && !t.startsWith("data:application");
    }
  }, {
    key: "processContent",
    value: function processContent(e, t, n, s) {
      return !n || Ce.isNonLinkableDataUrl(e, n) ? t : Ce.wrapInLink(t, n, s);
    }
  }, {
    key: "waitToLoadThenScroll",
    value: function waitToLoadThenScroll(e) {
      setTimeout(function () {
        e();
      }, 60);
    }
  }, {
    key: "scrollDownOnImageLoad",
    value: function scrollDownOnImageLoad(e, t) {
      if (e.startsWith("data")) Ce.waitToLoadThenScroll(t);else try {
        fetch(e, {
          mode: "no-cors"
        })["catch"](function () {})["finally"](function () {
          Ce.waitToLoadThenScroll(t);
        });
      } catch (_unused5) {
        t();
      }
    }
    // The strategy is to emit the actual file reference in the `onMessage` event for the user to inspect it
    // But it is not actually used by anything in the chat, hence it is removed when adding a message
    // after the body has been stringified and parsed - the file reference will disappear, hence this readds it
  }, {
    key: "reAddFileRefToObject",
    value: function reAddFileRefToObject(e, t) {
      var n;
      (n = e[m]) == null || n.forEach(function (s, r) {
        var o;
        s.ref && (o = t[m]) != null && o[r] && (t[m][r].ref = s.ref);
      });
    }
    // the chat does not use the actual file
  }, {
    key: "removeFileRef",
    value: function removeFileRef(e) {
      var t = _objectSpread({}, e);
      return delete t.ref, t;
    }
  }, {
    key: "isAudioFile",
    value: function isAudioFile(e) {
      var t = /\.(mp3|ogg|wav|aac|webm|4a)$/i,
        n = e.type,
        s = e.src;
      return n === j || (s == null ? void 0 : s.startsWith("data:audio")) || s && t.test(s);
    }
  }, {
    key: "isImageFile",
    value: function isImageFile(e) {
      var t = e.type,
        n = e.src;
      return t === W || (n == null ? void 0 : n.startsWith("data:image")) || n && Ce.isImageFileExtension(n);
    }
  }, {
    key: "isImageFileExtension",
    value: function isImageFileExtension(e) {
      return /\.(jpg|jpeg|png|gif|bmp)$/i.test(e);
    }
  }]);
}();
var mn = /*#__PURE__*/function () {
  function mn() {
    _classCallCheck(this, mn);
  }
  return _createClass(mn, null, [{
    key: "onMessage",
    value: function onMessage(e, t, n) {
      var r;
      var s = w({
        message: t,
        isHistory: n,
        isInitial: n
      });
      Ce.reAddFileRefToObject(t, s.message), (r = e.onMessage) == null || r.call(e, s), e.dispatchEvent(new CustomEvent("message", {
        detail: s
      })), ie.fireOnNewMessage(e, s);
    }
  }, {
    key: "onClearMessages",
    value: function onClearMessages(e) {
      var t;
      (t = e.onClearMessages) == null || t.call(e), e.dispatchEvent(new CustomEvent("clear-messages"));
    }
  }, {
    key: "onRender",
    value: function onRender(e) {
      var t;
      (t = e.onComponentRender) == null || t.call(e, e), e.dispatchEvent(new CustomEvent("render", {
        detail: e
      }));
    }
  }, {
    key: "onInput",
    value: function onInput(e, t, n) {
      var r, o;
      var s = w({
        content: t,
        isUser: n
      });
      t[m] && Ce.reAddFileRefToObject(_defineProperty({}, m, (r = t[m]) == null ? void 0 : r.map(function (a) {
        return {
          ref: a
        };
      })), s.content), (o = e.onInput) == null || o.call(e, s), e.dispatchEvent(new CustomEvent("input", {
        detail: s
      }));
    }
  }, {
    key: "onError",
    value: function onError(e, t) {
      var n;
      (n = e.onError) == null || n.call(e, t), e.dispatchEvent(new CustomEvent(p, {
        detail: t
      }));
    }
  }]);
}();
var we = /*#__PURE__*/function () {
  function we() {
    _classCallCheck(this, we);
  }
  return _createClass(we, null, [{
    key: "generateLoadingRingElement",
    value: function generateLoadingRingElement() {
      var e = S();
      return e[f].add("loading-history"), e.appendChild(S()), e.appendChild(S()), e.appendChild(S()), e.appendChild(S()), e;
    }
  }, {
    key: "apply",
    value: function apply(e, t, n) {
      St.setRing(t.bubbleElement, n == null ? void 0 : n.bubble), n != null && n.bubble && (n = w(n), delete n.bubble), e.applyCustomStyles(t, "history", !1, n);
    }
  }, {
    key: "addLoadHistoryMessage",
    value: function addLoadHistoryMessage(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      var a, c, l, h, u, g, b, v;
      e.bubbleElement[f].add(we.CLASS);
      var s = n ? we.FULL_VIEW_CLASS : we.SMALL_CLASS;
      e.outerContainer[f].add(s);
      var r = n ? (h = (l = (c = (a = t.messageStyles) == null ? void 0 : a.loading) == null ? void 0 : c.history) == null ? void 0 : l.full) == null ? void 0 : h[T] : (v = (b = (g = (u = t.messageStyles) == null ? void 0 : u.loading) == null ? void 0 : g.history) == null ? void 0 : b.small) == null ? void 0 : v[T];
      we.apply(t, e, r);
      var o = t.elementRef;
      n && t.elementRef.id !== ro && (o = t.elementRef.parentElement), o == null || o.prepend(e.outerContainer);
    }
  }, {
    key: "createDefaultElements",
    value: function createDefaultElements(e) {
      var t = e.createMessageElements("", te),
        n = t.bubbleElement,
        s = we.generateLoadingRingElement();
      return n.appendChild(s), t;
    }
  }, {
    key: "addMessage",
    value: function addMessage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      var r, o, a, c;
      var n = (c = (a = (o = (r = e.messageStyles) == null ? void 0 : r.loading) == null ? void 0 : o.history) == null ? void 0 : a.full) == null ? void 0 : c[L],
        s = n ? xt.createElements(e, n, te, !0, !0) : we.createDefaultElements(e);
      return we.addLoadHistoryMessage(s, e, t), N.softRemRoleElements(s.innerContainer, e.avatar, e.name), s;
    }
  }, {
    key: "tryChangeViewToSmall",
    value: function tryChangeViewToSmall(e, t) {
      var n, s, r, o, a, c, l, h;
      if (t != null && t.outerContainer[f].contains(we.FULL_VIEW_CLASS)) {
        t.outerContainer[f].replace(we.FULL_VIEW_CLASS, we.SMALL_CLASS);
        var u = (o = (r = (s = (n = e.messageStyles) == null ? void 0 : n.loading) == null ? void 0 : s.history) == null ? void 0 : r.small) == null ? void 0 : o[T];
        u && we.apply(e, t, u);
        var g = (h = (l = (c = (a = e.messageStyles) == null ? void 0 : a.loading) == null ? void 0 : c.history) == null ? void 0 : l.small) == null ? void 0 : h[L];
        return g && (t.bubbleElement.innerHTML = g), !0;
      }
      return !1;
    }
  }, {
    key: "changeFullViewToSmall",
    value: function changeFullViewToSmall(e) {
      var t = e.messageElementRefs[e.messageElementRefs.length - 1];
      we.tryChangeViewToSmall(e, t) || we.tryChangeViewToSmall(e, e.messageElementRefs[0]);
    }
  }]);
}();
we.CLASS = "loading-history-message", we.FULL_VIEW_CLASS = "loading-history-message-full-view", we.SMALL_CLASS = "loading-history-message-small";
var Nt = we;
var Qn = /*#__PURE__*/function () {
  function Qn() {
    _classCallCheck(this, Qn);
  }
  return _createClass(Qn, null, [{
    key: "setFade",
    value: function setFade(e, t) {
      e[E].transitionDuration = typeof t == "number" ? "".concat(t, "ms") : "".concat(Qn.DEFAULT_FADE_MS, "ms");
    }
  }, {
    key: "fadeAnimation",
    value: function () {
      var _fadeAnimation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e, t) {
        var n;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              e[E].opacity = "0";
              n = typeof t == "number" ? t : Qn.DEFAULT_FADE_MS;
              _context.n = 1;
              return new Promise(function (s) {
                setTimeout(function () {
                  return s();
                }, n);
              });
            case 1:
              e[E].opacity = "1";
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      function fadeAnimation(_x, _x2) {
        return _fadeAnimation.apply(this, arguments);
      }
      return fadeAnimation;
    }()
  }]);
}();
Qn.DEFAULT_FADE_MS = 500;
var Us = Qn;
var Yt = /*#__PURE__*/function () {
  function Yt(e, t, n) {
    _classCallCheck(this, Yt);
    if (this.hiddenElements = /* @__PURE__ */new Set(), this.isScrollButton = !1, this.isScrollingToBottom = !1, this._messages = e, t) {
      var _s$T;
      var s = {};
      _typeof(t) == "object" && (s = w(t), s.onUpdate = t.onUpdate), (_s$T = s[T]) !== null && _s$T !== void 0 ? _s$T : s[T] = {};
      var r = "fit-content";
      s[T]["default"] = _objectSpread({
        borderRadius: "10px",
        width: r,
        height: r
      }, s[T]["default"]), this.hiddenMessagesConfig = s, this.io = this.initIntersectionObserver(this._messages.elementRef);
    }
    if (n) {
      var _s2$T;
      var _s2 = _typeof(n) == "object" ? w(n) : {};
      (_s2$T = _s2[T]) !== null && _s2$T !== void 0 ? _s2$T : _s2[T] = {}, _s2[T]["default"] = _objectSpread({
        borderRadius: "50%",
        width: "1.4rem",
        height: "1.4rem"
      }, _s2[T]["default"]), this.scrollButtonConfig = _s2;
    }
    this.element = this.createElement(), this._messages.elementRef.appendChild(this.element);
  }
  return _createClass(Yt, [{
    key: "initIntersectionObserver",
    value: function initIntersectionObserver(e) {
      var _this3 = this;
      return new IntersectionObserver(function (t) {
        t.forEach(function (n) {
          var s;
          n.isIntersecting && _this3.hiddenElements.has(n.target) && (_this3.hiddenElements["delete"](n.target), (s = _this3.io) == null || s.unobserve(n.target), _this3.updateHiddenElement());
        });
      }, {
        root: e,
        threshold: 0.1
      });
    }
  }, {
    key: "createElement",
    value: function createElement() {
      var _this4 = this;
      var e = S();
      return e.id = "scroll-button", V.assignButtonEvents(e, function () {
        var s, r, o;
        var t = _this4.isScrollButton ? (s = _this4.scrollButtonConfig) == null ? void 0 : s.smoothScroll : (r = _this4.hiddenMessagesConfig) == null ? void 0 : r.smoothScroll,
          n = typeof t == "boolean" ? t : !0;
        if (_this4.isScrollButton || ((o = _this4.hiddenMessagesConfig) == null ? void 0 : o.clickScroll) === "last") V.scrollToBottom(_this4._messages, n), n && _this4.element && (Yt.hideElement(_this4.element), _this4.isScrollingToBottom = !0, V.waitForScrollEnd(_this4._messages.elementRef, function () {
          _this4.isScrollingToBottom = !1;
        }));else {
          var a = _this4.hiddenElements.values().next().value;
          a && _this4._messages.elementRef.scrollTo({
            left: 0,
            top: a.offsetTop,
            behavior: n ? "smooth" : "auto"
          });
        }
      }), re.apply(this._messages, e), e;
    }
  }, {
    key: "assignStyles",
    value: function assignStyles(e) {
      if (!this.element) return;
      Object.assign(this.element[E], e[x]);
      var t = he.processStateful(e);
      Lt.add(this.element, t);
    }
  }, {
    key: "updateHiddenElement",
    value: function updateHiddenElement() {
      var e, t;
      if (this.element) {
        this.isScrollButton = !1;
        var n = this.hiddenElements.size;
        if (n === 0) {
          Yt.hideElement(this.element);
          return;
        }
        var s = "".concat(n, " new message").concat(n === 1 ? "" : "s");
        if ((e = this.hiddenMessagesConfig) != null && e.onUpdate) {
          var r = this.hiddenMessagesConfig.onUpdate(s, n);
          this.element.innerHTML = r, re.apply(this._messages, this.element);
        } else this.element.innerHTML = s;
        (t = this.hiddenMessagesConfig) != null && t[T] && this.assignStyles(this.hiddenMessagesConfig[T]), Yt.displayElement(this.element);
      }
    }
  }, {
    key: "updateHidden",
    value: function updateHidden() {
      var e, t;
      if (!this.isScrollingToBottom) if (this.hiddenMessagesConfig) {
        var n = (e = this._messages.getFirstMessageContentEl()) == null ? void 0 : e.outerContainer;
        n && !V.isVisibleInParent(n, this._messages.elementRef) && (this.hiddenElements.add(n), (t = this.io) == null || t.observe(n), this.updateHiddenElement());
      } else this.updateScroll();
    }
  }, {
    key: "clearHidden",
    value: function clearHidden() {
      var _this5 = this;
      this.hiddenElements.forEach(function (e) {
        var t;
        return (t = _this5.io) == null ? void 0 : t.unobserve(e);
      }), this.hiddenElements.clear(), this.updateHiddenElement();
    }
  }, {
    key: "displayScroll",
    value: function displayScroll() {
      var e, t;
      this.element && this.element[E].opacity !== Cr && (Yt.displayElement(this.element), this.element.innerHTML = ((e = this.scrollButtonConfig) == null ? void 0 : e.content) || '<span style="font-size: 1.2rem; user-select: none;">&darr;</span>', (t = this.scrollButtonConfig) != null && t[T] && this.assignStyles(this.scrollButtonConfig[T]));
    }
  }, {
    key: "updateScroll",
    value: function updateScroll() {
      var e;
      this.isScrollingToBottom || !this.scrollButtonConfig || (V.isScrollbarAtBottomOfElement(this._messages.elementRef, ((e = this.scrollButtonConfig) == null ? void 0 : e.scrollDelta) || 80) ? this.element && this.element[E].opacity !== wr && Yt.hideElement(this.element) : (this.displayScroll(), this.isScrollButton = !0));
    }
  }], [{
    key: "displayElement",
    value: function displayElement(e) {
      e[E].opacity = Cr, e[E].pointerEvents = "auto";
    }
  }, {
    key: "hideElement",
    value: function hideElement(e) {
      e[E].opacity = wr, e[E].pointerEvents = "none";
    }
  }]);
}();
var Hr = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3csvg%20fill='%23000000'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2032%2032'%20xml:space='preserve'%3e%3cpath%20d='M23,30.36H9c-2.404,0-4.36-1.956-4.36-4.36V15c0-2.404,1.956-4.36,4.36-4.36h3.659%20c0.167-1.566,1.415-2.813,2.981-2.981V5.333c-1.131-0.174-2-1.154-2-2.333c0-1.301,1.059-2.36,2.36-2.36%20c1.302,0,2.36,1.059,2.36,2.36c0,1.179-0.869,2.159-2,2.333V7.66c1.566,0.167,2.814,1.415,2.981,2.981H23%20c2.404,0,4.36,1.956,4.36,4.36v11C27.36,28.404,25.404,30.36,23,30.36z%20M9,11.36c-2.007,0-3.64,1.633-3.64,3.64v11%20c0,2.007,1.633,3.64,3.64,3.64h14c2.007,0,3.64-1.633,3.64-3.64V15c0-2.007-1.633-3.64-3.64-3.64H9z%20M13.384,10.64h5.231%20C18.439,9.354,17.334,8.36,16,8.36C14.667,8.36,13.561,9.354,13.384,10.64z%20M16,1.36c-0.904,0-1.64,0.736-1.64,1.64%20S15.096,4.64,16,4.64c0.904,0,1.64-0.736,1.64-1.64S16.904,1.36,16,1.36z%20M20,27.36h-8c-1.301,0-2.36-1.059-2.36-2.36%20s1.059-2.36,2.36-2.36h8c1.302,0,2.36,1.059,2.36,2.36S21.302,27.36,20,27.36z%20M12,23.36c-0.904,0-1.64,0.735-1.64,1.64%20s0.736,1.64,1.64,1.64h8c0.904,0,1.64-0.735,1.64-1.64s-0.735-1.64-1.64-1.64H12z%20M31,23.86h-2c-0.199,0-0.36-0.161-0.36-0.36V15%20c0-0.199,0.161-0.36,0.36-0.36h2c0.199,0,0.36,0.161,0.36,0.36v8.5C31.36,23.699,31.199,23.86,31,23.86z%20M29.36,23.14h1.279v-7.78%20H29.36V23.14z%20M3,23.86H1c-0.199,0-0.36-0.161-0.36-0.36V15c0-0.199,0.161-0.36,0.36-0.36h2c0.199,0,0.36,0.161,0.36,0.36v8.5%20C3.36,23.699,3.199,23.86,3,23.86z%20M1.36,23.14h1.28v-7.78H1.36V23.14z%20M20,20.36c-1.302,0-2.36-1.059-2.36-2.36%20s1.059-2.36,2.36-2.36s2.36,1.059,2.36,2.36C22.36,19.302,21.302,20.36,20,20.36z%20M20,16.36c-0.904,0-1.64,0.736-1.64,1.64%20s0.735,1.64,1.64,1.64s1.64-0.735,1.64-1.64S20.904,16.36,20,16.36z%20M12,20.36c-1.301,0-2.36-1.059-2.36-2.36s1.059-2.36,2.36-2.36%20s2.36,1.059,2.36,2.36C14.36,19.302,13.301,20.36,12,20.36z%20M12,16.36c-0.904,0-1.64,0.736-1.64,1.64s0.736,1.64,1.64,1.64%20s1.64-0.735,1.64-1.64S12.904,16.36,12,16.36z'/%3e%3crect%20style='fill:none;'%20width='32'%20height='32'/%3e%3c/svg%3e",
  Li = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAMAAAC/MqoPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADNQTFRF////9vX18vLy/Pz86enp4+Li2tnZ1tbWzczM+fn57Ozs4N/f09LS0M/P5uXl7+/v3dzcwtncCAAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAZNSURBVHja7d3bdtsqEABQYABZSLH9/3+ZpnUsIcF5iOM6PfElNoMHMfPQdq3GmL0GkLhEUqLaUExnOtOZznSmM53pTGc605nOdKYznelMZzrTmV4LXSqllKyJDkob26xWq8Zae/iH0QoWTm9d1xur4WuypQJtTd+5dqn0VjcxzNO5/57mEBvdLo8Oron6aseWOjYOFkVvjQs3DmgyONMuht52EfztP+4hdu0i6LCO808/M8c1lE/fuPGej41uUzgdtoO/75N+2ELJ9I3b3//hPXbiMenm3pR/Jt4USgcLBIp4Bh10gqKVhvLo0klCxeSky96nKcj3siw6pJIL4XsoiQ7apyvMY/V3HHrSRioLopvEhSpTCn2TPEuwKYMOIX0tAxRBf/Hpa+lfSqBv9gi1FPsNfTrMAiVmIE/vJhz61FGnQxRIEYE4vfNYdN8Rp6MlHaHotHTn8ejekaZPAjEmyvQWdZFTtYTpXqCGJ0zvcek9Yfoel76nS0ffv1NMp1ca+pkgyfRCGind4L7OWWc605l+cxjsyhqy9AGbPpClc1/nvl5VX0c/3Alk6RU3+Am7shNZ+h6bvidLr7jBB+zKBrL0irOOudmIUDzTmf5gIP+iEuXtRuTVaEmY/oZLfyNMrzjryPc0gerMTdpVg0tvjJUU6bLPcGOoUv46SLL6Wi8yhLf06C7TUyekI0efRaaYqdFltkeNpPumRPSMDxgBYvSM035FrKAmH72hRW99PrpvSdEHkTEGUvSsK3yKVDkuJ92RohcZaehzzirPpOg+J92Tolfc4Cumx5xVXpGiZ34+ICX6W84qv5GiR5NPbiIpOv6BCoSvSkTX+eiaGP092zINvBOj4x8mSf9FqejvNo/cvpOji19ZbmviL0GPLsYMFzgzCor0+Bv/ePDvSJKOb9dJ5UlnbnEHiHgzv6cdTpJOWuc/u3FEucLDOL75xGtBiefrcwgoC9NDSH/jkH6pAuXmBqPQ9HSUPVdZBH1GGOrMXAQdYxcKZfxAoK+KKBKFLosoEoX+u4giUehz8jlcnAuhp78I46yDYNAd+QLR6K+pr+yvxdBTHyVDubQh0UfSxaHSd0lbvNkVRE87JGOtc+PQd2QLQ6fHhJkKsSh6yg13tO08JPprsgrrXWH0dJd2vH1MLPprot4eXoujpzrdhngiD40ek2y92lggPcnWa8qN1Yz0BFuvZhRl0uOfR0v4Ewuli/Bg4Qr3lArqGdndQ3UPO1EunXYwnelMZzrTmc50pjOd6UxnOtOZznSmM53pTGf6kuj6oedFKV0s3fX6sX1S3bsi6a4PD7+/YAqYeBw6pIB/4qEgOqxdSPbGiim4NRRCbzs3Jj0L4UfXtQXQVRfn5IdA/Bw7RZzurEV6EtdsLeGXkIPuA+K1UoVeA0l62zmN/LqfSSft9KkepmoRuvi3nd5uKNFB9zbbXEANqdr941XO0NJx2v2jdJenpf+/3bvn0ts16ph+sd6hX7dPo2+2cZzE02Ia43bzDHqr+2Evnhz74ZHU30ffbKOeng1/NPV30Ns1gYQnSP2P6e65Pfxc6h02XZqXQCjhJ6kPL6bFo4NrGvAU4UII4SE2P1vQuZkuOxckVfehisF1MjUddN/MZBN+kvq5uf0O/xa66gyNS9ktMWlz44rO1Z8C19i5FPdHzPamXn+F3hryPfxMr78+4F+kq22kO6Rf6fUQt+puuustyWv4rbG3l/duztFB96GYoe1cTBdXMr+nw9qVM6ZfxOvzezff0nXi/ZOndvrR6Zvpm0c3h6nhdb+5iS7tsIim/qXZD9+97/Jf+rpZ5BET1ayv0GUzLhEuhBBjIy/RdVPgndutIRt9nt7p5cKFEEJ3Z+jQFDZL+XnMDXxHB73gxn5s9Kc3d3/pFciFkN/QTSXHJpX5l66gDrkQoP6hL3xsPw39la4qOiV8tH78XeSbue6N9mvWa6J/ybpc1CT1Wnh5Qq9meP8IOKH3ddH7E/ri1iYux/SXDrXR4UiPdck/wUpU+FtPf6/orja6O9KL3l56LOvVxe5Ib2qjN0d6Vbex4ghWlU3bPqI90If66MNng680FNpbJijH6kCvaF3uMzQ3+IrpFerV4Y9dffQdN3im10ivbuImhD3Qq5u4HdZkua8znelMZ/pS4z9CPVKkxowNxgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wMy0yN1QxNTo0NToxNSswMDowMN1xSg4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDMtMjdUMTU6NDU6MTUrMDA6MDCsLPKyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==";
var _o = /*#__PURE__*/function () {
  function _o(e) {
    _classCallCheck(this, _o);
    this.className = e;
  }
  return _createClass(_o, [{
    key: "getAvatarContainer",
    value: function getAvatarContainer(e) {
      return e.getElementsByClassName(this.className)[0];
    }
  }, {
    key: "tryHide",
    value: function tryHide(e) {
      var t;
      (t = this.getAvatarContainer(e)[E]).visibility || (t.visibility = "hidden");
    }
  }, {
    key: "tryReveal",
    value: function tryReveal(e) {
      this.getAvatarContainer(e)[E].visibility = "";
    }
  }, {
    key: "trySoftRem",
    value: function trySoftRem(e) {
      this.getAvatarContainer(e)[f].add("role-hidden");
    }
  }]);
}();
var Tt = /*#__PURE__*/function (_o2) {
  function Tt(e) {
    var _this6;
    _classCallCheck(this, Tt);
    _this6 = _callSuper(this, Tt, ["avatar-container"]), _this6._avatars = e;
    return _this6;
  }
  _inherits(Tt, _o2);
  return _createClass(Tt, [{
    key: "addBesideBubble",
    value: function addBesideBubble(e, t) {
      var n = typeof this._avatars == "boolean" ? void 0 : this._avatars,
        s = this.createAvatar(t, n),
        r = this.getPosition(t, n);
      s[f].add(r === Wt ? "start-item-position" : "end-item-position"), e.insertAdjacentElement(r === Wt ? "beforebegin" : "afterend", s);
    }
  }, {
    key: "createAvatar",
    value: function createAvatar(e, t) {
      var r, o, a, c, l;
      var n = S("img");
      e === $ ? (n[R] = ((r = t == null ? void 0 : t[$]) == null ? void 0 : r[R]) || ((o = t == null ? void 0 : t[x]) == null ? void 0 : o[R]) || Li, n.onerror = Tt.errorFallback.bind(this, Li)) : (n[R] = ((a = t == null ? void 0 : t[e]) == null ? void 0 : a[R]) || ((c = t == null ? void 0 : t[te]) == null ? void 0 : c[R]) || ((l = t == null ? void 0 : t[x]) == null ? void 0 : l[R]) || Hr, n.onerror = Tt.errorFallback.bind(this, Hr)), n[f].add("avatar"), n.alt = "".concat(e, " avatar");
      var s = S();
      return s[f].add(this.className), s.appendChild(n), t && Tt.applyCustomStyles(s, n, t, e), s;
    }
  }, {
    key: "getPosition",
    value: function getPosition(e, t) {
      var s, r, o, a, c, l;
      var n = ie.processPosition((r = (s = t == null ? void 0 : t[e]) == null ? void 0 : s[T]) == null ? void 0 : r.position);
      return e !== $ && (n !== null && n !== void 0 ? n : n = (a = (o = t == null ? void 0 : t.ai) == null ? void 0 : o[T]) == null ? void 0 : a.position), n !== null && n !== void 0 ? n : n = (l = (c = t == null ? void 0 : t[x]) == null ? void 0 : c[T]) == null ? void 0 : l.position, n !== null && n !== void 0 ? n : n = e === $ ? io : Wt, n;
    }
  }], [{
    key: "errorFallback",
    value: function errorFallback(e, t) {
      var n = t.target;
      n.onerror = null, n[R] = e;
    }
  }, {
    key: "applyCustomStylesToElements",
    value: function applyCustomStylesToElements(e, t, n) {
      Object.assign(e[E], n.container), Object.assign(t[E], n.avatar);
    }
  }, {
    key: "applyCustomStyles",
    value: function applyCustomStyles(e, t, n, s) {
      var r, o, a, c;
      if ((r = n[x]) != null && r[T] && Tt.applyCustomStylesToElements(e, t, n[x][T]), s === $) (o = n.user) != null && o[T] && Tt.applyCustomStylesToElements(e, t, n.user[T]);else {
        (a = n.ai) != null && a[T] && Tt.applyCustomStylesToElements(e, t, n.ai[T]);
        var l = (c = n[s]) == null ? void 0 : c[T];
        l && Tt.applyCustomStylesToElements(e, t, l);
      }
    }
  }]);
}(_o);
var Kn = /*#__PURE__*/function (_o3) {
  function Kn(e) {
    var _this7;
    _classCallCheck(this, Kn);
    _this7 = _callSuper(this, Kn, ["name"]), _this7._names = e;
    return _this7;
  }
  _inherits(Kn, _o3);
  return _createClass(Kn, [{
    key: "addBesideBubble",
    value: function addBesideBubble(e, t) {
      var n = typeof this._names == "boolean" ? {} : this._names,
        s = this.createName(t, n),
        r = Kn.getPosition(t, n);
      s[f].add(r === Wt ? "start-item-position" : "end-item-position"), e.insertAdjacentElement(r === Wt ? "beforebegin" : "afterend", s);
    }
  }, {
    key: "createName",
    value: function createName(e, t) {
      var n = S();
      return n[f].add(this.className), n.textContent = Kn.getNameText(e, t), Kn.applyStyle(n, e, t), n;
    }
  }], [{
    key: "getPosition",
    value: function getPosition(e, t) {
      var s, r, o;
      var n = ie.processPosition((s = t == null ? void 0 : t[e]) == null ? void 0 : s.position);
      return e !== $ && (n !== null && n !== void 0 ? n : n = (r = t == null ? void 0 : t[te]) == null ? void 0 : r.position), n !== null && n !== void 0 ? n : n = (o = t == null ? void 0 : t[x]) == null ? void 0 : o.position, n !== null && n !== void 0 ? n : n = e === $ ? io : Wt, n;
    }
  }, {
    key: "applyStyle",
    value: function applyStyle(e, t, n) {
      var s, r, o, a;
      Object.assign(e[E], (s = n[x]) == null ? void 0 : s[E]), t === $ ? Object.assign(e[E], (r = n[$]) == null ? void 0 : r[E]) : (Object.assign(e[E], (o = n[te]) == null ? void 0 : o[E]), Object.assign(e[E], (a = n[t]) == null ? void 0 : a[E]));
    }
  }, {
    key: "getNameText",
    value: function getNameText(e, t) {
      var n, s, r, o, a, c;
      return e === $ ? ((n = t[$]) == null ? void 0 : n[d]) || ((s = t[x]) == null ? void 0 : s[d]) || "User" : e === te ? ((r = t[te]) == null ? void 0 : r[d]) || ((o = t[x]) == null ? void 0 : o[d]) || "AI" : ((a = t[e]) == null ? void 0 : a[d]) || ((c = t[x]) == null ? void 0 : c[d]) || e;
    }
  }]);
}(_o);
var je = /*#__PURE__*/function () {
  function je(e) {
    var _this8 = this;
    _classCallCheck(this, je);
    var t, n, s, r;
    this.messageElementRefs = [], this.htmlClassUtilities = {}, this.messageToElements = [], this.maxVisibleMessages = 4e3, this.autoScrollAllowed = !0, this.elementRef = je.createContainerElement(), this.messageStyles = ie.processMessageStyles(e.messageStyles), this._remarkable = cs.createNew(e.remarkable), this._applyHTMLToRemarkable = (t = e.remarkable) == null ? void 0 : t.applyHTML, e.avatars && (this.avatar = new Tt(e.avatars)), e.names && (this.name = new Kn(e.names)), e.browserStorage && (this.browserStorage = new Hc(e.browserStorage)), this._onMessage = mn.onMessage.bind(this, e), e.htmlClassUtilities && (this.htmlClassUtilities = e.htmlClassUtilities), (e.hiddenMessages || e.scrollButton) && (this.scrollButton = new Yt(this, e.hiddenMessages, e.scrollButton)), this.focusMode = ie.processFocusMode(e.focusMode), this.focusMode || (this._lastGroupMessagesElement = S(), this.elementRef.appendChild(this._lastGroupMessagesElement), e.upwardsMode && (this.elementRef = this._lastGroupMessagesElement)), typeof this.focusMode != "boolean" && (n = this.focusMode) != null && n.fade && Us.setFade(this.elementRef, this.focusMode.fade), this._customWrappers = e.htmlWrappers || ie.processStreamHTMLWrappers((s = e.connect) == null ? void 0 : s.stream), typeof this.focusMode != "boolean" && ((r = this.focusMode) == null ? void 0 : r.streamAutoScroll) === !1 && (this.autoScrollAllowed = !1), e.maxVisibleMessages && (this.maxVisibleMessages = e.maxVisibleMessages), setTimeout(function () {
      _this8.submitUserMessage = e.submitUserMessage;
    });
  }
  return _createClass(je, [{
    key: "addNewTextMessage",
    value: function addNewTextMessage(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      if (n != null && n.status) {
        var o = this.overwriteText(t, e, this.messageElementRefs);
        if (o) return o;
        n.status = !1;
      }
      var r = s ? this.createAndPrependNewMessageElement(e, t, s) : this.createAndAppendNewMessageElement(e, t);
      return r.bubbleElement[f].add(je.TEXT_BUBBLE_CLASS), this.applyCustomStyles(r, t, !1), N.fillEmptyMessageElement(r.bubbleElement, e), r;
    }
    // prettier-ignore
  }, {
    key: "overwriteText",
    value: function overwriteText(e, t, n) {
      var s = N.overwriteMessage(this.messageToElements, n, t, e, "text", je.TEXT_BUBBLE_CLASS);
      return s && this.renderText(s.bubbleElement, t, e), s;
    }
  }, {
    key: "createAndAppendNewMessageElement",
    value: function createAndAppendNewMessageElement(e, t) {
      var n = this.createNewMessageElement(e, t);
      return this.appendOuterContainerElemet(n.outerContainer, this.focusMode ? t : void 0), n;
    }
  }, {
    key: "createNewGroupElementFocusMode",
    value: function createNewGroupElementFocusMode() {
      var t;
      (t = this._lastGroupMessagesElement) == null || t[f].remove(je.LAST_GROUP_MESSAGES_ACTIVE);
      var e = S();
      (this.messageToElements.length > 1 || this.messageToElements.length === 1 && this.messageToElements[0][0][A] !== $) && e[f].add(je.LAST_GROUP_MESSAGES_ACTIVE), this._lastGroupMessagesElement = e;
    }
  }, {
    key: "appendOuterContainerElemet",
    value: function appendOuterContainerElemet(e, t) {
      var n;
      this.focusMode && (t === $ || !this._lastGroupMessagesElement) && this.createNewGroupElementFocusMode(), (n = this._lastGroupMessagesElement) == null || n.appendChild(e), this._lastGroupMessagesElement && (this.focusMode || !this.elementRef.contains(this._lastGroupMessagesElement)) && this.elementRef.appendChild(this._lastGroupMessagesElement);
    }
  }, {
    key: "createAndPrependNewMessageElement",
    value: function createAndPrependNewMessageElement(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var o;
      var r = this.createNewMessageElement(e, t, n, s);
      if (n && (o = this.elementRef.firstChild) != null && o[f].contains(je.INTRO_CLASS)) {
        this.elementRef.firstChild.insertAdjacentElement("afterend", r.outerContainer);
        var a = this.messageElementRefs[0];
        this.messageElementRefs[0] = this.messageElementRefs[1], this.messageElementRefs[1] = a;
      } else this.elementRef.insertBefore(r.outerContainer, this.elementRef.firstChild);
      return r;
    }
  }, {
    key: "createMessageElementsOnOrientation",
    value: function createMessageElementsOnOrientation(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      return n ? this.createAndPrependNewMessageElement(e, t, n, s) : this.createNewMessageElement(e, t, n, s);
    }
  }, {
    key: "getNumberOfContentMessages",
    value: function getNumberOfContentMessages() {
      var t, n;
      var e = this.messageElementRefs.length;
      return (n = (t = this.messageElementRefs[e - 1]) == null ? void 0 : t.bubbleElement) != null && n[f].contains(St.BUBBLE_CLASS) ? e - 1 : e;
    }
  }, {
    key: "createNewMessageElement",
    value: function createNewMessageElement(e, t) {
      var _this9 = this;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var o;
      !s && this.getNumberOfContentMessages() >= this.maxVisibleMessages && setTimeout(function () {
        return _this9.removeFirstMessage();
      }), s || (o = this._introPanel) == null || o.hide();
      var r = this.messageElementRefs[this.messageElementRefs.length - 1];
      return Nt.changeFullViewToSmall(this), !n && je.isTemporaryElement(r) && (this.revealRoleElementsIfTempRemoved(r, t), this.removeLastMessage()), this.createMessageElements(e, t, n);
    }
    // this can be tested by having an ai message, then a temp ai message with html that submits new user message:
    // https://github.com/OvidijusParsiunas/deep-chat/issues/258
    // prettier-ignore
  }, {
    key: "revealRoleElementsIfTempRemoved",
    value: function revealRoleElementsIfTempRemoved(e, t) {
      if ((this.avatar || this.name) && At.isElementTemporary(e)) {
        var n = this.messageElementRefs[this.messageElementRefs.length - 2];
        n && this.messageToElements.length > 0 && !e.bubbleElement[f].contains(N.getRoleClass(t)) && N.revealRoleElements(n.innerContainer, this.avatar, this.name);
      }
    }
  }, {
    key: "createElements",
    value: function createElements(e, t) {
      var n = je.createBaseElements(t),
        s = n.outerContainer,
        r = n.innerContainer,
        o = n.bubbleElement;
      return s.appendChild(r), this.addInnerContainerElements(o, e, t), n;
    }
  }, {
    key: "createMessageElements",
    value: function createMessageElements(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var s = this.createElements(e, t);
      return N.updateRefArr(this.messageElementRefs, s, n), N.classifyRoleMessages(this.messageElementRefs, t), s;
    }
  }, {
    key: "addInnerContainerElements",
    value:
    // prettier-ignore
    function addInnerContainerElements(e, t, n) {
      var s = this.messageElementRefs[this.messageElementRefs.length - 1];
      return N.areOuterContainerClassRolesSame(n, s) && !this.isLastMessageError() && N.hideRoleElements(s.innerContainer, this.avatar, this.name), e[f].add("message-bubble", N.getRoleClass(n), n === $ ? "user-message-text" : "ai-message-text"), this.renderText(e, t, n), N.addRoleElements(e, n, this.avatar, this.name), {
        bubbleElement: e
      };
    }
    // prettier-ignore
  }, {
    key: "applyCustomStyles",
    value: function applyCustomStyles(e, t, n, s) {
      e && this.messageStyles && Be.applyCustomStyles(this.messageStyles, e, t, n, s);
    }
  }, {
    key: "removeMessage",
    value: function removeMessage(e) {
      e.outerContainer.remove();
      var t = this.messageElementRefs.findIndex(function (n) {
        return n === e;
      });
      this.messageElementRefs.splice(t, 1);
    }
  }, {
    key: "removeFirstMessage",
    value: function removeFirstMessage() {
      this.messageElementRefs[0].outerContainer.remove(), this.messageElementRefs.shift();
    }
  }, {
    key: "removeLastMessage",
    value: function removeLastMessage() {
      this.messageElementRefs[this.messageElementRefs.length - 1].outerContainer.remove(), this.messageElementRefs.pop();
    }
  }, {
    key: "isLastMessageError",
    value: function isLastMessageError() {
      var e;
      return (e = N.getLastMessageBubbleElement(this.elementRef)) == null ? void 0 : e[f].contains(Ds);
    }
  }, {
    key: "sendClientUpdate",
    value: function sendClientUpdate(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var n;
      (n = this._onMessage) == null || n.call(this, e, t);
    }
    // role is optional to not add wrapper to error
  }, {
    key: "renderText",
    value: function renderText(e, t, n) {
      var _re$tryAddWrapper2 = re.tryAddWrapper(e, t, this._customWrappers, n),
        s = _re$tryAddWrapper2.contentEl,
        r = _re$tryAddWrapper2.wrapper;
      r && re.apply(this, e), s.innerHTML = this._remarkable.render(t), this._applyHTMLToRemarkable && re.apply(this, s), s.innerText.trim().length === 0 && s.children.length > 0 && s.children[0].tagName !== "P" && (s.innerText = t);
    }
    // this is mostly used for enabling highlight.js to highlight code if it downloads later
  }, {
    key: "refreshTextMessages",
    value: function refreshTextMessages(e) {
      var _this0 = this;
      this._remarkable = cs.createNew(e), this.messageToElements.forEach(function (t) {
        t[1][d] && t[0][d] && _this0.renderText(t[1][d].bubbleElement, t[0][d], t[0][A]);
      });
    }
  }, {
    key: "getFirstMessageContentEl",
    value: function getFirstMessageContentEl() {
      var _this$messageToElemen = this.messageToElements[this.messageToElements.length - 1][1],
        e = _this$messageToElemen.text,
        t = _this$messageToElemen.html,
        n = _this$messageToElemen.files;
      return e || t || (n == null ? void 0 : n[0]);
    }
  }, {
    key: "scrollToFirstElement",
    value: function scrollToFirstElement(e, t) {
      var n;
      if (e === $) {
        var s = typeof this.focusMode != "boolean" && ((n = this.focusMode) == null ? void 0 : n.smoothScroll);
        V.scrollToBottom(this, s);
      } else if (t && this.autoScrollAllowed) {
        var _s3 = this.getFirstMessageContentEl();
        V.scrollToBottom(this, !1, _s3 == null ? void 0 : _s3.outerContainer);
      }
    }
  }], [{
    key: "createContainerElement",
    value: function createContainerElement() {
      var e = S();
      return e.id = ro, e;
    }
  }, {
    key: "isTemporaryElement",
    value: function isTemporaryElement(e) {
      return je.isLoadingMessage(e) || At.isElementTemporary(e);
    }
  }, {
    key: "createBaseElements",
    value: function createBaseElements(e) {
      var t = S(),
        n = S();
      n[f].add("inner-message-container"), t.appendChild(n), t[f].add("outer-message-container"), t[f].add(N.buildRoleOuterContainerClass(e));
      var s = S();
      return s[f].add("message-bubble"), n.appendChild(s), {
        outerContainer: t,
        innerContainer: n,
        bubbleElement: s
      };
    }
  }, {
    key: "createMessageContent",
    value: function createMessageContent(e) {
      var t = e.text,
        n = e.files,
        s = e.html,
        r = e.custom,
        o = e._sessionId,
        a = e.role,
        c = _defineProperty({}, A, a || te);
      return t && (c[d] = t), n && (c[m] = n), s && (c[L] = s), !t && !n && !s && (c[d] = ""), r && (c.custom = r), o && (c._sessionId = o), c;
    }
  }, {
    key: "isLoadingMessage",
    value: function isLoadingMessage(e) {
      return e == null ? void 0 : e.bubbleElement[f].contains(St.BUBBLE_CLASS);
    }
  }]);
}();
je.TEXT_BUBBLE_CLASS = "text-message", je.INTRO_CLASS = "deep-chat-intro", je.LAST_GROUP_MESSAGES_ACTIVE = "deep-chat-last-group-messages-active";
var ot = je;
var N = /*#__PURE__*/function () {
  function N() {
    _classCallCheck(this, N);
  }
  return _createClass(N, null, [{
    key: "getLastElementsByClass",
    value: function getLastElementsByClass(e, t, n) {
      var _loop = function _loop() {
          var r = e[s];
          if (r.bubbleElement[f].contains(t[0]) && !t.slice(1).find(function (a) {
            return !r.bubbleElement[f].contains(a);
          })) if (n) {
            if (!n.find(function (c) {
              return r.bubbleElement[f].contains(c);
            })) return {
              v: r
            };
          } else return {
            v: r
          };
        },
        _ret;
      for (var s = e.length - 1; s >= 0; s -= 1) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    }
  }, {
    key: "getLastMessage",
    value: function getLastMessage(e, t, n) {
      for (var s = e.length - 1; s >= 0; s -= 1) if (e[s][0][A] === t) if (n) {
        if (e[s][0][n]) return e[s][0];
      } else return e[s][0];
    }
  }, {
    key: "getLastTextToElement",
    value: function getLastTextToElement(e, t) {
      for (var n = e.length - 1; n >= 0; n -= 1) if (e[n][0] === t) return e[n];
    }
    // IMPORTANT: If the overwrite message does not contain a role property it will look for the last 'ai' role message
    // and if messages have custom roles, it will still look to update the last 'ai' role message
    // prettier-ignore
  }, {
    key: "overwriteMessage",
    value: function overwriteMessage(e, t, n, s, r, o) {
      var a = N.getLastElementsByClass(t, [N.getRoleClass(s), o], [St.BUBBLE_CLASS]),
        c = N.getLastMessage(e, s, r);
      return c && (c[r] = n), a;
    }
  }, {
    key: "getRoleClass",
    value: function getRoleClass(e) {
      return "".concat(e, "-message");
    }
    // makes sure the bubble has dimensions when there is no text
  }, {
    key: "fillEmptyMessageElement",
    value: function fillEmptyMessageElement(e, t) {
      t.trim().length === 0 && (e[f].add(Ar), e.innerHTML = '<div style="color:#00000000">.</div>');
    }
  }, {
    key: "unfillEmptyMessageElement",
    value: function unfillEmptyMessageElement(e, t) {
      e[f].contains(Ar) && t.trim().length > 0 && e.replaceChildren();
    }
  }, {
    key: "getLastMessageBubbleElement",
    value: function getLastMessageBubbleElement(e) {
      var t, n, s;
      return Array.from(((s = (n = (t = N.getLastMessageElement(e)) == null ? void 0 : t.children) == null ? void 0 : n[0]) == null ? void 0 : s.children) || []).find(function (r) {
        return r[f].contains("message-bubble");
      });
    }
  }, {
    key: "getLastMessageElement",
    value: function getLastMessageElement(e) {
      var n;
      var t = (n = e.children[e.children.length - 1]) == null ? void 0 : n.children;
      return t == null ? void 0 : t[t.length - 1];
    }
  }, {
    key: "addRoleElements",
    value: function addRoleElements(e, t, n, s) {
      n == null || n.addBesideBubble(e, t), s == null || s.addBesideBubble(e, t);
    }
  }, {
    key: "hideRoleElements",
    value: function hideRoleElements(e, t, n) {
      t == null || t.tryHide(e), n == null || n.tryHide(e);
    }
  }, {
    key: "revealRoleElements",
    value: function revealRoleElements(e, t, n) {
      t == null || t.tryReveal(e), n == null || n.tryReveal(e);
    }
  }, {
    key: "softRemRoleElements",
    value: function softRemRoleElements(e, t, n) {
      t == null || t.trySoftRem(e), n == null || n.trySoftRem(e);
    }
  }, {
    key: "updateRefArr",
    value: function updateRefArr(e, t, n) {
      n ? e.unshift(t) : e.push(t);
    }
  }, {
    key: "buildRoleOuterContainerClass",
    value: function buildRoleOuterContainerClass(e) {
      return "".concat(xs).concat(e);
    }
  }, {
    key: "addNewPositionClasses",
    value: function addNewPositionClasses(e, t) {
      var _e$outerContainer$f;
      e.outerContainer[f].remove(bi, xr, yi), (_e$outerContainer$f = e.outerContainer[f]).add.apply(_e$outerContainer$f, _toConsumableArray(t));
    }
  }, {
    key: "getNumberOfElements",
    value: function getNumberOfElements(e) {
      var t = 0;
      return e[d] !== void 0 && (t += 1), e[L] !== void 0 && (t += 1), e[m] && (t += e[m].length), t;
    }
  }, {
    key: "filterdMessageElements",
    value: function filterdMessageElements(e, t) {
      return e.filter(function (n) {
        return n.bubbleElement[f].contains(t);
      });
    }
  }, {
    key: "findMessageElements",
    value: function findMessageElements(e, t) {
      return e.find(function (n) {
        return n.bubbleElement[f].contains(t);
      });
    }
  }, {
    key: "generateMessageBodyElements",
    value: function generateMessageBodyElements(e, t) {
      var n = {};
      return e[d] && (n[d] = N.findMessageElements(t, ot.TEXT_BUBBLE_CLASS)), e[L] && (n[L] = N.findMessageElements(t, xt.HTML_BUBBLE_CLASS)), e[m] && (n[m] = N.filterdMessageElements(t, so)), n;
    }
  }, {
    key: "generateMessageBody",
    value: function generateMessageBody(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var s = N.getNumberOfElements(e),
        r = n ? t.slice(0, s) : t.slice(t.length - s);
      return N.generateMessageBodyElements(e, r);
    }
    // if role not present - traverse all, if present - traverse last messages
  }, {
    key: "classifyRoleMessages",
    value: function classifyRoleMessages(e, t) {
      var n = t ? N.buildRoleOuterContainerClass(t) : void 0;
      for (var s = e.length - 1; s >= 0; s -= 1) {
        if (t || (n = Array.from(e[s].outerContainer[f]).find(function (u) {
          return u.startsWith(xs);
        })), !n) continue;
        var r = e[s],
          o = r.outerContainer[f].contains(n),
          a = e[s - 1],
          c = e[s + 1],
          l = a == null ? void 0 : a.outerContainer[f].contains(n),
          h = c == null ? void 0 : c.outerContainer[f].contains(n);
        if (o) !l && h ? N.addNewPositionClasses(r, [bi]) : l && h ? N.addNewPositionClasses(r, [xr]) : l && !h ? N.addNewPositionClasses(r, [yi]) : !l && !h && N.addNewPositionClasses(r, [bi, yi]);else if (t) break;
      }
    }
  }, {
    key: "areOuterContainerClassRolesSame",
    value: function areOuterContainerClassRolesSame(e, t) {
      return t ? Array.from(t.outerContainer[f]).find(function (s) {
        return s.startsWith(xs);
      }) === N.buildRoleOuterContainerClass(e) : !1;
    }
  }, {
    key: "resetAllRoleElements",
    value: function resetAllRoleElements(e, t, n) {
      if (!t && !n) return;
      var s = "";
      e.forEach(function (r, o) {
        r.bubbleElement[f].contains(Ds) || N.revealRoleElements(r.innerContainer, t, n);
        var a = Array.from(r.outerContainer[f]).find(function (c) {
          return c.startsWith(xs);
        });
        s === a && N.hideRoleElements(e[o - 1].innerContainer, t, n), s = a;
      });
    }
    // this is a workaround to prevent JSON.parse(JSON.stringify()) from removing the files' 'ref' property values
    // and 'custom' property value if it is not shallow copyable
    // note - structuredClone can fix this but it doesn't have good legacy compatibility
  }, {
    key: "deepCloneMessagesWithReferences",
    value: function deepCloneMessagesWithReferences(e) {
      return e.map(function (t) {
        return N.processMessageContent(t);
      });
    }
  }, {
    key: "processMessageContent",
    value: function processMessageContent(e) {
      if (e == null || _typeof(e) !== F) return e;
      if (Array.isArray(e)) return e.map(function (n) {
        return N.processMessageContent(n);
      });
      var t = {};
      return Object.entries(e).forEach(function (_ref0) {
        var _ref1 = _slicedToArray(_ref0, 2),
          n = _ref1[0],
          s = _ref1[1];
        n === "ref" && s instanceof File || n === "custom" ? t[n] = s : s !== null && _typeof(s) === F ? t[n] = N.processMessageContent(s) : t[n] = s;
      }), t;
    }
  }]);
}();
var ht = /*#__PURE__*/function () {
  function ht(e, t) {
    _classCallCheck(this, ht);
    this._fileAdded = !1, this._streamType = "", this._hasStreamEnded = !1, this._partialContent = "", this._messages = e, _typeof(t) == "object" && (this._partialRender = t.partialRender);
  }
  return _createClass(ht, [{
    key: "upsertStreamedMessage",
    value: function upsertStreamedMessage(e) {
      if (this._hasStreamEnded) return;
      if ((e == null ? void 0 : e[d]) === void 0 && (e == null ? void 0 : e[L]) === void 0) return console[p](ao);
      var t = (e == null ? void 0 : e[d]) || (e == null ? void 0 : e[L]) || "",
        n = V.isScrollbarAtBottomOfElement(this._messages.elementRef),
        s = (e == null ? void 0 : e[d]) !== void 0 ? d : L;
      if (!this._elements && !this._message) this.setInitialState(s, t, e == null ? void 0 : e[A]);else {
        if (this._streamType !== s) return console[p](Ko);
        e != null && e[A] && (e == null ? void 0 : e[A]) !== this._activeMessageRole ? (this.finaliseStreamedMessage(!1), this.setInitialState(s, t, e == null ? void 0 : e[A])) : this.updateBasedOnType(t, s, e == null ? void 0 : e.overwrite);
      }
      e != null && e._sessionId && (this._sessionId = e == null ? void 0 : e._sessionId), e != null && e.custom && this._message && (this._message.custom = e.custom), n && this._messages.autoScrollAllowed && V.scrollToBottom(this._messages);
    }
  }, {
    key: "setInitialState",
    value: function setInitialState(e, t, n) {
      var o, a, c;
      this._streamType = e, this._targetWrapper = void 0, this._fileAdded = !1, this._partialContent = "", this._partialBubble = void 0, n !== null && n !== void 0 ? n : n = te;
      var s = ((o = this._messages._customWrappers) == null ? void 0 : o[n]) || ((a = this._messages._customWrappers) == null ? void 0 : a[x]),
        r = s ? "" : t;
      this._elements = e === d ? this._messages.addNewTextMessage(r, n) : xt.add(this._messages, r, n), this._elements && (this._elements.bubbleElement[f].add(ht.MESSAGE_CLASS), this._activeMessageRole = n, this._message = _defineProperty(_defineProperty({}, A, this._activeMessageRole), e, r), this._messages.messageToElements.push([this._message, _defineProperty({}, e, this._elements)]), s && this.setTargetWrapperIfNeeded(this._elements, t, this._streamType, s), (c = this._messages.scrollButton) == null || c.updateHidden());
    }
    // not using existing htmlUtils htmlWrappers logic to be able to stream html
  }, {
    key: "setTargetWrapperIfNeeded",
    value: function setTargetWrapperIfNeeded(e, t, n, s) {
      e.bubbleElement.innerHTML = s, this._targetWrapper = re.getTargetWrapper(e.bubbleElement), this._elements && re.apply(this._messages, this._elements.bubbleElement), this.updateBasedOnType(t, n);
    }
  }, {
    key: "updateBasedOnType",
    value: function updateBasedOnType(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var o;
      var s = this._targetWrapper || ((o = this._elements) == null ? void 0 : o.bubbleElement);
      this._partialRender || N.unfillEmptyMessageElement(s, e), (t === d ? this.updateText : this.updateHTML).bind(this)(e, s, n);
    }
  }, {
    key: "updateText",
    value: function updateText(e, t, n) {
      this._message && (this._message[d] = n ? e : this._message[d] + e, this._partialRender ? this.updatePartialSegments(e, t, n) : this._messages.renderText(t, this._message[d]));
    }
    // finds the paragraph mark that a new partial bubble should be created at, ignoring marks that are
    // inside an unclosed code block or part of a markdown horizontal rule pattern - "a \n\n---\n\n a"
    // (when the mark is at the segment end - waits for more content to arrive to know it is not a rule)
    // https://github.com/OvidijusParsiunas/deep-chat/issues/500#issuecomment-4281293147
  }, {
    key: "getPartialSplitIndex",
    value: function getPartialSplitIndex(e) {
      var t = e.indexOf(ht.PARTIAL_RENDER_MARK);
      for (; t !== -1;) {
        var n = this._streamType === d ? e.substring(0, t).match(/```/g) : null,
          s = !!n && n.length % 2 === 1,
          r = e.substring(t + ht.PARTIAL_RENDER_MARK.length),
          o = r.startsWith("---") || "---".startsWith(r);
        if (!s && !o) return t;
        t = e.indexOf(ht.PARTIAL_RENDER_MARK, t + 1);
      }
      return -1;
    }
    // the chunk must already be appended to this._message - renders the accumulated content of the current
    // segment (paragraph) and creates a new partial bubble at every paragraph mark, so content that arrives
    // in the same chunk as the mark is placed on the correct side of the split
  }, {
    key: "updatePartialSegments",
    value: function updatePartialSegments(e, t, n) {
      var a;
      n && (t.innerHTML = "", this._partialBubble = void 0);
      var s = this._streamType;
      var r = this._partialBubble ? this._partialContent + e : ((a = this._message) == null ? void 0 : a[s]) || "",
        o = this.getPartialSplitIndex(r);
      for (; o !== -1;) this.renderPartialSegment(r.substring(0, o), t), this.partialRenderNewParagraph(t), r = r.substring(o + ht.PARTIAL_RENDER_MARK.length), o = this.getPartialSplitIndex(r);
      this.renderPartialSegment(r, t);
    }
  }, {
    key: "partialRenderNewParagraph",
    value: function partialRenderNewParagraph(e) {
      this._partialContent = "", this._partialBubble = S(), this._partialBubble[f].add("partial-render-message"), e.appendChild(this._partialBubble);
    }
  }, {
    key: "renderPartialSegment",
    value: function renderPartialSegment(e, t) {
      var n = this._partialBubble || t;
      this._partialBubble && (this._partialContent = e), this._streamType === d ? this._messages.renderText(n, e) : n.innerHTML = e;
    }
  }, {
    key: "updateHTML",
    value: function updateHTML(e, t, n) {
      if (this._message) if (this._message[L] = n ? e : (this._message[L] || "") + e, this._partialRender) this.updatePartialSegments(e, t, n);else if (n) t.innerHTML = e;else {
        var s = S("span");
        s.innerHTML = e, t.appendChild(s);
      }
    }
    // asyncCallInProgress introduced specifically a case when stream closed (e.g. tool call) and making another call
    // hence don't throw NO_VALID_STREAM_EVENTS_SENT when no response elements yet
  }, {
    key: "finaliseStreamedMessage",
    value: function finaliseStreamedMessage() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var n, s, r;
      if (!(this._fileAdded && !this._elements)) {
        if (!this._elements && !t) throw Error(Wo);
        this._message && (s = (n = this._elements) == null ? void 0 : n.bubbleElement) != null && s[f].contains(ht.MESSAGE_CLASS) && (this._streamType === d ? this._messages.textToSpeech && Pn.speak(this._message[d] || "", this._messages.textToSpeech) : this._streamType === L && this._elements && re.apply(this._messages, this._elements.outerContainer), this._elements.bubbleElement[f].remove(ht.MESSAGE_CLASS), this._message && (this._sessionId && (this._message._sessionId = this._sessionId), this._messages.sendClientUpdate(ot.createMessageContent(this._message), !1), (r = this._messages.browserStorage) == null || r.addMessages(this._messages.messageToElements.map(function (_ref11) {
          var _ref12 = _slicedToArray(_ref11, 1),
            o = _ref12[0];
          return o;
        }))), this._hasStreamEnded = e);
      }
    }
  }, {
    key: "markFileAdded",
    value: function markFileAdded() {
      this._fileAdded = !0;
    }
  }]);
}();
ht.MESSAGE_CLASS = "streamed-message", ht.PARTIAL_RENDER_MARK = "\n\n";
var bt = ht;
var B = /*#__PURE__*/function () {
  function B() {
    _classCallCheck(this, B);
  }
  return _createClass(B, null, [{
    key: "tempRemoveContentHeader",
    value: // need to pass stringifyBody boolean separately as binding is throwing an error for some reason
    // prettier-ignore
    function () {
      var _tempRemoveContentHeader = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e, t, n) {
        var s, r, _t3;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (e != null && e.headers) {
                _context2.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              s = e.headers[z];
              delete e.headers[z];
              _context2.p = 2;
              _context2.n = 3;
              return t(n);
            case 3:
              r = _context2.v;
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t3 = _context2.v;
              throw e.headers[z] = s, _t3;
            case 5:
              return _context2.a(2, (e.headers[z] = s, r));
          }
        }, _callee2, null, [[2, 4]]);
      }));
      function tempRemoveContentHeader(_x7, _x8, _x9) {
        return _tempRemoveContentHeader.apply(this, arguments);
      }
      return tempRemoveContentHeader;
    }()
  }, {
    key: "displayError",
    value: function displayError(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Service error, please try again.";
      if (console[p](t), _typeof(t) === F) return t instanceof Error ? e.addNewErrorMessage(oe, t.message) : Array.isArray(t) || _typeof(t[p]) === ve ? e.addNewErrorMessage(oe, t) : Object.keys(t).length === 0 ? e.addNewErrorMessage(oe, n) : e.addNewErrorMessage(oe, ae(t));
      e.addNewErrorMessage(oe, t);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x3, _x4, _x5, _x6) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function (e, t, n, s) {
      var o, a;
      var r = {
        method: ((o = e.connectSettings) == null ? void 0 : o.method) || Pe,
        headers: t
      };
      return r.method !== ge && (r.body = n ? ae(s) : s), e.connectSettings.credentials && (r.credentials = e.connectSettings.credentials), fetch(((a = e.connectSettings) == null ? void 0 : a.url) || e.url || "", r);
    })
  }, {
    key: "processResponseByType",
    value: function processResponseByType(e) {
      var t = e.headers.get("content-type");
      return t != null && t.includes(Y) ? e.json() : t != null && t.includes("text/plain") || !t ? e : e.blob();
    }
  }, {
    key: "processRequestInterceptor",
    value: function () {
      var _processRequestInterceptor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e, t) {
        var o, n, s, r, _t4;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return (o = e.requestInterceptor) == null ? void 0 : o.call(e, t);
            case 1:
              _t4 = _context3.v;
              if (_t4) {
                _context3.n = 2;
                break;
              }
              _t4 = t;
            case 2:
              n = _t4;
              s = n;
              r = n;
              return _context3.a(2, {
                body: s.body,
                headers: s.headers,
                error: r[p]
              });
          }
        }, _callee3);
      }));
      function processRequestInterceptor(_x0, _x1) {
        return _processRequestInterceptor.apply(this, arguments);
      }
      return processRequestInterceptor;
    }()
  }, {
    key: "validateResponseFormat",
    value: function validateResponseFormat(e, t) {
      if (!e) return !1;
      var n = Array.isArray(e) ? e : [e];
      return t && n.length > 1 ? (console[p](oo), !1) : !n.find(function (r) {
        return _typeof(r) != "object" || !(_typeof(r[p]) === ve || _typeof(r[d]) === ve || _typeof(r[L]) === ve || Array.isArray(r[m]));
      });
    }
  }, {
    key: "onInterceptorError",
    value: function onInterceptorError(e, t, n) {
      e.addNewErrorMessage(oe, t), n == null || n();
    }
    // prettier-ignore
  }, {
    key: "basicResponseProcessing",
    value: function () {
      var _basicResponseProcessing = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(e, t) {
        var n,
          s,
          _n$displayError,
          r,
          _n$useRI,
          o,
          a,
          c,
          l,
          h,
          _args4 = arguments,
          _t5;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              n = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              s = n.io, _n$displayError = n.displayError, r = _n$displayError === void 0 ? !0 : _n$displayError, _n$useRI = n.useRI, o = _n$useRI === void 0 ? !0 : _n$useRI;
              if (s != null && s.extractResultData) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, t);
            case 1:
              a = o ? s.deepChat.responseInterceptor : void 0;
              _context4.n = 2;
              return a == null ? void 0 : a(t);
            case 2:
              _t5 = _context4.v;
              if (_t5) {
                _context4.n = 3;
                break;
              }
              _t5 = t;
            case 3:
              c = _t5;
              _context4.n = 4;
              return s.extractResultData(c);
            case 4:
              l = _context4.v;
              if (!(!l || _typeof(l) != "object" && !Array.isArray(l))) {
                _context4.n = 5;
                break;
              }
              if (r) {
                h = Ln(t, "response", !!a, c);
                B.displayError(e, h);
              }
              return _context4.a(2);
            case 5:
              return _context4.a(2, l);
          }
        }, _callee4);
      }));
      function basicResponseProcessing(_x10, _x11) {
        return _basicResponseProcessing.apply(this, arguments);
      }
      return basicResponseProcessing;
    }()
  }]);
}();
function jc(_x12, _x13) {
  return _jc.apply(this, arguments);
}
function _jc() {
  _jc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee178(i, e) {
    var t, n;
    return _regenerator().w(function (_context178) {
      while (1) switch (_context178.n) {
        case 0:
          t = i.getReader();
        case 1:
          _context178.n = 2;
          return t.read();
        case 2:
          if ((n = _context178.v).done) {
            _context178.n = 4;
            break;
          }
          e(n.value);
        case 3:
          _context178.n = 1;
          break;
        case 4:
          return _context178.a(2);
      }
    }, _callee178);
  }));
  return _jc.apply(this, arguments);
}
function $c(i) {
  var e,
    t,
    n,
    s = !1;
  return function (o) {
    e === void 0 ? (e = o, t = 0, n = -1) : e = zc(e, o);
    var a = e.length;
    var c = 0;
    for (; t < a;) {
      s && (e[t] === 10 && (c = ++t), s = !1);
      var l = -1;
      for (; t < a && l === -1; ++t) switch (e[t]) {
        case 58:
          n === -1 && (n = t - c);
          break;
        case 13:
          s = !0;
        case 10:
          l = t;
          break;
      }
      if (l === -1) break;
      i(e.subarray(c, l), n), c = t, n = -1;
    }
    c === a ? e = void 0 : c !== 0 && (e = e.subarray(c), t -= c);
  };
}
function Gc(i, e, t) {
  var n = jr();
  var s = new TextDecoder();
  return function (o, a) {
    if (o.length === 0) t == null || t(n), n = jr();else if (a > 0) {
      var c = s.decode(o.subarray(0, a)),
        l = a + (o[a + 1] === 32 ? 2 : 1),
        h = s.decode(o.subarray(l));
      switch (c) {
        case "data":
          n.data = n.data ? n.data + "\n" + h : h;
          break;
        case "event":
          n.event = h;
          break;
        case "id":
          i(n.id = h);
          break;
        case "retry":
          var u = parseInt(h, 10);
          isNaN(u) || e(n.retry = u);
          break;
      }
    }
  };
}
function zc(i, e) {
  var t = new Uint8Array(i.length + e.length);
  return t.set(i), t.set(e, i.length), t;
}
function jr() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}
var Vc = function Vc(i, e) {
  var t = {};
  for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && e.indexOf(n) < 0 && (t[n] = i[n]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function") for (var s = 0, n = Object.getOwnPropertySymbols(i); s < n.length; s++) e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(i, n[s]) && (t[n[s]] = i[n[s]]);
  return t;
};
var Pi = "text/event-stream",
  qc = 1e3,
  $r = "last-event-id";
function Kc(i, e) {
  var t = e.signal,
    n = e.headers,
    s = e.onopen,
    r = e.onmessage,
    o = e.onclose,
    a = e.onerror,
    c = e.openWhenHidden,
    l = e.fetch,
    h = Vc(e, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise(function (u, g) {
    var b = Object.assign({}, n);
    b.accept || (b.accept = Pi);
    var v;
    function _() {
      v.abort(), document.hidden || Te();
    }
    c || document.addEventListener("visibilitychange", _);
    var C = qc,
      D = 0;
    function le() {
      document.removeEventListener("visibilitychange", _), window.clearTimeout(D), v.abort();
    }
    t == null || t.addEventListener("abort", function () {
      le(), u();
    });
    var pe = l !== null && l !== void 0 ? l : window.fetch,
      se = s !== null && s !== void 0 ? s : Wc;
    function Te() {
      return _Te.apply(this, arguments);
    }
    function _Te() {
      _Te = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var Ft, Ut, Ke, _t6;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              v = new AbortController();
              _context5.p = 1;
              _context5.n = 2;
              return pe(i, Object.assign(Object.assign({}, h), {
                headers: b,
                signal: v.signal
              }));
            case 2:
              Ut = _context5.v;
              _context5.n = 3;
              return se(Ut);
            case 3:
              _context5.n = 4;
              return jc(Ut.body, $c(Gc(function (Ke) {
                Ke ? b[$r] = Ke : delete b[$r];
              }, function (Ke) {
                C = Ke;
              }, r)));
            case 4:
              o == null || o();
              le();
              u();
              _context5.n = 6;
              break;
            case 5:
              _context5.p = 5;
              _t6 = _context5.v;
              if (!v.signal.aborted) try {
                Ke = (Ft = a == null ? void 0 : a(_t6)) !== null && Ft !== void 0 ? Ft : C;
                window.clearTimeout(D), D = window.setTimeout(Te, Ke);
              } catch (Ke) {
                le(), g(Ke);
              }
            case 6:
              return _context5.a(2);
          }
        }, _callee5, null, [[1, 5]]);
      }));
      return _Te.apply(this, arguments);
    }
    Te();
  });
}
function Wc(i) {
  var e = i.headers.get("content-type");
  if (!(e != null && e.startsWith(Pi))) throw new Error("Expected content-type to be ".concat(Pi, ", Actual: ").concat(e));
}
var q = /*#__PURE__*/function () {
  function q() {
    _classCallCheck(this, q);
  }
  return _createClass(q, null, [{
    key: "request",
    value: // prettier-ignore
    function () {
      var _request = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(e, t, n) {
        var s,
          r,
          g,
          b,
          v,
          _,
          C,
          o,
          _yield$B$processReque,
          a,
          c,
          l,
          h,
          u,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              s = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : !0;
              r = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : !1;
              o = {
                body: t,
                headers: (g = e.connectSettings) == null ? void 0 : g.headers
              };
              _context6.n = 1;
              return B.processRequestInterceptor(e.deepChat, o);
            case 1:
              _yield$B$processReque = _context6.v;
              a = _yield$B$processReque.body;
              c = _yield$B$processReque.headers;
              l = _yield$B$processReque.error;
              if (!l) {
                _context6.n = 2;
                break;
              }
              return _context6.a(2, B.onInterceptorError(n, l, e.streamHandlers.onClose));
            case 2:
              if (!((b = e.connectSettings) != null && b.handler)) {
                _context6.n = 3;
                break;
              }
              return _context6.a(2, gt.stream(e, a, n));
            case 3:
              if (!(((v = e.connectSettings) == null ? void 0 : v.url) === Et.URL)) {
                _context6.n = 4;
                break;
              }
              return _context6.a(2, Et.requestStream(n, e));
            case 4:
              h = new bt(n, e.stream), u = {
                method: ((_ = e.connectSettings) == null ? void 0 : _.method) || Pe,
                headers: c,
                credentials: (C = e.connectSettings) == null ? void 0 : C.credentials,
                body: s ? ae(a) : a
              };
              return _context6.a(2, (_typeof(e.stream) == "object" && e.stream.readable ? q.handleReadableStream(e, n, h, u, r, a) : q.handleEventStream(e, n, h, u, r, a), h));
          }
        }, _callee6);
      }));
      function request(_x14, _x15, _x16) {
        return _request.apply(this, arguments);
      }
      return request;
    }() // prettier-ignore
  }, {
    key: "handleReadableStream",
    value: function handleReadableStream(e, t, n, s, r, o) {
      var h;
      var _e$streamHandlers = e.streamHandlers,
        a = _e$streamHandlers.onOpen,
        c = _e$streamHandlers.onClose;
      var l = !1;
      fetch(((h = e.connectSettings) == null ? void 0 : h.url) || e.url || "", s).then(/*#__PURE__*/function () {
        var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(u) {
          var _, C, g, b, v, _yield$g$read, D, le, pe, se, Te, _t7;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                if (u.body) {
                  _context7.n = 1;
                  break;
                }
                throw new Error(Xo);
              case 1:
                g = u.body.getReader(), b = new TextDecoder();
                a();
                v = !1;
              case 2:
                if (!(!v && !l)) {
                  _context7.n = 8;
                  break;
                }
                _context7.n = 3;
                return g.read();
              case 3:
                _yield$g$read = _context7.v;
                D = _yield$g$read.value;
                le = _yield$g$read.done;
                if (!(v = le, v)) {
                  _context7.n = 4;
                  break;
                }
                q.handleClose(e, n, c, r);
                _context7.n = 7;
                break;
              case 4:
                pe = b.decode(D, {
                  stream: !0
                });
                _context7.n = 5;
                return (C = (_ = e.deepChat).responseInterceptor) == null ? void 0 : C.call(_, pe);
              case 5:
                _t7 = _context7.v;
                if (_t7) {
                  _context7.n = 6;
                  break;
                }
                _t7 = pe;
              case 6:
                se = _t7;
                Te = _typeof(se) == "object" ? se : _defineProperty({}, d, pe);
                q.handleMessage(e, t, n, Te, o);
              case 7:
                _context7.n = 2;
                break;
              case 8:
                return _context7.a(2);
            }
          }, _callee7);
        }));
        return function (_x17) {
          return _ref13.apply(this, arguments);
        };
      }())["catch"](function (u) {
        q.handleError(e, t, u);
      }), e.streamHandlers.onAbort = function () {
        n.finaliseStreamedMessage(), e.streamHandlers.onClose(), l = !0;
      };
    }
    // prettier-ignore
  }, {
    key: "handleEventStream",
    value: function handleEventStream(e, t, n, s, r, o) {
      var h;
      var _e$streamHandlers2 = e.streamHandlers,
        a = _e$streamHandlers2.onOpen,
        c = _e$streamHandlers2.onClose,
        l = new AbortController();
      e.streamHandlers.onAbort = function () {
        n.finaliseStreamedMessage(), e.streamHandlers.onClose(), l.abort();
      }, Kc(((h = e.connectSettings) == null ? void 0 : h.url) || e.url || "", _objectSpread(_objectSpread({}, s), {}, {
        openWhenHidden: !0,
        // keep stream open when browser tab not open
        onopen: function onopen(u) {
          return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  if (!u.ok) {
                    _context8.n = 1;
                    break;
                  }
                  return _context8.a(2, a());
                case 1:
                  _context8.n = 2;
                  return B.processResponseByType(u);
                case 2:
                  throw _context8.v;
                case 3:
                  return _context8.a(2);
              }
            }, _callee8);
          }))();
        },
        onmessage: function onmessage(u) {
          return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
            var g, b, v, _, _t8;
            return _regenerator().w(function (_context9) {
              while (1) switch (_context9.n) {
                case 0:
                  if (!(ae(u.data) !== ae("[DONE]"))) {
                    _context9.n = 3;
                    break;
                  }
                  try {
                    v = JSON.parse(u.data);
                  } catch (_unused6) {
                    v = {};
                  }
                  _context9.n = 1;
                  return (b = (g = e.deepChat).responseInterceptor) == null ? void 0 : b.call(g, v);
                case 1:
                  _t8 = _context9.v;
                  if (_t8) {
                    _context9.n = 2;
                    break;
                  }
                  _t8 = v;
                case 2:
                  _ = _t8;
                  q.handleMessage(e, t, n, _, o);
                case 3:
                  return _context9.a(2);
              }
            }, _callee9);
          }))();
        },
        onerror: function onerror(u) {
          throw c(), u;
        },
        onclose: function onclose() {
          q.handleClose(e, n, c, r);
        },
        signal: l.signal
      }))["catch"](function (u) {
        q.handleError(e, t, u);
      });
    }
    //prettier-ignore
  }, {
    key: "handleMessage",
    value: function handleMessage(e, t, n, s, r) {
      var o;
      (o = e.extractResultData) == null || o.call(e, s, r).then(function (a) {
        q.upsertContent(t, n.upsertStreamedMessage.bind(n), n, a), t.removeError();
      })["catch"](function (a) {
        t.isLastMessageError() || B.displayError(t, a);
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "handleError",
    value: function handleError(e, t, n) {
      var s;
      t.isLastMessageError() || (s = e.extractResultData) == null || s.call(e, n).then(function () {
        B.displayError(t, n);
      })["catch"](function (r) {
        B.displayError(t, r);
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose(e, t, n, s) {
      if (e.asyncCallInProgress) {
        t.finaliseStreamedMessage(!1, !0), e.asyncCallInProgress = !1;
        return;
      }
      try {
        t.finaliseStreamedMessage(), n();
      } catch (r) {
        if (!s) throw r;
      }
    }
    // io is only passed for demo to simulate a real stream
  }, {
    key: "simulate",
    value: function () {
      var _simulate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(e, t, n, s) {
        var r, o, _r3, _r4, _o4;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return B.basicResponseProcessing(e, n, {
                io: s,
                useRI: !1
              });
            case 1:
              if (_context0.v) {
                _context0.n = 2;
                break;
              }
              return _context0.a(2, t.onClose());
            case 2:
              if (Array.isArray(n) && (n = n[0]), n[L]) {
                t.onOpen();
                r = re.splitHTML(n[L]);
                r.length === 0 && (r = n[L].split(""));
                o = new bt(e, s == null ? void 0 : s.stream);
                q.populateMessages(e, r, o, t, L, 0, s);
              }
              if (!n[m]) {
                _context0.n = 4;
                break;
              }
              _context0.n = 3;
              return B.basicResponseProcessing(e, _defineProperty({}, m, n[m]), {
                io: s
              });
            case 3:
              _r3 = _context0.v;
              e.addNewMessage(_objectSpread({
                sendUpdate: !1
              }, _r3)), !n[L] && !n[d] && (new bt(e, s == null ? void 0 : s.stream).finaliseStreamedMessage(), t.onClose());
            case 4:
              if (n[d]) {
                t.onOpen();
                _r4 = n[d].split(""), _o4 = new bt(e, s == null ? void 0 : s.stream);
                q.populateMessages(e, _r4, _o4, t, d, 0, s);
              }
              n[p] && (B.displayError(e, n[p]), t.onClose()), t.onAbort = function () {
                t.onClose();
              };
            case 5:
              return _context0.a(2);
          }
        }, _callee0);
      }));
      function simulate(_x18, _x19, _x20, _x21) {
        return _simulate.apply(this, arguments);
      }
      return simulate;
    }() // prettier-ignore
    // io is only passed for demo to simulate a real stream
  }, {
    key: "populateMessages",
    value: function () {
      var _populateMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(e, t, n, s, r, o, a) {
        var c, h, l, _t9;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              c = t[o];
              if (!c) {
                _context1.n = 5;
                break;
              }
              _context1.p = 1;
              _context1.n = 2;
              return B.basicResponseProcessing(e, _defineProperty({}, r, c), {
                io: a
              });
            case 2:
              h = _context1.v;
              q.upsertContent(e, n.upsertStreamedMessage.bind(n), n, h), e.removeError();
              _context1.n = 4;
              break;
            case 3:
              _context1.p = 3;
              _t9 = _context1.v;
              e.isLastMessageError() || B.displayError(e, _t9);
            case 4:
              l = setTimeout(function () {
                q.populateMessages(e, t, n, s, r, o + 1, a);
              }, s.simulationInterim || 6);
              s.onAbort = function () {
                q.abort(l, n, s.onClose);
              };
              _context1.n = 6;
              break;
            case 5:
              n.finaliseStreamedMessage(), s.onClose();
            case 6:
              return _context1.a(2);
          }
        }, _callee1, null, [[1, 3]]);
      }));
      function populateMessages(_x22, _x23, _x24, _x25, _x26, _x27, _x28) {
        return _populateMessages.apply(this, arguments);
      }
      return populateMessages;
    }()
  }, {
    key: "isSimulation",
    value: function isSimulation(e) {
      return _typeof(e) == "object" && !!e.simulation;
    }
  }, {
    key: "isSimulatable",
    value: function isSimulatable(e, t) {
      return q.isSimulation(e) && t && (t[d] || t[L]);
    }
  }, {
    key: "abort",
    value: function abort(e, t, n) {
      clearTimeout(e), t.finaliseStreamedMessage(), n();
    }
  }, {
    key: "upsertContent",
    value: function upsertContent(e, t, n, s) {
      if (s && Array.isArray(s) && (s = s[0]), s != null && s[d] || s != null && s[L]) {
        var r = t(s);
        n !== null && n !== void 0 ? n : n = r || void 0;
      }
      if (s != null && s[m] && (e.addNewMessage(_defineProperty({}, m, s[m])), n == null || n.markFileAdded()), s != null && s[p]) throw s[p];
    }
  }]);
}();
var nn = /*#__PURE__*/function () {
  function nn() {
    _classCallCheck(this, nn);
  }
  return _createClass(nn, null, [{
    key: "generateResponse",
    value: function generateResponse(e) {
      var t = e[e.length - 1][0];
      if (t[m] && t[m].length > 0) {
        if (t[m].length > 1) return "These are interesting files!";
        var n = t[m][0];
        return n[R] && n[R].startsWith("data:image/gif") ? "That is a nice gif!" : n[y] === W ? "That is a nice image!" : n[y] === j ? "I like the sound of that!" : "That is an interesting file!";
      }
      if (t[d]) {
        if (t[d].charAt(t[d].length - 1) === "?") return "I'm sorry but I can't answer that question...";
        if (t[d].includes("updog")) return "What's updog?";
      }
      return "Hi there! This is a demo response!";
    }
  }, {
    key: "getCustomResponse",
    value: function getCustomResponse(e, t) {
      return typeof e == "function" ? e(t) : e;
    }
  }, {
    key: "getResponse",
    value: function getResponse(_ref15) {
      var e = _ref15.customDemoResponse,
        t = _ref15.messageToElements;
      return e ? nn.getCustomResponse(e, t[t.length - 1][0]) : _defineProperty({}, d, nn.generateResponse(t));
    }
    // timeout is used to simulate a timeout for a response to come back
  }, {
    key: "request",
    value: function request(e, t) {
      var n = nn.getResponse(t);
      setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var s, r, o;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              _context10.n = 1;
              return B.basicResponseProcessing(t, n, {
                io: e
              });
            case 1:
              s = _context10.v;
              if (s) {
                _context10.n = 2;
                break;
              }
              return _context10.a(2, e.completionsHandlers.onFinish());
            case 2:
              r = Array.isArray(s) ? s : [s], o = r.find(function (a) {
                return _typeof(a[p]) === ve;
              });
              o ? (t.addNewErrorMessage(oe, o[p]), e.completionsHandlers.onFinish()) : q.isSimulatable(e.stream, s) ? q.simulate(t, e.streamHandlers, s) : (r.forEach(function (a) {
                return t.addNewMessage(a);
              }), e.completionsHandlers.onFinish());
            case 3:
              return _context10.a(2);
          }
        }, _callee10);
      })), 400);
    }
    // timeout is used to simulate a timeout for a response to come back
  }, {
    key: "requestStream",
    value: function requestStream(e, t) {
      setTimeout(function () {
        var n = nn.getResponse(e);
        q.simulate(e, t.streamHandlers, n, t);
      }, 400);
    }
  }]);
}();
nn.URL = "deep-chat-demo";
var Et = nn;
var Me = /*#__PURE__*/function () {
  function Me() {
    _classCallCheck(this, Me);
  }
  return _createClass(Me, null, [{
    key: "setup",
    value: function setup(e) {
      e.permittedErrorPrefixes = ["Connection error", "Error in server message"], e.websocket = "pending";
    }
  }, {
    key: "isElementPresentInDOM",
    value: function isElementPresentInDOM(e) {
      return e.getRootNode({
        composed: !0
      }) instanceof Document;
    }
  }, {
    key: "createConnection",
    value: function createConnection(e, t) {
      if (!Me.isElementPresentInDOM(e.deepChat)) return;
      var n = e.connectSettings.websocket;
      if (n) {
        if (e.connectSettings.handler) return gt.websocket(e, t);
        try {
          var s = typeof n != "boolean" ? n : void 0,
            r = new WebSocket(e.connectSettings.url || "", s);
          e.websocket = r, e.websocket.onopen = function () {
            var o, a;
            t.removeError(), e.websocket && _typeof(e.websocket) === F && Me.assignListeners(e, r, t), (a = (o = e.deepChat)._validationHandler) == null || a.call(o);
          }, e.websocket.onerror = function (o) {
            console[p](o), Me.retryConnection(e, t);
          };
        } catch (s) {
          console[p](s), Me.retryConnection(e, t);
        }
      }
    }
  }, {
    key: "retryConnection",
    value: function retryConnection(e, t) {
      var n, s;
      (s = (n = e.deepChat)._validationHandler) == null || s.call(n), Me.isElementPresentInDOM(e.deepChat) && (e.websocket = "pending", t.isLastMessageError() || t.addNewErrorMessage(oe, "Connection error"), setTimeout(function () {
        Me.createConnection(e, t);
      }, 5e3));
    }
  }, {
    key: "assignListeners",
    value: function assignListeners(e, t, n) {
      var _this1 = this;
      var s = {};
      t.onmessage = /*#__PURE__*/function () {
        var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(r) {
          var o, a, c, l, _c3, _l2, _t0;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.p = _context11.n) {
              case 0:
                if (!e.extractResultData) {
                  _context11.n = 8;
                  break;
                }
                _context11.p = 1;
                o = JSON.parse(r.data);
                _context11.n = 2;
                return B.basicResponseProcessing(n, o, {
                  io: e,
                  displayError: !1
                });
              case 2:
                a = _context11.v;
                if (a) {
                  _context11.n = 3;
                  break;
                }
                throw Error(Ln(o, "server", !!e.deepChat.responseInterceptor, a));
              case 3:
                if (!q.isSimulation(e.stream)) {
                  _context11.n = 4;
                  break;
                }
                c = Me.stream.bind(_this1, e, n, s), l = s[o[A] || te];
                q.upsertContent(n, c, l, a);
                _context11.n = 6;
                break;
              case 4:
                _c3 = Array.isArray(a) ? a : [a], _l2 = _c3.find(function (h) {
                  return _typeof(h[p]) === ve;
                });
                if (!_l2) {
                  _context11.n = 5;
                  break;
                }
                throw _l2[p];
              case 5:
                _c3.forEach(function (h) {
                  return n.addNewMessage(h);
                });
              case 6:
                _context11.n = 8;
                break;
              case 7:
                _context11.p = 7;
                _t0 = _context11.v;
                B.displayError(n, _t0, "Error in server message");
              case 8:
                return _context11.a(2);
            }
          }, _callee11, null, [[1, 7]]);
        }));
        return function (_x29) {
          return _ref18.apply(this, arguments);
        };
      }(), t.onclose = function () {
        var r, o;
        console[p]("Connection closed"), n.isLastMessageError() || n.addNewErrorMessage(oe, "Connection error"), e.stream && ((o = (r = e.streamHandlers).onAbort) == null || o.call(r)), Me.createConnection(e, n);
      };
    }
  }, {
    key: "sendWebsocket",
    value: function () {
      var _sendWebsocket = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(e, t, n) {
        var s,
          h,
          u,
          r,
          o,
          _yield$B$processReque2,
          a,
          c,
          l,
          _args12 = arguments;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              s = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : !0;
              if (!(((h = e.connectSettings) == null ? void 0 : h.url) === Et.URL)) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2, Et.request(e, n));
            case 1:
              r = e.websocket;
              if (!(!r || r === "pending")) {
                _context12.n = 2;
                break;
              }
              return _context12.a(2);
            case 2:
              o = {
                body: t,
                headers: (u = e.connectSettings) == null ? void 0 : u.headers
              };
              _context12.n = 3;
              return B.processRequestInterceptor(e.deepChat, o);
            case 3:
              _yield$B$processReque2 = _context12.v;
              a = _yield$B$processReque2.body;
              c = _yield$B$processReque2.error;
              if (!c) {
                _context12.n = 4;
                break;
              }
              return _context12.a(2, n.addNewErrorMessage(oe, c));
            case 4:
              if (Me.isWebSocket(r)) {
                _context12.n = 5;
                break;
              }
              return _context12.a(2, r.newUserMessage.listener(a));
            case 5:
              l = s ? ae(a) : a;
              r.readyState === void 0 || r.readyState !== r.OPEN ? (console[p]("Connection is not open"), n.isLastMessageError() || n.addNewErrorMessage(oe, "Connection error")) : (r.send(ae(l)), e.completionsHandlers.onFinish());
            case 6:
              return _context12.a(2);
          }
        }, _callee12);
      }));
      function sendWebsocket(_x30, _x31, _x32) {
        return _sendWebsocket.apply(this, arguments);
      }
      return sendWebsocket;
    }()
  }, {
    key: "canSendMessage",
    value: function canSendMessage(e) {
      return e ? e === "pending" ? !1 : Me.isWebSocket(e) ? e.readyState !== void 0 && e.readyState === e.OPEN : e.isOpen : !0;
    }
    // if false then it is the internal websocket handler
  }, {
    key: "isWebSocket",
    value: function isWebSocket(e) {
      return e.send !== void 0;
    }
  }, {
    key: "stream",
    value: function stream(e, t, n, s) {
      if (!s) return;
      var r = e.stream.simulation;
      if (_typeof(r) === ve) {
        var _n$o;
        var o = s[A] || te,
          a = n[o];
        s[d] === r || s[L] === r ? (a == null || a.finaliseStreamedMessage(), delete n[o]) : ((_n$o = n[o]) !== null && _n$o !== void 0 ? _n$o : n[o] = new bt(t, e.stream), n[o].upsertStreamedMessage(s));
      } else q.simulate(t, e.streamHandlers, s);
    }
  }]);
}();
var gt = /*#__PURE__*/function () {
  function gt() {
    _classCallCheck(this, gt);
  }
  return _createClass(gt, null, [{
    key: "request",
    value: function () {
      var _request2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(e, t, n) {
        var a, c, s, r, o;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              s = !0;
              r = /*#__PURE__*/function () {
                var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(l) {
                  var h, u, g;
                  return _regenerator().w(function (_context13) {
                    while (1) switch (_context13.n) {
                      case 0:
                        if (s) {
                          _context13.n = 1;
                          break;
                        }
                        return _context13.a(2);
                      case 1:
                        s = !1;
                        _context13.n = 2;
                        return B.basicResponseProcessing(n, l, {
                          io: e,
                          displayError: !1
                        });
                      case 2:
                        h = _context13.v;
                        if (!h) console[p](Ln(l, "server", !!e.deepChat.responseInterceptor, h)), n.addNewErrorMessage(oe, "Error in server message"), e.completionsHandlers.onFinish();else {
                          u = Array.isArray(h) ? h : [h], g = u.find(function (b) {
                            return _typeof(b[p]) === ve;
                          });
                          g ? (console[p](g[p]), n.addNewErrorMessage(oe, g[p]), e.completionsHandlers.onFinish()) : q.isSimulatable(e.stream, h) ? q.simulate(n, e.streamHandlers, h) : (u.forEach(function (b) {
                            return n.addNewMessage(b);
                          }), e.completionsHandlers.onFinish());
                        }
                      case 3:
                        return _context13.a(2);
                    }
                  }, _callee13);
                }));
                return function r(_x36) {
                  return _ref19.apply(this, arguments);
                };
              }(), o = gt.generateOptionalSignals();
              (c = (a = e.connectSettings).handler) == null || c.call(a, t, _objectSpread(_objectSpread({}, o), {}, {
                onResponse: r
              }));
            case 1:
              return _context14.a(2);
          }
        }, _callee14);
      }));
      function request(_x33, _x34, _x35) {
        return _request2.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "attemptToFinaliseStream",
    value: function attemptToFinaliseStream(e, t) {
      try {
        var n = t.messageElementRefs[t.messageElementRefs.length - 1];
        ot.isLoadingMessage(n) ? t.removeLastMessage() : e.finaliseStreamedMessage();
      } catch (n) {
        console[p](n), t.addNewErrorMessage(oe, n);
      }
    }
    // prettier-ignore
  }, {
    key: "stream",
    value: function stream(e, t, n) {
      var u, g;
      var s = !0,
        r = !1;
      var o = new bt(n, e.stream),
        a = function a() {
          r || !s || (e.streamHandlers.onOpen(), r = !0);
        },
        c = function c() {
          s && (gt.attemptToFinaliseStream(o, n), e.streamHandlers.onClose(), s = !1);
        },
        l = /*#__PURE__*/function () {
          var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(b) {
            var v, _;
            return _regenerator().w(function (_context15) {
              while (1) switch (_context15.n) {
                case 0:
                  if (s) {
                    _context15.n = 1;
                    break;
                  }
                  return _context15.a(2);
                case 1:
                  _context15.n = 2;
                  return B.basicResponseProcessing(n, b, {
                    io: e,
                    displayError: !1
                  });
                case 2:
                  v = _context15.v;
                  if (v) v[p] ? (gt.streamError(v[p], o, e, n), s = !1) : q.upsertContent(n, o.upsertStreamedMessage.bind(o), o, v);else {
                    _ = Ln(b, "server", !!e.deepChat.responseInterceptor, v);
                    gt.streamError(_, o, e, n), s = !1;
                  }
                case 3:
                  return _context15.a(2);
              }
            }, _callee15);
          }));
          return function l(_x37) {
            return _ref20.apply(this, arguments);
          };
        }();
      e.streamHandlers.onAbort = function () {
        gt.attemptToFinaliseStream(o, n), e.streamHandlers.onClose(), s = !1;
      };
      var h = gt.generateOptionalSignals();
      (g = (u = e.connectSettings).handler) == null || g.call(u, t, _objectSpread(_objectSpread({}, h), {}, {
        onOpen: a,
        onResponse: l,
        onClose: c,
        stopClicked: e.streamHandlers.stopClicked
      }));
    }
  }, {
    key: "streamError",
    value: function streamError(e, t, n, s) {
      console[p](e), t.finaliseStreamedMessage(), s.addNewErrorMessage(oe, e), n.streamHandlers.onClose();
    }
    // prettier-ignore
  }, {
    key: "websocket",
    value: function websocket(e, t) {
      var _this10 = this;
      var c, l;
      var n = {
        isOpen: !1,
        newUserMessage: {
          listener: function listener() {}
        },
        roleToStream: {}
      };
      e.websocket = n;
      var s = function s() {
          t.removeError(), n.isOpen = !0;
        },
        r = function r() {
          n.isOpen = !1;
        },
        o = /*#__PURE__*/function () {
          var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(h) {
            var u, g, b, v, _, C;
            return _regenerator().w(function (_context16) {
              while (1) switch (_context16.n) {
                case 0:
                  _context16.n = 1;
                  return B.basicResponseProcessing(t, h, {
                    io: e,
                    displayError: !1
                  });
                case 1:
                  u = _context16.v;
                  if (!u) console[p](Ln(h, "server", !!e.deepChat.responseInterceptor, u)), t.addNewErrorMessage(oe, "Error in server message");else {
                    g = Array.isArray(u) ? u : [u], b = g.find(function (v) {
                      return _typeof(v[p]) === ve;
                    });
                    if (b) console[p](b[p]), t.isLastMessageError() || t.addNewErrorMessage(oe, b[p]);else if (q.isSimulation(e.stream)) {
                      v = u, _ = Me.stream.bind(_this10, e, t, n.roleToStream), C = n.roleToStream[v[A] || te];
                      q.upsertContent(t, _, C, v);
                    } else g.forEach(function (v) {
                      return t.addNewMessage(v);
                    });
                  }
                case 2:
                  return _context16.a(2);
              }
            }, _callee16);
          }));
          return function o(_x38) {
            return _ref21.apply(this, arguments);
          };
        }(),
        a = gt.generateOptionalSignals();
      (l = (c = e.connectSettings).handler) == null || l.call(c, void 0, _objectSpread(_objectSpread({}, a), {}, {
        onOpen: s,
        onResponse: o,
        onClose: r,
        newUserMessage: n.newUserMessage
      }));
    }
  }, {
    key: "generateOptionalSignals",
    value: function generateOptionalSignals() {
      return {
        onClose: function onClose() {},
        onOpen: function onOpen() {},
        stopClicked: {
          listener: function listener() {}
        },
        newUserMessage: {
          listener: function listener() {}
        }
      };
    }
  }]);
}();
var _e = /*#__PURE__*/function () {
  function _e() {
    _classCallCheck(this, _e);
  }
  return _createClass(_e, null, [{
    key: "request",
    value: // prettier-ignore
    function () {
      var _request3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(e, t, n) {
        var s,
          u,
          g,
          b,
          r,
          _yield$B$processReque3,
          o,
          a,
          c,
          l,
          h,
          _args18 = arguments;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              s = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : !0;
              r = {
                body: t,
                headers: (u = e.connectSettings) == null ? void 0 : u.headers
              };
              _context18.n = 1;
              return B.processRequestInterceptor(e.deepChat, r);
            case 1:
              _yield$B$processReque3 = _context18.v;
              o = _yield$B$processReque3.body;
              a = _yield$B$processReque3.headers;
              c = _yield$B$processReque3.error;
              l = e.completionsHandlers.onFinish;
              if (!c) {
                _context18.n = 2;
                break;
              }
              return _context18.a(2, B.onInterceptorError(n, c, l));
            case 2:
              if (!((g = e.connectSettings) != null && g.handler)) {
                _context18.n = 3;
                break;
              }
              return _context18.a(2, gt.request(e, o, n));
            case 3:
              if (!(((b = e.connectSettings) == null ? void 0 : b.url) === Et.URL)) {
                _context18.n = 4;
                break;
              }
              return _context18.a(2, Et.request(e, n));
            case 4:
              h = !0;
              B.fetch(e, a, s, o).then(function (v) {
                return h = !!v.ok, v;
              }).then(function (v) {
                return B.processResponseByType(v);
              }).then(/*#__PURE__*/function () {
                var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(v) {
                  var D, le, _, C, _t1;
                  return _regenerator().w(function (_context17) {
                    while (1) switch (_context17.n) {
                      case 0:
                        if (e.extractResultData) {
                          _context17.n = 1;
                          break;
                        }
                        return _context17.a(2);
                      case 1:
                        _context17.n = 2;
                        return (le = (D = e.deepChat).responseInterceptor) == null ? void 0 : le.call(D, v);
                      case 2:
                        _t1 = _context17.v;
                        if (_t1) {
                          _context17.n = 3;
                          break;
                        }
                        _t1 = v;
                      case 3:
                        _ = _t1;
                        _context17.n = 4;
                        return e.extractResultData(_, o);
                      case 4:
                        C = _context17.v;
                        if (h) {
                          _context17.n = 5;
                          break;
                        }
                        throw v;
                      case 5:
                        if (!(!C || _typeof(C) !== F && !Array.isArray(C))) {
                          _context17.n = 6;
                          break;
                        }
                        throw Error(Ln(v, "response", !!e.deepChat.responseInterceptor, _));
                      case 6:
                        if (!C[p]) {
                          _context17.n = 7;
                          break;
                        }
                        throw C[p];
                      case 7:
                        if (!e.asyncCallInProgress) {
                          _context17.n = 8;
                          break;
                        }
                        e.asyncCallInProgress = !1;
                        return _context17.a(2);
                      case 8:
                        q.isSimulatable(e.stream, C) ? q.simulate(n, e.streamHandlers, C) : ((Array.isArray(C) ? C : [C]).forEach(function (se) {
                          return n.addNewMessage(se);
                        }), l());
                      case 9:
                        return _context17.a(2);
                    }
                  }, _callee17);
                }));
                return function (_x42) {
                  return _ref22.apply(this, arguments);
                };
              }())["catch"](function (v) {
                B.displayError(n, v), l();
              });
            case 5:
              return _context18.a(2);
          }
        }, _callee18);
      }));
      function request(_x39, _x40, _x41) {
        return _request3.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "executePollRequest",
    value: function executePollRequest(e, t, n, s) {
      var r = e.completionsHandlers.onFinish;
      fetch(t, n).then(function (o) {
        return o.json();
      }).then(/*#__PURE__*/function () {
        var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(o) {
          var c, l, a, _t10, _t11;
          return _regenerator().w(function (_context19) {
            while (1) switch (_context19.n) {
              case 0:
                if (e.extractPollResultData) {
                  _context19.n = 1;
                  break;
                }
                return _context19.a(2);
              case 1:
                _t10 = e;
                _context19.n = 2;
                return (l = (c = e.deepChat).responseInterceptor) == null ? void 0 : l.call(c, o);
              case 2:
                _t11 = _context19.v;
                if (_t11) {
                  _context19.n = 3;
                  break;
                }
                _t11 = o;
              case 3:
                _context19.n = 4;
                return _t10.extractPollResultData.call(_t10, _t11);
              case 4:
                a = _context19.v;
                a.timeoutMS ? setTimeout(function () {
                  _e.executePollRequest(e, t, n, s);
                }, a.timeoutMS) : q.isSimulatable(e.stream, a) ? q.simulate(s, e.streamHandlers, a) : (s.addNewMessage(a), r());
              case 5:
                return _context19.a(2);
            }
          }, _callee19);
        }));
        return function (_x43) {
          return _ref23.apply(this, arguments);
        };
      }())["catch"](function (o) {
        B.displayError(s, o), r();
      });
    }
    // prettier-ignore
  }, {
    key: "poll",
    value: function () {
      var _poll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(e, t, n) {
        var s,
          b,
          v,
          _,
          r,
          _yield$B$processReque4,
          o,
          a,
          c,
          l,
          h,
          u,
          g,
          _args20 = arguments;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              s = _args20.length > 3 && _args20[3] !== undefined ? _args20[3] : !0;
              r = {
                body: t,
                headers: (b = e.connectSettings) == null ? void 0 : b.headers
              };
              _context20.n = 1;
              return B.processRequestInterceptor(e.deepChat, r);
            case 1:
              _yield$B$processReque4 = _context20.v;
              o = _yield$B$processReque4.body;
              a = _yield$B$processReque4.headers;
              c = _yield$B$processReque4.error;
              if (!c) {
                _context20.n = 2;
                break;
              }
              return _context20.a(2, B.onInterceptorError(n, c));
            case 2:
              l = ((v = e.connectSettings) == null ? void 0 : v.url) || e.url || "", h = ((_ = e.connectSettings) == null ? void 0 : _.method) || Pe, u = s ? ae(o) : o, g = {
                method: h,
                body: u,
                headers: a
              };
              e.connectSettings.credentials && (g.credentials = e.connectSettings.credentials), _e.executePollRequest(e, l, g, n);
            case 3:
              return _context20.a(2);
          }
        }, _callee20);
      }));
      function poll(_x44, _x45, _x46) {
        return _poll.apply(this, arguments);
      }
      return poll;
    }() // prettier-ignore
  }, {
    key: "verifyKey",
    value: function verifyKey(e, t, n, s, r, o, a, c, l) {
      if (e === "") return o(de);
      a(), fetch(t, {
        method: s,
        headers: n,
        body: l || null
      }).then(function (h) {
        return B.processResponseByType(h);
      }).then(function (h) {
        c(h, e, r, o);
      })["catch"](function (h) {
        o(He), console[p](h);
      });
    }
  }]);
}();
var ls = /*#__PURE__*/function () {
  function ls() {
    _classCallCheck(this, ls);
  }
  return _createClass(ls, null, [{
    key: "getCharacterLimitMessages",
    value: function getCharacterLimitMessages(e, t) {
      var r;
      if (t === -1) return e;
      var n = 0,
        s = e[K] - 1;
      for (s; s >= 0; s -= 1) {
        var o = (r = e[s]) == null ? void 0 : r[d];
        if (o !== void 0 && (n += o[K], n > t)) {
          e[s][d] = o.substring(0, o[K] - (n - t));
          break;
        }
      }
      return e.slice(Math.max(s, 0));
    }
  }, {
    key: "getMaxMessages",
    value: function getMaxMessages(e, t) {
      return e.slice(Math.max(e[K] - t, 0));
    }
    // if maxMessages is not defined we send all messages
    // if maxMessages above 0 we send that number
    // if maxMessages 0 or below we send only what is in the request
  }, {
    key: "processMessages",
    value: function processMessages(e, t, n) {
      return t !== void 0 ? t > 0 && (e = ls.getMaxMessages(e, t)) : e = [e[e[K] - 1]], e = w(e), n === void 0 ? e : ls.getCharacterLimitMessages(e, n);
    }
  }]);
}();
var Gt = /*#__PURE__*/function () {
  function Gt(e, t, n) {
    _classCallCheck(this, Gt);
    this._isLoading = !1, this._isPaginationComplete = !1, this._index = 0, this._messages = t, n.fetchHistory && this.fetchHistory(n.fetchHistory), this.setupInitialHistory(e);
  }
  return _createClass(Gt, [{
    key: "fetchHistory",
    value: function () {
      var _fetchHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(e) {
        var _this11 = this;
        var t, n;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              t = Nt.addMessage(this._messages);
              _context21.n = 1;
              return e();
            case 1:
              n = _context21.v;
              this._messages.removeMessage(t), Gt.displayIntroMessages(this._messages.messageElementRefs), n.forEach(function (s) {
                return _this11._messages.addAnyMessage(s, !0);
              }), setTimeout(function () {
                return V.scrollToBottom(_this11._messages);
              }, 0);
            case 2:
              return _context21.a(2);
          }
        }, _callee21, this);
      }));
      function fetchHistory(_x47) {
        return _fetchHistory.apply(this, arguments);
      }
      return fetchHistory;
    }()
  }, {
    key: "scrollToPreloadFirstEl",
    value: function scrollToPreloadFirstEl(e, t) {
      this._messages.elementRef.scrollTop = t + e.offsetTop - 40;
    }
  }, {
    key: "processLoadedHistory",
    value: function processLoadedHistory(e) {
      var _this12 = this;
      var a;
      var _this$_messages = this._messages,
        t = _this$_messages.messageElementRefs,
        n = _this$_messages.messageToElements,
        s = _this$_messages.elementRef,
        r = (a = t.find(function (c) {
          return !c.outerContainer[f].contains(ot.INTRO_CLASS);
        })) == null ? void 0 : a.outerContainer,
        o = s.scrollTop;
      e == null || e.reverse().map(function (c) {
        var l = _this12._messages.addAnyMessage(_objectSpread(_objectSpread({}, c), {}, {
          sendUpdate: !0
        }), !0, !0);
        if (l) {
          var h = N.generateMessageBody(l, t, !0);
          n.unshift([l, h]);
        }
        return l;
      }).filter(function (c) {
        return !!c;
      }).reverse().forEach(function (c) {
        return _this12._messages.sendClientUpdate(c, !0);
      }), r && (this._messages.messageElementRefs.length >= this._messages.maxVisibleMessages ? setTimeout(function () {
        return _this12.scrollToPreloadFirstEl(r, o);
      }) : this.scrollToPreloadFirstEl(r, o));
    }
  }, {
    key: "populateMessages",
    value: function populateMessages(e, t) {
      this._messages.removeMessage(e), this._isPaginationComplete = t.findIndex(function (a) {
        return !a;
      }) < 0;
      var n = t.filter(function (a) {
        return !!a;
      });
      this.processLoadedHistory(n);
      var _this$_messages2 = this._messages,
        s = _this$_messages2.messageElementRefs,
        r = _this$_messages2.avatar,
        o = _this$_messages2.name;
      N.resetAllRoleElements(s, r, o);
    }
  }, {
    key: "loadHistoryOnScroll",
    value: function () {
      var _loadHistoryOnScroll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(e) {
        var t, n, _t12;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              if (!(this._isLoading || this._isPaginationComplete || this._messages.elementRef.scrollTop !== 0)) {
                _context22.n = 1;
                break;
              }
              return _context22.a(2);
            case 1:
              this._isLoading = !0;
              t = Nt.addMessage(this._messages, !1);
              _context22.p = 2;
              _context22.n = 3;
              return e(this._index++);
            case 3:
              n = _context22.v;
              this.populateMessages(t, n), this._isLoading = !1;
              _context22.n = 5;
              break;
            case 4:
              _context22.p = 4;
              _t12 = _context22.v;
              this._messages.removeMessage(t), this._isPaginationComplete = !0, this._messages.addNewErrorMessage(oe, Gt.FAILED_ERROR_MESSAGE, !0), console[p](_t12);
            case 5:
              return _context22.a(2);
          }
        }, _callee22, this, [[2, 4]]);
      }));
      function loadHistoryOnScroll(_x48) {
        return _loadHistoryOnScroll.apply(this, arguments);
      }
      return loadHistoryOnScroll;
    }()
  }, {
    key: "populateInitialHistory",
    value: function populateInitialHistory(e) {
      var _this13 = this;
      e.forEach(function (t) {
        ie.processHistoryFile(t), _this13._messages.addAnyMessage(t, !0);
      });
    }
  }, {
    key: "loadInitialHistory",
    value: function () {
      var _loadInitialHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(e) {
        var t, n, s, _t13;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              this._isLoading = !0;
              t = Nt.addMessage(this._messages);
              _context23.p = 1;
              _context23.n = 2;
              return e(this._index++);
            case 2:
              n = _context23.v;
              s = this._messages.elementRef.scrollTop;
              this.populateMessages(t, n), this.restoreScrollOrScrollToBottom(s === 0);
              _context23.n = 4;
              break;
            case 3:
              _context23.p = 3;
              _t13 = _context23.v;
              this._messages.removeMessage(t), this._isPaginationComplete = !0, this._messages.addNewErrorMessage(oe, Gt.FAILED_ERROR_MESSAGE, !0), console[p](_t13);
            case 4:
              Gt.displayIntroMessages(this._messages.messageElementRefs), this._isLoading = !1;
            case 5:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 3]]);
      }));
      function loadInitialHistory(_x49) {
        return _loadInitialHistory.apply(this, arguments);
      }
      return loadInitialHistory;
    }()
  }, {
    key: "setupInitialHistory",
    value: function () {
      var _setupInitialHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(e) {
        var s, t, n;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              e.loadHistory && this.loadInitialHistory(e.loadHistory);
              t = (s = this._messages.browserStorage) == null ? void 0 : s.get(), n = e.history || ie.processHistory(e) || (t == null ? void 0 : t.messages);
              n && (this.populateInitialHistory(n), this.restoreScrollOrScrollToBottom(!0), this._index += 1);
            case 1:
              return _context24.a(2);
          }
        }, _callee24, this);
      }));
      function setupInitialHistory(_x50) {
        return _setupInitialHistory.apply(this, arguments);
      }
      return setupInitialHistory;
    }()
  }, {
    key: "restoreScrollOrScrollToBottom",
    value: function restoreScrollOrScrollToBottom(e) {
      var _this14 = this;
      var n, s, r;
      var t = (s = (n = this._messages.browserStorage) == null ? void 0 : n.get()) == null ? void 0 : s.scrollHeight;
      t !== void 0 && (r = this._messages.browserStorage) != null && r.trackScrollHeight ? setTimeout(function () {
        _this14._messages.elementRef.scrollTop = t;
      }, 0) : e && setTimeout(function () {
        return V.scrollToBottom(_this14._messages);
      }, 0);
    }
  }], [{
    key: "addErrorPrefix",
    value: function addErrorPrefix(e) {
      var _e$permittedErrorPref;
      (_e$permittedErrorPref = e.permittedErrorPrefixes) !== null && _e$permittedErrorPref !== void 0 ? _e$permittedErrorPref : e.permittedErrorPrefixes = [], e.permittedErrorPrefixes.push(Gt.FAILED_ERROR_MESSAGE);
    }
  }, {
    key: "displayIntroMessages",
    value: function displayIntroMessages(e) {
      for (var t = 0; t < e.length; t += 1) {
        var n = e[0];
        if (n.outerContainer[f].contains(ot.INTRO_CLASS)) n.outerContainer[E].display = "";else break;
      }
    }
  }]);
}();
Gt.FAILED_ERROR_MESSAGE = "Failed to load history";
var Hs = Gt;
var xe = /*#__PURE__*/function () {
  function xe() {
    _classCallCheck(this, xe);
  }
  return _createClass(xe, null, [{
    key: "parseConfig",
    value: function parseConfig(e, t, n) {
      var r;
      var s = {
        files: e
      };
      if (_typeof(n) == "object") {
        ie.processFileConfigConnect(n);
        var o = n.files,
          a = n.connect,
          c = n.button;
        o && (o.infoModal && (s[m].infoModal = o.infoModal, (r = o.infoModal) != null && r.textMarkDown && (s.infoModalTextMarkUp = t.render(o.infoModal.textMarkDown))), o.acceptedFormats && (s[m].acceptedFormats = o.acceptedFormats), o.maxNumberOfFiles && (s[m].maxNumberOfFiles = o.maxNumberOfFiles)), s.button = c, a && Object.keys(a).length > 0 && (s.connect = a);
      }
      return s;
    }
  }, {
    key: "processMixedFiles",
    value: function processMixedFiles(e, t, n) {
      if (n) {
        var s = {
          acceptedFormats: ""
        };
        e.fileTypes.mixedFiles = xe.parseConfig(s, t, n);
      }
    }
    // needs to be set after audio to overwrite maxNumberOfFiles
    // prettier-ignore
  }, {
    key: "processMicrophone",
    value: function processMicrophone(e, t, n, s) {
      var _c$m, _g$maxNumberOfFiles;
      var a, c, l, h, u, g;
      var o = _objectSpread({
        acceptedFormats: "audio/*"
      }, ((a = e.fileTypes[j]) == null ? void 0 : a[m]) || {});
      n && (navigator.mediaDevices.getUserMedia !== void 0 ? (e.recordAudio = xe.parseConfig(o, t, n), _typeof(n) == "object" && n[m] && ((_c$m = (c = e.recordAudio)[m]) !== null && _c$m !== void 0 ? _c$m : c[m] = {}, e.recordAudio[m].format = (l = n[m]) == null ? void 0 : l.format, e.recordAudio[m].maxDurationSeconds = (h = n[m]) == null ? void 0 : h.maxDurationSeconds, (u = e.fileTypes[j]) != null && u[m] && ((_g$maxNumberOfFiles = (g = e.fileTypes[j][m]).maxNumberOfFiles) !== null && _g$maxNumberOfFiles !== void 0 ? _g$maxNumberOfFiles : g.maxNumberOfFiles = n[m].maxNumberOfFiles))) : s || (e.fileTypes[j] = xe.parseConfig(o, t, n)));
    }
    // prettier-ignore
  }, {
    key: "processAudioConfig",
    value: function processAudioConfig(e, t, n, s) {
      if (!n && !s) return;
      var o = _objectSpread({
        acceptedFormats: "audio/*"
      }, (s == null ? void 0 : s[m]) || {});
      e.fileTypes[j] = xe.parseConfig(o, t, n);
    }
    // prettier-ignore
  }, {
    key: "processGifConfig",
    value: function processGifConfig(e, t, n, s) {
      if (!n && !s) return;
      var o = _objectSpread({
        acceptedFormats: "image/gif"
      }, (s == null ? void 0 : s[m]) || {});
      e.fileTypes[kn] = xe.parseConfig(o, t, n);
    }
    // needs to be set after images to overwrite maxNumberOfFiles
    // prettier-ignore
  }, {
    key: "processCamera",
    value: function processCamera(e, t, n, s) {
      var _c$m2;
      var a, c, l, h;
      var o = _objectSpread({
        acceptedFormats: "image/*"
      }, ((a = e.fileTypes[ee]) == null ? void 0 : a[m]) || {});
      n && (navigator.mediaDevices.getUserMedia !== void 0 ? (e[Fe] = xe.parseConfig(o, t, n), _typeof(n) == "object" && (e[Fe].modalContainerStyle = n.modalContainerStyle, n[m] && ((_c$m2 = (c = e[Fe])[m]) !== null && _c$m2 !== void 0 ? _c$m2 : c[m] = {}, e[Fe][m].format = (l = n[m]) == null ? void 0 : l.format, e[Fe][m].dimensions = (h = n[m]) == null ? void 0 : h.dimensions))) : s || (e.fileTypes[ee] = xe.parseConfig(o, t, n)));
    }
    // prettier-ignore
  }, {
    key: "processImagesConfig",
    value: function processImagesConfig(e, t, n, s) {
      if (!n && !s) return;
      var o = _objectSpread({
        acceptedFormats: "image/*"
      }, (s == null ? void 0 : s[m]) || {});
      e.fileTypes[ee] = xe.parseConfig(o, t, n);
    }
    // default for direct service
  }, {
    key: "populateDefaultFileIO",
    value: function populateDefaultFileIO(e, t) {
      var _e$m, _n$acceptedFormats, _s$maxNumberOfFiles;
      var n, s;
      e && ((_e$m = e[m]) !== null && _e$m !== void 0 ? _e$m : e[m] = {}, (_n$acceptedFormats = (n = e[m]).acceptedFormats) !== null && _n$acceptedFormats !== void 0 ? _n$acceptedFormats : n.acceptedFormats = t, (_s$maxNumberOfFiles = (s = e[m]).maxNumberOfFiles) !== null && _s$maxNumberOfFiles !== void 0 ? _s$maxNumberOfFiles : s.maxNumberOfFiles = 1);
    }
  }, {
    key: "set",
    value: function set(e, t, n) {
      xe.populateDefaultFileIO(n == null ? void 0 : n[j], ".4a,.mp3,.webm,.mp4,.mpga,.wav,.mpeg,.m4a"), xe.populateDefaultFileIO(n == null ? void 0 : n[ee], ".png,.jpg");
      var s = cs.createNew(e.remarkable);
      xe.processImagesConfig(t, s, e[ee], n == null ? void 0 : n[ee]), xe.processCamera(t, s, e[Fe], e[ee]), xe.processGifConfig(t, s, e[kn], n == null ? void 0 : n[kn]), xe.processAudioConfig(t, s, e[j], n == null ? void 0 : n[j]), xe.processMicrophone(t, s, e[ft], e[j]), xe.processMixedFiles(t, s, e[no]);
    }
  }]);
}();
var gn = /*#__PURE__*/function () {
  function gn(e, t, n) {
    var _a$url;
    _classCallCheck(this, gn);
    var s, r, o, a, c;
    this.rawBody = {}, this.validateKeyProperty = !1, this.canSendMessage = gn.canSendMessage, this.connectSettings = {}, this.fileTypes = {}, this.completionsHandlers = {}, this.streamHandlers = {}, this.deepChat = e, this.demo = n, Object.assign(this.rawBody, (s = e.connect) == null ? void 0 : s.additionalBodyProps), this.totalMessagesMaxCharLength = (r = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : r.totalMessagesMaxCharLength, this.maxMessages = (o = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : o.maxMessages, xe.set(e, this, t), e.connect && (this.connectSettings = e.connect), this.demo && ((_a$url = (a = this.connectSettings).url) !== null && _a$url !== void 0 ? _a$url : a.url = Et.URL), this.connectSettings.websocket && Me.setup(this), this.stream = ((c = this.deepChat.connect) == null ? void 0 : c.stream) || ie.checkForStream(this.deepChat), e.loadHistory && Hs.addErrorPrefix(this);
  }
  return _createClass(gn, [{
    key: "verifyKey",
    value: function verifyKey(e, t) {}
  }, {
    key: "getServiceIOByType",
    value: function getServiceIOByType(e) {
      if (e[y].startsWith(j) && this.fileTypes[j]) return this.fileTypes[j];
      if (e[y].startsWith(W)) {
        if (this.fileTypes[kn] && e[y].endsWith("/gif")) return this.fileTypes[kn];
        if (this.fileTypes[ee]) return this.fileTypes[ee];
        if (this[Fe]) return this[Fe];
      }
      return this.fileTypes[no];
    }
  }, {
    key: "request",
    value: function () {
      var _request4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(e, t) {
        var n,
          _args25 = arguments;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              n = _args25.length > 2 && _args25[2] !== undefined ? _args25[2] : !0;
              return _context25.a(2, this.stream && !q.isSimulation(this.stream) ? q.request(this, e, t, n) : _e.request(this, e, t, n));
          }
        }, _callee25, this);
      }));
      function request(_x51, _x52) {
        return _request4.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "callAPIWithText",
    value: function () {
      var _callAPIWithText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(e, t) {
        var _o$headers, _a$z;
        var r, o, a, c, n, s;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              n = _objectSpread({
                messages: t
              }, this.rawBody);
              s = !1;
              (r = this.connectSettings.headers) != null && r[z] || ((_o$headers = (o = this.connectSettings).headers) !== null && _o$headers !== void 0 ? _o$headers : o.headers = {}, (_a$z = (a = this.connectSettings.headers)[z]) !== null && _a$z !== void 0 ? _a$z : a[z] = Y, s = !0);
              _context26.n = 1;
              return this.request(n, e);
            case 1:
              s && ((c = this.connectSettings.headers) == null || delete c[z]);
            case 2:
              return _context26.a(2);
          }
        }, _callee26, this);
      }));
      function callAPIWithText(_x53, _x54) {
        return _callAPIWithText.apply(this, arguments);
      }
      return callAPIWithText;
    }()
  }, {
    key: "callApiWithFiles",
    value: function () {
      var _callApiWithFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(e, t, n) {
        var s, r, o;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              s = gn.createCustomFormDataBody(this.rawBody, t, n), r = this.connectSettings, o = this.getServiceIOByType(n[0]);
              this.connectSettings = (o == null ? void 0 : o.connect) || this.connectSettings;
              _context27.n = 1;
              return this.request(s, e, !1);
            case 1:
              this.connectSettings = r;
            case 2:
              return _context27.a(2);
          }
        }, _callee27, this);
      }));
      function callApiWithFiles(_x55, _x56, _x57) {
        return _callApiWithFiles.apply(this, arguments);
      }
      return callApiWithFiles;
    }()
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(e, t, n) {
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              n ? this.callApiWithFiles(e, t, n) : this.callAPIWithText(e, t);
            case 1:
              return _context28.a(2);
          }
        }, _callee28, this);
      }));
      function callServiceAPI(_x58, _x59, _x60) {
        return _callServiceAPI.apply(this, arguments);
      }
      return callServiceAPI;
    }() // prettier-ignore
  }, {
    key: "callAPI",
    value: function () {
      var _callAPI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(e, t) {
        var s, n, r;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              if (this.connectSettings) {
                _context29.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              n = ls.processMessages(t.messageToElements.map(function (_ref24) {
                var _ref25 = _slicedToArray(_ref24, 1),
                  r = _ref25[0];
                return r;
              }), this.maxMessages, this.totalMessagesMaxCharLength);
              if (this.connectSettings.websocket && (!this.connectSettings.handler || this.connectSettings.url !== Et.URL)) {
                r = _objectSpread({
                  messages: n
                }, this.rawBody);
                e[m] && (s = this.getServiceIOByType(e[m][0])) != null && s.connect ? this.callApiWithFiles(t, n, e[m]) : Me.sendWebsocket(this, r, t, !1);
              } else this.callServiceAPI(t, n, e[m]);
            case 2:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function callAPI(_x61, _x62) {
        return _callAPI.apply(this, arguments);
      }
      return callAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(e) {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              if (!e.result) {
                _context30.n = 1;
                break;
              }
              return _context30.a(2, ie.handleResponseProperty(e));
            case 1:
              if (!B.validateResponseFormat(e, !!this.stream)) {
                _context30.n = 2;
                break;
              }
              return _context30.a(2, e);
            case 2:
              return _context30.a(2);
          }
        }, _callee30, this);
      }));
      function extractResultData(_x63) {
        return _extractResultData.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "isDirectConnection",
    value: function isDirectConnection() {
      return !1;
    }
  }, {
    key: "isWebModel",
    value: function isWebModel() {
      return !1;
    }
  }, {
    key: "isCustomView",
    value: function isCustomView() {
      return !1;
    }
  }], [{
    key: "canSendMessage",
    value: function canSendMessage(e, t, n) {
      return n ? !0 : !!(e && e.trim() !== "") || !!(t && t[K] > 0);
    }
  }, {
    key: "createCustomFormDataBody",
    value: function createCustomFormDataBody(e, t, n) {
      var s = new FormData();
      n.forEach(function (a) {
        return s.append("files", a);
      }), Object.keys(e).forEach(function (a) {
        return s.append(a, String(e[a]));
      });
      var r = 0;
      t.slice(0, t[K] - 1).forEach(function (a) {
        s.append("message".concat(r += 1), ae(a));
      });
      var o = t[t[K] - 1];
      return o[d] && (delete o[m], s.append("message".concat(r += 1), ae(o))), s;
    }
  }]);
}();
var M = /*#__PURE__*/function (_gn) {
  // prettier-ignore
  function M(e, t, n, s, r) {
    var _this15;
    _classCallCheck(this, M);
    var o;
    _this15 = _callSuper(this, M, [e, r]), _this15.insertKeyPlaceholderText = "API Key", _this15.keyHelpUrl = "", _this15.asyncCallInProgress = !1, _this15.systemMessage = "", Object.assign(_this15.rawBody, (o = e.connect) == null ? void 0 : o.additionalBodyProps), _this15._keyVerificationDetails = t, _this15._buildHeadersFunc = n, s && _this15.setApiKeyProperties(s), _this15.connectSettings = _this15.buildConnectSettings(_this15.key || "", e.connect);
    return _this15;
  }
  _inherits(M, _gn);
  return _createClass(M, [{
    key: "setApiKeyProperties",
    value: function setApiKeyProperties(e) {
      this.key = e.key, e.validateKeyProperty && (this.validateKeyProperty = e.validateKeyProperty);
    }
  }, {
    key: "buildConnectSettings",
    value: function buildConnectSettings(e, t) {
      var _n$headers;
      var n = t !== null && t !== void 0 ? t : {};
      return (_n$headers = n.headers) !== null && _n$headers !== void 0 ? _n$headers : n.headers = {}, Object.assign(n.headers, this._buildHeadersFunc(e)), n;
    }
  }, {
    key: "completeConfig",
    value: function completeConfig(e, t) {
      e.system_prompt && (this.systemMessage = e.system_prompt), t && (this.functionHandler = t), delete e.system_prompt, delete e.key, delete e.function_handler, Object.assign(this.rawBody, e);
    }
  }, {
    key: "keyAuthenticated",
    value: function keyAuthenticated(e, t) {
      this.connectSettings = this.buildConnectSettings(t, this.connectSettings), this.key = t, e();
    }
    // prettier-ignore
  }, {
    key: "verifyKey",
    value: function verifyKey(e, t) {
      var _this$_keyVerificatio = this._keyVerificationDetails,
        n = _this$_keyVerificatio.url,
        s = _this$_keyVerificatio.method,
        r = _this$_keyVerificatio.handleVerificationResult,
        o = _this$_keyVerificatio.createHeaders,
        a = _this$_keyVerificatio.body,
        c = _this$_keyVerificatio.augmentUrl,
        l = (o == null ? void 0 : o(e)) || this._buildHeadersFunc(e),
        h = (c == null ? void 0 : c(e)) || n;
      _e.verifyKey(e, h, l, s, this.keyAuthenticated.bind(this, t.onSuccess), t.onFail, t.onLoad, r, a);
    }
  }, {
    key: "isDirectConnection",
    value: function isDirectConnection() {
      return !0;
    }
  }, {
    key: "processMessages",
    value: function processMessages(e) {
      return ls.getCharacterLimitMessages(e, this.totalMessagesMaxCharLength ? this.totalMessagesMaxCharLength - this.systemMessage[K] : -1);
    }
  }, {
    key: "addSystemMessage",
    value: function addSystemMessage(e) {
      this.systemMessage && e.unshift(_defineProperty(_defineProperty({}, A, rs), "content", this.systemMessage));
    }
  }, {
    key: "callDirectServiceServiceAPI",
    value: function () {
      var _callDirectServiceServiceAPI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(e, t, n, s, r) {
        var o, a;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              if (this.connectSettings) {
                _context31.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              o = n(this.rawBody, t), a = s ? this.stream : !1;
              if (!(a && (_typeof(a) !== F || !a.simulation) || o.stream)) {
                _context31.n = 2;
                break;
              }
              o.stream = !0, s != null && s.readable && (this.stream = {
                readable: !0
              }), q.request(this, o, e);
              _context31.n = 4;
              break;
            case 2:
              _context31.n = 3;
              return _e.request(this, o, e, r);
            case 3:
              return _context31.a(2, _context31.v);
            case 4:
              return _context31.a(2);
          }
        }, _callee31, this);
      }));
      function callDirectServiceServiceAPI(_x64, _x65, _x66, _x67, _x68) {
        return _callDirectServiceServiceAPI.apply(this, arguments);
      }
      return callDirectServiceServiceAPI;
    }()
  }, {
    key: "callToolFunction",
    value: function () {
      var _callToolFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(e, t) {
        var r, o, n, a, c, _t14, _t15;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              this.asyncCallInProgress = !0;
              _context32.n = 1;
              return e(t);
            case 1:
              n = _context32.v;
              if (Array.isArray(n)) {
                _context32.n = 6;
                break;
              }
              if (!n[d]) {
                _context32.n = 5;
                break;
              }
              a = _defineProperty({}, d, n[d]);
              _context32.n = 2;
              return (o = (r = this.deepChat).responseInterceptor) == null ? void 0 : o.call(r, a);
            case 2:
              _t14 = _context32.v;
              if (_t14) {
                _context32.n = 3;
                break;
              }
              _t14 = a;
            case 3:
              c = _t14;
              if (!Array.isArray(c)) {
                _context32.n = 4;
                break;
              }
              throw Error("Function tool response interceptor cannot return an array");
            case 4:
              return _context32.a(2, {
                processedResponse: c
              });
            case 5:
              throw Error(dn);
            case 6:
              _context32.n = 7;
              return Promise.all(n);
            case 7:
              _t15 = _context32.v;
              return _context32.a(2, {
                responses: _t15
              });
          }
        }, _callee32, this);
      }));
      function callToolFunction(_x69, _x70) {
        return _callToolFunction.apply(this, arguments);
      }
      return callToolFunction;
    }()
  }, {
    key: "makeAnotherRequest",
    value: function makeAnotherRequest(e, t, n) {
      try {
        return t && (this.stream ? q.request(this, e, t) : _e.request(this, e, t)), _defineProperty({}, d, n || "");
      } catch (s) {
        throw this.asyncCallInProgress = !1, s;
      }
    }
  }, {
    key: "genereteAPIKeyName",
    value: function genereteAPIKeyName(e) {
      return "".concat(e, " API Key");
    }
  }, {
    key: "extractStreamResultWToolsGeneric",
    value: function () {
      var _extractStreamResultWToolsGeneric = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(e, t, n, s, r) {
        var o, a, c;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              o = t.delta, a = t.finish_reason;
              if (!(a === "tool_calls")) {
                _context33.n = 1;
                break;
              }
              c = {
                tool_calls: e._streamToolCalls
              };
              return _context33.a(2, (e._streamToolCalls = void 0, this.handleToolsGeneric(c, n, e.messages, s, r)));
            case 1:
              o != null && o.tool_calls && (e._streamToolCalls ? o.tool_calls.forEach(function (c, l) {
                e._streamToolCalls && (e._streamToolCalls[l]["function"].arguments += c["function"].arguments);
              }) : e._streamToolCalls = o.tool_calls);
            case 2:
              return _context33.a(2, _defineProperty({}, d, (o == null ? void 0 : o.content) || ""));
          }
        }, _callee33, this);
      }));
      function extractStreamResultWToolsGeneric(_x71, _x72, _x73, _x74, _x75) {
        return _extractStreamResultWToolsGeneric.apply(this, arguments);
      }
      return extractStreamResultWToolsGeneric;
    }()
  }, {
    key: "handleToolsGeneric",
    value: function () {
      var _handleToolsGeneric = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(e, t, n, s, r) {
        var o, a, _yield$this$callToolF, c, l;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              if (!(!e.tool_calls || !s || !t)) {
                _context34.n = 1;
                break;
              }
              throw Error(bn);
            case 1:
              o = w(s);
              a = e.tool_calls.map(function (h) {
                return {
                  name: h["function"].name,
                  arguments: h["function"].arguments
                };
              });
              _context34.n = 2;
              return this.callToolFunction(t, a);
            case 2:
              _yield$this$callToolF = _context34.v;
              c = _yield$this$callToolF.responses;
              l = _yield$this$callToolF.processedResponse;
              if (!l) {
                _context34.n = 3;
                break;
              }
              return _context34.a(2, l);
            case 3:
              if (!(r && (o.messages = o.messages.slice(o.messages[K] - 1), r.message && o.messages.unshift(_defineProperty(_defineProperty({}, A, rs), "content", r.message))), o.messages.push(_defineProperty(_defineProperty({
                tool_calls: e.tool_calls
              }, A, cn), "content", null)), !c.find(function (_ref28) {
                var h = _ref28.response;
                return _typeof(h) !== ve;
              }) && a[K] === c[K])) {
                _context34.n = 4;
                break;
              }
              return _context34.a(2, (c.forEach(function (h, u) {
                var b;
                var g = (b = e.tool_calls) == null ? void 0 : b[u];
                o == null || o.messages.push(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, A, "tool"), "tool_call_id", g == null ? void 0 : g.id), "name", g == null ? void 0 : g["function"].name), "content", h.response));
              }), this.makeAnotherRequest(o, n)));
            case 4:
              throw Error(dn);
            case 5:
              return _context34.a(2);
          }
        }, _callee34, this);
      }));
      function handleToolsGeneric(_x76, _x77, _x78, _x79, _x80) {
        return _handleToolsGeneric.apply(this, arguments);
      }
      return handleToolsGeneric;
    }()
  }, {
    key: "updateSessionId",
    value: function updateSessionId(e) {
      this.messages && this.messages.messageToElements[K] > 0 && (this.messages.messageToElements[this.messages.messageToElements[K] - 1][0]._sessionId = e);
    }
  }], [{
    key: "getRoleViaUser",
    value: function getRoleViaUser(e) {
      return e === $ ? $ : cn;
    }
  }, {
    key: "getRoleViaAI",
    value: function getRoleViaAI(e) {
      return e === te ? cn : $;
    }
  }, {
    key: "getImageContent",
    value: function getImageContent(e) {
      return e.filter(function (t) {
        return t[y] === W;
      }).map(function (t) {
        return _defineProperty(_defineProperty({}, y, ze), ze, {
          url: t[R] || ""
        });
      }).filter(function (t) {
        return t[ze].url[K] > 0;
      });
    }
  }, {
    key: "getTextWImagesContent",
    value: function getTextWImagesContent(e) {
      if (e[m] && e[m][K] > 0) {
        var t = this.getImageContent(e[m]);
        return e[d] && e[d].trim()[K] > 0 && t.unshift(_defineProperty(_defineProperty({}, y, d), d, e[d])), t[K] > 0 ? t : e[d] || "";
      }
      return e[d] || "";
    }
  }, {
    key: "getTextWFilesContent",
    value: function getTextWFilesContent(e, t) {
      if (e[m] && e[m][K] > 0) {
        var n = t(e[m]);
        return e[d] && e[d].trim()[K] > 0 && n.unshift(_defineProperty(_defineProperty({}, y, d), d, e[d])), n;
      }
      return e[d] || "";
    }
  }]);
}(gn);
var js = /*#__PURE__*/function () {
  function js() {
    _classCallCheck(this, js);
  }
  return _createClass(js, null, [{
    key: "waitForPropertiesToBeUpdatedBeforeRender",
    value: function waitForPropertiesToBeUpdatedBeforeRender(e) {
      e._propUpdated_ = !1, setTimeout(function () {
        e._propUpdated_ ? js.waitForPropertiesToBeUpdatedBeforeRender(e) : (e._waitingToRender_ = !1, e.onRender());
      });
    }
  }, {
    key: "attemptRender",
    value: function attemptRender(e) {
      e._propUpdated_ = !0, e._waitingToRender_ || (e._waitingToRender_ = !0, js.waitForPropertiesToBeUpdatedBeforeRender(e));
    }
  }]);
}();
var Rt = /*#__PURE__*/function (_HTMLElement) {
  // If this is not working, try using propertyName directly
  function Rt() {
    var _this16;
    _classCallCheck(this, Rt);
    _this16 = _callSuper(this, Rt), _this16._waitingToRender_ = !1, _this16._propUpdated_ = !1, Object.keys(Rt._attributeToProperty_).forEach(function (e) {
      var t = Rt._attributeToProperty_[e];
      _this16.constructPropertyAccessors(t), _this16.hasOwnProperty(e) || _this16.constructPropertyAccessors(t, e);
    });
    return _this16;
  }
  _inherits(Rt, _HTMLElement);
  return _createClass(Rt, [{
    key: "constructPropertyAccessors",
    value:
    // need to be called here as accessors need to be set for the class instance
    function constructPropertyAccessors(e, t) {
      var n;
      Object.defineProperty(this, t || e, {
        get: function get() {
          return n;
        },
        set: function set(o) {
          n = o, t ? this[e] = o : js.attemptRender(this);
        }
      });
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(e, t, n) {
      if (t === n) return;
      var s = Rt._attributes_[e](n),
        r = Rt._attributeToProperty_[e];
      this[r] = s;
    }
  }, {
    key: "onRender",
    value: function onRender() {}
  }], [{
    key: "observedAttributes",
    get: function get() {
      return Object.keys(Rt._attributes_) || [];
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
Rt._attributes_ = {}, Rt._attributeToProperty_ = {};
var Oi = Rt;
var Xc = "<?xml version=\"1.0\" standalone=\"no\"?>\n<svg version=\"1.1\"\n\txmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n\txmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"0.9em\" height=\"0.9em\"\n\tviewBox=\"0 0 1200 1200\" enable-background=\"new 0 0 1200 1200\">\n\t\t<path d=\"\n\t\t\tM669.727,273.516c-22.891-2.476-46.15-3.895-69.727-4.248c-103.025,0.457-209.823,25.517-310.913,73.536\n\t\t\tc-75.058,37.122-148.173,89.529-211.67,154.174C46.232,529.978,6.431,577.76,0,628.74c0.76,44.162,48.153,98.67,77.417,131.764\n\t\t\tc59.543,62.106,130.754,113.013,211.67,154.174c2.75,1.335,5.51,2.654,8.276,3.955l-75.072,131.102l102.005,60.286l551.416-960.033\n\t\t\tl-98.186-60.008L669.727,273.516z M902.563,338.995l-74.927,129.857c34.47,44.782,54.932,100.006,54.932,159.888\n\t\t\tc0,149.257-126.522,270.264-282.642,270.264c-6.749,0-13.29-0.728-19.922-1.172l-49.585,85.84c22.868,2.449,45.99,4.233,69.58,4.541\n\t\t\tc103.123-0.463,209.861-25.812,310.84-73.535c75.058-37.122,148.246-89.529,211.743-154.174\n\t\t\tc31.186-32.999,70.985-80.782,77.417-131.764c-0.76-44.161-48.153-98.669-77.417-131.763\n\t\t\tc-59.543-62.106-130.827-113.013-211.743-154.175C908.108,341.478,905.312,340.287,902.563,338.995L902.563,338.995z\n\t\t\tM599.927,358.478c6.846,0,13.638,0.274,20.361,0.732l-58.081,100.561c-81.514,16.526-142.676,85.88-142.676,168.897\n\t\t\tc0,20.854,3.841,40.819,10.913,59.325c0.008,0.021-0.008,0.053,0,0.074l-58.228,100.854\n\t\t\tc-34.551-44.823-54.932-100.229-54.932-160.182C317.285,479.484,443.808,358.477,599.927,358.478L599.927,358.478z M768.896,570.513\n\t\t\tL638.013,797.271c81.076-16.837,141.797-85.875,141.797-168.603C779.81,608.194,775.724,588.729,768.896,570.513L768.896,570.513z\"\n\t\t\t/>\n</svg>\n",
  Zc = "<?xml version=\"1.0\" standalone=\"no\"?>\n<svg version=\"1.1\"\n\txmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n\txmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"0.9em\" height=\"0.9em\"\n\tviewBox=\"0 0 1200 1200\" enable-background=\"new 0 0 1200 1200\">\n\t\t<path id=\"path6686\" inkscape:connector-curvature=\"0\" d=\"M779.843,599.925c0,95.331-80.664,172.612-180.169,172.612\n\t\t\tc-99.504,0-180.168-77.281-180.168-172.612c0-95.332,80.664-172.612,180.168-172.612\n\t\t\tC699.179,427.312,779.843,504.594,779.843,599.925z M600,240.521c-103.025,0.457-209.814,25.538-310.904,73.557\n\t\t\tc-75.058,37.122-148.206,89.496-211.702,154.141C46.208,501.218,6.431,549,0,599.981c0.76,44.161,48.13,98.669,77.394,131.763\n\t\t\tc59.543,62.106,130.786,113.018,211.702,154.179c94.271,45.751,198.616,72.092,310.904,73.557\n\t\t\tc103.123-0.464,209.888-25.834,310.866-73.557c75.058-37.122,148.243-89.534,211.74-154.179\n\t\t\tc31.185-32.999,70.962-80.782,77.394-131.763c-0.76-44.161-48.13-98.671-77.394-131.764\n\t\t\tc-59.543-62.106-130.824-112.979-211.74-154.141C816.644,268.36,712.042,242.2,600,240.521z M599.924,329.769\n\t\t\tc156.119,0,282.675,120.994,282.675,270.251c0,149.256-126.556,270.25-282.675,270.25S317.249,749.275,317.249,600.02\n\t\t\tC317.249,450.763,443.805,329.769,599.924,329.769L599.924,329.769z\"/>\n</svg>\n";
var Bt = /*#__PURE__*/function () {
  function Bt() {
    _classCallCheck(this, Bt);
  }
  return _createClass(Bt, null, [{
    key: "createSVGElement",
    value: function createSVGElement(e) {
      return new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    }
  }]);
}();
var zt = /*#__PURE__*/function () {
  function zt() {
    _classCallCheck(this, zt);
  }
  return _createClass(zt, null, [{
    key: "changeVisibility",
    value:
    // prettier-ignore
    function changeVisibility(e, t, n, s) {
      s.target.id === zt.VISIBLE_ICON_ID ? (t[E].display = "none", n[E].display = "block", e[y] = "password") : (t[E].display = "block", n[E].display = "none", e[y] = d);
    }
  }, {
    key: "createIconElement",
    value: function createIconElement(e, t) {
      var n = Bt.createSVGElement(e);
      return n.id = t, n[f].add("visibility-icon"), n;
    }
    // prettier-ignore
  }, {
    key: "create",
    value: function create(e) {
      var t = S();
      t.id = "visibility-icon-container";
      var n = zt.createIconElement(Zc, zt.VISIBLE_ICON_ID);
      n[E].display = "none", t.appendChild(n);
      var s = zt.createIconElement(Xc, "not-visible-icon");
      return t.appendChild(s), t.onclick = zt.changeVisibility.bind(this, e, n, s), t;
    }
  }]);
}();
zt.VISIBLE_ICON_ID = "visible-icon";
var Ni = zt;
var Oe = /*#__PURE__*/function () {
  function Oe() {
    _classCallCheck(this, Oe);
  }
  return _createClass(Oe, null, [{
    key: "createCautionText",
    value: function createCautionText() {
      var e = S("a");
      return e[f].add("insert-key-input-help-text"), e.innerText = "Please exercise CAUTION when inserting your API key outside of deepchat.dev or localhost!!", e;
    }
  }, {
    key: "createHelpLink",
    value: function createHelpLink(e) {
      var t = S("a");
      return t[f].add("insert-key-input-help-text"), t.href = e, t.innerText = "Find more info here", t.target = "_blank", t;
    }
  }, {
    key: "createFailText",
    value: function createFailText() {
      var e = S();
      return e.id = "insert-key-input-invalid-text", e[E].display = "none", e;
    }
  }, {
    key: "createHelpTextContainer",
    value: function createHelpTextContainer(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      var n = S();
      n.id = "insert-key-help-text-container";
      var s = S();
      s.id = "insert-key-help-text-contents";
      var r = Oe.createFailText();
      if (s.appendChild(r), e) {
        var o = Oe.createHelpLink(e);
        s.appendChild(o);
      }
      if (t === !0) {
        var _o5 = Oe.createCautionText();
        s.appendChild(_o5);
      }
      return n.appendChild(s), {
        helpTextContainerElement: n,
        failTextElement: r
      };
    }
  }, {
    key: "onFail",
    value: function onFail(e, t, n, s) {
      e[f].replace("insert-key-input-valid", "insert-key-input-invalid"), n.innerText = s, n[E].display = "block", t.innerText = "Start", e[f].remove(Ot);
    }
  }, {
    key: "onLoad",
    value: function onLoad(e, t) {
      e[f].add(Ot), t.innerHTML = '<div id="loading-key"></div>';
    }
    // prettier-ignore
  }, {
    key: "verifyKey",
    value: function verifyKey(e, t, n) {
      var s = e.value.trim();
      n.verifyKey(s, t);
    }
    // prettier-ignore
  }, {
    key: "addVerificationEvents",
    value: function addVerificationEvents(e, t, n, s, r) {
      var o = {
          onSuccess: s,
          onFail: Oe.onFail.bind(this, e, t, n),
          onLoad: Oe.onLoad.bind(this, e, t)
        },
        a = Oe.verifyKey.bind(this, e, o, r);
      t.onclick = a, e.onkeydown = function (c) {
        !e[f].contains(Ot) && c.key === be.ENTER && a();
      };
    }
  }, {
    key: "createStartButton",
    value: function createStartButton() {
      var e = S();
      return e.id = "start-button", e.innerText = "Start", e;
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus(e) {
      e.target[f].replace("insert-key-input-invalid", "insert-key-input-valid");
    }
  }, {
    key: "createInput",
    value: function createInput(e) {
      var t = S();
      t.id = "insert-key-input-container";
      var n = S("input");
      return n.id = "insert-key-input", n.placeholder = e || "API Key", n[y] = "password", n[f].add("insert-key-input-valid"), n.onfocus = Oe.onInputFocus, t.appendChild(n), t;
    }
    // prettier-ignore
  }, {
    key: "createContents",
    value: function createContents(e, t) {
      var h;
      var n = S();
      n.id = "insert-key-contents";
      var s = Oe.createInput(t.insertKeyPlaceholderText),
        r = s.children[0],
        o = Ni.create(r);
      s.appendChild(o), n.appendChild(s);
      var a = Oe.createStartButton(),
        _Oe$createHelpTextCon = Oe.createHelpTextContainer(t.keyHelpUrl, (h = t.deepChat._insertKeyViewStyles) == null ? void 0 : h.displayCautionText),
        c = _Oe$createHelpTextCon.helpTextContainerElement,
        l = _Oe$createHelpTextCon.failTextElement;
      return n.appendChild(a), n.appendChild(c), Oe.addVerificationEvents(r, a, l, e, t), n;
    }
  }, {
    key: "createElements",
    value: function createElements(e, t) {
      var n = S();
      n.id = "insert-key-view";
      var s = Oe.createContents(e, t);
      return n.appendChild(s), n;
    }
  }, {
    key: "render",
    value: function render(e, t, n) {
      var s = Oe.createElements(t, n);
      e.replaceChildren(s);
    }
  }]);
}();
var nt = /*#__PURE__*/function () {
  function nt() {
    _classCallCheck(this, nt);
  }
  return _createClass(nt, null, [{
    key: "scopeToTag",
    value: function scopeToTag(e) {
      return e.replace("webllm/", "");
    }
  }, {
    key: "encodeName",
    value: function encodeName(e, t) {
      return "".concat(t.split("/").pop() || "file").concat(nt.SEP).concat(nt.scopeToTag(e)).concat(nt.SEP).concat(encodeURIComponent(t));
    }
    // Returns {scope, url} recovered from an exported file name, or undefined if unrecognised.
  }, {
    key: "decodeName",
    value: function decodeName(e) {
      var t = e.split(nt.SEP);
      if (t.length < 3) return;
      var n = decodeURIComponent(t[t.length - 1]),
        s = "webllm/".concat(t[t.length - 2]);
      if (nt.CACHE_SCOPES.includes(s)) return {
        scope: s,
        url: n
      };
    }
    // Read all cached model artifacts into File objects for download/export.
  }, {
    key: "exportFromCache",
    value: function () {
      var _exportFromCache = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35() {
        var e, _iterator2, _step2, t, n, s, _iterator3, _step3, r, o, a, _t16, _t17;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              if (!((typeof caches === "undefined" ? "undefined" : _typeof(caches)) > "u")) {
                _context35.n = 1;
                break;
              }
              return _context35.a(2, []);
            case 1:
              e = [];
              _iterator2 = _createForOfIteratorHelper(nt.CACHE_SCOPES);
              _context35.p = 2;
              _iterator2.s();
            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context35.n = 18;
                break;
              }
              t = _step2.value;
              _context35.n = 4;
              return caches.has(t);
            case 4:
              if (_context35.v) {
                _context35.n = 5;
                break;
              }
              return _context35.a(3, 17);
            case 5:
              _context35.n = 6;
              return caches.open(t);
            case 6:
              n = _context35.v;
              _context35.n = 7;
              return n.keys();
            case 7:
              s = _context35.v;
              _iterator3 = _createForOfIteratorHelper(s);
              _context35.p = 8;
              _iterator3.s();
            case 9:
              if ((_step3 = _iterator3.n()).done) {
                _context35.n = 14;
                break;
              }
              r = _step3.value;
              _context35.n = 10;
              return n.match(r);
            case 10:
              o = _context35.v;
              if (o) {
                _context35.n = 11;
                break;
              }
              return _context35.a(3, 13);
            case 11:
              _context35.n = 12;
              return o.blob();
            case 12:
              a = _context35.v;
              e.push(new File([a], nt.encodeName(t, r.url)));
            case 13:
              _context35.n = 9;
              break;
            case 14:
              _context35.n = 16;
              break;
            case 15:
              _context35.p = 15;
              _t16 = _context35.v;
              _iterator3.e(_t16);
            case 16:
              _context35.p = 16;
              _iterator3.f();
              return _context35.f(16);
            case 17:
              _context35.n = 3;
              break;
            case 18:
              _context35.n = 20;
              break;
            case 19:
              _context35.p = 19;
              _t17 = _context35.v;
              _iterator2.e(_t17);
            case 20:
              _context35.p = 20;
              _iterator2.f();
              return _context35.f(20);
            case 21:
              return _context35.a(2, e);
          }
        }, _callee35, null, [[8, 15, 16, 17], [2, 19, 20, 21]]);
      }));
      function exportFromCache() {
        return _exportFromCache.apply(this, arguments);
      }
      return exportFromCache;
    }() // Seed the cache from previously-exported files so a subsequent reload() resolves offline.
  }, {
    key: "importToCache",
    value: function () {
      var _importToCache = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(e) {
        var _i2, _Array$from, t, n, _t18, _t19, _t20, _t21;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              if ((typeof caches === "undefined" ? "undefined" : _typeof(caches)) > "u") {
                _context36.n = 6;
                break;
              }
              _i2 = 0, _Array$from = Array.from(e);
            case 1:
              if (!(_i2 < _Array$from.length)) {
                _context36.n = 6;
                break;
              }
              t = _Array$from[_i2];
              n = nt.decodeName(t.name);
              if (n) {
                _context36.n = 2;
                break;
              }
              return _context36.a(3, 5);
            case 2:
              _context36.n = 3;
              return caches.open(n.scope);
            case 3:
              _t18 = _context36.v;
              _t19 = new Request(n.url);
              _t20 = Response;
              _context36.n = 4;
              return t.arrayBuffer();
            case 4:
              _t21 = _context36.v;
              _context36.n = 5;
              return _t18.put.call(_t18, _t19, new _t20(_t21));
            case 5:
              _i2++;
              _context36.n = 1;
              break;
            case 6:
              return _context36.a(2);
          }
        }, _callee36);
      }));
      function importToCache(_x81) {
        return _importToCache.apply(this, arguments);
      }
      return importToCache;
    }()
  }]);
}();
nt.CACHE_SCOPES = ["webllm/model", "webllm/wasm", "webllm/config"], nt.SEP = "__DC__";
var hs = nt;
var We = /*#__PURE__*/function () {
  function We() {
    _classCallCheck(this, We);
  }
  return _createClass(We, null, [{
    key: "enableButtons",
    value: function enableButtons(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      window.webLLM ? (e && (e[H] = !1), t && (t[H] = !1)) : n < ds.MODULE_SEARCH_LIMIT_S * 4 && setTimeout(function () {
        return We.enableButtons(e, t, n + 1);
      }, 250);
    }
    // prettier-ignore
  }, {
    key: "setUpInitial",
    value: function setUpInitial(e, t, n, s) {
      var r = (t == null ? void 0 : t.downloadClass) || We.DOWNLOAD_BUTTON_CLASS,
        o = (t == null ? void 0 : t.uploadClass) || We.UPLOAD_BUTTON_CLASS,
        a = (t == null ? void 0 : t.fileInputClass) || We.FILE_INPUT_CLASS;
      return setTimeout(function () {
        var c = n == null ? void 0 : n.getElementsByClassName(r)[0],
          l = n == null ? void 0 : n.getElementsByClassName(a)[0],
          h = n == null ? void 0 : n.getElementsByClassName(o)[0];
        c && (c.onclick = function () {
          return e();
        }), l && (l.onchange = function () {
          l[m] && l[m].length > 0 && e(l[m]);
        }), h && (h.onclick = function () {
          return l[Z]();
        }), (c || h) && We.enableButtons(c, h);
      }), (t == null ? void 0 : t.initialHtml) || "<div>\n        Download or upload a web model that will run entirely on your browser: <br/> \n        <button disabled class=\"".concat(r, " deep-chat-button deep-chat-web-model-button\">Download</button>\n        ").concat(s ? "" : "<input type=\"file\" class=\"".concat(a, "\" hidden multiple />\n          <button disabled class=\"").concat(o, " deep-chat-button deep-chat-web-model-button\">Upload</button>"), "\n      </div>");
    }
  }, {
    key: "exportFile",
    value: function exportFile(e) {
      var t = S("a"),
        n = 4;
      var _loop2 = function _loop2(s) {
        setTimeout(function () {
          var r = s * n;
          for (var o = r; o < Math.min(r + n, e.length); o += 1) {
            var a = URL.createObjectURL(e[o]);
            t.href = a, t.download = e[o].name, document.body.appendChild(t), t[Z](), URL.revokeObjectURL(a);
          }
        }, 500 * s);
      };
      for (var s = 0; s < e.length / n; s += 1) {
        _loop2(s);
      }
    }
    // prettier-ignore
  }, {
    key: "setUpAfterLoad",
    value: function setUpAfterLoad(e, t, n) {
      var s = (e == null ? void 0 : e.exportFilesClass) || We.EXPORT_BUTTON_CLASS;
      return setTimeout(function () {
        var r = t == null ? void 0 : t.getElementsByClassName(s)[0];
        r && (r.onclick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37() {
          var _t22;
          return _regenerator().w(function (_context37) {
            while (1) switch (_context37.n) {
              case 0:
                _t22 = We;
                _context37.n = 1;
                return hs.exportFromCache();
              case 1:
                return _context37.a(2, _t22.exportFile.call(_t22, _context37.v));
            }
          }, _callee37);
        })));
      }), (e == null ? void 0 : e.afterLoadHtml) || "<div>\n        Model loaded successfully and has been cached for future requests.\n        ".concat(n ? "" : "<br/> <button style=\"margin-top: 5px\" class=\"".concat(s, " deep-chat-button\">Export</button>"), "\n      </div>");
    }
  }]);
}();
We.DOWNLOAD_BUTTON_CLASS = "deep-chat-download-button", We.UPLOAD_BUTTON_CLASS = "deep-chat-upload-button", We.FILE_INPUT_CLASS = "deep-chat-file-input", We.EXPORT_BUTTON_CLASS = "deep-chat-export-button";
var $s = We;
var Yc = {
    model_list: [{
      model: "https://huggingface.co/mlc-ai/Llama-3.2-1B-Instruct-q4f16_1-MLC",
      model_id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/Llama-3.2-1B-Instruct-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 879.04,
      low_resource_required: !0,
      overrides: {
        context_window_size: 4096
      }
    }, {
      model: "https://huggingface.co/mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC",
      model_id: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/Llama-3.2-3B-Instruct-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 2263.69,
      low_resource_required: !0,
      overrides: {
        context_window_size: 4096
      }
    }, {
      model: "https://huggingface.co/mlc-ai/Llama-3.1-8B-Instruct-q4f16_1-MLC",
      model_id: "Llama-3.1-8B-Instruct-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/Llama-3_1-8B-Instruct-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 5001,
      low_resource_required: !1,
      overrides: {
        context_window_size: 4096
      }
    }, {
      model: "https://huggingface.co/mlc-ai/Phi-3.5-mini-instruct-q4f16_1-MLC",
      model_id: "Phi-3.5-mini-instruct-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/Phi-3.5-mini-instruct-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 3672.07,
      low_resource_required: !1,
      overrides: {
        context_window_size: 4096
      }
    }, {
      model: "https://huggingface.co/mlc-ai/Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
      model_id: "Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/Qwen2-1.5B-Instruct-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 1629.75,
      low_resource_required: !0,
      overrides: {
        context_window_size: 4096
      }
    }, {
      model: "https://huggingface.co/mlc-ai/gemma-2-2b-it-q4f16_1-MLC",
      model_id: "gemma-2-2b-it-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/gemma-2-2b-it-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 1895.3,
      low_resource_required: !1,
      required_features: ["shader-f16"],
      overrides: {
        context_window_size: 4096
      }
    }, {
      model: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC",
      model_id: "TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/TinyLlama-1.1B-Chat-v1.0-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 697.24,
      low_resource_required: !0,
      required_features: ["shader-f16"],
      overrides: {
        context_window_size: 2048
      }
    }, {
      model: "https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.3-q4f16_1-MLC",
      model_id: "Mistral-7B-Instruct-v0.3-q4f16_1-MLC",
      model_lib: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_84/base/Mistral-7B-Instruct-v0.3-q4f16_1_cs1k-webgpu.wasm",
      vram_required_MB: 4573.39,
      low_resource_required: !1,
      required_features: ["shader-f16"],
      overrides: {
        context_window_size: 4096,
        sliding_window_size: -1
      }
    }]
  },
  Q = /*#__PURE__*/function (_gn2) {
    function Q(e) {
      var _this17;
      _classCallCheck(this, Q);
      var t, n;
      _this17 = _callSuper(this, Q, [e]), _this17._isModelLoaded = !1, _this17._isModelLoading = !1, _this17._loadOnFirstMessage = !1, _this17._webModel = {}, _this17.permittedErrorPrefixes = [Q.MULTIPLE_MODELS_ERROR, Q.WEB_LLM_NOT_FOUND_ERROR, Q.GENERIC_ERROR], _this17._conversationHistory = [], _typeof(e.webModel) == "object" && (_this17._webModel = e.webModel), (t = _this17._webModel.load) != null && t.clearCache && Q.clearAllCache(), _this17.findModelInWindow(e), _this17.canSendMessage = _this17.canSubmit.bind(_assertThisInitialized(_this17)), _this17._chatEl = (n = e.shadowRoot) == null ? void 0 : n.children[0], e.history && Q.setUpHistory(_this17._conversationHistory, e.history);
      return _this17;
    }
    // need ref of messages object as web model exhibits unique behaviour to manipulate chat
    _inherits(Q, _gn2);
    return _createClass(Q, [{
      key: "setUpMessages",
      value: function setUpMessages(e) {
        var _this18 = this;
        this._messages = e, this._removeIntro = function () {
          e.removeIntroductoryMessage(), _this18._removeIntro = void 0;
        };
      }
    }, {
      key: "findModelInWindow",
      value: function findModelInWindow(e) {
        var _this19 = this;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var n;
        window.webLLM ? this.configureInit(this.shouldAddIntroMessage(e.introMessage)) : t > Q.MODULE_SEARCH_LIMIT_S ? ((n = this._messages) == null || n.addNewErrorMessage(oe, Q.WEB_LLM_NOT_FOUND_ERROR), console[p]("The deep-chat-web-llm module has not been attached to the window object. Please see the following guide:"), console[p]("https://deepchat.dev/examples/externalModules")) : setTimeout(function () {
          return _this19.findModelInWindow(e, t + 1);
        }, 1e3);
      }
    }, {
      key: "shouldAddIntroMessage",
      value: function shouldAddIntroMessage(e) {
        var t;
        return !e && this._webModel && ((t = this._webModel.introMessage) == null ? void 0 : t.displayed) !== !1;
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop(e) {
        var _this20 = this;
        var t;
        ((t = this._webModel.introMessage) == null ? void 0 : t.autoScroll) !== !1 && setTimeout(function () {
          var n, s;
          (n = _this20._messages) != null && n.elementRef && V.scrollToTop((s = _this20._messages) == null ? void 0 : s.elementRef);
        }, e);
      }
      // prettier-ignore
    }, {
      key: "getIntroMessage",
      value: function getIntroMessage(e) {
        if (!this.shouldAddIntroMessage(e) || !this._chatEl) return;
        var t = $s.setUpInitial(this.init.bind(this), this._webModel.introMessage, this._chatEl, !!this._webModel.worker);
        return this.scrollToTop(1), _defineProperty(_defineProperty(_defineProperty({}, A, te), "html", t), "sendUpdate", !1);
      }
    }, {
      key: "configureInit",
      value: function () {
        var _configureInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(e) {
          var t;
          return _regenerator().w(function (_context38) {
            while (1) switch (_context38.n) {
              case 0:
                t = this._webModel.load;
                if (!t) {
                  _context38.n = 2;
                  break;
                }
                if (!t.onInit) {
                  _context38.n = 1;
                  break;
                }
                this.init();
                return _context38.a(2);
              case 1:
                if (!t.onMessage) {
                  _context38.n = 2;
                  break;
                }
                this._loadOnFirstMessage = !0;
                return _context38.a(2);
              case 2:
                e || this.init();
              case 3:
                return _context38.a(2);
            }
          }, _callee38, this);
        }));
        function configureInit(_x82) {
          return _configureInit.apply(this, arguments);
        }
        return configureInit;
      }()
    }, {
      key: "init",
      value: function () {
        var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(e) {
          var n, t, _t23;
          return _regenerator().w(function (_context39) {
            while (1) switch (_context39.n) {
              case 0:
                (n = this._messages) == null || n.removeError();
                t = this.attemptToCreateChat();
                _t23 = t;
                if (!_t23) {
                  _context39.n = 1;
                  break;
                }
                _context39.n = 1;
                return this.loadModel(t, e);
              case 1:
                return _context39.a(2);
            }
          }, _callee39, this);
        }));
        function init(_x83) {
          return _init.apply(this, arguments);
        }
        return init;
      }()
    }, {
      key: "attemptToCreateChat",
      value: function attemptToCreateChat() {
        var n;
        if (Q.chat) {
          (n = this._messages) == null || n.addNewErrorMessage(oe, Q.MULTIPLE_MODELS_ERROR), console[p](Q.MULTIPLE_MODELS_ERROR);
          return;
        }
        if (this._isModelLoaded || this._isModelLoading) return;
        var e = this._webModel.worker,
          t = {};
        return e ? new window.webLLM.WebWorkerMLCEngine(e, t) : new window.webLLM.MLCEngine(t);
      }
    }, {
      key: "getConfig",
      value: function getConfig() {
        var r, o;
        var e = Q.DEFAULT_MODEL;
        this._webModel.model && (e = this._webModel.model);
        var t = (o = (r = window.webLLM) == null ? void 0 : r.prebuiltAppConfig) == null ? void 0 : o.model_list,
          n = w(t && t.length > 0 ? t : Yc.model_list),
          s = {
            model_list: n,
            cacheBackend: "cache"
          };
        if (this._webModel.urls) {
          var a = n.find(function (c) {
            return c.model_id === e;
          });
          a || (a = {
            model: "",
            model_id: e,
            model_lib: ""
          }, n.push(a)), this._webModel.urls.model && (a.model = this._webModel.urls.model), this._webModel.urls.wasm && (a.model_lib = this._webModel.urls.wasm);
        }
        return {
          model: e,
          appConfig: s
        };
      }
      // system instruction + prior turns + the new user message, in OpenAI message format
    }, {
      key: "buildMessages",
      value: function buildMessages(e) {
        var t = [];
        return this._webModel.instruction && t.push({
          role: "system",
          content: this._webModel.instruction
        }), t.push.apply(t, _toConsumableArray(this._conversationHistory)), t.push({
          role: "user",
          content: e
        }), t;
      }
      // prettier-ignore
    }, {
      key: "loadModel",
      value: function () {
        var _loadModel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(e, t) {
          var _this21 = this;
          var r, o, a, c, l, h, u, g, n, s, _this$getConfig, b, v, _b, _t24, _t25, _t26;
          return _regenerator().w(function (_context40) {
            while (1) switch (_context40.p = _context40.n) {
              case 0:
                this.scrollToTop(), Q.chat = e, this._isModelLoading = !0;
                n = ((r = this._webModel.introMessage) == null ? void 0 : r.displayed) === !1;
                s = function s(b) {
                  var v;
                  (v = _this21._messages) == null || v.addNewMessage({
                    html: "<div>".concat(b[d], "</div>"),
                    overwrite: !0,
                    sendUpdate: !1
                  }), n && (setTimeout(function () {
                    return V.scrollToBottom(_this21._messages);
                  }), n = !1);
                };
                e.setInitProgressCallback(s);
                _context40.p = 1;
                _this$getConfig = this.getConfig(), b = _this$getConfig.model, v = _this$getConfig.appConfig;
                e.setAppConfig(v);
                _t24 = (o = this._webModel.load) != null && o.skipCache;
                if (!_t24) {
                  _context40.n = 2;
                  break;
                }
                _context40.n = 2;
                return window.webLLM.deleteModelAllInfoInCache(b, v);
              case 2:
                _t25 = t && t.length > 0;
                if (!_t25) {
                  _context40.n = 3;
                  break;
                }
                _context40.n = 3;
                return hs.importToCache(t);
              case 3:
                _context40.n = 4;
                return e.reload(b);
              case 4:
                _context40.n = 6;
                break;
              case 5:
                _context40.p = 5;
                _t26 = _context40.v;
                return _context40.a(2, this.unloadChat(_t26));
              case 6:
                if ((c = (a = this.deepChat)._validationHandler) == null || c.call(a), (l = this._webModel.introMessage) != null && l.removeAfterLoad) this._webModel.introMessage.displayed === !1 ? (u = this._messages) == null || u.removeLastMessage() : (g = this._removeIntro) == null || g.call(this);else {
                  _b = $s.setUpAfterLoad(this._webModel.introMessage, this._chatEl, !!this._webModel.worker);
                  (h = this._messages) == null || h.addNewMessage({
                    html: _b,
                    overwrite: !0,
                    sendUpdate: !1
                  });
                }
                this._isModelLoaded = !0, this._isModelLoading = !1;
              case 7:
                return _context40.a(2);
            }
          }, _callee40, this, [[1, 5]]);
        }));
        function loadModel(_x84, _x85) {
          return _loadModel.apply(this, arguments);
        }
        return loadModel;
      }()
    }, {
      key: "unloadChat",
      value: function () {
        var _unloadChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(e) {
          var t, _t27;
          return _regenerator().w(function (_context41) {
            while (1) switch (_context41.n) {
              case 0:
                (t = this._messages) == null || t.addNewErrorMessage(oe, Q.GENERIC_ERROR);
                console[p](e);
                this._isModelLoaded = !1;
                this._isModelLoading = !1;
                _t27 = Q.chat;
                if (!_t27) {
                  _context41.n = 2;
                  break;
                }
                _context41.n = 1;
                return Q.chat.unload();
              case 1:
                Q.chat = void 0;
              case 2:
                return _context41.a(2);
            }
          }, _callee41, this);
        }));
        function unloadChat(_x86) {
          return _unloadChat.apply(this, arguments);
        }
        return unloadChat;
      }()
    }, {
      key: "immediateResp",
      value: function () {
        var _immediateResp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42(e, t, n) {
          var c, l, r, o, a, _t28, _t29, _t30, _t31, _t32;
          return _regenerator().w(function (_context42) {
            while (1) switch (_context42.n) {
              case 0:
                _context42.n = 1;
                return n.chat.completions.create({
                  messages: this.buildMessages(t),
                  stream: !1
                });
              case 1:
                _t29 = c = _context42.v.choices[0];
                if (!(_t29 == null)) {
                  _context42.n = 2;
                  break;
                }
                _t30 = void 0;
                _context42.n = 3;
                break;
              case 2:
                _t30 = c.message;
              case 3:
                _t31 = l = _t30;
                if (!(_t31 == null)) {
                  _context42.n = 4;
                  break;
                }
                _t32 = void 0;
                _context42.n = 5;
                break;
              case 4:
                _t32 = l.content;
              case 5:
                _t28 = _t32;
                if (_t28) {
                  _context42.n = 6;
                  break;
                }
                _t28 = "";
              case 6:
                r = _t28;
                this._conversationHistory.push({
                  role: "user",
                  content: t
                }, {
                  role: "assistant",
                  content: r
                });
                o = _defineProperty({}, d, r);
                _context42.n = 7;
                return Q.processResponse(this.deepChat, e, o);
              case 7:
                a = _context42.v;
                a && a.forEach(function (h) {
                  return e.addNewMessage(h);
                }), this.completionsHandlers.onFinish();
              case 8:
                return _context42.a(2);
            }
          }, _callee42, this);
        }));
        function immediateResp(_x87, _x88, _x89) {
          return _immediateResp.apply(this, arguments);
        }
        return immediateResp;
      }()
    }, {
      key: "streamResp",
      value: function () {
        var _streamResp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43(e, t, n) {
          var a, c, s, r, o, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, l, h, u, _t33;
          return _regenerator().w(function (_context43) {
            while (1) switch (_context43.p = _context43.n) {
              case 0:
                this.streamHandlers.onAbort = function () {
                  n.interruptGenerate();
                }, this.streamHandlers.onOpen();
                s = new bt(e);
                _context43.n = 1;
                return n.chat.completions.create({
                  messages: this.buildMessages(t),
                  stream: !0,
                  stream_options: {
                    include_usage: !1
                  }
                });
              case 1:
                r = _context43.v;
                o = "";
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context43.p = 2;
                _iterator = _asyncIterator(r);
              case 3:
                _context43.n = 4;
                return _iterator.next();
              case 4:
                if (!(_iteratorAbruptCompletion = !(_step = _context43.v).done)) {
                  _context43.n = 8;
                  break;
                }
                l = _step.value;
                h = ((c = (a = l.choices[0]) == null ? void 0 : a.delta) == null ? void 0 : c.content) || "";
                if (h) {
                  _context43.n = 5;
                  break;
                }
                return _context43.a(3, 7);
              case 5:
                o += h;
                _context43.n = 6;
                return Q.processResponse(this.deepChat, e, _defineProperty({}, d, o));
              case 6:
                u = _context43.v;
                u && s.upsertStreamedMessage(_defineProperty(_defineProperty({}, d, u[0][d]), "overwrite", !0));
              case 7:
                _iteratorAbruptCompletion = false;
                _context43.n = 3;
                break;
              case 8:
                _context43.n = 10;
                break;
              case 9:
                _context43.p = 9;
                _t33 = _context43.v;
                _didIteratorError = true;
                _iteratorError = _t33;
              case 10:
                _context43.p = 10;
                _context43.p = 11;
                if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                  _context43.n = 12;
                  break;
                }
                _context43.n = 12;
                return _iterator["return"]();
              case 12:
                _context43.p = 12;
                if (!_didIteratorError) {
                  _context43.n = 13;
                  break;
                }
                throw _iteratorError;
              case 13:
                return _context43.f(12);
              case 14:
                return _context43.f(10);
              case 15:
                this._conversationHistory.push({
                  role: "user",
                  content: t
                }, {
                  role: "assistant",
                  content: o
                }), s.finaliseStreamedMessage(), this.streamHandlers.onClose();
              case 16:
                return _context43.a(2);
            }
          }, _callee43, this, [[11,, 12, 14], [2, 9, 10, 15]]);
        }));
        function streamResp(_x90, _x91, _x92) {
          return _streamResp.apply(this, arguments);
        }
        return streamResp;
      }()
    }, {
      key: "generateRespByType",
      value: function () {
        var _generateRespByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44(e, t, n, s) {
          var r, _t34;
          return _regenerator().w(function (_context44) {
            while (1) switch (_context44.p = _context44.n) {
              case 0:
                _context44.p = 0;
                if (!n) {
                  _context44.n = 2;
                  break;
                }
                _context44.n = 1;
                return this.streamResp(e, t, s);
              case 1:
                _context44.n = 3;
                break;
              case 2:
                _context44.n = 3;
                return this.immediateResp(e, t, s);
              case 3:
                _context44.n = 5;
                break;
              case 4:
                _context44.p = 4;
                _t34 = _context44.v;
                (r = this._messages) == null || r.addNewErrorMessage(oe), console.log(_t34);
              case 5:
                return _context44.a(2);
            }
          }, _callee44, this, [[0, 4]]);
        }));
        function generateRespByType(_x93, _x94, _x95, _x96) {
          return _generateRespByType.apply(this, arguments);
        }
        return generateRespByType;
      }()
    }, {
      key: "generateResp",
      value: function () {
        var _generateResp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee45(e, t, n) {
          var s, _yield$B$processReque5, r, o, a, c, l;
          return _regenerator().w(function (_context45) {
            while (1) switch (_context45.n) {
              case 0:
                s = t[t.length - 1][d];
                _context45.n = 1;
                return B.processRequestInterceptor(this.deepChat, {
                  body: _defineProperty({}, d, s)
                });
              case 1:
                _yield$B$processReque5 = _context45.v;
                r = _yield$B$processReque5.body;
                o = _yield$B$processReque5.error;
                a = !!this.stream;
                try {
                  if (o) B.displayError(e, new Error(o)), (a ? this.streamHandlers.onClose : this.completionsHandlers.onFinish)();else if (!r || !r[d]) {
                    c = Vo({
                      body: r
                    }, !1);
                    console[p](c);
                    l = a ? this.streamHandlers.onClose : this.completionsHandlers.onFinish;
                    B.onInterceptorError(e, c, l);
                  } else this.generateRespByType(e, r[d], !!this.stream, n);
                } catch (c) {
                  this.unloadChat(c);
                }
              case 2:
                return _context45.a(2);
            }
          }, _callee45, this);
        }));
        function generateResp(_x97, _x98, _x99) {
          return _generateResp.apply(this, arguments);
        }
        return generateResp;
      }()
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee46(e, t) {
          var n, s;
          return _regenerator().w(function (_context46) {
            while (1) switch (_context46.n) {
              case 0:
                if (this._isModelLoaded) {
                  _context46.n = 3;
                  break;
                }
                if (!this._loadOnFirstMessage) {
                  _context46.n = 2;
                  break;
                }
                _context46.n = 1;
                return this.init();
              case 1:
                _context46.n = 3;
                break;
              case 2:
                return _context46.a(2);
              case 3:
                !Q.chat || this._isModelLoading || ((n = this._webModel.introMessage) != null && n.removeAfterMessage && ((s = this._removeIntro) == null || s.call(this)), e.addLoadingMessage(), this.generateResp(e, t, Q.chat));
              case 4:
                return _context46.a(2);
            }
          }, _callee46, this);
        }));
        function callServiceAPI(_x100, _x101) {
          return _callServiceAPI2.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }, {
      key: "canSubmit",
      value: function canSubmit(e) {
        return !(e != null && e.trim()) || this._isModelLoading ? !1 : this._loadOnFirstMessage ? !0 : !!this._isModelLoaded;
      }
    }, {
      key: "isWebModel",
      value: function isWebModel() {
        return !0;
      }
    }], [{
      key: "setUpHistory",
      value: function setUpHistory(e, t) {
        t.forEach(function (n, s) {
          if (n[A] === $ && n[d]) {
            var r = t[s + 1];
            r != null && r[d] && r[A] !== $ && (e.push({
              role: "user",
              content: n[d]
            }), e.push({
              role: "assistant",
              content: r[d]
            }));
          }
        });
      }
    }, {
      key: "processResponse",
      value: function () {
        var _processResponse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee47(e, t, n) {
          var a, c, s, r, o, h, _t35;
          return _regenerator().w(function (_context47) {
            while (1) switch (_context47.n) {
              case 0:
                _context47.n = 1;
                return (a = e.responseInterceptor) == null ? void 0 : a.call(e, n);
              case 1:
                _t35 = _context47.v;
                if (_t35) {
                  _context47.n = 2;
                  break;
                }
                _t35 = n;
              case 2:
                s = _t35;
                if (!((c = e.connect) != null && c.stream && Array.isArray(s) && s.length > 1)) {
                  _context47.n = 3;
                  break;
                }
                console[p](oo);
                return _context47.a(2);
              case 3:
                r = Array.isArray(s) ? s : [s], o = r.find(function (l) {
                  return _typeof(l[p]) === ve;
                });
                if (!o) {
                  _context47.n = 4;
                  break;
                }
                B.displayError(t, new Error(o[p]));
                return _context47.a(2);
              case 4:
                if (!r.find(function (h) {
                  return !h || !h[d];
                })) {
                  _context47.n = 5;
                  break;
                }
                h = qo(n, !!e.responseInterceptor, s);
                B.displayError(t, new Error(h));
                return _context47.a(2);
              case 5:
                return _context47.a(2, r);
            }
          }, _callee47);
        }));
        function processResponse(_x102, _x103, _x104) {
          return _processResponse.apply(this, arguments);
        }
        return processResponse;
      }()
    }, {
      key: "clearAllCache",
      value: function clearAllCache() {
        hs.CACHE_SCOPES.forEach(function (e) {
          return Q.clearCache(e);
        });
      }
    }, {
      key: "clearCache",
      value: function clearCache(e) {
        caches.open(e).then(function (t) {
          t.keys().then(function (n) {
            n.forEach(function (s) {
              t["delete"](s);
            });
          });
        });
      }
    }]);
  }(gn);
Q.GENERIC_ERROR = "Error, please check the [troubleshooting](".concat(X, "webModel#troubleshooting) section of documentation for help."), Q.MULTIPLE_MODELS_ERROR = "Cannot run multiple web models", Q.WEB_LLM_NOT_FOUND_ERROR = "WebLLM module not found", Q.DEFAULT_MODEL = "Llama-3.2-1B-Instruct-q4f16_1-MLC", Q.MODULE_SEARCH_LIMIT_S = 5;
var ds = Q;
var ue = function ue(i, e, t, n) {
    return {
      url: i,
      method: e,
      handleVerificationResult: t,
      augmentUrl: n
    };
  },
  Jc = function Jc(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  Qc = function Qc(i, e, t, n) {
    var s = i;
    Array.isArray(s[p]) && s[p][0] === "Error in `parameters`: field required" ? t(e) : n(de);
  },
  el = function el() {
    return ue("https://api-inference.huggingface.co/models/gpt2", Pe, Qc);
  },
  es = /*#__PURE__*/function (_M) {
    // prettier-ignore
    function es(e, t, n, s, r, o) {
      var _this22;
      _classCallCheck(this, es);
      _this22 = _callSuper(this, es, [e, el(), Jc, r, o]), _this22.insertKeyPlaceholderText = "Hugging Face Token", _this22.keyHelpUrl = "https://huggingface.co/settings/tokens", _this22.permittedErrorPrefixes = [Qi], _this22.url = "".concat(es.URL_PREFIX).concat(n), _this22.textInputPlaceholderText = t, _typeof(s) == "object" && (s.model && (_this22.url = "".concat(es.URL_PREFIX).concat(s.model)), s.options && (_this22.rawBody.options = s.options), s.parameters && (_this22.rawBody.parameters = s.parameters));
      return _this22;
    }
    _inherits(es, _M);
    return _createClass(es, [{
      key: "preprocessBody",
      value: function preprocessBody(e, t, n) {
        var _s$options;
        var s = w(e),
          r = t[t.length - 1][d];
        if (r) return (_s$options = s.options) !== null && _s$options !== void 0 ? _s$options : s.options = {}, s.options.wait_for_model = !0, _objectSpread({
          inputs: r
        }, s);
      }
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee48(e, t, n) {
          var s;
          return _regenerator().w(function (_context48) {
            while (1) switch (_context48.n) {
              case 0:
                if (this.connectSettings) {
                  _context48.n = 1;
                  break;
                }
                throw new Error(qe);
              case 1:
                s = this.preprocessBody(this.rawBody, t, n);
                _e.request(this, s, e);
              case 2:
                return _context48.a(2);
            }
          }, _callee48, this);
        }));
        function callServiceAPI(_x105, _x106, _x107) {
          return _callServiceAPI3.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }]);
  }(M);
es.URL_PREFIX = "https://api-inference.huggingface.co/models/";
var Dt = es;
var Es = /*#__PURE__*/function (_Dt) {
  // prettier-ignore
  function Es(e, t, n, s, r, o) {
    var _this23;
    _classCallCheck(this, Es);
    _this23 = _callSuper(this, Es, [e, t, n, s, r, o]), _this23.isTextInputDisabled = !0, _this23.canSendMessage = Es.canSendFile;
    return _this23;
  }
  _inherits(Es, _Dt);
  return _createClass(Es, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t, n) {
      return n[0];
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee49(e, t, n) {
        return _regenerator().w(function (_context49) {
          while (1) switch (_context49.n) {
            case 0:
              if (this.connectSettings) {
                _context49.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (n != null && n[0]) {
                _context49.n = 2;
                break;
              }
              throw new Error(ai);
            case 2:
              _e.poll(this, n[0], e, !1);
            case 3:
              return _context49.a(2);
          }
        }, _callee49, this);
      }));
      function callServiceAPI(_x108, _x109, _x110) {
        return _callServiceAPI4.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }], [{
    key: "canSendFile",
    value: function canSendFile(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(Dt);
var tl = /*#__PURE__*/function (_Es) {
  // prettier-ignore
  function tl(e) {
    _classCallCheck(this, tl);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.audioClassification,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, tl, [e, "Attach an audio ".concat(ne), "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition", t, n, {
      audio: {}
    }]);
  }
  _inherits(tl, _Es);
  return _createClass(tl, [{
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee50(e) {
        var t;
        return _regenerator().w(function (_context50) {
          while (1) switch (_context50.n) {
            case 0:
              if (!e.estimated_time) {
                _context50.n = 1;
                break;
              }
              return _context50.a(2, {
                timeoutMS: (e.estimated_time + 1) * 1e3
              });
            case 1:
              if (!e[p]) {
                _context50.n = 2;
                break;
              }
              throw e[p];
            case 2:
              return _context50.a(2, _defineProperty({}, d, ((t = e[0]) == null ? void 0 : t.label) || ""));
          }
        }, _callee50);
      }));
      function extractPollResultData(_x111) {
        return _extractPollResultData.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(Es);
var nl = /*#__PURE__*/function (_Es2) {
  function nl(e) {
    _classCallCheck(this, nl);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.imageClassification,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, nl, [e, "Attach an image ".concat(ne), "google/vit-base-patch16-224", t, n, {
      images: {}
    }]);
  }
  _inherits(nl, _Es2);
  return _createClass(nl, [{
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee51(e) {
        var t;
        return _regenerator().w(function (_context51) {
          while (1) switch (_context51.n) {
            case 0:
              if (!e.estimated_time) {
                _context51.n = 1;
                break;
              }
              return _context51.a(2, {
                timeoutMS: (e.estimated_time + 1) * 1e3
              });
            case 1:
              if (!e[p]) {
                _context51.n = 2;
                break;
              }
              throw e[p];
            case 2:
              return _context51.a(2, _defineProperty({}, d, ((t = e[0]) == null ? void 0 : t.label) || ""));
          }
        }, _callee51);
      }));
      function extractPollResultData(_x112) {
        return _extractPollResultData2.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(Es);
var ui = function ui(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  sl = function sl(i, e, t, n) {
    i.message ? n(de) : t(e);
  },
  pi = function pi() {
    return ue("https://api.stability.ai/v1/engines/list", ge, sl);
  },
  Hn = "data:image/png;base64,";
var fi = /*#__PURE__*/function (_M2) {
  // prettier-ignore
  function fi(e, t, n, s, r) {
    var _this24;
    _classCallCheck(this, fi);
    _this24 = _callSuper(this, fi, [e, t, n, s, r]), _this24.insertKeyPlaceholderText = _this24.genereteAPIKeyName("Stability AI"), _this24.keyHelpUrl = "https://platform.stability.ai/docs/getting-started/authentication", _this24.permittedErrorPrefixes = [li, "invalid_"];
    return _this24;
  }
  _inherits(fi, _M2);
  return _createClass(fi);
}(M);
var Gs = /*#__PURE__*/function (_fi) {
  function Gs(e) {
    var _this25;
    _classCallCheck(this, Gs);
    var o;
    var t = w(e.directConnection),
      n = t == null ? void 0 : t.stabilityAI,
      s = {
        images: {
          files: {
            acceptedFormats: ".png",
            maxNumberOfFiles: 1
          }
        }
      };
    _this25 = _callSuper(this, Gs, [e, pi(), ui, n, s]), _this25.url = "https://api.stability.ai/v1/generation/esrgan-v1-x2plus/image-to-image/upscale", _this25.textInputPlaceholderText = "Describe image changes";
    var r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageUpscale;
    _typeof(r) == "object" && (r.engine_id && (_this25.url = "https://api.stability.ai/v1/generation/".concat(r.engine_id, "/image-to-image/upscale")), Gs.cleanConfig(r), Object.assign(_this25.rawBody, r)), _this25.canSendMessage = Gs.canSendFileMessage;
    return _this25;
  }
  _inherits(Gs, _fi);
  return _createClass(Gs, [{
    key: "createFormDataBody",
    value: function createFormDataBody(e, t) {
      var n = new FormData();
      return n.append(W, t), Object.keys(e).forEach(function (s) {
        n.append(s, String(e[s]));
      }), n;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee52(e, t, n) {
        var s;
        return _regenerator().w(function (_context52) {
          while (1) switch (_context52.n) {
            case 0:
              if (this.connectSettings) {
                _context52.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (n) {
                _context52.n = 2;
                break;
              }
              throw new Error(Ji);
            case 2:
              s = this.createFormDataBody(this.rawBody, n[0]);
              B.tempRemoveContentHeader(this.connectSettings, _e.request.bind(this, this, s, e), !1);
            case 3:
              return _context52.a(2);
          }
        }, _callee52, this);
      }));
      function callServiceAPI(_x113, _x114, _x115) {
        return _callServiceAPI5.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee53(e) {
        var t;
        return _regenerator().w(function (_context53) {
          while (1) switch (_context53.n) {
            case 0:
              if (!e.message) {
                _context53.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, R, "".concat(Hn).concat(n.base64)), y, W);
              });
              return _context53.a(2, _defineProperty({}, m, t));
          }
        }, _callee53);
      }));
      function extractResultData(_x116) {
        return _extractResultData2.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id;
    }
  }, {
    key: "canSendFileMessage",
    value: function canSendFileMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(fi);
var zs = /*#__PURE__*/function (_fi2) {
  function zs(e) {
    var _this26;
    _classCallCheck(this, zs);
    var o;
    var t = w(e.directConnection),
      n = t == null ? void 0 : t.stabilityAI,
      s = _defineProperty({}, ee, _defineProperty({}, m, {
        acceptedFormats: ".png",
        maxNumberOfFiles: 2
      }));
    _this26 = _callSuper(this, zs, [e, pi(), ui, n, s]), _this26.url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image/masking", _this26._maskSource = "MASK_IMAGE_WHITE", _this26.textInputPlaceholderText = "Describe image changes";
    var r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageMasking;
    _typeof(r) == "object" && (r.engine_id && (_this26.url = "https://api.stability.ai/v1/generation/".concat(r.engine_id, "/image-to-image/masking")), r.weight !== void 0 && r.weight !== null && (_this26._imageWeight = r.weight), r.mask_source !== void 0 && r.mask_source !== null && (_this26._maskSource = r.mask_source), zs.cleanConfig(r), Object.assign(_this26.rawBody, r)), _this26.canSendMessage = zs.canSendFileTextMessage;
    return _this26;
  }
  _inherits(zs, _fi2);
  return _createClass(zs, [{
    key: "createFormDataBody",
    value: function createFormDataBody(e, t, n, s) {
      var r = new FormData();
      return r.append("init_image", t), r.append("mask_source", String(this._maskSource)), r.append("mask_image", n), s && s !== "" && r.append("text_prompts[0][text]", s), this._imageWeight !== void 0 && this._imageWeight !== null && r.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach(function (o) {
        r.append(o, String(e[o]));
      }), r.get("weight") === void 0 && r.append("weight", String(1)), r;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee54(e, t, n) {
        var o, a, s, r;
        return _regenerator().w(function (_context54) {
          while (1) switch (_context54.n) {
            case 0:
              if (this.connectSettings) {
                _context54.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (!(!n || !n[0] || !n[1])) {
                _context54.n = 2;
                break;
              }
              throw new Error(Ji);
            case 2:
              s = (a = (o = t[t.length - 1]) == null ? void 0 : o[d]) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, n[0], n[1], s);
              B.tempRemoveContentHeader(this.connectSettings, _e.request.bind(this, this, r, e), !1);
            case 3:
              return _context54.a(2);
          }
        }, _callee54, this);
      }));
      function callServiceAPI(_x117, _x118, _x119) {
        return _callServiceAPI6.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee55(e) {
        var t;
        return _regenerator().w(function (_context55) {
          while (1) switch (_context55.n) {
            case 0:
              if (!e.message) {
                _context55.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, R, "".concat(Hn).concat(n.base64)), y, W);
              });
              return _context55.a(2, _defineProperty({}, m, t));
          }
        }, _callee55);
      }));
      function extractResultData(_x120) {
        return _extractResultData3.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id, delete e.weight;
    }
  }, {
    key: "canSendFileTextMessage",
    value: function canSendFileTextMessage(e, t) {
      return !!(t != null && t[0]) && !!(e && e.trim() !== "");
    }
  }]);
}(fi);
var il = /*#__PURE__*/function (_Es3) {
  function il(e) {
    _classCallCheck(this, il);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.audioSpeechRecognition,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, il, [e, "Attach an audio ".concat(ne), "facebook/wav2vec2-large-960h-lv60-self", t, n, {
      audio: {}
    }]);
  }
  _inherits(il, _Es3);
  return _createClass(il, [{
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee56(e) {
        return _regenerator().w(function (_context56) {
          while (1) switch (_context56.n) {
            case 0:
              if (!e.estimated_time) {
                _context56.n = 1;
                break;
              }
              return _context56.a(2, {
                timeoutMS: (e.estimated_time + 1) * 1e3
              });
            case 1:
              if (!e[p]) {
                _context56.n = 2;
                break;
              }
              throw e[p];
            case 2:
              return _context56.a(2, _defineProperty({}, d, e[d] || ""));
          }
        }, _callee56);
      }));
      function extractPollResultData(_x121) {
        return _extractPollResultData3.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(Es);
var rl = /*#__PURE__*/function (_Dt2) {
  function rl(e) {
    _classCallCheck(this, rl);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.textGeneration,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, rl, [e, "Once upon a time", "gpt2", t, n]);
  }
  _inherits(rl, _Dt2);
  return _createClass(rl, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee57(e) {
        var t;
        return _regenerator().w(function (_context57) {
          while (1) switch (_context57.n) {
            case 0:
              if (!e[p]) {
                _context57.n = 1;
                break;
              }
              throw e[p];
            case 1:
              return _context57.a(2, _defineProperty({}, d, ((t = e[0]) == null ? void 0 : t.generated_text) || ""));
          }
        }, _callee57);
      }));
      function extractResultData(_x122) {
        return _extractResultData4.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(Dt);
var ol = /*#__PURE__*/function (_Dt3) {
  function ol(e) {
    var _this27;
    _classCallCheck(this, ol);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.questionAnswer,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    _this27 = _callSuper(this, ol, [e, "Ask a question", "bert-large-uncased-whole-word-masking-finetuned-squad", t, n]), _this27.permittedErrorPrefixes = [Qi, "Error in"], _this27._context = t.context;
    return _this27;
  }
  _inherits(ol, _Dt3);
  return _createClass(ol, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][d];
      if (n) return {
        inputs: {
          question: n,
          context: this._context,
          options: {
            wait_for_model: !0
          }
        }
      };
    }
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee58(e) {
        return _regenerator().w(function (_context58) {
          while (1) switch (_context58.n) {
            case 0:
              if (!e[p]) {
                _context58.n = 1;
                break;
              }
              throw e[p];
            case 1:
              return _context58.a(2, _defineProperty({}, d, e.answer || ""));
          }
        }, _callee58);
      }));
      function extractResultData(_x123) {
        return _extractResultData5.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(Dt);
var al = /*#__PURE__*/function (_Dt4) {
  function al(e) {
    _classCallCheck(this, al);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.summarization,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, al, [e, "Insert text to summarize", "facebook/bart-large-cnn", t, n]);
  }
  _inherits(al, _Dt4);
  return _createClass(al, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee59(e) {
        var t;
        return _regenerator().w(function (_context59) {
          while (1) switch (_context59.n) {
            case 0:
              if (!e[p]) {
                _context59.n = 1;
                break;
              }
              throw e[p];
            case 1:
              return _context59.a(2, _defineProperty({}, d, ((t = e[0]) == null ? void 0 : t.summary_text) || ""));
          }
        }, _callee59);
      }));
      function extractResultData(_x124) {
        return _extractResultData6.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(Dt);
var cl = /*#__PURE__*/function (_Dt5) {
  function cl(e) {
    var _this28$maxMessages;
    var _this28;
    _classCallCheck(this, cl);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.conversation,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    _this28 = _callSuper(this, cl, [e, "Ask me anything!", "facebook/blenderbot-400M-distill", t, n]), (_this28$maxMessages = _this28.maxMessages) !== null && _this28$maxMessages !== void 0 ? _this28$maxMessages : _this28.maxMessages = -1;
    return _this28;
  }
  // prettier-ignore
  _inherits(cl, _Dt5);
  return _createClass(cl, [{
    key: "processMessagesI",
    value: function processMessagesI(e) {
      var t = e.filter(function (a) {
          return a[d];
        }),
        n = t[t.length - 1][d],
        s = t.slice(0, t.length - 1);
      if (!n) return;
      var r = s.filter(function (a) {
          return a[A] === $;
        }).map(function (a) {
          return a[d];
        }),
        o = s.filter(function (a) {
          return a[A] === te;
        }).map(function (a) {
          return a[d];
        });
      return {
        past_user_inputs: r,
        generated_responses: o,
        mostRecentMessageText: n
      };
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var _n$options;
      var n = w(e),
        s = this.processMessagesI(t);
      if (s) return (_n$options = n.options) !== null && _n$options !== void 0 ? _n$options : n.options = {}, n.options.wait_for_model = !0, _objectSpread({
        inputs: _defineProperty({
          past_user_inputs: s.past_user_inputs,
          generated_responses: s.generated_responses
        }, d, s.mostRecentMessageText)
      }, n);
    }
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee60(e) {
        return _regenerator().w(function (_context60) {
          while (1) switch (_context60.n) {
            case 0:
              if (!e[p]) {
                _context60.n = 1;
                break;
              }
              throw e[p];
            case 1:
              return _context60.a(2, _defineProperty({}, d, e.generated_text || ""));
          }
        }, _callee60);
      }));
      function extractResultData(_x125) {
        return _extractResultData7.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(Dt);
var Vs = /*#__PURE__*/function (_fi3) {
  function Vs(e) {
    var _this29;
    _classCallCheck(this, Vs);
    var o;
    var t = w(e.directConnection),
      n = t.stabilityAI,
      s = _defineProperty({}, ee, _defineProperty({}, m, {
        acceptedFormats: ".png",
        maxNumberOfFiles: 1
      }));
    _this29 = _callSuper(this, Vs, [e, pi(), ui, n, s]), _this29.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image", _this29.textInputPlaceholderText = "Describe image changes";
    var r = (o = t.stabilityAI) == null ? void 0 : o.imageToImage;
    _typeof(r) == "object" && (r.engine_id && (_this29.url = "https://api.stability.ai/v1/generation/".concat(r.engine_id, "/text-to-image")), r.weight !== void 0 && r.weight !== null && (_this29._imageWeight = r.weight), Vs.cleanConfig(r), Object.assign(_this29.rawBody, r)), _this29.canSendMessage = Vs.canSendFileTextMessage;
    return _this29;
  }
  _inherits(Vs, _fi3);
  return _createClass(Vs, [{
    key: "createFormDataBody",
    value: function createFormDataBody(e, t, n) {
      var s = new FormData();
      return s.append("init_image", t), n && n !== "" && s.append("text_prompts[0][text]", n), this._imageWeight !== void 0 && this._imageWeight !== null && s.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach(function (r) {
        s.append(r, String(e[r]));
      }), s.get("weight") === void 0 && s.append("weight", String(1)), s;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee61(e, t, n) {
        var o, a, s, r;
        return _regenerator().w(function (_context61) {
          while (1) switch (_context61.n) {
            case 0:
              if (this.connectSettings) {
                _context61.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (n) {
                _context61.n = 2;
                break;
              }
              throw new Error(Ji);
            case 2:
              s = (a = (o = t[t.length - 1]) == null ? void 0 : o[d]) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, n[0], s);
              B.tempRemoveContentHeader(this.connectSettings, _e.request.bind(this, this, r, e), !1);
            case 3:
              return _context61.a(2);
          }
        }, _callee61, this);
      }));
      function callServiceAPI(_x126, _x127, _x128) {
        return _callServiceAPI7.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee62(e) {
        var t;
        return _regenerator().w(function (_context62) {
          while (1) switch (_context62.n) {
            case 0:
              if (!e.message) {
                _context62.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, R, "".concat(Hn).concat(n.base64)), y, W);
              });
              return _context62.a(2, _defineProperty({}, m, t));
          }
        }, _callee62);
      }));
      function extractResultData(_x129) {
        return _extractResultData8.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id, delete e.weight;
    }
  }, {
    key: "canSendFileTextMessage",
    value: function canSendFileTextMessage(e, t) {
      return !!(t != null && t[0]) && !!(e && e.trim() !== "");
    }
  }]);
}(fi);
var ll = /*#__PURE__*/function (_Dt6) {
  function ll(e) {
    _classCallCheck(this, ll);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.translation,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, ll, [e, "Insert text to translate", "Helsinki-NLP/opus-tatoeba-en-ja", t, n]);
  }
  _inherits(ll, _Dt6);
  return _createClass(ll, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee63(e) {
        var t;
        return _regenerator().w(function (_context63) {
          while (1) switch (_context63.n) {
            case 0:
              if (!e[p]) {
                _context63.n = 1;
                break;
              }
              throw e[p];
            case 1:
              return _context63.a(2, _defineProperty({}, d, ((t = e[0]) == null ? void 0 : t.translation_text) || ""));
          }
        }, _callee63);
      }));
      function extractResultData(_x130) {
        return _extractResultData9.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(Dt);
var qs = /*#__PURE__*/function (_fi4) {
  function qs(e) {
    var _this30;
    _classCallCheck(this, qs);
    var r;
    var t = w(e.directConnection),
      n = t.stabilityAI;
    _this30 = _callSuper(this, qs, [e, pi(), ui, n]), _this30.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", _this30.textInputPlaceholderText = "Describe an image";
    var s = (r = t.stabilityAI) == null ? void 0 : r.textToImage;
    _typeof(s) == "object" && (s.engine_id && (_this30.url = "https://api.stability.ai/v1/generation/".concat(s.engine_id, "/text-to-image")), s.weight !== void 0 && s.weight !== null && (_this30._imageWeight = s.weight), qs.cleanConfig(s), Object.assign(_this30.rawBody, s)), _this30.canSendMessage = qs.canSendTextMessage;
    return _this30;
  }
  _inherits(qs, _fi4);
  return _createClass(qs, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][d],
        s = w(e),
        r = _defineProperty({}, d, n);
      return this._imageWeight && (r.weight = this._imageWeight), s.text_prompts = [r], s;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee64(e, t) {
        return _regenerator().w(function (_context64) {
          while (1) switch (_context64.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
            case 1:
              return _context64.a(2);
          }
        }, _callee64, this);
      }));
      function callServiceAPI(_x131, _x132) {
        return _callServiceAPI8.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee65(e) {
        var t;
        return _regenerator().w(function (_context65) {
          while (1) switch (_context65.n) {
            case 0:
              if (!e.message) {
                _context65.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, R, "".concat(Hn).concat(n.base64)), y, W);
              });
              return _context65.a(2, _defineProperty({}, m, t));
          }
        }, _callee65);
      }));
      function extractResultData(_x133) {
        return _extractResultData0.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id, delete e.weight;
    }
  }, {
    key: "canSendTextMessage",
    value: function canSendTextMessage(e) {
      return !!(e && e.trim() !== "");
    }
  }]);
}(fi);
var hl = /*#__PURE__*/function (_Dt7) {
  function hl(e) {
    var _this31;
    _classCallCheck(this, hl);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.fillMask,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    _this31 = _callSuper(this, hl, [e, "The goal of life is [MASK].", "bert-base-uncased", t, n]), _this31.permittedErrorPrefixes = [Qi, "No mask_token"];
    return _this31;
  }
  _inherits(hl, _Dt7);
  return _createClass(hl, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee66(e) {
        var t;
        return _regenerator().w(function (_context66) {
          while (1) switch (_context66.n) {
            case 0:
              if (!e[p]) {
                _context66.n = 1;
                break;
              }
              throw e[p];
            case 1:
              return _context66.a(2, _defineProperty({}, d, ((t = e[0]) == null ? void 0 : t.sequence) || ""));
          }
        }, _callee66);
      }));
      function extractResultData(_x134) {
        return _extractResultData1.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(Dt);
var ir = function ir(i) {
    return _defineProperty(_defineProperty({}, z, Y), ce, "".concat(Se).concat(i));
  },
  dl = function dl(i, e, t, n) {
    var s = i;
    s[p] ? s[p].message === ci ? n(de) : n(He) : t(e);
  },
  rr = function rr() {
    return ue("https://open.bigmodel.cn/api/paas/v4/models", ge, dl);
  };
var ul = /*#__PURE__*/function (_M3) {
  function ul(e) {
    var _o$model, _a$voice;
    var _this32;
    _classCallCheck(this, ul);
    var r, o, a;
    var t = w(e.directConnection),
      n = t.bigModel;
    _this32 = _callSuper(this, ul, [e, rr(), ir, n]), _this32.insertKeyPlaceholderText = _this32.genereteAPIKeyName("BigModel"), _this32.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", _this32.url = "https://open.bigmodel.cn/api/paas/v4/audio/speech", _this32.permittedErrorPrefixes = [ce, Ae];
    var s = (r = t.bigModel) == null ? void 0 : r.textToSpeech;
    _typeof(s) === F && (_this32.cleanConfig(s), Object.assign(_this32.rawBody, s)), (_o$model = (o = _this32.rawBody).model) !== null && _o$model !== void 0 ? _o$model : o.model = "cogtts", (_a$voice = (a = _this32.rawBody).voice) !== null && _a$voice !== void 0 ? _a$voice : a.voice = "tongtong";
    return _this32;
  }
  _inherits(ul, _M3);
  return _createClass(ul, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.key;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = t[t.length - 1];
      return n.input = (s == null ? void 0 : s[d]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee67(e, t) {
        return _regenerator().w(function (_context67) {
          while (1) switch (_context67.n) {
            case 0:
              return _context67.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee67, this);
      }));
      function callServiceAPI(_x135, _x136) {
        return _callServiceAPI9.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee68(e) {
        var t, n;
        return _regenerator().w(function (_context68) {
          while (1) switch (_context68.n) {
            case 0:
              t = new Blob([e], _defineProperty({}, y, "audio/mpeg")), n = URL.createObjectURL(t);
              return _context68.a(2, _defineProperty({}, m, [_defineProperty(_defineProperty({}, R, n), y, j)]));
          }
        }, _callee68);
      }));
      function extractResultData(_x137) {
        return _extractResultData10.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var or = function or(i) {
    return _defineProperty(_defineProperty({}, z, Y), ce, "".concat(Se).concat(i));
  },
  pl = function pl(i, e, t, n) {
    var s = i;
    s[p] ? s[p].message === ci ? n(de) : n(He) : t(e);
  },
  ar = function ar() {
    return ue("https://api.together.xyz/v1/models", ge, pl);
  };
var fl = /*#__PURE__*/function (_M4) {
  function fl(e) {
    var _o$model2, _a$voice2;
    var _this33;
    _classCallCheck(this, fl);
    var r, o, a;
    var t = w(e.directConnection),
      n = t.together;
    _this33 = _callSuper(this, fl, [e, ar(), or, n]), _this33.insertKeyPlaceholderText = _this33.genereteAPIKeyName("Together AI"), _this33.keyHelpUrl = "https://api.together.xyz/settings/api-keys", _this33.url = "https://api.together.xyz/v1/audio/speech", _this33.permittedErrorPrefixes = [Je, Ae];
    var s = (r = t.together) == null ? void 0 : r.textToSpeech;
    _typeof(s) === F && _this33.completeConfig(s), (_o$model2 = (o = _this33.rawBody).model) !== null && _o$model2 !== void 0 ? _o$model2 : o.model = "cartesia/sonic", (_a$voice2 = (a = _this33.rawBody).voice) !== null && _a$voice2 !== void 0 ? _a$voice2 : a.voice = "laidback woman";
    return _this33;
  }
  _inherits(fl, _M4);
  return _createClass(fl, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = t[t.length - 1];
      return n.input = (s == null ? void 0 : s[d]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee69(e, t) {
        return _regenerator().w(function (_context69) {
          while (1) switch (_context69.n) {
            case 0:
              return _context69.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee69, this);
      }));
      function callServiceAPI(_x138, _x139) {
        return _callServiceAPI0.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee70(e) {
        var t, n;
        return _regenerator().w(function (_context70) {
          while (1) switch (_context70.n) {
            case 0:
              t = new Blob([e], _defineProperty({}, y, "audio/mpeg")), n = URL.createObjectURL(t);
              return _context70.a(2, _defineProperty({}, m, [_defineProperty(_defineProperty({}, R, n), y, j)]));
          }
        }, _callee70);
      }));
      function extractResultData(_x140) {
        return _extractResultData11.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var ct = "https://api.openai.com/v1/",
  vs = "https://platform.openai.com/account/api-keys",
  Bi = "input_text",
  Gr = "input_image",
  zr = "output_text",
  xi = "image_generation_call",
  So = "function_call_output",
  xn = "response",
  _s = function _s(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  Ao = function Ao(i, e, t, n) {
    var s = i;
    s[p] ? s[p].code === "invalid_api_key" ? n(de) : n(He) : t(e);
  },
  Ss = function Ss() {
    return ue("".concat(ct, "models"), ge, Ao);
  },
  Vr = /*#__PURE__*/function () {
    var _ref58 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee71(i, e, t) {
      var n,
        s,
        r,
        o,
        a,
        c,
        _yield$B$processReque6,
        l,
        h,
        u,
        g,
        b,
        _args71 = arguments;
      return _regenerator().w(function (_context71) {
        while (1) switch (_context71.n) {
          case 0:
            n = _args71.length > 3 && _args71[3] !== undefined ? _args71[3] : !0;
            s = i.connectSettings, r = i.deepChat, o = i.completionsHandlers, a = i.messages;
            s.method = t;
            c = {
              body: e,
              headers: s.headers
            };
            _context71.n = 1;
            return B.processRequestInterceptor(r, c);
          case 1:
            _yield$B$processReque6 = _context71.v;
            l = _yield$B$processReque6.body;
            h = _yield$B$processReque6.headers;
            u = _yield$B$processReque6.error;
            g = o.onFinish;
            if (!(u && a)) {
              _context71.n = 2;
              break;
            }
            return _context71.a(2, B.onInterceptorError(a, u, g));
          case 2:
            _context71.n = 3;
            return B.fetch(i, h, n, l).then(function (v) {
              return B.processResponseByType(v);
            });
          case 3:
            b = _context71.v;
            if (!b[p]) {
              _context71.n = 4;
              break;
            }
            throw b[p].message;
          case 4:
            return _context71.a(2, b);
        }
      }, _callee71);
    }));
    return function Vr(_x141, _x142, _x143) {
      return _ref58.apply(this, arguments);
    };
  }(),
  ml = "sts-session-started",
  gl = "sts-session-stopped";
var me = /*#__PURE__*/function () {
  function me() {
    _classCallCheck(this, me);
  }
  return _createClass(me, null, [{
    key: "addAttributes",
    value: function addAttributes(e) {
      e[A] = "button", e.setAttribute("tabindex", "0");
    }
  }, {
    key: "addAriaBusy",
    value: function addAriaBusy(e) {
      e.setAttribute("aria-busy", "true");
    }
  }, {
    key: "removeAriaBusy",
    value: function removeAriaBusy(e) {
      e.removeAttribute("aria-busy");
    }
  }, {
    key: "addAriaDisabled",
    value: function addAriaDisabled(e) {
      e.setAttribute("aria-".concat(H), "true");
    }
  }, {
    key: "removeAriaDisabled",
    value: function removeAriaDisabled(e) {
      e.removeAttribute("aria-".concat(H));
    }
  }, {
    key: "removeAriaAttributes",
    value: function removeAriaAttributes(e) {
      me.removeAriaBusy(e), me.removeAriaDisabled(e);
    }
  }]);
}();
var xo = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<svg height=\"1.4em\" width=\"1.4em\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n\t viewBox=\"0 0 490.9 490.9\" xml:space=\"preserve\">\n\t<g>\n\t\t<g>\n\t\t\t<path d=\"M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5\n\t\t\t\tC149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5\n\t\t\t\tc0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z\"/>\n\t\t\t<path d=\"M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3\n\t\t\t\ts5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8\n\t\t\t\tc0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9\n\t\t\t\tC106.6,220,101.2,214.5,94.4,214.5z\"/>\n\t\t</g>\n\t</g>\n</svg>\n",
  Xe = /*#__PURE__*/function () {
    function Xe() {
      _classCallCheck(this, Xe);
    }
    return _createClass(Xe, null, [{
      key: "createTextElement",
      value: function createTextElement(e) {
        var t = S();
        return t[f].add(Xe.INPUT_BUTTON_INNER_TEXT_CLASS), t.innerText = e, t;
      }
    }, {
      key: "tryAddSVGElement",
      value: function tryAddSVGElement(e, t, n, s) {
        n ? e.push(Bt.createSVGElement(n)) : n !== "" && s && e.push(t);
      }
    }, {
      key: "createCustomElements",
      value: function createCustomElements(e, t, n) {
        var c, l;
        var s = n == null ? void 0 : n[e],
          r = (c = s == null ? void 0 : s[d]) == null ? void 0 : c.content,
          o = (l = s == null ? void 0 : s[G]) == null ? void 0 : l.content,
          a = [];
        return Xe.tryAddSVGElement(a, t, o, r), r && a.push(Xe.createTextElement(r)), a.length > 0 ? a : void 0;
      }
    }, {
      key: "reassignClassBasedOnChildren",
      value: function reassignClassBasedOnChildren(e, t) {
        e[f].remove(Xe.INPUT_BUTTON_SVG_CLASS, Xe.INPUT_BUTTON_SVG_TEXT_CLASS), t.find(function (n) {
          return n[f].contains(Xe.INPUT_BUTTON_INNER_TEXT_CLASS);
        }) ? t.length > 1 && e[f].add(Xe.INPUT_BUTTON_SVG_TEXT_CLASS) : e[f].add(Xe.INPUT_BUTTON_SVG_CLASS);
      }
    }]);
  }();
Xe.INPUT_BUTTON_SVG_TEXT_CLASS = "input-button-svg-text", Xe.INPUT_BUTTON_INNER_TEXT_CLASS = "text-button", Xe.INPUT_BUTTON_SVG_CLASS = "input-button-svg";
var Ct = Xe;
var Wn = /*#__PURE__*/function () {
  function Wn() {
    _classCallCheck(this, Wn);
  }
  return _createClass(Wn, null, [{
    key: "parseSVGTextElements",
    value: function parseSVGTextElements(e) {
      return _defineProperty(_defineProperty({}, G, e.find(function (t) {
        return t.tagName.toLowerCase() === G;
      })), d, e.find(function (t) {
        return t.tagName.toLowerCase() === "div";
      }));
    }
  }]);
}();
var Ee = /*#__PURE__*/function () {
  function Ee() {
    _classCallCheck(this, Ee);
  }
  return _createClass(Ee, null, [{
    key: "unsetAllCSS",
    value: function unsetAllCSS(e, t) {
      var r, o;
      t.container && he.unsetAllCSSMouseStates(e, t.container);
      var _Wn$parseSVGTextEleme = Wn.parseSVGTextElements(Array.from(e.children)),
        n = _Wn$parseSVGTextEleme.svg,
        s = _Wn$parseSVGTextEleme.text;
      (r = t[G]) != null && r[T] && n && he.unsetAllCSSMouseStates(n, t[G][T]), (o = t[d]) != null && o[T] && s && he.unsetAllCSSMouseStates(s, t[d][T]);
    }
  }, {
    key: "unsetActionCSS",
    value: function unsetActionCSS(e, t) {
      var r, o;
      t.container && he.unsetActivityCSSMouseStates(e, t.container);
      var _Wn$parseSVGTextEleme2 = Wn.parseSVGTextElements(Array.from(e.children)),
        n = _Wn$parseSVGTextEleme2.svg,
        s = _Wn$parseSVGTextEleme2.text;
      (r = t[G]) != null && r[T] && n && he.unsetActivityCSSMouseStates(n, t[G][T]), (o = t[d]) != null && o[T] && s && he.unsetActivityCSSMouseStates(s, t[d][T]);
    }
  }, {
    key: "setElementsCSS",
    value: function setElementsCSS(e, t, n) {
      var o, a, c, l, h;
      Object.assign(e[E], (o = t.container) == null ? void 0 : o[n]);
      var _Wn$parseSVGTextEleme3 = Wn.parseSVGTextElements(Array.from(e.children)),
        s = _Wn$parseSVGTextEleme3.svg,
        r = _Wn$parseSVGTextEleme3.text;
      s && Object.assign(s[E], (c = (a = t[G]) == null ? void 0 : a[T]) == null ? void 0 : c[n]), r && Object.assign(r[E], (h = (l = t[d]) == null ? void 0 : l[T]) == null ? void 0 : h[n]);
    }
  }, {
    key: "setElementCssUpToState",
    value: function setElementCssUpToState(e, t, n) {
      Ee.setElementsCSS(e, t, x), n !== x && (Ee.setElementsCSS(e, t, De), n !== De && Ee.setElementsCSS(e, t, Z));
    }
  }]);
}();
var _n = /*#__PURE__*/function () {
  // prettier-ignore
  function _n(e, t, n, s, r, o) {
    _classCallCheck(this, _n);
    this._mouseState = {
      state: "default"
    }, this.isCustom = !1, me.addAttributes(e), this.elementRef = e, this[G] = Bt.createSVGElement(t), this.customStyles = r, this.position = ie.processPosition(n), this._tooltipSettings = s, this.dropupText = o;
  }
  return _createClass(_n, [{
    key: "buttonMouseLeave",
    value: function buttonMouseLeave(e) {
      var t;
      this._mouseState.state = x, ((t = this._activeTooltip) == null ? void 0 : t.element[E].visibility) === "visible" && this._tooltipSettings && yt.hide(this._activeTooltip, this._tooltipSettings), e && (Ee.unsetAllCSS(this.elementRef, e), Ee.setElementsCSS(this.elementRef, e, x));
    }
  }, {
    key: "buttonMouseEnter",
    value: function buttonMouseEnter(e) {
      var t;
      this._mouseState.state = De, this._tooltipSettings && (this._activeTooltip = yt.display(this.elementRef, this._tooltipSettings, (t = this._activeTooltip) == null ? void 0 : t.element)), e && Ee.setElementsCSS(this.elementRef, e, De);
    }
  }, {
    key: "buttonMouseUp",
    value: function buttonMouseUp(e) {
      e && Ee.unsetActionCSS(this.elementRef, e), this.buttonMouseEnter(e);
    }
  }, {
    key: "buttonMouseDown",
    value: function buttonMouseDown(e) {
      this._mouseState.state = Z, e && Ee.setElementsCSS(this.elementRef, e, Z);
    }
    // be careful not to use onclick as that is used for button functionality
  }, {
    key: "setEvents",
    value: function setEvents(e) {
      this.elementRef.onmousedown = this.buttonMouseDown.bind(this, e), this.elementRef.onmouseup = this.buttonMouseUp.bind(this, e), this.elementRef.onmouseenter = this.buttonMouseEnter.bind(this, e), this.elementRef.onmouseleave = this.buttonMouseLeave.bind(this, e);
    }
  }, {
    key: "unsetCustomStateStyles",
    value: function unsetCustomStateStyles(e) {
      if (this.customStyles) for (var t = 0; t < e.length; t += 1) {
        var _n2 = e[t],
          s = _n2 && this.customStyles[_n2];
        s && Ee.unsetActionCSS(this.elementRef, s);
      }
    }
  }, {
    key: "reapplyStateStyle",
    value: function reapplyStateStyle(e, t) {
      if (!this.customStyles) return;
      t && this.unsetCustomStateStyles(t);
      var n = this.customStyles[e];
      n && Ee.setElementCssUpToState(this.elementRef, n, this._mouseState.state), this.setEvents(n);
    }
  }, {
    key: "changeElementsByState",
    value: function changeElementsByState(e) {
      var _this$elementRef;
      (_this$elementRef = this.elementRef).replaceChildren.apply(_this$elementRef, _toConsumableArray(e)), Ct.reassignClassBasedOnChildren(this.elementRef, e);
    }
  }, {
    key: "buildDefaultIconElement",
    value: function buildDefaultIconElement(e) {
      var t = this[G].cloneNode(!0);
      return t.id = e, [t];
    }
  }, {
    key: "createInnerElements",
    value: function createInnerElements(e, t, n) {
      var s = Ct.createCustomElements(t, this[G], n);
      if (s && s.length > 0) {
        if (this.position === st) {
          var r = s[0].cloneNode(!0);
          r.id = s[0] === this[G] ? e : "dropup-menu-item-icon-element-custom", s[0] = r;
        }
        return s;
      }
      return this.buildDefaultIconElement(e);
    }
  }]);
}();
var ri = /*#__PURE__*/function (_n3) {
  function ri(e) {
    var _this34;
    _classCallCheck(this, ri);
    var n, s;
    var t = ((s = (n = e == null ? void 0 : e[x]) == null ? void 0 : n[G]) == null ? void 0 : s.content) || ri.EMPTY_SVG;
    _this34 = _callSuper(this, ri, [S(), t, void 0, void 0, e]), _this34.isActive = !1, _this34._innerElements = _this34.createInnerElementsForStates(_this34.customStyles), _this34.changeToDefault();
    return _this34;
  }
  _inherits(ri, _n3);
  return _createClass(ri, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      return _defineProperty(_defineProperty(_defineProperty({}, x, this.createInnerButtonElements(x, e)), U, this.createInnerButtonElements(U, e)), Ht, this.createInnerButtonElements(Ht, e));
    }
  }, {
    key: "createInnerButtonElements",
    value: function createInnerButtonElements(e, t) {
      return Ct.createCustomElements(e, this[G], t) || [this[G]];
    }
  }, {
    key: "changeState",
    value: function changeState(e) {
      this.changeElementsByState(e), this.elementRef[f].replace(Ct.INPUT_BUTTON_SVG_CLASS, "deep-chat-openai-realtime-button");
    }
  }, {
    key: "changeToActive",
    value: function changeToActive() {
      this.changeState(this._innerElements[U]), this.reapplyStateStyle(U, [Ht, x]), this.isActive = !0;
    }
  }, {
    key: "changeToDefault",
    value: function changeToDefault() {
      var e, t, n, s;
      this.changeState(this._innerElements[x]), (e = this.customStyles) != null && e[U] && Ee.unsetAllCSS(this.elementRef, (t = this.customStyles) == null ? void 0 : t[U]), (n = this.customStyles) != null && n[Ht] && Ee.unsetAllCSS(this.elementRef, (s = this.customStyles) == null ? void 0 : s[Ht]), this.reapplyStateStyle(x, [U, Ht]), this.isActive = !1;
    }
  }, {
    key: "changeToUnavailable",
    value: function changeToUnavailable() {
      var e, t, n, s;
      this.changeState(this._innerElements[Ht]), (e = this.customStyles) != null && e[U] && Ee.unsetAllCSS(this.elementRef, (t = this.customStyles) == null ? void 0 : t[U]), (n = this.customStyles) != null && n[x] && Ee.unsetAllCSS(this.elementRef, (s = this.customStyles) == null ? void 0 : s[x]), this.reapplyStateStyle(Ht, [x, U]), this.isActive = !1;
    }
  }]);
}(_n);
ri.EMPTY_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>';
var Ks = ri;
var ke = /*#__PURE__*/function () {
  function ke() {
    _classCallCheck(this, ke);
  }
  return _createClass(ke, null, [{
    key: "setPropertyValueIfDoesNotExist",
    value: function setPropertyValueIfDoesNotExist(e, t, n) {
      var _e$s, _e$s2;
      var s = t[0];
      t.length === 1 ? (_e$s = e[s]) !== null && _e$s !== void 0 ? _e$s : e[s] = n : ((_e$s2 = e[s]) !== null && _e$s2 !== void 0 ? _e$s2 : e[s] = {}, t.shift(), ke.setPropertyValueIfDoesNotExist(e[s], t, n));
    }
  }, {
    key: "setPropertyValue",
    value: function setPropertyValue(e, t, n) {
      var _e$s3;
      var s = t[0];
      t.length === 1 ? e[s] = n : ((_e$s3 = e[s]) !== null && _e$s3 !== void 0 ? _e$s3 : e[s] = {}, t.shift(), ke.setPropertyValue(e[s], t, n));
    }
  }, {
    key: "getObjectValue",
    value: function getObjectValue(e, t) {
      var n = t[0],
        s = e[n];
      return s === void 0 || t.length === 1 ? s : ke.getObjectValue(s, t.slice(1));
    }
  }, {
    key: "overwritePropertyObjectFromAnother",
    value: function overwritePropertyObjectFromAnother(e, t, n) {
      var s = ke.getObjectValue(t, n);
      if (s) {
        var r = _objectSpread(_objectSpread({}, s), ke.getObjectValue(e, n) || {});
        ke.setPropertyValue(e, n, r);
      }
    }
  }, {
    key: "isJson",
    value: function isJson(e) {
      try {
        return ae(e), !0;
      } catch (_unused7) {
        return !1;
      }
    }
    // prettier-ignore
  }, {
    key: "assignPropertyFromOneToAnother",
    value: function assignPropertyFromOneToAnother(e, t, n) {
      var _t$e;
      (_t$e = t[e]) !== null && _t$e !== void 0 ? _t$e : t[e] = {}, Object.assign(t[e], n == null ? void 0 : n[e]);
    }
  }]);
}();
var wo = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z\"></path>\n</svg>",
  Di = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z\"></path>\n</svg>",
  J = /*#__PURE__*/function (_M5) {
    function J(e) {
      var _l$model;
      var _this35;
      _classCallCheck(this, J);
      var r, o, a, c, l;
      var t = w(e.directConnection),
        n = J.getKey(e);
      _this35 = _callSuper(this, J, [e, Ss(), _s, {
        key: n
      }]), _this35.insertKeyPlaceholderText = _this35.genereteAPIKeyName("OpenAI"), _this35.keyHelpUrl = vs, _this35._microphoneButton = null, _this35._toggleButton = null, _this35._errorElement = null, _this35._loadingElement = null, _this35._pc = null, _this35._mediaStream = null, _this35._isMuted = !1;
      var s = (r = t.openAI) == null ? void 0 : r.realtime;
      if (_typeof(s) === F) {
        _this35._avatarConfig = s.avatar, _this35._ephemeralKey = s.ephemeralKey, _this35._errorConfig = s[p], _this35._loadingConfig = s.loading, Object.assign(_this35.rawBody, s.config);
        var h = (a = (o = e.directConnection) == null ? void 0 : o.openAI) == null ? void 0 : a.realtime,
          _ref61 = h.config || {},
          u = _ref61.function_handler;
        u && (_this35._functionHandlerI = u), _this35._events = s.events, h.methods = _this35.generateMethods(), _this35.setInputAudioTranscribe(e, (c = h.config) == null ? void 0 : c.input_audio_transcription), delete _this35.rawBody.input_audio_transcription;
      }
      (_l$model = (l = _this35.rawBody).model) !== null && _l$model !== void 0 ? _l$model : l.model = "gpt-realtime-2", _this35._avatarConfig = J.buildAvatarConfig(s), _this35._buttonsConfig = J.buildButtonsConfig(s), _this35._avatarEl = J.createAvatar(_this35._avatarConfig), _this35._containerEl = _this35.createContainer(), _this35._deepChat = e;
      return _this35;
    }
    _inherits(J, _M5);
    return _createClass(J, [{
      key: "setInputAudioTranscribe",
      value:
      // https://community.openai.com/t/unable-to-access-user-audio-transcript-in-realtime-api/1001570/3
      function setInputAudioTranscribe(e, t) {
        if (t) {
          var _n4 = "whisper-1";
          this.rawBody.audio = {
            input: {
              transcription: _typeof(t) == "object" ? {
                model: t.model || _n4,
                language: t.language,
                prompt: t.prompt
              } : {
                model: _n4
              }
            }
          };
        } else e.onMessage && (console.warn("To get user audio transcription, set `input_audio_transcription` in the `realtime` config."), console.warn("See: ".concat(X, "directConnection/OpenAI/OpenAIRealtime#OpenAIRealtimeConfig")));
      }
      // called after API key was inserted
    }, {
      key: "setUpView",
      value: function setUpView(e, t) {
        e[E].display = "none", t.appendChild(this._containerEl), this.setup();
      }
    }, {
      key: "setup",
      value: function () {
        var _setup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee72() {
          var s, e, t, n;
          return _regenerator().w(function (_context72) {
            while (1) switch (_context72.n) {
              case 0:
                e = (s = this._deepChat.directConnection) == null ? void 0 : s.openAI;
                if (e) {
                  _context72.n = 1;
                  break;
                }
                return _context72.a(2);
              case 1:
                t = e == null ? void 0 : e.realtime;
                if (!(_typeof(t) != "object" || !t.autoStart && !t.autoFetchEphemeralKey)) {
                  _context72.n = 2;
                  break;
                }
                return _context72.a(2);
              case 2:
                n = this.key || e.key;
                (t.fetchEphemeralKey || n) && t.autoStart && (this.changeToUnavailable(), this.displayLoading()), this.fetchEphemeralKey(t.autoStart);
              case 3:
                return _context72.a(2);
            }
          }, _callee72, this);
        }));
        function setup() {
          return _setup.apply(this, arguments);
        }
        return setup;
      }()
    }, {
      key: "fetchEphemeralKey",
      value: function () {
        var _fetchEphemeralKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee73(e) {
          var o, t, n, s, r, a, _t36, _t37, _t38;
          return _regenerator().w(function (_context73) {
            while (1) switch (_context73.p = _context73.n) {
              case 0:
                t = (o = this._deepChat.directConnection) == null ? void 0 : o.openAI, n = _typeof(t == null ? void 0 : t.realtime) == "object" ? t == null ? void 0 : t.realtime.fetchEphemeralKey : void 0, s = t == null ? void 0 : t.realtime, r = this.key || t.key;
                if (!(_typeof(s) == "object")) {
                  _context73.n = 8;
                  break;
                }
                if (this._ephemeralKey) {
                  _context73.n = 7;
                  break;
                }
                _context73.p = 1;
                if (!n) {
                  _context73.n = 3;
                  break;
                }
                a = n();
                a.then && (this._retrievingEphemeralKey = a);
                _context73.n = 2;
                return a;
              case 2:
                this._ephemeralKey = _context73.v;
                _context73.n = 5;
                break;
              case 3:
                _t36 = r;
                if (!_t36) {
                  _context73.n = 5;
                  break;
                }
                this._retrievingEphemeralKey = this.getEphemeralKey(r);
                _context73.n = 4;
                return this._retrievingEphemeralKey;
              case 4:
                this._ephemeralKey = _context73.v;
              case 5:
                _context73.n = 7;
                break;
              case 6:
                _context73.p = 6;
                _t37 = _context73.v;
                this.displayFailedToRetrieveEphemeralKey(_t37);
              case 7:
                this._ephemeralKey && (e ? this.init(this._ephemeralKey) : this.changeToAvailable());
                _context73.n = 12;
                break;
              case 8:
                if (!r) {
                  _context73.n = 12;
                  break;
                }
                _context73.p = 9;
                this._retrievingEphemeralKey = this.getEphemeralKey(r);
                _context73.n = 10;
                return this._retrievingEphemeralKey;
              case 10:
                this._ephemeralKey = _context73.v;
                e && this.init(this._ephemeralKey);
                _context73.n = 12;
                break;
              case 11:
                _context73.p = 11;
                _t38 = _context73.v;
                this.displayFailedToRetrieveEphemeralKey(_t38);
              case 12:
                return _context73.a(2);
            }
          }, _callee73, this, [[9, 11], [1, 6]]);
        }));
        function fetchEphemeralKey(_x144) {
          return _fetchEphemeralKey.apply(this, arguments);
        }
        return fetchEphemeralKey;
      }()
    }, {
      key: "getEphemeralKey",
      value: function () {
        var _getEphemeralKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee74(e) {
          return _regenerator().w(function (_context74) {
            while (1) switch (_context74.n) {
              case 0:
                _context74.n = 1;
                return fetch("".concat(ct, "realtime/client_secrets"), {
                  method: Pe,
                  body: ae({
                    session: _objectSpread(_defineProperty({}, y, "realtime"), this.rawBody)
                  }),
                  headers: _defineProperty(_defineProperty({}, z, Y), ce, "".concat(Se).concat(e))
                });
              case 1:
                _context74.n = 2;
                return _context74.v.json();
              case 2:
                return _context74.a(2, _context74.v.value);
            }
          }, _callee74, this);
        }));
        function getEphemeralKey(_x145) {
          return _getEphemeralKey.apply(this, arguments);
        }
        return getEphemeralKey;
      }()
    }, {
      key: "generateMethods",
      value: function generateMethods() {
        var _this36 = this;
        return {
          updateConfig: function updateConfig(e) {
            var t;
            (t = _this36._dc) == null || t.send(ae(_defineProperty(_defineProperty({}, y, "session.update"), "session", _objectSpread(_defineProperty({}, y, "realtime"), e))));
          },
          sendMessage: function sendMessage(e, t) {
            var n = t || rs,
              s = [_defineProperty(_defineProperty({}, y, n === rs || n === $ ? Bi : d), "text", e)],
              r = _defineProperty(_defineProperty(_defineProperty({}, A, n), y, "message"), "content", s);
            _this36.sendMessage(r);
          }
        };
      }
    }, {
      key: "createContainer",
      value: function createContainer() {
        var e = S();
        return e.id = "deep-chat-openai-realtime-container", e.appendChild(this.createAvatarContainer()), e.appendChild(this.createButtonsContainer()), e.appendChild(this.createError()), e;
      }
    }, {
      key: "createAvatarContainer",
      value: function createAvatarContainer() {
        var t, n;
        var e = S();
        return e.id = "deep-chat-openai-realtime-avatar-container", Object.assign(e[E], (n = (t = this._avatarConfig) == null ? void 0 : t[T]) == null ? void 0 : n.container), e.appendChild(this._avatarEl), e;
      }
    }, {
      key: "createButtonsContainer",
      value: function createButtonsContainer() {
        var s;
        var e = S();
        e.id = "deep-chat-openai-realtime-buttons-container", Object.assign(e[E], (s = this._buttonsConfig) == null ? void 0 : s.container), this._microphoneButton = this.createMicophoneButton();
        var t = J.createButtonContainer(this._microphoneButton.elementRef);
        this._toggleButton = this.createToggleButton();
        var n = J.createButtonContainer(this._toggleButton.elementRef);
        return e.appendChild(t), e.appendChild(n), e.appendChild(this.createLoading()), e;
      }
    }, {
      key: "createMicophoneButton",
      value: function createMicophoneButton() {
        var _this37 = this;
        var t;
        var e = new Ks((t = this._buttonsConfig) == null ? void 0 : t[ft]);
        return e.elementRef[f].add(J.BUTTON_DEFAULT, "deep-chat-openai-realtime-microphone"), V.assignButtonEvents(e.elementRef, function () {
          e.isActive ? (_this37.toggleMicorphone(!0), e.elementRef[f].replace(J.MICROPHONE_ACTIVE, J.BUTTON_DEFAULT), e.changeToDefault(), _this37._isMuted = !1) : (_this37.toggleMicorphone(!1), e.elementRef[f].replace(J.BUTTON_DEFAULT, J.MICROPHONE_ACTIVE), me.removeAriaAttributes(e.elementRef), e.changeToActive(), _this37._isMuted = !0);
        }), e;
      }
    }, {
      key: "toggleMicorphone",
      value: function toggleMicorphone(e) {
        var t;
        (t = this._mediaStream) == null || t.getAudioTracks().forEach(function (n) {
          return n.enabled = e;
        });
      }
    }, {
      key: "createToggleButton",
      value: function createToggleButton() {
        var _this38 = this;
        var t;
        var e = new Ks((t = this._buttonsConfig) == null ? void 0 : t.toggle);
        return e.elementRef[f].add(J.BUTTON_DEFAULT, "deep-chat-openai-realtime-toggle"), V.assignButtonEvents(e.elementRef, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee75() {
          var n, s, _t39, _t40;
          return _regenerator().w(function (_context75) {
            while (1) switch (_context75.p = _context75.n) {
              case 0:
                if (!e.isActive) {
                  _context75.n = 1;
                  break;
                }
                e.changeToDefault(), _this38.stop();
                _context75.n = 9;
                break;
              case 1:
                _context75.p = 1;
                if (!_this38._ephemeralKey) {
                  _context75.n = 3;
                  break;
                }
                _this38.displayLoading();
                _context75.n = 2;
                return _this38.init(_this38._ephemeralKey);
              case 2:
                _context75.n = 7;
                break;
              case 3:
                if (!_this38._retrievingEphemeralKey) {
                  _context75.n = 6;
                  break;
                }
                _this38.displayLoading();
                _context75.n = 4;
                return _this38._retrievingEphemeralKey;
              case 4:
                s = _context75.v;
                _t39 = (n = _this38._toggleButton) != null && n.isActive;
                if (!_t39) {
                  _context75.n = 5;
                  break;
                }
                _context75.n = 5;
                return _this38.init(s);
              case 5:
                _context75.n = 7;
                break;
              case 6:
                _this38.displayLoading();
                _context75.n = 7;
                return _this38.fetchEphemeralKey(!0);
              case 7:
                _context75.n = 9;
                break;
              case 8:
                _context75.p = 8;
                _t40 = _context75.v;
                console[p]("Failed to start conversation:", _t40), _this38.displayError(), _this38.hideLoading();
              case 9:
                return _context75.a(2);
            }
          }, _callee75, null, [[1, 8]]);
        }))), e;
      }
    }, {
      key: "init",
      value: function () {
        var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee78(e) {
          var _this39 = this;
          var t, n, s, r, o, a, c, l, _t43, _t44, _t45, _t46, _t47;
          return _regenerator().w(function (_context78) {
            while (1) switch (_context78.p = _context78.n) {
              case 0:
                t = new RTCPeerConnection();
                this._pc = t;
                n = S(j);
                n.autoplay = !0;
                s = new AudioContext(), r = s.createAnalyser();
                r.fftSize = 256;
                o = new Uint8Array(r.frequencyBinCount);
                this._pc.ontrack = /*#__PURE__*/function () {
                  var _ref64 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee76(a) {
                    var c, _t41;
                    return _regenerator().w(function (_context76) {
                      while (1) switch (_context76.n) {
                        case 0:
                          if (!a.streams[0]) {
                            _context76.n = 2;
                            break;
                          }
                          n.srcObject = a.streams[0];
                          c = s.createMediaStreamSource(a.streams[0]);
                          _t41 = s.state === "suspended";
                          if (!_t41) {
                            _context76.n = 1;
                            break;
                          }
                          _context76.n = 1;
                          return s.resume();
                        case 1:
                          c.connect(r);
                          _this39.monitorFrequencies(r, o);
                          _context76.n = 3;
                          break;
                        case 2:
                          console[p]("No streams found in the ontrack event."), _this39.displayError();
                        case 3:
                          return _context76.a(2);
                      }
                    }, _callee76);
                  }));
                  return function (_x147) {
                    return _ref64.apply(this, arguments);
                  };
                }();
                _context78.n = 1;
                return navigator.mediaDevices.getUserMedia({
                  audio: !0
                }).then(function (a) {
                  var c;
                  t === _this39._pc && (_this39._mediaStream = a, (c = _this39._pc) == null || c.addTrack(_this39._mediaStream.getTracks()[0]), _this39._isMuted && _this39.toggleMicorphone(!1));
                })["catch"](function (a) {
                  console[p]("Error accessing microphone:", a), _this39.displayError();
                });
              case 1:
                this._dc = this._pc.createDataChannel("oai-events");
                this._dc.addEventListener("message", /*#__PURE__*/function () {
                  var _ref65 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee77(a) {
                    var l, h, u, c, b, v, _, _t42;
                    return _regenerator().w(function (_context77) {
                      while (1) switch (_context77.p = _context77.n) {
                        case 0:
                          c = JSON.parse(a.data);
                          if (!(c[y] === "session.created")) {
                            _context77.n = 1;
                            break;
                          }
                          _this39.removeUnavailable(), _this39._toggleButton && (me.removeAriaAttributes(_this39._toggleButton.elementRef), _this39._toggleButton.changeToActive()), (h = (l = _this39._events) == null ? void 0 : l.started) == null || h.call(l), _this39._deepChat.dispatchEvent(new CustomEvent(ml)), _this39.hideLoading();
                          _context77.n = 7;
                          break;
                        case 1:
                          if (!(c[y] === "response.done")) {
                            _context77.n = 6;
                            break;
                          }
                          b = (u = JSON.parse(a.data).response.output) == null ? void 0 : u[0];
                          if (!((b == null ? void 0 : b[y]) === Ms)) {
                            _context77.n = 5;
                            break;
                          }
                          v = b.name, _ = b.call_id;
                          _context77.p = 2;
                          _context77.n = 3;
                          return _this39.handleTool(v, b.arguments, _);
                        case 3:
                          _context77.n = 5;
                          break;
                        case 4:
                          _context77.p = 4;
                          _t42 = _context77.v;
                          _this39.stopOnError(_t42);
                        case 5:
                          _context77.n = 7;
                          break;
                        case 6:
                          c[y] === p ? _this39.stopOnError(c[p].message) : c[y] === Je ? _this39.stopOnError(c.message) : c[y] === "response.output_audio_transcript.delta" || (c[y] === "response.output_audio_transcript.done" ? c.transcript && mn.onMessage(_this39._deepChat, _defineProperty(_defineProperty({}, A, te), d, c.transcript), !1) : c[y] === "conversation.item.input_audio_transcription.completed" && c.transcript && mn.onMessage(_this39._deepChat, _defineProperty(_defineProperty({}, A, $), d, c.transcript), !1));
                        case 7:
                          return _context77.a(2);
                      }
                    }, _callee77, null, [[2, 4]]);
                  }));
                  return function (_x148) {
                    return _ref65.apply(this, arguments);
                  };
                }());
                _context78.p = 2;
                _context78.n = 3;
                return this._pc.createOffer();
              case 3:
                a = _context78.v;
                _t43 = t !== this._pc;
                if (_t43) {
                  _context78.n = 5;
                  break;
                }
                _context78.n = 4;
                return this._pc.setLocalDescription(a);
              case 4:
                _t43 = t !== this._pc;
              case 5:
                if (!_t43) {
                  _context78.n = 6;
                  break;
                }
                return _context78.a(2);
              case 6:
                _context78.n = 7;
                return fetch("".concat(ct, "realtime/calls?model=").concat(this.rawBody.model), {
                  method: Pe,
                  body: a.sdp,
                  headers: _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(e)), z, "application/sdp")
                });
              case 7:
                c = _context78.v;
                if (!(t !== this._pc)) {
                  _context78.n = 8;
                  break;
                }
                return _context78.a(2);
              case 8:
                _t44 = _defineProperty;
                _t45 = _defineProperty({}, y, "answer");
                _context78.n = 9;
                return c[d]();
              case 9:
                l = _t44(_t45, "sdp", _context78.v);
                _t46 = t !== this._pc;
                if (_t46) {
                  _context78.n = 11;
                  break;
                }
                _context78.n = 10;
                return this._pc.setRemoteDescription(l);
              case 10:
                _t46 = t !== this._pc;
              case 11:
                if (!_t46) {
                  _context78.n = 12;
                  break;
                }
                return _context78.a(2);
              case 12:
                _context78.n = 14;
                break;
              case 13:
                _context78.p = 13;
                _t47 = _context78.v;
                console[p](_t47), this.displayError();
              case 14:
                return _context78.a(2);
            }
          }, _callee78, this, [[2, 13]]);
        }));
        function init(_x146) {
          return _init2.apply(this, arguments);
        }
        return init;
      }() // there is a bug where sometimes upon refreshing the browser too many times the frequencyData is all 0s
      // in such instance please wait and refresh at a later time
    }, {
      key: "monitorFrequencies",
      value: function monitorFrequencies(e, t) {
        var _this40 = this;
        var n = function (_n5) {
          function n() {
            return _n5.apply(this, arguments);
          }
          n.toString = function () {
            return _n5.toString();
          };
          return n;
        }(function () {
          var l;
          e.getByteFrequencyData(t);
          var s = t.reduce(function (h, u) {
              return h + u;
            }, 0),
            r = t.length * 255,
            o = s / r * 100,
            a = 1,
            c = a + o / 100 * (((l = _this40._avatarConfig) == null ? void 0 : l.maxScale) - a);
          _this40._avatarEl[E].transform = "scale(".concat(c, ")"), requestAnimationFrame(n);
        });
        n();
      }
    }, {
      key: "stopOnError",
      value: function stopOnError(e) {
        this.stop(), console[p](e), this.displayError();
      }
    }, {
      key: "stop",
      value: function stop() {
        var e, t, n;
        (e = this._mediaStream) == null || e.getTracks().forEach(function (s) {
          return s.stop();
        }), this._mediaStream = null, this._pc && (this._pc.close(), this._pc = null, (n = (t = this._events) == null ? void 0 : t.stopped) == null || n.call(t), this._deepChat.dispatchEvent(new CustomEvent(gl)), this._dc = void 0);
      }
    }, {
      key: "changeToUnavailable",
      value: function changeToUnavailable() {
        this._microphoneButton && J.changeButtonToUnavailable(this._microphoneButton), this._toggleButton && J.changeButtonToUnavailable(this._toggleButton);
      }
    }, {
      key: "changeToAvailable",
      value: function changeToAvailable() {
        this._microphoneButton && J.changeButtonToAvailable(this._microphoneButton), this._toggleButton && J.changeButtonToAvailable(this._toggleButton);
      }
    }, {
      key: "removeUnavailable",
      value: function removeUnavailable() {
        this._microphoneButton && J.removeButtonUnavailable(this._microphoneButton), this._toggleButton && J.removeButtonUnavailable(this._toggleButton);
      }
    }, {
      key: "createError",
      value: function createError() {
        var t;
        var e = S();
        return e.id = "deep-chat-openai-realtime-error", Object.assign(e[E], (t = this._errorConfig) == null ? void 0 : t[E]), this._errorElement = e, e;
      }
    }, {
      key: "displayFailedToRetrieveEphemeralKey",
      value: function displayFailedToRetrieveEphemeralKey(e) {
        console[p]("Failed to retrieve ephemeral key"), console[p](e), this.displayError();
      }
    }, {
      key: "displayError",
      value: function displayError() {
        var e;
        this._errorElement && (this._errorElement[E].display = "block", this._errorElement.textContent = ((e = this._errorConfig) == null ? void 0 : e[d]) || "Error", this.changeToUnavailable()), this.hideLoading();
      }
    }, {
      key: "createLoading",
      value: function createLoading() {
        var t, n;
        var e = S();
        return e.id = "deep-chat-openai-realtime-loading", this._loadingElement = e, (t = this._loadingConfig) != null && t[L] && (this._loadingElement.innerHTML = this._loadingConfig[L]), Object.assign(e[E], (n = this._loadingConfig) == null ? void 0 : n[E]), e[E].display = "none", e;
      }
    }, {
      key: "displayLoading",
      value: function displayLoading() {
        var e, t, n;
        this._toggleButton && (this._toggleButton.changeToActive(), this._toggleButton.elementRef[f].add(J.BUTTON_LOADING), me.removeAriaDisabled(this._toggleButton.elementRef), me.addAriaBusy(this._toggleButton.elementRef)), (typeof ((e = this._loadingConfig) == null ? void 0 : e.display) != "boolean" || this._loadingConfig.display) && this._loadingElement && (this._loadingElement[E].display = "block", (t = this._loadingConfig) != null && t[L] || (this._loadingElement.textContent = ((n = this._loadingConfig) == null ? void 0 : n[d]) || "Loading"));
      }
    }, {
      key: "hideLoading",
      value: function hideLoading() {
        this._toggleButton && (this._toggleButton.elementRef[f].remove(J.BUTTON_LOADING), me.removeAriaBusy(this._toggleButton.elementRef)), this._loadingElement && (this._loadingElement[E].display = "none");
      }
      // https://platform.openai.com/docs/guides/function-calling?api-mode=responses
    }, {
      key: "handleTool",
      value: function () {
        var _handleTool = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee79(e, t, n) {
          var s, r;
          return _regenerator().w(function (_context79) {
            while (1) switch (_context79.n) {
              case 0:
                if (this._functionHandlerI) {
                  _context79.n = 1;
                  break;
                }
                throw Error(bn);
              case 1:
                _context79.n = 2;
                return this._functionHandlerI({
                  name: e,
                  arguments: t
                });
              case 2:
                s = _context79.v;
                if (!(_typeof(s) != "object" || !ke.isJson(s))) {
                  _context79.n = 3;
                  break;
                }
                throw Error('The `function_handler` response must be a JSON object, e.g. {response: "My response"}');
              case 3:
                r = _defineProperty(_defineProperty(_defineProperty({}, y, So), "call_id", n), "output", ae(s));
                this.sendMessage(r);
              case 4:
                return _context79.a(2);
            }
          }, _callee79, this);
        }));
        function handleTool(_x149, _x150, _x151) {
          return _handleTool.apply(this, arguments);
        }
        return handleTool;
      }() // https://platform.openai.com/docs/api-reference/realtime-client-events/conversation/item/create
    }, {
      key: "sendMessage",
      value: function sendMessage(e) {
        if (!this._dc) return;
        var t = ae(_defineProperty(_defineProperty({}, y, "conversation.item.create"), "item", e));
        this._dc.send(t);
        var n = _defineProperty({}, y, "response.create");
        this._dc.send(ae(n));
      }
    }, {
      key: "isCustomView",
      value: function isCustomView() {
        return !0;
      }
    }], [{
      key: "getKey",
      value: function getKey(e) {
        var t = e.directConnection.openAI;
        if (t != null && t.key) return t.key;
        var n = t == null ? void 0 : t.realtime;
        if (_typeof(n) == "object" && (n.ephemeralKey || n.fetchEphemeralKey)) return "placeholder";
      }
    }, {
      key: "buildAvatarConfig",
      value: function buildAvatarConfig(e) {
        var t = _typeof(e) == "object" && e.avatar ? w(e.avatar) : {};
        return t.maxScale = t.maxScale && t.maxScale >= 1 ? t.maxScale : 2.5, t;
      }
    }, {
      key: "buildButtonsConfig",
      value: function buildButtonsConfig(e) {
        var _t$ft, _o$x, _a$G, _c$content, _t$toggle, _g$x, _b$G, _v$content, _$U, _C$G, _D$content;
        var n, s, r, o, a, c, l, h, u, g, b, v, _, C, D;
        var t = _typeof(e) == "object" && e.buttons ? w(e.buttons) : {};
        return (r = (s = (n = t[ft]) == null ? void 0 : n[x]) == null ? void 0 : s[d]) != null && r.content || ((_t$ft = t[ft]) !== null && _t$ft !== void 0 ? _t$ft : t[ft] = {}, (_o$x = (o = t[ft])[x]) !== null && _o$x !== void 0 ? _o$x : o[x] = {}, (_a$G = (a = t[ft][x])[G]) !== null && _a$G !== void 0 ? _a$G : a[G] = {}, (_c$content = (c = t[ft][x][G]).content) !== null && _c$content !== void 0 ? _c$content : c.content = xo), (u = (h = (l = t.toggle) == null ? void 0 : l[x]) == null ? void 0 : h[d]) != null && u.content || ((_t$toggle = t.toggle) !== null && _t$toggle !== void 0 ? _t$toggle : t.toggle = {}, (_g$x = (g = t.toggle)[x]) !== null && _g$x !== void 0 ? _g$x : g[x] = {}, (_b$G = (b = t.toggle[x])[G]) !== null && _b$G !== void 0 ? _b$G : b[G] = {}, (_v$content = (v = t.toggle[x][G]).content) !== null && _v$content !== void 0 ? _v$content : v.content = wo, (_$U = (_ = t.toggle)[U]) !== null && _$U !== void 0 ? _$U : _[U] = {}, (_C$G = (C = t.toggle[U])[G]) !== null && _C$G !== void 0 ? _C$G : C[G] = {}, (_D$content = (D = t.toggle[U][G]).content) !== null && _D$content !== void 0 ? _D$content : D.content = Di), t;
      }
    }, {
      key: "createAvatar",
      value: function createAvatar(e) {
        var n;
        var t = S("img");
        return t.id = "deep-chat-openai-realtime-avatar", Object.assign(t[E], (n = e == null ? void 0 : e[T]) == null ? void 0 : n[W]), t[R] = (e == null ? void 0 : e[R]) || Li, t;
      }
    }, {
      key: "createButtonContainer",
      value: function createButtonContainer(e) {
        var t = S();
        return t[f].add("deep-chat-openai-realtime-button-container"), t.appendChild(e), t;
      }
    }, {
      key: "changeButtonToUnavailable",
      value: function changeButtonToUnavailable(e) {
        e.elementRef[f].add(J.UNAVAILABLE), me.removeAriaBusy(e.elementRef), me.addAriaDisabled(e.elementRef), e.changeToUnavailable();
      }
    }, {
      key: "changeButtonToAvailable",
      value: function changeButtonToAvailable(e) {
        J.removeButtonUnavailable(e), e.changeToDefault();
      }
    }, {
      key: "removeButtonUnavailable",
      value: function removeButtonUnavailable(e) {
        me.removeAriaDisabled(e.elementRef), e.elementRef[f].remove(J.UNAVAILABLE);
      }
    }]);
  }(M);
J.BUTTON_DEFAULT = "deep-chat-openai-realtime-button-default", J.BUTTON_LOADING = "deep-chat-openai-realtime-button-loading", J.MICROPHONE_ACTIVE = "deep-chat-openai-realtime-microphone-active", J.UNAVAILABLE = "deep-chat-openai-realtime-button-unavailable";
var Fi = J;
var In = /*#__PURE__*/function (_M6) {
  function In(e) {
    var _o$model3, _a$voice3;
    var _this41;
    _classCallCheck(this, In);
    var r, o, a;
    var t = w(e.directConnection),
      n = t == null ? void 0 : t.openAI;
    _this41 = _callSuper(this, In, [e, Ss(), _s, n]), _this41.insertKeyPlaceholderText = _this41.genereteAPIKeyName("OpenAI"), _this41.keyHelpUrl = vs, _this41.url = "".concat(ct, "audio/speech"), _this41.permittedErrorPrefixes = [Xt];
    var s = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r.textToSpeech;
    _typeof(s) === F && Object.assign(_this41.rawBody, s), (_o$model3 = (o = _this41.rawBody).model) !== null && _o$model3 !== void 0 ? _o$model3 : o.model = In.DEFAULT_MODEL, (_a$voice3 = (a = _this41.rawBody).voice) !== null && _a$voice3 !== void 0 ? _a$voice3 : a.voice = In.DEFAULT_VOIDE, _this41.textInputPlaceholderText = "Insert text to generate audio", _this41.rawBody.response_format = "mp3";
    return _this41;
  }
  _inherits(In, _M6);
  return _createClass(In, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var r, o;
      var n = w(e),
        s = (o = (r = t[t[K] - 1]) == null ? void 0 : r[d]) == null ? void 0 : o.trim();
      return s && s !== "" && (n.input = s), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee80(e, t) {
        return _regenerator().w(function (_context80) {
          while (1) switch (_context80.n) {
            case 0:
              this.url = this.connectSettings.url || this.url, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
            case 1:
              return _context80.a(2);
          }
        }, _callee80, this);
      }));
      function callServiceAPI(_x152, _x153) {
        return _callServiceAPI1.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee81(e) {
        return _regenerator().w(function (_context81) {
          while (1) switch (_context81.n) {
            case 0:
              if (!(e instanceof Blob)) {
                _context81.n = 1;
                break;
              }
              return _context81.a(2, new Promise(function (t) {
                var n = new FileReader();
                n.readAsDataURL(e), n.onload = function (s) {
                  t(_defineProperty({}, m, [_defineProperty(_defineProperty({}, R, s.target.result), y, j)]));
                };
              }));
            case 1:
              if (!e[p]) {
                _context81.n = 2;
                break;
              }
              throw e[p].message;
            case 2:
              return _context81.a(2, _defineProperty({}, p, p));
          }
        }, _callee81);
      }));
      function extractResultData(_x154) {
        return _extractResultData12.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
In.DEFAULT_MODEL = "tts-1", In.DEFAULT_VOIDE = "alloy";
var Ui = In;
var dt = /*#__PURE__*/function (_M7) {
  function dt(e) {
    var _o$model4;
    var _this42;
    _classCallCheck(this, dt);
    var r, o;
    var t = w(e.directConnection),
      n = t == null ? void 0 : t.openAI;
    _this42 = _callSuper(this, dt, [e, Ss(), _s, n, {
      audio: {}
    }]), _this42.insertKeyPlaceholderText = _this42.genereteAPIKeyName("OpenAI"), _this42.keyHelpUrl = vs, _this42.url = "", _this42.permittedErrorPrefixes = [Xt], _this42.textInputPlaceholderText = er, _this42._service_url = dt.AUDIO_TRANSCRIPTIONS_URL;
    var s = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r[j];
    _typeof(s) == "object" && (_this42.processConfig(s), dt.cleanConfig(s), Object.assign(_this42.rawBody, s)), (_o$model4 = (o = _this42.rawBody).model) !== null && _o$model4 !== void 0 ? _o$model4 : o.model = dt.DEFAULT_MODEL, _this42.rawBody.response_format = "json", _this42.canSendMessage = dt.canSendFileMessage;
    return _this42;
  }
  _inherits(dt, _M7);
  return _createClass(dt, [{
    key: "processConfig",
    value: function processConfig(e) {
      e != null && e[y] && e[y] === "translation" && (this._service_url = dt.AUDIO_TRANSLATIONS_URL, delete e.language);
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var r, o;
      var n = w(e),
        s = (o = (r = t[t[K] - 1]) == null ? void 0 : r[d]) == null ? void 0 : o.trim();
      return s && s !== "" && (n.prompt = s), n;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee82(e, t, n) {
        var o, s, r;
        return _regenerator().w(function (_context82) {
          while (1) switch (_context82.n) {
            case 0:
              if ((o = this.connectSettings) != null && o.headers) {
                _context82.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (n != null && n[0]) {
                _context82.n = 2;
                break;
              }
              throw new Error(ai);
            case 2:
              this.url = this.connectSettings.url || this._service_url;
              s = this.preprocessBody(this.rawBody, t), r = dt.createFormDataBody(s, n[0]);
              B.tempRemoveContentHeader(this.connectSettings, _e.request.bind(this, this, r, e), !1);
            case 3:
              return _context82.a(2);
          }
        }, _callee82, this);
      }));
      function callServiceAPI(_x155, _x156, _x157) {
        return _callServiceAPI10.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee83(e) {
        return _regenerator().w(function (_context83) {
          while (1) switch (_context83.n) {
            case 0:
              if (!e[p]) {
                _context83.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              return _context83.a(2, _defineProperty({}, d, e[d]));
          }
        }, _callee83);
      }));
      function extractResultData(_x158) {
        return _extractResultData13.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "canSendFileMessage",
    value: function canSendFileMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }, {
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e[y];
    }
  }, {
    key: "createFormDataBody",
    value: function createFormDataBody(e, t) {
      var n = new FormData();
      return n.append(ne, t), Object.keys(e).forEach(function (s) {
        n.append(s, String(e[s]));
      }), n;
    }
  }]);
}(M);
dt.AUDIO_TRANSCRIPTIONS_URL = "".concat(ct, "audio/transcriptions"), dt.AUDIO_TRANSLATIONS_URL = "".concat(ct, "audio/translations"), dt.DEFAULT_MODEL = "whisper-1";
var Hi = dt;
var jn = "Ocp-Apim-Subscription-Key",
  Co =
  // eslint-disable-next-line max-len
  "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal",
  bl = function bl(i, e) {
    return _defineProperty(_defineProperty(_defineProperty({}, jn, e), z, "application/ssml+xml"), "X-Microsoft-OutputFormat", i);
  },
  yl = function yl(i) {
    return _defineProperty(_defineProperty({}, jn, i), "Accept", Y);
  },
  El = function El(i, e, t, n) {
    i[p] ? n(de) : t(e);
  },
  vl = function vl(i) {
    return {
      url: "https://".concat(i, ".api.cognitive.microsoft.com/sts/v1.0/issuetoken"),
      method: Pe,
      createHeaders: function createHeaders(e) {
        return _defineProperty({}, jn, "".concat(e));
      },
      handleVerificationResult: El
    };
  },
  _l = function _l(i) {
    return _defineProperty(_defineProperty({}, jn, i), z, Y);
  },
  Sl = function Sl(i, e, t, n) {
    var r;
    ((r = i[p]) == null ? void 0 : r.code) === "401" ? n(de) : t(e);
  },
  Al = function Al(i) {
    return {
      url: "".concat(i, "/language/analyze-text/jobs?api-version=2022-10-01-preview"),
      method: Pe,
      createHeaders: function createHeaders(e) {
        return _defineProperty({}, jn, "".concat(e));
      },
      handleVerificationResult: Sl
    };
  },
  xl = function xl(i, e, t, n) {
    i.json().then(function (r) {
      !Array.isArray(r) && r[p].code === 401e3 ? n(de) : t(e);
    });
  },
  wl = function wl(i) {
    return {
      url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es",
      method: Pe,
      createHeaders: function createHeaders(e) {
        return To(i, e);
      },
      handleVerificationResult: xl
    };
  },
  To = function To(i, e) {
    var t = _defineProperty(_defineProperty({}, jn, e), z, Y);
    return i && (t["Ocp-Apim-Subscription-Region"] = i), t;
  };
var Cl = /*#__PURE__*/function (_M8) {
  // prettier-ignore
  function Cl(e, t, n, s, r) {
    var _this43;
    _classCallCheck(this, Cl);
    _this43 = _callSuper(this, Cl, [e, Al(n), t, s, r]), _this43.insertKeyPlaceholderText = "Azure Language Subscription Key", _this43.keyHelpUrl = Co, _this43.permittedErrorPrefixes = ["Access"];
    return _this43;
  }
  _inherits(Cl, _M8);
  return _createClass(Cl);
}(M);
var ts = /*#__PURE__*/function (_Cl) {
  function ts(e) {
    var _a$language;
    var _this44;
    _classCallCheck(this, ts);
    var s, r, o, a;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.azure) == null ? void 0 : r.summarization,
      n = (o = e.directConnection) == null ? void 0 : o.azure;
    _this44 = _callSuper(this, ts, [e, _l, t.endpoint, n]), _this44.permittedErrorPrefixes = [ts.ENDPOINT_ERROR_MESSAGE], _this44.url = "", _this44.textInputPlaceholderText = "Insert text to summarize", _this44.isTextInputDisabled = !1, t.endpoint ? ((_a$language = (a = _this44.rawBody).language) !== null && _a$language !== void 0 ? _a$language : a.language = "en", Object.assign(_this44.rawBody, t), _this44.url = "".concat(t.endpoint, "/language/analyze-text/jobs?api-version=2022-10-01-preview")) : (_this44.isTextInputDisabled = !0, _this44.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, p, ts.ENDPOINT_ERROR_MESSAGE));
    }));
    return _this44;
  }
  _inherits(ts, _Cl);
  return _createClass(ts, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][d];
      if (n) return {
        analysisInput: {
          documents: [_defineProperty({
            id: "1",
            language: e.language
          }, d, n)]
        },
        tasks: [{
          kind: "ExtractiveSummarization"
        }]
      };
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee84(e, t) {
        return _regenerator().w(function (_context84) {
          while (1) switch (_context84.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)), this.messages = e;
            case 1:
              return _context84.a(2);
          }
        }, _callee84, this);
      }));
      function callServiceAPI(_x159, _x160) {
        return _callServiceAPI11.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee85(e) {
        var t, _n7, s;
        return _regenerator().w(function (_context85) {
          while (1) switch (_context85.n) {
            case 0:
              if (!e[p]) {
                _context85.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (this.messages && this.completionsHandlers) {
                this.asyncCallInProgress = !0;
                _n7 = e.headers.get("operation-location"), s = {
                  method: ge,
                  headers: (t = this.connectSettings) == null ? void 0 : t.headers
                };
                _e.executePollRequest(this, _n7, s, this.messages);
              }
              return _context85.a(2, _defineProperty({}, d, ""));
          }
        }, _callee85, this);
      }));
      function extractResultData(_x161) {
        return _extractResultData14.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee86(e) {
        var t, _iterator4, _step4, _n8;
        return _regenerator().w(function (_context86) {
          while (1) switch (_context86.n) {
            case 0:
              if (!e[p]) {
                _context86.n = 1;
                break;
              }
              throw e[p];
            case 1:
              if (!(e.status === "running" || e.status === "notStarted")) {
                _context86.n = 2;
                break;
              }
              return _context86.a(2, {
                timeoutMS: 2e3
              });
            case 2:
              if (!(e.errors.length > 0)) {
                _context86.n = 3;
                break;
              }
              throw e.errors[0];
            case 3:
              if (!(e.tasks.items[0].results.errors.length > 0)) {
                _context86.n = 4;
                break;
              }
              throw e.tasks.items[0].results.errors[0];
            case 4:
              t = "";
              _iterator4 = _createForOfIteratorHelper(e.tasks.items[0].results.documents[0].sentences);
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  _n8 = _step4.value;
                  t += _n8[d];
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
              return _context86.a(2, _defineProperty({}, d, t || ""));
          }
        }, _callee86);
      }));
      function extractPollResultData(_x162) {
        return _extractPollResultData4.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(Cl);
ts.ENDPOINT_ERROR_MESSAGE = "Please define the azure endpoint. [More Information](".concat(X, "directConnection/Azure#Summarization)");
var ji = ts;
var Tl = /*#__PURE__*/function () {
    var _ref77 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee87(i, e) {
      var t, o, a, l, _t51;
      return _regenerator().w(function (_context87) {
        while (1) switch (_context87.n) {
          case 0:
            t = _defineProperty(_defineProperty({}, ea, i), ta, Y);
            _t51 = "https://api.assemblyai.com/v2/transcript/";
            _context87.n = 1;
            return fetch("https://api.assemblyai.com/v2/transcript", {
              method: Pe,
              body: ae({
                audio_url: e
              }),
              headers: t
            });
          case 1:
            _context87.n = 2;
            return _context87.v.json();
          case 2:
            o = _t51.concat.call(_t51, _context87.v.id);
          case 3:
            if (a) {
              _context87.n = 9;
              break;
            }
            _context87.n = 4;
            return fetch(o, {
              headers: t
            });
          case 4:
            _context87.n = 5;
            return _context87.v.json();
          case 5:
            l = _context87.v;
            if (!(l.status === lo)) {
              _context87.n = 6;
              break;
            }
            a = l;
            _context87.n = 8;
            break;
          case 6:
            if (!(l.status === p)) {
              _context87.n = 7;
              break;
            }
            throw new Error("Transcription failed: ".concat(l[p]));
          case 7:
            _context87.n = 8;
            return new Promise(function (h) {
              return setTimeout(h, 3e3);
            });
          case 8:
            _context87.n = 3;
            break;
          case 9:
            return _context87.a(2, a);
        }
      }, _callee87);
    }));
    return function Tl(_x163, _x164) {
      return _ref77.apply(this, arguments);
    };
  }(),
  Rl = function Rl(i) {
    return _defineProperty(_defineProperty({}, ce, i), z, "application/octet-stream");
  },
  Il = function Il(i, e, t, n) {
    var s = i;
    s[p] ? s[p].code === "invalid_api_key" ? n(de) : n(He) : t(e);
  },
  Ml = function Ml() {
    return ue("https://api.assemblyai.com/v2/upload", Pe, Il);
  };
var cr = /*#__PURE__*/function (_M9) {
  function cr(e) {
    var _this45;
    _classCallCheck(this, cr);
    var n;
    var t = (n = e.directConnection) == null ? void 0 : n.assemblyAI;
    _this45 = _callSuper(this, cr, [e, Ml(), Rl, t, {
      audio: {}
    }]), _this45.insertKeyPlaceholderText = _this45.genereteAPIKeyName("AssemblyAI"), _this45.keyHelpUrl = "https://www.assemblyai.com/app/account", _this45.url = "https://api.assemblyai.com/v2/upload", _this45.isTextInputDisabled = !0, _this45.textInputPlaceholderText = er, _this45.permittedErrorPrefixes = [co, Xt], _this45.canSendMessage = cr.canFileSendMessage;
    return _this45;
  }
  _inherits(cr, _M9);
  return _createClass(cr, [{
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee88(e, t, n) {
        var s;
        return _regenerator().w(function (_context88) {
          while (1) switch (_context88.n) {
            case 0:
              if ((s = this.connectSettings) != null && s.headers) {
                _context88.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (n != null && n[0]) {
                _context88.n = 2;
                break;
              }
              throw new Error(ai);
            case 2:
              _e.request(this, n[0], e, !1);
            case 3:
              return _context88.a(2);
          }
        }, _callee88, this);
      }));
      function callServiceAPI(_x165, _x166, _x167) {
        return _callServiceAPI12.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee89(e) {
        var s, r, t, n;
        return _regenerator().w(function (_context89) {
          while (1) switch (_context89.n) {
            case 0:
              if (!e[p]) {
                _context89.n = 1;
                break;
              }
              throw e[p];
            case 1:
              t = (r = (s = this.connectSettings) == null ? void 0 : s.headers) == null ? void 0 : r[ce];
              _context89.n = 2;
              return Tl(t, e.upload_url);
            case 2:
              n = _context89.v;
              return _context89.a(2, _defineProperty({}, d, n[d]));
          }
        }, _callee89, this);
      }));
      function extractResultData(_x168) {
        return _extractResultData15.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "canFileSendMessage",
    value: function canFileSendMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(M);
var Ws = /*#__PURE__*/function (_M0) {
  // prettier-ignore
  function Ws(e, t, n, s, r) {
    var _this46$maxMessages, _g$model;
    var _this46;
    _classCallCheck(this, Ws);
    var u, g;
    var o = w(e.directConnection),
      a = t || Ss(),
      c = n || _s,
      l = s || o.openAI;
    _this46 = _callSuper(this, Ws, [e, a, c, l]), _this46.insertKeyPlaceholderText = _this46.genereteAPIKeyName("OpenAI"), _this46.keyHelpUrl = "https://platform.openai.com/account/api-keys", _this46.permittedErrorPrefixes = [li, "Invalid value"];
    var h = r || ((u = o.openAI) == null ? void 0 : u.chat);
    _typeof(h) === F && _this46.processConfig(h, e), (_this46$maxMessages = _this46.maxMessages) !== null && _this46$maxMessages !== void 0 ? _this46$maxMessages : _this46.maxMessages = -1, (_g$model = (g = _this46.rawBody).model) !== null && _g$model !== void 0 ? _g$model : g.model = "gpt-5.4";
    return _this46;
  }
  _inherits(Ws, _M0);
  return _createClass(Ws, [{
    key: "processConfig",
    value: function processConfig(e, t) {
      var n, s, r;
      this.completeConfig(e, (r = (s = (n = t.directConnection) == null ? void 0 : n.openAI) == null ? void 0 : s.chat) == null ? void 0 : r.function_handler);
    }
  }], [{
    key: "getBaseFileContent",
    value: function getBaseFileContent(e) {
      return e.map(function (t) {
        var n, s, r;
        if (t[y] === j) {
          var o = (n = t[R]) == null ? void 0 : n.split(",")[1],
            a = ((r = (s = t.name) == null ? void 0 : s.split(".").pop()) == null ? void 0 : r.toLowerCase()) || "wav";
          return _defineProperty(_defineProperty({}, y, ln), ln, {
            data: o,
            format: a
          });
        }
        return t;
      });
    }
  }, {
    key: "getBaseContent",
    value: function getBaseContent(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (t && e[m] && e[m][K] > 0) {
        var s = this.getBaseFileContent(e[m]);
        return e[d] && e[d].trim()[K] > 0 && s.unshift(_defineProperty(_defineProperty({}, y, d), d, e[d])), s;
      }
      return e[d];
    }
  }]);
}(M);
var Xs = /*#__PURE__*/function (_Ws) {
  function Xs() {
    var _this47;
    _classCallCheck(this, Xs);
    _this47 = _callSuper(this, Xs, arguments), _this47.url = "".concat(ct, "chat/completions");
    return _this47;
  }
  _inherits(Xs, _Ws);
  return _createClass(Xs, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: Xs.getContent(r)
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee90(e, t) {
        var _this$messages;
        return _regenerator().w(function (_context90) {
          while (1) switch (_context90.n) {
            case 0:
              (_this$messages = this.messages) !== null && _this$messages !== void 0 ? _this$messages : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context90.a(2);
          }
        }, _callee90, this);
      }));
      function callServiceAPI(_x169, _x170) {
        return _callServiceAPI13.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee91(e, t) {
        var n, s, r, o, a, c, l, h;
        return _regenerator().w(function (_context91) {
          while (1) switch (_context91.n) {
            case 0:
              if (!e[p]) {
                _context91.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!((s = (n = e.choices) == null ? void 0 : n[0]) != null && s.delta)) {
                _context91.n = 2;
                break;
              }
              return _context91.a(2, this.extractStreamResult(e.choices[0], t));
            case 2:
              if (!((o = (r = e.choices) == null ? void 0 : r[0]) != null && o.message)) {
                _context91.n = 5;
                break;
              }
              if (!e.choices[0].message.tool_calls) {
                _context91.n = 3;
                break;
              }
              return _context91.a(2, this.handleToolsGeneric(e.choices[0].message, this.functionHandler, this.messages, t));
            case 3:
              if (!((a = e.choices[0].message) != null && a[j])) {
                _context91.n = 4;
                break;
              }
              l = this.deepChat.textToSpeech, h = _typeof(l) == "object" && typeof ((c = l == null ? void 0 : l[j]) == null ? void 0 : c.displayText) == "boolean";
              return _context91.a(2, _defineProperty(_defineProperty({}, m, [_defineProperty(_defineProperty({}, R, "data:audio/wav;base64,".concat(e.choices[0].message[j].data)), y, j)]), d, h ? e.choices[0].message[j].transcript : void 0));
            case 4:
              return _context91.a(2, _defineProperty({}, d, e.choices[0].message.content));
            case 5:
              return _context91.a(2, _defineProperty({}, d, ""));
          }
        }, _callee91, this);
      }));
      function extractResultData(_x171, _x172) {
        return _extractResultData16.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee92(e, t) {
        return _regenerator().w(function (_context92) {
          while (1) switch (_context92.n) {
            case 0:
              return _context92.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee92, this);
      }));
      function extractStreamResult(_x173, _x174) {
        return _extractStreamResult.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getFileContent",
    value: function getFileContent(e) {
      return Ws.getBaseFileContent(e).map(function (n) {
        return n[y] === ln ? n : _defineProperty(_defineProperty({}, y, ze), ze, {
          url: n[R]
        });
      });
    }
  }, {
    key: "getContent",
    value: function getContent(e) {
      if (e[m] && e[m][K] > 0) {
        var t = Xs.getFileContent(e[m]);
        return e[d] && e[d].trim()[K] > 0 && t.unshift(_defineProperty(_defineProperty({}, y, d), d, e[d])), t;
      }
      return e[d];
    }
  }]);
}(Ws);
var vr = /*#__PURE__*/function (_M1) {
  // prettier-ignore
  function vr(e, t, n, s, r) {
    var _this48;
    _classCallCheck(this, vr);
    _this48 = _callSuper(this, vr, [e, vl(n), t, s, r]), _this48.insertKeyPlaceholderText = "Azure Speech Subscription Key", _this48.keyHelpUrl = Co;
    return _this48;
  }
  _inherits(vr, _M1);
  return _createClass(vr);
}(M);
vr.REGION_ERROR_PREFIX = "Please define a region config property. [More Information](".concat(X, "directConnection/Azure#");
var Fn = vr;
var ns = /*#__PURE__*/function (_Fn) {
  // prettier-ignore
  function ns(e) {
    var _a$lang, _c$name, _l$gender;
    var _this49;
    _classCallCheck(this, ns);
    var s, r, o, a, c, l;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.azure) == null ? void 0 : r.textToSpeech,
      n = (o = e.directConnection) == null ? void 0 : o.azure;
    _this49 = _callSuper(this, ns, [e, bl.bind({}, (t == null ? void 0 : t.outputFormat) || "audio-16khz-128kbitrate-mono-mp3"), t.region, n]), _this49.permittedErrorPrefixes = [ns.REGION_ERROR_MESSAGE], _this49.isTextInputDisabled = !1, _this49.url = "", t.region ? (Object.assign(_this49.rawBody, t), (_a$lang = (a = _this49.rawBody).lang) !== null && _a$lang !== void 0 ? _a$lang : a.lang = "en-US", (_c$name = (c = _this49.rawBody).name) !== null && _c$name !== void 0 ? _c$name : c.name = "en-US-JennyNeural", (_l$gender = (l = _this49.rawBody).gender) !== null && _l$gender !== void 0 ? _l$gender : l.gender = "Female", _this49.url = "https://".concat(t.region, ".tts.speech.microsoft.com/cognitiveservices/v1")) : (_this49.isTextInputDisabled = !0, _this49.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, p, ns.REGION_ERROR_MESSAGE));
    }));
    return _this49;
  }
  _inherits(ns, _Fn);
  return _createClass(ns, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][d];
      if (n) return "<speak version='1.0' xml:lang='".concat(e.lang, "'>\n      <voice xml:lang='").concat(e.lang, "' xml:gender='").concat(e.gender, "' name='").concat(e.name, "'>\n        ").concat(n, "\n      </voice>\n    </speak>");
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee93(e, t) {
        return _regenerator().w(function (_context93) {
          while (1) switch (_context93.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), void 0, !1);
            case 1:
              return _context93.a(2);
          }
        }, _callee93, this);
      }));
      function callServiceAPI(_x175, _x176) {
        return _callServiceAPI14.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee94(e) {
        return _regenerator().w(function (_context94) {
          while (1) switch (_context94.n) {
            case 0:
              return _context94.a(2, new Promise(function (t) {
                var n = new FileReader();
                n.readAsDataURL(e), n.onload = function (s) {
                  t(_defineProperty({}, m, [_defineProperty(_defineProperty({}, R, s.target.result), y, j)]));
                };
              }));
          }
        }, _callee94);
      }));
      function extractResultData(_x177) {
        return _extractResultData17.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(Fn);
ns.REGION_ERROR_MESSAGE = "".concat(Fn.REGION_ERROR_PREFIX, "TextToSpeech)");
var $i = ns;
var Mn = /*#__PURE__*/function (_Fn2) {
  function Mn(e) {
    var _this50;
    _classCallCheck(this, Mn);
    var r, o, a;
    var t = (o = (r = e.directConnection) == null ? void 0 : r.azure) == null ? void 0 : o.speechToText,
      n = (a = e.directConnection) == null ? void 0 : a.azure,
      s = {
        audio: _defineProperty({}, m, {
          acceptedFormats: ".wav,.ogg"
        })
      };
    if (_this50 = _callSuper(this, Mn, [e, yl, t.region, n, s]), _this50.permittedErrorPrefixes = [Mn.REGION_ERROR_MESSAGE], _this50.url = "", _this50.isTextInputDisabled = !0, _this50.textInputPlaceholderText = er, !t.region) _this50.isTextInputDisabled = !0, _this50.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, p, Mn.REGION_ERROR_MESSAGE));
    });else {
      _this50.canSendMessage = Mn.canFileSendMessage;
      var c = t.lang || "en-US";
      _this50.url = "https://".concat(t.region, ".stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=").concat(c, "&format=detailed"), _this50.recordAudio = void 0;
    }
    return _this50;
  }
  _inherits(Mn, _Fn2);
  return _createClass(Mn, [{
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee95(e, t, n) {
        var s, r;
        return _regenerator().w(function (_context95) {
          while (1) switch (_context95.n) {
            case 0:
              if ((s = this.connectSettings) != null && s.headers) {
                _context95.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (n != null && n[0]) {
                _context95.n = 2;
                break;
              }
              throw new Error(ai);
            case 2:
              (r = this.connectSettings) != null && r.headers && (this.connectSettings.headers[z] = n[0].name.toLocaleLowerCase().endsWith(".wav") ? "audio/wav; codecs=audio/pcm; samplerate=16000" : "audio/ogg; codecs=opus"), _e.request(this, n[0], e, !1);
            case 3:
              return _context95.a(2);
          }
        }, _callee95, this);
      }));
      function callServiceAPI(_x178, _x179, _x180) {
        return _callServiceAPI15.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee96(e) {
        return _regenerator().w(function (_context96) {
          while (1) switch (_context96.n) {
            case 0:
              if (!e[p]) {
                _context96.n = 1;
                break;
              }
              throw e[p];
            case 1:
              return _context96.a(2, _defineProperty({}, d, e.DisplayText || ""));
          }
        }, _callee96);
      }));
      function extractResultData(_x181) {
        return _extractResultData18.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "canFileSendMessage",
    value: function canFileSendMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(Fn);
Mn.REGION_ERROR_MESSAGE = "".concat(Fn.REGION_ERROR_PREFIX, "SpeechToText)");
var Gi = Mn;
var kl = /*#__PURE__*/function (_M10) {
  // prettier-ignore
  function kl(e) {
    var _this51;
    _classCallCheck(this, kl);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.azure) == null ? void 0 : r.translation,
      n = (o = e.directConnection) == null ? void 0 : o.azure;
    _this51 = _callSuper(this, kl, [e, wl(t.region), To.bind({}, t == null ? void 0 : t.region), n]), _this51.insertKeyPlaceholderText = "Azure Translate Subscription Key", _this51.keyHelpUrl =
    // eslint-disable-next-line max-len
    "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal", _this51.url = "", _this51.url = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=".concat(t.language || "es");
    return _this51;
  }
  _inherits(kl, _M10);
  return _createClass(kl, [{
    key: "preprocessBody",
    value: function preprocessBody(e) {
      var t = e[e.length - 1][d];
      if (t) return [{
        Text: t
      }];
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee97(e, t) {
        return _regenerator().w(function (_context97) {
          while (1) switch (_context97.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
            case 1:
              return _context97.a(2);
          }
        }, _callee97, this);
      }));
      function callServiceAPI(_x182, _x183) {
        return _callServiceAPI16.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee98(e) {
        var t;
        return _regenerator().w(function (_context98) {
          while (1) switch (_context98.n) {
            case 0:
              if (!Array.isArray(e)) {
                _context98.n = 1;
                break;
              }
              return _context98.a(2, _defineProperty({}, d, ((t = e[0].translations) == null ? void 0 : t[0][d]) || ""));
            case 1:
              throw e[p];
            case 2:
              return _context98.a(2);
          }
        }, _callee98);
      }));
      function extractResultData(_x184) {
        return _extractResultData19.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var Ll = /*#__PURE__*/function (_M11) {
  function Ll(e) {
    var _o$model5;
    var _this52;
    _classCallCheck(this, Ll);
    var r, o;
    var t = w(e.directConnection),
      n = t.bigModel;
    _this52 = _callSuper(this, Ll, [e, rr(), ir, n]), _this52.insertKeyPlaceholderText = _this52.genereteAPIKeyName("BigModel"), _this52.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", _this52.url = "https://open.bigmodel.cn/api/paas/v4/images/generations", _this52.permittedErrorPrefixes = [ce, Ae];
    var s = (r = t.bigModel) == null ? void 0 : r[ee];
    _typeof(s) === F && (_this52.cleanConfig(s), Object.assign(_this52.rawBody, s)), (_o$model5 = (o = _this52.rawBody).model) !== null && _o$model5 !== void 0 ? _o$model5 : o.model = "cogview-4-250304";
    return _this52;
  }
  _inherits(Ll, _M11);
  return _createClass(Ll, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.key;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = t[t.length - 1];
      return n.prompt = (s == null ? void 0 : s[d]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee99(e, t) {
        return _regenerator().w(function (_context99) {
          while (1) switch (_context99.n) {
            case 0:
              return _context99.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee99, this);
      }));
      function callServiceAPI(_x185, _x186) {
        return _callServiceAPI17.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee100(e) {
        var t;
        return _regenerator().w(function (_context100) {
          while (1) switch (_context100.n) {
            case 0:
              t = e.data.map(function (n) {
                return n != null && n.url ? _defineProperty(_defineProperty({}, R, n.url), y, W) : _defineProperty(_defineProperty({}, R, ""), y, W);
              });
              return _context100.a(2, _defineProperty({}, m, t));
          }
        }, _callee100);
      }));
      function extractResultData(_x187) {
        return _extractResultData20.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var Ro = function Ro(i) {
    return _defineProperty(_defineProperty({}, z, Y), ce, "".concat(Se).concat(i));
  },
  Pl = function Pl(i, e, t, n) {
    var s = i;
    s[p] ? s[p].message === ci ? n(de) : n(He) : t(e);
  },
  Io = function Io() {
    return ue("https://api.groq.com/openai/v1/models", ge, Pl);
  };
var Ol = /*#__PURE__*/function (_M12) {
  function Ol(e) {
    var _o$model6, _a$voice4, _c$response_format;
    var _this53;
    _classCallCheck(this, Ol);
    var r, o, a, c;
    var t = w(e.directConnection),
      n = t.groq;
    _this53 = _callSuper(this, Ol, [e, Io(), Ro, n]), _this53.insertKeyPlaceholderText = _this53.genereteAPIKeyName("Groq"), _this53.keyHelpUrl = "https://console.groq.com/keys", _this53.url = "https://api.groq.com/openai/v1/audio/speech", _this53.permittedErrorPrefixes = [Xt, "property"];
    var s = (r = t.groq) == null ? void 0 : r.textToSpeech;
    _typeof(s) === F && _this53.completeConfig(s), (_o$model6 = (o = _this53.rawBody).model) !== null && _o$model6 !== void 0 ? _o$model6 : o.model = "playai-tts", (_a$voice4 = (a = _this53.rawBody).voice) !== null && _a$voice4 !== void 0 ? _a$voice4 : a.voice = "Fritz-PlayAI", (_c$response_format = (c = _this53.rawBody).response_format) !== null && _c$response_format !== void 0 ? _c$response_format : c.response_format = "mp3";
    return _this53;
  }
  _inherits(Ol, _M12);
  return _createClass(Ol, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = t[t.length - 1];
      return n.input = (s == null ? void 0 : s[d]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee101(e, t) {
        return _regenerator().w(function (_context101) {
          while (1) switch (_context101.n) {
            case 0:
              return _context101.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee101, this);
      }));
      function callServiceAPI(_x188, _x189) {
        return _callServiceAPI18.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee102(e) {
        var t, n, s;
        return _regenerator().w(function (_context102) {
          while (1) switch (_context102.n) {
            case 0:
              t = this.rawBody.response_format || "mp3", n = new Blob([e], _defineProperty({}, y, "audio/".concat(t))), s = URL.createObjectURL(n);
              return _context102.a(2, _defineProperty({}, m, [_defineProperty(_defineProperty({}, R, s), y, j)]));
          }
        }, _callee102, this);
      }));
      function extractResultData(_x190) {
        return _extractResultData21.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var Nl = /*#__PURE__*/function (_M13) {
  function Nl(e) {
    var _o$model7;
    var _this54;
    _classCallCheck(this, Nl);
    var r, o;
    var t = w(e.directConnection),
      n = t.together;
    _this54 = _callSuper(this, Nl, [e, ar(), or, n]), _this54.insertKeyPlaceholderText = _this54.genereteAPIKeyName("Together AI"), _this54.keyHelpUrl = "https://api.together.xyz/settings/api-keys", _this54.url = "https://api.together.xyz/v1/images/generations", _this54.permittedErrorPrefixes = [Je, Ae];
    var s = (r = t.together) == null ? void 0 : r[ee];
    _typeof(s) === F && _this54.completeConfig(s), (_o$model7 = (o = _this54.rawBody).model) !== null && _o$model7 !== void 0 ? _o$model7 : o.model = "black-forest-labs/FLUX.1-schnell-Free";
    return _this54;
  }
  _inherits(Nl, _M13);
  return _createClass(Nl, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = t[t.length - 1];
      return n.prompt = (s == null ? void 0 : s[d]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee103(e, t) {
        return _regenerator().w(function (_context103) {
          while (1) switch (_context103.n) {
            case 0:
              return _context103.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee103, this);
      }));
      function callServiceAPI(_x191, _x192) {
        return _callServiceAPI19.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee104(e) {
        var t;
        return _regenerator().w(function (_context104) {
          while (1) switch (_context104.n) {
            case 0:
              t = e.data.map(function (n) {
                return n != null && n.url ? _defineProperty(_defineProperty({}, R, n.url), y, W) : n != null && n.b64_json ? _defineProperty(_defineProperty({}, R, "data:image/png;base64,".concat(n.b64_json)), y, W) : _defineProperty(_defineProperty({}, R, ""), y, W);
              });
              return _context104.a(2, _defineProperty({}, m, t));
          }
        }, _callee104);
      }));
      function extractResultData(_x193) {
        return _extractResultData22.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var Ze = /*#__PURE__*/function (_Ws2) {
  // https://platform.openai.com/docs/models/gpt-4o-audio-preview
  // prettier-ignore
  function Ze(e, t, n, s, r) {
    var _this55;
    _classCallCheck(this, Ze);
    var a, c;
    _this55 = _callSuper(this, Ze, [e, t, n, s, r]), _this55.keyHelpUrl = vs, _this55.url = "".concat(ct, "responses"), _this55._functionStreamInProgress = !1, _this55._streamedResponseFunctionCalls = [], _this55._useConversation = !1, _this55._conversationLoadLimit = 50;
    var o = r || ((c = (a = e.directConnection) == null ? void 0 : a.openAI) == null ? void 0 : c.chat);
    _this55._urlSegments = Ze.buildUrlSegments(o), _this55.url = _this55._urlSegments.responsesUrl, _typeof(o) === F && o !== !0 && o && (o.conversation && (_this55._useConversation = !0, typeof o.conversation == "string" && (_this55._conversationId = o.conversation)), typeof o.conversationLoadLimit == "number" && (_this55._conversationLoadLimit = o.conversationLoadLimit), _this55.cleanConfig(o)), _this55._conversationId && (_this55.fetchHistory = _this55.fetchHistoryFunc.bind(_this55));
    return _this55;
  }
  _inherits(Ze, _Ws2);
  return _createClass(Ze, [{
    key: "processConfig",
    value: function processConfig(e, t) {
      _superPropGet(Ze, "processConfig", this, 3)([e, t]);
    }
  }, {
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.conversation, delete e.conversationLoadLimit, delete e.custom_base_url;
    }
  }, {
    key: "fetchHistoryFunc",
    value: function () {
      var _fetchHistoryFunc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee105() {
        var _this56 = this;
        var e, t, _n9, _t53;
        return _regenerator().w(function (_context105) {
          while (1) switch (_context105.p = _context105.n) {
            case 0:
              setTimeout(function () {
                return _this56.deepChat.disableSubmitButton();
              }, 2);
              _context105.p = 1;
              e = this.url, t = this._urlSegments.conversationsUrl;
              this.url = "".concat(t, "/").concat(this._conversationId, "/items?limit=").concat(this._conversationLoadLimit);
              _context105.n = 2;
              return Vr(this, {}, ge);
            case 2:
              _n9 = _context105.v;
              return _context105.a(2, (this.connectSettings.method = Pe, this.url = e, this.deepChat.disableSubmitButton(!1), this.processConversationHistory(_n9)));
            case 3:
              _context105.p = 3;
              _t53 = _context105.v;
              return _context105.a(2, (this.deepChat.disableSubmitButton(!1), [_defineProperty({}, p, Zo)]));
          }
        }, _callee105, this, [[1, 3]]);
      }));
      function fetchHistoryFunc() {
        return _fetchHistoryFunc.apply(this, arguments);
      }
      return fetchHistoryFunc;
    }()
  }, {
    key: "processConversationHistory",
    value: function processConversationHistory(e) {
      if (!e.data || !Array.isArray(e.data)) return [];
      var t = [];
      var _iterator5 = _createForOfIteratorHelper(Ze.filterCompleted(e.data.reverse())),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _n0 = _step5.value;
          if (_n0[y] === "message" && _n0.content && Array.isArray(_n0.content)) {
            var _iterator6 = _createForOfIteratorHelper(_n0.content),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var s = _step6.value;
                (s[y] === Bi || s[y] === zr) && s[d] ? t.push(_defineProperty(_defineProperty({}, A, _n0[A]), d, s[d])) : s[y] === Gr && t.push(_defineProperty(_defineProperty({}, A, _n0[A]), m, Ze.generateImageFile(s[ze] || "")));
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          } else _n0[y] === xi && t.push(_defineProperty(_defineProperty({}, A, te), m, Ze.generateImageFile(_n0.result)));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return t;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e);
      t = this.processMessages(t), t = this._useConversation ? [t[t[K] - 1]] : t;
      var s = t.map(function (r) {
        return _defineProperty({
          content: Ze.getContent(r)
        }, A, M.getRoleViaUser(r[A]));
      });
      return n.input = s, this._conversationId && (n.conversation = this._conversationId), n;
    }
  }, {
    key: "createConversation",
    value: function () {
      var _createConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee106() {
        var e, t, _t54;
        return _regenerator().w(function (_context106) {
          while (1) switch (_context106.p = _context106.n) {
            case 0:
              _context106.p = 0;
              e = this.url;
              this.url = this._urlSegments.conversationsUrl;
              _context106.n = 1;
              return Vr(this, {}, Pe);
            case 1:
              t = _context106.v;
              return _context106.a(2, (this.url = e, t.id));
            case 2:
              _context106.p = 2;
              _t54 = _context106.v;
              throw console[p]("Failed to create conversation:", _t54), _t54;
            case 3:
              return _context106.a(2);
          }
        }, _callee106, this, [[0, 2]]);
      }));
      function createConversation() {
        return _createConversation.apply(this, arguments);
      }
      return createConversation;
    }()
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee107(e, t) {
        var _this$messages2;
        var _t55;
        return _regenerator().w(function (_context107) {
          while (1) switch (_context107.n) {
            case 0:
              this._streamedResponseFunctionCalls = [];
              (_this$messages2 = this.messages) !== null && _this$messages2 !== void 0 ? _this$messages2 : this.messages = e;
              _t55 = this._useConversation && !this._conversationId;
              if (!_t55) {
                _context107.n = 2;
                break;
              }
              _context107.n = 1;
              return this.createConversation();
            case 1:
              this._conversationId = _context107.v;
            case 2:
              this._conversationId && this.updateSessionId(this._conversationId);
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 3:
              return _context107.a(2);
          }
        }, _callee107, this);
      }));
      function callServiceAPI(_x194, _x195) {
        return _callServiceAPI20.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee108(e, t) {
        var n;
        return _regenerator().w(function (_context108) {
          while (1) switch (_context108.n) {
            case 0:
              _context108.n = 1;
              return this.extractResult(e, t);
            case 1:
              n = _context108.v;
              return _context108.a(2, (this._conversationId && (n._sessionId = this._conversationId), n));
          }
        }, _callee108, this);
      }));
      function extractResultData(_x196, _x197) {
        return _extractResultData23.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractResult",
    value: function () {
      var _extractResult = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee109(e, t) {
        var n, s, r, o, a, c, l, h, _a3;
        return _regenerator().w(function (_context109) {
          while (1) switch (_context109.n) {
            case 0:
              if (!e[p]) {
                _context109.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!e.status) {
                _context109.n = 5;
                break;
              }
              a = Ze.filterCompleted(e.output);
              if (!(a[K] > 0)) {
                _context109.n = 4;
                break;
              }
              c = (r = (s = (n = a.find(function (u) {
                var g, b;
                return _typeof((b = (g = u.content) == null ? void 0 : g[0]) == null ? void 0 : b[d]) === ve;
              })) == null ? void 0 : n.content) == null ? void 0 : s[0]) == null ? void 0 : r[d];
              _context109.n = 2;
              return this.handleResponsesFunctionCalls(a, t, c);
            case 2:
              l = _context109.v;
              if (!l) {
                _context109.n = 3;
                break;
              }
              return _context109.a(2, l);
            case 3:
              h = this.handleFileGenerationResponse(a, c);
              return _context109.a(2, h || _defineProperty({}, d, c));
            case 4:
              return _context109.a(2, _defineProperty({}, d, ""));
            case 5:
              if (!(e[y] === "".concat(xn, ".completed") && this._streamedResponseFunctionCalls[K] > 0)) {
                _context109.n = 6;
                break;
              }
              _a3 = this._streamedResponseFunctionCalls;
              return _context109.a(2, (this._streamedResponseFunctionCalls = [], this.handleResponsesFunctionCalls(_a3, t)));
            case 6:
              return _context109.a(2, ((o = e.item) == null ? void 0 : o[y]) === Ms && e[y] ? this.handleStreamedResponsesFunctionCall(e) : e[y] === "".concat(xn, ".").concat(xi, ".partial_image") && e.partial_image_b64 ? _defineProperty({}, m, [_defineProperty(_defineProperty({}, R, "".concat(Ze.IMAGE_BASE64_PREFIX).concat(e.partial_image_b64)), y, W)]) : e.delta && !this._functionStreamInProgress && e[y] === "".concat(xn, ".").concat(zr, ".delta") ? _defineProperty({}, d, e.delta) : _defineProperty({}, d, ""));
          }
        }, _callee109, this);
      }));
      function extractResult(_x198, _x199) {
        return _extractResult.apply(this, arguments);
      }
      return extractResult;
    }()
  }, {
    key: "handleStreamedResponsesFunctionCall",
    value: function () {
      var _handleStreamedResponsesFunctionCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee110(e) {
        var t;
        return _regenerator().w(function (_context110) {
          while (1) switch (_context110.n) {
            case 0:
              return _context110.a(2, (e[y] === "".concat(xn, ".output_item.done") ? (this._functionStreamInProgress = !1, ((t = e.item) == null ? void 0 : t[y]) === Ms && this._streamedResponseFunctionCalls.push(e.item)) : e[y] === "".concat(xn, ".output_item.added") && (this._functionStreamInProgress = !0), _defineProperty({}, d, "")));
          }
        }, _callee110, this);
      }));
      function handleStreamedResponsesFunctionCall(_x200) {
        return _handleStreamedResponsesFunctionCall.apply(this, arguments);
      }
      return handleStreamedResponsesFunctionCall;
    }()
  }, {
    key: "handleFileGenerationResponse",
    value: function handleFileGenerationResponse(e, t) {
      var n = e.find(function (s) {
        return s[y] === xi;
      });
      return n ? _defineProperty(_defineProperty({}, m, Ze.generateImageFile(n.result)), d, t) : null;
    }
  }, {
    key: "handleResponsesFunctionCalls",
    value: function () {
      var _handleResponsesFunctionCalls = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee111(e, t, n) {
        var s, r, _yield$this$callToolF2, o, a, c;
        return _regenerator().w(function (_context111) {
          while (1) switch (_context111.n) {
            case 0:
              s = e.filter(function (l) {
                return l[y] === Ms;
              });
              if (!(s[K] === 0)) {
                _context111.n = 1;
                break;
              }
              return _context111.a(2, null);
            case 1:
              if (!(!t || !this.functionHandler)) {
                _context111.n = 2;
                break;
              }
              throw Error(bn);
            case 2:
              r = s.map(function (l) {
                return {
                  name: l.name,
                  arguments: l.arguments
                };
              });
              _context111.n = 3;
              return this.callToolFunction(this.functionHandler, r);
            case 3:
              _yield$this$callToolF2 = _context111.v;
              o = _yield$this$callToolF2.responses;
              a = _yield$this$callToolF2.processedResponse;
              if (!a) {
                _context111.n = 4;
                break;
              }
              return _context111.a(2, a);
            case 4:
              c = w(t);
              if (!(c.input && (s.forEach(function (l) {
                return c.input.push(l);
              }), !o.find(function (_ref110) {
                var l = _ref110.response;
                return _typeof(l) !== ve;
              }) && r[K] === o[K]))) {
                _context111.n = 5;
                break;
              }
              return _context111.a(2, (o.forEach(function (l, h) {
                var u = s[h];
                c.input.push(_defineProperty(_defineProperty(_defineProperty({}, y, So), "call_id", u.call_id), "output", l[xn]));
              }), this.makeAnotherRequest(c, this.messages, n)));
            case 5:
              throw Error(dn);
            case 6:
              return _context111.a(2);
          }
        }, _callee111, this);
      }));
      function handleResponsesFunctionCalls(_x201, _x202, _x203) {
        return _handleResponsesFunctionCalls.apply(this, arguments);
      }
      return handleResponsesFunctionCalls;
    }()
  }], [{
    key: "buildUrlSegments",
    value: function buildUrlSegments(e) {
      var t = _typeof(e) == "object" && (e == null ? void 0 : e.custom_base_url) || ct;
      return {
        responsesUrl: "".concat(t, "responses"),
        conversationsUrl: "".concat(t, "conversations")
      };
    }
  }, {
    key: "getFileContent",
    value: function getFileContent(e) {
      return Ws.getBaseFileContent(e).map(function (n) {
        return n[y] === ln ? n : _defineProperty(_defineProperty({
          detail: "auto"
        }, y, Gr), ze, n[R]);
      });
    }
  }, {
    key: "getContent",
    value: function getContent(e) {
      if (e[A] === $ && e[m] && e[m][K] > 0) {
        var _n1 = Ze.getFileContent(e[m]);
        return e[d] && e[d].trim()[K] > 0 && _n1.unshift(_defineProperty(_defineProperty({}, y, Bi), d, e[d])), _n1;
      }
      return e[d];
    }
  }, {
    key: "filterCompleted",
    value: function filterCompleted(e) {
      return (e == null ? void 0 : e.filter(function (t) {
        return t.status === lo;
      })) || [];
    }
  }, {
    key: "generateImageFile",
    value: function generateImageFile(e) {
      return [_defineProperty(_defineProperty({}, R, "".concat(Ze.IMAGE_BASE64_PREFIX).concat(e)), y, W)];
    }
  }]);
}(Ws);
Ze.IMAGE_BASE64_PREFIX = "data:image/png;base64,";
var Zs = Ze;
var qr = "Please define the Azure URL Details. [More Information](".concat(X, "directConnection/Azure)"),
  Bl = function Bl(i) {
    return _defineProperty({
      "api-key": i
    }, z, Y);
  },
  Dl = function Dl(i) {
    return ue("".concat(i.endpoint, "/openai/models?api-version=").concat(i.version), ge, Ao);
  },
  Fl = function Fl(i) {
    var e = i.endpoint,
      t = i.version,
      n = i.deploymentId;
    return e && t && n;
  };
var lr = /*#__PURE__*/function (_Zs) {
  function lr(e) {
    var _this57;
    _classCallCheck(this, lr);
    var o, a, c, l, h, u, g;
    var t = w(e.directConnection),
      n = t.azure,
      s = ((a = (o = t.azure) == null ? void 0 : o.openAI) == null ? void 0 : a.urlDetails) || {},
      r = (l = (c = t.azure) == null ? void 0 : c.openAI) == null ? void 0 : l.chat;
    if (_this57 = _callSuper(this, lr, [e, Dl(s), Bl, n, r]), _this57.permittedErrorPrefixes = [qr], _this57.isTextInputDisabled = !1, _typeof(r) === F) {
      var _ref114 = (g = (u = (h = e.directConnection) == null ? void 0 : h.azure) == null ? void 0 : u.openAI) == null ? void 0 : g.chat,
        b = _ref114.function_handler;
      b && (_this57.functionHandler = b);
    }
    Fl(s) ? _this57.url = lr.buildURL(s) : (_this57.isTextInputDisabled = !0, _this57.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, p, qr));
    }));
    return _this57;
  }
  _inherits(lr, _Zs);
  return _createClass(lr, null, [{
    key: "buildURL",
    value: function buildURL(e) {
      var t = e.endpoint,
        n = e.deploymentId,
        s = e.version;
      return "".concat(t, "/openai/deployments/").concat(n, "/chat/completions?api-version=").concat(s);
    }
  }]);
}(Zs);
var Ys = /*#__PURE__*/function (_M14) {
  function Ys(e) {
    var _this58$maxMessages, _l$model2;
    var _this58;
    _classCallCheck(this, Ys);
    var r, o, a, c, l;
    var t = w(e.directConnection),
      n = t.bigModel;
    _this58 = _callSuper(this, Ys, [e, rr(), ir, n]), _this58.insertKeyPlaceholderText = _this58.genereteAPIKeyName("BigModel"), _this58.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", _this58.url = "https://open.bigmodel.cn/api/paas/v4/chat/completions", _this58.permittedErrorPrefixes = [ce, Ae];
    var s = (r = t.bigModel) == null ? void 0 : r.chat;
    _typeof(s) === F && _this58.completeConfig(s, (c = (a = (o = e.directConnection) == null ? void 0 : o.bigModel) == null ? void 0 : a.chat) == null ? void 0 : c.function_handler), (_this58$maxMessages = _this58.maxMessages) !== null && _this58$maxMessages !== void 0 ? _this58$maxMessages : _this58.maxMessages = -1, (_l$model2 = (l = _this58.rawBody).model) !== null && _l$model2 !== void 0 ? _l$model2 : l.model = "glm-4.5";
    return _this58;
  }
  _inherits(Ys, _M14);
  return _createClass(Ys, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: Ys.getTextWFilesContent(r, Ys.getFileContent)
          }, A, M.getRoleViaAI(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee112(e, t) {
        var _this$messages3;
        return _regenerator().w(function (_context112) {
          while (1) switch (_context112.n) {
            case 0:
              (_this$messages3 = this.messages) !== null && _this$messages3 !== void 0 ? _this$messages3 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context112.a(2);
          }
        }, _callee112, this);
      }));
      function callServiceAPI(_x204, _x205) {
        return _callServiceAPI21.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee113(e, t) {
        var _n10;
        return _regenerator().w(function (_context113) {
          while (1) switch (_context113.n) {
            case 0:
              if (!e[p]) {
                _context113.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices.length > 0)) {
                _context113.n = 3;
                break;
              }
              if (!(e.choices[0].delta !== void 0)) {
                _context113.n = 2;
                break;
              }
              return _context113.a(2, this.extractStreamResult(e.choices[0], t));
            case 2:
              if (!(e.choices[0].message !== void 0)) {
                _context113.n = 3;
                break;
              }
              _n10 = e.choices[0].message;
              return _context113.a(2, _n10.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n10.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, d, _n10.content));
            case 3:
              return _context113.a(2, _defineProperty({}, d, ""));
          }
        }, _callee113, this);
      }));
      function extractResultData(_x206, _x207) {
        return _extractResultData24.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee114(e, t) {
        var o, a, c, l, n, s, r, h;
        return _regenerator().w(function (_context114) {
          while (1) switch (_context114.n) {
            case 0:
              n = e.delta, s = e.finish_reason, r = (o = this.messages) == null ? void 0 : o.messageToElements[this.messages.messageToElements.length - 2];
              if (!((r == null ? void 0 : r[0][A]) === te && ((a = r == null ? void 0 : r[0][d]) == null ? void 0 : a.replace(/\n/g, "").trim().length) === 0 && ((c = this.messages) == null || c.removeMessage(r[1][d]), (l = this.messages) == null || l.messageToElements.splice(this.messages.messageToElements.length - 2, 1)), s === "tool_calls")) {
                _context114.n = 2;
                break;
              }
              if (!n.tool_calls) {
                _context114.n = 1;
                break;
              }
              h = {
                tool_calls: n.tool_calls
              };
              return _context114.a(2, this.handleToolsGeneric(h, this.functionHandler, this.messages, t));
            case 1:
              return _context114.a(2, _defineProperty({}, d, (n == null ? void 0 : n.content) || ""));
            case 2:
              return _context114.a(2, _defineProperty({}, d, (n == null ? void 0 : n.content) || ""));
          }
        }, _callee114, this);
      }));
      function extractStreamResult(_x208, _x209) {
        return _extractStreamResult2.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getFileContent",
    value: function getFileContent(e) {
      return e.map(function (t) {
        return t[y] === W ? _defineProperty(_defineProperty({}, y, ze), ze, {
          url: t[R] || ""
        }) : _defineProperty(_defineProperty({}, y, ne), "file_url", {
          url: t[R] || ""
        });
      });
    }
  }]);
}(M);
var Ul = /*#__PURE__*/function (_M15) {
  function Ul(e) {
    var _this59$maxMessages, _o$model8;
    var _this59;
    _classCallCheck(this, Ul);
    var r, o;
    var t = w(e.directConnection),
      n = t.together;
    _this59 = _callSuper(this, Ul, [e, ar(), or, n]), _this59.insertKeyPlaceholderText = _this59.genereteAPIKeyName("Together AI"), _this59.keyHelpUrl = "https://api.together.xyz/settings/api-keys", _this59.url = "https://api.together.xyz/v1/chat/completions", _this59.permittedErrorPrefixes = [Je, Ae];
    var s = (r = t.together) == null ? void 0 : r.chat;
    _typeof(s) === F && _this59.completeConfig(s), (_this59$maxMessages = _this59.maxMessages) !== null && _this59$maxMessages !== void 0 ? _this59$maxMessages : _this59.maxMessages = -1, (_o$model8 = (o = _this59.rawBody).model) !== null && _o$model8 !== void 0 ? _o$model8 : o.model = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo";
    return _this59;
  }
  _inherits(Ul, _M15);
  return _createClass(Ul, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: r[d] || ""
          }, A, r[A] === te ? cn : r[A]);
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee115(e, t) {
        return _regenerator().w(function (_context115) {
          while (1) switch (_context115.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context115.a(2);
          }
        }, _callee115, this);
      }));
      function callServiceAPI(_x210, _x211) {
        return _callServiceAPI22.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee116(e) {
        return _regenerator().w(function (_context116) {
          while (1) switch (_context116.n) {
            case 0:
              if (!e[p]) {
                _context116.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices.length > 0)) {
                _context116.n = 3;
                break;
              }
              if (!(e.choices[0].message !== void 0)) {
                _context116.n = 2;
                break;
              }
              return _context116.a(2, _defineProperty({}, d, e.choices[0].message.content));
            case 2:
              if (!(e.choices[0].delta !== void 0)) {
                _context116.n = 3;
                break;
              }
              return _context116.a(2, _defineProperty({}, d, e.choices[0].delta.content));
            case 3:
              return _context116.a(2, _defineProperty({}, d, ""));
          }
        }, _callee116);
      }));
      function extractResultData(_x212) {
        return _extractResultData25.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var ut = /*#__PURE__*/function (_M16) {
  function ut(e) {
    var _this60;
    _classCallCheck(this, ut);
    var o;
    var t = e.directConnection,
      n = t == null ? void 0 : t.openAI,
      s = {
        images: _defineProperty({}, m, {
          acceptedFormats: ".png",
          maxNumberOfFiles: 2
        })
      };
    _this60 = _callSuper(this, ut, [e, Ss(), _s, n, s]), _this60.insertKeyPlaceholderText = _this60.genereteAPIKeyName("OpenAI"), _this60.keyHelpUrl = vs, _this60.url = "", _this60.permittedErrorPrefixes = [li, "Invalid input image"];
    var r = (o = t == null ? void 0 : t.openAI) == null ? void 0 : o[ee];
    if (_this60[Fe]) {
      var a = _typeof(r) == "object" && r.size ? Number.parseInt(r.size) : 1024;
      _this60[Fe][m] = {
        dimensions: {
          width: a,
          height: a
        }
      };
    }
    _typeof(r) === F && Object.assign(_this60.rawBody, r), _this60.canSendMessage = ut.canFileSendMessage;
    return _this60;
  }
  _inherits(ut, _M16);
  return _createClass(ut, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e);
      return t && t !== "" && (n.prompt = t), n;
    }
    // prettier-ignore
  }, {
    key: "callApiWithImage",
    value: function callApiWithImage(e, t, n) {
      var o, a;
      var s;
      var r = (a = (o = t[t[K] - 1]) == null ? void 0 : o[d]) == null ? void 0 : a.trim();
      if (n[1] || r && r !== "") {
        this.url = ut.IMAGE_EDIT_URL;
        var c = this.preprocessBody(this.rawBody, r);
        s = ut.createFormDataBody(c, n[0], n[1]);
      } else this.url = ut.IMAGE_VARIATIONS_URL, s = ut.createFormDataBody(this.rawBody, n[0]);
      B.tempRemoveContentHeader(this.connectSettings, _e.request.bind(this, this, s, e), !1);
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee117(e, t, n) {
        var s, r;
        return _regenerator().w(function (_context117) {
          while (1) switch (_context117.n) {
            case 0:
              if ((s = this.connectSettings) != null && s.headers) {
                _context117.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              if (!(n != null && n[0])) {
                _context117.n = 2;
                break;
              }
              this.callApiWithImage(e, t, n);
              _context117.n = 4;
              break;
            case 2:
              if (this.connectSettings) {
                _context117.n = 3;
                break;
              }
              throw new Error(qe);
            case 3:
              this.url = ut.IMAGE_GENERATION_URL;
              r = this.preprocessBody(this.rawBody, t[t[K] - 1][d]);
              _e.request(this, r, e);
            case 4:
              return _context117.a(2);
          }
        }, _callee117, this);
      }));
      function callServiceAPI(_x213, _x214, _x215) {
        return _callServiceAPI23.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee118(e) {
        var t;
        return _regenerator().w(function (_context118) {
          while (1) switch (_context118.n) {
            case 0:
              if (!e[p]) {
                _context118.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              t = e.data.map(function (n) {
                return n.url ? _defineProperty(_defineProperty({}, R, n.url), y, W) : _defineProperty(_defineProperty({}, R, "".concat(Hn).concat(n.b64_json)), y, W);
              });
              return _context118.a(2, _defineProperty({}, m, t));
          }
        }, _callee118);
      }));
      function extractResultData(_x216) {
        return _extractResultData26.apply(this, arguments);
      }
      return extractResultData;
    }() // private static readonly MODAL_MARKDOWN = `
    // 1 image:
    // - With text - edits image based on the text
    // - No text - creates a variation of the image
    // 2 images:
    // - The second image needs to be a copy of the first with a transparent area where the edit should take place.
    // Add text to describe the required modification.
    // Click here for [more info](https://platform.openai.com/docs/guides/images/introduction).
    //   `;
  }], [{
    key: "canFileSendMessage",
    value: function canFileSendMessage(e, t) {
      return !!(t != null && t[0]) || !!(e && e.trim() !== "");
    }
  }, {
    key: "createFormDataBody",
    value: function createFormDataBody(e, t, n) {
      var s = new FormData();
      return s.append(W, t), n && s.append("mask", n), Object.keys(e).forEach(function (r) {
        s.append(r, String(e[r]));
      }), s;
    }
  }]);
}(M);
ut.IMAGE_GENERATION_URL = "".concat(ct, "images/generations"), ut.IMAGE_VARIATIONS_URL = "".concat(ct, "images/variations"), ut.IMAGE_EDIT_URL = "".concat(ct, "images/edits");
var zi = ut;
var Hl = function Hl(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  jl = function jl(i, e, t, n) {
    var s = i;
    s[p] ? s[p][y] === Ae ? n(de) : n(He) : t(e);
  },
  $l = function $l() {
    return ue("https://openrouter.ai/api/v1/key", ge, jl);
  };
var Xn = /*#__PURE__*/function (_M17) {
  function Xn(e) {
    var _this61$maxMessages, _o$model9, _a$max_tokens;
    var _this61;
    _classCallCheck(this, Xn);
    var s, r, o, a;
    var n = w(e.directConnection).openRouter;
    _this61 = _callSuper(this, Xn, [e, $l(), Hl, n]), _this61.insertKeyPlaceholderText = _this61.genereteAPIKeyName("OpenRouter"), _this61.keyHelpUrl = "https://openrouter.ai/keys", _this61.url = "https://openrouter.ai/api/v1/chat/completions", _this61.permittedErrorPrefixes = [Je, Ae], _typeof(n) === F && _this61.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.openRouter) == null ? void 0 : r.function_handler), (_this61$maxMessages = _this61.maxMessages) !== null && _this61$maxMessages !== void 0 ? _this61$maxMessages : _this61.maxMessages = -1, (_o$model9 = (o = _this61.rawBody).model) !== null && _o$model9 !== void 0 ? _o$model9 : o.model = "openai/gpt-4o", (_a$max_tokens = (a = _this61.rawBody).max_tokens) !== null && _a$max_tokens !== void 0 ? _a$max_tokens : a.max_tokens = 1e3;
    return _this61;
  }
  _inherits(Xn, _M17);
  return _createClass(Xn, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (o) {
          return _defineProperty({
            content: Xn.getContent(o)
          }, A, M.getRoleViaUser(o[A]));
        }),
        r = [];
      return this.systemMessage && r.push(_defineProperty(_defineProperty({}, A, rs), "content", this.systemMessage)), r.push.apply(r, _toConsumableArray(s)), n.messages = r, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee119(e, t) {
        var _this$messages4;
        return _regenerator().w(function (_context119) {
          while (1) switch (_context119.n) {
            case 0:
              (_this$messages4 = this.messages) !== null && _this$messages4 !== void 0 ? _this$messages4 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context119.a(2);
          }
        }, _callee119, this);
      }));
      function callServiceAPI(_x217, _x218) {
        return _callServiceAPI24.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee120(e, t) {
        var n, s, r, o, a, c, _a4, _c4;
        return _regenerator().w(function (_context120) {
          while (1) switch (_context120.n) {
            case 0:
              if (!e[p]) {
                _context120.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.object === "chat.completion.chunk")) {
                _context120.n = 4;
                break;
              }
              a = (n = e.choices) == null ? void 0 : n[0];
              if (!(a != null && a.delta)) {
                _context120.n = 2;
                break;
              }
              return _context120.a(2, this.extractStreamResult(a, t));
            case 2:
              if (!((s = e.message) != null && s[ee])) {
                _context120.n = 3;
                break;
              }
              c = e.message[ee].map(function (l) {
                return _defineProperty({}, R, l[ze].url);
              });
              return _context120.a(2, _defineProperty(_defineProperty({}, d, e.message.content || ""), m, c));
            case 3:
              return _context120.a(2, _defineProperty({}, d, ""));
            case 4:
              if (!(e.object === "chat.completion")) {
                _context120.n = 6;
                break;
              }
              _a4 = (r = e.choices) == null ? void 0 : r[0];
              if (!(_a4 != null && _a4.message)) {
                _context120.n = 6;
                break;
              }
              if (!_a4.message.tool_calls) {
                _context120.n = 5;
                break;
              }
              return _context120.a(2, this.handleToolsGeneric({
                tool_calls: _a4.message.tool_calls
              }, this.functionHandler, this.messages, t));
            case 5:
              _c4 = ((o = _a4.message[ee]) == null ? void 0 : o.map(function (l) {
                return _defineProperty({}, R, l[ze].url);
              })) || [];
              return _context120.a(2, _defineProperty(_defineProperty({}, d, _a4.message.content || ""), "files", _c4));
            case 6:
              return _context120.a(2, _defineProperty({}, d, ""));
          }
        }, _callee120, this);
      }));
      function extractResultData(_x219, _x220) {
        return _extractResultData27.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee121(e, t) {
        var n, s;
        return _regenerator().w(function (_context121) {
          while (1) switch (_context121.n) {
            case 0:
              n = e.delta;
              if (!(n != null && n[ee])) {
                _context121.n = 1;
                break;
              }
              s = n[ee].map(function (r) {
                return _defineProperty({}, R, r[ze].url);
              });
              return _context121.a(2, _defineProperty(_defineProperty({}, d, n.content || ""), m, s));
            case 1:
              return _context121.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee121, this);
      }));
      function extractStreamResult(_x221, _x222) {
        return _extractStreamResult3.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getAudioContent",
    value: function getAudioContent(e) {
      return e.filter(function (t) {
        return t[y] === j;
      }).map(function (t) {
        var r, o, a;
        var n = (r = t[R]) == null ? void 0 : r.split(",")[1],
          s = (a = (o = t[R]) == null ? void 0 : o.match(/data:audio\/([^;]+)/)) == null ? void 0 : a[1];
        return _defineProperty(_defineProperty({}, y, ln), ln, {
          data: n || "",
          format: s === "wav" || s === "mp3" ? s : "mp3"
        });
      }).filter(function (t) {
        return t[ln].data.length > 0;
      });
    }
  }, {
    key: "getContent",
    value: function getContent(e) {
      if (e[m] && e[m].length > 0) {
        var t = [].concat(_toConsumableArray(Xn.getImageContent(e[m])), _toConsumableArray(Xn.getAudioContent(e[m])));
        return e[d] && e[d].trim().length > 0 && t.unshift(_defineProperty(_defineProperty({}, y, d), d, e[d])), t.length > 0 ? t : e[d] || "";
      }
      return e[d] || "";
    }
  }]);
}(M);
var Gl = function Gl(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  zl = function zl(i, e, t, n) {
    i[p] ? n(de) : t(e);
  },
  Vl = function Vl() {
    return ue("https://api.perplexity.ai/chat/completions", Pe, zl);
  };
var ql = /*#__PURE__*/function (_M18) {
  function ql(e) {
    var _this62$maxMessages, _s$model;
    var _this62;
    _classCallCheck(this, ql);
    var s;
    var n = w(e.directConnection).perplexity;
    _this62 = _callSuper(this, ql, [e, Vl(), Gl, n]), _this62.insertKeyPlaceholderText = _this62.genereteAPIKeyName("Perplexity"), _this62.keyHelpUrl = "https://www.perplexity.ai/settings/api", _this62.url = "https://api.perplexity.ai/chat/completions", _this62.permittedErrorPrefixes = [Xt, co, "Permission denied"], _typeof(n) === F && _this62.completeConfig(n), (_this62$maxMessages = _this62.maxMessages) !== null && _this62$maxMessages !== void 0 ? _this62$maxMessages : _this62.maxMessages = -1, (_s$model = (s = _this62.rawBody).model) !== null && _s$model !== void 0 ? _s$model : s.model = "sonar";
    return _this62;
  }
  _inherits(ql, _M18);
  return _createClass(ql, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: r[d] || ""
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee122(e, t) {
        return _regenerator().w(function (_context122) {
          while (1) switch (_context122.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context122.a(2);
          }
        }, _callee122, this);
      }));
      function callServiceAPI(_x223, _x224) {
        return _callServiceAPI25.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee123(e) {
        var t;
        return _regenerator().w(function (_context123) {
          while (1) switch (_context123.n) {
            case 0:
              if (!e[p]) {
                _context123.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context123.n = 3;
                break;
              }
              t = e.choices[0];
              if (!(t.delta && t.delta.content)) {
                _context123.n = 2;
                break;
              }
              return _context123.a(2, _defineProperty({}, d, t.delta.content));
            case 2:
              if (!(t.message && t.message.content)) {
                _context123.n = 3;
                break;
              }
              return _context123.a(2, _defineProperty({}, d, t.message.content));
            case 3:
              return _context123.a(2, _defineProperty({}, d, ""));
          }
        }, _callee123);
      }));
      function extractResultData(_x225) {
        return _extractResultData28.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var Kl = function Kl(i) {
    return _defineProperty(_defineProperty({}, ce, "Bearer ".concat(i)), z, Y);
  },
  Wl = function Wl(i, e, t, n) {
    var s = i;
    s.detail ? n(s.detail) : t(e);
  },
  Xl = function Xl() {
    return ue("http://localhost:3000/api/v1/models", ge, Wl);
  };
var Zl = /*#__PURE__*/function (_M19) {
  function Zl(e) {
    var _this63$maxMessages, _o$model0, _a$stream;
    var _this63;
    _classCallCheck(this, Zl);
    var s, r, o, a;
    var n = w(e.directConnection).openWebUI;
    _this63 = _callSuper(this, Zl, [e, Xl(), Kl, n]), _this63.insertKeyPlaceholderText = "Open WebUI API Key", _this63.keyHelpUrl = "https://docs.openwebui.com/getting-started/api-endpoints/", _this63.url = "http://localhost:3000/api/chat/completions", _this63.permittedErrorPrefixes = ["Error"], _typeof(n) === F && (_this63.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.openWebUI) == null ? void 0 : r.function_handler), n[m] && n[m].length > 0 && (_this63.rawBody[m] = n[m])), (_this63$maxMessages = _this63.maxMessages) !== null && _this63$maxMessages !== void 0 ? _this63$maxMessages : _this63.maxMessages = -1, (_o$model0 = (o = _this63.rawBody).model) !== null && _o$model0 !== void 0 ? _o$model0 : o.model = "llama3.2", (_a$stream = (a = _this63.rawBody).stream) !== null && _a$stream !== void 0 ? _a$stream : a.stream = !1;
    return _this63;
  }
  _inherits(Zl, _M19);
  return _createClass(Zl, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: M.getTextWImagesContent(r)
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee124(e, t) {
        var _this$messages5;
        return _regenerator().w(function (_context124) {
          while (1) switch (_context124.n) {
            case 0:
              (_this$messages5 = this.messages) !== null && _this$messages5 !== void 0 ? _this$messages5 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {
                readable: !0
              });
            case 1:
              return _context124.a(2);
          }
        }, _callee124, this);
      }));
      function callServiceAPI(_x226, _x227) {
        return _callServiceAPI26.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee125(e, t) {
        var n, s, _s6;
        return _regenerator().w(function (_context125) {
          while (1) switch (_context125.n) {
            case 0:
              if (!e[p]) {
                _context125.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!e[d]) {
                _context125.n = 2;
                break;
              }
              s = e[d].trim();
              return _context125.a(2, this.processStreamingResponse(s, t));
            case 2:
              if (!(e.choices && (n = e.choices[0]) != null && n.message)) {
                _context125.n = 3;
                break;
              }
              _s6 = e.choices[0].message;
              return _context125.a(2, _s6.tool_calls ? this.handleTools({
                tool_calls: _s6.tool_calls
              }, t) : _defineProperty({}, d, _s6.content || ""));
            case 3:
              return _context125.a(2, _defineProperty({}, d, ""));
          }
        }, _callee125, this);
      }));
      function extractResultData(_x228, _x229) {
        return _extractResultData29.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "processStreamingResponse",
    value: function () {
      var _processStreamingResponse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee126(e, t) {
        var r, n, s, _iterator7, _step7, o, a, c, l, _t56, _t57;
        return _regenerator().w(function (_context126) {
          while (1) switch (_context126.p = _context126.n) {
            case 0:
              n = e.split("\n").filter(function (o) {
                return o.trim() !== "";
              });
              s = "";
              _iterator7 = _createForOfIteratorHelper(n);
              _context126.p = 1;
              _iterator7.s();
            case 2:
              if ((_step7 = _iterator7.n()).done) {
                _context126.n = 8;
                break;
              }
              o = _step7.value;
              a = o.trim();
              if (!(a.startsWith("data: ") && (a = a.substring(6)), a !== "[DONE]")) {
                _context126.n = 7;
                break;
              }
              _context126.p = 3;
              c = JSON.parse(a);
              if (!(c.choices && (r = c.choices[0]) != null && r.delta)) {
                _context126.n = 5;
                break;
              }
              l = c.choices[0].delta;
              if (!l.tool_calls) {
                _context126.n = 4;
                break;
              }
              return _context126.a(2, this.handleTools({
                tool_calls: l.tool_calls
              }, t));
            case 4:
              l.content && (s += l.content);
            case 5:
              _context126.n = 7;
              break;
            case 6:
              _context126.p = 6;
              _t56 = _context126.v;
              return _context126.a(3, 7);
            case 7:
              _context126.n = 2;
              break;
            case 8:
              _context126.n = 10;
              break;
            case 9:
              _context126.p = 9;
              _t57 = _context126.v;
              _iterator7.e(_t57);
            case 10:
              _context126.p = 10;
              _iterator7.f();
              return _context126.f(10);
            case 11:
              return _context126.a(2, _defineProperty({}, d, s));
          }
        }, _callee126, this, [[3, 6], [1, 9, 10, 11]]);
      }));
      function processStreamingResponse(_x230, _x231) {
        return _processStreamingResponse.apply(this, arguments);
      }
      return processStreamingResponse;
    }()
  }, {
    key: "handleTools",
    value: function () {
      var _handleTools = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee127(e, t) {
        var n, s, _yield$this$callToolF3, r, o;
        return _regenerator().w(function (_context127) {
          while (1) switch (_context127.n) {
            case 0:
              if (!(!e.tool_calls || !t || !this.functionHandler)) {
                _context127.n = 1;
                break;
              }
              throw Error(bn);
            case 1:
              n = w(t);
              s = e.tool_calls.map(function (a) {
                return {
                  name: a["function"].name,
                  arguments: a["function"].arguments
                };
              });
              _context127.n = 2;
              return this.callToolFunction(this.functionHandler, s);
            case 2:
              _yield$this$callToolF3 = _context127.v;
              r = _yield$this$callToolF3.responses;
              o = _yield$this$callToolF3.processedResponse;
              if (!o) {
                _context127.n = 3;
                break;
              }
              return _context127.a(2, o);
            case 3:
              if (!(n.messages.push(_defineProperty(_defineProperty({
                tool_calls: e.tool_calls
              }, A, cn), "content", "")), !r.find(function (_ref150) {
                var a = _ref150.response;
                return _typeof(a) !== ve;
              }) && s.length === r.length)) {
                _context127.n = 4;
                break;
              }
              return _context127.a(2, (r.forEach(function (a, c) {
                var h;
                var l = (h = e.tool_calls) == null ? void 0 : h[c];
                n == null || n.messages.push(_defineProperty(_defineProperty(_defineProperty({}, A, "tool"), "tool_name", l == null ? void 0 : l["function"].name), "content", a.response));
              }), this.makeAnotherRequest(n, this.messages)));
            case 4:
              throw Error(dn);
            case 5:
              return _context127.a(2);
          }
        }, _callee127, this);
      }));
      function handleTools(_x232, _x233) {
        return _handleTools.apply(this, arguments);
      }
      return handleTools;
    }()
  }]);
}(M);
var Yl = function Yl(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  Jl = function Jl(i, e, t, n) {
    var s = i;
    s[p] ? s[p][y] === Ae ? n(de) : n(He) : t(e);
  },
  Ql = function Ql() {
    return ue("https://api.deepseek.com/models", ge, Jl);
  };
var eh = /*#__PURE__*/function (_M20) {
  function eh(e) {
    var _this64$maxMessages, _s$model2, _r$temperature, _o$max_tokens;
    var _this64;
    _classCallCheck(this, eh);
    var s, r, o;
    var n = w(e.directConnection).deepSeek;
    _this64 = _callSuper(this, eh, [e, Ql(), Yl, n]), _this64.insertKeyPlaceholderText = _this64.genereteAPIKeyName("DeepSeek"), _this64.keyHelpUrl = "https://platform.deepseek.com/api_keys", _this64.url = "https://api.deepseek.com/v1/chat/completions", _this64.permittedErrorPrefixes = [Je, Ae], _typeof(n) === F && _this64.completeConfig(n), (_this64$maxMessages = _this64.maxMessages) !== null && _this64$maxMessages !== void 0 ? _this64$maxMessages : _this64.maxMessages = -1, (_s$model2 = (s = _this64.rawBody).model) !== null && _s$model2 !== void 0 ? _s$model2 : s.model = "deepseek-chat", (_r$temperature = (r = _this64.rawBody).temperature) !== null && _r$temperature !== void 0 ? _r$temperature : r.temperature = 1, (_o$max_tokens = (o = _this64.rawBody).max_tokens) !== null && _o$max_tokens !== void 0 ? _o$max_tokens : o.max_tokens = 4096;
    return _this64;
  }
  _inherits(eh, _M20);
  return _createClass(eh, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: r[d] || ""
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee128(e, t) {
        return _regenerator().w(function (_context128) {
          while (1) switch (_context128.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context128.a(2);
          }
        }, _callee128, this);
      }));
      function callServiceAPI(_x234, _x235) {
        return _callServiceAPI27.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee129(e) {
        var t;
        return _regenerator().w(function (_context129) {
          while (1) switch (_context129.n) {
            case 0:
              if (!e[p]) {
                _context129.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context129.n = 3;
                break;
              }
              t = e.choices[0];
              if (!(t.delta && t.delta.content)) {
                _context129.n = 2;
                break;
              }
              return _context129.a(2, _defineProperty({}, d, t.delta.content));
            case 2:
              if (!(t.message && t.message.content)) {
                _context129.n = 3;
                break;
              }
              return _context129.a(2, _defineProperty({}, d, t.message.content));
            case 3:
              return _context129.a(2, _defineProperty({}, d, ""));
          }
        }, _callee129);
      }));
      function extractResultData(_x236) {
        return _extractResultData30.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var th = function th(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  nh = function nh(i, e, t, n) {
    var r;
    ((r = i.base_resp) == null ? void 0 : r.status_code) === 1004 ? n(de) : t(e);
  },
  sh = function sh() {
    return ue("https://api.minimax.io/v1/files/delete", Pe, nh);
  };
var ih = /*#__PURE__*/function (_M21) {
  function ih(e) {
    var _this65$maxMessages, _s$model3;
    var _this65;
    _classCallCheck(this, ih);
    var s;
    var n = w(e.directConnection).miniMax;
    _this65 = _callSuper(this, ih, [e, sh(), th, n]), _this65.insertKeyPlaceholderText = _this65.genereteAPIKeyName("MiniMax"), _this65.keyHelpUrl = "https://www.minimaxi.com", _this65.url = "https://api.minimax.io/v1/text/chatcompletion_v2", _this65.permittedErrorPrefixes = [Je, Ae, "insufficient balance"], _typeof(n) === F && _this65.completeConfig(n), (_this65$maxMessages = _this65.maxMessages) !== null && _this65$maxMessages !== void 0 ? _this65$maxMessages : _this65.maxMessages = -1, (_s$model3 = (s = _this65.rawBody).model) !== null && _s$model3 !== void 0 ? _s$model3 : s.model = "MiniMax-M1";
    return _this65;
  }
  _inherits(ih, _M21);
  return _createClass(ih, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: r[d] || ""
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee130(e, t) {
        return _regenerator().w(function (_context130) {
          while (1) switch (_context130.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context130.a(2);
          }
        }, _callee130, this);
      }));
      function callServiceAPI(_x237, _x238) {
        return _callServiceAPI28.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee131(e) {
        var t, _n11;
        return _regenerator().w(function (_context131) {
          while (1) switch (_context131.n) {
            case 0:
              if (!e[p]) {
                _context131.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context131.n = 3;
                break;
              }
              _n11 = e.choices[0];
              if (!(_n11.delta && _n11.delta.content)) {
                _context131.n = 2;
                break;
              }
              return _context131.a(2, _defineProperty({}, d, _n11.delta.content));
            case 2:
              if (!(_n11.message && _n11.message.content)) {
                _context131.n = 3;
                break;
              }
              return _context131.a(2, _defineProperty({}, d, _n11.message.content));
            case 3:
              if (!(typeof ((t = e.base_resp) == null ? void 0 : t.status_code) == "number" && e.base_resp.status_code > 0)) {
                _context131.n = 4;
                break;
              }
              throw e.base_resp.status_msg;
            case 4:
              return _context131.a(2, _defineProperty({}, d, ""));
          }
        }, _callee131);
      }));
      function extractResultData(_x239) {
        return _extractResultData31.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var rh = function rh(i) {
    return _defineProperty(_defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y), "accept", Y);
  },
  oh = function oh(i, e, t, n) {
    i.detail ? n(de) : t(e);
  },
  ah = function ah() {
    return ue("https://api.mistral.ai/v1/models", ge, oh);
  };
var hr = /*#__PURE__*/function (_M22) {
  function hr(e) {
    var _this66$maxMessages, _o$model1;
    var _this66;
    _classCallCheck(this, hr);
    var s, r, o;
    var n = w(e.directConnection).mistral;
    _this66 = _callSuper(this, hr, [e, ah(), rh, n]), _this66.insertKeyPlaceholderText = _this66.genereteAPIKeyName("Mistral"), _this66.keyHelpUrl = "https://console.mistral.ai/api-keys/", _this66.url = "https://api.mistral.ai/v1/chat/completions", _this66.permittedErrorPrefixes = [Xt], _typeof(n) === F && _this66.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.mistral) == null ? void 0 : r.function_handler), (_this66$maxMessages = _this66.maxMessages) !== null && _this66$maxMessages !== void 0 ? _this66$maxMessages : _this66.maxMessages = -1, (_o$model1 = (o = _this66.rawBody).model) !== null && _o$model1 !== void 0 ? _o$model1 : o.model = "mistral-small-latest";
    return _this66;
  }
  _inherits(hr, _M22);
  return _createClass(hr, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty(_defineProperty({}, A, M.getRoleViaAI(r[A])), "content", M.getTextWFilesContent(r, hr.getFileContent));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee132(e, t) {
        var _this$messages6;
        return _regenerator().w(function (_context132) {
          while (1) switch (_context132.n) {
            case 0:
              (_this$messages6 = this.messages) !== null && _this$messages6 !== void 0 ? _this$messages6 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context132.a(2);
          }
        }, _callee132, this);
      }));
      function callServiceAPI(_x240, _x241) {
        return _callServiceAPI29.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee133(e, t) {
        var _n12;
        return _regenerator().w(function (_context133) {
          while (1) switch (_context133.n) {
            case 0:
              if (!e.message) {
                _context133.n = 1;
                break;
              }
              throw e.message;
            case 1:
              if (!e[p]) {
                _context133.n = 2;
                break;
              }
              throw e[p].message;
            case 2:
              if (!(e.choices && e.choices.length > 0)) {
                _context133.n = 4;
                break;
              }
              _n12 = e.choices[0];
              if (!_n12.delta) {
                _context133.n = 3;
                break;
              }
              return _context133.a(2, this.extractStreamResult(_n12, t));
            case 3:
              if (!_n12.message) {
                _context133.n = 4;
                break;
              }
              return _context133.a(2, _n12.message.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n12.message.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, d, _n12.message.content || ""));
            case 4:
              return _context133.a(2, _defineProperty({}, d, ""));
          }
        }, _callee133, this);
      }));
      function extractResultData(_x242, _x243) {
        return _extractResultData32.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee134(e, t) {
        var n, s, r;
        return _regenerator().w(function (_context134) {
          while (1) switch (_context134.n) {
            case 0:
              n = e.delta, s = e.finish_reason;
              if (!(s === "tool_calls" && n != null && n.tool_calls)) {
                _context134.n = 1;
                break;
              }
              r = {
                tool_calls: n.tool_calls
              };
              return _context134.a(2, this.handleToolsGeneric(r, this.functionHandler, this.messages, t));
            case 1:
              return _context134.a(2, _defineProperty({}, d, (n == null ? void 0 : n.content) || ""));
          }
        }, _callee134, this);
      }));
      function extractStreamResult(_x244, _x245) {
        return _extractStreamResult4.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getFileContent",
    value: function getFileContent(e) {
      return e.map(function (t) {
        return t[y] === W ? _defineProperty(_defineProperty({}, y, ze), ze, t[R] || "") : _defineProperty(_defineProperty({}, y, d), d, "[Unsupported ".concat(ne, " ").concat(y, ": ").concat(t[y], "]"));
      });
    }
  }]);
}(M);
var dr = /*#__PURE__*/function (_M23) {
  function dr(e) {
    var _this67$maxMessages, _l$model3;
    var _this67;
    _classCallCheck(this, dr);
    var r, o, a, c, l;
    var t = w(e.directConnection),
      n = t.groq;
    _this67 = _callSuper(this, dr, [e, Io(), Ro, n]), _this67.insertKeyPlaceholderText = _this67.genereteAPIKeyName("Groq"), _this67.keyHelpUrl = "https://console.groq.com/keys", _this67.url = "https://api.groq.com/openai/v1/chat/completions", _this67.permittedErrorPrefixes = [Xt, "property"];
    var s = (r = t.groq) == null ? void 0 : r.chat;
    _typeof(s) === F && _this67.completeConfig(s, (c = (a = (o = e.directConnection) == null ? void 0 : o.groq) == null ? void 0 : a.chat) == null ? void 0 : c.function_handler), (_this67$maxMessages = _this67.maxMessages) !== null && _this67$maxMessages !== void 0 ? _this67$maxMessages : _this67.maxMessages = -1, (_l$model3 = (l = _this67.rawBody).model) !== null && _l$model3 !== void 0 ? _l$model3 : l.model = "llama-3.3-70b-versatile";
    return _this67;
  }
  _inherits(dr, _M23);
  return _createClass(dr, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: dr.getTextWImagesContent(r)
          }, A, r[A] === te ? cn : r[A]);
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee135(e, t) {
        var _this$messages7;
        return _regenerator().w(function (_context135) {
          while (1) switch (_context135.n) {
            case 0:
              (_this$messages7 = this.messages) !== null && _this$messages7 !== void 0 ? _this$messages7 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context135.a(2);
          }
        }, _callee135, this);
      }));
      function callServiceAPI(_x246, _x247) {
        return _callServiceAPI30.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee136(e, t) {
        var n, s, r, o;
        return _regenerator().w(function (_context136) {
          while (1) switch (_context136.n) {
            case 0:
              if (!e[p]) {
                _context136.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              return _context136.a(2, (s = (n = e.choices) == null ? void 0 : n[0]) != null && s.delta ? this.extractStreamResult(e.choices[0], t) : (o = (r = e.choices) == null ? void 0 : r[0]) != null && o.message ? e.choices[0].message.tool_calls ? this.handleToolsGeneric(e.choices[0].message, this.functionHandler, this.messages, t, {
                message: this.systemMessage
              }) : _defineProperty({}, d, e.choices[0].message.content || "") : _defineProperty({}, d, ""));
          }
        }, _callee136, this);
      }));
      function extractResultData(_x248, _x249) {
        return _extractResultData33.apply(this, arguments);
      }
      return extractResultData;
    }() // https://console.groq.com/docs/tool-use
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee137(e, t) {
        return _regenerator().w(function (_context137) {
          while (1) switch (_context137.n) {
            case 0:
              return _context137.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee137, this);
      }));
      function extractStreamResult(_x250, _x251) {
        return _extractStreamResult5.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }]);
}(M);
var ch = function ch(i) {
    return _defineProperty(_defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y), "accept", Y);
  },
  lh = function lh(i, e, t, n) {
    _typeof(i.message) === ve ? n(de) : t(e);
  },
  hh = function hh() {
    return ue("https://api.cohere.ai/v1/models", ge, lh);
  };
var Js = /*#__PURE__*/function (_M24) {
  function Js(e) {
    var _this68$maxMessages, _s$model4;
    var _this68;
    _classCallCheck(this, Js);
    var s;
    var n = w(e.directConnection).cohere;
    if (_this68 = _callSuper(this, Js, [e, hh(), ch, n]), _this68.insertKeyPlaceholderText = _this68.genereteAPIKeyName("Cohere"), _this68.keyHelpUrl = "https://dashboard.cohere.ai/api-keys", _this68.permittedErrorPrefixes = ["invalid"], _this68.url = "https://api.cohere.com/v2/chat", _typeof(n) === F) {
      var r = ie.processCohere(n);
      _this68.canSendMessage = function () {
        return r;
      }, _this68.cleanConfig(n), Object.assign(_this68.rawBody, n);
    }
    (_this68$maxMessages = _this68.maxMessages) !== null && _this68$maxMessages !== void 0 ? _this68$maxMessages : _this68.maxMessages = -1, (_s$model4 = (s = _this68.rawBody).model) !== null && _s$model4 !== void 0 ? _s$model4 : s.model = "command-a-03-2025";
    return _this68;
  }
  _inherits(Js, _M24);
  return _createClass(Js, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.key;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = t.filter(function (r) {
          return r[d];
        });
      return n.messages = s.map(function (r) {
        return _defineProperty(_defineProperty({}, A, M.getRoleViaAI(r[A])), "content", r[d]);
      }), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee138(e, t) {
        return _regenerator().w(function (_context138) {
          while (1) switch (_context138.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {
                readable: !0
              });
            case 1:
              return _context138.a(2);
          }
        }, _callee138, this);
      }));
      function callServiceAPI(_x252, _x253) {
        return _callServiceAPI31.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData34 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee139(e) {
        var t, n, s, r;
        return _regenerator().w(function (_context139) {
          while (1) switch (_context139.n) {
            case 0:
              if (!(typeof e.message == "string")) {
                _context139.n = 1;
                break;
              }
              throw e.message;
            case 1:
              if (!(this.stream && e[d])) {
                _context139.n = 2;
                break;
              }
              r = Js.parseBundledEvents(e[d]);
              return _context139.a(2, {
                text: Js.aggregateBundledEventsText(r)
              });
            case 2:
              if (!("message" in e && (s = (n = (t = e.message) == null ? void 0 : t.content) == null ? void 0 : n[0]) != null && s[d])) {
                _context139.n = 3;
                break;
              }
              return _context139.a(2, _defineProperty({}, d, e.message.content[0][d]));
            case 3:
              throw new Error("Invalid response format from Cohere API");
            case 4:
              return _context139.a(2);
          }
        }, _callee139, this);
      }));
      function extractResultData(_x254) {
        return _extractResultData34.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "parseBundledEvents",
    value: function parseBundledEvents(e) {
      var t = e.trim().split("\n"),
        n = [];
      var _iterator8 = _createForOfIteratorHelper(t),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var s = _step8.value;
          if (s.trim()) try {
            var r = JSON.parse(s);
            n.push(r);
          } catch (r) {
            console[p]("Failed to parse line:", s, r);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      return n;
    }
  }, {
    key: "aggregateBundledEventsText",
    value: function aggregateBundledEventsText(e) {
      return e.filter(function (t) {
        var n, s, r;
        return t[y] === "content-delta" && ((r = (s = (n = t.delta) == null ? void 0 : n.message) == null ? void 0 : s.content) == null ? void 0 : r[d]);
      }).map(function (t) {
        var n, s, r;
        return (r = (s = (n = t.delta) == null ? void 0 : n.message) == null ? void 0 : s.content) == null ? void 0 : r[d];
      }).join("");
    }
  }]);
}(M);
var dh = function dh() {
    return _defineProperty({}, z, Y);
  },
  uh = function uh(i, e, t, n) {
    var r;
    var s = i;
    s[p] ? s[p].code === 403 || (r = s[p].message) != null && r.includes("API key") ? n(de) : n(He) : t(e);
  },
  ph = function ph() {
    var i = "https://generativelanguage.googleapis.com/v1beta/models?key=";
    return ue(i, ge, uh, function (e) {
      return "".concat(i).concat(e);
    });
  };
var ur = /*#__PURE__*/function (_M25) {
  function ur(e) {
    var _this69$maxMessages;
    var _this69;
    _classCallCheck(this, ur);
    var s, r;
    var n = w(e.directConnection).gemini;
    if (_this69 = _callSuper(this, ur, [e, ph(), dh, n]), _this69.insertKeyPlaceholderText = _this69.genereteAPIKeyName("Gemini"), _this69.keyHelpUrl = "https://aistudio.google.com/app/apikey", _this69.urlPrefix = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", _this69.url = "", _this69.permittedErrorPrefixes = ["API_KEY_INVALID"], _typeof(n) === F) {
      var o = n;
      o.model && (_this69.urlPrefix = "https://generativelanguage.googleapis.com/v1beta/models/".concat(o.model, ":generateContent")), _this69.cleanConfig(o), _this69.completeConfig(o, (r = (s = e.directConnection) == null ? void 0 : s.gemini) == null ? void 0 : r.function_handler);
    }
    (_this69$maxMessages = _this69.maxMessages) !== null && _this69$maxMessages !== void 0 ? _this69$maxMessages : _this69.maxMessages = -1;
    return _this69;
  }
  _inherits(ur, _M25);
  return _createClass(ur, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.model;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return ur.getContent(r);
        });
      return n.contents = s, this.systemMessage && (n.systemInstruction = {
        parts: [_defineProperty({}, d, this.systemMessage)]
      }), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee140(e, t) {
        var _this$messages8;
        var n, s;
        return _regenerator().w(function (_context140) {
          while (1) switch (_context140.n) {
            case 0:
              if (this.connectSettings) {
                _context140.n = 1;
                break;
              }
              throw new Error(qe);
            case 1:
              (_this$messages8 = this.messages) !== null && _this$messages8 !== void 0 ? _this$messages8 : this.messages = e;
              n = this.preprocessBody(this.rawBody, t), s = this.stream;
              s && (_typeof(s) !== F || !s.simulation) || n.stream ? (this.url = "".concat(this.urlPrefix.replace(":generateContent", ":streamGenerateContent"), "?alt=sse&key=").concat(this.key), q.request(this, n, e)) : (this.url = "".concat(this.urlPrefix, "?key=").concat(this.key), _e.request(this, n, e));
            case 2:
              return _context140.a(2);
          }
        }, _callee140, this);
      }));
      function callServiceAPI(_x255, _x256) {
        return _callServiceAPI32.apply(this, arguments);
      }
      return callServiceAPI;
    }() // https://ai.google.dev/gemini-api/docs/function-calling?example=weather
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData35 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee141(e, t) {
        var n, s, r, o, a, c, l, h;
        return _regenerator().w(function (_context141) {
          while (1) switch (_context141.n) {
            case 0:
              if (!e[p]) {
                _context141.n = 1;
                break;
              }
              throw e[p].message || "Gemini API Error";
            case 1:
              if (!((r = (s = (n = e.candidates) == null ? void 0 : n[0]) == null ? void 0 : s.content) != null && r.parts)) {
                _context141.n = 3;
                break;
              }
              a = e.candidates[0].content.parts, c = a.find(function (u) {
                return u.functionCall;
              });
              if (!(c != null && c.functionCall)) {
                _context141.n = 2;
                break;
              }
              return _context141.a(2, this.handleTools([c.functionCall], t));
            case 2:
              l = a.find(function (u) {
                return u[d];
              }), h = a.find(function (u) {
                var g;
                return ((g = u.inlineData) == null ? void 0 : g.mimeType) === "image/png";
              });
              return _context141.a(2, _defineProperty(_defineProperty({}, d, (l == null ? void 0 : l[d]) || ""), m, (o = h == null ? void 0 : h.inlineData) != null && o.data ? [_defineProperty({}, R, "data:image/png;base64,".concat(h.inlineData.data))] : []));
            case 3:
              return _context141.a(2, _defineProperty({}, d, ""));
          }
        }, _callee141, this);
      }));
      function extractResultData(_x257, _x258) {
        return _extractResultData35.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "handleTools",
    value: function () {
      var _handleTools2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee142(e, t) {
        var n, s, _yield$this$callToolF4, r, o, a, c;
        return _regenerator().w(function (_context142) {
          while (1) switch (_context142.n) {
            case 0:
              if (!(!e || !t || !this.functionHandler)) {
                _context142.n = 1;
                break;
              }
              throw Error(bn);
            case 1:
              n = w(t);
              s = e.map(function (c) {
                return {
                  name: c.name,
                  arguments: ae(c.args)
                };
              });
              _context142.n = 2;
              return this.callToolFunction(this.functionHandler, s);
            case 2:
              _yield$this$callToolF4 = _context142.v;
              r = _yield$this$callToolF4.responses;
              o = _yield$this$callToolF4.processedResponse;
              if (!o) {
                _context142.n = 3;
                break;
              }
              return _context142.a(2, o);
            case 3:
              a = _defineProperty({
                parts: e.map(function (c) {
                  return {
                    functionCall: {
                      name: c.name,
                      args: c.args
                    }
                  };
                })
              }, A, "model");
              if (!(n.contents.push(a), !r.find(function (_ref179) {
                var c = _ref179.response;
                return _typeof(c) !== ve;
              }) && s.length === r.length)) {
                _context142.n = 4;
                break;
              }
              c = _defineProperty({
                parts: r.map(function (l, h) {
                  return {
                    functionResponse: {
                      name: e[h].name,
                      response: {
                        result: l.response
                      }
                    }
                  };
                })
              }, A, $);
              return _context142.a(2, (n.contents.push(c), this.makeAnotherRequest(n, this.messages)));
            case 4:
              throw Error(dn);
            case 5:
              return _context142.a(2);
          }
        }, _callee142, this);
      }));
      function handleTools(_x259, _x260) {
        return _handleTools2.apply(this, arguments);
      }
      return handleTools;
    }()
  }], [{
    key: "getContent",
    value: function getContent(e) {
      var t = [];
      return e[d] && e[d].trim().length > 0 && t.push(_defineProperty({}, d, e[d])), e[m] && e[m].length > 0 && e[m].forEach(function (n) {
        if (n[R] && n[R].includes("data:")) {
          var _n$R$split = n[R].split(","),
            _n$R$split2 = _slicedToArray(_n$R$split, 2),
            s = _n$R$split2[0],
            r = _n$R$split2[1];
          t.push({
            inlineData: {
              mimeType: s.replace("data:", "").replace(";base64", ""),
              data: r
            }
          });
        }
      }), _defineProperty({
        parts: t
      }, A, e[A] === $ ? $ : "model");
    }
  }]);
}(M);
var fh = function fh(i) {
    return _defineProperty(_defineProperty(_defineProperty({
      "x-api-key": i
    }, z, Y), "anthropic-version", "2023-06-01"), "anthropic-dangerous-direct-browser-access", "true");
  },
  mh = function mh(i, e, t, n) {
    var s = i;
    s[p] ? s[p][y] === Ae ? n(de) : n(He) : t(e);
  },
  gh = function gh() {
    return ue("https://api.anthropic.com/v1/models", ge, mh);
  },
  Vt = /*#__PURE__*/function (_M26) {
    function Vt(e) {
      var _this70$maxMessages, _o$model10, _a$max_tokens2;
      var _this70;
      _classCallCheck(this, Vt);
      var s, r, o, a;
      var n = w(e.directConnection).claude;
      if (_this70 = _callSuper(this, Vt, [e, gh(), fh, n]), _this70.insertKeyPlaceholderText = _this70.genereteAPIKeyName("Claude"), _this70.keyHelpUrl = "https://console.anthropic.com/settings/keys", _this70.url = "".concat(Vt.CLAUDE_BASE_URL, "messages"), _this70.permittedErrorPrefixes = [Ae, Je], _this70._streamToolCalls = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, y, "tool_use"), "id", ""), "name", ""), "input", ""), _this70.url = Vt.buildUrl(n), _typeof(n) === F) {
        var c = n;
        _this70.extractSystemBlocks(c), _this70.cleanConfig(c), _this70.completeConfig(c, (r = (s = e.directConnection) == null ? void 0 : s.claude) == null ? void 0 : r.function_handler);
      }
      (_this70$maxMessages = _this70.maxMessages) !== null && _this70$maxMessages !== void 0 ? _this70$maxMessages : _this70.maxMessages = -1, (_o$model10 = (o = _this70.rawBody).model) !== null && _o$model10 !== void 0 ? _o$model10 : o.model = "claude-sonnet-4-6", (_a$max_tokens2 = (a = _this70.rawBody).max_tokens) !== null && _a$max_tokens2 !== void 0 ? _a$max_tokens2 : a.max_tokens = 4096;
      return _this70;
    }
    _inherits(Vt, _M26);
    return _createClass(Vt, [{
      key: "extractSystemBlocks",
      value: function extractSystemBlocks(e) {
        Array.isArray(e.system_prompt) && (this._systemBlocks = e.system_prompt, delete e.system_prompt);
      }
    }, {
      key: "cleanConfig",
      value: function cleanConfig(e) {
        delete e.custom_base_url;
      }
    }, {
      key: "preprocessBody",
      value: function preprocessBody(e, t) {
        var n = w(e),
          s = this.processMessages(t).map(function (r) {
            return _defineProperty({
              content: Vt.getTextWFilesContent(r, Vt.getFileContent)
            }, A, M.getRoleViaUser(r[A]));
          });
        return n.messages = s, this._systemBlocks ? n.system = this._systemBlocks : this.systemMessage && (n.system = this.systemMessage), n;
      }
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee143(e, t) {
          var _this$messages9;
          return _regenerator().w(function (_context143) {
            while (1) switch (_context143.n) {
              case 0:
                (_this$messages9 = this.messages) !== null && _this$messages9 !== void 0 ? _this$messages9 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
              case 1:
                return _context143.a(2);
            }
          }, _callee143, this);
        }));
        function callServiceAPI(_x261, _x262) {
          return _callServiceAPI33.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }, {
      key: "extractResultData",
      value: function () {
        var _extractResultData36 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee144(e, t) {
          var n, s, r, o, a;
          return _regenerator().w(function (_context144) {
            while (1) switch (_context144.n) {
              case 0:
                if (!e[p]) {
                  _context144.n = 1;
                  break;
                }
                throw e[p].message;
              case 1:
                if (!(e.content && e.content.length > 0)) {
                  _context144.n = 3;
                  break;
                }
                o = e.content.find(function (c) {
                  return c[y] === "tool_use";
                });
                if (!o) {
                  _context144.n = 2;
                  break;
                }
                return _context144.a(2, this.handleTools([o], t));
              case 2:
                a = e.content.find(function (c) {
                  return c[y] === d;
                });
                if (!a) {
                  _context144.n = 3;
                  break;
                }
                return _context144.a(2, _defineProperty({}, d, a[d]));
              case 3:
                if (!(e[y] === "content_block_delta" && e.delta && e.delta[y] === "text_delta")) {
                  _context144.n = 4;
                  break;
                }
                return _context144.a(2, _defineProperty({}, d, e.delta[d] || ""));
              case 4:
                if (!(e[y] === "content_block_start" && ((n = e.content_block) == null ? void 0 : n[y]) === "tool_use")) {
                  _context144.n = 5;
                  break;
                }
                this._streamToolCalls = e.content_block, this._streamToolCalls.input = "";
                _context144.n = 7;
                break;
              case 5:
                if (!(e[y] === "content_block_delta" && ((s = e.delta) == null ? void 0 : s[y]) === "input_json_delta")) {
                  _context144.n = 6;
                  break;
                }
                this._streamToolCalls.input += e.delta.partial_json || "";
                _context144.n = 7;
                break;
              case 6:
                if (!(e[y] === "message_delta" && ((r = e.delta) == null ? void 0 : r.stop_reason) === "tool_use")) {
                  _context144.n = 7;
                  break;
                }
                return _context144.a(2, (this._streamToolCalls.input = this._streamToolCalls.input ? JSON.parse(this._streamToolCalls.input) : {}, this.handleTools([this._streamToolCalls], t)));
              case 7:
                return _context144.a(2, _defineProperty({}, d, ""));
            }
          }, _callee144, this);
        }));
        function extractResultData(_x263, _x264) {
          return _extractResultData36.apply(this, arguments);
        }
        return extractResultData;
      }()
    }, {
      key: "handleTools",
      value: function () {
        var _handleTools3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee145(e, t) {
          var n, s, _yield$this$callToolF5, r, o, a, c;
          return _regenerator().w(function (_context145) {
            while (1) switch (_context145.n) {
              case 0:
                if (!(!e || !t || !this.functionHandler)) {
                  _context145.n = 1;
                  break;
                }
                throw Error(bn);
              case 1:
                n = w(t);
                s = e.map(function (c) {
                  return {
                    name: c.name,
                    arguments: ae(c.input)
                  };
                });
                _context145.n = 2;
                return this.callToolFunction(this.functionHandler, s);
              case 2:
                _yield$this$callToolF5 = _context145.v;
                r = _yield$this$callToolF5.responses;
                o = _yield$this$callToolF5.processedResponse;
                if (!o) {
                  _context145.n = 3;
                  break;
                }
                return _context145.a(2, o);
              case 3:
                a = e.map(function (c) {
                  return _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, y, "tool_use"), "id", c.id), "name", c.name), "input", c.input);
                });
                if (!(n.messages.push(_defineProperty(_defineProperty({}, A, "assistant"), "content", a)), !r.find(function (_ref187) {
                  var c = _ref187.response;
                  return _typeof(c) !== ve;
                }) && s.length === r.length)) {
                  _context145.n = 4;
                  break;
                }
                c = r.map(function (l, h) {
                  return _defineProperty(_defineProperty(_defineProperty({}, y, "tool_result"), "tool_use_id", e[h].id), "content", l.response);
                });
                return _context145.a(2, (n.messages.push(_defineProperty(_defineProperty({}, A, $), "content", c)), this.makeAnotherRequest(n, this.messages)));
              case 4:
                throw Error(dn);
              case 5:
                return _context145.a(2);
            }
          }, _callee145, this);
        }));
        function handleTools(_x265, _x266) {
          return _handleTools3.apply(this, arguments);
        }
        return handleTools;
      }()
    }], [{
      key: "buildUrl",
      value: function buildUrl(e) {
        return "".concat(_typeof(e) == "object" && (e == null ? void 0 : e.custom_base_url) || Vt.CLAUDE_BASE_URL, "messages");
      }
    }, {
      key: "getFileContent",
      value: function getFileContent(e) {
        return e.map(function (t) {
          var n, s, r;
          if (t[y] === W) {
            var o = (n = t[R]) == null ? void 0 : n.split(",")[1],
              a = ((r = (s = t[R]) == null ? void 0 : s.match(/data:([^;]+)/)) == null ? void 0 : r[1]) || "image/jpeg";
            return _defineProperty(_defineProperty({}, y, W), "source", _defineProperty(_defineProperty(_defineProperty({}, y, "base64"), "media_type", a), "data", o || ""));
          }
          return _defineProperty(_defineProperty({}, y, d), d, "[Unsupported ".concat(ne, " ").concat(y, ": ").concat(t[y], "]"));
        });
      }
    }]);
  }(M);
Vt.CLAUDE_BASE_URL = "https://api.anthropic.com/v1/";
var Vi = Vt;
var bh = function bh() {
    return {};
  },
  yh = function yh() {},
  Eh = function Eh() {
    return ue("", ge, yh);
  },
  ss = /*#__PURE__*/function (_M27) {
    function ss(e) {
      var _this71$maxMessages, _o$model11, _a$stream2;
      var _this71;
      _classCallCheck(this, ss);
      var s, r, o, a;
      var t = w(e.directConnection);
      _this71 = _callSuper(this, ss, [e, Eh(), bh, {
        key: "placeholder"
      }]), _this71.insertKeyPlaceholderText = "", _this71.keyHelpUrl = "", _this71.validateKeyProperty = !1, _this71.url = "http://localhost:11434/api/chat", _this71.permittedErrorPrefixes = ["Error"];
      var n = t.ollama;
      _typeof(n) === F && _this71.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.ollama) == null ? void 0 : r.function_handler), (_this71$maxMessages = _this71.maxMessages) !== null && _this71$maxMessages !== void 0 ? _this71$maxMessages : _this71.maxMessages = -1, (_o$model11 = (o = _this71.rawBody).model) !== null && _o$model11 !== void 0 ? _o$model11 : o.model = "llama3.2", (_a$stream2 = (a = _this71.rawBody).stream) !== null && _a$stream2 !== void 0 ? _a$stream2 : a.stream = !1;
      return _this71;
    }
    _inherits(ss, _M27);
    return _createClass(ss, [{
      key: "preprocessBody",
      value: function preprocessBody(e, t) {
        var n = w(e),
          s = this.processMessages(t).map(function (r) {
            var o = _defineProperty({
              content: r[d] || ""
            }, A, M.getRoleViaUser(r[A]));
            if (r[m] && r[m].length > 0) {
              var a = ss.getImageData(r[m]);
              a.length > 0 && (o[ee] = a);
            }
            return o;
          });
        return this.addSystemMessage(s), n.messages = s, n;
      }
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI34 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee146(e, t) {
          var _this$messages0;
          return _regenerator().w(function (_context146) {
            while (1) switch (_context146.n) {
              case 0:
                (_this$messages0 = this.messages) !== null && _this$messages0 !== void 0 ? _this$messages0 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {
                  readable: !0
                });
              case 1:
                return _context146.a(2);
            }
          }, _callee146, this);
        }));
        function callServiceAPI(_x267, _x268) {
          return _callServiceAPI34.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }, {
      key: "parseMessage",
      value: function parseMessage(e) {
        return e.split("\n").filter(function (t) {
          return t.trim();
        }).map(function (t) {
          return JSON.parse(t);
        });
      }
    }, {
      key: "extractResultData",
      value: function () {
        var _extractResultData37 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee147(e, t) {
          var n, s, r, o, _iterator9, _step9, l, a, c, _t58, _t59, _t60;
          return _regenerator().w(function (_context147) {
            while (1) switch (_context147.p = _context147.n) {
              case 0:
                if (!e[p]) {
                  _context147.n = 1;
                  break;
                }
                throw e[p].message;
              case 1:
                if (!e[d]) {
                  _context147.n = 11;
                  break;
                }
                r = this.parseMessage(e[d]), o = [];
                _iterator9 = _createForOfIteratorHelper(r);
                _context147.p = 2;
                _iterator9.s();
              case 3:
                if ((_step9 = _iterator9.n()).done) {
                  _context147.n = 7;
                  break;
                }
                l = _step9.value;
                _t58 = (n = l.message) != null && n.tool_calls;
                if (!_t58) {
                  _context147.n = 5;
                  break;
                }
                _t59 = o;
                _context147.n = 4;
                return this.handleTools({
                  tool_calls: l.message.tool_calls
                }, t);
              case 4:
                _t59.push.call(_t59, _context147.v);
              case 5:
                o.push(_defineProperty({}, d, ((s = l.message) == null ? void 0 : s.content) || ""));
              case 6:
                _context147.n = 3;
                break;
              case 7:
                _context147.n = 9;
                break;
              case 8:
                _context147.p = 8;
                _t60 = _context147.v;
                _iterator9.e(_t60);
              case 9:
                _context147.p = 9;
                _iterator9.f();
                return _context147.f(9);
              case 10:
                a = o.map(function (l) {
                  return l[d];
                }), c = a.lastIndexOf(ss.THINK_END);
                return _context147.a(2, c === -1 || t != null && t.think ? _defineProperty({}, d, a.join("")) : _defineProperty(_defineProperty({}, d, a.slice(c + 1).join("")), "overwrite", !0));
              case 11:
                return _context147.a(2, e.message ? e.message.tool_calls ? this.handleTools({
                  tool_calls: e.message.tool_calls
                }, t) : _defineProperty({}, d, e.message.content || "") : _defineProperty({}, d, ""));
            }
          }, _callee147, this, [[2, 8, 9, 10]]);
        }));
        function extractResultData(_x269, _x270) {
          return _extractResultData37.apply(this, arguments);
        }
        return extractResultData;
      }()
    }, {
      key: "handleTools",
      value: function () {
        var _handleTools4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee148(e, t) {
          var n, s, _yield$this$callToolF6, r, o;
          return _regenerator().w(function (_context148) {
            while (1) switch (_context148.n) {
              case 0:
                if (!(!e.tool_calls || !t || !this.functionHandler)) {
                  _context148.n = 1;
                  break;
                }
                throw Error(bn);
              case 1:
                n = w(t);
                s = e.tool_calls.map(function (a) {
                  return {
                    name: a["function"].name,
                    arguments: ae(a["function"].arguments)
                  };
                });
                _context148.n = 2;
                return this.callToolFunction(this.functionHandler, s);
              case 2:
                _yield$this$callToolF6 = _context148.v;
                r = _yield$this$callToolF6.responses;
                o = _yield$this$callToolF6.processedResponse;
                if (!o) {
                  _context148.n = 3;
                  break;
                }
                return _context148.a(2, o);
              case 3:
                if (!(n.messages.push(_defineProperty(_defineProperty({
                  tool_calls: e.tool_calls
                }, A, cn), "content", "")), !r.find(function (_ref195) {
                  var a = _ref195.response;
                  return _typeof(a) !== ve;
                }) && s.length === r.length)) {
                  _context148.n = 4;
                  break;
                }
                return _context148.a(2, (r.forEach(function (a, c) {
                  var h;
                  var l = (h = e.tool_calls) == null ? void 0 : h[c];
                  n == null || n.messages.push(_defineProperty(_defineProperty(_defineProperty({}, A, "tool"), "tool_name", l == null ? void 0 : l["function"].name), "content", a.response));
                }), this.makeAnotherRequest(n, this.messages)));
              case 4:
                throw Error(dn);
              case 5:
                return _context148.a(2);
            }
          }, _callee148, this);
        }));
        function handleTools(_x271, _x272) {
          return _handleTools4.apply(this, arguments);
        }
        return handleTools;
      }()
    }], [{
      key: "getImageData",
      value: function getImageData(e) {
        return e.filter(function (t) {
          return t[y] === W;
        }).map(function (t) {
          var s;
          return ((s = t[R]) == null ? void 0 : s.split(",")[1]) || "";
        }).filter(function (t) {
          return t.length > 0;
        });
      }
    }]);
  }(M);
ss.THINK_END = "</think>";
var qi = ss;
var Mo = function Mo(i) {
    return _defineProperty({
      Authorization: "".concat(Se).concat(i)
    }, z, Y);
  },
  vh = function vh(i, e, t, n) {
    var s = i;
    s[p] ? s[p][y] === Ae || s[p][y] === Je ? n(de) : n(He) : t(e);
  },
  ko = function ko() {
    return ue("https://api.x.ai/v1/models", ge, vh);
  },
  oi = /*#__PURE__*/function (_M28) {
    function oi(e) {
      var _o$model12;
      var _this72;
      _classCallCheck(this, oi);
      var r, o;
      var t = e.directConnection,
        n = t == null ? void 0 : t.x;
      _this72 = _callSuper(this, oi, [e, ko(), Mo, n]), _this72.insertKeyPlaceholderText = _this72.genereteAPIKeyName("X"), _this72.keyHelpUrl = "https://console.x.ai/team/default/api-keys", _this72.url = oi.IMAGE_GENERATION_URL, _this72.permittedErrorPrefixes = [Je, Ae];
      var s = (r = t == null ? void 0 : t.x) == null ? void 0 : r[ee];
      _typeof(s) === F && Object.assign(_this72.rawBody, s), (_o$model12 = (o = _this72.rawBody).model) !== null && _o$model12 !== void 0 ? _o$model12 : o.model = "grok-imagine-image-quality";
      return _this72;
    }
    _inherits(oi, _M28);
    return _createClass(oi, [{
      key: "preprocessBody",
      value: function preprocessBody(e, t) {
        var n = t[t.length - 1][d],
          s = w(e);
        return n && n !== "" && (s.prompt = n), s;
      }
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI35 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee149(e, t) {
          return _regenerator().w(function (_context149) {
            while (1) switch (_context149.n) {
              case 0:
                this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
              case 1:
                return _context149.a(2);
            }
          }, _callee149, this);
        }));
        function callServiceAPI(_x273, _x274) {
          return _callServiceAPI35.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }, {
      key: "extractResultData",
      value: function () {
        var _extractResultData38 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee150(e) {
          var t;
          return _regenerator().w(function (_context150) {
            while (1) switch (_context150.n) {
              case 0:
                if (!e[p]) {
                  _context150.n = 1;
                  break;
                }
                throw e[p].message;
              case 1:
                t = e.data.map(function (n) {
                  return n.url ? _defineProperty(_defineProperty({}, R, n.url), y, W) : _defineProperty(_defineProperty({}, R, "".concat(Hn).concat(n.b64_json)), y, W);
                });
                return _context150.a(2, _defineProperty({}, m, t));
            }
          }, _callee150);
        }));
        function extractResultData(_x275) {
          return _extractResultData38.apply(this, arguments);
        }
        return extractResultData;
      }()
    }]);
  }(M);
oi.IMAGE_GENERATION_URL = "https://api.x.ai/v1/images/generations";
var Ki = oi;
var _h = function _h(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  Sh = function Sh(i, e, t, n) {
    var s = i;
    s[p] ? s[p][y] === Je ? n(de) : n(He) : t(e);
  },
  Ah = function Ah() {
    return ue("https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models", ge, Sh);
  };
var pr = /*#__PURE__*/function (_M29) {
  function pr(e) {
    var _this73$maxMessages, _o$model13;
    var _this73;
    _classCallCheck(this, pr);
    var s, r, o;
    var n = w(e.directConnection).qwen;
    _this73 = _callSuper(this, pr, [e, Ah(), _h, n]), _this73.insertKeyPlaceholderText = _this73.genereteAPIKeyName("Qwen"), _this73.keyHelpUrl = "https://www.alibabacloud.com/help/en/model-studio/get-api-key", _this73.url = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions", _this73.permittedErrorPrefixes = ["No static", "The model", li], _typeof(n) === F && _this73.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.qwen) == null ? void 0 : r.function_handler), (_this73$maxMessages = _this73.maxMessages) !== null && _this73$maxMessages !== void 0 ? _this73$maxMessages : _this73.maxMessages = -1, (_o$model13 = (o = _this73.rawBody).model) !== null && _o$model13 !== void 0 ? _o$model13 : o.model = "qwen-plus";
    return _this73;
  }
  _inherits(pr, _M29);
  return _createClass(pr, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: pr.getTextWImagesContent(r)
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI36 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee151(e, t) {
        var _this$messages1;
        return _regenerator().w(function (_context151) {
          while (1) switch (_context151.n) {
            case 0:
              (_this$messages1 = this.messages) !== null && _this$messages1 !== void 0 ? _this$messages1 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context151.a(2);
          }
        }, _callee151, this);
      }));
      function callServiceAPI(_x276, _x277) {
        return _callServiceAPI36.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData39 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee152(e, t) {
        var _n13;
        return _regenerator().w(function (_context152) {
          while (1) switch (_context152.n) {
            case 0:
              if (!e[p]) {
                _context152.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context152.n = 3;
                break;
              }
              _n13 = e.choices[0];
              if (!_n13.delta) {
                _context152.n = 2;
                break;
              }
              return _context152.a(2, this.extractStreamResult(_n13, t));
            case 2:
              if (!_n13.message) {
                _context152.n = 3;
                break;
              }
              return _context152.a(2, _n13.message.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n13.message.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, d, _n13.message.content || ""));
            case 3:
              return _context152.a(2, _defineProperty({}, d, ""));
          }
        }, _callee152, this);
      }));
      function extractResultData(_x278, _x279) {
        return _extractResultData39.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee153(e, t) {
        return _regenerator().w(function (_context153) {
          while (1) switch (_context153.n) {
            case 0:
              return _context153.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee153, this);
      }));
      function extractStreamResult(_x280, _x281) {
        return _extractStreamResult6.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }]);
}(M);
var xh = function xh(i) {
    return _defineProperty(_defineProperty({}, ce, "".concat(Se).concat(i)), z, Y);
  },
  wh = function wh(i, e, t, n) {
    var s = i;
    s[p] ? s[p][y] === Ae ? n(de) : n(He) : t(e);
  },
  Ch = function Ch() {
    return ue("https://api.moonshot.ai/v1/models", ge, wh);
  };
var fr = /*#__PURE__*/function (_M30) {
  function fr(e) {
    var _this74$maxMessages, _o$model14;
    var _this74;
    _classCallCheck(this, fr);
    var s, r, o;
    var n = w(e.directConnection).kimi;
    _this74 = _callSuper(this, fr, [e, Ch(), xh, n]), _this74.insertKeyPlaceholderText = _this74.genereteAPIKeyName("Kimi"), _this74.keyHelpUrl = "https://platform.moonshot.ai/console/api-keys", _this74.url = "https://api.moonshot.ai/v1/chat/completions", _this74.permittedErrorPrefixes = [Xt, "Not found"], _typeof(n) === F && _this74.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.kimi) == null ? void 0 : r.function_handler), (_this74$maxMessages = _this74.maxMessages) !== null && _this74$maxMessages !== void 0 ? _this74$maxMessages : _this74.maxMessages = -1, (_o$model14 = (o = _this74.rawBody).model) !== null && _o$model14 !== void 0 ? _o$model14 : o.model = "moonshot-v1-8k";
    return _this74;
  }
  _inherits(fr, _M30);
  return _createClass(fr, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: fr.getTextWImagesContent(r)
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI37 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee154(e, t) {
        var _this$messages10;
        return _regenerator().w(function (_context154) {
          while (1) switch (_context154.n) {
            case 0:
              (_this$messages10 = this.messages) !== null && _this$messages10 !== void 0 ? _this$messages10 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context154.a(2);
          }
        }, _callee154, this);
      }));
      function callServiceAPI(_x282, _x283) {
        return _callServiceAPI37.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData40 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee155(e, t) {
        var _n14;
        return _regenerator().w(function (_context155) {
          while (1) switch (_context155.n) {
            case 0:
              if (!e[p]) {
                _context155.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context155.n = 3;
                break;
              }
              _n14 = e.choices[0];
              if (!_n14.delta) {
                _context155.n = 2;
                break;
              }
              return _context155.a(2, this.extractStreamResult(_n14, t));
            case 2:
              if (!_n14.message) {
                _context155.n = 3;
                break;
              }
              return _context155.a(2, _n14.message.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n14.message.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, d, _n14.message.content || ""));
            case 3:
              return _context155.a(2, _defineProperty({}, d, ""));
          }
        }, _callee155, this);
      }));
      function extractResultData(_x284, _x285) {
        return _extractResultData40.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee156(e, t) {
        return _regenerator().w(function (_context156) {
          while (1) switch (_context156.n) {
            case 0:
              return _context156.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee156, this);
      }));
      function extractStreamResult(_x286, _x287) {
        return _extractStreamResult7.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }]);
}(M);
var Th = /*#__PURE__*/function (_M31) {
  function Th(e) {
    var _this75$maxMessages, _o$model15;
    var _this75;
    _classCallCheck(this, Th);
    var r, o;
    var t = w(e.directConnection),
      n = t.x;
    _this75 = _callSuper(this, Th, [e, ko(), Mo, n]), _this75.insertKeyPlaceholderText = _this75.genereteAPIKeyName("X"), _this75.keyHelpUrl = "https://console.x.ai/team/default/api-keys", _this75.url = "https://api.x.ai/v1/responses", _this75.permittedErrorPrefixes = [Je, Ae];
    var s = (r = t.x) == null ? void 0 : r.chat;
    _typeof(s) === F && _this75.completeConfig(s), (_this75$maxMessages = _this75.maxMessages) !== null && _this75$maxMessages !== void 0 ? _this75$maxMessages : _this75.maxMessages = -1, (_o$model15 = (o = _this75.rawBody).model) !== null && _o$model15 !== void 0 ? _o$model15 : o.model = "grok-4.3";
    return _this75;
  }
  _inherits(Th, _M31);
  return _createClass(Th, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: r[d] || ""
          }, A, M.getRoleViaUser(r[A]));
        });
      return n.input = s, this.systemMessage && (n.instructions = this.systemMessage), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI38 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee157(e, t) {
        return _regenerator().w(function (_context157) {
          while (1) switch (_context157.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context157.a(2);
          }
        }, _callee157, this);
      }));
      function callServiceAPI(_x288, _x289) {
        return _callServiceAPI38.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData41 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee158(e) {
        var t, n, s;
        return _regenerator().w(function (_context158) {
          while (1) switch (_context158.n) {
            case 0:
              if (!e[p]) {
                _context158.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              t = e;
              if (!(typeof t.type == "string" && t.type.startsWith("response."))) {
                _context158.n = 2;
                break;
              }
              return _context158.a(2, t.type === "response.output_text.delta" ? _defineProperty({}, d, t.delta || "") : _defineProperty({}, d, ""));
            case 2:
              n = e;
              if (!(n.object === "response" && Array.isArray(n.output))) {
                _context158.n = 3;
                break;
              }
              s = n.output.filter(function (r) {
                return r.type === "message";
              }).flatMap(function (r) {
                return r.content || [];
              }).filter(function (r) {
                return r.type === "output_text";
              }).map(function (r) {
                return r.text || "";
              }).join("");
              return _context158.a(2, _defineProperty({}, d, s));
            case 3:
              return _context158.a(2, _defineProperty({}, d, ""));
          }
        }, _callee158);
      }));
      function extractResultData(_x290) {
        return _extractResultData41.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var Rh = function Rh(i) {
    return _defineProperty(_defineProperty({}, ce, i === Ri ? "" : "".concat(Se).concat(i)), z, Y);
  },
  Ih = function Ih() {},
  Mh = function Mh() {
    return ue("", ge, Ih);
  };
var kh = /*#__PURE__*/function (_M32) {
  function kh(e) {
    var _n$key, _this76$maxMessages, _r$model, _o$temperature, _a$max_tokens3;
    var _this76;
    _classCallCheck(this, kh);
    var r, o, a;
    var n = w(e.directConnection).liteLLM,
      s = _typeof(n) === F ? (_n$key = n.key) !== null && _n$key !== void 0 ? _n$key : Ri : Ri;
    _this76 = _callSuper(this, kh, [e, Mh(), Rh, {
      key: s
    }]), _this76.url = "http://localhost:4000/v1/chat/completions", _this76.permittedErrorPrefixes = [Je, Ae], _typeof(n) === F && _this76.completeConfig(n), (_this76$maxMessages = _this76.maxMessages) !== null && _this76$maxMessages !== void 0 ? _this76$maxMessages : _this76.maxMessages = -1, (_r$model = (r = _this76.rawBody).model) !== null && _r$model !== void 0 ? _r$model : r.model = "gpt-4o-mini", (_o$temperature = (o = _this76.rawBody).temperature) !== null && _o$temperature !== void 0 ? _o$temperature : o.temperature = 1, (_a$max_tokens3 = (a = _this76.rawBody).max_tokens) !== null && _a$max_tokens3 !== void 0 ? _a$max_tokens3 : a.max_tokens = 4096;
    return _this76;
  }
  _inherits(kh, _M32);
  return _createClass(kh, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = w(e),
        s = this.processMessages(t).map(function (r) {
          return _defineProperty({
            content: r[d] || ""
          }, A, M.getRoleViaUser(r[A]));
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI39 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee159(e, t) {
        return _regenerator().w(function (_context159) {
          while (1) switch (_context159.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context159.a(2);
          }
        }, _callee159, this);
      }));
      function callServiceAPI(_x291, _x292) {
        return _callServiceAPI39.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData42 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee160(e) {
        var t;
        return _regenerator().w(function (_context160) {
          while (1) switch (_context160.n) {
            case 0:
              if (!e[p]) {
                _context160.n = 1;
                break;
              }
              throw e[p].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context160.n = 3;
                break;
              }
              t = e.choices[0];
              if (!(t.delta && t.delta.content)) {
                _context160.n = 2;
                break;
              }
              return _context160.a(2, _defineProperty({}, d, t.delta.content));
            case 2:
              if (!(t.message && t.message.content)) {
                _context160.n = 3;
                break;
              }
              return _context160.a(2, _defineProperty({}, d, t.message.content));
            case 3:
              return _context160.a(2, _defineProperty({}, d, ""));
          }
        }, _callee160);
      }));
      function extractResultData(_x293) {
        return _extractResultData42.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var ks = /* @__PURE__ */function (i) {
    return i.BLOCKING = "blocking", i.STREAMING = "streaming", i;
  }(ks || {}),
  wn = /* @__PURE__ */function (i) {
    return i.MESSAGE = "message", i.AGENT_MESSAGE = "agent_message", i.WORKFLOW_FINISHED = "workflow_finished", i.ERROR = "error", i;
  }(wn || {});
var Lh = "image/",
  Ph = "data:",
  Oh = function Oh(i, e) {
    return {
      type: e,
      transfer_method: "local_file",
      upload_file_id: i
    };
  },
  Nh = function Nh(i) {
    var e = i.trim();
    if (!e.startsWith(Ph)) return null;
    var t = e.replace(/^data:\s*/, "").trim();
    return t ? JSON.parse(t) : null;
  };
function Bh(_x294, _x295) {
  return _Bh.apply(this, arguments);
}
function _Bh() {
  _Bh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee179(i, e) {
    var t, _e$headers, n, s, r, a, o;
    return _regenerator().w(function (_context179) {
      while (1) switch (_context179.n) {
        case 0:
          t = new FormData();
          t.append(ne, i), t.append($, e[$]);
          _e$headers = e.headers;
          n = _e$headers[z];
          s = _objectWithoutProperties(_e$headers, [z].map(_toPropertyKey));
          _context179.n = 1;
          return fetch(e.url, {
            method: Pe,
            headers: s,
            body: t
          });
        case 1:
          r = _context179.v;
          if (r.ok) {
            _context179.n = 3;
            break;
          }
          _context179.n = 2;
          return r.text();
        case 2:
          a = _context179.v;
          throw new Error(a);
        case 3:
          _context179.n = 4;
          return r.json();
        case 4:
          o = _context179.v;
          if (o.id) {
            _context179.n = 5;
            break;
          }
          throw new Error("Upload response missing file ID");
        case 5:
          return _context179.a(2, o.id);
      }
    }, _callee179);
  }));
  return _Bh.apply(this, arguments);
}
function Dh(_x296, _x297) {
  return _Dh.apply(this, arguments);
}
function _Dh() {
  _Dh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee181(i, e) {
    var t;
    return _regenerator().w(function (_context181) {
      while (1) switch (_context181.n) {
        case 0:
          if (!(i.length === 0)) {
            _context181.n = 1;
            break;
          }
          return _context181.a(2, []);
        case 1:
          t = i.map(/*#__PURE__*/function () {
            var _ref249 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee180(s) {
              var r, o;
              return _regenerator().w(function (_context180) {
                while (1) switch (_context180.n) {
                  case 0:
                    _context180.n = 1;
                    return Bh(s, e);
                  case 1:
                    r = _context180.v;
                    o = s[y].startsWith(Lh) ? W : ne;
                    return _context180.a(2, Oh(r, o));
                }
              }, _callee180);
            }));
            return function (_x328) {
              return _ref249.apply(this, arguments);
            };
          }());
          _context181.n = 2;
          return Promise.all(t);
        case 2:
          return _context181.a(2, _context181.v.filter(function (s) {
            return s !== null;
          }));
      }
    }, _callee181);
  }));
  return _Dh.apply(this, arguments);
}
function Fh(i, e) {
  return i.conversation_id && e(i.conversation_id), i.code && i.message && !i.answer ? _defineProperty({}, p, i.message) : _defineProperty({}, d, i.answer || "");
}
var Uh = function Uh(i, e, t) {
  var n, s;
  switch (!e.conversationIdSet && i.conversation_id && (t(i.conversation_id), e.conversationIdSet = !0), i.event) {
    case wn.MESSAGE:
    case wn.AGENT_MESSAGE:
      e.fullAnswer += i.answer || "";
      break;
    case wn.WORKFLOW_FINISHED:
      !e.fullAnswer && (s = (n = i.data) == null ? void 0 : n.outputs) != null && s.answer && (e.fullAnswer = i.data.outputs.answer);
      break;
    case wn.ERROR:
      e.errorMessage = i.message || wn.ERROR;
      break;
  }
};
function Hh(_x298, _x299) {
  return _Hh.apply(this, arguments);
}
function _Hh() {
  _Hh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee182(i, e) {
    var t, s, _iterator0, _step0, r, o;
    return _regenerator().w(function (_context182) {
      while (1) switch (_context182.n) {
        case 0:
          t = {
            fullAnswer: "",
            conversationIdSet: !1,
            errorMessage: ""
          };
          _context182.n = 1;
          return i.text();
        case 1:
          s = _context182.v.split(/\r?\n\r?\n/);
          _iterator0 = _createForOfIteratorHelper(s);
          try {
            for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
              r = _step0.value;
              o = Nh(r);
              o && Uh(o, t, e);
            }
          } catch (err) {
            _iterator0.e(err);
          } finally {
            _iterator0.f();
          }
          return _context182.a(2, t.errorMessage ? _defineProperty({}, p, t.errorMessage) : _defineProperty({}, d, t.fullAnswer));
      }
    }, _callee182);
  }));
  return _Hh.apply(this, arguments);
}
var jh = function jh(i) {
    return _defineProperty(_defineProperty({}, z, Y), ce, "".concat(Se).concat(i));
  },
  $h = function $h(i, e, t, n) {
    var s = i;
    s[p] ? s[p].message === ci ? n(de) : n(He) : "user_input_form" in i || "opening_statement" in i || "file_upload" in i ? t(e) : n(He);
  },
  Gh = function Gh(i) {
    return ue("".concat(i, "/parameters"), ge, $h);
  };
var zh = /*#__PURE__*/function (_M33) {
  function zh(e) {
    var _ref221, _this77$maxMessages;
    var _this77;
    _classCallCheck(this, zh);
    var r;
    var t = w(e.directConnection),
      n = t == null ? void 0 : t.dify,
      s = (_ref221 = (r = e.connect) == null ? void 0 : r.url) !== null && _ref221 !== void 0 ? _ref221 : "https://api.dify.ai/v1";
    _this77 = _callSuper(this, zh, [e, Gh(s), jh, n]), _this77.insertKeyPlaceholderText = _this77.genereteAPIKeyName("Dify"), _this77.keyHelpUrl = "https://docs.dify.ai/en/use-dify/publish/developing-with-apis", _this77.permittedErrorPrefixes = [Ae], _this77._conversationId = "", _this77._user = $, _this77._inputs = {}, _this77.url = "".concat(s, "/chat-messages"), _this77._uploadUrl = "".concat(s, "/").concat(m, "/upload"), _typeof(n) === F && (n[$] && (_this77._user = n[$]), n.inputs && (_this77._inputs = n.inputs), _this77.completeConfig(n)), (_this77$maxMessages = _this77.maxMessages) !== null && _this77$maxMessages !== void 0 ? _this77$maxMessages : _this77.maxMessages = -1, _this77._mode = _this77.stream ? ks.STREAMING : ks.BLOCKING;
    return _this77;
  }
  _inherits(zh, _M33);
  return _createClass(zh, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t, n) {
      var s = this.processMessages(t),
        r = s[s.length - 1],
        o = (r == null ? void 0 : r[d]) || " ",
        a = _defineProperty({
          inputs: this._inputs,
          query: o,
          response_mode: this._mode
        }, $, this._user);
      return this._conversationId && (a.conversation_id = this._conversationId), n && n.length > 0 && (a[m] = n), a;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI40 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee161(e, t, n) {
        var _this$messages11,
          _this78 = this;
        var s, _t61;
        return _regenerator().w(function (_context161) {
          while (1) switch (_context161.n) {
            case 0:
              (_this$messages11 = this.messages) !== null && _this$messages11 !== void 0 ? _this$messages11 : this.messages = e;
              s = [];
              _t61 = n && n.length > 0;
              if (!_t61) {
                _context161.n = 2;
                break;
              }
              _context161.n = 1;
              return Dh(n, _defineProperty(_defineProperty({
                url: this._uploadUrl
              }, $, this._user), "headers", this.connectSettings.headers));
            case 1:
              s = _context161.v;
            case 2:
              this.callDirectServiceServiceAPI(e, t, function (r, o) {
                return _this78.preprocessBody(r, o, s);
              });
            case 3:
              return _context161.a(2);
          }
        }, _callee161, this);
      }));
      function callServiceAPI(_x300, _x301, _x302) {
        return _callServiceAPI40.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData43 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee162(e) {
        var _this79 = this;
        var t;
        return _regenerator().w(function (_context162) {
          while (1) switch (_context162.n) {
            case 0:
              t = function t(n) {
                _this79._conversationId = n;
              };
              return _context162.a(2, this._mode === ks.BLOCKING && !this.stream ? Fh(e, t) : Hh(e, t));
          }
        }, _callee162, this);
      }));
      function extractResultData(_x303) {
        return _extractResultData43.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(M);
var Vh = /*#__PURE__*/function () {
  function Vh() {
    _classCallCheck(this, Vh);
  }
  return _createClass(Vh, null, [{
    key: "create",
    value:
    // this should only be called when no _activeService is set or is demo as otherwise we don't want to reconnect
    function create(e) {
      var t = e.directConnection,
        n = e.connect,
        s = e.demo,
        r = e.webModel;
      if (r) return new ds(e);
      if (t) {
        if (t.openAI) return ie.processOpenAIAssistant(t.openAI), t.openAI[ee] ? new zi(e) : t.openAI.speechToText ? new Hi(e) : t.openAI.textToSpeech ? new Ui(e) : t.openAI.realtime ? new Fi(e) : t.openAI.completions ? new Xs(e) : new Zs(e);
        if (t.assemblyAI) return new cr(e);
        if (t.cohere) return new Js(e);
        if (t.huggingFace) return t.huggingFace.textGeneration ? new rl(e) : t.huggingFace.summarization ? new al(e) : t.huggingFace.translation ? new ll(e) : t.huggingFace.fillMask ? new hl(e) : t.huggingFace.questionAnswer ? new ol(e) : t.huggingFace.audioSpeechRecognition ? new il(e) : t.huggingFace.audioClassification ? new tl(e) : t.huggingFace.imageClassification ? new nl(e) : new cl(e);
        if (t.azure) {
          if (t.azure.openAI && (ie.processOpenAIAssistant(t.azure.openAI), t.azure.openAI.chat)) return new lr(e);
          if (t.azure.speechToText) return new Gi(e);
          if (t.azure.textToSpeech) return new $i(e);
          if (t.azure.summarization) return new ji(e);
          if (t.azure.translation) return new kl(e);
        }
        if (t.stabilityAI) return t.stabilityAI.imageToImage ? new Vs(e) : t.stabilityAI.imageToImageUpscale ? new Gs(e) : t.stabilityAI.imageToImageMasking ? new zs(e) : new qs(e);
        if (t.mistral) return new hr(e);
        if (t.gemini) return new ur(e);
        if (t.claude) return new Vi(e);
        if (t.deepSeek) return new eh(e);
        if (t.miniMax) return new ih(e);
        if (t.openRouter) return new Xn(e);
        if (t.kimi) return new fr(e);
        if (t.x) return t.x[ee] ? new Ki(e) : new Th(e);
        if (t.qwen) return new pr(e);
        if (t.together) return t.together[ee] ? new Nl(e) : t.together.textToSpeech ? new fl(e) : new Ul(e);
        if (t.bigModel) return t.bigModel[ee] ? new Ll(e) : t.bigModel.textToSpeech ? new ul(e) : new Ys(e);
        if (t.groq) return t.groq.textToSpeech ? new Ol(e) : new dr(e);
        if (t.perplexity) return new ql(e);
        if (t.ollama) return new qi(e);
        if (t.openWebUI) return new Zl(e);
        if (t.dify) return new zh(e);
        if (t.liteLLM) return new kh(e);
      }
      return n && Object.keys(n).length > 0 && !s ? new gn(e) : new gn(e, void 0, s || !0);
    }
  }]);
}();
var sn = /*#__PURE__*/function () {
  function sn() {
    _classCallCheck(this, sn);
  }
  return _createClass(sn, null, [{
    key: "attemptAppendStyleSheetToHead",
    value: function attemptAppendStyleSheetToHead(e, t) {
      var n = e.fontFamily || t;
      if (n && n !== sn.DEFAULT_FONT_FAMILY) return;
      var s = document.getElementsByTagName("head")[0];
      if (!Array.from(s.getElementsByTagName("link")).some(function (o) {
        return o.getAttribute("href") === sn.FONT_URL;
      })) {
        var o = S("link");
        o.rel = "stylesheet", o.href = sn.FONT_URL, s.appendChild(o);
      }
    }
  }]);
}();
sn.FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap", sn.DEFAULT_FONT_FAMILY = "'Inter', sans-serif, Avenir, Helvetica, Arial";
var Wi = sn;
var _r = /*#__PURE__*/_createClass(function _r() {
  _classCallCheck(this, _r);
});
_r.attibutes = {
  string: function string(e) {
    return e;
  },
  number: function number(e) {
    return parseFloat(e);
  },
  "boolean": function boolean(e) {
    return e === "true";
  },
  object: function object(e) {
    return JSON.parse(e);
  },
  array: function array(e) {
    return JSON.parse(e);
  },
  "function": function _function(e) {
    return new Function("return ".concat(e))();
  }
};
var Xi = _r;
function P(i) {
  return function (e, t) {
    Object.defineProperty(e, t, {});
    var n = e.constructor,
      s = t.toLocaleLowerCase();
    n._attributes_[s] = Xi.attibutes[i], n._attributeToProperty_[s] = t;
  };
}
var qh = "deep-chat-downwards-mode",
  Kh = "deep-chat-upwards-mode",
  zn = "submit-button",
  Rs = "loading-button",
  Vn = "disabled-button",
  Kr = "text-input-container-start-adjustment",
  Wr = "text-input-container-end-adjustment",
  Xr = "text-input-container-start-small-adjustment",
  Zr = "text-input-container-end-small-adjustment";
var mr = /*#__PURE__*/function () {
  function mr(e) {
    _classCallCheck(this, mr);
    this._isDisplayed = !1, this._elementRef = this.createIntroPanelWithChild(e), this._isDisplayed = !0;
  }
  return _createClass(mr, [{
    key: "createIntroPanelWithChild",
    value: function createIntroPanelWithChild(e) {
      var t = mr.createIntroPanel();
      return e[E].display === "none" && (e[E].display = "block"), t.appendChild(e), t;
    }
  }, {
    key: "hide",
    value: function hide() {
      this._isDisplayed && (this._elementRef[E].display = "none", this._isDisplayed = !1);
    }
  }, {
    key: "display",
    value: function display() {
      this._isDisplayed || (this._elementRef[E].display = "", this._isDisplayed = !0);
    }
  }], [{
    key: "createIntroPanel",
    value: function createIntroPanel() {
      var e = S();
      return e[f].add("intro-panel"), Object.assign(e[E]), e;
    }
  }]);
}();
var Wh = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t viewBox=\"50 30 420 450\" xml:space=\"preserve\">\n<g filter=\"brightness(0) saturate(100%) invert(16%) sepia(0%) saturate(1942%) hue-rotate(215deg) brightness(99%) contrast(93%)\">\n\t<g>\n\t\t<path d=\"M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008\n\t\t\tC350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237\n\t\t\th333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931\n\t\t\tl50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278\n\t\t\tc-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239\n\t\t\th66.527V486.763z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175\n\t\t\tc6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175\n\t\t\tc6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175\n\t\t\tc6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256\n\t\t\tc6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z\"/>\n\t</g>\n</g>\n</svg>",
  Re = /*#__PURE__*/function () {
    function Re() {
      _classCallCheck(this, Re);
    }
    return _createClass(Re, null, [{
      key: "createImage",
      value: function createImage(e, t) {
        var n = new Image();
        return n[R] = e[R], t && Ce.scrollDownOnImageLoad(n[R], t), Ce.processContent(W, n, n[R], e.name);
      }
      // WORK - image still does not scroll down when loaded
    }, {
      key: "createImageMessage",
      value: function createImageMessage(e, t, n, s, r) {
        var o = e.createNewMessageElement("", n, s),
          a = !s && r ? e.scrollToFirstElement.bind(e, n, r) : void 0,
          c = Re.createImage(t, a);
        return o.bubbleElement.appendChild(c), o.bubbleElement[f].add(Re.IMAGE_BUBBLE_CLASS), _defineProperty(_defineProperty({}, y, W), "elements", o);
      }
    }, {
      key: "createAudioElement",
      value: function createAudioElement(e, t) {
        var n = S(j);
        return n[R] = e[R], n[f].add("audio-player"), n.controls = !0, Ge.IS_SAFARI && (n[f].add("audio-player-safari"), n[f].add(t === $ ? "audio-player-safari-end" : "audio-player-safari-start")), n;
      }
    }, {
      key: "autoPlayAudio",
      value: function autoPlayAudio(e) {
        e.addEventListener("loadeddata", function () {
          e.play()["catch"](function (t) {
            console.warn("Auto-play failed:", t);
          });
        });
      }
    }, {
      key: "createNewAudioMessage",
      value: function createNewAudioMessage(e, t, n, s) {
        var r = Re.createAudioElement(t, n),
          o = e.createMessageElementsOnOrientation("", n, s);
        return o.bubbleElement.appendChild(r), o.bubbleElement[f].add(Re.AUDIO_BUBBLE_CLASS), _defineProperty(_defineProperty(_defineProperty({}, y, j), "elements", o), "audioElement", r);
      }
    }, {
      key: "createAnyFile",
      value: function createAnyFile(e) {
        var t = S();
        t[f].add("any-file-message-contents");
        var n = S();
        n[f].add("any-file-message-icon-container");
        var s = Bt.createSVGElement(Wh);
        s[f].add("any-file-message-icon"), n.appendChild(s);
        var r = S();
        return r[f].add("any-file-message-text"), r.textContent = e.name || ne, t.appendChild(n), t.appendChild(r), Ce.processContent(Bn, t, e[R], r.textContent);
      }
    }, {
      key: "createNewAnyFileMessage",
      value: function createNewAnyFileMessage(e, t, n, s) {
        var r = e.createMessageElementsOnOrientation("", n, s),
          o = Re.createAnyFile(t);
        return r.bubbleElement[f].add(Re.ANY_FILE_BUBBLE_CLASS), r.bubbleElement.appendChild(o), _defineProperty(_defineProperty({}, y, ne), "elements", r);
      }
    }, {
      key: "createMessages",
      value: function createMessages(e, t, n, s) {
        var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
        return t.map(function (o, a) {
          var c;
          if (o.ref && (o = Ce.removeFileRef(o)), Ce.isAudioFile(o)) {
            var l = Re.createNewAudioMessage(e, o, n, r),
              h = (c = e.textToSpeech) == null ? void 0 : c.audio;
            return h && (h.autoPlay && Re.autoPlayAudio(l.audioElement), typeof h.displayAudio == "boolean" && !h.displayAudio) ? void 0 : l;
          }
          return Ce.isImageFile(o) ? Re.createImageMessage(e, o, n, r, s && a === 0) : Re.createNewAnyFileMessage(e, o, n, r);
        }).filter(function (o) {
          return o !== void 0;
        });
      }
      // no overwrite previous message logic as it is complex to track which files are to be overwritten
    }, {
      key: "addMessages",
      value: function addMessages(e, t, n, s, r) {
        Re.createMessages(e, t, n, s, r).filter(function (a) {
          return a !== void 0;
        }).forEach(function (_ref225) {
          var a = _ref225[y],
            c = _ref225.elements;
          Ce.addMessage(e, c, a, n, r);
        });
      }
    }]);
  }();
Re.IMAGE_BUBBLE_CLASS = "image-message", Re.AUDIO_BUBBLE_CLASS = "audio-message", Re.ANY_FILE_BUBBLE_CLASS = "any-file-message";
var Qs = Re;
var tt = /*#__PURE__*/function () {
  function tt() {
    _classCallCheck(this, tt);
  }
  return _createClass(tt, null, [{
    key: "removeElements",
    value: function removeElements(e, t) {
      if (!t) return;
      var n = e.findIndex(function (s) {
        return s === t;
      });
      e.splice(n, 1), t == null || t.outerContainer.remove();
    }
  }, {
    key: "removeFilesMessages",
    value: function removeFilesMessages(e, t) {
      var n;
      (n = t[1][m]) == null || n.forEach(function (s) {
        tt.removeElements(e.messageElementRefs, s);
      }), delete t[0][m], delete t[1][m];
    }
  }, {
    key: "removeTextHTMLMessage",
    value: function removeTextHTMLMessage(e, t, n) {
      var s = t[1][n];
      tt.removeElements(e.messageElementRefs, s), delete t[0][n], delete t[1][n];
    }
  }, {
    key: "updateHTMLMessage",
    value: function updateHTMLMessage(e, t, n) {
      var s, r, o;
      if (t[1][L]) xt.overwriteElements(e, n, t[1][L]);else {
        var a = xt.create(e, n, t[0][A]),
          c = ((r = t[1][m]) == null ? void 0 : r[((s = t[1][m]) == null ? void 0 : s.length) - 1]) || t[1][d],
          l = c.outerContainer.nextSibling;
        (o = l == null ? void 0 : l.parentElement) == null || o.insertBefore(a.outerContainer, l), e.messageElementRefs.splice(e.messageElementRefs.length - 1, 1);
        var h = e.messageElementRefs.findIndex(function (u) {
          return u === c;
        });
        e.messageElementRefs.splice(h + 1, 0, a), t[1][L] = a;
      }
      t[0][L] = n;
    }
    // finds beforeElement, creates new elements, remove old and adds new ones
  }, {
    key: "updateFileMessages",
    value: function updateFileMessages(e, t, n) {
      var u, g;
      var s = t[0][A],
        r = Qs.createMessages(e, n, s, !1),
        o = t[1][L],
        a = ((g = t[1][m]) == null ? void 0 : g[((u = t[1][m]) == null ? void 0 : u.length) - 1]) || t[1][d],
        c = o || a;
      var l = e.messageElementRefs.findIndex(function (b) {
        return b === c;
      });
      a && (l += 1);
      var h = (o == null ? void 0 : o.outerContainer) || (a == null ? void 0 : a.outerContainer.nextSibling);
      r.forEach(function (_ref226, _) {
        var b = _ref226.type,
          v = _ref226.elements;
        var C;
        Ce.setElementProps(e, v, b, s), (C = h.parentElement) == null || C.insertBefore(v.outerContainer, h), e.messageElementRefs.splice(e.messageElementRefs.length - 1, 1), e.messageElementRefs.splice(l + _, 0, v);
      }), tt.removeFilesMessages(e, t), t[1][m] = r.map(function (_ref227) {
        var b = _ref227.elements;
        return b;
      }), t[0][m] = n;
    }
  }, {
    key: "updateTextMessage",
    value: function updateTextMessage(e, t, n) {
      var s, r;
      if (t[1][d]) e.renderText(t[1][d].bubbleElement, n, t[0][A]);else {
        var o = e.createElements(n, t[0][A]),
          a = ((s = t[1][m]) == null ? void 0 : s[0]) || t[1][L];
        (r = a.outerContainer.parentElement) == null || r.insertBefore(o.outerContainer, a.outerContainer);
        var c = e.messageElementRefs.findIndex(function (l) {
          return l === a;
        });
        e.messageElementRefs.splice(c, 0, o), t[1][d] = o;
      }
      t[0][d] = n;
    }
  }, {
    key: "isElementActive",
    value: function isElementActive(e) {
      var t, n;
      return it.isActiveElement((t = e[d]) == null ? void 0 : t.bubbleElement[f]) || it.isActiveElement((n = e[L]) == null ? void 0 : n.bubbleElement[f]);
    }
    // note that overwrite and 'deep-chat-temporary-message' are used to remove a message
  }, {
    key: "update",
    value: function update(e, t, n) {
      var s = e.messageToElements[n];
      if (s) {
        if (tt.isElementActive(s[1])) return console[p]("Cannot update a message that is being streamed");
        t[d] && tt.updateTextMessage(e, s, t[d]), t[m] ? tt.updateFileMessages(e, s, t[m]) : tt.removeFilesMessages(e, s), t[L] && tt.updateHTMLMessage(e, s, t[L]), !t[d] && s[1][d] && tt.removeTextHTMLMessage(e, s, d), !t[L] && s[1][L] && tt.removeTextHTMLMessage(e, s, L);
        var r = e.messageElementRefs,
          o = e.avatar,
          a = e.name;
        N.classifyRoleMessages(r), N.resetAllRoleElements(r, o, a);
      } else console[p]("Message index not found. Please use the `getMessages` method to find the correct index");
    }
  }]);
}();
var Xh = /*#__PURE__*/function () {
  function Xh() {
    _classCallCheck(this, Xh);
  }
  return _createClass(Xh, null, [{
    key: "getText",
    value: function getText(e, t) {
      var n, s;
      if (!e.directConnection && !e.connect && !e.webModel && !e.demo) return "Connect to any API using the [connect](".concat(X, "connect#connect-1) property or a popular service via [directConnection](").concat(X, "directConnection/#directConnection).\n Host AI entirely on your browser via a [webModel](").concat(X, "webModel).\n To get started checkout the [Start](https://deepchat.dev/start) page and live code [examples](https://deepchat.dev/examples/frameworks).\n To remove this message set the [demo](").concat(X, "modes#demo) property to true.");
      if (e.directConnection) {
        if (!t.isDirectConnection()) return "Please define a valid service inside\n          the [directConnection](".concat(X, "directConnection/#directConnection) object.");
        var r = (n = e.directConnection.openAI) == null ? void 0 : n.chat;
        if (_typeof(r) == "object" && (s = r.tools) != null && s.find(function (o) {
          return o[y] === "function";
        }) && !r.function_handler) return "Please define the `function_handler` property inside the openAI [chat](".concat(X, "directConnection/openAI#Chat) object.");
      } else if (e.connect && !e.connect.url && !e.connect.handler && !e.webModel) return "Please define a `url` or a `handler` property inside the [connect](".concat(X, "connect#connect-1) object.");
      return null;
    }
  }]);
}();
var it = /*#__PURE__*/function (_ot) {
  function it(e, t, n) {
    var _this80;
    _classCallCheck(this, it);
    var a, c;
    _this80 = _callSuper(this, it, [e]);
    var s = t.permittedErrorPrefixes,
      r = t.demo;
    _this80._errorMessageOverrides = (a = e.errorMessages) == null ? void 0 : a.overrides, _this80._onClearMessages = mn.onClearMessages.bind(_this80, e), _this80._onError = mn.onError.bind(_this80, e), _this80._isLoadingMessageAllowed = it.getDefaultDisplayLoadingMessage(e, t), _typeof(e.displayLoadingBubble) == "object" && e.displayLoadingBubble.toggle && (e.displayLoadingBubble.toggle = _this80.setLoadingToggle.bind(_this80)), _this80._permittedErrorPrefixes = s, _this80.addSetupMessageIfNeeded(e, t) || _this80.populateIntroPanel(n), r && _this80.prepareDemo(ie.processDemo(r), e.loadHistory), _this80.addIntroductoryMessages(e, t);
    var o = new Hs(e, _this80, t);
    _this80._displayServiceErrorMessages = (c = e.errorMessages) == null ? void 0 : c.displayServiceErrorMessages, e.getMessages = function () {
      return N.deepCloneMessagesWithReferences(_this80.messageToElements.map(function (_ref228) {
        var _ref229 = _slicedToArray(_ref228, 1),
          l = _ref229[0];
        return l;
      }));
    }, e.clearMessages = _this80.clearMessages.bind(_this80, t), e.refreshMessages = _this80.refreshTextMessages.bind(_this80, e.remarkable), e.scrollToBottom = V.scrollToBottom.bind(_this80, _this80), e.addMessage = function (l, h) {
      _this80.addAnyMessage(_objectSpread(_objectSpread({}, l), {}, {
        sendUpdate: !!h
      }), !h);
    }, e.updateMessage = function (l, h) {
      return tt.update(_this80, l, h);
    }, t.isWebModel() && t.setUpMessages(_this80), e.textToSpeech && Pn.processConfig(e.textToSpeech, function (l) {
      _this80.textToSpeech = l;
    }), _this80.elementRef.onscroll = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee163() {
      var l, h;
      return _regenerator().w(function (_context163) {
        while (1) switch (_context163.n) {
          case 0:
            e.loadHistory && o.loadHistoryOnScroll(e.loadHistory), (l = _this80.scrollButton) == null || l.updateScroll(), (h = _this80.browserStorage) != null && h.trackScrollHeight && _this80.browserStorage.addScrollHeight(_this80.elementRef.scrollTop);
          case 1:
            return _context163.a(2);
        }
      }, _callee163);
    }));
    return _this80;
  }
  _inherits(it, _ot);
  return _createClass(it, [{
    key: "setLoadingToggle",
    value: function setLoadingToggle(e) {
      var t = this.messageElementRefs[this.messageElementRefs.length - 1],
        n = ot.isLoadingMessage(t);
      if (!e && n) this.removeLastMessage(), delete this._activeLoadingConfig;else {
        if (this._activeLoadingConfig && n) {
          var s = re.getTargetWrapper(t.bubbleElement);
          if (s) return this._activeLoadingConfig = e || {}, this.updateLoadingMessage(s);
          this.removeLastMessage();
        }
        this._activeLoadingConfig = e || {}, this.addLoadingMessage(!0);
      }
    }
  }, {
    key: "prepareDemo",
    value: function prepareDemo(e, t) {
      var n;
      if (_typeof(e) == "object") {
        if (!t && e.displayLoading) {
          var s = e.displayLoading.history;
          s != null && s.small && Nt.addMessage(this, !1), s != null && s.full && Nt.addMessage(this);
        }
        e.displayErrors && (e.displayErrors[x] && this.addNewErrorMessage("", ""), e.displayErrors.service && this.addNewErrorMessage(oe, ""), e.displayErrors.speechToText && this.addNewErrorMessage("speechToText", "")), (n = e.displayLoading) != null && n.message && this.addLoadingMessage(), e.response && (this.customDemoResponse = e.response);
      }
    }
  }, {
    key: "addSetupMessageIfNeeded",
    value: function addSetupMessageIfNeeded(e, t) {
      var n = Xh.getText(e, t);
      if (n) {
        var s = this.createAndAppendNewMessageElement(n, te);
        this.applyCustomStyles(s, te, !1);
      }
      return !!n;
    }
    // WORK - const file for deep chat classes
  }, {
    key: "addIntroductoryMessages",
    value: function addIntroductoryMessages(e, t) {
      var _this81 = this;
      e != null && e.shadowRoot && (this._introMessage = e.introMessage);
      var n = this._introMessage;
      t != null && t.isWebModel() && (n !== null && n !== void 0 ? n : n = t.getIntroMessage(n));
      var s = !(e != null && e.history) && !!(e != null && e.loadHistory || t != null && t.fetchHistory);
      n && (Array.isArray(n) ? n.forEach(function (r, o) {
        if (o !== 0) {
          var a = _this81.messageElementRefs[_this81.messageElementRefs.length - 1].innerContainer;
          N.hideRoleElements(a, _this81.avatar, _this81.name);
        }
        _this81.addIntroductoryMessage(r, s);
      }) : this.addIntroductoryMessage(n, s));
    }
  }, {
    key: "addIntroductoryMessage",
    value: function addIntroductoryMessage(e, t) {
      var s;
      var n;
      return e != null && e[d] ? n = this.createAndAppendNewMessageElement(e[d], te) : e != null && e[L] && (n = xt.add(this, e[L], te)), n && (this.applyCustomStyles(n, te, !1, (s = this.messageStyles) == null ? void 0 : s.intro), n.outerContainer[f].add(ot.INTRO_CLASS), t && (n.outerContainer[E].display = "none")), n;
    }
  }, {
    key: "removeIntroductoryMessage",
    value: function removeIntroductoryMessage() {
      var e = this.messageElementRefs[0];
      e.outerContainer[f].contains(ot.INTRO_CLASS) && (e.outerContainer.remove(), this.messageElementRefs.shift());
    }
  }, {
    key: "addAnyMessage",
    value: function addAnyMessage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      return e[p] ? this.addNewErrorMessage(oe, e[p], n) : this.addNewMessage(e, t, n);
    }
  }, {
    key: "tryAddTextMessage",
    value: function tryAddTextMessage(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
      e[d] !== void 0 && n[d] !== null && (this.addNewTextMessage(e[d], e[A], t, r), !s && this.textToSpeech && e[A] !== $ && Pn.speak(e[d], this.textToSpeech));
    }
  }, {
    key: "tryAddFileMessages",
    value: function tryAddFileMessages(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      e[m] && Array.isArray(e[m]) && Qs.addMessages(this, e[m], e[A], t, n);
    }
  }, {
    key: "tryAddHTMLMessage",
    value: function tryAddHTMLMessage(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      if (e[L] !== void 0 && e[L] !== null) {
        var s = xt.add(this, e[L], e[A], t, n);
        !n && At.isElementTemporary(s) && delete e[L];
      }
    }
    // this should not be activated by streamed messages
  }, {
    key: "addNewMessage",
    value: function addNewMessage(e) {
      var _this82 = this;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var c, l, h, u;
      e[A] !== $ && ((c = this._hiddenAttachments) == null || c.removeHiddenFiles());
      var s = it.createMessageContent(e),
        r = (h = (l = this.textToSpeech) == null ? void 0 : l.audio) == null ? void 0 : h.displayText;
      typeof r == "boolean" && !r && delete s[d];
      var o = V.isScrollbarAtBottomOfElement(this.elementRef),
        a = {
          status: e.overwrite
        };
      return n ? (this.tryAddFileMessages(s, o, n), this.tryAddHTMLMessage(s, a, n), this.tryAddTextMessage(s, a, e, t, n)) : (this.tryAddTextMessage(s, a, e, t, n), this.tryAddHTMLMessage(s, a, n), this.tryAddFileMessages(s, o, n)), this.isValidMessageContent(s) && !n && (this.updateStateOnMessage(s, e.overwrite, e.sendUpdate, t), a.status || setTimeout(function () {
        return _this82.scrollToFirstElement(s[A], o);
      }), t || (u = this.browserStorage) == null || u.addMessages(this.messageToElements.map(function (_ref231) {
        var _ref232 = _slicedToArray(_ref231, 1),
          g = _ref232[0];
        return g;
      })), this.scrollButton && s[A] !== $ && this.tryUpdateHiddenMessageCount(t, e)), this._activeLoadingConfig && this.addLoadingMessage(!1), s;
    }
  }, {
    key: "tryUpdateHiddenMessageCount",
    value: function tryUpdateHiddenMessageCount(e, t) {
      var _this83 = this;
      (!e || t.sendUpdate !== void 0) && setTimeout(function () {
        var n, s;
        return (s = (n = _this83.scrollButton) == null ? void 0 : n.updateHidden) == null ? void 0 : s.call(n);
      });
    }
  }, {
    key: "isValidMessageContent",
    value: function isValidMessageContent(e) {
      return e[d] || e[L] || e[m] && e[m].length > 0;
    }
  }, {
    key: "updateStateOnMessage",
    value: function updateStateOnMessage(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      if (!t) {
        var r = N.generateMessageBody(e, this.messageElementRefs);
        this.messageToElements.push([e, r]);
      }
      n && this.sendClientUpdate(e, s);
    }
    // prettier-ignore
  }, {
    key: "removeMessageOnError",
    value: function removeMessageOnError() {
      var e = this.messageElementRefs[this.messageElementRefs.length - 1],
        t = e == null ? void 0 : e.bubbleElement;
      (t != null && t[f].contains(bt.MESSAGE_CLASS) && t.textContent === "" || it.isTemporaryElement(e)) && this.removeLastMessage();
    }
    // prettier-ignore
  }, {
    key: "addNewErrorMessage",
    value: function addNewErrorMessage(e, t) {
      var _this84 = this;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var l, h, u, g, b, v;
      (l = this._hiddenAttachments) == null || l.readdHiddenFiles(), this.removeMessageOnError();
      var s = this.getPermittedMessage(t) || ((h = this._errorMessageOverrides) == null ? void 0 : h[e]) || ((u = this._errorMessageOverrides) == null ? void 0 : u[x]) || "Error, please try again.",
        r = this.createMessageElementsOnOrientation(s, p, n);
      N.hideRoleElements(r.innerContainer, this.avatar, this.name);
      var o = r.bubbleElement,
        a = r.outerContainer;
      o[f].add(Ds), this.renderText(o, s);
      var c = Be.extractParticularSharedStyles(["fontSize", "fontFamily"], (g = this.messageStyles) == null ? void 0 : g[x]);
      Be.applyCustomStylesToElements(r, !1, c), Be.applyCustomStylesToElements(r, !1, (b = this.messageStyles) == null ? void 0 : b[p]), n || this.appendOuterContainerElemet(a), this.textToSpeech && Pn.speak(s, this.textToSpeech), (v = this._onError) == null || v.call(this, s), setTimeout(function () {
        return V.scrollToBottom(_this84);
      });
    }
  }, {
    key: "getPermittedMessage",
    value: function getPermittedMessage(e) {
      if (e) {
        var t = it.extractErrorMessages(e);
        for (var _n15 = 0; _n15 < t.length; _n15 += 1) {
          var s = t[_n15];
          if (_typeof(s) === ve) {
            if (this._displayServiceErrorMessages) return s;
            if (this._permittedErrorPrefixes) {
              var r = it.checkPermittedErrorPrefixes(this._permittedErrorPrefixes, s);
              if (r) return r;
            }
          }
        }
      }
    }
  }, {
    key: "removeError",
    value: function removeError() {
      this.isLastMessageError() && N.getLastMessageElement(this.elementRef).remove();
    }
  }, {
    key: "addDefaultLoadingMessage",
    value: function addDefaultLoadingMessage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : te;
      var n = this.createMessageElements("", t),
        s = n.bubbleElement;
      n.bubbleElement[f].add(St.DOTS_CONTAINER_CLASS);
      var r = S();
      return r[f].add("loading-message-dots"), s.appendChild(r), St.setDots(s, e), n;
    }
    // prettier-ignore
  }, {
    key: "addLoadingMessage",
    value: function addLoadingMessage() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      var a, c, l, h, u, g;
      if (ot.isLoadingMessage(this.messageElementRefs[this.messageElementRefs.length - 1]) || !this._activeLoadingConfig && !e && !this._isLoadingMessageAllowed) return;
      var t = ((a = this._activeLoadingConfig) == null ? void 0 : a[A]) || te,
        n = ((c = this._activeLoadingConfig) == null ? void 0 : c[E]) || ((h = (l = this.messageStyles) == null ? void 0 : l.loading) == null ? void 0 : h.message),
        s = n == null ? void 0 : n[L],
        r = s ? xt.createElements(this, s, t, !1) : this.addDefaultLoadingMessage(n, t);
      this.appendOuterContainerElemet(r.outerContainer), r.bubbleElement[f].add(St.BUBBLE_CLASS), this.applyCustomStyles(r, t, !1, n == null ? void 0 : n[T]), (g = (u = this.avatar) == null ? void 0 : u.getAvatarContainer(r.innerContainer)) == null || g[f].add("loading-avatar-container"), !this.focusMode && V.isScrollbarAtBottomOfElement(this.elementRef) && V.scrollToBottom(this);
    }
    // this is a special method not to constantly refresh loading animations
  }, {
    key: "updateLoadingMessage",
    value: function updateLoadingMessage(e) {
      var s;
      var t = (s = this._activeLoadingConfig) == null ? void 0 : s[E],
        n = t == null ? void 0 : t[L];
      e.innerHTML = n || "";
    }
  }, {
    key: "populateIntroPanel",
    value: function populateIntroPanel(e) {
      e && (this._introPanel = new mr(e), re.apply(this, this._introPanel._elementRef), this.elementRef.appendChild(this._introPanel._elementRef));
    }
  }, {
    key: "addMultipleFiles",
    value: function () {
      var _addMultipleFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee164(e, t) {
        return _regenerator().w(function (_context164) {
          while (1) switch (_context164.n) {
            case 0:
              return _context164.a(2, (this._hiddenAttachments = t, Promise.all((e || []).map(function (n) {
                return new Promise(function (s) {
                  if (!n[y] || n[y] === Bn) {
                    var r = n[ne].name || ne;
                    s(_defineProperty(_defineProperty({
                      name: r
                    }, y, Bn), "ref", n[ne]));
                  } else {
                    var _r8 = new FileReader();
                    _r8.readAsDataURL(n[ne]), _r8.onload = function () {
                      var o = n[ne].name;
                      s(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, R, _r8.result), "name", o), y, n[y]), "ref", n[ne]));
                    };
                  }
                });
              }))));
          }
        }, _callee164, this);
      }));
      function addMultipleFiles(_x304, _x305) {
        return _addMultipleFiles.apply(this, arguments);
      }
      return addMultipleFiles;
    }()
  }, {
    key: "clearMessages",
    value:
    // WORK - update all message classes to use deep-chat prefix
    function clearMessages(e, t) {
      var _this$messageToElemen2;
      var r, o, a, c;
      var n = [];
      this.messageElementRefs.forEach(function (l) {
        it.isActiveElement(l.bubbleElement[f]) ? n.push(l) : l.outerContainer.remove();
      }), Array.from(this.elementRef.children).forEach(function (l) {
        var u;
        var h = (u = l.children[0]) == null ? void 0 : u.children[0];
        h != null && h[f].contains(Ds) && l.remove();
      }), this.messageElementRefs = n;
      var s = this.messageToElements.filter(function (l) {
        return l[1][d] && it.isActiveElement(l[1][d].bubbleElement[f]) || l[1][L] && it.isActiveElement(l[1][L].bubbleElement[f]);
      });
      (_this$messageToElemen2 = this.messageToElements).splice.apply(_this$messageToElemen2, [0, this.messageToElements.length].concat(_toConsumableArray(s))), t !== !1 && ((r = this._introPanel) != null && r._elementRef && this._introPanel.display(), this.addIntroductoryMessages()), (o = this.browserStorage) == null || o.clear(), (a = this.scrollButton) == null || a.clearHidden(), (c = this._onClearMessages) == null || c.call(this), delete e.sessionId;
    }
  }], [{
    key: "getDefaultDisplayLoadingMessage",
    value: function getDefaultDisplayLoadingMessage(e, t) {
      var _ref233;
      return _typeof(e.displayLoadingBubble) == "object" && e.displayLoadingBubble.toggle ? !1 : t.websocket ? _typeof(e.displayLoadingBubble) === F ? !1 : !!e.displayLoadingBubble : (_ref233 = _typeof(e.displayLoadingBubble) === F || e.displayLoadingBubble) !== null && _ref233 !== void 0 ? _ref233 : !0;
    }
  }, {
    key: "checkPermittedErrorPrefixes",
    value: function checkPermittedErrorPrefixes(e, t) {
      for (var _n16 = 0; _n16 < e.length; _n16 += 1) if (t.startsWith(e[_n16])) return t;
    }
  }, {
    key: "extractErrorMessages",
    value: function extractErrorMessages(e) {
      return Array.isArray(e) ? e : e instanceof Error ? [e.message] : typeof e == "string" ? [e] : _typeof(e) == "object" && e[p] ? [e[p]] : [];
    }
  }, {
    key: "isActiveElement",
    value: function isActiveElement(e) {
      return e ? e.contains(St.BUBBLE_CLASS) || e.contains(Nt.CLASS) || e.contains(bt.MESSAGE_CLASS) : !1;
    }
  }]);
}(ot);
var Zn = /*#__PURE__*/function () {
  function Zn() {
    _classCallCheck(this, Zn);
  }
  return _createClass(Zn, null, [{
    key: "adjustInputPadding",
    value: function adjustInputPadding(e, t) {
      t[Dn].length > 0 && e[f].add("text-input-inner-start-adjustment"), t[_t].length > 0 && e[f].add("text-input-inner-end-adjustment");
    }
  }, {
    key: "adjustForOutsideButton",
    value: function adjustForOutsideButton(e, t, n) {
      n[ye].length === 0 && n[Le].length > 0 ? (e[0][f].add(Xr), t[f].add(Xr)) : n[Le].length === 0 && n[ye].length > 0 && (e[3][f].add(Zr), t[f].add(Zr));
    }
    // when submit is the only button
    // when submit button is outside by itself - we increase the height for a better look
  }, {
    key: "adjustOutsideSubmit",
    value: function adjustOutsideSubmit(e, t, n) {
      if (!(n[Dn].length > 0 || n[_t].length > 0)) {
        if (n[ye].length === 0 && n[Le].length > 0) return e[0][f].add(Kr), t[f].add(Kr), n[Le].map(function (s) {
          return s.button.elementRef[f].add("submit-button-enlarged");
        });
        if (n[Le].length === 0 && n[ye].length > 0) return e[3][f].add(Wr), t[f].add(Wr), n[ye].map(function (s) {
          return s.button.elementRef[f].add("submit-button-enlarged");
        });
      }
    }
    // prettier-ignore
  }, {
    key: "set",
    value: function set(e, t, n, s) {
      !!Zn.adjustOutsideSubmit(t, n, s) || Zn.adjustForOutsideButton(t, n, s), Zn.adjustInputPadding(e, s);
    }
  }]);
}();
var Un = /*#__PURE__*/function () {
  function Un() {
    _classCallCheck(this, Un);
  }
  return _createClass(Un, null, [{
    key: "create",
    value: function create() {
      return Array.from({
        length: 4
      }).map(function (e, t) {
        var n = S();
        return n[f].add("input-button-container"), (t === 0 || t === 3) && n[f].add("outer-button-container"), (t === 1 || t === 2) && n[f].add("inner-button-container"), n;
      });
    }
  }, {
    key: "add",
    value: function add(e, t) {
      e.insertBefore(t[1], e.firstChild), e.insertBefore(t[0], e.firstChild), e.appendChild(t[2]), e.appendChild(t[3]);
    }
  }, {
    key: "getContainerIndex",
    value: function getContainerIndex(e) {
      return e === Le ? 0 : e === Dn ? 1 : e === _t ? 2 : 3;
    }
  }, {
    key: "addButton",
    value: function addButton(e, t, n) {
      t[f].add(n);
      var s = Un.getContainerIndex(n);
      e[s].appendChild(t), s === 3 && t[f].add(ye);
    }
  }]);
}();
var Yr = ["camera", "gifs", "images", "audio", "mixedFiles", at, "microphone"],
  Zh = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\" fill=\"none\">\n  <rect x=\"2.5\" y=\"2.5\" width=\"17\" height=\"17\" rx=\"2\" stroke=\"#000000\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\n",
  Ie = /*#__PURE__*/function () {
    function Ie() {
      _classCallCheck(this, Ie);
    }
    return _createClass(Ie, null, [{
      key: "addHighlightEvents",
      value: function addHighlightEvents(e, t) {
        t.addEventListener(ys, function (n) {
          e.highlightedItem = n.target;
        }), t.addEventListener(un, function () {
          e.highlightedItem = void 0;
        });
      }
    }, {
      key: "addItemEvents",
      value: function addItemEvents(e, t, n, s) {
        Lt.add(t, s), t.addEventListener(Z, function () {
          n[Z]();
        }), Ie.addHighlightEvents(e, t);
      }
    }, {
      key: "createItemText",
      value: function createItemText(e, t) {
        var n = S();
        return Object.assign(n[E], t), n[f].add(Ie.TEXT_CLASS), n.textContent = e || "File", n;
      }
    }, {
      key: "createItemIcon",
      value: function createItemIcon(e, t) {
        var n = S();
        return Object.assign(n[E], t), n[f].add(Ie.ICON_CLASS), n.appendChild(e), n;
      }
    }, {
      key: "populateItem",
      value: function populateItem(e, t, n) {
        var s = e.elementRef,
          r = e.dropupText,
          o = e.svg,
          a = e.customStyles,
          c = s.children[0],
          l = a && Object.values(a).find(function (h) {
            var u;
            return ((u = h[G]) == null ? void 0 : u.content) === "";
          });
        c[f].contains(Ct.INPUT_BUTTON_INNER_TEXT_CLASS) ? (l || t.appendChild(Ie.createItemIcon(o, n == null ? void 0 : n.iconContainer)), t.appendChild(Ie.createItemText(c.textContent, n == null ? void 0 : n[d]))) : (l || t.appendChild(Ie.createItemIcon(s.children[0], n == null ? void 0 : n.iconContainer)), t.appendChild(Ie.createItemText(r, n == null ? void 0 : n[d])));
      }
    }, {
      key: "createItem",
      value: function createItem(e, t, n) {
        var o;
        var s = S();
        Object.assign(s[E], (o = n == null ? void 0 : n.item) == null ? void 0 : o[x]), Ie.populateItem(t, s, n), s[f].add(Ie.MENU_ITEM_CLASS), s.tabIndex = 0;
        var r = t.elementRef;
        if (t.isCustom) t.setDropupItem(e, s);else {
          var a = he.processStateful((n == null ? void 0 : n.item) || {});
          Ie.addItemEvents(e, s, r, a);
        }
        return s;
      }
    }]);
  }();
Ie.MENU_ITEM_CLASS = "dropup-menu-item", Ie.CUSTOM_BUTTON_ITEM_CLASS = "dropup-menu-item-custom-button", Ie.TEXT_CLASS = "dropup-menu-item-text", Ie.ICON_CLASS = "dropup-menu-item-icon";
var mt = Ie;
var fe = /*#__PURE__*/function (_n17) {
  // prettier-ignore
  function fe(e, t, n, s) {
    var _this85;
    _classCallCheck(this, fe);
    var c, l, h, u, g, b;
    var r = ((u = (h = (l = (c = e == null ? void 0 : e[T]) == null ? void 0 : c.button) == null ? void 0 : l[x]) == null ? void 0 : h[d]) == null ? void 0 : u.content) || "Custom ".concat(t),
      o = Zh,
      a = yt.tryCreateConfig("Custom ".concat(t), e == null ? void 0 : e.tooltip);
    _this85 = _callSuper(this, fe, [fe.createButtonElement(), o, e == null ? void 0 : e.position, a, ((g = e == null ? void 0 : e[T]) == null ? void 0 : g.button) || a && {}, r]), _this85._state = x, _this85.isCustom = !0, _this85._innerElements = _this85.createInnerElementsForStates(_this85.customStyles), _this85._menuStyles = s, _this85._onClick = e.onClick, _this85._dropupStyles = (b = e[T]) == null ? void 0 : b.dropup, _this85.setSetState(e), _this85.addClickListener(n), _this85.changeState(e.initialState, !0);
    return _this85;
  }
  _inherits(fe, _n17);
  return _createClass(fe, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      var t = "custom-icon",
        n = this.createInnerElements(t, x, e);
      return _defineProperty(_defineProperty(_defineProperty({}, x, n), U, this.genStateInnerElements(t, U, n, e)), H, this.genStateInnerElements(t, H, n, e));
    }
  }, {
    key: "setSetState",
    value: function setSetState(e) {
      var _this86 = this;
      e.setState = function (t) {
        t === x && _this86.changeToDefault(), t === U && _this86.changeToActive(), t === H && _this86.changeToDisabled();
      };
    }
  }, {
    key: "addClickListener",
    value: function addClickListener(e) {
      var _this87 = this;
      V.assignButtonEvents(this.elementRef, function () {
        var n;
        var t = (n = _this87._onClick) == null ? void 0 : n.call(_this87, _this87._state);
        e == null || e(), (t === x || t === U || t === H) && _this87.changeState(t);
      });
    }
  }, {
    key: "changeState",
    value: function changeState(e, t) {
      e === H ? this.changeToDisabled(t) : e === U ? this.changeToActive(t) : this.changeToDefault(t);
    }
  }, {
    key: "applyDropupContentStyles",
    value: function applyDropupContentStyles(e) {
      var t = Array.from(this.elementRef.children);
      if (e != null && e[d]) {
        var _n18 = t.find(function (s) {
          return s[f].contains(mt.TEXT_CLASS);
        });
        _n18 && Object.assign(_n18[E], e[d]);
      }
      if (e != null && e.iconContainer) {
        var _n19 = t.find(function (s) {
          return s[f].contains(mt.ICON_CLASS);
        });
        _n19 && Object.assign(_n19[E], e.iconContainer);
      }
    }
  }, {
    key: "resetDropupItem",
    value: function resetDropupItem(e) {
      var n, s, r;
      this.elementRef = re.replaceElementWithNewClone(this.elementRef, this._originalElementRef), this.elementRef.innerHTML = "", ((n = e == null ? void 0 : e[G]) == null ? void 0 : n.content) === "" || this.elementRef.appendChild(mt.createItemIcon(this[G], (s = this._menuStyles) == null ? void 0 : s.iconContainer)), this.elementRef.appendChild(mt.createItemText(this.dropupText, (r = this._menuStyles) == null ? void 0 : r[d]));
    }
  }, {
    key: "assignDropupItemStyle",
    value: function assignDropupItemStyle(e, t) {
      var s;
      this.elementRef.parentElement && this._originalElementRef && this.resetDropupItem(t), mt.addHighlightEvents(this._menu, this.elementRef), this.applyDropupContentStyles(e), Object.assign(this.elementRef[E], (s = e == null ? void 0 : e.item) == null ? void 0 : s[x]);
      var n = he.processStateful((e == null ? void 0 : e.item) || {});
      Lt.add(this.elementRef, n), this.addClickListener();
    }
  }, {
    key: "changeToDefault",
    value: function changeToDefault(e) {
      var t, n, s, r, o, a;
      !e && this._state === x || (this.elementRef[f].contains(mt.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t[x], (n = this.customStyles) == null ? void 0 : n[x]) : (this.changeElementsByState(this._innerElements[x]), (s = this.customStyles) != null && s[U] && Ee.unsetAllCSS(this.elementRef, (r = this.customStyles) == null ? void 0 : r[U]), (o = this.customStyles) != null && o[H] && Ee.unsetAllCSS(this.elementRef, (a = this.customStyles) == null ? void 0 : a[H]), this.reapplyStateStyle(x, [U, H])), this.elementRef[f].remove(fe.DISABLED_CONTAINER_CLASS, fe.ACTIVE_CONTAINER_CLASS), this.elementRef[f].add(fe.DEFAULT_CONTAINER_CLASS), me.removeAriaDisabled(this.elementRef), this._state = x);
    }
  }, {
    key: "changeToActive",
    value: function changeToActive(e) {
      var t, n;
      !e && this._state === U || (this.elementRef[f].contains(mt.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t[U], (n = this.customStyles) == null ? void 0 : n[U]) : (this.changeElementsByState(this._innerElements[U]), this.reapplyStateStyle(U, [H, x])), this.elementRef[f].remove(fe.DISABLED_CONTAINER_CLASS, fe.DEFAULT_CONTAINER_CLASS), this.elementRef[f].add(fe.ACTIVE_CONTAINER_CLASS), me.removeAriaDisabled(this.elementRef), this._state = U);
    }
  }, {
    key: "changeToDisabled",
    value: function changeToDisabled(e) {
      var t, n, s, r, o, a;
      !e && this._state === H || (this.elementRef[f].contains(mt.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t[H], (n = this.customStyles) == null ? void 0 : n[H]) : (this.changeElementsByState(this._innerElements[H]), (s = this.customStyles) != null && s[U] && Ee.unsetAllCSS(this.elementRef, (r = this.customStyles) == null ? void 0 : r[U]), (o = this.customStyles) != null && o[x] && Ee.unsetAllCSS(this.elementRef, (a = this.customStyles) == null ? void 0 : a[x]), this.reapplyStateStyle(H, [x, U])), this.elementRef[f].remove(fe.ACTIVE_CONTAINER_CLASS, fe.DEFAULT_CONTAINER_CLASS), this.elementRef[f].add(fe.DISABLED_CONTAINER_CLASS), me.addAriaDisabled(this.elementRef), this._state = H);
    }
    // called after class is initialised
  }, {
    key: "setDropupItem",
    value: function setDropupItem(e, t) {
      this._menu = e, this.elementRef = t, this._originalElementRef = t.cloneNode(!0), this.changeState(this._state, !0);
    }
  }, {
    key: "genStateInnerElements",
    value: function genStateInnerElements(e, t, n, s) {
      var c, l, h, u;
      var r = this.createInnerElements(e, t, s);
      var o = (l = (c = s == null ? void 0 : s[t]) == null ? void 0 : c[G]) == null ? void 0 : l.content,
        a = (u = (h = s == null ? void 0 : s[t]) == null ? void 0 : h[d]) == null ? void 0 : u.content;
      if (o === void 0 || a === void 0) {
        var _Wn$parseSVGTextEleme4 = Wn.parseSVGTextElements(n),
          g = _Wn$parseSVGTextEleme4.svg,
          b = _Wn$parseSVGTextEleme4[d],
          _Wn$parseSVGTextEleme5 = Wn.parseSVGTextElements(r),
          v = _Wn$parseSVGTextEleme5.svg,
          _ = _Wn$parseSVGTextEleme5[d],
          C = [];
        fe.addToInnerElements(C, o, g, v), fe.addToInnerElements(C, a, b, _), r = C;
      }
      return r;
    }
  }], [{
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[f].add("input-button", fe.BUTTON_CLASS), e;
    }
  }, {
    key: "addToInnerElements",
    value: function addToInnerElements(e, t, n, s) {
      t === void 0 && n ? e.push(n.cloneNode(!0)) : s && e.push(s);
    }
  }, {
    key: "add",
    value: function add(e, t) {
      var n = e.customButtons,
        s = e.focusInput,
        r = e.dropupStyles;
      n == null || n.forEach(function (o, a) {
        var c = {
          button: new fe(o, a + 1, s, r == null ? void 0 : r.menu)
        };
        t["".concat(fe.INDICATOR_PREFIX).concat(a + 1)] = c;
      });
    }
  }]);
}(_n);
fe.INDICATOR_PREFIX = "custom", fe.BUTTON_CLASS = "custom-button", fe.DISABLED_CONTAINER_CLASS = "custom-button-container-disabled", fe.DEFAULT_CONTAINER_CLASS = "custom-button-container-default", fe.ACTIVE_CONTAINER_CLASS = "custom-button-container-active";
var hn = fe;
var Yh = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z\"></path>\n</svg>";
var us = /*#__PURE__*/function () {
  function us() {
    _classCallCheck(this, us);
  }
  return _createClass(us, null, [{
    key: "focusItemWhenOnEdge",
    value: function focusItemWhenOnEdge(e, t) {
      var n = e.elementRef,
        s = t ? n.children[0] : n.children[n.children.length - 1];
      us.focusSiblingItem(e, s, t, !0);
    }
    // isEdgeItem means is it a start or end item
  }, {
    key: "focusSiblingItem",
    value: function focusSiblingItem(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var r = s ? t : t[n ? "nextSibling" : "previousSibling"];
      r ? (t.dispatchEvent(new MouseEvent(un)), r.dispatchEvent(new MouseEvent(ys)), r.focus()) : (t.dispatchEvent(new MouseEvent(un)), us.focusItemWhenOnEdge(e, n));
    }
  }]);
}();
var gr = /*#__PURE__*/function () {
  function gr(e, t) {
    var _this88 = this;
    _classCallCheck(this, gr);
    var n;
    this._isOpen = !0, this._styles = t, this.elementRef = gr.createElement((n = this._styles) == null ? void 0 : n.container), this.close(), setTimeout(function () {
      return _this88.addWindowEvents(e);
    });
  }
  return _createClass(gr, [{
    key: "open",
    value: function open() {
      this.elementRef[E].display = "block", this._isOpen = !0;
    }
  }, {
    key: "close",
    value: function close() {
      this._isOpen && (this.elementRef[E].display = "none", this._isOpen = !1);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this._isOpen ? this.close() : this.open();
    }
  }, {
    key: "addItem",
    value: function addItem(e) {
      var t = mt.createItem(this, e, this._styles);
      this.elementRef.appendChild(t);
    }
    // prettier-ignore
  }, {
    key: "addWindowEvents",
    value: function addWindowEvents(e) {
      this.clickEvent = this.windowClick.bind(this, e), window.addEventListener(Z, this.clickEvent), this.keyDownEvent = this.windowKeyDown.bind(this, e), window.addEventListener("keydown", this.keyDownEvent);
    }
  }, {
    key: "windowClick",
    value: function windowClick(e, t) {
      var n;
      !e.isConnected && this.clickEvent ? window.removeEventListener(Z, this.clickEvent) : e.parentElement !== ((n = t.target.shadowRoot) == null ? void 0 : n.children[0]) && this.close();
    }
    // prettier-ignore
  }, {
    key: "windowKeyDown",
    value: function windowKeyDown(e, t) {
      var n, s, r;
      !e.isConnected && this.keyDownEvent ? window.removeEventListener("keydown", this.keyDownEvent) : this._isOpen && (t.key === be.ESCAPE ? (this.close(), (n = this.highlightedItem) == null || n.dispatchEvent(new MouseEvent(un))) : t.key === be.ENTER ? ((s = this.highlightedItem) == null || s[Z](), (r = this.highlightedItem) == null || r.dispatchEvent(new MouseEvent(un))) : t.key === be.ARROW_DOWN ? us.focusSiblingItem(this, this.highlightedItem || this.elementRef.children[this.elementRef.children.length - 1], !0) : t.key === be.ARROW_UP && us.focusSiblingItem(this, this.highlightedItem || this.elementRef.children[0], !1));
    }
  }], [{
    key: "createElement",
    value: function createElement(e) {
      var t = S();
      return t.id = st, Object.assign(t[E], e), t;
    }
  }]);
}();
var rn = /*#__PURE__*/function (_n20) {
  function rn(e, t) {
    var _this89;
    _classCallCheck(this, rn);
    var r, o;
    var n = yt.tryCreateConfig("Options", (r = t == null ? void 0 : t.button) == null ? void 0 : r.tooltip);
    _this89 = _callSuper(this, rn, [rn.createButtonElement(), Yh, void 0, n, _defineProperty({}, T, (o = t == null ? void 0 : t.button) == null ? void 0 : o[T])]);
    var s = _this89.createInnerElementsForStates(_this89.customStyles);
    _this89._menu = new gr(e, t == null ? void 0 : t.menu), _this89.addClickEvent(), _this89.buttonContainer = rn.createButtonContainer(), _this89.changeElementsByState(s[T]), _this89.buttonContainer.appendChild(_this89.elementRef), _this89.elementRef[f].add(rn.BUTTON_ICON_CLASS), _this89.buttonContainer.appendChild(_this89._menu.elementRef), _this89.reapplyStateStyle(T), _this89.addContainerEvents(e);
    return _this89;
  }
  _inherits(rn, _n20);
  return _createClass(rn, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      return _defineProperty({}, T, this.createInnerElements("dropup-icon", T, e));
    }
  }, {
    key: "addClickEvent",
    value: function addClickEvent() {
      var _this90 = this;
      this.elementRef.onclick = this._menu.toggle.bind(this._menu), this.elementRef.onkeydown = function (e) {
        e.key === be.ENTER && setTimeout(function () {
          _this90._menu.toggle();
          var t = _this90._menu.elementRef.children[0];
          t.focus(), t.dispatchEvent(new MouseEvent(ys));
        });
      };
    }
  }, {
    key: "addItem",
    value: function addItem(e) {
      this._menu.addItem(e);
    }
  }, {
    key: "addContainerEvents",
    value: function addContainerEvents(e) {
      var _this91 = this;
      e.addEventListener(Z, function (t) {
        var n = t.target[f];
        !n.contains(rn.BUTTON_ICON_CLASS) && !n.contains(hn.DISABLED_CONTAINER_CLASS) && _this91._menu.close();
      });
    }
  }], [{
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[f].add("input-button"), e;
    }
  }, {
    key: "createButtonContainer",
    value: function createButtonContainer() {
      var e = S();
      return e.id = "dropup-container", e;
    }
  }, {
    key: "getPosition",
    value: function getPosition(e, t) {
      var n, s;
      return (n = t == null ? void 0 : t.button) != null && n.position ? ie.processPosition((s = t == null ? void 0 : t.button) == null ? void 0 : s.position) : e[Le].length > 0 && e[ye].length === 0 ? ye : Le;
    }
  }]);
}(_n);
rn.BUTTON_ICON_CLASS = "dropup-button";
var ei = rn;
var Ne = /*#__PURE__*/function () {
  function Ne() {
    _classCallCheck(this, Ne);
  }
  return _createClass(Ne, null, [{
    key: "addToDropup",
    value:
    // prettier-ignore
    function addToDropup(e, t, n, s) {
      var r = new ei(n, s);
      Yr.forEach(function (a) {
        var c = t[st].findIndex(function (h) {
            return h.buttonType === a;
          }),
          l = t[st][c];
        l && (r.addItem(l.button), t[st].splice(c, 1));
      }), t[st].forEach(function (_ref237) {
        var a = _ref237.button;
        return r.addItem(a);
      });
      var o = ei.getPosition(t, s);
      Un.addButton(e, r.buttonContainer, o), t[o].push({});
    }
  }, {
    key: "addToSideContainer",
    value: function addToSideContainer(e, t) {
      [Dn, _t, Le, ye].forEach(function (s) {
        var r = s;
        t[r].forEach(function (o) {
          Un.addButton(e, o.button.elementRef, r);
        });
      });
    }
  }, {
    key: "setPosition",
    value: function setPosition(e, t, n) {
      var s = _objectSpread(_objectSpread({}, e[t]), {}, {
        buttonType: t
      });
      n.push(s), delete e[t];
    }
  }, {
    key: "createPositionsToButtonsObj",
    value: function createPositionsToButtonsObj() {
      return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, st, []), Le, []), Dn, []), _t, []), ye, []);
    }
    // prettier-ignore
  }, {
    key: "generatePositionToButtons",
    value: function generatePositionToButtons(e) {
      var t = Ne.createPositionsToButtonsObj();
      Object.keys(e).forEach(function (s) {
        var o;
        var r = (o = e[s]) == null ? void 0 : o.button.position;
        r && Ne.setPosition(e, s, t[r]);
      }), t[_t].length === 0 && e.submit && Ne.setPosition(e, at, t[_t]), t[ye].length === 0 && (e.submit ? Ne.setPosition(e, at, t[ye]) : e.microphone ? Ne.setPosition(e, ft, t[ye]) : e.camera ? Ne.setPosition(e, Fe, t[ye]) : e["".concat(hn.INDICATOR_PREFIX, "1")] && Ne.setPosition(e, "".concat(hn.INDICATOR_PREFIX, "1"), t[ye])), e.submit && Ne.setPosition(e, at, t[Le].length === 0 ? t[Le] : t[_t]), e.microphone && Ne.setPosition(e, ft, t[Le].length === 0 ? t[Le] : t[_t]);
      var n = Object.keys(e);
      return n.length > 1 || t[st].length > 0 ? (Yr.forEach(function (s) {
        e[s] && t[st].push(_objectSpread(_objectSpread({}, e[s]), {}, {
          buttonType: s
        }));
      }), n.forEach(function (s) {
        var r = s;
        r.startsWith(hn.INDICATOR_PREFIX) && e[r] && t[st].push(_objectSpread(_objectSpread({}, e[r]), {}, {
          customType: r
        }));
      })) : n.length === 1 && Ne.setPosition(e, n[0], t[ye].length === 0 ? t[ye] : t[Le]), t;
    }
    // prettier-ignore
  }, {
    key: "addButtons",
    value: function addButtons(e, t, n, s) {
      var r = Ne.generatePositionToButtons(t);
      return Ne.addToSideContainer(e, r), r[st].length > 0 && Ne.addToDropup(e, r, n, s), r;
    }
  }]);
}();
var Jh = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>",
  Qh = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M20,15.2928932 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,12.2928932 L7.14644661,9.14644661 C7.34170876,8.95118446 7.65829124,8.95118446 7.85355339,9.14644661 L13.5,14.7928932 L16.1464466,12.1464466 C16.3417088,11.9511845 16.6582912,11.9511845 16.8535534,12.1464466 L20,15.2928932 Z M20,16.7071068 L16.5,13.2071068 L13.8535534,15.8535534 C13.6582912,16.0488155 13.3417088,16.0488155 13.1464466,15.8535534 L7.5,10.2071068 L4,13.7071068 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,16.7071068 Z M3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 Z M15,6 L17,6 C17.5522847,6 18,6.44771525 18,7 L18,9 C18,9.55228475 17.5522847,10 17,10 L15,10 C14.4477153,10 14,9.55228475 14,9 L14,7 C14,6.44771525 14.4477153,6 15,6 Z M15,7 L15,9 L17,9 L17,7 L15,7 Z\"/>\n</svg>\n",
  ed = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"-49.49 -49.49 593.87 593.87\" stroke-width=\"3.95908\" transform=\"rotate(0)\">\n  <g stroke-width=\"0\"></g>\n  <g stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.98977\"></g>\n  <g>\n    <g>\n      <g>\n        <path d=\"M163.205,76.413v293.301c-3.434-3.058-7.241-5.867-11.486-8.339c-21.38-12.452-49.663-15.298-77.567-7.846 c-49.038,13.096-80.904,54.519-71.038,92.337c4.019,15.404,14.188,28.221,29.404,37.087c13.553,7.894,29.87,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.447-4.087c42.74-11.406,72.411-44.344,72.807-77.654h0.011v-0.162c0.002-0.166,0-0.331,0-0.496V187.072 l290.971-67.3v178.082c-3.433-3.055-7.238-5.863-11.481-8.334c-21.385-12.452-49.654-15.308-77.567-7.846 c-49.038,13.087-80.904,54.519-71.038,92.356c4.019,15.385,14.183,28.212,29.404,37.067c13.548,7.894,29.875,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.452-4.087c42.74-11.413,72.411-44.346,72.804-77.654h0.004v-0.065c0.003-0.236,0.001-0.469,0-0.704V0 L163.205,76.413z M104.999,471.779c-22.543,6.038-45.942,3.846-62.572-5.846c-10.587-6.163-17.591-14.817-20.255-25.038 c-7.144-27.375,18.452-58.029,57.062-68.346c8.409-2.25,16.938-3.346,25.188-3.346c13.87,0,26.962,3.115,37.389,9.192 c10.587,6.163,17.591,14.817,20.255,25.029c0.809,3.102,1.142,6.248,1.139,9.4v0.321h0.014 C162.99,437.714,139.082,462.678,104.999,471.779z M182.898,166.853V92.067l290.971-67.298v74.784L182.898,166.853z M415.677,399.923c-22.558,6.038-45.942,3.837-62.587-5.846c-10.587-6.163-17.587-14.817-20.25-25.019 c-7.144-27.385,18.452-58.058,57.058-68.365c8.414-2.25,16.942-3.346,25.192-3.346c13.875,0,26.962,3.115,37.385,9.192 c10.596,6.163,17.596,14.817,20.26,25.029v0.01c0.796,3.05,1.124,6.144,1.135,9.244v0.468h0.02 C473.668,365.851,449.763,390.814,415.677,399.923z\">\n        </path>\n      </g>\n    </g>\n  </g>\n</svg>",
  td = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 5.9266752 5.6408391\" height=\"21.31971\" width=\"22.4\">\n  <g>\n    <path d=\"m 5.2564627,1.548212 c -3.1136005,-0.4796804 -1.5568006,-0.2398402 0,0 z M 2.0001198,2.0922063 c 0.1556781,0 0.2657489,0.020893 0.3917849,0.080366 0.081154,0.038347 0.1153492,0.134065 0.076377,0.2138602 -0.038973,0.07979 -0.1363527,0.1134129 -0.2175069,0.075091 -0.078199,-0.036919 -0.1407455,-0.048792 -0.250655,-0.048792 -0.2260486,0 -0.3921482,0.2042182 -0.3921482,0.4801409 0,0.2761822 0.1663188,0.4810688 0.3921482,0.4810688 0.1117901,0 0.2064255,-0.046133 0.255659,-0.1284198 l 0.00162,-0.00389 V 3.0534032 l -0.098011,1.75e-4 c -0.081844,0 -0.1495979,-0.059305 -0.1612403,-0.1365887 l -0.00175,-0.023683 c 0,-0.08047 0.060311,-0.1470874 0.1389194,-0.1585331 l 0.024085,-0.00195 h 0.2612303 c 0.081842,0 0.149598,0.059305 0.1612404,0.1365891 l 0.00175,0.023683 -3.398e-4,0.3968809 v 0 l -0.00168,0.014211 v 0 l -0.00553,0.023034 v 0 l -0.00532,0.014145 c -0.098178,0.22826 -0.3236506,0.3528713 -0.5706303,0.3528713 -0.4240855,0 -0.7181621,-0.3622714 -0.7181621,-0.8016063 0,-0.4391857 0.2940275,-0.8006848 0.7181621,-0.8006848 z m 1.2034759,0.031275 c 0.081843,0 0.1495977,0.059305 0.1612403,0.1365891 l 0.00175,0.023683 v 1.2211775 c 0,0.088516 -0.07298,0.1602721 -0.1630073,0.1602721 -0.081841,0 -0.1495972,-0.059305 -0.1612397,-0.1365892 L 3.040589,3.5049308 V 2.2837527 c 0,-0.088516 0.07298,-0.1602721 0.1630067,-0.1602714 z m 0.7813442,0 0.5209469,0.00195 c 0.090025,3.048e-4 0.1627543,0.072306 0.1624458,0.1608234 -2.809e-4,0.08047 -0.06083,0.1468798 -0.1394772,0.158066 l -0.024092,0.00195 -0.3575326,-0.0013 v 0.4497782 l 0.2928918,2.27e-4 c 0.081842,0 0.1495979,0.059305 0.1612403,0.136589 l 0.00175,0.023683 c 0,0.080469 -0.06031,0.1470871 -0.1389193,0.1585393 l -0.024092,0.00195 -0.2928919,-2.336e-4 1.563e-4,0.2860316 c 0,0.080471 -0.06031,0.1470873 -0.1389193,0.1585395 l -0.024085,0.00195 c -0.081843,0 -0.1495979,-0.059305 -0.1612403,-0.1365826 l -0.00175,-0.023691 V 2.2841354 c 2.798e-4,-0.08047 0.060829,-0.1468797 0.1394758,-0.1580594 z\"/>\n    <path d=\"m 5.0894191,1.0943261 c 0,-0.21918999 -0.177687,-0.39686999 -0.396876,-0.39686999 h -3.43959 c -0.2191879,0 -0.391262,0.1777519 -0.3968759,0.39686999 l -0.027082,3.4379266 c 0.040152,0.2939927 0.4235456,0.409415 0.4235456,0.409415 l 3.4785583,-0.00851 c 0,0 0.3008506,-0.1402998 0.3236271,-0.4201576 0.042911,-0.5272495 0.034693,-1.6106146 0.034693,-3.4186761 z m -4.49792494,0 c 0,-0.36530999 0.29614504,-0.66145999 0.66145894,-0.66145999 h 3.43959 c 0.365314,0 0.66146,0.29615 0.66146,0.66145999 v 3.43959 c 0,0.36532 -0.296146,0.66146 -0.66146,0.66146 h -3.43959 c -0.3653139,0 -0.66145894,-0.29614 -0.66145894,-0.66146 z\"/>\n  </g>\n</svg>\n",
  nd = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ee, {
    id: "upload-images-icon",
    svgString: Qh,
    dropupText: "Image"
  }), kn, {
    id: "upload-gifs-icon",
    svgString: td,
    dropupText: "GIF"
  }), j, {
    id: "upload-audio-icon",
    svgString: ed,
    dropupText: "Audio"
  }), "mixedFiles", {
    id: "upload-mixed-files-icon",
    svgString: Jh,
    dropupText: "File"
  });
var mi = /*#__PURE__*/function (_n21) {
  function mi(e) {
    var _this92;
    _classCallCheck(this, mi);
    (e == null ? void 0 : e.position) === st && (e.position = ye);
    var t = yt.tryCreateConfig("Microphone", e == null ? void 0 : e.tooltip);
    _this92 = _callSuper(this, mi, [mi.createMicrophoneElement(), xo, e == null ? void 0 : e.position, t, e]), _this92.isActive = !1, _this92._innerElements = _this92.createInnerElementsForStates(_this92.customStyles), _this92.changeToDefault();
    return _this92;
  }
  _inherits(mi, _n21);
  return _createClass(mi, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      var t = "microphone-icon";
      return _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, x, this.createInnerElements(t, x, e)), U, this.createInnerElements(t, U, e)), $n, this.createInnerElements(t, $n, e)), Sn, this.createInnerElements(t, Sn, e));
    }
  }, {
    key: "changeToActive",
    value: function changeToActive() {
      this.changeElementsByState(this._innerElements[U]), this.toggleIconFilter(U), this.reapplyStateStyle(U, [x, Sn]), this.isActive = !0;
    }
  }, {
    key: "changeToDefault",
    value: function changeToDefault() {
      this.changeElementsByState(this._innerElements[x]), this.toggleIconFilter(x), this.reapplyStateStyle(x, [U, Sn]), this.isActive = !1;
    }
  }, {
    key: "changeToCommandMode",
    value: function changeToCommandMode() {
      this.changeElementsByState(this._innerElements[Sn]), this.toggleIconFilter("command"), this.reapplyStateStyle(Sn, [U]);
    }
  }, {
    key: "changeToUnsupported",
    value: function changeToUnsupported() {
      this.changeElementsByState(this._innerElements[$n]), this.elementRef[f].add("".concat($n, "-microphone")), this.reapplyStateStyle($n, [U]);
    }
  }, {
    key: "toggleIconFilter",
    value: function toggleIconFilter(e) {
      var t = this.elementRef.children[0];
      if (t.tagName.toLocaleLowerCase() === G) switch (e) {
        case x:
          t[f].remove("active-microphone-icon", "command-microphone-icon"), t[f].add("default-microphone-icon");
          break;
        case U:
          t[f].remove("default-microphone-icon", "command-microphone-icon"), t[f].add("active-microphone-icon");
          break;
        case "command":
          t[f].remove("active-microphone-icon", "default-microphone-icon"), t[f].add("command-microphone-icon");
          break;
      }
    }
  }], [{
    key: "createMicrophoneElement",
    value: function createMicrophoneElement() {
      var e = S();
      return e.id = "microphone-button", e[f].add("input-button"), e;
    }
  }]);
}(_n);
var Ls = /*#__PURE__*/function () {
  function Ps() {
    _classCallCheck(this, Ps);
  }
  return _createClass(Ps, null, [{
    key: "capitalize",
    value: function capitalize(e) {
      return e.replace(Ps.FIRST_CHAR_REGEX, function (t) {
        return t.toUpperCase();
      });
    }
  }, {
    key: "lineBreak",
    value: function lineBreak(e) {
      return e.replace(Ps.DOUBLE_LINE, "<p></p>").replace(Ps.ONE_LINE, "<br>");
    }
  }, {
    key: "isCharDefined",
    value: function isCharDefined(e) {
      return e !== void 0 && e !== " " && e !== " " && e !== "\n" && e !== "";
    }
  }, {
    key: "breakupIntoWordsArr",
    value: function breakupIntoWordsArr(e) {
      return e.split(/(\W+)/);
    }
  }]);
}();
Ls.FIRST_CHAR_REGEX = /\S/, Ls.DOUBLE_LINE = /\n\n/g, Ls.ONE_LINE = /\n/g;
var rt = Ls;
var Zi = /*#__PURE__*/function () {
  function Zi() {
    _classCallCheck(this, Zi);
  }
  return _createClass(Zi, null, [{
    key: "translate",
    value: function translate(e, t) {
      var n = rt.breakupIntoWordsArr(e);
      for (var s = 0; s < n.length; s += 1) t[n[s]] && (n[s] = t[n[s]]);
      return n.join("");
    }
  }]);
}();
var Jr = /*#__PURE__*/function () {
  function Jr() {
    _classCallCheck(this, Jr);
  }
  return _createClass(Jr, null, [{
    key: "extract",
    value: function extract(e, t, n) {
      var s = "";
      for (var r = e.resultIndex; r < e.results.length; ++r) {
        var o = e.results[r][0].transcript;
        n && (o = Zi.translate(o, n)), e.results[r].isFinal ? t += o : s += o;
      }
      return {
        interimTranscript: s,
        finalTranscript: t,
        newText: s || t
      };
    }
  }, {
    key: "extractSafari",
    value: function extractSafari(e, t, n) {
      var s = "";
      for (var r = e.resultIndex; r < e.results.length; ++r) {
        var o = e.results[r][0].transcript;
        n && (o = Zi.translate(o, n)), s += o;
      }
      return {
        interimTranscript: "",
        finalTranscript: s,
        newText: s
      };
    }
  }]);
}();
var qn = /*#__PURE__*/_createClass(function qn() {
  _classCallCheck(this, qn);
});
qn.IS_SAFARI = function () {
  return qn._IS_SAFARI === void 0 && (qn._IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)), qn._IS_SAFARI;
};
var ps = qn;
var Lo = /*#__PURE__*/function () {
  function vt() {
    _classCallCheck(this, vt);
  }
  return _createClass(vt, null, [{
    key: "getElementIfFocusedOnAvailable",
    value: function getElementIfFocusedOnAvailable(e, t) {
      return Array.isArray(e) ? e.find(function (n) {
        return t === n;
      }) : t === e ? e : void 0;
    }
  }, {
    key: "keyDownWindow",
    value: function keyDownWindow(e) {
      var _this93 = this;
      e.element && vt.getElementIfFocusedOnAvailable(e.element, document.activeElement) && (vt.KEY_DOWN_TIMEOUT !== null && clearTimeout(vt.KEY_DOWN_TIMEOUT), vt.KEY_DOWN_TIMEOUT = setTimeout(function () {
        vt.KEY_DOWN_TIMEOUT = null, _this93.resetRecording(e);
      }, 500));
    }
  }, {
    key: "mouseDownWindow",
    value: function mouseDownWindow(e, t) {
      this.mouseDownElement = vt.getElementIfFocusedOnAvailable(e, t.target);
    }
  }, {
    key: "mouseUpWindow",
    value: function mouseUpWindow(e) {
      this.mouseDownElement && this.resetRecording(e), this.mouseDownElement = void 0;
    }
  }, {
    key: "add",
    value: function add(e, t) {
      var n = (t == null ? void 0 : t.insertInCursorLocation) === void 0 || (t == null ? void 0 : t.insertInCursorLocation);
      t != null && t.element && n && (e.mouseDownEvent = vt.mouseDownWindow.bind(e, t.element), document.addEventListener("mousedown", e.mouseDownEvent), e.mouseUpEvent = vt.mouseUpWindow.bind(e, t), document.addEventListener("mouseup", e.mouseUpEvent), e.keyDownEvent = vt.keyDownWindow.bind(e, t), document.addEventListener("keydown", e.keyDownEvent));
    }
  }, {
    key: "remove",
    value: function remove(e) {
      document.removeEventListener("mousedown", e.mouseDownEvent), document.removeEventListener("mouseup", e.mouseUpEvent), document.removeEventListener("keydown", e.keyDownEvent);
    }
  }]);
}();
Lo.KEY_DOWN_TIMEOUT = null;
var Qr = Lo;
var sd = /*#__PURE__*/function () {
  function sd() {
    _classCallCheck(this, sd);
  }
  return _createClass(sd, null, [{
    key: "process",
    value: function process(e, t, n, s, r) {
      var o = s == null ? void 0 : s(t, n);
      return o ? (setTimeout(function () {
        o.restart ? e.resetRecording(r) : o.stop && e.stop();
      }), (o.stop || o.restart) && o.removeNewText) : !1;
    }
  }]);
}();
var Kt = /*#__PURE__*/function () {
  function Kt() {
    _classCallCheck(this, Kt);
  }
  return _createClass(Kt, null, [{
    key: "changeStateIfNeeded",
    value: function changeStateIfNeeded(e, t) {
      t && !e.isCursorAtEnd && (e.endPadding = "", e.scrollingSpan.innerHTML = "&nbsp;");
    }
  }, {
    key: "scrollGeneric",
    value: function scrollGeneric(e, t) {
      e.isCursorAtEnd ? t.scrollTop = t.scrollHeight : e.scrollingSpan.scrollIntoView({
        block: "nearest"
      });
    }
    // primitives don't need to be scrolled except in safari
    // they can only safely be scrolled to the end
  }, {
    key: "scrollSafariPrimitiveToEnd",
    value: function scrollSafariPrimitiveToEnd(e) {
      e.scrollLeft = e.scrollWidth, e.scrollTop = e.scrollHeight;
    }
  }, {
    key: "isElementOverflown",
    value: function isElementOverflown(e) {
      return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
    }
  }, {
    key: "isRequired",
    value: function isRequired(e, t) {
      return e && Kt.isElementOverflown(t);
    }
  }]);
}();
var Ye = /*#__PURE__*/function () {
  function Ye() {
    _classCallCheck(this, Ye);
  }
  return _createClass(Ye, null, [{
    key: "isPrimitiveElement",
    value: function isPrimitiveElement(e) {
      return e.tagName === "INPUT" || e.tagName === "TEXTAREA";
    }
  }, {
    key: "createInterimSpan",
    value: function createInterimSpan() {
      var e = document.createElement("span");
      return e.style.color = "grey", e.style.pointerEvents = "none", e;
    }
  }, {
    key: "createGenericSpan",
    value: function createGenericSpan() {
      var e = document.createElement("span");
      return e.style.pointerEvents = "none", e;
    }
  }, {
    key: "appendSpans",
    value: function appendSpans(e, t) {
      if (e.spansPopulated = !0, e.insertInCursorLocation && document.activeElement === t) {
        var _n22 = window.getSelection();
        if (_n22 != null && _n22.focusNode) {
          var s = _n22.getRangeAt(0);
          s.insertNode(e.scrollingSpan), s.insertNode(e.interimSpan), s.insertNode(e.finalSpan), s.collapse(!1), _n22.removeAllRanges(), _n22.addRange(s);
          return;
        }
      }
      t.appendChild(e.finalSpan), t.appendChild(e.interimSpan), t.appendChild(e.scrollingSpan);
    }
  }, {
    key: "applyCustomColors",
    value: function applyCustomColors(e, t) {
      t.interim && (e.interimSpan.style.color = t.interim), t["final"] && (e.finalSpan.style.color = t["final"]);
    }
  }, {
    key: "isInsideShadowDOM",
    value: function isInsideShadowDOM(e) {
      return e.getRootNode() instanceof ShadowRoot;
    }
  }]);
}();
var Ue = /*#__PURE__*/function () {
  function Ue() {
    _classCallCheck(this, Ue);
  }
  return _createClass(Ue, null, [{
    key: "setOffsetForGeneric",
    value: function setOffsetForGeneric(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var s = 0;
      for (var r = 0; r < e.childNodes.length; r += 1) {
        var o = e.childNodes[r];
        if (o.childNodes.length > 0) {
          var a = Ue.setOffsetForGeneric(o, t, n);
          if (a === -1) return -1;
          n += a;
        } else if (o.textContent !== null) {
          if (n + o.textContent.length > t) {
            var _a7 = document.createRange();
            _a7.setStart(o, t - n), _a7.collapse(!0);
            var c = window.getSelection();
            return c == null || c.removeAllRanges(), c == null || c.addRange(_a7), e.focus(), -1;
          }
          n += o.textContent.length, s += o.textContent.length;
        }
      }
      return s;
    }
  }, {
    key: "focusEndOfGeneric",
    value: function focusEndOfGeneric(e) {
      var t = document.createRange();
      t.selectNodeContents(e), t.collapse(!1);
      var n = window.getSelection();
      n && (n.removeAllRanges(), n.addRange(t));
    }
  }, {
    key: "setOffsetForSafariGeneric",
    value: function setOffsetForSafariGeneric(e, t) {
      var n = window.getSelection();
      if (n) {
        var s = Ue.getGenericElementCursorOffset(e, n, !0);
        Ue.setOffsetForGeneric(e, s + t);
      }
    }
    // set to automatically scroll to cursor (scroll does not work in Safari)
  }, {
    key: "setOffsetForPrimitive",
    value: function setOffsetForPrimitive(e, t, n) {
      n && e.blur(), e.setSelectionRange(t, t), e.focus();
    }
    // Scroll Input in Safari - does not work for TextArea and uses span which can have a different style
    // private static getCursorOffsetFromLeft(inputElement: HTMLInputElement, position: number) {
    //   // Get the value of the input element up to the cursor position
    //   const valueUpToCursor = inputElement.value.substring(0, position);
    //   // Create a temporary span element to measure the width of the text
    //   const tempSpan = document.createElement('span');
    //   tempSpan.textContent = valueUpToCursor;
    //   tempSpan.style.visibility = 'hidden';
    //   tempSpan.style.position = 'absolute';
    //   document.body.appendChild(tempSpan);
    //   // Measure the width of the text up to the cursor position
    //   const offsetWidth = tempSpan.offsetWidth;
    //   const offsetHeight = tempSpan.offsetHeight;
    //   // Clean up the temporary span element
    //   document.body.removeChild(tempSpan);
    //   return {left: offsetWidth, top: offsetHeight};
    // }
  }, {
    key: "getGenericElementCursorOffset",
    value: function getGenericElementCursorOffset(e, t, n) {
      var s = 0;
      if (t.rangeCount > 0) {
        var r = t.getRangeAt(0),
          o = r.cloneRange();
        o.selectNodeContents(e), n ? o.setEnd(r.startContainer, r.startOffset) : o.setEnd(r.endContainer, r.endOffset), s = o.toString().length;
      }
      return s;
    }
    // for input
    // private static insertTextAtCursor(text: string, input: HTMLInputElement) {
    //   const startPos = input.selectionStart;
    //   const endPos = input.selectionEnd;
    //   if (startPos !== null && endPos !== null) {
    //     input.value = input.value.substring(0, startPos) + text + input.value.substring(endPos);
    //     input.selectionStart = input.selectionEnd = startPos + text.length;
    //   }
    // }
  }]);
}();
var $e = /*#__PURE__*/function () {
  function $e() {
    _classCallCheck(this, $e);
  }
  return _createClass($e, null, [{
    key: "processCommand",
    value: function processCommand(e, t) {
      return (!t || !t.caseSensitive) && (e = e.toLowerCase()), (t == null ? void 0 : t.substrings) === !1 ? rt.breakupIntoWordsArr(e) : e;
    }
  }, {
    key: "process",
    value: function process(e) {
      var t;
      return ((t = e.settings) == null ? void 0 : t.caseSensitive) === !0 ? e : Object.keys(e).reduce(function (n, s) {
        var r = e[s];
        return n[s] = typeof r == "string" ? $e.processCommand(r, e.settings) : r, n;
      }, {});
    }
  }, {
    key: "toggleCommandModeOn",
    value: function toggleCommandModeOn(e) {
      var t;
      e.isWaitingForCommand = !0, (t = e.onCommandModeTrigger) == null || t.call(e, !0);
    }
  }, {
    key: "toggleCommandModeOff",
    value: function toggleCommandModeOff(e) {
      var t;
      e.isWaitingForCommand && ((t = e.onCommandModeTrigger) == null || t.call(e, !1), e.isWaitingForCommand = !1);
    }
  }, {
    key: "setText",
    value: function setText(e, t, n, s) {
      $e.toggleCommandModeOff(e), Ye.isPrimitiveElement(s) ? (s.value = n, e.isTargetInShadow || Ue.setOffsetForPrimitive(s, n.length, !0), ps.IS_SAFARI() && e.autoScroll && Kt.scrollSafariPrimitiveToEnd(s)) : (s.textContent = n, e.isTargetInShadow || Ue.focusEndOfGeneric(s), setTimeout(function () {
        return Kt.scrollGeneric(e, s);
      })), e.resetRecording(t);
    }
  }, {
    key: "checkIfMatchesSubstring",
    value: function checkIfMatchesSubstring(e, t) {
      return t.includes(e);
    }
  }, {
    key: "checkIfMatchesWord",
    value: function checkIfMatchesWord(e, t, n) {
      var s = e;
      for (var r = n.length - 1; r >= 0; r -= 1) {
        var o = r,
          a = s.length - 1;
        for (; n[o] === s[a] && a >= 0;) o -= 1, a -= 1;
        if (a < 0) return !0;
      }
      return !1;
    }
    // prettier-ignore
  }, {
    key: "execCommand",
    value: function execCommand(e, t, n, s, r) {
      var o, a, c;
      var l = e.commands;
      if (!l || !s || !n) return;
      var h = ((o = l.settings) == null ? void 0 : o.caseSensitive) === !0 ? t : t.toLowerCase(),
        u = rt.breakupIntoWordsArr(h),
        g = ((a = l.settings) == null ? void 0 : a.substrings) === !1 ? $e.checkIfMatchesWord : $e.checkIfMatchesSubstring;
      if (l.commandMode && g(l.commandMode, h, u)) return e.setInterimColorToFinal(), setTimeout(function () {
        return $e.toggleCommandModeOn(e);
      }), {
        doNotProcessTranscription: !1
      };
      if (!(l.commandMode && !e.isWaitingForCommand)) {
        if (l.stop && g(l.stop, h, u)) return $e.toggleCommandModeOff(e), setTimeout(function () {
          return e.stop();
        }), {
          doNotProcessTranscription: !1
        };
        if (l.pause && g(l.pause, h, u)) return $e.toggleCommandModeOff(e), e.setInterimColorToFinal(), setTimeout(function () {
          var b;
          e.isPaused = !0, (b = e.onPauseTrigger) == null || b.call(e, !0);
        }), {
          doNotProcessTranscription: !1
        };
        if (l.resume && g(l.resume, h, u)) return e.isPaused = !1, (c = e.onPauseTrigger) == null || c.call(e, !1), $e.toggleCommandModeOff(e), e.resetRecording(n), {
          doNotProcessTranscription: !0
        };
        if (l.reset && g(l.reset, h, u)) return r !== void 0 && $e.setText(e, n, r, s), {
          doNotProcessTranscription: !0
        };
        if (l.removeAllText && g(l.removeAllText, h, u)) return $e.setText(e, n, "", s), {
          doNotProcessTranscription: !0
        };
      }
    }
  }]);
}();
var On = /*#__PURE__*/function () {
  function On() {
    _classCallCheck(this, On);
  }
  return _createClass(On, null, [{
    key: "setStateForPrimitive",
    value: function setStateForPrimitive(e, t) {
      var n, s;
      t.selectionStart !== null && (n = t.selectionStart), t.selectionEnd !== null && (s = t.selectionEnd), e.isHighlighted = n !== s;
    }
  }, {
    key: "setStateForGeneric",
    value: function setStateForGeneric(e, t) {
      var n = window.getSelection();
      if (n != null && n.focusNode) {
        var s = Ue.getGenericElementCursorOffset(t, n, !0),
          r = Ue.getGenericElementCursorOffset(t, n, !1);
        e.isHighlighted = s !== r;
      }
    }
  }, {
    key: "setState",
    value: function setState(e, t) {
      document.activeElement === t && (Ye.isPrimitiveElement(t) ? On.setStateForPrimitive(e, t) : On.setStateForGeneric(e, t));
    }
  }, {
    key: "removeForGeneric",
    value: function removeForGeneric(e, t) {
      var n = window.getSelection();
      if (n) {
        var s = Ue.getGenericElementCursorOffset(t, n, !0);
        n.deleteFromDocument(), Ue.setOffsetForGeneric(t, s), e.isHighlighted = !1;
      }
    }
  }, {
    key: "removeForPrimitive",
    value: function removeForPrimitive(e, t) {
      var n = t.selectionStart,
        s = t.selectionEnd,
        r = t.value;
      if (n && s) {
        var o = r.substring(0, n) + r.substring(s);
        t.value = o, Ue.setOffsetForPrimitive(t, n, e.autoScroll);
      }
      e.isHighlighted = !1;
    }
  }]);
}();
var Nn = /*#__PURE__*/function () {
  function Nn() {
    _classCallCheck(this, Nn);
  }
  return _createClass(Nn, null, [{
    key: "setStateForPrimitiveElement",
    value: function setStateForPrimitiveElement(e, t) {
      if (document.activeElement === t && t.selectionStart !== null) {
        var s = t.selectionStart,
          r = t.value[s - 1],
          o = t.selectionEnd === null ? s : t.selectionEnd,
          a = t.value[o];
        rt.isCharDefined(r) && (e.startPadding = " ", e.numberOfSpacesBeforeNewText = 1), rt.isCharDefined(a) && (e.endPadding = " ", e.numberOfSpacesAfterNewText = 1), e.isCursorAtEnd = t.value.length === o;
        return;
      }
      var n = t.value[t.value.length - 1];
      rt.isCharDefined(n) && (e.startPadding = " ", e.numberOfSpacesBeforeNewText = 1), e.isCursorAtEnd = !0;
    }
  }, {
    key: "setStateForGenericElement",
    value: function setStateForGenericElement(e, t) {
      var n, s, r;
      if (document.activeElement === t) {
        var a = window.getSelection();
        if (a != null && a.focusNode) {
          var c = Ue.getGenericElementCursorOffset(t, a, !0),
            l = (n = t.textContent) == null ? void 0 : n[c - 1],
            h = Ue.getGenericElementCursorOffset(t, a, !1),
            u = (s = t.textContent) == null ? void 0 : s[h];
          rt.isCharDefined(l) && (e.startPadding = " "), rt.isCharDefined(u) && (e.endPadding = " "), e.isCursorAtEnd = ((r = t.textContent) == null ? void 0 : r.length) === h;
          return;
        }
      }
      var o = t.innerText.charAt(t.innerText.length - 1);
      rt.isCharDefined(o) && (e.startPadding = " "), e.isCursorAtEnd = !0;
    }
  }, {
    key: "setState",
    value: function setState(e, t) {
      Ye.isPrimitiveElement(t) ? Nn.setStateForPrimitiveElement(e, t) : Nn.setStateForGenericElement(e, t);
    }
  }, {
    key: "adjustStateAfterRecodingPrimitiveElement",
    value: function adjustStateAfterRecodingPrimitiveElement(e, t) {
      if (e.primitiveTextRecorded = !0, e.insertInCursorLocation && document.activeElement === t && (t.selectionEnd !== null && (e.endPadding = e.endPadding + t.value.slice(t.selectionEnd)), t.selectionStart !== null)) {
        e.startPadding = t.value.slice(0, t.selectionStart) + e.startPadding;
        return;
      }
      e.startPadding = t.value + e.startPadding;
    }
  }, {
    key: "adjustSateForNoTextPrimitiveElement",
    value: function adjustSateForNoTextPrimitiveElement(e) {
      e.numberOfSpacesBeforeNewText === 1 && (e.startPadding = e.startPadding.substring(0, e.startPadding.length - 1), e.numberOfSpacesBeforeNewText = 0), e.numberOfSpacesAfterNewText === 1 && (e.endPadding = e.endPadding.substring(1), e.numberOfSpacesAfterNewText = 0);
    }
  }]);
}();
var Po = /*#__PURE__*/function () {
  // this is mostly used for Azure to prevent user from stopping when it is connecting
  function Po() {
    _classCallCheck(this, Po);
    this.finalTranscript = "", this.interimSpan = Ye.createInterimSpan(), this.finalSpan = Ye.createGenericSpan(), this.scrollingSpan = Ye.createGenericSpan(), this.isCursorAtEnd = !1, this.spansPopulated = !1, this.startPadding = "", this.endPadding = "", this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.recognizing = !1, this._displayInterimResults = !0, this.insertInCursorLocation = !0, this.autoScroll = !0, this.isRestarting = !1, this.isPaused = !1, this.isWaitingForCommand = !1, this.isTargetInShadow = !1, this.cannotBeStopped = !1, this.resetState();
  }
  return _createClass(Po, [{
    key: "prepareBeforeStart",
    value: function prepareBeforeStart(e) {
      var t, n;
      if (e != null && e.element) if (Qr.add(this, e), Array.isArray(e.element)) {
        var s = e.element.find(function (r) {
          return r === document.activeElement;
        }) || e.element[0];
        if (!s) return;
        this.prepare(s);
      } else this.prepare(e.element);
      (e == null ? void 0 : e.displayInterimResults) !== void 0 && (this._displayInterimResults = e.displayInterimResults), e != null && e.textColor && (this._finalTextColor = (t = e == null ? void 0 : e.textColor) == null ? void 0 : t["final"], Ye.applyCustomColors(this, e.textColor)), (e == null ? void 0 : e.insertInCursorLocation) !== void 0 && (this.insertInCursorLocation = e.insertInCursorLocation), (e == null ? void 0 : e.autoScroll) !== void 0 && (this.autoScroll = e.autoScroll), this._onResult = e == null ? void 0 : e.onResult, this._onPreResult = e == null ? void 0 : e.onPreResult, this._onStart = e == null ? void 0 : e.onStart, this._onStop = e == null ? void 0 : e.onStop, this._onError = e == null ? void 0 : e.onError, this.onCommandModeTrigger = e == null ? void 0 : e.onCommandModeTrigger, this.onPauseTrigger = e == null ? void 0 : e.onPauseTrigger, this._options = e, (n = this._options) != null && n.commands && (this.commands = $e.process(this._options.commands));
    }
  }, {
    key: "prepare",
    value: function prepare(e) {
      Nn.setState(this, e), On.setState(this, e), this.isTargetInShadow = Ye.isInsideShadowDOM(e), Ye.isPrimitiveElement(e) ? (this._primitiveElement = e, this._originalText = this._primitiveElement.value) : (this._genericElement = e, this._originalText = this._genericElement.textContent);
    }
    // there was an attempt to optimize this by not having to restart the service and just reset state:
    // unfortunately it did not work because the service would still continue firing the intermediate and final results
    // into the new position
  }, {
    key: "resetRecording",
    value: function resetRecording(e) {
      this.isRestarting = !0, this.stop(!0), this.resetState(!0), this.start(e, !0);
    }
    // prettier-ignore
  }, {
    key: "updateElements",
    value: function updateElements(e, t, n) {
      var s;
      var r = rt.capitalize(t);
      if (this.finalTranscript === r && e === "") return;
      sd.process(this, n, e === "", this._onPreResult, this._options) && (e = "", n = "");
      var o = this.commands && $e.execCommand(this, n, this._options, this._primitiveElement || this._genericElement, this._originalText);
      if (o) {
        if (o.doNotProcessTranscription) return;
        e = "", n = "";
      }
      if (this.isPaused || this.isWaitingForCommand) return;
      (s = this._onResult) == null || s.call(this, n, e === ""), this.finalTranscript = r, this._displayInterimResults || (e = "");
      var a = this.finalTranscript === "" && e === "";
      this._primitiveElement ? this.updatePrimitiveElement(this._primitiveElement, e, a) : this._genericElement && this.updateGenericElement(this._genericElement, e, a);
    }
    // prettier-ignore
    // remember that padding values here contain actual text left and right
  }, {
    key: "updatePrimitiveElement",
    value: function updatePrimitiveElement(e, t, n) {
      this.isHighlighted && On.removeForPrimitive(this, e), this.primitiveTextRecorded || Nn.adjustStateAfterRecodingPrimitiveElement(this, e), n && Nn.adjustSateForNoTextPrimitiveElement(this);
      var s = this.startPadding + this.finalTranscript + t;
      if (e.value = s + this.endPadding, !this.isTargetInShadow) {
        var r = s.length + this.numberOfSpacesAfterNewText;
        Ue.setOffsetForPrimitive(e, r, this.autoScroll);
      }
      this.autoScroll && ps.IS_SAFARI() && this.isCursorAtEnd && Kt.scrollSafariPrimitiveToEnd(e);
    }
  }, {
    key: "updateGenericElement",
    value: function updateGenericElement(e, t, n) {
      this.isHighlighted && On.removeForGeneric(this, e), this.spansPopulated || Ye.appendSpans(this, e);
      var s = (n ? "" : this.startPadding) + rt.lineBreak(this.finalTranscript);
      this.finalSpan.innerHTML = s;
      var r = Kt.isRequired(this.autoScroll, e);
      Kt.changeStateIfNeeded(this, r);
      var o = rt.lineBreak(t) + (n ? "" : this.endPadding);
      this.interimSpan.innerHTML = o, ps.IS_SAFARI() && this.insertInCursorLocation && Ue.setOffsetForSafariGeneric(e, s.length + o.length), r && Kt.scrollGeneric(this, e), n && (this.scrollingSpan.innerHTML = "");
    }
  }, {
    key: "finalise",
    value: function finalise(e) {
      this._genericElement && (e ? (this.finalSpan = Ye.createGenericSpan(), this.setInterimColorToFinal(), this.interimSpan = Ye.createInterimSpan(), this.scrollingSpan = Ye.createGenericSpan()) : this._genericElement.textContent = this._genericElement.textContent, this.spansPopulated = !1), Qr.remove(this);
    }
  }, {
    key: "setInterimColorToFinal",
    value: function setInterimColorToFinal() {
      this.interimSpan.style.color = this._finalTextColor || "black";
    }
  }, {
    key: "resetState",
    value: function resetState(e) {
      this._primitiveElement = void 0, this._genericElement = void 0, this.finalTranscript = "", this.finalSpan.innerHTML = "", this.interimSpan.innerHTML = "", this.scrollingSpan.innerHTML = "", this.startPadding = "", this.endPadding = "", this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, e || (this.stopTimeout = void 0);
    }
  }, {
    key: "setStateOnStart",
    value: function setStateOnStart() {
      var e;
      this.recognizing = !0, this.isRestarting ? this.isRestarting = !1 : (e = this._onStart) == null || e.call(this);
    }
  }, {
    key: "setStateOnStop",
    value: function setStateOnStop() {
      var e;
      this.recognizing = !1, this.isRestarting || (e = this._onStop) == null || e.call(this);
    }
  }, {
    key: "setStateOnError",
    value: function setStateOnError(e) {
      var t;
      (t = this._onError) == null || t.call(this, e), this.recognizing = !1;
    }
  }]);
}();
var fs = /*#__PURE__*/function (_Po) {
  function fs() {
    _classCallCheck(this, fs);
    return _callSuper(this, fs);
  }
  _inherits(fs, _Po);
  return _createClass(fs, [{
    key: "start",
    value: function start(e) {
      var t;
      this._extractText === void 0 && (this._extractText = ps.IS_SAFARI() ? Jr.extractSafari : Jr.extract), this.validate() && (this.prepareBeforeStart(e), this.instantiateService(e), (t = this._service) == null || t.start(), this._translations = e == null ? void 0 : e.translations);
    }
  }, {
    key: "validate",
    value: function validate() {
      return fs.getAPI() ? !0 : (this.error("Speech Recognition is unsupported"), !1);
    }
  }, {
    key: "instantiateService",
    value: function instantiateService(e) {
      var _ref240;
      var t;
      var n = fs.getAPI();
      this._service = new n(), this._service.continuous = !0, this._service.interimResults = (_ref240 = e == null ? void 0 : e.displayInterimResults) !== null && _ref240 !== void 0 ? _ref240 : !0, this._service.lang = ((t = e == null ? void 0 : e.language) == null ? void 0 : t.trim()) || "en-US", this.setEvents();
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this94 = this;
      this._service && (this._service.onstart = function () {
        _this94.setStateOnStart();
      }, this._service.onerror = function (e) {
        ps.IS_SAFARI() && e.message === "Another request is started" || e.error === "aborted" && _this94.isRestarting || e.error !== "no-speech" && _this94.error(e.message || e.error);
      }, this._service.onaudioend = function () {
        _this94.setStateOnStop();
      }, this._service.onend = function () {
        _this94._stopping = !1;
      }, this._service.onresult = function (e) {
        if (_typeof(e.results) > "u" && _this94._service) _this94._service.onend = null, _this94._service.stop();else if (_this94._extractText && !_this94._stopping) {
          var _this94$_extractText = _this94._extractText(e, _this94.finalTranscript, _this94._translations),
            t = _this94$_extractText.interimTranscript,
            _n23 = _this94$_extractText.finalTranscript,
            s = _this94$_extractText.newText;
          _this94.updateElements(t, _n23, s);
        }
      });
    }
  }, {
    key: "stop",
    value: function stop(e) {
      var t;
      this._stopping = !0, (t = this._service) == null || t.stop(), this.finalise(e);
    }
  }, {
    key: "error",
    value: function error(e) {
      console.error(e), this.setStateOnError(e), this.stop();
    }
  }], [{
    key: "getAPI",
    value: function getAPI() {
      return window.webkitSpeechRecognition || window.SpeechRecognition;
    }
  }]);
}(Po);
var Oo = /*#__PURE__*/function () {
  function Os() {
    _classCallCheck(this, Os);
  }
  return _createClass(Os, null, [{
    key: "doubleClickDetector",
    value: function doubleClickDetector() {
      return Os.doubleClickPending ? !0 : (Os.doubleClickPending = !0, setTimeout(function () {
        Os.doubleClickPending = !1;
      }, 300), !1);
    }
  }]);
}();
Oo.doubleClickPending = !1;
var lt = Oo;
var eo = /*#__PURE__*/function () {
  function eo() {
    _classCallCheck(this, eo);
  }
  return _createClass(eo, null, [{
    key: "applyPrevention",
    value: function applyPrevention(e) {
      clearTimeout(e._manualConnectionStopPrevention), e.cannotBeStopped = !0, e._manualConnectionStopPrevention = setTimeout(function () {
        e.cannotBeStopped = !1;
      }, 800);
    }
  }, {
    key: "clearPrevention",
    value: function clearPrevention(e) {
      clearTimeout(e._manualConnectionStopPrevention), e.cannotBeStopped = !1;
    }
  }]);
}();
var wi = "https://github.com/OvidijusParsiunas/speech-to-element";
var ms = /*#__PURE__*/function () {
  function ms() {
    _classCallCheck(this, ms);
  }
  return _createClass(ms, null, [{
    key: "validateOptions",
    value: function validateOptions(e, t) {
      return t ? !t.subscriptionKey && !t.token && !t.retrieveToken ? (e("Please define a 'subscriptionKey', 'token' or 'retrieveToken' property - more info: ".concat(wi)), !1) : t.region ? !0 : (e("Please define a 'region' property - more info: ".concat(wi)), !1) : (e("Please provide subscription details - more info: ".concat(wi)), !1);
    }
  }, {
    key: "getNewSpeechConfig",
    value: function () {
      var _getNewSpeechConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee165(e, t) {
        return _regenerator().w(function (_context165) {
          while (1) switch (_context165.n) {
            case 0:
              if (!t.region) {
                _context165.n = 1;
                break;
              }
              return _context165.a(2, t.subscriptionKey ? e.fromSubscription(t.subscriptionKey.trim(), t.region.trim()) : t.token ? e.fromAuthorizationToken(t.token.trim(), t.region.trim()) : t.retrieveToken ? t.retrieveToken().then(function (n) {
                return t.region ? e.fromAuthorizationToken((n == null ? void 0 : n.trim()) || "", t.region.trim()) : null;
              })["catch"](function (n) {
                return console.error(n), null;
              }) : null);
            case 1:
              return _context165.a(2);
          }
        }, _callee165);
      }));
      function getNewSpeechConfig(_x306, _x307) {
        return _getNewSpeechConfig.apply(this, arguments);
      }
      return getNewSpeechConfig;
    }()
  }, {
    key: "process",
    value: function process(e, t) {
      t.endpointId && (e.endpointId = t.endpointId.trim()), t.language && (e.speechRecognitionLanguage = t.language.trim());
    }
  }, {
    key: "get",
    value: function () {
      var _get2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee166(e, t) {
        var n;
        return _regenerator().w(function (_context166) {
          while (1) switch (_context166.n) {
            case 0:
              _context166.n = 1;
              return ms.getNewSpeechConfig(e, t);
            case 1:
              n = _context166.v;
              return _context166.a(2, (n && ms.process(n, t), n));
          }
        }, _callee166);
      }));
      function get(_x308, _x309) {
        return _get2.apply(this, arguments);
      }
      return get;
    }()
  }]);
}();
var No = /*#__PURE__*/function () {
  function Ns() {
    _classCallCheck(this, Ns);
  }
  return _createClass(Ns, null, [{
    key: "set",
    value:
    // 20s
    function set(e) {
      e.stopTimeout = setTimeout(function () {
        return e.stop();
      }, e.stopTimeoutMS);
    }
  }, {
    key: "reset",
    value: function reset(e, t) {
      e.stopTimeoutMS = t || Ns.DEFAULT_MS, Ns.stop(e), Ns.set(e);
    }
  }, {
    key: "stop",
    value: function stop(e) {
      e.stopTimeout && clearTimeout(e.stopTimeout);
    }
  }]);
}();
No.DEFAULT_MS = 2e4;
var Is = No;
var id = /*#__PURE__*/function () {
  function id() {
    _classCallCheck(this, id);
  }
  return _createClass(id, null, [{
    key: "get",
    value: function get(e, t) {
      return t ? e.fromMicrophoneInput(t) : e.fromDefaultMicrophoneInput();
    }
  }]);
}();
var to = /*#__PURE__*/function () {
  function to() {
    _classCallCheck(this, to);
  }
  return _createClass(to, null, [{
    key: "extract",
    value:
    // newText is used to only send new text in onResult as finalTranscript is continuously accumulated
    function extract(e, t, n, s) {
      return s && (e = Zi.translate(e, s)), n ? {
        interimTranscript: "",
        finalTranscript: t + e,
        newText: e
      } : {
        interimTranscript: e,
        finalTranscript: t,
        newText: e
      };
    }
  }]);
}();
var ti = /*#__PURE__*/function (_Po2) {
  function ti() {
    var _this95;
    _classCallCheck(this, ti);
    _this95 = _callSuper(this, ti, arguments), _this95._newTextPadding = "";
    return _this95;
  }
  // Unlike webspeech there is no automatic space between final results
  _inherits(ti, _Po2);
  return _createClass(ti, [{
    key: "start",
    value: function start(e, t) {
      this._newTextPadding = "", this.stopTimeout === void 0 && Is.reset(this, e == null ? void 0 : e.stopAfterSilenceMs), this.prepareBeforeStart(e), this.startAsync(e), t || eo.applyPrevention(this);
    }
  }, {
    key: "startAsync",
    value: function () {
      var _startAsync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee167(e) {
        var t, _t62;
        return _regenerator().w(function (_context167) {
          while (1) switch (_context167.n) {
            case 0:
              _t62 = this.validate(e);
              if (!_t62) {
                _context167.n = 2;
                break;
              }
              _context167.n = 1;
              return this.instantiateService(e);
            case 1:
              this._translations = e == null ? void 0 : e.translations;
              (t = this._service) == null || t.startContinuousRecognitionAsync(function () {}, this.error);
            case 2:
              return _context167.a(2);
          }
        }, _callee167, this);
      }));
      function startAsync(_x310) {
        return _startAsync.apply(this, arguments);
      }
      return startAsync;
    }()
  }, {
    key: "validate",
    value: function validate(e) {
      return ti.getAPI() ? ms.validateOptions(this.error.bind(this), e) : (this.moduleNotFound(), !1);
    }
  }, {
    key: "instantiateService",
    value: function () {
      var _instantiateService = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee168(e) {
        var t, n, s, r, _e$autoLanguage, o, a, c, l;
        return _regenerator().w(function (_context168) {
          while (1) switch (_context168.n) {
            case 0:
              t = ti.getAPI();
              n = id.get(t.AudioConfig, e.deviceId);
              _context168.n = 1;
              return ms.get(t.SpeechConfig, e);
            case 1:
              s = _context168.v;
              if (s) {
                if (e.autoLanguage && e.autoLanguage.languages.length > 0) {
                  _e$autoLanguage = e.autoLanguage, o = _e$autoLanguage.type, a = _e$autoLanguage.languages, c = a.slice(0, o === "Continuous" ? 10 : 4), l = t.AutoDetectSourceLanguageConfig.fromLanguages(c);
                  o === "Continuous" && (l.mode = 1), r = t.SpeechRecognizer.FromConfig(s, l, n);
                } else r = new t.SpeechRecognizer(s, n);
                this.setEvents(r), this._service = r, e.retrieveToken && this.retrieveTokenInterval(e.retrieveToken);
              } else this.error("Unable to contact Azure server");
            case 2:
              return _context168.a(2);
          }
        }, _callee168, this);
      }));
      function instantiateService(_x311) {
        return _instantiateService.apply(this, arguments);
      }
      return instantiateService;
    }()
  }, {
    key: "setEvents",
    value: function setEvents(e) {
      e.recognizing = this.onRecognizing.bind(this), e.recognized = this.onRecognized.bind(this), e.sessionStarted = this.onSessionStarted.bind(this), e.canceled = this.onCanceled.bind(this), e.sessionStopped = this.onSessionStopped.bind(this);
    }
    // prettier-ignore
  }, {
    key: "onRecognizing",
    value: function onRecognizing(e, t) {
      if (this._stopping) return;
      var _to$extract = to.extract(this._newTextPadding + t.result.text, this.finalTranscript, !1, this._translations),
        n = _to$extract.interimTranscript,
        s = _to$extract.finalTranscript,
        r = _to$extract.newText;
      Is.reset(this, this.stopTimeoutMS), this.updateElements(n, s, r);
    }
    // prettier-ignore
  }, {
    key: "onRecognized",
    value: function onRecognized(e, t) {
      var n = t.result;
      switch (n.reason) {
        case window.SpeechSDK.ResultReason.Canceled:
          break;
        case window.SpeechSDK.ResultReason.RecognizedSpeech:
          if (n.text && !this._stopping) {
            var _to$extract2 = to.extract(this._newTextPadding + n.text, this.finalTranscript, !0, this._translations),
              s = _to$extract2.interimTranscript,
              r = _to$extract2.finalTranscript,
              o = _to$extract2.newText;
            Is.reset(this, this.stopTimeoutMS), this.updateElements(s, r, o), r !== "" && (this._newTextPadding = " ");
          }
          break;
      }
    }
  }, {
    key: "onCanceled",
    value: function onCanceled(e, t) {
      t.reason === window.SpeechSDK.CancellationReason.Error && this.error(t.errorDetails);
    }
  }, {
    key: "onSessionStarted",
    value: function onSessionStarted() {
      eo.clearPrevention(this), this.setStateOnStart();
    }
  }, {
    key: "onSessionStopped",
    value: function onSessionStopped() {
      this._retrieveTokenInterval || clearInterval(this._retrieveTokenInterval), this._stopping = !1, this.setStateOnStop();
    }
  }, {
    key: "retrieveTokenInterval",
    value: function retrieveTokenInterval(e) {
      var _this96 = this;
      this._retrieveTokenInterval = setInterval(function () {
        e == null || e().then(function (t) {
          _this96._service && (_this96._service.authorizationToken = (t == null ? void 0 : t.trim()) || "");
        })["catch"](function (t) {
          _this96.error(t);
        });
      }, 1e4);
    }
  }, {
    key: "stop",
    value: function stop(e) {
      var t;
      !e && this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), this._stopping = !0, (t = this._service) == null || t.stopContinuousRecognitionAsync(), Is.stop(this), this.finalise(e);
    }
  }, {
    key: "moduleNotFound",
    value: function moduleNotFound() {
      console.error("speech recognition module not found:"), console.error("please install the 'microsoft-cognitiveservices-speech-sdk' npm package or add a script tag: <script src=\"https://aka.ms/csspeech/jsbrowserpackageraw\"></script>"), this.setStateOnError("speech recognition module not found");
    }
  }, {
    key: "error",
    value: function error(e) {
      this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), console.error(e), this.setStateOnError(e), this.stop();
    }
  }], [{
    key: "getAPI",
    value: function getAPI() {
      return window.SpeechSDK;
    }
  }]);
}(Po);
var Pt = /*#__PURE__*/function () {
  function Pt() {
    _classCallCheck(this, Pt);
  }
  return _createClass(Pt, null, [{
    key: "toggle",
    value: function toggle(e, t) {
      var n, s;
      var r = e.toLocaleLowerCase().trim();
      (n = lt.service) != null && n.recognizing ? this.stop() : r === "webspeech" ? Pt.startWebSpeech(t) : r === "azure" ? Pt.startAzure(t) : (console.error("service not found - must be either 'webspeech' or 'azure'"), (s = t == null ? void 0 : t.onError) == null || s.call(t, "service not found - must be either 'webspeech' or 'azure'"));
    }
  }, {
    key: "startWebSpeech",
    value: function startWebSpeech(e) {
      Pt.stop() || (lt.service = new fs(), lt.service.start(e));
    }
  }, {
    key: "isWebSpeechSupported",
    value: function isWebSpeechSupported() {
      return !!fs.getAPI();
    }
  }, {
    key: "startAzure",
    value: function startAzure(e) {
      var t;
      Pt.stop() || (t = lt.service) != null && t.cannotBeStopped || (lt.service = new ti(), lt.service.start(e));
    }
  }, {
    key: "stop",
    value: function stop() {
      var e;
      return lt.doubleClickDetector() ? !0 : ((e = lt.service) != null && e.recognizing && lt.service.stop(), !1);
    }
  }, {
    key: "endCommandMode",
    value: function endCommandMode() {
      lt.service && $e.toggleCommandModeOff(lt.service);
    }
  }]);
}();
var rd = /*#__PURE__*/function () {
  function rd(e, t) {
    _classCallCheck(this, rd);
    this._silenceMS = 2e3, this._stop = !0, typeof t == "boolean" && t === !1 && (this._stop = !1), typeof e == "number" && (this._silenceMS = e);
  }
  return _createClass(rd, [{
    key: "setSilenceTimeout",
    value: function setSilenceTimeout(e, t) {
      var _this97 = this;
      this._silenceTimeout = setTimeout(function () {
        var n;
        (n = e.submit) == null || n.call(e), Pt.stop(), _this97._stop || setTimeout(t, gs.MICROPHONE_RESET_TIMEOUT_MS);
      }, this._silenceMS);
    }
  }, {
    key: "clearSilenceTimeout",
    value: function clearSilenceTimeout() {
      this._silenceTimeout && clearTimeout(this._silenceTimeout);
    }
  }, {
    key: "resetSilenceTimeout",
    value: function resetSilenceTimeout(e, t) {
      this.clearSilenceTimeout(), this.setSilenceTimeout(e, t);
    }
  }, {
    key: "onPause",
    value: function onPause(e, t, n) {
      e ? this.resetSilenceTimeout(t, n) : this.clearSilenceTimeout();
    }
  }]);
}();
var is = /*#__PURE__*/function (_mi) {
  function is(e, t, n) {
    var _this98;
    _classCallCheck(this, is);
    var s = _typeof(e.speechToText) == "object" ? e.speechToText : {};
    _this98 = _callSuper(this, is, [s == null ? void 0 : s.button]);
    var _this98$processConfig = _this98.processConfiguration(t, e.speechToText),
      r = _this98$processConfig.serviceName,
      o = _this98$processConfig.processedConfig;
    if (_this98._addErrorMessage = n, r === "webspeech" && !Pt.isWebSpeechSupported()) _this98.changeToUnsupported();else {
      var a = !e.textInput || !e.textInput[H];
      V.assignButtonEvents(_this98.elementRef, _this98.buttonClick.bind(_this98, t, a, r, o));
    }
    setTimeout(function () {
      _this98._validationHandler = e._validationHandler;
    });
    return _this98;
  }
  // prettier-ignore
  _inherits(is, _mi);
  return _createClass(is, [{
    key: "processConfiguration",
    value: function processConfiguration(e, t) {
      var _n$displayInterimResu, _n$textColor, _n$translations, _n$commands, _n$events;
      var l;
      var n = _typeof(t) == "object" ? t : {},
        s = _typeof(n.webSpeech) == "object" ? n.webSpeech : {},
        r = n.azure || {},
        o = _objectSpread(_objectSpread({
          displayInterimResults: (_n$displayInterimResu = n.displayInterimResults) !== null && _n$displayInterimResu !== void 0 ? _n$displayInterimResu : void 0,
          textColor: (_n$textColor = n.textColor) !== null && _n$textColor !== void 0 ? _n$textColor : void 0,
          translations: (_n$translations = n.translations) !== null && _n$translations !== void 0 ? _n$translations : void 0,
          commands: (_n$commands = n.commands) !== null && _n$commands !== void 0 ? _n$commands : void 0,
          events: (_n$events = n.events) !== null && _n$events !== void 0 ? _n$events : void 0
        }, s), r),
        a = (l = n.commands) == null ? void 0 : l.submit;
      return a && (o.onPreResult = function (h) {
        return h.toLowerCase().includes(a) ? (setTimeout(function () {
          var u;
          return (u = e.submit) == null ? void 0 : u.call(e);
        }), Pt.endCommandMode(), {
          restart: !0,
          removeNewText: !0
        }) : null;
      }), n.submitAfterSilence && (this._silenceSubmit = new rd(n.submitAfterSilence, n.stopAfterSubmit)), {
        serviceName: is.getServiceName(n),
        processedConfig: o
      };
    }
  }, {
    key: "buttonClick",
    value: function buttonClick(e, t, n, s) {
      var _this99 = this;
      var r = s == null ? void 0 : s.events;
      e.removePlaceholderStyle(), Pt.toggle(n, _objectSpread({
        insertInCursorLocation: !1,
        element: t ? e.inputElementRef : void 0,
        onError: function onError() {
          var o;
          _this99.onError(), (o = _this99._silenceSubmit) == null || o.clearSilenceTimeout();
        },
        onStart: function onStart() {
          var o;
          _this99.changeToActive(), (o = r == null ? void 0 : r.onStart) == null || o.call(r);
        },
        onStop: function onStop() {
          var o, a, c;
          (o = _this99._validationHandler) == null || o.call(_this99), (a = _this99._silenceSubmit) == null || a.clearSilenceTimeout(), _this99.changeToDefault(), (c = r == null ? void 0 : r.onStop) == null || c.call(r);
        },
        onPauseTrigger: function onPauseTrigger(o) {
          var a, c;
          (a = _this99._silenceSubmit) == null || a.onPause(o, e, _this99.elementRef.onclick), (c = r == null ? void 0 : r.onPauseTrigger) == null || c.call(r, o);
        },
        onPreResult: function onPreResult(o, a) {
          var c;
          (c = r == null ? void 0 : r.onPreResult) == null || c.call(r, o, a);
        },
        onResult: function onResult(o, a) {
          var c, l, h;
          a && ((c = _this99._validationHandler) == null || c.call(_this99)), (l = _this99._silenceSubmit) == null || l.resetSilenceTimeout(e, _this99.elementRef.onclick), (h = r == null ? void 0 : r.onResult) == null || h.call(r, o, a);
        },
        onCommandModeTrigger: function onCommandModeTrigger(o) {
          var a;
          _this99.onCommandModeTrigger(o), (a = r == null ? void 0 : r.onCommandModeTrigger) == null || a.call(r, o);
        }
      }, s));
    }
  }, {
    key: "onCommandModeTrigger",
    value: function onCommandModeTrigger(e) {
      e ? this.changeToCommandMode() : this.changeToActive();
    }
  }, {
    key: "onError",
    value: function onError() {
      this._addErrorMessage("speechToText", "speech input error");
    }
  }], [{
    key: "getServiceName",
    value: function getServiceName(e) {
      return e.azure ? "azure" : "webspeech";
    }
  }, {
    key: "toggleSpeechAfterSubmit",
    value: function toggleSpeechAfterSubmit(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      e[Z](), t || setTimeout(function () {
        return e[Z]();
      }, is.MICROPHONE_RESET_TIMEOUT_MS);
    }
  }]);
}(mi);
is.MICROPHONE_RESET_TIMEOUT_MS = 300;
var gs = is;
var kt = /*#__PURE__*/function () {
  // prettier-ignore
  function kt(e, t, n, s, r) {
    var _this100 = this;
    _classCallCheck(this, kt);
    this._attachments = [], this._fileCountLimit = 99, this._acceptedFormat = "", this._hiddenAttachments = /* @__PURE__ */new Set(), n.maxNumberOfFiles && (this._fileCountLimit = n.maxNumberOfFiles), this._toggleContainerDisplay = s, this._fileAttachmentsContainerRef = r, n.acceptedFormats && (this._acceptedFormat = n.acceptedFormats), setTimeout(function () {
      _this100._validationHandler = e._validationHandler, _this100._onInput = t.onInput;
    });
  }
  return _createClass(kt, [{
    key: "attemptAddFile",
    value: function attemptAddFile(e, t) {
      var n;
      return kt.isFileTypeValid(e, this._acceptedFormat) ? (this.addAttachmentBasedOnType(e, t, !0), (n = this._onInput) == null || n.call(this, !0), !0) : !1;
    }
  }, {
    key: "addAttachmentBasedOnType",
    value: function addAttachmentBasedOnType(e, t, n) {
      var s = kt.getTypeFromBlob(e);
      if (s === W) {
        var r = kt.createImageAttachment(t);
        this.addFileAttachment(e, W, r, n);
      } else if (s === j) {
        var _r9 = bs.createAudioAttachment(t);
        this.addFileAttachment(e, j, _r9, n);
      } else {
        var _r0 = kt.createAnyFileAttachment(e.name);
        this.addFileAttachment(e, Bn, _r0, n);
      }
    }
  }, {
    key: "addFileAttachment",
    value: function addFileAttachment(e, t, n, s) {
      var a;
      var r = kt.createContainer(n);
      if (this._attachments.length >= this._fileCountLimit) {
        var c = this._attachments[this._attachments.length - 1].removeButton;
        c == null || c[Z]();
        var l = this._fileAttachmentsContainerRef.children;
        this._fileAttachmentsContainerRef.insertBefore(r, l[0]);
      } else this._fileAttachmentsContainerRef.appendChild(r);
      var o = {
        file: e,
        attachmentContainerElement: r,
        fileType: t
      };
      return s && (o.removeButton = this.createRemoveAttachmentButton(o), r.appendChild(o.removeButton)), this._toggleContainerDisplay(!0), this._attachments.push(o), this._fileAttachmentsContainerRef.scrollTop = this._fileAttachmentsContainerRef.scrollHeight, (a = this._validationHandler) == null || a.call(this), o;
    }
  }, {
    key: "createRemoveAttachmentButton",
    value: function createRemoveAttachmentButton(e) {
      var t = S();
      t[f].add("remove-file-attachment-button"), t.onclick = this.removeAttachment.bind(this, e);
      var n = S();
      return n[f].add("x-icon"), n.innerText = "×", t.appendChild(n), t;
    }
  }, {
    key: "removeAttachment",
    value: function removeAttachment(e, t) {
      var r, o;
      var n = this._attachments.findIndex(function (a) {
        return a === e;
      });
      if (n < 0) return;
      (r = this._onInput) == null || r.call(this, !!(t != null && t.isTrusted));
      var s = this._attachments[n].attachmentContainerElement;
      this._attachments.splice(n, 1), bs.stopAttachmentPlayback(s), s.remove(), this._toggleContainerDisplay(!1), (o = this._validationHandler) == null || o.call(this);
    }
  }, {
    key: "getFiles",
    value: function getFiles() {
      return Array.from(this._attachments).map(function (e) {
        return _defineProperty(_defineProperty({}, ne, e[ne]), y, e.fileType);
      });
    }
  }, {
    key: "hideAttachments",
    value: function hideAttachments() {
      var _this101 = this;
      this._hiddenAttachments.clear(), this._attachments.forEach(function (e) {
        setTimeout(function () {
          var t;
          return (t = e.removeButton) == null ? void 0 : t[Z]();
        }), _this101._hiddenAttachments.add(e);
      });
    }
  }, {
    key: "removeAttachments",
    value: function removeAttachments() {
      this._attachments.forEach(function (e) {
        setTimeout(function () {
          var t;
          return (t = e.removeButton) == null ? void 0 : t[Z]();
        });
      }), this._hiddenAttachments.clear();
    }
  }, {
    key: "readdAttachments",
    value: function readdAttachments() {
      var _this102 = this;
      var e;
      Array.from(this._hiddenAttachments).forEach(function (t) {
        _this102._fileAttachmentsContainerRef.appendChild(t.attachmentContainerElement), _this102._attachments.push(t);
      }), (e = this._onInput) == null || e.call(this, !1), this._hiddenAttachments.clear();
    }
  }], [{
    key: "isFileTypeValid",
    value: function isFileTypeValid(e, t) {
      if (t === "") return !0;
      var n = t.split(",");
      for (var s = 0; s < n.length; s++) {
        var r = n[s].trim();
        if (e[y] === r) return !0;
        if (r.startsWith(".")) {
          var o = r.slice(1);
          if (e.name.endsWith(o)) return !0;
        } else {
          if (e.name.endsWith(r)) return !0;
          if (r.endsWith("/*") && e[y].startsWith(r.slice(0, -2))) return !0;
        }
      }
      return !1;
    }
  }, {
    key: "getTypeFromBlob",
    value: function getTypeFromBlob(e) {
      var t = e.type;
      return t.startsWith(W) ? W : t.startsWith(j) ? j : Bn;
    }
  }, {
    key: "createImageAttachment",
    value: function createImageAttachment(e) {
      var t = new Image();
      return t[R] = e, t[f].add("image-attachment"), t;
    }
  }, {
    key: "createAnyFileAttachment",
    value: function createAnyFileAttachment(e) {
      var t = S();
      t[f].add("border-bound-attachment"), Ge.IS_SAFARI && t[f].add("border-bound-attachment-safari");
      var n = S();
      n[f].add("any-file-attachment-text");
      var s = S();
      return s[f].add("file-attachment-text-container"), s.appendChild(n), n.textContent = e, t.appendChild(s), t;
    }
  }, {
    key: "createContainer",
    value: function createContainer(e) {
      var t = S();
      return t[f].add("file-attachment"), t.appendChild(e), t;
    }
  }]);
}();
var It = /*#__PURE__*/function (_kt) {
  // prettier-ignore
  function It(e, t, n, s, r) {
    _classCallCheck(this, It);
    return _callSuper(this, It, [e, t, n, s, r]);
  }
  _inherits(It, _kt);
  return _createClass(It, [{
    key: "createTimer",
    value: function createTimer(e, t) {
      var _this103 = this;
      var n = 0;
      var s = t !== void 0 && t < It.TIMER_LIMIT_S ? t : It.TIMER_LIMIT_S;
      return setInterval(function () {
        var a;
        n += 1, n === s && ((a = _this103.stopPlaceholderCallback) == null || a.call(_this103), _this103.clearTimer()), n === 600 && e[f].add("audio-placeholder-text-4-digits");
        var r = Math.floor(n / 60),
          o = (n % 60).toString().padStart(2, "0");
        e.textContent = "".concat(r, ":").concat(o);
      }, 1e3);
    }
  }, {
    key: "createPlaceholderAudioAttachment",
    value: function createPlaceholderAudioAttachment(e) {
      var t = It.createAudioContainer(),
        n = S();
      n[f].add("audio-placeholder-text-3-digits");
      var s = S();
      s[f].add("file-attachment-text-container", "audio-placeholder-text-3-digits-container"), s.appendChild(n);
      var r = Bt.createSVGElement(Di);
      return r[f].add("attachment-icon", "stop-icon", "not-removable-attachment-icon"), n.textContent = "0:00", this._activePlaceholderTimer = this.createTimer(n, e), t.appendChild(s), this.addPlaceholderAudioAttachmentEvents(t, r, s), t;
    }
  }, {
    key: "addPlaceholderAudioAttachmentEvents",
    value: function addPlaceholderAudioAttachmentEvents(e, t, n) {
      var _this104 = this;
      var s = function s() {
        return e.replaceChildren(t);
      };
      e.addEventListener(ys, s);
      var r = function r() {
        return e.replaceChildren(n);
      };
      e.addEventListener(un, r);
      var o = function o() {
        var a;
        return (a = _this104.stopPlaceholderCallback) == null ? void 0 : a.call(_this104);
      };
      e.addEventListener(Z, o);
    }
  }, {
    key: "addPlaceholderAttachment",
    value: function addPlaceholderAttachment(e, t) {
      var n = this.createPlaceholderAudioAttachment(t);
      this._activePlaceholderAttachment = this.addFileAttachment(new File([], ""), j, n, !1), this.stopPlaceholderCallback = e;
    }
    // prettier-ignore
  }, {
    key: "completePlaceholderAttachment",
    value: function completePlaceholderAttachment(e, t) {
      var n = this._activePlaceholderAttachment;
      n && (n[ne] = e, It.addAudioElements(n.attachmentContainerElement.children[0], t), n.removeButton = this.createRemoveAttachmentButton(n), n.attachmentContainerElement.appendChild(n.removeButton), this._activePlaceholderAttachment = void 0, this.clearTimer());
    }
  }, {
    key: "removePlaceholderAttachment",
    value: function removePlaceholderAttachment() {
      this._activePlaceholderAttachment && (this.removeAttachment(this._activePlaceholderAttachment), this._activePlaceholderAttachment = void 0, this.clearTimer());
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      this._activePlaceholderTimer !== void 0 && (clearInterval(this._activePlaceholderTimer), this._activePlaceholderTimer = void 0, this.stopPlaceholderCallback = void 0);
    }
  }], [{
    key: "createAudioContainer",
    value: function createAudioContainer() {
      var e = S();
      return e[f].add("border-bound-attachment", "audio-attachment-icon-container"), Ge.IS_SAFARI && e[f].add("border-bound-attachment-safari"), e;
    }
  }, {
    key: "addAudioElements",
    value: function addAudioElements(e, t) {
      var n = e.parentElement ? V.cloneElement(e) : e,
        s = S(j);
      s[R] = t;
      var r = Bt.createSVGElement(wo);
      r[f].add("attachment-icon", "play-icon");
      var o = Bt.createSVGElement(Di);
      o[f].add("attachment-icon", "stop-icon"), n.replaceChildren(r), s.onplay = function () {
        n.replaceChildren(o);
      }, s.onpause = function () {
        n.replaceChildren(r), s.currentTime = 0;
      }, s.onended = function () {
        n.replaceChildren(r);
      }, V.assignButtonEvents(n, function () {
        s.paused ? s.play() : s.pause();
      });
    }
  }, {
    key: "createAudioAttachment",
    value: function createAudioAttachment(e) {
      var t = It.createAudioContainer();
      return It.addAudioElements(t, e), t;
    }
  }, {
    key: "stopAttachmentPlayback",
    value: function stopAttachmentPlayback(e) {
      var t, n, s;
      (s = (n = (t = e.children[0]) == null ? void 0 : t.children) == null ? void 0 : n[0]) != null && s[f].contains("stop-icon") && e.children[0][Z]();
    }
  }]);
}(kt);
It.TIMER_LIMIT_S = 5999;
var bs = It;
var od = /*#__PURE__*/function () {
  function od() {
    _classCallCheck(this, od);
  }
  return _createClass(od, null, [{
    key: "create",
    value:
    // prettier-ignore
    function create(e, t, n, s, r, o) {
      return o === j ? new bs(e, t, n, s, r) : new kt(e, t, n, s, r);
    }
  }]);
}();
var As = /*#__PURE__*/function () {
  function As(e, t, n) {
    _classCallCheck(this, As);
    this._fileAttachmentsTypes = [], this.elementRef = this.createAttachmentContainer();
    var s = _typeof(n) == "object" && !!n.displayFileAttachmentContainer;
    this.toggleContainerDisplay(s), e.appendChild(this.elementRef), t && Object.assign(this.elementRef[E], t);
  }
  // prettier-ignore
  return _createClass(As, [{
    key: "addType",
    value: function addType(e, t, n, s) {
      var r = od.create(e, t, n, this.toggleContainerDisplay.bind(this), this.elementRef, s);
      return this._fileAttachmentsTypes.push(r), r;
    }
  }, {
    key: "createAttachmentContainer",
    value: function createAttachmentContainer() {
      var e = S();
      return e.id = "file-attachment-container", e;
    }
  }, {
    key: "toggleContainerDisplay",
    value: function toggleContainerDisplay(e) {
      e ? this.elementRef[E].display = "block" : this.elementRef.children.length === 0 && (this.elementRef[E].display = "none");
    }
  }, {
    key: "getAllFileData",
    value: function getAllFileData() {
      var e = this._fileAttachmentsTypes.map(function (t) {
        return t.getFiles();
      }).flat();
      return e.length > 0 ? e : void 0;
    }
  }, {
    key: "completePlaceholders",
    value: function () {
      var _completePlaceholders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee170() {
        return _regenerator().w(function (_context170) {
          while (1) switch (_context170.n) {
            case 0:
              _context170.n = 1;
              return Promise.all(this._fileAttachmentsTypes.map(/*#__PURE__*/function () {
                var _ref242 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee169(e) {
                  var t;
                  return _regenerator().w(function (_context169) {
                    while (1) switch (_context169.n) {
                      case 0:
                        return _context169.a(2, (t = e.stopPlaceholderCallback) == null ? void 0 : t.call(e));
                    }
                  }, _callee169);
                }));
                return function (_x312) {
                  return _ref242.apply(this, arguments);
                };
              }()));
            case 1:
              return _context170.a(2);
          }
        }, _callee170, this);
      }));
      function completePlaceholders() {
        return _completePlaceholders.apply(this, arguments);
      }
      return completePlaceholders;
    }()
  }, {
    key: "addFilesToAnyType",
    value: function addFilesToAnyType(e) {
      As.addFilesToType(e, this._fileAttachmentsTypes);
    }
  }, {
    key: "hideFiles",
    value: function hideFiles() {
      this._fileAttachmentsTypes.forEach(function (e) {
        return e.hideAttachments();
      }), this.elementRef.replaceChildren(), this.toggleContainerDisplay(!1);
    }
  }, {
    key: "removeHiddenFiles",
    value: function removeHiddenFiles() {
      this._fileAttachmentsTypes.forEach(function (e) {
        return e.removeAttachments();
      });
    }
  }, {
    key: "readdHiddenFiles",
    value: function readdHiddenFiles() {
      this._fileAttachmentsTypes.forEach(function (e) {
        return e.readdAttachments();
      }), this.toggleContainerDisplay(!0);
    }
  }, {
    key: "getNumberOfTypes",
    value: function getNumberOfTypes() {
      return this._fileAttachmentsTypes.length;
    }
  }], [{
    key: "addFilesToType",
    value: function addFilesToType(e, t) {
      e.forEach(function (n) {
        var s = new FileReader();
        s.readAsDataURL(n), s.onload = function (r) {
          for (var o = 0; o < t.length && !t[o].attemptAddFile(n, r.target.result); o += 1);
        };
      });
    }
  }]);
}();
var pt = /*#__PURE__*/function () {
  function pt(e, t, n) {
    _classCallCheck(this, pt);
    this._isOpen = !1, this._contentRef = pt.createModalContent(t, n == null ? void 0 : n.backgroundColor), this._buttonPanel = pt.createButtonPanel(n == null ? void 0 : n.backgroundColor), this._elementRef = pt.createContainer(this._contentRef, n), this._elementRef.appendChild(this._buttonPanel), e.appendChild(this._elementRef), this._backgroundPanelRef = pt.createDarkBackgroundPanel(), e.appendChild(this._backgroundPanelRef), this.addWindowEvents(e);
  }
  return _createClass(pt, [{
    key: "isOpen",
    value: function isOpen() {
      return this._isOpen;
    }
  }, {
    key: "addButtons",
    value: function addButtons() {
      var _this105 = this;
      for (var _len2 = arguments.length, e = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        e[_key2] = arguments[_key2];
      }
      e.forEach(function (t) {
        me.addAttributes(t), _this105._buttonPanel.appendChild(t);
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this106 = this;
      this._elementRef[f].remove("show-modal"), this._elementRef[f].add("hide-modal"), this._backgroundPanelRef[f].remove("show-modal-background"), this._backgroundPanelRef[f].add("hide-modal-background"), this._isOpen = !1, setTimeout(function () {
        _this106._elementRef[E].display = "none", _this106._backgroundPanelRef[E].display = "none";
      }, pt.MODAL_CLOSE_TIMEOUT_MS);
    }
  }, {
    key: "displayModalElements",
    value: function displayModalElements() {
      this._elementRef[E].display = "flex", this._elementRef[f].remove("hide-modal"), this._elementRef[f].add("show-modal"), this._backgroundPanelRef[E].display = "block", this._backgroundPanelRef[f].remove("hide-modal-background"), this._backgroundPanelRef[f].add("show-modal-background"), this._isOpen = !0;
    }
  }, {
    key: "openTextModal",
    value: function openTextModal(e) {
      this._contentRef.innerHTML = e, this.displayModalElements();
    }
  }, {
    key: "addCloseButton",
    value: function addCloseButton(e, t, n) {
      var _this107 = this;
      var s = t ? pt.createSVGButton(e) : pt.createTextButton(e);
      return this.addButtons(s), V.assignButtonEvents(s, function () {
        _this107.close(), setTimeout(function () {
          n == null || n();
        }, 140);
      }), s;
    }
  }, {
    key: "addWindowEvents",
    value: function addWindowEvents(e) {
      this.keyDownEvent = this.windowKeyDown.bind(this, e), window.addEventListener("keydown", this.keyDownEvent);
    }
  }, {
    key: "windowKeyDown",
    value: function windowKeyDown(e, t) {
      var n, s;
      !e.isConnected && this.keyDownEvent ? window.removeEventListener("keydown", this.keyDownEvent) : this._isOpen && (t.key === be.ESCAPE ? (this.close(), (n = this.extensionCloseCallback) == null || n.call(this)) : t.key === be.ENTER && (this.close(), (s = this.extensionCloseCallback) == null || s.call(this)));
    }
  }], [{
    key: "createContainer",
    value: function createContainer(e, t) {
      var n = S();
      return n[f].add("modal"), n.appendChild(e), t && delete t.backgroundColor, Object.assign(n[E], t), n;
    }
  }, {
    key: "createModalContent",
    value: function createModalContent(e, t) {
      var _n$f;
      var n = S();
      return (_n$f = n[f]).add.apply(_n$f, _toConsumableArray(e)), t && (n[E].backgroundColor = t), S().appendChild(n), n;
    }
  }, {
    key: "createButtonPanel",
    value: function createButtonPanel(e) {
      var t = S();
      return t[f].add("modal-button-panel"), e && (t[E].backgroundColor = e), t;
    }
  }, {
    key: "createDarkBackgroundPanel",
    value: function createDarkBackgroundPanel() {
      var e = S();
      return e.id = "modal-background-panel", e;
    }
  }, {
    key: "createTextButton",
    value: function createTextButton(e) {
      var t = S();
      return t[f].add("modal-button"), t.textContent = e, t;
    }
  }, {
    key: "createSVGButton",
    value: function createSVGButton(e) {
      var t = S();
      t[f].add("modal-button", "modal-svg-button");
      var n = Bt.createSVGElement(e);
      return n[f].add("modal-svg-button-icon"), t.appendChild(n), t;
    }
  }, {
    key: "createTextModalFunc",
    value: function createTextModalFunc(e, t, n) {
      var s;
      if (_typeof(t) == "object" && (s = t[m]) != null && s.infoModal) {
        var r = new pt(e, ["modal-content"], t[m].infoModal.containerStyle);
        return r.addCloseButton("OK", !1, n), r.openTextModal.bind(r, t.infoModalTextMarkUp || "");
      }
    }
  }]);
}();
pt.MODAL_CLOSE_TIMEOUT_MS = 190;
var on = pt;
var ni = /*#__PURE__*/function (_n24) {
  // prettier-ignore
  function ni(e, t, n, s, r, o) {
    var _this108;
    _classCallCheck(this, ni);
    var u, g, b, v, _, C, D, le, pe, se;
    var a = ie.processPosition((u = n == null ? void 0 : n.button) == null ? void 0 : u.position),
      c = ((v = (b = (g = n == null ? void 0 : n.button) == null ? void 0 : g[T]) == null ? void 0 : b[d]) == null ? void 0 : v.content) || o,
      l = yt.tryCreateConfig("Upload File", (_ = n == null ? void 0 : n.button) == null ? void 0 : _.tooltip);
    _this108 = _callSuper(this, ni, [ni.createButtonElement(), r, a, l, n.button, c]);
    var h = _this108.createInnerElementsForStates(s, _this108.customStyles);
    _this108._inputElement = ni.createInputElement((C = n == null ? void 0 : n[m]) == null ? void 0 : C.acceptedFormats), _this108.addClickEvent(e, n), _this108.changeElementsByState(h[T]), _this108.reapplyStateStyle(T), _this108._fileAttachmentsType = t, _this108._openModalOnce = ((le = (D = n[m]) == null ? void 0 : D.infoModal) == null ? void 0 : le.openModalOnce) === !1 || (se = (pe = n[m]) == null ? void 0 : pe.infoModal) == null ? void 0 : se.openModalOnce;
    return _this108;
  }
  _inherits(ni, _n24);
  return _createClass(ni, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e, t) {
      return _defineProperty({}, T, this.createInnerElements(e, T, t));
    }
  }, {
    key: "triggerImportPrompt",
    value: function triggerImportPrompt(e) {
      e.onchange = this["import"].bind(this, e), e[Z]();
    }
  }, {
    key: "import",
    value: function _import(e) {
      As.addFilesToType(Array.from(e[m] || []), [this._fileAttachmentsType]), e.value = "";
    }
  }, {
    key: "addClickEvent",
    value: function addClickEvent(e, t) {
      var n = this.triggerImportPrompt.bind(this, this._inputElement),
        s = on.createTextModalFunc(e, t, n);
      this.elementRef.onclick = this[Z].bind(this, s);
    }
  }, {
    key: "click",
    value: function click(e) {
      e && (this._openModalOnce === void 0 || this._openModalOnce === !0) ? (e(), this._openModalOnce === !0 && (this._openModalOnce = !1)) : this.triggerImportPrompt(this._inputElement);
    }
  }], [{
    key: "createInputElement",
    value: function createInputElement(e) {
      var t = S("input");
      return t[y] = ne, t.accept = e || "", t.hidden = !0, t.multiple = !0, t;
    }
  }, {
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[f].add("input-button"), e;
    }
  }]);
}(_n);
var Mt = /*#__PURE__*/function () {
  function Mt() {
    _classCallCheck(this, Mt);
  }
  return _createClass(Mt, null, [{
    key: "create",
    value: function create(e, t, n) {
      var s = Mt.createElement(n);
      Mt.addEvents(s, e, t), e.appendChild(s);
    }
  }, {
    key: "createElement",
    value: function createElement(e) {
      var t = S();
      return t.id = "drag-and-drop", _typeof(e) === F && Object.assign(t[E], e), t;
    }
  }, {
    key: "addEvents",
    value: function addEvents(e, t, n) {
      t.ondragenter = function (s) {
        s.preventDefault(), Mt.display(e);
      }, e.ondragleave = function (s) {
        s.preventDefault(), Mt.hide(e);
      }, e.ondragover = function (s) {
        s.preventDefault();
      }, e.ondrop = function (s) {
        s.preventDefault(), Mt.uploadFile(n, s), Mt.hide(e);
      };
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(e, t) {
      var s;
      var n = (s = t.dataTransfer) == null ? void 0 : s[m];
      n && e.addFilesToAnyType(Array.from(n));
    }
  }, {
    key: "display",
    value: function display(e) {
      e[E].display = "block";
    }
  }, {
    key: "hide",
    value: function hide(e) {
      e[E].display = "none";
    }
  }, {
    key: "isEnabled",
    value: function isEnabled(e, t) {
      return t !== void 0 && t === !1 ? !1 : !!t || e.getNumberOfTypes() > 0;
    }
  }]);
}();
var Jt = /*#__PURE__*/function () {
  function Jt() {
    _classCallCheck(this, Jt);
  }
  return _createClass(Jt, null, [{
    key: "validate",
    value:
    // prettier-ignore
    function validate(e, t, n, s, r, o, a) {
      var c = n.isSubmitProgrammaticallyDisabled ? !1 : e(s, r, a);
      return c ? t.changeToSubmitIcon() : t.changeToDisabledIcon(), o == null || o.addInputText(s || ""), c;
    }
    // prettier-ignore
  }, {
    key: "useValidationFunc",
    value: function () {
      var _useValidationFunc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee171(e, t, n, s, r, o) {
        var a, c, l;
        return _regenerator().w(function (_context171) {
          while (1) switch (_context171.n) {
            case 0:
              a = t.isTextInputEmpty() ? "" : t.inputElementRef.textContent;
              _context171.n = 1;
              return n.completePlaceholders();
            case 1:
              c = n.getAllFileData(), l = c == null ? void 0 : c.map(function (h) {
                return h[ne];
              });
              return _context171.a(2, Jt.validate(e, s, r, a, l, o));
          }
        }, _callee171);
      }));
      function useValidationFunc(_x313, _x314, _x315, _x316, _x317, _x318) {
        return _useValidationFunc.apply(this, arguments);
      }
      return useValidationFunc;
    }() // prettier-ignore
  }, {
    key: "useValidationFuncProgrammatic",
    value: function () {
      var _useValidationFuncProgrammatic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee172(e, t, n, s, r) {
        var a, o;
        return _regenerator().w(function (_context172) {
          while (1) switch (_context172.n) {
            case 0:
              o = (a = t[m]) == null ? void 0 : a.map(function (c) {
                return c[ne];
              });
              return _context172.a(2, Jt.validate(e, n, s, t[d], o, r, !0));
          }
        }, _callee172);
      }));
      function useValidationFuncProgrammatic(_x319, _x320, _x321, _x322, _x323) {
        return _useValidationFuncProgrammatic.apply(this, arguments);
      }
      return useValidationFuncProgrammatic;
    }()
  }, {
    key: "validateWebsocket",
    value: function validateWebsocket(e, t) {
      var n = e.websocket,
        s = e.connectSettings;
      return n && s.url !== Et.URL && !Me.canSendMessage(n) ? (t.changeToDisabledIcon(), !1) : !0;
    }
    // prettier-ignore
  }, {
    key: "attach",
    value: function attach(e, t, n, s, r, o) {
      var a = e.validateInput || ie.processValidateInput(e);
      e._validationHandler = /*#__PURE__*/function () {
        var _ref244 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee173(c) {
          var l;
          return _regenerator().w(function (_context173) {
            while (1) switch (_context173.n) {
              case 0:
                if (!(r.status.loadingActive || r.status.requestInProgress || !Jt.validateWebsocket(t, r))) {
                  _context173.n = 1;
                  break;
                }
                return _context173.a(2, !1);
              case 1:
                l = a || t.canSendMessage;
                return _context173.a(2, l ? c ? Jt.useValidationFuncProgrammatic(l, c, r, t, o) : Jt.useValidationFunc(l, n, s, r, t, o) : null);
            }
          }, _callee173);
        }));
        return function (_x324) {
          return _ref244.apply(this, arguments);
        };
      }();
    }
  }]);
}();
var Bo = /*#__PURE__*/function () {
  function Bo() {
    _classCallCheck(this, Bo);
  }
  return _createClass(Bo, null, [{
    key: "getFileName",
    value: function getFileName(e, t) {
      var n = /* @__PURE__ */new Date(),
        s = String(n.getHours()).padStart(2, "0"),
        r = String(n.getMinutes()).padStart(2, "0"),
        o = String(n.getSeconds()).padStart(2, "0");
      return "".concat(e, "-").concat(s, "-").concat(r, "-").concat(o, ".").concat(t);
    }
  }]);
}();
var ad = /*#__PURE__*/function (_mi2) {
  function ad(e, t) {
    var _this109;
    _classCallCheck(this, ad);
    var n, s;
    _this109 = _callSuper(this, ad, [t.button]), _this109._waitingForBrowserApproval = !1, _this109._audioType = e, _this109._extension = ((n = t[m]) == null ? void 0 : n.format) || "mp3", _this109._maxDurationSeconds = (s = t[m]) == null ? void 0 : s.maxDurationSeconds, V.assignButtonEvents(_this109.elementRef, _this109.buttonClick.bind(_assertThisInitialized(_this109)));
    return _this109;
  }
  _inherits(ad, _mi2);
  return _createClass(ad, [{
    key: "buttonClick",
    value: function buttonClick() {
      this._waitingForBrowserApproval || (this.isActive ? this.stop() : (this._waitingForBrowserApproval = !0, this.record()));
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this110 = this;
      return new Promise(function (e) {
        var t, n;
        _this110.changeToDefault(), (t = _this110._mediaRecorder) == null || t.stop(), (n = _this110._mediaStream) == null || n.getTracks().forEach(function (s) {
          return s.stop();
        }), setTimeout(function () {
          e();
        }, 10);
      });
    }
  }, {
    key: "record",
    value: function record() {
      var _this111 = this;
      navigator.mediaDevices.getUserMedia({
        audio: !0
      }).then(function (e) {
        _this111.changeToActive(), _this111._mediaRecorder = new MediaRecorder(e), _this111._audioType.addPlaceholderAttachment(_this111.stop.bind(_this111), _this111._maxDurationSeconds), _this111._mediaStream = e, _this111._mediaRecorder.addEventListener("dataavailable", function (t) {
          _this111.createFile(t);
        }), _this111._mediaRecorder[Wt]();
      })["catch"](function (e) {
        console[p](e), _this111.stop();
      })["finally"](function () {
        _this111._waitingForBrowserApproval = !1;
      });
    }
  }, {
    key: "createFile",
    value: function createFile(e) {
      var _this112 = this;
      var t = new Blob([e.data], {
          type: "audio/".concat(this._extension)
        }),
        n = Bo.getFileName(this._newFilePrefix || j, this._extension),
        s = new File([t], n, {
          type: t[y]
        }),
        r = new FileReader();
      r.readAsDataURL(s), r.onload = function (o) {
        _this112._audioType.completePlaceholderAttachment(s, o.target.result);
      };
    }
  }]);
}(mi);
var cd = "<?xml version=\"1.0\" standalone=\"no\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\" \"http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" fill=\"none\" stroke-width=\"1\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"14\"></line>\n  <polygon points=\"22 2 15 22 11 14 2 10 22 2\"></polygon>\n</svg>\n";
var an = /*#__PURE__*/function () {
  function an() {
    _classCallCheck(this, an);
  }
  return _createClass(an, null, [{
    key: "resetSubmit",
    value: function resetSubmit(e, t) {
      t ? e.unsetCustomStateStyles([Ot, at]) : e.unsetCustomStateStyles([Ci, Ot, at]), e.reapplyStateStyle(at);
    }
  }, {
    key: "overwriteDefaultStyleWithSubmit",
    value: function overwriteDefaultStyleWithSubmit(e, t) {
      if (!e.submit) return;
      var n = w(e[t] || {});
      ke.overwritePropertyObjectFromAnother(n, e.submit, ["container", x]), ke.overwritePropertyObjectFromAnother(n, e.submit, [d, "styles", x]), ke.overwritePropertyObjectFromAnother(n, e.submit, [G, "styles", x]), e[t] = n;
    }
    // prettier-ignore
  }, {
    key: "setUpDisabledButton",
    value: function setUpDisabledButton(e) {
      ke.setPropertyValueIfDoesNotExist(e, [at, "container", x, "backgroundColor"], ""), ke.setPropertyValueIfDoesNotExist(e, [H, "container", x, "backgroundColor"], Do), ke.setPropertyValueIfDoesNotExist(e.submit, [G, "styles", x, "filter"], ""), ke.setPropertyValueIfDoesNotExist(e[H], [G, "styles", x, "filter"], "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(5564%) hue-rotate(207deg) brightness(100%) contrast(97%)"), ke.setPropertyValueIfDoesNotExist(e[H], [d, "styles", x, "color"], "grey"), an.overwriteDefaultStyleWithSubmit(e, H);
    }
  }, {
    key: "process",
    value: function process(e) {
      var t = w(e || {});
      return an.overwriteDefaultStyleWithSubmit(t, Ot), an.overwriteDefaultStyleWithSubmit(t, Ci), e != null && e.alwaysEnabled || an.setUpDisabledButton(t), t;
    }
  }]);
}();
var Yn = /*#__PURE__*/function (_n25) {
  // prettier-ignore
  function Yn(e, t, n, s, r, o) {
    var _this113;
    _classCallCheck(this, Yn);
    var a = an.process(e.submitButtonStyles),
      c = cd,
      l = yt.tryCreateConfig("Submit", a == null ? void 0 : a.tooltip);
    _this113 = _callSuper(this, Yn, [Yn.createButtonContainerElement(), c, a == null ? void 0 : a.position, l, a]), _this113._isSVGLoadingIconOverriden = !1, _this113.status = {
      requestInProgress: !1,
      loadingActive: !1
    }, _this113._messages = n, _this113._textInput = t, _this113._fileAttachments = r, _this113._innerElements = _this113.createInnerElementsForStates(), _this113._stopClicked = {
      listener: function listener() {}
    }, _this113._serviceIO = s, _this113._alwaysEnabled = !!(a != null && a.alwaysEnabled), e.disableSubmitButton = _this113.disableSubmitButton.bind(_assertThisInitialized(_this113), s), _this113.attemptOverwriteLoadingStyle(e), o.microphone && _this113.setUpSpeechToText(o.microphone.button, e.speechToText), setTimeout(function () {
      var h;
      _this113._validationHandler = e._validationHandler, _this113.assignHandlers(_this113._validationHandler), (h = _this113._validationHandler) == null || h.call(_assertThisInitialized(_this113));
    });
    return _this113;
  }
  _inherits(Yn, _n25);
  return _createClass(Yn, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates() {
      var _this$createCustomEle = this.createCustomElements(),
        e = _this$createCustomEle.submit,
        t = _this$createCustomEle.loading,
        n = _this$createCustomEle.stop;
      return _defineProperty({
        submit: e,
        loading: t || [Yn.createLoadingIconElement()],
        stop: n || [Yn.createStopIconElement()]
      }, H, this.createDisabledIconElement(e));
    }
  }, {
    key: "createCustomElements",
    value: function createCustomElements() {
      var _this114 = this;
      var e = Ct.createCustomElements(at, this[G], this.customStyles),
        t = {
          loading: void 0,
          stop: void 0
        };
      return Object.keys(t).forEach(function (n) {
        var s = n,
          r = Ct.createCustomElements(s, _this114[G], _this114.customStyles);
        r && (t[s] = r);
      }), t.submit = e || this.buildDefaultIconElement("submit-icon"), t;
    }
  }, {
    key: "createDisabledIconElement",
    value: function createDisabledIconElement(e) {
      return Ct.createCustomElements(H, this[G], this.customStyles) || [e[0].cloneNode(!0)];
    }
    // prettier-ignore
  }, {
    key: "attemptOverwriteLoadingStyle",
    value: function attemptOverwriteLoadingStyle(e) {
      var t, n, s, r, o, a, c, l, h;
      if (!((n = (t = this.customStyles) == null ? void 0 : t.submit) != null && n[G] || (o = (r = (s = this.customStyles) == null ? void 0 : s.loading) == null ? void 0 : r[G]) != null && o.content || (l = (c = (a = this.customStyles) == null ? void 0 : a.loading) == null ? void 0 : c[d]) != null && l.content) && (e.displayLoadingBubble === void 0 || e.displayLoadingBubble === !0)) {
        var u = S("style");
        u.textContent = "\n        .loading-button > * {\n          filter: brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%)\n            contrast(96%) !important;\n        }", (h = e.shadowRoot) == null || h.appendChild(u), this._isSVGLoadingIconOverriden = !0;
      }
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers(e) {
      this._serviceIO.completionsHandlers = {
        onFinish: this.resetSubmit.bind(this, e)
      }, this._serviceIO.streamHandlers = {
        onOpen: this.changeToStopIcon.bind(this),
        onClose: this.resetSubmit.bind(this, e),
        stopClicked: this._stopClicked
      };
      var t = this._serviceIO.stream;
      _typeof(t) == "object" && typeof t.simulation == "number" && (this._serviceIO.streamHandlers.simulationInterim = t.simulation);
    }
  }, {
    key: "setUpSpeechToText",
    value: function setUpSpeechToText(e, t) {
      this._microphoneButton = e, this._stopSTTAfterSubmit = _typeof(t) == "object" ? t.stopAfterSubmit : !1;
    }
  }, {
    key: "resetSubmit",
    value: function resetSubmit(e) {
      this.status.requestInProgress = !1, this.status.loadingActive = !1, e();
    }
  }, {
    key: "submitFromInput",
    value: function () {
      var _submitFromInput = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee174() {
        var _this115 = this;
        var e, t;
        return _regenerator().w(function (_context174) {
          while (1) switch (_context174.n) {
            case 0:
              _context174.n = 1;
              return this._fileAttachments.completePlaceholders();
            case 1:
              e = this._fileAttachments.getAllFileData();
              if (this._textInput.isTextInputEmpty()) this.attemptSubmit(_defineProperty(_defineProperty({}, d, ""), m, e));else {
                t = this._textInput.inputElementRef.innerText.trim();
                this.attemptSubmit(_defineProperty(_defineProperty({}, d, t), m, e));
              }
              (Ge.IS_SAFARI || Ge.IS_MOBILE) && setTimeout(function () {
                return pn.focusEndOfInput(_this115._textInput.inputElementRef);
              });
            case 2:
              return _context174.a(2);
          }
        }, _callee174, this);
      }));
      function submitFromInput() {
        return _submitFromInput.apply(this, arguments);
      }
      return submitFromInput;
    }()
  }, {
    key: "programmaticSubmit",
    value: function () {
      var _programmaticSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee175(e) {
        var _this116 = this;
        var t;
        return _regenerator().w(function (_context175) {
          while (1) switch (_context175.n) {
            case 0:
              typeof e == "string" && (e = ie.processSubmitUserMessage(e));
              t = _defineProperty({}, d, e[d]);
              e[m] && (t[m] = Array.from(e[m]).map(function (n) {
                return _defineProperty({
                  file: n
                }, y, kt.getTypeFromBlob(n));
              })), e.custom && (t.custom = e.custom), setTimeout(function () {
                return _this116.attemptSubmit(t, !0);
              });
            case 1:
              return _context175.a(2);
          }
        }, _callee175);
      }));
      function programmaticSubmit(_x325) {
        return _programmaticSubmit.apply(this, arguments);
      }
      return programmaticSubmit;
    }() // TO-DO - should be disabled when loading history
  }, {
    key: "attemptSubmit",
    value: function () {
      var _attemptSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee176(e) {
        var _this117 = this;
        var t,
          r,
          o,
          a,
          c,
          n,
          s,
          _args176 = arguments,
          _t64,
          _t65,
          _t66;
        return _regenerator().w(function (_context176) {
          while (1) switch (_context176.n) {
            case 0:
              t = _args176.length > 1 && _args176[1] !== undefined ? _args176[1] : !1;
              _context176.n = 1;
              return (r = this._validationHandler) == null ? void 0 : r.call(this, t ? e : void 0);
            case 1:
              _t64 = _context176.v;
              _t65 = !1;
              if (!(_t64 === _t65)) {
                _context176.n = 2;
                break;
              }
              return _context176.a(2);
            case 2:
              this.changeToLoadingIcon();
              this._textInput.clear();
              Ge.IS_MOBILE && setTimeout(function () {
                return _this117._textInput.inputElementRef.focus();
              });
              _t66 = typeof this._messages.focusMode != "boolean" && (o = this._messages.focusMode) != null && o.fade;
              if (!_t66) {
                _context176.n = 3;
                break;
              }
              _context176.n = 3;
              return Us.fadeAnimation(this._messages.elementRef, this._messages.focusMode.fade);
            case 3:
              _context176.n = 4;
              return this.addNewMessage(e);
            case 4:
              this._serviceIO.isWebModel() || this._messages.addLoadingMessage();
              n = (a = e[m]) == null ? void 0 : a.map(function (l) {
                return l[ne];
              }), s = _defineProperty(_defineProperty({}, d, e[d] === "" ? void 0 : e[d]), m, n);
              _context176.n = 5;
              return this._serviceIO.callAPI(s, this._messages);
            case 5:
              (c = this._fileAttachments) == null || c.hideFiles();
            case 6:
              return _context176.a(2);
          }
        }, _callee176, this);
      }));
      function attemptSubmit(_x326) {
        return _attemptSubmit.apply(this, arguments);
      }
      return attemptSubmit;
    }()
  }, {
    key: "addNewMessage",
    value: function () {
      var _addNewMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee177(_ref247) {
        var e, t, n, s, _t67;
        return _regenerator().w(function (_context177) {
          while (1) switch (_context177.n) {
            case 0:
              e = _ref247.text, t = _ref247.files, n = _ref247.custom;
              s = _defineProperty(_defineProperty({}, A, $), "custom", n);
              e && (s[d] = e);
              _t67 = t;
              if (!_t67) {
                _context177.n = 2;
                break;
              }
              _context177.n = 1;
              return this._messages.addMultipleFiles(t, this._fileAttachments);
            case 1:
              s[m] = _context177.v;
            case 2:
              this._serviceIO.sessionId && (s._sessionId = this._serviceIO.sessionId);
              Object.keys(s).length > 0 && this._messages.addNewMessage(s);
            case 3:
              return _context177.a(2);
          }
        }, _callee177, this);
      }));
      function addNewMessage(_x327) {
        return _addNewMessage.apply(this, arguments);
      }
      return addNewMessage;
    }()
  }, {
    key: "stopStream",
    value: function stopStream() {
      var e, t, n;
      (t = (e = this._serviceIO.streamHandlers).onAbort) == null || t.call(e), (n = this._stopClicked) == null || n.listener(), this._validationHandler && this.resetSubmit(this._validationHandler);
    }
  }, {
    key: "changeToStopIcon",
    value: function changeToStopIcon() {
      this._serviceIO.websocket || (this.elementRef[f].remove(Rs, Vn, zn), me.removeAriaAttributes(this.elementRef), this.changeElementsByState(this._innerElements.stop), this.reapplyStateStyle(Ci, [Ot, at]), V.assignButtonEvents(this.elementRef, this.stopStream.bind(this)), this.status.loadingActive = !1);
    }
  }, {
    key: "changeToLoadingIcon",
    value: function changeToLoadingIcon() {
      this._serviceIO.websocket || (this._isSVGLoadingIconOverriden || this.changeElementsByState(this._innerElements.loading), this.elementRef[f].remove(zn, Vn), me.removeAriaDisabled(this.elementRef), this.elementRef[f].add(Rs), me.addAriaBusy(this.elementRef), this.reapplyStateStyle(Ot, [at]), V.assignButtonEvents(this.elementRef, function () {}), this.status.requestInProgress = !0, this.status.loadingActive = !0);
    }
    // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  }, {
    key: "changeToSubmitIcon",
    value: function changeToSubmitIcon() {
      var _this118 = this;
      this.elementRef[f].contains(zn) || (this.elementRef[f].remove(Rs, Vn), me.removeAriaAttributes(this.elementRef), this.elementRef[f].add(zn), this.changeElementsByState(this._innerElements.submit), an.resetSubmit(this, this.status.loadingActive), V.assignButtonEvents(this.elementRef, function () {
        var e;
        _this118.submitFromInput(), (e = _this118._microphoneButton) != null && e.isActive && gs.toggleSpeechAfterSubmit(_this118._microphoneButton.elementRef, !!_this118._stopSTTAfterSubmit), setTimeout(function () {
          return pn.focusEndOfInput(_this118._textInput.inputElementRef);
        });
      }));
    }
    // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  }, {
    key: "changeToDisabledIcon",
    value: function changeToDisabledIcon() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      this._alwaysEnabled && !e ? this.changeToSubmitIcon() : this.elementRef[f].contains(Vn) || (this.elementRef[f].remove(Rs, zn), me.removeAriaBusy(this.elementRef), this.elementRef[f].add(Vn), me.addAriaDisabled(this.elementRef), this.changeElementsByState(this._innerElements[H]), this.reapplyStateStyle(H, [at]), V.assignButtonEvents(this.elementRef, function () {}));
    }
  }, {
    key: "disableSubmitButton",
    value: function disableSubmitButton(e, t) {
      var n;
      e.isSubmitProgrammaticallyDisabled = t !== !1, !(this.status.requestInProgress || this.status.loadingActive) && (t === !1 ? (n = this._validationHandler) == null || n.call(this) : this.changeToDisabledIcon(!0));
    }
  }], [{
    key: "createButtonContainerElement",
    value: function createButtonContainerElement() {
      var e = S();
      return e[f].add("input-button"), e;
    }
  }, {
    key: "createLoadingIconElement",
    value: function createLoadingIconElement() {
      var e = S();
      return e[f].add("loading-submit-button"), e;
    }
  }, {
    key: "createStopIconElement",
    value: function createStopIconElement() {
      var e = S();
      return e.id = "stop-icon", e;
    }
  }]);
}(_n);
var ld = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M27.1 14.313V5.396L24.158 8.34c-2.33-2.325-5.033-3.503-8.11-3.503C9.902 4.837 4.901 9.847 4.899 16c.001 6.152 5.003 11.158 11.15 11.16 4.276 0 9.369-2.227 10.836-8.478l.028-.122h-3.23l-.022.068c-1.078 3.242-4.138 5.421-7.613 5.421a8 8 0 0 1-5.691-2.359A7.993 7.993 0 0 1 8 16.001c0-4.438 3.611-8.049 8.05-8.049 2.069 0 3.638.58 5.924 2.573l-3.792 3.789H27.1z\"/>\n</svg>\n",
  hd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z\"></path>\n</svg>\n",
  dd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z\"/>\n</svg>",
  ud = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M4.89163 13.2687L9.16582 17.5427L18.7085 8\" stroke=\"#000000\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>";
var br = /*#__PURE__*/function (_on) {
  // prettier-ignore
  function br(e, t, n, s) {
    var _this119;
    _classCallCheck(this, br);
    _this119 = _callSuper(this, br, [e, ["modal-content", "modal-camera-content"], n]), _this119._stopped = !1, _this119._format = "image/png", _this119._canvas = S("canvas"), _this119._canvas[f].add("camera-modal-canvas");
    var _this119$addButtonsAn = _this119.addButtonsAndTheirEvents(t),
      r = _this119$addButtonsAn.captureButton,
      o = _this119$addButtonsAn.submitButton;
    _this119._captureButton = r, _this119._submitButton = o, _this119._captureIcon = _this119._captureButton.children[0], _this119._refreshIcon = Bt.createSVGElement(ld), _this119._refreshIcon[f].add("modal-svg-button-icon", "modal-svg-refresh-icon"), (s == null ? void 0 : s.format) === "jpeg" && (_this119._format = "image/jpeg"), s != null && s.dimensions && (_this119._dimensions = s.dimensions), _this119._contentRef.appendChild(_this119._canvas), _this119.extensionCloseCallback = _this119.stop;
    return _this119;
  }
  _inherits(br, _on);
  return _createClass(br, [{
    key: "addButtonsAndTheirEvents",
    value: function addButtonsAndTheirEvents(e) {
      var t = on.createSVGButton(hd);
      t[f].add("modal-svg-camera-button"), t.children[0][f].add("modal-svg-camera-icon");
      var n = this.addCloseButton(dd, !0);
      n[f].add("modal-svg-close-button"), n.children[0][f].add("modal-svg-close-icon");
      var s = on.createSVGButton(ud);
      return s[f].add("modal-svg-submit-button"), this.addButtons(t, s), this.addButtonEvents(t, n, s, e), {
        captureButton: t,
        submitButton: s
      };
    }
    // prettier-ignore
  }, {
    key: "addButtonEvents",
    value: function addButtonEvents(e, t, n, s) {
      var _this120 = this;
      V.assignButtonEvents(e, this.capture.bind(this)), V.assignButtonEvents(t, this.stop.bind(this)), V.assignButtonEvents(n, function () {
        var r = _this120.getFile();
        r && As.addFilesToType([r], [s]), _this120.stop(), _this120.close();
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this121 = this;
      this._mediaStream && this._mediaStream.getTracks().forEach(function (e) {
        return e.stop();
      }), this._stopped = !0, setTimeout(function () {
        _this121._captureButton.replaceChildren(_this121._captureIcon), _this121._captureButton[f].replace("modal-svg-refresh-button", "modal-svg-camera-button");
        var e = _this121._canvas.getContext("2d");
        e == null || e.clearRect(0, 0, _this121._canvas.width, _this121._canvas.height);
      }, on.MODAL_CLOSE_TIMEOUT_MS);
    }
  }, {
    key: "start",
    value: function start() {
      var _this122 = this;
      this._dataURL = void 0, this._submitButton[f].add("modal-svg-submit-".concat(H)), this._stopped = !1, navigator.mediaDevices.getUserMedia({
        video: this._dimensions || !0
      }).then(function (e) {
        if (_this122._mediaStream = e, !_this122.isOpen()) return _this122.stop();
        var t = S("video");
        t.srcObject = e, t.play(), requestAnimationFrame(_this122.updateCanvas.bind(_this122, t, _this122._canvas));
      })["catch"](function (e) {
        console[p](e), _this122.stop(), _this122.close();
      });
    }
  }, {
    key: "capture",
    value: function capture() {
      this._dataURL ? (this._captureButton.replaceChildren(this._captureIcon), this._captureButton[f].replace("modal-svg-refresh-button", "modal-svg-camera-button"), this._submitButton[f].add("modal-svg-submit-".concat(H)), this._dataURL = void 0) : (this._captureButton.replaceChildren(this._refreshIcon), this._captureButton[f].replace("modal-svg-camera-button", "modal-svg-refresh-button"), this._submitButton[f].remove("modal-svg-submit-".concat(H)), this._dataURL = this._canvas.toDataURL());
    }
  }, {
    key: "getFile",
    value: function getFile() {
      if (this._dataURL) {
        var e = atob(this._dataURL.split(",")[1]),
          t = new Array(e.length);
        for (var a = 0; a < e.length; a++) t[a] = e.charCodeAt(a);
        var _n26 = new Uint8Array(t),
          s = new Blob([_n26], {
            type: this._format
          }),
          r = this._format === "image/jpeg" ? "jpeg" : "png",
          o = Bo.getFileName(this._newFilePrefix || "photo", r);
        return new File([s], o, {
          type: s[y]
        });
      }
    }
  }, {
    key: "updateCanvas",
    value: function updateCanvas(e, t) {
      if (!this._stopped) {
        if (!this._dataURL) {
          t.width = e.videoWidth, t.height = e.videoHeight;
          var _n27 = t.getContext("2d");
          _n27 == null || _n27.drawImage(e, 0, 0, t.width, t.height);
        }
        requestAnimationFrame(this.updateCanvas.bind(this, e, t));
      }
    }
  }, {
    key: "openCameraModal",
    value: function openCameraModal(e) {
      this.displayModalElements(), e[Wt]();
    }
    // prettier-ignore
  }], [{
    key: "createCameraModalFunc",
    value: function createCameraModalFunc(e, t, n, s) {
      var r = new br(e, t, n, s);
      return r.openCameraModal.bind(r, r);
    }
  }]);
}(on);
var pd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M29 7h-4.599l-2.401-4h-12l-2.4 4h-4.6c-1 0-3 1-3 2.969v16.031c0 1.657 1.5 3 2.792 3h26.271c1.313 0 2.938-1.406 2.938-2.968v-16.032c0-1-1-3-3-3zM30 26.032c0 0.395-0.639 0.947-0.937 0.969h-26.265c-0.232-0.019-0.797-0.47-0.797-1v-16.031c0-0.634 0.851-0.953 1-0.969h5.732l2.4-4h9.802l1.785 3.030 0.55 0.97h5.731c0.705 0 0.99 0.921 1 1v16.032zM16 10c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM16 22c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z\"></path>\n</svg>";
var yr = /*#__PURE__*/function (_n28) {
  function yr(e, t, n) {
    var _this123;
    _classCallCheck(this, yr);
    var l, h, u, g, b, v;
    var s = ie.processPosition((l = n == null ? void 0 : n.button) == null ? void 0 : l.position),
      r = ((g = (u = (h = n == null ? void 0 : n.button) == null ? void 0 : h[T]) == null ? void 0 : u[d]) == null ? void 0 : g.content) || "Photo",
      o = yt.tryCreateConfig("Camera", (b = n == null ? void 0 : n.button) == null ? void 0 : b.tooltip),
      a = ((v = n == null ? void 0 : n.button) == null ? void 0 : v[T]) || {};
    _this123 = _callSuper(this, yr, [yr.createButtonElement(), pd, s, o, a, r]);
    var c = _this123.createInnerElementsForStates(_this123.customStyles);
    n && _this123.addClickEvent(e, t, n.modalContainerStyle, n[m]), _this123.changeElementsByState(c[T]), _this123.reapplyStateStyle(T);
    return _this123;
  }
  _inherits(yr, _n28);
  return _createClass(yr, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      return _defineProperty({}, T, this.createInnerElements("camera-icon", T, e));
    }
  }, {
    key: "addClickEvent",
    value:
    // prettier-ignore
    function addClickEvent(e, t, n, s) {
      var r = br.createCameraModalFunc(e, t, n, s);
      V.assignButtonEvents(this.elementRef, r);
    }
  }], [{
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[f].add("input-button"), e;
    }
  }]);
}(_n);
var Tn = /*#__PURE__*/function () {
  function Tn(e, t, n, s) {
    _classCallCheck(this, Tn);
    this.elementRef = Tn.createPanelElement(e.inputAreaStyle);
    var r = {},
      o = this.createFileUploadComponents(e, n, s, r),
      a = new Fs(e, n, o, t.browserStorage);
    e.speechToText && !r.microphone && (r.microphone = {
      button: new gs(e, a, t.addNewErrorMessage.bind(t))
    });
    var c = new Yn(e, a, t, n, o, r);
    a.submit = c.submitFromInput.bind(c), Jt.attach(e, n, a, o, c, t.browserStorage), e.submitUserMessage = c.programmaticSubmit.bind(c), r.submit = {
      button: c
    }, e.customButtons && hn.add(e, r), Tn.addElements(this.elementRef, a, r, s, o, e.dropupStyles), Tn.assignOnInput(e, n, o, a);
  }
  return _createClass(Tn, [{
    key: "createFileUploadComponents",
    value:
    // prettier-ignore
    function createFileUploadComponents(e, t, n, s) {
      var o, a, c, l;
      var r = new As(this.elementRef, e.attachmentContainerStyle, t.demo);
      if (Tn.createUploadButtons(e, t, t.fileTypes || {}, r, n, s), (o = t[Fe]) != null && o[m]) {
        var h = ((a = s[ee]) == null ? void 0 : a.fileType) || r.addType(e, t, t[Fe][m], ee);
        s[Fe] = {
          button: new yr(n, h, t[Fe])
        };
      }
      if ((c = t.recordAudio) != null && c[m]) {
        var _h2 = ((l = s[j]) == null ? void 0 : l.fileType) || r.addType(e, t, t.recordAudio[m], j);
        s.microphone = {
          button: new ad(_h2, t.recordAudio)
        };
      }
      return Mt.isEnabled(r, e.dragAndDrop) && Mt.create(n, r, e.dragAndDrop), r;
    }
    // prettier-ignore
  }], [{
    key: "createPanelElement",
    value: function createPanelElement(e) {
      var t = S();
      return t.id = "input", Object.assign(t[E], e), t;
    }
  }, {
    key: "createUploadButtons",
    value: function createUploadButtons(e, t, n, s, r, o) {
      Object.keys(n).forEach(function (a) {
        var c = a,
          l = n[c];
        if (l[m]) {
          var h = s.addType(e, t, l[m], c),
            _nd$c = nd[c],
            u = _nd$c.id,
            g = _nd$c.svgString,
            b = _nd$c.dropupText,
            v = new ni(r, h, l, u, g, b);
          o[c] = {
            button: v,
            fileType: h
          };
        }
      });
    }
    // prettier-ignore
  }, {
    key: "addElements",
    value: function addElements(e, t, n, s, r, o) {
      V.addElements(e, t.elementRef);
      var a = Un.create(),
        c = Ne.addButtons(a, n, s, o);
      Zn.set(t.inputElementRef, a, r.elementRef, c), Un.add(e, a);
    }
  }, {
    key: "assignOnInput",
    value: function assignOnInput(e, t, n, s) {
      t.onInput = function (r) {
        setTimeout(function () {
          var o = n.getAllFileData(),
            a = s.inputElementRef.innerText.trim(),
            c = _defineProperty({}, d, a);
          o && (c[m] = o.map(function (l) {
            return l[ne];
          })), mn.onInput(e, c, r);
        });
      };
    }
  }]);
}();
var Er = /*#__PURE__*/function () {
  function Er() {
    _classCallCheck(this, Er);
  }
  return _createClass(Er, null, [{
    key: "createElements",
    value: function createElements(e, t, n) {
      var s = S();
      s.id = "chat-view";
      var r = !e.focusMode && e.upwardsMode;
      s.classList.add(r ? Kh : qh);
      var o = new it(e, t, n);
      t.websocket && Me.createConnection(t, o);
      var a = new Tn(e, o, t, s),
        c = r ? o.elementRef.parentElement : o.elementRef;
      return V.addElements(s, c, a.elementRef), s;
    }
  }, {
    key: "render",
    value: function render(e, t, n, s) {
      var r = Er.createElements(e, n, s);
      t.replaceChildren(r), n.isCustomView() && n.setUpView(r, t);
    }
  }]);
}();
var fd = "#validate-property-key-view{height:100%;position:relative;display:flex;justify-content:center;align-items:center;padding:8px}#loading-validate-key-property{display:inline-block;width:50px;height:50px}#loading-validate-key-property:after{content:\" \";display:block;width:38px;height:38px;margin:1px;border-radius:50%;border:5px solid #5fb2ff;border-color:#5fb2ff transparent #5fb2ff transparent;animation:loading-spinner 1.4s linear infinite}#deep-chat-openai-realtime-container{height:100%;width:100%}#deep-chat-openai-realtime-avatar-container{height:60%;width:100%;display:flex;justify-content:center;align-items:center}#deep-chat-openai-realtime-avatar{border-radius:50%;height:110px;border:1px solid rgb(215,215,215);padding:8px;-webkit-user-select:none;user-select:none;margin-top:20px}#deep-chat-openai-realtime-buttons-container{height:40%;display:flex;position:relative}.deep-chat-openai-realtime-button-container{height:100%;width:50%;display:flex;justify-content:center;align-items:center}.deep-chat-openai-realtime-button{width:70px;height:70px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer}.deep-chat-openai-realtime-button-default{background-color:#e3e3e3}.deep-chat-openai-realtime-button-default:hover{background-color:#d4d4d4}.deep-chat-openai-realtime-button-default:active{background-color:#c5c5c5}.deep-chat-openai-realtime-button-loading{opacity:.7;pointer-events:none}.deep-chat-openai-realtime-microphone-active{background-color:#ffe7e7}.deep-chat-openai-realtime-microphone-active:hover{background-color:#ffdede}.deep-chat-openai-realtime-microphone-active:active{background-color:#ffd2d2}.deep-chat-openai-realtime-microphone>*{height:30px;width:30px}.deep-chat-openai-realtime-microphone-active>*{filter:brightness(0) saturate(100%) invert(35%) sepia(60%) saturate(1360%) hue-rotate(325deg) brightness(95%) contrast(92%)}.deep-chat-openai-realtime-toggle>*{height:32px;width:32px;padding-inline-start:3px;filter:brightness(0) saturate(100%) invert(22%) sepia(0%) saturate(4537%) hue-rotate(208deg) brightness(105%) contrast(91%)}.deep-chat-openai-realtime-button-unavailable{opacity:.45;pointer-events:none}#deep-chat-openai-realtime-error{color:red;position:absolute;top:calc(50% + 40px);inset-inline-start:50%;transform:translate(-50%,-50%);font-size:17px}#deep-chat-openai-realtime-loading{position:absolute;font-size:15px;top:50%;inset-inline-start:50%;transform:translate(-50%,-50%)}#insert-key-view{height:100%;position:relative}#insert-key-contents{text-align:center;position:absolute;inset-block-start:44%;inset-inline-start:50%;transform:translate(-50%,-50%);width:82%;display:flex;max-width:700px}#insert-key-title{margin-bottom:15px}#insert-key-input-container{margin-inline-end:2.7em;width:calc(100% - 80px)}#insert-key-input{padding:.3em 1.7em .3em .3em;border-width:1px;border-style:solid;border-radius:3px;width:100%;font-size:inherit}.insert-key-input-valid{border-color:gray}.insert-key-input-invalid{border-color:red}#visibility-icon-container{position:relative;float:inline-end;cursor:pointer;-webkit-user-select:none;user-select:none}.visibility-icon{filter:brightness(0) saturate(100%) invert(63%) sepia(1%) saturate(9%) hue-rotate(43deg) brightness(98%) contrast(92%);position:absolute;inset-inline-end:-1.7em;inset-block-start:-1.43em}#visible-icon{inset-block-start:-1.4em}.visibility-icon:hover{filter:unset}.visibility-icon>*{pointer-events:none}#start-button{border:1px solid grey;color:#454545;border-radius:4px;width:3em;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:.28em .3em;-webkit-user-select:none;user-select:none;background-color:#fff}#start-button:hover{background-color:#f2f2f2}#start-button:active{background-color:#d2d2d2}#insert-key-help-text-container{width:100%;position:absolute;margin-top:32px;margin-bottom:20px}#insert-key-help-text-contents{width:100%;position:absolute}#insert-key-input-invalid-text{display:block;margin-top:1em;margin-bottom:.5em;color:red}.insert-key-input-help-text{display:block;margin-top:16px}#loading-key{display:inline-block;width:16px;height:16px}#loading-key:after{content:\" \";display:block;width:11px;height:11px;margin:1px;border-radius:50%;border:2px solid #0084ff;border-color:#0084ff transparent #0084ff transparent;animation:loading-spinner 1.2s linear infinite}#error-view{color:red;font-size:1.2em;line-height:1.3em;margin-top:-5px;text-align:center;height:100%;display:flex;justify-content:center;align-items:center;padding-inline:8px}@keyframes loading-spinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.intro-panel{position:absolute;display:flex;justify-content:center;right:0;bottom:0;left:0;margin:auto;height:fit-content;top:-2.5em}pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!\n  Theme: a11y-dark\n  Author: @ericwbailey\n  Maintainer: @ericwbailey\n\n  Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css\n*/.hljs{background:#2b2b2b;color:#f8f8f2}.hljs-comment,.hljs-quote{color:#d4d0ab}.hljs-deletion,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ffa07a}.hljs-built_in,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-type{color:#f5ab35}.hljs-attribute{color:gold}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#abe338}.hljs-section,.hljs-title{color:#00e0e0}.hljs-keyword,.hljs-selector-tag{color:#dcc6e0}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}@media screen and (-ms-high-contrast:active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-quote,.hljs-string,.hljs-symbol,.hljs-type{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:700}}#messages,.deep-chat-upwards-mode #messages>div{overflow:auto;overflow-anchor:none}.deep-chat-upwards-mode #messages{height:100%;display:flex;flex-direction:column;justify-content:flex-end}.outer-message-container:last-child{margin-bottom:5px}.inner-message-container{display:flex;margin-inline:auto;width:calc(97.5% - 24px);max-width:100%}.message-bubble{margin-top:10px;word-wrap:break-word;width:fit-content;max-width:60%;border-radius:10px;padding:.42em .55em;height:fit-content;line-height:1.26}.user-message-text{color:#fff;background-color:#0084ff;margin-inline-end:0px;margin-inline-start:auto}.ai-message-text{color:#000;background-color:#e4e6eb;margin-inline-start:0px;margin-inline-end:auto}.deep-chat-last-group-messages-active{height:100%}#scroll-button{position:absolute;top:75%;left:50%;right:50%;transform:translate(-50%,-50%);transition:opacity .1s ease;display:flex;opacity:0;padding:8px;background-color:#fff;border:.5px solid #000000;justify-content:center;align-items:center;white-space:nowrap;cursor:pointer}#scroll-button:hover{background-color:#fafafa}.loading-history-message-full-view{position:absolute;height:70%;width:100%;display:flex;align-items:center}.deep-chat-upwards-mode #messages .loading-history-message-full-view{height:100%}.loading-history-message-small{height:20px;margin-bottom:30px}.loading-history-message-small>div>div{scale:.6}.loading-history-message{margin-top:0;width:100%;max-width:100%;display:flex;justify-content:center;background-color:unset}.loading-history{width:70px}.loading-history div{position:absolute;width:var(--loading-history-width);height:var(--loading-history-height);margin:var(--loading-history-margin);border:var(--loading-history-border);border-radius:50%;animation:loading-spinner 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:var(--loading-history-color) transparent transparent transparent}.loading-history div:nth-child(1){animation-delay:-.45s}.loading-history div:nth-child(2){animation-delay:-.3s}.loading-history div:nth-child(3){animation-delay:-.15s}.html-message{max-width:unset}.error-message-text{margin-inline:auto;background-color:#f4c0c0;color:#474747;text-align:center;max-width:95%;margin-top:14px;margin-bottom:10px}.deep-chat-loading-message-dots-container{width:1em;padding-top:.6em;padding-bottom:.6em;padding-inline-start:1.3em;padding-inline-end:.75em}.loading-message-dots{position:relative;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite linear alternate;animation-delay:.5s}.loading-message-dots:before,.loading-message-dots:after{content:\"\";display:inline-block;position:absolute;top:0}.loading-message-dots:before{inset-inline-start:-.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite alternate;animation-delay:0s}.loading-message-dots:after{inset-inline-start:.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite alternate;animation-delay:1s}@keyframes loading-message-dots{0%{background-color:var(--loading-message-color)}50%,to{background-color:var(--loading-message-color-fade)}}.message-bubble>p:first-child,.message-bubble>.partial-render-message>p:first-child,.html-wrapper>p:first-child{margin-top:0}.message-bubble>p:last-child,.message-bubble>.partial-render-message:last-child>p,.html-wrapper>p:last-child{margin-bottom:0}pre{overflow:auto;display:block;word-break:break-all;word-wrap:break-word;border-radius:7px;background:#2b2b2b;color:#f8f8f2;margin-top:.8em;margin-bottom:.8em;padding:.6em;font-size:.9em;line-height:1.5em}.image-message{padding:0;display:flex;background-color:#ddd}.image-message>*,.image-message>*>*{width:100%;border-radius:8px;display:flex}.audio-message{width:60%;max-width:300px;height:2.2em;max-height:54px;padding:0;background-color:unset}.audio-player{width:100%;height:100%}.audio-player-safari{height:fit-content;width:40px}.audio-player-safari-start{float:inline-start}.audio-player-safari-end{float:inline-end}.any-file-message{padding:1px}.any-file-message-contents{display:flex}.any-file-message-icon-container{width:1.3em;min-width:1.3em;position:relative;border-radius:4px;margin-inline-start:6px;margin-inline-end:2px}.any-file-message-icon{background-color:#fff;border-radius:4px;position:absolute;width:1em;height:1.25em;padding:1px;margin-top:auto;margin-bottom:auto;top:0;bottom:0}.any-file-message-text{padding-top:5px;overflow-wrap:anywhere;padding-bottom:5px;padding-inline-end:7px}.message-bubble>a{color:inherit}.start-item-position{margin-inline-end:10px}.end-item-position{margin-inline-start:10px}.role-hidden{display:none}.avatar{padding-top:5px;width:1.5em;height:1.5em;border-radius:1px}.avatar-container{margin-top:9px}.name{margin-top:16px;font-size:15px}#drag-and-drop{position:absolute;display:none;z-index:10;height:calc(100% - 10px);width:calc(100% - 10px);background-color:#70c6ff4d;border:5px dashed #6dafff}#file-attachment-container{position:absolute;height:3.6em;width:calc(80% - 4px);top:-2.5em;border-radius:5px;overflow:auto;text-align:start;background-color:#d7d7d73b;padding-inline-start:4px}.file-attachment{width:2.85em;height:2.85em;display:inline-flex;margin-inline-end:.6em;margin-bottom:.44em;margin-top:4px;position:relative;background-color:#fff;border-radius:5px}.image-attachment{width:100%;height:100%;object-fit:cover;border-radius:5px}.border-bound-attachment{width:calc(100% - 2px);height:calc(100% - 2px);border:1px solid #c3c3c3;border-radius:5px;overflow:hidden}.border-bound-attachment-safari{width:calc(100% - 1px);height:calc(100% - 1px)}.audio-attachment-icon-container{cursor:pointer}.audio-attachment-icon-container:hover{background-color:#f8f8f8}.attachment-icon{inset-inline:0;bottom:0;top:2px;margin:auto;position:absolute;width:25px;-webkit-user-select:none;user-select:none}.not-removable-attachment-icon{top:0;right:0;bottom:0;left:0}.play-icon{filter:brightness(0) saturate(100%) invert(17%) sepia(0%) saturate(1392%) hue-rotate(67deg) brightness(98%) contrast(97%)}.stop-icon{filter:brightness(0) saturate(100%) invert(29%) sepia(90%) saturate(1228%) hue-rotate(198deg) brightness(93%) contrast(98%)}.audio-placeholder-text-3-digits{padding-inline-start:.26rem}.audio-placeholder-text-4-digits{padding-inline-start:.1rem}.any-file-attachment{padding:2px 0}.file-attachment-text-container{position:absolute;width:inherit;display:flex;align-items:center;height:100%;top:-1px}.audio-placeholder-text-3-digits-container{padding-top:1px;cursor:default}.any-file-attachment-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-inline-start:.13em;margin-inline:auto}.remove-file-attachment-button{height:1.25em;width:1.25em;border:1px solid #cfcfcf;border-radius:25px;background-color:#fff;top:-4px;inset-inline-end:-5px;position:absolute;display:flex;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none}.remove-file-attachment-button:hover{background-color:#e4e4e4}.remove-file-attachment-button:active{background-color:#d7d7d7}.x-icon{color:#4e4e4e;top:-.075em;position:relative;font-size:1.05em}.modal{display:none;flex-direction:column;align-items:center;justify-content:center;position:absolute;width:80%;max-width:420px;max-height:80%;margin:auto;top:0;right:0;bottom:0;left:0;z-index:3}.modal-content{border-top:1px solid rgb(217,217,217);border-inline:1px solid rgb(217,217,217);border-start-start-radius:inherit;border-start-end-radius:inherit;background-color:#fff;overflow-y:auto;height:fit-content;max-height:calc(100% - 3.3em);width:100%}.modal-content>p{margin-inline:1em}.modal-content>ul{margin-inline-end:1em}.modal-button-panel{height:3.3em;border:1px solid;border-color:rgb(223,223,223) rgb(217,217,217) rgb(217,217,217);border-end-start-radius:inherit;border-end-end-radius:inherit;background-color:#fff;text-align:center;justify-content:center;display:flex;width:100%}.modal-button{min-width:2.5em;text-align:center;color:#fff;border-radius:5px;padding:.4em .4em .3em;height:1.25em;background-color:#3279b2;inset-block:0;margin-top:auto;margin-bottom:auto;cursor:pointer;-webkit-user-select:none;user-select:none;margin-inline:.31em}.modal-button:hover{background-color:#276da7}.modal-button:active{background-color:#1b5687}.modal-svg-button{padding:0 0 2px;width:2em;height:1.8em}.modal-svg-button-icon{width:100%;height:100%;filter:brightness(0) saturate(100%) invert(100%) sepia(15%) saturate(4%) hue-rotate(346deg) brightness(101%) contrast(102%)}#modal-background-panel{position:absolute;width:100%;height:100%;background-color:#00000042;z-index:2;display:none}.show-modal-background{animation:fadeInBackground .3s ease-in-out}@keyframes fadeInBackground{0%{opacity:0}to{opacity:1}}.show-modal{animation:fadeInModal .3s ease-in-out}@keyframes fadeInModal{0%{opacity:0;scale:.95}to{opacity:1;scale:1}}.hide-modal-background{animation:fadeOutBackground .2s ease-in-out}@keyframes fadeOutBackground{0%{opacity:1}to{opacity:0}}.hide-modal{animation:fadeOutModal .2s ease-in-out}@keyframes fadeOutModal{0%{opacity:1;scale:1}to{opacity:0;scale:.95}}.modal-camera-content{overflow:hidden;text-align:center;border:unset;height:100%;background-color:#2a2a2a;display:flex;justify-content:center}.camera-modal-canvas{max-width:100%;max-height:100%;margin-top:auto;margin-bottom:auto}.modal-svg-submit-button{background-color:green}.modal-svg-submit-button:hover{background-color:#007500}.modal-svg-submit-button:active{background-color:#006500}.modal-svg-submit-disabled{pointer-events:none;background-color:#747474}.modal-svg-close-button{height:1.56em;padding-top:.37em;padding-bottom:0;background-color:#c13e3e}.modal-svg-close-button:hover{background-color:#b43434}.modal-svg-close-button:active{background-color:#972929}.modal-svg-close-icon{width:80%;height:80%}.modal-svg-camera-button{height:1.6em;padding-top:.38em;padding-bottom:0}.modal-svg-camera-icon{height:76%}.modal-svg-refresh-icon{height:105%}.modal-svg-refresh-button{height:1.66em;padding-top:.11em;padding-bottom:.21em}.input-button-container{position:relative;z-index:1}.inside-end{position:absolute;inset-inline-end:calc(10% + .35em);inset-block-end:.85em}.inside-start{position:absolute;inset-inline-start:calc(10% + .35em);inset-block-end:.85em}.outside-start{position:absolute;inset-inline-end:calc(11px - .55em);inset-block-end:.88em}.outside-end{position:absolute;inset-inline-start:calc(11px - .55em);inset-block-end:.88em}#upload-images-icon{position:absolute;pointer-events:none;width:1.45em;height:1.45em;inset-inline-start:.11em;inset-block-end:.08em;filter:brightness(0) saturate(100%) invert(43%) sepia(0%) saturate(740%) hue-rotate(77deg) brightness(99%) contrast(92%)}#upload-gifs-icon{position:absolute;pointer-events:none;width:1.5em;height:1.48em;inset-inline-start:.07em;inset-block-end:.08em;filter:brightness(0) saturate(100%) invert(49%) sepia(0%) saturate(2586%) hue-rotate(12deg) brightness(93%) contrast(90%)}#upload-audio-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.17em;inset-block-end:.2em;filter:brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(337%) hue-rotate(125deg) brightness(91%) contrast(94%);transform:scaleX(.95)}#camera-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.23em;inset-block-end:.2em;filter:brightness(0) saturate(100%) invert(52%) sepia(0%) saturate(161%) hue-rotate(164deg) brightness(91%) contrast(92%);transform:scaleX(.95)}#upload-mixed-files-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.25em;inset-block-end:.2em;filter:brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(36%) hue-rotate(74deg) brightness(98%) contrast(93%);transform:scaleX(.95)}#interim-text{color:gray}#microphone-button{padding-top:.5px}.outer-button-container>#microphone-button{padding-bottom:1px}#microphone-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.25em;inset-block-end:.25em}.default-microphone-icon{filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%)}.active-microphone-icon{filter:brightness(0) saturate(100%) invert(10%) sepia(97%) saturate(7495%) hue-rotate(0deg) brightness(101%) contrast(107%);border-radius:10px}.command-microphone-icon{filter:brightness(0) saturate(100%) invert(42%) sepia(96%) saturate(1067%) hue-rotate(77deg) brightness(99%) contrast(102%)}.unsupported-microphone{display:none}#submit-icon{height:100%;filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%);width:1.21em}#stop-icon{background-color:#acacac;position:absolute;width:.95em;height:.95em;inset-inline-start:.35em;inset-block-end:.35em;border-radius:2px}.submit-button-enlarged{scale:1.1;margin-inline:.3em}.loading-submit-button{position:relative;inset-inline-start:calc(-9990px + .275em);width:.22em;height:.22em;border-radius:5px;background-color:#848484;color:#848484;box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484;animation:loading-submit-button 1.5s infinite linear;inset-block-end:-.75em}@keyframes loading-submit-button{0%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}16.667%{box-shadow:9990px -6px #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}33.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}50%{box-shadow:9990px 0 #848484,calc(9990px + .44em) -6px 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}66.667%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}83.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) -6px 0 0 #848484}to{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}}.tooltip{position:absolute;visibility:hidden;z-index:1;pointer-events:none;padding:5px;padding-inline:7px;background-color:#333;border-radius:5px;width:max-content}.tooltip-text{color:#fff;font-size:13px}.input-button{border-radius:4px;cursor:pointer;margin-bottom:.2em;-webkit-user-select:none;user-select:none}.input-button-svg{width:1.65em;height:1.65em}.input-button-svg-text{padding:1px;height:1.65em;display:flex}.input-button-svg-text>svg{padding:.22rem}.input-button-svg-text>div{margin-inline-start:2px}.input-button:hover,.input-button:focus-visible{background-color:#9c9c9c2e}.input-button:active{background-color:#9c9c9c5e}.input-button:active:not(:hover){background-color:transparent}.loading-button{cursor:auto}.loading-button:hover{background-color:unset}.text-button{filter:unset!important;display:flex;justify-content:center;align-items:center;margin-inline:4px;height:1.6em;width:max-content}#custom-icon{height:100%;width:1.2em}.custom-button-container-default{color:#505050}.custom-button-container-default>.dropup-menu-item-icon{color:unset}.custom-button-container-default>svg{filter:brightness(0) saturate(100%) invert(39%) sepia(1%) saturate(0%) hue-rotate(83deg) brightness(93%) contrast(90%)}.custom-button-container-default>.dropup-menu-item-icon>svg{position:absolute;inset-inline-start:.2em}.custom-button-container-active{background-color:#edf7ff;color:#0285ff}.custom-button-container-active:hover,.custom-button-container-active:focus-visible{background-color:#def0ff}.custom-button-container-active:active{background-color:#d2eaff}.custom-button-container-active>svg{filter:brightness(0) saturate(100%) invert(32%) sepia(34%) saturate(4196%) hue-rotate(196deg) brightness(107%) contrast(104%)}.custom-button-container-disabled{color:#aeaeae;cursor:auto}.custom-button-container-disabled>div{pointer-events:none}.custom-button-container-disabled:hover,.custom-button-container-disabled:focus-visible{background-color:transparent}.custom-button-container-disabled:active{background-color:transparent}.custom-button-container-disabled>svg{filter:brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(818%) hue-rotate(28deg) brightness(102%) contrast(100%)}#text-input-container{background-color:#fff;width:80%;display:flex;border:1px solid #0000001a;border-radius:5px;margin-top:.8em;margin-bottom:.8em;box-shadow:#959da533 0 1px 12px;overflow-y:auto;max-height:200px;position:relative}.text-input-container-start-adjustment{margin-inline-start:1.5em}.text-input-container-end-adjustment{margin-inline-end:1.5em}.text-input-container-start-small-adjustment{margin-inline-start:1.1em}.text-input-container-start-small-adjustment>.outside-start{inset-inline-end:calc(14px - .55em)}.text-input-container-end-small-adjustment{margin-inline-end:1.1em}.text-input-container-end-small-adjustment>.outside-end{inset-inline-start:calc(14px - .55em)}#text-input{text-align:start;outline:none;word-wrap:break-word;line-break:auto}.text-input-styling{padding:.4em .5em;overflow:overlay;width:100%}.text-input-inner-start-adjustment{padding-inline-start:2.2em}.text-input-inner-end-adjustment{padding-inline-end:2em}.text-input-disabled{pointer-events:none;-webkit-user-select:none;user-select:none}[contenteditable]:empty:before{content:attr(deep-chat-placeholder-text);pointer-events:none}[contenteditable][textcolor]:empty:before{color:gray}.outside-end>#dropup-menu,.inside-end>#dropup-menu{inset-inline-end:0px}#dropup-icon{position:absolute;pointer-events:none;width:1.16em;height:1.2em;inset-inline-start:.265em;bottom:.43em;filter:brightness(0) saturate(100%) invert(54%) sepia(0%) saturate(724%) hue-rotate(6deg) brightness(92%) contrast(90%)}.dropup-button>*{pointer-events:none}#dropup-menu{background-color:#fff;position:absolute;transform:translateY(-100%);border-radius:5px;z-index:1;top:-.49em;box-shadow:#0003 -1px 2px 10px,#0000001a 0 2px 4px;cursor:pointer;-webkit-user-select:none;user-select:none}.dropup-menu-item{height:1.4em;padding-inline-start:.35em;padding-inline-end:.84em;padding-top:.28em;padding-bottom:.28em;display:flex;position:relative}.dropup-menu-item:hover,.dropup-menu-item:focus-visible{background-color:#f3f3f3}.dropup-menu-item:active{background-color:#ebebeb}.dropup-menu-item:active:not(:hover){background-color:transparent}.dropup-menu-item:first-child{padding-top:.49em;border-start-start-radius:inherit;border-start-end-radius:inherit}.dropup-menu-item:last-child{padding-bottom:.45em;border-end-start-radius:inherit;border-end-end-radius:inherit}.dropup-menu-item-icon{width:1.39em;position:relative}.dropup-menu-item-icon>svg{bottom:0!important;top:0!important;margin-bottom:auto;margin-top:auto}#dropup-menu-item-icon-element-custom{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.28em;filter:brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(337%) hue-rotate(125deg) brightness(91%) contrast(94%)}.dropup-menu-item-text{margin-inline-start:.56em;margin-top:.08em;width:max-content}#input{width:100%;display:inline-flex;text-align:center;margin-inline:auto;margin-top:auto;position:relative;justify-content:center}#chat-view{height:100%;grid-template-columns:100%}.deep-chat-downwards-mode{display:grid}.deep-chat-upwards-mode{display:flex;flex-direction:column}::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-thumb{background-color:#d0d0d0;border-radius:5px}::-webkit-scrollbar-track{background-color:#f2f2f2}.deep-chat-web-model-button{margin-top:10px;margin-bottom:5px;margin-inline-start:1px}:host{all:initial;display:table-cell;height:350px;width:320px;border:1px solid #cacaca;font-family:Inter,sans-serif,Avenir,Helvetica,Arial;font-size:.9rem;background-color:#fff;position:relative;overflow:hidden}#container{height:inherit;width:inherit;overflow:hidden}";
var md = Object.defineProperty,
  O = function O(i, e, t, n) {
    for (var s = void 0, r = i.length - 1, o; r >= 0; r--) (o = i[r]) && (s = o(e, t, s) || s);
    return s && md(e, t, s), s;
  };
var k = /*#__PURE__*/function (_Oi) {
  function k() {
    var _this124;
    _classCallCheck(this, k);
    var e;
    _this124 = _callSuper(this, k), _this124.getMessages = function () {
      return [];
    }, _this124.submitUserMessage = function () {
      return console.warn(Rr("submitUserMessage"));
    }, _this124.addMessage = function () {
      return console.warn(Rr("addMessage"));
    }, _this124.updateMessage = function () {}, _this124.clearMessages = function () {}, _this124.focusInput = function () {
      return pn.focusFromParentElement(_this124._elementRef);
    }, _this124.refreshMessages = function () {}, _this124.scrollToBottom = function () {}, _this124.disableSubmitButton = function () {}, _this124.setPlaceholderText = function () {}, _this124._hasBeenRendered = !1, _this124._auxiliaryStyleApplied = !1, _this124._chatStyleApplied = !1, _this124._elementRef = S(), _this124._elementRef.id = "container", _this124.attachShadow({
      mode: "open"
    }).appendChild(_this124._elementRef), (e = _this124.shadowRoot) == null || e.appendChild(yt.buildElement()), qt.apply(fd, _this124.shadowRoot), setTimeout(function () {
      _this124._hasBeenRendered || _this124.onRender();
    }, 20);
    return _this124;
  }
  _inherits(k, _Oi);
  return _createClass(k, [{
    key: "changeToChatView",
    value: function changeToChatView() {
      this._activeService && (this._activeService.validateKeyProperty = !1), this.onRender();
    }
    // prettier-ignore
  }, {
    key: "onRender",
    value: function onRender() {
      var _this$_childElement;
      var e;
      Wi.attemptAppendStyleSheetToHead(this.style, (e = this.chatStyle) == null ? void 0 : e.fontFamily), ie.processConnect(this), (!this._activeService || this._activeService.demo) && (this._activeService = Vh.create(this)), this.auxiliaryStyle && !this._auxiliaryStyleApplied && (qt.apply(this.auxiliaryStyle, this.shadowRoot), this._auxiliaryStyleApplied = !0), this.chatStyle && !this._chatStyleApplied && (qt.applyChatStyle(this.chatStyle, this.shadowRoot), this._chatStyleApplied = !0), ie.checkForContainerStyles(this, this._elementRef), this._activeService.key && this._activeService.validateKeyProperty ? Bs.render(this._elementRef, this.changeToChatView.bind(this), this._activeService) : !(this._activeService instanceof M) || this._activeService.key ? ((_this$_childElement = this._childElement) !== null && _this$_childElement !== void 0 ? _this$_childElement : this._childElement = this.children[0], Er.render(this, this._elementRef, this._activeService, this._childElement)) : this._activeService instanceof M && Oe.render(this._elementRef, this.changeToChatView.bind(this), this._activeService), this._hasBeenRendered || mn.onRender(this), this._hasBeenRendered = !0;
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      ds.chat = void 0;
    }
  }]);
}(Oi);
O([P("object")], k.prototype, "connect");
O([P("object")], k.prototype, "directConnection");
O([P("object")], k.prototype, "webModel");
O([P("object")], k.prototype, "requestBodyLimits");
O([P("function")], k.prototype, "requestInterceptor");
O([P("function")], k.prototype, "responseInterceptor");
O([P("function")], k.prototype, "validateInput");
O([P("function")], k.prototype, "loadHistory");
O([P("object")], k.prototype, "chatStyle");
O([P("object")], k.prototype, "attachmentContainerStyle");
O([P("object")], k.prototype, "dropupStyles");
O([P("object")], k.prototype, "inputAreaStyle");
O([P("object")], k.prototype, "textInput");
O([P("object")], k.prototype, "defaultInput");
O([P("object")], k.prototype, "submitButtonStyles");
O([P("object")], k.prototype, "customButtons");
O([P("string")], k.prototype, "auxiliaryStyle");
O([P("array")], k.prototype, "history");
O([P("object")], k.prototype, "browserStorage");
O([P("object")], k.prototype, "introMessage");
O([P("object")], k.prototype, "avatars");
O([P("object")], k.prototype, "names");
O([P("object")], k.prototype, "displayLoadingBubble");
O([P("object")], k.prototype, "errorMessages");
O([P("object")], k.prototype, "messageStyles");
O([P("object")], k.prototype, "textToSpeech");
O([P("object")], k.prototype, "speechToText");
O([P("object")], k.prototype, "images");
O([P("object")], k.prototype, "gifs");
O([P("object")], k.prototype, "camera");
O([P("object")], k.prototype, "audio");
O([P("object")], k.prototype, "microphone");
O([P("object")], k.prototype, "mixedFiles");
O([P("object")], k.prototype, "dragAndDrop");
O([P("object")], k.prototype, "htmlWrappers");
O([P("object")], k.prototype, "htmlClassUtilities");
O([P("object")], k.prototype, "remarkable");
O([P("object")], k.prototype, "focusMode");
O([P("boolean")], k.prototype, "upwardsMode");
O([P("object")], k.prototype, "scrollButton");
O([P("object")], k.prototype, "hiddenMessages");
O([P("number")], k.prototype, "maxVisibleMessages");
O([P("function")], k.prototype, "onMessage");
O([P("function")], k.prototype, "onClearMessages");
O([P("function")], k.prototype, "onComponentRender");
O([P("function")], k.prototype, "onInput");
O([P("function")], k.prototype, "onError");
O([P("object")], k.prototype, "demo");
O([P("object")], k.prototype, "_insertKeyViewStyles");
customElements.define("deep-chat", k);
export { k as DeepChat };
