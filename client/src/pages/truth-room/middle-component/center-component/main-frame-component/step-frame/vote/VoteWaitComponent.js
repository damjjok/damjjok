import { groupState, stepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function VoteWaitComponent(props) {
    const [step, setStep] = useRecoilState(stepState);
    const group = useRecoilValue(groupState);

    function handleTestClick() {
        // 다음 단계로 넘어가기 위한 테스트 함수
        setStep(step + 1);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div style={{ margin: "10px", textAlign: "center" }}>
                다른 사람들의 투표를 기다리고 있어요...
            </div>
            <div
                style={{ margin: "10px", textAlign: "center" }}
                onClick={handleTestClick}
            >
                2 / {group.length - 1}
            </div>
        </div>
    );
}

export default VoteWaitComponent;
