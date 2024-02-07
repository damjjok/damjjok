import React, { createContext, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    allUserReadyState,
    joinMemberListState,
    readyMemberCountState,
} from "./TruthRoomSocket";
import { stepState } from "./TruthRoom";

const WebSocketContext = createContext({});

export const WebSocketProvider = ({ children }) => {
    // recoil로 관리할 전역 상태들
    const [step, setStep] = useRecoilState(stepState); // 진실의 방 전체 단계
    const [joinMemberList, setJoinMemberList] =
        useRecoilState(joinMemberListState); // 참여 유저 목록
    // 1. 준비 단계
    const [readyMemberCount, setReadyMemberCount] = useRecoilState(
        readyMemberCountState,
    ); // 준비 단계에서 준비가 된 유저의 수
    const setAllUserReady = useSetRecoilState(allUserReadyState); // 모든 유저가 준비 완료인지 여부, 이건 false였다가 true가 되기만해도 끝이므로 setRecoilState로 호출
    // 2. 증거 판별 단계

    // 여기부터는 소켓 연결, 통신 관련 내용들
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
                    setJoinMemberList(JSON.parse(message.body));
                },
            );
            stompClient.current.subscribe(
                "/topic/readyState/" + roomId,
                (message) => {
                    console.log("raw message: " + message);
                    console.log("raw message body: " + message.body);
                    console.log("준비한 유저 수: ", JSON.parse(message.body));
                    setReadyMemberCount(JSON.parse(message.body));
                },
            );
            stompClient.current.subscribe(
                "/topic/readyResult/" + roomId,
                (message) => {
                    console.log(
                        "모든 유저가 준비했나요?",
                        JSON.parse(message.body),
                    );
                    setAllUserReady(JSON.parse(message.body)); // 반환값이 false이든 true이든 효과는 똑같아서 그냥 set
                    setStep(step + 1); // 모든 유저 준비되면 다음 단계(증거 판별)로 전환
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
        // 사용자가 방에 입장한 후 필요한 구독 목록 구독 시작
        subscribeToTopics(roomId);
        stompClient.current.publish({
            // 진실의 방에 입장했음을 소켓에 발행
            destination: "/app/enter/" + roomId + "/" + userName + "/" + role,
            headers: {},
            body: JSON.stringify({}),
        });
    }, []);

    const setReady = useCallback((roomId) => {
        // 사용자가 방에 입장한 후 필요한 구독 목록 구독 시작
        var message = {
            ready: true,
        };
        console.log(JSON.stringify(true));
        stompClient.current.publish({
            // 진실의 방에 입장했음을 소켓에 발행
            destination: "/app/ready/" + roomId,
            headers: {},
            body: JSON.stringify(message),
        });
    }, []);

    // 연결 상태, 연결 및 연결 해제 함수를 컨텍스트 값으로 제공
    const value = {
        isConnected,
        connect,
        disconnect,
        enterRoom,
        setReady,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketContext };
