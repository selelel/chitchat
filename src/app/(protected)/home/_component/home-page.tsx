'use client'
import { Button, Divider } from 'antd'
import React, { useEffect } from 'react'
import { useLogOutMutation } from '@/lib/features/auth/authApi'
import { useAppDispatch } from '@/lib/hooks'
import { removeAccessToken } from '@/lib/features/app/appSlice'
import { redirect } from 'next/navigation'
import Layout from '@/components/layout/layout'
import pathsConfig from '@/config/pathConfig'

function HomePage() {
    const [logOut, { data, isLoading }] = useLogOutMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data) {
            dispatch(removeAccessToken())
            redirect(pathsConfig.auth.signin)
        }
    }, [data, dispatch])

    return (
        <Layout>
            <Button
                tabIndex={0}
                className="flex flex-row justify-center space-x-1 items-center rounded-md py-5 px-10 cursor-pointer w-fit"
                onClick={() => logOut()}
                loading={isLoading}
            >
                <p className="font-semibold text-custom-grey">Log Out</p>
            </Button>
            <Divider />
        </Layout>
    )
}

export default HomePage
