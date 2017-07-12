const path = require("path");
const nuxtPlugin = require("./build/plugins/nuxt").nuxtPlugin;
const routerPlugin = require("./build/plugins/router").UnionRouterPlugin;
const logger = require("koa-logger");
module.exports = {
    port: 11342,
    logger: {
        root: path.join(__dirname, "logs"),
        loggers: {
            "qianzhixiang": {
                filename: "qianzhixiang.log"
            }
        }
    },
    plugins: [{
        name: "logger",
        module: logger(),
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
        module: nuxtPlugin(require("./nuxt.config")),
        level: 1,
        enable: true
    }]
};