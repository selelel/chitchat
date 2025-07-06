import React, { useEffect } from 'react'
import { DialogContent } from '../ui/dialog'
import {
    useGetManyUserInfoMutation,
    useGetUserInfoQuery,
} from '@/lib/features/app/appApi'
import { User } from '@/lib/graphql/graphqlTypes'
import UserRequest from './user-request'

function NotificationDialogContent({ open }: { open: boolean }) {
    const { data: userInfo } = useGetUserInfoQuery()
    const [getFollowReqUsersData, { data, isLoading }] =
        useGetManyUserInfoMutation()

    useEffect(() => {
        if (!!userInfo && userInfo?.requests.toFollowers.length > 0) {
            const ids = userInfo?.requests.toFollowers.map(
                (data) => data._id
            ) as string[]
            getFollowReqUsersData(ids)
        }
    }, [userInfo, getFollowReqUsersData, open])

    console.log(userInfo)

    return (
        <DialogContent>
            <h2 className="font-semibold text-xl mb-2">Notifications</h2>
            <div>
                <div>
                    {isLoading ? (
                        <div className="text-center">
                            <div className="text-gray-500">Loading...</div>
                        </div>
                    ) : data?.getManyUserInfo &&
                      data.getManyUserInfo.length > 0 ? (
                        <>
                            <h3 className="font-medium mb-3">
                                Friend Requests
                            </h3>
                            <ul className="w-full divide-y divide-gray-200">
                                {data.getManyUserInfo.map(
                                    (friend: User, idx) => (
                                        <UserRequest key={idx} user={friend} />
                                    )
                                )}
                            </ul>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="text-gray-500">
                                No friend requests
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DialogContent>
    )
}

export default NotificationDialogContent
