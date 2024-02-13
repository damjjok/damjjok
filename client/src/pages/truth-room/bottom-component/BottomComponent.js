import React, { useContext, useState } from "react";
import {
    challengeIdState,
    joinMemberListState,
    stepReadyCountState,
    stepState,
} from "contexts/TruthRoomSocket";
import { useRecoilValue } from "recoil";
import { Wrapper } from "./BottomComponent.style";
import { Button } from "@chakra-ui/react";
import { WebSocketContext } from "contexts/WebSocketContext";
import TimerComponent from "./TimerComponent";

function BottomComponent() {
    const { evidenceNextStage } = useContext(WebSocketContext);
    const step = useRecoilValue(stepState);
    const challengeId = useRecoilValue(challengeIdState);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const stepReadyCount = useRecoilValue(stepReadyCountState);
    const [isClickedReady, setIsClickedReady] = useState(false);

    function handleNextStepClick() {
        evidenceNextStage(challengeId);
        setIsClickedReady(true);
    }

    if (step === 1)
        return (
            <Wrapper>
                {!isClickedReady && (
                    <Button
                        width={"80px"}
                        colorScheme="yellow"
                        onClick={handleNextStepClick}
                    >
                        다음으로
                    </Button>
                )}
                {isClickedReady && (
                    <Button width={"80px"}>
                        {stepReadyCount}/{joinMemberList.length}
                    </Button>
                )}
            </Wrapper>
        );
    else if (step === 4)
        // 최후 변론 단계 타이머 표출
        return (
            <Wrapper>
                <div className="timer-container">
                    <TimerComponent />
                </div>
            </Wrapper>
        );
    else return <Wrapper></Wrapper>;
}

export default BottomComponent;
