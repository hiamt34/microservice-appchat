import { handleUnaryCall } from '@grpc/grpc-js'
import { MesModel } from '../models/mes.model'
import { Empty } from '../protos/interfaces/mes/Empty'
import { Mes__Output } from '../protos/interfaces/mes/Mes'
import { MesIsert__Output } from '../protos/interfaces/mes/MesIsert'
import { MesList } from '../protos/interfaces/mes/MesList'
import { MesServiceHandlers } from '../protos/interfaces/mes/MesService'
import { RoomId__Output } from '../protos/interfaces/mes/RoomId'

class MesService implements MesServiceHandlers {
    [name: string]: import('@grpc/grpc-js').UntypedHandleCall
    GetMesInRoom: handleUnaryCall<RoomId__Output, MesList> = async (
        call,
        callback
    ) => {
        const { roomId } = call.request as RoomId__Output
        const mess = (await MesModel.find({ roomId })) 
        callback(null, {mess} as MesList)
    }
    Insert: handleUnaryCall<MesIsert__Output, Empty> = async (call, callback) => {
        const mes = call.request
        await MesModel.create(mes)
        callback(null, {})
    }
}
const mesService = new MesService()
export default mesService
