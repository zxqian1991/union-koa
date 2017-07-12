/// <reference types="koa" />
import * as Koa from "koa";
export declare function UnionRouterPlugin(config: UnionRouterPluginConfig): (ctx: Koa.Context, next: Function) => Promise<void>;
export interface UnionRouterPluginConfig {
    src?: string;
}
export interface UnionRouterValue {
    vars: any[];
    path: string;
    method: string;
}
export interface UnionRouterFormatValue {
    path: string;
    data: {
        [prop: string]: string;
    };
    method: string;
}
