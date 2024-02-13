import React, { useState } from "react";
import CheerStepComponent from "./step-component/CheerStepComponent";
import ShowRemainingStepComponent from "./step-component/ShowRemainingStepComponent";
import AskStepComponent from "./step-component/AskStepComponent";
import { damJJokNameState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";

function EndingDamJJokFrame() {
    // 0: 응원해요!
    // 1: 잔여 적립금은 얼마예요
    // 2: 새로 도전할래요?
    const damJJokName = useRecoilValue(damJJokNameState);
    const [endingDamJJokStep, setEndingDamJJokStep] = useState(0);

    function handleClickConfirm() {
        setEndingDamJJokStep(endingDamJJokStep + 1);
    }

    return (
        <div>
            {endingDamJJokStep === 0 && (
                <CheerStepComponent
                    damJJokName={damJJokName}
                    onClick={() => handleClickConfirm()}
                />
            )}
            {endingDamJJokStep === 1 && (
                <ShowRemainingStepComponent
                    onClick={() => handleClickConfirm()}
                />
            )}
            {endingDamJJokStep === 2 && (
                <AskStepComponent damJJokName={damJJokName} />
            )}
        </div>
    );
}

export default EndingDamJJokFrame;
