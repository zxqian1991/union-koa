"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var UnionArray = require("union-util/array");
var sort_1 = require("union-util/sort");
var UnionPlugins = (function () {
    function UnionPlugins(config, app) {
        this.plugins = [];
        var me = this;
        me.plugins = config;
        me.app = app;
        me.init();
    }
    ;
    UnionPlugins.prototype.init = function () {
        var me = this;
        // 进行一次排序
        me.order();
        me
            .plugins
            .forEach(function (plugin) {
            if (!plugin.before || !(plugin.before instanceof Array)) {
                plugin.before = [];
            }
            ;
            me.usePlugin(plugin);
        });
    };
    UnionPlugins.prototype.usePlugin = function (plugin) {
        var me = this;
        me
            .app
            .use(function (ctx, next) {
            return __awaiter(this, void 0, void 0, function () {
                function walk() {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(index < plugin.before.length)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, plugin
                                            .before[index]
                                            .module(ctx, function () {
                                            return __awaiter(this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            index++;
                                                            return [4 /*yield*/, walk()];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        }, me.app)];
                                case 1:
                                    _a.sent();
                                    index++;
                                    return [4 /*yield*/, walk()];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                }
                var index;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            index = 0;
                            return [4 /*yield*/, walk()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, plugin.module(ctx, function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, next()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }, me.app)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    // 注册插件
    UnionPlugins.prototype.addPlugin = function (name, _module, level, _map, after) {
        if (level === void 0) { level = 1; }
        if (after === void 0) { after = true; }
        return __awaiter(this, void 0, void 0, function () {
            var me, plugin, extra, insertIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        _map = function (value, index, extra) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (level < value.level) {
                                        extra.index = index;
                                    }
                                    else {
                                        if (index == me.plugins.length - 1) {
                                            extra.index = index + 1;
                                        }
                                    }
                                    return [2 /*return*/, level < value.level];
                                });
                            });
                        };
                        plugin = {
                            name: name,
                            module: _module,
                            level: level,
                            before: []
                        };
                        return [4 /*yield*/, UnionArray.findPro(me.plugins, function (_p, _i, extra) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, _map(_p, _i, extra)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            })];
                    case 1:
                        extra = _a.sent();
                        insertIndex = extra.index;
                        if (insertIndex >= me.plugins.length) {
                            me.usePlugin(plugin);
                        }
                        else {
                            me.plugins[insertIndex].before.push(plugin);
                        }
                        ;
                        me
                            .plugins
                            .splice(insertIndex, 0, plugin);
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    UnionPlugins.prototype.order = function (ifasync) {
        if (ifasync === void 0) { ifasync = true; }
        var me = this;
        sort_1.order(me.plugins, true, false, function (value) {
            value.level = value.level || 1;
            return value.level;
        });
    };
    ;
    return UnionPlugins;
}());
exports.UnionPlugins = UnionPlugins;
;
;
// export interfacee 
