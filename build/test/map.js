"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("union-util/array");
array_1.map([1, 2, 3, 4, 123, 56], async function (value, index) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(value, index);
            resolve(value + 1298);
        }, 1000);
    });
}).then(async (res) => {
    console.log(res);
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("done");
        }, 6000);
    });
}).then((v) => {
    console.log(v);
});
array_1.reduce([12, 45, 33, 55], async function (value, index, count) {
    console.log(value, index, count);
    count = count || 0;
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(count + value);
        }, 1000);
    });
}).then(async (c) => {
    console.log("总和是", c);
});
array_1.find([12, 56, 8, 66, 2], async function (value, index) {
    console.log(value, index);
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value > 60);
        }, 1000);
    });
}).then((v) => {
    console.log(v);
});
