import React from "react";
import { stepState } from "contexts/TruthRoomSocket";
import { useRecoilState } from "recoil";
import { Wrapper } from "./BottomComponent.style";
import { Button } from "@chakra-ui/react";

function BottomComponent() {
    const [step, setStep] = useRecoilState(stepState);

    function handleNextStepClick() {
        setStep(step + 1);
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
