import React from "react";
import { Wrapper } from "./SmallFrameComponent.style";

function SmallFrameComponent({ width, height, content }) {
    return (
        <Wrapper width={width} height={height}>
            {content}
        </Wrapper>
    );
}

export default SmallFrameComponent;
