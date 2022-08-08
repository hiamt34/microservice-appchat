import { Response, Request, NextFunction } from 'express';
import { authClient } from '../../client/auth-client';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authAccessToken = req.header('Authorization');
    const accessToken = authAccessToken && authAccessToken.split(' ')[1];
    
    if (!accessToken) return res.status(200).json({
        status: false,
        data: {
            message: 'Fobidden',
            statusCode: 403
        }
    });

    try {
        authClient.ValidateToken({accessToken},(err, data) => {
            if (!err) {
                // @ts-ignore
                req.user = data;                
                next();
            } else {
                return res.status(200).json({
                    satus: false,
                    data: {
                        message: err?.details,
                        statusCode: 401
                    }
                });
            }
        })        
    } catch (error: any) {
        console.error(error.message);
        return res.status(200).json({
            satus: false,
            data: {
                message: error.message,
                statusCode: 403
            }
        });
    }
};
