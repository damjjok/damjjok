import React from "react";
import { Wrapper } from "./RtcComponent.style";
import { useRecoilValue } from "recoil";
import { groupState } from "contexts/TruthRoom";
import RtcFrameComponent from "./RtcFrameComponent";

function RtcComponent(props) {
    const group = useRecoilValue(groupState);
    return (
        <Wrapper>
            {group.map((user) => (
                <RtcFrameComponent user={user}></RtcFrameComponent>
            ))}
        </Wrapper>
    );
}

export default RtcComponent;
