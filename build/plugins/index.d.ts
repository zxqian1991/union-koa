/// <reference types="koa" />
import * as Koa from 'koa';
export declare class UnionPlugins {
    constructor(config: UnionPluginConfig[], app: Koa);
    app: Koa;
    private init();
    private plugins;
    private order(ifasync?);
}
export interface UnionPluginConfig {
    level?: number;
    name: string;
    module: any;
}
