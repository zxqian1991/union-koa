import * as Koa from "koa";
import * as path from "path";
import {EventEmitter} from 'events';
import * as fs from 'fs';
import {emptyCompilationResult} from 'gulp-typescript/release/reporter';
export function routerPlugin(config : UnionRouterConfig) {
    let root = path.isAbsolute(config.src)
        ? config.src
        : path.resolve(config.src);
    let mapping : {
        [prop : string] : string; // 路径
    } = {};
    // 初始化状态，以查看是否已经初始化(有可能遍历还没有完成，但是却有了新的请求)）
    let stat : boolean = false;
    let emitter = new EventEmitter();
    /**
     * 遍历根目录，并生成映射
     */
    async function parseRouter(pre : string = '/') {
        return await new Promise((resolve, reject) => {
            fs
                .readdir(path.join(root, pre), function (err, files : string[]) {
                    Promise.all(files.map((file : string, index : number) => {
                        let _root = path.join(root, pre);
                        return new Promise((resolve, reject) => {
                            let abpath = path.join(_root, file)
                            let stats : fs.Stats = fs.statSync(abpath);
                            if (stats.isFile()) {
                                if (file == "index.js") {
                                    // 是默认
                                    mapping[pre] = abpath;
                                } else {
                                    let extname = path.extname(file);
                                    if (extname == ".js") {
                                        let basename = path.basename(file, extname);
                                        let url = path.join(pre, basename);
                                        mapping[url] = abpath;
                                    }
                                };
                                resolve();
                            } else if (stats.isDirectory()) {
                                // 是文件夹
                                parseRouter(path.join(pre, file)).then(() => {
                                    resolve();
                                }).catch((e) => {
                                    reject(e);
                                });
                            } else {
                                resolve();
                            }
                        });
                    })).then(()=>{
                        resolve();
                    })
                });
        });
    };
    async function wait() {
        return new Promise((resolve, reject) => {
            emitter
                .on("end", function (stat) {
                    stat = true;
                    resolve();
                });
        })
    };
    parseRouter().then(()=>{
        stat = true;
        emitter.emit("end");
        console.log(mapping);;
    });
    function beautyPath(path:string){
        return path.replace(/\/$/gi,'')
    };
    function getMappingKey(url:string): {
        key: string,
        data: string[]
    }{
        let reg = /[^\/]+/gi;
        let arr: string[]= url.match(reg);
        let data: string[] = [];
        let key = null;
        while(arr && arr.length > 0) {
            let _u = "/" + arr.join("/");
            if(mapping.hasOwnProperty(_u)) {
                key = _u;
                break;
            }
            data.unshift(arr.pop());
        };
        return {
            key: key,
            data: data
        };
    }
    return async function (ctx : Koa.Context, next : Function, app : Koa) {
        if (!stat) {
            await wait();
        };
        let key: {
            key: string,
            data: string[]
        } = getMappingKey(ctx.path);
        if(key.key) {
            let handler = require(mapping[key.key]);
            await handler(ctx,next,app,key.data);
        } else {
            await next();
        }
    };

};``
export interface UnionRouterConfig {
    src : string; // 资源路径
}