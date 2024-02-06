import React, { createContext, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketContext = createContext({});

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const stompClient = useRef(null);

    const connect = useCallback(() => {
        if (!stompClient.current) {
            // SockJS 인스턴스 생성
            const socket = new SockJS(
                "https://i10e105.p.ssafy.io/truth-room-websocket",
            );

            // Client 인스턴스 생성
            stompClient.current = new Client({
                // brokerURL: "wss://i10e105.p.ssafy.io/truth-room-websocket", // 이 부분은 실제 서버 경로로 변경해야 합니다.
                webSocketFactory: () => socket, // SockJS 인스턴스를 사용하여 WebSocket 연결을 생성
                onConnect: (frame) => {
                    console.log("Connected: " + frame);
                    setIsConnected(true);

                    // 서버로부터 메시지 수신 구독
                    stompClient.current.subscribe(
                        "/topic/messages",
                        (message) => {
                            // 수신 메시지 처리
                            console.log(JSON.parse(message.body).content);
                        },
                    );
                },
                // 연결 해제 및 오류 처리에 대한 콜백도 여기에 추가할 수 있습니다.
            });

            // 연결 시작
            stompClient.current.activate();
        }
    }, []);

    const disconnect = useCallback(() => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.disconnect(() => {
                console.log("Disconnected");
                setIsConnected(false);
            });
        }
    }, []);

    // 연결 상태, 연결 및 연결 해제 함수를 컨텍스트 값으로 제공
    const value = {
        isConnected,
        connect,
        disconnect,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketContext };
