import { UnionPluginConfig } from './plugins/index';
export interface UnionAppConfig {
    port: number;
    static?: string;
    logger?: string | {};
    plugins?: UnionPluginConfig[];
}
declare const defaultConfig: UnionAppConfig;
export default defaultConfig;
