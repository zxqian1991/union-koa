module.exports = async function(ctx, next, app, data) {
    await next();
};