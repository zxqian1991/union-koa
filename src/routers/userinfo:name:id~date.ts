import * as Koa from "koa";
module.exports = async function(ctx: Koa.Context,next: Function,data: {
    name: string,
    id:string
}){
    ctx.body = "aS";
    console.log(data);
}