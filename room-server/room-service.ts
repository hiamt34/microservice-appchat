import { handleUnaryCall } from '@grpc/grpc-js'
import { RoomModel } from '../models/room.model'
import { Empty } from '../protos/interfaces/room/Empty'
import { InsertUserForRoom__Output } from '../protos/interfaces/room/InsertUserForRoom'
import { OutRoom__Output } from '../protos/interfaces/room/OutRoom'
import { Room, Room__Output } from '../protos/interfaces/room/Room'
import { RoomId__Output } from '../protos/interfaces/room/RoomId'
import { RoomList } from '../protos/interfaces/room/RoomList'
import { RoomServiceHandlers } from '../protos/interfaces/room/RoomService'
import { UserId__Output } from '../protos/interfaces/room/UserId'

class RoomService implements RoomServiceHandlers {
    [name: string]: import('@grpc/grpc-js').UntypedHandleCall
    GetRoomById: handleUnaryCall<RoomId__Output, Room>  = async (
        call,
        callback
    ) => {
        const { roomId } = call.request as RoomId__Output
        const room = (await RoomModel.findOne({_id: roomId}))
        
        callback(null,room as Room)
    }

    GetRoom: handleUnaryCall<UserId__Output, RoomList> = async (
        call,
        callback
    ) => {
        const { userId } = call.request as UserId__Output
        const roomsModer = (await RoomModel.find({
            members: {
                $in: [userId],
            },
        }))
        const rooms = roomsModer.filter(r => r.members.length > 1)
        
        callback(null, {rooms} as RoomList)
    }
    Insert: handleUnaryCall<Room__Output, Room> = async (call, callback) => {
        const room = call.request as Room__Output
        if (room.members?.length === 2) {
            const isRoom = await RoomModel.find({
                members: {$all: room.members, $size: 2}
            })    
            if(isRoom.length > 0) return callback(null, isRoom[0])
        }
        const roomInsert = await RoomModel.create(room)
        
        callback(null, roomInsert)
    }
    InsertUserForRoom: handleUnaryCall<InsertUserForRoom__Output, Empty> =
        async (call, callback) => {
            const { userId, roomId } = call.request as InsertUserForRoom__Output
            const room = await RoomModel.findOne({
                _id: roomId,
            })
            const members = room?.members.push(userId as string)
            await RoomModel.updateOne({ _id: roomId }, { members })
            callback(null, {})
        }
    OutRoom: handleUnaryCall<OutRoom__Output, Empty> = async (call, callback) => {
        const { userId, roomId } = call.request as OutRoom__Output
            const room = await RoomModel.findOne({
                _id: roomId,
            })
            const members = room?.members.filter(user => user !== userId )
            await RoomModel.updateOne({ _id: roomId }, { members })
            callback(null, {})
    }
}
const mesService = new RoomService()
export default mesService
