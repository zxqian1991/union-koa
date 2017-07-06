import * as os from "os";
let ifaces = os.networkInterfaces();
let iptable : any = {};
for (let dev in ifaces) {
    ifaces[dev]
        .forEach(function (details, alias) {
            if (details.family == 'IPv4') {
                iptable[dev + (alias
                        ? ':' + alias
                        : '')] = details.address;
            }
        })
};
console.log(iptable);