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
        const url = request.nextUrl.clone()
        url.pathname = pathsConfig.auth.signin
        return NextResponse.rewrite(url)
    }

    if (
        isAuthenticated &&
        !Object.values(pathsConfig.dashboard).some((route) =>
            request.nextUrl.pathname.startsWith(route)
        )
    ) {
        const url = request.nextUrl.clone()
        url.pathname = pathsConfig.dashboard.home
        return NextResponse.rewrite(url)
    }

    return NextResponse.next({
        request: {
            headers: request.headers,
        },
    })
}
