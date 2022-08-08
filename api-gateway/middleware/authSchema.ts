import { object, string, ref } from 'yup'
const payload = {
    body: object({
        name: string().required('Name is require!'),
        password: string()
            .required('password is require!')
            .min(6, 'password should be 6 chars minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'password is latin!'),
        email: string().email('is not email').required('email is require!'),
        confirmPassword: string().oneOf(
            [ref('password')],
            'password must match!'
        ),
    }),
}

export const registerSchema = object({
    ...payload,
})

export const signinSchema = object({
    body: object({
        password: string()
            .required('password is require!')
            .min(6, 'password should be 6 chars minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'password should be latin!'),
        email: string().email('is not email').required('email is require!'),
    }),
})

export const OauthSchema = object({
    body: object({
        email: string().required('email is require!'),
        name: string().required(),
        authType: string().required(),
        photo: string().required(),
    }),
})

export const LogoutSchema = object({
    body: object({
        accessToken: string().required(),
        refreshToken: string().required(),
    }),
})
