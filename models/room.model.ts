import mongoose from 'mongoose'
export interface RoomDocument extends mongoose.Document {
    members: Array<string>
    name: string
}
const RoomSchema = new mongoose.Schema(
    {
        members: { type: Array, default: [] },
        name: { type: String, trim: true, default: "Anonymous" },
    },
    { timestamps: true }
)

export const RoomModel = mongoose.model<RoomDocument>('Room', RoomSchema)
