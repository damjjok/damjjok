import React from "react";
import EndingDamJJokFrame from "./damJJok/EndingDamJJokFrame";
import SmallFrameComponent from "../../small-frame/SmallFrameComponent";
import EndingPhDFrame from "./phD/EndingPhDFrame";
import { useRecoilValue } from "recoil";
import { damJJokNameState } from "contexts/TruthRoom";
import { enteringTruthRoomMemberInfoState } from "contexts/TruthRoomSocket";

function EndingFrame(props) {
    const enteringTruthRoomMemberInfo = useRecoilValue(
        enteringTruthRoomMemberInfoState,
    );
    const damJJokName = useRecoilValue(damJJokNameState);

    if (enteringTruthRoomMemberInfo.role === "Damjjok") {
        return (
            <SmallFrameComponent
                width={800}
                height={500}
                content={<EndingDamJJokFrame />}
            ></SmallFrameComponent>
        );
    } else {
        return (
            <SmallFrameComponent
                width={800}
                height={500}
                content={<EndingPhDFrame damJJokName={damJJokName} />}
            ></SmallFrameComponent>
        );
    }
}

export default EndingFrame;
