import mongoose from "mongoose"
import { logger } from '../ultis/log'

export const connectDB = () => {
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017'
    const options = {
        useNewUrlParser: true,
        // useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    }

    return mongoose
        .connect(dbUri + '/mes-server-msv?retryWrites=true&w=majority', options)
        .then(() => {
            logger.info('Database connected')
        })
        .catch((error) => {
            logger.error('DB error', error)
            process.exit(1)
        })
}