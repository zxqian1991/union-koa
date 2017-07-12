import { UnionApp } from '../index';
export declare class UnionPlugins {
    constructor(config: UnionPluginConfig[], app: UnionApp);
    app: UnionApp;
    private init();
    private plugins;
    private order(ifasync?);
}
export interface UnionPluginConfig {
    level?: number;
    name: string;
    module: any;
    enable?: boolean;
}
