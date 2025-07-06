import { User } from '../graphql/graphqlTypes'

export type ServerTypes = {
    server_status: { status: 'ONLINE' | 'DOWN' }
    access_token?: string
    user_id?: string
    user_info: User | null
    isUserInfoLoading: boolean
}
