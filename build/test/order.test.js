"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import util from "../util";
const sort_1 = require("union-util/sort");
function randomArr(num = 1000 * 1000, max = 100) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(Math.floor(Math.random() * max));
    }
    return arr;
}
;
function test(func, arr, title) {
    let begin = new Date();
    console.log(`开始${title}排序`);
    let res = func(arr, false);
    console.log(`结束${title}排序`);
    let end = new Date();
    let ms = end.getTime() - begin.getTime();
    console.log(`${title}总共花费：${ms} ms`);
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
let arr = randomArr(10); //[27, 66, 1, 83, 29, 85, 37, 43, 50, 73];//randomArr(10);;//[98, 88, 27, 34, 84, 99, 15, 34, 74, 12]//randomArr(10);
console.log(arr);
console.log(sort_1.order(arr));
