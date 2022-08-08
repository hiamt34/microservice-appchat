import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../protos/interfaces/mes'
import { MesServiceHandlers } from '../protos/interfaces/mes/MesService'
import dotenv from 'dotenv'
import catchErrors from '../ultis/catchError'
import mesService from './mes-service'
import { connectDB } from './connectDB-mongodb'
dotenv.config()
const PORT = process.env.PORT_MES_SEVER || 1004
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
        `127.0.0.1:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err)
                return
            }
            console.info('mes-server running ' + `127.0.0.1:${PORT}`)
            server.start()
        }
    )
    connectDB()
}

runServer()
