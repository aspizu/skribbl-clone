import {useSignal, useSignalEffect} from "@preact/signals"
import {VITE_BACKEND} from "./environment"

export const WEBSOCKET = VITE_BACKEND.replace("http://", "ws://").replace(
    "https://",
    "wss://",
)

enum SocketState {
    Disconnected,
    Waiting,
    Connecting,
}

export function Application() {
    const socket = useSignal<WebSocket | SocketState>(SocketState.Disconnected)
    function reconnect() {
        console.log("reconnect")
        if (socket.peek() instanceof WebSocket) {
            ;(socket.value as WebSocket).close()
        }
        socket.value = SocketState.Connecting
        const new_socket = new WebSocket(WEBSOCKET)
        new_socket.onclose = () => {
            socket.value = SocketState.Waiting
            setTimeout(reconnect, 5000)
        }
        new_socket.onopen = () => {
            socket.value = new_socket
        }
        new_socket.onmessage = (event) => {
            console.log(event.data)
        }
    }
    useSignalEffect(() => {
        console.log("effect")
        reconnect()
        return () => {
            if (socket.value instanceof WebSocket) {
                socket.value.close()
            }
        }
    })
    return (
        <div>
            {socket.value === SocketState.Connecting ?
                <span>Connecting</span>
            : socket.value === SocketState.Waiting ?
                <span>Waiting</span>
            : socket.value === SocketState.Disconnected ?
                <span>Disconnected</span>
            :   <span>Connected</span>}
        </div>
    )
}
