import React from "react";
import { Wrapper } from "./RtcFrameComponent.style";

function RtcFrameComponent(props) {
    return (
        <Wrapper>
            {props.user.name}
            {props.user.role}
        </Wrapper>
    );
}

export default RtcFrameComponent;
