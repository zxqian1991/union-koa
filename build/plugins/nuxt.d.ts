/// <reference types="koa" />
import * as Koa from "koa";
export declare function nuxtPlugin(config: any): (ctx: Koa.Context, next: Function) => Promise<void>;
