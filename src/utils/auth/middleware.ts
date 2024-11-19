import pathsConfig from '@/config/pathConfig'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const authMiddleware = async (request: NextRequest) => {
    const isAuthenticated = Boolean(request.cookies.get('refresh_token'))

    if (
        !isAuthenticated &&
        Object.values(pathsConfig.dashboard).some((route) =>
            request.nextUrl.pathname.startsWith(route)
        )
    ) {
        return NextResponse.redirect(pathsConfig.auth.signin)
    }

    if (
        isAuthenticated &&
        !Object.values(pathsConfig.dashboard).some((route) =>
            request.nextUrl.pathname.startsWith(route)
        )
    ) {
        return NextResponse.redirect(pathsConfig.dashboard.home)
    }

    return NextResponse.next({
        request: {
            headers: request.headers,
        },
    })
}
