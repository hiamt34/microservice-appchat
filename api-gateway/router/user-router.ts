import { Express, Request, Response, Router } from 'express'
import { userClient } from '../../client/user-client'
import { checkRole } from '../middleware/checkRole'
import { userGet, userSearch, userUpdateSchema } from '../middleware/userSchema'
import { validate } from '../middleware/validateRequest.middleware'
import { verifyToken } from '../middleware/verifyToken'
const route = Router()
const UserRouter = (app: Express) => {
    app.use('/user', route)
    route.get(
        '/get-all',
        verifyToken,
        checkRole,
        async (req: Request, res: Response) => {
            userClient.GetAll({}, (err, data) => {
                if (!err) {
                    return res.status(201).json({
                        status: true,
                        data: data?.users,
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
    route.get(
        '/get',
        verifyToken,
        checkRole,
        async (req: Request, res: Response) => {
            const { _id } = req.user as any
            userClient.Get({ _id }, (err, data) => {
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
        '/get-member',
        validate(userGet),
        verifyToken,
        checkRole,
        async (req: Request, res: Response) => {
            const { _id } = req.body as any
            userClient.Get({ _id }, (err, data) => {
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
        '/update',
        validate(userUpdateSchema),
        verifyToken,
        checkRole,
        async (req: Request, res: Response) => {
            const { _id } = req.user as any
            const user = {
                ...req.body,
                _id,
            }
            userClient.Update( user , (err, data) => {
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
        '/search',
        validate(userSearch),
        verifyToken,
        checkRole,
        async (req: Request, res: Response) => {
            const  search  = req.body

            userClient.GetAll( search , (err, data) => {
                if (!err) {
                    return res.status(201).json({
                        status: true,
                        data : data?.users,
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

export default UserRouter
