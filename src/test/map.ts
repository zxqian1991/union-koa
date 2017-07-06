import { settings } from 'cluster';

import { map,reduce,find } from 'union-util/array';

map([1,2,3,4,123,56],async function(value: number,index:number){
    return await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(value,index);
            resolve(value + 1298);
        },1000)
    })
}).then(async (res)=>{
    console.log(res);
    return await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("done");
        },6000)
    })
}).then((v)=>{
    console.log(v);
})
reduce([12,45,33,55],async function(value:number,index:number,count:number){
    console.log(value,index,count);
    count = count || 0;
    return await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(count + value);
        },1000);
    });
}).then(async (c)=>{
    console.log("总和是",c);
})
find([12,56,8,66,2], async function(value: number,index: number){
    console.log(value,index);
    return await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(value > 60);
        },1000)
    });
}).then((v)=>{
    console.log(v);
})