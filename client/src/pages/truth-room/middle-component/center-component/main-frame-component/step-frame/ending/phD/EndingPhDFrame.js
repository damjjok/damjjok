import React, { useState } from "react";
import CommentComponent from "./step-component/CommentComponent";

function EndingPhDFrame({ damJJok }) {
    // 0: 담쪽이는 실패했지만 응원해주세요
    // 1: 분배된 돈은 얼마예요
    const [endingPhDStep, setEndingPhDStep] = useState(0);

    function handleClickConfirm() {
        setEndingPhDStep(endingPhDStep + 1);
    }

    return (
        <div>
            {endingPhDStep === 0 && (
                <CommentComponent
                    damJJok={damJJok}
                    onClick={() => handleClickConfirm}
                />
            )}
        </div>
    );
}

export default EndingPhDFrame;
