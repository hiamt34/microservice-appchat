import mongoose from 'mongoose'
export interface MesDocument extends mongoose.Document {
    roomId: string;
    senderId: string;
    conten: string;
    reply: string
}
const MesSchema = new mongoose.Schema(
    {
        roomId: { type: String, require: true, trim: true },
        senderId: { type: String, require: true, trim: true },
        conten: { type: String, require: true, trim: true },
        reply: { type: String, trim: true },
    },
    { timestamps: true }
)

export const MesModel = mongoose.model<MesDocument>('Mes', MesSchema)
