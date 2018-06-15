import cookie from "js-cookie"

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
            path: "/"
        })
    }
}

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = (key, req) => {
    if (process.browser) {
        return cookie.get(key)
    } else {
        if (!req.headers.cookie) {
            return undefined
        }
        const rawCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith(`${key}=`))
        if (!rawCookie) {
            return undefined
        } else {
            return rawCookie.split("=")[1]
        }
    }
}

export const auth = (token, name) => {
    setCookie("token", token)
    setCookie("name", name)
}

export const isAuthenticated = (ctx) => {
    !!getCookie("token", ctx.req)
}

export const logout = (ctx = {}) => {
    if (process.browser) {
        removeCookie("token")
        removeCookie("name")
    }
}