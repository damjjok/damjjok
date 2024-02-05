import React from "react";
import logo from "assets/images/logo.png";
import { Wrapper } from "./TomComponent.style";

function TopComponent() {
    return (
        <Wrapper>
            <img src={logo} alt="담쪽이" style={{ width: "10%", height: "8vh" }} />
        </Wrapper>
    );
}

export default TopComponent;
