import React, { createContext, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    stepState,
    allUserReadyState,
    fineStepState,
    joinMemberListState,
    stepReadyCountState,
    voteResultState,
    fineVoteListState,
    fineDeterminedState,
    isVotedState,
    fineInputStepState,
    initGroupPhDCountState,
} from "./TruthRoomSocket";
import { closeOpenviduSession } from "apis/api/TruthRoom";
import { damJJokNameState } from "./TruthRoom";

const WebSocketContext = createContext({});

export const WebSocketProvider = ({ children }) => {
    // recoil로 관리할 전역 상태들
    const setInitGroupPhDCount = useSetRecoilState(initGroupPhDCountState); // 벌금 분배 화면에서 쓰일 박사님 수(임시로 시작했을 때 박사님 수로 카운트)
    const [step, setStep] = useRecoilState(stepState); // 진실의 방 전체 단계
    const [joinMemberList, setJoinMemberList] =
        useRecoilState(joinMemberListState); // 참여 유저 목록
    const [stepReadyCount, setStepReadyCount] =
        useRecoilState(stepReadyCountState); // 각 단계에서 다음 상태로 갈 준비가 된 유저 수 카운트(모든 단계에서 사용 / 각 단계에서 모든 유저가 준비 완료될 때마다 0으로 초기화)
    const [damJJokName, setDamJJokName] = useRecoilState(damJJokNameState);

    // 1. 준비 단계
    const setAllUserReady = useSetRecoilState(allUserReadyState); // 모든 유저가 준비 완료인지 여부, 이건 false였다가 true가 되기만해도 끝이므로 setRecoilState로 호출
    // 2. 증거 판별 단계
    // 3. PASS/FAIL 투표 단계
    const setVoteResult = useSetRecoilState(voteResultState);
    const setIsVoted = useSetRecoilState(isVotedState);
    // 4. 최후 변론 단계
    // 5. 벌금 결정 단계
    const [fineStep, setFineStep] = useRecoilState(fineStepState); // 벌금 결정 단계에서
    const [fineInputStep, setFineInputStep] =
        useRecoilState(fineInputStepState);
    const [fineVoteList, setFineVoteList] = useRecoilState(fineVoteListState); // 서버에서 받아온 벌금 리스트
    const [fineDetermined, setFineDetermined] =
        useRecoilState(fineDeterminedState);

    // 여기부터는 소켓 연결, 통신 관련 내용들
    const [isConnected, setIsConnected] = useState(false);
    const stompClient = useRef(null);

    const connect = useCallback(() => {
        return new Promise((resolve, reject) => {
            // connection이 된 후에 enterRoom이 실행되게 Promise 객체를 반환
            if (!stompClient.current) {
                const socket = new SockJS( // 소켓 연결을 위한 SockJS 인스턴스 생성
                    "https://i10e105.p.ssafy.io/truth-room-websocket"
                );
                stompClient.current = new Client({
                    // Client 인스턴스 생성을 통해 STOMP 프로토콜 사용
                    webSocketFactory: () => socket,
                    onConnect: (frame) => {
                        console.log("Connected: " + frame);
                        setIsConnected(true);
                        resolve(); // 연결 성공 시 resolve 호출
                    },
                    // 연결 실패 또는 오류 발생 시 reject를 호출할 수 있음
                    onStompError: (error) => {
                        console.error("STOMP error: ", error);
                        reject(error); // 오류 발생 시 reject 호출
                    },
                });
                stompClient.current.activate(); // 연결 시작
            } else {
                // 이미 연결된 경우, 즉시 resolve 호출
                resolve("Already connected.");
            }
        });
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
                    console.log("입장을 통해 갱신된 멤버 리스트");
                    const refJoinMemeberList = JSON.parse(message.body);
                    console.log(refJoinMemeberList);
                    setJoinMemberList(refJoinMemeberList);
                    if (damJJokName === "") {
                        // 담쪽이가 아직 입장하지 않아 이름이 저장되지 않았을 때
                        var i;
                        for (i = 0; i < refJoinMemeberList.length; i++) {
                            if (refJoinMemeberList[i].role === "Damjjok")
                                setDamJJokName(refJoinMemeberList[i].name);
                        }
                    }
                }
            );
            stompClient.current.subscribe(
                "/topic/readyState/" + roomId,
                (message) => {
                    console.log("준비 버튼 클릭을 통해 갱신된 멤버 리스트");
                    const refJoinMemeberList = JSON.parse(message.body);
                    console.log(refJoinMemeberList);
                    setInitGroupPhDCount(refJoinMemeberList.length - 1); // 벌금 분배금 보여주는 화면에서 쓰일 카운트, 임시로 방에 참여한 박사님만 카운트
                    setJoinMemberList(refJoinMemeberList);
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
                    console.log(
                        "증거에서 다음단계로 넘어가기 누른 멤버 수 : " +
                            message.body
                    );
                    setStepReadyCount(message.body); // 여기서는 다음 단계를 클릭한 사람 카운트로 사용
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
                    setStepReadyCount(message.body); // 현재 단계에서 투표 완료한 사람 카운트 용으로 사용
                }
            );
            stompClient.current.subscribe(
                "/topic/voteResult/" + roomId,
                (message) => {
                    console.log("Vote Result: ", message.body);
                    setStepReadyCount(0); // 투표 결과 나왔으므로 준비된 유저 수 0으로 초기화
                    setVoteResult(message.body); // 이 부분은 "PASS", "FAIL" 형태로 오므로 JSON.parse() 안해줬음
                    setStep(3); // 4단계(PASS/FAIL 표출)로 단계 변경
                }
            );
            stompClient.current.subscribe(
                "/topic/finalArgumentReadyState/" + roomId,
                (message) => {
                    console.log("Final Argument Ready State: ", message.body);
                    setStepReadyCount(message.body); // 투표 단계에서 최후 변론으로 갈 준비 완료한 사람 카운트용으로 사용
                }
            );
            stompClient.current.subscribe(
                "/topic/startFinalArgument/" + roomId,
                (message) => {
                    console.log("Start Final Argument: ", message.body);
                    setStepReadyCount(0); // 다음 단계로 넘어가므로 단계 별 준비 인원 0으로 초기화
                    setStep(4); // 5단계(최후 변론)으로 단계 변경
                }
            );
            stompClient.current.subscribe(
                // 벌금 결정 단계로 넘김
                "/topic/startSubmit/" + roomId,
                (message) => {
                    console.log("Start 벌금 단계: ", message.body);
                    setStep(5); // 6단계(벌금 결정)으로 단계 변경
                }
            );
            stompClient.current.subscribe(
                "/topic/fineSubmittedCount/" + roomId,
                (message) => {
                    console.log("Fine Submitted Count: ", message.body);
                    setStepReadyCount(message.body); // 여기서는 벌금 입력한 멤버 수 카운트로 사용
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
                    setFineInputStep(2); // 벌금 입력 대기(1) -> 벌금 투표(2) 단계로
                }
            );
            stompClient.current.subscribe(
                "/topic/fineVoteCount/" + roomId,
                (message) => {
                    console.log("Fine Vote Count: ", message.body);
                    setStepReadyCount(message.body); // 벌금 투표한 멤버 수 카운트 용으로 사용
                }
            );
            stompClient.current.subscribe(
                "/topic/fineVoteResulte/" + roomId, // 김다희가 오타내놨음. 서버도 resulte라서 일단 이렇게 둠.
                (message) => {
                    console.log("Fine Vote Result: ", message.body);
                    setFineDetermined(message.body);
                    setStepReadyCount(0); // 단계 별 준비 멤버 수 0으로 초기화
                    setFineStep(1); // 벌금 입력(0) -> 벌금 발표(1) 단계로
                }
            );
            stompClient.current.subscribe(
                "/topic/remainingMembers/" + roomId,
                (message) => {
                    console.log("Remaining Members: ");
                    console.log(JSON.parse(message.body));
                    setJoinMemberList(JSON.parse(message.body));
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
        console.log(votedFine);
        console.log("투표 완, 금액: " + votedFine);
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
            if (isLastMember) {
                console.log(isLastMember);
                closeOpenviduSession(roomId);
            }
            // 서버에 나감을 알리고 소켓과 연결을 끊어 줌.
            stompClient.current.publish({
                // 진실의 방에서 나감을 서버에 알림
                destination: "/app/leaveRoom/" + roomId,
                headers: {},
                body: {},
            });

            // 소켓 연결 후 관련 recoil 값들 원상복구, challengeId와 enteringTruthRoomMemberInfo는 입장하기 누를 때 set되므로 여기서 초기화 x
            setStep(0);
            setJoinMemberList([]);
            setAllUserReady(false);
            setStepReadyCount(0);
            setIsVoted(false);
            setVoteResult("");
            setFineStep(0);
            setFineVoteList([]);
            setFineDetermined(0);
            // 소켓과 연결 끊기
            disconnect();
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
