async function asynct() {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("okokokok");
        }, 1000);
    });
}
;
asynct().then(async function (value) {
    console.log(value);
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("213123");
        }, 1000);
    });
}).then((value) => {
    console.log(value);
});
