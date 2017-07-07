import "colors";
import * as Koa from "koa";
import * as path from "path";
import defaultConfig from "./default.config";
import {getFullPath} from "union-util/path";
import UnionLog from "./logger";
import { UnionAppConfig } from './default.config';
import { getBeautyStrOfIp } from 'union-util/interface';
import { deep } from 'union-util//merge';
import { UnionPlugins } from './plugins/index';
export class UnionApp {
    constructor(config : UnionAppConfig | string) {
        let me = this;
        if(!config || typeof config == "string") {
            config = require(getFullPath((config as string) || "upp.config.js"))
        };
        me.initConfig(config).then(async ()=>{
            me.logger = new UnionLog(me.config.logger);
            me.logger.info(`正在启动程序请稍后...`.blue);
            process.env.PORT = me.config.port.toString();
            me.koa = new Koa();
            await me.initApp();
            me.koa.listen(me.config.port);
            me.logger.info(`程序已启动,请访问${getBeautyStrOfIp(me.config.port)}`.cyan);
            let logger = UnionLog.getLogger("qianzhixiang");
        });
    };
    logger: UnionLog;
    koa: Koa;
    config: UnionAppConfig;
    plugins: UnionPlugins;
    // 初始化配置
    private async initConfig(config:any){
        let me = this;
        me.config = deep(defaultConfig,config);
    };
    // 初始化app
    private async initApp(){
        let me = this;
        me.plugins = new UnionPlugins(me.config.plugins,me.koa);
    }
};