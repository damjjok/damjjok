import React from "react";
import OpenViduComponent from "./OpenViduComponent";
import {
    challengeIdState,
    enteringTruthRoomMemberInfoState,
} from "contexts/TruthRoomSocket";
import { useRecoilValue } from "recoil";

function RtcComponent(props) {
    const challengeId = useRecoilValue(challengeIdState);
    const enteringTruthRoomMemberInfo = useRecoilValue(
        enteringTruthRoomMemberInfoState
    );
    return (
        <OpenViduComponent
            challengeId={challengeId}
            userName={enteringTruthRoomMemberInfo.name}
        ></OpenViduComponent>
    );
}

export default RtcComponent;
