import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/auth'
import { AuthServiceHandlers } from '../protos/interfaces/auth/AuthService'
import dotenv from 'dotenv'
import catchErrors from '../ultis/catchError'
import { authService } from './auth-service'
import { dbRedis } from './conectDB-redis'

dotenv.config()
const PORT = process.env.PORT_AUTH_SEVER || 1001
const PROTO_FILE = '../protos/auth.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE), {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
})

const grpcObj = grpc.loadPackageDefinition(
    packageDef
) as unknown as ProtoGrpcType
const authPackage = grpcObj.auth

const getServer = () => {
    const server = new grpc.Server()
    server.addService(authPackage.AuthService.service, {
        Login: catchErrors(authService.Login),
        Register: catchErrors(authService.Register),
        GetAccessToken: catchErrors(authService.GetAccessToken),
        ValidateToken: catchErrors(authService.ValidateToken),
        LoginOauth: catchErrors(authService.LoginOauth),
        Logout: catchErrors(authService.Logout),
    } as AuthServiceHandlers)
    return server
}

const runServer = () => {
    const server = getServer()
    server.bindAsync(
        `127.0.0.1:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err)
                return
            }
            console.info('auth-server running ' + `127.0.0.1:${PORT}`)
            server.start()
            dbRedis.connect()
        }
    )    
}

runServer()
//
import '../client/auth-client'