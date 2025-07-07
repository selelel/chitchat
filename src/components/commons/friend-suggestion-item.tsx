import React from 'react'
import {
    useFolowUserMutation,
    useCancelFollowRequestMutation,
} from '@/lib/features/app/appApi'
import { Button } from '../ui/button'

interface FriendSuggestionItemProps {
    user: any
    userId: string
}

const FriendSuggestionItem: React.FC<FriendSuggestionItemProps> = ({
    user,
    userId,
}) => {
    const [followUser, { data: folowedUser, isLoading: isFollowLoading }] =
        useFolowUserMutation()
    const [
        cancelRequest,
        { data: cancelFolowedUser, isLoading: isCancelLoading },
    ] = useCancelFollowRequestMutation()

    const handleFollowRequest = () => {
        if (folowedUser) {
            cancelRequest(userId)
        } else {
            followUser({ input: userId })
        }
    }

    const isLoading = isFollowLoading || isCancelLoading
    const buttonText =
        folowedUser && !cancelFolowedUser ? 'Cancel Request' : 'Follow'

    return (
        <div className="flex justify-between items-center max-w-[400px]">
            <div className="flex gap-2 text-sm">
                <img
                    src={'/placeholder-profile.webp'}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                />
                <p>{[user.firstname, user.lastname].join(' ')}</p>
            </div>
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

export default FriendSuggestionItem
