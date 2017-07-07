"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnionArray = require("union-util/array");
const sort_1 = require("union-util/sort");
class UnionPlugins {
    constructor(config, app) {
        this.plugins = [];
        let me = this;
        me.plugins = config;
        me.app = app;
        me.init();
    }
    ;
    init() {
        let me = this;
        // 进行一次排序
        me.order();
        me
            .plugins
            .forEach((plugin) => {
            if (typeof plugin == "function") {
                plugin = plugin(me.app);
            }
            ;
            if (!plugin.before || !(plugin.before instanceof Array)) {
                plugin.before = [];
            }
            ;
            me.usePlugin(plugin);
        });
    }
    usePlugin(plugin) {
        let me = this;
        me
            .app
            .use(async function (ctx, next) {
            let index = 0;
            async function walk() {
                if (index < plugin.before.length) {
                    await plugin
                        .before[index]
                        .module(ctx, async function () {
                        index++;
                        await walk();
                    }, me.app);
                    index++;
                    await walk();
                }
            }
            await walk();
            await plugin.module(ctx, async function () {
                await next();
            }, me.app);
        });
    }
    // 注册插件
    async addPlugin(name, _module, level = 1, _map, after = true) {
        let me = this;
        _map = async function (value, index, extra) {
            if (level < value.level) {
                extra.index = index;
            }
            else {
                if (index == me.plugins.length - 1) {
                    extra.index = index + 1;
                }
            }
            return level < value.level;
        };
        let plugin = {
            name: name,
            module: _module,
            level: level,
            before: []
        };
        let extra = await UnionArray.findPro(me.plugins, async function (_p, _i, extra) {
            return await _map(_p, _i, extra);
        });
        let insertIndex = extra.index;
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
    }
    ;
    order(ifasync = true) {
        let me = this;
        sort_1.order(me.plugins, true, false, function (value) {
            value.level = value.level || 1;
            return value.level;
        });
    }
    ;
}
exports.UnionPlugins = UnionPlugins;
;
;
// export interfacee 
