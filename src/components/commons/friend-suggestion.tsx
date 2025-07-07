import { useGetFriendSuggestionMutation } from '@/lib/features/app/appApi'
import React, { useEffect } from 'react'

import FriendSuggestionItem from './friend-suggestion-item'
import { useAppSelector } from '@/lib/hooks'
import { selectUserInfo } from '@/lib/features/app/appSlice'

export default function FriendSuggestion() {
    const userInfo = useAppSelector(selectUserInfo)
    const [getFS, { data }] = useGetFriendSuggestionMutation()

    // Get the list of user IDs that are already in toFollowings
    const toFollowingIds =
        userInfo?.requests?.toFollowings?.map((u: any) => u._id) || []

    // Filter out users who are already in toFollowings
    const filteredSuggestions =
        data?.getFriendSuggestion?.filter((suggestedUser: any) => {
            return !toFollowingIds.includes(suggestedUser._id)
        }) || []

    useEffect(() => {
        getFS({ skip: 0, limit: 10 })
    }, [])

    console.log(filteredSuggestions)
    if (filteredSuggestions.length <= 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-lg">Friend Suggestion</p>
            {filteredSuggestions.map((data: any, idx: number) => (
                <FriendSuggestionItem
                    key={idx}
                    user={data.user}
                    userId={data._id}
                />
            ))}
        </div>
    )
}
