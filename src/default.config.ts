import { UnionPluginConfig } from './plugins/index';
import * as path from "path";
export interface UnionAppConfig {
    port: number;
    static?: string;
    logger?: string | {

    },
    plugins?: UnionPluginConfig[]
}
const defaultConfig: UnionAppConfig = {
    port: 8080,
    static: path.resolve("static")
};
export default defaultConfig;