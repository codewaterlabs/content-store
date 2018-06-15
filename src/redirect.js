import Router from "next/router"

export default (target, ctx = {}) => {
    if (ctx.res) {
        // Server
        ctx.res.writeHead(303, {  Location: target })
        ctx.res.end()
    } else {
        Router.replace(target)
    }
}