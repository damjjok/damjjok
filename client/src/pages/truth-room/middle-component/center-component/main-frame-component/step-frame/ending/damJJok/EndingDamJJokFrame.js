import React, { useState } from "react";
import CheerStepComponent from "./step-component/CheerStepComponent";

function EndingDamJJokFrame({ damJJok }) {
    // 0: 응원해요!
    // 1: 잔여 적립금은 얼마예요
    // 2: 새로 도전할래요?
    const [endingDamJJokStep, setEndingDamJJokStep] = useState(0);

    function handleClickConfirm() {
        setEndingDamJJokStep(endingDamJJokStep + 1);
    }

    return (
        <div>
            {endingDamJJokStep === 0 && (
                <CheerStepComponent damJJok={damJJok} />
            )}
            {endingDamJJokStep === 1 && <div>test2</div>}
            {endingDamJJokStep === 2 && <div>test3</div>}
        </div>
    );
}

export default EndingDamJJokFrame;
