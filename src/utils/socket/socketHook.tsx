import { useEffect, useRef, useState } from 'react'
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client'

const useSocket = (
    url: string,
    options?: Partial<ManagerOptions & SocketOptions>
) => {
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const newSocket = io(url, options)
        setSocket(newSocket)

        newSocket.on('connect', () => {
            console.log('Socket is Connected')
        })

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error)
        })

        return () => {
            newSocket.disconnect()
        }
    }, [])

    return socket
}

export default useSocket
