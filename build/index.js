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
require("colors");
var Koa = require("koa");
var default_config_1 = require("./default.config");
var path_1 = require("union-util/path");
var logger_1 = require("./logger");
var interface_1 = require("union-util/interface");
var merge_1 = require("union-util//merge");
var index_1 = require("./plugins/index");
var UnionApp = (function () {
    function UnionApp(config) {
        var _this = this;
        var me = this;
        if (!config || typeof config == "string") {
            config = require(path_1.getFullPath(config || "upp.config.js"));
        }
        ;
        me.initConfig(config).then(function () { return __awaiter(_this, void 0, void 0, function () {
            var logger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me.logger = new logger_1.default(me.config.logger);
                        me.logger.info("\u6B63\u5728\u542F\u52A8\u7A0B\u5E8F\u8BF7\u7A0D\u540E...".blue);
                        process.env.PORT = me.config.port.toString();
                        me.app = new Koa();
                        return [4 /*yield*/, me.initApp()];
                    case 1:
                        _a.sent();
                        me.app.listen(me.config.port);
                        me.logger.info(("\u7A0B\u5E8F\u5DF2\u542F\u52A8,\u8BF7\u8BBF\u95EE" + interface_1.getBeautyStrOfIp(me.config.port)).cyan);
                        logger = logger_1.default.getLogger("qianzhixiang");
                        return [2 /*return*/];
                }
            });
        }); });
    }
    ;
    // 初始化配置
    UnionApp.prototype.initConfig = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var me;
            return __generator(this, function (_a) {
                me = this;
                me.config = merge_1.deep(default_config_1.default, config);
                return [2 /*return*/];
            });
        });
    };
    ;
    // 初始化app
    UnionApp.prototype.initApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me;
            return __generator(this, function (_a) {
                me = this;
                me.plugins = new index_1.UnionPlugins(me.config.plugins, me.app);
                return [2 /*return*/];
            });
        });
    };
    return UnionApp;
}());
exports.UnionApp = UnionApp;
;
