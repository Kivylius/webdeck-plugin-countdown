(self['webpackChunkwebdeck_plugin_countdown'] = self['webpackChunkwebdeck_plugin_countdown'] || []).push([["990"], {
"251": (function (__unused_webpack_module, exports, __webpack_require__) {
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var f = __webpack_require__(/*! react */"302"), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for(b in a)m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for(b in a = c.defaultProps, a)void 0 === d[b] && (d[b] = a[b]);
    return {
        $$typeof: k,
        type: c,
        key: e,
        ref: h,
        props: d,
        _owner: n.current
    };
}
exports.Fragment = l;
exports.jsx = q;
exports.jsxs = q;
}),
"893": (function (module, __unused_webpack_exports, __webpack_require__) {
'use strict';
module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.production.min.js */"251");
}),
"130": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return __WEBPACK_DEFAULT_EXPORT__; },
  init: function() { return init; },
  manifest: function() { return manifest; }
});
/* harmony import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */"893");
/* harmony import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */"302");
/* harmony import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _define_property(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
    return target;
}


 var manifest = {
    version: 1,
    bespoke: true
};
 var init = function(param) {
    var drawKey = param.drawKey, getConfig = param.getConfig;
    var render = function() {
        var _ref = getConfig() || {}, targetDate = _ref.targetDate, label = _ref.label;
        var today = new Date();
        var goal = targetDate ? new Date("".concat(targetDate, "T00:00:00")) : null;
        // Fallback if config is empty
        var diffDays = goal ? Math.max(0, Math.ceil((goal - today) / 86400000)) : 0;
        drawKey(function(param) {
            var ctx = param.ctx, canvas = param.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // Big number
            ctx.font = "28px sans-serif";
            ctx.fillText(diffDays, canvas.width / 2, canvas.height / 2 - 6);
            // Small label
            ctx.font = "10px sans-serif";
            ctx.fillText(label || "days", canvas.width / 2, canvas.height / 2 + 16);
        });
    };
    // draw immediately and then once a day just after midnight
    render();
    var now = new Date();
    var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
    var timer = setTimeout(function() {
        render();
        setInterval(render, 86400000); // every 24 h
    }, next - now);
    // add a listener to re-render on config changes
    window.addEventListener("webdeck-plugin-countdown:update", render);
    // destructor
    return function() {
        clearTimeout(timer);
        window.removeEventListener("webdeck-plugin-countdown:update", render);
    };
};
var App = function(param) {
    var _param_config = param.config, config = _param_config === void 0 ? {} : _param_config, setConfig = param.setConfig;
    var _config_targetDate = config.targetDate, targetDate = _config_targetDate === void 0 ? "" : _config_targetDate, _config_label = config.label, label = _config_label === void 0 ? "" : _config_label;
    // live preview in sidebar while editing
    (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {
        if (!targetDate) return;
        var event = new CustomEvent("webdeck-plugin-countdown:update"); // hot-reload helper
        window.dispatchEvent(event);
    }, [
        targetDate,
        label
    ]);
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            padding: 12,
            fontFamily: "sans-serif",
            backgroundColor: "#f0f0f0",
            color: "#000"
        },
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                children: "Countdown Plugin"
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "setting",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "targetDate",
                        children: "Target date:\xa0"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "date",
                        id: "targetDate",
                        name: "targetDate",
                        value: targetDate,
                        onChange: function(e) {
                            return setConfig(_object_spread_props(_object_spread({}, config), {
                                targetDate: e.target.value
                            }));
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "setting",
                style: {
                    marginTop: 8
                },
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "label",
                        children: "Label:\xa0"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "text",
                        id: "label",
                        name: "label",
                        placeholder: "Days left",
                        value: label,
                        onChange: function(e) {
                            return setConfig(_object_spread_props(_object_spread({}, config), {
                                label: e.target.value
                            }));
                        }
                    })
                ]
            })
        ]
    });
};
var __WEBPACK_DEFAULT_EXPORT__ = App;
}),

}]);
//# sourceMappingURL=990.js.map