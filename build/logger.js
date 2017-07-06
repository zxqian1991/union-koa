"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js = require("log4js");
var path = require("path");
var path_1 = require("union-util//path");
var type_1 = require("union-util//type");
var file_1 = require("union-util//file");
var merge_1 = require("union-util//merge");
var cwd = process.cwd();
var logs = [
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal"
];
function getDefaultConfig() {
    var obj = {
        root: path.join(cwd, "logs"),
        loggers: {
            default: {
                filename: ""
            }
        }
    };
    return obj;
}
;
function getDefaultAppenders(config) {
    var appenders = [];
    var root = config.root || cwd;
    function initAppender(name, _config) {
        logs.forEach(function (type, index) {
            _config.filename = _config.filename || name + ".log";
            var _filename = _config.filename;
            var dir = path.dirname(_filename);
            var extname = path.extname(_filename);
            var basename = path.basename(_filename, extname);
            _filename = path.join(dir, basename + "/" + type + extname);
            var fileappender = {
                type: "DateFile",
                category: [
                    type + "-file-" + name, type + "-" + name, type + "-file", "" + type
                ],
                filename: path_1.getFullPath(_filename
                    ? _filename
                    : name + "/" + type + ".log", root),
                pattern: "-yyyy-MM-dd.log",
                alwaysIncludePattern: true
            };
            var consoleappender = {
                type: "console",
                category: [type + "-" + name, type + "-console-" + name, type + "-console", "" + type]
            };
            appenders.push(fileappender);
            appenders.push(consoleappender);
        });
    }
    ;
    for (var logger in config.loggers) {
        initAppender(logger, config.loggers[logger]);
    }
    log4js.configure({ appenders: appenders });
}
var UnionLog = (function () {
    function UnionLog(config) {
        var me = this;
        me.initConfig(config);
        me.initLoggers();
    }
    ;
    // 初始化配置项
    UnionLog.prototype.initConfig = function (config) {
        var me = this;
        config = config || {};
        // 如果是路径，加载该路径下内容
        if (type_1.isString(config) && file_1.fileExistsSync(config)) {
            config = require(path_1.getFullPath(config));
        }
        ;
        me.config = merge_1.deep(getDefaultConfig(), config);
        return me.config;
    };
    ;
    // type 0 都输出 1 console  2 file
    UnionLog.prototype.log = function (content, level, type) {
        if (level === void 0) { level = "trace"; }
        if (type === void 0) { type = 0; }
        var me = this;
        var logger = UnionLog.getLogger("default");
        logger[level](content, type);
    };
    ;
    UnionLog.prototype.initLoggers = function () {
        var me = this;
        getDefaultAppenders(me.config);
    };
    ;
    UnionLog.prototype.trace = function (content, type
        // 后续支持，意义不大
    ) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log(content, "trace", type);
    };
    ;
    UnionLog.prototype.debug = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log(content, "debug", type);
    };
    ;
    UnionLog.prototype.info = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log(content, "info", type);
    };
    ;
    UnionLog.prototype.warn = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log(content, "warn", type);
    };
    ;
    UnionLog.prototype.error = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log(content, "error", type);
    };
    ;
    UnionLog.prototype.fatal = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log(content, "fatal", type);
    };
    ;
    // 获取对应的logger
    UnionLog.getLogger = function (type) {
        return new UnionSingleLogger(type);
    };
    ;
    return UnionLog;
}());
exports.default = UnionLog;
;
var UnionSingleLogger = (function () {
    function UnionSingleLogger(name) {
        var me = this;
        me.name = name;
    }
    ;
    UnionSingleLogger.prototype.log = function (logtype, content, outtype) {
        if (outtype === void 0) { outtype = 0; }
        var me = this;
        var str = outtype == 0
            ? logtype + "-" + me.name
            : (outtype == 1
                ? logtype + "-console-" + me.name
                : (outtype == 2
                    ? logtype + "-file-" + me.name
                    : "" + logtype));
        var logger = log4js.getLogger(str);
        logger[logtype](content);
    };
    UnionSingleLogger.prototype.trace = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log("trace", content, type);
    };
    ;
    UnionSingleLogger.prototype.debug = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log("debug", content, type);
    };
    ;
    UnionSingleLogger.prototype.info = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log("info", content, type);
    };
    ;
    UnionSingleLogger.prototype.warn = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log("warn", content, type);
    };
    ;
    UnionSingleLogger.prototype.error = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log("error", content, type);
    };
    ;
    UnionSingleLogger.prototype.fatal = function (content, type) {
        if (type === void 0) { type = 0; }
        var me = this;
        me.log("fatal", content, type);
    };
    ;
    return UnionSingleLogger;
}());
exports.UnionSingleLogger = UnionSingleLogger;
;
