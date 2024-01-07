import { logger } from '../ultis/log'
import { pubClient } from './socket-server'

interface IUser {
    userId: string
    socketId: string
}
interface INotifyMsg {
    userId: string
    roomId: string
    receiverID?: string
}
enum TYPE_OBJ {
    USER = 'USER-SOCKET-CHAT',
    NOTIFY = 'NOTIFY-SOCKET-CHAT',
}
class SocketService {
    // private users: IUser[]
    // private notifyMsgs: INotifyMsg[]
    constructor() {
        // this.users = [] // cần đưa lên redis đồng bộ
        // this.notifyMsgs = []
    }
    addUser = async (user: IUser) => {
        const datas = await this.getUsers()
        const isExis = datas.some((u) => u.userId === user.userId)
        if (!isExis) {
            datas.push(user)
            await this.syncRedis(TYPE_OBJ.USER, datas)
        }
    }
    removeUser = async (socketId: string) => {
        let datas = await this.getUsers()
        const user = datas.find((user) => user.socketId === socketId)
        datas = datas.filter((u) => u.userId !== user?.userId)
        await this.syncRedis(TYPE_OBJ.USER, datas)
    }
    addNotifyMsg = async (msg: INotifyMsg) => {
        const datas = await this.getNotify()
        datas.push(msg)
        await this.syncRedis(TYPE_OBJ.NOTIFY, datas)
    }
    removeNotifyMsg = async (roomId: string, userId: string) => {
        const datas = (await this.getNotify()).filter(
            (n) => n.roomId !== roomId && n.userId === userId
        )
        await this.syncRedis(TYPE_OBJ.NOTIFY, datas)
    }
    getNotifyMsgOfUser = async (userId: string): Promise<INotifyMsg[]> => {
        return (await this.getNotify()).filter((n) => n.userId === userId)
    }
    syncRedis = async (type: TYPE_OBJ, datas) => {
        switch (type) {
            case TYPE_OBJ.USER:
                await pubClient.set(TYPE_OBJ.USER, JSON.stringify(datas || []))
                break
            case TYPE_OBJ.NOTIFY:
                await pubClient.set(
                    TYPE_OBJ.NOTIFY,
                    JSON.stringify(datas || [])
                )
                break
            default:
                break
        }
    }
    getUsers = async (): Promise<IUser[]> => {
        return JSON.parse((await pubClient.get(TYPE_OBJ.USER)) || '[]')
    }
    getUserBySocketId = async (
        socketID: string
    ): Promise<IUser | undefined> => {
        const datas = await this.getUsers()
        return datas.find((user) => user.socketId === socketID)
    }
    getNotify = async (): Promise<INotifyMsg[]> => {
        return JSON.parse((await pubClient.get(TYPE_OBJ.NOTIFY)) || '[]')
    }
    connection = (socket) => {
        socket.on('user-connect', async (userId) => {
            logger.info('connect', userId)

            socket.join(userId) // tao ket noi chi co server va client
            await this.addUser({ userId, socketId: socket.id }) // check online
            global._io.emit('get-users', await this.getUsers())
            global._io.emit('notifys', await this.getNotifyMsgOfUser(userId))
        })
        socket.on('disconnect', async () => {
            await this.removeUser(socket.id)
            global._io.emit('get-users', await this.getUsers())
        })

        socket.on('chat-messager', async ({ msg, members }) => {
            let socketCustom = socket
            for (let i = 0; i < members.length; i++) {
                const member = members[i]
                if (member !== msg.senderId) {
                    socketCustom = socketCustom.to(member)
                    await this.addNotifyMsg({
                        userId: member,
                        roomId: msg.roomId,
                        receiverID: (
                            await this.getUserBySocketId(socket.id)
                        )?.userId,
                    })
                }
            }
            socketCustom.emit('message', msg)
        })

        socket.on('get-notifys', async (userId) => {
            global._io.emit('notifys', await this.getNotifyMsgOfUser(userId))
        })

        socket.on('delete-notify', async ({ userId, roomId }) => {
            await this.removeNotifyMsg(roomId, userId)
            global._io
                .to(userId)
                .emit('notifys', await this.getNotifyMsgOfUser(userId))
        })

        socket.on('out-room', (members) => {
            let socketCustom = socket
            members.forEach((member) => {
                socketCustom = socketCustom.to(member)
            })
            socketCustom.emit('update-rooms')
        })
    }
}

const socketService = new SocketService()
export default socketService
