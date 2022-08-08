import { Express, Request, Response, Router } from 'express'
import { mesClient } from '../../client/mes-client'
import { checkRole, checkRoleGetAndInserMes } from '../middleware/checkRole'
import { mesGetMesInRoomSchema, mesInserSchema } from '../middleware/mesSchema'
import { validate } from '../middleware/validateRequest.middleware'
import { verifyToken } from '../middleware/verifyToken'
const route = Router()
export const MesRouter = (app: Express) => {
    app.use('/mes', route)
    route.post(
        '/get-mess',
        verifyToken,
        checkRole,
        validate(mesGetMesInRoomSchema),
        checkRoleGetAndInserMes,
        async (req: Request, res: Response) => {
            //@ts-ignore
            const data = req.body
            mesClient.GetMesInRoom(data, (err, data) => {
                if (!err) {
                    return res.status(201).json({
                        status: true,
                        data: data?.mess,
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
        validate(mesInserSchema),
        checkRoleGetAndInserMes,
        async (req: Request, res: Response) => {
            const data = req.body
            //@ts-ignore
            data.senderId = req.user._id  // thằng nào có token thì là thằng đấy gửi
            mesClient.Insert(data, (err, data) => {
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
