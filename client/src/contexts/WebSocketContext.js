import React, { createContext, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    stepState,
    allUserReadyState,
    fineStepState,
    joinMemberListState,
    readyMemberCountState,
    stepReadyCountState,
    voteResultState,
    fineVoteListState,
} from "./TruthRoomSocket";
import { closeOpenviduSession } from "apis/api/TruthRoom";

const WebSocketContext = createContext({});

export const WebSocketProvider = ({ children }) => {
    // recoil로 관리할 전역 상태들
    const [step, setStep] = useRecoilState(stepState); // 진실의 방 전체 단계
    const [joinMemberList, setJoinMemberList] =
        useRecoilState(joinMemberListState); // 참여 유저 목록
    const [stepReadyCount, setStepReadyCount] =
        useRecoilState(stepReadyCountState); // 각 단계에서 다음 상태로 갈 준비가 된 유저 수 카운트(모든 단계에서 사용 / 각 단계에서 모든 유저가 준비 완료될 때마다 0으로 초기화)

    // 1. 준비 단계
    const [readyMemberCount, setReadyMemberCount] = useRecoilState(
        readyMemberCountState
    ); // 준비 단계에서 준비가 된 유저의 수
    const setAllUserReady = useSetRecoilState(allUserReadyState); // 모든 유저가 준비 완료인지 여부, 이건 false였다가 true가 되기만해도 끝이므로 setRecoilState로 호출
    // 2. 증거 판별 단계
    // 3. PASS/FAIL 투표 단계
    const setVoteResultState = useSetRecoilState(voteResultState);
    // 4. 최후 변론 단계
    // 5. 벌금 결정 단계
    const [fineStep, setFineStep] = useRecoilState(fineStepState); // 벌금 결정 단계에서
    const [fineVoteList, setFineVoteList] = useRecoilState(fineVoteListState); // 서버에서 받아온 벌금 리스트

    // 여기부터는 소켓 연결, 통신 관련 내용들
    const [isConnected, setIsConnected] = useState(false);
    const stompClient = useRef(null);

    const connect = useCallback(() => {
        if (!stompClient.current) {
            // SockJS 인스턴스 생성(소켓 연결을 위함)
            const socket = new SockJS(
                "https://i10e105.p.ssafy.io/truth-room-websocket"
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
                }
            );
            stompClient.current.subscribe(
                "/topic/readyState/" + roomId,
                (message) => {
                    console.log("raw message: " + message);
                    console.log("raw message body: " + message.body);
                    console.log("준비한 유저 수: ", JSON.parse(message.body));
                    setReadyMemberCount(JSON.parse(message.body));
                }
            );
            stompClient.current.subscribe(
                "/topic/readyResult/" + roomId,
                (message) => {
                    console.log(
                        "모든 유저가 준비했나요?",
                        JSON.parse(message.body)
                    );
                    setAllUserReady(JSON.parse(message.body)); // 반환값이 false이든 true이든 효과는 똑같아서 그냥 set => 이 부분 내쪽에서 저장 처리가 굳이 필요하지 않을 듯?
                    setStep(1); // 모든 유저 준비되면 다음 단계(증거 판별)로 전환
                }
            );
            stompClient.current.subscribe(
                "/topic/evidenceNextStageState/" + roomId,
                (message) => {
                    setStepReadyCount(stepReadyCount + 1); // 여기서는 다음 단계를 클릭한 사람 카운트로 사용
                }
            );
            stompClient.current.subscribe(
                // 증거 판별 단계에서 모든 유저가 준비됐을 때 받는 알림
                "/topic/voteStart/" + roomId,
                (message) => {
                    console.log("Vote Start Notification: ", message.body);
                    setStepReadyCount(0); // 다음 단계로 넘어가므로 단계 별 준비된 유저 수 0으로 초기화
                    setStep(2); // 증거 판별 단계에서 투표(PASS/FAIL) 단계로
                }
            );
            stompClient.current.subscribe(
                "/topic/passFailVoteState/" + roomId,
                (message) => {
                    console.log("Current Vote Count: ", message.body);
                    setStepReadyCount(stepReadyCount + 1); // 현재 단계에서 투표 완료한 사람 카운트 용으로 사용
                }
            );
            stompClient.current.subscribe(
                "/topic/voteResult/" + roomId,
                (message) => {
                    console.log("Vote Result: ", message.body);
                    setStepReadyCount(0); // 투표 결과 나왔으므로 준비된 유저 수 0으로 초기화
                    setVoteResultState(message.body); // 이 부분은
                }
            );
            stompClient.current.subscribe(
                "/topic/finalArgumentReadyState/" + roomId,
                (message) => {
                    console.log("Final Argument Ready State: ", message.body);
                    setStepReadyCount(stepReadyCount + 1); // 투표 단계에서 최후 변론으로 갈 준비 완료한 사람 카운트용으로 사용
                }
            );
            stompClient.current.subscribe(
                "/topic/startFinalArgument/" + roomId,
                (message) => {
                    console.log("Start Final Argument: ", message.body);
                    setStepReadyCount(0); // 다음 단계로 넘어가므로 단계 별 준비 인원 0으로 초기화
                    setStep(3); // 4단계(최후 변론)으로 단계 변경
                }
            );
            stompClient.current.subscribe(
                // 벌금 결정 단계로 넘김
                "/topic/startSubmit/" + roomId,
                (message) => {
                    console.log("Start 벌금 단계: ", message.body);
                    setStep(4); // 4단계(최후 변론)으로 단계 변경
                }
            );
            stompClient.current.subscribe(
                "/topic/fineSubmittedCount/" + roomId,
                (message) => {
                    console.log("Fine Submitted Count: ", message.body);
                    setStepReadyCount(stepReadyCount + 1); // 여기서는 벌금 입력한 멤버 수 카운트로 사용
                }
            );
            stompClient.current.subscribe(
                "/topic/startMoneyVote/" + roomId,
                (message) => {
                    console.log(
                        "Start Money Vote, vote list is: ",
                        message.body
                    );
                    setFineVoteList(JSON.parse(message.body)); // 받아온 벌금 리스트를 먼저 set
                    setStepReadyCount(0); // 모든 멤버가 벌금을 입력 완료, 단계 별 준비 상황 0으로 초기화
                    setFineStep(1); // 벌금 입력(0) -> 벌금 투표(1) 단계로
                }
            );
            stompClient.current.subscribe(
                "/topic/fineVoteCount/" + roomId,
                (message) => {
                    console.log("Fine Vote Count: ", message.body);
                    setStepReadyCount(stepReadyCount + 1); // 벌금 투표한 멤버 수 카운트 용으로 사용
                }
            );
            stompClient.current.subscribe(
                "/topic/fineVoteResulte/" + roomId,
                (message) => {
                    console.log("Fine Vote Result: ", message.body);
                    stepReadyCount(0); // 단계 별 준비 멤버 수 0으로 초기화
                    setFineStep(2); // 벌금 투표(1) -> 벌금 발표(2) 단계로
                }
            );
            stompClient.current.subscribe(
                "/topic/remainingMembers/" + roomId,
                (message) => {
                    console.log("Remaining Members: ", message.body);
                    setJoinMemberList(JSON.stringify(message.body));
                }
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
            body: {},
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

    const evidenceNextStage = useCallback((roomId) => {
        // 증거 판별 단계에서 다음 버튼을 눌렀을 때의 동작
        var message = {
            next: true,
        };
        stompClient.current.publish({
            // 증거 판별 단계에서 다음 버튼을 눌렀음을 publish
            destination: "/app/evidenceNextStage/" + roomId,
            headers: {},
            body: JSON.stringify(message),
        });
    }, []);

    const passFailVote = useCallback((roomId, vote) => {
        // 담쪽이의 PASS, FAIL 여부를 투표하는 함수
        var message = {
            pass: vote, // vote = true or false
        };
        stompClient.current.publish({
            // 사용자의 투표 여부를 전달
            destination: "/app/passFailVote/" + roomId,
            headers: {},
            body: JSON.stringify(message),
        });
    }, []);

    const finalArgumentReady = useCallback((roomId) => {
        // 투표 결과가 FAIL일 경우 최후 변론으로 버튼을 눌렀을 때의 동작
        var message = {
            ready: true,
        };
        stompClient.current.publish({
            // 준비했음을 서버에 전달
            destination: "/app/finalArgumentReady/" + roomId,
            headers: {},
            body: JSON.stringify(message),
        });
    }, []);

    const finishFinalArgument = useCallback((roomId) => {
        // 최후 변론이 끝났을 때(타이머 1분 종료 시)의 동작
        stompClient.current.publish({
            // 최후 변론이 끝났음을 서버에 전달
            destination: "/app/finishFinalArgument/" + roomId,
            headers: {},
            body: {},
        });
    }, []);

    const submitFine = useCallback((roomId, fine) => {
        // 사용자가 벌금으로 생각하는 금액을 입력하면 전달하는 함수
        var message = {
            fineAmount: fine, // fine: 입력한 벌금
        };

        stompClient.current.publish({
            // 사용자가 입력한 벌금을 서버에 전달
            destination: "/app/submitFine/" + roomId,
            headers: {},
            body: JSON.stringify(message),
        });
    }, []);

    const voteFine = useCallback((roomId, votedFine) => {
        // 사용자가 벌금으로 투표한 금액을 전달하는 함수
        var message = {
            fineAmount: votedFine, // voteFine: 투표한 벌금
        };

        stompClient.current.publish({
            // 사용자가 투표한 벌금을 서버에 전달
            destination: "/app/voteFine/" + roomId,
            headers: {},
            body: JSON.stringify(message),
        });
    }, []);

    const leaveRoom = useCallback(
        (roomId, isLastMember) => {
            // 진실의 방에서 나갈 때 동작하는 함수, 마지막 나가는 멤버일 경우 오픈비두와의 세션도 끊어 줌.
            if (isLastMember) closeOpenviduSession();
            // 서버에 나감을 알리고 소켓과 연결을 끊어 줌.
            disconnect();

            stompClient.current.publish({
                // 진실의 방에서 나감을 서버에 알림
                destination: "/app/leaveRoom/" + roomId,
                headers: {},
                body: {},
            });
        },
        [disconnect]
    );

    // 연결 상태, 연결 및 연결 해제 함수를 컨텍스트 값으로 제공
    const value = {
        isConnected,
        connect,
        disconnect,
        enterRoom,
        setReady,
        evidenceNextStage,
        passFailVote,
        finalArgumentReady,
        finishFinalArgument,
        submitFine,
        voteFine,
        leaveRoom,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketContext };
