"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const path = require("path");
const path_1 = require("union-util//path");
const type_1 = require("union-util//type");
const file_1 = require("union-util//file");
const merge_1 = require("union-util//merge");
const cwd = process.cwd();
const logs = [
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal"
];
function getDefaultConfig() {
    let obj = {
        root: path.join(cwd, "logs"),
        loggers: {
            default: {
                filename: ``
            }
        }
    };
    return obj;
}
;
function getDefaultAppenders(config) {
    let appenders = [];
    let root = config.root || cwd;
    function initAppender(name, _config) {
        logs.forEach((type, index) => {
            _config.filename = _config.filename || `${name}.log`;
            let _filename = _config.filename;
            let dir = path.dirname(_filename);
            let extname = path.extname(_filename);
            let basename = path.basename(_filename, extname);
            _filename = path.join(dir, `${basename}/${type}${extname}`);
            let fileappender = {
                type: "DateFile",
                category: [
                    `${type}-file-${name}`, `${type}-${name}`, `${type}-file`, `${type}`
                ],
                filename: path_1.getFullPath(_filename
                    ? _filename
                    : `${name}/${type}.log`, root),
                pattern: "-yyyy-MM-dd.log",
                alwaysIncludePattern: true
            };
            let consoleappender = {
                type: "console",
                category: [`${type}-${name}`, `${type}-console-${name}`, `${type}-console`, `${type}`]
            };
            appenders.push(fileappender);
            appenders.push(consoleappender);
        });
    }
    ;
    for (let logger in config.loggers) {
        initAppender(logger, config.loggers[logger]);
    }
    log4js.configure({ appenders: appenders });
}
class UnionLog {
    constructor(config) {
        let me = this;
        me.initConfig(config);
        me.initLoggers();
    }
    ;
    // 初始化配置项
    initConfig(config) {
        let me = this;
        config = config || {};
        // 如果是路径，加载该路径下内容
        if (type_1.isString(config) && file_1.fileExistsSync(config)) {
            config = require(path_1.getFullPath(config));
        }
        ;
        me.config = merge_1.deep(getDefaultConfig(), config);
        return me.config;
    }
    ;
    // type 0 都输出 1 console  2 file
    log(content, level = "trace", type = 0) {
        let me = this;
        let logger = UnionLog.getLogger("default");
        logger[level](content, type);
    }
    ;
    initLoggers() {
        let me = this;
        getDefaultAppenders(me.config);
    }
    ;
    trace(content, type = 0
        // 后续支持，意义不大
    ) {
        let me = this;
        me.log(content, "trace", type);
    }
    ;
    debug(content, type = 0) {
        let me = this;
        me.log(content, "debug", type);
    }
    ;
    info(content, type = 0) {
        let me = this;
        me.log(content, "info", type);
    }
    ;
    warn(content, type = 0) {
        let me = this;
        me.log(content, "warn", type);
    }
    ;
    error(content, type = 0) {
        let me = this;
        me.log(content, "error", type);
    }
    ;
    fatal(content, type = 0) {
        let me = this;
        me.log(content, "fatal", type);
    }
    ;
    // 获取对应的logger
    static getLogger(type) {
        return new UnionSingleLogger(type);
    }
    ;
}
exports.default = UnionLog;
;
class UnionSingleLogger {
    constructor(name) {
        let me = this;
        me.name = name;
    }
    ;
    log(logtype, content, outtype = 0) {
        let me = this;
        let str = outtype == 0
            ? `${logtype}-${me.name}`
            : (outtype == 1
                ? `${logtype}-console-${me.name}`
                : (outtype == 2
                    ? `${logtype}-file-${me.name}`
                    : `${logtype}`));
        let logger = log4js.getLogger(str);
        logger[logtype](content);
    }
    trace(content, type = 0) {
        let me = this;
        me.log("trace", content, type);
    }
    ;
    debug(content, type = 0) {
        let me = this;
        me.log("debug", content, type);
    }
    ;
    info(content, type = 0) {
        let me = this;
        me.log("info", content, type);
    }
    ;
    warn(content, type = 0) {
        let me = this;
        me.log("warn", content, type);
    }
    ;
    error(content, type = 0) {
        let me = this;
        me.log("error", content, type);
    }
    ;
    fatal(content, type = 0) {
        let me = this;
        me.log("fatal", content, type);
    }
    ;
}
exports.UnionSingleLogger = UnionSingleLogger;
;
