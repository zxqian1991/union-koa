/// <reference types="koa" />
import * as Koa from "koa";
export declare function routerPlugin(config: UnionRouterConfig): (ctx: Koa.Context, next: Function, app: Koa) => Promise<void>;
export interface UnionRouterConfig {
    src: string;
}
