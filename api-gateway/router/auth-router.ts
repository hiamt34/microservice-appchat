import { Express, Request, Response, Router } from 'express'
import { authClient } from '../../client/auth-client'
import { LogoutSchema, OauthSchema, signinSchema } from '../middleware/authSchema'
import { validate } from '../middleware/validateRequest.middleware'
import passport from 'passport'
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

const AuthRouter = (app: Express) => {
    app.use('/auth', route)

    route.get('/signup/:token')
    route.post(
        '/signin',
        validate(signinSchema),
        async (req: Request, res: Response) => {
            const dataLogin = req.body
            authClient.Login(dataLogin, (err, data) => {
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

    route.post(
        '/register',
        validate(signinSchema),
        async (req: Request, res: Response) => {
            const dataLogin = req.body
            authClient.Register(dataLogin, (err, data) => {
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
        authClient.GetAccessToken({refreshToken}, (err, data) => {
            if (!err) {
                return res.status(200).json({
                    status: true,
                    data
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

    route.post('/oauth', validate(OauthSchema), async (req: Request, res: Response) => {
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
    })

    route.post('/github', async (req: Request, res: Response) => {})

    route.post('/logout', validate(LogoutSchema), async (req: Request, res: Response) => {
        const tokens = req.body
        authClient.Logout(tokens, () => {
            return res.status(200).json({
                status: true,
                // data: {
                //     code: 200,
                // },
            })
        })
    })
}

export default AuthRouter
