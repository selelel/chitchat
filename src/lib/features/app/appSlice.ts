import { createAppSlice } from '@/lib/createAppSlice'
import type { AppThunk, RootState } from '@/lib/store'
import { fecthServerStatus } from './fetchServerStatus'
import { ServerTypes } from '@/lib/types/appInitialStateType'
import { fetchRefreshToken } from './fetchRequestToken'
import { changeLocalStorageUponRefresh } from './changeLocalStorageUponRefresh'
import { localStorageRemoveItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { fetchUserInfo } from './fecthUserInfo'
import { User } from '@/lib/graphql/graphqlTypes'

const initialState: ServerTypes = {
    server_status: { status: 'DOWN' },
    access_token: undefined,
    user_id: undefined,
    user_info: null,
}

export const appSlice = createAppSlice({
    name: 'app',
    initialState,
    reducers: (create) => ({
        isServerOnline: create.asyncThunk(
            async () => {
                return await fecthServerStatus()
            },
            {
                fulfilled: (state, actions) => {
                    state.server_status = { status: actions.payload }
                },
            }
        ),
        refreshToken: create.asyncThunk(async () => await fetchRefreshToken(), {
            fulfilled: (state, actions) => {
                state.access_token = actions.payload
            },
        }),
        getUserInfo: create.asyncThunk(async () => await fetchUserInfo(), {
            fulfilled: (state, actions) => {
                state.user_info = actions.payload
            },
        }),
        setNewUserLocalStorage: create.asyncThunk(
            changeLocalStorageUponRefresh,
            {
                fulfilled: (state, actions) => {
                    state.user_id = actions.payload
                },
            }
        ),
        getAccessToken: create.reducer(
            (state, actions: { payload: ServerTypes['access_token'] }) => {
                state.access_token = actions.payload
            }
        ),
        removeAccessToken: create.reducer((state) => {
            localStorageRemoveItem(LOCALSTORAGE['USER_ID'])
            localStorageRemoveItem(LOCALSTORAGE['ACCESSTOKEN'])
            state.access_token = undefined
        }),
    }),
    selectors: {
        selectSeverStatus: (counter) => counter.server_status,
        selectAccessToken: (counter) => counter.access_token,
        selectUserInfo: (counter) => counter.user_info,
    },
})

export const {
    getUserInfo,
    isServerOnline,
    getAccessToken,
    removeAccessToken,
    refreshToken,
    setNewUserLocalStorage,
} = appSlice.actions

export const { selectSeverStatus, selectAccessToken, selectUserInfo } =
    appSlice.selectors

export const ServerStatus = (): AppThunk => async (dispatch, getState) => {
    const intervalId = setInterval(async () => {
        const state = getState()
        const { status } = selectSeverStatus(state)

        if (status === 'DOWN') {
            console.log('The server is down!')
            await dispatch(isServerOnline())
        } else {
            console.log('The server is online!')
            clearInterval(intervalId)
        }
    }, 10000)

    console.log('Checking server status...')
}

export const GetUserInfo = (): AppThunk => async (dispatch, getState) => {
    const state = getState()
    const user_info = selectSeverStatus(state)

    await dispatch(getUserInfo())

    console.log(user_info)
}
