import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

export const validate = ( schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params : req.params
        });

        return next()
    } catch (error: any) {        
        return res.status(400).json({
            status:false,
            message: error.message,
            code: 400
        })
    }
};
