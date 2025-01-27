import { createAppSlice } from '@/lib/createAppSlice'
import type { AppThunk } from '@/lib/store'
import { fecthServerStatus } from './fetchServerStatus'
import { ServerTypes } from '@/lib/types/appInitialStateType'
import { fetchRefreshToken } from './fetchRequestToken'
import { changeLocalStorageUponRefresh } from './changeLocalStorageUponRefresh'
import { localStorageRemoveItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

const initialState: ServerTypes = {
    server_status: { status: 'DOWN' },
    access_token: undefined,
    user_id: undefined,
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
                console.log(actions.payload)
                state.access_token = actions.payload
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
    },
})

export const {
    isServerOnline,
    getAccessToken,
    removeAccessToken,
    refreshToken,
    setNewUserLocalStorage,
} = appSlice.actions

export const { selectSeverStatus, selectAccessToken } = appSlice.selectors

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
