import React from "react";
import { Wrapper } from "./CenterComponent.style";
import MainFrameComponent from "./main-frame-component/MainFrameComponent";
import CenterStepper from "./stepper/CenterStepper";

function CenterComponent() {
    return (
        <Wrapper>
            <div className="stepper-container">
                <CenterStepper></CenterStepper>
            </div>
            <MainFrameComponent></MainFrameComponent>
        </Wrapper>
    );
}

export default CenterComponent;
