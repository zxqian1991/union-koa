let reg = /^([^\:\~\$]+)((\:[^\:\~\$]+)*)((\~[^\:\~\$]+)*)(\$\w+)*$/i;
let a = "asddd:da$GET";
let arr = a.match(reg);
let pre_ = arr[1];
let var_ = arr[2];
let con_ = arr[4];
let type_ = arr[6];
console.log(arr);;