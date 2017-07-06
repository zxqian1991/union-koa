const path = require("path");
const nuxtPlugin = require("./build/plugins/nuxt").nuxtPlugin;
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
        name: "nuxt",
        module: nuxtPlugin(require("./nuxt.config")),
        level: 1
    }]
};