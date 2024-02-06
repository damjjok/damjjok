import React, { useRef } from "react";

const WebSocketContext = React.createContext(null);
export { WebSocketContext };

function WebSocketProvider(children) {
    const webSocketUrl = `wss://i10e105.p.ssafy.io/truth-room-websocket`;
    let ws = useRef(null);

    if (!ws.current) {
        // webSocket 연결 안된 경우에는 객체 값이 null임
        ws.current = new WebSocket(webSocketUrl);
        ws.current.onopen = () => {
            console.log("connected to " + webSocketUrl);
        };
        ws.current.onclose = (error) => {
            console.log("disconnect from " + webSocketUrl);
            console.log(error);
        };
        ws.current.onerror = (error) => {
            console.log("connection error " + webSocketUrl);
            console.log(error);
        };
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketProvider;
