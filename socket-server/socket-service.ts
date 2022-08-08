interface IUser {
    userId: string
    socketId: string
}
interface INotifyMsg {
    userId: string
    roomId: string
}

class SocketService {
    private users: IUser[]
    private notifyMsgs: INotifyMsg[]
    constructor() {
        this.users = []
        this.notifyMsgs = []
    }
    addUser = (user: IUser) => {
        this.users.some((u) => u.userId === user.userId) ||
            this.users.push(user)        
    }
    removeUser = (socketId: string) => {
        this.users = this.users.filter((u) => u.socketId !== socketId)
    }
    addNotifyMsg = (msg: INotifyMsg) => {
        this.notifyMsgs.push(msg)
    }
    removeNotifyMsg = (roomId: string, userId: string) => {
        this.notifyMsgs = this.notifyMsgs.filter(n => (n.roomId !== roomId && n.userId === userId))
    }
    getNotifyMsgOfUser = (userId: string): INotifyMsg[] => {
        return this.notifyMsgs.filter(n => n.userId === userId)
    }
    connection = (socket)  => {                
        socket.on('user-connect', (userId) => {      
            console.log('connect',userId);

            socket.join(userId) // tao ket noi chi co server va client
            this.addUser({userId, socketId: socket.id})    // check online        
            global._io.emit('get-users', this.users)
            global._io.emit('notifys', this.getNotifyMsgOfUser(userId))
        })
        socket.on('disconnect', () => {
            this.removeUser(socket.id)
            global._io.emit('get-users', this.users)
        })

        socket.on('chat-messager',({msg, members}) => {    
            
            let socketCustom = socket  
            members.forEach(member => {
                if(member !== msg.senderId) {
                    socketCustom = socketCustom.to(member)
                    this.addNotifyMsg({
                        userId: member,
                        roomId: msg.roomId
                    })
                }
            })      
            
            socketCustom.emit('message', msg)
            
        })

        socket.on('get-notifys', (userId) => {
            global._io.emit('notifys', this.getNotifyMsgOfUser(userId))
        })

        socket.on('delete-notify', ({userId, roomId}) => {
            
            this.removeNotifyMsg(roomId, userId)            
            global._io.to(userId).emit('notifys', this.getNotifyMsgOfUser(userId))
        })

        socket.on('out-room',(members) => {                
            let socketCustom = socket  
            members.forEach(member => {socketCustom = socketCustom.to(member)})      
            socketCustom.emit('update-rooms')
        })
    }
    
}

const socketService = new SocketService()
export default socketService
