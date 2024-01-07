const PORT = Number(process.env.PORT_REDIS) || 6379
const HOST = process.env.HOST_REDIS || 'localhost'
import { createClient } from 'redis'
import { logger } from '../ultis/log'
type RedisClientType = ReturnType<typeof createClient>
type RedisClientOptions = Parameters<typeof createClient>[0]

const factory = (options: RedisClientOptions): RedisClientType => {
    console.table({ redis: options })
    return createClient(options)
}

export const dbRedis: RedisClientType = factory({
    url: `redis://${HOST}:${PORT}`,
})

dbRedis.on('ready', () => {
    logger.info('redis ready')
})

dbRedis.on('error', (err) => {
    logger.info('connect redis error:' + err)
})
