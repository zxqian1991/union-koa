/**
 * 日志记录器
 */
import {WSAENOTEMPTY} from 'constants';
import {appendFile} from 'fs';
import * as log4js from 'log4js';
import * as path from 'path';
import {UnionAppConfig} from './default.config';
import { getFullPath } from 'union-util//path';
import { isString } from 'union-util//type';
import { fileExistsSync } from 'union-util//file';
import { deep } from 'union-util//merge';
const cwd : string = process.cwd();
const logs : string[] = [
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal"
];
function getDefaultConfig() {
    let obj : any = {
        root: path.join(cwd, "logs"),
        loggers: {
            default: {
                filename: ``
            }
        }
    };
    return obj;
};
function getDefaultAppenders(config : UnionLogConfig) {
    let appenders : any[] = [];
    let root = config.root || cwd;
    function initAppender(name : string, _config : any) {
        logs.forEach((type : string, index : number) => {
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
                filename: getFullPath(_filename
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
    };
    for (let logger in config.loggers) {
        initAppender(logger, config.loggers[logger]);
    }
    log4js.configure({appenders: appenders});
}
export default class UnionLog {
    constructor(config : any) {
        let me = this;
        me.initConfig(config)
        me.initLoggers();
    };
    // 初始化配置项
    private initConfig(config : any) {
        let me = this;
        config = config || {};
        // 如果是路径，加载该路径下内容
        if (isString(config) && fileExistsSync(config)) {
            config = require(getFullPath(config));
        };
        me.config = deep(getDefaultConfig(), config);
        return me.config;
    };
    private config : UnionLogConfig;
    private logger : log4js.Logger;
    // type 0 都输出 1 console  2 file
    private log(content : string, level : string = "trace", type : number = 0) {
        let me = this;
        let logger = UnionLog.getLogger("default");
        logger[level](content, type);
    };
    private initLoggers() {
        let me = this;
        getDefaultAppenders(me.config);
    };
    trace(content : string, type : number = 0
    // 后续支持，意义不大
    ) {
        let me = this;
        me.log(content, "trace", type);
    };
    debug(content : string, type : number = 0) {
        let me = this;
        me.log(content, "debug", type);
    };
    info(content : string, type : number = 0) {
        let me = this;
        me.log(content, "info", type);
    };
    warn(content : string, type : number = 0) {
        let me = this;
        me.log(content, "warn", type);
    };
    error(content : string, type : number = 0) {
        let me = this;
        me.log(content, "error", type);
    };
    fatal(content : string, type : number = 0) {
        let me = this;
        me.log(content, "fatal", type);
    };
    // 获取对应的logger
    static getLogger(type : string) {
        return new UnionSingleLogger(type);
    };
    // 动态的添加到某个文件中呢？怎么将内容动态的添加到某个动态的地址中
};
export class UnionSingleLogger {
    constructor(name : string) {
        let me = this;
        me.name = name;
    };
    private name : string;
    private log(logtype : string, content : string, outtype : number = 0) {
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
    trace(content : string, type : number = 0) {
        let me = this;
        me.log("trace", content, type);
        return me;
    };
    debug(content : string, type : number = 0) {
        let me = this;
        me.log("debug", content, type);
        return me;
    };
    info(content : string, type : number = 0) {
        let me = this;
        me.log("info", content, type);
        return me;
    };
    warn(content : string, type : number = 0) {
        let me = this;
        me.log("warn", content, type);
        return me;
    };
    error(content : string, type : number = 0) {
        let me = this;
        me.log("error", content, type);
        return me;
    };
    fatal(content : string, type : number = 0) {
        let me = this;
        me.log("fatal", content, type);
        return me;
    };
}
export interface UnionLogConfig {
    root : string;
    default : {
        [props : string]: {
            date: boolean;
            filename: string;
            path?: string | string[]
        }
    },
    loggers : {
        [logname : string]: {
            date: boolean;
            filename: string;
            path?: string | string[];
        }
    },
    layout?: string;
};