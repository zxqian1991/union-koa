"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const Koa = require("koa");
const default_config_1 = require("./default.config");
const path_1 = require("union-util/path");
const logger_1 = require("./logger");
const interface_1 = require("union-util/interface");
const merge_1 = require("union-util//merge");
const index_1 = require("./plugins/index");
class UnionApp {
    constructor(config) {
        let me = this;
        me.koa = new Koa();
        me.initConfig(config).then(async () => {
            me.logger = new logger_1.default(me.config.logger);
            me.logger.info(`正在启动程序请稍后...`.blue);
            process.env.PORT = me.config.port.toString();
            await me.initApp();
            me.koa.listen(me.config.port);
            me.logger.info(`程序已启动,请访问${interface_1.getBeautyStrOfIp(me.config.port)}`.cyan);
            let logger = logger_1.default.getLogger("qianzhixiang");
        });
    }
    ;
    // 初始化配置
    async initConfig(config) {
        let me = this;
        if (!config || typeof config == "string") {
            config = require(path_1.getFullPath(config || "upp.config.js"));
        }
        ;
        if (typeof config == "function") {
            config = await config(me.koa);
        }
        ;
        me.config = merge_1.deep(default_config_1.default, config);
    }
    ;
    // 初始化app
    async initApp() {
        let me = this;
        me.plugins = new index_1.UnionPlugins(me.config.plugins, me);
    }
}
exports.UnionApp = UnionApp;
;
