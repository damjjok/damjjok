import React from "react";
import { Wrapper } from "./MiddleComponent.style";
import LeftComponent from "./left-component/LeftComponent";

function MiddleComponent() {
    return (
        <Wrapper>
            <LeftComponent></LeftComponent>
        </Wrapper>
    );
}

export default MiddleComponent;
