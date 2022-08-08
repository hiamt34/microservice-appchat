import { object, string, ref, boolean, array } from 'yup'
const payload = {
    body: object({
        roomId: string().required(),
    }),
}

export const mesGetMesInRoomSchema = object({
    body: object({
        roomId: string().required(),
    }),
})

export const mesInserSchema = object({
    body: object({
        roomId: string().required(),
        conten: string().required(),
        reply: string().notRequired()
    }),
})