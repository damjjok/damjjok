import { fineDecisionStepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import DecideWaitingComponent from "./decide-waiting/DecideWaitingComponent";
import ResultComponent from "./result/ResultComponent";
import FineInputComponent from "./decide/input/FineInputComponent";

function FineDecisionFrame(props) {
    const fineDecisionStep = useRecoilValue(fineDecisionStepState);
    const testUser = {
        name: "김영후",
        role: "phD",
    };

    if (testUser.role === "damJJok" && fineDecisionStep !== 3) {
        return <DecideWaitingComponent />;
    } else {
        return (
            <div>
                {fineDecisionStep === 2 && <FineInputComponent />}
                {fineDecisionStep === 3 && <ResultComponent />}
            </div>
        );
    }
}

export default FineDecisionFrame;
