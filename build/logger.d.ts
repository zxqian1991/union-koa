export default class UnionLog {
    constructor(config: any);
    private initConfig(config);
    private config;
    private logger;
    private log(content, level?, type?);
    private initLoggers();
    trace(content: string, type?: number): void;
    debug(content: string, type?: number): void;
    info(content: string, type?: number): void;
    warn(content: string, type?: number): void;
    error(content: string, type?: number): void;
    fatal(content: string, type?: number): void;
    static getLogger(type: string): UnionSingleLogger;
}
export declare class UnionSingleLogger {
    constructor(name: string);
    private name;
    private log(logtype, content, outtype?);
    trace(content: string, type?: number): void;
    debug(content: string, type?: number): void;
    info(content: string, type?: number): void;
    warn(content: string, type?: number): void;
    error(content: string, type?: number): void;
    fatal(content: string, type?: number): void;
}
export interface UnionLogConfig {
    root: string;
    default: {
        [props: string]: {
            date: boolean;
            filename: string;
            path?: string | string[];
        };
    };
    loggers: {
        [logname: string]: {
            date: boolean;
            filename: string;
            path?: string | string[];
        };
    };
    layout?: string;
}
