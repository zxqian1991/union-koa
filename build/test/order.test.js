"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import util from "../util";
var sort_1 = require("union-util/sort");
function randomArr(num, max) {
    if (num === void 0) { num = 1000 * 1000; }
    if (max === void 0) { max = 100; }
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(Math.floor(Math.random() * max));
    }
    return arr;
}
;
function test(func, arr, title) {
    var begin = new Date();
    console.log("\u5F00\u59CB" + title + "\u6392\u5E8F");
    var res = func(arr, false);
    console.log("\u7ED3\u675F" + title + "\u6392\u5E8F");
    var end = new Date();
    var ms = end.getTime() - begin.getTime();
    console.log(title + "\u603B\u5171\u82B1\u8D39\uFF1A" + ms + " ms");
    return res;
}
;
// for (let i = 1; i < 8; i++) {
//     let num = Math.pow(10,i);
//     let arr = randomArr(num);
//     console.log("生成",num,"大小的数组");
//     test(quickPro,arr,"快速Pro");
//     test(heap,arr,"堆栈");
//     test(merge,arr,"归并")
// }
var arr = randomArr(10); //[27, 66, 1, 83, 29, 85, 37, 43, 50, 73];//randomArr(10);;//[98, 88, 27, 34, 84, 99, 15, 34, 74, 12]//randomArr(10);
console.log(arr);
console.log(sort_1.order(arr));
