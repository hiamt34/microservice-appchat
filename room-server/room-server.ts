import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/room'
import { RoomServiceHandlers } from '../protos/interfaces/room/RoomService'
import dotenv from 'dotenv'
import catchErrors from '../ultis/catchError'
import roomService from './room-service'
import { connectDB } from './connectDB-mongodb'
import { logger } from '../ultis/log'
dotenv.config()
const PORT = process.env.PORT_ROOM_SEVER || 1003
const HOST = process.env.HOST_ROOM_SEVER || '127.0.0.1'

const PROTO_FILE = '../protos/room.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))

export const grpcObj = grpc.loadPackageDefinition(
    packageDef
) as unknown as ProtoGrpcType
const roomPackage = grpcObj.room

function getServer() {
    const server = new grpc.Server()
    server.addService(roomPackage.RoomService.service, {
        GetRoom: catchErrors(roomService.GetRoom),
        Insert: catchErrors(roomService.Insert),
        InsertUserForRoom: catchErrors(roomService.InsertUserForRoom),
        GetRoomById: catchErrors(roomService.GetRoomById),
        OutRoom: catchErrors(roomService.OutRoom),
    } as RoomServiceHandlers)
    return server
}

function runServer() {
    const server = getServer()
    server.bindAsync(
        `${HOST}:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                logger.error(err)
                return
            }
            logger.info('room-server running ' + `${HOST}:${PORT}`)
            server.start()
        }
    )
    connectDB()
}

runServer()
