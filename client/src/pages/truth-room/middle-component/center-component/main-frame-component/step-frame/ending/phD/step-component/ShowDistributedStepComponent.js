import { Button, Text } from "@chakra-ui/react";
import {
    challengeIdState,
    fineDeterminedState,
    joinMemberListState,
} from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function ShowDistributedStepComponent(props) {
    const { leaveRoom } = useContext(WebSocketContext);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const fineDetermined = useRecoilValue(fineDeterminedState);
    const challengeId = useRecoilValue(challengeIdState);
    const navigate = useNavigate();

    const [isLastMember, setIsLastMember] = useState(false);
    function handleClickExit() {
        if (joinMemberList.length === 1) setIsLastMember(true); // 마지막 멤버 여부 저장
        leaveRoom(challengeId, isLastMember);

        navigate(`/truth-room/enter-test/${challengeId}`);
    }

    return (
        <div>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={50}>
                    {fineDetermined / (joinMemberList.length - 1)}원이 <p />
                    박사님들에게 나누어졌어요!
                </Text>
            </div>
            <div style={{ marginTop: "50px", textAlign: "center" }}>
                <Button
                    colorScheme={"facebook"}
                    size={"lg"}
                    onClick={() => handleClickExit()}
                >
                    나가기
                </Button>
            </div>
        </div>
    );
}

export default ShowDistributedStepComponent;
