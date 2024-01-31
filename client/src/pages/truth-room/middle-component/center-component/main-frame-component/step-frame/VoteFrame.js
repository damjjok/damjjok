import BasicButton from "components/button/BasicButton";
import { stepState } from "contexts/TruthRoom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

function VoteFrame(props) {
    const [step, setStep] = useRecoilState(stepState);
    const [isVotted, setIsVotted] = useState(false);

    function goToNext() {
        setStep(step + 1);
        setIsVotted(true);
    }

    if (!isVotted) {
        return (
            <div>
                <div>투표 하세요</div>
                <BasicButton onClick={goToNext}>다음으로</BasicButton>
            </div>
        );
    } else {
        return <div>기다리는 중...</div>;
    }
}

export default VoteFrame;
