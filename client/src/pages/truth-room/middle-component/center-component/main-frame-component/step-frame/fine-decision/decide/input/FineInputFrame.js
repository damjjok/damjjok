import React from "react";
import { useRecoilValue } from "recoil";
import FineInputComponent from "./FineInputComponent";
import FineInputWaitingComponent from "./input-waiting/FineInputWaitingComponent";
import FineVoteComponent from "./vote/FineVoteComponent";
import { fineInputStepState } from "contexts/TruthRoomSocket";

function FineInputFrame() {
    const fineInputStep = useRecoilValue(fineInputStepState);

    return (
        <div>
            {fineInputStep === 0 && <FineInputComponent />}
            {fineInputStep === 1 && <FineInputWaitingComponent />}
            {fineInputStep === 2 && <FineVoteComponent />}
        </div>
    );
}

export default FineInputFrame;
