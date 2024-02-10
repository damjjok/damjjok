import React, { useContext } from "react";
import { challengeIdState, stepState } from "contexts/TruthRoomSocket";
import { useRecoilState, useRecoilValue } from "recoil";
import { Wrapper } from "./BottomComponent.style";
import { Button } from "@chakra-ui/react";
import { WebSocketContext } from "contexts/WebSocketContext";
import { useParams } from "react-router-dom";

function BottomComponent() {
    const { evidenceNextStage } = useContext(WebSocketContext);
    const step = useRecoilValue(stepState);
    const challengeId = useRecoilValue(challengeIdState);

    function handleNextStepClick() {
        evidenceNextStage(challengeId);
    }

    if (step === 1)
        return (
            <Wrapper>
                <Button colorScheme="yellow" onClick={handleNextStepClick}>
                    다음으로
                </Button>
            </Wrapper>
        );
    else return <Wrapper></Wrapper>;
}

export default BottomComponent;
