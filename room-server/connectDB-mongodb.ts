import mongoose from "mongoose"

export const connectDB = () => {
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/room-server-msv'
    const options = {
        useNewUrlParser: true,
        // useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    }

    return mongoose
        .connect(dbUri, options)
        .then(() => {
            console.info('Database connected')
        })
        .catch((error) => {
            console.error('DB error', error)
            process.exit(1)
        })
}