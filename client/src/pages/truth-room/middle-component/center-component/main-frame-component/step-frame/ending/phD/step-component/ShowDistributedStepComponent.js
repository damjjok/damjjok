import { Button, Text } from "@chakra-ui/react";
import { currentGroupState } from "contexts/Group";
import {
    challengeIdState,
    fineDeterminedState,
    initGroupPhDCountState,
    joinMemberListState,
} from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function ShowDistributedStepComponent(props) {
    const { leaveRoom } = useContext(WebSocketContext);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const initGroupPhDCount = useRecoilValue(initGroupPhDCountState);
    const fineDetermined = useRecoilValue(fineDeterminedState);
    const challengeId = useRecoilValue(challengeIdState);
    const currentGroup = useRecoilValue(currentGroupState);
    const navigate = useNavigate();

    const [isLastMember, setIsLastMember] = useState(false);
    function handleClickExit() {
        // if () setIsLastMember(true); // 마지막 멤버 여부 저장
        leaveRoom(challengeId, joinMemberList.length === 1);

        navigate(`/group/${currentGroup.groupId}`);
    }

    return (
        <div>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={50}>
                    {Math.floor(fineDetermined / initGroupPhDCount)}원씩이 <p />
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
