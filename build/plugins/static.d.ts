/// <reference types="koa" />
import * as Koa from "koa";
/**
 *
 * @param ctx 静态文件匹配
 * @param next
 */
export declare function staticPlugin(ctx: Koa.Context, next: Function): Promise<void>;
