import {
    enteringTruthRoomMemberInfoState,
    fineStepState,
} from "contexts/TruthRoomSocket";
import React from "react";
import { useRecoilValue } from "recoil";
import DecideWaitingComponent from "./decide-waiting/DecideWaitingComponent";
import ResultComponent from "./result/ResultComponent";
import FineInputFrame from "./decide/input/FineInputFrame";

function FineDecisionFrame(props) {
    const fineStep = useRecoilValue(fineStepState);
    const enteringTruthRoomMemberInfo = useRecoilValue(
        enteringTruthRoomMemberInfoState
    );
    if (enteringTruthRoomMemberInfo.role === "Damjjok" && fineStep !== 1) {
        return <DecideWaitingComponent />;
    } else {
        return (
            <div>
                {fineStep === 0 && <FineInputFrame />}
                {fineStep === 1 && <ResultComponent />}
            </div>
        );
    }
}

export default FineDecisionFrame;
