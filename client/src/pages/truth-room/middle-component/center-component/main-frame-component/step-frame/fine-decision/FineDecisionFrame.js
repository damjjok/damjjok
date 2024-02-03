import { fineDecisionStepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import DecideWaitingComponent from "./decide-waiting/DecideWaitingComponent";

function FineDecisionFrame(props) {
    const fineDecisionStep = useRecoilValue(fineDecisionStepState);
    const testUser = {
        name: "김영후",
        role: "damJJok",
    };

    if (testUser.role === "damJJok") {
        return <DecideWaitingComponent />;
    } else {
    }
}

export default FineDecisionFrame;
