import { fineDecisionInputStepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import FineInputComponent from "./FineInputComponent";

function FineInputFrame(props) {
    const fineDecisionInputStep = useRecoilValue(fineDecisionInputStepState);

    return (
        <div>
            {fineDecisionInputStep === 0 && <FineInputComponent />}
            {fineDecisionInputStep === 1 && <div>hi</div>}
        </div>
    );
}

export default FineInputFrame;
