import { User } from '@/lib/graphql/graphqlTypes'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function UserRequest({ user }: { user: User }) {
    const handleAccept = (userId: string) => {
        // TODO: Add accept friend request mutation
        console.log('Accept friend request for:', userId)
    }

    const handleDecline = (userId: string) => {
        // TODO: Add decline friend request mutation
        console.log('Decline friend request for:', userId)
    }

    return (
        <li
            className="w-full flex justify-between items-center py-3 px-2"
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
                <Button onClick={() => handleAccept(user._id)}>Accept</Button>
                <Button onClick={() => handleDecline(user._id)}>Decline</Button>
            </div>
        </li>
    )
}

export default UserRequest
