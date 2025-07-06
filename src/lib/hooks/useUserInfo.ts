import { useAppSelector } from '@/lib/hooks'
import {
    selectUserInfo,
    selectUserInfoLoading,
} from '@/lib/features/app/appSlice'
import { useAppDispatch } from '@/lib/hooks'
import { getUserInfo } from '@/lib/features/app/appSlice'
import { useEffect, useRef } from 'react'

export const useUserInfo = () => {
    const dispatch = useAppDispatch()
    const userInfo = useAppSelector(selectUserInfo)
    const isLoading = useAppSelector(selectUserInfoLoading)
    const prevUserInfo = useRef(userInfo)

    // Track changes in real-time
    useEffect(() => {
        if (prevUserInfo.current !== userInfo) {
            console.log('User info updated:', userInfo)
            prevUserInfo.current = userInfo
        }
    }, [userInfo])

    const refetchUserInfo = () => {
        dispatch(getUserInfo())
    }

    return {
        userInfo,
        isLoading,
        refetchUserInfo,
        hasChanged: prevUserInfo.current !== userInfo,
    }
}
