import proxy from "express-http-proxy"

export const proxyWithHeaders = (serviceUrl, options = {}) => {
    return proxy(
        serviceUrl,
        {
            ...options,

            proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
                if (srcReq.user) {
                    proxyReqOpts.headers["x-user-id"] = srcReq.user.userId
                }

                return proxyReqOpts
            },

            proxyErrorHandler: (err, res, next) => {
                console.error("PROXY ERROR:", {
                    serviceUrl,
                    code: err?.code,
                    message: err?.message,
                    stack: err?.stack
                })

                next(err)
            }
        }
    )
}