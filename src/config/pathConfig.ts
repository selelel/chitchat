import { z } from 'zod'

const PathsSchema = z.object({
    auth: z.object({
        signin: z.string().min(1),
        signup: z.string().min(1),
        verification: z.string().min(1),
        resetPassword: z.string().min(1),
        forgetPassword: z.string().min(1),
    }),
    dashboard: z.object({
        home: z.string().min(1),
        post: z.string().min(1),
        chat: z.string().min(1),
        explore: z.string().min(1),
        menu: z.string().min(1),
        profile: z.string().min(1),
        notification: z.string().min(1),
        search: z.string().min(1),
    }),
    api: z.object({
        authCallback: z.string().min(1),
        user: z.string().min(1),
    }),
})

const pathsConfig = PathsSchema.parse({
    auth: {
        signin: '/signin',
        signup: '/signup',
        verification: '/verification',
        resetPassword: '/reset-password',
        forgetPassword: '/forgot-password',
    },
    dashboard: {
        home: '/home',
        post: '/post',
        chat: '/chat',
        explore: '/explore',
        menu: '/menu',
        profile: '/profile',
        notification: '/notification',
        search: '/search',
    },
    api: {
        authCallback: '/api/auth/callback',
        user: '/api/user',
    },
} satisfies z.infer<typeof PathsSchema>)

export default pathsConfig
