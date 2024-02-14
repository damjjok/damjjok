import React, { useContext, useState } from "react";
import { Wrapper } from "./PassFailResultComponent.style";
import { Text } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import { failText, passText } from "./PassFailText";
import { useRecoilValue } from "recoil";
import {
    challengeIdState,
    joinMemberListState,
    stepReadyCountState,
    voteResultState,
} from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import { useNavigate } from "react-router-dom";

function PassFailResultComponent() {
    // result: PASS or FAIL
    const navigate = useNavigate();

    const { finalArgumentReady, leaveRoom } = useContext(WebSocketContext);
    const challengeId = useRecoilValue(challengeIdState);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const result = useRecoilValue(voteResultState); // 소켓으로 받아온 투표 결과
    const stepReadyCount = useRecoilValue(stepReadyCountState); // 최후 변론으로 버튼을 누른 멤버 수 카운트

    const [isClickedReady, setIsClickedReady] = useState(false); // 최후 변론으로 버튼을 눌렀는지 판별
    const [isLastMember, setIsLastMember] = useState(false);

    function handleNextClick(mode) {
        // mode: exit(나가기) or next(최후 변론으로)
        if (mode === "exit") {
            // PASS 시 바로 나가기
            if (joinMemberList.length === 1) setIsLastMember(true);
            leaveRoom(challengeId, isLastMember);
            navigate(`/truth-room/enter-test/${challengeId}`); // 나가기 버튼 임시 처리
        } else if (mode === "next") {
            // FAIL 시 최후 변론으로
            finalArgumentReady(challengeId);
            setIsClickedReady(true);
        }
    }

    return (
        <Wrapper>
            <Text fontSize="40px" as="b">
                투표 결과
            </Text>
            <Text
                fontSize="100px"
                as="b"
                color={result === "PASS" ? "blue.400" : "tomato"}
            >
                {result}
            </Text>
            {result === "PASS" && <Text fontSize="20px">{passText}</Text>}
            {result === "FAIL" && <Text fontSize="20px">{failText}</Text>}

            {!isClickedReady && (
                <div className="next-button-container">
                    <BasicButton
                        buttonName={
                            result === "PASS" ? "나가기" : "최후 변론으로"
                        }
                        onClick={
                            result === "PASS"
                                ? () => handleNextClick("exit")
                                : () => handleNextClick("next")
                        }
                        variant={"bigbtn"}
                    ></BasicButton>
                </div>
            )}
            {isClickedReady && (
                <div className="next-button-container">
                    <BasicButton
                        buttonName={`${stepReadyCount}/${joinMemberList.length}`}
                        isDisabled={true}
                    ></BasicButton>
                </div>
            )}
        </Wrapper>
    );
}

export default PassFailResultComponent;
