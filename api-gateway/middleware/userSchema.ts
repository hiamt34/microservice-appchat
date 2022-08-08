import { object, string, ref, boolean, array } from 'yup'
const payload = {
    body: object({
        name: string().notRequired(),
        password: string()
            .notRequired()
            .min(6, 'password should be 6 chars minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'password is latin!'),
        role: string().notRequired(),
        status: boolean().notRequired(),
        photo: string().notRequired(),
    }),
}

export const userUpdateSchema = object({
    ...payload,
})

export const userGet = object({
    body: object({
        _id: string().required(),
    }),
})

export const userSearch = object({
    body: object({
        _id: string().notRequired(),
        ids: array().notRequired(),
    }),
})