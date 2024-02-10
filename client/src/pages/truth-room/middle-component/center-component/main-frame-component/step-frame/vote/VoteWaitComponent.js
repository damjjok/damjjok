import { joinMemberListState, stepState } from "contexts/TruthRoomSocket";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { stepReadyCountState } from "../../../../../../../contexts/TruthRoomSocket";

function VoteWaitComponent(props) {
    const [step, setStep] = useRecoilState(stepState);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const stepReadyCount = useRecoilValue(stepReadyCountState); // 투표를 진행한 멤버의 수

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div style={{ margin: "10px", textAlign: "center" }}>
                다른 사람들의 투표를 기다리고 있어요...
            </div>
            <div style={{ margin: "10px", textAlign: "center" }}>
                {stepReadyCount} / {joinMemberList.length - 1}
            </div>
        </div>
    );
}

export default VoteWaitComponent;
