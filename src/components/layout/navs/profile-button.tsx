'use client'
import { ProfileIcon } from '@/components/commons/icon'
import pathsConfig from '@/config/pathConfig'
import { removeAccessToken } from '@/lib/features/app/appSlice'
import { useLogOutMutation } from '@/lib/features/auth/authApi'
import { useAppDispatch } from '@/lib/hooks'
import { cva } from 'class-variance-authority'
import { redirect, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

export default function ProfileButton() {
    const [logOut, { data, isLoading }] = useLogOutMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data) {
            dispatch(removeAccessToken())
            redirect(pathsConfig.auth.signin)
        }
    }, [data, dispatch])

    const path = usePathname()
    const user_selects = cva(
        'flex space-x-2 items-center text-md active:opacity-50 duration-100 cursor-pointer',
        {
            variants: {
                isActive: {
                    true: 'font-semibold',
                },
            },
        }
    )

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className={user_selects({
                        isActive: path.startsWith('/profile'),
                    })}
                >
                    <ProfileIcon boxSize={8} />
                    <span>Profile</span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
                <div className="space-y-1">
                    <Link
                        href="/profile/me"
                        className="flex items-center space-x-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                    >
                        <User className="h-4 w-4" />
                        <span>View Profile</span>
                    </Link>
                    <button
                        onClick={() => logOut()}
                        disabled={isLoading}
                        className="w-full flex items-center space-x-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 text-red-600"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
