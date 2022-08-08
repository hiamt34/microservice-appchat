const PORT = Number(process.env.PORT_REDIS) || 6379
const HOST = process.env.HOST_REDIS
import { createClient } from 'redis'
type RedisClientType = ReturnType<typeof createClient>
type RedisClientOptions = Parameters<typeof createClient>[0]

const factory = (options: RedisClientOptions): RedisClientType => {
    return createClient(options)
}

export const dbRedis: RedisClientType = factory({
    // @ts-ignore
    port: PORT,
    host: HOST,
})

dbRedis.on('ready', () => {
    console.log('redis ready')
})

dbRedis.on('error', (err) => {
    console.log('connect redis error:' + err)
})
