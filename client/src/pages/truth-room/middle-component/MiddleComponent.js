import React from "react";
import { Wrapper } from "./MiddleComponent.style";
import LeftComponent from "./left-component/LeftComponent";
import RightComponent from "./right-component/RightComponent";
import CenterComponent from "./center-component/CenterComponent";

function MiddleComponent() {
    return (
        <Wrapper>
            <LeftComponent></LeftComponent>
            <CenterComponent></CenterComponent>
            <RightComponent></RightComponent>
        </Wrapper>
    );
}

export default MiddleComponent;
