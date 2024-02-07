import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { WebSocketContext } from "contexts/WebSocketContext";
import { useRecoilValue } from "recoil";
import {
    joinMemberListState,
    readyMemberCountState,
} from "contexts/TruthRoomSocket";
import { allUserReadyState } from "./../../../contexts/TruthRoomSocket";
import { stepState } from "contexts/TruthRoom";

const ConnectionButton = () => {
    const {
        connect,
        disconnect,
        isConnected,
        enterRoom,
        setReady,
        evidenceNextStage,
    } = useContext(WebSocketContext);
    const step = useRecoilValue(stepState);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const readyMemberCount = useRecoilValue(readyMemberCountState);
    const allUserReady = useRecoilValue(allUserReadyState);

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
            {step === 1 && <div>증거 판별 단계</div>}
            {step === 2 && <div>투표 단계</div>}
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
            </div>
        </div>
    );
};

export default ConnectionButton;
