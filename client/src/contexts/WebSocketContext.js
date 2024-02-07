import React, { createContext, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketContext = createContext({});

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const stompClient = useRef(null);

    const connect = useCallback(() => {
        if (!stompClient.current) {
            // SockJS 인스턴스 생성(소켓 연결을 위함)
            const socket = new SockJS(
                "https://i10e105.p.ssafy.io/truth-room-websocket",
            );

            // Client 인스턴스 생성
            stompClient.current = new Client({
                brokerURL: "wss://i10e105.p.ssafy.io/truth-room-websocket",
                webSocketFactory: () => socket, // SockJS 인스턴스를 사용하여 WebSocket 연결을 생성
                onConnect: (frame) => {
                    console.log("Connected: " + frame);
                    setIsConnected(true);
                },
                // 연결 해제 및 오류 처리에 대한 콜백도 여기에 추가 가능
            });

            // 연결 시작
            stompClient.current.activate();
        }
    }, []);

    const disconnect = useCallback(() => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.deactivate().then(() => {
                console.log("Disconnected");
                stompClient.current = null; // 연결 해제 후 stompClient도 null로
                setIsConnected(false);
            });
        }
    }, []);

    function subscribeToTopics(roomId) {
        if (roomId) {
            stompClient.current.subscribe(
                "/topic/member/" + roomId,
                (message) => {
                    console.log("hi");
                    console.log(JSON.parse(message.body));
                },
            );
            stompClient.current.subscribe(
                "/topic/readyState/" + roomId,
                function (message) {
                    console.log("Ready State: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/readyResult/" + roomId,
                function (message) {
                    console.log("Ready State: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/evidenceNextStageState/" + roomId,
                function (message) {
                    console.log(
                        "Evidence Next Stage Ready Count: ",
                        message.body,
                    );
                },
            );
            stompClient.current.subscribe(
                "/topic/voteStart/" + roomId,
                function (message) {
                    console.log("Vote Start Notification: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/passFailVoteState/" + roomId,
                function (message) {
                    console.log("Current Vote Count: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/voteResult/" + roomId,
                function (message) {
                    console.log("Vote Result: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/finalArgumentReadyState/" + roomId,
                function (message) {
                    console.log("Final Argument Ready State: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/startFinalArgument/" + roomId,
                function (message) {
                    console.log("Start Final Argument: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/remainingMembers/" + roomId,
                function (message) {
                    console.log("Remaining Members: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/fineSubmittedCount/" + roomId,
                function (message) {
                    console.log("Fine Submitted Count: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/startMoenyVote/" + roomId,
                function (message) {
                    console.log("Start Money Vote: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/fineVoteCount/" + roomId,
                function (message) {
                    console.log("Fine Vote Count: ", message.body);
                },
            );
            stompClient.current.subscribe(
                "/topic/fineVoteResulte/" + roomId,
                function (message) {
                    console.log("Fine Vote Result: ", message.body);
                },
            );
        }
    }

    const enterRoom = useCallback((roomId, userName, role) => {
        // 사용자가 방에 입장한 후 구독 시작
        subscribeToTopics(roomId);
        // var message = {
        //     roomId: parseInt(roomId),
        //     userName: userName,
        // };
        stompClient.current.publish({
            destination: "/app/enter/" + roomId + "/" + userName + "/" + role,
            headers: {},
            body: JSON.stringify({}),
        });

        console.log(
            roomId + "번 방 입장, 유저 이름: " + userName + ", 역할: " + role,
        );
    }, []);

    // 연결 상태, 연결 및 연결 해제 함수를 컨텍스트 값으로 제공
    const value = {
        isConnected,
        connect,
        disconnect,
        enterRoom,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketContext };
