import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/user'
const PORT = process.env.PORT_USER_SEVER || 1002
const HOST = process.env.HOST_USER_SEVER || '127.0.0.1'

const PROTO_FILE = '../protos/user.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE), {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
})

const grpcObj = grpc.loadPackageDefinition(
    packageDef
) as unknown as ProtoGrpcType

export const userClient = new grpcObj.user.UserService(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
)
