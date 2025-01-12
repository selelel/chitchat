import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import { AppThunk } from '@/lib/store' // Assuming you have AppThunk for async actions
import { CHAT_EVENT } from '@/constants/socket'

// Define the initial state
interface SocketState {
    socket: Socket | null
    connected: boolean
    messages: any[] // Replace `any` with your specific message type
}

const initialState: SocketState = {
    socket: null,
    connected: false,
    messages: [],
}

// Create the socket slice
const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket(state, action: PayloadAction<Socket | null>) {
            // state.socket = action.payload;
        },
        setConnected(state, action: PayloadAction<boolean>) {
            state.connected = action.payload
        },
        addMessage(state, action: PayloadAction<any>) {
            state.messages.push(action.payload)
        },
        clearMessages(state) {
            state.messages = []
        },
    },
})

// Export actions
export const { setSocket, setConnected, addMessage, clearMessages } =
    socketSlice.actions

// Export the reducer
export default socketSlice.reducer
