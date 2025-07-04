import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { User } from '@/lib/graphql/graphqlTypes'
import React from 'react'

function FriendsModal({
    text,
    friends,
}: {
    text: string
    friends: User[] | null
}) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="text-center">
                    <span className="font-bold"> {friends?.length || 0}</span>
                    <span className="font-bold"> {text} </span>
                </div>
            </DialogTrigger>
            <DialogContent className="w-full min-h-[500px] max-h-[500px] border-none">
                <div className="min-w-full flex flex-col h-full">
                    <h2 className="text-lg font-semibold mb-4 text-center">
                        {text}
                    </h2>
                    {Array.isArray(friends) && friends.length > 0 ? (
                        <ul className="w-full max-w-xs divide-y divide-gray-200">
                            {friends.map((friend, idx) => (
                                <li
                                    key={friend._id || idx}
                                    className="flex items-center space-x-3 py-3 px-2 hover:bg-gray-50 transition rounded"
                                >
                                    <img
                                        src={'/placeholder-profile.webp'}
                                        alt={friend.user.username}
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            {friend.user.firstname &&
                                            friend.user.lastname
                                                ? `${friend.user.firstname} ${friend.user.lastname}`
                                                : friend.user.username}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            @{friend.user.username}
                                        </div>
                                    </div>
                                    {/* Example: online status indicator */}
                                    {/* {friend.user.isOnline && (
                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Online"></span>
                                )} */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-gray-500 mt-8">
                            No {text} found.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FriendsModal
