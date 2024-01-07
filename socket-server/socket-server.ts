import { Server, Socket } from 'socket.io'
import dotenv from 'dotenv'
import socketService from './socket-service'
import { createClient } from 'redis'
import { createAdapter } from '@socket.io/redis-adapter'
import { logger } from '../ultis/log'
dotenv.config()

const PORT = Number(process.env.PORT_REDIS) || 6379
const HOST = process.env.HOST_REDIS || 'localhost'
const PORT_IO_SERVER = process.env.PORT_IO_SERVER || 1005

export const pubClient = createClient({
    url: `redis://${HOST}:${PORT}`,
})
const subClient = pubClient.duplicate()

const io = new Server(Number(PORT_IO_SERVER), {
    cors: {
        origin: '*',
    },
})
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient))
})

global._io = io

global._io.on('connection', socketService.connection)

pubClient.on('ready', () => {
    logger.info('redis ready')
    console.table({
        socketServer: { port: PORT_IO_SERVER },
        redis: { port: PORT, host: HOST },
    })
})

pubClient.on('error', (err) => {
    logger.info('connect redis error:' + err)
})
