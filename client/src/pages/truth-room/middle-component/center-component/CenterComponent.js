import React from "react";
import Stepper from "./Stepper";
import { Wrapper } from "./CenterComponent.style";

function CenterComponent() {
    return (
        <Wrapper>
            <div className="stepper-container">
                <Stepper></Stepper>
            </div>
        </Wrapper>
    );
}

export default CenterComponent;
