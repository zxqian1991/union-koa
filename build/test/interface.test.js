"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var ifaces = os.networkInterfaces();
var iptable = {};
var _loop_1 = function (dev) {
    ifaces[dev]
        .forEach(function (details, alias) {
        if (details.family == 'IPv4') {
            iptable[dev + (alias
                ? ':' + alias
                : '')] = details.address;
        }
    });
};
for (var dev in ifaces) {
    _loop_1(dev);
}
;
console.log(iptable);
