import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/user'
import { UserServiceHandlers } from '../protos/interfaces/user/UserService'
import dotenv from 'dotenv'
import catchErrors from '../ultis/catchError'
import userService from './user-service'
import { connectDB } from './connectDB-mongodb'
dotenv.config()
const PORT = process.env.PORT_USER_SEVER || 1002
const PROTO_FILE = '../protos/user.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))

export const grpcObj = grpc.loadPackageDefinition(
    packageDef
) as unknown as ProtoGrpcType
const userPackage = grpcObj.user

function getServer() {
    const server = new grpc.Server()
    server.addService(userPackage.UserService.service, {
        Get: catchErrors(userService.Get),
        GetAll: catchErrors(userService.GetAll),
        Insert: catchErrors(userService.Insert),
        IsExitEmail: catchErrors(userService.IsExitEmail),
        IsExitUser: catchErrors(userService.IsExitUser),
        Remove: catchErrors(userService.Remove),
        Update: catchErrors(userService.Update),
        IsExitEmailAndInsert: catchErrors(userService.IsExitEmailAndInsert),
    } as UserServiceHandlers)
    return server
}

function runServer() {
    const server = getServer()
    server.bindAsync(
        `127.0.0.1:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err)
                return
            }
            console.info('user-server running ' + `127.0.0.1:${PORT}`)
            server.start()
        }
    )
    connectDB()
}

runServer()
