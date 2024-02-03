import { fineDecisionInputStepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import FineInputComponent from "./FineInputComponent";
import FineInputWaitingComponent from "./FineInputWaitingComponent";
import FineVoteComponent from "./FineVoteComponent";

function FineInputFrame(props) {
    const fineDecisionInputStep = useRecoilValue(fineDecisionInputStepState);

    return (
        <div>
            {fineDecisionInputStep === 0 && <FineInputComponent />}
            {fineDecisionInputStep === 1 && <FineInputWaitingComponent />}
            {fineDecisionInputStep === 2 && <FineVoteComponent />}
        </div>
    );
}

export default FineInputFrame;
