import { fineDecisionStepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import DecideWaitingComponent from "./decide-waiting/DecideWaitingComponent";
import ResultComponent from "./result/ResultComponent";

function FineDecisionFrame(props) {
    const fineDecisionStep = useRecoilValue(fineDecisionStepState);
    const testUser = {
        name: "김영후",
        role: "damJJok",
    };

    if (testUser.role === "damJJok" && fineDecisionStep !== 3) {
        return <DecideWaitingComponent />;
    } else {
        return fineDecisionStep === 3 && <ResultComponent />;
    }
}

export default FineDecisionFrame;
