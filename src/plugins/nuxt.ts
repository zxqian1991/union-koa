const Nuxt = require("nuxt");
import * as Koa from "koa";
import * as EventEmitter from "events";
export function nuxtPlugin(config : any) {
    let nuxt : any;
    nuxt = new Nuxt(config);
    return async function (ctx : Koa.Context, next : Function, app : Koa) {
        if (config.dev) {
            try {
                await nuxt.build()
            } catch (e) {
                console.error(e) // eslint-disable-line no-console
                process.exit(1)
            }
        };
        ctx.status = 200 // koa defaults to 404 when it sees that status is unsets
        await nuxt.render(ctx.req, ctx.res);
    };
};