import { object, string, ref, boolean, array } from 'yup'
const payload = {
    body: object({
        name: string().notRequired(),
        members: array().required(),
    }),
}

export const roomInsterSchema = object({
    ...payload,
})

export const outRoomSchema = object({
    body: object({
        roomId: string().required(),
        userId: string().required(),
    }),
})