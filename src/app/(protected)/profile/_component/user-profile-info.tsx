import { User } from '@/lib/graphql/graphqlTypes'
import FriendsModal from './friends-link-modal'

const UserProfileImage = ({ user }: { user: User | null }) => (
    <div className="flex flex-col items-center p-4">
        <img
            src={'/placeholder-profile.webp'}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <h2 className="mt-2 text-lg font-semibold">
            {[user?.user.firstname, user?.user.lastname].join(' ')}
        </h2>
        <p className="text-gray-500">@{user?.user.username || 'username'}</p>
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

export default UserProfileImage
