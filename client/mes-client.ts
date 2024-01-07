import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/mes'
const PORT = process.env.PORT_MES_SEVER || 1004
const HOST = process.env.HOST_MES_SEVER || '127.0.0.1'
const PROTO_FILE = '../protos/mes.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE), {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
})

const grpcObj = grpc.loadPackageDefinition(
    packageDef
) as unknown as ProtoGrpcType

export const mesClient = new grpcObj.mes.MesService(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
)
