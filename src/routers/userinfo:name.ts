import * as Koa from 'koa';
import { UnionApp } from '../index';
import { UnionSingleLogger } from '../logger';
module.exports = async function(ctx: Koa.Context,next: Function,data: {
    name: string,
    id:string
},app:UnionApp){
    ctx.body = "aS";
    let logger: UnionSingleLogger = new UnionSingleLogger("qianzhixiang");
    console.log(app);
    console.log(data);
}