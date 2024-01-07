import { Express, Request, Response, Router } from 'express'
import { roomClient } from '../../client/room-client'
import { checkRole } from '../middleware/checkRole'
import { outRoomSchema, roomInsterSchema } from '../middleware/roomSchema'
import { validate } from '../middleware/validateRequest.middleware'
import { verifyToken } from '../middleware/verifyToken'
const route = Router()
export const RoomRouter = (app: Express, version: string) => {
    app.use(version + '/room', route)
    route.get(
        '/get-room',
        verifyToken,
        checkRole,
        async (req: Request, res: Response) => {
            //@ts-ignore
            const userId = req.user?._id as string
            roomClient.GetRoom({ userId }, (err, data) => {
                if (!err) {
                    return res.status(201).json({
                        status: true,
                        data: data?.rooms,
                    })
                } else {
                    return res.status(500).json({
                        code: err?.code,
                        message: err?.details,
                        status: false,
                    })
                }
            })
        }
    )
    route.post(
        '/insert',
        verifyToken,
        checkRole,
        validate(roomInsterSchema),
        async (req: Request, res: Response) => {
            const data = req.body
            roomClient.Insert(data, (err, data) => {
                if (!err) {
                    return res.status(201).json({
                        status: true,
                        data,
                    })
                } else {
                    return res.status(500).json({
                        code: err?.code,
                        message: err?.details,
                        status: false,
                    })
                }
            })
        }
    )
    route.post(
        '/out-room',
        verifyToken,
        checkRole,
        validate(outRoomSchema),
        async (req: Request, res: Response) => {
            const data = req.body
            roomClient.OutRoom(data, (err, data) => {
                if (!err) {
                    return res.status(201).json({
                        status: true,
                        data,
                    })
                } else {
                    return res.status(500).json({
                        code: err?.code,
                        message: err?.details,
                        status: false,
                    })
                }
            })
        }
    )
}