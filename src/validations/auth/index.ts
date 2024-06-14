import z from 'zod'

export const ZLoginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
})

export const ZRegisterSchema = z.object({
    body: z
        .object({
            first_name: z.string().min(2),
            last_name: z.string().min(2),
            email: z.string().email(),
            password: z
                .string()
                .min(8, 'Password must be at least 8 characters long'),
            /*                .regex(
                    /[A-Z]/,
                    'Password must contain at least one uppercase letter',
                )
                .regex(
                    /[a-z]/,
                    'Password must contain at least one lowercase letter',
                )
                .regex(/[0-9]/, 'Password must contain at least one number')
                .regex(
                    /[^A-Za-z0-9]/,
                    'Password must contain at least one special character',
                ),*/
            confirm: z
                .string()
                .min(8, 'Password must be at least 8 characters long'),
            /*                .regex(
                    /[A-Z]/,
                    'Password must contain at least one uppercase letter',
                )
                .regex(
                    /[a-z]/,
                    'Password must contain at least one lowercase letter',
                )
                .regex(/[0-9]/, 'Password must contain at least one number')
                .regex(
                    /[^A-Za-z0-9]/,
                    'Password must contain at least one special character',
                ),*/
        })
        .superRefine(({ confirm, password }, ctx) => {
            if (confirm !== password) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'The passwords did not match',
                    path: ['confirmPassword'],
                })
            }
        }),
})

export type Login = z.infer<typeof ZLoginSchema>

export type Register = z.infer<typeof ZRegisterSchema>
