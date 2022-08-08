import { Server } from 'socket.io'
import dotenv from 'dotenv'
import socketService from './socket-service'
dotenv.config()
const PORT_IO_SERVER = process.env.PORT_IO_SERVER || 1005

const io = new Server(Number(PORT_IO_SERVER), {
    cors: {
        origin: '*',
    },
})
global._io = io

global._io.on('connection', socketService.connection)
