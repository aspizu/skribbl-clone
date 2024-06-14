from starlette.applications import Starlette
from starlette.endpoints import WebSocketEndpoint
from starlette.routing import WebSocketRoute
from starlette.websockets import WebSocket

from .environment import DEBUG


class Root(WebSocketEndpoint):
    encoding = "bytes"

    async def on_connect(self, websocket: WebSocket):
        await websocket.accept()
        print("Connected!")

    async def on_receive(self, websocket: WebSocket, data: bytes):
        await websocket.send_bytes(b"OK!")
        print(data)

    async def on_disconnect(self, websocket: WebSocket, close_code: int):
        print("Disconnected!")


application = Starlette(debug=DEBUG, routes=[WebSocketRoute("/", Root)])
