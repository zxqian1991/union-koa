"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            .app
            .koa
            .use(async (ctx, next) => {
            let i = 0;
            async function exec() {
                if (i < me.plugins.length) {
                    if (me.plugins[i].enable == undefined || !me.plugins[i].enable) {
                        // 不允许的时候 直接越过
                        ++i;
                        await exec();
                    }
                    else {
                        await me.plugins[i].module(ctx, async function () {
                            ++i;
                            await exec();
                        }, me.app);
                    }
                }
            }
            ;
            await exec();
        });
    }
    // 注册插件
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
