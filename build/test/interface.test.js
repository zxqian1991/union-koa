"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
let ifaces = os.networkInterfaces();
let iptable = {};
for (let dev in ifaces) {
    ifaces[dev]
        .forEach(function (details, alias) {
        if (details.family == 'IPv4') {
            iptable[dev + (alias
                ? ':' + alias
                : '')] = details.address;
        }
    });
}
;
console.log(iptable);
