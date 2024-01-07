import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/mes'
import { MesServiceHandlers } from '../protos/interfaces/mes/MesService'
import dotenv from 'dotenv'
import catchErrors from '../ultis/catchError'
import mesService from './mes-service'
import { connectDB } from './connectDB-mongodb'
import { logger } from '../ultis/log'
dotenv.config()
const PORT = process.env.PORT_MES_SEVER || 1004
const HOST = process.env.HOST_MES_SEVER || '127.0.0.1'
const PROTO_FILE = '../protos/mes.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))

export const grpcObj = grpc.loadPackageDefinition(
    packageDef
) as unknown as ProtoGrpcType
const mesPackage = grpcObj.mes

function getServer() {
    const server = new grpc.Server()
    server.addService(mesPackage.MesService.service, {
        GetMesInRoom: catchErrors(mesService.GetMesInRoom),
        Insert: catchErrors(mesService.Insert),
    } as MesServiceHandlers)
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
            logger.info('mes-server running ' + `${HOST}:${PORT}`)
            server.start()
        }
    )
    connectDB()
}

runServer()
