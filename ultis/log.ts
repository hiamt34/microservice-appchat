const winston = require('winston')
const { format } = require('winston')
import dotenv from 'dotenv'
dotenv.config()
const SERVERNAME = process.env.SERVERNAME || '0.0.0.0'
export const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.prettyPrint(),
        format.json(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        })
    ),
    defaultMeta: { service: SERVERNAME },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: format.combine(
                format.prettyPrint(),
                format.json(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                })
            ),
        }),
        new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
            format: format.combine(
                format.prettyPrint(),
                format.json(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                })
            ),
        }),
        new winston.transports.Console(),
    ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(
//         new winston.transports.Console({
//             format: winston.format.simple(),
//         })
//     )
// }
