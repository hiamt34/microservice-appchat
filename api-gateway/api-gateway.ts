import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
const PORT = process.env.PORT_API_GATEWAY || 1000
export const SERVERNAME = process.env.SERVERNAME || 'API_GATEWAY '

import dotenv from 'dotenv'
import AuthRouter from './router/auth-router'
import UserRouter from './router/user-router'
import { RoomRouter } from './router/room-router'
import { MesRouter } from './router/mes-router'
import { logger } from '../ultis/log'
import { setupInstrumentation } from '../ultis/instrumentation'
dotenv.config()
setupInstrumentation(SERVERNAME as string, 'HTTP')
// import './middleware/passport'

const allowedOrigins = '*'
// [
//     'http://localhost:1001',
//     'http://localhost:1002',
//     'http://localhost:1003',
//     'http://localhost:1004',
//     'http://localhost:1005',
//     'http://localhost:3000',
// ]

const options: cors.CorsOptions = {
    origin: allowedOrigins,
}
const app = express()
app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

AuthRouter(app, '/api')
UserRouter(app, '/api')
RoomRouter(app, '/api')
MesRouter(app, '/api')

app.listen(PORT, () => {
    logger.info('api-gateway running on port ' + PORT)
})
