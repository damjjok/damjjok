import React, { useState } from "react";
import CommentStepComponent from "./step-component/CommentStepComponent";
import ShowDistributedStepComponent from "./step-component/ShowDistributedStepComponent";

function EndingPhDFrame({ damJJokName }) {
    // 0: 담쪽이는 실패했지만 응원해주세요
    // 1: 분배된 돈은 얼마예요
    const [endingPhDStep, setEndingPhDStep] = useState(0);

    function handleClickConfirm() {
        setEndingPhDStep(endingPhDStep + 1);
    }

    return (
        <div>
            {endingPhDStep === 0 && (
                <CommentStepComponent onClick={() => handleClickConfirm()} />
            )}
            {endingPhDStep === 1 && <ShowDistributedStepComponent />}
        </div>
    );
}

export default EndingPhDFrame;
