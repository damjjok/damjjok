import React from "react";
import { useRecoilValue } from "recoil";
import FineInputComponent from "./FineInputComponent";
import WaitingComponent from "./waiting/WaitingComponent";
import FineVoteComponent from "./vote/FineVoteComponent";
import { fineInputStepState } from "contexts/TruthRoomSocket";

function FineInputFrame() {
    const fineInputStep = useRecoilValue(fineInputStepState);

    return (
        <div>
            {fineInputStep === 0 && <FineInputComponent />}
            {fineInputStep === 1 && (
                <WaitingComponent
                    text={"다른 분들이 벌금을 입력하는 중이예요..."}
                />
            )}
            {fineInputStep === 2 && <FineVoteComponent />}
            {fineInputStep === 3 && (
                <WaitingComponent
                    text={"다른 분들의 벌금 투표를 기다리는 중이예요..."}
                />
            )}
        </div>
    );
}

export default FineInputFrame;
