'use client'

import { getAccessToken } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRefreshTokenMutation } from "@/modules/auth/authApi";
import { LoginResponse } from "@/modules/graphql/graphqlTypes";
import { useEffect } from "react"

export function useInvokedRefresh() {
    const [refreshToken, { data }] = useRefreshTokenMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        refreshToken()
    }, [])

    if(data) {
      dispatch(getAccessToken(data?.refresh.accesstoken));
    }
}

type useLoginUserT = { data :{ loginUser : LoginResponse} | undefined }
export function useLogInUser({ data } : useLoginUserT ) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data?.loginUser?.accesstoken) {
          dispatch(getAccessToken(data.loginUser.accesstoken));
        }
      }, [data, dispatch]);
    }