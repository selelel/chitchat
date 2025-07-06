import { Button } from '@/components/ui/button'
import {
    useFolowUserMutation,
    useCancelFollowRequestMutation,
    useRemoveUserFollowingMutation,
} from '@/lib/features/app/appApi'
import { selectUserInfo } from '@/lib/features/app/appSlice'
import { RequestObjectDto } from '@/lib/graphql/graphqlTypes'
import { useAppSelector } from '@/lib/hooks'
import React, { useState } from 'react'

function UserConnectButton({ userId }: { userId: string }) {
    const OwnUserInfo = useAppSelector(selectUserInfo)

    const [followUser, { isLoading: isFollowLoading }] = useFolowUserMutation()
    const [cancelRequest, { isLoading: isCancelLoading }] =
        useCancelFollowRequestMutation()
    const [
        unfollowUser,
        { data: isUnfollowedUser, isLoading: isUnfollowLoading },
    ] = useRemoveUserFollowingMutation()

    const [localToFollowings, setLocalToFollowings] = useState<
        RequestObjectDto['toFollowings'] | undefined
    >(OwnUserInfo?.requests.toFollowings)

    const isFollowing = OwnUserInfo?.following.some(
        (user) => user._id === userId
    )
    const hasPendingRequest = localToFollowings?.some(
        (req) => req._id === userId
    )

    const handleFollowRequest = () => {
        if (isFollowing && !isUnfollowedUser) {
            unfollowUser({ input: userId })
        } else if (hasPendingRequest) {
            cancelRequest(userId)
            setLocalToFollowings((prev) =>
                prev?.filter((d) => d._id !== userId)
            )
        } else {
            followUser({ input: userId })
            setLocalToFollowings((prev) => [
                ...(prev || []),
                {
                    _id: userId,
                    __typename: 'User',
                } as RequestObjectDto['toFollowings'][0],
            ])
        }
    }

    const isLoading = isFollowLoading || isCancelLoading || isUnfollowLoading

    const buttonText =
        isFollowing && !isUnfollowedUser
            ? 'Unfollow'
            : hasPendingRequest
              ? 'Cancel Request'
              : 'Follow'

    return (
        <div className="flex gap-2 pt-2 *:flex-1">
            <Button
                onClick={handleFollowRequest}
                className="min-w-40"
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : buttonText}
            </Button>
        </div>
    )
}

export default UserConnectButton
