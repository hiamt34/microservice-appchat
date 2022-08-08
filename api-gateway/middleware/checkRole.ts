import { Response, Request, NextFunction } from 'express';
import { roomClient } from '../../client/room-client';
const roles = [
    'user',
    'admin'
]
export const checkRole = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any
    const isCheckRole = roles.includes(user.role)    
    if(isCheckRole){
        return next()
    }
    return res.status(200).json({
        status: false,
        data: {
            message: 'Fobidden',
            statusCode: 403
        }
    });
}

export const checkRoleGetAndInserMes = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any
    const {roomId} = req.body
    roomClient.GetRoomById({roomId},(err,data)=>{
        if (!err) {
            console.log(roomId, data?.members, user._id);
            console.log(data);
            
            const isMember = data?.members?.includes(user._id) 
            if(isMember){
                return next()
            }
        }
        return res.status(200).json({
            status: false,
            data: {
                message: 'Fobidden',
                statusCode: 403
            }
        });
    })
}
