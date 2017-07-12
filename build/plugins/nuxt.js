"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nuxt = require("nuxt");
function nuxtPlugin(config) {
    let nuxt;
    nuxt = new Nuxt(config);
    return async function (ctx, next, app) {
        if (config.dev) {
            try {
                await nuxt.build();
            }
            catch (e) {
                console.error(e); // eslint-disable-line no-console
                process.exit(1);
            }
        }
        ;
        ctx.status = 200; // koa defaults to 404 when it sees that status is unsets
        await nuxt.render(ctx.req, ctx.res);
    };
}
exports.nuxtPlugin = nuxtPlugin;
;
