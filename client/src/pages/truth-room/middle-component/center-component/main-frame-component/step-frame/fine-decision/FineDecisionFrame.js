import { fineDecisionStepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import DecideWaitingComponent from "./decide-waiting/DecideWaitingComponent";
import ResultComponent from "./result/ResultComponent";
import FineInputFrame from "./decide/input/FineInputFrame";

function FineDecisionFrame(props) {
    const fineDecisionStep = useRecoilValue(fineDecisionStepState);
    const testUser = {
        name: "김영후",
        role: "phD",
    };

    if (testUser.role === "damJJok" && fineDecisionStep !== 2) {
        return <DecideWaitingComponent />;
    } else {
        return (
            <div>
                {fineDecisionStep === 0 && <FineInputFrame />}
                {fineDecisionStep === 1 && <ResultComponent />}
            </div>
        );
    }
}

export default FineDecisionFrame;
