import * as grpc from '@grpc/grpc-js'
import {
    AccessToken,
    AccessToken__Output,
} from '../protos/interfaces/auth/AccessToken'
import { AuthServiceHandlers } from '../protos/interfaces/auth/AuthService'
import { RefreshToken__Output } from '../protos/interfaces/auth/RefreshToken'
import { TokenExit } from '../protos/interfaces/auth/TokenExit'
import { Tokens, Tokens__Output } from '../protos/interfaces/auth/Tokens'
import { User__Output } from '../protos/interfaces/auth/User'
import jwt from 'jsonwebtoken'
import { pick } from 'lodash'
import { userClient } from '../client/user-client'
import { dbRedis } from './conectDB-redis'
import { UserRegister__Output } from '../protos/interfaces/auth/UserRegister'
import { UserLoginOauth__Output } from '../protos/interfaces/auth/UserLoginOauth'
import { Empty } from '../protos/interfaces/auth/Empty'
import { trace, context, propagation, SpanStatusCode } from '@opentelemetry/api'
export class AuthService implements AuthServiceHandlers {
    [name: string]: grpc.UntypedHandleCall
    GetAccessToken: grpc.handleUnaryCall<RefreshToken__Output, AccessToken> =
        async (call, callback) => {
            const { refreshToken } = call.request as RefreshToken__Output
            //check refreshtoken va lay accesstoken moi ... và lưu lại accesstoken do
            const isRefreshToken = await (
                await dbRedis
            ).exists(refreshToken as string)

            if (isRefreshToken) {
                let user = jwt.verify(
                    refreshToken as string,
                    process.env.PRIVATE_KEY as string
                ) as User__Output
                user = pick(
                    user,
                    'email',
                    'status',
                    'name',
                    'role',
                    '_id',
                    'photo'
                )

                const accessToken = jwt.sign(
                    user,
                    process.env.PRIVATE_KEY as string,
                    {
                        expiresIn: process.env.ACCESS_TOKEN_LIFE,
                    }
                )

                await (await dbRedis).set(accessToken, user.email as string)
                await (
                    await dbRedis
                ).expire(accessToken, Number(process.env.ACCESS_TOKEN_LIFE_RD))
                return callback(null, {
                    accessToken,
                })
            }
            return callback({
                code: grpc.status.RESOURCE_EXHAUSTED,
                details: 'Forbidden',
            })
        }
    Login: grpc.handleUnaryCall<User__Output, Tokens> = async (
        call,
        callback
    ) => {
        let user = call.request as User__Output
        const traceHeaders = JSON.parse(
            (call.request.traceContext as string) || '{}'
        )
        const spanContext = propagation.extract(context.active(), traceHeaders)
        // Tạo span mới với context đã được trích xuất
        const tracer = trace.getTracer('api-gateway')
        const span = tracer.startSpan(
            'authClient.Login',
            {
                root: false,
            },
            spanContext
        )

        userClient.IsExitUser(
            { ...user, traceContext: JSON.stringify(traceHeaders) },
            async (err, data) => {
                if (!err || data) {
                    user = pick(
                        data,
                        'email',
                        'status',
                        'name',
                        'role',
                        '_id',
                        'photo'
                    )
                    const accessToken = jwt.sign(
                        user,
                        process.env.PRIVATE_KEY as string,
                        {
                            expiresIn: process.env.ACCESS_TOKEN_LIFE,
                        }
                    )

                    const refreshToken = jwt.sign(
                        user,
                        process.env.PRIVATE_KEY as string,
                        {
                            expiresIn: process.env.REFRESH_TOKEN_LIFE,
                        }
                    )
                    // luu redis ...
                    await (
                        await dbRedis
                    ).set(refreshToken, user.email as string)
                    await (
                        await dbRedis
                    ).expire(
                        refreshToken,
                        Number(process.env.REFRESH_TOKEN_LIFE_RD)
                    )
                    await (await dbRedis).set(accessToken, user.email as string)
                    await (
                        await dbRedis
                    ).expire(
                        accessToken,
                        Number(process.env.ACCESS_TOKEN_LIFE_RD)
                    )
                    span.setStatus({ code: SpanStatusCode.OK })
                    span.end()
                    return callback(null, {
                        accessToken,
                        refreshToken,
                    })
                }
                //loi hoac sai tk, maat khau, hoac validate
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: err?.details,
                })
                span.end()
                return callback({
                    code: err?.code,
                    details: err?.details,
                })
            }
        )
        // span.end()
    }
    Register: grpc.handleUnaryCall<UserRegister__Output, Tokens> = async (
        call,
        callback
    ) => {
        let user = call.request as UserRegister__Output
        const traceHeaders = JSON.parse(
            (call.request.traceContext as string) || '{}'
        )
        const spanContext = propagation.extract(context.active(), traceHeaders)
        // Tạo span mới với context đã được trích xuất
        const tracer = trace.getTracer('api-gateway')
        const span = tracer.startSpan(
            'authClient.Login',
            {
                root: false,
            },
            spanContext
        )
        userClient.Insert(
            { ...user, traceContext: JSON.stringify(traceHeaders) },
            async (err, data) => {
                if (!err) {
                    user = pick(
                        data,
                        'email',
                        'status',
                        'name',
                        'role',
                        '_id',
                        'photo',
                        'password'
                    )
                    const accessToken = jwt.sign(
                        user,
                        process.env.PRIVATE_KEY as string,
                        {
                            expiresIn: process.env.ACCESS_TOKEN_LIFE,
                        }
                    )

                    const refreshToken = jwt.sign(
                        user,
                        process.env.PRIVATE_KEY as string,
                        {
                            expiresIn: process.env.REFRESH_TOKEN_LIFE,
                        }
                    )
                    //  luu redis ...
                    await (
                        await dbRedis
                    ).set(refreshToken, user.email as string)
                    await (
                        await dbRedis
                    ).expire(
                        refreshToken,
                        Number(process.env.REFRESH_TOKEN_LIFE_RD)
                    )
                    await (await dbRedis).set(accessToken, user.email as string)
                    await (
                        await dbRedis
                    ).expire(
                        accessToken,
                        Number(process.env.ACCESS_TOKEN_LIFE_RD)
                    )

                    span.setStatus({ code: SpanStatusCode.OK })
                    span.end()
                    callback(null, {
                        accessToken,
                        refreshToken,
                    })
                }
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: err?.details,
                })
                span.end()
                //loi hoac da ton tai email, hoac validate
                return callback({
                    code: err?.code,
                    details: err?.details,
                })
            }
        )
    }
    ValidateToken: grpc.handleUnaryCall<AccessToken__Output, TokenExit> =
        async (call, callback) => {
            const { accessToken } = call.request as AccessToken__Output
            const isAccessToken = await (
                await dbRedis
            ).exists(accessToken as string)
            if (isAccessToken) {
                try {
                    const user = jwt.verify(
                        accessToken as string,
                        process.env.PRIVATE_KEY as string
                    ) as TokenExit
                    return callback(null, user)
                } catch (error: any) {
                    return callback({
                        code: grpc.status.PERMISSION_DENIED,
                        details: 'Unauthorized',
                    })
                }
            }
            return callback({
                code: grpc.status.RESOURCE_EXHAUSTED,
                details: 'Forbidden',
            })
        }
    LoginOauth: grpc.handleUnaryCall<UserLoginOauth__Output, Tokens> = async (
        call,
        callback
    ) => {
        let user = call.request as UserLoginOauth__Output
        userClient.IsExitEmailAndInsert(user, async (err, data) => {
            if (!err) {
                user = pick(
                    data,
                    'email',
                    'status',
                    'name',
                    'role',
                    '_id',
                    'photo',
                    'password'
                )

                const accessToken = jwt.sign(
                    user,
                    process.env.PRIVATE_KEY as string,
                    {
                        expiresIn: process.env.ACCESS_TOKEN_LIFE,
                    }
                )

                const refreshToken = jwt.sign(
                    user,
                    process.env.PRIVATE_KEY as string,
                    {
                        expiresIn: process.env.REFRESH_TOKEN_LIFE,
                    }
                )
                // luu redis ...
                await (await dbRedis).set(refreshToken, user.email as string)
                await (
                    await dbRedis
                ).expire(
                    refreshToken,
                    Number(process.env.REFRESH_TOKEN_LIFE_RD)
                )
                await (await dbRedis).set(accessToken, user.email as string)
                await (
                    await dbRedis
                ).expire(accessToken, Number(process.env.ACCESS_TOKEN_LIFE_RD))
                return callback(null, {
                    accessToken,
                    refreshToken,
                })
            }

            return callback({
                code: err?.code,
                details: err?.details,
            })
        })
    }
    Logout: grpc.handleUnaryCall<Tokens__Output, Empty> = async (
        call,
        callback
    ) => {
        let { accessToken, refreshToken } = call.request as Tokens__Output
        accessToken = accessToken?.split(' ')[1]
        refreshToken = refreshToken?.split(' ')[1]
        await (await dbRedis).del(accessToken as string)
        await (await dbRedis).del(refreshToken as string)
        callback(null, {})
    }
}
export const authService = new AuthService()
