import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { string } from 'yup'
const GENSALTBCRYPT = Number(process.env.GENSALTBCRYPT) || 12
export interface UserDocument extends mongoose.Document {
    email: string
    name: string
    status: boolean
    password: string
    role: string
    photo: string
    comparePassword(candidatePassword: string): Promise<boolean>
}
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true, trim: true },
        name: { type: String, index: true, required: true, trim: true },
        password: { type: String, trim: true },
        role: { type: String, required: true, default: 'user' },
        status: { type: Boolean, default: true },
        photo: { type: String },
        authType: { type: String },
    },
    { timestamps: true }
)

//login
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    //do not arrow functions

    const user = (await this) as unknown as UserDocument

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

// hash password when change pass or signin
UserSchema.pre('findOneAndUpdate', async function (next) {
    //@ts-ignore
    const password = this._update.password
    if (!password || password === '') {
        next()
    }

    // Only run this function if password was moddified (not on other update functions)

    const salt = await bcrypt.genSalt(GENSALTBCRYPT)

    const hashPassword = await bcrypt.hashSync(password, salt)

    //@ts-ignore
    this._update.password = hashPassword
    next()
})

export const User = mongoose.model<UserDocument>('User', UserSchema)
