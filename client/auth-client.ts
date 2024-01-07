import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/auth'
const PORT = process.env.PORT_AUTH_SEVER || 1001
const HOST = process.env.HOST_AUTH_SEVER || '127.0.0.1'
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

export const authClient = new grpcObj.auth.AuthService(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
)

// authClient.ValidateToken(
//     {
//         accessToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImQxN2RjY24xOTZAZ21haWwuY29tIiwic3RhdHVzIjp0cnVlLCJyb2xlIjoidXNlciIsImlhdCI6MTY1OTA2NDQwMiwiZXhwIjoxNjU5MTUwODAyfQ.RCoo_MaXyf620wYb8fK0gT-3hLVoLK3cMAdxnWZBOk4'
//     },
//     (err, data) => {
//         // logger.info(data)
//         if (!err) {
//             logger.info(data)
//         } else {
//             logger.info('eee'+err)
//         }
//     }
// )
