/// <reference types="koa" />
import "colors";
import * as Koa from "koa";
import UnionLog from "./logger";
import { UnionAppConfig } from './default.config';
import { UnionPlugins } from './plugins/index';
export declare class UnionApp {
    constructor(config: UnionAppConfig | string);
    logger: UnionLog;
    app: Koa;
    config: UnionAppConfig;
    plugins: UnionPlugins;
    initConfig(config: any): Promise<void>;
    initApp(): Promise<void>;
}
