import React from "react";
import { Wrapper } from "./TruthRoom.style";
import TopComponent from "./top-component/TopComponent";
import MiddleComponent from "./middle-component/MiddleComponent";
import BottomComponent from "./bottom-component/BottomComponent";

function TruthRoom() {
    return (
        <Wrapper>
            <TopComponent></TopComponent>
            <MiddleComponent></MiddleComponent>
            <BottomComponent></BottomComponent>
        </Wrapper>
    );
}

export default TruthRoom;
