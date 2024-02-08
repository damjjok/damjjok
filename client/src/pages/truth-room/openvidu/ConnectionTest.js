import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { WebSocketContext } from "contexts/WebSocketContext";
import { useRecoilValue } from "recoil";
import {
    joinMemberListState,
    readyMemberCountState,
    stepReadyCountState,
    voteResultState,
} from "contexts/TruthRoomSocket";
import { allUserReadyState } from "./../../../contexts/TruthRoomSocket";
import { stepState } from "contexts/TruthRoomSocket";
import { isVotedState } from "contexts/TruthRoomSocket";

const ConnectionButton = () => {
    const {
        connect,
        disconnect,
        isConnected,
        enterRoom,
        setReady,
        evidenceNextStage,
        passFailVote,
        finalArgumentReady,
    } = useContext(WebSocketContext);
    const step = useRecoilValue(stepState);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const readyMemberCount = useRecoilValue(readyMemberCountState);
    const allUserReady = useRecoilValue(allUserReadyState);
    const stepReadyCount = useRecoilValue(stepReadyCountState);
    const isVoted = useRecoilValue(isVotedState);
    const voteResult = useRecoilValue(voteResultState);

    const testRoomId = 1;

    return (
        <div>
            <div>
                참여 유저 목록:{" "}
                {joinMemberList
                    .map((member) => `${member.name} (${member.role})`)
                    .join(", ")}
            </div>
            <div>
                준비 완료 유저 수: {readyMemberCount} / {joinMemberList.length}
            </div>
            {allUserReady && <div>모든 유저 준비 완료!</div>}
            <div>현재 단계 : {step}</div>
            {step === 1 && (
                <div>
                    증거 판별 단계
                    <div>
                        다음 단계로 넘어갈 준비가 된 인원 수: {stepReadyCount}
                    </div>
                </div>
            )}
            {step === 2 && (
                <div>
                    투표 단계
                    <div>투표 한 인원 수: {stepReadyCount}</div>
                    {isVoted && <div>기다려 주십쇼</div>}
                    {voteResult !== "" && <div>투표 결과: {voteResult}</div>}
                </div>
            )}
            <div>
                <Button onClick={isConnected ? disconnect : connect}>
                    {isConnected ? "Disconnect" : "Connect"}
                </Button>
                <Button
                    onClick={() => enterRoom(testRoomId, "김영후", "담쪽이")}
                >
                    방 입장
                </Button>
                <Button onClick={() => setReady(testRoomId)}>준비하기</Button>
                <Button onClick={() => evidenceNextStage(testRoomId)}>
                    증거 다음 단계로
                </Button>
                <div>
                    <Button onClick={() => passFailVote(testRoomId, true)}>
                        PASS
                    </Button>
                    <Button onClick={() => passFailVote(testRoomId, false)}>
                        FAIL
                    </Button>
                </div>
                <Button onClick={() => finalArgumentReady(testRoomId)}>
                    최후 변론으로
                </Button>
            </div>
        </div>
    );
};

export default ConnectionButton;
