import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/room'
const PORT = process.env.PORT_ROOM_SEVER || 1003
const HOST = process.env.HOST_ROOM_SEVER || '127.0.0.1'

const PROTO_FILE = '../protos/room.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE), {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
})

const grpcObj = grpc.loadPackageDefinition(
    packageDef
) as unknown as ProtoGrpcType

export const roomClient = new grpcObj.room.RoomService(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
)
