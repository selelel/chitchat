import { User } from '@/lib/graphql/graphqlTypes'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import {
    useAcceptFollowRequestMutation,
    useDeclineFollowRequestMutation,
} from '@/lib/features/app/appApi'
import { cn } from '@/lib/utils'

function UserRequest({ user }: { user: User }) {
    const [acceptRequest, { data: acceptedUser, isLoading: isLoadingAccepts }] =
        useAcceptFollowRequestMutation()
    const [
        declineRequest,
        { data: declinedUser, isLoading: isLoadingDecline },
    ] = useDeclineFollowRequestMutation()

    const handleAccept = () => {
        // TODO: Add accept friend request mutation
        acceptRequest(user._id)
    }

    const handleDecline = () => {
        // TODO: Add decline friend request mutation
        declineRequest(user._id)
    }

    return (
        <li
            className={`w-full flex justify-between items-center py-3 px-2 ${declinedUser || acceptedUser ? 'opacity-70' : 'opacity-100'}`}
            key={user._id}
        >
            <Link
                href={`/profile/${user.user.username}`}
                className="flex items-center space-x-3 hover:bg-gray-50 transition rounded cursor-pointer flex-1"
            >
                <img
                    src={'/placeholder-profile.webp'}
                    alt={user.user.username}
                    className="w-10 h-10 rounded-full object-cover border"
                />
                <div className="flex-1">
                    <div className="font-medium">
                        {user.user.firstname && user.user.lastname
                            ? `${user.user.firstname} ${user.user.lastname}`
                            : user.user.username}
                    </div>
                    <div className="text-xs text-gray-500">
                        @{user.user.username}
                    </div>
                </div>
            </Link>
            <div className="flex gap-2 ml-4">
                <Button
                    className={cn(acceptedUser && 'bg-black/50')}
                    onClick={handleAccept}
                >
                    Accept
                </Button>
                <Button
                    className={cn(declinedUser && 'bg-black/50')}
                    onClick={handleDecline}
                >
                    Decline
                </Button>
            </div>
        </li>
    )
}

export default UserRequest
