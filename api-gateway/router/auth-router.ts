import { Express, Request, Response, Router } from 'express'
import { authClient } from '../../client/auth-client'
import {
    LogoutSchema,
    OauthSchema,
    signinSchema,
} from '../middleware/authSchema'
import { validate } from '../middleware/validateRequest.middleware'
import passport from 'passport'
import {
    trace,
    context,
    propagation,
    Span,
    SpanStatusCode,
} from '@opentelemetry/api'
import { SERVERNAME } from '../api-gateway'
import { logger } from '../../ultis/log'
const route = Router()
interface IResponse {
    code: number
    data: {
        code: number
        payload?: any
    }
}
interface IErrorResponse {
    code: number
    message: string
    status: boolean
}

const AuthRouter = (app: Express, version: string) => {
    app.use(version + '/auth', route)

    route.get('/signup/:token')
    route.post(
        '/signin',
        validate(signinSchema),
        async (req: Request, res: Response) => {
            const tracer = trace.getTracer(SERVERNAME)
            return tracer.startActiveSpan('/signin', async (span: Span) => {
                const traceHeaders = {}
                // inject context to trace headers for propagtion to the next service
                propagation.inject(context.active(), traceHeaders)
                const dataLogin = req.body

                authClient.Login(
                    {
                        ...dataLogin,
                        traceContext: JSON.stringify(traceHeaders),
                    },
                    (err, data) => {
                        if (!err) {
                            span.setStatus({ code: SpanStatusCode.OK })
                            span.end()

                            return res.status(201).json({
                                status: true,
                                data,
                            })
                        } else {
                            span.setStatus({
                                code: SpanStatusCode.ERROR,
                                message: err?.details,
                            })
                            span.end()
                            return res.status(400).json({
                                code: err?.code,
                                message: err?.details,
                                status: false,
                            })
                        }
                    }
                )
            })
        }
    )

    route.post(
        '/register',
        validate(signinSchema),
        async (req: Request, res: Response) => {
            const tracer = trace.getTracer(SERVERNAME)
            const span = tracer.startSpan('/register', {
                root: true,
            })
            const traceHeaders = {}
            propagation.inject(context.active(), traceHeaders)
            const dataLogin = req.body
            authClient.Register(
                { ...dataLogin, traceContext: JSON.stringify(traceHeaders) },
                (err, data) => {
                    if (!err) {
                        span.setStatus({ code: SpanStatusCode.OK })
                        span.end()
                        return res.status(201).json({
                            status: true,
                            data,
                        })
                    } else {
                        span.setStatus({
                            code: SpanStatusCode.ERROR,
                            message: err?.details,
                        })
                        span.end()
                        return res.status(400).json({
                            code: err?.code,
                            message: err?.details,
                            status: false,
                        })
                    }
                }
            )
        }
    )

    route.get('/getaccesstoken', async (req: Request, res: Response) => {
        const authRefreshToken = req.header('Authorization')
        const refreshToken = authRefreshToken && authRefreshToken.split(' ')[1]

        if (!refreshToken) {
            return res.status(200).json({
                status: false,
                data: {
                    message: 'not found refresh token',
                    statusCode: 403,
                },
            })
        }
        authClient.GetAccessToken({ refreshToken }, (err, data) => {
            if (!err) {
                return res.status(200).json({
                    status: true,
                    data,
                })
            }
            return res.status(200).json({
                status: false,
                data: {
                    message: err?.details,
                    statusCode: 403,
                },
            })
        })
    })

    // route.post(
    //     '/google',
    //     passport.authenticate('google-plus-token', { session: false }),
    //     async (req: Request, res: Response) => {
    //         const profile = req.user as any
    //         const dataLogin = {
    //             email: profile?.emails[0]?.value,
    //             name: profile?.displayName,
    //             authType: profile?.provider,
    //             photos: profile?.photos[0]?.value,
    //             password: profile?.id,
    //         } as any
    //         authClient.LoginOauth(dataLogin, (err, data) => {
    //             if (!err) {
    //                 return res.status(201).json({
    //                     status: true,
    //                     data,
    //                 })
    //             } else {
    //                 return res.status(400).json({
    //                     code: err?.code,
    //                     message: err?.details,
    //                     status: false,
    //                 })
    //             }
    //         })
    //     }
    // )

    route.post(
        '/oauth',
        validate(OauthSchema),
        async (req: Request, res: Response) => {
            const dataLogin = req.body as any
            dataLogin.password = 'oauth2'
            authClient.LoginOauth(dataLogin, (err, data) => {
                if (!err) {
                    return res.status(201).json({
                        status: true,
                        data,
                    })
                } else {
                    return res.status(400).json({
                        code: err?.code,
                        message: err?.details,
                        status: false,
                    })
                }
            })
        }
    )

    route.post('/github', async (req: Request, res: Response) => {})

    route.post(
        '/logout',
        validate(LogoutSchema),
        async (req: Request, res: Response) => {
            const tokens = req.body
            authClient.Logout(tokens, () => {
                return res.status(200).json({
                    status: true,
                    // data: {
                    //     code: 200,
                    // },
                })
            })
        }
    )

    return route
}

export default AuthRouter
