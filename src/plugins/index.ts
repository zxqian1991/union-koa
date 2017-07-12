import * as Koa from 'koa';
import * as UnionArray from 'union-util/array';
import {find, FindPExtraValue} from 'union-util/array';
import {order} from 'union-util/sort';
import {UnionApp} from '../index';
export class UnionPlugins {
    constructor(config : UnionPluginConfig[], app : UnionApp) {
        let me = this;
        me.plugins = config;
        me.app = app;
        me.init();
    };
    app : UnionApp;
    private init() {
        let me = this;
        // 进行一次排序
        me.order();
        me
            .app
            .koa
            .use(async(ctx : Koa.Context, next : Function) => {
                let i = 0;
                async function exec() {
                    if (i < me.plugins.length) {
                        if (me.plugins[i].enable == undefined || !me.plugins[i].enable) {
                            // 不允许的时候 直接越过
                            ++i;
                            await exec();
                        } else {
                            await me.plugins[i].module(ctx, async function () {
                                    ++i;
                                    await exec();
                                }, me.app);
                        }
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
    enable?: boolean;
};
// export interfacee