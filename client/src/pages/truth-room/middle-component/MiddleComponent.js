import React from "react";
import { Wrapper } from "./MiddleComponent.style";
import LeftComponent from "./left-component/LeftComponent";
import RightComponent from "./right-component/RightComponent";

function MiddleComponent() {
    return (
        <Wrapper>
            <LeftComponent></LeftComponent>
            <RightComponent></RightComponent>
        </Wrapper>
    );
}

export default MiddleComponent;
