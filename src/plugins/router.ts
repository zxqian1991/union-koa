import * as Koa from "koa";
import * as path from "path";
import * as fs from "fs";
import {EventEmitter} from "events";
import {deep} from "union-util/merge";
import {walk} from "union-util/file"
import {join} from "union-util/array";
export function UnionRouterPlugin(config : UnionRouterPluginConfig) {
    const defaultUnionRouterPlugin : UnionRouterPluginConfig = {
        src: path.resolve("build/routers")
    };
    let _config : UnionRouterPluginConfig = initUnionRouterPlugin(config);
    let event = new EventEmitter();
    let hasInited : boolean = false;
    let mapping : {
        [prop : string] : {
            [prop : string]: {
                [prop : string]: UnionRouterValue
            }
        }
    } = {};
    async function wait() {
        await new Promise((resolve, reject) => {
            event
                .once("end", function () {
                    hasInited = true;
                    resolve();
                })
        });
    };
    function initUnionRouterPlugin(config : UnionRouterPluginConfig) {
        let config_ : UnionRouterPluginConfig = deep(deep({}, defaultUnionRouterPlugin), config);
        config_.src = path.resolve(config_.src);
        return config_;
    };
    function parseFile(filename : string, pre : string) {
        let reg = /^([^\:\~\$]+)((\:[^\:\~\$]+)*)((\~[^\:\~\$]+)*)(\$\w+)?$/i;
        let extname = path.extname(filename);
        let basename = path.basename(filename, extname);
        let arr : string[] = basename.match(reg);
        if (arr && arr instanceof Array && arr.length > 0) {
            let pre_ : string = arr[1] || '';
            let var_ : string = arr[2] || '';
            let con_ : string = arr[4] || '';
            let type_ : string = arr[6] || '';
            let types_ = type_.match(/[^\$]+/gi);
            let method = types_
                ? types_[0]
                : null
            let key : string = path.join(pre, pre_);
            let vars_ = var_.match(/[^\:]+/gi) || [];
            let csts_ = con_.match(/[^\~]+/gi) || [];
            let key_key : string = csts_.length > 0
                ? csts_.join("/")
                : "$default";
            if (!mapping.hasOwnProperty(key)) 
                mapping[key] = {};
            if (!mapping[key].hasOwnProperty(key_key)) 
                mapping[key][key_key] = {};
            let var_key = `$${vars_.length}` + (method
                ? method.toUpperCase()
                : '');
            mapping[key][key_key][var_key] = {
                vars: vars_,
                path: path.join(_config.src, path.join(pre, filename)),
                method: method
            };
            if(!mapping[key][key_key]["$default"] || mapping[key][key_key]["$default"].vars.length < vars_.length) {
                mapping[key][key_key]["$default"] = mapping[key][key_key][var_key];
            };
        }
    };
    function getValue(ctx : Koa.Context) : UnionRouterFormatValue
    {
        let reg = /[^\/]+/gi;
        let _path = ctx.path;
        let arr : string[] = _path.match(reg);
        if (arr && arr.length > 0) {
            let i = arr.length;
            let j = arr.length;
            let res : UnionRouterValue = null;
            while (--i >= 0) {
                let str = "/" + join(arr, "/", 0, i);
                if (mapping.hasOwnProperty(str)) {
                    // 有匹配的
                    let tmp : {
                        [prop : string] : {
                            [prop:string]: UnionRouterValue
                        }
                    } = mapping[str];
                    while (--j > 0) {
                        let _str = join(arr, "/", j, arr.length - 1);
                        if (tmp.hasOwnProperty(_str)) {
                            let $key = "$" + (j - i - 1);
                            console.log('asdasd:',$key,i,j);;
                            if(tmp[_str].hasOwnProperty($key)) {
                                res = tmp[_str][$key];
                            }
                            break;
                        }
                    };
                    if (j == 0) {
                        // 没有后缀
                        let $key = "$" + (arr.length - 1 - i);
                        if(tmp["$default"].hasOwnProperty($key)) {
                            res = tmp["$default"][$key];
                        }
                    }
                    break;
                }
            };
            let _res : UnionRouterFormatValue = null;
            if (res) {
                _res = {
                    path: res.path,
                    method: res.method,
                    data: {}
                };
                res
                    .vars
                    .forEach((value : string, index : number) => {
                        _res.data[value] = arr[i + index + 1];
                    })
            }
            return _res;
        }
        return null;
    };
    walk(_config.src, async function (filename : string, pre : string) {
        parseFile(filename, pre);
    }).then(() => {
        hasInited = true;
        console.log(mapping);
        event.emit("end");
    })
    return async function (ctx : Koa.Context, next : Function) {
        if (!hasInited) {
            await wait();
        };
        let value : UnionRouterFormatValue = getValue(ctx);
        if (value) {
            console.log(value);
            if (value.method && value.method.toUpperCase() != ctx.method.toUpperCase()) {
                await next();
            } else {
                let handler = require(value.path);
                await handler(ctx, async function () {
                    await next();
                }, value.data);
            }
        } else {
            await next();
        }
    };
};
export interface UnionRouterPluginConfig {
    src?: string;
};
export interface UnionRouterValue {
    vars : any[];
    path : string;
    method : string;
}
export interface UnionRouterFormatValue {
    path : string,
    data : {
        [prop : string]: string
    },
    method : string;
}