const path = require("path");
const nuxtPlugin = require("./build/plugins/nuxt").nuxtPlugin;
const routerPlugin = require("./build/plugins/router").routerPlugin;
module.exports = {
    port: 11342,
    logger: {
        root: path.join(__dirname, "logs"),
        loggers: {
            "qianzhixiang": {
                filename: "qianzhiasasxiang.log"
            }
        }
    },
    plugins: [{
        name: "router",
        module: routerPlugin({
            src: "router"
        }),
        level: 0
    }, {
        name: "nuxt",
        module: nuxtPlugin(require("./nuxt.config")),
        level: 1
    }]
};