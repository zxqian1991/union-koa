// async function asynct() {
//     return await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("okokokok");
//         },1000)
//     });
// };
// asynct().then(async function(value:any){
//     console.log(value);
//     return await new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve("213123");
//         },1000);
//     })
// }).then((value:any)=>{
//     console.log(value);
// });
async function render(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("end");
        })
    })
};
async function run(){
    console.log("before render");
    await render();
    console.log("after render");
};
run();
