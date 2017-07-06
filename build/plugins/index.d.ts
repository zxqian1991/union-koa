/// <reference types="koa" />
import * as Koa from 'koa';
import { FindPExtraValue } from 'union-util/array';
export declare class UnionPlugins {
    constructor(config: UnionPluginConfig[], app: Koa);
    app: Koa;
    private init();
    private usePlugin(plugin);
    private plugins;
    addPlugin(name: string, _module: Function, level: number, _map: (value: UnionPluginConfig, index: number, extra?: FindPExtraValue) => Promise<boolean>, after?: boolean): Promise<void>;
    private order(ifasync?);
}
export interface UnionPluginConfig {
    level?: number;
    name: string;
    module: any;
    before?: UnionPluginConfig[];
}
