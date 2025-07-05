import { User } from '@/lib/graphql/graphqlTypes'
import FriendsModal from './friends-link-modal'
import { Button } from '@/components/ui/button'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import UserConnectButton from './user-connect-button'

const UserProfileInfoOwn = ({ user }: { user: User | null }) => {
    return (
        <div className="flex flex-col items-center p-4">
            <img
                src={'/placeholder-profile.webp'}
                alt="User Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <h2 className="mt-2 text-lg font-semibold">
                {[user?.user.firstname, user?.user.lastname].join(' ')}
            </h2>
            <p className="text-gray-500">
                @{user?.user.username || 'username'}
            </p>

            <div className="flex mt-4 space-x-4">
                <FriendsModal
                    text={'Following'}
                    friends={user?.following || null}
                />
                <FriendsModal
                    text={'Followers'}
                    friends={user?.followers || null}
                />
            </div>
        </div>
    )
}

export const UserProfileInfoDynamic = ({
    user,
    isLoading,
}: {
    user: User | null
    isLoading: boolean
}) => {
    const isOwnProfile =
        localStorageGetItem(LOCALSTORAGE['USER_ID']) === user?._id
    if (isLoading) {
        return 'Loading'
    }
    return (
        <div className="flex flex-col items-center p-4">
            <img
                src={'/placeholder-profile.webp'}
                alt="User Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <h2 className="mt-2 text-lg font-semibold">
                {[user?.user.firstname, user?.user.lastname].join(' ')}
            </h2>
            <p className="text-gray-500">
                @{user?.user.username || 'username'}
            </p>

            {!isOwnProfile && <UserConnectButton userId={user?._id!} />}

            <div className="flex mt-4 space-x-4">
                <FriendsModal
                    text={'Following'}
                    friends={user?.following || null}
                />
                <FriendsModal
                    text={'Followers'}
                    friends={user?.followers || null}
                />
            </div>
        </div>
    )
}

export default UserProfileInfoOwn
