const path = require("path");
const routerPlugin = require("./build/plugins/router").UnionRouterPlugin;
const logger = require("koa-logger");
module.exports = async function(app) {
    return {
        port: 11342,
        logger: {
            root: path.join(__dirname, "logs"),
            loggers: {
                "qianzhixiang": {
                    filename: "qianzhixiang"
                }
            }
        },
        plugins: [{
                name: "session",
                module: require('koa-session')({}, app),
                level: 0,
                enable: true
            },
            {
                name: "test",
                module: async function(ctx, next, app) {
                    let res = ctx.res;
                    await next();
                },
                enable: true
            },
            {
                name: "logger",
                module: logger(),
                level: 0,
                enable: true

            },
            {
                name: "static",
                module: require("koa-static")(path.join(__dirname, "web")),
                level: 0,
                enable: true
            }, {
                name: "router",
                module: routerPlugin({
                    src: "build/routers"
                }),
                level: 0,
                enable: true
            }, {
                name: "nuxt",
                enable: true,
                module: require("./build/plugins/nuxt").nuxtPlugin(require("./nuxt.config.js"))
            }
        ]
    };
};