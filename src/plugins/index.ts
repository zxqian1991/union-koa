import * as Koa from 'koa';
import * as UnionArray from 'union-util/array';
import {order} from 'union-util/sort';
import {FindPExtraValue, find} from 'union-util/array';
export class UnionPlugins {
    constructor(config : UnionPluginConfig[], app : Koa) {
        let me = this;
        me.plugins = config;
        me.app = app;
        me.init();
    };
    app : Koa;
    private init() {
        let me = this;
        // 进行一次排序
        me.order();
        me
            .app
            .use(async(ctx : Koa.Context, next : Function) => {
                let i = 0;
                async function exec(){
                    if(i < me.plugins.length) {
                        await me.plugins[i].module(ctx,async function(){
                            ++i;
                            await exec();
                        })
                    }
                };
                await exec();
            });
    }
    private plugins : UnionPluginConfig[] = [];
    // 注册插件
    private order(ifasync : boolean = true) {
        let me = this;
        order(me.plugins, true, false, function (value : UnionPluginConfig) {
            value.level = value.level || 1;
            return value.level;
        })
    };
};
export interface UnionPluginConfig {
    level
        ?
        : number;
    name : string;
    module : any;
};
// export interfacee