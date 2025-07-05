import { Button } from '@/components/ui/button'
import { useFolowUserMutation } from '@/lib/features/app/appApi'
import { selectUserInfo } from '@/lib/features/app/appSlice'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'

function UserConnectButton({ userId }: { userId: string }) {
    const OwnUserInfo = useAppSelector(selectUserInfo)
    const [followUser, { data, isLoading }] = useFolowUserMutation()

    const handleFollowRequest = () => {
        followUser({ input: userId })
    }
    const isFollowRequest = OwnUserInfo?.requests.toFollowings.some(
        (data) => data._id === userId
    )

    console.log(OwnUserInfo?.requests, isFollowRequest)

    return (
        <div className="flex gap-2 pt-2 *:flex-1">
            <Button
                onClick={handleFollowRequest}
                className={`min-w-40 ${
                    data || (isFollowRequest && 'bg-black/80 text-white')
                }`}
                disabled={(isLoading && data) || isFollowRequest}
            >
                {isLoading
                    ? 'Loading...'
                    : data || isFollowRequest
                      ? 'Cancel'
                      : 'Follow'}
            </Button>
        </div>
    )
}

export default UserConnectButton
