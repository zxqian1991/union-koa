const path = require("path");
module.exports = {
    srcDir: path.join(__dirname, "./src/nuxt"),
    cache: true,
    dev: process.env.NODE_ENV != "production",
    css: [
        "iview/dist/styles/iview.css"
    ],
    plugins: [{
        src: "~plugins/iview",
        ssr: true
    }],
    performance: {

    },
    build: {
        vender: [
            "axios",
            "rxjs"
        ],
        loaders: [{
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000, // 1KO
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000, // 1 KO
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ],
        extend(config) {
            for (rule of config.module.rules) {
                if (rule.loader === 'vue-loader') {
                    rule.query.loaders.ts = 'ts-loader?{"appendTsSuffixTo":["\\\\.vue$"],"compilerOptions":{"target": "es5","allowSyntheticDefaultImports": true}}'
                }
            }
        }
    }
};