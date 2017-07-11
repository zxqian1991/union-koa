"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const events_1 = require("events");
const merge_1 = require("union-util/merge");
const file_1 = require("union-util/file");
const array_1 = require("union-util/array");
function UnionRouterPlugin(config) {
    const defaultUnionRouterPlugin = {
        src: path.resolve("build/routers")
    };
    let _config = initUnionRouterPlugin(config);
    let event = new events_1.EventEmitter();
    let hasInited = false;
    let mapping = {};
    async function wait() {
        await new Promise((resolve, reject) => {
            event
                .once("end", function () {
                hasInited = true;
                resolve();
            });
        });
    }
    ;
    function initUnionRouterPlugin(config) {
        let config_ = merge_1.deep(merge_1.deep({}, defaultUnionRouterPlugin), config);
        config_.src = path.resolve(config_.src);
        return config_;
    }
    ;
    function parseFile(filename, pre) {
        let reg = /^([^\:\~\$]+)((\:[^\:\~\$]+)*)((\~[^\:\~\$]+)*)(\$\w+)?$/i;
        let extname = path.extname(filename);
        let basename = path.basename(filename, extname);
        let arr = basename.match(reg);
        if (arr && arr instanceof Array && arr.length > 0) {
            let pre_ = arr[1] || '';
            let var_ = arr[2] || '';
            let con_ = arr[4] || '';
            let type_ = arr[6] || '';
            let types_ = type_.match(/[^\$]+/gi);
            let method = types_
                ? types_[0]
                : null;
            let key = path.join(pre, pre_);
            let vars_ = var_.match(/[^\:]+/gi) || [];
            let csts_ = con_.match(/[^\~]+/gi) || [];
            let key_key = csts_.length > 0
                ? csts_.join("/")
                : "$default";
            mapping[key] = {
                [key_key]: {
                    vars: vars_,
                    path: path.join(_config.src, path.join(pre, filename)),
                    method: method
                }
            };
        }
    }
    ;
    function getValue(ctx) {
        let reg = /[^\/]+/gi;
        let _path = ctx.path;
        let arr = _path.match(reg);
        if (arr && arr.length > 0) {
            let i = arr.length;
            let res = null;
            while (--i >= 0) {
                let str = "/" + array_1.join(arr, "/", 0, i);
                if (mapping.hasOwnProperty(str)) {
                    // 有匹配的
                    let j = arr.length;
                    let tmp = mapping[str];
                    while (--j > 0) {
                        let _str = array_1.join(arr, "/", i, arr.length - 1);
                        if (tmp.hasOwnProperty(_str)) {
                            res = tmp[_str];
                            break;
                        }
                    }
                    ;
                    if (j == 0) {
                        res = tmp["$default"];
                    }
                    break;
                }
            }
            ;
            let _res = null;
            if (res) {
                _res = {
                    path: res.path,
                    method: res.method,
                    data: {}
                };
                res
                    .vars
                    .forEach((value, index) => {
                    _res.data[value] = arr[i + index + 1];
                });
            }
            return _res;
        }
        return null;
    }
    ;
    file_1.walk(_config.src, async function (filename, pre) {
        parseFile(filename, pre);
    }).then(() => {
        hasInited = true;
        event.emit("end");
    });
    return async function (ctx, next) {
        if (!hasInited) {
            await wait();
        }
        ;
        let value = getValue(ctx);
        if (value) {
            if (value.method && value.method.toUpperCase() != ctx.method.toUpperCase()) {
                await next();
            }
            else {
                let handler = require(value.path);
                await handler(ctx, async function () {
                    await next();
                }, value.data);
            }
        }
        else {
            await next();
        }
    };
}
exports.UnionRouterPlugin = UnionRouterPlugin;
;
;
