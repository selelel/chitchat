'use client'

import {
    GetUserInfo,
    setNewUserLocalStorage,
} from '@/lib/features/app/appSlice'
import { useAppDispatch } from '@/lib/hooks'
import { ReactNode, useEffect, useRef } from 'react'

export const SetNewUserLocalStorageWrapper = ({
    children,
}: {
    children: ReactNode
}) => {
    const dispatch = useAppDispatch()
    const requestMade = useRef(false)

    useEffect(() => {
        dispatch(GetUserInfo())
    }, [dispatch])

    useEffect(() => {
        const changeLocalStorageVariables = async () => {
            if (!requestMade.current) {
                try {
                    await dispatch(setNewUserLocalStorage()).unwrap()
                } catch (error) {
                    console.error('Failed to user info', error)
                }
            }
        }

        changeLocalStorageVariables()
    }, [dispatch])

    return children
}
