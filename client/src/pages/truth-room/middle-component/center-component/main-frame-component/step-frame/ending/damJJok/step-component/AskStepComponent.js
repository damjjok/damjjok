import { Button, Text } from "@chakra-ui/react";
import { currentGroupState } from "contexts/Group";
import {
    challengeIdState,
    joinMemberListState,
} from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function AskStepComponent({ damJJokName }) {
    const { leaveRoom } = useContext(WebSocketContext);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const challengeId = useRecoilValue(challengeIdState);
    const currentGroup = useRecoilValue(currentGroupState);
    const navigate = useNavigate();

    const [isLastMember, setIsLastMember] = useState(false);
    function handleClickExit(mode) {
        if (joinMemberList.length === 1) setIsLastMember(true); // 마지막 멤버 여부 저장
        leaveRoom(challengeId, isLastMember);

        if (mode === "YES")
            navigate(`/group/${currentGroup.groupId}/create-challenge`);
        // 예 클릭 시 챌린지 생성으로, 아직 임시 처리
        else if (mode === "NO") navigate(`/group/${currentGroup.groupId}`);
    }

    return (
        <div>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={40}>
                    {damJJokName}님, <p />
                    이번 챌린지에는 실패하셨지만
                    <p />또 다시 도전할 수 있어요!
                </Text>
            </div>
            <div style={{ margin: "50px", textAlign: "center" }}>
                <Text as="b" fontSize={30}>
                    다시 도전하시겠어요?
                </Text>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "20px",
                    justifyContent: "center",
                }}
            >
                <div style={{ marginRight: "10px" }}>
                    <Button
                        colorScheme="linkedin"
                        size="lg"
                        onClick={() => handleClickExit("YES")}
                    >
                        예
                    </Button>
                </div>
                <div style={{ marginLeft: "10px" }}>
                    <Button
                        colorScheme="orange"
                        size="lg"
                        onClick={() => handleClickExit("NO")}
                    >
                        아니오
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AskStepComponent;
