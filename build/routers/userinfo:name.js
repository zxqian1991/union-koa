"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
module.exports = async function (ctx, next, data, app) {
    ctx.body = "aS";
    let logger = new logger_1.UnionSingleLogger("qianzhixiang");
    logger.debug("okokookokok");
    console.log(app);
    console.log(data);
};
