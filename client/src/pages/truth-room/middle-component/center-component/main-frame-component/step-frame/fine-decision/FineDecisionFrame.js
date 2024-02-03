import { fineDecisionStepState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";

function FineDecisionFrame(props) {
    const fineDecisionStep = useRecoilValue(fineDecisionStepState);
    return <div></div>;
}

export default FineDecisionFrame;
