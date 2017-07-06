import * as Koa from 'koa';
import * as UnionArray from 'union-util/array';
import {order} from 'union-util/sort';
import {FindPExtraValue} from 'union-util/array';
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
            .plugins
            .forEach((plugin : UnionPluginConfig) => {
                if (!plugin.before || !(plugin.before instanceof Array)) {
                    plugin.before = [];
                };
                me.usePlugin(plugin);
            });
    }
    private usePlugin(plugin : UnionPluginConfig) {
        let me = this;
        me
            .app
            .use(async function (ctx : Koa.Context, next : Function) {
                let index = 0;
                async function walk() {
                    if (index < plugin.before.length) {
                        await plugin
                            .before[index]
                            .module(ctx, async function () {
                                index++;
                                await walk();
                            },me.app);
                        index++;
                        await walk();
                    }
                }
                await walk();
                await plugin.module(ctx, async function () {
                    await next();
                });
            });
    }
    private plugins : UnionPluginConfig[] = [];
    // 注册插件

    async addPlugin(name : string, _module : Function, level : number = 1, _map : (value : UnionPluginConfig, index : number, extra?: FindPExtraValue) => Promise < boolean >, after : boolean = true) {
        let me = this;
        _map = async function (value : UnionPluginConfig, index : number, extra : FindPExtraValue) {
            if (level < value.level) {
                extra.index = index;
            } else {
                if (index == me.plugins.length - 1) {
                    extra.index = index + 1;
                }
            }
            return level < value.level;
        };
        let plugin : UnionPluginConfig = {
            name: name,
            module: _module,
            level: level,
            before: []
        };
        let extra : FindPExtraValue = await UnionArray.findPro(me.plugins, async function (_p : UnionPluginConfig, _i : number, extra : FindPExtraValue) {
            return await _map(_p, _i, extra);
        });

        let insertIndex = extra.index;
        if (insertIndex >= me.plugins.length) {
            me.usePlugin(plugin);
        } else {
            me.plugins[insertIndex].before.push(plugin);
        };
        me
            .plugins
            .splice(insertIndex, 0, plugin);
    };
    private order(ifasync : boolean = true) {
        let me = this;
        order(me.plugins, true, false, function (value : UnionPluginConfig) {
            value.level = value.level || 1;
            return value.level;
        })
    };
};
export interface UnionPluginConfig {
    level? : number;
    name : string;
    module : any;
    before?: UnionPluginConfig[]
};
// export interfacee