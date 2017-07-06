const Nuxt = require("nuxt");
import * as Koa from "koa";
export function nuxtPlugin(config : any) {
    let nuxt : any;
    return async function (ctx : Koa.Context, next : Function) {
        if (!nuxt) {
            nuxt = await new Nuxt(config);
            if (config.dev) {
                try {
                    await nuxt.build()
                } catch (e) {
                    console.error(e) // eslint-disable-line no-console
                    process.exit(1)
                }
            };
        };
        ctx.status = 200 // koa defaults to 404 when it sees that status is unset
        await nuxt.render(ctx.req, ctx.res)
    };
}