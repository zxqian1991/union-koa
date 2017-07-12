/// <reference types="koa" />
import * as Koa from "koa";
import { UnionApp } from '../index';
export declare function UnionRouterPlugin(config: UnionRouterPluginConfig): (ctx: Koa.Context, next: Function, app: UnionApp) => Promise<void>;
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
