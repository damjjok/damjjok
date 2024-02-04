import React, { useState } from "react";

function EndingPhDFrame({ damJJok }) {
    // 0: 담쪽이는 실패했지만 응원해주세요
    // 1: 분배된 돈은 얼마예요
    const [endingPhDStep, setEndingPhDStep] = useState(0);

    function handleClickConfirm() {
        setEndingPhDStep(endingPhDStep + 1);
    }

    return <div></div>;
}

export default EndingPhDFrame;
