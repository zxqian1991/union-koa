module.exports = async function(ctx, next, data) {
    console.log(data);
    await next()
}